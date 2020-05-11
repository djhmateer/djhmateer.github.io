---
layout: post
title: Puppeteer by example
description: 
menu: review
categories: Puppeteer Testing
published: false 
comments: false     
sitemap: false
image: /assets/2020-04-28/bashtop-screenshot.jpg 
---

<!-- ![alt text](/assets/2020-04-28/bashtop-screenshot.jpg "Bashtop screenshot") -->

I'm writing a broken link checker and wanted to explore the use of an automated browser strategy like: [Puppeteer](https://pptr.dev/)

1. [Puppeteer for the C# Guy](/2020/05/06/Puppeteer-and-JavaScript-for-the-C-guy)
2. [Puppeteer by Example](/2020/05/06/Puppeteer-by-Example) - this post

[Sample code]()

[Puppeteer - https://pptr.dev](https://pptr.dev/) documentation

## 1 - Screenshot to png/jpg

Navigate to https://example.com and save a screenshot

```js
const puppeteer = require('puppeteer');

// IIFE
// Immediately Invoked Functional Expression
(async () => {
  // awaiting the promises to complete
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```

Starting from v3.0.0 of Puppeteer (we are on 3.0.2) we rely on [Node 10.18.1](https://nodejs.org/en/blog/release/v10.18.1/) which was released on 9th Jan 2020. Node.js I have installed is 12.16.3 LTS

## 2 - Headless false

- Using headless: false to see the browser in real time which is very useful for debugging
- Setting defaultViewport so can see everything
- Rewriting as an async function for more clarity

```js
const puppeteer = require('puppeteer');

// async functions came in ES8 - ECMAScript 2017
async function run() {
  // to see the whole screen and view it
  const browser = await puppeteer.launch({ defaultViewport: null, headless: false });
  const page = await browser.newPage();
  await page.goto('https://davemateer.com');
  // defaults to 800*600 screenshot
  await page.screenshot({ path: 'example.png' });
  await browser.close();
}
run();
```

## 3 - CSS Selectors

[Modern Web Testing and Automation with Puppeteer (Google I/O 2019)](https://www.youtube.com/watch?v=MbnATLCuKI4)

`CSS Selectors` are used to select the content you want to style. Selectors are the part of CSS rule set. CSS selectors select HTML elements according to its id, class, type, attribute etc. [source](https://www.javatpoint.com/css-selector)

```css
/* This is a CSS Element Selector, which can be grouped ie will style all p tags */
p, h1 {  
    text-align: center;  
    color: blue;  
}

/* This is a CSS ID Selector */
#para1 {  
    text-align: center;  
    color: blue;  
}  
<p id="para1">Hello Javatpoint.com</p> 

/* This is a CSS Class Selector */
.center {  
    text-align: center;  
    color: blue;  
}  
<h1 class="center">This heading is blue and center-aligned.</h1>  
<p class="center">This paragraph is blue and center-aligned.</p>

/* CSS Class Selector for specific Element */
p.center {  
    text-align: center;  
    color: blue;  
}  
<h1 class="center">This heading is not affected</h1>  
<p class="center">This paragraph is blue and center-aligned.</p>
```

Here we are using a CSS Class selector to get the price element

```js
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://joel.tools/merch');
    // css Class selector
    const price = await page.$eval('.price', div => div.textContent);
    console.log('hello world');
    console.log(price);
    await browser.close();
})();
```

Here is the element we are selecting in Puppeteer:

![alt text](/assets/2020-05-08/css-class-selector.jpg "CSS Class Selector")

## page.evaluate

```js
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto('https://atlassian.com');
    // execute test script in browser context
    // forwarding code to browser
    await page.evaluate(() => {
        document.body.innerHTML = 'Hello Las Vegas!';
    });

    await browser.close();
})();

```

## Screenshots and the $function

Visual regression testing

- full page
- screenshot only an element eg 

https://www.youtube.com/watch?v=PQScm-sA2EM

```js
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://atlassian.com');

  const banner = await page.$('#hero-statement');
  await banner.screenshot({
    path: 'banner.png'
  });

  await browser.close();
})();)

```

## NetworkIdle

[Web Scraping With NodeJS and Puppeteer](https://www.youtube.com/watch?v=ARt3zDHSsd4)

```js
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
// wait until no 2 network requests in 500ms
// eg css and js loading before grabbing all content
await page.goto('https://davemateer.com', { waitUntil: 'networkidle2' });
// entire source code of page - markup
var html = await page.content();
// maybe save to a file?
```

## Web Scraping with Node.js - page.type

https://fireship.io/lessons/web-scraping-guide/

```js
const puppeteer = require('puppeteer');

const scrapeImages = async (username) => {
    const browser = await puppeteer.launch( { headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/accounts/login/');

    // Login form
    await page.screenshot({path: '1.png'});
    await page.type('[name=username]', 'fireship_dev');
    await page.type('[name=password]', 'some-pa$$word');
    await page.screenshot({path: '2.png'});
    await page.click('[type=submit]');

    // Social Page
    await page.waitFor(5000);
    await page.goto(`https://www.instagram.com/${username}`);
    await page.waitForSelector('img ', {
        visible: true,
    });
    await page.screenshot({path: '3.png'});

    // Execute code in the DOM
    const data = await page.evaluate( () => {
      // we are now executing code inside the browser
        const images = document.querySelectorAll('img');
        const urls = Array.from(images).map(v => v.src);
        return urls
    });
  
    await browser.close();
    console.log(data);
    return data;
}
```


## WaitForSelector



## setUserAgent

```js


```

https://www.whatismybrowser.com/detect/what-is-my-user-agent

Chromium giving:

Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.0 Safari/537.36

and my Chrome

Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36


## CDP

Chrome Devtools Protocol - use websocket API to control



## WaitFor

page.waitFor('.result-row')

Criagslist scraping
https://www.youtube.com/watch?v=aRXzW-o-zqs


## Network

client.send('Network.enable')

can see load times


## x Browser Contexts

Incognito mode. Don't need to launch a new browser. For speed


## Code Coverage with Dev Tools

page.coverage.startJSCoveerage()
startCSSCoverage()


Bloat and Device emulation

Looking at the CSS and JS that is acutally used to reduce bloat
https://www.youtube.com/watch?v=U_z9x6ZtDow

## Puppeteer Performance

https://docs.browserless.io/blog/2019/05/03/improving-puppeteer-performance.html

Browserless runs Chrome for you.

## Conclusion

asdf