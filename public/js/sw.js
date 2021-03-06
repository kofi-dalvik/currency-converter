//cache version name
const currentCache = 'currency-converter-v1';

/**
 * on installation, cache the asset files and dont wait
 */
self.addEventListener('install', (installation) => {
    installation.waitUntil(
        caches.open(currentCache).then(cache => {
            return cache.addAll([
                '/',
                '/dist/bundle.js',
                '/dist/style.css',
                '/dist/logo.png'
            ]).then(() => {
                //skip waiting
                return self.skipWaiting()
            })
        })
    );
})

/**
 * on activate, delete old caches
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.forEach(name => {
                if (name.startsWith('currency-converter') && name != currentCache) {
                    caches.delete(name)
                }
            });
        }).then(() => {
            //set worker as active for all clients
            self.clients.claim();
        })
    );
})


/**
 * on fetch response with a cached data or fetch data
 */
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request)
        })
    );
})



