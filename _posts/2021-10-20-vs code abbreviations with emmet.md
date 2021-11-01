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

[https://www.youtube.com/watch?v=8MgpE2DTTKA](https://www.youtube.com/watch?v=8MgpE2DTTKA) from Travesty Media - video background landing page (Jan 4th 2021)

[https://www.youtube.com/watch?v=9OVLaEjY-Rc&list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU&index=58](https://www.youtube.com/watch?v=9OVLaEjY-Rc&list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU&index=58) Hulu landing page (Jul 15th 2021)

https://www.youtube.com/watch?v=uKgn-To1C4Q
 microsoft.com
 

`!` Does html boiler plate! 

`link` makes `<link rel="stylesheet" href="">`

`script` makes `<script src=""></script>`

`header.header` makes `<header class="header"></header>`

`.header-content` makes `<div class='header-content'></div>`

`img.logo` makes `<img src="" alt="" class="logo">`

`.header-content` makes `<div class="header-content"></div>`

## Utility Classes

btn will be an overall button utility class
```html
<button class="btn btn-cta">
	START YOUR FREE TRIAL
</button>
```

## Strategy

put in html first, for a section of the page eg top part, but not the menu.

## Styling - Font 

Need to do base styles first of all.

So lets look at font first.

The Graphik font used by Hulu is premium, but Rubik on google fonts is similar.

Light300, Regular400, Semi-bold600 and Bold700 we want.

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700&display=swap');

html,
body {
	font-family: 'Rubik', sans-serif;
}

```



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
<main>
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



