'use strict';
(() => {
  const nav = document.getElementById('paper-toc');
  const panel = nav && nav.closest('details.paper-toc-panel');
  if (!nav || !panel) return;
  const summary = panel.querySelector(':scope > summary');
  const wide = window.matchMedia('(min-width: 1280px)');
  let compactOpen = false;
  let previousWide;
  let frame = 0;
  let current;
  const entries = Array.from(nav.querySelectorAll('a[href^="#"]')).map(link => {
    const id = decodeURIComponent(link.getAttribute('href').slice(1));
    const target = document.getElementById(id);
    return target ? { link, target } : null;
  }).filter(Boolean);
  if (!entries.length) return;

  document.body.classList.add('paper-navigation-ready');

  function updateOffset() {
    const height = wide.matches ? 36 : (summary ? summary.getBoundingClientRect().height : 56) + 16;
    document.documentElement.style.setProperty('--paper-toc-offset', `${height}px`);
  }

  function setActive(entry) {
    if (!entry || current === entry) return;
    entries.forEach(item => {
      if (item === entry) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    });
    current = entry;
  }

  function updateActive() {
    frame = 0;
    const offset = wide.matches ? 110 : (summary ? summary.getBoundingClientRect().height : 56) + 72;
    let next = entries[0];
    for (const entry of entries) {
      if (entry.target.getBoundingClientRect().top <= offset) next = entry;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      next = entries[entries.length - 1];
    }
    setActive(next);
  }

  function scheduleActive() {
    if (!frame) frame = window.requestAnimationFrame(updateActive);
  }

  function updateMode() {
    const isWide = wide.matches;
    if (previousWide !== isWide) {
      panel.open = isWide || compactOpen;
      if (summary) summary.tabIndex = isWide ? -1 : 0;
      previousWide = isWide;
    }
    updateOffset();
    scheduleActive();
  }

  panel.addEventListener('toggle', () => {
    if (wide.matches && !panel.open) panel.open = true;
    else if (!wide.matches) compactOpen = panel.open;
    updateOffset();
  });
  if (summary) summary.addEventListener('click', event => {
    if (wide.matches) event.preventDefault();
  });
  nav.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !nav.contains(link)) return;
    if (!wide.matches) {
      compactOpen = false;
      panel.open = false;
    }
    const entry = entries.find(item => item.link === link);
    if (entry) setActive(entry);
    scheduleActive();
  });
  window.addEventListener('scroll', scheduleActive, { passive: true });
  window.addEventListener('resize', updateMode, { passive: true });
  window.addEventListener('hashchange', scheduleActive);
  window.addEventListener('load', scheduleActive, { once: true });
  document.addEventListener('languagechange', () => {
    updateOffset();
    scheduleActive();
  });
  if (typeof wide.addEventListener === 'function') wide.addEventListener('change', updateMode);
  else wide.addListener(updateMode);
  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver(scheduleActive);
    observer.observe(document.querySelector('main') || document.body);
  }
  updateMode();
})();
