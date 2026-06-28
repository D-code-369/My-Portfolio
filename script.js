/* ─── NAVBAR SCROLL ─── */
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>20);
  document.getElementById('backtop').classList.toggle('show',window.scrollY>400);
  updateActive();
  updateScrollProgress();
});

/* ─── SCROLL PROGRESS BAR ─── */
function updateScrollProgress(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const pct=max>0?(window.scrollY/max*100):0;
  document.getElementById('scrollProgress').style.width=pct+'%';
}

/* ─── HAMBURGER ─── */
const ham=document.getElementById('hamburger');
const mob=document.getElementById('mobileMenu');
ham.addEventListener('click',()=>mob.classList.toggle('open'));
function closeMobile(){mob.classList.remove('open')}

/* ─── ACTIVE NAV ─── */
function updateActive(){
  const sections=['home','education','skills','projects','designs','certifications','contact'];
  const links=document.querySelectorAll('.nav-links a');
  let cur='';
  sections.forEach(id=>{
    const el=document.getElementById(id);
    if(el&&window.scrollY>=el.offsetTop-100)cur=id;
  });
  links.forEach(l=>{l.classList.toggle('active',l.getAttribute('href')==='#'+cur);});
}

/* ─── REVEAL ON SCROLL ─── */
const revealEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.stagger');
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:0.10});
revealEls.forEach(el=>revealObs.observe(el));

/* ─── SKILL BARS ─── */
const bars=document.querySelectorAll('.skill-bar');
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const pct=e.target.dataset.pct||'80';
      setTimeout(()=>{e.target.style.width=pct+'%';},200);
    }
  });
},{threshold:0.3});
bars.forEach(b=>barObs.observe(b));

/* ─── CURSOR SPARKLE TRAIL ─── */
let lastSpark=0;
document.addEventListener('mousemove',e=>{
  const now=Date.now();
  if(now-lastSpark<60)return;
  lastSpark=now;
  const spark=document.createElement('div');
  spark.className='cursor-spark';
  spark.style.cssText=`left:${e.clientX-4}px;top:${e.clientY-4}px`;
  document.body.appendChild(spark);
  setTimeout(()=>spark.remove(),500);
});

/* ─── RIPPLE EFFECT ON BUTTONS ─── */
document.querySelectorAll('.btn-ripple').forEach(btn=>{
  btn.addEventListener('click',function(e){
    const r=document.createElement('span');
    r.className='ripple';
    const rect=this.getBoundingClientRect();
    const size=Math.max(rect.width,rect.height);
    r.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
    this.appendChild(r);
    setTimeout(()=>r.remove(),600);
  });
});

/* ─── CARD TILT ─── */
document.querySelectorAll('.edu-card,.project-card,.poster-card,.sk-card,.cert-item').forEach(card=>{
  card.classList.add('tilt');
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5;
    const y=(e.clientY-r.top)/r.height-0.5;
    card.style.transform=`perspective(600px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='';
  });
});

/* ─── FLOATING PARTICLES IN HERO ─── */
(function(){
  const hero=document.getElementById('home');
  if(!hero)return;
  for(let i=0;i<12;i++){
    const p=document.createElement('div');
    const s=Math.random()*40+10;
    p.className='particle';
    p.style.cssText=`
      width:${s}px;height:${s}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation:floatY ${3+Math.random()*4}s ease-in-out ${Math.random()*2}s infinite alternate
    `;
    hero.appendChild(p);
  }
})();

/* ─── HERO IMAGE FLOAT ─── */
const heroFrame=document.querySelector('.hero-img-frame');
if(heroFrame)heroFrame.classList.add('hero-float');

/* ─── SHIMMER ON SECTION TITLES ─── */
document.querySelectorAll('.section-title h2').forEach(h=>{
  h.classList.add('shimmer-text');
});

/* ─── CONTACT FORM OPEN ─── */
function openContact(){
  window.location.href='contact-backend.html';
}
document.querySelectorAll('#preview_name,#preview_email').forEach(el=>{
  el.addEventListener('click',openContact);
});

/* ─── RIPPLE ON CONTACT BTN ─── */
const ocb=document.getElementById('openContactBtn');
if(ocb)ocb.classList.add('btn-ripple');

/* ─── DARK / LIGHT MODE ─── */
const toggleBtn=document.getElementById('themeToggle');
const root=document.documentElement;
const DARK='dark';const LIGHT='light';
function setTheme(mode){
  if(mode===DARK){
    root.setAttribute('data-theme',DARK);
    toggleBtn.textContent='☀️';
    toggleBtn.title='Switch to light mode';
  } else {
    root.removeAttribute('data-theme');
    toggleBtn.textContent='🌙';
    toggleBtn.title='Switch to dark mode';
  }
  try{localStorage.setItem('amrita-theme',mode)}catch(e){}
}
(function(){
  let saved;try{saved=localStorage.getItem('amrita-theme')}catch(e){}
  if(saved){setTheme(saved);}
  else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){setTheme(DARK);}
})();
toggleBtn.addEventListener('click',()=>{
  const isDark=root.getAttribute('data-theme')===DARK;
  setTheme(isDark?LIGHT:DARK);
});
