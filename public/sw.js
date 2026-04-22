// public/sw.js
const CACHE_NAME = "nextjs-pages-cache-v1";
const urlsToCache = [
  "/_next/static/chunks/%5Broot-of-the-server%5D__28bc9c2a._.css",
  "/home",
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

async function putInCache(key, val) {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(key, val);
}

// Возвращает ответ из кэша, если сеть недоступна
async function getLastedReaded(request) {
  return new Response(JSON.stringify({ offline: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Только для своего домена
  if (url.origin === location.origin) {
    // Для API /api/story/new — отдельная логика
    if (url.pathname === "/api/story/new") {
      event.respondWith(
        fetch(request)
          .then(async (response) => {
            return response;
          })
          .catch(async () => {
            // Если сеть недоступна — отдаём из кэста или оффлайн-ответ
            return getLastedReaded(request);
          }),
      );
    } else {
      // Для остальных — стандартная стратегия: сначала сеть, при ошибке — кэш
      event.respondWith(
        fetch(request)
          .then(async (res) => {
            await putInCache(request, res.clone());
            return res;
          })
          .catch(async () => {
            const cachedResponse = await caches.match(request);

            return cachedResponse || new Response("offline");
          }),
      );
    }
  } else {
    // Внешние ресурсы — всегда идём в сеть
    event.respondWith(fetch(request));
  }
});
