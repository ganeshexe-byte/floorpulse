/* FloorPulse: jobs done and shift usage per machine, per day. Sample data is generated, not real. */
(()=>{
const F=window.FP,$=id=>document.getElementById(id);if(!F||!$('jr'))return;
const {MS,H,day,TODAY,ev}=F,D=864e5,REF=F.REF;
const OP=[[/Saw/,['Cut EN24 bar into 58 mm lengths'],14,'pcs'],[/Forging/,['Forge billets for spur gear blanks'],12,'pcs'],[/Billet Heater/,['Heat billets for the forging press'],30,'pcs'],[/Turning|Turret/,['Turn and bore helical gear blanks','Turn ring gear blanks'],5,'pcs'],[/Broaching/,['Broach keyways and splines in gear bores'],18,'pcs'],[/Centering/,['Face and centre pinion shaft blanks'],20,'pcs'],[/Hobbing/,['Hob helical gear Z34, module 2.5','Hob spur gear Z48, module 3'],7,'pcs'],[/Shaping/,['Shape internal gear Z62, module 2'],5,'pcs'],[/Bevel Gear Gen/,['Cut spiral bevel pinion Z13'],4,'pcs'],[/Gear Milling/,['Mill rack, module 4, 1 m length'],2,'pcs'],[/Worm Milling/,['Mill 3-start worm shafts'],3,'pcs'],[/Skiving/,['Skive internal gear Z70 for planetary carriers'],8,'pcs'],[/Rack Milling/,['Mill rack teeth, module 3'],2,'pcs'],[/Shaving/,['Shave gear Z34 before heat treatment'],9,'pcs'],[/Chamfering/,['Chamfer and deburr gears after cutting'],25,'pcs'],[/Burnishing/,['Burnish gear flanks'],12,'pcs'],[/Furnace|Tempering/,['Carburize batch, case depth 0.8 mm','Temper carburized batch at 180 C'],.3,'batches'],[/Induction Hard/,['Induction harden gear teeth','Induction harden shaft journals'],14,'pcs'],[/Peening/,['Shot peen gear batch'],.3,'batches'],[/Press Quench/,['Press quench ring gears'],4,'pcs'],[/Profile Grinder/,['Profile grind gear Z34 to DIN 5'],3,'pcs'],[/Generating Grinder/,['Generating grind helical gear Z28'],4,'pcs'],[/Internal Gear Grinder/,['Grind internal gear teeth'],3,'pcs'],[/Cylindrical/,['Grind bore and OD of gear hubs'],10,'pcs'],[/Honing/,['Hone gear teeth for low noise'],8,'pcs'],[/Lapping/,['Lap bevel gear sets'],3,'sets'],
[/Measuring Center/,['Inspect lead, profile and pitch on gear samples'],4,'samples'],[/CMM|Coordinate/,['Check housing bores and blank dimensions'],8,'samples'],[/Double-Flank/,['Roll test a gear batch against the master'],12,'samples'],[/Single-Flank/,['Single-flank test on gear samples'],6,'samples'],[/Projector/,['Check small-module tooth forms'],10,'samples'],[/Roughness/,['Measure flank roughness Ra'],12,'samples'],[/Roundness/,['Check bore concentricity'],10,'samples'],[/Rockwell/,['Surface hardness of carburized gears'],20,'samples'],[/Vickers and Brinell/,['Hardness check of incoming material'],10,'samples'],[/Micro-Vickers/,['Case depth check on test coupons'],5,'samples'],[/Cut-Off/,['Section samples for microstructure'],6,'samples'],[/Microscope/,['Examine microstructure and grain flow'],5,'samples'],[/Magnetic/,['Crack check on ground gears'],15,'pcs'],[/Ultrasonic Flaw/,['Ultrasonic check of forged blanks'],12,'pcs'],[/Spectrometer/,['Verify chemistry of incoming steel heats'],8,'samples'],
[/Laser Marking/,['Mark part numbers and batch codes'],40,'pcs'],[/Dot-Peen/,['Dot-peen heat numbers on gear hubs'],30,'pcs'],[/Visual/,['Visual check for rust, nicks and marking'],35,'pcs'],[/Backlash/,['Backlash check on matched sets'],12,'sets'],[/Contact Pattern/,['Contact pattern check with marking compound'],8,'sets'],[/Caliper/,['Final tooth thickness checks'],15,'pcs'],[/Dipping/,['Dip gears in rust-preventive oil'],40,'pcs'],[/Spray Booth/,['Spray rust-preventive oil on large gears'],12,'pcs'],[/VCI/,['VCI bag and vacuum seal gear sets'],30,'sets'],[/Strapping/,['Strap crates for dispatch'],20,'crates'],[/Shrink/,['Shrink-wrap pallets'],6,'pallets'],[/Palletizing/,['Palletize cartons for dispatch'],10,'pallets'],
[/Ultrasonic Parts/,['Wash gears and shafts before assembly'],60,'pcs'],[/Spray Parts/,['Wash gearbox housings'],30,'pcs'],[/Bearing Heater/,['Heat bearings for shaft fitting'],25,'pcs'],[/Hydraulic Assembly/,['Press-fit bearings on pinion shafts'],18,'pcs'],[/Servo/,['Press-fit gears with force monitoring'],14,'pcs'],[/Balancing/,['Balance gear-shaft assemblies'],10,'pcs'],[/Nutrunner/,['Tighten housing bolts to torque spec'],9,'gearboxes'],[/NVH/,['End-of-line NVH test on gearboxes'],4,'gearboxes'],[/Leak/,['Leak test sealed gearboxes'],7,'gearboxes'],[/Laser Alignment/,['Align shaft and coupling'],5,'gearboxes'],[/Conveyor/,['Move gearboxes along the line'],8,'gearboxes'],[/Crane/,['Lift housings and heavy shafts'],6,'lifts']];
const PL=['Tractor gearbox','Automotive transmission','Industrial reducer','Wind pitch drive','Machine tool gearbox'];
const SH=[['A','6:00 to 14:00',360],['B','14:00 to 22:00',840],['C','22:00 to 6:00',1320]];
const OPN=[['Sunil','Meena','Raju'],['Imran','Lakshmi','Joseph'],['Naveen','Prakash','Suresh']];
const PR=[[.93,.86,.62],[.88,.74,.15],[.86,.7,.2],[.9,.78,.3]];
const iso=t=>new Date(t*D).toISOString().slice(0,10);
const fmt=t=>new Date(t*D).toLocaleDateString((window.FPLOC||'en-IN'),{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
function usage(i,t){
 const m=MS[i],inst=day(...m[2]);if(t<inst)return null;
 const dp=m[11],dow=new Date(t*D).getUTCDay(),cont=/Furnace/.test(m[1]),od=OP.find(o=>o[0].test(m[1]))||[0,['General work'],5,'pcs'];
 const out=[0,1,2].map(s=>{let on=H(i*13+s,t)<PR[dp][s];if(dow===0&&!cont)on=false;if(dow===6&&s===2&&!cont)on=on&&H(i,t+s)<.4;
  return{s,st:on?'run':(dow===0&&!cont?'off':'idle'),hrs:on?Math.round((5+H(i*17+s,t+1)*2.8)*10)/10:0,note:''}});
 (ev.get(t)||[]).filter(e=>e.i===i).forEach(e=>{
  if(e.type==='breakdown'){const k=Math.max(0,out.findIndex(o=>o.st==='run')),o=out[k],lost=Math.min(e.dur,o.hrs||e.dur);o.lost=Math.round(lost*10)/10;o.note='Breakdown: '+e.tx+', '+o.lost+' h lost';o.hrs=Math.max(0,Math.round((o.hrs-e.dur)*10)/10);if(o.hrs===0)o.st='down'}
  if(e.type==='serviced'||e.type==='replaced'){const o=out[0];o.st='maint';o.hrs=0;o.note=(e.type==='replaced'?'Part replaced: ':'Service: ')+e.tx}});
 if(t===REF&&m[11]>=0){const st=window.FPST&&window.FPST[i];
  if(st==='dn')out.forEach(o=>{o.st='down';o.hrs=0;o.note='Down: waiting for '+m[6].toLowerCase()});
  if(st==='sv'){out[0].st=out[1].st='maint';out[0].hrs=out[1].hrs=0;out[0].note=out[1].note='In workshop for service'}}
 if(t>TODAY)out.forEach(o=>{if(o.st==='run')o.st='plan';else if(o.st==='idle')o.st='off'});
 if(t===TODAY){const n=new Date(),c=n.getHours()>=6&&n.getHours()<14?0:n.getHours()>=14&&n.getHours()<22?1:2;
  out.forEach((o,s)=>{if(s>c){if(o.st==='run')o.st='plan'}else if(s===c&&o.st==='run'){o.live=1;o.hrs=Math.min(o.hrs,Math.round(((n.getHours()*60+n.getMinutes()-SH[s][2]+1440)%1440)/6)/10)}})}
 out.forEach((o,s)=>{if((o.st==='run'||o.st==='plan')&&o.hrs>0){const ops=od[1];
  o.job={id:'JC-'+String(new Date(t*D).getUTCFullYear()).slice(2)+'-'+(1000+Math.floor(H(i*3+s,t+9)*8999)),op:ops[Math.floor(H(i+s,t+4)*ops.length)],qty:Math.max(1,Math.round(o.hrs*od[2]*(.85+H(i,t+s)*.3))),unit:od[3],pl:PL[Math.floor(H(i*7+s,t+5)*5)]};
  o.job.rej=(dp===0||dp===3)&&o.st==='run'?Math.round(o.job.qty*H(i+s*5,t+7)*.04):0;o.op=OPN[s][Math.floor(H(i*5+s,t+2)*3)]}});
 return out}
const J={t:TODAY,f:'all',q:''};
const cell=o=>{const p=Math.min(100,Math.round(o.hrs/8*100));
 if(o.st==='down')return'<div class="jc"><div class="jb"><i style="--w:100%;background:var(--red)"></i></div><small class="dn">Down</small></div>';
 if(o.st==='maint')return'<div class="jc"><div class="jb"><i style="--w:100%;background:repeating-linear-gradient(45deg,#ffb627 0 6px,#8a6410 6px 12px)"></i></div><small style="color:var(--amber)">Service</small></div>';
 if(o.st==='idle'||o.st==='off')return`<div class="jc"><div class="jb"></div><small>${o.st==='off'?'Off':'Idle'}</small></div>`;
 const col=o.st==='plan'?'repeating-linear-gradient(45deg,#c8f542 0 6px,#6d8a1c 6px 12px)':p>=75?'var(--lime)':p>=45?'var(--amber)':'var(--red)';
 return`<div class="jc"><div class="jb"><i style="--w:${p}%;background:${col}"></i></div><small>${o.st==='plan'?'Planned ':''}${o.hrs} h · ${p}%${o.live?' · live':''}</small></div>`};
const blk=(o,s)=>`<div><h5>Shift ${SH[s][0]} <small>${SH[s][1]}</small></h5>`+(o.job?`<p><b>${o.job.id}</b> ${o.job.op}</p><p>${o.st==='plan'?'Target':'Done'}: ${o.job.qty} ${o.job.unit}${o.job.rej?' · rejected '+o.job.rej:''}</p><small>${o.job.pl} · Operator ${o.op}</small>`:`<p class="sub">${o.note||(o.st==='off'?'Weekly off':'No job scheduled')}</p>`)+(o.job&&o.note?`<small class="dn">${o.note}</small>`:'')+'</div>';
function render(){
 const dp=+((document.querySelector('input[name=dp]:checked')||{id:'dp0'}).id.slice(2)),t=J.t;$('jd').value=iso(t);
 const U=MS.map((m,i)=>i).filter(i=>MS[i][11]===dp).map(i=>({i,u:usage(i,t)})).filter(x=>x.u),n=U.length,pl=t>TODAY;
 let sh='';for(let s=0;s<3;s++){const hrs=U.reduce((a,x)=>a+x.u[s].hrs,0),ut=n?Math.round(hrs/(8*n)*100):0,dt=U.reduce((a,x)=>a+(x.u[s].lost||0)+(x.u[s].st==='down'?8:0),0),jb=U.filter(x=>x.u[s].job).length;
  sh+=`<div class="shc" style="--i:${s}"><small>Shift ${SH[s][0]}, ${SH[s][1]}</small><b>${ut}%</b><span>${pl?'planned load':'utilisation'}</span><div class="jb"><i style="--w:${ut}%;background:${ut>=75?'var(--lime)':ut>=45?'var(--amber)':'var(--red)'}"></i></div><small>${jb} jobs · ${U.filter(x=>x.u[s].hrs>0).length} of ${n} machines · ${dt.toFixed(1)} h downtime</small></div>`}
 $('js').innerHTML=sh;
 const cat=x=>x.u.some(o=>o.st==='down'||o.st==='maint'||o.lost)?'dn':x.u.some(o=>o.hrs>0)?'wk':'id';
 const C={all:n,wk:U.filter(x=>x.u.some(o=>o.hrs>0)).length,id:U.filter(x=>cat(x)==='id').length,dn:U.filter(x=>cat(x)==='dn').length};
 $('jf').innerHTML=[['all','All'],['wk',pl?'Planned to run':'Ran'],['id','Idle or off'],['dn','Down or in service']].map(([k,l])=>`<button data-f="${k}" class="${J.f===k?'on':''}">${l} ${C[k]}</button>`).join('');
 const q=J.q.toLowerCase();let h='';
 U.filter(x=>(J.f==='all'||(J.f==='wk'?x.u.some(o=>o.hrs>0):cat(x)===J.f))&&(!q||(MS[x.i][1]+MS[x.i][0]).toLowerCase().includes(q))).forEach((x,k)=>{const m=MS[x.i],tot=x.u.reduce((a,o)=>a+o.hrs,0);
  h+=`<details class="m jr" style="--i:${k}"><summary><b>${m[1]}<small>${m[0]}</small></b>${x.u.map(cell).join('')}<span class="jt">${tot.toFixed(1)} h<small>${Math.round(tot/24*100)}% of day</small></span></summary><div class="jd">${x.u.map(blk).join('')}</div></details>`});
 $('jr').innerHTML=h||'<p class="none">No machines match. Try another day, filter or search.</p>';
 $('jh').textContent=`${fmt(t)}${t===TODAY?' (today)':pl?' (planned)':''}. ${n} machines installed.`}
const go=t=>{J.t=Math.max(day(1995,4,12),t);render()};
$('jprev').onclick=()=>go(J.t-1);$('jnext').onclick=()=>go(J.t+1);$('jtoday').onclick=()=>go(TODAY);
$('jd').onchange=e=>{const v=e.target.value.split('-').map(Number);if(v.length===3&&v[0]>=1995)go(day(...v))};
$('jq').oninput=e=>{J.q=e.target.value;render()};
$('jf').onclick=e=>{const b=e.target.closest('button');if(b){J.f=b.dataset.f;render()}};
document.querySelectorAll('input[name=dp]').forEach(r=>r.addEventListener('change',render));
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.tojobs');if(b){$('v6').checked=true;go(+b.dataset.t)}});
window.FPJ={render};
render();
})();