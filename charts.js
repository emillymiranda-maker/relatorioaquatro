'use strict';
(()=>{
 const fmt=(v,d=0)=>Number(v).toLocaleString('pt-BR',{maximumFractionDigits:d});
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let chartId=0;
 function shell(id,title,subtitle,body,note){const el=document.getElementById(id);if(!el)return;el.innerHTML=`<h3>${title}</h3><p class="chart-subtitle">${subtitle}</p>${body}${note?`<p class="note chart-note">${note}</p>`:''}`;}
 function bars(id,title,subtitle,rows,note,decimals=0){
  const width=1000,left=250,right=110,top=26,rowHeight=42,height=top+rowHeight*rows.length+28,plot=width-left-right,
   max=Math.max(...rows.map(r=>r.value),1),power=10**Math.floor(Math.log10(max/4||1)),step=Math.ceil(max/4/power)*power||1,limit=step*4,uid='chart-'+(++chartId);
  let svg=`<svg class="bar-chart" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${uid}-title ${uid}-desc"><title id="${uid}-title">${esc(title)}</title><desc id="${uid}-desc">${esc(rows.map(r=>r.label+': '+fmt(r.value,decimals)).join('; '))}</desc>`;
  for(let i=0;i<=4;i++){const x=left+plot*i/4;svg+=`<line x1="${x}" y1="${top-8}" x2="${x}" y2="${height-28}" class="chart-gridline"/><text x="${x}" y="${height-8}" text-anchor="middle" class="chart-tick">${fmt(limit*i/4,decimals)}</text>`;}
  rows.forEach((r,i)=>{const y=top+i*rowHeight,w=Math.max(2,plot*r.value/limit);svg+=`<text x="${left-16}" y="${y+20}" text-anchor="end" class="chart-label">${esc(r.label)}</text><rect x="${left}" y="${y}" width="${w}" height="30" rx="5" fill="${r.color||'var(--red)'}"><title>${esc(r.label)}: ${fmt(r.value,decimals)}</title></rect><text x="${left+w+11}" y="${y+21}" class="chart-value">${fmt(r.value,decimals)}</text>`});
  svg+='</svg>';shell(id,title,subtitle,svg,note);
 }
 function demoBars(id,title,subtitle,rows,note){
  const width=1000,left=80,top=26,bottom=38,height=235,plot=height-top-bottom,barW=52,gap=(width-left*2)/rows.length,uid='chart-'+(++chartId);
  let svg=`<svg class="bar-chart" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${uid}-title"><title id="${uid}-title">${esc(title)}</title>`;
  rows.forEach((r,i)=>{
   const cx=left+gap*i+gap/2,fh=Math.round(r.f/30*plot),mh=Math.round(r.m/30*plot);
   svg+=`<rect x="${cx-barW-4}" y="${top+plot-fh}" width="${barW}" height="${fh}" rx="5" fill="var(--red)"><title>${r.age} mulheres: ${fmt(r.f,1)}%</title></rect>`;
   svg+=`<rect x="${cx+4}" y="${top+plot-mh}" width="${barW}" height="${mh}" rx="5" fill="var(--cream)" opacity=".55"><title>${r.age} homens: ${fmt(r.m,1)}%</title></rect>`;
   svg+=`<text x="${cx}" y="${height-12}" text-anchor="middle" class="chart-tick">${r.age}</text>`;
  });
  svg+='</svg>';shell(id,title,subtitle,svg,note);
 }
 function gender(id,male,female,total,source){
  const el=document.getElementById(id);if(!el)return;
  el.innerHTML=`<div class="gender-viz"><div class="gender-ring" style="--share:${male}%" role="img" aria-label="${fmt(male,1)}% homens e ${fmt(female,1)}% mulheres"><div><strong>${fmt(total)}</strong><span>seguidores no Instagram</span></div></div><div class="chart-legend"><span><i style="background:var(--red)"></i>Mulheres <b>${fmt(female,1)}%</b></span><span><i style="background:var(--cream)"></i>Homens <b>${fmt(male,1)}%</b></span><span style="margin-top:8px">${source}</span></div></div>`;
 }
 window.AquatroCharts={bars,demoBars,gender,shell};
})();
