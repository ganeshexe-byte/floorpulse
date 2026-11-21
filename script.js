/* FloorPulse maintenance calendar. Only this calendar uses JavaScript. */
(()=>{
const D=864e5,U=Date.UTC,now=new Date();
const day=(y,m,d)=>Math.floor(U(y,m-1,d)/D);
const TODAY=day(now.getFullYear(),now.getMonth()+1,now.getDate()),REF=day(2026,11,20),MAXY=now.getFullYear()+10,END=day(MAXY,12,31),START=1995;
const techs=['Ramesh','Anita','Kiran'];
const LB={serviced:'Serviced',replaced:'Part replaced',due:'Due',overdue:'Overdue',breakdown:'Breakdown'};
const ORD=['overdue','breakdown','due','replaced','serviced'];
const MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
const H=(a,b)=>{let x=Math.imul(a+1,0x9e3779b1)^Math.imul(b+7,0x85ebca6b);x=Math.imul(x^x>>>15,0x2c1b3c6d);x=Math.imul(x^x>>>12,0x297a2d39);return((x^x>>>15)>>>0)/4294967296};
const R=(n,s=100)=>Math.round(n/s)*s,inr=n=>'₹'+n.toLocaleString('en-IN');
const dur=h=>{const a=Math.floor(h),b=Math.round((h-a)*60);return(a?a+'h ':'')+(b?b+'m':'')||'0m'};
const MS=[['MFG-01','Cold Saw Machine',[2008,1,5],[2026,10,5],[2027,1,3],'Blade, coolant and clamping vice','Saw blade',6200,1000,2500,0,0],
['MFG-02','Forging Press',[1998,10,26],[2026,9,30],[2026,11,29],'Ram, clutch and hydraulics','Press ram seal',23800,3800,9500,1,0],
['MFG-03','Induction Billet Heater',[2014,6,18],[2026,10,18],[2026,12,17],'Coil, cooling water and generator','Induction coil',15000,2400,6000,0,0],
['MFG-04','CNC Turning Center T-5',[2016,10,2],[2026,11,2],[2026,12,15],'Chuck, turret and lubrication','Chuck jaws',15000,2400,6000,0,0],
['MFG-05','Vertical Turret Lathe',[2004,5,5],[2026,9,22],[2026,12,6],'Table, tool post and way lubrication','Table bearing',17500,2800,7000,0,0],
['MFG-06','Internal Broaching Machine',[1999,10,6],[2026,11,20],[2027,2,15],'Ram and hydraulics','Broach puller',11200,1800,4500,0,0],
['MFG-07','Centering and Facing Machine',[2006,12,12],[2026,10,13],[2027,1,11],'Heads, clamps and coolant','Milling head',7000,1100,2800,0,0],
['MFG-08','Gear Hobbing Machine H-3',[1995,4,12],[2026,10,2],[2026,11,12],'Hob arbor, hydraulics and lubrication','Hob spindle seal kit',22500,3600,9000,1,0],
['MFG-09','Gear Shaping Machine S-2',[2003,3,15],[2026,8,27],[2026,11,25],'Stroke mechanism and guideways','Cutter spindle bearing',17500,2800,7000,0,0],
['MFG-10','Bevel Gear Generator',[2011,12,12],[2026,10,24],[2026,12,23],'Cutter head, cradle and lubrication','Cutter head',23800,3800,9500,0,0],
['MFG-11','Gear Milling VMC',[2017,12,20],[2026,9,10],[2026,12,9],'Spindle, tool changer and way covers','Spindle bearing',18800,3000,7500,0,0],
['MFG-12','Worm Milling Machine',[2007,7,15],[2026,10,25],[2027,1,23],'Spindle and thread train','Milling cutter',13800,2200,5500,0,0],
['MFG-13','Power Skiving Machine',[2020,8,8],[2026,10,2],[2026,12,1],'Spindle, skiving head and coolant','Skiving cutter',21200,3400,8500,0,0],
['MFG-14','Rack Milling Machine',[2002,7,11],[2026,9,17],[2026,11,16],'Feed screw, guideways and lubrication','Table feed screw',12500,2000,5000,1,0],
['MFG-15','Gear Shaving Machine SV-1',[2009,11,19],[2026,10,25],[2026,12,30],'Cutter head and table alignment','Shaving cutter',16200,2600,6500,0,0],
['MFG-16','Chamfering and Deburring Machine',[2015,4,20],[2026,10,29],[2026,12,13],'Cutters, work spindle and chip tray','Chamfer cutters',8800,1400,3500,0,0],
['MFG-17','Gear Rolling and Burnishing Machine',[2012,5,21],[2026,10,17],[2027,1,15],'Dies, hydraulics and alignment','Rolling dies',10000,1600,4000,0,0],
['MFG-18','Sealed Quench Furnace',[2001,9,17],[2026,9,11],[2026,11,14],'Atmosphere, thermocouples and quench oil','Furnace heating elements',30000,4800,12000,1,0],
['MFG-19','Pit-Type Nitriding Furnace',[2009,11,27],[2026,9,27],[2026,12,26],'Retort, gas lines and thermocouples','Retort seal',22500,3600,9000,0,0],
['MFG-20','Induction Hardening Machine',[2012,7,3],[2026,8,30],[2026,11,22],'Coil, cooling water and generator','Induction coil',18800,3000,7500,1,0],
['MFG-21','Tempering Furnace',[2004,10,22],[2026,10,6],[2026,12,5],'Fan, heaters and door seals','Circulation fan',12500,2000,5000,0,0],
['MFG-22','Shot Peening Machine',[2010,3,3],[2026,9,3],[2026,11,27],'Nozzles, shot flow and dust collector','Peening nozzles',8800,1400,3500,1,0],
['MFG-23','Press Quenching Machine',[2013,2,2],[2026,10,6],[2027,1,4],'Die set, hydraulics and oil flow','Quench die set',20000,3200,8000,0,0],
['MFG-24','Gear Profile Grinder G-4',[2014,1,17],[2026,11,20],[2027,1,19],'Wheel dressing and spindle service','Grinding wheel',20000,3200,8000,0,0],
['MFG-25','Gear Generating Grinder',[2018,6,10],[2026,10,4],[2026,12,3],'Wheel, dresser and spindle','Threaded grinding wheel',23800,3800,9500,0,0],
['MFG-26','Internal Gear Grinder',[2016,9,9],[2026,10,5],[2026,12,19],'Wheel, spindle and coolant','Grinding wheel',21200,3400,8500,0,0],
['MFG-27','Cylindrical Grinder (ID/OD)',[2005,3,19],[2026,10,9],[2027,1,7],'Wheel, centres and coolant','Wheel spindle bearing',12500,2000,5000,0,0],
['MFG-28','Gear Honing Machine',[2011,4,4],[2026,9,24],[2026,11,23],'Honing tool, spindle and coolant','Honing tool',13800,2200,5500,1,0],
['MFG-29','Bevel Gear Lapping Machine',[2008,2,14],[2026,10,31],[2027,1,29],'Pump, spindles and brakes','Lapping compound pump',11200,1800,4500,0,0],
['QC-01','CNC Gear Measuring Center',[2018,6,6],[2026,8,26],[2026,11,24],'Lead, profile and pitch calibration','Probe system',8800,1400,3500,0,1],
['QC-02','Coordinate Measuring Machine (CMM)',[2015,10,6],[2026,9,21],[2026,12,20],'Probe calibration and air bearings','Probe stylus',7500,1200,3000,0,1],
['QC-03','Double-Flank Gear Roll Tester',[2011,3,19],[2026,11,5],[2027,1,4],'Master gear and centre distance check','Master gear',6200,1000,2500,0,1],
['QC-04','Single-Flank Gear Roll Tester',[2016,10,26],[2026,9,12],[2026,12,11],'Encoders, master gear and alignment','Encoder',7500,1200,3000,0,1],
['QC-05','Profile Projector',[2002,6,18],[2026,9,11],[2026,12,10],'Optics, lamp and stage','Lamp and lens',3800,600,1500,0,1],
['QC-06','Surface Roughness Tester',[2017,11,19],[2026,9,3],[2026,12,2],'Pickup calibration with reference block','Stylus pickup',3800,600,1500,0,1],
['QC-07','Roundness and Cylindricity Tester',[2013,3,7],[2026,10,1],[2027,1,29],'Spindle and stylus verification','Spindle air filter',5000,800,2000,0,1],
['QC-08','Rockwell Hardness Tester',[2009,11,23],[2026,5,21],[2026,11,17],'Indenter and test block verification','Diamond indenter',6200,1000,2500,1,1],
['QC-09','Vickers and Brinell Hardness Tester',[2012,5,1],[2026,7,21],[2027,1,17],'Indenters, optics and load cell','Indenter set',5500,900,2200,0,1],
['QC-10','Micro-Vickers Case Depth Tester',[2016,12,28],[2026,9,1],[2027,2,28],'Optics and load cell check','Objective lens',5000,800,2000,0,1],
['QC-11','Metallurgical Cut-Off and Polishing Machine',[2010,4,12],[2026,9,17],[2026,12,16],'Wheels, coolant and polishing discs','Abrasive cut-off wheel',4500,700,1800,0,1],
['QC-12','Metallurgical Microscope',[2014,2,26],[2026,8,17],[2027,2,13],'Optics, lamp and stage','Lamp',3800,600,1500,0,1],
['QC-13','Magnetic Particle Inspection Machine',[2008,9,25],[2026,10,24],[2026,12,23],'Yoke, UV lamp and bath strength','UV lamp',5500,900,2200,0,1],
['QC-14','Ultrasonic Flaw Detector',[2015,5,21],[2026,8,20],[2026,11,18],'Probes, cables and calibration blocks','Probe cable',5000,800,2000,1,1],
['QC-15','Optical Emission Spectrometer',[2019,2,18],[2026,7,29],[2026,11,26],'Argon line, electrode and calibration','Argon filter and electrode',7500,1200,3000,1,1],
['PDI-01','Laser Marking Machine',[2021,2,14],[2026,10,19],[2027,2,16],'Lens, cooling fan and alignment','Laser lens',8800,1400,3500,0,2],
['PDI-02','Dot-Peen Marking Machine',[2016,12,28],[2026,9,22],[2026,12,21],'Stylus, solenoid and plate','Marking stylus',5000,800,2000,0,2],
['PDI-03','Visual Inspection Booth',[2012,8,8],[2026,9,3],[2027,1,1],'Lamps, magnifiers and light level','Magnifier lamp',3800,600,1500,0,2],
['PDI-04','Backlash Check Fixture',[2014,7,11],[2026,10,1],[2026,11,30],'Indicators, mounts and masters','Dial indicator',6200,1000,2500,0,2],
['PDI-05','Tooth Contact Pattern Fixture',[2010,1,1],[2026,9,19],[2026,11,18],'Fixture, spindles and marking compound','Marking compound',7500,1200,3000,1,2],
['PDI-06','Gear Tooth Caliper and Gauge Station',[2018,12,8],[2026,6,29],[2026,12,26],'Gauges calibrated against masters','Caliper set',3000,500,1200,0,2],
['PDI-07','RP Oil Dipping Booth',[2011,7,23],[2026,10,13],[2026,12,12],'Oil level, filter and drain','Oil filter',7000,1100,2800,0,2],
['PDI-08','RP Oil Spray Booth',[2017,11,27],[2026,10,1],[2026,11,15],'Spray guns, pump and filters','Spray gun kit',7000,1100,2800,1,2],
['PDI-09','VCI Bagging and Vacuum Sealing Machine',[2019,12,28],[2026,9,26],[2026,11,25],'Sealing bar, vacuum pump and film feed','Sealing bar',8000,1300,3200,1,2],
['PDI-10','Automatic Strapping Machine',[2015,8,20],[2026,10,9],[2026,12,8],'Strapping head, feed and tension','Strapping head',6200,1000,2500,0,2],
['PDI-11','Shrink-Wrapping Machine',[2013,1,17],[2026,9,21],[2026,12,20],'Heating element, conveyor and blower','Heating element',6500,1000,2600,0,2],
['PDI-12','Palletizing Machine',[2018,11,19],[2026,10,8],[2027,1,6],'Gripper, conveyor and safety scanner','Gripper',11200,1800,4500,0,2],
['ASM-01','Ultrasonic Parts Washer',[2014,11,11],[2026,10,9],[2026,12,8],'Transducers, filters and heater','Ultrasonic transducer',8800,1400,3500,0,3],
['ASM-02','Spray Parts Washer',[2010,5,13],[2026,10,10],[2026,12,24],'Spray nozzles, filter and heater','Spray nozzles',6200,1000,2500,0,3],
['ASM-03','Induction Bearing Heater',[2016,2,26],[2026,9,29],[2026,12,28],'Coil, temperature probe and cooling','Heating coil',8800,1400,3500,0,3],
['ASM-04','Hydraulic Assembly Press',[2008,4,8],[2026,9,10],[2026,11,24],'Ram, seals and pressure gauge','Press ram seal',15000,2400,6000,1,3],
['ASM-05','Servo-Electric Assembly Press',[2021,5,17],[2026,9,14],[2027,1,12],'Load cell, servo drive and guides','Load cell',16200,2600,6500,0,3],
['ASM-06','Dynamic Balancing Machine',[2012,1,13],[2026,9,18],[2026,12,17],'Belt, sensors and calibration weights','Drive belt',12500,2000,5000,0,3],
['ASM-07','DC Nutrunner Station',[2019,1,25],[2026,9,29],[2026,11,13],'Transducer, cables and calibration','Torque transducer',16200,2600,6500,1,3],
['ASM-08','EOL Gearbox NVH Test Rig',[2020,10,26],[2026,8,31],[2026,11,29],'Sensors, noise cabin and load motor','Accelerometer',21200,3400,8500,1,3],
['ASM-09','Air Leak Testing Machine',[2015,2,2],[2026,10,1],[2026,11,15],'Pressure sensor, seals and hoses','Pressure sensor and seals',17500,2800,7000,1,3],
['ASM-10','Laser Alignment System',[2018,2,14],[2026,7,23],[2027,1,19],'Laser head and target calibration','Laser head',6200,1000,2500,0,3],
['ASM-11','Gearbox Assembly Line Conveyor',[2013,2,26],[2026,10,5],[2026,12,4],'Chain tension, rollers and drives','Conveyor chain',17500,2800,7000,0,3],
['ASM-12','Overhead EOT Crane',[2005,2,18],[2026,8,24],[2026,11,22],'Wire rope, hook and brakes','Wire rope',10000,1600,4000,1,3]];
const CAUSE=['Hydraulic leak','Electrical fault','Bearing noise','Belt slip','Overheating','Operator error','Coolant pump fault','Sensor fault'];
const ev=new Map(),add=(t,o)=>{if(!ev.has(t))ev.set(t,[]);ev.get(t).push(o)};
let FIRST=1e9;
MS.forEach((m,i)=>{
 const [id,nm,I,L,N,task,part,pc,bc,rate,rep0]=m,inst=day(...I),last=day(...L),next=day(...N),iv=next-last;
 FIRST=Math.min(FIRST,inst);
 const svc=(t,k,late)=>{const hh=H(i,k+50),rp=k%4===3;
  add(t,{t,type:rp?'replaced':'serviced',i,tx:rp?part+' replaced':task,tech:techs[(k+i)%3],hr:R(2+hh*5,.5),cost:R(bc*(.7+hh*.8)+(rp?pc*(.8+hh*.4):0)),note:(late?'Done late. ':'')+(k===0&&id==='M-06'?'In workshop, returns tomorrow.':'')})};
 for(let k=0;;k++){
  const b=last-k*iv+(k?Math.round((H(i,k)-.5)*6):0);if(b<inst+5)break;
  if(k>0&&H(i,k+100)>.9){add(b,{t:b,type:'overdue',i,tx:'Service date passed without service',late:0});svc(b+4+Math.floor(H(i,k)*5),k,1)}else svc(b,k,0);
 }
 for(let j=0,t;(t=next+j*iv)<=END;j++){
  if(t<REF&&j===0){add(t,{t,type:'overdue',i,tx:'Service date passed. '+(rep0?'Replace '+part+'.':task)});add(REF,{t:REF,type:'overdue',i,tx:'Still overdue, '+(REF-t)+' days late. '+(rep0?'Replace '+part+'.':'')});}
  else if(t<=TODAY)svc(t,j+1,0);
  else add(t,{t,type:'due',i,tx:((j===0&&rep0)||j%4===3)?'Replace '+part:task});
 }
 for(let y=inst>0?new Date(inst*D).getUTCFullYear():START;y<=now.getFullYear();y++){
  const n=1+Math.floor(H(i,y)*(rate>6000?4:3));
  for(let x=0;x<n;x++){const t=day(y,1,1)+Math.floor(H(i,y*10+x)*365);if(t<inst||t>TODAY||t>=day(2026,11,1)&&y===2026)continue;
   const d=R(.3+H(i,y+x+3)*3.7,.25);add(t,{t,type:'breakdown',i,tx:CAUSE[Math.floor(H(i,y+x+9)*8)],dur:d,cost:R(d*rate)})}
 }
});
const PIN=[[7, 18, "Hob spindle oil leak", 2.17, 19500.0], [8, 12, "Cutter stroke jam", 1.08, 7600.0], [17, 15, "Furnace thermocouple drift", 0.5, 6000.0], [36, 14, "Indenter chipped", 0.75, 1900.0], [30, 10, "CMM probe collision", 1.5, 4500.0], [43, 17, "Argon supply low", 0.4, 1200.0], [51, 18, "Spray pump failure", 2, 5600], [53, 12, "Strap jam", 1.2, 3000.0], [44, 11, "Lens contamination", 0.6, 2100.0], [64, 18, "Seal leak on the test machine", 2.5, 17500.0], [62, 13, "Torque error", 1.2, 7800.0], [59, 9, "Press ram seal leak", 0.9, 5400.0]];PIN.forEach(([i,d,tx,du,c])=>{const t=day(2026,11,d);add(t,{t,type:'breakdown',i,tx,dur:du,cost:c})});
const S={y:now.getFullYear(),m:now.getMonth(),sel:TODAY,f:'all',mi:-1,dp:0};
const $=id=>document.getElementById(id);if(!$('cg'))return;
const vis=l=>(l||[]).filter(e=>MS[e.i][11]===S.dp&&(S.f==='all'||e.type===S.f)&&(S.mi<0||e.i===S.mi));
const mk=(a,b)=>{const out=[];for(let t=a;t<=b;t++)out.push(t);return out};
const fmt=t=>new Date(t*D).toLocaleDateString((window.FPLOC||'en-IN'),{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
$('cm').innerHTML=MN.map((n,i)=>`<option value="${i}">${n}</option>`).join('');
$('cy').innerHTML=mk(START,MAXY).map(y=>`<option>${y}</option>`).join('');
const fillMach=()=>{$('cmach').innerHTML='<option value="-1">All machines</option>'+MS.map((m,i)=>m[11]===S.dp?`<option value="${i}">${m[1]}</option>`:'').join('')};fillMach();
$('cj').max=MAXY+'-12-31';
function chips(from,to){const c={all:0};ORD.forEach(k=>c[k]=0);
 for(let t=from;t<=to;t++)(ev.get(t)||[]).forEach(e=>{if(MS[e.i][11]===S.dp&&(S.mi<0||e.i===S.mi)){c[e.type]++;c.all++}});
 $('cf').innerHTML=['all',...ORD].map(k=>`<button data-f="${k}" class="${S.f===k?'on':''}">${k==='all'?'':`<i class="t-${k}"></i>`}${k==='all'?'All':LB[k]} ${c[k]}</button>`).join('')}
function grid(){
 const first=day(S.y,S.m+1,1),len=new Date(U(S.y,S.m+1,0)).getUTCDate(),dow=new Date(first*D).getUTCDay();
 chips(first,first+len-1);let h='';for(let b=0;b<dow;b++)h+='<span></span>';
 for(let d=1;d<=len;d++){const t=first+d-1,l=vis(ev.get(t)),ty=ORD.filter(k=>l.some(e=>e.type===k));
  h+=`<button class="cd${t===TODAY?' today':''}${t===S.sel?' sel':''}" data-t="${t}" style="--i:${d}" aria-label="${d} ${MN[S.m]}, ${l.length} events"><b>${d}</b><i class="dots">${ty.map(k=>`<s class="t-${k}"></s>`).join('')}</i>${l.length>1?`<em>${l.length}</em>`:''}</button>`}
 $('cg').innerHTML=h;$('cm').value=S.m;$('cy').value=S.y;$('cmach').value=S.mi;panel()}
function panel(){
 const l=vis(ev.get(S.sel)).sort((a,b)=>ORD.indexOf(a.type)-ORD.indexOf(b.type));
 let h=`<h4>${fmt(S.sel)}</h4><small>${S.sel===TODAY?'Today. ':''}${l.length} ${l.length===1?'event':'events'}</small>`;
 if(!l.length)h+=`<p class="none">${S.sel<FIRST?'No machines were installed yet. Plant records start on 12 April 1995.':'No maintenance, breakdowns or due dates match this day.'}</p>`;
 l.forEach((e,n)=>{const m=MS[e.i];let meta='';
  if(e.type==='serviced'||e.type==='replaced')meta=`${e.tech} · ${e.hr} h · ${inr(e.cost)}`;
  else if(e.type==='due'){const d=e.t-TODAY;meta=d===0?'Due today':d>0?`Due in ${d} ${d===1?'day':'days'}`:'Past due'}
  else if(e.type==='breakdown')meta=`Down ${dur(e.dur)} · loss ${inr(e.cost)}`;
  h+=`<div class="ev2" style="--i:${n}"><span class="pill t-${e.type}">${LB[e.type]}</span><b>${m[0]} ${m[1]}</b><p>${e.tx}</p><small>${meta}${e.note?' · '+e.note:''}</small></div>`});
 h+=`<button class="tojobs" data-t="${S.sel}">Jobs and shifts on this day</button>`;$('cp').innerHTML=h}
function go(y,m){if(m<0){m=11;y--}if(m>11){m=0;y++}if(y<START||y>MAXY)return;S.y=y;S.m=m;
 const f=day(y,m+1,1),len=new Date(U(y,m+1,0)).getUTCDate();S.sel=(TODAY>=f&&TODAY<f+len)?TODAY:f;grid()}
$('cprev').onclick=()=>go(S.y,S.m-1);$('cnext').onclick=()=>go(S.y,S.m+1);
$('ctoday').onclick=()=>go(now.getFullYear(),now.getMonth());
$('cm').onchange=e=>go(S.y,+e.target.value);$('cy').onchange=e=>go(+e.target.value,S.m);
$('cmach').onchange=e=>{S.mi=+e.target.value;grid()};
$('cj').onchange=e=>{const v=e.target.value.split('-').map(Number);if(v.length<3||v[0]<START)return;S.y=v[0];S.m=v[1]-1;S.sel=day(...v);grid()};
$('cf').onclick=e=>{const b=e.target.closest('button');if(b){S.f=b.dataset.f;grid()}};
$('cg').onclick=e=>{const b=e.target.closest('.cd');if(!b)return;S.sel=+b.dataset.t;
 $('cg').querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');panel()};
document.querySelectorAll('input[name=dp]').forEach(r=>r.onchange=()=>{S.dp=+r.id.slice(2);S.mi=-1;fillMach();grid()});
window.FPST=["run", "run", "run", "run", "run", "run", "run", "dn", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "sv", "sv", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "sv", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "run", "dn", "run", "run", "sv", "run", "run", "run", "run", "run", "run", "run", "run", "run", "dn", "run", "run", "run"];
window.FP={MS,H,day,TODAY,REF,ev,refresh:()=>grid()};
grid();
})();