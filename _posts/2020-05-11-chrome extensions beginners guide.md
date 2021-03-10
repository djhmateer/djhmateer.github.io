---
layout: post
title: Chrome Extensions - Beginners Guide
description: What is a Chrome Extension, what are my favourites and how to get started developing them. Opinions on Google's walled garden verification process.
#menu: review
categories: Chrome 
published: true 
comments: true
sitemap: true
image: /assets/2020-05-11/extension-hello.jpg
---

This is a write up of *being curious* as to what Chrome Extension's are.

I hope you enjoy.

## What is a Chrome Extension

"Extensions are small software programs that customize the browsing experience. They enable users to tailor Chrome functionality and behavior to individual needs or preferences. They are built on web technologies such as HTML, JavaScript, and CSS." [source](https://developer.chrome.com/extensions)

![alt text](/assets/2020-05-11/extension-hello.jpg "Hello world"){:width="500px"}

Extensions icons are in the top right of the Chrome window.

![alt text](/assets/2020-05-11/extension-demo.jpg "A Chrome Extension source code"){:width="700px"}

A Chrome Extension is HTML, CSS and JavaScript ie **it is a little self contained website** [Demo source on GitHub](https://github.com/djhmateer/extension-hello-world-dm)

[developer.chrome.com/extensions](https://developer.chrome.com/extensions) is the documentation home and a good starting place.

## Chrome Web Store

[Chrome Web Store](https://chrome.google.com/webstore/category/extensions) is where you find and install extensions. This is the only way to install extensions [except for a few edge cases](https://developer.chrome.com/apps/external_extensions)

![alt text](/assets/2020-05-11/chrome-web-store.jpg "Chrome Web Store"){:width="500px"}

You can see what you've got installed locally by going to `chrome://extensions/`

![alt text](/assets/2020-05-11/chrome-extension.jpg "Chrome Extensions"){:width="600px"}

Here you can see `Developer Mode` is turned on and I've loaded a `Load unpacked` local extension.

Not to be confused with apps `chrome://apps` which are [being deprecated](https://www.theverge.com/2020/1/15/21067907/google-chrome-apps-end-support-lune-windows-macos-linux)

![alt text](/assets/2020-05-11/chrome-apps.jpg "Chrome Apps"){:width="300px"}

## Useful Extensions

The [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) doesn't make it easy to order by the most downloaded or the most starred. 

I recommend using the [Firefox Add-Ons most popular](https://addons.mozilla.org/en-GB/firefox/search/?recommended=true&sort=users&type=extension) as they share [a common API and one can port to the other](https://extensionworkshop.com/documentation/develop/porting-a-google-chrome-extension/)

- [Google Search Keyboard Shortcuts](https://chrome.google.com/webstore/detail/google-search-keyboard-sh/iobmefdldoplhmonnnkchglfdeepnfhd)  - adds keyboard shortcuts to Google search results eg Tab, then Alt-Enter to open search result  in new page. Essential - I use this all the time.

- [LastPass: Free Password Manager](https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd). Essential for password managing. [1Password or others are alternatives](https://www.wired.com/story/best-password-managers/)

- [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm) and [GitHub source](https://github.com/gorhill/uBlock) is a [good wide spectrum blocker](https://github.com/gorhill/uBlock/wiki/Blocking-mode) for websites including filtering 'badware' - sites that put users at risk on installing adware etc..

- [Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en) for vim shortcuts in Chrome and Firefox

- [Open Graph Preview](https://chrome.google.com/webstore/detail/open-graph-preview/ehaigphokkgebnmdiicabhjhddkaekgh?hl=en) for testing if Twitter Card / Open Graph previews work

- [Honey](https://chrome.google.com/webstore/detail/honey/bmnlcjabgnpnenekpadlanbbkooimhnj) for finding coupons. No idea if it works - am trying it. 10m+ users 155k stars.

- [https://www.fakespot.com/](https://www.fakespot.com/)

### Update 16th May

Thank you to everone who got back to me with their favourites, with some of them being:

- [Refined-GitHub](https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf?hl=en)

- [GitHub Dark Theme](https://chrome.google.com/webstore/detail/github-dark-theme/odkdlljoangmamjilkamahebpkgpeacp?hl=en)

- [Super Dark Mode](https://chrome.google.com/webstore/detail/super-dark-mode/nlgphodeccebbcnkgmokeegopgpnjfkc?hl=en-GB)

- [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en)

- [I don't care about cookies](https://chrome.google.com/webstore/detail/i-dont-care-about-cookies/fihnjjcciajhdojfnbdddfaoknhalnja?hl=en) - stops the EU/GDPR 'Do you accept these cookies' messages. **I'm using this now**

- [Disconnect](https://chrome.google.com/webstore/detail/disconnect/jeoacafpbcihiomhlakheieifhpjdfeo?hl=en) privacy ad blocker. 700k users, 3500 stars

- [Ghostery](https://chrome.google.com/webstore/detail/ghostery-%E2%80%93-privacy-ad-blo/mlomiejdfkolichcflejclcbmpeaniij?hl=en) privacy ad blocker. 2m users 13k stars

- [Bitwarden](https://chrome.google.com/webstore/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb?hl=en) Free Password Manager

- [Privacy badger](https://chrome.google.com/webstore/detail/privacy-badger/pkehgijcmpdhfbdbbnkijodmdjhbjlgp) Stops sites tracking you. 1m+ users. 1500 stars. Offered by the eff. **I'm using this now**

- [Feedbro](https://chrome.google.com/webstore/detail/feedbro/mefgmmbdailogpfhfblcnnjfmnpnmdfa?hl=en-GB) RSS reader

- [OmniBear](https://chrome.google.com/webstore/detail/omnibear/cjieakdeocmiimmphkfhdfbihhncoocn?hl=en) micro publication 

And someone said 'My favourite [Chrome] extension is Firefox'!

### Broken Link Checkers

This is the area I'm most interested in at the moment, so I focussed in on this domain to see if writing a Chrome Extension would be useful in my business.

- [Check My Links](https://chrome.google.com/webstore/detail/check-my-links/ojkcdipcgfaekbeaelaapakgnjflfglf) from: [pagemodified.com](https://www.pagemodified.com) by [@chasers](https://twitter.com/chasers) with [The Source on GitHub](https://github.com/PageModifiedOfficial/Check-My-Links)

- [Checkbot: SEO, Web Speed and Security Tester](https://chrome.google.com/webstore/detail/checkbot-seo-web-speed-se/dagohlmlhagincbfilmkadjgmdnkjinl) - excellent FAQ in their support site.

- [SEO Minion](https://chrome.google.com/webstore/detail/seo-minion/giihipjfimkajhlcilipnjeohabimjhi) - 100k+ users

- [Link Redirect Trace](https://chrome.google.com/webstore/detail/link-redirect-trace/nnpljppamoaalgkieeciijbcccohlpoh) - from [linkresearchtools.com](https://linkresearchtools.com) - 50k+ users

- [3 broken link checkers](https://chrome.google.com/webstore/search/broken%20link%20checker) - but 71, 16, 18 stars only. 30k+ users

## Develop a Chrome Extension- YouTube Video - Bears count

[How To Make Chrome Extensions - YouTube](https://youtu.be/Ipa58NVGs_c) and [Source Code](https://github.com/shama/letswritecode/tree/master/how-to-make-chrome-extensions) is an excellent and in-depth introduction into Chrome extensions. I've included some of the highlights here with comments, mainly so if I forget this in the future, I came coma back to this article :-)

Initially the extension puts up an alert box, then goes on to Count the word Bear on each webpage. It does this by passing messages between the extension and the page.

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

1153 instances of the word Bear on the Wikipedia page about bears.

![alt text](/assets/2020-05-11/count-bears-background.jpg "Count bears background"){:width="700px"}

After visiting 3 pages, the extension can list the number of bears on each page I visited using a background script.

## Pluralsight Video - Redact out information

[Pluralsight Extending the Browser video](https://app.pluralsight.com/library/courses/play-by-play-extending-browser/table-of-contents) has an example on redacting out important information from the Azure Portal. 

![alt text](/assets/2020-05-11/extension-working.jpg "email being redacted out"){:width="300px"}

Shown in here is my email address being redacted out.

[source code on GitHub](https://github.com/clarkio/azure-mask) - interestingly it is not available on the chrome webstore because of a trademark infringement. Ah, the joys of walled gardens, which I'll get to below. Can download an unpacked version fine for local use.

I like to call popups, popups, not popouts as the authors do in this video.

## Publishing to Web Store

Since [2004](https://stackoverflow.com/questions/36042764/html-code-to-install-an-google-chrome-extension-crx) Chrome has not supported installs of extensions from any other location.

[It costs $5 to register](https://chrome.google.com/webstore/devconsole/register?hl=en-GB) and [here are the faq guidelines](https://developer.chrome.com/webstore/faq#faq-listing-08)

![alt text](/assets/2020-05-11/extension-review.jpg "extension review"){:width="300px"}

![alt text](/assets/2020-05-11/extension-delayed.jpg "extension delayed"){:width="300px"}

The submission UI seemed buggy in that it didn't like both the permissions of activeTab and the davemateer.com website (said it was too broad). Maybe I had to do one or the other.

![alt text](/assets/2020-05-11/extension-pending-review.jpg "extension pending review"){:width="600px"}

Actually it seemed to turn orange (the pending review text) after around 5 minutes. No emails received which I would have expected. It took about 18 hours to be reviewed and was rejected. I tried again with better icons, better description and a narrower permission of only my website instead of activeTab as well. It was rejected again with the same message. It seems this is an automated process, and I didn't want to push forward anymore.

[chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole/)  The developer dashboard

## Extension Samples

[Extension samples](https://developer.chrome.com/extensions/samples#search:) is a good place to look into source code for things you want to do.

## Can I use different languages to develop against it

[It looks like WebAssembly can work](https://stackoverflow.com/questions/49611290/using-webassembly-in-chrome-extension) but who knows if you could get it into the web store.

## Is my source code protected

[No it doesn't look like it](https://crxextractor.com/) and google is apparently blocking code that is obfuscated.

## Conclusion

I love the Chrome extensions I use daily:

- [Google Search Keyboard Shortcuts](https://chrome.google.com/webstore/detail/google-search-keyboard-sh/iobmefdldoplhmonnnkchglfdeepnfhd)
- [LastPass: Free Password Manager](https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd) 
- [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm)
- [Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en)

The biggest problem I have on creating my own extensions is pushing to the Chrome Web Store and [being at their mercy](https://news.ycombinator.com/item?id=23168874). My ventures are more suited to being on a server.

So that ends my look at at Chrome Extensions for now.

I enjoy having a *curious mind* as:

> "Time spent on reconnaissance is seldom wasted." (Duke of Wellington, Waterloo)
