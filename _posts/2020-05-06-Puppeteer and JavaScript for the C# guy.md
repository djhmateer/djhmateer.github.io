---
layout: post
title: Puppeteer JavaScript NPM NodeJS
description: JavaScript for the C# guy
menu: review
categories: Puppeteer Testing
published: true 
comments: false     
sitemap: false
image: /assets/2020-04-28/bashtop-screenshot.jpg 
---

<!-- ![alt text](/assets/2020-04-28/bashtop-screenshot.jpg "Bashtop screenshot") -->

I'm writing a broken link checker and wanted to explore the use of an automated browser strategy like: [Puppeteer](https://pptr.dev/) or [Selenium webDriver](https://www.selenium.dev/) instead of raw Http calls from `HttpClient` in C#.

Puppeteer is written in Node.js and can only be called by JavaScript.

1. [Puppeteer for the C# Guy](/2020/05/06/Puppeteer-and-JavaScript-for-the-C-guy) - this post
2. [Puppeteer by Example](/2020/05/06/Puppeteer-by-Example)

I've been using C# for many years, so here is my overview of 'Puppeteer and JS for the C# guy' post:

## Puppeteer

Puppeteer is written by the Chrome team at Google as a way of controlling Chrome by using code. It is an NPM package written and called by JavaScript. It is the 'new guy on the block' [see graph in this comparison article](https://blog.scottlogic.com/2020/01/13/selenium-vs-puppeteer.html) but seems to be **almost as popular as Selenium in terms of downloads**

[https://www.npmjs.com/package/puppeteer](https://www.npmjs.com/package/puppeteer) has 1.4million weekly downloads

So this project has way more going on than the .NET port [PuppeteerSharp docs](https://www.puppeteersharp.com/api/index.html) and [GitHub](https://github.com/hardkoded/puppeteer-sharp)

## npm

[npm - originally Node Package Manager](https://www.npmjs.com/) is installed along with Node.js [https://nodejs.org/en/](https://nodejs.org/en/)  Currently version of Node.js is 12.16.3 LTS and npm is 6.9.0. [Node supports modern language features](https://kangax.github.io/compat-table/es6/)

```bash
npm -v # show version

npm init --yes # creates a package.json file with default values

npm install # rebuilds and get dependencies ie node_modules

npm i puppeteer   # install puppeteer (global)

npm i broken-link-checker -g # install globally, then can access from command line blc http://example.com

npm update # updates all packages
```

`package-lock.json` is automatically generated for any operations when npm modifies node_modules or package.json

`node_modules` is where modules (packages) and their dependencies are kept

### Other npm commands

```bash
npm run build
npm test
npm audit # to see vulnerabilities
```

## Node.js

Node.js is a platform for building fast and scalable server applications using JavaScript runtime built on Chrome's V8 JavaScript engine. It is a fast an scalable web app.

[Lots of sites use Node.js](https://youteam.co.uk/blog/top-companies-that-used-node-js-in-production/) with some migrating from Java/RoR and getting high throughput benefits

## JavaScript

[JavaScript versions](https://www.w3schools.com/js/js_versions.asp) and [compatibility table](https://kangax.github.io/compat-table/es2016plus/)

- ES1 - 1997
- ES5 aka ECMAScript 2009
- ES6 aka ECMAScript 2015 implemented in Chrome58 (Jan 2017)
  - let
  - const
  - arrow functions
  - js classes
- ES8 ECMAScript 2017
  - Async functions

Arrow Functions and Async functions are used a lot in Puppeteer

```js
const puppeteer = require('puppeteer');

(async () => {
  console.log('start');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  // saves 800*600px default
  await page.screenshot({ path: 'example.png' });
  await browser.close();
  console.log('end');
})();

// same as 
async function doSomething() {
    console.log('start function');
    const browser = await puppeteer.launch({ defaultViewport: null });
    const page = await browser.newPage();
    await page.goto('https://davemateer.com');
    await page.screenshot({ path: 'example.png' });
    await browser.close();
    console.log('end function');
}
doSomething();
```

## JavaScript and VS Code

[VS Code with NodeJS tutorial](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial)

```js
npm init --yes
npm i puppeteer
add .gitignore
// https://github.com/github/gitignore/blob/master/Node.gitignore
// https://github.com/djhmateer/thing

app.js
var msg = 'Hello World';
console.log(msg)
```
debugging

- F9 to set breakpoint
- F5 to run with debugging

- Ctrl / - comment uncomment
- Shift Alt F  - format code

## Puppeteer

[Puppeteer docs](https://pptr.dev/) focuses on Chromium - richer functionality high level API to control Chrome or Chromium over the DevTools protocol. headless or not

- measure loading and rendering times (Chrome Performance analysis)
- form submission
- scrape data

## Selenium

Selenium/WebDriver focuses on cross-browser automation Has been the industry standard Functional tests and can write in a number of languages eg C#, Java, Python 2004 ThoughWorks project then Google

## TypeScript

Maybe I should be using TS instead of JS?

[CodeWithDan on using TS without TS](https://www.dandoescode.com/blog/using-typescript-without-typescript/)


[Goal of puppeteer is 100% TypeScript src directory](https://github.com/puppeteer/puppeteer/releases) 

[TS Tutorial in VS Code](https://code.visualstudio.com/docs/typescript/typescript-tutorial)

[Simple crawling with TS](https://www.lewuathe.com/simple-crawling-with-puppeteer-in-typescript.html) but this is 3 years out of date

## Functional (Web) Testing Frameworks

- selenium-webdriver
- puppeteer
  -useful to have headless false for debugging
  -page.evaluate() - access the DOM and runs commands. Easy to write tests first in console, then use same code in .evalutate()
- useful waitUntil:"neworkidle0"
- faster tests and more solid 

- protractor
- cypress
- webdriverio
- nightwatch
- testcafe
- [endtest](https://endtest.io/pricing.htm)

## Testing Frameworks

- [jest](https://jestjs.io/)  - 30k stars on GH
  - [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer) 2.7k stars
  - [jest-puppeteer-example](https://github.com/xfumihiro/jest-puppeteer-example) - working example

- [mocha](https://mochajs.org/)

## Sites that test testers

[the-internet.herokuapp.com](http://the-internet.herokuapp.com/) - ugly functionality found

blcc project (in test/crawler)

## Automated helpers and site reports

[web.dev](https://web.dev/) - google including lighthouse?

## PuppeteerSharp

There is a .NET port of the Node.JS Puppeteer API on [PpupeteerSharp](https://www.puppeteersharp.com/) and [GitHub Source](https://github.com/hardkoded/puppeteer-sharp)

- version 2.0.3
- 20 days ago updated
- 506,000 downloads
It looks to be keeping good parity with Puppeteer

## Chromium vs Chrome

[https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/)

[https://en.wikipedia.org/wiki/Chromium_(web_browser)](https://en.wikipedia.org/wiki/Chromium_(web_browser))  Chromium is an open source project from Google. Google uses the code to make Chrome which has more features than Chromium.

## Broken link checkers

Here are some Node / JS / TS broken link checkers:

[broken-link-checker](https://github.com/stevenvachon/broken-link-checker)

## Conclusion

asdf