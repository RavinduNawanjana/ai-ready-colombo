
(() => {
  const KEY = 'airc_progress_v1';
  const getProgress = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  };
  const setProgress = (items) => localStorage.setItem(KEY, JSON.stringify([...new Set(items)].sort()));

  function render() {
    const done = getProgress();
    const pct = Math.round((done.length / 5) * 100);
    document.querySelectorAll('[data-progress-label]').forEach(el => el.textContent = `${pct}%`);
    document.querySelectorAll('[data-progress-bar]').forEach(el => el.style.width = `${pct}%`);
    document.querySelectorAll('[data-progress-list]').forEach(list => {
      list.innerHTML = [1,2,3,4,5].map(n => `
        <div class="mini-progress-item ${done.includes(n) ? 'done' : ''}">
          <span>Module ${n}</span><b>${done.includes(n) ? '✓' : '○'}</b>
        </div>`).join('');
    });
    document.querySelectorAll('[data-module]').forEach(btn => {
      const n = Number(btn.dataset.module);
      const completed = done.includes(n);
      btn.textContent = completed ? `Module ${n} completed ✓` : `Mark Module ${n} complete`;
      btn.setAttribute('aria-pressed', String(completed));
      const msg = document.querySelector(`[data-completion-message="${n}"]`);
      if (msg) msg.textContent = completed ? 'Saved on this device.' : '';
    });
  }

  document.querySelectorAll('[data-module]').forEach(btn => {
    btn.addEventListener('click', () => {
      const n = Number(btn.dataset.module);
      const done = getProgress();
      if (!done.includes(n)) done.push(n);
      setProgress(done);
      render();
    });
  });

  window.AIRC_PROGRESS = { get: getProgress, render };
  render();
})();
