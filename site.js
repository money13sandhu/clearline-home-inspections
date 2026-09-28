/* =====================================================================
   BRAND CONFIG — the ONE place to change the company name and contact.
   Every page reads from this at load time.
   ===================================================================== */
window.BRAND = {
  name:      "Clearline Home Inspections",
  short:     "Clearline",
  tagline:   "See the whole house before you buy it.",
  phone:     "(705) 500-9009",
  email:     "hello@clearlinehomeinspections.ca",   // placeholder until the domain is registered
  area:      "Toronto & the GTA",
  base:      "Halton Hills, ON",
  inspector: "Manee Sandhu",
  hours:     "Mon to Sun, 7 am to 8 pm",
  // Paste your Calendly (or similar) event link here once created, e.g.
  // "https://calendly.com/clearline/home-inspection". Leave "" to show the request form only.
  booking:   ""
};

(function(){
  const B = window.BRAND;
  const tel = 'tel:+1' + B.phone.replace(/\D/g,'');
  const set = (sel, fn) => document.querySelectorAll(sel).forEach(fn);
  set('[data-brand="name"]',      e => e.textContent = B.name);
  set('[data-brand="short"]',     e => e.textContent = B.short);
  set('[data-brand="tagline"]',   e => e.textContent = B.tagline);
  set('[data-brand="phone"]',     e => e.textContent = B.phone);
  set('[data-brand="phone-link"]',e => e.href = tel);
  set('[data-brand="email"]',     e => e.textContent = B.email);
  set('[data-brand="email-link"]',e => e.href = 'mailto:' + B.email);
  set('[data-brand="area"]',      e => e.textContent = B.area);
  set('[data-brand="base"]',      e => e.textContent = B.base);
  set('[data-brand="inspector"]', e => e.textContent = B.inspector);
  set('[data-brand="hours"]',     e => e.textContent = B.hours);
  if (document.title.includes('{{name}}')) document.title = document.title.replace('{{name}}', B.name);
  set('#yr', e => e.textContent = new Date().getFullYear());

  // highlight current nav item
  const here = location.pathname.split('/').pop() || 'index.html';
  set('.navlinks a', a => { if ((a.getAttribute('href')||'').split('/').pop() === here) a.classList.add('active'); });

  // mobile menu
  const burger = document.querySelector('.burger');
  if (burger) burger.addEventListener('click', () => document.getElementById('navlinks').classList.toggle('open'));

  // booking calendar embed (Calendly) if configured
  const cal = document.getElementById('calendar');
  if (cal && B.booking) {
    cal.innerHTML = '<div class="calendly-inline-widget" data-url="' + B.booking + '?hide_gdpr_banner=1" style="min-width:320px;height:700px"></div>';
    const s = document.createElement('script'); s.src = 'https://assets.calendly.com/assets/external/widget.js'; s.async = true; document.body.appendChild(s);
  }
})();

/* Static site (GitHub Pages) has no backend: forms build a mailto so requests land in your inbox.
   Later: swap for Formspree / Netlify Forms, or the booking tool handles it. */
function sendForm(ev, form){
  ev.preventDefault();
  const d = Object.fromEntries(new FormData(form).entries());
  const subject = encodeURIComponent((d.subject || 'Inspection request') + ': ' + (d.address || d.name || ''));
  const body = encodeURIComponent(Object.entries(d).filter(([k])=>k!=='subject').map(([k,v])=>k[0].toUpperCase()+k.slice(1)+': '+v).join('\n'));
  const t = document.getElementById('toast'); if (t){ t.style.display='block'; setTimeout(()=>t.style.display='none',4000); }
  window.location.href = 'mailto:' + window.BRAND.email + '?subject=' + subject + '&body=' + body;
  return false;
}
function pickSlot(el){
  el.parentElement.querySelectorAll('.slot').forEach(s=>s.classList.remove('on'));
  el.classList.add('on');
  const f = el.closest('form'); if (f && f.time) f.time.value = el.textContent.trim();
}
