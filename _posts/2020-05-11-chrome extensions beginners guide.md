---
layout: post
title: Chrome Extensions - Beginners Guide
description: 
menu: review
categories: 
published: false 
comments: false
sitemap: false
image: /assets/2020-03-01/dbdiag.png
---

In this article we will go:

- Start at the basics
- Install first local 'hello world' extension
- Explore what can be done
- Make a useful extension
- Deploy to Chrome Webstore

## What is a Chrome Extension

"Extensions are small software programs that customize the browsing experience. They enable users to tailor Chrome functionality and behavior to individual needs or preferences. They are built on web technologies such as HTML, JavaScript, and CSS." [source](https://developer.chrome.com/extensions)

[developer.chrome.com/extensions](https://developer.chrome.com/extensions) is the home

## Chrome Web Store

Extensions are available through the [Chrome Webstore](https://chrome.google.com/webstore/category/extensions)

## Extensions I use / Commonly used ones

[LastPass: Free Password Manager](https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd)

[Check My Links](https://chrome.google.com/webstore/detail/check-my-links/ojkcdipcgfaekbeaelaapakgnjflfglf) from: [pagemodified.com]() by https://twitter.com/chasers [The Source is on GitHub](https://github.com/PageModifiedOfficial/Check-My-Links)

[Open Graph Preview](https://chrome.google.com/webstore/detail/open-graph-preview/ehaigphokkgebnmdiicabhjhddkaekgh?hl=en)

### Broken link checkers

This is the area I'm most interested in:

[Checkbot: SEO, Web Speed and Security Tester](https://chrome.google.com/webstore/detail/checkbot-seo-web-speed-se/dagohlmlhagincbfilmkadjgmdnkjinl) - excellent FAQ support site. Based in Edinburgh.

[SEO Minion](https://chrome.google.com/webstore/detail/seo-minion/giihipjfimkajhlcilipnjeohabimjhi) - 100k+ users

[Link Redirect Trace](https://chrome.google.com/webstore/detail/link-redirect-trace/nnpljppamoaalgkieeciijbcccohlpoh) - from linkresearchtools.com - 50k+ users

[3 broken link checkers](https://chrome.google.com/webstore/search/broken%20link%20checker) - but 71, 16, 18 stars only. 30k+ users

## manifest.json

This instructs the browser

- expected behaviour ie where it shows up eg browser_action
- permissions
- resource files

## background.js

keep track of things

##  content.js

run javascript on the page that the user is on

## html / css

It is a full html page with css, sliders etc.. make it look great!

![alt text](/assets/2020-05-11/extension-full-html.jpg "Extension full html"){:width="500px"}

Here they are using the [bulma.io](https://bulma.io/documentation/) css toolkit.

The content policy is to block 3rd party js (unless defined in the manifest), so I guess that is why he is including the raw css for bulma.



## content_script/mask-process.js

This will run on the users page.

```js
console.log('Running any-mask ...');
```

## Development tools for the popup (inspect popup)

**lets call things popup, not popout as pluralsight guys do**

Think of it as its own website

## Publishing to Web Store

Since [2004](https://stackoverflow.com/questions/36042764/html-code-to-install-an-google-chrome-extension-crx) Chrome has not supported installs of extensions from any other location.


[It costs $5 to register](https://chrome.google.com/webstore/devconsole/register?hl=en-GB)


## Lets publish something trivial

Hello world lets publish and make it private!

## extension-hello-world-dm

manifest.json
folder structure

### sumbitting for review

[here are the faq guidelines](https://developer.chrome.com/webstore/faq#faq-listing-08). It says e

![alt text](/assets/2020-05-11/extension-review.jpg "extension review"){:width="300px"}


![alt text](/assets/2020-05-11/extension-delayed.jpg "extension delayed"){:width="300px"}


https://developer.chrome.com/extensions/activeTab

Ithen changed the permissions to:

```json
{
    "name": "Hello World DM",
    "version": "1.0",
    "description": "A hello world application to prove workflow into the Chrome Web Store",
    "manifest_version": 2,
    "browser_action": {
        "default_title": "Hello World DM",
        "default_popup": "./popup/popup.html",
        "default_icon": "helloworlddm.png"
    },
    "content_scripts": [
        {
            "matches": [ "https://davemateer.com/*" ],
            "js": [ "/content-script/hello.js" ]
        }
    ],
    "permissions": [
        "activeTab",
        "https://davemateer.com/*"
    ]
}
```

The submission UI seemed buggy in that it didn't like both the permissions of activeTab and the davemateer.com website (said it was too broad). Maybe I had to do one or the other. It seemed to submit itself and is now in 

![alt text](/assets/2020-05-11/extension-pending-review.jpg "extension pending review"){:width="600px"}

Actually it seemed to turn orange (the pending review text) after around 5 minutes. No emails received which I would have expected.


https://developer.chrome.com/apps/external_extensions

[chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole/)  The developer dashboard

**HERE - maybe have to submit it again with just the website and not the activeTab permission?** submitted

## From pluralsight continued

**delete this stuff out??**
pack it
can sign it
src.crx - packed


![alt text](/assets/2020-05-11/extension-working.jpg "email being redacted out"){:width="300px"}

## How to develop resources

[How To Make Chrome Extensions - YouTube](https://youtu.be/Ipa58NVGs_c) and [Source Code](https://github.com/shama/letswritecode/tree/master/how-to-make-chrome-extensions) is an excellent and in-depth introduction into Chrome extensions.

Every extension requires a `manifest.json` file.

```json
{
    "name": "bear",
    "description" : "The ultimate bear extension",
    "version":  "1.0",
    "manifest_version": 2
}
```

`chrome://extensions` and enable Developer mode

### Inject content into the page

```json
{
    "name": "bear",
    "version":  "1.0",
    "manifest_version": 2,
    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": ["content.js"]
        }
    ]
}
```

This content.js file is loaded into every page.

```js
// content.js
alert('Grrr.')
```

which gives on every page:

![alt text](/assets/2020-05-11/chrome-extension-alert-box.jpg "Chrome Extension Alert Box"){:width="500px"}

### Count how many times the word bear is displayed on a page

Put up a popup.html with a Count Bears button

```html
<!-- popup.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <button>Count Bears</button>
  <script src="popup.js" charset="utf-8"></script>
</body>
</html>
```

and the js that runs when the button is clicked:

```js
// popup.js
// add Event Listener to the document
// wait for everything to load
document.addEventListener('DOMContentLoaded', function () {

    // only 1 button (find bears) so this is the lazy way to find it
    document.querySelector('button').addEventListener('click', onclick, false)
    function onclick () {
      // looking for the current active tab open
      chrome.tabs.query({currentWindow: true, active: true}, 
      function (tabs) {
        // sending a message to our content tab - received by content.js function
        chrome.tabs.sendMessage(tabs[0].id, 'hi')
      })
    }
  }, false)
```

which then will display:

![alt text](/assets/2020-05-11/count-bears-popup.jpg "Count Bears Popup"){:width="400px"}

And as above this content.js is injected into all_urls

```js
// content.js
// when a message is sent we will get this function called here 
// alert this message out
chrome.runtime.onMessage.addListener(function (request) {
    alert(request)
})

```

![alt text](/assets/2020-05-11/count-bears-result.jpg "Count bears result"){:width="400px"}

So this is great as the content.js script has access to everything in the page.

```js
// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const re = new RegExp('bear', 'gi')
  const matches = document.documentElement.innerHTML.match(re)
  sendResponse({count: matches.length})
})
```

and then modify the popup.js to display the returned data of number of bears:

```js
// popup.js
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', onclick, false)
    function onclick () {
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        // third argument setCount is called when
        // sendResponse is called from the content.js side
        chrome.tabs.sendMessage(tabs[0].id, 'hi', setCount)
      })
    }
    function setCount (res) {
      const div = document.createElement('div')
      div.textContent = `${res.count} bears`
      document.body.appendChild(div)
    }
  }, false)
```

As you can see below, it worked!

![alt text](/assets/2020-05-11/count-bears-wikipedia.jpg "Count bears Wikipedia"){:width="400px"}

### background scripts

![alt text](/assets/2020-05-11/count-bears-background.jpg "Count bears background"){:width="400px"}

After visiting 3 pages, the extension can list the number of bears on each page I visited.

### Pluralsight Video

[Extending the Browser](https://app.pluralsight.com/library/courses/play-by-play-extending-browser/table-of-contents)

[chrome web store](https://chrome.google.com/webstore/category/extensions) 

[source code on GitHub](https://github.com/clarkio/azure-mask) - interestingly it is not available on the chrome webstore because of a trademark infringement. Ah, the joys of walled gardens. Can download an unpacked version fine for local use.




## Interesting API commands

This does seem rather overwhelming... so lets start with sample apps that do something similar to what I want to do (ie check broken links):


https://developer.chrome.com/extensions/samples#search:

- Download Images - doesn't seem to work in developer mode..?  selects all images though through a querySelectorAll('img')




## Can I use different languages to develop against it

asdf

## Is my source code protected

asdf

![alt text](/assets/2020-03-01/dbdiag.png "DB Diagram"){:width="600px"}

## Conclusion


[developer.chrome.com/extensions/samples](https://developer.chrome.com/extensions/samples) - is a great start however the page takes 30s to load