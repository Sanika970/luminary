"use strict";
const $=id=>document.getElementById(id), RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
const CODES="RIASEC".split(""), STR=["PCM","PCB","Commerce","Humanities"];
const META={R:["Realistic","Builder","🛠️","#ff8a5b"],I:["Investigative","Thinker","🔬","#5bc8ff"],A:["Artistic","Creator","🎨","#ff6bd6"],S:["Social","Helper","🤝","#7cf5c0"],E:["Enterprising","Persuader","🚀","#ffd166"],C:["Conventional","Organiser","🗂️","#b49bff"]};
const FACE=["😖","🙁","😐","🙂","🤩"], LBL=["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"];
const Q=[
["R","Your phone breaks. You’re curious to open it up and see what’s inside.","You’d enjoy a project where you build or repair something real, like a circuit or a bike."],
["I","A science puzzle has no answer in the book. You keep digging until you crack it.","You’d enjoy analysing data to find out why something happens."],
["A","Given a blank wall, you’d happily design and paint something on it.","You’d enjoy making a poster, video or design from scratch."],
["S","A classmate is upset. You’re the one who sits with them and helps.","You’d enjoy mentoring or tutoring younger students."],
["E","You’d love to run a stall at the school fest and sell out.","You’d enjoy pitching an idea and convincing people to back it."],
["C","You like keeping your notes, bag and timetable perfectly organised.","You’d enjoy managing budgets, records or schedules accurately."],
["R","On a weekend you’d rather be outdoors building or fixing than sitting still.","You’d rather work with tools or equipment than at a desk all day."],
["I","You often ask “but why does that work?” and go look it up.","You’d enjoy running an experiment to test an idea."],
["A","You often imagine stories, songs or characters in your head.","You’d enjoy a career where original ideas matter most."],
["S","You enjoy explaining a tough topic to friends until they get it.","You’d enjoy a career helping people with health, learning or problems."],
["E","In group projects you naturally take charge and make the plan.","You’d enjoy leading a team toward a target."],
["C","You double-check your answers and like clear rules and steps.","You’d enjoy work with clear procedures, numbers and accuracy."]];
const CAR={
R:[["Electrician / Solar Technician","","You like fixing real stuff and seeing it work."],["Mechanical Engineer","M","You want to know how machines tick, then build better ones."],["Chef","","Hands-on, fast, and you see people enjoy your work."],["Agri-tech Specialist","B","Plants, soil and tech: outdoors with a purpose."],["Sports Coach","","Training bodies in the open air beats sitting still."],["Drone Technician","","Gadgets that fly, and you make them work."],["Furniture Maker","","Turning raw wood into something useful."]],
I:[["Psychologist","","You keep asking why people do what they do."],["Data Scientist","M","Patterns hide in numbers, and you love finding them."],["Economist","","You want to know why prices and jobs change."],["Biotechnologist","B","Solving puzzles inside living cells."],["Investigative Journalist","","You dig until the truth shows up."],["Forensic Analyst","","Clues, evidence and a case to crack."],["Market Researcher","","You find out what people really want."]],
A:[["Graphic Designer","","You see how things should look before they exist."],["Architect","M","Your imagination meets real buildings."],["Filmmaker","","Stories in your head can reach a screen."],["Medical Illustrator","B","Art that helps people understand the body."],["Game Designer","","Invent worlds that others get lost in."],["Fashion Designer","","Style is how you speak without words."],["Animator","","Make drawings move and characters feel alive."]],
S:[["Teacher","","You love it when someone finally gets it."],["Doctor","B","Helping people at their hardest moments."],["Counsellor","","People feel heard around you."],["Physiotherapist","B","Help people move and live pain-free."],["Social Worker","","You act when you see something unfair."],["Special Educator","","Patience that changes a child’s world."],["Human Rights Lawyer","","Argue for people who need a voice."]],
E:[["Entrepreneur","","You see a gap and want to fill it yourself."],["Investment Banker","C","Big deals, big numbers, fast decisions."],["Brand Manager","","Make people care about a product."],["Healthcare Administrator","B","Run the place where care happens."],["Lawyer","","You win people over with words."],["Event Producer","","Fests, concerts, launches: you make them happen."],["Sports Agent","","Back talent and negotiate their big break."]],
C:[["Chartered Accountant","","You like numbers that add up exactly."],["Actuary","M","Use maths to price risk."],["Banker","","Money, trust and tidy systems."],["Medical Coder","B","Order and accuracy inside healthcare."],["Supply Chain Planner","","You keep the whole system running smoothly."],["Tax Consultant","","Rules and details are your comfort zone."],["Archivist","","You keep knowledge safe and findable."]]};
const open=(r,s)=>!r||(r=="M"&&s=="PCM")||(r=="B"&&s=="PCB")||(r=="C"&&s=="Commerce");
const TAG={"":"Any stream",M:"Needs PCM",B:"Needs PCB",C:"Needs Commerce"};
const DESC={R:"hands-on work with tools, machines and the outdoors",I:"figuring out how and why things work",A:"making original things like designs, stories and music",S:"helping, teaching and understanding people",E:"leading, persuading and starting things",C:"organising, numbers and getting details right"};
const RX=["Big no. Good to know!","Not really your thing","Right in the middle","Nice, that’s a yes","Ooh, that’s so you!"];
const liveSz=()=>{const sc={};CODES.forEach(c=>sc[c]=0);S.a.forEach((v,i)=>{if(v)sc[Q[i][0]]+=v});return CODES.map(c=>[c,12+sc[c]*2.4])};
const liveH=()=>liveSz().map(([c,z])=>`<i style="--c:${META[c][3]};--z:${z}px"></i>`).join("");
function dock(){const f=app.querySelector(".faces"),card=app.querySelector(".qcard");if(!f||RM)return;
 f.onpointermove=e=>f.querySelectorAll(".face").forEach(b=>{const r=b.getBoundingClientRect(),k=Math.max(0,1-Math.abs(e.clientX-(r.left+r.width/2))/100);b.style.transform=`translateY(${-14*k}px) scale(${1+.5*k})`});
 f.onpointerleave=()=>f.querySelectorAll(".face").forEach(b=>b.style.transform="");
 card.onpointermove=e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(800px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`};
 card.onpointerleave=()=>card.style.transform=""}
let S={g:0,st:"",a:[],i:0};
const app=$("app");
function show(h){document.body.classList.remove("so");app.innerHTML='<div class="view">'+h+"</div>";scrollTo({top:0,behavior:RM?"auto":"smooth"})}
function score(a){const sc={},mx={};CODES.forEach(c=>{sc[c]=0;mx[c]=0});Q.forEach((q,i)=>{sc[q[0]]+=a[i];mx[q[0]]=Math.max(mx[q[0]],a[i])});
 return{sc,mx,r:[...CODES].sort((x,y)=>sc[y]-sc[x]||mx[y]-mx[x]||CODES.indexOf(x)-CODES.indexOf(y))}}
const picks=c=>S.g<11?CAR[c].slice(0,5):CAR[c].filter(x=>open(x[1],S.st)).slice(0,5);
function welcome(){S={g:0,st:"",a:[],i:0};history.replaceState(null,"",location.pathname);
 show(`<div class="orbit"><div class="core"></div><i></i>${CODES.map((c,k)=>`<span style="--i:${k}">${META[c][2]}</span>`).join("")}</div>
 <h1>There are far more futures than the ones you’ve heard about.</h1>
 <p class="sub">12 quick taps. About 2 minutes. No login, nothing saved. Let’s find your stars. First, which class are you in?</p>
 <div class="grid">${[9,10,11,12].map(g=>`<button class="opt" data-g="${g}">Class ${g}<small>${g<11?"See which streams fit":"See careers in your stream"}</small></button>`).join("")}</div>`);
 app.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{S.g=+b.dataset.g;S.g>=11?streamStep():startQuiz()})}
function streamStep(){show(`<h2>Which stream are you in?</h2><p class="sub">So we only show careers that are open to you.</p>
 <div class="grid">${STR.map(s=>`<button class="opt" data-s="${s}">${s}</button>`).join("")}</div><button class="link" id="bk">← Back</button>`);
 app.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{S.st=b.dataset.s;startQuiz()});$("bk").onclick=welcome}
function startQuiz(){S.a=[];S.i=0;question()}
function question(){const q=Q[S.i],m=META[q[0]],c=m[3],n=Q.length;
 const pts=Q.map((_,k)=>[14+k*(212/11),k%2?30:12]);
 const msg=S.i==0?"Let’s go!":S.i==n-1?"Last one!":S.i>=n/2?"Past halfway!":S.i+" of "+n;
 show(`<div class="prog"><svg viewBox="0 0 240 42">${pts.slice(1).map((p,k)=>`<line class="pl ${k<S.i?"on":""}" x1="${pts[k][0]}" y1="${pts[k][1]}" x2="${p[0]}" y2="${p[1]}"/>`).join("")}
 ${pts.map((p,k)=>`<circle class="pd ${k<S.i?"on":""} ${k==S.i?"cur":""}" cx="${p[0]}" cy="${p[1]}" r="3.5" style="color:${META[Q[k][0]][3]};${k<S.i?"fill:"+META[Q[k][0]][3]:""}"/>`).join("")}</svg><em>${msg}</em></div>
 <div class="qcard" style="--c:${c}"><div class="badge">${m[2]}</div><div class="qtxt">${S.g<11?q[1]:q[2]}</div>
 <div class="faces">${FACE.map((f,k)=>`<button class="face ${S.a[S.i]==k+1?"sel":""}" data-v="${k+1}" aria-label="${LBL[k]}">${f}</button>`).join("")}</div>
 <div class="ends"><span>Not me</span><span>So me</span></div><div class="lbl" id="lbl">${S.a[S.i]?LBL[S.a[S.i]-1]:"&nbsp;"}</div><div class="rx" id="rx">${S.a[S.i]?RX[S.a[S.i]-1]:"&nbsp;"}</div></div>
 <div class="live" id="live">${liveH()}</div><p class="livecap">Your sky is filling up ✦</p>
 ${S.i?'<button class="link" id="bk">← Back</button>':'<button class="link" id="bk">← Change class</button>'}`);
 app.querySelectorAll(".face").forEach(b=>b.onclick=()=>choose(+b.dataset.v,b));
 $("bk").onclick=()=>{if(S.i){S.i--;question()}else welcome()};dock()}
let lock=false;
function choose(v,b){if(lock)return;lock=true;S.a[S.i]=v;$("lbl").textContent=LBL[v-1];$("rx").textContent=RX[v-1];[...$("live").children].forEach((e,k)=>e.style.setProperty("--z",liveSz()[k][1]+"px"));
 app.querySelectorAll(".face").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");
 navigator.vibrate&&navigator.vibrate(12);
 if(!RM){const r=b.getBoundingClientRect(),c=META[Q[S.i][0]][3];for(let k=0;k<12;k++){const s=document.createElement("i");s.className="spark";s.style.cssText=`left:${r.left+r.width/2}px;top:${r.top+r.height/2}px;background:${k%2?c:"#fff"}`;document.body.appendChild(s);const a=k/12*6.28,d=40+Math.random()*40;s.animate([{transform:"none",opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px) scale(0)`,opacity:0}],{duration:650,easing:"ease-out"}).onfinish=()=>s.remove()}}
 setTimeout(()=>{lock=false;if(S.i<Q.length-1){S.i++;question()}else finish()},RM?0:340)}
document.addEventListener("keydown",e=>{if(app.querySelector(".face")&&/^[1-5]$/.test(e.key))app.querySelectorAll(".face")[+e.key-1].click()});
function finish(){location.hash=`g=${S.g}&s=${S.st}&a=${S.a.join("")}`;
 if(RM)return results();
 show(`<div class="reveal"><div class="rv">${[0,1,2,3,4,5].map(k=>`<i style="--i:${k}"></i>`).join("")}</div><h2>Reading your answers…</h2><p class="sub">Connecting the dots</p></div>`);setTimeout(results,1700)}
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),REG=[];
const WI=[["R","Build things"],["I","Solve problems"],["A","Create"],["S","Help people"],["E","Lead ideas"],["C","Organise & data"]];
const sheet=$("sheet"),sClose=()=>document.body.classList.remove("so"),
sOpen=(c,x)=>{sheet.style.setProperty("--c",META[c][3]);sheet.querySelector(".sb").innerHTML=`<h3>${x[0]}</h3><span class="chip">${META[c][2]} ${META[c][0]} · ${TAG[x[1]]}</span><p><b>Why this fits you:</b> ${x[2]}</p>`;document.body.classList.add("so");navigator.vibrate&&navigator.vibrate(8)};
sheet.querySelector(".bd").onclick=sClose;$("sx").onclick=sClose;addEventListener("keydown",e=>e.key=="Escape"&&sClose());
{let y0=null;const p=sheet.querySelector(".sp");p.onpointerdown=e=>y0=e.clientY;p.onpointerup=e=>{if(y0!==null&&e.clientY-y0>50)sClose();y0=null}}
function results(){const {sc,r}=score(S.a),top=[r[0],r[1]],yo=S.g<11,vals=Object.values(sc),even=Math.max(...vals)-Math.min(...vals)<=2;
 const tc=top.map(c=>picks(c)),all=top.flatMap((c,k)=>tc[k].map(x=>({c,x})));REG.length=0;
 const head=yo?`You’re a ${META[top[0]][1]} + ${META[top[1]][1]} 🎉`:`You lean ${META[top[0]][0]} + ${META[top[1]][0]}`;
 const sub=yo?"Jobs you may never have heard of, and the streams that keep them open.":"Careers open in your "+S.st+" stream, from familiar to unexpected.";
 /* trail points: you → hub → 5 stars → hub → 5 stars */
 const P=[{t:"y",px:.5,y:34}];let y=130;
 top.forEach((c,k)=>{P.push({t:"h",c,px:.5,y});y+=106;tc[k].forEach((x,j)=>{REG.push({c,x});P.push({t:"n",c,cx:x,i:REG.length-1,px:j%2?.6:.4,y});y+=76});y+=14});
 const H=y+6,hy=P.filter(p=>p.t=="h").map(p=>p.y/H),c0=META[top[0]][3],c1=META[top[1]][3];
 const el=P.map((p,n)=>p.t=="y"?`<div class="ty" style="top:${p.y}px"></div>`:p.t=="h"?`<div class="th" data-n="${n}" style="--c:${META[p.c][3]};top:${p.y}px">${META[p.c][2]}<small>${META[p.c][1]}</small></div>`:`<button class="tn ${p.px<.5?"L":"R"} ${p.cx[1]?"gate":""} ${p.i==0?"first":""}" data-n="${n}" data-i="${p.i}" style="--c:${META[p.c][3]};left:${p.px*100}%;top:${p.y}px"><s></s><span>${p.cx[0]}</span></button>`).join("");
 const tabs=[...(yo?[["st","🚪","Streams"]]:[]),["wi","✨","What if?"]];
 const sg=STR.map(s=>{const cl=all.filter(o=>!open(o.x[1],s)).map(o=>o.x[0]),n=10-cl.length;const ring=`<div class="ring" style="--p:${n*10}"><b>${n}/10</b></div>`;return cl.length?`<details class="st"><summary>${ring}<div><strong>${s}</strong>${n}/10 stay open · tap to see what closes</div><i class="chev">⌄</i></summary><p class="cl">Needs a different stream: ${cl.join(", ")}</p></details>`:`<div class="st">${ring}<div><strong>${s}</strong>Keeps all 10 open ✓</div></div>`}).join("");
 let h=`<h1>${head}</h1><p class="sub">${sub}</p>
 <div class="sig">${r.map(c=>{const z=22+sc[c]*3.2;return`<div style="--c:${META[c][3]}"><b style="width:${z}px;height:${z}px">${c}</b>${sc[c]}/10</div>`}).join("")}</div>
 <div class="venn">${top.map((c,k)=>`<div style="--c:${META[c][3]};left:calc(50% - ${k?25:105}px);animation-delay:${k*.25}s">${META[c][2]}<br>${META[c][1]}</div>`).join("")}</div>
 <p class="sub mid">You enjoy ${DESC[top[0]]} <b>and</b> ${DESC[top[1]]}.</p>${even?'<p class="evn">Very even answers, so treat this as a starting point ✦</p>':""}
 <h2 class="th2">Your constellation</h2><p class="hint"><span class="tp">👆 Tap any star to see why it fits you ✦</span></p>
 <div id="trail" style="height:${H}px"><svg id="tsv"><defs><linearGradient id="gr" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}"><stop offset="0" stop-color="#fff"/><stop offset="${hy[0]}" stop-color="${c0}"/><stop offset="${hy[1]-.05}" stop-color="${c0}"/><stop offset="${hy[1]}" stop-color="${c1}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs><path id="bp" class="bp"/><path id="fp" class="fp" stroke="url(#gr)"/><circle id="cm" r="6"/></svg>${el}</div>
 <div class="tabs">${tabs.map(([k,e,l],i)=>`<button class="tab ${i?"":"on"}" data-t="${k}">${e} ${l}</button>`).join("")}</div>
 ${yo?`<section class="pan on" id="p-st"><h2>Streams that keep your doors open</h2><div class="sg">${sg}</div><p class="hint"><span class="tp">👆 Tap a stream to see what it closes</span></p></section>`:""}
 <section class="pan ${yo?"":"on"}" id="p-wi"><h2>What if you wanted something different?</h2><p class="sub" style="font-size:14px">Pick up to two. This is only exploring, so your result above doesn’t change.</p><div class="wc" id="wc"></div><div id="wo"></div></section>
 <a class="btn big" href="https://luminarysteps.com/" target="_blank" rel="noopener">Go deeper with the full 35-question test (free)</a>
 <div class="row"><button class="btn ghost" id="rt">↻ Retake the quiz</button><button class="btn ghost" id="ch">Change class or stream</button></div>
 <div style="text-align:center"><button class="link" id="cp">Copy my result link</button></div><p class="fn">RIASEC model · careers cross-checked with O*NET (CC BY 4.0)</p>`;
 show(h);
 const tr=$("trail"),fp=$("fp"),bp=$("bp"),cm=$("cm"),ns=[...tr.querySelectorAll("[data-n]")];let len=1,raf=0;
 function upd(){const yy=RM?H:clamp(innerHeight*.7-tr.getBoundingClientRect().top,0,H);let lo=0,hi=len;for(let i=0;i<14;i++){const m=(lo+hi)/2;fp.getPointAtLength(m).y<yy?lo=m:hi=m}
  fp.style.strokeDashoffset=len-lo;const pt=fp.getPointAtLength(lo);cm.setAttribute("cx",pt.x);cm.setAttribute("cy",pt.y);cm.style.opacity=yy>=H?0:1;ns.forEach(n=>n.classList.toggle("lit",P[+n.dataset.n].y<=yy))}
 function lay(){const W=tr.clientWidth;let d=`M${W*P[0].px} ${P[0].y}`;for(let k=1;k<P.length;k++){const a=P[k-1],b=P[k],m=(a.y+b.y)/2;d+=`C${W*a.px} ${m} ${W*b.px} ${m} ${W*b.px} ${b.y}`}
  bp.setAttribute("d",d);fp.setAttribute("d",d);len=fp.getTotalLength();fp.style.strokeDasharray=len;upd()}
 if(window.__sc)removeEventListener("scroll",window.__sc);if(window.__rs)removeEventListener("resize",window.__rs);
 window.__sc=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(upd)};window.__rs=lay;addEventListener("scroll",window.__sc,{passive:true});addEventListener("resize",lay);lay();
 tr.querySelectorAll(".tn").forEach(n=>n.onclick=()=>{const o=REG[+n.dataset.i];n.classList.add("seen");tr.classList.add("any");sOpen(o.c,o.x)});
 document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>document.querySelectorAll(".tab,.pan").forEach(e=>e.classList.toggle("on",e==b||e.id=="p-"+b.dataset.t)));
 /* what-if explorer */
 let pk=[];const wc=$("wc"),wo=$("wo");
 function wi(){wc.innerHTML=WI.map(([c,l])=>`<button class="wic ${pk.includes(c)?"on":""}" style="--c:${META[c][3]}" data-c="${c}">${META[c][2]} ${l}</button>`).join("");
  REG.length=all.length;const n=pk.length>1?3:5;
  wo.innerHTML=pk.length?`<p class="sub" style="font-size:14px">Exploring <b>${pk.map(c=>META[c][1]).join(" + ")}</b>. Tap one to peek.</p><div class="pills">${pk.flatMap(c=>picks(c).slice(0,n).map(x=>{REG.push({c,x});return`<button class="pill" data-i="${REG.length-1}" style="--c:${META[c][3]}"><s></s>${x[0]}</button>`})).join("")}</div>`:`<p class="sub" style="font-size:14px">Tap a chip to peek at other careers ✦</p>`;
  wc.querySelectorAll(".wic").forEach(b=>b.onclick=()=>{const c=b.dataset.c;pk=pk.includes(c)?pk.filter(z=>z!=c):[...pk,c].slice(-2);wi()});
  wo.querySelectorAll(".pill").forEach(b=>b.onclick=()=>{const o=REG[+b.dataset.i];sOpen(o.c,o.x)})}
 wi();
 $("rt").onclick=startQuiz;$("ch").onclick=welcome;
 $("cp").onclick=async()=>{if(navigator.share&&matchMedia("(pointer:coarse)").matches){try{await navigator.share({title:"My Luminary Steps result",url:location.href});return}catch(e){}}try{await navigator.clipboard.writeText(location.href);$("cp").textContent="Copied ✓"}catch(e){$("cp").textContent="Copy the address bar link"}}}
/* ---------- starfield ---------- */
(function(){const c=$("stars"),x=c.getContext("2d");let w,h,st=[],mx=0,my=0;
 function rs(){w=c.width=innerWidth;h=c.height=innerHeight;st=Array.from({length:Math.min(140,w/6)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.3,p:Math.random()*6,z:Math.random()*.9+.1}))}
 rs();addEventListener("resize",rs);addEventListener("pointermove",e=>{mx=e.clientX/w-.5;my=e.clientY/h-.5});
 (function t(n){x.clearRect(0,0,w,h);st.forEach(s=>{const a=.35+.65*Math.abs(Math.sin(n/900*s.z+s.p));x.globalAlpha=a;x.fillStyle="#fff";x.beginPath();x.arc(s.x-mx*24*s.z,s.y-my*24*s.z,s.r,0,6.3);x.fill()});if(!RM)requestAnimationFrame(t)})(0)})();
/* ---------- boot: same answers + grade + stream => same result ---------- */
(function(){const m=location.hash.match(/^#g=(\d+)&s=([A-Za-z]*)&a=([1-5]{12})$/);
 if(m&&+m[1]>=9&&+m[1]<=12&&(+m[1]<11||STR.includes(m[2]))){S.g=+m[1];S.st=+m[1]>=11?m[2]:"";S.a=m[3].split("").map(Number);results()}else welcome()})();
