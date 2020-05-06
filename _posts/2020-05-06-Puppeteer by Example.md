---
layout: post
title: Puppeteer by example
description: 
menu: review
categories: Puppeteer Testing
published: true 
comments: false     
sitemap: false
image: /assets/2020-04-28/bashtop-screenshot.jpg 
---

![alt text](/assets/2020-04-28/bashtop-screenshot.jpg "Bashtop screenshot")

I'm writing a broken link checker and wanted to explore the use of an automated browser strategy like: [Puppeteer](https://pptr.dev/) 


[Part 1 - Using Puppeteer by example is my next article in this series](/Using-puppeteer)
[Part 2 - This article](/Using-puppeteer)

[Puppeteer - https://pptr.dev](https://pptr.dev/)

## Example 1

Navigate to https://example.com and save a screenshot

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();
```
 
Starting from v3.0.0 of Puppeteer (we are on 3.0.2)



## Puppeteer Performance

https://docs.browserless.io/blog/2019/05/03/improving-puppeteer-performance.html

Browserless runs Chrome for you.

## Conclusion

asdf