// Shared widgets + helpers — used by every page
document.addEventListener('DOMContentLoaded', function () {
  // Tiny local time readout ticker in the top bar
  (function tickerBar() {
    const el = document.querySelector('[data-ticker]');
    if (!el) return;
    const loc = el.getAttribute('data-loc') || 'SF';
    const update = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      el.textContent = loc + ' · ' + hh + ':' + mm + ':' + ss;
    };
    update();
    setInterval(update, 1000);
  })();

  // Reveal on scroll
  (function reveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
  })();

  // Cursor glint for elements with [data-glint]
  (function glint() {
    document.querySelectorAll('[data-glint]').forEach(el => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  })();

  // Reading progress bar on post pages
  (function progress() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = pct + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  })();

  // Copy email button on contact page
  (function copyEmail() {
    const btn = document.getElementById('copyEmail');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      const addr = btn.getAttribute('data-email') || '';
      try { await navigator.clipboard.writeText(addr); } catch (e) {}
      const orig = btn.textContent;
      btn.textContent = 'copied ✓';
      setTimeout(() => { btn.textContent = orig; }, 1400);
    });
  })();
});
