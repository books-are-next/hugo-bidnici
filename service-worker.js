/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-68bf238';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./bidnici_002.html","./bidnici_005.html","./bidnici_006.html","./bidnici_007.html","./bidnici_008.html","./bidnici_009.html","./bidnici_010.html","./bidnici_011.html","./bidnici_012.html","./bidnici_013.html","./bidnici_014.html","./bidnici_015.html","./bidnici_016.html","./bidnici_017.html","./bidnici_018.html","./bidnici_019.html","./bidnici_020.html","./bidnici_021.html","./bidnici_022.html","./bidnici_023.html","./bidnici_024.html","./bidnici_025.html","./bidnici_026.html","./bidnici_027.html","./bidnici_028.html","./bidnici_029.html","./bidnici_030.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/obalka_bidnici_i_fmt.png","./resources/obr_01_fmt.png","./resources/upoutavka_eknihy_fmt.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
