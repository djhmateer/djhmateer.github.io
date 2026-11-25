// Offline support. Pages: network first (so updates show up), fall back to cache.
// Everything else (hashed JS/CSS/flags): cache first, filled as it's used.
// Every page is the same index.html, so the latest one is also kept as './' and any address works offline.
const CACHE = 'flag-quest-v1'

self.addEventListener('install', (e) => {
  self.skipWaiting()
  // The first page loads before this worker exists, so fetch a copy now. Offline at install: try again next page.
  e.waitUntil(caches.open(CACHE).then((c) => c.add('./')).catch(() => {}))
})
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return
  // Engine sounds: browsers fetch audio in byte ranges, which a cache can't answer (Safari won't play it). Leave them to the network.
  if (req.destination === 'audio' || req.headers.has('range')) return

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone()
            const home = res.clone()
            caches.open(CACHE).then((c) => Promise.all([c.put(req, copy), c.put('./', home)]))
          }
          return res
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./'))),
    )
    return
  }

  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(req, copy))
          }
          return res
        }),
    ),
  )
})
