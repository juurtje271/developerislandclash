/* Island Clash — losse Supabase Auth login-helper
 * Deze helper kan ook op een andere webpagina worden gekoppeld.
 */
(function(){
  'use strict';
  const cfg=window.ISLAND_CLASH_SUPABASE||{};
  let client=null;
  function getClient(){
    if(client)return client;
    if(!window.supabase || typeof window.supabase.createClient!=='function') throw new Error('supabase-js is niet geladen.');
    if(!cfg.url || !cfg.publishableKey || String(cfg.publishableKey).includes('YOUR_')) throw new Error('Vul supabase-config.js in.');
    client=window.supabase.createClient(cfg.url,cfg.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    return client;
  }
  function makeEmail(username){
    const u=String(username||'').trim().toLowerCase();
    if(u.includes('@'))return u;
    const domain=String(cfg.loginEmailDomain||'islandclash.local').replace(/^@/,'');
    return `${u}@${domain}`;
  }
  async function login(username,password){return (await getClient().auth.signInWithPassword({email:makeEmail(username),password:String(password||'')}));}
  async function signup(username,password,metadata){return (await getClient().auth.signUp({email:makeEmail(username),password:String(password||''),options:{data:metadata||{}}}));}
  async function logout(){return (await getClient().auth.signOut());}
  async function currentSession(){return (await getClient().auth.getSession());}
  function onAuthStateChange(callback){return getClient().auth.onAuthStateChange(callback);}
  window.IslandClashSupabaseLogin={getClient,makeEmail,login,signup,logout,currentSession,onAuthStateChange};
})();
