'use strict';
(()=>{
 const $=s=>document.querySelector(s);
 const posts=[
  {pos:1,title:'"Sabe o fornecedor que só responde no dia seguinte?" — atendimento ágil',format:'Foto',date:'28/set',views:415,reach:314,likes:2,comments:0,img:'assets/posts/post-atendimento.jpg',url:'https://www.instagram.com/aquatrosuprimentoscm/p/Dd1Pg0WAc7E/'},
  {pos:2,title:'"Um dia sem imprevistos de material" — eficiência operacional',format:'Reel',date:'21/out',views:286,reach:163,likes:7,comments:0,img:'assets/posts/post-eficiencia.jpg',url:'https://www.instagram.com/aquatrosuprimentoscm/reel/Dewg26oERzi/'},
  {pos:3,title:'"Ainda acha que a Aquatro é só a empresa do toner?" — catálogo completo',format:'Carrossel',date:'12/out',views:224,reach:49,likes:0,comments:2,img:'assets/posts/post-catalogo.jpg',url:'https://www.instagram.com/aquatrosuprimentoscm/p/DeZSrjziIEB/'},
  {pos:4,title:'Homenagem ao Dia da Secretária',format:'Foto',date:'30/set',views:217,reach:151,likes:4,comments:0,img:'assets/posts/post-secretaria.jpg',url:'https://www.instagram.com/aquatrosuprimentoscm/p/Dd6ZFeDF-_q/'},
  {pos:5,title:'Checklist de orçamento 2027 — 3 perguntas sobre estoque',format:'Carrossel',date:'7/out',views:213,reach:49,likes:0,comments:2,img:'assets/posts/post-checklist.jpg',url:'https://www.instagram.com/aquatrosuprimentoscm/p/DeMoagODYMk/'},
 ];
 function renderPosts(){
  const target=$('#ranked-posts');if(!target)return;
  target.innerHTML=posts.map(p=>`<article class="post">
   <div class="post-media">
    ${p.img?`<a href="${p.url}" target="_blank" rel="noopener"><img class="ranked-post-image" src="${p.img}" alt="Capa da publicação: ${p.title}" loading="lazy"></a>`:
      `<div class="post-image-pending">Imagem em alta qualidade pendente — aguardando pauta/BM</div>`}
    <div class="media-caption">${p.format} · ${p.date}</div>
   </div>
   <div class="post-info">
    <div class="post-index">${String(p.pos).padStart(2,'0')}<span>RANKING POR VISUALIZAÇÕES · 27/SET–26/OUT</span></div>
    <h3>${p.title}</h3>
    <div class="post-stats">
     <div><strong>${p.views}</strong><span>Views</span></div>
     <div><strong>${p.reach}</strong><span>Alcance</span></div>
     <div><strong>${p.likes||p.comments}</strong><span>${p.likes?'Curtidas':'Comentários'}</span></div>
    </div>
    <div class="engagement">${p.comments} comentário(s) · ${p.likes} curtida(s)</div>
    ${p.url&&/\/(p|reel)\//.test(p.url)?`<a class="download" href="${p.url}" target="_blank" rel="noopener">Ver publicação no Instagram ↗</a>`
          :`<a class="download" href="${p.url||'https://www.instagram.com/aquatrosuprimentoscm/'}" target="_blank" rel="noopener">Ver perfil no Instagram ↗</a>`}
   </div>
  </article>`).join('');
 }
 function renderCharts(){
  const C=window.AquatroCharts;if(!C)return;
  C.bars('views-chart','Visualizações orgânicas no Instagram','Comparação entre os 30 dias anteriores e o período de 27/set a 26/out de 2026.',
   [{label:'30 dias anteriores',value:139700,color:'var(--cream)'},{label:'27/set–26/out',value:236000,color:'var(--red)'}],
   'Fonte: Meta Business Suite → Insights → Instagram. 100% orgânico — nenhuma conta de anúncios ativa para a Aquatro.');
  C.bars('facebook-chart','Visualizações no Facebook','Canal secundário — mesmo conteúdo do Instagram, replicado automaticamente.',
   [{label:'30 dias anteriores',value:1872,color:'var(--cream)'},{label:'27/set–26/out',value:3500,color:'var(--red)'}],
   'Fonte: Meta Business Suite → Insights → Facebook. Base pequena (25 seguidores); leitura é de direção, não de volume.');
  C.bars('post-actions-chart','Os 5 conteúdos mais vistos do período','Visualizações de cada post, em ordem decrescente.',
   posts.map(p=>({label:p.format+' · '+p.date,value:p.views,color:p.pos===1?'var(--red)':'var(--cream)'})),
   'Fonte: Meta Business Suite → Conteúdo. O post sobre atendimento lento liderou o ranking por visualizações.');
  C.demoBars('age-gender-chart','Faixa etária e gênero da audiência','Participação percentual de cada faixa na base de seguidores do Instagram.',
   [{age:'18-24',f:5.5,m:1},{age:'25-34',f:27,m:6},{age:'35-44',f:29,m:7},{age:'45-54',f:13,m:4},{age:'55-64',f:3,m:1},{age:'65+',f:1,m:0.3}],
   'Fonte: Meta Business Suite → Público → Instagram. Mulheres de 25 a 44 anos somam mais da metade da base.');
  C.gender('gender-ring',19.2,80.8,1350,'Fonte: Meta Business Suite → Público.');
 }

 /* ---------- Movimento (entrada no scroll, contagem, barras, anel) ---------- */
 function countUp(node){
  const raw=node.textContent.trim();
  const m=raw.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/);
  if(!m)return;
  const pre=m[1],numStr=m[2],post=m[3];
  const dec=(numStr.split(',')[1]||'').length;
  const target=parseFloat(numStr.replace(/\./g,'').replace(',','.'));
  if(!isFinite(target))return;
  const fmt=v=>v.toLocaleString('pt-BR',{minimumFractionDigits:dec,maximumFractionDigits:dec});
  node.style.minWidth=node.getBoundingClientRect().width+'px';
  const dur=900,t0=performance.now();
  (function step(now){
   const p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,3);
   node.textContent=pre+fmt(target*e)+post;
   if(p<1)requestAnimationFrame(step); else node.textContent=raw;
  })(t0);
 }
 function onReveal(el){
  if(el.classList.contains('kpi')){
   const n=el.querySelector('strong'); if(n)countUp(n);
  }
  el.querySelectorAll('.gender-ring[data-share]').forEach(r=>{
   r.style.setProperty('--share',r.dataset.share);
  });
 }
 function initMotion(){
  if(!('IntersectionObserver'in window))return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  document.querySelectorAll('.gender-ring').forEach(r=>{
   const cur=r.style.getPropertyValue('--share')||'0%';
   r.dataset.share=cur; r.style.setProperty('--share','0%');
  });
  const targets=[...document.querySelectorAll(
   '.cover>*, .section>.eyebrow, .section>.heading, .kpis>.kpi, .chart-card, '+
   '.two-col>*, .audience-grid, .callout, .bullet-list>li, .ranked-posts>.post'
  )];
  targets.forEach(el=>el.classList.add('reveal'));
  const io=new IntersectionObserver(es=>{
   es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target; io.unobserve(el);
    const sibs=[...el.parentElement.children].filter(n=>n.classList.contains('reveal'));
    const delay=Math.min(Math.max(0,sibs.indexOf(el))*70,350);
    setTimeout(()=>{el.classList.add('in');onReveal(el);},delay);
   });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  targets.forEach(el=>io.observe(el));
 }
 function initNavHighlight(){
  if(!('IntersectionObserver'in window))return;
  const links=[...document.querySelectorAll('nav a[href^="#"]')];
  const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
  const io=new IntersectionObserver(es=>{
   es.forEach(e=>{
    const a=map.get(e.target.id); if(!a)return;
    if(e.isIntersecting){links.forEach(l=>l.classList.remove('active'));a.classList.add('active');}
   });
  },{threshold:.45});
  map.forEach((a,id)=>{const s=document.getElementById(id); if(s)io.observe(s);});
 }
 document.addEventListener('DOMContentLoaded',()=>{
  renderPosts();renderCharts();initMotion();initNavHighlight();
 });
})();
