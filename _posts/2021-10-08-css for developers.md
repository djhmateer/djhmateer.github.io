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

<!-- ## Introduction -->

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

- HTML CSS Support - 7.5m downloads. I use this one to give intellisense for CSS names in html
- HTMLHint - static code analysis for HTML. Useful
- JS-CSS-HTML Formatter - CSS formatter. I use the inbuilt for HTML formatting
  turn off formatting on save (I've got autosave on). use F1, Formatter Config, onSave: false,  



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

- 1. Element

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

- 2. Class

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

- 3. ID

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
<!-- inline elements by default -->
<section id="inline">
    <span>inline</span>
    <a>inline</a>
    <b>inline</b>
    <em>inline</em>
</section>

<!-- block level elements by default ie will always go to anohter line -->
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
    color: rgba(0,0,0,.8)

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
