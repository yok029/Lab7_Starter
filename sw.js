// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';
const urlsToCache= [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'https://introweb.tech/assets/json/stuffing.json',
  'https://introweb.tech/assets/json/turkey.json',
  'https://introweb.tech/assets/json/pumpkinPie.json'
];

 // Once the service worker has been installed, feed it some initial URLs to cache
/**
 * TODO - Part 2 Step 2
 * Create a function as outlined above
 */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      console.log('cache opened');
      return cache.addAll(urlsToCache);
    })
  );
});

/**
 * Once the service worker 'activates', this makes it so clients loaded
 * in the same scope do not need to be reloaded before their fetches will
 * go through this service worker
 */
self.addEventListener('activate', function (event) {
  /**
   * TODO - Part 2 Step 3
   * Create a function as outlined above, it should be one line
   */
  event.waitUntil(clients.claim());
});

// Intercept fetch requests and store them in the cache
self.addEventListener('fetch', function (event) {
  /**
   * TODO - Part 2 Step 4
   * Create a function as outlined above
   */
  event.respondeWith(
    caches.match(event.request) 
    .then(function(response) {
      if (response){
        return response;
      }
      return fetch(event.request);
    })
  );

});