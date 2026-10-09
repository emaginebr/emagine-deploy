/*
 * Roll6 service worker (042/043). It makes the app installable and shows the table's Web Push notifications.
 *
 * It caches nothing and has NO fetch listener on purpose: every request — the page, /assets, /api, /hubs (SignalR),
 * /mcp, pictures and recordings — goes to the network exactly as without it, so a deploy is seen on the next open and
 * nothing at the table can be served stale.
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

// A notice from the server (043): { title, body, icon, tag, url, kind, renotify }. Messages of a campaign share one tag,
// so they replace each other instead of piling up.
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { body: event.data ? event.data.text() : '' };
  }
  const title = data.title || 'Roll6';
  event.waitUntil(self.registration.showNotification(title, {
    body: data.body || '',
    icon: data.icon || '/brand/icon-192.png',
    badge: '/brand/icon-192.png',
    tag: data.tag || undefined,
    renotify: Boolean(data.tag && data.renotify),
    data: { url: data.url || '/' },
  }));
});

// Tapping opens the campaign with the chat: an open Roll6 window is reused, else a new one opens.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || '/', self.location.origin).href;
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const own = windows.find((client) => new URL(client.url).origin === self.location.origin);
    if (own) {
      await own.focus();
      if ('navigate' in own) await own.navigate(url);
      return;
    }
    await self.clients.openWindow(url);
  })());
});
