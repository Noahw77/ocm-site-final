async function includePartial(targetId, url) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const res = await fetch(url, { cache: 'no-cache' });
  const html = await res.text();
  el.innerHTML = html;
}

function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav] a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
}

(async function init() {
  await includePartial('site-header', 'partials/header.html');
  await includePartial('site-footer', 'partials/footer.html');
  setActiveNav();

  // Re-bind nav toggle after header injection
  const script = document.createElement('script');
  script.src = 'assets/js/nav.js';
  document.body.appendChild(script);

  // Hash scroll w/ sticky header offset
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 92) - 18;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
})();
