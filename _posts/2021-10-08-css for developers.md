---
layout: post
title: CSS and Design for Developers 
description: CSS
menu: review
categories: CSS 
published: false 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- ## Introduction. -->

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-10-07/http2b.png "http2"){:width="200px"}](/assets/2021-10-07/http2b.png) -->


[https://cssfun.netlify.app/](https://cssfun.netlify.app/) live website of everything talked about here. It is a Netlify site linked to [github.com/djhmateer/css-fun](https://github.com/djhmateer/css-fun).

> CSS is a design language which is used to style HTML elements


## VS Code

[https://code.visualstudio.com/docs/languages/html](https://code.visualstudio.com/docs/languages/html)

```json
// settings
"html.autoClosingTags": false,
"html.format.wrapLineLength": 1024
```

`Shift+Alt+F` format code
`Ctrl /` comment

### Snippets
Inbuilt without any extensions

- doc - gives document, but not the <!Doctype>
- div
- p
- a

### Extensions

- [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) Prettier - CSS formateer
- HTML CSS Support - 7.5m downloads. I use this one to give intellisense for CSS names in html
- HTMLHint - static code analysis for HTML. Useful


## Programming in CSS

[https://www.freecodecamp.org/news/get-started-with-css-in-5-minutes-e0804813fc3e/](https://www.freecodecamp.org/news/get-started-with-css-in-5-minutes-e0804813fc3e/) is a great intro

[https://scrimba.com/learn/introtocss/css-documents-the-cascade-c3vE7cg](https://scrimba.com/learn/introtocss/css-documents-the-cascade-c3vE7cg) interactive learning

- 1.Inline CSS

This is of more importance then 2 or 3.

```html
<h1 style="color: blue">2csstest</h1>
```

- 2.Internal CSS (in the head)

```html
<style>
    h1 {
        color: blue;
    }
</style>
```

- 3.External CSS

```css
/*html link/*
<link rel="stylesheet" href="style.css">

/* CSS Selector by element */
 h1 {
    color: red;
    font-size: 20px;
}
```

### CSS Selectors

In order to style elements you first have to select them.

- 1.Element

```css
h1 {  
    font-size: 20px;  
}  
p {  
    color: green;  
}  
div {  
    margin: 10px;  
}
```

- 2.Class

```html
<div class='container'>  
    <h1> This is heading </h1>  
</div>
```
css:

```css
.container {  
    margin: 10px;  
}
```

- 3.ID

An ID can only be assigned to 1 element, where a class can be assigned to many

```html
<div>  
    <p id='para1'> This is a paragraph </p>  
</div>
```
css:

```css
#para1 {  
    color: green;  
    font-size: 16px;  
}
```

## Fonts and Colours

There are 2 types of font family names:

- Generic Family: a group of font families with a similar look (like ‘Serif’ or ‘Monospace’)
- Font Family: a specific font family (like ‘Times New Roman’ or ‘Arial’)


```html
<div class='container1'>
    <h1 class='heading1'>
		CSS is Coooooool!!!!
    </h1>
</div>
```

```css
/* classes */
.container1 {  
    width: 500px;  
    height: 100px;  
    background-color: lightcyan;  
    text-align: center;  
}

.heading1 {  
    font-family: 'Courier New';  
    color: tomato;  
}
```

## Cascading

```html
<!-- good practive to have internal styles after external to be more specific -->
<link rel="stylesheet" href="style.css">
<!-- the bottom one always overwrites to previous one - cascading -->
<!-- <style>
    body {
    background-color: black;
    color: white;
    }
</style> -->
```

## Vocabulary

- Element eg `<h1>`
- Selector eg by element 

```css
/* declare the changes we want to make to h1 */
/* declaration is property and value type pair */
h1 {    
    /* 120px is considered a length unit value type */
    font-size:120px;

    /* keyword value type */
    font-size:small;
    font-size:large;

    /* percentage value type*/
    /* should be around 16px in height */
    font-size:100%;

    /* should be around twice default font height */
    font-size:200%;

}

```

Not all properties can take all of these value types.

## Selecting a subset

```css
/* using the b selector all b elements will change */
section b {
    color: blueviolet;
}

/* only select b elements that are descendants of the section elements*/
section b {
    color: blueviolet;
}

/* only select b elements that are direct children of section elements (ie not in a further p tag w
which would be a grandchild) */
/* > is a child combinator */
section > b {
    color: blueviolet;
}

/* same for div - only matching children */
section > b, div > b {
    color: blueviolet;
}

```

## Classes and ID's

Use classes when

- You want to apply the same style to multiple elements
- But not all elements of the same name eg h1

```cs
/* box class */
.box {
    /* a declaration block */

    /* a box border of 2px which is solid */
    border: 2px solid;
    background-color: white;
}

/* nice way to override on a single element in a page with an ID */
#foo {
    color: slateblue;
}

#bar {
    color: tomato;
}
```

## Specificity

```css
/* index.css */
/* ids will beat classes, and are the highest specificity */
/* only an inline style can override */
#bar {
    background-color: tomato;
}


/* a more specific class will always beat less */
html .foo {
    background-color: seagreen;
}

/* a class will always beat element selectors */
.foo {
    background-color: red;
}

/* this is more specific, so wins */
html body {
    background-color: aqua;
}

/* further one down, most specific against another body only, wins */
body {
    background-color: goldenrod;
}
```

html:

```html
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="instructor.css">
    <link rel="stylesheet" href="index.css">
</head>

<body class="foo" id="bar">
    <header>
        <h1>Specificity</h1>
    </header>
    <main>
        <p>hello world</p>
    </main>

    <p>and again</p>
</body>

</html>
```

## Widths and Heights

```html
<!-- elements that have default display value of inline -->
<section id="inline">
    <span>inline</span>
    <a>inline</a>
    <b>inline</b>
    <em>inline</em>
</section>

<!-- elements that have default display vlaue of block will always go to another line -->
<section id="block">
    <div>block</div>
    <nav>nav</nav>
    <aside>aside</aside>
    <main>main</main>
</section>
```
and css

```css
/* the star is selecting all elements in inline */
#inline * {
    display: inline-block;
    /* width and height can only be applied to elements that are not inline ie block */
    /* inline only takes up as much width as necessary for the content inside */
    width: 200px;
    height: 100px;
}

#block * {
    width: 200px;
    height: 200px;
}
```
and the instructor.css

```css
/* I refactored away from this below as felt cleaner to split */
/* html, body { */

html {
    /* there is a small default margin on the page */
    margin: 0;
    /*can't see any difference*/
    padding: 0;
}

body {
    margin: 0;
    background-color: #3D85C6;
    color: rgba(0, 0, 0, .8);
    padding: 20px;
}

#inline, #block {
    margin-bottom: 20px;
    padding: 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);
}


/* only the direct children of inline id */
#inline>* {
    background-color: white;
    margin: 10px 0px 10px 10px;
    padding: 5px;
}


/* only the direct children of inline id */
/* otherwise nested divs or anything would get this styling */
#block>* {
    box-sizing: border-box;
    background-color: white;
    padding: 20px;
    margin: 10px;
}
```

<!-- [![alt text](/assets/2021-10-08/inline.jpg "inline"){:width="800px"}](/assets/2021-10-08/inline.jpg) -->
[![alt text](/assets/2021-10-08/inline.jpg "inline")](/assets/2021-10-08/inline.jpg)


## Length Units

Here is

```css
.bar {
    width: 400px;
}

.progress {
    width: 300px;
}
```

So predictably we can see 300px progress, and 400px bar. It doesn't matter the width of the `viewport` which is the size of the screen/window. The bar will alwyas be 400px wide

[![alt text](/assets/2021-10-08/bar.jpg "bar")](/assets/2021-10-08/bar.jpg)

### em's

`em` referred to as a relative unit. They are relative to the default font size that the element has inherited. The default font size is 16px. So 20em is 320px


Browsers made minor adjustments to the default font size based on the resolution of the display to increase legibility. So em's are useful units in responsive web design.

```css
.bar {
    /* width: 400px; */
    /* will make the bar 50% smaller now as default font size is 16px and we're setting to 8px  */
    font-size: 8px;
    width: 20em;
}

.progress {
    /* width: 300px; */
    /* the class of progress has inherited the font-size of 8px */
    /* font-size: 16px; */
    width: 10em;
}
```

`rem` is relative to the root default font size


### percent

```cs
.bar {
    width: 50%;
}

.progress {
    width: 50%;
}
```
Very useful - screen grows, then so does the width of the bar. And relative to that, the progress.


## Colours and Colour Types

Predefined colour names - only 140 to choose from so not used professionally.

```css
.box {
  /* predefined colour name */
  background-color: black;
  /* hex colour 
    000 being the least colour intensity ie black
   FFF being the most colour intense ie white

   RGB ie 
   F00 is red
   0F0 is green
   00F is blue
   */

  background-color: #fff;

  /* 2 digits for every colour for more precision */
  background-color: #0000ff;

  /* rgb */
  background-color: rgb(255, 0, 0);

  /* rgb alpha */
  /* tranparency / opacity - 1 being fully opaque */
  /* 0.5 is 50% opqque */
  background-color: rgba(0, 0, 0, 0.5);
}

```

[https://www.w3schools.com/cssref/css_colors.asp](https://www.w3schools.com/cssref/css_colors.asp) colour names

[https://htmlcolorcodes.com/](https://htmlcolorcodes.com/) html colour codes

[https://coolors.co/](https://coolors.co/) creating a perfect palette


## CSS Padding

```css
.box {
  background-color: lightgray;
  width: 100px;
  height: 100px;
  /* essentially a background colour of gray with extra padding to make larger */
  /* padding: 10px; */
  /* padding: 10em; */
  /* padding: 10%; */

  /* 25 top and bottom, 10 left and right */
  /* padding: 25px 10px; */
  
  /* top, right, bottom, left */
  /* like a clock */
  /* padding: 25px 10px 50px 0; */

  padding: 10px;
  /* makes the padding be included in the box ie will shrink rather than expand */
  box-sizing:border-box;
}

.content {
  background-color: white;
  /* this is the span putting a padding around */
  padding: 10px;
  /* without this it will come out of the surrounding box */
  box-sizing:border-box;
}
```
and html

```html
<div class="parent">
    <div class="box">
        <span class="content">This is the span with content</span>
    </div>
</div> 
```

## CSS Borders
asdf
```css
/* shorthand border */

/* border-style: solid;
border-color: lightgreen;
border-width: 10px; */

border:10px solid lightgreen
```

## CSS Margins
asdf

```css
.parent {
  /* have to set the backgroup colour of the parent */
  /* so can see the margin of the box */
  background-color: rgba(0,0,0,.3);
}

.box {
  background-color: lightgray;
  width: 100px;
  height: 100px;

  /* padding is a shorthand too */
  padding: 10px;

  /* the margin does not alter the width of size of the element */
  margin:20px;
  /* margin is a shorthand */
  /* margin-top: 10px; */

  /* box-sizing:border-box; */
  border:10px solid lightgreen
}

.content {
  background-color: white;
  /* this is the span putting a padding around */
  padding: 10px;
  /* without this it will come out of the surrounding box */
  box-sizing:border-box;
}
```

[![alt text](/assets/2021-10-08/margin.jpg "inline")](/assets/2021-10-08/margin.jpg)

## The Box Model

borders, margins, padding, content

[![alt text](/assets/2021-10-08/chrome.jpg "chrome")](/assets/2021-10-08/chrome.jpg)

Can see the computed values in chrome.

[![alt text](/assets/2021-10-08/2box.jpg "chrome")](/assets/2021-10-08/2box.jpg)

margin is used to create space between sibling elements

```css
.box {
  width: 100px;
  height: 100px;
  /* all these below affect the space an element takes up */

  /* when we add padding it increases the size of the element - 120px now */
  padding: 10px;

  /* element grown again - 140px now */
  border: 10px solid lightgreen;

  /* the margin is spaced on the outside of the element, so wont make it bigger */
  /* used to create spaces between sibling elements so they don't touch each other */

  margin: 10px;
  /* box-sizing: border-box; */
}

```

## Visibility in CSS

```css
.hidden {
  /* almost like never existed */
  /* display: none; */

  /* stays in flow of the document */
  visibility: hidden;

  /* different effects */
  /* opacity: 0; */
}
```

## Fonts

font family
font size
font weight - bold, thin
font style - italic, underline


[https://fonts.google.com/?](https://fonts.google.com/?) some nice fonts

[sans-serif](https://en.wikipedia.org/wiki/Sans-serif) letterform is one that does not have extending features (serifs) at the end of strokes. They are the most popular on computer screens.

```css
@import url('https://fonts.googleapis.com/css?family=Black+Han+Sans');
body {
    background-color: #3D85C6;
    color: rgba(0,0,0,.8);
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.font {
  /* will prefer the left hand one if available */
  /* font-family: 'Black Han Sans', arial, sans-serif;
  font-size: 30px;
  font-weight: 100;
  font-weight: bold;
  font-style: italic; */

  font: italic bold 40px 'Black Han Sans', arial, sans-serif;
}
```
html
```html
<body>
    <div class="font">Hello World!</div>
</body>
```

## Element Flow

Inlne elements only take up the amount of space needed for the content inside stacking horizontally then wrapping

[https://www.w3schools.com/html/html_blocks.asp](https://www.w3schools.com/html/html_blocks.asp)

```css
.inline {
  background-color: slateblue;
  color: white;
  padding: 2px 5px;
  /* make an inline element behave like a block */
  display: inline-block;
  width: 100px;
  height: 100px;
}
.block {
  /* border: 2px solid tomato; */
  padding: 5px;
}
```
```html
<nav class="block">
    <a class="inline" href="#">one</a>
    <a class="inline" href="#">two</a>
    <a class="inline" href="#">three</a>
    <a class="inline" href="#">four</a>
    <a class="inline" href="#">five</a>
    <a class="inline" href="#">six</a>
    <a class="inline" href="#">seven</a>
    <a class="inline" href="#">eight</a>
    <a class="inline" href="#">nine</a>
    <a class="inline" href="#">ten</a>
</nav>

<section class="block">
    <h2 class="block">Block Elements</h2>
    <div class="box hidden block">
        <p class="block">This is another block level element</p>
        <p class="block">This is an <a class="inline">inline</a> within a block level element</p>
        <p class="block">This is another block level element</p>
    </div>
    <p class="block">This is another block level element</p>
</section>
```

[![alt text](/assets/2021-10-08/block.jpg "block")](/assets/2021-10-08/block.jpg)


## CSS Float and CLear

starting with block level elements and are stacked vertically

float - remove from normal flow and put left or right
clear property - determine how they will behave


[![alt text](/assets/2021-10-08/float.jpg "block")](/assets/2021-10-08/float.jpg)


```css
.box {
  height: 200px;
  width: 200px;
  /* float: left; */
}
.tomato {
  float: left;
  /* height: 220px; */
  /* width: 50% */
}
.purple {
  float: right;
  /* width: 50%; */
}
.gold {
  /* float: left; */
  /* clear left means start on new line after any element that has float left declaration */
  /* clear: left; */
  clear: both;
  /* width: 100%; */
}
.green {
  /* float: left; */
  /* clear: right; */
  /* width: 100%; */
}
```
with html
```html
<section>
    <div class="box tomato"></div>
    <div class="box purple"></div>
    <div class="box gold"></div>
    <div class="box green"></div>
</section>
```
and here is a custom layout:

[![alt text](/assets/2021-10-08/custom.jpg "block")](/assets/2021-10-08/custom.jpg)

```css
.box {
  height: 200px;
  width: 200px;
  /* float: left; */
}
.tomato {
  float: right;
  height: 80px;
  width: 80%
}
.purple {
  float: left;
  width: 20%;
  height: 600px;
}
.gold {
  /* float: left; */
  /* clear left means start on new line after any element that has float left declaration */
  /* clear: left; */
  clear: right;
  float:right;
  width: 80%;
  height: 440px;
}
.green {
  float: right;
  /* clear: right; */
  width: 80%;
  height: 80px;
}

/* as everything is floated away from normal flow, it breaks our background */
.clearfix {
  clear: both;
}
```
 and html

 ```html
<body>
    <h1>Floating Elements</h1>        
    <!-- <img src="https://placeimg.com/400/400/animals"> -->
    <section>
        <div class="box tomato"></div>
        <div class="box purple"></div>
        <div class="box gold"></div>
        <div class="box green"></div>
        <div class="clearfix"></div>
    </section>
</body>
 ```

## Float layout challenge

[![alt text](/assets/2021-10-08/challenge.jpg "block")](/assets/2021-10-08/challenge.jpg)

```css
/* flexbox */
/* https://flexbox.help/ */
/* div {
  display: flex;
  justify-content: center;
  align-items: center;
} */

#header {
  background: #44accf;
  height: 50px;
}

#content {
  background: #b7d84b;
  width: 75%;
  height: 400px;
  float: left;
}

#navigation {
  background: #e2a741;
  width: 25%;
  height: 400px;
  float: right;
}

#footer {
  background: #ee3e64;
  width: 100%;
  height: 50px;
  clear:both;
}

```
and html:

```html
<body>
    <div id="header">Header</div>
    <div id="content">Content</div>
    <div id="navigation">Nav</div>
    <div id="footer">Footer</div>
</body>
```

This expands to 100% of the screen (with default margins of 8px)

## Positional Property
asdf

all elements have a default position of `static` which is the order they appear in the document flow.

[![alt text](/assets/2021-10-08/position.jpg "position")](/assets/2021-10-08/position.jpg)

```css
body {
  padding-bottom: 100px;
}

.first {
  /* can move the position relative to it's original postiion in the element flow  */
  position: relative;
  /* once we're moved away from position static (default) we can use top right bottom left as below */
  top: -40px;
  margin-bottom: -40px;
}

.second {
  position: relative;
}

.ribbon {
  /* can move position relative to box's containing block ie first ancester that is not static. ie could be relative. ie not in the natural flow*/
  /* in this case everything is static, so positionaing to root element */
  position:absolute;
  top: 0px;
  right: 20px;
}

.toplink {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

footer {
  position: fixed;
  bottom: 0;
}
```
html

[ https://www.w3schools.com/cssref/pr_class_position.asp]( https://www.w3schools.com/cssref/pr_class_position.asp)


## Pseudo Classes / Elements

```css
/* pseudo class has 1 colon */
/* ul li:first-child a {
  color: tomato;
}

ul li:nth-child(even) a {
  color: tomato;
} */


/* nice hover colour */
ul li a:hover {
  color: tomato;
}

/* pseudo element has 2 colons */
ul a::before {
  content: "-> ";
}
```

## CSS Variables

[https://scrimba.com/learn/cssvariables/why-learn-css-variables-intro-tutorial-cdmVpU8](https://scrimba.com/learn/cssvariables/why-learn-css-variables-intro-tutorial-cdmVpU8) another course on scrimba

```css
:root {
    --red: #ff6f69;
}

#title {
    color: var(--red);
}

.quote {
    color: var(--red);
}
```

No transpiling needed - ie no LESS and SAAS

Have access to the DOM
- Local scopes
- Change with JavaScript
- Ideal for responsiveness


 



## CSS Commands

```css
/* class */
.container {
    font-family: 'Courier New';  

    width: 500px;  
    width: 20em; /* 20 * default font-size of 16 is 320px */
    width: 50%
    width: 20rem; /* 20 * root default font-size */

    height: 100px;  
    height: 100%;  
    height: 10em; /* default font size inherited by that element */ 

    margin: 10px; /* from the left */ 
    margin: 10px 0px 10px 10px;
    margin-bottom: 20px; /* ??? */
    padding: 0 25px;

    border: 2px solid; /* a box border of 2px which is solid */
    border: 2px solid rgba(255,255,255,0.2)

    text-align: center;  

    font-family: 'Courier New';  
    font-size:120px; /* unit length value type */
    font-size:small; /* keyword value type */
    font-size:100% /* percentage value type */

    background-color: lightcyan;  
    background-color: #eee;  
    background-color: #3D85C6;
    color: tomato; /* the colour of the text */
    color: rgba(0,0,0,.8) /* 0.8 transparent */


    display: inline-block /* make inline elements be block like so width and height */
    display: block; /* ?? */

    display: flex;
    justify-content: center;
    align-items: center

    box-sizing: border-box; /* ? */

    flex-direction: column; 
    display: flex;
    min-height: 100vh

    border-radius: 20px;
    overflow: hidden
}

```

<!-- 
## Strategy
recreate beautiful pages on the web for fun to flex CSS muscles
 want people to say wow
 gives off confidence
  and for the hell of it.

## Landing Page

[https://remix.run/](https://remix.run/)

[https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021](https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021)

- html raw code design
- css raw code design

- Splash screen
- Fonts
- Buttons
- Overall site design - can read text on Win, Mac, Phone,  full screen (for dashboard)
- Login Page
- Forms



## Stuff

[https://classpert.com/blog/top-bootstrap-alternatives](https://classpert.com/blog/top-bootstrap-alternatives) good list of bootstrap alternatives


[https://roadmap.sh/frontend](https://roadmap.sh/frontend) good diagram

## CSS first frameworks

[Bootstrap](https://getbootstrap.com/) is the 10th most popular GitHub project

## JS Based CSS Framework

Tailwind
  and TailwindUI which are the commerical components
  Nice and I used it in https://hmsoftware.co.uk/

Materialize?

[https://html5boilerplate.com/](https://html5boilerplate.com/) - really nice fonts and style.

 -->
