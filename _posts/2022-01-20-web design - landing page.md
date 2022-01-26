---
layout: post
title: xxxxxxxx Web Design - Langing Page
description: 
menu: review
categories: c#10 
published: true 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- ## Introduction. -->

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->

I've got a need to make some websites look more professional.

## Why

- Marketing
- Don't Make me Think - make it easy for people to understand
- Help users get the most out of the tool

## How

- Review 40 of the most relevant / successful sites in that area
- Look for commonalities
- Review VS Code and Emmet (I'll start as simple as possible)
- Review tecnology on CSS / Flexbox / CSS Grid
- Do I need helper libraries eg Bootstrap / 

## What Sites

The websites I need to implement on are:

- osr4rights - a 'commercial' tools site
- davemateer.com - technical blog
- hmsoftware.co.uk - consulting SaaS? Training SaaS
- Marketing and Operations dashboard product - SaaS product
- Broken Link Checker - SaaS product

The technologies behind these sites I've got full control over, so no problem to use whatever technologies I like.

I'm generally targetting evergreen browsers.

## 40 Sites Results

My goals for these sites are to provide

- Simplicity ie in the style of Don't Make Me Think, make sure users are not surprised 
- Professionalism
- Trust

### Navbar

- Top right is always Log In, or Register (a Call to Action - CTA), or Call Us
- Top left is a logo
- Top is a menu... clickable???
- Top bar - news eg We are presenting at ___ Rights con.

### Hero

- Middle is a big heading saying what it is eg 
- Middle image - often a smiling person..

## Cards

- Under middle is a sub heading 
- Under sub heading are more buttons - CTA eg Sign Up (no credit card required). Or Enter your email.
- Language: Free, Trust, Viuew live demo,


- Under that is: trusted by (and logos of companies)
- Often numbers eg 30m users, $1bn revenue.., 5* rating product hunt

### Footer

- Footer contains lot of links to other userful articles
- Footer contains privacy

## HTML / CSS

As this is a small site, and I'm aiming to keep things as simple as possible, I'm not going to use a CSS Framework such as Bootstrap or Tailwind3.

I am going to try and find as many good example as possible to be inspired by.

- Use HTML5 Semantic tags to help eg nav, header, main, section, footer
- CSS Grid (newer) - overall layout
- Flexbox (older) - inner elements
- Aim for no CSS frameworks
- Aim for minimal JS

The strategy I like is 

1. Using VS Code with Emmet create index.html and style.css. 

- HTML boilerplate (see [my article](/2021/10/20/vs-code-abbreviations-with-emmet)) using `!`
- `link` to put in `<link rel="stylesheet" href="style.css">`
- update <title>
- `.flex-container` Emmet to generate class
- `.item*3{Item $}` Generate

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Flexbox Crash Course</title>
</head>

<body>
  <div class="flex-container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
  </div>
</body>

</html>
```
- Shift-Alt-F - format in vscode

- CSS boilerplate

```css
/* universal selector reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.flex-container {
  display: flex;
  background-color: #f4f4f4;;
}

/* item class */
.item {
  width: 100px;
  height: 100px;
  background: #254de4;;
  color: #fff;
  /* all around */
  margin: 10px;
}
```

2. Put in HTML content using HTML5 semantic tags


3. Layout starting at the top

- Flex for Navbar
- CSS Grid for overall layout

- pull in fonts from google
- boilerplate reset
- utility css classes

5. Fonts and Icons

box model
spacing


```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
```

and Icons from Fontawesome

```html
<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
```

6. Colours

I'm going for a professional / trust feel, so an Elite Hacker style is not what is needed. Again I'll follow pallets from other successful companies in the same industry so people are not surprised.

## Flex

[Source in cssfun 55]()

Using Flex only, and basing the design on [Flexbox Crash Course 2022 by Traversy Media](https://www.youtube.com/watch?v=3YW65K6LcIA&t=4s)

[![alt text](/assets/2022-01-25/os.jpg "osr")](/assets/2022-01-25/os.jpg)

Design only on Flexbox using

- Google font - Poppins
- Fontawesome icons
- Flex for layout
- CSS menu
- Border radius
- Box shadows
- 2 Media queries


## Flex and CSS Grid

[Source in css-fun 60]()

[Build a Starbucks Landing Page Clone](https://www.youtube.com/watch?v=x_n2FGNsm0o&t=78s)

- Google font - Open Sans
- Custom Properties (variables)
- Boxshadow on navbar which is nice grey line
- Navbar in Flex (right and left aligned)
- Pseudo selectors
- Buttons styled
- Transparency on hover for button

He is building utility classes just like tailwind: eg `<p class="text-md">Hello</p>`

Media Queries

- Font gets smaller when < 960


[![alt text](/assets/2022-01-25/star.jpg "star")](/assets/2022-01-25/star.jpg)

Starbucks clone

[![alt text](/assets/2022-01-25/starm.jpg "starm")](/assets/2022-01-25/starm.jpg)

Hamburger Menu

- All lines in CSS
- Nice transitions

### Grid

```css
.grid-col-2 {
	display: grid;
	/* grid-template-columns: 200px 300px;  */

	/* 2 columns */
	grid-template-columns: 1fr 1fr; 

	/* grid-template-columns: repeat(2, 1fr);  */

  /* space between columns */
	gap: 2rem;
}

```

### Footer is Flex

## Build OSR4RightsTools in Starbucks and Flex style

Combine all I know so far and build out OSR4RightsTools

focus on cementing knowledge


