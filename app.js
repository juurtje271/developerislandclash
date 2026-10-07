// ════════════════════════════════════════════════════════
// STORAGE & DEFAULTS
// ════════════════════════════════════════════════════════
const DEFAULT_ACCOUNTS = [
  {id:'teacher-default',name:'Docent',username:'docent',password:'docent1',role:'docent',klas:'Alle',gems:0,elixir:0,xp:0,trophies:0,inventory:{},redeemedCodes:[],quizDone:{},quizScores:{},createdAt:'2025-01-01',loginCode:null},
];

function buildAllQuizzes(){
  const bank=[
    {q:'Wat is de hoofdstad van Nederland?',o:['Amsterdam','Rotterdam','Den Haag','Utrecht'],c:0},
    {q:'Welk land heeft de meeste eilanden?',o:['Noorwegen','Zweden','Finland','Canada'],c:1},
    {q:'Wat is de langste rivier ter wereld?',o:['Amazone','Nijl','Mississippi','Yangtze'],c:1},
    {q:'Welk continent is het grootste?',o:['Afrika','Noord-Amerika','Azië','Europa'],c:2},
    {q:'In welk land ligt de Everest?',o:['India','China','Nepal','Tibet'],c:2},
    {q:'Hoofdstad van Australië?',o:['Sydney','Melbourne','Canberra','Perth'],c:2},
    {q:'Welke oceaan is de grootste?',o:['Atlantisch','Indisch','Stil','Arctisch'],c:2},
    {q:'Hoeveel landen heeft Afrika?',o:['44','54','64','74'],c:1},
    {q:'In welke stad staat de Eiffeltoren?',o:['Brussel','Londen','Berlijn','Parijs'],c:3},
    {q:'Hoofdstad van Japan?',o:['Osaka','Tokio','Kyoto','Hiroshima'],c:1},
    {q:'Hoeveel sterren heeft de EU-vlag?',o:['10','12','15','20'],c:1},
    {q:'Welk land is het grootste ter wereld?',o:['Canada','China','USA','Rusland'],c:3},
    {q:'Hoofdstad van Brazilië?',o:['Rio de Janeiro','São Paulo','Brasília','Buenos Aires'],c:2},
    {q:'Welke zee ligt tussen Europa en Afrika?',o:['Rode Zee','Zwarte Zee','Middellandse Zee','Kaspische Zee'],c:2},
    {q:'Hoeveel planeten heeft ons zonnestelsel?',o:['7','8','9','10'],c:1},
    {q:'Wat is het symbool voor water?',o:['HO','H2O','OH2','H3O'],c:1},
    {q:'Welk element heeft symbool "Au"?',o:['Zilver','Koper','Goud','IJzer'],c:2},
    {q:'Hoe snel reist licht (km/s)?',o:['150.000','299.792','400.000','500.000'],c:1},
    {q:'Hoeveel botten heeft een volwassen mens?',o:['196','206','216','226'],c:1},
    {q:'Wat is de hardste stof op aarde?',o:['IJzer','Staal','Diamant','Graniet'],c:2},
    {q:'Welke planeet is dichtst bij de zon?',o:['Venus','Mercurius','Aarde','Mars'],c:1},
    {q:'Welk gas ademen wij uit?',o:['Zuurstof','Stikstof','CO2','Waterstof'],c:2},
    {q:'Hoeveel tanden heeft een volwassene?',o:['28','30','32','34'],c:2},
    {q:'Wat is de kleinste planeet?',o:['Mars','Venus','Mercurius','Pluto'],c:2},
    {q:'Wie ontdekte de zwaartekracht?',o:['Einstein','Newton','Galileo','Darwin'],c:1},
    {q:'Wat is 15 × 8?',o:['100','120','110','130'],c:1},
    {q:'Wortel van 144?',o:['11','12','13','14'],c:1},
    {q:'Hoeveel graden per hoek gelijkzijdige driehoek?',o:['45°','60°','90°','30°'],c:1},
    {q:'Hoeveel uur heeft een week?',o:['148','156','168','172'],c:2},
    {q:'Pi afgerond op 2 decimalen?',o:['3.12','3.14','3.16','3.18'],c:1},
    {q:'Wat is 2 tot de macht 10?',o:['512','1024','2048','256'],c:1},
    {q:'Hoeveel seconden heeft een dag?',o:['64.000','76.400','86.400','96.000'],c:2},
    {q:'Kwadraat van 13?',o:['156','169','175','181'],c:1},
    {q:'Hoeveel priemgetallen onder 20?',o:['6','7','8','9'],c:2},
    {q:'In welk jaar begon WO2?',o:['1937','1938','1939','1940'],c:2},
    {q:'Wie ontdekte Amerika in 1492?',o:['Vasco da Gama','Columbus','Magelaan','Cook'],c:1},
    {q:'Welke beschaving bouwde de piramides?',o:['Grieken','Romeinen','Egyptenaren','Azteken'],c:2},
    {q:'Val van de Berlijnse muur?',o:['1987','1988','1989','1990'],c:2},
    {q:'Wie schreef Romeo en Julia?',o:['Dickens','Shakespeare','Tolkien','Hugo'],c:1},
    {q:'Eerste hoofdstad van de USA?',o:['Washington','Philadelphia','New York','Boston'],c:2},
    {q:'Mens op de maan?',o:['1965','1967','1969','1971'],c:2},
    {q:'Wie schilderde de Mona Lisa?',o:['Picasso','Da Vinci','Rembrandt','Van Gogh'],c:1},
    {q:'Wat betekent HTML?',o:['HyperText Markup Language','HyperText Machine Language','HighText Markup Language','HyperTool Markup Language'],c:0},
    {q:'Binaire waarde van 10?',o:['0010','1000','1010','1100'],c:2},
    {q:'Wie richtte Microsoft op?',o:['Steve Jobs','Mark Zuckerberg','Bill Gates','Larry Page'],c:2},
    {q:'Wat is een CPU?',o:['Opslagchip','Grafische kaart','Processor','Geheugen'],c:2},
    {q:'Welke taal maakte Guido van Rossum?',o:['Java','Python','Ruby','Swift'],c:1},
    {q:'Hoeveel bits is 1 byte?',o:['4','6','8','16'],c:2},
    {q:'Wie maakte de iPhone?',o:['Samsung','Google','Apple','Sony'],c:2},
    {q:'Hoeveel harten heeft een inktvis?',o:['1','2','3','4'],c:2},
    {q:'Welk dier legt het grootste ei?',o:['Struisvogel','Krokodil','Python','Schildpad'],c:0},
    {q:'Kleur bloed van een inktvis?',o:['Rood','Blauw','Groen','Kleurloos'],c:1},
    {q:'Hoeveel vleugels heeft een vlinder?',o:['2','4','6','8'],c:1},
    {q:'Snelste vis ter zee?',o:['Tonijn','Zwaardvis','Zeilvis','Dolfijn'],c:2},
    {q:'Hoeveel benen heeft een spin?',o:['6','8','10','12'],c:1},
    {q:'Baby-kangaroe heet?',o:['Kit','Cub','Joey','Pup'],c:2},
    {q:'Hoeveel kleuren heeft een regenboog?',o:['5','6','7','8'],c:2},
    {q:'Valuta van Japan?',o:['Won','Yen','Yuan','Ringgit'],c:1},
    {q:'Welk land heeft de grootste bevolking?',o:['India','China','USA','Indonesië'],c:0},
    {q:'Hoeveel minuten heeft een dag?',o:['1200','1400','1440','1500'],c:2},
    {q:'Kleur van een smaragd?',o:['Rood','Blauw','Groen','Geel'],c:2},
    {q:'Symbool van Australië?',o:['Koala','Krokodil','Kangoeroe','Emoe'],c:2},
    {q:'Meest gesproken taal ter wereld?',o:['Engels','Spaans','Mandarijn','Hindi'],c:2},
    {q:'Rood + geel mengen = ?',o:['Paars','Groen','Oranje','Bruin'],c:2},
    {q:'Chemische formule van zout?',o:['KCl','NaCl','CaCl','MgCl'],c:1},
    {q:'Hoeveel continenten heeft de aarde?',o:['5','6','7','8'],c:2},
    {q:'Vloeibaar metaal bij kamertemperatuur?',o:['Lood','Tin','Kwik','Bismut'],c:2},
    {q:'Wie maakte de gloeilamp?',o:['Tesla','Edison','Bell','Watt'],c:1},
    {q:'iPhone gepresenteerd in welk jaar?',o:['2005','2007','2009','2011'],c:1},
    {q:'Hoeveel speelkaarten in een standaardpak?',o:['48','52','54','56'],c:1},
    {q:'Afstand aarde-maan (km)?',o:['184.000','284.000','384.000','484.000'],c:2},
    {q:'Hoeveel tanden heeft een kind (melkgebit)?',o:['16','18','20','22'],c:2},
    {q:'Lego is uitgevonden in welk land?',o:['Nederland','Zweden','Denemarken','Noorwegen'],c:2},
    {q:'Hoeveel noten heeft een octaaf?',o:['5','7','8','12'],c:2},
    {q:'Een piano heeft hoeveel toetsen?',o:['76','80','88','92'],c:2},
    {q:'Hoeveel spelers in een voetbalteam?',o:['9','10','11','12'],c:2},
    {q:'Hoe lang duurt een voetbalwedstrijd?',o:['60','80','90','100'],c:2},
    {q:'Hoeveel WK-titels heeft Brazilië?',o:['3','4','5','6'],c:2},
    {q:'Hoeveel letters in het Nederlandse alfabet?',o:['24','25','26','27'],c:2},
    {q:'Synoniem voor "blij"?',o:['Verdrietig','Boos','Gelukkig','Moe'],c:2},
    {q:'Wat is een palindroom?',o:['Woord dat achterstevoren hetzelfde is','Woord met dubbele letters','Woord van 7 letters','Soort rijm'],c:0},
    {q:'Welk zoogdier kan vliegen?',o:['Vliegend hert','Vleermuis','Vliegende eekhoorn','Buideleekhoorn'],c:1},
    {q:'Wat is DNA?',o:['Soort suiker','Erfelijk materiaal','Type eiwit','Hersencel'],c:1},
    {q:'Hoeveel chromosomen heeft een mens?',o:['23','44','46','48'],c:2},
    {q:'Wat is fotosynthese?',o:['Voortplanting','Lichtopname door planten','Dierenspijsvertering','Klimaatproces'],c:1},
    {q:'Snelste vogel ter wereld?',o:['Adelaar','Albatros','Slechtvalk','Kolibrie'],c:2},
    {q:'Wie maakte de eerste telefoon?',o:['Edison','Bell','Morse','Tesla'],c:1},
    {q:'Hoofdstad van Canada?',o:['Toronto','Montreal','Ottawa','Vancouver'],c:2},
    {q:'Welk land ligt grotendeels onder zeeniveau?',o:['België','Duitsland','Nederland','Denemarken'],c:2},
    {q:'Hoe heet de buitenste laag van de aarde?',o:['Mantel','Kern','Korst','Aardlagen'],c:2},
    {q:'In welk jaar vond de Franse Revolutie plaats?',o:['1776','1789','1804','1815'],c:1},
    {q:'Hoeveel graden heeft een cirkel?',o:['180°','270°','360°','400°'],c:2},
    {q:'Wat is de oppervlakte van Nederland?',o:['31.000 km²','41.543 km²','55.000 km²','65.000 km²'],c:1},
    {q:'Welk orgaan maakt insuline?',o:['Lever','Long','Alvleesklier','Nier'],c:2},
    {q:'Snelste landmachine ooit?',o:['Bugatti Chiron','Thrust SSC','Koenigsegg','McLaren F1'],c:1},
    {q:'Hoofdstad van Spanje?',o:['Barcelona','Madrid','Sevilla','Valencia'],c:1},
    {q:'Hoeveel zijden heeft een achthoek?',o:['6','7','8','9'],c:2},
    {q:'Welk metaal is het lichtste?',o:['Aluminium','Lithium','Magnesium','Titanium'],c:1},
    {q:'In welke zee ligt Curaçao?',o:['Middellandse Zee','Caribische Zee','Stille Oceaan','Golf van Mexico'],c:1},
    {q:'Hoeveel weken heeft een jaar?',o:['48','50','52','54'],c:2},
  ];
  const q={};
  for(let i=0;i<500;i++){
    const picks=[];
    const base=(i*7)%bank.length;
    for(let j=0;j<5;j++) picks.push({...bank[(base+j*3)%bank.length]});
    q[i]=picks;
  }
  return q;
}

// Veilige opslag voor gedownloade HTML-bestanden. Sommige mobiele browsers blokkeren
// localStorage op file://-pagina's. De app blijft dan gewoon werken met geheugenopslag.
let storageMemory={};
function safeStorageGet(key){
  try{return localStorage.getItem(key);}catch(e){return Object.prototype.hasOwnProperty.call(storageMemory,key)?storageMemory[key]:null;}
}
function safeStorageSet(key,value){
  try{localStorage.setItem(key,value); storageMemory[key]=value; if(window.islandCloud&&typeof window.islandCloud.scheduleSync==='function') window.islandCloud.scheduleSync(key,value); return true;}catch(e){storageMemory[key]=value; if(window.islandCloud&&typeof window.islandCloud.scheduleSync==='function') window.islandCloud.scheduleSync(key,value); return false;}
}
function loadOrDefault(key, def){
  try{ const v=safeStorageGet(key); return v?JSON.parse(v):JSON.parse(JSON.stringify(def)); }catch(e){ return JSON.parse(JSON.stringify(def)); }
}
function saveAccounts(){
  try{ safeStorageSet('ic_accounts', JSON.stringify(accounts)); }catch(e){ console.warn('Accounts opslaan:',e); }
}
function saveQuizzes(){
  try{ safeStorageSet('ic_quizzes', JSON.stringify(islandQuizzes)); }catch(e){ console.warn('Quizzen opslaan:',e); }
}
function saveAppSettings(){
  try{ safeStorageSet('ic_settings', JSON.stringify(appSettings)); }catch(e){ console.warn('Instellingen opslaan:',e); }
}
function saveEverything(){
  try{
    if(typeof currentUser!=='undefined' && currentUser?.id && typeof accounts!=='undefined'){
      const i=accounts.findIndex(a=>a.id===currentUser.id);
      if(i>=0) accounts[i]={...accounts[i],...currentUser};
    }
    if(typeof accounts!=='undefined') saveAccounts();
    if(typeof islandQuizzes!=='undefined') saveQuizzes();
    if(typeof islandQuizSets!=='undefined' && typeof saveQuizSets==='function') saveQuizSets();
    if(typeof appSettings!=='undefined') saveAppSettings();
    if(typeof accountGroups!=='undefined' && typeof saveAccountGroups==='function') saveAccountGroups();
    if(typeof teacherAnnouncement!=='undefined') safeStorageSet('ic_teacher_announcement',JSON.stringify(teacherAnnouncement));
    if(typeof teacherGoal!=='undefined') safeStorageSet('ic_teacher_goal',JSON.stringify(teacherGoal));
    if(typeof teacherQuizAssignments!=='undefined') safeStorageSet('ic_teacher_quiz_assignments',JSON.stringify(teacherQuizAssignments));
    if(typeof teacherTests!=='undefined') safeStorageSet('ic_teacher_tests',JSON.stringify(teacherTests));
    if(typeof testSubmissions!=='undefined') safeStorageSet('ic_test_submissions',JSON.stringify(testSubmissions));
    if(typeof quizRewards!=='undefined') safeStorageSet('ic_quiz_rewards',JSON.stringify(quizRewards));
    if(typeof streakSettings!=='undefined') safeStorageSet('ic_streak_settings',JSON.stringify(streakSettings));
    if(typeof shopCatalog!=='undefined') safeStorageSet('ic_shop_catalog',JSON.stringify(shopCatalog));
    if(typeof currentUser!=='undefined' && currentUser?.id){
      const notes=document.getElementById('personal-notes');
      const goal=document.getElementById('personal-goal');
      if(notes) safeStorageSet('ic_notes_'+currentUser.id,notes.value);
      if(goal) safeStorageSet('ic_goal_'+currentUser.id,goal.value.trim());
      if(typeof saveIslandSlots==='function' && currentUser.islandSlots) saveIslandSlots(currentUser.islandSlots);
    }
    safeStorageSet('ic_last_autosave',new Date().toISOString());
  }catch(e){ console.warn('Alles opslaan:',e); }
}

// ════════════════════════════════════════════════════════
// AUTOMATISCHE OPSLAG
// Alles wordt automatisch opgeslagen. Supabase synchroniseert de opslag tussen apparaten.
// ════════════════════════════════════════════════════════
let autoSaveTimer=null;
let autoSaveBusy=false;
let accountGroups=[];
function autoSaveAll(){
  if(autoSaveBusy) return;
  autoSaveBusy=true;
  try{
    saveEverything();
    saveOpenFormDrafts();
  }catch(e){ console.warn('Autosave:',e); }
  finally{ autoSaveBusy=false; }
}
function scheduleAutoSave(){
  clearTimeout(autoSaveTimer);
  autoSaveTimer=setTimeout(autoSaveAll,250);
}
function saveOpenFormDrafts(){
  if(!currentUser)return;
  const ids=['teacher-announcement','teacher-goal','teacher-goal-xp','personal-notes','personal-goal','grade-island-feedback','test-title','test-class'];
  const draft={};
  ids.forEach(id=>{const el=document.getElementById(id);if(el)draft[id]=el.value;});
  safeStorageSet('ic_draft_'+currentUser.id,JSON.stringify(draft));
}
function restoreOpenFormDrafts(){
  if(!currentUser)return;
  const d=loadOrDefault('ic_draft_'+currentUser.id,{});
  Object.entries(d||{}).forEach(([id,val])=>{const el=document.getElementById(id);if(el && !el.value)el.value=val;});
}
function startAutoSave(){
  if(window.__islandClashAutoSaveStarted)return;
  window.__islandClashAutoSaveStarted=true;
  setInterval(autoSaveAll,5000);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')autoSaveAll();});
  window.addEventListener('pagehide',autoSaveAll);
  window.addEventListener('beforeunload',autoSaveAll);
  document.addEventListener('input',e=>{
    if(e.target && ['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) scheduleAutoSave();
  },true);
  document.addEventListener('change',scheduleAutoSave,true);
}
startAutoSave();

const MASTER_DOCENT_USERNAME='docent';
const MASTER_DOCENT_PASSWORD='docent1';

function normalizeMasterDocent(list){
  let arr=Array.isArray(list)?list:[];
  // Verwijder oude admin/beheerder-accounts.
  arr=arr.filter(a=>String(a?.username||'').trim().toLowerCase()!=='admin' && a?.role!=='beheerder');
  // Er is exact één vast docent-account met de vaste gegevens docent/docent1.
  const idx=arr.findIndex(a=>String(a?.username||'').trim().toLowerCase()===MASTER_DOCENT_USERNAME);
  let teacher;
  if(idx>=0){
    teacher={...arr[idx],username:MASTER_DOCENT_USERNAME,password:MASTER_DOCENT_PASSWORD,role:'docent',name:arr[idx].name||'Docent',klas:arr[idx].klas&&arr[idx].klas!=='—'?arr[idx].klas:'Alle',isTeacher:true,permissions:'all'};
  }else{
    teacher={...DEFAULT_ACCOUNTS[0],username:MASTER_DOCENT_USERNAME,password:MASTER_DOCENT_PASSWORD,role:'docent',klas:'Alle',isTeacher:true,permissions:'all'};
  }
  // Voorkom dubbele accounts met dezelfde vaste docent-gebruikersnaam.
  arr=arr.filter((a,i)=>i!==idx && String(a?.username||'').trim().toLowerCase()!==MASTER_DOCENT_USERNAME);
  arr.unshift(teacher);
  return arr;
}

let accounts = normalizeMasterDocent(loadOrDefault('ic_accounts', DEFAULT_ACCOUNTS));
saveAccounts();

let islandQuizzes = loadOrDefault('ic_quizzes', null);
if(!islandQuizzes || Object.keys(islandQuizzes).length < 500){
  islandQuizzes = buildAllQuizzes();
  saveQuizzes();
}

let islandQuizSets = loadOrDefault('ic_quiz_sets', null);
if(!islandQuizSets){
  islandQuizSets = {};
  for(let i=0;i<500;i++){
    islandQuizSets[i]=[{id:'main',title:'Basisquiz',questions:(islandQuizzes[i]||[])}];
  }
  safeStorageSet('ic_quiz_sets',JSON.stringify(islandQuizSets));
}else{
  for(let i=0;i<500;i++){
    if(!Array.isArray(islandQuizSets[i])||!islandQuizSets[i].length) islandQuizSets[i]=[{id:'main',title:'Basisquiz',questions:islandQuizzes[i]||[]}];
  }
}
function saveQuizSets(){safeStorageSet('ic_quiz_sets',JSON.stringify(islandQuizSets));}
function getIslandQuizSets(idx){return Array.isArray(islandQuizSets[idx])?islandQuizSets[idx]:[];}
let appSettings = loadOrDefault('ic_settings', {slots:20, quizUrl:'https://digisprint.nl/quiz'});
let currentUser = null;
let currentLoginRole = 'leerling';

// Migratie/normalisatie voor oudere opgeslagen accounts.
accounts = (Array.isArray(accounts)?accounts:[]).map(a=>({
  coins:0,gems:0,elixir:0,xp:0,trophies:0,disabled:false,inventory:{},redeemedCodes:[],quizDone:{},quizScores:{},islandSlots:{},unlockedIslands:[],streak:{count:0,lastClaim:'',enabled:false},shopOwned:[],activeEffects:{bg:'none',trail:'none',sound:'none',title:'none'},
  klas:'—',role:'leerling',...a
}));
accounts=normalizeMasterDocent(accounts);
saveAccounts();

accountGroups=loadOrDefault('ic_account_groups',[]);
if(!Array.isArray(accountGroups)) accountGroups=[];
function saveAccountGroups(){ safeStorageSet('ic_account_groups',JSON.stringify(accountGroups)); }
function syncLegacyClassesToGroups(){
  const existingNames=new Set(accountGroups.map(g=>String(g.name||'').trim().toLowerCase()));
  accounts.filter(a=>a.role==='leerling'&&a.klas&&a.klas!=='—').forEach(a=>{
    const name=String(a.klas).trim();
    if(!name || existingNames.has(name.toLowerCase())) return;
    accountGroups.push({id:'grp_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),name,type:'klas',createdAt:new Date().toISOString().slice(0,10)});
    existingNames.add(name.toLowerCase());
  });
  saveAccountGroups();
}
syncLegacyClassesToGroups();

let teacherAnnouncement = loadOrDefault('ic_teacher_announcement', '');
let teacherGoal = loadOrDefault('ic_teacher_goal', {text:'',xp:100});
let teacherQuizAssignments = loadOrDefault('ic_teacher_quiz_assignments', []);
let teacherTests = loadOrDefault('ic_teacher_tests', []);
let testSubmissions = loadOrDefault('ic_test_submissions', []);
let activeTestId = null;
let quizRewards = loadOrDefault('ic_quiz_rewards', {});
let streakSettings = loadOrDefault('ic_streak_settings', {enabled:false,target:7,reward:25});
let shopCatalog = loadOrDefault('ic_shop_catalog', null);
if(!shopCatalog){ shopCatalog=[
 {id:'bg-stars',type:'bg',name:'Sterrennacht',price:80,icon:'🌌',desc:'Een rustige sterrenachtergrond.',value:'bg-stars'},
 {id:'bg-neon',type:'bg',name:'Neon Grid',price:120,icon:'🌃',desc:'Een futuristische neon-achtergrond.',value:'bg-neon'},
 {id:'bg-ocean',type:'bg',name:'Oceaan',price:100,icon:'🌊',desc:'Een blauwe oceaanlook.',value:'bg-ocean'},
 {id:'trail-fire',type:'trail',name:'Vuur Trail',price:90,icon:'🔥',desc:'Een vurige trail achter je muis.',value:'trail-fire'},
 {id:'trail-stars',type:'trail',name:'Sterren Trail',price:110,icon:'✨',desc:'Sterretjes volgen je cursor.',value:'trail-stars'},
 {id:'trail-bubbles',type:'trail',name:'Bubbels Trail',price:70,icon:'🫧',desc:'Kleine bubbels rond je muis.',value:'trail-bubbles'},
 {id:'sound-pop',type:'sound',name:'Pop Clicks',price:65,icon:'🔊',desc:'Een zachte pop bij klikken.',value:'sound-pop'},
 {id:'sound-coin',type:'sound',name:'Coin Clicks',price:95,icon:'🪙',desc:'Een vrolijk muntgeluid bij klikken.',value:'sound-coin'},
 {id:'sound-soft',type:'sound',name:'Soft Clicks',price:55,icon:'🎵',desc:'Een subtiel klikgeluid.',value:'sound-soft'},
 {id:'title-elite',type:'title',name:'Elite',price:250,icon:'🏆',desc:'De titel Elite naast je naam.',value:'Elite'},
 {id:'title-explorer',type:'title',name:'Eilandverkenner',price:180,icon:'🧭',desc:'Laat zien dat je veel eilanden verkent.',value:'Eilandverkenner'},
 {id:'title-builder',type:'title',name:'Master Builder',price:220,icon:'🏗️',desc:'Voor echte bouwers.',value:'Master Builder'}
 ]; saveShopCatalog(); }
function saveShopCatalog(){safeStorageSet('ic_shop_catalog',JSON.stringify(shopCatalog));}
const NEW_SHOP_ITEMS=[
 {id:'sound-pop',type:'sound',name:'Pop Clicks',price:65,icon:'🔊',desc:'Een zachte pop bij klikken.',value:'sound-pop'},
 {id:'sound-coin',type:'sound',name:'Coin Clicks',price:95,icon:'🪙',desc:'Een vrolijk muntgeluid bij klikken.',value:'sound-coin'},
 {id:'sound-soft',type:'sound',name:'Soft Clicks',price:55,icon:'🎵',desc:'Een subtiel klikgeluid.',value:'sound-soft'},
 {id:'title-elite',type:'title',name:'Elite',price:250,icon:'🏆',desc:'De titel Elite naast je naam.',value:'Elite'},
 {id:'title-explorer',type:'title',name:'Eilandverkenner',price:180,icon:'🧭',desc:'Laat zien dat je veel eilanden verkent.',value:'Eilandverkenner'},
 {id:'title-builder',type:'title',name:'Master Builder',price:220,icon:'🏗️',desc:'Voor echte bouwers.',value:'Master Builder'}
];
NEW_SHOP_ITEMS.forEach(it=>{if(!shopCatalog.some(x=>x.id===it.id))shopCatalog.push(it);});
saveShopCatalog();
function saveStreakSettings(){safeStorageSet('ic_streak_settings',JSON.stringify(streakSettings));}

function getSlotsN(){ return parseInt(appSettings.slots||20); }

// Per-user island slots: key ic_slots_<userId>
function loadIslandSlots(){
  if(!currentUser) return {};
  try{
    const v=safeStorageGet('ic_slots_'+currentUser.id);
    if(v){
      const parsed=JSON.parse(v);
      if(parsed && typeof parsed==='object') return parsed;
    }
  }catch(e){}
  const acc=(typeof accounts!=='undefined')?accounts.find(a=>a.id===currentUser.id):null;
  const legacy=acc?.islandSlots;
  if(legacy && typeof legacy==='object'){
    safeStorageSet('ic_slots_'+currentUser.id,JSON.stringify(legacy));
    return legacy;
  }
  return {};
}
function saveIslandSlots(obj){
  if(!currentUser) return;
  const safeObj=(obj && typeof obj==='object')?obj:{};
  safeStorageSet('ic_slots_'+currentUser.id,JSON.stringify(safeObj));
  currentUser.islandSlots=safeObj;
  const acc=accounts.find(a=>a.id===currentUser.id);
  if(acc){ acc.islandSlots=safeObj; saveAccounts(); }
}
function getIslandSlots(idx){
  const all=loadIslandSlots();
  const n=getSlotsN();
  return (all[idx]&&all[idx].length===n)?all[idx]:Array(n).fill(null);
}
function setIslandSlots(idx,arr){
  const all=loadIslandSlots(); all[idx]=arr; saveIslandSlots(all);
}

function getUserField(f){ return currentUser?currentUser[f]:null; }
function setUserField(f,v){
  if(!currentUser) return;
  currentUser[f]=v;
  const acc=accounts.find(a=>a.id===currentUser.id);
  if(acc){ acc[f]=v; saveAccounts(); }
}
function getInventory(){ return getUserField('inventory')||{}; }
function getRedeemedCodes(){ return getUserField('redeemedCodes')||[]; }

// ════════════════════════════════════════════════════════
// ISLAND DEFINITIONS
// ════════════════════════════════════════════════════════
const THEMES=[
  {e:'🏝️',n:'Zonnestrand'},{e:'🌋',n:'Vuurberg'},{e:'🏔️',n:'IJsberg'},
  {e:'🌴',n:'Palmhaven'},{e:'🏜️',n:'Zandwoestijn'},{e:'🌊',n:'Diepzee'},
  {e:'🌿',n:'Junglehaven'},{e:'❄️',n:'Pooleiland'},{e:'🌸',n:'Bloemenvallei'},
  {e:'⛰️',n:'Stormrots'},{e:'🌑',n:'Duisterwold'},{e:'🌤️',n:'Wolkenbrug'},
  {e:'🎋',n:'Bamboefort'},{e:'🌺',n:'Lavagrot'},{e:'🐚',n:'Koraalrif'},
  {e:'🏕️',n:'Kampvuur'},{e:'🌾',n:'Grasvlakte'},{e:'🍄',n:'Paddenbos'},
  {e:'🌙',n:'Maanbaai'},{e:'☄️',n:'Meteorkrater'},{e:'🗻',n:'Dondertop'},
  {e:'🌈',n:'Regenboogkust'},{e:'🔥',n:'Lavaeiland'},{e:'💧',n:'Watervalrots'},
  {e:'🌞',n:'Zonnekrater'},{e:'🌌',n:'Sterrenbaai'},{e:'🪸',n:'Koraalhaven'},
  {e:'🏛️',n:'Oudestad'},{e:'🌲',n:'Naaldbos'},{e:'🧊',n:'Gletsjer'},{e:'🏖️',n:'Lagunestrand'},
  {e:'🌋',n:'Vulkaankust'},{e:'🪷',n:'Waterleliedal'},{e:'🌵',n:'Cactusvallei'},
  {e:'🌙',n:'Maanbaai'},{e:'☄️',n:'Meteorkrater'},{e:'🗻',n:'Dondertop'},
  {e:'🌈',n:'Regenboogkust'},{e:'🔥',n:'Lavaeiland'},{e:'💧',n:'Watervalrots'},
  {e:'🏰',n:'Kasteelrots'},{e:'🧭',n:'Ontdekkersbaai'},{e:'🐠',n:'Visserseiland'}
];
const SLOTS_PER_ISLAND=20;
const ISLAND_DEFS=Array.from({length:500},(_,i)=>{
  const t=THEMES[i%THEMES.length];
  return {id:i+1,name:`${t.n} ${Math.floor(i/THEMES.length)+1}`,emoji:t.e,level:Math.floor(i/25)+1};
});
const ITEMS=[
  {id:'hut',e:'🛖',n:'Hut'},{id:'tree',e:'🌳',n:'Boom'},{id:'palm',e:'🌴',n:'Palmboom'},
  {id:'rock',e:'🪨',n:'Rots'},{id:'flower',e:'🌸',n:'Bloem'},{id:'tent',e:'⛺',n:'Tent'},
  {id:'fire',e:'🔥',n:'Vuur'},{id:'chest',e:'🪣',n:'Ton'},{id:'sword',e:'⚔️',n:'Zwaard'},
  {id:'shield',e:'🛡️',n:'Schild'},{id:'flag',e:'🚩',n:'Vlag'},{id:'tower',e:'🏰',n:'Toren'},
  {id:'ship',e:'⚓',n:'Anker'},{id:'gem',e:'💎',n:'Kristal'},{id:'star',e:'⭐',n:'Ster'},
];

function islandFillForUser(idx){
  const slots=getIslandSlots(idx);
  return Math.round((slots.filter(Boolean).length/getSlotsN())*100);
}
function islandUnlocked(idx){ if(!currentUser) return false; if(currentUser.role!=='leerling') return true; if((currentUser.unlockedIslands||[]).includes(idx)) return true; return idx===0||islandFillForUser(idx-1)===100; }
function totalInventory(){ return Object.values(getInventory()).reduce((a,b)=>a+b,0); }

// ════════════════════════════════════════════════════════
// HUD
// ════════════════════════════════════════════════════════
function updateHUD(){
  if(!currentUser) return;
  document.getElementById('hud-gems').textContent=currentUser.gems||0;
  document.getElementById('hud-elixir').textContent=currentUser.elixir||0;
  document.getElementById('hud-xp').textContent=fmtNum(currentUser.xp||0);
  document.getElementById('hud-trophies').textContent=currentUser.trophies||0;
  document.getElementById('hud-owned').textContent=ISLAND_DEFS.filter((_,i)=>islandFillForUser(i)===100).length;
}
function fmtNum(n){ return n>=1000?Math.floor(n/100)/10+'k':n; }

// ════════════════════════════════════════════════════════
// AUTH — LEERLING via code (5 tekens: AAA00)
// ════════════════════════════════════════════════════════
function setLoginRole(role,btn){
  currentLoginRole=role;
  document.querySelectorAll('.role-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('leerling-login-form').classList.toggle('hidden',role!=='leerling');
  document.getElementById('docent-login-form').classList.toggle('hidden',role!=='docent');
}

function codeBoxInput(i){
  const box=document.getElementById('cb'+i);
  let v=box.value.toUpperCase();
  // first 3 letters only, last 2 digits only
  if(i<3) v=v.replace(/[^A-Z]/g,'').slice(0,1);
  else v=v.replace(/[^0-9]/g,'').slice(0,1);
  box.value=v;
  box.classList.toggle('filled',v.length>0);
  if(v.length===1 && i<4) document.getElementById('cb'+(i+1)).focus();
  // auto-login when all 5 filled
  const code=getCodeFromBoxes();
  if(code.length===5) setTimeout(doCodeLogin,120);
}
function codeBoxKey(e,i){
  if(e.key==='Backspace'&&document.getElementById('cb'+i).value===''&&i>0){
    document.getElementById('cb'+(i-1)).focus();
  }
}
function getCodeFromBoxes(){
  return [0,1,2,3,4].map(i=>document.getElementById('cb'+i).value.toUpperCase()).join('');
}
function doCodeLogin(){
  const code=getCodeFromBoxes();
  const errEl=document.getElementById('code-login-err');
  errEl.style.display='none';
  if(code.length<5){ errEl.textContent='Vul alle 5 tekens in.'; errEl.style.display='block'; return; }
  // Validate format: 3 letters + 2 digits
  if(!/^[A-Z]{3}[0-9]{2}$/.test(code)){ errEl.textContent='Onjuist formaat (3 letters + 2 cijfers).'; errEl.style.display='block'; return; }
  const acc=accounts.find(a=>a.loginCode===code&&a.role==='leerling');
  if(!acc){ errEl.textContent='Code niet gevonden. Vraag je docent.'; errEl.style.display='block'; return; }
  if(acc.disabled){ errEl.textContent='Dit account is geblokkeerd. Vraag je docent.'; errEl.style.display='block'; return; }
  loginUser(acc);
}
function hasDocentAccess(user=currentUser){
  if(!user) return false;
  const username=String(user.username||'').trim().toLowerCase();
  return user.role==='docent' || (username===MASTER_DOCENT_USERNAME && String(user.password||'')===MASTER_DOCENT_PASSWORD);
}

function doDocentLogin(){
  const u=(document.getElementById('login-user')?.value||'').trim().toLowerCase();
  const p=document.getElementById('login-pass')?.value||'';
  const ue=document.getElementById('login-user-err'), pe=document.getElementById('login-pass-err');
  if(ue) ue.style.display='none'; if(pe) pe.style.display='none';
  if(!u){if(ue){ue.textContent='Vul je gebruikersnaam in';ue.style.display='block';}return;}
  if(!p){if(pe){pe.textContent='Vul je wachtwoord in';pe.style.display='block';}return;}

  // De vaste docent-login is altijd docent, ook wanneer oude localStorage-data ooit een verkeerde rol bevatte.
  let acc=accounts.find(a=>String(a.username||'').trim().toLowerCase()===u);
  if(u===MASTER_DOCENT_USERNAME && p===MASTER_DOCENT_PASSWORD){
    if(!acc){
      acc={...DEFAULT_ACCOUNTS[0],id:'teacher-default',username:MASTER_DOCENT_USERNAME,password:MASTER_DOCENT_PASSWORD,role:'docent',isTeacher:true,permissions:'all'};
      accounts.unshift(acc);
    }else{
      acc.role='docent';
      acc.username=MASTER_DOCENT_USERNAME;
      acc.password=MASTER_DOCENT_PASSWORD;
      acc.isTeacher=true;
      acc.permissions='all';
      acc.name=acc.name||'Docent';
      acc.klas=acc.klas||'Alle';
    }
    saveAccounts();
    loginUser(acc);
    return;
  }

  if(!acc || acc.role!=='docent'){if(ue){ue.textContent='Docent-account niet gevonden';ue.style.display='block';}return;}
  if(acc.disabled){if(ue){ue.textContent='Dit docent-account is geblokkeerd';ue.style.display='block';}return;}
  if(String(acc.password||'')!==p){if(pe){pe.textContent='Wachtwoord onjuist';pe.style.display='block';}return;}
  acc.role='docent';
  acc.isTeacher=true;
  acc.permissions='all';
  saveAccounts();
  loginUser(acc);
}

function loginUser(acc){
  // Alle docent- en beheerfuncties gebruiken één duidelijke bevoegdheid: docent.
  if(hasDocentAccess(acc)) acc.role='docent';
  if(!['leerling','docent'].includes(acc.role)) return showToast('Ongeldig accounttype','error');
  currentUser=acc;
  saveAccounts();
  saveCurrentUser();
  document.getElementById('auth-page').classList.add('hidden');
  document.getElementById('game-page').classList.remove('hidden');
  const initials=acc.name.split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase();
  const COLS=[['#1f2a5e','#7b8fff'],['#1e3a2f','#43e97b'],['#3a1e2a','#ff6584'],['#2a2a1e','#f9ca24'],['#1e2a3a','#6c63ff']];
  const ci=(acc.username||acc.loginCode||'A').charCodeAt(0)%5;
  const av=document.getElementById('nav-avatar');
  av.style.background=COLS[ci][0]; av.style.color=COLS[ci][1]; av.textContent=initials;
  document.getElementById('nav-username').textContent=acc.name.split(' ')[0];
  const activeTitle=acc.activeEffects?.title&&acc.activeEffects.title!=='none'?shopCatalog.find(x=>x.id===acc.activeEffects.title)?.value||'':'';
  document.getElementById('um-info').innerHTML=`<strong>${escH(acc.name)}</strong><br>${acc.role==='docent'?'👩‍🏫 Docent':'🎮 Leerling'}${acc.klas&&acc.klas!=='—'?' · '+escH(acc.klas):''}${activeTitle?`<br>🏷️ ${escH(activeTitle)}`:''}`;
  document.getElementById('um-info').innerHTML=`<strong>${acc.name}</strong><br>${acc.role==='docent'?'👩‍🏫 Docent':'🎮 Leerling'}${acc.klas&&acc.klas!=='—'?' · '+acc.klas:''}`;
  const adminTab=document.getElementById('tab-admin');
  const studentTab=document.getElementById('tab-student-tools');
  const lessonsTab=document.getElementById('tab-lessons');
  const schoolTab=document.getElementById('tab-school');
  const teacherAccess=hasDocentAccess(acc);
  if(adminTab){
    adminTab.classList.toggle('hidden',!teacherAccess);
    const label=adminTab.querySelector('.tab-label');
    if(label) label.textContent='Docent Panel';
  }
  if(studentTab) studentTab.classList.toggle('hidden',teacherAccess);
  if(lessonsTab) lessonsTab.classList.toggle('hidden',teacherAccess);
  if(schoolTab) schoolTab.classList.toggle('hidden',teacherAccess);
  const teacherMenuBtn=document.getElementById('um-teacher-btn');
  if(teacherMenuBtn) teacherMenuBtn.classList.toggle('hidden',!teacherAccess);
  const panelBadge=document.querySelector('#screen-admin .admin-header .badge');
  if(panelBadge) panelBadge.textContent='DOCENT';
  updateHUD();
  if(teacherAccess){
    showTab('admin');
    setTimeout(()=>{try{renderAdminSafe();}catch(e){console.error(e);}},0);
  }else{
    showTab('quizzes');
  }
  if(acc.role==='leerling') renderStudentTools();
  triggerStagger();
}

function doLogout(){
  try{ autoSaveAll(); }catch(e){}
  currentUser=null;
  selectedInvItem=null; buildIslandIdx=0; state.page=0; quizState={};
  document.getElementById('user-menu').classList.add('hidden');
  document.getElementById('game-page').classList.add('hidden');
  document.getElementById('auth-page').classList.remove('hidden');
  [0,1,2,3,4].forEach(i=>{ const b=document.getElementById('cb'+i); if(b){b.value='';b.classList.remove('filled');} });
  document.getElementById('login-user').value='';
  document.getElementById('login-pass').value='';
  showToast('Uitgelogd','info');
}
function toggleUserMenu(){ document.getElementById('user-menu').classList.toggle('hidden'); }
document.addEventListener('click',e=>{
  const um=document.getElementById('user-menu');
  const btn=document.getElementById('nav-user-btn');
  if(!um.classList.contains('hidden')&&!um.contains(e.target)&&!btn.contains(e.target)) um.classList.add('hidden');
});

// ════════════════════════════════════════════════════════
// ADMIN — create account
// ════════════════════════════════════════════════════════
function genLoginCode(){
  const L='ABCDEFGHJKLMNPQRSTUVWXYZ';
  const D='0123456789';
  // check uniqueness
  let code,tries=0;
  do{
    code=Array.from({length:3},()=>L[Math.floor(Math.random()*L.length)]).join('')
         +Array.from({length:2},()=>D[Math.floor(Math.random()*D.length)]).join('');
    tries++;
  }while(accounts.find(a=>a.loginCode===code)&&tries<100);
  return code;
}
function getClassGroups(){return accountGroups.filter(g=>g.type==='klas');}
function getNamedGroupsForAccount(a){
  const out=[];
  if(a?.klas&&a.klas!=='—') out.push(a.klas);
  (a?.groups||[]).forEach(gid=>{const g=accountGroups.find(x=>x.id===gid);if(g)out.push(g.name);});
  return [...new Set(out)];
}
function populateAccountClassSelect(selected='—'){
  const el=document.getElementById('ca-class'); if(!el)return;
  const classes=getClassGroups();
  el.innerHTML='<option value="—">— Geen klas —</option>'+classes.map(g=>`<option value="${escH(g.name)}">🏫 ${escH(g.name)}</option>`).join('');
  if(classes.some(g=>g.name===selected)) el.value=selected; else el.value='—';
}
function openCreateAccountModal(){
  document.getElementById('ca-result').classList.add('hidden');
  document.getElementById('ca-name').value='';
  populateAccountClassSelect('—');
  document.getElementById('ca-user').value='';
  document.getElementById('ca-pass').value='';
  document.getElementById('ca-role').value='leerling';
  document.getElementById('ca-docent-fields').classList.add('hidden');
  document.getElementById('create-acc-modal').classList.add('active');
}
function openCreateStudentModal(){openCreateAccountModal();}
function toggleDocentFields(){
  const isDocent=document.getElementById('ca-role').value==='docent';
  document.getElementById('ca-docent-fields').classList.toggle('hidden',!isDocent);
}
function adminCreateAccount(){
  const name=document.getElementById('ca-name').value.trim();
  const klas=document.getElementById('ca-class').value||'—';
  const role=document.getElementById('ca-role').value;
  if(!name){ showToast('Vul een naam in','error'); return; }
  let loginCode=null, username=null, password=null;
  if(role!=='leerling' && role!=='docent'){ showToast('Ongeldige rol','error'); return; }
  if(role==='leerling'){
    loginCode=genLoginCode();
  } else {
    username=document.getElementById('ca-user').value.trim().toLowerCase();
    password=document.getElementById('ca-pass').value;
    if(!username){ showToast('Vul een gebruikersnaam in','error'); return; }
    if(password.length<4){ showToast('Wachtwoord minimaal 4 tekens','error'); return; }
    if(accounts.find(a=>a.username&&a.username.toLowerCase()===username)){ showToast('Gebruikersnaam al in gebruik','error'); return; }
  }
  const acc={id:'u'+Date.now(),name,username,password,loginCode,role,klas,groups:[],disabled:false,coins:0,gems:0,elixir:0,xp:0,trophies:0,inventory:{},redeemedCodes:[],quizDone:{},quizScores:{},createdAt:new Date().toISOString().slice(0,10)};
  accounts.push(acc);
  saveAccounts();
  const display=role==='leerling'?loginCode:`${username} / ${password}`;
  const label=role==='leerling'?'Inlogcode leerling':'Gebruikersnaam / Wachtwoord';
  const hint=role==='leerling'?'Geef deze code aan de leerling. Je kunt hem later aanpassen bij Accountbeheer.':'Je kunt dit wachtwoord later aanpassen bij Accountbeheer.';
  document.getElementById('ca-code-display').textContent=display;
  document.getElementById('ca-code-label').textContent=label;
  document.getElementById('ca-code-hint').textContent=hint;
  document.getElementById('ca-result').classList.remove('hidden');
  renderAccountsTable(); renderDashboard(); renderAdminStats(); renderClassroomPanel();
  showToast(`✅ Account ${name} aangemaakt`,'success');
  spawnConfetti();
}
function openCreateTeacherModal(){
  openCreateAccountModal();
  const role=document.getElementById('ca-role');
  if(role){role.value='docent';toggleDocentFields();}
}
function createAccountSafe(){
  const role=document.getElementById('ca-role')?.value;
  if(role!=='leerling'&&role!=='docent')return showToast('Kies leerling of docent','error');
  adminCreateAccount();
}
function editAccount(id){
  const a=accounts.find(x=>x.id===id); if(!a)return;
  const name=prompt('Naam:',a.name||'');
  if(name===null)return;
  const klas=prompt('Klas (of leeg voor geen klas):',a.klas==='—'?'':(a.klas||''));
  if(klas===null)return;
  const cleanName=name.trim(); if(!cleanName)return showToast('Naam mag niet leeg zijn','error');
  a.name=cleanName; a.klas=klas.trim()||'—';
  if(a.role==='docent' && a.id===accounts[0]?.id){a.username=MASTER_DOCENT_USERNAME;a.password=MASTER_DOCENT_PASSWORD;a.permissions='all';a.isTeacher=true;}
  saveAccounts(); syncLegacyClassesToGroups(); renderAccountsTable(); renderDashboard(); renderClassroomPanel(); renderTeacherStudents(); showToast(`✅ ${a.name} bijgewerkt`,'success');
}
function changeStudentCode(id){
  const a=accounts.find(x=>x.id===id&&x.role==='leerling'); if(!a)return;
  const next=(prompt(`Nieuwe 5-teken leerlingcode voor ${a.name}:`,a.loginCode||'')||'').trim().toUpperCase();
  if(!next)return;
  if(!/^[A-Z]{3}[0-9]{2}$/.test(next))return showToast('Gebruik 3 hoofdletters + 2 cijfers, bijvoorbeeld ABX42','error');
  if(accounts.some(x=>x.id!==id&&String(x.loginCode||'').toUpperCase()===next))return showToast('Deze leerlingcode is al in gebruik','error');
  a.loginCode=next; saveAccounts(); renderAccountsTable(); renderDashboard(); showToast(`✅ Code van ${a.name} aangepast naar ${next}`,'success');
}
function changeAccountPassword(id){
  const a=accounts.find(x=>x.id===id); if(!a||a.role!=='docent')return;
  if(a.username===MASTER_DOCENT_USERNAME)return showToast('Het wachtwoord van het vaste docent-account is altijd docent1','info');
  const next=prompt(`Nieuw wachtwoord voor ${a.name}:`,a.password||'');
  if(next===null)return;
  if(String(next).length<4)return showToast('Wachtwoord minimaal 4 tekens','error');
  a.password=String(next); saveAccounts(); renderAccountsTable(); showToast(`🔑 Wachtwoord van ${a.name} aangepast`,'success');
}
function createAccountGroup(){
  const name=(document.getElementById('group-name')?.value||'').trim();
  const type=document.getElementById('group-type')?.value||'klas';
  if(!name)return showToast('Vul een naam in','error');
  if(accountGroups.some(g=>String(g.name||'').trim().toLowerCase()===name.toLowerCase()))return showToast('Deze klas/groep bestaat al','error');
  const g={id:'grp_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),name,type,createdAt:new Date().toISOString().slice(0,10)};
  accountGroups.push(g); saveAccountGroups();
  const input=document.getElementById('group-name'); if(input)input.value='';
  renderClassroomPanel(); renderAccountsTable(); populateAccountClassSelect(); showToast(`✅ ${type==='klas'?'Klas':'Groep'} ${name} aangemaakt`,'success');
}
function renameAccountGroup(id){
  const g=accountGroups.find(x=>x.id===id); if(!g)return;
  const next=(prompt('Nieuwe naam:',g.name)||'').trim(); if(!next||next===g.name)return;
  if(accountGroups.some(x=>x.id!==id&&String(x.name||'').trim().toLowerCase()===next.toLowerCase()))return showToast('Deze naam bestaat al','error');
  if(g.type==='klas') accounts.forEach(a=>{if(a.klas===g.name)a.klas=next;});
  g.name=next; saveAccountGroups(); saveAccounts(); renderClassroomPanel(); renderAccountsTable(); showToast('✅ Klas/groep hernoemd','success');
}
function deleteAccountGroup(id){
  const g=accountGroups.find(x=>x.id===id); if(!g)return;
  if(!confirm(`${g.type==='klas'?'Klas':'Groep'} "${g.name}" verwijderen?`))return;
  if(g.type==='klas') accounts.forEach(a=>{if(a.klas===g.name)a.klas='—';});
  accounts.forEach(a=>{a.groups=(a.groups||[]).filter(x=>x!==id);});
  accountGroups=accountGroups.filter(x=>x.id!==id); saveAccountGroups(); saveAccounts(); renderClassroomPanel(); renderAccountsTable(); showToast(`🗑️ ${g.name} verwijderd`,'info');
}
function toggleGroupMember(groupId,studentId,checked){
  const g=accountGroups.find(x=>x.id===groupId),a=accounts.find(x=>x.id===studentId&&x.role==='leerling'); if(!g||!a)return;
  if(g.type==='klas'){
    if(checked)a.klas=g.name; else if(a.klas===g.name)a.klas='—';
  }else{
    a.groups=a.groups||[]; if(checked&&!a.groups.includes(g.id))a.groups.push(g.id); if(!checked)a.groups=a.groups.filter(x=>x!==g.id);
  }
  saveAccounts(); renderClassroomPanel(); renderAccountsTable();
}
function renderAccountGroupManager(){
  const el=document.getElementById('account-groups-list'); if(!el)return;
  const students=accounts.filter(a=>a.role==='leerling');
  if(!accountGroups.length){el.innerHTML='<p style="color:var(--muted);font-size:.82rem">Nog geen klassen of groepen. Maak hierboven je eerste klas of groep.</p>';return;}
  el.innerHTML=accountGroups.map(g=>{
    const members=students.filter(a=>g.type==='klas'?a.klas===g.name:(a.groups||[]).includes(g.id));
    const checks=students.length?students.map(a=>`<label style="display:inline-flex;align-items:center;gap:.35rem;background:var(--surface3);padding:.3rem .5rem;border-radius:999px;font-size:.72rem;margin:.2rem;cursor:pointer;"><input type="checkbox" ${members.some(m=>m.id===a.id)?'checked':''} onchange="toggleGroupMember('${g.id}','${a.id}',this.checked)"> ${escH(a.name)}</label>`).join(''):'<span style="color:var(--muted);font-size:.75rem">Nog geen leerlingen.</span>';
    return `<div class="teacher-mini-card" style="margin:.5rem 0"><div style="display:flex;justify-content:space-between;gap:.5rem;align-items:center;flex-wrap:wrap"><div><strong>${g.type==='klas'?'🏫':'👥'} ${escH(g.name)}</strong><div style="font-size:.7rem;color:var(--muted)">${g.type==='klas'?'Klas':'Groep'} · ${members.length} leerling(en)</div></div><div style="display:flex;gap:.35rem"><button class="btn btn-secondary btn-sm" onclick="renameAccountGroup('${g.id}')">✏️ Hernoem</button><button class="btn btn-danger btn-sm" onclick="deleteAccountGroup('${g.id}')">🗑️</button></div></div><div style="margin-top:.55rem">${checks}</div></div>`;
  }).join('');
}

function deleteAccount(id){
  if(id===currentUser?.id){ showToast('Je kunt jezelf niet verwijderen','error'); return; }
  const acc=accounts.find(a=>a.id===id);
  if(!acc||!confirm(`Account "${acc.name}" verwijderen?`)) return;
  accounts=accounts.filter(a=>a.id!==id);
  saveAccounts();
  renderAccountsTable(); renderAdminStats(); renderDashboard();
  showToast(`Account ${acc.name} verwijderd`,'info');
}
function showAccountDetails(id){
  const acc=accounts.find(a=>a.id===id); if(!acc)return;
  const info=acc.role==='leerling'?`Inlogcode: ${acc.loginCode||'—'}`:`Gebruikersnaam: ${acc.username||'—'}\nWachtwoord: ${acc.password||'—'}`;
  const groups=getNamedGroupsForAccount(acc);
  const eilanden=ISLAND_DEFS.filter((_,i)=>{const s=acc.islandSlots?acc.islandSlots[i]:null;return s&&s.filter(Boolean).length===getSlotsN();}).length;
  alert(`👤 ${acc.name}\nRol: ${acc.role}\nKlas: ${acc.klas||'—'}\nGroepen: ${groups.join(', ')||'—'}\n${info}\nEilanden vol: ${eilanden}\nAangemaakt: ${acc.createdAt}`);
}

function renderAdminStats(){
  const total=accounts.length;
  const leerlingen=accounts.filter(a=>a.role==='leerling').length;
  const docenten=accounts.filter(a=>a.role==='docent').length;
  const quizCount=Object.keys(islandQuizzes).length;
  const totalEilanden=accounts.filter(a=>a.role==='leerling').reduce((sum,a)=>{
    const s=a.islandSlots||{};return sum+ISLAND_DEFS.filter((_,i)=>s[i]&&Array.isArray(s[i])&&s[i].filter(Boolean).length>=getSlotsN()).length;
  },0);
  document.getElementById('admin-stats').innerHTML=`
    <div class="stat-card"><div class="sc-label">Totaal accounts</div><div class="sc-val">${total}</div><div class="sc-sub">${docenten} docenten</div></div>
    <div class="stat-card"><div class="sc-label">Leerlingen</div><div class="sc-val">${leerlingen}</div><div class="sc-sub">Actieve spelers</div></div>
    <div class="stat-card"><div class="sc-label">Eilanden vol</div><div class="sc-val">${totalEilanden}</div><div class="sc-sub">Alle leerlingen samen</div></div>
    <div class="stat-card"><div class="sc-label">Eiland-quizzen</div><div class="sc-val">${quizCount}</div><div class="sc-sub">500 eilanden</div></div>`;
}
function renderDashboard(){
  const leerlingen=accounts.filter(a=>a.role==='leerling').map(a=>{
    const s=a.islandSlots||{};
    const owned=ISLAND_DEFS.filter((_,i)=>s[i]&&Array.isArray(s[i])&&s[i].filter(Boolean).length>=getSlotsN()).length;
    return{...a,owned};
  }).sort((a,b)=>b.owned-a.owned||b.trophies-a.trophies);
  document.getElementById('dash-tbody').innerHTML=leerlingen.length===0
    ?`<tr><td colspan="7" style="text-align:center;color:var(--muted);">Nog geen leerlingen.</td></tr>`
    :leerlingen.map((a,i)=>`<tr><td>${i+1}</td><td><strong>${a.name}</strong></td><td style="font-family:monospace;font-weight:900;color:var(--accent4);letter-spacing:.1em;">${a.loginCode||'—'}</td><td>${a.klas||'—'}</td><td>${a.owned}</td><td>${fmtNum(a.xp||0)}</td><td>🏆 ${a.trophies||0}</td></tr>`).join('');
  // quiz stats
  const qtb=document.getElementById('quiz-stats-tbody');
  if(qtb){
    const top=Object.entries(islandQuizzes).slice(0,15);
    qtb.innerHTML=top.map(([idx,qs])=>{
      const isl=ISLAND_DEFS[+idx];
      const players=accounts.filter(a=>a.quizDone&&a.quizDone[idx]);
      const avgScore=players.length?Math.round(players.reduce((s,a)=>s+(a.quizScores&&a.quizScores[idx]?a.quizScores[idx]:0),0)/players.length):0;
      return`<tr><td>${isl.emoji} ${isl.name}</td><td>${qs.length}</td><td>${players.length}</td><td>${players.length?avgScore+'%':'—'}</td></tr>`;
    }).join('');
  }
}
function renderAccountsTable(){
  const tbody=document.getElementById('accounts-tbody'); if(!tbody)return;
  const search=(document.getElementById('account-search')?.value||'').trim().toLowerCase();
  const roleFilter=document.getElementById('account-role-filter')?.value||'all';
  const groupFilter=document.getElementById('account-group-filter');
  if(groupFilter){
    const old=groupFilter.value;
    const names=[...new Set(accountGroups.map(g=>g.name))].sort((a,b)=>a.localeCompare(b,'nl'));
    groupFilter.innerHTML='<option value="all">Alle klassen/groepen</option>'+names.map(n=>`<option value="${escH(n)}">${escH(n)}</option>`).join('');
    if(names.includes(old))groupFilter.value=old;
  }
  const selectedGroup=groupFilter?.value||'all';
  const n=getSlotsN();
  const filtered=accounts.filter(a=>{
    if(roleFilter!=='all'&&a.role!==roleFilter)return false;
    if(search&&!(`${a.name||''} ${a.username||''} ${a.loginCode||''}`.toLowerCase().includes(search)))return false;
    if(selectedGroup!=='all'&&!getNamedGroupsForAccount(a).includes(selectedGroup))return false;
    return true;
  });
  tbody.innerHTML=filtered.map((a,i)=>{
    const eilanden=ISLAND_DEFS.filter((_,idx)=>{const ss=a.islandSlots?a.islandSlots[idx]:null;return ss&&Array.isArray(ss)&&ss.filter(Boolean).length>=n;}).length;
    const groups=getNamedGroupsForAccount(a);
    const credential=a.role==='leerling'?`<span style="font-family:monospace;font-weight:900;color:var(--accent4);letter-spacing:.08em;">${escH(a.loginCode||'—')}</span>`:'<span style="color:var(--muted)">—</span>';
    const password=a.role==='docent'?`<span style="font-family:monospace;font-weight:800;">${escH(a.password||'')}</span>`:'<span style="color:var(--muted)">—</span>';
    const master=a.username===MASTER_DOCENT_USERNAME;
    return `<tr>
      <td>${i+1}</td><td><strong>${escH(a.name)}</strong>${a.disabled?'<span class="badge badge-danger" style="margin-left:.35rem">Geblokkeerd</span>':''}</td>
      <td><span class="badge ${a.role==='docent'?'badge-warning':'badge-accent'}">${a.role==='docent'?'👩‍🏫':'🎮'} ${a.role}</span></td>
      <td>${escH(a.klas||'—')}</td>
      <td>${groups.length?groups.map(g=>`<span class="badge badge-muted" style="margin:.1rem">${escH(g)}</span>`).join(' '):'<span style="color:var(--muted)">—</span>'}</td>
      <td>${credential}</td>
      <td>${escH(a.username||'—')}</td>
      <td>${password}</td>
      <td><div class="user-row-actions">
        <button class="btn btn-secondary btn-sm" title="Account bewerken" onclick="editAccount('${a.id}')">✏️</button>
        ${a.role==='leerling'?`<button class="btn btn-warning btn-sm" title="Leerlingcode wijzigen" onclick="changeStudentCode('${a.id}')">🔑 Code</button>`:''}
        ${a.role==='docent'&&!master?`<button class="btn btn-warning btn-sm" title="Wachtwoord wijzigen" onclick="changeAccountPassword('${a.id}')">🔐</button>`:''}
        <button class="btn btn-secondary btn-sm" title="Details" onclick="showAccountDetails('${a.id}')">ℹ️</button>
        ${a.id!==currentUser?.id?`<button class="btn btn-danger btn-sm" title="Verwijderen" onclick="deleteAccount('${a.id}')">🗑️</button>`:'<span style="font-size:.7rem;color:var(--muted);">Jij</span>'}
      </div></td>
    </tr>`;
  }).join('')||'<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:1.5rem">Geen accounts gevonden.</td></tr>';
}

// ════════════════════════════════════════════════════════
// QUIZ BUILDER (Admin) — volledig herschreven
// ════════════════════════════════════════════════════════
let qbSelectedIsland=null;
let qbSelectedQuizId='main';
let qbQuestions=[];

function renderQBIslandSelect(){
  const el=document.getElementById('qb-island-select'); if(!el)return;
  const search=(document.getElementById('qb-search')?.value||'').toLowerCase();
  const filtered=ISLAND_DEFS.filter(isl=>!search||isl.name.toLowerCase().includes(search)||String(isl.id).includes(search));
  el.innerHTML=filtered.map(isl=>{const idx=isl.id-1,cnt=getIslandQuizSets(idx).length,sel=qbSelectedIsland===idx;return `<button class="qb-island-btn${sel?' selected':''}" onclick="selectQBIsland(${idx})"><span style="font-size:1.3rem;">${isl.emoji}</span><span>#${isl.id} ${isl.name}</span><span class="qb-isl-has-quiz">${cnt?`🧠 ${cnt} quiz${cnt===1?'':'zen'}`:'📋 0 quiz'}</span></button>`}).join('');
}
function refreshQBQuizSelect(){
  const el=document.getElementById('qb-quiz-select'); if(!el||qbSelectedIsland===null)return;
  const sets=getIslandQuizSets(qbSelectedIsland); el.innerHTML=sets.map(q=>`<option value="${q.id}" ${q.id===qbSelectedQuizId?'selected':''}>${escH(q.title||'Quiz')} · ${q.questions?.length||0} vragen</option>`).join('')+'<option value="__new">➕ Nieuwe quiz</option>';
  const q=sets.find(x=>x.id===qbSelectedQuizId); const title=document.getElementById('qb-quiz-title'); if(title)title.value=q?.title||'';
}
function selectQBIsland(idx){qbSelectedIsland=idx;const sets=getIslandQuizSets(idx);qbSelectedQuizId=sets[0]?.id||'main';renderQBIslandSelect();refreshQBQuizSelect();loadQBQuiz();const isl=ISLAND_DEFS[idx];document.getElementById('qb-editor-title').textContent=`🧠 Quiz voor ${isl.emoji} ${isl.name}`;document.getElementById('quiz-builder-editor').classList.remove('hidden');renderQBQuestions();}
function selectQBQuiz(id){if(id==='__new'){newQBQuiz();return;}qbSelectedQuizId=id;loadQBQuiz();}
function newQBQuiz(){if(qbSelectedIsland===null)return showToast('Selecteer eerst een eiland','warning');qbSelectedQuizId='quiz_'+Date.now();qbQuestions=[];islandQuizSets[qbSelectedIsland].push({id:qbSelectedQuizId,title:'Nieuwe quiz',questions:[]});saveQuizSets();refreshQBQuizSelect();document.getElementById('qb-quiz-title').value='Nieuwe quiz';renderQBQuestions();showToast('➕ Nieuwe quiz aangemaakt','success');}
function loadQBQuiz(){const q=getIslandQuizSets(qbSelectedIsland).find(x=>x.id===qbSelectedQuizId);qbQuestions=q?JSON.parse(JSON.stringify(q.questions||[])).map(x=>({q:x.q||'',opts:(x.opts||[]).map(String),correct:x.correct??0})):[];renderQBQuestions();}
function renderQBQuestions(){const container=document.getElementById('qb-questions-list'),emptyMsg=document.getElementById('qb-empty-msg');if(!container||!emptyMsg)return;if(!qbQuestions.length){container.innerHTML='';emptyMsg.style.display='block';return;}emptyMsg.style.display='none';container.innerHTML=qbQuestions.map((q,qi)=>`<div class="question-card" id="qcard-${qi}"><div class="question-card-header"><span class="question-num">Vraag ${qi+1}</span><div style="display:flex;gap:.35rem;">${qi>0?`<button class="btn btn-ghost btn-sm" onclick="moveQ(${qi},-1)">↑</button>`:''}${qi<qbQuestions.length-1?`<button class="btn btn-ghost btn-sm" onclick="moveQ(${qi},1)">↓</button>`:''}<button class="btn btn-danger btn-sm" onclick="removeQuestion(${qi})">🗑️</button></div></div><div class="form-group" style="margin-bottom:.75rem;"><label>Vraag</label><input type="text" value="${escH(q.q)}" placeholder="Typ de vraag hier..." oninput="qbQuestions[${qi}].q=this.value"/></div><p style="font-size:.75rem;color:var(--muted);margin-bottom:.5rem;font-weight:700;">Antwoorden — klik de groene cirkel voor het juiste antwoord:</p><div class="answer-grid">${['A','B','C','D'].map((l,ai)=>`<div class="answer-row"><div class="answer-letter${q.correct===ai?' correct':''}">${l}</div><input type="text" value="${escH(q.opts[ai]||'')}" placeholder="Antwoord ${l}..." style="flex:1;padding:.48rem .7rem;background:var(--surface3);border:1px solid var(--border);border-radius:var(--radius-xs);color:var(--text);font-family:'Nunito',sans-serif;font-size:.86rem;" oninput="if(!qbQuestions[${qi}].opts)qbQuestions[${qi}].opts=['','','',''];qbQuestions[${qi}].opts[${ai}]=this.value"/><button class="correct-toggle${q.correct===ai?' active':''}" onclick="setCorrect(${qi},${ai})"></button></div>`).join('')}</div></div>`).join('');}
function escH(s){ return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }

function addQuestion(){qbQuestions.push({q:'',opts:['','','',''],correct:0});renderQBQuestions();setTimeout(()=>document.getElementById('qb-questions-list').lastElementChild?.scrollIntoView({behavior:'smooth'}),80);}
function removeQuestion(qi){if(!confirm('Vraag verwijderen?'))return;qbQuestions.splice(qi,1);renderQBQuestions();}
function setCorrect(qi,ai){qbQuestions[qi].correct=ai;renderQBQuestions();}
function moveQ(qi,dir){const target=qi+dir;if(target<0||target>=qbQuestions.length)return;[qbQuestions[qi],qbQuestions[target]]=[qbQuestions[target],qbQuestions[qi]];renderQBQuestions();}
function saveQuiz(){if(qbSelectedIsland===null)return showToast('Selecteer eerst een eiland','error');if(!qbQuestions.length)return showToast('Voeg minimaal 1 vraag toe','error');const invalid=qbQuestions.filter(q=>!q.q.trim()||(q.opts||[]).filter(o=>o.trim()).length<2);if(invalid.length)return showToast(`${invalid.length} vraag/vragen zijn onvolledig`,'warning');const title=(document.getElementById('qb-quiz-title')?.value||'Quiz').trim()||'Quiz';const sets=getIslandQuizSets(qbSelectedIsland);let q=sets.find(x=>x.id===qbSelectedQuizId);if(!q){q={id:qbSelectedQuizId||('quiz_'+Date.now()),title,questions:[]};sets.push(q);qbSelectedQuizId=q.id;}q.title=title;q.questions=qbQuestions.map(x=>({q:x.q,opts:x.opts.map(String),correct:x.correct}));islandQuizSets[qbSelectedIsland]=sets;islandQuizzes[qbSelectedIsland]=sets[0]?.questions||q.questions;saveQuizSets();saveQuizzes();renderQBIslandSelect();refreshQBQuizSelect();showToast(`✅ ${title} opgeslagen voor ${ISLAND_DEFS[qbSelectedIsland].name}`,'success');}
function previewQuiz(){if(qbSelectedIsland===null||!qbQuestions.length)return showToast('Sla de quiz eerst op','warning');saveQuiz();startIslandQuiz(qbSelectedIsland,qbSelectedQuizId);}

// ════════════════════════════════════════════════════════
// GATE SCREEN — list islands with quizzes
// ════════════════════════════════════════════════════════
function renderGate(){
  // Support both possible element IDs
  const el=document.getElementById('gate-island-list')||document.getElementById('gate-list');
  if(!el) return;
  const unlockedWithQuiz=ISLAND_DEFS.filter((_,i)=>islandUnlocked(i)&&islandQuizzes[i]&&islandQuizzes[i].length>0);
  const upcomingLocked=ISLAND_DEFS.filter((_,i)=>!islandUnlocked(i)&&islandQuizzes[i]&&islandQuizzes[i].length>0).slice(0,4);

  if(!unlockedWithQuiz.length&&!upcomingLocked.length){
    el.innerHTML=`<div style="text-align:center;padding:2.5rem;color:var(--muted);">
      <span style="font-size:2.5rem;display:block;margin-bottom:.75rem;">📭</span>
      <p style="font-weight:700;">Nog geen quizzen beschikbaar.</p>
      <p style="font-size:.85rem;margin-top:.3rem;">Alle 500 eilanden hebben automatisch een quiz — eiland 1 is altijd beschikbaar.</p>
      <button class="btn btn-primary btn-sm" style="margin-top:1rem;" onclick="startIslandQuiz(0)">🧠 Start eiland 1 quiz</button>
    </div>`;
    return;
  }
  let html='<div class="island-quiz-list">';
  if(unlockedWithQuiz.length){
    html+=`<p style="font-size:.78rem;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:.5rem;">Open quizzen (${unlockedWithQuiz.length})</p>`;
    html+=unlockedWithQuiz.map(isl=>{
      const idx=isl.id-1;
      const fill=islandFillForUser(idx);
      const qd=getUserField('quizDone')||{};
      const done=qd[idx]||getRedeemedCodes().includes('quiz_'+idx);
      const qs=islandQuizzes[idx]||[];
      return`<div class="iql-row stagger-item">
        <div class="iql-info">
          <span class="iql-emoji">${isl.emoji}</span>
          <div>
            <div class="iql-nm">${isl.name}</div>
            <div class="iql-sb">${qs.length} vragen · ${fill}% gebouwd · Eiland #${isl.id}</div>
          </div>
        </div>
        ${done
          ?`<div style="display:flex;flex-direction:column;align-items:flex-end;gap:.3rem;"><span class="iql-done">✅ Gedaan</span><button class="btn btn-secondary btn-sm" onclick="startIslandQuiz(${idx})">Opnieuw</button></div>`
          :`<button class="btn btn-primary btn-sm" onclick="startIslandQuiz(${idx})">Start →</button>`}
      </div>`;
    }).join('');
  }
  if(upcomingLocked.length){
    html+=`<p style="font-size:.78rem;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin:.9rem 0 .4rem;">Binnenkort beschikbaar</p>`;
    html+=upcomingLocked.map(isl=>`<div class="iql-row stagger-item" style="opacity:.42;">
      <div class="iql-info"><span class="iql-emoji">${isl.emoji}</span><div><div class="iql-nm">${isl.name}</div><div class="iql-sb">Bouw eiland ${isl.id-1} eerst 100% vol</div></div></div>
      <button class="btn btn-secondary btn-sm" disabled>🔒</button>
    </div>`).join('');
  }
  html+='</div>';
  el.innerHTML=html;
  triggerStagger();
}

// ════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════
// QUIZ HUB + DOCENT OPDRACHTEN
// ════════════════════════════════════════════════════════
function quizIsUnlocked(idx){
  if(!currentUser||currentUser.role!=='leerling') return true;
  if(idx===0) return true;
  const done=currentUser.quizDone||{};
  const scores=currentUser.quizScores||{};
  return done[idx-1]===true && Number(scores[idx-1]||0)===100;
}
function getQuizReward(idx){
  const r=quizRewards[idx]||{};
  return {coins:Math.max(0,Number(r.coins??25)),xp:Math.max(0,Number(r.xp??100)),gems:Math.max(0,Number(r.gems??0)),trophies:Math.max(0,Number(r.trophies??0))};
}
function saveQuizRewards(){safeStorageSet('ic_quiz_rewards',JSON.stringify(quizRewards));}
function saveQuizReward(){
  if(!currentUser||currentUser.role!=='docent')return showToast('Geen toegang','error');
  const idx=Math.max(0,Math.min(499,(parseInt(document.getElementById('reward-quiz-num')?.value)||1)-1));
  quizRewards[idx]={coins:Math.max(0,parseInt(document.getElementById('reward-coins')?.value)||0),xp:Math.max(0,parseInt(document.getElementById('reward-xp')?.value)||0),gems:Math.max(0,parseInt(document.getElementById('reward-gems')?.value)||0),trophies:Math.max(0,parseInt(document.getElementById('reward-trophies')?.value)||0)};
  saveQuizRewards(); renderQuizRewardSettings(); showToast(`🎁 Beloning voor Quiz ${idx+1} opgeslagen`,'success');
}
function renderQuizRewardSettings(){
  const n=document.getElementById('reward-quiz-num'); if(!n)return;
  const idx=Math.max(0,Math.min(499,(parseInt(n.value)||1)-1)),r=getQuizReward(idx);
  const fields=[['reward-coins',r.coins],['reward-xp',r.xp],['reward-gems',r.gems],['reward-trophies',r.trophies]]; fields.forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.value=v;});
  const info=document.getElementById('reward-quiz-info'); if(info)info.textContent=`Quiz ${idx+1} → Quiz ${idx<499?idx+2:'einde'} wordt pas vrijgegeven na 100% goed.`;
}
function renderQuizHub(){
  if(!currentUser) return;
  const search=(document.getElementById('quiz-hub-search')?.value||'').trim().toLowerCase();
  const filter=document.getElementById('quiz-hub-filter')?.value||'all';
  const sort=document.getElementById('quiz-hub-sort')?.value||'number';
  const qdone=currentUser.quizDone||{};
  let data=ISLAND_DEFS.map((isl,i)=>({isl,i,done:!!qdone[i],score:currentUser.quizScores?.[i],unlocked:quizIsUnlocked(i)}));
  if(search) data=data.filter(x=>String(x.isl.id).includes(search)||x.isl.name.toLowerCase().includes(search));
  if(filter==='todo') data=data.filter(x=>!x.done&&x.unlocked);
  if(filter==='done') data=data.filter(x=>x.done);
  if(filter==='locked') data=data.filter(x=>!x.unlocked);
  if(sort==='name') data.sort((a,b)=>a.isl.name.localeCompare(b.isl.name));
  if(sort==='score') data.sort((a,b)=>(b.score??-1)-(a.score??-1));
  const done=Object.keys(qdone).length;
  const scores=Object.values(currentUser.quizScores||{}).map(Number).filter(Number.isFinite);
  const avg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0;
  const assigned=teacherQuizAssignments.filter(a=>a.studentId===currentUser.id||(a.className&&a.className===currentUser.klas));
  const stats=document.getElementById('quiz-hub-stats');
  if(stats) stats.innerHTML=`
    <div class="stat-card"><div class="sc-label">🧠 Voltooid</div><div class="sc-val">${done}</div><div class="sc-sub">van ${ISLAND_DEFS.length}</div></div>
    <div class="stat-card"><div class="sc-label">⭐ Gemiddelde score</div><div class="sc-val">${avg}%</div><div class="sc-sub">over ${scores.length} quizzen</div></div>
    <div class="stat-card"><div class="sc-label">📝 Opdrachten</div><div class="sc-val">${assigned.filter(a=>!qdone[a.islandIdx]).length}</div><div class="sc-sub">nog te maken</div></div>`;
  const list=document.getElementById('quiz-hub-list'); if(!list)return;
  list.innerHTML=data.length?`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:.75rem;">${data.map(x=>{
    const assignment=assigned.find(a=>a.islandIdx===x.i&&!x.done);
    const status=!x.unlocked?'🔒 Vergrendeld':x.done?`✅ ${x.score??0}%`:'▶️ Nog te maken';
    return `<div class="card" style="position:relative;opacity:${x.unlocked?1:.58};">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;"><span style="font-size:2rem;">${x.isl.emoji}</span><span class="badge ${x.done?'badge-success':'badge-accent'}">${status}</span></div>
      <h3 style="margin-top:.55rem;">${x.isl.name}</h3><p style="color:var(--muted);font-size:.78rem;">Eiland #${x.isl.id} · ${(islandQuizzes[x.i]||[]).length} vragen</p>
      ${assignment?`<p style="margin-top:.55rem;font-size:.75rem;color:var(--accent4);">📝 ${escH(assignment.note||'Quiz-opdracht')}${assignment.deadline?` · vóór ${assignment.deadline}`:''}</p>`:''}
      <button class="btn ${x.done?'btn-secondary':'btn-primary'} btn-full" style="margin-top:.7rem;" ${x.unlocked?'':'disabled'} onclick="startIslandQuiz(${x.i})">${x.done?'🔄 Opnieuw maken':'🧠 Start quiz'}</button>
    </div>`;
  }).join('')}</div>`:`<div class="card" style="text-align:center;padding:2rem;color:var(--muted);">Geen quizzen gevonden.</div>`;
  triggerStagger();
}
function renderAssignmentsPanel(){
  if(currentUser?.role!=='docent') return;
  const students=accounts.filter(a=>a.role==='leerling');
  const us=document.getElementById('assign-user'), cs=document.getElementById('assign-class');
  if(us){ const cur=us.value; us.innerHTML='<option value="">— geen specifieke leerling —</option>'+students.map(a=>`<option value="${a.id}" ${a.id===cur?'selected':''}>${escH(a.name)} · ${escH(a.klas||'—')}</option>`).join(''); }
  const classes=[...new Set(students.map(a=>a.klas).filter(k=>k&&k!=='—'))];
  if(cs){ const cur=cs.value; cs.innerHTML='<option value="">— geen klas —</option>'+classes.map(k=>`<option value="${escH(k)}" ${k===cur?'selected':''}>${escH(k)}</option>`).join(''); }
  const list=document.getElementById('teacher-assignment-list'); if(!list)return;
  list.innerHTML=teacherQuizAssignments.length?teacherQuizAssignments.slice().reverse().map(a=>{
    const isl=ISLAND_DEFS[a.islandIdx];
    const target=a.studentId?(students.find(s=>s.id===a.studentId)?.name||'Onbekende leerling'):(a.className?'Klas '+a.className:'Iedereen');
    return `<div style="background:var(--surface2);padding:.65rem;border-radius:var(--radius-sm);display:flex;justify-content:space-between;gap:.5rem;align-items:center;"><div><strong>🏝️ ${isl?isl.name:'Onbekend eiland'}</strong><div style="font-size:.72rem;color:var(--muted);">${target}${a.deadline?' · 📅 '+a.deadline:''}</div></div><button class="btn btn-danger btn-sm" onclick="deleteQuizAssignment('${a.id}')">✕</button></div>`;
  }).join(''):'<span style="color:var(--muted);font-size:.8rem;">Nog geen opdrachten.</span>';
}
function createQuizAssignment(){
  if(currentUser?.role!=='docent') return showToast('Alleen docenten kunnen opdrachten maken','error');
  const idx=parseInt(document.getElementById('assign-island')?.value)-1;
  const studentId=document.getElementById('assign-user')?.value||'';
  const className=document.getElementById('assign-class')?.value||'';
  const deadline=document.getElementById('assign-deadline')?.value||'';
  const note=document.getElementById('assign-note')?.value.trim()||'';
  if(idx<0||idx>=ISLAND_DEFS.length)return showToast('Kies een geldig eilandnummer','error');
  if(!studentId&&!className)return showToast('Kies een leerling of klas','error');
  teacherQuizAssignments.push({id:'qa_'+Date.now(),islandIdx:idx,studentId,className,deadline,note,by:currentUser.name,date:new Date().toLocaleString('nl-NL')});
  safeStorageSet('ic_teacher_quiz_assignments',JSON.stringify(teacherQuizAssignments));
  renderAssignmentsPanel(); showToast('📝 Quiz-opdracht geplaatst','success');
}
function deleteQuizAssignment(id){
  if(!confirm('Deze opdracht verwijderen?'))return;
  teacherQuizAssignments=teacherQuizAssignments.filter(a=>a.id!==id);
  safeStorageSet('ic_teacher_quiz_assignments',JSON.stringify(teacherQuizAssignments));
  renderAssignmentsPanel();
}
function resetStudentQuiz(studentId,islandIdx){
  if(currentUser?.role!=='docent')return;
  const a=accounts.find(x=>x.id===studentId); if(!a)return;
  if(a.quizDone)a.quizDone[islandIdx]=false;
  if(a.quizScores)delete a.quizScores[islandIdx];
  a.redeemedCodes=(a.redeemedCodes||[]).filter(x=>x!=='quiz_'+islandIdx);
  saveAccounts(); renderProgress(); showToast('🧠 Quiz opnieuw beschikbaar gemaakt','success');
}

// IN-GAME QUIZ — volledig herschreven, werkt met alle veldformaten
// ════════════════════════════════════════════════════════
let quizState={};

function getQOpts(q){ return q.opts||q.o||[]; }
function getQCorrect(q){ return q.correct!==undefined?q.correct:(q.c!==undefined?q.c:0); }

function startIslandQuiz(islandIdx,quizId='main'){
  if(currentUser?.role==='leerling' && !quizIsUnlocked(islandIdx)){ showToast('🔒 Rond eerst het vorige eiland 100% goed af','warning'); return; }
  const sets=getIslandQuizSets(islandIdx);
  let selected=sets.find(x=>x.id===quizId)||sets[0];
  const questions=selected?.questions||islandQuizzes[islandIdx];
  if(!questions||!questions.length){ showToast('Geen vragen gevonden voor deze quiz','error'); return; }
  const normalized=questions.map(q=>({q:q.q||q.question||'',opts:getQOpts(q).map(String),correct:getQCorrect(q)}));
  quizState={islandIdx,quizId:selected?.id||quizId,quizTitle:selected?.title||'Quiz',questions:normalized,current:0,correct:0,answered:false};
  showTab('quiz');
  renderQuizQuestion();
}

function renderQuizQuestion(){
  const {islandIdx,questions,current}=quizState;
  const isl=ISLAND_DEFS[islandIdx];
  const q=questions[current];
  const opts=q.opts.filter(o=>String(o).trim());
  const wrap=document.getElementById('ingame-quiz-content');
  if(!wrap) return;
  wrap.innerHTML=`
    <div class="quiz-island-banner">
      <span class="qib-emoji">${isl.emoji}</span>
      <div class="qib-info">
        <div class="qib-title">${isl.name}</div>
        <div class="qib-sub">Vraag ${current+1} van ${questions.length} &nbsp;·&nbsp; ✅ ${quizState.correct} goed</div>
      </div>
      <span class="badge badge-accent">Eiland #${isl.id}</span>
    </div>
    <div class="quiz-card-game">
      <div class="quiz-progress-row">
        <span style="font-weight:800;">${current+1} / ${questions.length}</span>
        <span style="color:var(--accent4);">⭐ ${Math.round((current/questions.length)*100)}%</span>
      </div>
      <div class="progress-bar" style="height:7px;margin-bottom:1.3rem;">
        <div class="progress-fill purple" style="width:${Math.round((current/questions.length)*100)}%;transition:width .4s;"></div>
      </div>
      <p class="quiz-q-text">${escH(q.q)}</p>
      <div class="quiz-opts-grid">
        ${opts.map((opt,ai)=>`
          <button class="qopt" onclick="answerQuiz(${ai})">
            <span class="ol">${String.fromCharCode(65+ai)}</span>
            ${escH(opt)}
          </button>`).join('')}
      </div>
    </div>`;
  quizState.answered=false;
}

function answerQuiz(ai){
  if(quizState.answered) return;
  quizState.answered=true;
  const q=quizState.questions[quizState.current];
  const isCorrect=ai===q.correct;
  if(isCorrect) quizState.correct++;
  document.querySelectorAll('.qopt').forEach((btn,i)=>{
    btn.disabled=true;
    if(i===q.correct) btn.classList.add('correct');
    else if(i===ai&&!isCorrect) btn.classList.add('wrong');
  });
  setTimeout(()=>{
    quizState.current++;
    if(quizState.current<quizState.questions.length) renderQuizQuestion();
    else showQuizResult();
  },1000);
}

function showQuizResult(){
  const {islandIdx,quizId,quizTitle,questions,correct}=quizState;
  const isl=ISLAND_DEFS[islandIdx];
  const total=questions.length;
  const pct=Math.round((correct/total)*100);
  const factor=correct/total;

  // Instelbare beloning per quiz
  const reward=getQuizReward(islandIdx);
  const rewardItems=ITEMS.slice(0,5).map(it=>({id:it.id,c:pct===100?2:0})).filter(x=>x.c>0);
  const qd=getUserField('quizDone')||{};
  const qs=getUserField('quizScores')||{};
  const doneKey=quizId==='main'?String(islandIdx):`${islandIdx}:${quizId}`;
  const previousBest=Number(qs[doneKey]||0);
  const already=qd[doneKey]===true;
  let gotReward=false;
  const passed=pct===100;
  if(pct>previousBest){ qs[doneKey]=pct; setUserField('quizScores',qs); }
  if(passed && !already){
    qd[doneKey]=true; setUserField('quizDone',qd);
    const rc=getRedeemedCodes(); const rewardCode='quiz_'+doneKey; if(!rc.includes(rewardCode)) rc.push(rewardCode); setUserField('redeemedCodes',rc);
    const inv=getInventory(); rewardItems.forEach(({id,c})=>inv[id]=(inv[id]||0)+c); setUserField('inventory',inv);
    currentUser.coins=(currentUser.coins||0)+reward.coins;
    currentUser.gems=(currentUser.gems||0)+reward.gems;
    currentUser.xp=(currentUser.xp||0)+reward.xp;
    currentUser.trophies=(currentUser.trophies||0)+reward.trophies;
    ['coins','gems','xp','trophies'].forEach(f=>setUserField(f,currentUser[f]));
    saveAccounts(); gotReward=true;
  } else { saveAccounts(); }
  updateHUD();

  const wrap=document.getElementById('ingame-quiz-content');
  wrap.innerHTML=`
    <div class="quiz-island-banner">
      <span class="qib-emoji">${isl.emoji}</span>
      <div class="qib-info"><div class="qib-title">${isl.name}</div><div class="qib-sub">${escH(quizTitle||'Quiz')} afgerond!</div></div>
    </div>
    <div class="quiz-card-game">
      <div class="quiz-result-screen">
        <span class="qr-big">${pct>=80?'🏆':pct>=50?'🎉':'😓'}</span>
        <div class="qr-title" style="color:${pct>=50?'var(--accent3)':'var(--accent2)'}">${pct>=80?'Uitstekend!':pct>=50?'Goed gedaan!':'Probeer het nog eens'}</div>
        <p class="qr-sub">${correct} van ${total} goed — ${pct}%</p>
        ${!passed?`<div class="reward-box"><h4>🔒 Nog niet vrijgegeven</h4><p style="color:var(--muted);font-size:.85rem;">Je moet deze quiz 100% goed hebben om de volgende quiz vrij te spelen. Probeer opnieuw!</p></div>`:''}
        ${passed?(gotReward?`<div class="reward-box"><h4>🎁 Beloningen ontvangen</h4>
          <div class="reward-row">🪙 +${reward.coins} coins</div>
          <div class="reward-row">✨ +${reward.xp} XP</div>
          <div class="reward-row">💎 +${reward.gems} gems</div>
          <div class="reward-row">🏆 +${reward.trophies} trofeeën</div>
          ${rewardItems.length?`<div class="reward-row">📦 +${rewardItems.reduce((a,b)=>a+b.c,0)} bouwmaterialen</div>`:''}
        </div>`:`<div class="reward-box"><h4>✅ Quiz al voltooid</h4><p style="color:var(--muted);font-size:.85rem;">Deze quiz is al 100% voltooid en de beloning is al ontvangen.</p></div>`):''}
        <div style="display:flex;gap:.65rem;flex-wrap:wrap;justify-content:center;margin-top:.5rem;">
          <button class="btn btn-success" onclick="showTab('build');buildIslandIdx=${islandIdx};">🏗️ Ga bouwen →</button>
          <button class="btn btn-secondary" onclick="showTab('gate')">← Terug naar quizzen</button>
        </div>
      </div>
    </div>`;
  if(gotReward){ spawnConfetti(); spawnXP(`+${reward.xp} XP`); }
}

// ════════════════════════════════════════════════════════
// ISLANDS
// ════════════════════════════════════════════════════════
const state={page:0,_modalIsland:0};

function renderIslands(){
  const grid=document.getElementById('island-grid');
  const start=state.page*25;
  grid.innerHTML=ISLAND_DEFS.slice(start,start+25).map(isl=>{
    const idx=isl.id-1;
    const fill=islandFillForUser(idx);
    const unlocked=islandUnlocked(idx);
    const cls=fill===100?'complete':(!unlocked?'locked':'');
    const fc=fill===100?'#43e97b':fill>0?'#f9ca24':'rgba(255,255,255,.1)';
    const fl=fill===100?'✅ Vol!':fill>0?(fill+'%'):(unlocked?'Leeg':'🔒');
    const flc=fill===100?'full':fill>0?'partial':'empty';
    const hasQuiz=!!(islandQuizzes[idx]&&islandQuizzes[idx].length>0);
    return`<div class="island-card stagger-item ${cls}" onclick="openIslandModal(${idx})">
      <div class="isl-num">#${isl.id}</div>
      <span class="isl-emoji">${isl.emoji}</span>
      <div class="isl-name">${isl.name}</div>
      <div class="isl-fill ${flc}">${fl}</div>
      ${hasQuiz?`<div style="font-size:.55rem;color:var(--accent);font-weight:700;">🧠 quiz</div>`:''}
      <div class="isl-prog"><div class="isl-prog-fill" style="width:${fill}%;background:${fc};"></div></div>
    </div>`;
  }).join('');
  document.getElementById('page-info').textContent=`${state.page+1}/${Math.ceil(ISLAND_DEFS.length/25)}`;
  document.getElementById('btn-prev').disabled=state.page===0;
  document.getElementById('btn-next').disabled=state.page===9;
  triggerStagger();
}
function changePage(dir){ state.page=Math.max(0,Math.min(Math.ceil(ISLAND_DEFS.length/25)-1,state.page+dir)); renderIslands(); }

function openIslandModal(idx){
  const isl=ISLAND_DEFS[idx]; state._modalIsland=idx;
  const fill=islandFillForUser(idx); const unlocked=islandUnlocked(idx);
  const n=getSlotsN();
  document.getElementById('im-emoji').textContent=isl.emoji;
  document.getElementById('im-title').textContent=isl.name;
  document.getElementById('im-sub').textContent=`Eiland #${isl.id} · Level ${Math.floor(idx/25)+1}`;
  document.getElementById('im-stats').innerHTML=`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:.55rem .8rem;"><div style="font-size:.68rem;color:var(--muted);font-weight:700;">Voortgang</div><div style="font-size:1rem;font-weight:900;color:${fill===100?'var(--accent3)':'var(--text)'};">${fill}%</div></div>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:.55rem .8rem;"><div style="font-size:.68rem;color:var(--muted);font-weight:700;">Slots</div><div style="font-size:1rem;font-weight:900;">${getIslandSlots(idx).filter(Boolean).length}/${n}</div></div>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:.55rem .8rem;"><div style="font-size:.68rem;color:var(--muted);font-weight:700;">Status</div><div style="font-size:.85rem;font-weight:900;color:${unlocked?'var(--accent3)':'var(--accent2)'}">${unlocked?(fill===100?'✅ Vol':'Open'):'🔒 Vergrendeld'}</div></div>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:.55rem .8rem;"><div style="font-size:.68rem;color:var(--muted);font-weight:700;">Materialen</div><div style="font-size:.85rem;font-weight:900;">${totalInventory()}</div></div>`;
  const ln=document.getElementById('im-locked-notice');
  const cb=document.getElementById('im-complete-banner');
  const bb=document.getElementById('im-build-btn');
  if(!unlocked){ ln.classList.remove('hidden'); ln.textContent=`🔒 Vul eiland #${idx} 100% om dit te openen.`; cb.classList.add('hidden'); bb.disabled=true; bb.textContent='🔒 Vergrendeld'; }
  else if(fill===100){ ln.classList.add('hidden'); cb.classList.remove('hidden'); bb.disabled=false; bb.textContent='🔍 Bekijken'; }
  else { ln.classList.add('hidden'); cb.classList.add('hidden'); bb.disabled=false; bb.textContent='🏗️ Ga bouwen →'; }
  // Show quiz button if available
  const hasQuiz=!!(islandQuizzes[idx]&&islandQuizzes[idx].length>0);
  let extra=document.getElementById('im-quiz-btn');
  if(!extra){ extra=document.createElement('button'); extra.id='im-quiz-btn'; extra.className='btn btn-secondary btn-full'; extra.style.marginTop='.5rem'; bb.parentNode.appendChild(extra); }
  if(hasQuiz&&unlocked){ extra.textContent=`🧠 Quiz spelen (${islandQuizzes[idx].length} vragen)`; extra.style.display=''; extra.onclick=()=>{ document.getElementById('isl-modal-overlay').classList.remove('active'); startIslandQuiz(idx); }; }
  else { extra.style.display='none'; }
  document.getElementById('isl-modal-overlay').classList.add('active');
}
function goToBuildFromModal(){ buildIslandIdx=state._modalIsland; document.getElementById('isl-modal-overlay').classList.remove('active'); showTab('build'); }

// ════════════════════════════════════════════════════════
// BUILD
// ════════════════════════════════════════════════════════
let buildIslandIdx=0;
let selectedInvItem=null;

function renderBuild(){
  const idx=buildIslandIdx; const isl=ISLAND_DEFS[idx];
  const fill=islandFillForUser(idx); const unlocked=islandUnlocked(idx);
  const slots=getIslandSlots(idx); const inv=getInventory();
  if(!unlocked){
    document.getElementById('build-content').innerHTML=`<div style="text-align:center;padding:4rem 1rem;">
      <div style="font-size:3.5rem;margin-bottom:1rem;">🔒</div>
      <h2 style="margin-bottom:.4rem;">Eiland vergrendeld</h2>
      <p style="color:var(--muted);margin-bottom:1.25rem;">Vul eiland ${idx} (${ISLAND_DEFS[idx-1].name}) 100% om dit te openen.</p>
      <button class="btn btn-primary" onclick="buildIslandIdx=${idx-1};renderBuild();">← Vorige eiland</button>
    </div>`; return;
  }
  const slotsHTML=slots.map((s,si)=>{
    if(s){ const item=ITEMS.find(it=>it.id===s);
      return`<div class="canvas-slot filled"><span class="slot-item">${item?item.e:'❓'}</span><span class="slot-tip">${item?item.n:'?'}</span></div>`; }
    return`<div class="canvas-slot empty-slot" onclick="placeItem(${idx},${si})" title="Leeg slot"><span style="font-size:.75rem;color:var(--muted2);">+</span></div>`;
  }).join('');
  const invHas=ITEMS.some(it=>(inv[it.id]||0)>0);
  const invHTML=invHas?ITEMS.map(item=>{const cnt=inv[item.id]||0;if(!cnt)return'';const sel=selectedInvItem===item.id;
    return`<div class="inv-item${sel?' selected':''}" onclick="selectInvItem('${item.id}')"><span class="inv-emoji">${item.e}</span><div class="inv-name">${item.n}</div><span class="inv-count">×${cnt}</span></div>`;}).join('')
    :`<div style="grid-column:1/-1;text-align:center;padding:1rem;color:var(--muted);font-size:.8rem;"><span style="font-size:1.8rem;display:block;margin-bottom:.35rem;">📦</span>Geen materialen.<br><button class="btn btn-primary btn-sm" style="margin-top:.5rem;" onclick="showTab('gate')">Doe een quiz →</button></div>`;
  const selector=ISLAND_DEFS.slice(0,Math.min(5,500)).map((_,i)=>{
    const f=islandFillForUser(i);const lk=!islandUnlocked(i);
    return`<button onclick="${!lk?'buildIslandIdx='+i+';renderBuild();':''}" style="padding:.3rem .65rem;border-radius:var(--radius-sm);border:1px solid ${i===idx?'var(--accent)':'var(--border)'};background:${i===idx?'rgba(108,99,255,.15)':'var(--surface2)'};color:${lk?'var(--muted2)':i===idx?'var(--accent)':'var(--text)'};font-family:'Nunito',sans-serif;font-weight:700;font-size:.75rem;cursor:${lk?'not-allowed':'pointer'};" ${lk?'disabled':''}>${ISLAND_DEFS[i].emoji} #${i+1} ${f}%</button>`;
  }).join('');
  const completeBanner=fill===100?`<div class="unlock-banner">🎉 Eiland 100% vol!${idx+1<500?` Eiland ${idx+2} is ontgrendeld! 🔓`:' 🏆 Alle eilanden!'}</div>`:'';
  document.getElementById('build-content').innerHTML=`
    <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1rem;">${selector}${idx>=5?`<button style="padding:.3rem .65rem;border-radius:var(--radius-sm);border:1px solid var(--accent);background:rgba(108,99,255,.15);color:var(--accent);font-family:'Nunito',sans-serif;font-weight:700;font-size:.75rem;">${isl.emoji} #${idx+1}</button>`:''}</div>
    <div class="build-layout">
      <div class="island-canvas">
        <div class="canvas-title">${isl.emoji} ${isl.name}</div>
        <div class="canvas-sub">Selecteer een materiaal rechts → klik een leeg slot</div>
        <div class="fill-label"><span>Voortgang</span><span class="pct">${fill}% — ${slots.filter(Boolean).length}/${getSlotsN()}</span></div>
        <div class="progress-bar" style="height:11px;"><div class="progress-fill${fill===100?' gold':' green'}" style="width:${fill}%;"></div></div>
        <div class="island-grid-canvas">${slotsHTML}</div>
        ${completeBanner}
      </div>
      <div class="inventory-panel">
        <div class="inv-title">🎒 Materialen</div>
        <div class="inv-sub">${invHas?(selectedInvItem?`Geselecteerd: ${ITEMS.find(i=>i.id===selectedInvItem)?.e||''} — klik slot`:'Kies een materiaal'):'Doe een quiz →'}</div>
        <div class="inv-grid">${invHTML}</div>
        ${selectedInvItem?`<button class="btn btn-ghost btn-full btn-sm" onclick="selectedInvItem=null;renderBuild();">✕ Deselecteren</button>`:''}
        <div style="border-top:1px solid var(--border);margin-top:.85rem;padding-top:.8rem;">
          <div style="font-size:.7rem;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-bottom:.28rem;">Totaal voorraad</div>
          <div style="font-size:1.2rem;font-weight:900;">${totalInventory()} <span style="font-size:.78rem;color:var(--muted);">stuk(s)</span></div>
          ${totalInventory()===0?`<button class="btn btn-primary btn-full btn-sm" style="margin-top:.55rem;" onclick="showTab('gate')">Doe een quiz →</button>`:''}
        </div>
      </div>
    </div>`;
}

function selectInvItem(id){ selectedInvItem=selectedInvItem===id?null:id; renderBuild(); }
function placeItem(islandIdx,slotIdx){
  if(!selectedInvItem){ showToast('Selecteer eerst een materiaal','warning'); return; }
  const slots=getIslandSlots(islandIdx);
  if(slots[slotIdx]!==null) return;
  const inv=getInventory();
  if(!(inv[selectedInvItem]>0)){ showToast('Geen materialen meer','error'); return; }
  slots[slotIdx]=selectedInvItem;
  setIslandSlots(islandIdx,slots); // persists immediately
  inv[selectedInvItem]--;
  if(inv[selectedInvItem]<=0) delete inv[selectedInvItem];
  setUserField('inventory',inv);
  saveAccounts();
  const fill=islandFillForUser(islandIdx);
  spawnXP('+1 🏗️');
  if(!inv[selectedInvItem]) selectedInvItem=null;
  updateHUD();
  if(fill===100){ spawnConfetti(); showToast(`🎉 ${ISLAND_DEFS[islandIdx].name} 100% vol!`,'success'); if(islandIdx+1<500) setTimeout(()=>showToast(`🔓 Eiland ${islandIdx+2} ontgrendeld!`,'info'),2200); }
  renderBuild();
}

// ════════════════════════════════════════════════════════
// LEADERBOARD
// ════════════════════════════════════════════════════════
const AVCOLS=[['#1f2a5e','#7b8fff'],['#1e3a2f','#43e97b'],['#3a1e2a','#ff6584'],['#2a2a1e','#f9ca24'],['#1e2a3a','#6c63ff'],['#1e3030','#43e8e8'],['#2a1e3a','#b06cff'],['#3a2a1e','#ff9f43']];
let lbFilter='all',lbSearch='';

function renderLB(){
  const realPlayers=accounts.filter(a=>a.role==='leerling').map(a=>{
    const ci=(a.loginCode||'A').charCodeAt(0)%8;
    const eilanden=ISLAND_DEFS.filter((_,i)=>{
      const s=a.islandSlots?a.islandSlots[i]:null;
      return s&&Array.isArray(s)&&s.filter(Boolean).length>=getSlotsN();
    }).length;
    return{name:a.name,id:a.id,eilanden,trophies:a.trophies||0,bg:AVCOLS[ci][0],fg:AVCOLS[ci][1],initials:a.name.split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase(),isYou:a.id===currentUser?.id};
  });
  const filler=[{name:'Sander V.',eilanden:160,trophies:1920},{name:'Luna B.',eilanden:148,trophies:1776},{name:'Max de G.',eilanden:135,trophies:1620},{name:'Isa K.',eilanden:122,trophies:1464},{name:'Finn H.',eilanden:110,trophies:1320},{name:'Sara M.',eilanden:98,trophies:1176},{name:'Tim R.',eilanden:85,trophies:1020},{name:'Noah W.',eilanden:72,trophies:864}]
    .map((p,i)=>({...p,id:'filler'+i,bg:AVCOLS[i%8][0],fg:AVCOLS[i%8][1],initials:p.name.split(' ').map(x=>x[0]).join(''),isYou:false}));
  let data=[...realPlayers,...filler].sort((a,b)=>b.eilanden-a.eilanden||b.trophies-a.trophies);
  if(lbFilter==='top10') data=data.slice(0,10);
  if(lbSearch) data=data.filter(p=>p.name.toLowerCase().includes(lbSearch.toLowerCase()));
  const medals=['🥇','🥈','🥉'];
  document.getElementById('lb-list').innerHTML=data.length===0
    ?`<div style="text-align:center;padding:3rem;color:var(--muted);">Geen resultaten</div>`
    :data.map((p,i)=>{
      const rc=i===0?'gold':i===1?'silver':i===2?'bronze':'';
      const rl=i<3&&!lbSearch?medals[i]:`#${i+1}`;
      return`<div class="lb-row stagger-item${p.isYou?' is-you':''}">
        <span class="lb-rank ${rc}">${rl}</span>
        <div class="lb-avatar" style="background:${p.bg};color:${p.fg}">${p.initials}</div>
        <div class="lb-info"><div class="lb-name">${p.name}${p.isYou?'<span class="lb-you-badge">Jij</span>':''}</div><div class="lb-detail">🏝️ ${p.eilanden} eilanden · 🏆 ${p.trophies}</div></div>
        <div class="lb-score">${p.eilanden}</div>
      </div>`;
    }).join('');
  triggerStagger();
}
function filterLB(v){ lbSearch=v; renderLB(); }
function setLBFilter(f,btn){ lbFilter=f; document.querySelectorAll('.lb-filter').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderLB(); }

// ════════════════════════════════════════════════════════
// TABS & ADMIN TABS
// ════════════════════════════════════════════════════════
function showTab(name){
  document.getElementById('game-page')?.classList.remove('hidden');
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(b=>b.classList.remove('active'));
  const screen=document.getElementById('screen-'+name);
  if(!screen){ console.warn('Tab niet gevonden:',name); return; }
  screen.classList.add('active');
  const tb=document.getElementById('tab-'+name); if(tb) tb.classList.add('active');
  if(name==='islands') renderIslands();
  if(name==='build') renderBuild();
  if(name==='leaderboard') renderLB();
  if(name==='gate') renderGate();
  if(name==='quizzes') renderQuizHub();
  if(name==='student-tools') renderStudentTools();
  if(name==='school' && typeof renderStudentSchool==='function') renderStudentSchool();
  if(name==='tests') renderStudentTests();
  if(name==='lessons') renderStudentLessons();
  if(name==='shop') renderShop();
  if(name==='extras') renderExtras();
  if(name==='quiz'&&!document.getElementById('ingame-quiz-content').innerHTML) renderGate(); // fallback
  if(name==='admin' && hasDocentAccess()){ renderAdminSafe(); }
  window.scrollTo({top:0,behavior:'smooth'});
}

function switchAdminTab(tab,btn){
  if(!hasDocentAccess()) return showToast('Geen toegang tot het docentpanel','error');
  document.querySelectorAll('.admin-tab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.admin-panel').forEach(p=>p.classList.remove('active'));
  const panel=document.getElementById('apanel-'+tab);
  const button=btn||document.querySelector(`.admin-tab[onclick*=\"'${tab}'\"]`);
  if(!panel){ console.warn('Docentpaneel ontbreekt:',tab); return showToast('Deze docentfunctie kon niet worden geladen','error'); }
  if(button) button.classList.add('active');
  panel.classList.add('active');
  if(tab==='school' && typeof renderSchoolPanel==='function') renderSchoolPanel();
  if(tab==='quizbuilder') renderQBIslandSelect();
  if(tab==='accounts') renderAccountsTable();
  if(tab==='students') renderTeacherStudents();
  if(tab==='tests'){ renderTeacherTests(); }
  if(tab==='shop-manager'){ renderTeacherShop(); }
  if(tab==='island-grades'){ renderIslandGradePanel(); }
  if(tab==='dashboard'){ renderAdminStats(); renderDashboard(); }
  if(tab==='award') renderAwardPanel();
  if(tab==='progress') renderProgress();
  if(tab==='assignments') renderAssignmentsPanel();
  if(tab==='quiz-rewards') renderQuizRewardSettings();
  if(tab==='island-access'){ const us=document.getElementById('unlock-user'); const cs=document.getElementById('unlock-class'); const ls=accounts.filter(a=>a.role==='leerling'); if(us)us.innerHTML='<option value="">— kies leerling —</option>'+ls.map(a=>`<option value="${a.id}">${a.name} (${a.klas||'—'})</option>`).join(''); if(cs)cs.innerHTML='<option value="">— kies klas —</option>'+[...new Set(ls.map(a=>a.klas).filter(Boolean))].map(k=>`<option>${k}</option>`).join(''); }
  if(tab==='streak'){document.getElementById('streak-enabled').checked=!!streakSettings.enabled;document.getElementById('streak-target').value=streakSettings.target;document.getElementById('streak-reward').value=streakSettings.reward;}
  if(tab==='messages'){ renderTeacherMessages(); }
  if(tab==='badges'){ renderTeacherBadges(); }
  if(tab==='classroom'){ renderClassroomPanel(); }
  if(tab==='settings'){ const n=getSlotsN(); document.getElementById('slots-range').value=n; document.getElementById('slots-preview').textContent=n; document.getElementById('slots-current-val').textContent=n; document.getElementById('setting-quiz-url').value=appSettings.quizUrl||'https://digisprint.nl/quiz'; }
}

function renderAdminSafe(){
  if(!hasDocentAccess()) return;
  const screen=document.getElementById('screen-admin');
  if(screen) screen.classList.add('active');
  const nav=document.getElementById('tab-admin');
  if(nav) nav.classList.remove('hidden');
  const badge=document.getElementById('teacher-panel-badge');
  if(badge) badge.textContent='DOCENT';
  const jobs=[
    ['dashboard',renderAdminStats],['dashboard',renderDashboard],['accounts',renderAccountsTable],['quizbuilder',renderQBIslandSelect],['award',renderAwardPanel],['tools',renderTeacherTools],['assignments',renderAssignmentsPanel],['students',renderTeacherStudents],['tests',renderTeacherTests],['island-grades',renderIslandGradePanel],['classroom',renderClassroomPanel]
  ];
  jobs.forEach(([name,fn])=>{try{fn();}catch(e){console.error('Docentpanel '+name,e);}});
  try{restoreOpenFormDrafts();}catch(e){}
  try{switchAdminTab('dashboard',document.querySelector('.admin-tab[onclick*="dashboard"]'));}catch(e){}
}

function renderAdmin(){
  renderTeacherTools();
  renderAdminStats(); renderDashboard(); renderAccountsTable();
  renderAwardPanel(); renderProgress(); renderTeacherStudents(); renderTeacherTests(); renderIslandGradePanel(); renderAccountsTable(); renderClassroomPanel();
}

// ── AWARD PANEL ──
function renderAwardPanel(){
  const leerlingen=accounts.filter(a=>a.role==='leerling');
  const klassen=[...new Set(leerlingen.map(a=>a.klas).filter(k=>k&&k!=='—'))];
  const usel=document.getElementById('aw-user');
  const ksel=document.getElementById('aw-klas');
  if(usel) usel.innerHTML=`<option value="">— selecteer leerling —</option>`+leerlingen.map(a=>`<option value="${a.id}">${a.name} (${a.klas})</option>`).join('');
  if(ksel) ksel.innerHTML=`<option value="">— of selecteer klas —</option>`+klassen.map(k=>`<option value="${k}">Klas ${k}</option>`).join('');
  const grid=document.getElementById('award-items-grid');
  if(grid) grid.innerHTML=ITEMS.map(it=>`<div class="form-group" style="margin:0;"><label style="font-size:.72rem;">${it.e} ${it.n}</label><input type="number" id="aw-item-${it.id}" min="0" value="0" style="padding:.38rem .65rem;background:var(--surface3);border:1px solid var(--border);border-radius:var(--radius-xs);color:var(--text);font-family:'Nunito',sans-serif;font-size:.82rem;width:100%;"/></div>`).join('');
}

function getAwardTargets(){
  const klas=document.getElementById('aw-klas')?.value;
  const uid=document.getElementById('aw-user')?.value;
  if(klas) return accounts.filter(a=>a.klas===klas&&a.role==='leerling');
  if(uid) return accounts.filter(a=>a.id===uid);
  return[];
}

function awardResources(){
  const targets=getAwardTargets();
  if(!targets.length){showToast('Selecteer eerst een leerling of klas','error');return;}
  const coins=parseInt(document.getElementById('aw-coins').value)||0;
  const gems=parseInt(document.getElementById('aw-gems').value)||0;
  const elixir=parseInt(document.getElementById('aw-elixir').value)||0;
  const xp=parseInt(document.getElementById('aw-xp').value)||0;
  const trophies=parseInt(document.getElementById('aw-trophies').value)||0;
  if(!coins&&!gems&&!elixir&&!xp&&!trophies){showToast('Vul minimaal één waarde in','warning');return;}
  targets.forEach(a=>{
    a.coins=(a.coins||0)+coins; a.gems=(a.gems||0)+gems; a.elixir=(a.elixir||0)+elixir;
    a.xp=(a.xp||0)+xp; a.trophies=(a.trophies||0)+trophies;
    if(a.id===currentUser?.id){currentUser.coins=a.coins;currentUser.gems=a.gems;currentUser.elixir=a.elixir;currentUser.xp=a.xp;currentUser.trophies=a.trophies;}
  });
  saveAccounts(); updateHUD();
  showToast(`✅ Resources gegeven aan ${targets.length} leerling(en)`,'success');
  spawnConfetti();
  ['aw-coins','aw-gems','aw-elixir','aw-xp','aw-trophies'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=0; });
}

function awardItems(){
  const targets=getAwardTargets();
  if(!targets.length){showToast('Selecteer eerst een leerling of klas','error');return;}
  let total=0;
  const give={};
  ITEMS.forEach(it=>{ const v=parseInt(document.getElementById('aw-item-'+it.id)?.value)||0; if(v>0){give[it.id]=v;total+=v;} });
  if(!total){showToast('Vul minimaal één materiaal in','warning');return;}
  targets.forEach(a=>{
    if(!a.inventory)a.inventory={};
    Object.entries(give).forEach(([id,cnt])=>{ a.inventory[id]=(a.inventory[id]||0)+cnt; });
    if(a.id===currentUser?.id) currentUser.inventory=a.inventory;
  });
  saveAccounts();
  showToast(`📦 ${total} materialen gegeven aan ${targets.length} leerling(en)`,'success');
  ITEMS.forEach(it=>{ const el=document.getElementById('aw-item-'+it.id); if(el) el.value=0; });
}

function awardIsland(){
  const targets=getAwardTargets();
  if(!targets.length){showToast('Selecteer eerst een leerling of klas','error');return;}
  const num=parseInt(document.getElementById('aw-island-num').value)-1;
  if(num<0||num>=500){showToast('Eilandnummer moet 1–500 zijn','error');return;}
  const n=getSlotsN();
  targets.forEach(a=>{
    if(!a.islandSlots)a.islandSlots={};
    a.islandSlots[num]=Array(n).fill('star');
    a.unlockedIslands=a.unlockedIslands||[];
    if(!a.unlockedIslands.includes(num)) a.unlockedIslands.push(num);
    safeStorageSet('ic_slots_'+a.id, JSON.stringify(a.islandSlots));
    if(a.id===currentUser?.id){ setIslandSlots(num,Array(n).fill('star')); currentUser.islandSlots=a.islandSlots; }
  });
  saveAccounts(); updateHUD();
  showToast(`🔓 Eiland ${ISLAND_DEFS[num].name} ontgrendeld voor ${targets.length} leerling(en)`,'success');
  spawnConfetti();
}

function lockIsland(){
  const targets=getAwardTargets();
  if(!targets.length){showToast('Selecteer eerst een leerling of klas','error');return;}
  const num=parseInt(document.getElementById('lock-island-num').value)-1;
  if(num<0||num>=500){showToast('Eilandnummer moet 1–500 zijn','error');return;}
  const n=getSlotsN();
  targets.forEach(a=>{
    if(!a.islandSlots)a.islandSlots={};
    a.islandSlots[num]=Array(n).fill(null);
    safeStorageSet('ic_slots_'+a.id, JSON.stringify(a.islandSlots));
    if(a.id===currentUser?.id){ setIslandSlots(num,Array(n).fill(null)); currentUser.islandSlots=a.islandSlots; }
  });
  saveAccounts(); updateHUD();
  showToast(`🔒 Eiland ${ISLAND_DEFS[num].name} vergrendeld voor ${targets.length} leerling(en)`,'info');
}

function removeResources(){
  const targets=getAwardTargets();
  if(!targets.length){showToast('Selecteer eerst een leerling of klas','error');return;}
  const gems=parseInt(document.getElementById('rm-gems').value)||0;
  const xp=parseInt(document.getElementById('rm-xp').value)||0;
  const trophies=parseInt(document.getElementById('rm-trophies').value)||0;
  const elixir=parseInt(document.getElementById('rm-elixir').value)||0;
  targets.forEach(a=>{
    a.gems=Math.max(0,(a.gems||0)-gems); a.elixir=Math.max(0,(a.elixir||0)-elixir);
    a.xp=Math.max(0,(a.xp||0)-xp); a.trophies=Math.max(0,(a.trophies||0)-trophies);
    if(a.id===currentUser?.id){currentUser.coins=a.coins;currentUser.gems=a.gems;currentUser.elixir=a.elixir;currentUser.xp=a.xp;currentUser.trophies=a.trophies;}
  });
  saveAccounts(); updateHUD();
  showToast(`✅ Resources verwijderd van ${targets.length} leerling(en)`,'info');
  ['rm-gems','rm-xp','rm-trophies','rm-elixir'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=0; });
}

// ── PROGRESS PANEL ──
function renderProgress(){
  const kf=document.getElementById('prog-klas-filter')?.value||'';
  const leerlingen=accounts.filter(a=>a.role==='leerling');
  const klassen=[...new Set(leerlingen.map(a=>a.klas).filter(k=>k&&k!=='—'))];
  const ksel=document.getElementById('prog-klas-filter');
  if(ksel){ const cur=ksel.value; ksel.innerHTML=`<option value="">Alle klassen</option>`+klassen.map(k=>`<option value="${k}" ${k===cur?'selected':''}>${k}</option>`).join(''); }
  const filtered=leerlingen.filter(a=>!kf||a.klas===kf);
  const container=document.getElementById('prog-cards');
  if(!container)return;
  const n=getSlotsN();
  container.innerHTML=filtered.length===0?`<p style="color:var(--muted);">Geen leerlingen gevonden.</p>`:filtered.map(a=>{
    const s=a.islandSlots||{};
    const owned=ISLAND_DEFS.filter((_,i)=>s[i]&&Array.isArray(s[i])&&s[i].filter(Boolean).length>=n).length;
    const pct=Math.round((owned/500)*100);
    const qdone=Object.keys(a.quizDone||{}).length;
    return`<div class="card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem;">
        <div><div style="font-weight:900;">${a.name}</div><div style="font-size:.72rem;color:var(--muted);">${a.klas} · 🔑 ${a.loginCode||'—'}</div></div>
        <span class="badge badge-accent">${owned}/500</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.3rem;margin-bottom:.6rem;font-size:.75rem;">
        <div style="background:var(--surface2);border-radius:var(--radius-xs);padding:.35rem .55rem;">💎 ${a.gems||0}</div>
        <div style="background:var(--surface2);border-radius:var(--radius-xs);padding:.35rem .55rem;">⚡ ${a.elixir||0}</div>
        <div style="background:var(--surface2);border-radius:var(--radius-xs);padding:.35rem .55rem;">✨ ${fmtNum(a.xp||0)} XP</div>
        <div style="background:var(--surface2);border-radius:var(--radius-xs);padding:.35rem .55rem;">🏆 ${a.trophies||0}</div>
        <div style="background:var(--surface2);border-radius:var(--radius-xs);padding:.35rem .55rem;">🧠 ${qdone} quizzen</div>
        <div style="background:var(--surface2);border-radius:var(--radius-xs);padding:.35rem .55rem;">📦 ${Object.values(a.inventory||{}).reduce((x,y)=>x+y,0)} mat.</div>
      </div>
      <div style="font-size:.7rem;font-weight:700;display:flex;justify-content:space-between;margin-bottom:.26rem;"><span>Eilanden vol</span><span style="color:var(--accent3);">${pct}%</span></div>
      <div class="progress-bar" style="height:6px;"><div class="progress-fill green" style="width:${pct}%;"></div></div>
      <div style="display:flex;gap:.35rem;margin-top:.7rem;">
        <button class="btn btn-success btn-sm" style="flex:1;" onclick="document.getElementById('aw-user').value='${a.id}';switchAdminTab('award',document.querySelectorAll('.admin-tab')[2]);">🎁 Belonen</button>
        <button class="btn btn-danger btn-sm" onclick="deleteAccount('${a.id}')">🗑️</button>
      </div>
    </div>`;
  }).join('');
}

// ── SETTINGS ──
function saveSlotsSettings(){
  const v=parseInt(document.getElementById('slots-range').value);
  appSettings.slots=v; saveAppSettings();
  document.getElementById('slots-current-val').textContent=v;
  showToast(`Slots per eiland ingesteld op ${v}`,'success');
}
function saveQuizUrlSetting(){
  const v=document.getElementById('setting-quiz-url').value.trim();
  appSettings.quizUrl=v; saveAppSettings();
  showToast('Quiz URL opgeslagen','success');
}
function resetAllProgress(){
  if(!confirm('Alle voortgang van alle leerlingen resetten?'))return;
  accounts.filter(a=>a.role==='leerling').forEach(a=>{
    a.gems=0;a.elixir=0;a.xp=0;a.trophies=0;a.inventory={};a.quizDone={};a.quizScores={};a.islandSlots={};
    safeStorageSet('ic_slots_'+a.id, '');
  });
  saveAccounts(); updateHUD(); renderAdmin();
  showToast('Alle voortgang gereset','warning');
}
function resetAllQuizDone(){
  if(!confirm('Alle quizvoortgang resetten?'))return;
  accounts.filter(a=>a.role==='leerling').forEach(a=>{a.quizDone={};a.quizScores={};});
  saveAccounts(); showToast('Quizvoortgang gereset','warning');
}
function exportData(){
  const data=accounts.filter(a=>a.role==='leerling').map(a=>({name:a.name,klas:a.klas,code:a.loginCode,gems:a.gems||0,xp:a.xp||0,trophies:a.trophies||0,eilanden:Object.keys(a.islandSlots||{}).length}));
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');link.href=url;link.download='island-clash-data.json';link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  showToast('Data geëxporteerd','success');
}

// ════════════════════════════════════════════════════════
// DOCENT LEERLINGEN + TOETSENSYSTEEM
// ════════════════════════════════════════════════════════
function getTeacherStudents(){ return accounts.filter(a=>a.role==='leerling'); }
function renderTeacherStudents(){
  if(currentUser?.role!=='docent') return;
  const students=getTeacherStudents();
  const sel=document.getElementById('teacher-student-class');
  if(sel){ const cur=sel.value; const classes=[...new Set(students.map(a=>a.klas).filter(Boolean))]; sel.innerHTML='<option value="">Alle klassen</option>'+classes.map(k=>`<option value="${escH(k)}">Klas ${escH(k)}</option>`).join(''); if(classes.includes(cur)) sel.value=cur; }
  const search=(document.getElementById('teacher-student-search')?.value||'').toLowerCase();
  const klas=sel?.value||'';
  const list=students.filter(a=>(!klas||a.klas===klas)&&(!search||a.name.toLowerCase().includes(search)||(a.loginCode||'').toLowerCase().includes(search)));
  const el=document.getElementById('teacher-students-list'); if(!el)return;
  el.innerHTML=list.length?`<div class="table-wrap"><table><thead><tr><th>Leerling</th><th>Klas</th><th>XP</th><th>🧠 Quizzen</th><th>🏝️ Eilanden</th><th>🔥 Streak</th><th>Actie</th></tr></thead><tbody>${list.map(a=>{
    const islands=ISLAND_DEFS.filter((_,i)=>a.islandSlots?.[i]?.filter(Boolean).length>=getSlotsN()).length;
    return `<tr><td><strong>${escH(a.name)}</strong><br><span style="font-size:.7rem;color:var(--muted)">${a.loginCode||'—'}</span></td><td>${escH(a.klas||'—')}</td><td>${fmtNum(a.xp||0)}</td><td>${Object.keys(a.quizDone||{}).length}</td><td>${islands}</td><td>🔥 ${a.streak?.count||0}</td><td><button class="btn btn-secondary btn-sm" onclick="showTeacherStudent('${a.id}')">👀 Bekijk</button></td></tr>`;
  }).join('')}</tbody></table></div>`:'<div class="card" style="color:var(--muted)">Geen leerlingen gevonden.</div>';
}
function showTeacherStudent(id){
  const a=accounts.find(x=>x.id===id); if(!a)return;
  const scores=Object.entries(a.quizScores||{}).slice(0,12).map(([i,v])=>`<span class="badge ${Number(v)===100?'badge-success':'badge-accent'}">Quiz ${Number(i)+1}: ${v}%</span>`).join(' ');
  const el=document.getElementById('teacher-student-detail'); if(!el)return;
  el.innerHTML=`<div class="card"><div style="display:flex;justify-content:space-between;gap:.5rem;align-items:center;flex-wrap:wrap"><h3>👤 ${escH(a.name)}</h3><button class="btn btn-ghost btn-sm" onclick="document.getElementById('teacher-student-detail').innerHTML=''">Sluiten</button></div><div class="admin-grid" style="margin-top:.8rem"><div class="stat-card"><div class="sc-label">✨ XP</div><div class="sc-val">${fmtNum(a.xp||0)}</div></div><div class="stat-card"><div class="sc-label">🪙 Coins</div><div class="sc-val">${fmtNum(a.coins||0)}</div></div><div class="stat-card"><div class="sc-label">🏆 Trofeeën</div><div class="sc-val">${a.trophies||0}</div></div><div class="stat-card"><div class="sc-label">🔥 Streak</div><div class="sc-val">${a.streak?.count||0}</div></div></div><p style="margin-top:.8rem;color:var(--muted)">Klas: <strong>${escH(a.klas||'—')}</strong> · Inlogcode: <strong>${a.loginCode||'—'}</strong></p><div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.7rem">${scores||'<span style="color:var(--muted)">Nog geen quizscores.</span>'}</div></div>`;
}
function saveTeacherTests(){ safeStorageSet('ic_teacher_tests',JSON.stringify(teacherTests)); }
function saveTestSubmissions(){ safeStorageSet('ic_test_submissions',JSON.stringify(testSubmissions)); }
let teacherTestDraft=[];
function renderTeacherTestBuilder(){
  const el=document.getElementById('test-question-builder'); if(!el)return;
  if(!teacherTestDraft.length){el.innerHTML='<div class="teacher-mini-card" style="color:var(--muted);margin-bottom:.6rem">Nog geen vragen. Klik op <strong>Vraag toevoegen</strong>.</div>';return;}
  el.innerHTML=teacherTestDraft.map((q,i)=>`<div class="test-question-row"><div style="display:flex;justify-content:space-between;gap:.5rem;align-items:center"><strong>Vraag ${i+1}</strong><div class="test-q-actions"><button class="btn btn-ghost btn-sm" onclick="moveTeacherTestQuestion(${i},-1)">↑</button><button class="btn btn-ghost btn-sm" onclick="moveTeacherTestQuestion(${i},1)">↓</button><button class="btn btn-danger btn-sm" onclick="removeTeacherTestQuestion(${i})">🗑️</button></div></div><input value="${escH(q.q)}" oninput="teacherTestDraft[${i}].q=this.value" placeholder="Typ de vraag..."><div class="test-q-grid"><input value="${escH(q.answer)}" oninput="teacherTestDraft[${i}].answer=this.value" placeholder="Juiste antwoord"><input type="number" min="1" value="${q.points||1}" oninput="teacherTestDraft[${i}].points=Math.max(1,parseInt(this.value)||1)" placeholder="Punten"></div></div>`).join('');
}
function addTeacherTestQuestion(){teacherTestDraft.push({q:'',answer:'',points:1});renderTeacherTestBuilder();setTimeout(()=>{const xs=document.querySelectorAll('#test-question-builder input');xs[xs.length-2]?.focus();},30);}
function removeTeacherTestQuestion(i){teacherTestDraft.splice(i,1);renderTeacherTestBuilder();}
function moveTeacherTestQuestion(i,d){const n=i+d;if(n<0||n>=teacherTestDraft.length)return;[teacherTestDraft[i],teacherTestDraft[n]]=[teacherTestDraft[n],teacherTestDraft[i]];renderTeacherTestBuilder();}
function clearTeacherTestDraft(){teacherTestDraft=[];document.getElementById('test-title').value='';renderTeacherTestBuilder();}
function createTeacherTest(){
  if(currentUser?.role!=='docent')return;
  const title=document.getElementById('test-title')?.value.trim(); const className=document.getElementById('test-class')?.value||'';
  const questions=teacherTestDraft.map((q,i)=>({id:'q'+i,q:String(q.q||'').trim(),answer:String(q.answer||'').trim(),points:Math.max(1,parseInt(q.points)||1)})).filter(q=>q.q&&q.answer);
  if(!title)return showToast('Vul een toetsnaam in','warning');
  if(!questions.length)return showToast('Voeg minstens één volledige vraag toe','warning');
  const reward={coins:Math.max(0,parseInt(document.getElementById('test-reward-coins')?.value)||0),xp:Math.max(0,parseInt(document.getElementById('test-reward-xp')?.value)||0),gems:Math.max(0,parseInt(document.getElementById('test-reward-gems')?.value)||0),trophies:Math.max(0,parseInt(document.getElementById('test-reward-trophies')?.value)||0),materials:{}}; ITEMS.forEach(it=>{const v=Math.max(0,parseInt(document.getElementById('test-reward-'+it.id)?.value)||0);if(v)reward.materials[it.id]=v;}); teacherTests.push({id:'test_'+Date.now(),title,className,questions,reward,createdBy:currentUser.name,createdAt:new Date().toLocaleString('nl-NL'),active:true});saveTeacherTests();clearTeacherTestDraft();renderTeacherTests();showToast('📝 Toets gemaakt','success');
}
function renderTeacherTests(){
  if(currentUser?.role!=='docent')return;
  const cs=[...new Set(getTeacherStudents().map(a=>a.klas).filter(Boolean))]; const sel=document.getElementById('test-class'); if(sel){const cur=sel.value;sel.innerHTML='<option value="">Alle leerlingen</option>'+cs.map(k=>`<option value="${escH(k)}">Klas ${escH(k)}</option>`).join('');if(cs.includes(cur))sel.value=cur;}
  renderTeacherTestBuilder();
  const rm=document.getElementById('test-reward-materials'); if(rm)rm.innerHTML='<div style="font-size:.75rem;font-weight:800;margin-bottom:.35rem;">📦 Bouwmaterialen</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:.4rem;">'+ITEMS.map(it=>`<input id="test-reward-${it.id}" type="number" min="0" value="0" placeholder="${it.e} ${it.n}">`).join('')+'</div>';
  const el=document.getElementById('teacher-tests-list'); if(!el)return;
  el.innerHTML=teacherTests.length?teacherTests.slice().reverse().map(t=>{const subs=testSubmissions.filter(s=>s.testId===t.id);return `<div class="card" style="margin-bottom:.6rem"><div style="display:flex;justify-content:space-between;gap:.5rem;align-items:center"><div><h3>${escH(t.title)}</h3><p style="color:var(--muted);font-size:.75rem">${t.className?'Klas '+escH(t.className):'Alle leerlingen'} · ${t.questions.length} vragen · ${subs.length} inzendingen</p></div><button class="btn btn-secondary btn-sm" onclick="renderTestResults('${t.id}')">📋 Nakijken</button></div></div>`}).join(''):'<div class="card" style="color:var(--muted)">Nog geen toetsen gemaakt.</div>';
}
function renderTestResults(testId){const t=teacherTests.find(x=>x.id===testId);if(!t)return;const el=document.getElementById('teacher-test-results');if(!el)return;const subs=testSubmissions.filter(s=>s.testId===testId);el.innerHTML=`<div class="card"><h3>📋 Nakijken: ${escH(t.title)}</h3>${subs.length?`<div class="table-wrap" style="margin-top:.7rem"><table><thead><tr><th>Leerling</th><th>Score</th><th>Feedback</th><th>Actie</th></tr></thead><tbody>${subs.map(s=>`<tr><td>${escH(s.studentName)}</td><td><input id="score-${s.id}" type="number" min="0" max="100" value="${s.score}" style="width:80px"></td><td><input id="fb-${s.id}" value="${escH(s.feedback||'')}" placeholder="Feedback" style="min-width:180px"></td><td><button class="btn btn-success btn-sm" onclick="gradeTest('${s.id}')">💾 Opslaan</button></td></tr>`).join('')}</tbody></table></div>`:'<p style="color:var(--muted);margin-top:.6rem">Nog geen inzendingen.</p>'}</div>`;}
function gradeTest(subId){const s=testSubmissions.find(x=>x.id===subId);if(!s)return;const score=Math.max(0,Math.min(100,parseInt(document.getElementById('score-'+subId)?.value)||0));s.score=score;s.feedback=document.getElementById('fb-'+subId)?.value||'';s.gradedBy=currentUser.name;s.gradedAt=new Date().toLocaleString('nl-NL');saveTestSubmissions();renderTeacherTests();showToast('✅ Toets nagekeken','success');}
function renderStudentTests(){if(currentUser?.role!=='leerling')return;const el=document.getElementById('student-tests-content');if(!el)return;const available=teacherTests.filter(t=>t.active&&(!t.className||t.className===currentUser.klas));el.innerHTML=available.length?available.map(t=>{const sub=testSubmissions.find(s=>s.testId===t.id&&s.studentId===currentUser.id);return `<div class="card" style="margin-bottom:.7rem"><h3>📝 ${escH(t.title)}</h3><p style="color:var(--muted);font-size:.78rem;margin:.3rem 0 .7rem">${t.questions.length} vragen · ${t.className?'Klas '+escH(t.className):'voor iedereen'}</p>${sub?`<div class="reward-box">✅ Ingeleverd · Score: <strong>${sub.score}%</strong>${sub.feedback?`<br>💬 ${escH(sub.feedback)}`:''}</div>`:`<button class="btn btn-primary" onclick="startTeacherTest('${t.id}')">▶ Toets maken</button>`}</div>`}).join(''):'<div class="card" style="color:var(--muted)">Er zijn nog geen toetsen voor jou.</div>';}
function startTeacherTest(testId){const t=teacherTests.find(x=>x.id===testId);if(!t)return;activeTestId=testId;const el=document.getElementById('student-tests-content');el.innerHTML=`<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem"><h2>📝 ${escH(t.title)}</h2><span class="badge badge-accent">${t.questions.length} vragen</span></div><div id="active-test-form" style="margin-top:1rem">${t.questions.map((q,i)=>`<div class="test-question-row"><label><strong>${i+1}. ${escH(q.q)}</strong> <span style="color:var(--muted);font-size:.75rem">(${q.points} p.)</span></label><input id="test-answer-${i}" placeholder="Typ je antwoord..."></div>`).join('')}<button class="btn btn-success btn-full" onclick="submitTeacherTest('${t.id}')">📤 Toets inleveren</button></div></div>`;}
function submitTeacherTest(testId){const t=teacherTests.find(x=>x.id===testId);if(!t)return;const answers=t.questions.map((q,i)=>document.getElementById('test-answer-'+i)?.value.trim()||'');let got=0,total=t.questions.reduce((n,q)=>n+q.points,0);t.questions.forEach((q,i)=>{if(answers[i].toLowerCase()===q.answer.toLowerCase())got+=q.points});const score=total?Math.round(got/total*100):0;const reward=t.reward||{}; const rewardKey='test_reward_'+testId; const already=(currentUser.redeemedCodes||[]).includes(rewardKey); if(!already){currentUser.coins=(currentUser.coins||0)+(reward.coins||0);currentUser.xp=(currentUser.xp||0)+(reward.xp||0);currentUser.gems=(currentUser.gems||0)+(reward.gems||0);currentUser.trophies=(currentUser.trophies||0)+(reward.trophies||0);currentUser.inventory=currentUser.inventory||{};Object.entries(reward.materials||{}).forEach(([id,c])=>currentUser.inventory[id]=(currentUser.inventory[id]||0)+c);currentUser.redeemedCodes=currentUser.redeemedCodes||[];currentUser.redeemedCodes.push(rewardKey);saveAccounts();updateHUD();} testSubmissions.push({id:'sub_'+Date.now(),testId,studentId:currentUser.id,studentName:currentUser.name,answers,score,feedback:'',submittedAt:new Date().toLocaleString('nl-NL'),rewardClaimed:!already});saveTestSubmissions();showToast('📤 Toets ingeleverd'+(reward&&!already?' + beloningen ontvangen!':''),'success');renderStudentTests();}


function setQuickAnnouncement(){const v=document.getElementById('quick-announcement')?.value.trim();if(!v)return;teacherAnnouncement=v;safeStorageSet('ic_teacher_announcement',JSON.stringify(v));showToast('📢 Aankondiging geplaatst','success');}
function setDailyMission(){const v=document.getElementById('daily-mission')?.value.trim();if(!v)return;safeStorageSet('ic_daily_mission',JSON.stringify({text:v,date:new Date().toLocaleDateString('nl-NL')}));showToast('🎯 Dagmissie ingesteld','success');}
function setTeacherReminder(){const v=document.getElementById('teacher-reminder')?.value.trim();if(!v)return;safeStorageSet('ic_teacher_reminder',JSON.stringify(v));showToast('🔔 Herinnering opgeslagen','success');}

// ════════════════════════════════════════════════════════
// EILANDCIJFERS & SCHERMCONTROLE
// ════════════════════════════════════════════════════════
function teacherStudentsForSelect(){return accounts.filter(a=>a.role==='leerling');}
function renderIslandGradePanel(){
  if(currentUser?.role!=='docent')return;
  const students=teacherStudentsForSelect();
  const us=document.getElementById('grade-island-user'); if(us)us.innerHTML='<option value="">— kies leerling —</option>'+students.map(a=>`<option value="${a.id}">${escH(a.name)} (${escH(a.klas||'—')})</option>`).join('');
  renderIslandGradePreview(); renderIslandGradesList();
}
function renderIslandGradePreview(){
  const uid=document.getElementById('grade-island-user')?.value; const n=Math.max(1,Math.min(500,parseInt(document.getElementById('grade-island-num')?.value)||1)); const el=document.getElementById('island-grade-preview');
  if(!el)return; const a=accounts.find(x=>x.id===uid); const isl=ISLAND_DEFS[n-1];
  el.innerHTML=a&&isl?`<strong>${escH(a.name)}</strong> · ${isl.emoji} ${escH(isl.name)} · huidig cijfer: <strong>${a.islandGrades?.[n-1]?.score??'—'}</strong>`:'Kies een leerling en eiland.';
}
function saveIslandGrade(){
  if(currentUser?.role!=='docent')return showToast('Alleen docenten kunnen cijfers geven','error');
  const uid=document.getElementById('grade-island-user')?.value; const n=Math.max(1,Math.min(500,parseInt(document.getElementById('grade-island-num')?.value)||1)); const score=Number(document.getElementById('grade-island-score')?.value); const feedback=document.getElementById('grade-island-feedback')?.value.trim()||''; const a=accounts.find(x=>x.id===uid);
  if(!a)return showToast('Kies eerst een leerling','error'); if(!(score>=1&&score<=10))return showToast('Geef een cijfer van 1 t/m 10','error');
  a.islandGrades=a.islandGrades||{}; a.islandGrades[n-1]={score,feedback,by:currentUser.name,date:new Date().toLocaleString('nl-NL')}; saveAccounts(); currentUser=a; renderIslandGradePreview(); renderIslandGradesList(); showToast('🏝️ Cijfer opgeslagen','success');
}
function renderIslandGradesList(){
  const el=document.getElementById('island-grades-list'); if(!el)return; const uid=document.getElementById('grade-island-user')?.value; const a=accounts.find(x=>x.id===uid); if(!a){el.innerHTML='';return;}
  const grades=Object.entries(a.islandGrades||{}).sort((x,y)=>Number(x[0])-Number(y[0])); el.innerHTML=grades.length?`<div class="card"><h3>📋 Cijfers van ${escH(a.name)}</h3><div class="table-wrap"><table><thead><tr><th>Eiland</th><th>Cijfer</th><th>Feedback</th><th>Datum</th></tr></thead><tbody>${grades.map(([i,g])=>`<tr><td>${Number(i)+1}</td><td><strong>${g.score}</strong></td><td>${escH(g.feedback||'—')}</td><td>${escH(g.date||'—')}</td></tr>`).join('')}</tbody></table></div></div>`:'<div class="card" style="color:var(--muted)">Deze leerling heeft nog geen eilandcijfers.</div>';
}


// ════════════════════════════════════════════════════════
// EXTRA DOCENT- EN LEERLINGFUNCTIES
// ════════════════════════════════════════════════════════
function saveTeacherAnnouncement(){
  if(currentUser?.role!=='docent') return showToast('Alleen docenten kunnen dit doen','error');
  const text=document.getElementById('teacher-announcement')?.value.trim();
  if(!text) return showToast('Vul eerst een bericht in','warning');
  teacherAnnouncement={text,by:currentUser.name,date:new Date().toLocaleString('nl-NL')};
  safeStorageSet('ic_teacher_announcement',JSON.stringify(teacherAnnouncement));
  showToast('📢 Bericht gepubliceerd','success');
  renderStudentTools();
}
function saveTeacherGoal(){
  if(currentUser?.role!=='docent') return showToast('Alleen docenten kunnen dit doen','error');
  const text=document.getElementById('teacher-goal')?.value.trim();
  const xp=Math.max(0,parseInt(document.getElementById('teacher-goal-xp')?.value)||0);
  if(!text) return showToast('Vul eerst een doel in','warning');
  teacherGoal={text,xp,by:currentUser.name,date:new Date().toLocaleString('nl-NL')};
  safeStorageSet('ic_teacher_goal',JSON.stringify(teacherGoal));
  showToast('🎯 Doel ingesteld','success');
  renderStudentTools();
}
function renderTeacherTools(){
  if(currentUser?.role!=='docent') return;
  const students=accounts.filter(a=>a.role==='leerling');
  const classes=[...new Set(students.map(a=>a.klas).filter(Boolean))];
  const avgXP=students.length?Math.round(students.reduce((n,a)=>n+(a.xp||0),0)/students.length):0;
  const avgIslands=students.length?Math.round(students.reduce((n,a)=>n+ISLAND_DEFS.filter((_,i)=>a.islandSlots?.[i]?.filter(Boolean).length>=getSlotsN()).length,0)/students.length):0;
  const el=document.getElementById('teacher-class-summary');
  if(el) el.innerHTML=`👥 <strong>${students.length}</strong> leerlingen<br>🏫 <strong>${classes.length}</strong> klassen<br>✨ Gemiddeld <strong>${avgXP} XP</strong><br>🏝️ Gemiddeld <strong>${avgIslands} volle eilanden</strong>`;
  const a=document.getElementById('teacher-announcement'); if(a) a.value=teacherAnnouncement?.text||'';
  const g=document.getElementById('teacher-goal'); if(g) g.value=teacherGoal?.text||'';
  const gx=document.getElementById('teacher-goal-xp'); if(gx) gx.value=teacherGoal?.xp||100;
}
function exportTeacherCSV(){
  if(currentUser?.role!=='docent') return showToast('Alleen docenten kunnen exporteren','error');
  const rows=[['Naam','Klas','Inlogcode','XP','Trofeeën','Volle eilanden']];
  accounts.filter(a=>a.role==='leerling').forEach(a=>{
    const owned=ISLAND_DEFS.filter((_,i)=>a.islandSlots?.[i]?.filter(Boolean).length>=getSlotsN()).length;
    rows.push([a.name,a.klas||'',a.loginCode||'',a.xp||0,a.trophies||0,owned]);
  });
  const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(';')).join('\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob); const link=document.createElement('a');
  link.href=url; link.download='island-clash-leerlingen.csv'; link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  showToast('📥 CSV gedownload','success');
}
function renderStudentTools(){
  if(currentUser?.role!=='leerling') return;
  const owned=ISLAND_DEFS.filter((_,i)=>islandFillForUser(i)===100).length;
  const qdone=Object.keys(currentUser.quizDone||{}).length;
  const inv=totalInventory();
  const goal=teacherGoal?.text||'Er is nog geen doel ingesteld.';
  const announcement=teacherAnnouncement?.text||'Er is nog geen bericht van je docent.';
  const el=document.getElementById('student-tools-content');
  if(!el) return;
  el.innerHTML=`<div class="admin-grid">
    <div class="stat-card"><div class="sc-label">🏝️ Volle eilanden</div><div class="sc-val">${owned}</div><div class="sc-sub">van ${ISLAND_DEFS.length}</div></div>
    <div class="stat-card"><div class="sc-label">🧠 Quizzen</div><div class="sc-val">${qdone}</div><div class="sc-sub">quizzen voltooid</div></div>
    <div class="stat-card"><div class="sc-label">✨ XP</div><div class="sc-val">${fmtNum(currentUser.xp||0)}</div><div class="sc-sub">jouw score</div></div>
    <div class="stat-card"><div class="sc-label">📦 Materialen</div><div class="sc-val">${inv}</div><div class="sc-sub">in je inventaris</div></div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;">
    <div class="card"><h3>📢 Bericht van je docent</h3><p style="color:var(--muted);margin-top:.5rem;">${announcement}</p></div>
    <div class="card"><h3>🎯 Jouw opdracht</h3><p style="color:var(--muted);margin-top:.5rem;">${goal}</p>${teacherGoal?.xp?`<p style="margin-top:.5rem;font-weight:800;color:var(--accent3);">Beloning: +${teacherGoal.xp} XP</p>`:''}</div>
  </div>
  <div class="card" style="margin-top:1rem;"><h3>🏅 Jouw badges</h3><div id="student-badges" style="margin-top:.6rem"></div></div>
  <div class="card" style="margin-top:1rem;"><h3>🏅 Jouw prestaties</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.6rem;margin-top:.75rem;">
    <div style="background:var(--surface2);padding:.7rem;border-radius:var(--radius-sm);">🌱 <strong>Starter</strong><br><span style="font-size:.72rem;color:var(--muted);">Eerste quiz voltooid</span></div>
    <div style="background:var(--surface2);padding:.7rem;border-radius:var(--radius-sm);opacity:${qdone>=5?1:.5};">🔥 <strong>Quizmaster</strong><br><span style="font-size:.72rem;color:var(--muted);">5 quizzen voltooid</span></div>
    <div style="background:var(--surface2);padding:.7rem;border-radius:var(--radius-sm);opacity:${owned>=10?1:.5};">🏝️ <strong>Eilandbouwer</strong><br><span style="font-size:.72rem;color:var(--muted);">10 eilanden vol</span></div>
    <div style="background:var(--surface2);padding:.7rem;border-radius:var(--radius-sm);opacity:${(currentUser.xp||0)>=1000?1:.5};">⭐ <strong>XP-verzamelaar</strong><br><span style="font-size:.72rem;color:var(--muted);">1.000 XP gehaald</span></div>
  </div></div>`;
}

// ════════════════════════════════════════════════════════
// SHOP, STREAKS, EXTRA & BEHEER
// ════════════════════════════════════════════════════════
function saveCurrentUser(){ if(!currentUser)return; const i=accounts.findIndex(a=>a.id===currentUser.id); if(i>=0){accounts[i]={...accounts[i],...currentUser}; saveAccounts();} }
function shopTypeLabel(t){return t==='bg'?'🌌 Achtergrond':t==='trail'?'🖱️ Mouse-effect':t==='sound'?'🔊 Click sound':'🏷️ Titel';}
function renderShop(){
  if(!currentUser)return; const coins=currentUser.coins||0; const owned=currentUser.shopOwned||[]; const el=document.getElementById('shop-content');if(!el)return;
  const groups=['bg','trail','sound','title'];let html='';groups.forEach(type=>{const items=shopCatalog.filter(x=>x.type===type);if(!items.length)return;html+=`<h2 style="margin:1rem 0 .6rem">${shopTypeLabel(type)}</h2><div class="admin-grid">${items.map(it=>{const has=owned.includes(it.id);return `<div class="card"><div style="font-size:2rem">${escH(it.icon||'✨')}</div><span class="shop-type-badge">${shopTypeLabel(it.type)}</span><h3 style="margin:.4rem 0">${escH(it.name)}</h3><p style="color:var(--muted);font-size:.8rem;min-height:2.3rem">${escH(it.desc||'')}</p><div style="font-weight:900;margin:.6rem 0">🪙 ${it.price}</div><button class="btn ${has?'btn-secondary':'btn-primary'} btn-full" onclick="${has?`equipShopItem('${it.id}')`:`buyShopItem('${it.id}')`}">${has?'⚡ Gebruiken':'🛒 Kopen'}</button></div>`}).join('')}</div>`});
  el.innerHTML=html||'<div class="card">De shop is nog leeg.</div>';document.getElementById('shop-coins').textContent=fmtNum(coins);
}
function buyShopItem(id){const it=shopCatalog.find(x=>x.id===id);if(!it||!currentUser)return;if((currentUser.coins||0)<it.price)return showToast('Niet genoeg coins','error');currentUser.coins-=it.price;currentUser.shopOwned=currentUser.shopOwned||[];if(!currentUser.shopOwned.includes(id))currentUser.shopOwned.push(id);saveCurrentUser();equipShopItem(id);showToast(`🛒 ${it.name} gekocht!`,'success');}
function equipShopItem(id){const it=shopCatalog.find(x=>x.id===id);if(!it||!(currentUser.shopOwned||[]).includes(id))return;currentUser.activeEffects=currentUser.activeEffects||{bg:'none',trail:'none',sound:'none',title:'none'};currentUser.activeEffects[it.type]=id;saveCurrentUser();applyShopEffects();renderShop();showToast(`✨ ${it.name} geactiveerd`,'success');}
let shopClickHandler=null;
function applyShopEffects(){if(!currentUser)return;const effects=currentUser.activeEffects||{};const bg=effects.bg||'none';document.body.classList.remove('shop-bg-stars','shop-bg-neon','shop-bg-ocean');if(bg!=='none'){const it=shopCatalog.find(x=>x.id===bg);const cls=it?.value||bg;document.body.classList.add('shop-bg-'+String(cls).replace('bg-',''));}document.querySelectorAll('.cursor-trail').forEach(e=>e.remove());document.body.removeEventListener('mousemove',shopTrailMove);document.body._shopTrail='';const trail=effects.trail||'none';if(trail!=='none'){document.body._shopTrail=shopCatalog.find(x=>x.id===trail)?.value||trail;document.body.addEventListener('mousemove',shopTrailMove,{passive:true});}if(shopClickHandler)document.removeEventListener('click',shopClickHandler);shopClickHandler=null;const sound=effects.sound||'none';if(sound!=='none'){shopClickHandler=()=>playShopClick(sound);document.addEventListener('click',shopClickHandler,{passive:true});}const title=effects.title&&effects.title!=='none'?shopCatalog.find(x=>x.id===effects.title)?.value:'';const nav=document.getElementById('nav-username');if(nav)nav.title=title?`🏷️ ${title}`:'';}
function shopTrailMove(e){const t=document.body._shopTrail;if(!t)return;const d=document.createElement('div');d.className='cursor-trail';d.textContent=t==='trail-fire'?'🔥':t==='trail-stars'?'✨':t==='trail-bubbles'?'🫧':'✨';d.style.left=e.clientX+'px';d.style.top=e.clientY+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),650);}
function playShopClick(id){try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;const c=new AC();const o=c.createOscillator(),g=c.createGain();const map={'sound-pop':[520,.055],'sound-coin':[880,.08],'sound-soft':[260,.045]};const [f,d]=map[id]||[420,.05];o.frequency.value=f;o.type=id==='sound-coin'?'sine':'triangle';g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.055,c.currentTime+.005);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+d);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+d+.01);setTimeout(()=>c.close(),300);}catch(e){}}
function addShopItemTeacher(){if(currentUser?.role!=='docent')return showToast('Alleen docenten kunnen de shop beheren','error');const name=document.getElementById('shop-edit-name')?.value.trim(),type=document.getElementById('shop-edit-type')?.value||'bg',price=Math.max(0,parseInt(document.getElementById('shop-edit-price')?.value)||0),icon=document.getElementById('shop-edit-icon')?.value.trim()||'✨',desc=document.getElementById('shop-edit-desc')?.value.trim()||'',value=document.getElementById('shop-edit-value')?.value.trim()||'';if(!name||!value)return showToast('Vul naam en effect-ID/waarde in','warning');shopCatalog.push({id:'shop_'+Date.now(),type,name,price,icon,desc,value});saveShopCatalog();renderTeacherShop();resetShopForm();showToast('🛒 Shopitem toegevoegd','success');}
function deleteShopItemTeacher(id){if(!confirm('Dit shopitem verwijderen?'))return;shopCatalog=shopCatalog.filter(x=>x.id!==id);saveShopCatalog();renderTeacherShop();}
function renderTeacherShop(){const el=document.getElementById('teacher-shop-list');if(!el)return;el.innerHTML=shopCatalog.map(it=>`<div class="teacher-mini-card" style="margin-bottom:.5rem;display:flex;justify-content:space-between;gap:.7rem;align-items:center"><div><strong>${escH(it.icon||'✨')} ${escH(it.name)}</strong><br><span style="font-size:.72rem;color:var(--muted)">${shopTypeLabel(it.type)} · 🪙 ${it.price} · ${escH(it.value||'')}</span></div><button class="btn btn-danger btn-sm" onclick="deleteShopItemTeacher('${it.id}')">🗑️ Verwijderen</button></div>`).join('');}
function resetShopForm(){['shop-edit-name','shop-edit-desc','shop-edit-value'].forEach(id=>{const e=document.getElementById(id);if(e)e.value=''});const p=document.getElementById('shop-edit-price');if(p)p.value=100;const i=document.getElementById('shop-edit-icon');if(i)i.value='✨';}
function renderStreak(){if(!currentUser)return;const s=currentUser.streak||{count:0,lastClaim:''};const today=new Date().toISOString().slice(0,10);const claimed=s.lastClaim===today;const card=document.getElementById('streak-card');if(!card)return;if(!streakSettings.enabled){card.innerHTML='<p style="color:var(--muted)">Je docent heeft de dagelijkse streak nog niet aangezet.</p>';return;}card.innerHTML=`<div style="font-size:2rem;font-weight:900">🔥 ${s.count||0} dagen</div><p style="color:var(--muted);font-size:.8rem;margin:.35rem 0 .7rem">Doel: ${streakSettings.target} dagen · Beloning: 🪙 ${streakSettings.reward}</p><button class="btn ${claimed?'btn-secondary':'btn-primary'} btn-full" ${claimed?'disabled':''} onclick="claimDailyStreak()">${claimed?'✅ Vandaag gedaan':'🔥 Streak claimen'}</button>`;}
function claimDailyStreak(){if(!currentUser||!streakSettings.enabled)return;const today=new Date().toISOString().slice(0,10);const s=currentUser.streak||{count:0,lastClaim:''};if(s.lastClaim===today)return showToast('Je hebt vandaag al geclaimd!','info');const prev=new Date();prev.setDate(prev.getDate()-1);const yesterday=prev.toISOString().slice(0,10);s.count=s.lastClaim===yesterday?(s.count||0)+1:1;s.lastClaim=today;currentUser.streak=s;currentUser.coins=(currentUser.coins||0)+Number(streakSettings.reward||0);saveCurrentUser();updateHUD();renderStreak();showToast(`🔥 ${s.count} dagen streak! +${streakSettings.reward} coins`,'success');}
function renderExtras(){if(!currentUser)return;const n=document.getElementById('personal-notes');const g=document.getElementById('personal-goal');const v=document.getElementById('personal-goal-view');if(n)n.value=safeStorageGet('ic_notes_'+currentUser.id)||'';if(g)g.value=safeStorageGet('ic_goal_'+currentUser.id)||'';if(v)v.textContent=g?.value?`Huidig doel: ${g.value}`:'Nog geen persoonlijk doel.';renderStreak();}
function savePersonalNotes(silent=false){if(!currentUser)return;safeStorageSet('ic_notes_'+currentUser.id,document.getElementById('personal-notes').value);if(!silent)showToast('📝 Notities opgeslagen','success');}
function savePersonalGoal(silent=false){if(!currentUser)return;const v=document.getElementById('personal-goal').value.trim();safeStorageSet('ic_goal_'+currentUser.id,v);document.getElementById('personal-goal-view').textContent=v?`Huidig doel: ${v}`:'Nog geen persoonlijk doel.';if(!silent)showToast('🎯 Doel opgeslagen','success');}
let focusTimer=1500,focusInterval=null;function startFocusTimer(){if(focusInterval)return;focusInterval=setInterval(()=>{focusTimer--;const m=String(Math.floor(focusTimer/60)).padStart(2,'0'),s=String(focusTimer%60).padStart(2,'0');const e=document.getElementById('focus-time');if(e)e.textContent=m+':'+s;if(focusTimer<=0){clearInterval(focusInterval);focusInterval=null;showToast('🎉 Focustijd klaar!','success');}},1000)}function resetFocusTimer(){clearInterval(focusInterval);focusInterval=null;focusTimer=1500;const e=document.getElementById('focus-time');if(e)e.textContent='25:00';}
function teacherUnlockIslands(){if(currentUser?.role!=='docent')return showToast('Alleen docenten','error');const klas=document.getElementById('unlock-class').value,uid=document.getElementById('unlock-user').value;const num=Math.max(1,Math.min(500,parseInt(document.getElementById('unlock-island').value)||1))-1;const targets=klas?accounts.filter(a=>a.role==='leerling'&&a.klas===klas):uid?[accounts.find(a=>a.id===uid)].filter(Boolean):[];if(!targets.length)return showToast('Kies een leerling of klas','error');targets.forEach(a=>{a.unlockedIslands=a.unlockedIslands||[];if(!a.unlockedIslands.includes(num))a.unlockedIslands.push(num);});saveAccounts();showToast(`🏝️ Eiland ${num+1} geopend voor ${targets.length} leerling(en)`,'success');}
function saveTeacherStreakSettings(){if(currentUser?.role!=='docent')return;streakSettings.enabled=document.getElementById('streak-enabled').checked;streakSettings.target=Math.max(1,parseInt(document.getElementById('streak-target').value)||7);streakSettings.reward=Math.max(0,parseInt(document.getElementById('streak-reward').value)||25);saveStreakSettings();showToast('🔥 Dagelijkse streak ingesteld','success');}

// ════════════════════════════════════════════════════════
// EFFECTS
// ════════════════════════════════════════════════════════
function showToast(msg,type='info'){
  const t=document.getElementById('toast');
  t.textContent=msg; t.className=`toast toast-${type}`; t.classList.add('show');
  clearTimeout(t._timer); t._timer=setTimeout(()=>t.classList.remove('show'),2800);
}
function spawnXP(text){
  const el=document.createElement('div'); el.className='xp-popup'; el.textContent=text;
  el.style.cssText=`left:${35+Math.random()*30}%;top:18%;`;
  document.body.appendChild(el); setTimeout(()=>el.remove(),1100);
}
function spawnConfetti(){
  const cols=['#6c63ff','#ff6584','#43e97b','#f9ca24','#8b82ff','#ff9f43'];
  for(let i=0;i<65;i++){
    const c=document.createElement('div'); c.className='confetti-piece';
    c.style.cssText=`left:${Math.random()*100}vw;background:${cols[i%6]};border-radius:${Math.random()>.5?'50%':'2px'};`;
    document.body.appendChild(c);
    const w=(Math.random()-.5)*220,dur=1300+Math.random()*1000,delay=Math.random()*500;
    c.animate([{transform:'translate(0,-20px) rotate(0deg)',opacity:1},{transform:`translate(${w}px,${window.innerHeight+50}px) rotate(${Math.random()*720-360}deg)`,opacity:0}],{duration:dur,delay,easing:'cubic-bezier(.25,.46,.45,.94)',fill:'forwards'});
    setTimeout(()=>c.remove(),dur+delay+100);
  }
}
function triggerStagger(){
  requestAnimationFrame(()=>{ document.querySelectorAll('.stagger-item:not(.visible)').forEach((el,i)=>setTimeout(()=>el.classList.add('visible'),i*22)); });
}

// ════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════
triggerStagger();
if(currentUser) applyShopEffects();

// ════════════════════════════════════════════════════════
// EXTRA QUIZ HUB + LEERLINGMISSIES
// ════════════════════════════════════════════════════════
function renderGate(){
  const el=document.getElementById('gate-island-list')||document.getElementById('gate-list'); if(!el||!currentUser)return;
  let rows=[];
  ISLAND_DEFS.forEach((isl,i)=>{const unlocked=islandUnlocked(i);if(!unlocked)return;getIslandQuizSets(i).forEach(q=>{if(q.questions?.length)rows.push({isl,i,q});});});
  if(!rows.length){el.innerHTML='<div class="card" style="text-align:center;color:var(--muted)">📭 Er zijn nog geen quizzen.</div>';return;}
  const done=currentUser.quizDone||{},scores=currentUser.quizScores||{};
  el.innerHTML='<div class="island-quiz-list">'+rows.map(({isl,i,q})=>{const key=q.id==='main'?String(i):`${i}:${q.id}`;const isDone=!!done[key];const score=scores[key];return `<div class="iql-row stagger-item"><div class="iql-info"><span class="iql-emoji">${isl.emoji}</span><div><div class="iql-nm">${escH(isl.name)} · ${escH(q.title||'Quiz')}</div><div class="iql-sb">${q.questions.length} vragen · Eiland #${isl.id}${score!==undefined?' · Beste score '+score+'%':''}</div></div></div>${isDone?`<div style="display:flex;gap:.3rem;align-items:center"><span class="iql-done">✅ ${score||100}%</span><button class="btn btn-secondary btn-sm" onclick="startIslandQuiz(${i},'${q.id}')">Opnieuw</button></div>`:`<button class="btn btn-primary btn-sm" onclick="startIslandQuiz(${i},'${q.id}')">Start →</button>`}</div>`;}).join('')+'</div>';
  triggerStagger();
}
function renderExtras(){if(!currentUser)return;const n=document.getElementById('personal-notes');const g=document.getElementById('personal-goal');const v=document.getElementById('personal-goal-view');if(n)n.value=safeStorageGet('ic_notes_'+currentUser.id)||'';if(g)g.value=safeStorageGet('ic_goal_'+currentUser.id)||'';if(v)v.textContent=g?.value?`Huidig doel: ${g.value}`:'Nog geen persoonlijk doel.';renderStreak();const m=safeStorageGet('ic_daily_mission');const mv=document.getElementById('daily-mission-view');if(mv)mv.textContent=m?`🎯 ${m}`:'Nog geen missie.';const st=document.getElementById('student-quiz-stats');if(st){const scores=Object.values(currentUser.quizScores||{}).map(Number);const avg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0;st.innerHTML=`🧠 Quizzen gemaakt: <strong>${scores.length}</strong><br>📈 Gemiddelde score: <strong>${avg}%</strong><br>🏆 100% scores: <strong>${scores.filter(x=>x===100).length}</strong>`;} const b=document.getElementById('student-badges'); if(b){const bs=currentUser.badges||[];b.innerHTML=bs.length?bs.map(x=>`<span class="badge badge-success" style="margin:.2rem">${TEACHER_BADGES[x.type]||'🏅 Badge'}</span>`).join(''):'Nog geen badges.';}}


// ════════════════════════════════════════════════════════
// NIEUWE DOCENTFUNCTIES — berichten, badges en klassen
// ════════════════════════════════════════════════════════
const TEACHER_BADGES={starter:'🌱 Starter',quizmaster:'🧠 Quizmaster',builder:'🏝️ Eilandbouwer',perfect:'💯 Perfecte Quiz',xp:'⭐ XP-verzamelaar',streak:'🔥 Streakheld'};
function publishTeacherMessage(){
  if(!currentUser||currentUser.role!=='docent')return;
  const v=document.getElementById('teacher-message-new')?.value.trim(); if(!v)return showToast('Typ eerst een bericht','warning');
  const history=loadOrDefault('ic_teacher_messages',[]); history.push({id:'msg_'+Date.now(),text:v,by:currentUser.name,date:new Date().toLocaleString('nl-NL')});
  safeStorageSet('ic_teacher_messages',JSON.stringify(history.slice(-30))); teacherAnnouncement=v; safeStorageSet('ic_teacher_announcement',JSON.stringify(v));
  document.getElementById('teacher-message-new').value=''; renderTeacherMessages(); showToast('📢 Bericht gepubliceerd','success');
}
function publishTeacherReminder(){
  const v=document.getElementById('teacher-reminder-new')?.value.trim(); if(!v)return showToast('Typ eerst een herinnering','warning');
  safeStorageSet('ic_teacher_reminder',JSON.stringify(v)); document.getElementById('teacher-reminder-new').value=''; showToast('🔔 Herinnering opgeslagen','success');
}
function renderTeacherMessages(){
  const el=document.getElementById('teacher-message-list'); if(!el)return; const h=loadOrDefault('ic_teacher_messages',[]);
  el.innerHTML=h.length?h.slice().reverse().map(m=>`<div class="teacher-mini-card" style="margin:.4rem 0"><strong>📢 ${escH(m.text)}</strong><div style="font-size:.7rem;color:var(--muted);margin-top:.25rem">${escH(m.by||'Docent')} · ${escH(m.date||'')}</div></div>`).join(''):'<p style="color:var(--muted)">Nog geen berichten.</p>';
}
function renderTeacherBadges(){
  const us=document.getElementById('badge-user'); if(us){const students=getTeacherStudents();us.innerHTML='<option value="">— kies leerling —</option>'+students.map(a=>`<option value="${a.id}">${escH(a.name)} (${escH(a.klas||'—')})</option>`).join('');}
  const el=document.getElementById('teacher-badge-list'); if(!el)return; const rows=[]; getTeacherStudents().forEach(a=>(a.badges||[]).forEach(b=>rows.push({...b,name:a.name})));
  el.innerHTML=rows.length?rows.slice().reverse().map(b=>`<div class="teacher-mini-card" style="margin:.4rem 0"><strong>${TEACHER_BADGES[b.type]||'🏅 Badge'}</strong> · ${escH(b.name)}<div style="font-size:.7rem;color:var(--muted)">${escH(b.note||'Goed gedaan!')} · ${escH(b.date||'')}</div></div>`).join(''):'<p style="color:var(--muted)">Nog geen badges uitgedeeld.</p>';
}
function awardTeacherBadge(){
  const id=document.getElementById('badge-user')?.value,type=document.getElementById('badge-type')?.value,note=document.getElementById('badge-note')?.value.trim()||'Goed gedaan!';
  const a=accounts.find(x=>x.id===id); if(!a)return showToast('Kies een leerling','warning'); a.badges=a.badges||[]; a.badges.push({type,note,by:currentUser.name,date:new Date().toLocaleString('nl-NL')}); saveAccounts(); renderTeacherBadges(); showToast(`${TEACHER_BADGES[type]} gegeven aan ${a.name}`,'success');
}
function renderClassroomPanel(){
  syncLegacyClassesToGroups();
  renderAccountGroupManager();
  const students=accounts.filter(a=>a.role==='leerling');
  const classes=accountGroups.filter(g=>g.type==='klas');
  const sel=document.getElementById('classroom-class');
  if(sel){const cur=sel.value;sel.innerHTML='<option value="">— kies klas —</option>'+classes.map(g=>`<option value="${escH(g.name)}">Klas ${escH(g.name)}</option>`).join('');if(classes.some(g=>g.name===cur))sel.value=cur;}
  const stats=document.getElementById('classroom-stats');
  if(stats){
    stats.innerHTML=classes.length?classes.map(g=>{const xs=students.filter(a=>a.klas===g.name),xp=xs.length?Math.round(xs.reduce((n,a)=>n+(a.xp||0),0)/xs.length):0,q=xs.length?Math.round(xs.reduce((n,a)=>n+Object.keys(a.quizDone||{}).length,0)/xs.length):0;return `<div class="teacher-mini-card" style="margin:.35rem 0"><strong>🏫 ${escH(g.name)}</strong><br><span style="font-size:.75rem;color:var(--muted)">${xs.length} leerlingen · gemiddeld ${xp} XP · ${q} quizzen</span></div>`}).join(''):'<p style="color:var(--muted)">Nog geen klassen.</p>';
  }
  const list=document.getElementById('classroom-list');
  if(list){
    const all=accountGroups.map(g=>{const members=students.filter(a=>g.type==='klas'?a.klas===g.name:(a.groups||[]).includes(g.id));return {g,members};});
    list.innerHTML=all.length?all.map(({g,members})=>`<div class="teacher-mini-card" style="margin:.35rem 0"><strong>${g.type==='klas'?'🏫':'👥'} ${escH(g.name)}</strong> <span style="font-size:.7rem;color:var(--muted)">(${members.length} leerling${members.length===1?'':'en'})</span><br>${members.length?members.map(a=>`<span class="badge badge-accent" style="margin:.2rem">${escH(a.name)}</span>`).join(' '):'<span style="font-size:.75rem;color:var(--muted)">Geen leerlingen gekoppeld.</span>'}</div>`).join(''):'<p style="color:var(--muted)">Geen klassen of groepen gevonden.</p>';
  }
}

function classroomGive(type,amount){
  const k=document.getElementById('classroom-class')?.value; if(!k)return showToast('Kies eerst een klas','warning'); const targets=getTeacherStudents().filter(a=>a.klas===k); targets.forEach(a=>{a[type]=(a[type]||0)+amount;}); saveAccounts(); renderClassroomPanel(); showToast(`✅ ${amount} ${type==='xp'?'XP':'Coins'} uitgedeeld aan ${targets.length} leerling(en)`,'success');
}
function classroomGiveXP(){classroomGive('xp',100)}
function classroomGiveCoins(){classroomGive('coins',100)}
