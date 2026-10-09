/* Island Clash — robuuste centrale Supabase-synchronisatie.
 * Alle ic_* opslag blijft compatibel met de bestaande app.
 * Onverzonden wijzigingen blijven lokaal bewaard en worden later opnieuw geprobeerd.
 */
(function(){
  'use strict';
  const cfg=window.ISLAND_CLASH_SUPABASE||{};
  const PENDING_KEY='__island_clash_supabase_pending_v1';
  const MIGRATED_KEY='__island_clash_supabase_initial_sync_v1';
  let saveTimer=null, bootPromise=null, booted=false, pulling=false;
  const pending=new Map();
  const status={configured:false,connected:false,saving:false,lastSuccess:null,lastError:null,localKeys:0,cloudKeys:0};

  function ensureBadge(){
    if(!document.body || document.getElementById('ic-cloud-status')) return;
    const el=document.createElement('div');
    el.id='ic-cloud-status';
    el.setAttribute('role','status');
    el.title='Island Clash synchronisatiestatus';
    el.style.cssText='position:fixed;left:10px;bottom:10px;z-index:999999;padding:6px 10px;border-radius:9px;font:700 12px/1.3 system-ui,sans-serif;box-shadow:0 2px 12px #0003;background:#6b7280;color:white;max-width:90vw;opacity:.94;pointer-events:none';
    el.textContent='☁️ Supabase controleren…';
    document.body.appendChild(el);
  }
  function setStatus(text,kind){
    status.label=text;
    try{
      ensureBadge();
      const el=document.getElementById('ic-cloud-status');
      if(!el)return;
      el.textContent=text;
      const bg=kind==='ok'?'#166534':kind==='error'?'#991b1b':kind==='warn'?'#92400e':'#374151';
      el.style.background=bg;
    }catch(e){}
  }
  function toast(msg,type){try{if(typeof window.showToast==='function')window.showToast(msg,type||'info');}catch(e){}}
  function validConfig(){
    return !!(cfg.enabled!==false && /^https:\/\/[a-z0-9-]+\.supabase\.co(?:\.[a-z]{2,})?$/i.test(String(cfg.url||'')) && cfg.publishableKey && !String(cfg.publishableKey).includes('YOUR_'));
  }
  function sb(){if(!validConfig()||!window.IslandClashSupabaseDatabase)return null;return window.IslandClashSupabaseDatabase.getClient();}
  function getLocal(key){try{return localStorage.getItem(key);}catch(e){return null;}}
  function setLocal(key,value){try{localStorage.setItem(key,String(value??''));return true;}catch(e){return false;}}
  function localItems(){
    const out={};
    try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('ic_'))out[k]=localStorage.getItem(k)??'';}}catch(e){console.warn('Island Clash: lokale gegevens lezen mislukt',e);}
    return out;
  }
  function persistPending(){
    try{localStorage.setItem(PENDING_KEY,JSON.stringify([...pending.entries()]));}catch(e){console.warn('Island Clash: wachtrij kon niet lokaal bewaard worden',e);}
  }
  function restorePending(){
    try{const raw=localStorage.getItem(PENDING_KEY);const rows=raw?JSON.parse(raw):[];if(Array.isArray(rows))rows.forEach(p=>{if(Array.isArray(p)&&p.length===2&&String(p[0]).startsWith('ic_'))pending.set(String(p[0]),String(p[1]??''));});}catch(e){console.warn('Island Clash: wachtrij herstellen mislukt',e);}
  }
  function parseJSON(s){try{return JSON.parse(String(s));}catch(e){return undefined;}}
  function mergeValues(localValue,cloudValue,preferLocal=false){
    const local=parseJSON(localValue), cloud=parseJSON(cloudValue);
    if(Array.isArray(local)&&Array.isArray(cloud)){
      const result=cloud.slice();
      for(const item of local){
        const duplicateIndex=result.findIndex(existing=>{
          if(!item||!existing||typeof item!=='object'||typeof existing!=='object')return item===existing;
          return (item.id!=null&&existing.id!=null&&String(item.id)===String(existing.id)) ||
            (item.username&&existing.username&&String(item.username).toLowerCase()===String(existing.username).toLowerCase()) ||
            (item.loginCode&&existing.loginCode&&String(item.loginCode).toUpperCase()===String(existing.loginCode).toUpperCase());
        });
        if(duplicateIndex<0)result.push(item);
        else if(preferLocal)result[duplicateIndex]=item;
      }
      return JSON.stringify(result);
    }
    if(local&&cloud&&typeof local==='object'&&typeof cloud==='object'&&!Array.isArray(local)&&!Array.isArray(cloud)){
      // Cloud is authoritative normally; when a local save was queued, local conflicts win.
      return JSON.stringify(preferLocal?{...cloud,...local}:{...local,...cloud});
    }
    return String(preferLocal?(localValue??cloudValue??''):(cloudValue??localValue??''));
  }
  async function readAll(){
    const client=sb();if(!client)throw new Error('Supabase is niet ingesteld.');
    const {data,error}=await client.from(cfg.stateTable||'ic_global_state').select('key,value,updated_at').like('key','ic_%');
    if(error)throw error;return data||[];
  }
  async function writeRows(rows){
    const client=sb();if(!client)throw new Error('Supabase is niet ingesteld.');
    if(!rows.length)return true;
    const payload=rows.map(x=>({key:x.key,value:String(x.value??''),updated_at:new Date().toISOString()}));
    const {error}=await client.from(cfg.stateTable||'ic_global_state').upsert(payload,{onConflict:'key'});
    if(error)throw error;return true;
  }
  function queueSave(key,value){
    key=String(key||'');if(!key.startsWith('ic_'))return;
    pending.set(key,String(value??''));persistPending();
    if(!validConfig()){
      setStatus('⚠️ Supabase niet ingesteld — alleen lokaal', 'warn');
      return;
    }
    clearTimeout(saveTimer);saveTimer=setTimeout(flush,450);
    setStatus('☁️ Wijzigingen klaar om te synchroniseren…','pending');
  }
  async function flush(){
    clearTimeout(saveTimer);saveTimer=null;
    if(!pending.size){if(status.connected)setStatus('☁️ Supabase verbonden · opgeslagen','ok');return true;}
    if(!validConfig()){setStatus('⚠️ Supabase niet ingesteld — alleen lokaal','warn');return false;}
    const snapshot=[...pending.entries()].map(([key,value])=>({key,value}));
    status.saving=true;setStatus('☁️ Opslaan in Supabase…','pending');
    try{
      await writeRows(snapshot);
      for(const row of snapshot)if(pending.get(row.key)===row.value)pending.delete(row.key);
      persistPending();status.connected=true;status.saving=false;status.lastSuccess=new Date().toISOString();status.lastError=null;
      setStatus(`☁️ Supabase verbonden · ${pending.size?pending.size+' wijzigingen wachten':'alles opgeslagen'}` ,pending.size?'pending':'ok');
      return pending.size===0;
    }catch(e){
      status.saving=false;status.connected=false;status.lastError=String(e?.message||e);persistPending();
      console.error('Island Clash Supabase save:',e);
      setStatus('❌ Supabase opslaan mislukt — '+String(e?.message||'controleer configuratie/policies').slice(0,100),'error');
      return false;
    }
  }
  function applyRows(rows){
    if(!Array.isArray(rows))return;
    rows.forEach(row=>{const key=String(row?.key||'');if(!key.startsWith('ic_')||pending.has(key))return;setLocal(key,String(row.value??''));});
  }
  async function syncToCloud(keys){
    const data=localItems(),wanted=Array.isArray(keys)?keys:null;
    const rows=Object.entries(data).filter(([key])=>!wanted||wanted.includes(key)).map(([key,value])=>({key,value}));
    await writeRows(rows);return true;
  }
  async function syncFromCloud(){const rows=await readAll();applyRows(rows);return{found:rows.length>0,count:rows.length};}
  async function syncNow(){
    if(!validConfig())return false;
    const ok=await flush();
    if(!ok)return false;
    // Upload alleen lokale sleutels die nog niet in de cloud staan; schrijf geen verouderde hele cache over de cloud.
    const remote=await readAll(),present=new Set(remote.map(r=>r.key)),local=localItems(),missing=[];
    for(const [key,value] of Object.entries(local))if(!present.has(key))missing.push({key,value});
    if(missing.length)await writeRows(missing);
    status.connected=true;status.lastSuccess=new Date().toISOString();setStatus('☁️ Supabase verbonden · alles opgeslagen','ok');return true;
  }
  async function boot(){
    if(bootPromise)return bootPromise;
    bootPromise=(async()=>{
      restorePending();
      if(!validConfig()){
        status.configured=false;
        console.warn('Island Clash Supabase: vul de echte project-URL en publishable key in public/supabase-config.js in.');
        setStatus('⚠️ Supabase niet ingesteld — alleen lokaal','warn');
        return{enabled:false,reason:'missing-config'};
      }
      if(!sb()){
        setStatus('❌ Supabase-client ontbreekt','error');
        return{enabled:false,reason:'missing-client'};
      }
      status.configured=true;setStatus('☁️ Verbinden met Supabase…','pending');
      try{
        let remote=await readAll();
        let local=localItems();
        const remoteMap=new Map(remote.map(r=>[r.key,String(r.value??'')]));
        const firstSync=getLocal(MIGRATED_KEY)!=='1';
        let runtimeChanged=false;

        if(remote.length===0){
          // Eerste apparaat: stuur de huidige lokale state naar Supabase.
          for(const [key,value] of Object.entries(local))if(!pending.has(key))pending.set(key,value);
          persistPending();
          await flush();
          if(pending.size===0)setLocal(MIGRATED_KEY,'1');
          status.connected=pending.size===0;booted=true;installHooks();
          setStatus(pending.size?'⚠️ Cloud-sync wacht op verbinding':'☁️ Eerste opslag naar Supabase voltooid',pending.size?'warn':'ok');
          return{enabled:true,firstSync:true,pending:pending.size};
        }

        if(firstSync){
          // Eenmalige migratie per browser: merge lokale-only accounts/klassen/vakken met clouddata,
          // en bewaar records die lokaal bestaan maar nog niet in Supabase staan.
          const allKeys=new Set([...Object.keys(local),...remoteMap.keys(),...pending.keys()]);
          for(const key of allKeys){
            if(!key.startsWith('ic_'))continue;
            const localValue=local[key];
            const cloudValue=remoteMap.get(key);
            let desired;
            if(cloudValue!==undefined&&localValue!==undefined)desired=mergeValues(localValue,cloudValue,pending.has(key));
            else if(pending.has(key))desired=pending.get(key);
            else if(cloudValue!==undefined)desired=cloudValue;
            else desired=localValue;
            if(desired===undefined)continue;
            if(cloudValue===undefined||String(desired)!==String(cloudValue))pending.set(key,String(desired));
            if(localValue!==String(desired))runtimeChanged=true;
            setLocal(key,String(desired));
          }
          persistPending();
          if(pending.size)await flush();
          if(pending.size===0)setLocal(MIGRATED_KEY,'1');
        }else{
          // Later visits: cloud is authoritative; keep unsent local edits in pending queue.
          const changed=remote.some(row=>!pending.has(row.key)&&getLocal(row.key)!==String(row.value??''));
          runtimeChanged=changed;
          applyRows(remote);
          local=localItems();
          for(const [key,value] of Object.entries(local))if(!remoteMap.has(key)&&!pending.has(key))pending.set(key,value);
          persistPending();
          if(pending.size)await flush();
        }

        status.connected=pending.size===0;status.lastError=null;status.lastSuccess=status.lastSuccess||new Date().toISOString();booted=true;installHooks();
        status.cloudKeys=remote.length;status.localKeys=Object.keys(localItems()).length;
        setStatus(pending.size?'⚠️ '+pending.size+' wijzigingen wachten op Supabase':'☁️ Supabase verbonden · alles opgeslagen',pending.size?'warn':'ok');
        if(runtimeChanged){setTimeout(()=>location.reload(),200);}
        return{enabled:true,count:remote.length,pending:pending.size};
      }catch(e){
        status.connected=false;status.lastError=String(e?.message||e);booted=true;installHooks();
        console.error('Island Clash Supabase boot:',e);
        setStatus('❌ Supabase fout: '+String(e?.message||'controleer URL, sleutel, tabel en policies').slice(0,105),'error');
        toast('☁️ Supabase werkt niet: '+String(e?.message||'controleer configuratie en SQL').slice(0,140),'error');
        return{enabled:false,error:e};
      }
    })();
    return bootPromise;
  }
  async function pull(){
    if(pulling||!validConfig())return;
    pulling=true;
    try{
      const rows=await readAll();
      // Meet veranderingen VOORDAT clouddata de lokale waarde vervangt.
      const changed=rows.some(row=>!pending.has(row.key)&&getLocal(row.key)!==String(row.value??''));
      applyRows(rows);
      const have=new Set(rows.map(r=>r.key));
      for(const [key,value] of Object.entries(localItems()))if(!have.has(key)&&!pending.has(key))pending.set(key,value);
      persistPending();
      if(pending.size)await flush();
      status.connected=pending.size===0;status.cloudKeys=rows.length;status.localKeys=Object.keys(localItems()).length;
      if(changed&&booted){setStatus('☁️ Nieuwe gegevens geladen · vernieuwen…','pending');location.reload();}
      else if(status.connected)setStatus('☁️ Supabase verbonden · alles opgeslagen','ok');
    }catch(e){status.connected=false;status.lastError=String(e?.message||e);console.error('Supabase pull:',e);setStatus('❌ Cloud-sync fout: '+String(e?.message||'controleer Supabase').slice(0,100),'error');}
    finally{pulling=false;}
  }
  function installHooks(){
    if(window.__islandClashSupabaseHooks)return;window.__islandClashSupabaseHooks=true;
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flush();else{flush();pull();}});
    window.addEventListener('pagehide',()=>{flush();});
    window.addEventListener('online',()=>{flush();pull();});
    setInterval(()=>flush(),5000);
    setInterval(()=>pull(),12000);
  }
  window.islandCloud={scheduleSync:queueSave,syncNow,pull,isReady:()=>booted,status:()=>({...status,pending:pending.size})};
  window.IslandClashCloud={enabled:validConfig,syncFromCloud,syncToCloud,queueSave,syncNow,pull,boot,status:()=>({...status,pending:pending.size})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{ensureBadge();boot();},{once:true});
  else setTimeout(()=>{ensureBadge();boot();},0);
})();
