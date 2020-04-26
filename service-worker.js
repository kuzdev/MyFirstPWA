const CACHE_NAME = "firstpwa-v1.2.3 update assetzzzzkmz";
var urlsToCache = [
  "/",
  "/nav.html",
  "/footer.html",
  "/index.html",
  "/manifest.json",

  "/assets/css/style.css",
  "/assets/css/styles.css",
  "/assets/css/materialize.min.css",
  "/assets/js/materialize.min.js",
  "/assets/js/nav.js",
  "/assets/font/Helveticaneue/HelveticaNeue.ttf",
  // "/assets/img/fix.png",
  // "/assets/img/flat-icon.png",
  // "/assets/img/logo_brush.png",
  // "/assets/img/logo_html.png",
  // "/assets/img/logo_css.png",
  // "/assets/img/logo.png",
  // "/assets/img/menubar.png",
  // "/assets/img/showcase.png",
  // "/assets/img/responsive.png",


  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/kuzPedia.html",
  "/pages/kuzfm.html",
  "/pages/Login.html",
  "/pages/news.html"

];
//untuk menambah chache pada service worker
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
    .match(event.request, {
      cacheName: CACHE_NAME
    })
    .then(function (response) {
      if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
  //untuk hapus chache lama
  self.addEventListener("activate", function (event) {
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

});