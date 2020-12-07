---
layout: post
title: Progressive Web Apps 
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

It is a website [that took all the right vitamins - google](https://web.dev/progressive-web-apps/)  and [Wikipedia](https://en.wikipedia.org/wiki/Progressive_web_application) page

The story of creating the coronovirus app [Nov 2020 article](https://medium.com/javascript-in-plain-english/making-a-pwa-with-literally-1-line-of-code-106a0e9405c8) sums up PWA's well:

> It is *ridiculously easy* to get started and *incredibly painful* to go all the way

They seem have done a good job finding all the edge cases, and have setup [progressier.com](https://progressier.com/) as a service to help others.

## When to use a PWA vs App

Good question!

A large subject with lots of articles eg [here](https://www.mobiloud.com/blog/progressive-web-apps-vs-native-apps)

Unquestionably PWAs are:

- Cheaper to develop
- Cheaper to maintain over time
- Lighter weight (less to install)
- Don't have to pay Apple/Google
- Less well known than apps
- Not quite as integrated eg push notifications on iOS [more info](https://love2dev.com/pwa/ios/)

If you have an app which is really a website, then maybe a PWA is a good fit.

## Where is it available

PWA's are only fully available as of 7th Dec 2020 on these OS/Browser configurations

- Windows+Chrome
- Windows+Edge
- MacOS+Chrome
- iOS+Safari
- Android+Chrome
- Android+Firefox(?)

If you use Firefox on Windows for example (as I do) then you can't install a PWA this way.

However my biggest use case for a PWA is on my iPhone, and even that is just to have a buton to launch it. I was using Chrome as my default browser on the phone, but had to use Safari to install the PWA.

## What does it do

> Creates a middle ground between a website and a mobile app.
> Can be accessed from the home screen (of a phone)

[credit](https://superpwa.com/) and more detail [from freecodecamp](https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/) on features:

- Install it on a mobile home screen (this is what I want!)
- Access it when offline
- Access the camera
- Get push notifications (not iOS)
- Background sync

For me the biggest feature is having it available as a button on the home screen of my phone, and having an inuitive way for users to install the app.

## How to test a PWA

And to know if the website is a PWA. It is difficult to tell unless you know what you're looking for.

<!-- [![alt text](/assets/2020-12-02/lighthouse.jpg "Lighthouse"){:width="500px"}](/assets/2020-12-02/lighthouse.jpg) -->
[![alt text](/assets/2020-12-02/chrome-plus.jpg "Chrome install"){:width="500px"}](/assets/2020-12-02/chrome-plus.jpg)

If the site is a PWA has a + it is installable

## Example PWAs

Here are some of the PWA's I've found and like. Number 1 has to go to Spotify where I prefer the PWA to the Metro app on Windows 10 as you can see more on the screen.

[https://open.spotify.com/](https://open.spotify.com/) - the PWA is better than the App (on Windows) in my opinion as can see more on the screen.

[https://mdn.github.io/pwa-examples/a2hs/](https://mdn.github.io/pwa-examples/a2hs/) Mozilla a2hs demo (only works in Chrome on Win 10)

[https://coronavirus.app/map](https://coronavirus.app/map) 

[https://squoosh.app/](https://squoosh.app/) - useful image editing

[https://twitter.com/](https://twitter.com/)

[https://app.starbucks.com/](https://app.starbucks.com/)

[https://m.uber.com/looking](https://m.uber.com/looking) Uber. For users on low-end devices and not supported by native client. App is tine (50k) enabling it to load on 2G network.

[https://www.pinterest.co.uk/](https://www.pinterest.co.uk/)

[https://www.trivago.co.uk/](https://www.trivago.co.uk/)


[https://web.dev/what-are-pwas/](https://web.dev/what-are-pwas/)

## A2HS - Add to Home Screen

[Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen) 

[Google in-app install expereience](https://web.dev/customize-install/)


Chrome [requires these criterial](https://web.dev/install-criteria/#criteria) before the + icon will display.

## Desktop Install

[![alt text](/assets/2020-12-02/chrome-install.jpg "Chrome install"){:width="500px"}](/assets/2020-12-02/chrome-install.jpg)

Can install the PWA by clicking the + in Chrome

[![alt text](/assets/2020-12-02/win10.jpg "Installed on Win10"){:width="500px"}](/assets/2020-12-02/win10.jpg)

Then we have a nicely installed 'app' on desktop

[![alt text](/assets/2020-12-02/search.jpg "Can search for the app"){:width="500px"}](/assets/2020-12-02/search.jpg)

Can search for it in Windows Search

## Progressier - PWA Builder Helpers

[![alt text](/assets/2020-12-02/ios.png "ios"){:width="300px"}](/assets/2020-12-02/ios.png)

[https://coronavirus.app/map](https://coronavirus.app/map) install is slick.


[https://progressier.com/](https://progressier.com/) with the [announcement on Reddit PWA](https://www.reddit.com/r/PWA/comments/k3pf0f/i_built_a_tool_that_makes_building_a_pwa_much/)

**HERE**


[https://github.com/docluv/add-to-homescreen](https://github.com/docluv/add-to-homescreen) Add to homescreen looks good


[https://pwastarter.love2dev.com/](https://pwastarter.love2dev.com/) generates assets too - couldn't get it to work well.





[https://www.pwabuilder.com/](https://www.pwabuilder.com/) ** dont use  OLD** tests the PWA

[https://www.pwabuilder.com/generate](https://www.pwabuilder.com/generate) - not quite as slick

[realfavicongenerator.net/favicon_checker](https://realfavicongenerator.net/favicon_checker) is good to check.

## Demo from Scratch

Lets make a free website that has cookie based authentication 

- Add to homescreen (iOS)
- Does a password mananger work
- Can the PWA cookie survive (as will be annoying to have to login every time)

[Chrome requires a service worker](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen)

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


[pwa-dave-test source code](https://github.com/djhmateer/pwa-dave-test) for this article

[https://pwadavetest.azurewebsites.net/](https://pwadavetest.azurewebsites.net/) live test site of demo code above
Google and Nvidia are moving away from the Apple App Store [news](https://9to5google.com/2020/11/19/stadia-will-be-playable-on-ios-via-safari-in-the-coming-weeks/)

[https://web.dev/progressive-web-apps/](https://web.dev/progressive-web-apps/)
