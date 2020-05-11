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

## What is a Chrome Extension?

"Extensions are small software programs that customize the browsing experience. They enable users to tailor Chrome functionality and behavior to individual needs or preferences. They are built on web technologies such as HTML, JavaScript, and CSS." [source](https://developer.chrome.com/extensions)

[Wikipedia has a good overview](https://en.wikipedia.org/wiki/Google_Chrome#Extensions)

## Documentation

[developer.chrome.com](https://developer.chrome.com/home)

[samples](https://developer.chrome.com/extensions/samples) - page taking 30s to load!

## Chrome Web Store

Extensions are available through the Chrome Webstore.

[Chrome Webstore](https://chrome.google.com/webstore/category/extensions)

## Extensions I use / Commonly used ones

[LastPass: Free Password Manager](https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd)

[Check My Links](https://chrome.google.com/webstore/detail/check-my-links/ojkcdipcgfaekbeaelaapakgnjflfglf) from: [pagemodified.com]() by https://twitter.com/chasers [The Source is on GitHub](https://github.com/PageModifiedOfficial/Check-My-Links)

[Open Graph Preview](https://chrome.google.com/webstore/detail/open-graph-preview/ehaigphokkgebnmdiicabhjhddkaekgh?hl=en)

### Broken link checkers

This is the area I'm most interested in:

[Checkbot: SEO, Web Speed and Security Tester](https://chrome.google.com/webstore/detail/checkbot-seo-web-speed-se/dagohlmlhagincbfilmkadjgmdnkjinl) - excellent FAQ support site. Based in Edinburgh.

[SEO Minion](https://chrome.google.com/webstore/detail/seo-minion/giihipjfimkajhlcilipnjeohabimjhi) - 100k+ users

[Link Rediret Trace](https://chrome.google.com/webstore/detail/link-redirect-trace/nnpljppamoaalgkieeciijbcccohlpoh) - from linkresearchtools.com - 50k+ users

[3 broken link checkers](https://chrome.google.com/webstore/search/broken%20link%20checker) - but 71, 16, 18 stars only. 30k+ users

## How to develop resources

[How To Make Chrome Extensions - YouTube](https://youtu.be/Ipa58NVGs_c) and [Source Code](https://github.com/shama/letswritecode/tree/master/how-to-make-chrome-extensions)

```json
{
    "name": "bear",
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

asdf

Samples
https://developer.chrome.com/extensions/samples


## Can I use different languages to develop against it

asdf

## Is my source code protected

asdf

![alt text](/assets/2020-03-01/dbdiag.png "DB Diagram"){:width="600px"}

## Conclusion

