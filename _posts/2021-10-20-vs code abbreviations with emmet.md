---
layout: post
# title: CSS and Design for Developers 
description: Email
menu: review
categories: Email 
published: false 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- ## Introduction. -->

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-10-07/http2b.png "http2"){:width="200px"}](/assets/2021-10-07/http2b.png) -->

[https://code.visualstudio.com/docs/editor/emmet](https://code.visualstudio.com/docs/editor/emmet)

## Traversy Media

[https://www.youtube.com/watch?v=8MgpE2DTTKA](https://www.youtube.com/watch?v=8MgpE2DTTKA) from Travesty Media - video background landing page (4th Jan 2021)

[https://www.youtube.com/watch?v=9OVLaEjY-Rc&list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU&index=58](https://www.youtube.com/watch?v=9OVLaEjY-Rc&list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU&index=58) Hulu landing page (15th Jul 2021)

[https://www.youtube.com/watch?v=uKgn-To1C4Q](https://www.youtube.com/watch?v=uKgn-To1C4Q) Microsoft.com (11th Feb 2020)
 

`!` Does html boiler plate! 

`link` makes `<link rel="stylesheet" href="">`

`script` makes `<script src=""></script>`

`header.header` makes `<header class="header"></header>`

`.header-content` makes `<div class='header-content'></div>`

`div.header-content` makes same as above


`img.logo` makes `<img src="" alt="" class="logo">`

`.header-content` makes `<div class="header-content"></div>`

`section.sub-header` makes `<section class="sub-header"></section>`

## Utility Classes

btn will be an overall button utility class
```html
<button class="btn btn-cta">
  START YOUR FREE TRIAL
</button>
```

## Strategy

for each section: eg header
 
put in html first

then style elements

then do responsive 

## Styling - Font 

Need to do base styles first of all.

So lets look at font first.

The Graphik font used by Hulu is premium, but Rubik on [google fonts](https://fonts.google.com/) is similar.

Light300, Regular400, Semi-bold600 and Bold700 are what we want.

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700&display=swap');

html,
body {
  font-family: 'Rubik', sans-serif;
}
```

## Defaults

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700&display=swap');

/* universal selector */
* {
  /* so when we add padding to an element it doesn't affect width */
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


html, body {
  font-family: 'Rubik', sans-serif;
  background: #000;
  color: #fff;
  line-height: 1.7;
  /* so no scroll bars on x axis ie horizontally */
  overflow-x: hidden ;
}

a {
  color: #fff;
  	/* no underline */
  text-decoration: none;
}

a:hover {
  /* grey hover */
  color: #ccc;
}

ul {
  /* no bullet points on ul */
  list-style-type: none;
}

```

## Responsive

iPhone 6/7/8  in Devtools, icone.

## CSS Grid

When to use flexbox and when to use cssgrid?

- Flexbox for simple single row or column
- CSS Grid for more complex eg different widths of columns


Using 3 items.

2fr 4fr 2fr - fractions?

linear-gradient - beautiful

## Background Images

With text on top

And overlay to make images darker so can see text


## Modal

For the login pop up form


## Wrap

`Ctrl-Shift-P` Open command pallette

`wrap` emmet:wrap

Then type div.foo which gives a class name of foo

`p>ul>li`

can work with multi cursors too

to change:

`update` emmet:update

## HTML preferences

```html

<strong> - for bold as it adds semantic meaning
<em> - for italic emphasis

<header>
<section>
<footer>
<nav>
<div> - generic denotation of differnt part of website (this is pre html5)

<!-- These above all makes 'boxes' on our page -->

```

## Explorer

`Ctrl-Shift-E` Explorer

## Comments

`Ctrl-/` comment - press first then start writing the comment

## Filenames

```
index.html
favicon.ico
css/sytle.css
js/main.js
```



