const CACHE_NAME = "nextjs-pages-cache-v1";
const urlsToCache = [
  "/_next/static/chunks/%5Broot-of-the-server%5D__28bc9c2a._.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        ),
      ),
  );
});

// Сохраняет в кэш только GET‑запросы с успешными ответами
async function putInCache(request, response) {
  // Пропускаем POST и другие методы
  if (request.method !== "GET") return;
  // Пропускаем неудачные ответы
  if (!response.ok) return;

  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
}

async function getFromCache(request) {
  const cache = await caches.open(CACHE_NAME);
  return await cache.match(request);
}

async function getOfflineResponse() {
  const cache = await caches.open(CACHE_NAME);
  const offlineResponse = await cache.match("/offline");
  if (offlineResponse) return offlineResponse;
  return new Response("<h1>Offline</h1><p>No internet connection</p>", {
    headers: { "Content-Type": "text/html" },
  });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Только для своего домена
  if (url.origin === location.origin) {
    // Для API /api/story/new — отдельная логика

    // Для остальных запросов: сеть → кэш → офлайн
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          await putInCache(request, networkResponse);
          return networkResponse;
        } catch (error) {
          const cachedResponse = await getFromCache(request);
          if (cachedResponse) return cachedResponse;
          return await getOfflineResponse();
        }
      })(),
    );
  } else {
    // Внешние ресурсы — всегда в сеть
    event.respondWith(fetch(request));
  }
});
