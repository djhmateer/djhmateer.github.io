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

Here we will build a PWA from scratch with the following features:

- Offline page displayed when offline (ServiceWorker)
- Splash screen images for iOS and others (manifest.json and meta tags)
- Add to Home Screen instructions (A2HS)
- Lightweight fast loading site (minimal css and VanillaJS)
- Commenting all the tags

[Source project portal-pwa-test on Github](https://github.com/djhmateer/portal-pwa-test)

[Live demo portalpwatest.azurewebsites.net](https://portalpwatest.azurewebsites.net/) - try installing from your browser, phone, try testing offline, checkout lighthouse

## Create your blank site

I'm using Razor Pages on .NET 5, deploying to an Azure App Service (Windows), purely as that is what U'm comfortable with. It doesn't matter what back end tech you use.

## Manifest.json

Firstly we need to create a `manifest.json` in our webroot: [here is a good description on web.dev](https://web.dev/add-manifest/#create)

Don't worry about the "icons" below we will overwrite these below.

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

## Create images

Because different OS/browsers have different implementations, we need a number of different image sizes to make a PWA work.

[PWA Asset Generator](https://www.npmjs.com/package/pwa-asset-generator) is an automated tool to created all the images

Add a blank `index-template.html` file so we can then copy the relevant bits into our `Shared\_Layout.cshtml` file

Choose your starting logo (in this case epark.jpg). A SVG image is ideal, although anything bigger than 512*512 and square should be fine.

```bash
# On a Windows machihe I had issues with the generator from the WSL2 side. Works fine from cmd.
npm install --global pwa-asset-generator

# 4.0.1 on the 18th Dec 2020
npm list -g --depth=0

npm update pwa-asset-generator

# cd wwwroot
# Take park photo and generate an index file and manifest
# saving image assets into a folder
# use a square image at least 512x512 - possibly a png or svg better?
# there is a default padding of 10
#npx pwa-asset-generator epark.jpg ./assets -i index-template.html -m manifest.json --favicon --background dimgrey --padding "0"

# generate transparent favicon with no padding (so that Windows Chrome icon is as big as possible)
npx pwa-asset-generator santa-claus.svg ./assets -i index-template.html -m manifest.json --opaque false --icon-only --favicon --type png --padding "0"

# overwrite 2 manifest icons and apple-icon-180.png with a background colour
# have a default 10 padding so that phone icons have a border (which looks good)
npx pwa-asset-generator santa-claus.svg ./assets -i index-template.html -m manifest.json --background "#696969" 
```

This will:

- create 29 different images in the assets folder
- update `index-template.html` with `<meta>` links to appropriate images for iOS
- update `manifest.json` with the 2 required images for Android - 192x192 and 512x512
- create a favicon.png


Maskable icons are generated for android ie the manifest-icon-192.png files. [https://maskable.app/](https://maskable.app/). This is a good thing....google around for more info!

## Index.html

Here is a working `_Layout.cshtml` with annotations.

I'm being focussed on what matters to me. I recommend these courses which go into depth:

[Pluralsight 2 - Designing PWAs](https://app.pluralsight.com/library/courses/designing-progressive-web-apps/table-of-contents) and [Pluralsight 3 - Advanced PWAs](https://app.pluralsight.com/library/courses/advanced-progressive-web-apps/table-of-contents)

```html


```

## Service Worker

In the `<head>` of my html I have a:

```html
<!-- the webpage's js file which will load the service worker -->
<script src="/script.js" asp-append-version="true" defer></script>
```

which loads:

```js
// https://web.dev/offline-fallback-page/#registering-the-service-worker
// register the service worker once the page has loaded
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
        console.log("registered service-worker.js");
    }
});
```

and then the `service-worker.js`.

The concept is that we want to cache only the `offline.html` page that gets served on failing navigation requests, and to let the browser handle all other cases.

```js

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

install event
activate event
fetch event runs a lot

## Chrome open dev tools automatically

To keep the dev tools open all the time, launch Chrome from the command line:

```bash
cd C:\Program Files\Google\Chrome\Application
Chrome --auto-open-devtools-for-tabs
```

## service workers

The core feature discussed in this tutorial is the ability to intercept and handle network requests, including programmatically managing a cache of responsesk

`chrome://serviceworker-internals`

[How to unregister](https://love2dev.com/blog/how-to-uninstall-a-service-worker/)

[chrome://serviceworker-internals/](chrome://serviceworker-internals/)

Service workers are used by sites that are not PWA's.


**HERE** https://developers.google.com/web/fundamentals/primers/service-workers



`https://developers.google.com/sw.js`


## Offline fallback page

As seen above we now have an offline.html page.

[Source code on web.dev is here](https://web.dev/offline-fallback-page/#the-offline-fallback-page)

Interestinly we need to cache all resources required by your offline page, so they inline styles and js.

## A2HS

[pwa-install](https://github.com/pwa-builder/pwa-install) web component provides a helper

[https://progressier.com/](https://progressier.com/) is very good especially with tne animated icon for iOS. However it does introduce a lot of complexity behind a commercial offering.

[https://pwadavetest.azurewebsites.net/](https://pwadavetest.azurewebsites.net/) is a working test version of progressier

## URL Capture

Will not work on iOS with a browser installation.

## Lighthouse

[![alt text](/assets/2020-12-02/lighthouse2.jpg "PWA"){:width="600px"}](/assets/2020-12-02/lighthouse2.jpg)

Run lighthouse in Incognito. As I'm running Bootstrap 4, I'm getting opportunities to Eliminate render-blocking resources when loading the css. bootstrap.min.css is 148k. Bootstrap 5 is 20.7k

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

## Links

[pwastarter.love2dev.com](https://pwastarter.love2dev.com/) - has good commenting of which icons do what. And puts a lot into the manifest file. Useful.