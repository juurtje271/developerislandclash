/* Island Clash - SCHOOL MODULE
 * School-first tools. All data is kept in the existing app storage layer,
 * which is synchronized by cloud-sync.js with the Supabase database.
 */
(function(){
  'use strict';

  const KEY={
    subjects:'ic_school_subjects',
    lessons:'ic_school_lessons',
    homework:'ic_school_homework',
    homeworkSubmissions:'ic_school_homework_submissions',
    attendance:'ic_school_attendance',
    grades:'ic_school_grades',
    gradeTypes:'ic_school_grade_types',
    tests:'ic_school_tests',
    testSubmissions:'ic_school_test_submissions',
    progress:'ic_school_lesson_progress',
    timetable:'ic_school_timetable',
    calendar:'ic_school_calendar',
    announcements:'ic_school_announcements',
    teacherNotes:'ic_school_teacher_notes',
    appointments:'ic_school_appointments',
    planningItems:'ic_school_planning_items',
    settings:'ic_school_settings'
  };
  const arr=v=>Array.isArray(v)?v:[];
  const uid=p=>p+'_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,9);
  const today=()=>new Date().toISOString().slice(0,10);
  const esc=v=>typeof escH==='function'?escH(v??''):String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\':'&#39;'}[m]));
  const save=(k,v)=>safeStorageSet(k,JSON.stringify(v));
  const load=(k,d)=>arr(loadOrDefault(k,d));
  const isTeacher=()=>typeof hasDocentAccess==='function'?hasDocentAccess():currentUser?.role==='docent';
  const students=()=>accounts.filter(a=>a.role==='leerling');
  const groups=()=>accountGroups.filter(g=>g.type==='groep');
  const classes=()=>accountGroups.filter(g=>g.type==='klas');
  const classOptions=(selected='')=>'<option value="">— alle klassen —</option>'+classes().map(g=>`<option value="${esc(g.name)}" ${g.name===selected?'selected':''}>🏫 ${esc(g.name)}</option>`).join('');
  const groupOptions=(selected='')=>'<option value="">— geen groep —</option>'+groups().map(g=>`<option value="${esc(g.id)}" ${g.id===selected?'selected':''}>👥 ${esc(g.name)}</option>`).join('');
  const subjectOptions=(selected='')=>'<option value="">— kies vak —</option>'+subjects.map(s=>`<option value="${esc(s.id)}" ${s.id===selected?'selected':''}>${esc(s.name)}</option>`).join('');
  const studentOptions=(selected='')=>'<option value="">— kies leerling —</option>'+students().map(s=>`<option value="${esc(s.id)}" ${s.id===selected?'selected':''}>${esc(s.name)}${s.klas?' · '+esc(s.klas):''}</option>`).join('');
  const teacherOptions=(selected='')=>'<option value="">— geen specifieke docent —</option>'+accounts.filter(a=>a.role==='docent').map(t=>`<option value="${esc(t.id)}" ${t.id===selected?'selected':''}>👩‍🏫 ${esc(t.name)}</option>`).join('');

  let subjects=load(KEY.subjects,[]);
  let lessons=load(KEY.lessons,[]);
  let homework=load(KEY.homework,[]);
  let homeworkSubmissions=load(KEY.homeworkSubmissions,[]);
  let attendance=load(KEY.attendance,[]);
  let grades=load(KEY.grades,[]);
  let gradeTypes=load(KEY.gradeTypes,['Toets','Proefwerk','Opdracht','Mondeling','Presentatie','Praktijk','Herkansing']);
  let tests=load(KEY.tests,[]);
  let testSubmissions=load(KEY.testSubmissions,[]);
  let lessonProgress=load(KEY.progress,[]);
  let timetable=load(KEY.timetable,[]);
  let calendar=load(KEY.calendar,[]);
  let announcements=load(KEY.announcements,[]);
  let teacherNotes=load(KEY.teacherNotes,[]);
  let appointments=load(KEY.appointments,[]);
  let planningItems=load(KEY.planningItems,[]);
  let settings=loadOrDefault(KEY.settings,{schoolName:'Mijn school',schoolYear:'2026-2027'});
  if(Array.isArray(settings)) settings={schoolName:'Mijn school',schoolYear:'2026-2027'};

  function refresh(){
    subjects=load(KEY.subjects,subjects); lessons=load(KEY.lessons,lessons); homework=load(KEY.homework,homework);
    homeworkSubmissions=load(KEY.homeworkSubmissions,homeworkSubmissions); attendance=load(KEY.attendance,attendance);
    grades=load(KEY.grades,grades); gradeTypes=load(KEY.gradeTypes,gradeTypes); tests=load(KEY.tests,tests);
    testSubmissions=load(KEY.testSubmissions,testSubmissions); lessonProgress=load(KEY.progress,lessonProgress);
    timetable=load(KEY.timetable,timetable); calendar=load(KEY.calendar,calendar); announcements=load(KEY.announcements,announcements);
    teacherNotes=load(KEY.teacherNotes,teacherNotes); appointments=load(KEY.appointments,appointments); planningItems=load(KEY.planningItems,planningItems); settings=loadOrDefault(KEY.settings,settings);
  }

  function renderSchoolPanel(){
    refresh();
    const root=document.getElementById('apanel-school'); if(!root)return;
    if(!isTeacher()){root.innerHTML='<div class="card"><h2>Geen toegang</h2><p class="text-muted">Alleen docenten kunnen de schoolomgeving beheren.</p></div>';return;}
    const avg=grades.length?(grades.reduce((n,g)=>n+Number(g.grade||0),0)/grades.length).toFixed(1):'—';
    const pendingHW=homework.filter(h=>h.dueDate&&h.dueDate<today()).length;
    root.innerHTML=`
      <div class="school-head-row">
        <div><h2>📚 ${esc(settings.schoolName||'Mijn school')}</h2><p class="school-muted">Schooljaar ${esc(settings.schoolYear||'2026-2027')} · alles centraal opgeslagen in Supabase.</p></div>
        <span class="badge badge-success">☁️ Centrale opslag</span>
      </div>
      <div class="admin-grid school-stats">
        <div class="stat-card"><div class="sc-label">👥 Leerlingen</div><div class="sc-val">${students().length}</div><div class="sc-sub">accounts</div></div>
        <div class="stat-card"><div class="sc-label">📚 Lessen</div><div class="sc-val">${lessons.length}</div><div class="sc-sub">ingesteld</div></div>
        <div class="stat-card"><div class="sc-label">📝 Huiswerk</div><div class="sc-val">${homework.length}</div><div class="sc-sub">${pendingHW} te laat</div></div>
        <div class="stat-card"><div class="sc-label">📊 Gemiddelde</div><div class="sc-val">${avg}</div><div class="sc-sub">alle cijfers</div></div>
      </div>
      <div class="school-subtabs">
        ${[['overview','📊 Overzicht'],['planning','🗓️ Planning'],['lessons','📚 Lessen'],['homework','📝 Huiswerk'],['tests','🧪 Toetsen'],['grades','📊 Cijfers'],['attendance','✅ Aanwezigheid'],['timetable','🗓️ Rooster'],['calendar','📅 Agenda'],['messages','📢 Berichten']].map(([id,label],i)=>`<button class="school-subtab ${i===0?'active':''}" data-school-view="${id}" onclick="schoolTeacherTab('${id}',this)">${label}</button>`).join('')}
      </div>
      <div class="school-view active" id="school-view-overview">${renderOverview()}</div>
      <div class="school-view" id="school-view-planning">${renderPlanningManager()}</div>
      <div class="school-view" id="school-view-lessons">${renderLessonsManager()}</div>
      <div class="school-view" id="school-view-homework">${renderHomeworkManager()}</div>
      <div class="school-view" id="school-view-tests">${renderTestsManager()}</div>
      <div class="school-view" id="school-view-grades">${renderGradesManager()}</div>
      <div class="school-view" id="school-view-attendance">${renderAttendanceManager()}</div>
      <div class="school-view" id="school-view-timetable">${renderTimetableManager()}</div>
      <div class="school-view" id="school-view-calendar">${renderCalendarManager()}</div>
      <div class="school-view" id="school-view-messages">${renderMessagesManager()}</div>
    `;
  }

  function renderOverview(){
    const upcoming=[...lessons].filter(x=>x.date>=today()).sort((a,b)=>String(a.date).localeCompare(String(b.date))).slice(0,5);
    const top=students().map(s=>({s,avg:studentAverage(s.id)})).sort((a,b)=>b.avg-a.avg).slice(0,5);
    return `<div class="school-overview-grid">
      <div class="card"><h3>⚙️ Schoolinstellingen</h3><div class="school-form-grid"><div class="form-group"><label>Schoolnaam</label><input id="school-setting-name" value="${esc(settings.schoolName||'Mijn school')}"></div><div class="form-group"><label>Schooljaar</label><input id="school-setting-year" value="${esc(settings.schoolYear||'2026-2027')}"></div></div><button class="btn btn-success btn-sm" onclick="schoolSaveSettings()">💾 Opslaan</button></div>
      <div class="card"><h3>📅 Eerstvolgende lessen</h3>${upcoming.length?upcoming.map(l=>{const s=subjects.find(x=>x.id===l.subjectId);return `<div class="school-list-row"><strong>${esc(s?.name||'Vak')} · ${esc(l.title)}</strong><span>${esc(l.date||'—')} · ${l.duration||50} min</span></div>`}).join(''):'<span class="text-muted">Nog geen lessen gepland.</span>'}</div>
      <div class="card"><h3>🏆 Hoogste gemiddelden</h3>${top.length?top.map(x=>`<div class="school-list-row"><strong>${esc(x.s.name)}</strong><span>${x.avg||'—'}</span></div>`).join(''):'<span class="text-muted">Nog geen leerlingen.</span>'}</div>
      <div class="card"><h3>💾 Opslagstatus</h3><p class="school-muted">Wijzigingen worden via de centrale opslaglaag naar Supabase gestuurd.</p><button class="btn btn-secondary btn-sm" onclick="schoolSaveEverythingNow()">☁️ Nu synchroniseren</button><button class="btn btn-ghost btn-sm" style="margin-left:.35rem" onclick="schoolRefreshAll()">↻ Vernieuwen</button></div>
    </div>`;
  }

  function renderLessonsManager(){
    return `<div class="school-form-grid-3">
      <div class="card"><h3>📘 Vak toevoegen</h3>
        <div class="form-group"><label>Vak</label><input id="school-subject-name" placeholder="Aardrijkskunde"></div>
        <div class="form-group"><label>Kleur / korte omschrijving</label><textarea id="school-subject-desc" placeholder="Hoofdstukken / onderwerp"></textarea></div>
        <button class="btn btn-primary btn-full" onclick="schoolCreateSubject()">➕ Vak toevoegen</button>
        <div class="school-scroll-list school-section-gap">${subjects.length?subjects.map(s=>`<div class="school-list-row"><div><strong>${esc(s.name)}</strong><div class="school-muted">${esc(s.description||'')}</div></div><button class="btn btn-danger btn-sm" onclick="schoolDeleteSubject('${s.id}')">🗑️</button></div>`).join(''):'<span class="text-muted">Nog geen vakken.</span>'}</div>
      </div>
      <div class="card"><h3>📚 Les plannen</h3>
        <div class="school-form-grid"><div class="form-group"><label>Vak</label><select id="school-lesson-subject">${subjectOptions()}</select></div><div class="form-group"><label>Lesnaam</label><input id="school-lesson-title" placeholder="Les 1 – Klimaat"></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Datum</label><input id="school-lesson-date" type="date" value="${today()}"></div><div class="form-group"><label>Duur (min.)</label><input id="school-lesson-duration" type="number" min="1" value="50"></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Starttijd</label><input id="school-lesson-start" type="time" value="08:30"></div><div class="form-group"><label>Eindtijd</label><input id="school-lesson-end" type="time" value="09:20"></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Klas</label><select id="school-lesson-class">${classOptions()}</select></div><div class="form-group"><label>Groep</label><select id="school-lesson-group">${groupOptions()}</select></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Docent toewijzen</label><select id="school-lesson-teacher">${teacherOptions(currentUser?.id)}</select></div><div class="form-group"><label>Lokaal</label><input id="school-lesson-room" placeholder="B12"></div></div>
        <div class="form-group"><label>Lesinhoud</label><textarea id="school-lesson-content" placeholder="Uitleg, bronnen en instructies..."></textarea></div>
        <div class="form-group"><label>Leerdoelen</label><textarea id="school-lesson-objectives" placeholder="Na deze les kan de leerling..."></textarea></div>
        <button class="btn btn-success btn-full" onclick="schoolCreateLesson()">📚 Les opslaan</button>
      </div>
      <div class="card"><h3>📋 Geplande lessen</h3><div class="school-scroll-list">${lessons.length?lessons.slice().sort((a,b)=>String(a.date).localeCompare(String(b.date))).map(l=>{const sub=subjects.find(x=>x.id===l.subjectId);const t=accounts.find(x=>x.id===l.teacherId);return `<div class="school-mini-card"><strong>${esc(sub?.name||'Vak')} · ${esc(l.title)}</strong><div class="school-muted">${esc(l.date||'—')}${l.startTime?' · '+esc(l.startTime)+'–'+esc(l.endTime||''):''} · ${esc(l.className||'Alle klassen')} · ${l.duration||50} min</div><div class="school-muted">👩‍🏫 ${esc(t?.name||l.teacher||'Geen toegewezen docent')} · lokaal ${esc(l.room||'—')}</div><div class="school-muted">${esc(l.objectives||'Geen leerdoelen')}</div><button class="btn btn-danger btn-sm" style="margin-top:.35rem" onclick="schoolDeleteLesson('${l.id}')">🗑️ Verwijderen</button></div>`}).join(''):'<span class="text-muted">Nog geen lessen.</span>'}</div></div>
    </div>`;
  }

  function renderPlanningManager(){
    const all=[
      ...appointments.map(x=>({...x,kind:'Afspraak',icon:'📅'})),
      ...tests.map(x=>({...x,kind:x.type||'Toets',icon:'🧪'})),
      ...homework.map(x=>({...x,kind:x.itemType||'Huiswerk',icon:'📝'})),
      ...lessons.map(x=>({...x,kind:'Les',icon:'📚'}))
    ].filter(x=>x.date).sort((a,b)=>String(a.date).localeCompare(String(b.date)) || String(a.startTime||xStart(a)).localeCompare(String(b.startTime||''))).slice(0,80);
    function typeBadge(item){return `<span class="badge badge-accent">${item.icon} ${esc(item.kind)}</span>`;}
    function xStart(a){return a.start||'';}
    return `<div class="school-planning-grid">
      <div class="card"><h3>📅 Afspraak inplannen</h3>
        <div class="form-group"><label>Titel</label><input id="school-appointment-title" placeholder="Mentorgesprek / vergadering"></div>
        <div class="school-form-grid"><div class="form-group"><label>Datum</label><input id="school-appointment-date" type="date" value="${today()}"></div><div class="form-group"><label>Type</label><select id="school-appointment-type"><option>Afspraak</option><option>Vergadering</option><option>Mentorgesprek</option><option>Ouderavond</option><option>Activiteit</option><option>Overig</option></select></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Start</label><input id="school-appointment-start" type="time" value="15:00"></div><div class="form-group"><label>Einde</label><input id="school-appointment-end" type="time" value="16:00"></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Docent</label><select id="school-appointment-teacher">${teacherOptions(currentUser?.id)}</select></div><div class="form-group"><label>Klas</label><select id="school-appointment-class">${classOptions()}</select></div></div>
        <div class="form-group"><label>Groep</label><select id="school-appointment-group">${groupOptions()}</select></div>
        <div class="form-group"><label>Locatie</label><input id="school-appointment-location" placeholder="Lokaal / online"></div>
        <div class="form-group"><label>Notitie</label><textarea id="school-appointment-note" placeholder="Extra informatie"></textarea></div>
        <button class="btn btn-primary btn-full" onclick="schoolCreateAppointment()">📅 Afspraak opslaan</button>
      </div>
      <div class="card"><h3>🗂️ Schoolplanning</h3><p class="school-muted">Alle lessen, afspraken, huiswerkitems en toetsen bij elkaar.</p><div class="school-planning-list">${all.length?all.map(item=>`<div class="school-planning-item"><div>${typeBadge(item)} <strong>${esc(item.title)}</strong><div class="school-muted">${esc(item.date)}${item.startTime?' · '+esc(item.startTime)+'–'+esc(item.endTime||''):item.start?' · '+esc(item.start)+'–'+esc(item.end||''):''} · ${esc(item.className||'Alle klassen')}</div><div class="school-muted">${esc(item.description||item.note||item.content||'')}</div></div></div>`).join(''):'<div class="school-empty">Nog niets gepland.</div>'}</div></div>
    </div>`;
  }


  function homeworkSubmissionRow(h){
    const hw=homework.find(x=>x.id===h.homeworkId);
    const s=students().find(x=>x.id===h.studentId);
    const status=h.status==='graded'?'✅ nagekeken':'📨 ingeleverd';
    const action=h.grade!=null?`<span class="badge badge-success">Cijfer ${h.grade}</span>`:`<button class="btn btn-secondary btn-sm" onclick="schoolGradeHomework('${h.id}')">📊 Nakijken</button>`;
    return `<div class="school-mini-card"><strong>${esc(s?.name||'Leerling')}</strong> · ${esc(hw?.title||'Huiswerk')}<div class="school-muted">${status} · ${esc(h.submittedAt||'')}</div><div class="school-muted">${esc(h.text||'')}</div>${action}</div>`;
  }

  function renderHomeworkManager(){
    return `<div class="school-form-grid-3">
      <div class="card"><h3>📝 Huiswerkitem toevoegen</h3>
        <div class="form-group"><label>Type</label><select id="school-homework-type"><option>Huiswerk</option><option>Inleveropdracht</option><option>Lezen</option><option>Oefenen</option><option>Project</option></select></div>
        <div class="form-group"><label>Titel</label><input id="school-homework-title" placeholder="Hoofdstuk 2, opgave 1-10"></div>
        <div class="form-group"><label>Vak</label><select id="school-homework-subject">${subjectOptions()}</select></div>
        <div class="form-group"><label>Omschrijving / instructie</label><textarea id="school-homework-desc" placeholder="Wat moet de leerling maken?"></textarea></div>
        <div class="school-form-grid"><div class="form-group"><label>Klas</label><select id="school-homework-class">${classOptions()}</select></div><div class="form-group"><label>Groep</label><select id="school-homework-group">${groupOptions()}</select></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Uitgegeven</label><input id="school-homework-date" type="date" value="${today()}"></div><div class="form-group"><label>Deadline</label><input id="school-homework-due" type="date" value="${new Date(Date.now()+7*864e5).toISOString().slice(0,10)}"></div></div>
        <div class="form-group"><label>Bijlage/link (optioneel)</label><input id="school-homework-link" placeholder="https://..."></div>
        <button class="btn btn-warning btn-full" onclick="schoolCreateHomework()">📝 Huiswerkitem plaatsen</button>
      </div>
      <div class="card"><h3>✅ Inleveringen</h3><div class="school-scroll-list">${homeworkSubmissions.slice().reverse().slice(0,40).map(h=>homeworkSubmissionRow(h)).join('')||'<span class="text-muted">Nog geen inleveringen.</span>'}</div></div>
      <div class="card"><h3>📋 Huiswerkoverzicht</h3><div class="school-scroll-list">${homework.slice().reverse().map(h=>{const sub=subjects.find(x=>x.id===h.subjectId);const count=homeworkSubmissions.filter(x=>x.homeworkId===h.id).length;return `<div class="school-mini-card"><span class="badge badge-warning">📝 ${esc(h.itemType||'Huiswerk')}</span> <strong>${esc(h.title)}</strong><div class="school-muted">${esc(sub?.name||'Vak')} · ${esc(h.className||'Alle klassen')} · deadline ${esc(h.dueDate||'—')}</div><div class="school-muted">📨 ${count} inleveringen${h.link?' · 🔗 link':''}</div><button class="btn btn-danger btn-sm" onclick="schoolDeleteHomework('${h.id}')">🗑️</button></div>`}).join('')||'<span class="text-muted">Nog geen huiswerk.</span>'}</div></div>
    </div>`;
  }


  function renderTestsManager(){
    return `<div class="school-form-grid-2">
      <div class="card"><h3>🧪 Toets / Grote Toets plannen</h3>
        <div class="school-form-grid"><div class="form-group"><label>Type</label><select id="school-test-type"><option>Toets</option><option>Grote Toets</option><option>Inleveropdracht</option><option>Proefwerk</option><option>Praktijktoets</option></select></div><div class="form-group"><label>Naam</label><input id="school-test-title" placeholder="Hoofdstuk 1"></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Vak</label><select id="school-test-subject">${subjectOptions()}</select></div><div class="form-group"><label>Klas</label><select id="school-test-class">${classOptions()}</select></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Datum</label><input id="school-test-date" type="date" value="${today()}"></div><div class="form-group"><label>Starttijd</label><input id="school-test-start" type="time" value="09:00"></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Tijd (min.)</label><input id="school-test-duration" type="number" min="1" value="45"></div><div class="form-group"><label>Weging</label><input id="school-test-weight" type="number" min="1" max="10" value="1"></div></div>
        <div class="school-form-grid"><div class="form-group"><label>Docent</label><select id="school-test-teacher">${teacherOptions(currentUser?.id)}</select></div><div class="form-group"><label>Lokaal</label><input id="school-test-room" placeholder="A12"></div></div>
        <div class="form-group"><label>Omschrijving</label><textarea id="school-test-description" placeholder="Wat moet de leerling weten?"></textarea></div>
        <div id="school-test-builder" class="school-question-builder"></div>
        <button class="btn btn-secondary btn-sm" onclick="schoolAddTestQuestion()">➕ Vraag</button>
        <button class="btn btn-primary" style="margin-left:.35rem" onclick="schoolCreateTest()">🧪 Toets opslaan</button>
      </div>
      <div class="card"><h3>📋 Toetsen & resultaten</h3><div class="school-scroll-list">${tests.slice().reverse().map(t=>{const sub=subjects.find(x=>x.id===t.subjectId);const results=testSubmissions.filter(x=>x.testId===t.id);const avg=results.length?(results.reduce((n,x)=>n+Number(x.percent||0),0)/results.length).toFixed(0):'—';return `<div class="school-mini-card"><span class="badge badge-accent">🧪 ${esc(t.type||'Toets')}</span> <strong>${esc(t.title)}</strong><div class="school-muted">${esc(sub?.name||'Vak')} · ${esc(t.className||'Alle klassen')} · ${esc(t.date||'—')}${t.startTime?' · '+esc(t.startTime):''}</div><div class="school-muted">👩‍🏫 ${esc(accounts.find(a=>a.id===t.teacherId)?.name||t.teacher||'Docent')} · ${results.length} ingeleverd · gemiddelde ${avg}%</div><div style="margin-top:.35rem"><button class="btn btn-secondary btn-sm" onclick="schoolViewTestResults('${t.id}')">📊 Resultaten</button> <button class="btn btn-danger btn-sm" onclick="schoolDeleteTest('${t.id}')">🗑️</button></div></div>`}).join('')||'<span class="text-muted">Nog geen toetsen.</span>'}</div><div id="school-test-results-detail" class="school-section-gap"></div></div>
    </div>`;
  }


  let testDraft=[];
  function schoolAddTestQuestion(){
    testDraft.push({id:uid('q'),question:'',type:'mcq',options:['','','',''],correct:0,points:1});
    renderTestDraft();
  }
  function renderTestDraft(){
    const el=document.getElementById('school-test-builder'); if(!el)return;
    el.innerHTML=testDraft.map((q,i)=>`<div class="school-question-card"><div class="school-question-head"><strong>Vraag ${i+1}</strong><button class="btn btn-danger btn-sm" onclick="schoolRemoveTestQuestion('${q.id}')">✕</button></div><div class="form-group"><label>Vraag</label><input value="${esc(q.question)}" oninput="schoolEditTestQ('${q.id}','question',this.value)"></div><div class="school-form-grid-2"><div class="form-group"><label>Punten</label><input type="number" min="1" value="${q.points||1}" oninput="schoolEditTestQ('${q.id}','points',this.value)"></div><div class="form-group"><label>Correct antwoord</label><select onchange="schoolEditTestQ('${q.id}','correct',this.value)">${q.options.map((o,oi)=>`<option value="${oi}" ${Number(q.correct)===oi?'selected':''}>Antwoord ${String.fromCharCode(65+oi)}</option>`).join('')}</select></div></div><div class="school-form-grid-2">${q.options.map((o,oi)=>`<div class="form-group"><label>Antwoord ${String.fromCharCode(65+oi)}</label><input value="${esc(o)}" oninput="schoolEditTestOption('${q.id}',${oi},this.value)"></div>`).join('')}</div></div>`).join('');
  }
  function schoolEditTestQ(id,key,val){const q=testDraft.find(x=>x.id===id);if(!q)return;q[key]=key==='points'?Math.max(1,Number(val)||1):key==='correct'?Number(val):val;}
  function schoolEditTestOption(id,i,val){const q=testDraft.find(x=>x.id===id);if(q)q.options[i]=val;}
  function schoolRemoveTestQuestion(id){testDraft=testDraft.filter(x=>x.id!==id);renderTestDraft();}
  function schoolCreateTest(){
    const title=document.getElementById('school-test-title')?.value.trim();
    const subjectId=document.getElementById('school-test-subject')?.value||'';
    const questions=testDraft.map(q=>({...q,question:q.question.trim(),options:q.options.map(x=>x.trim())}));
    if(!title||!subjectId||!questions.length)return showToast('Vul toetsnaam, vak en minimaal 1 vraag in','error');
    if(questions.some(q=>!q.question||q.options.some(o=>!o)))return showToast('Vul alle vragen en antwoordopties in','error');
    const teacherId=document.getElementById('school-test-teacher')?.value||currentUser?.id||'';
    const teacher=accounts.find(a=>a.id===teacherId)?.name||currentUser?.name||'Docent';
    const test={id:uid('test'),type:document.getElementById('school-test-type')?.value||'Toets',title,subjectId,className:document.getElementById('school-test-class')?.value||'',date:document.getElementById('school-test-date')?.value||today(),startTime:document.getElementById('school-test-start')?.value||'',duration:Number(document.getElementById('school-test-duration')?.value||45),weight:Number(document.getElementById('school-test-weight')?.value||1),teacherId,teacher,room:document.getElementById('school-test-room')?.value.trim()||'',description:document.getElementById('school-test-description')?.value.trim()||'',questions,createdAt:new Date().toISOString()};
    tests.push(test);save(KEY.tests,tests);testDraft=[];renderSchoolPanel();showToast(`🧪 ${test.type} ingepland`,'success');
  }

  function schoolDeleteTest(id){if(!confirm('Deze toets verwijderen?'))return;const subIds=new Set(testSubmissions.filter(x=>x.testId===id).map(x=>x.id));tests=tests.filter(x=>x.id!==id);testSubmissions=testSubmissions.filter(x=>x.testId!==id);grades=grades.filter(x=>!subIds.has(x.sourceTestSubmissionId));save(KEY.tests,tests);save(KEY.testSubmissions,testSubmissions);save(KEY.grades,grades);renderSchoolPanel();}
  function schoolViewTestResults(testId){const root=document.getElementById('school-test-results-detail');if(!root)return;const t=tests.find(x=>x.id===testId);if(!t)return;const rs=testSubmissions.filter(x=>x.testId===testId);root.innerHTML=`<div class="card"><h3>📊 Resultaten: ${esc(t.title)}</h3>${rs.length?rs.map(r=>{const s=students().find(x=>x.id===r.studentId);return `<div class="school-list-row"><div><strong>${esc(s?.name||'Leerling')}</strong><div class="school-muted">${esc(r.submittedAt||'')}</div></div><div><strong>${Number(r.percent||0)}%</strong> · ${r.grade!=null?`cijfer ${r.grade}`:'geen cijfer'} <button class="btn btn-secondary btn-sm" onclick="schoolGradeTestSubmission('${r.id}')">📊 Beoordelen</button></div></div>`}).join(''):'<span class="text-muted">Nog geen inzendingen.</span>'}</div>`;}
  function upsertTestGrade(r,t){const oldGrade=grades.find(x=>x.sourceTestSubmissionId===r.id);const rec={id:oldGrade?.id||uid('grade'),studentId:r.studentId,subjectId:t.subjectId||'',grade:Number(r.grade),type:'Toets',weight:Math.max(1,Number(t.weight)||1),note:r.feedback||'',date:t.date||today(),teacher:t.teacher||currentUser?.name||'Docent',sourceTestSubmissionId:r.id};if(oldGrade)Object.assign(oldGrade,rec);else grades.push(rec);save(KEY.grades,grades);}

  function schoolGradeTestSubmission(id){const r=testSubmissions.find(x=>x.id===id);if(!r)return;const t=tests.find(x=>x.id===r.testId);if(!t)return;const s=students().find(x=>x.id===r.studentId);const val=prompt(`Cijfer voor ${s?.name||'leerling'} (1-10):`,r.grade??'');if(val===null)return;const g=Math.max(1,Math.min(10,Number(val)));if(!Number.isFinite(g))return; r.grade=Number(g.toFixed(1));r.feedback=prompt('Feedback (optioneel):',r.feedback||'')||'';save(KEY.testSubmissions,testSubmissions);upsertTestGrade(r,t);schoolViewTestResults(r.testId);showToast('📊 Toets beoordeeld','success');}

  function studentAverage(studentId,subjectId=''){
    const xs=grades.filter(g=>g.studentId===studentId&&(!subjectId||g.subjectId===subjectId));if(!xs.length)return null;const num=xs.reduce((n,g)=>n+(Number(g.grade)||0)*(Number(g.weight)||1),0);const den=xs.reduce((n,g)=>n+(Number(g.weight)||1),0);return Number((num/den).toFixed(1));
  }
  function renderGradesManager(){
    const subjectCols=subjects.map(s=>`<th>${esc(s.name)}</th>`).join('');
    return `<div class="school-form-grid-2"><div class="card"><h3>📊 Cijfer invoeren</h3><div class="form-group"><label>Leerling</label><select id="school-grade-student">${studentOptions()}</select></div><div class="school-form-grid"><div class="form-group"><label>Vak</label><select id="school-grade-subject">${subjectOptions()}</select></div><div class="form-group"><label>Type</label><select id="school-grade-type">${gradeTypes.map(t=>`<option>${esc(t)}</option>`).join('')}</select></div></div><div class="school-form-grid"><div class="form-group"><label>Cijfer</label><input id="school-grade-value" type="number" min="1" max="10" step="0.1" placeholder="8.0"></div><div class="form-group"><label>Weging</label><input id="school-grade-weight" type="number" min="1" max="10" value="1"></div></div><div class="form-group"><label>Opmerking</label><textarea id="school-grade-note" placeholder="Feedback voor de leerling"></textarea></div><button class="btn btn-success" onclick="schoolSaveGrade()">💾 Cijfer opslaan</button><div class="school-inline-add"><input id="school-new-grade-type" placeholder="Nieuw cijfertype"><button class="btn btn-secondary btn-sm" onclick="schoolAddGradeType()">➕ Type</button></div></div><div class="card"><h3>📈 Gemiddelden</h3><div class="school-scroll-list">${students().map(s=>`<div class="school-list-row"><strong>${esc(s.name)}</strong><span>${studentAverage(s.id)??'—'}</span></div>`).join('')||'<span class="text-muted">Geen leerlingen.</span>'}</div></div></div><div class="card school-section-gap"><h3>📋 Cijferboek</h3><div class="table-wrap"><table><thead><tr><th>Leerling</th>${subjectCols}<th>Gemiddelde</th></tr></thead><tbody>${students().map(s=>`<tr><td><strong>${esc(s.name)}</strong><br><span class="school-muted">${esc(s.klas||'—')}</span></td>${subjects.map(sub=>`<td>${studentAverage(s.id,sub.id)??'—'}</td>`).join('')}<td><strong>${studentAverage(s.id)??'—'}</strong></td></tr>`).join('')||'<tr><td colspan="99">Nog geen leerlingen.</td></tr>'}</tbody></table></div><div class="school-section-gap"><h3>🧾 Recente cijfers</h3>${grades.slice().reverse().slice(0,50).map(g=>{const s=students().find(x=>x.id===g.studentId);const sub=subjects.find(x=>x.id===g.subjectId);return `<div class="school-list-row"><div><strong>${esc(s?.name||'Leerling')}</strong> · ${esc(sub?.name||'Vak')} <span class="badge badge-accent">${g.grade}</span><div class="school-muted">${esc(g.type||'Cijfer')} · weging ${g.weight||1} · ${esc(g.date||'')}</div></div><div style="display:flex;gap:.35rem;align-items:center"><span>${esc(g.note||'')}</span><button class="btn btn-danger btn-sm" onclick="schoolDeleteGrade('${g.id}')">🗑️</button></div></div>`}).join('')||'<span class="text-muted">Nog geen cijfers.</span>'}</div></div>`;
  }

  function renderAttendanceManager(){
    return `<div class="school-form-grid-2"><div class="card"><h3>✅ Aanwezigheid</h3><div class="school-form-grid"><div class="form-group"><label>Datum</label><input id="school-att-date" type="date" value="${today()}"></div><div class="form-group"><label>Klas</label><select id="school-att-class">${classOptions()}</select></div></div><div class="school-muted" style="margin:.2rem 0 .7rem">Kies naast de status ook een reden. Bijvoorbeeld ziek, verlof, maatregelen of schorsing.</div><div id="school-attendance-list"></div></div><div class="card"><h3>📊 Aanwezigheidscijfers</h3>${classes().map(c=>{const ss=students().filter(s=>s.klas===c.name);const total=attendance.filter(a=>ss.some(s=>s.id===a.studentId)).length;const abs=attendance.filter(a=>a.status==='absent'&&ss.some(s=>s.id===a.studentId)).length;return `<div class="school-list-row"><strong>🏫 ${esc(c.name)}</strong><span>${total?Math.round((1-abs/total)*100):100}% aanwezig</span></div>`}).join('')||'<span class="text-muted">Maak eerst een klas.</span>'}</div></div>`;
  }
  function renderAttendanceList(){
    const root=document.getElementById('school-attendance-list');if(!root)return;const date=document.getElementById('school-att-date')?.value||today();const klas=document.getElementById('school-att-class')?.value||'';const list=students().filter(s=>!klas||s.klas===klas);
    const reasons=[['','Geen reden'],['ziek','🤒 Ziek'],['verlof','🌴 Verlof'],['afspraak','📅 Afspraak'],['maatregelen','⚠️ Maatregelen'],['schorsing','⛔ Schorsing'],['te_laat_vervoer','🚌 Vervoer'],['overig','📝 Overig']];
    root.innerHTML=list.length?list.map(s=>{const r=attendance.find(x=>x.date===date&&x.studentId===s.id);const st=r?.status||'';return `<div class="school-att-row"><div style="min-width:130px"><strong>${esc(s.name)}</strong><div class="school-muted">${esc(r?.reasonLabel||r?.reason||'')}</div></div><div style="display:flex;gap:.3rem;align-items:center;flex-wrap:wrap"><button class="btn btn-sm ${st==='present'?'btn-success':'btn-secondary'}" onclick="schoolSetAttendance('${s.id}','present')">Aanwezig</button><button class="btn btn-sm ${st==='late'?'btn-warning':'btn-secondary'}" onclick="schoolSetAttendance('${s.id}','late')">Te laat</button><button class="btn btn-sm ${st==='absent'?'btn-danger':'btn-secondary'}" onclick="schoolSetAttendance('${s.id}','absent')">Afwezig</button><select id="school-att-reason-${s.id}" style="min-width:150px">${reasons.map(([v,label])=>`<option value="${v}" ${r?.reason===v?'selected':''}>${label}</option>`).join('')}</select><button class="btn btn-secondary btn-sm" onclick="schoolSetAttendance('${s.id}',document.getElementById('school-att-current-status-${s.id}')?.value||'absent')">Opslaan reden</button></div><select id="school-att-current-status-${s.id}" class="hidden"><option value="${st||'absent'}">${st||'absent'}</option></select></div>`}).join(''):'<span class="text-muted">Geen leerlingen voor deze selectie.</span>';
  }
  function schoolSetAttendance(studentId,status){const date=document.getElementById('school-att-date')?.value||today();const i=attendance.findIndex(x=>x.date===date&&x.studentId===studentId);const reason=document.getElementById('school-att-reason-'+studentId)?.value||'';const labels={ziek:'Ziek',verlof:'Verlof',afspraak:'Afspraak',maatregelen:'Maatregelen',schorsing:'Schorsing',te_laat_vervoer:'Vervoer',overig:'Overig'};const rec={id:i>=0?attendance[i].id:uid('att'),date,studentId,status,reason,reasonLabel:labels[reason]||'',teacher:currentUser?.name||'Docent'};if(i>=0)attendance[i]=rec;else attendance.push(rec);save(KEY.attendance,attendance);renderAttendanceList();showToast('✅ Aanwezigheid en reden opgeslagen','success');}

  function renderTimetableManager(){
    const days=['Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag'];
    return `<div class="school-form-grid-2"><div class="card"><h3>🗓️ Rooster toevoegen</h3><div class="school-form-grid"><div class="form-group"><label>Dag</label><select id="school-time-day">${days.map(d=>`<option>${d}</option>`).join('')}</select></div><div class="form-group"><label>Klas</label><select id="school-time-class">${classOptions()}</select></div></div><div class="school-form-grid"><div class="form-group"><label>Start</label><input id="school-time-start" type="time" value="08:30"></div><div class="form-group"><label>Einde</label><input id="school-time-end" type="time" value="09:20"></div></div><div class="form-group"><label>Vak</label><select id="school-time-subject">${subjectOptions()}</select></div><div class="school-form-grid"><div class="form-group"><label>Lokaal</label><input id="school-time-room" placeholder="B12"></div><div class="form-group"><label>Docent</label><input id="school-time-teacher" value="${esc(currentUser?.name||'Docent')}"></div></div><button class="btn btn-primary" onclick="schoolCreateTimetable()">➕ In rooster zetten</button></div><div class="card"><h3>📋 Rooster</h3>${days.map(day=>`<div class="school-day"><strong>${day}</strong>${timetable.filter(x=>x.day===day).sort((a,b)=>a.start.localeCompare(b.start)).map(x=>{const s=subjects.find(q=>q.id===x.subjectId);return `<div class="school-list-row"><div><strong>${esc(x.start)}–${esc(x.end)} · ${esc(s?.name||'Vak')}</strong><div class="school-muted">${esc(x.className||'Alle klassen')} · lokaal ${esc(x.room||'—')} · ${esc(x.teacher||'')}</div></div><button class="btn btn-danger btn-sm" onclick="schoolDeleteTimetable('${x.id}')">🗑️</button></div>`}).join('')||'<span class="school-muted">Geen lessen.</span>'}</div>`).join('')}</div></div>`;
  }
  function schoolCreateTimetable(){const rec={id:uid('time'),day:document.getElementById('school-time-day').value,start:document.getElementById('school-time-start').value,end:document.getElementById('school-time-end').value,className:document.getElementById('school-time-class').value,subjectId:document.getElementById('school-time-subject').value,room:document.getElementById('school-time-room').value.trim(),teacher:document.getElementById('school-time-teacher').value.trim()||currentUser?.name||'Docent'};if(!rec.subjectId)return showToast('Kies eerst een vak','error');timetable.push(rec);save(KEY.timetable,timetable);renderSchoolPanel();showToast('🗓️ Roosteritem opgeslagen','success');}
  function schoolDeleteTimetable(id){timetable=timetable.filter(x=>x.id!==id);save(KEY.timetable,timetable);renderSchoolPanel();}

  function renderCalendarManager(){return `<div class="school-form-grid-2"><div class="card"><h3>📅 Agenda-item maken</h3><div class="form-group"><label>Titel</label><input id="school-event-title" placeholder="Excursie / studiedag"></div><div class="school-form-grid"><div class="form-group"><label>Datum</label><input id="school-event-date" type="date" value="${today()}"></div><div class="form-group"><label>Type</label><select id="school-event-type"><option>Algemeen</option><option>Deadline</option><option>Excursie</option><option>Activiteit</option><option>Studiedag</option></select></div></div><div class="form-group"><label>Klas</label><select id="school-event-class">${classOptions()}</select></div><div class="form-group"><label>Omschrijving</label><textarea id="school-event-desc"></textarea></div><button class="btn btn-primary" onclick="schoolCreateCalendarEvent()">📅 Toevoegen</button></div><div class="card"><h3>📋 Agenda & afspraken</h3>${[...calendar.map(x=>({...x,_kind:'Agenda'})),...appointments.map(x=>({...x,_kind:x.type||'Afspraak'}))].slice().sort((a,b)=>String(a.date).localeCompare(String(b.date))).map(x=>`<div class="school-list-row"><div><span class="badge badge-accent">${esc(x._kind)}</span> <strong>${esc(x.date)} · ${esc(x.title)}</strong><div class="school-muted">${x.startTime?esc(x.startTime)+'–'+esc(x.endTime||'')+' · ':''}${esc(x.className||'Alle klassen')}${x.location?' · '+esc(x.location):''}</div><div class="school-muted">${esc(x.description||x.note||'')}</div></div>${x.id&&x._kind!=='Agenda'?`<button class="btn btn-danger btn-sm" onclick="schoolDeleteAppointment('${x.id}')">🗑️</button>`:`<button class="btn btn-danger btn-sm" onclick="schoolDeleteCalendarEvent('${x.id}')">🗑️</button>`}</div>`).join('')||'<span class="text-muted">Nog geen agenda-items.</span>'}</div></div>`;}

  function schoolCreateAppointment(){
    const title=document.getElementById('school-appointment-title')?.value.trim();
    if(!title)return showToast('Vul een titel in','error');
    const teacherId=document.getElementById('school-appointment-teacher')?.value||currentUser?.id||'';
    appointments.push({id:uid('appt'),title,type:document.getElementById('school-appointment-type')?.value||'Afspraak',date:document.getElementById('school-appointment-date')?.value||today(),startTime:document.getElementById('school-appointment-start')?.value||'',endTime:document.getElementById('school-appointment-end')?.value||'',teacherId,className:document.getElementById('school-appointment-class')?.value||'',groupId:document.getElementById('school-appointment-group')?.value||'',location:document.getElementById('school-appointment-location')?.value.trim()||'',note:document.getElementById('school-appointment-note')?.value.trim()||'',teacher:accounts.find(a=>a.id===teacherId)?.name||currentUser?.name||'Docent',createdAt:new Date().toISOString()});
    save(KEY.appointments,appointments);renderSchoolPanel();showToast('📅 Afspraak gepland','success');
  }
  function schoolDeleteAppointment(id){appointments=appointments.filter(x=>x.id!==id);save(KEY.appointments,appointments);renderSchoolPanel();}

  function schoolCreateCalendarEvent(){const title=document.getElementById('school-event-title').value.trim();if(!title)return showToast('Vul een titel in','error');calendar.push({id:uid('event'),title,date:document.getElementById('school-event-date').value,type:document.getElementById('school-event-type').value,className:document.getElementById('school-event-class').value,description:document.getElementById('school-event-desc').value.trim(),teacher:currentUser?.name||'Docent'});save(KEY.calendar,calendar);renderSchoolPanel();showToast('📅 Agenda-item toegevoegd','success');}
  function schoolDeleteCalendarEvent(id){calendar=calendar.filter(x=>x.id!==id);save(KEY.calendar,calendar);renderSchoolPanel();}

  function renderMessagesManager(){return `<div class="school-form-grid-2"><div class="card"><h3>📢 Mededeling plaatsen</h3><div class="form-group"><label>Bericht</label><textarea id="school-message-text" placeholder="Morgen is er een toets..."></textarea></div><div class="school-form-grid"><div class="form-group"><label>Klas</label><select id="school-message-class">${classOptions()}</select></div><div class="form-group"><label>Type</label><select id="school-message-type"><option>Algemeen</option><option>Belangrijk</option><option>Herinnering</option></select></div></div><button class="btn btn-primary" onclick="schoolPublishAnnouncement()">📢 Publiceren</button></div><div class="card"><h3>📜 Berichten</h3>${announcements.slice().reverse().map(a=>`<div class="school-mini-card"><strong>${esc(a.type||'Algemeen')} · ${esc(a.text)}</strong><div class="school-muted">${esc(a.className||'Alle klassen')} · ${new Date(a.date||Date.now()).toLocaleString('nl-NL')}</div><button class="btn btn-danger btn-sm" onclick="schoolDeleteAnnouncement('${a.id}')">🗑️</button></div>`).join('')||'<span class="text-muted">Nog geen berichten.</span>'}</div></div>`;}
  function schoolPublishAnnouncement(){const text=document.getElementById('school-message-text')?.value.trim();if(!text)return showToast('Typ eerst een bericht','error');announcements.push({id:uid('ann'),text,className:document.getElementById('school-message-class')?.value||'',type:document.getElementById('school-message-type')?.value||'Algemeen',date:new Date().toISOString(),teacher:currentUser?.name||'Docent'});save(KEY.announcements,announcements);renderSchoolPanel();showToast('📢 Bericht gepubliceerd','success');}
  function schoolDeleteAnnouncement(id){announcements=announcements.filter(x=>x.id!==id);save(KEY.announcements,announcements);renderSchoolPanel();}

  function schoolCreateSubject(){const n=document.getElementById('school-subject-name')?.value.trim();const d=document.getElementById('school-subject-desc')?.value.trim()||'';if(!n)return showToast('Vul een vaknaam in','error');if(subjects.some(s=>s.name.toLowerCase()===n.toLowerCase()))return showToast('Dit vak bestaat al','warning');subjects.push({id:uid('sub'),name:n,description:d,createdAt:new Date().toISOString()});save(KEY.subjects,subjects);renderSchoolPanel();showToast('📘 Vak toegevoegd','success');}
  function schoolDeleteSubject(id){if(!confirm('Dit vak en gekoppelde schoolgegevens verwijderen?'))return;subjects=subjects.filter(s=>s.id!==id);lessons=lessons.filter(x=>x.subjectId!==id);homework=homework.filter(x=>x.subjectId!==id);tests=tests.filter(x=>x.subjectId!==id);grades=grades.filter(x=>x.subjectId!==id);save(KEY.subjects,subjects);save(KEY.lessons,lessons);save(KEY.homework,homework);save(KEY.tests,tests);save(KEY.grades,grades);renderSchoolPanel();}
  function schoolCreateLesson(){const subjectId=document.getElementById('school-lesson-subject')?.value||'';const title=document.getElementById('school-lesson-title')?.value.trim();if(!subjectId||!title)return showToast('Kies een vak en vul een lesnaam in','error');lessons.push({id:uid('les'),subjectId,title,date:document.getElementById('school-lesson-date')?.value||today(),startTime:document.getElementById('school-lesson-start')?.value||'',endTime:document.getElementById('school-lesson-end')?.value||'',className:document.getElementById('school-lesson-class')?.value||'',groupId:document.getElementById('school-lesson-group')?.value||'',teacherId:document.getElementById('school-lesson-teacher')?.value||currentUser?.id||'',room:document.getElementById('school-lesson-room')?.value.trim()||'',duration:Number(document.getElementById('school-lesson-duration')?.value||50),content:document.getElementById('school-lesson-content')?.value.trim()||'',objectives:document.getElementById('school-lesson-objectives')?.value.trim()||'',teacher:accounts.find(a=>a.id===(document.getElementById('school-lesson-teacher')?.value||''))?.name||currentUser?.name||'Docent',createdAt:new Date().toISOString()});save(KEY.lessons,lessons);renderSchoolPanel();showToast('📚 Les opgeslagen','success');}
  function schoolDeleteLesson(id){if(!confirm('Deze les verwijderen?'))return;lessons=lessons.filter(x=>x.id!==id);lessonProgress=lessonProgress.filter(x=>x.lessonId!==id);save(KEY.lessons,lessons);save(KEY.progress,lessonProgress);renderSchoolPanel();}
  function schoolCreateHomework(){const title=document.getElementById('school-homework-title')?.value.trim();if(!title)return showToast('Vul een titel in','error');homework.push({id:uid('hw'),title,itemType:document.getElementById('school-homework-type')?.value||'Huiswerk',subjectId:document.getElementById('school-homework-subject')?.value||'',description:document.getElementById('school-homework-desc')?.value.trim()||'',link:document.getElementById('school-homework-link')?.value.trim()||'',className:document.getElementById('school-homework-class')?.value||'',groupId:document.getElementById('school-homework-group')?.value||'',publishDate:document.getElementById('school-homework-date')?.value||today(),dueDate:document.getElementById('school-homework-due')?.value||'',teacher:currentUser?.name||'Docent',createdAt:new Date().toISOString()});save(KEY.homework,homework);renderSchoolPanel();showToast('📝 Huiswerk geplaatst','success');}
  function schoolDeleteHomework(id){if(!confirm('Dit huiswerk verwijderen?'))return;const subIds=new Set(homeworkSubmissions.filter(x=>x.homeworkId===id).map(x=>x.id));homework=homework.filter(x=>x.id!==id);homeworkSubmissions=homeworkSubmissions.filter(x=>x.homeworkId!==id);grades=grades.filter(x=>!subIds.has(x.sourceHomeworkSubmissionId));save(KEY.homework,homework);save(KEY.homeworkSubmissions,homeworkSubmissions);save(KEY.grades,grades);renderSchoolPanel();}
  function schoolGradeHomework(id){const r=homeworkSubmissions.find(x=>x.id===id);if(!r)return;const hw=homework.find(x=>x.id===r.homeworkId);const v=prompt('Cijfer voor huiswerk (1-10):',r.grade??'');if(v===null)return;const g=Number(v);if(!Number.isFinite(g)||g<1||g>10)return showToast('Ongeldig cijfer','error');r.grade=Number(g.toFixed(1));r.status='graded';r.feedback=prompt('Feedback:',r.feedback||'')||'';const oldGrade=grades.find(x=>x.sourceHomeworkSubmissionId===r.id);const rec={id:oldGrade?.id||uid('grade'),studentId:r.studentId,subjectId:hw?.subjectId||'',grade:r.grade,type:'Huiswerk',weight:1,note:r.feedback||'',date:today(),teacher:currentUser?.name||'Docent',sourceHomeworkSubmissionId:r.id};if(oldGrade)Object.assign(oldGrade,rec);else grades.push(rec);save(KEY.homeworkSubmissions,homeworkSubmissions);save(KEY.grades,grades);renderSchoolPanel();showToast('📊 Huiswerk nagekeken en cijferboek bijgewerkt','success');}
  function schoolAddGradeType(){const v=document.getElementById('school-new-grade-type')?.value.trim();if(!v)return showToast('Vul een cijfertype in','error');if(!gradeTypes.includes(v))gradeTypes.push(v);save(KEY.gradeTypes,gradeTypes);renderSchoolPanel();showToast('📊 Cijfertype toegevoegd','success');}

  function schoolSaveGrade(){const studentId=document.getElementById('school-grade-student')?.value;const subjectId=document.getElementById('school-grade-subject')?.value;const grade=Number(document.getElementById('school-grade-value')?.value);if(!studentId||!subjectId||!Number.isFinite(grade)||grade<1||grade>10)return showToast('Vul leerling, vak en geldig cijfer in','error');grades.push({id:uid('grade'),studentId,subjectId,grade:Number(grade.toFixed(1)),type:document.getElementById('school-grade-type')?.value||'Cijfer',weight:Math.max(1,Number(document.getElementById('school-grade-weight')?.value)||1),note:document.getElementById('school-grade-note')?.value.trim()||'',date:today(),teacher:currentUser?.name||'Docent'});save(KEY.grades,grades);renderSchoolPanel();showToast('📊 Cijfer opgeslagen','success');}
  function schoolDeleteGrade(id){if(!confirm('Dit cijfer verwijderen?'))return;grades=grades.filter(g=>g.id!==id);save(KEY.grades,grades);renderSchoolPanel();showToast('🗑️ Cijfer verwijderd','success');}
  function schoolGetGrades(){refresh();return grades.slice();}
  function schoolGetSubjects(){refresh();return subjects.slice();}
  function schoolResetStudentData(studentId){
    refresh();
    grades=grades.filter(g=>g.studentId!==studentId);
    homeworkSubmissions=homeworkSubmissions.filter(x=>x.studentId!==studentId);
    testSubmissions=testSubmissions.filter(x=>x.studentId!==studentId);
    attendance=attendance.filter(x=>x.studentId!==studentId);
    lessonProgress=lessonProgress.filter(x=>x.studentId!==studentId);
    save(KEY.grades,grades);save(KEY.homeworkSubmissions,homeworkSubmissions);save(KEY.testSubmissions,testSubmissions);save(KEY.attendance,attendance);save(KEY.progress,lessonProgress);
  }
  function schoolResetAllStudentData(){
    refresh();
    const ids=new Set(students().map(s=>s.id));
    grades=grades.filter(g=>!ids.has(g.studentId));
    homeworkSubmissions=homeworkSubmissions.filter(x=>!ids.has(x.studentId));
    testSubmissions=testSubmissions.filter(x=>!ids.has(x.studentId));
    attendance=attendance.filter(x=>!ids.has(x.studentId));
    lessonProgress=lessonProgress.filter(x=>!ids.has(x.studentId));
    save(KEY.grades,grades);save(KEY.homeworkSubmissions,homeworkSubmissions);save(KEY.testSubmissions,testSubmissions);save(KEY.attendance,attendance);save(KEY.progress,lessonProgress);
  }
  function schoolSaveSettings(){settings={schoolName:document.getElementById('school-setting-name')?.value.trim()||'Mijn school',schoolYear:document.getElementById('school-setting-year')?.value.trim()||'2026-2027'};save(KEY.settings,settings);showToast('🏫 Schoolinstellingen opgeslagen','success');}
  function schoolSaveEverythingNow(){try{if(typeof saveEverything==='function')saveEverything();if(window.islandCloud?.syncNow)window.islandCloud.syncNow();showToast('☁️ Alles gesynchroniseerd','success');}catch(e){showToast('Synchroniseren mislukt','error');}}
  function schoolRefreshAll(){refresh();if(isTeacher())renderSchoolPanel();else renderStudentSchool();showToast('↻ Schoolgegevens vernieuwd','info');}
  function schoolTeacherTab(id,btn){document.querySelectorAll('.school-subtab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.school-view').forEach(x=>x.classList.remove('active'));btn?.classList.add('active');document.getElementById('school-view-'+id)?.classList.add('active');if(id==='attendance')renderAttendanceList();}

  function visibleToStudent(item,a){if(!a)return false;if(!item.className&&!item.groupId)return true;if(item.className&&item.className===a.klas)return true;return !!(item.groupId&&(a.groups||[]).includes(item.groupId));}
  function renderStudentSchool(){
    refresh();const root=document.getElementById('student-school-content');if(!root||!currentUser)return;const mineLessons=lessons.filter(l=>visibleToStudent(l,currentUser));const mineHW=homework.filter(h=>visibleToStudent(h,currentUser));const mineTests=tests.filter(t=>visibleToStudent(t,currentUser));const mineAppointments=appointments.filter(t=>visibleToStudent(t,currentUser));const mineGrades=grades.filter(g=>g.studentId===currentUser.id);const avg=studentAverage(currentUser.id);
    root.innerHTML=`<div class="school-student-grid"><div class="card"><h3>📊 Mijn gemiddelde</h3><div class="school-big-number">${avg??'—'}</div><p class="school-muted">Cijferboek</p></div><div class="card"><h3>📚 Lessen</h3><div class="school-big-number">${mineLessons.length}</div><p class="school-muted">voor jouw klas/groep</p></div><div class="card"><h3>📝 Openstaand huiswerk</h3><div class="school-big-number">${mineHW.filter(h=>!homeworkSubmissions.some(s=>s.homeworkId===h.id&&s.studentId===currentUser.id)).length}</div><p class="school-muted">nog in te leveren</p></div><div class="card"><h3>🧪 Toetsen</h3><div class="school-big-number">${mineTests.filter(t=>!testSubmissions.some(s=>s.testId===t.id&&s.studentId===currentUser.id)).length}</div><p class="school-muted">nog te maken</p></div></div>
      <div class="school-student-tabs"><button class="school-subtab active" onclick="schoolStudentTab('lessons',this)">📚 Lessen</button><button class="school-subtab" onclick="schoolStudentTab('homework',this)">📝 Huiswerk</button><button class="school-subtab" onclick="schoolStudentTab('tests',this)">🧪 Toetsen</button><button class="school-subtab" onclick="schoolStudentTab('grades',this)">📊 Cijfers</button><button class="school-subtab" onclick="schoolStudentTab('roster',this)">🗓️ Rooster</button><button class="school-subtab" onclick="schoolStudentTab('calendar',this)">📅 Agenda</button></div>
      <div class="school-student-view active" id="school-student-lessons">${renderStudentLessons(mineLessons)}</div>
      <div class="school-student-view" id="school-student-homework">${renderStudentHomework(mineHW)}</div>
      <div class="school-student-view" id="school-student-tests">${renderStudentTests(mineTests)}</div>
      <div class="school-student-view" id="school-student-grades">${renderStudentGrades(mineGrades)}</div>
      <div class="school-student-view" id="school-student-roster">${renderStudentRoster()}</div>
      <div class="school-student-view" id="school-student-calendar">${renderStudentCalendar(mineAppointments)}</div>`;
  }
  function schoolStudentTab(id,btn){document.querySelectorAll('.school-student-tabs .school-subtab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.school-student-view').forEach(x=>x.classList.remove('active'));btn?.classList.add('active');document.getElementById('school-student-'+id)?.classList.add('active');}
  function renderStudentLessons(items){return items.slice().sort((a,b)=>String(a.date).localeCompare(String(b.date))).map(l=>{const s=subjects.find(x=>x.id===l.subjectId);const done=lessonProgress.some(x=>x.lessonId===l.id&&x.studentId===currentUser.id&&x.done);return `<div class="card school-item-card"><span class="badge badge-accent">${esc(s?.name||'Vak')}</span><h3>${esc(l.title)}</h3><div class="school-muted">${esc(l.date||'—')} · ${l.duration||50} min · ${esc(l.className||'Alle klassen')}</div><p class="school-pre">${esc(l.content||'')}</p>${l.objectives?`<p><strong>Leerdoelen:</strong> ${esc(l.objectives)}</p>`:''}<button class="btn ${done?'btn-secondary':'btn-success'}" onclick="schoolMarkLessonDone('${l.id}')">${done?'✅ Afgerond':'☑️ Les afronden'}</button></div>`}).join('')||'<div class="card school-empty">Geen lessen voor jou.</div>';}
  function renderStudentHomework(items){return items.slice().sort((a,b)=>String(a.dueDate).localeCompare(String(b.dueDate))).map(h=>{const s=subjects.find(x=>x.id===h.subjectId);const sub=homeworkSubmissions.find(x=>x.homeworkId===h.id&&x.studentId===currentUser.id);const late=h.dueDate&&h.dueDate<today()&&!sub;return `<div class="card school-item-card"><span class="badge ${late?'badge-danger':'badge-warning'}">${late?'Te laat':'Deadline '+esc(h.dueDate||'—')}</span><h3>${esc(h.title)}</h3><div class="school-muted">${esc(s?.name||'Vak')} · ${esc(h.className||'Alle klassen')}</div><p class="school-pre">${esc(h.description||'')}</p>${sub?`<div class="school-submit-box">✅ Ingeleverd op ${esc(sub.submittedAt||'')}${sub.grade!=null?` · <strong>Cijfer ${sub.grade}</strong>`:''}${sub.feedback?`<div class="school-muted">${esc(sub.feedback)}</div>`:''}</div>`:`<textarea id="hw-text-${h.id}" placeholder="Antwoord / inlevertekst..."></textarea><button class="btn btn-primary" style="margin-top:.4rem" onclick="schoolSubmitHomework('${h.id}')">📨 Inleveren</button>`}</div>`}).join('')||'<div class="card school-empty">Geen huiswerk voor jou.</div>';}
  function renderStudentTests(items){return items.map(t=>{const sub=testSubmissions.find(x=>x.testId===t.id&&x.studentId===currentUser.id);return `<div class="card school-item-card"><span class="badge badge-accent">🧪 ${esc(t.type||'Toets')}</span><h3>${esc(t.title)}</h3><div class="school-muted">${esc(t.date||'—')} · ${t.duration||45} min · weging ${t.weight||1}</div>${sub?`<div class="school-submit-box">✅ Ingeleverd · ${Number(sub.percent||0)}%${sub.grade!=null?` · cijfer ${sub.grade}`:''}${sub.feedback?`<div class="school-muted">${esc(sub.feedback)}</div>`:''}</div>`:`<button class="btn btn-primary" onclick="schoolStartTest('${t.id}')">🧪 Toets maken</button>`}</div>`}).join('')||'<div class="card school-empty">Geen toetsen voor jou.</div>';}
  function renderStudentGrades(items){return `<div class="card"><h3>📊 Mijn cijfers</h3><div class="table-wrap"><table><thead><tr><th>Vak</th><th>Type</th><th>Cijfer</th><th>Weging</th><th>Datum</th><th>Opmerking</th></tr></thead><tbody>${items.slice().reverse().map(g=>{const s=subjects.find(x=>x.id===g.subjectId);return `<tr><td>${esc(s?.name||'Vak')}</td><td>${esc(g.type||'Cijfer')}</td><td><strong>${g.grade}</strong></td><td>${g.weight||1}</td><td>${esc(g.date||'')}</td><td>${esc(g.note||'')}</td></tr>`}).join('')||'<tr><td colspan="6">Nog geen cijfers.</td></tr>'}</tbody></table></div><p style="margin-top:.75rem"><strong>Gemiddelde: ${studentAverage(currentUser.id)??'—'}</strong></p></div>`;}
  function renderStudentRoster(){const rows=timetable.filter(x=>!x.className||x.className===currentUser.klas).sort((a,b)=>['Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag'].indexOf(a.day)-['Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag'].indexOf(b.day)||a.start.localeCompare(b.start));return `<div class="card"><h3>🗓️ Mijn rooster</h3>${rows.map(x=>{const s=subjects.find(q=>q.id===x.subjectId);return `<div class="school-list-row"><div><strong>${esc(x.day)} ${esc(x.start)}–${esc(x.end)} · ${esc(s?.name||'Vak')}</strong><div class="school-muted">Lokaal ${esc(x.room||'—')} · ${esc(x.teacher||'')}</div></div></div>`}).join('')||'<span class="text-muted">Er is nog geen rooster voor jouw klas.</span>'}</div>`;}
  function renderStudentCalendar(extra=[]){const rows=[...calendar.filter(x=>!x.className||x.className===currentUser.klas),...extra].sort((a,b)=>String(a.date).localeCompare(String(b.date)));return `<div class="card"><h3>📅 Mijn agenda</h3>${rows.map(x=>`<div class="school-list-row"><div><strong>${esc(x.date)} · ${esc(x.title)}</strong><div class="school-muted">${esc(x.type)} · ${esc(x.description||'')}</div></div></div>`).join('')||'<span class="text-muted">Geen agenda-items.</span>'}</div>`;}
  function schoolMarkLessonDone(id){const i=lessonProgress.findIndex(x=>x.lessonId===id&&x.studentId===currentUser?.id);const rec={id:i>=0?lessonProgress[i].id:uid('lp'),lessonId:id,studentId:currentUser?.id,done:true,date:new Date().toISOString()};if(i>=0)lessonProgress[i]=rec;else lessonProgress.push(rec);save(KEY.progress,lessonProgress);renderStudentSchool();showToast('✅ Les afgerond','success');}
  function schoolSubmitHomework(id){const text=document.getElementById('hw-text-'+id)?.value.trim()||'';const old=homeworkSubmissions.find(x=>x.homeworkId===id&&x.studentId===currentUser?.id);const rec={id:old?.id||uid('hws'),homeworkId:id,studentId:currentUser?.id,text,status:'submitted',submittedAt:new Date().toISOString()};if(old)Object.assign(old,rec);else homeworkSubmissions.push(rec);save(KEY.homeworkSubmissions,homeworkSubmissions);renderStudentSchool();showToast('📨 Huiswerk ingeleverd','success');}

  let activeTestId=null;let activeTestIndex=0;let activeTestAnswers={};
  function schoolStartTest(id){const t=tests.find(x=>x.id===id);if(!t)return;activeTestId=id;activeTestIndex=0;activeTestAnswers={};renderTestRunner();}
  function renderTestRunner(){const root=document.getElementById('student-school-content');const t=tests.find(x=>x.id===activeTestId);if(!root||!t)return;const q=t.questions[activeTestIndex];root.innerHTML=`<div class="card test-runner"><div class="school-muted">🧪 ${esc(t.title)} · vraag ${activeTestIndex+1}/${t.questions.length}</div><h2>${esc(q.question)}</h2><div class="school-test-options">${q.options.map((o,i)=>`<button class="qopt ${activeTestAnswers[activeTestIndex]===i?'correct':''}" onclick="schoolAnswerTest(${i})"><span class="ol">${String.fromCharCode(65+i)}</span>${esc(o)}</button>`).join('')}</div><div class="test-runner-footer"><span>${q.points||1} punt</span><button class="btn btn-primary" onclick="schoolNextTestQuestion()">${activeTestIndex===t.questions.length-1?'📨 Inleveren':'Volgende →'}</button></div></div>`;}
  function schoolAnswerTest(i){activeTestAnswers[activeTestIndex]=i;renderTestRunner();}
  function schoolNextTestQuestion(){const t=tests.find(x=>x.id===activeTestId);if(!t)return;if(activeTestAnswers[activeTestIndex]==null)return showToast('Kies eerst een antwoord','warning');if(activeTestIndex<t.questions.length-1){activeTestIndex++;renderTestRunner();return;}let earned=0,total=0;t.questions.forEach((q,i)=>{const pts=Number(q.points||1);total+=pts;if(Number(activeTestAnswers[i])===Number(q.correct))earned+=pts;});const percent=total?Math.round(earned/total*100):0;const grade=Number((1+percent/100*9).toFixed(1));const submission={id:uid('ts'),testId:t.id,studentId:currentUser.id,answers:activeTestAnswers,earned,total,percent,grade,submittedAt:new Date().toISOString(),feedback:''};testSubmissions.push(submission);save(KEY.testSubmissions,testSubmissions);upsertTestGrade(submission,t);showToast(`✅ Toets ingeleverd: ${percent}% · cijfer ${grade}`,'success');activeTestId=null;renderStudentSchool();}

  function openSchoolPanel(btn){
    if(!isTeacher())return showToast('Geen toegang tot de schoolomgeving','error');
    document.querySelectorAll('.admin-tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach(x=>x.classList.remove('active'));
    if(btn)btn.classList.add('active');
    document.getElementById('apanel-school')?.classList.add('active');
    renderSchoolPanel();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  // Keep the existing older lessons screen working too.
  function openStudentLessons(){const screen=document.getElementById('screen-school')||document.getElementById('screen-lessons');if(!screen)return;document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.querySelectorAll('.nav-tab').forEach(b=>b.classList.remove('active'));screen.classList.add('active');(document.getElementById('tab-school')||document.getElementById('tab-lessons'))?.classList.add('active');renderStudentSchool();window.scrollTo({top:0,behavior:'smooth'});}

  Object.assign(window,{renderSchoolPanel,openSchoolPanel,openStudentLessons,renderStudentSchool,schoolTeacherTab,schoolStudentTab,openSchoolPanel,schoolCreateSubject,schoolDeleteSubject,schoolCreateLesson,schoolDeleteLesson,schoolCreateHomework,schoolDeleteHomework,schoolGradeHomework,schoolAddGradeType,schoolAddTestQuestion,schoolEditTestQ,schoolEditTestOption,schoolRemoveTestQuestion,schoolCreateTest,schoolDeleteTest,schoolViewTestResults,schoolGradeTestSubmission,schoolSaveGrade,schoolDeleteGrade,schoolGetGrades,schoolGetSubjects,schoolResetStudentData,schoolResetAllStudentData,schoolSetAttendance,schoolCreateTimetable,schoolDeleteTimetable,schoolCreateCalendarEvent,schoolDeleteCalendarEvent,schoolPublishAnnouncement,schoolDeleteAnnouncement,schoolSaveSettings,schoolCreateAppointment,schoolDeleteAppointment,schoolSaveEverythingNow,schoolRefreshAll,schoolMarkLessonDone,schoolSubmitHomework,schoolStartTest,schoolAnswerTest,schoolNextTestQuestion,renderAttendanceList});
  window.addEventListener('load',()=>{setTimeout(()=>{try{if(isTeacher()){} else if(currentUser)renderStudentSchool();}catch(e){console.warn('Schoolmodule init',e);}},0);});
})();
