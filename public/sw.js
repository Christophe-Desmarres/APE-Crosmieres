self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("static")
    .then(cache => {
      return cache.addAll([
        "./", 
        "./index.html", 
        "./icons", 
        "./favicon.png", 
        "./manifest.json", 
        "./sw.js", 
        "./tree.png", 
        "./icons"
      ]);
    })
  );

});

self.addEventListener("fetch", e => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request)
    .then(response => {
      return response || fetch(e.request);
    })
  )
});