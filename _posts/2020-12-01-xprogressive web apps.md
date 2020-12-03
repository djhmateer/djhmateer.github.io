---
layout: post
title: Progressive Web Apps 
description: 
menu: review
categories: PWA FrontEnd 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

<!-- [![alt text](/assets/2020-11-26/file-new.jpg "File new project Razor Pages"){:width="800px"}](/assets/2020-11-26/file-new.jpg) -->

I've got a website I'm building for a client where they need to:

- View it well on their phones (mostly Apples and all iPhone 7+)
- Have a button on their homescreen to take them to the 'app'
- Have as much screen real estate as possible
- Login with a username/password

It is somewhat of an 'internal app', and so will be not be wanting to be found on an App Store, nor have many thousands of downloads. Initially it will be used by 10's of people.

Rather than make a full blown native app, lets see what a PWA can do.

[pwa-dave-test source code](https://github.com/djhmateer/pwa-dave-test) for this article

[https://pwadavetest.azurewebsites.net/](https://pwadavetest.azurewebsites.net/) live test site of demo code above

## What is a PWA

It is a specification.

[Nov 2020 PWA Dichotomy article](https://medium.com/javascript-in-plain-english/making-a-pwa-with-literally-1-line-of-code-106a0e9405c8)

[Building coronovirus.app](https://medium.com/javascript-in-plain-english/building-a-pwa-was-our-best-idea-ever-b7b233726b41) 

Google and Nvidia are moving away from the Apple App Store [news](https://9to5google.com/2020/11/19/stadia-will-be-playable-on-ios-via-safari-in-the-coming-weeks/)


[https://web.dev/progressive-web-apps/](https://web.dev/progressive-web-apps/)

## Where is it available

Only on these OS/Browser configurations:

- Windows+Chrome
- Windows+Edge
- MacOS+Chrome
- iOS+Safari
- Android+Chrome
- Android+Samsung Internet

> Creates a middle ground between a website and a mobile app.

> Can be accessed from the home screen (of a phone)

[credit](https://superpwa.com/)

And more detail [from freecodecamp](https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/)

- Install it on a mobile home screen
- Access it when offline
- Access the camera
- Get push notifications (not iOS)
- Background sync

## Why

Although there are benefits, I've found no canonical example of a good PWA without a backing App in a store too.

I wonder if this is just a user perception of how to install Apps.

## Stores and PWA Launchers

Google Play Store - can publish launchers using Trusted Web Activities

Microsoft Store Windows Apps

PWA Hybrid Packages - serivce workers wont be responsible for serving files.
 and need to publish the files in teh app store??

App Store
https://stackoverflow.com/questions/58689785/can-a-pwa-app-be-published-to-app-store-and-play-store


Why is this so hard?????

## Hybrid Apps


Uses a native packager like 

[Cordova](https://cordova.apache.org/) eg [ionic framework](https://ionicframework.com/) is a front end now in Vue which can target iOS.

[Capacitor](https://capacitorjs.com/) web native apps.. cross platform iOS, Android, PWA. Build by the ionic team


## PWA Builder Helpers

o[https://progressier.com/](https://progressier.com/) with the [announcement on Reddit PWA](https://www.reddit.com/r/PWA/comments/k3pf0f/i_built_a_tool_that_makes_building_a_pwa_much/)

[https://www.pwabuilder.com/generate](https://www.pwabuilder.com/generate)




## How to test a PWA

Use Chrome, Developer Tools, Lighthouse:

[![alt text](/assets/2020-12-02/lighthouse.jpg "Lighthouse"){:width="500px"}](/assets/2020-12-02/lighthouse.jpg)

If the PWA has a + it is installable

## Real life PWAs

[https://twitter.com/](https://twitter.com/)

[https://app.starbucks.com/](https://app.starbucks.com/)

[https://m.uber.com/looking](https://m.uber.com/looking) Uber. For users on low-end devices and not supported by native client. App is tine (50k) enabling it to load on 2G network.

[https://www.pinterest.co.uk/](https://www.pinterest.co.uk/)

[https://www.trivago.co.uk/](https://www.trivago.co.uk/)

[https://open.spotify.com/](https://open.spotify.com/) - the PWA is better than the App (on Windows) in my opinion as can see more on the screen.

[https://web.dev/what-are-pwas/](https://web.dev/what-are-pwas/)

## iOS Phone Install

Using safari



## Desktop Install


[![alt text](/assets/2020-12-02/chrome-install.jpg "Chrome install"){:width="500px"}](/assets/2020-12-02/chrome-install.jpg)

Can install the PWA by clicking the + in Chrome

[![alt text](/assets/2020-12-02/win10.jpg "Installed on Win10"){:width="500px"}](/assets/2020-12-02/win10.jpg)

Then we have a nicely installed 'app' on desktop

[![alt text](/assets/2020-12-02/search.jpg "Can search for the app"){:width="500px"}](/assets/2020-12-02/search.jpg)

Can search for it in Windows Search

## Demo

Lets make a free website that has cookie based authentication 

- Add to homescreen (iOS)
- Does a password mananger work
- Can the PWA cookie survive (as will be annoying to have to login every time)

## manifest.json

create in the wwwroot folder

```json
{
  "name": "PWA Dave Test",
  "short_name": "PWADaveTest",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/android-chrome-512x512.png",
      "type": "image/png",
      "sizes": "512x512"
    },
    {
      "src": "/apple-touch-icon.png",
      "type": "image/png",
      "sizes": "180x180"
    },
    {
      "src": "/favicon.ico",
      "type": "image/ico",
      "sizes": "32x32"
    },
    {
      "src": "/favicon-16x16.png",
      "type": "image/png",
      "sizes": "16x16"
    },
    {
      "src": "/favicon-32x32.png",
      "type": "image/png",
      "sizes": "32x32"
    },
    {
      "src": "/mstile-150x150.png",
      "type": "image/png",
      "sizes": "150x150"
    }
  ]
}

```

[Mads Kristensen tips](https://github.com/madskristensen/WebEssentials.AspNetCore.ServiceWorker)

> Get as many icons in various sizes as you want, but you MUST have both a 192x192 and a 512x512 size icon. Use PNG or JPEG.

[w3c.org spec](https://www.w3.org/TR/appmanifest/)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - PWADaveTest</title>

    <!-- from https://realfavicongenerator.net/ -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <!-- Win 8 and 10 Tile icon -->-->
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
```

## Checking

[realfavicongenerator.net/favicon_checker](https://realfavicongenerator.net/favicon_checker) is good to check.

## Service Worker

The Service Worker makes caching easy and defines some rules for if content is not available.

As I don't want my site to be available offline, I'm not using the Service worker... it seems to work, but ***check it**** test on all devices.


## Banner to 'Add to Homescreen'

[PWA: How to programmatically trigger: Add to homescreen on iOS Safari](https://stackoverflow.com/questions/51160348/pwa-how-to-programmatically-trigger-add-to-homescreen-on-ios-safari)

So it will not work on Chrome / Firebox on iOS.

## Adding PWA to Stores

[Can a PWA be published to the App Store or Play Store](https://stackoverflow.com/questions/58689785/can-a-pwa-app-be-published-to-app-store-and-play-store)

Looks like Apple App Store, a probable no. Google store yes using Trusted Web Activity.

## iOS

[2018 announcement](https://medium.com/@firt/progressive-web-apps-on-ios-are-here-d00430dee3a7) 

[2020 iOS 14 Changes](https://firt.dev/ios-14/)