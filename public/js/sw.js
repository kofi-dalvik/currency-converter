
const currentCache = 'currency-converter-v2';

self.addEventListener('install', (installation) => {
    installation.waitUntil(
        caches.open(currentCache).then(cache => {
            return cache.addAll([
                '/',
                '/dist/bundle.js',
                '/dist/style.css',
                '/dist/logo.png'
            ])
        })
    );
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.forEach(name => {
                if (name.startsWith('currency-converter') && name != currentCache) {
                    caches.delete(name)
                }
            });
        })
    );
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request)
        })
    );
})



