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


[https://hopeful-lichterman-dd6508.netlify.app/](https://cssfun.netlify.app/) live website of everything talked about here. It is a Netlify site linked to [github.com/css-fun](https://github.com/djhmateer/css-fun). All free.

## CSS

[https://www.freecodecamp.org/news/get-started-with-css-in-5-minutes-e0804813fc3e/](https://www.freecodecamp.org/news/get-started-with-css-in-5-minutes-e0804813fc3e/) is a great intro

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

> CSS is a design language which is used to style HTML elements

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


## Scrimba / FreeCodeCamp Video

[https://scrimba.com/learn/introtocss/css-documents-the-cascade-c3vE7cg](https://scrimba.com/learn/introtocss/css-documents-the-cascade-c3vE7cg) interactive learning




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




# Dashboards
asdf


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
