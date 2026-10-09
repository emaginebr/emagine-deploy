/*
 * Roll6 service worker (042). It exists only so the app can be installed (and, with #39, receive push).
 *
 * It caches nothing and has NO fetch listener on purpose: every request — the page, /assets, /api, /hubs (SignalR),
 * /mcp, pictures and recordings — goes to the network exactly as without it, so a deploy is seen on the next open and
 * nothing at the table can be served stale. The push/notificationclick handlers come with #39.
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Defensive: this worker never creates a cache; drop any left by an older one.
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});
