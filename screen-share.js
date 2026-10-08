/* Island Clash — consent-based screen sharing over Supabase Realtime + WebRTC.
 * A student must explicitly accept the request and the browser getDisplayMedia permission.
 */
(function(){
  'use strict';
  const RTC_CONFIG={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]};
  let studentChannel=null, studentPC=null, studentStream=null, studentTeacherId=null, studentSessionId=null, studentPendingCandidates=[];
  let teacherChannel=null, teacherPC=null, teacherStudentId=null, teacherSessionId=null, teacherPendingCandidates=[];
  const room=sid=>'island-clash-screen-'+sid;
  const db=()=>window.IslandClashSupabaseDatabase?.getClient?.()||null;
  const logEvent=(type,studentId,extra={})=>{try{const rows=JSON.parse(localStorage.getItem('ic_screen_sessions')||'[]');rows.push({id:'scr_'+Date.now(),type,studentId,at:new Date().toISOString(),...extra});localStorage.setItem('ic_screen_sessions',JSON.stringify(rows.slice(-100)));window.islandCloud?.scheduleSync?.('ic_screen_sessions',JSON.stringify(rows.slice(-100)));}catch(e){}}
  const status=(id,msg)=>{const el=document.getElementById(id);if(el)el.textContent=msg;}
  async function subscribeChannel(name,handler){
    const sb=db(); if(!sb)throw new Error('Supabase is niet geconfigureerd.');
    const ch=sb.channel(name);
    ch.on('broadcast',{event:'signal'},({payload})=>{try{handler(payload||{})}catch(e){console.error('screen signal',e)}});
    await new Promise((resolve,reject)=>{let done=false;ch.subscribe(st=>{if(st==='SUBSCRIBED'){done=true;resolve();}else if(st==='CHANNEL_ERROR'||st==='TIMED_OUT'){if(!done)reject(new Error('Supabase Realtime verbinding mislukt.'));}});});
    return ch;
  }
  async function send(ch,payload){if(ch)await ch.send({type:'broadcast',event:'signal',payload});}
  function selectedStudentId(){return document.getElementById('screen-share-student')?.value||'';}

  window.renderScreenShareStudents=function(){
    const el=document.getElementById('screen-share-student');if(!el)return;
    const students=(accounts||[]).filter(a=>a.role==='leerling');const cur=el.value;el.innerHTML='<option value="">— kies leerling —</option>'+students.map(a=>`<option value="${a.id}">${typeof escH==='function'?escH(a.name):a.name}${a.klas?' · '+(typeof escH==='function'?escH(a.klas):a.klas):''}</option>`).join('');if(students.some(a=>a.id===cur))el.value=cur;
  };

  function ensureVideoStream(video,stream){if(!video)return;try{video.srcObject=stream;video.play?.().catch(()=>{});}catch(e){}}
  function clearVideo(video){if(video){try{video.pause();video.srcObject=null;}catch(e){}}}

  window.startStudentScreenShareListener=async function(){
    if(!currentUser||currentUser.role!=='leerling'||studentChannel)return;
    try{
      studentChannel=await subscribeChannel(room(currentUser.id), async payload=>{
        if(payload.to!==currentUser?.id && payload.type!=='request') return;
        if(payload.type==='request'){
          studentTeacherId=payload.from;studentSessionId=payload.session||('s_'+Date.now());
          const holder=document.getElementById('student-screen-share-request');
          if(holder){holder.style.display='block';holder.innerHTML=`<div class="teacher-mini-card"><strong>👩‍🏫 ${typeof escH==='function'?escH(payload.fromName||'Je docent'):'Je docent'} vraagt om je scherm te delen.</strong><div style="margin-top:.45rem;display:flex;gap:.35rem;flex-wrap:wrap"><button class="btn btn-success btn-sm" onclick="acceptStudentScreenShare()">✅ Toestaan</button><button class="btn btn-secondary btn-sm" onclick="declineStudentScreenShare()">Afwijzen</button></div></div>`;}
          status('student-screen-share-status','🟡 Je docent vraagt om je scherm te delen.');
        } else if(payload.type==='answer' && payload.session===studentSessionId && payload.to===currentUser.id){
          if(!studentPC)return;await studentPC.setRemoteDescription(new RTCSessionDescription(payload.description));for(const c of studentPendingCandidates.splice(0)){try{await studentPC.addIceCandidate(c)}catch(e){}};status('student-screen-share-status','🟢 Je scherm wordt gedeeld met je docent.');
        } else if(payload.type==='ice' && payload.session===studentSessionId && payload.to===currentUser.id){
          if(studentPC?.remoteDescription?.type){try{await studentPC.addIceCandidate(payload.candidate)}catch(e){}}else studentPendingCandidates.push(payload.candidate);
        } else if(payload.type==='stop' && payload.session===studentSessionId && payload.to===currentUser.id){ stopStudentScreenShare(); }
      });
      status('student-screen-share-status','🟢 Verbonden met de schermdeelservice.');
    }catch(e){console.warn(e);status('student-screen-share-status','⚠️ Schermdelen is niet beschikbaar. Controleer Supabase Realtime.');}
  };

  window.acceptStudentScreenShare=async function(){
    if(!currentUser||!studentTeacherId)return;
    const holder=document.getElementById('student-screen-share-request');if(holder)holder.style.display='none';
    try{
      studentStream=await navigator.mediaDevices.getDisplayMedia({video:{frameRate:{ideal:12,max:20}},audio:false});
      studentPC=new RTCPeerConnection(RTC_CONFIG);studentPendingCandidates=[];
      studentStream.getTracks().forEach(t=>studentPC.addTrack(t,studentStream));
      studentPC.onicecandidate=e=>{if(e.candidate)send(studentChannel,{type:'ice',to:studentTeacherId,from:currentUser.id,session:studentSessionId,candidate:e.candidate.toJSON()})};
      studentStream.getVideoTracks()[0]?.addEventListener('ended',()=>stopStudentScreenShare());
      const offer=await studentPC.createOffer();await studentPC.setLocalDescription(offer);
      await send(studentChannel,{type:'offer',to:studentTeacherId,from:currentUser.id,session:studentSessionId,description:studentPC.localDescription});
      status('student-screen-share-status','🟢 Je scherm wordt gedeeld met je docent.');logEvent('start',currentUser.id,{teacherId:studentTeacherId});
    }catch(e){status('student-screen-share-status','⚠️ Schermdelen is geannuleerd of niet toegestaan.');await send(studentChannel,{type:'decline',to:studentTeacherId,from:currentUser.id,session:studentSessionId});}
  };
  window.declineStudentScreenShare=async function(){const holder=document.getElementById('student-screen-share-request');if(holder)holder.style.display='none';if(studentChannel&&studentTeacherId)await send(studentChannel,{type:'decline',to:studentTeacherId,from:currentUser?.id,session:studentSessionId});status('student-screen-share-status','Je hebt schermdelen afgewezen.');};
  window.startStudentScreenShare=async function(){
    if(!currentUser||currentUser.role!=='leerling')return;
    if(!studentChannel)await startStudentScreenShareListener();
    if(!studentChannel)return;
    const teacher=prompt('Vul de gebruikersnaam van je docent in:','docent');
    if(!teacher)return;
    const acc=(accounts||[]).find(a=>a.role==='docent'&&String(a.username||'').toLowerCase()===teacher.trim().toLowerCase());
    if(!acc)return showToast('Docent niet gevonden','error');
    studentTeacherId=acc.id;studentSessionId='s_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);await acceptStudentScreenShare();
  };
  window.stopStudentScreenShare=function(){
    try{studentStream?.getTracks().forEach(t=>t.stop())}catch(e){} studentStream=null;try{studentPC?.close()}catch(e){} studentPC=null;studentPendingCandidates=[];if(studentChannel&&studentTeacherId&&studentSessionId)send(studentChannel,{type:'stop',to:studentTeacherId,from:currentUser?.id,session:studentSessionId});logEvent('stop',currentUser?.id,{teacherId:studentTeacherId});status('student-screen-share-status','Niet aan het delen.');const holder=document.getElementById('student-screen-share-request');if(holder)holder.style.display='none';
  };

  window.teacherRequestScreenShare=async function(){
    if(!currentUser||!hasDocentAccess())return showToast('Alleen docenten kunnen schermdelen opvragen','error');
    const sid=selectedStudentId();if(!sid)return showToast('Kies eerst een leerling','warning');
    teacherStudentId=sid;teacherSessionId='s_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);
    try{if(teacherChannel)try{await teacherChannel.unsubscribe()}catch(e){};teacherChannel=await subscribeChannel(room(sid),async payload=>{
      if(payload.to!==currentUser?.id && payload.type!=='offer' && payload.type!=='decline')return;
      if(payload.type==='offer'&&payload.to===currentUser.id&&payload.session===teacherSessionId){
        teacherPC=new RTCPeerConnection(RTC_CONFIG);teacherPendingCandidates=[];teacherPC.onicecandidate=e=>{if(e.candidate)send(teacherChannel,{type:'ice',to:teacherStudentId,from:currentUser.id,session:teacherSessionId,candidate:e.candidate.toJSON()})};teacherPC.ontrack=e=>{ensureVideoStream(document.getElementById('teacher-screen-share-video'),e.streams[0]);document.getElementById('teacher-screen-share-empty')?.classList.add('hidden');status('teacher-screen-share-status','🟢 Live meekijken actief.');};await teacherPC.setRemoteDescription(new RTCSessionDescription(payload.description));for(const c of teacherPendingCandidates.splice(0)){try{await teacherPC.addIceCandidate(c)}catch(e){}};const ans=await teacherPC.createAnswer();await teacherPC.setLocalDescription(ans);await send(teacherChannel,{type:'answer',to:teacherStudentId,from:currentUser.id,session:teacherSessionId,description:teacherPC.localDescription});logEvent('teacher-connected',teacherStudentId,{teacherId:currentUser.id});
      }else if(payload.type==='ice'&&payload.to===currentUser.id&&payload.session===teacherSessionId){if(teacherPC?.remoteDescription?.type){try{await teacherPC.addIceCandidate(payload.candidate)}catch(e){}}else teacherPendingCandidates.push(payload.candidate);}else if(payload.type==='decline'&&payload.session===teacherSessionId){status('teacher-screen-share-status','🟠 De leerling heeft schermdelen geweigerd.');}
    });
      const a=accounts.find(x=>x.id===sid);await send(teacherChannel,{type:'request',to:sid,from:currentUser.id,fromName:currentUser.name,session:teacherSessionId});status('teacher-screen-share-status',`🟡 Schermdeel-aanvraag verstuurd naar ${a?.name||'leerling'}.`);logEvent('request',sid,{teacherId:currentUser.id});
    }catch(e){console.error(e);status('teacher-screen-share-status','⚠️ Kon geen realtime verbinding maken.');showToast('Supabase Realtime is niet beschikbaar','error');}
  };
  window.teacherStopScreenShare=async function(){if(teacherChannel&&teacherStudentId&&teacherSessionId)try{await send(teacherChannel,{type:'stop',to:teacherStudentId,from:currentUser?.id,session:teacherSessionId})}catch(e){};try{teacherPC?.close()}catch(e){}teacherPC=null;try{await teacherChannel?.unsubscribe()}catch(e){}teacherChannel=null;clearVideo(document.getElementById('teacher-screen-share-video'));document.getElementById('teacher-screen-share-empty')?.classList.remove('hidden');status('teacher-screen-share-status','Geen schermverbinding actief.');logEvent('teacher-stop',teacherStudentId,{teacherId:currentUser?.id});teacherStudentId=null;teacherSessionId=null;teacherPendingCandidates=[];};
  window.stopAllScreenShare=function(){try{window.stopStudentScreenShare?.()}catch(e){}try{window.teacherStopScreenShare?.()}catch(e){}};
  window.addEventListener('beforeunload',()=>{try{window.stopStudentScreenShare?.();}catch(e){}try{window.teacherStopScreenShare?.();}catch(e){}});
  window.renderExtraTools=window.renderExtraTools||function(){};
})();
