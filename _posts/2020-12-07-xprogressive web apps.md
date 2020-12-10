---
layout: post
title: Progressive Web Apps - Beginners Guide
description: 
menu: review
categories: PWA FrontEnd 
published: true 
comments: false     
sitemap: false
image: /assets/2020-12-02/ios2.png
---

[![alt text](/assets/2020-12-02/ios2.png "PWA"){:width="300px"}](/assets/2020-12-02/ios2.png)

[https://coronavirus.app/map](https://coronavirus.app/map) is a great example of a Progressive Web App (PWA) here prompting to install on an iPhone 7.

## What is a PWA

It is a website [that took all the right vitamins - Google](https://web.dev/progressive-web-apps/)  and [Wikipedia](https://en.wikipedia.org/wiki/Progressive_web_application) page

The story of creating the coronovirus app [Nov 2020 article](https://medium.com/javascript-in-plain-english/making-a-pwa-with-literally-1-line-of-code-106a0e9405c8) sums up PWA's well:

> It is *ridiculously easy* to get started and *incredibly painful* to go all the way

They seem have done a good job finding all the edge cases, and have setup [progressier.com](https://progressier.com/) as a service to help others.

> Creates a middle ground between a website and a mobile app.
> Can be accessed from the home screen (of a phone)

[Quote](https://superpwa.com/) and more detail [from freecodecamp](https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/) on features:

- Install it on a mobile home screen (this is what I want!)
- Access it when offline
- Access the camera
- Get push notifications (not iOS)
- Background sync

For me the biggest feature is having it available as a button on the home screen of my phone, and having an inuitive way for users to install the app.

How to know if a website is a PWA? It is difficult to tell unless you know what you're looking for.

[![alt text](/assets/2020-12-02/chrome-install.jpg "Chrome install"){:width="500px"}](/assets/2020-12-02/chrome-install.jpg)

On Chrome - the site is a PWA if it has a + on the address bar

## Where is it available

PWA's are only fully available as of 7th Dec 2020 on these OS/Browser configurations

- Windows+Chrome
- Windows+Edge
- MacOS+Chrome
- iOS+Safari (iOS 13 for service workers)
- Android+Chrome
- Android+Firefox(?)

[Firt.dev full list](https://firt.dev/pwa-2020#android)

If you use Firefox on Windows for example (as I do) then you can't install a PWA this way.

However my biggest use case for a PWA is on my iPhone, and even that is just to have a buton to launch it. I was using Chrome as my default browser on the phone, but had to use Safari to install the PWA.

## When to use a PWA vs Native App

[Good question - great detailed answer here](https://firt.dev/pwa-vs-native-web/)

A large subject with lots of articles eg [here](https://www.mobiloud.com/blog/progressive-web-apps-vs-native-apps)

Unquestionably PWAs are:

- Cheaper to develop
- Cheaper to maintain over time
- Lighter weight (less to install)
- Don't have to pay Apple/Google
- Less well known than apps
- Not quite as integrated eg push notifications on iOS [more info](https://love2dev.com/pwa/ios/)

If you have an app which is really a website, then maybe a PWA is a good fit.

## Real life PWAs

Here are some of the PWA's I've found and like. Number 1 has to go to Spotify which I prefer to the App (on my desktop)

[https://open.spotify.com/](https://open.spotify.com/) - the PWA is better than the App (on Windows) in my opinion as can see more on the screen.

[https://mdn.github.io/pwa-examples/a2hs/](https://mdn.github.io/pwa-examples/a2hs/) Mozilla Fox A2HS demo 

[https://coronavirus.app/map](https://coronavirus.app/map)

[https://squoosh.app/](https://squoosh.app/) - useful image editing

[https://twitter.com/](https://twitter.com/)

[https://app.starbucks.com/](https://app.starbucks.com/)

[https://m.uber.com/looking](https://m.uber.com/looking) Uber. For users on low-end devices and not supported by native client. App is tine (50k) enabling it to load on 2G network.

[https://www.pinterest.co.uk/](https://www.pinterest.co.uk/)

[https://www.trivago.co.uk/](https://www.trivago.co.uk/)

[https://web.dev/what-are-pwas/](https://web.dev/what-are-pwas/)

[awesome-pwa](https://github.com/hemanth/awesome-pwa) - is a full list of examples and many other resources.

## A2HS - Add to Home Screen

This is the biggest feature I want for my PWA, so lets dig into it and get the simplest possible thing working first.

[Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen) 

[Google in-app install expereience](https://web.dev/customize-install/)

Chrome [requires these criterial](https://web.dev/install-criteria/#criteria) before the + icon will display.

- App not already installed
- HTTPS
- A web app manifest.json
- Register a service worker with a functional fetch handler (mid 2020 the sw must return a valid response when the device is offline)

## Generate Images

[Onder Ceylan's blog post](https://itnext.io/pwa-splash-screen-and-icon-generator-a74ebb8a130) gives great detail on

[PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator) helps generate icons, and splash screens. Then generates the html and manifest.json sections.

```bash
npm install --global pwa-asset-generator

npx pwa-asset-generator landscape2.jpg ./assets -i ./index.html -m ./manifest.json

npx pwa-asset-generator landscape2.jpg ./assets -i ./index-template.html -m ./manifest.json

```

icons - on homescreen
Splash screens - for installing (eg iPhone) and task viewer

## Demo from Scratch

**HERE** https://firt.dev/pwa-2020#ios-and-ipados

Generate icons and a web manifest [PWA Manifest Generator](https://www.simicart.com/manifest-generator.html/) - this just generated 4 icons. Fine

[PWA Splash Screen](https://itnext.io/pwa-splash-screen-and-icon-generator-a74ebb8a130) using Puppeteer under the hood looks far more robust

```bash

sudo npm install -g npm@latest


# this needs node >= 10.12.0 (ideally we are on 14.15.1 this is LTS)
sudo npm install --global pwa-asset-generator

# hmmm I'm on 
# node 8.10.0
# npm 6.14.9

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -


pwa-asset-generatator logo.

```





[Demo using Progressier]() is an easier way to get started. However you need to pay for custom branding, and I'd much rather the simplicity of being in charge of the experience. Specifically when looking at js errors whilst using ad=blockers, and working with designers keeping things simple is paramount.

Lets make a free website on Azure and test the simplest possible implementation

- Add to homescreen (A2HS) on iPhone7 and Chrome desktop

[Mads Kristensen - WebEssentials.AspNetCore.ServiceWorker](https://github.com/madskristensen/WebEssentials.AspNetCore.ServiceWorker) wrote a nice service worker plugin which includes a simple tutorial on getting a PWA working.

[PWA-Starter from the Microsoft Edge team](https://github.com/pwa-builder/pwa-starter)

Even though I don't need a service worker yet, [chrome requires a service worker](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen) to kick off the A2HS + install button.

Kicking off from scratch I found quite hard [c2experience](https://www.c2experience.com/blog/how-to-turn-your-website-into-a-pwa-with-code-examples) sums it up well.

## Generate images and site.webmanifest

[realfavicongenerator.net](https://realfavicongenerator.net/) - upload a square image which will then generate these images to be put in the root

linked from the index.html

- apple-touch-icon.png (apple devices)
- favicon-32x32.png
- favicon-16x16.png
- safari-pinned-tab.svg
- favicon.ico (default)
- mstile-150x150.png (linked from browserconfix.xml introduced in IE11 only loaded for Win8 devices) [SO Question](https://webmasters.stackexchange.com/a/131437/102046)

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
```

Interestingly it recommends putting images in the root

Then it generates a sample `site.webmanifest` which I'll rename to `manifest.json` to make Mad's library happier below. Remember to update the link in the head.


images linked from site.webmanifest

- android-chrome-192x192.png (have to have this size)
- android-chrome-384x384.png
- android-chrome-512x512.png (have to have this size)

```json
{
    "name": "",
    "short_name": "",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-384x384.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone"
}
```

Notice, I added start_url for Mad's code below. And added a 512x512 icon.

[https://realfavicongenerator.net/favicon_checker](https://realfavicongenerator.net/favicon_checker) to make sure they are all good.

## WebEssentials.AspNetCore.PWA

Install the nuget package.






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
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">c
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <!-- Win 8 and 10 Tile icon -->-->
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
```

## Checking

[https://developers.google.com/speed/pagespeed/insights/](https://developers.google.com/speed/pagespeed/insights/) - like lighthouse but for web


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

## Resources

[3 Pluralsight courses by Maximiliano Firtman](https://app.pluralsight.com/profile/author/maximiliano-firtman)

Shortcut or Web Clip (iOS) - mobile devices only.

- no way to detect if it's installed
- multiple installations possible
- no URL capture available (if receive an email or WhatsApp it wont open the PWA)

Autogenerated PWA launcher eg WebAPK on Android and local desktop Chrome and Edge

- package created and signed by the browser
- singleton instances
- url capture can be available
- no way to detect if its installed
- os and browser don't remember (eg on recovery of iphone)

Manual PWA Launcher - app stores eg Play Store TWA (Trusted Web Activity), App Store with Web View

- package created and published by the dveloper
- singleton installations
- url capture can be available
- iphone recovery will work

Smart App Banner
meta tag useful only for iOS
to promote App Store installation

Hack to make sure the manifest and icon is downloaded for safari
  so that the share button will work

don't put in `<meta name="apple-mobile-web-app-capable">` which is an old pre app manifest tag.


naviagtion preload - perf

Web Share - safari...integrate with the share mechanism within the OS

  share text, url, file
    airdrop, copy to clipboard..

links
applenewss://domain.path/url
facetime-audio://phone-or-email







[pwa-dave-test source code](https://github.com/djhmateer/pwa-dave-test) for this article

[https://pwadavetest.azurewebsites.net/](https://pwadavetest.azurewebsites.net/) live test site of demo code above
Google and Nvidia are moving away from the Apple App Store [news](https://9to5google.com/2020/11/19/stadia-will-be-playable-on-ios-via-safari-in-the-coming-weeks/)

[https://web.dev/progressive-web-apps/](https://web.dev/progressive-web-apps/)

## Desktop Install 

Can install the PWA by clicking the + in Chrome

[![alt text](/assets/2020-12-02/win10.jpg "Installed on Win10"){:width="500px"}](/assets/2020-12-02/win10.jpg)

Then we have a nicely installed 'app' on desktop

[![alt text](/assets/2020-12-02/search.jpg "Can search for the app"){:width="500px"}](/assets/2020-12-02/search.jpg)

Can search for it in Windows Search


## PWA Builder Helpers

[![alt text](/assets/2020-12-02/ios.png "ios"){:width="300px"}](/assets/2020-12-02/ios.png)

[https://coronavirus.app/map](https://coronavirus.app/map) install is slick.


[https://progressier.com/](https://progressier.com/) with the [announcement on Reddit PWA](https://www.reddit.com/r/PWA/comments/k3pf0f/i_built_a_tool_that_makes_building_a_pwa_much/)

**HERE**


[https://github.com/docluv/add-to-homescreen](https://github.com/docluv/add-to-homescreen) Add to homescreen looks good


[https://pwastarter.love2dev.com/](https://pwastarter.love2dev.com/) generates assets too - couldn't get it to work well.





[https://www.pwabuilder.com/](https://www.pwabuilder.com/) ** dont use  OLD** tests the PWA

[https://www.pwabuilder.com/generate](https://www.pwabuilder.com/generate) - not quite as slick

[realfavicongenerator.net/favicon_checker](https://realfavicongenerator.net/favicon_checker) is good to check.

[https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs)



ublock origin is causing js errors
    it's a bit of a pain with JS complexity
it's good for iPhone users!!!!
remove cookies and service worker to get back prompt
 check reddit again
