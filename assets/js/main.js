(() => {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    const close = () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); };
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  document.querySelectorAll('[data-form]').forEach(link => {
    const key = link.dataset.form;
    const url = window.AIRC_CONFIG?.forms?.[key];
    if (url && !url.includes('REPLACE-WITH')) {
      link.href = url;
    } else {
      link.addEventListener('click', e => e.preventDefault());
      link.setAttribute('aria-disabled','true');
      link.title = 'Add this form URL in assets/js/config.js before launch.';
    }
  });

  document.querySelectorAll('[data-reflection]').forEach(box => {
    const key = `airc_reflection_${box.dataset.reflection}`;
    try { box.value = localStorage.getItem(key) || ''; } catch (_) {}
    box.addEventListener('input', () => { try { localStorage.setItem(key, box.value); } catch (_) {} });
  });

  document.querySelectorAll('.copy-snippet').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.closest('.tool-card')?.querySelector('pre')?.innerText || '';
      const old = btn.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
      } catch (_) {
        btn.textContent = 'Select & copy';
      }
      setTimeout(() => { btn.textContent = old; }, 1300);
    });
  });

  document.querySelectorAll('.faq-item').forEach(item => {
    const button = item.querySelector('.faq-question');
    if (!button) return;
    button.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });
})();
