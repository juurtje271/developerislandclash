/* Island Clash — Supabase database bridge
 * Houdt de Supabase-client apart van de synchronisatielogica.
 */
(function(){
  'use strict';
  let client=null;
  const cfg=window.ISLAND_CLASH_SUPABASE||{};
  function getClient(){
    if(client)return client;
    if(!window.supabase || typeof window.supabase.createClient!=='function') return null;
    if(!cfg.url || !cfg.publishableKey || String(cfg.publishableKey).includes('YOUR_')) return null;
    client=window.supabase.createClient(cfg.url,cfg.publishableKey,{
      auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
    });
    return client;
  }
  function isConfigured(){return !!getClient();}
  async function selectState(table){
    const sb=getClient(); if(!sb) throw new Error('Supabase is niet geconfigureerd.');
    const {data,error}=await sb.from(table||cfg.stateTable||'ic_global_state').select('key,value,updated_at').like('key','ic_%');
    if(error)throw error; return data||[];
  }
  async function upsertState(rows,table){
    const sb=getClient(); if(!sb) throw new Error('Supabase is niet geconfigureerd.');
    const payload=(rows||[]).map(x=>({key:x.key,value:String(x.value??''),updated_at:x.updated_at||new Date().toISOString()}));
    if(!payload.length)return {data:[],error:null};
    return sb.from(table||cfg.stateTable||'ic_global_state').upsert(payload,{onConflict:'key'}).select('key,value,updated_at');
  }
  window.IslandClashSupabaseDatabase={getClient,isConfigured,selectState,upsertState,table:()=>cfg.stateTable||'ic_global_state'};
})();
