// Latitude service worker: precached shell, network-first for app files, cached fonts.
const VERSION = 'lat-v2';
const SHELL = [
  // the world
  './', 'index.html', 'manifest.webmanifest', 'css/world.css', 'js/world.js', 'js/doors.js',
  'js/encounters/index.js', 'js/encounters/dancefloor.js', 'js/encounters/ship.js', 'js/encounters/permits.js',
  'css/encounters/dancefloor.css', 'css/encounters/ship.css', 'css/encounters/permits.css',
  // the reading room (the first Latitude, kept as an archive)
  'archive/index.html', 'css/app.css',
  'js/app.js', 'js/art.js', 'js/render.js', 'js/store.js', 'js/viz.js',
  'js/content/index.js', 'js/content/regions.js', 'js/content/latitude.js', 'js/content/self.js',
  'js/content/inner.js', 'js/content/between.js', 'js/content/voice.js', 'js/content/mind.js',
  'js/content/craft.js', 'js/content/influence.js', 'js/content/surface.js', 'js/content/visions.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png'
];
const FONTS = 'lat-fonts';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts: stale-while-revalidate, so type renders offline after first visit.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(async cache => {
      const hit = await cache.match(req);
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') cache.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;

  // Same-origin: network first (fresh content after deploys), cache fallback, shell for navigations.
  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  }).catch(async () => (await caches.match(req, { ignoreSearch: true }))
    || (req.mode === 'navigate' ? caches.match(/\/archive\//.test(url.pathname) ? 'archive/index.html' : 'index.html') : Response.error())));
});
