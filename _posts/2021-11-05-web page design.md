---
layout: post
title: xxxxx Web Page Design 
description: 
menu: review
categories: CSS 
published: true 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- ## Introduction. -->

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->

## Like

- Simple CSS Menu with underlines
- Page that scrolls
- Big simple explanation as to what the site/product does
- Little animations / videos may help

- People who trust this product
- Call to action - big call sales button
- What problems does it solve for you the customer?

- Big footer with all important links in it

- Prefer white cleaner

- Super simple form (like creattive traversy media)

- image that centers and growns (all traversy)
- hulu color gradients

## Product Sites I like

[https://wpengine.co.uk/](https://wpengine.co.uk/)


[https://www.polytomic.com/](https://www.polytomic.com/) - too dark though

[https://www.starterstory.com/](https://www.starterstory.com/) - lovely CTA

[https://freelancemastery.dev/](https://freelancemastery.dev/) - super simple and clean. Goodl white.

[https://csswizardry.com/](https://csswizardry.com/) - simple, nice menu at top, easy to see what he does.

10 minute teardown - innovative product.

 
## Dislike

 - Menu that stays at the top
 - Cards
 - Annoying CSS effects

## Pages

about-us - pictures of people (make it personable?)

contact-us

pricing - so it is simple

## Table vs display vs Flexbox vs CSS Grid 

table based layout - old school! with colspan. accessibility bad so should be used for data, and not layout.

display: inline-block - for displaying stuff eg images inline

[![alt text](/assets/2021-11-05/lay.jpg "lay")](/assets/2021-11-05/lay.jpg)

Image to the left, and text and other stuff to the right.

We need flx or grid to lay this out in html as nothing else can really do it

Nature of html is that good at vertically stacking, but not horizontally adjacent.

```html
<!-- this is side by side -->
x x x x x

```

display: inline (span defaults to this.. but wont respect vertical padding)

display inline-block (will respect vertical padding)

display: flex - could do the same

display: grid - CSS Grid - more grid like

## Flex

[![alt text](/assets/2021-11-05/flex.jpg "flex")](/assets/2021-11-05/flex.jpg)

```css
.flex-parent {
  /* display: block inline-block flex grid*/
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.flex-child {
  width: 99px;
  height: 150px;
  background-color: red;
}
```
html
```html
  <div class="flex-parent">
    <div class="flex-child"></div>
    <div class="flex-child"></div>
    <div class="flex-child"></div>
    <div class="flex-child"></div>
    <div class="flex-child"></div>
    <div class="flex-child"></div>
    <div class="flex-child"></div>
    <div class="flex-child"></div>
    <div class="flex-child"></div>
  </div>
```

## Grid - align to bottom of card

[![alt text](/assets/2021-11-05/align.jpg "flex")](/assets/2021-11-05/align.jpg)

Do we deal with all on same level, or split left and right?

```html
  <div class="card">
    <div class="img"></div>
    <div class="img"></div>
    <div class="content"></div>
    <div class="buttons"></div>
  </div>
```

or simpler to reason about:

```html
  <div class="card">
    <div class="image"></div>
    <div class="details">
      <div class="content"></div>
      <div class="buttons"></div>
    </div>
  </div>

```

flexbox is more about the children
grid is more about the overall layout

[![alt text](/assets/2021-11-05/not-align.jpg "flex")](/assets/2021-11-05/not-align.jpg)

could do old school:


```css
.card-details {
  position: relative;
}

.card-buttons {
  position: absolute;
  bottom: 0;
}
```
This is not good as 'out of flow'

so if we had loads of content the buttons would end of on top

There are more modern things we can do.

We could have another grid inside `card-details`

```css
.card {
  border: 2px solid orange;
  padding: 20px;

  width: 600px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.card-image {
  height: 300px;
  background: orange;
}

.card-details {
  display: flex;
  flex-direction: column;
}

.card-buttons {
  /* same as marging-top: auto (in English) */
  /* this puts pushed buttons down*/
  margin-block-start: auto;
}
```

[![alt text](/assets/2021-11-05/good.jpg "flex")](/assets/2021-11-05/good.jpg)

So a grid with 2 columns

Then a nested flexbox in the right hand column

## Another 3rd flex nest

```css
.card-details {
  display: flex;
  flex-direction: column;
}

.card-buttons {
  /* same as margin-top: auto (in English) */
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}
```


[![alt text](/assets/2021-11-05/good3.jpg "flex")](/assets/2021-11-05/good3.jpg)