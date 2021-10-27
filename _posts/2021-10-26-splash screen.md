---
layout: post
title: Splash Screen
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

Life is to be enjoyed

I've spent a lot of time learning about the beauty of back end code

I do appreciate front end styling, but have never put time into it until now.


So lets just do something.

Art purely for fun!


## A Splash Screen

[https://remix.run/](https://remix.run/) looks very exciting as a product, and I was impressed by their splash screen.

[![alt text](/assets/2021-10-26/remix.jpg "remix"){:width="600px"}](/assets/2021-10-26/remiz.jpg)

So lets learn how to make something in this style.

## Put in HTML Content

```html
<!doctype html>
<html>

<head>
	<meta charset="UTF-8" />

	<title>Remix - Build Better Websites</title>

	<link rel="stylesheet" href="css/style.css">
</head>

<body>
	<header>
		Remix logo
		Dashboard
		Github

	</header>

	<main>

		<div class="toptext">
			After over a year of development, Remix v1.0 is around the corner, and it’s going open source
		</div>

		<div class="middletext">
			After over a year of development, Remix v1.0 is around the corner, and it’s going open source
		</div>

		<div class="buttons">
			<button>READ ABOUT THE FUND RAISE</button>
			<button>GET NOTIFIED WHEN V1.0 SHIPS</button>
		</div>

	</main>

	<footer>
		Remix logo

		GH logo
		Twitter logo
		YT logo
	</footer>

</body>

</html>
```
Just put the raw text together

## Layout

No lets try flexbox

Getting elements in the right place using margin and padding (either work fine)


## Colors

[Chrome color picker](https://chrome.google.com/webstore/detail/colorpick-eyedropper/ohcpnigalekghcmgcdcenkpelffpdolg?hl=en) seemed good.

[![alt text](/assets/2021-10-26/colors.jpg "colors"){:width="600px"}](/assets/2021-10-26/colors.jpg)

So it gets pretty complex using Tailwind - I'm aiming to build simplicity.

Background Color: #121212
White Text: #FFFFFF
Blue v1.0 Text: #3992FF
Yellow open text: #FECC1B

Used the color picker to easily get hex color codes.

The light grey text was a bit tricky to see, so using Chrome Dev Tools (and I can see they are using TailwindCSS from here):

light gray: #B7BCBE - rgb(183, 188, 190)

## Font Family

body font size is 16px from looking at source. They put it on html, but I've kept it on body. Seems like [it could be an issue](https://stackoverflow.com/questions/6905834/should-i-set-the-default-font-size-on-the-body-or-html-element#:~:text=3%20Answers&text=Now%20that%20the%20rem%20unit,rem%20stands%20for%20root%20em).) but probably not for me now.

```css
html {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
```

`font-family` property specifies the font for an element, and fallback if the browser doesn't support the first font, it tries the next font.

There are two types of font family names:

- family-name - The name of a font-family, like "times", "courier", "arial", etc
- generic-family - The name of a generic-family, like "serif", "sans-serif", "cursive", "fantasy", "monospace"

Start with the font you want, and always end with a generic family, to let the browser pick a similar font in the generic family, if no other fonts are available.

[https://www.w3schools.com/cssref/pr_font_font-family.asp](https://www.w3schools.com/cssref/pr_font_font-family.asp) above advice.

`ui-` should map to the default font of the system, non map to default of the browser.

[source](https://stackoverflow.com/questions/65557819/difference-between-ui-sans-serif-sans-serif-and-system-ui-generic-font-names-in)

## Founders Grotesk replace with Roboto

[https://klim.co.nz/buy/founders-grotesk/](https://klim.co.nz/buy/founders-grotesk/) so they are using a font which you need to pay for.

[http://www.identifont.com/list?3+Founders%20Grotesk+0.30+2AA4+1+55C8+2+3NYQ+2+44OC+2+34WM+2+47K+2+59MS+2+59MQ+2+34UW+2+4DXB+2+NR+2+P9V+2+3FP6+2+40B8+2+4QA2+2+2DUQ+2+DBU+2+2OOM+2+4550+2+LLP+2+E4+2+2RR1+2+66P+2+3ZOI+2+X6+2+1Z56+2+34WY+2+RX+2+LM+2+3EBR+2](http://www.identifont.com/list?3+Founders%20Grotesk+0.30+2AA4+1+55C8+2+3NYQ+2+44OC+2+34WM+2+47K+2+59MS+2+59MQ+2+34UW+2+4DXB+2+NR+2+P9V+2+3FP6+2+40B8+2+4QA2+2+2DUQ+2+DBU+2+2OOM+2+4550+2+LLP+2+E4+2+2RR1+2+66P+2+3ZOI+2+X6+2+1Z56+2+34WY+2+RX+2+LM+2+3EBR+2) shows similar fonts

So I've gone with Google's signature font Roboto:

```html
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto">
```
