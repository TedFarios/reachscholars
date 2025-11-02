// Mobile nav
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false');
}));

// Elevate header on scroll
const header = document.querySelector('[data-elevate]');
addEventListener('scroll', () => {
  const y = scrollY;
  header.style.boxShadow = y > 4 ? 'var(--shadow)' : 'none';
}, { passive: true });

// Intersection observer for reveal
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) e.target.classList.add('in');
}, { threshold: 0.12 });
document.querySelectorAll('[data-io]').forEach(el => io.observe(el));

// Simple count-up for stats/kpis
function animateCount(el){
  const target = Number(el.dataset.count || '0');
  const duration = 1200;
  const start = performance.now();
  const fmt = new Intl.NumberFormat();
  function tick(now){
    const t = Math.min(1, (now - start) / duration);
    const val = Math.floor(target * (t * (2 - t))); // easeOutQuad
    el.textContent = fmt.format(val);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const observer = new IntersectionObserver((entries)=>{
  for(const e of entries){
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(animateCount);
      observer.unobserve(e.target);
    }
  }
}, {threshold: 0.3});
document.querySelectorAll('.hero__media, #impact').forEach(el => observer.observe(el));

// Apply form -> mailto
const form = document.getElementById('apply-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name') || '';
  const email = data.get('email') || '';
  const role = data.get('role') || '';
  const summary = data.get('summary') || '';
  const subject = encodeURIComponent('REACH Scholar Application — ' + name);
  const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Role: ${role}

Project Summary:
${summary}

(Submitted from reachscholars site)`
  );
  // Replace with your official inbox
  window.location.href = `mailto:hello@reachscholars.org?subject=${subject}&body=${body}`;
});

// Footer year
document.getElementById('year').textContent = String(new Date().getFullYear());

// Smooth internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (ev) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el){
      ev.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      el.focus?.();
    }
  });
});
