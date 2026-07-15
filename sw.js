// ─────────────────────────────────────────────────────────
//  CozPiraa Clinic — Service Worker (PWA)
//  Provides offline support, caching, background sync
// ─────────────────────────────────────────────────────────

const CACHE_NAME    = 'cozpiraa-v1';
const OFFLINE_URL   = '/404.html';

// Assets to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/appointment.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/images/latest.png',
  '/assets/images/doctor.jpg',
  '/manifest.json',
  OFFLINE_URL,
];

// ── INSTALL: Pre-cache core shell ──────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: Clean up old caches ──────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Network-first, fallback to cache ─────────────────
self.addEventListener('fetch', event => {
  // Skip non-GET and browser-extension requests
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;
  // Skip Supabase API calls — always go to network
  if (event.request.url.includes('supabase.co')) return;

  event.respondWith(
    fetch(event.request)
      .then(networkResp => {
        // Cache a copy of fresh responses
        if (networkResp && networkResp.status === 200) {
          const clone = networkResp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResp;
      })
      .catch(() =>
        // Network failed — try cache, then offline page
        caches.match(event.request).then(cached => {
          if (cached) return cached;
          if (event.request.destination === 'document') {
            return caches.match(OFFLINE_URL);
          }
        })
      )
  );
});

// ── PUSH NOTIFICATIONS (future use) ────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'CozPiraa Clinic', {
      body:    data.body    || 'You have a new notification.',
      icon:    '/assets/images/latest.png',
      badge:   '/assets/images/latest.png',
      vibrate: [200, 100, 200],
      tag:     'cozpiraa-notif',
      data:    { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
