/* Island Clash — centrale Supabase synchronisatie
 * Alle bestaande ic_* opslag wordt centraal opgeslagen in Supabase.
 * De app blijft haar bestaande localStorage-opslag gebruiken als runtime-cache,
 * terwijl Supabase zorgt voor gedeelde data tussen apparaten.
 */
(function(){
  'use strict';
  const cfg=window.ISLAND_CLASH_SUPABASE||{};
  let saveTimer=null;
  let bootPromise=null;
  let booted=false;
  let pulling=false;
  const pending=new Map();

  function toast(msg,type){
    try{ if(typeof window.showToast==='function') window.showToast(msg,type||'info'); }catch(e){}
  }

  function validConfig(){
    return !!(cfg.enabled!==false && /^https:\/\/[a-z0-9-]+\.supabase\.co(?:\.[a-z]{2,})?$/i.test(String(cfg.url||'')) && cfg.publishableKey && !String(cfg.publishableKey).includes('YOUR_'));
  }
  function sb(){
    if(!validConfig() || !window.IslandClashSupabaseDatabase) return null;
    return window.IslandClashSupabaseDatabase.getClient();
  }
  function localItems(){
    const data={};
    try{
      for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i);
        if(key&&key.startsWith('ic_')) data[key]=localStorage.getItem(key)??'';
      }
    }catch(e){ console.warn('Supabase lokale opslag uitlezen:',e); }
    return data;
  }
  function applyRows(rows){
    if(!Array.isArray(rows)) return;
    try{
      rows.forEach(row=>{
        const key=String(row?.key||'');
        if(!key.startsWith('ic_') || pending.has(key)) return;
        if(row.value===null || row.value===undefined) localStorage.removeItem(key);
        else localStorage.setItem(key,String(row.value));
      });
    }catch(e){ console.warn('Supabase clouddata toepassen:',e); }
  }
  async function readAll(){
    const client=sb(); if(!client) return [];
    const {data,error}=await client.from(cfg.stateTable||'ic_global_state').select('key,value,updated_at').like('key','ic_%');
    if(error) throw error;
    return data||[];
  }
  async function writeRows(rows){
    const client=sb(); if(!client || !rows.length) return false;
    const payload=rows.map(x=>({key:x.key,value:String(x.value??''),updated_at:new Date().toISOString()}));
    const {error}=await client.from(cfg.stateTable||'ic_global_state').upsert(payload,{onConflict:'key'});
    if(error) throw error;
    return true;
  }
  async function syncFromCloud(){
    const rows=await readAll();
    applyRows(rows);
    return {found:rows.length>0,count:rows.length};
  }
  async function syncToCloud(keys){
    const list=[];
    const wanted=Array.isArray(keys)?keys:null;
    const data=localItems();
    Object.entries(data).forEach(([key,value])=>{
      if(!wanted || wanted.includes(key)) list.push({key,value});
    });
    return writeRows(list);
  }
  async function flush(){
    saveTimer=null;
    if(!pending.size) return;
    const rows=[...pending.entries()].map(([key,value])=>({key,value}));
    pending.clear();
    try{
      await writeRows(rows);
    }catch(e){
      rows.forEach(r=>pending.set(r.key,r.value));
      console.error('Island Clash Supabase save:',e);
      toast('☁️ Database opslaan mislukt. Controleer je Supabase-configuratie.','error');
    }
  }
  function queueSave(key,value){
    if(!validConfig()) return;
    pending.set(String(key),String(value??''));
    clearTimeout(saveTimer);
    saveTimer=setTimeout(flush,900);
  }
  async function syncNow(){
    if(!validConfig()) return false;
    const pendingKeys=[...pending.keys()];
    if(pendingKeys.length) await flush();
    return syncToCloud();
  }
  async function pull(){
    if(pulling || !validConfig()) return;
    pulling=true;
    try{
      const rows=await readAll();
      applyRows(rows);
      // De app gebruikt runtime-variabelen; alleen bij echte wijzigingen wordt de pagina ververst.
      // Dit gebeurt bewust alleen wanneer de lokale data niet dezelfde waarde bevat.
      let changed=false;
      for(const row of rows){
        if(pending.has(row.key)) continue;
        let current=null;
        try{current=localStorage.getItem(row.key);}catch(e){}
        if(String(current??'')!==String(row.value??'')){changed=true;break;}
      }
      if(changed && booted){
        try{sessionStorage.setItem('ic_supabase_refresh','1');}catch(e){}
        location.reload();
      }
    }catch(e){ console.warn('Supabase pull:',e); }
    finally{pulling=false;}
  }
  function installHooks(){
    if(window.__islandClashSupabaseHooks)return;
    window.__islandClashSupabaseHooks=true;
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden') flush();});
    window.addEventListener('pagehide',()=>{try{flush();}catch(e){}});
    setInterval(()=>flush(),8000);
    setInterval(()=>pull(),15000);
  }
  async function boot(){
    if(bootPromise)return bootPromise;
    bootPromise=(async()=>{
      if(!validConfig()){
        console.info('Island Clash Supabase: vul supabase-config.js in.');
        return {enabled:false};
      }
      if(!sb()){
        console.warn('Island Clash Supabase: supabase-js is niet geladen.');
        return {enabled:false};
      }
      try{
        const remote=await readAll();
        const alreadyRefreshed=(()=>{try{return sessionStorage.getItem('ic_supabase_refresh')==='1';}catch(e){return false;}})();
        if(remote.length){
          if(!alreadyRefreshed){
            applyRows(remote);
            try{sessionStorage.setItem('ic_supabase_refresh','1');}catch(e){}
            toast('☁️ Cloudgegevens geladen. Island Clash wordt vernieuwd...','success');
            setTimeout(()=>location.reload(),180);
            return {enabled:true,reloaded:true};
          }
        }else{
          await syncToCloud();
          try{sessionStorage.setItem('ic_supabase_refresh','1');}catch(e){}
          toast('☁️ Island Clash is gekoppeld aan Supabase.','success');
        }
        booted=true;
        installHooks();
        return {enabled:true};
      }catch(e){
        console.error('Island Clash Supabase boot:',e);
        toast('☁️ Supabase kan niet worden bereikt. Lokale opslag blijft actief.','warning');
        booted=true;
        installHooks();
        return {enabled:true,error:e};
      }
    })();
    return bootPromise;
  }

  window.islandCloud={scheduleSync:queueSave,syncNow,pull,isReady:()=>booted};
  window.IslandClashCloud={enabled:validConfig,syncFromCloud,syncToCloud,queueSave:queueSave,pull,syncNow,boot};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else setTimeout(boot,0);
})();
