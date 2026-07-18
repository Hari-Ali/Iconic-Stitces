
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  document.querySelectorAll('[data-counter]').forEach(counter => {
    const original = counter.textContent.trim();
    const numeric = Number(original.replace(/[^0-9.]/g, ''));
    if (!numeric || numeric > 10000) return;
    const suffix = original.replace(/[0-9.,]/g, '');
    const decimals = original.includes('.') ? 1 : 0;
    let started = false;
    const animate = () => {
      if (started) return; started = true;
      const start = performance.now();
      const duration = 1300;
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        counter.textContent = (numeric * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick); else counter.textContent = original;
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) new IntersectionObserver((entries, obs) => { if(entries[0].isIntersecting){ animate(); obs.disconnect(); } }, {threshold:.5}).observe(counter); else animate();
  });

  document.querySelectorAll('.faq-item button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      item.classList.toggle('is-open', !open);
    });
  });

  const carousel = document.querySelector('[data-testimonial-carousel]');
  if (carousel) {
    const track = carousel.querySelector('[data-testimonial-track]');
    const slides = [...track.children];
    const prev = document.querySelector('[data-testimonial-prev]');
    const next = document.querySelector('[data-testimonial-next]');
    const dotsWrap = document.querySelector('[data-testimonial-dots]');
    let index = 0;
    const perView = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    const maxIndex = () => Math.max(0, slides.length - perView());
    slides.forEach((_, i) => { const dot=document.createElement('button'); dot.type='button'; dot.setAttribute('aria-label',`Go to testimonial ${i+1}`); dot.addEventListener('click',()=>{index=Math.min(i,maxIndex());update()}); dotsWrap.appendChild(dot); });
    const update = () => {
      index = Math.min(index, maxIndex());
      const gap = 24;
      const width = (carousel.clientWidth - gap*(perView()-1))/perView();
      track.style.transform = `translateX(-${index*(width+gap)}px)`;
      [...dotsWrap.children].forEach((d,i)=>d.classList.toggle('is-active',i===index));
    };
    prev?.addEventListener('click',()=>{index=index<=0?maxIndex():index-1;update()});
    next?.addEventListener('click',()=>{index=index>=maxIndex()?0:index+1;update()});
    window.addEventListener('resize',update); update();
  }

  const filters = document.querySelectorAll('[data-filter]');
  const portfolioItems = document.querySelectorAll('.portfolio-filter-item');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('is-active')); button.classList.add('is-active');
    const filter = button.dataset.filter;
    portfolioItems.forEach(item => item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter));
  }));

  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    const image = lightbox.querySelector('[data-lightbox-image]');
    const title = lightbox.querySelector('[data-lightbox-title]');
    const close = () => { lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
    document.querySelectorAll('[data-lightbox-src]').forEach(btn => btn.addEventListener('click', () => { image.src=btn.dataset.lightboxSrc; image.alt=btn.dataset.lightboxTitle; title.textContent=btn.dataset.lightboxTitle; lightbox.classList.add('is-open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }));
    lightbox.querySelector('[data-lightbox-close]')?.addEventListener('click',close);
    lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }

  const fileInput = document.querySelector('.file-drop input[type=file]');
  const fileLabel = document.querySelector('[data-file-label]');
  fileInput?.addEventListener('change', () => { fileLabel.textContent = fileInput.files?.[0]?.name || 'Upload Artwork'; });

  const form = document.querySelector('[data-quote-form]');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = form.querySelector('[data-form-status]');
      const required = [...form.querySelectorAll('[required]')];
      let valid = true;
      required.forEach(field => { const bad=!field.value.trim() || (field.type==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)); field.classList.toggle('is-invalid',bad); if(bad)valid=false; });
      status.className='form-status ' + (valid?'is-success':'is-error');
      status.textContent=valid?'Thanks — your project details are ready for submission. Connect this form to Elementor Forms, email, or your CRM.':'Please complete all required fields with valid information.';
      if(valid){form.reset(); if(fileLabel)fileLabel.textContent='Upload Artwork';}
    });
  }
});
