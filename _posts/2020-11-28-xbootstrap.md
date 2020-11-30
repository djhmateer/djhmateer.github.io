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

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

[Live demos mentioned here are on /bootstrap-demo](/bootstrap-demo)

This is part of a frontend series of posts:

- [HTML]() where I look at the raw starting points.
- [Bootstrap](#) this article
- [ASP.NET 5 Razor Pages]() is the following article on how this server side framework can help in serving content

This frontend series follows on from my backend series of creating a SaaS product

- Cookie authentication
- Integration testing
- Configuration
- Storing passwords in a db

[Bootstrap: Getting Started](https://app.pluralsight.com/library/courses/bootstrap-getting-started/table-of-contents) from June 2020 is a good Pluralsight course.

Should we be using Bootstrap now in 2020 or is it 'old tech'. I'm developing a SaaS company with many products and want my products to look good! I'm also a developer who wants things to work well without a lot of faffing around, and appreciates libraries which are well known and supported.

Millions of websites use it.

A double edged sword.

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

A new Razor Pages projects in ASP.NET 5 using Bootstrap.

## Building Blocks

- Grid Layout system - Most sites have a similar structure. position elements in a responsive table like system so looks good on any device
- Components eg navigation, buttons, forms ...
- Style utilities eg margin, padding, aligment

Browser support - all modern. IE10 and up for Bootstrap 4.x which is what we're using here.

## Get Bootstrap

[getbootstrap.com](https://getbootstrap.com/) if we download it then we get:

- css/bootstrap.css (194k)
- css/bootstrap.min.css (157k)
- css/bootstrap-grid.min.css (50k) - only code for the grid
- css/bootstrap-reboot.min.css (4k) - only most popular

There are also .map files for development.

- js/bootstrap.js (141k)
- js/bootstrap.min.js (62k)
- js/boostrap-budle.min.js (83k) - also contains Popper.js

## Live Server Extension

[Live Server VS Code Extension by Ritwick Dey](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 
Very handy to see in real time the changes without having to save / conmpile / F5 realod. (live reload not working for me on WSL2 Ubuntu side)

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

## Button Colours

```html
<a type="button" href="shoppingbasket.html" class="btn btn-success"> Add to basket </a>
```

<!-- [![alt text](/assets/2020-11-28/button-success.gif "Pie")](/assets/2020-11-28/button-success.gif) -->
[![alt text](/assets/2020-11-28/button-success2.gif "Pie")](/assets/2020-11-28/button-success.gif)

Animated Gif with the mouse hidden showing a rollover effect on a button (goes darker when hover over)

[/bootstrap-demo](/bootstrap-demo) is a live demo rather than doing gifs

btn-success is a named colour (success is a named colour in bootstrap.css)

```css
 /* bootstrap.css */
 :root {
  --blue: #007bff;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #e83e8c;
  --red: #dc3545;
  --orange: #fd7e14;
  --yellow: #ffc107;
  --green: #28a745;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #6c757d;
  --gray-dark: #343a40;
  --primary: #007bff;
  --secondary: #6c757d;
  --success: #28a745;
  --info: #17a2b8;
  --warning: #ffc107;
  --danger: #dc3545;
  --light: #f8f9fa;
  --dark: #343a40;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
```

So I could use btn-secondary, btn-info

## Buttons, Margins, Padding, Alert

This is a layout style, and bootstrap has lots of them

```html
<!-- add a margin around the button -->
<!-- between 0 and 5 -->
<a type="button" href="shoppingbasket.html" class="btn btn-success m-4"> Add to basket </a>

<!-- add padding on all 4 sides -->
<div class="p-4"></div>

<!-- rounded corners on image -->
<img src="images/products/applepie.jpg" class="rounded" alt="Image of apple pie">

<!-- jumbotron component is a large halo  -->
<div class="jumbotron">
    <div class="container">
        <h1 class="display-4">Apple pie</h1>
        <p class="lead">Our famous, number-one selling pie.</p>
    </div>
</div>

<!-- alert message component -->
<div class="alert alert-success ">
    <strong>Success!</strong> Apple pie was added to your shopping cart.
</div>
```

<!-- [![alt text](/assets/2020-11-26/file-new.jpg "File new project Razor Pages"){:width="800px"}](/assets/2020-11-26/file-new.jpg) -->

[![alt text](/assets/2020-11-28/message.jpg "Message"){:width="400px"}](/assets/2020-11-28/message.jpg)

Useful message alert Success message. Also rounded top left corner on the image.

## Bootstrap Grid

It all started with a table, but doesn't work well on today's devices.

Bootstrap uses a Grid.


- All content will be inside a container, probably only 1 container per page
- Rows and columns
- Breakpoints - so it knows how to rendering reponsively

```html
<!-- container is the most basic element when using Bootstrap Grid -->
<!-- will contain rows -->
<!-- by default will centre contents on the page -->
<div class="container"></div>

<!-- full screen -->
<div class="container-fluid"></div>


```

[/bootstrap=demo/03/dave.html](/bootstrap=demo/03/dave.html)

### Breakpoints

Basiclaly known sizes of devices

A way of laying out columns

- Extra small, col-, < 576px
- Small, col-sm- , >= 576px
- Medium, col-md- , >= 768px
- Large, col-lg- , >= 992px
- Extra large, col-xl- , >=1200px

If page is resized (jumps over a breakpoint) bootstrap will apply a different layout. Internally it is based on media queries to determine the available width.

```html
<div class="container">
    <!-- splitting equally on all screen sizes-->
    <div class="row">
        <div class="col"> Element 1 of 2 (row 1) </div>
        <div class="col"> Element 2 of 2 (row 1) </div>
    </div>

    <!-- splitting equally on all screen sizes-->
    <!-- same as col-4 on all of them -->
    <div class="row">
        <div class="col"> Element 1 of 3 (row 2) </div>
        <div class="col"> Element 2 of 3 (row 2) </div>
        <div class="col"> Element 3 of 3 (row 2) </div>
    </div>

    <!-- splitting 4 cols to 8 cols across all screen sizes -->
    <div class="row">
        <div class="col-4"> Element 1 of 2 (row 3) </div>
        <div class="col-8"> Element 2 of 2 (row 3) </div>
    </div>

    <!-- Reponsive classes now -->
    <div class="row">
        <!-- only apply if page is bigger than 576px otherwise default which will be a stack-->
        <div class="col-sm-2"> Element 1 of 3 (row 4) </div>
        <div class="col-sm-3"> Element 2 of 3 (row 4) </div>
        <div class="col-sm-7"> Element 3 of 3 (row 4) </div>
    </div>

     <div class="row">
         <!-- multiple breakpoints - for small > 576px do equal, for medium >768px do last one bigger -->
         <div class="col-sm-4 col-md-2"> Element 1 of 3 (row 5) </div>
         <div class="col-sm-4 col-md-2"> Element 2 of 3 (row 5) </div>
         <div class="col-sm-4 col-md-8"> Element 3 of 3 (row 5) </div>
     </div>
</div>
```

[/bootstrap-demo/03/dave.html](/bootstrap-demo/03/dave.html) live version (Ctrl Shit M in firefox for hand viewer to see screen size)

[![alt text](/assets/2020-11-28/grid.jpg "Grid"){:width="600px"}](/assets/2020-11-28/grid.jpg)

Between sm and md size.

can use `order` to change around the order of the columns

to leave space use `offset-md-6`

[bootstrap docs - grid](https://getbootstrap.com/docs/4.1/layout/grid/)

`col-{breakpoint}-auto` size columns based on the natural width of their content

[![alt text](/assets/2020-11-28/grid2.jpg "Grid2"){:width="800px"}](/assets/2020-11-28/grid2.jpg)

939px wide so still a medium. So we are in the col-sm-8 brekpoint of having 8 columns to display the image.

## Alternative Libraries / CSS Frameworks

Bootstrap 4 - 
CSS Flexbox
CSS Grid
