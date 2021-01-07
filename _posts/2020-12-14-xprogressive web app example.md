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

- Add to Home Screen prompt (A2HS) for iOS
- Splash screen images for iOS and others (manifest.json and meta tags)
- Offline page displayed when lost connection (ServiceWorker)
- Lightweight site (Bootstrap CSS and VanillaJS) with no external PWA dependencies

[Source project portal-pwa-test on Github](https://github.com/djhmateer/portal-pwa-test)

[Live demo portalpwatest.azurewebsites.net](https://portalpwatest.azurewebsites.net/) - try installing from your browser, phone, try testing offline, checkout lighthouse

## Create your blank site

I'm using Razor Pages on .NET 5, deploying to an Azure App Service (Windows), purely as that is what I'm comfortable with. It doesn't matter what back end you use.

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

[PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator) is an automated tool to created all the images. [It may be that we can simplify using svgs](https://news.ycombinator.com/item?id=25520655) instead of lots of apple images.

Add a blank `index-template.html` file so we can then copy the relevant bits into our `Shared\_Layout.cshtml` file

Choose your starting logo (in this case santa-claus.svg). An SVG image is ideal, although anything bigger than 512*512 and square should be fine.

```bash
# I'm using the 14.15.1 LTS version of Node which has NPM version of 6.14.10
# update npm if a patch available
npm install npm@latest -g

# On a Windows machihe I had issues with the generator from the WSL2 side. Works fine from cmd.
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md more info here
npm install --global pwa-asset-generator

# 4.0.1 on the 18th Dec 2020
npm list -g --depth=0

npm update -g pwa-asset-generator

# cd wwwroot
# Take park photo and generate an index file and manifest
# saving image assets into a folder I'm incrementing a suffix to bust caches
# https://github.com/onderceylan/pwa-asset-generator/issues/318#issuecomment-748856292
# use a square image at least 512x512 - possibly a png or svg better?
# there is a default padding of 10
#npx pwa-asset-generator epark.jpg ./assets -i index-template.html -m manifest.json --favicon --background dimgrey --padding "0"

# generate transparent favicon with no padding (so that Windows Chrome icon is as big as possible)
npx pwa-asset-generator santa-claus.svg ./assets24 -i index-template.html -m manifest.json 
    --opaque false --icon-only --favicon --type png --padding "0"

# But I only want favicon-196.png to be transparent and with no padding so
# overwrite 2 manifest icons and apple-icon-180.png with a background colour (gray)
# have a default 10 padding so that phone icons have a border (which looks good)
npx pwa-asset-generator santa-claus.svg ./assets24 -i index-template.html -m manifest.json --background "#696969" 
```

This will:

- create 29 different images in the assetsx folder
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

"A service worker is a type of web worker. It's essentially a JavaScript file that runs separately from the main browser thread, intercepting network requests, caching or retrieving resources from the cache, and delivering push messages." [source](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker#:~:text=A%20service%20worker%20is%20a,cache%2C%20and%20delivering%20push%20messages.)

To link up my Service Worker, in the `<head>` of my html I have:

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

The concept is that we want to cache only the `offline.html` page that gets served on failing navigation requests, and to let the browser handle all other cases. To allow a PWA to be installable in Chrome we need a sw registered.

I'm going try as hard as possible to make a lightweight app with as little caching as possible, to avoid issues in production

[How to unregister](https://love2dev.com/blog/how-to-uninstall-a-service-worker/)

[chrome://serviceworker-internals/](chrome://serviceworker-internals/)

Service workers are used by sites that are not PWA's.

**HERE** https://developers.google.com/web/fundamentals/primers/service-workers

`https://developers.google.com/sw.js`

## A2HS

My primary use case for a PWA is on Apple iPhones (>7) to give a quick way into my portal website. To allow my users the best possible experience I want to help them 'install the app icon' onto the home screen.

This is a pain if you're on Apple as it is a few non-untuitive button presses. Will some nice banners, I think it should be fairly simple.

A2HS is a thorny subject, as most people don't want to be bothered by popups.

[https://web.dev/customize-install/](https://web.dev/customize-install/) 

[https://web.dev/promote-install/](https://web.dev/promote-install/)

[https://www.netguru.com/codestories/pwa-ios](https://www.netguru.com/codestories/pwa-ios)


[https://github.com/macap/hodl](https://github.com/macap/hodl) and his live app [here](https://hodl-63c3a.firebaseapp.com/)

```js


```

To see the console.log output in Safari on an iPhone, you have to connect your phone to a mac then and [follows these lifewire instructions](https://www.lifewire.com/activate-the-debug-console-in-safari-445798) 

Then you should see this:

<p align="center">
    <img src="/assets/2020-12-02/mac.png" alt="Mac">
</p>

So this is great, we can now catch when we want an iOS banner to appear.

Alterntively, [dump console.out to html](https://stackoverflow.com/questions/20256760/javascript-console-log-to-html)

[https://progressier.com/](https://progressier.com/) is very good especially with tne animated icon for iOS. However it does introduce a lot of complexity behind a commercial offering.

[https://pwadavetest.azurewebsites.net/](https://pwadavetest.azurewebsites.net/) is a working test version of progressier

### Paths to test

Happy paths

iPhone7 Safari not installed
iPhone7 Safari installed

Windows Chrome not installed
Windows Chrome installed

## URL Capture

Will not work on iOS with a browser installation.

## Lighthouse

[![alt text](/assets/2020-12-02/lighthouse2.jpg "PWA"){:width="600px"}](/assets/2020-12-02/lighthouse2.jpg)

Run lighthouse in Incognito. As I'm running Bootstrap 4, I'm getting opportunities to Eliminate render-blocking resources when loading the css. bootstrap.min.css is 148k. Bootstrap 5 is 20.7k

## Chrome open dev tools automatically

To keep the dev tools open all the time, launch Chrome from the command line:

```bash
cd C:\Program Files\Google\Chrome\Application
Chrome --auto-open-devtools-for-tabs
```

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
