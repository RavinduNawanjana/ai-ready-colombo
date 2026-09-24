(() => {
  const footer = document.querySelector('.airc-footer');
  if (!footer) return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const toggle = footer.querySelector('[data-airc-theme-toggle]');
  const rotateWord = footer.querySelector('[data-airc-rotate-word]');
  const bgWord = footer.querySelector('[data-airc-bg-word]');
  const particles = footer.querySelector('[data-airc-particles]');

  toggle?.addEventListener('click', () => {
    const isLight = footer.classList.toggle('airc-footer-light');
    toggle.setAttribute('aria-pressed', String(isLight));
    toggle.title = isLight ? 'Switch footer to dark theme' : 'Switch footer to light theme';
  });

  const words = ['judgment', 'context', 'questions', 'verification', 'thinking'];
  let wordIndex = 0;
  if (rotateWord && !reduceMotion) {
    window.setInterval(() => {
      rotateWord.classList.add('airc-footer-swap');
      window.setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        rotateWord.textContent = words[wordIndex];
        rotateWord.classList.remove('airc-footer-swap');
      }, 220);
    }, 2400);
  }

  if (bgWord && !reduceMotion && window.matchMedia?.('(hover:hover)').matches) {
    footer.addEventListener('pointermove', event => {
      const rect = footer.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      bgWord.style.transform = `translate(${x * -18}px, ${y * -12}px)`;
    });
    footer.addEventListener('pointerleave', () => {
      bgWord.style.transform = 'translate(0,0)';
    });
  }

  let particleTimer = null;
  const spawnParticle = () => {
    if (!particles || reduceMotion) return;
    const dot = document.createElement('span');
    dot.className = 'airc-footer-particle';
    dot.style.left = `${3 + Math.random() * 94}%`;
    dot.style.setProperty('--airc-distance', `${footer.clientHeight * (0.68 + Math.random() * 0.25)}px`);
    dot.style.setProperty('--airc-drift', `${(Math.random() - 0.5) * 80}px`);
    dot.style.animationDuration = `${4.4 + Math.random() * 2.6}s`;
    particles.appendChild(dot);
    window.setTimeout(() => dot.remove(), 7600);
  };

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!particleTimer) {
            spawnParticle();
            particleTimer = window.setInterval(spawnParticle, 720);
          }
        } else {
          window.clearInterval(particleTimer);
          particleTimer = null;
        }
      });
    }, { threshold: 0.08 });
    observer.observe(footer);
  }
})();
