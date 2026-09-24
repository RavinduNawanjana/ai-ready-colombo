(() => {
  if (!/^https?:$/.test(location.protocol)) return;

  const clean = new URL(location.href);
  clean.hash = '';
  clean.search = '';

  // Treat /index.html and the repository root as the same canonical page.
  if (clean.pathname.endsWith('/index.html')) {
    clean.pathname = clean.pathname.slice(0, -'index.html'.length);
  }

  const canonicalUrl = clean.href;

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  let og = document.querySelector('meta[property="og:url"]');
  if (!og) {
    og = document.createElement('meta');
    og.setAttribute('property', 'og:url');
    document.head.appendChild(og);
  }
  og.content = canonicalUrl;
})();
