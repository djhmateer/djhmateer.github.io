---
layout: post
title: Bootstrap 
description: 
menu: review
categories: Bootstrap 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

This is part of a frontend series of posts with the first being 

- [HTML]() where I look at the raw starting points.
- [Bootstrap](#) this article
- [ASP.NET 5]() is the following article on how this server side framework can help in serving

[Bootstrap: Getting Started](https://app.pluralsight.com/library/courses/bootstrap-getting-started/table-of-contents) from June 2020 is a good Pluralsight course.

Should we be using Bootstrap now in 2020 or is it 'old tech'. I'm developing a SaaS company with many products and want my products to look good!

Millions of websites use it.


## What is Bootstrap

It is a CSS Framework / Library

Help to 'bootstrap' your development

- Mobile first
- Open source
- Pure CSS
- jQuery for interactivity
- Comes out of the box with ASP.NET Core

[7th most starred repo on GH](https://gitstar-ranking.com/)

Out of the box a new ASP.NET 5 Razor Pages Website uses:

- Bootstrap 4.3.1 and [getbootstrap.com](https://getbootstrap.com/) is on 4.5.3 as of 28th Nov 2020
- Jquery 3.5.1
- Jquery-validation 1.17.0 
- Jquery-validation-unobtrusive 3.2.11

Which are the same versions that were in ASP.NET Core 3.1 Razor Pages.

[![alt text](/assets/2020-11-26/file-new.jpg "File new project Razor Pages"){:width="800px"}](/assets/2020-11-26/file-new.jpg)


## Building Blocks

- Grid Layout system - Most sites have a similar structure. position elements in a responsive table like system so looks good on any device
- Components eg navigation, buttons, forms ...
- Style utilities eg margin, padding, aligment

Browser support - all modern. IE10 and up for Bootstrap 4.x which is what we're using here.

## Get Bootstrap

- css/bootstrap.css (194k)
- css/bootstrap.min.css (157k)
- css/bootstrap-grid.min.css (50k) - only code for the grid
- css/bootstrap-reboot.min.css (4k) - only most popular

There are also .map files for development.

- js/bootstrap.js (141k)
- js/bootstrap.min.js (62k)
- js/boostrap-budle.min.js (83k) - also contains Popper.js


## Live Server Extension

Live Server (8.4m downloads) For VS Code. 

[![alt text](/assets/2020-11-28/pie.jpg "Pie"){:width="800px"}](/assets/2020-11-28/pie.jpg)

Essentially click on the bottom right botton `Go Live` in VS Code, then [http://127.0.0.1:5500](http://127.0.0.1:5500) will give a live version.


## Viewport

```html
<!DOCTYPE html>

<html>

<head>
    <meta charset="utf-8">
    <!-- bootstrap render properly on all devices.. including Safari 9-->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/site.css">
</head>
```


## Button

```html
<a type="button" href="shoppingbasket.html" class="btn btn-success"> Add to basket </a>
```

<a type="button" href="shoppingbasket.html" class="btn btn-success"> Add to basket </a>



## Alternative Libraries / CSS Frameworks

Bootstrap 4 - 
CSS Flexbox
CSS Grid
