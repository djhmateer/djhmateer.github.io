---
layout: post
title: Progressive Web Apps - Example
description: 
menu: review
categories: PWA FrontEnd 
published: true 
comments: false     
sitemap: false
image: /assets/2020-12-02/ios2.png
---

<!-- [![alt text](/assets/2020-12-02/ios2.png "PWA"){:width="300px"}](/assets/2020-12-02/ios2.png) -->

[See my PWA Beginnering Guide article for background](/)

Here we will be a PWA from scratch with the following features:

- Offline page displayed when offline
- Splash screen images for iOS and others
- All icons sizes
- Add to Home Screen instructions (A2HS)
- Make a lightweight fast loading site

Technically we will focus

- Fully populated manifest.json file (scoring high on lighthouse)
- Focus on the best possible and lightest weight html with all meta tags for iOS

## PWA Asset Generator

[pwastarter.love2dev.com](https://pwastarter.love2dev.com/) - has good commenting of which icons do what. And puts a lot into the manifest file. Useful.

[PWA Asset Generator](https://www.npmjs.com/package/pwa-asset-generator)

I'm using Razor Pages on .NET 5, deploying to an Azure App Service (Windows). Out of the box it is not a PWA, so lets make one.

Firstly we need to create a `manifest.json` file: [here is a good description on web.dev](https://web.dev/add-manifest/#create)

```json
{
  "name": "Portal PWA Test",
  "short_name": "Portal",
  "description": "A portal to show the status of the estate",
  "icons": [
    {
      "src": "assets/manifest-icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/manifest-icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "start_url": "/",
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "scope": "/"
}
```

Add a blank `index-template.html` file

Then add a starting image (in this case park.jpg)

```bash
# On a Windows machihe I had issues from the WSL side
# works fine from windows side
npm install --global pwa-asset-generator

# cd wwwroot
# Take park photo and generate an index file and manifest
# saving image assets into a folder
# use a square image at least 512x512 - possibly a png or svg better?
npx pwa-asset-generator park.jpg ./assets -i index-template.html -m manifest.json --favicon --mstile

```

This will:

- create 29 different images in the assets folder
- update `index-template.html` with `<meta>` links to appropriate images for iOS
- update `manifest.json` with the 2 required images for Android - 192x192 and 512x512
- create a favicon

## Checker

[realfavicongenerator.net/favicon_checker](https://realfavicongenerator.net/favicon_checker)

This has some suggestions, but we are targeting modern browsers, so can safely ignore some.

## Index.html

Here is a working `_Layout.cshtml` with annotations.

I'm being focussed on what matters to me. I recommend these courses which go into depth:

[Pluralsight 2 - Designing PWAs](https://app.pluralsight.com/library/courses/designing-progressive-web-apps/table-of-contents) and [Pluralsight 3 - Advanced PWAs](https://app.pluralsight.com/library/courses/advanced-progressive-web-apps/table-of-contents)

```html


```

## A2HS

[pwa-install](https://github.com/pwa-builder/pwa-install) web component provides a helper

[https://progressier.com/](https://progressier.com/) is very good especially with tne animated icon for iOS. However it does introduce a lot of complexity behind a commercial offering.

[https://pwadavetest.azurewebsites.net/](https://pwadavetest.azurewebsites.net/) is a working test version of progressier

## Service Worker

```js
// script.js
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }
});

// service-worker.js
/*
Copyright 2015, 2019, 2020 Google LLC. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";
// Customize this with a different URL if needed.
const OFFLINE_URL = "offline.html";

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            // Setting {cache: 'reload'} in the new request will ensure that the
            // response isn't fulfilled from the HTTP cache; i.e., it will be from
            // the network.
            await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
        })()
    );
    // Force the waiting service worker to become the active service worker.
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            // Enable navigation preload if it's supported.
            // See https://developers.google.com/web/updates/2017/02/navigation-preload
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    // We only want to call event.respondWith() if this is a navigation request
    // for an HTML page.
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    // First, try to use the navigation preload response if it's supported.
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    // Always try the network first.
                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                } catch (error) {
                    // catch is only triggered if an exception is thrown, which is likely
                    // due to a network error.
                    // If fetch() returns a valid HTTP response with a response code in
                    // the 4xx or 5xx range, the catch() will NOT be called.
                    console.log("Fetch failed; returning offline page instead.", error);

                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(OFFLINE_URL);
                    return cachedResponse;
                }
            })()
        );
    }

    // If our if() condition is false, then this fetch handler won't intercept the
    // request. If there are any other fetch handlers registered, they will get a
    // chance to call event.respondWith(). If no fetch handlers call
    // event.respondWith(), the request will be handled by the browser as if there
    // were no service worker involvement.
});


```

## URL Capture

Will not work on iOS with a browser installation.

## Other installation

Home Screen Shortcuts (Android) or Web Clips (Apple)
 no way to detect if installed
  - multiple installs possible
 - no url captures 
 - Apple configuration file


 Autogenerated PWA Launcher (Androd WebAPK)
 - native package
 - url capture can be available

 Manual PWA Launcher (TWA)
  - store rules
  - singleton
    - url capture
