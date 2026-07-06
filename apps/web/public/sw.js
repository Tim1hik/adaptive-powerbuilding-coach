self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("apc-static-v1").then((cache) =>
      cache.addAll(["/offline.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png"])
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;
  if (!["document", "style", "script", "image", "font"].includes(request.destination)) return;
  if (request.url.includes("/api/")) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (request.destination !== "document") {
          const clone = response.clone();
          caches.open("apc-static-v1").then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        return cached ?? caches.match("/offline.html");
      })
  );
});
