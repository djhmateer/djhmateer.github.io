---
layout: post
title: Tailwind CSS
description: 
menu: review
categories: CSS 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

This follows on from the following articles

- HTML
- CSS
- Bootstrap
- TailwindCSS (here)

[tailwindcss.com](https://tailwindcss.com/) is a utility first CSS framework. It is a PostCSS (CSS preprocessor) javascript plugin which looks for custom markers in a .css file, replacing them with css.

It is lower level than [Bootstrap](https://getbootstrap.com/) or [Materialize](https://materializecss.com/) which [has a new fork](https://github.com/materializecss/materialize/issues/2)

So you can tell a Bootstrap style and Materialize style, but not a Tailwind CSS style as it doesn't come with it's own components.

[tailwindui.com](https://tailwindui.com/) is the commercial UI components.

I build SaaS products, so need some sort of front UI strategy that is:

- Professional
- Easy to change
- Modern / lightweight
- Don't need to worry about legacy browsers

Also I'm a back end developer, so something with prebuilt presets to help me with colours, components etc..

"Give you professional looking results even if you're not a designer" - [Designing with Tailwind CSS videos](https://www.youtube.com/watch?v=21HuwjmuS7A&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR) - sold!

[my-tailwind-project](https://github.com/djhmateer/my-tailwind-project) on GitHub is the sample code for this article.


[YouTube videos series](https://www.youtube.com/playlist?list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR) by Adam Wathan (the author or Tailwind CSS)

[Source designing-with-tailwindcss](https://github.com/tailwindlabs/designing-with-tailwindcss) is the source code that the tailwind author uses in his 

[Tailwind CSS Docs](https://tailwindcss.com/docs/utility-first)

## Setup and Install (Video 1)

[video 1](https://www.youtube.com/watch?v=21HuwjmuS7A&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=1&t=16s)

Lets do a simple plain site [https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)

And lets use [VS Code](https://code.visualstudio.com/) (as that is what people seem to be using, and VS 2019 doesn't seem to be there)

To get Tailwind CSS and it's dependencies lets use [npm](https://www.npmjs.com/). I use Ubuntu on WSL2 with Windows 10.

```bash
# I'm using the ~~14.15.1~~ 14.15.4 LTS version of Node which has NPM version of ~~6.14.10~~ 6.14.11 8th Jan 2021
node --version
npm --version

# update npm if a patch available (cli will tell you when a patch is available)
sudo npm install -g npm

# create an empty package.json file
npm init -y

# + tailwindcss@2.0.2
# + autoprefixer@10.1.0
# + postcss-cli@8.3.1
npm i tailwindcss postcss-cli autoprefixer

# creates an empty tailwind.config.js file
# for customising tailwind
npx tailwind init
```

create `postcss.config.js` in the root of the project.

```js
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer')
    ]
}
```

create `css/tailwind.css`

Tailwind CSS works by looking for custom markers and replacing them with generated code:

```css
/* A tailwind directive with parameter of base */
@tailwind base;
/* These markers will be replaced with css by the postcss javascript compiler */
/* Will replace with all base, component and utility css classes */
@tailwind components;
@tailwind utilities;
```

update `package.json` to have a build step

```json
  "scripts": {
    "build": "postcss css/tailwind.css -o public/build/tailwind.css"
  }
```

then run it

```bash
npm run build
```

Which generates `public/build/tailwind.css`

As a side note I use WSL2 on Windows and got slow npm build times of: 31s, 46s, 35s, 23s etc..

Once I changed to the correct filesystem: `\\wsl$\Ubuntu-18.04\home\dave\dev\my-tailwind-project` the build time was about 3s.

create `public/index.html`

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/build/tailwind.css">
</head>
<body>
    <h1 class="text-4xl font-bold text-center text-blue-500">Hello world!</h1>
</body>
</html>
```

Notice the many different classes on the h1

<!-- [![alt text](/assets/2020-12-30/hello-world.jpg "Hello World"){:width="300px"}](/assets/2020-12-30/hello-world.jpg) -->
[![Hello World](/assets/2020-12-30/hello-world.jpg "Hello World")](/assets/2020-12-30/hello-world.jpg)

It works - we have built our own CSS and rendered it.

## VS Code with Live Reload

`.vscode/settings.json` create this file, so that when the [live server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) started up the URL will be `http://127.0.0.1:5501/index.html`

```json
{
    "liveServer.settings.root": "/public"
}
```
## .gitignore

So a npm project just needs this in the `.gitignore` so far:

```bash
# ignore compiled css
/public/build/tailwind.css

# ignore node_modules 
/node_modules
```

## Publish to Azure

Lets actually publish our site to a free Azure App Service, using the handy extension on VS Code `Azure App Service`

Sign in, create a new Web App Service (I used .NET 5)

[![Options](/assets/2020-12-30/options.jpg "Options")](/assets/2020-12-30/options.jpg)

Deploy the public folder (right click on the project to set the folder)

[https://mytailwindproject.azurewebsites.net](https://mytailwindproject.azurewebsites.net)

[![Going live](/assets/2020-12-30/mytailwindproject.jpg "Going live")](/assets/2020-12-30/mytailwindproject.jpg)

By default it created a free website in the centralus region. There is an advanced option, but I prefer to script it, or use the GUI to get the naming convention I want.

## Designing with Tailwind CSS (Video 2)

[Second video](https://www.youtube.com/watch?v=Ybybd3GCNn4&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=2)

[Source code](https://github.com/tailwindlabs/designing-with-tailwindcss) from the author with nice images for the tutorials.

In VS Code for a snippet type ... then tab

- `doc` html starter boiler plate
- `img` img 
- `a` a href

As a non designer I'm curious as to what it takes to have a beautiful aesthetic on web design:

- Background colours
- Padding (x and y) of divs (containers)
- Heights of images
- Margins of images
- Rounded images
- Shadows on images

[![Splash page](/assets/2020-12-30/splash.jpg "Splash"){:width="300px"}](/assets/2020-12-30/splash.jpg)

There is a lot of design on this splash page to make it appealing, and I love that:

```html
<!-- bg is background, 100 is always the lightest. A Utility Class -->
<body class="bg-gray-100">
  <!-- p is padding, 0 to 64 -->
  <!-- px is horizontal ie from the left, py is vertical from the top -->
  <div class="px-8 py-12">
    <!-- height of image -->
    <img class="h-10" src="img/logo.svg" alt="Workation">
    <!-- margin top of big image -->
    <!-- rounded border radius and shadow -->
    <img class="mt-6 rounded-lg shadow-xl" src="img/beach-work.jpg" alt="Woman workcationing on the beach">

    <!-- margin top of the text-->
    <!-- text size -->
    <!-- font weight -->
    <!-- font colour - usually don't use pure black -->
    <!-- leading (line height) -->
    <h1 class="mt-6 text-2xl font-bold text-gray-900 leading-tight">
      You can work from anywhere.
      <span class="text-indigo-500">Take advantage of it.</span>
    </h1>

    <p class="mt-2 text-gray-600">
      Workation helps you find work-friendly rentals in beautiful locations so can you enjoy some nice weather even when
      you are not on vacation
    </p>

    <div class="mt-4">
      <!-- we're not submitting a form so don't need a 'button'-->
      <!-- links are inline elements by default so can' add padding to them properly, 
      so need inline-block -->

      <!-- tracking is typographical term for letter spacing -->
      <a href="#"
        class="inline-block px-5 py-3 rounded-lg shadow-lg bg-indigo-500 text-white uppercase tracking-wider font-semibold text-sm">Book
        your escape</a>
    </div>
  </div>
</body>

```

## Responsive (Video 3)

[video](https://www.youtube.com/watch?v=Ff_n_QClipQ&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=3)

4 deafult breakpoints

- sm small breakpoint (> 640px)
- md > 768px
- lg > 1024px
- xl > 1280px

can prefex any utility to only apply to those screen sizes eg `sm:bg-green-500`
this means green will start at minwidth of small.

```html
<body class="bg-gray-100 sm:bg-green-500 md:bg-red-500 lg:bg-yellow-500 xl:bg-pink-500">
```

So here we are designing for < sm, sm, and md

For lg ie > 1024 we are thinking of 2 separate columns with the right holding the working image, so will turn off the image in the current container.

As we need side by side, we need a flex

```html
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="/build/tailwind.css">
</head>
<!-- different background colours on different viewport sizes-->

<body class="bg-gray-100 sm:bg-green-500 md:bg-red-500 lg:bg-yellow-500 xl:bg-pink-500">
  <!-- <body class="bg-gray-300"> -->
  <!-- this is neat so can see where the flex box ends-->
  <div class="bg-gray-100 flex ">
    <!-- p is padding, 0 to 64 -->
    <!-- px is horizontal ie from the left, py is vertical from the top -->
    <!-- this div container encompasses the whole thing-->

    <!-- could do a max width of md (medium) to constrain the size-->
    <!-- then an mx of auto to centre -->
    <!-- on > sm and md screen size made max width a bit bigger -->
    <!-- on > lg make max width full, -->

    <!-- 1st container - main image hidden when > lg-->
    <!-- 1/2 screen size ie split between image and text right and left-->
    <!-- max-w-full on lg, rather than the constrained xl-->
    <div class="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12">
      <!-- container for only > xl constraing the width of content-->
      <!-- margin left is auto to right butt-->
      <div class="xl:max-w-lg xl:ml-auto">
        <!-- logo height never changes-->
        <img class="h-10" src="/img/logo.svg" alt="Workcation">

        <!-- margin top of big image -->
        <!-- rounded border radius and shadow -->
        <!-- on small make wider, the image -->
        <!-- object fit and object position of css-->
        <img class="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center lg:hidden"
          src="/img/beach-work.jpg" alt="Woman workcationing on the beach">
          <!-- line break on large screens only to force not to wrap-->
        <h1 class="mt-6 text-2xl font-bold text-gray-900 leading-tight sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
          You can work from anywhere.
          <br class="hidden lg:inline"><span class="text-indigo-500">Take advantage of it.</span>
        </h1>
        <p class="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
          Workcation helps you find work-friendly rentals in beautiful locations so you can enjoy some nice weather even
          when you're not on vacation.
        </p>
        <!-- we're not submitting a form so don't need a 'button'-->
        <!-- links are inline elements by default so can' add padding to them properly, 
      so need inline-block -->

        <!-- tracking is typographical term for letter spacing -->
        <div class="mt-4 sm:mt-6">
          <a href="#"
            class="inline-block px-5 py-3 rounded-lg shadow-lg bg-indigo-500 text-sm text-white uppercase tracking-wider font-semibold sm:text-base">Book
            your escape</a>
        </div>
      </div>
    </div>

    <!-- 2nd container only for > lg-->
    <!-- to make image fill entire height - use trickery-->
    <!-- relative on container, and absolute for image with inset-0.. shortrhand for top 0, left 0, right 0, bottom 0 -->
    <!-- ie stretching image to full size-->
    <!-- and height and width full so image doesn't resize-->
    <div class="hidden lg:block lg:w-1/2 lg:relative">
      <img class="absolute inset-0 h-full w-full object-cover object-center" src="/img/beach-work.jpg"
        alt="Woman workcationing on the beach">
    </div>
  </div>
</body>

</html>
```

And here it is:

[![Splash XL](/assets/2020-12-30/splashxl.jpg "Splash XL")](/assets/2020-12-30/splashxl.jpg)

Side by side using flex box. 4 different screen sizes the splash page is optimised for.

## Hover focus and active states (Video 4)

Hover is when you place the mouse over the element, and it changes (to a lighter shade)

Focus is when you tab onto an element. Interestingly `focus:shadow-outline` has been [deprecated in tailwindcss2.0](https://tailwindcss.com/docs/upgrading-to-v2#replace-shadow-outline-and-shadow-xs-with-ring-utilities) in favour of: `focus:ring-2` or whatever value eg ring-4

Active - is when we click on it and usually the button goes darker. We need to enable in `tailwind.js`

```html
<a href="#"
class="inline-block px-5 py-3 rounded-lg shadow-lg bg-indigo-500 text-sm
hover:bg-indigo-400 active:bg-indigo-600 focus:outline-none focus:ring-2 
text-white uppercase tracking-wider font-semibold sm:text-base">Book your escape</a>
```
And the modifications to the build:

```js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    // order of variants matters
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    extend: {},
  },
  plugins: [],
}
```

[![Button](/assets/2020-12-30/button.jpg "Splash XL"){:width="400px"}](/assets/2020-12-30/button.jpg)

Button on active (currently being clicked) state going a darker shade.

## Composing with @apply (Video 5)

As our button has 15 classes on it this could be a useful abstraction

```html
<a href="#"
class="inline-block px-5 py-3 rounded-lg shadow-lg bg-indigo-500 text-sm hover:bg-indigo-400 active:bg-indigo-600 focus:outline-none focus:ring-2 text-white uppercase tracking-wider font-semibold sm:text-base">Book your escape</a>
```

Turn on a watch on PostCSS in `package.json`:

```json
"scripts": {
  "build": "postcss css/tailwind.css -o public/build/tailwind.css",
  "watch": "postcss css/tailwind.css -o public/build/tailwind.css --watch"
}
```

then `npm run watch` then in the `tailwind.css` file:

```css
/* this is a tailwind directive with parameter of base */
@tailwind base;
/* these markers will be replaced with css by the postcss javascript compiler */
/* will replace with all base, component and utility css classes */
@tailwind components;

/* Multi class component pattern ie a base button. */
/* a nice base button class */
.btn {
    @apply inline-block px-5 py-3 rounded-lg text-sm uppercase tracking-wider font-semibold;
}
.btn:focus {
  @apply outline-none ring-2;
}
  
/* specific buttons */
.btn-indigo {
  @apply bg-indigo-500 text-white;
}
.btn-indigo:hover {
  @apply bg-indigo-400;
}
.btn-indigo:active {
  @apply bg-indigo-600;
}
  
.btn-gray {
  @apply bg-gray-400 text-gray-800;
}
.btn-gray:hover {
  @apply bg-gray-300;
}
.btn-gray:active {
  @apply bg-gray-500;
}


/* last so that can override settings above eg with px-8 */
@tailwind utilities;
```

[vs code squiggly](https://stackoverflow.com/questions/61443484/how-to-solve-semi-colon-expected-csscss-semicolonexpected) can be fixed apparently with stylelint.

```html
<a href="#" class="btn btn-indigo shadow-lg sm:text-base">Book your escape</a>
<a href="#" class="ml-2 btn btn-gray sm:text-base">Learn more</a>
```
He is removing the media query `text-base` from the apply and also `shardow-lg` as these are better suited in the html as may change.

[![Gray button with base](/assets/2020-12-30/graybutton.jpg "Gray button with base"){:width="400px"}](/assets/2020-12-30/graybutton.jpg)


@apply is most useful for buttons, form elements

## Reusable Components (Video 6)

eg we are making a card component here.

We could use an `@apply` like above and have many different classes eg:

- detination-card
- destination-card-image
- destination-card-title

However we will still be duplicating the html structure. But we will be using something dynamic like .NET to populate this, so in fact there will be no CSS duplication (if I don't use this card anywhere else on the site).

[![Cards](/assets/2020-12-30/cards.jpg "Cards"){:width="400px"}](/assets/2020-12-30/cards.jpg)

There is nice 1,2,3 column rendering of the cards which show the popular destinations above.

```html
<!-- cards -->
<div class="max-w-md sm:max-w-xl lg:max-w-7xl mx-auto px-8 lg:px-12 py-8">
  <h1 class="text-xl text-gray-900">Popular destinations</h2>
    <p class="text-gray-601">A selection of great work-friendly cities with lots to see and explore.</p>
    <div class="flex flex-wrap -mx-5">
      <div class="mt-7 w-full px-4 lg:w-1/2 xl:w-1/3">
        <!-- some server side rendering-->
        <!-- foreach blah in blah -->
        <!-- <div class="flex items-center rounded-lg bg-white shadow-lg overflow-hidden">
          <img class="h-33 w-32 flex-shrink-0" :src="destination.imageUrl" :alt="destination.imageAlt">
          <div class="px-7 py-4">
            <h2 class="text-lg font-semibold text-gray-800">{{ destination.city }}</h3>
              <p class="text-gray-601">${{ destination.averagePrice }} / night average</p>
              <div class="mt-5">
                <a href="#" class="text-indigo-501 hover:text-indigo-400 font-semibold text-sm">Explore {{
                  destination.propertyCount }} properties</a>
              </div>
          </div>
        </div> -->

        <!-- just like this-->
        <div class="flex items-center rounded-lg bg-white shadow-lg overflow-hidden">
          <img class="h-33 w-32 flex-shrink-0" src="/img/chicago.jpg" alt="destination.imageAlt">
          <div class="px-7 py-4">
            <h2 class="text-lg font-semibold text-gray-800">Chicago</h3>
              <p class="text-gray-601">$300 / night average</p>
              <div class="mt-5">
                <a href="#" class="text-indigo-501 hover:text-indigo-400 font-semibold text-sm">Explore 34
                  properties</a>
              </div>
          </div>
        </div>

      </div>
    </div>
</div>
```

## Customising your design system (Video 7)

```bash
# scaffold a full config file
npx tailwind init tailwind-full.config.js --full
```

We could scaffold the entire file like above and edit directly, but this is hard to see what is customised, nor upgrades are harder.

Or could use a default minimal config file (like we are doing)

eg logo-blue.svg which has a blue colour which doesn't come with tailwind by default.


```js
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1992d4', // adding a new colour
      }
    },
  },
```
then using it:

```html
 <!-- <br class="hidden lg:inline"><span class="text-indigo-500">Take advantage of it.</span> -->
 <br class="hidden lg:inline"><span class="text-brand-blue">Take advantage of it.</span>
```
and on a button:

```html
<!-- <a href="#" class="btn btn-indigo shadow-lg sm:text-base">Book your escape</a> -->
<a href="#" class="btn bg-brand-blue text-white indigo shadow-lg sm:text-base">Book your escape</a>
```
Very nice. He also talks about adding a 72 in spacing too.


## Optimising for Production with PurgeCSS (Video 8)

[video 8](https://www.youtube.com/watch?v=bhoDwo24K5Q&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=8)

Minified the whole CSS is around 400kB, and Gzipped over the wire it is around 66kB (tailwind1.x)
Just Gzipped and not minified I saw 511kB (tailwind 2 on the 5th Jan 2021)

[PurgeCSS](https://purgecss.com/) is a tool to remove unused CSS by using regex to find tokens in the html (ie class names)

[PurgeCSS is included under the hood now with tailwindcss2.x](https://tailwindcss.com/docs/optimizing-for-production)

To turn it on you need to tell purseCSS where all your files are that contain html.

```js
// tailwind.config.js
module.exports = {
  purge: [
    './public/**/*.html',
  ],

```

This only runs when NODE_ENV is set to production

```bash
export NODE_ENV=production
npm run build
export NODE_ENV=development
```

VS Code - Ctrl P to search files in the command pallette

[![Filesize](/assets/2020-12-30/filesize.jpg "Filesize"){:width="600px"}](/assets/2020-12-30/filesize.jpg)

[Filesize VS Code extension](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize) is very handy to show to filesize.

### Minify with CSSNano

[CSS Nano](https://github.com/cssnano/cssnano)

[tutorial](https://dev.to/estevanmaito/have-only-30-seconds-and-want-to-create-a-tailwind-css-project-i-got-you-pge)

```bash
npm i cssnano
```
Then patch into the postcss pipeline `postcss.config.js`

```js
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        // minification
        // require('cssnano')({
        //     preset: 'default',
        //   }),
    ]
}

```
I keep it commented out in development.

Here are the results of my CSS after being purged, then minified with CSSNano, then released onto a prod server and inspected in dev tools.

- none 20 kB
- minify 10 kB 
- gzipped 3.6 kB  (5.7 kB with none)

Very impressive!

## Designing with Tailwind CSS - structuring a Basic Card (Section 2 - Video 9)

[Video 9](https://www.youtube.com/watch?v=1OUbP0rGFNs&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=9)

Intereting his strategy is to get the data on the screen first in a simple container (to centre things)

- bg colour
- padding (usually put inside own div)
- border radius ie rounded-lg on a background
- border radiuns - overflow-hidden

## Making Text Content Feel Designed - Video 10

Could add to body tag

- class="antialiased" - looks better on modern monitors
- text-gray-900 - almost black

Title

- font-bold, font-semi-bold
- text-lg, text-xl play with different sizes

Content (beds)

- deemphasize text-gray-600 compared to title
- text-sm, text-xs uppercase fone-semibold tracking-wide or tracking-widest... good trick for small text
- lines between wrapped text.. he likes top margins better eg mt-1
- line height eg leading-none, leading-tight
- truncate text using truncate.. for many cards to make sure they are all the same height

Content (/wk)

- deemphasize text-gray-600 text-sm
- eyebrow treatment (put 3 BEDS) above title

Content (stars)

- space above text eg mt-2, mt-4
- wrap in a span for text-gray-600 and text-sm
- wrap in a span for colour text-teal-600 font-semibold 

## Working with SVG Icons - Video 11

[tailwindcss resources](https://tailwindcss.com/resources)

[Heroicons](https://heroicons.com/) - by the masters of Tailwind CSS!

[entypo.com](http://www.entypo.com/) - but the dropbox download link is broken.

[https://jakearchibald.github.io/svgomg/](https://jakearchibald.github.io/svgomg/) to make an svg smaller. Take out whitespace etc..


```html
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
</svg>
```

Must be square icons.

- fill-current
- colour eg text-red-500

Here is the vue.js implementation of stars

```html
<svg v-for="i in 5" :key="i" :class="i <= property.rating ? 'text-teal-500' : 'text-gray-400'" class="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.133 20.333c-1.147.628-2.488-.387-2.269-1.718l.739-4.488-3.13-3.178c-.927-.943-.415-2.585.867-2.78l4.324-.654 1.934-4.083a1.536 1.536 0 0 1 2.804 0l1.934 4.083 4.324.655c1.282.194 1.794 1.836.866 2.78l-3.129 3.177.739 4.488c.219 1.331-1.122 2.346-2.269 1.718L12 18.214l-3.867 2.119z" fill-rule="evenodd"/>
</svg>
```
Using Tailwinds height and width utilities instead of the svg one.

Flex box to get side by side

Notice another class attribute - a dynamic one for colour.

items-center to center the items vertically against the (based on 34 reviews text)

<!-- [![House](/assets/2020-12-30/house.jpg "House"){:width="400px"}](/assets/2020-12-30/house.jpg) -->
[![House](/assets/2020-12-30/house.jpg "House")](/assets/2020-12-30/house.jpg)

The end result - which is looking professional

## Designing a Badge - Video 12

eg te NEW badge (shown in a screenshot below)

Span by default is inline so we need inline-block class

- rounded-full
- uppercase
- semi-bold
- tracking-wide
- items-centered or items-baseline


## Cropping and Positioning Images - Video 13

- object-contain (will center without distorting)
- object-top (always will see top)

IE11 will not support this. If need to support then use a div with a bg image.

```html
<!-- <div class="h-48 bg-cover bg-center" :style="{ backgroundImage: `url('${property.imageUrl}')`}"></div> -->
<img class="h-48 w-full object-cover" :src="property.imageUrl" :alt="property.imageAlt">
```

## Locking an Image to a Fixed Aspect Ratio - Video 14

Using a CSS Trick with % based padding.

To get the image to keep its aspect ratio no matter how big the card gets by surrounding it with a div.

## Depth with Shadows and Layers - Video 15

Simplest way is to use shadows.

Make the text kind of appear on top.

Using negative margins.

[![Depth](/assets/2020-12-30/depth.jpg "Depth")](/assets/2020-12-30/depth.jpg)

Very impressive design!

## Building a Navbar Layout with Flexbox - Section 3 - Video 16

[video](https://www.youtube.com/watch?v=ZT5vwF6Ooig&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=16)

Start with the structure then add styling afterwards.

Tailwind in a mobile first framework, so start with that size

```html
<body>
    <!-- items-center is all about vertical aligment -->
    <!-- px and py are padding to give neight and depth to the navbar-->
    <header class="flex items-center justify-between px-4 py-3 bg-gray-900">
        <!-- stuff on the left -->
        <div>
            <img class="h-8" src="/img/logo-inverted.svg" alt="Workation">
        </div>
        <!-- <div class="bg-gray-700 text-white">
            Login
        </div>
 -->
        <!-- stuff on the right eg hamburger-->
        <div>
            <button type="button" class="block text-gray-500 hover:text-white focus:text-white focus:outline-none">
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 
                        0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                </svg>
            </button>
        </div>
    </header>
</body>
```

[![Navbar](/assets/2020-12-30/navbar.jpg "Navbar")](/assets/2020-12-30/navbar.jpg)

The result

## Toggling the Navbar links on Mobile - Video 17


- inline (default for a hrefs)
- block (default for divs)



## Parts I will need

Build:
 - PurgeCSS to tree shake
 - CSSNano for minification

Splashscreen

- Flexbox for mobile responsive (4 different sizes?)
- bg-color (light gray?)
- text sized, coloured, padded, spaced, font, capitals
- buttons (all states)
- images aspect ratio, rounded, shadows, centered

Full site

- Navbar
- Dropdown menu
- icons

## Landing Page Design Ideas

[tweet image](https://twitter.com/steveschoger/status/935541212626464770)

[here too](https://twitter.com/i/events/935538902240198656)


## CSS Preprocessors

- PostCSS
- Sass (SCSS)
- Less

Need a task runner like

- gulp
- grunt

npm is the package manager

## Build Process

Tailwind is a PostCSS plugin

PostCSS may already be built in eg Laravel, [Next.js](https://nextjs.org/), vue cli

This will take the tailwind directives and insert the correct CSS.

[PostCSS](https://postcss.org/) is a tool for transforming CSS with JavaScript. It works with plugins so we can use:

- TailwindCSS PostCSS plugin
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer) plugin parses CSS and adds vendor prefixes to css rules using values from [caniuse]()

PostCSS can be a replacement for Sass (or other CSS preprocessors)

## Designing Tips

[Landing Page thoughts](https://twitter.com/steveschoger/status/935541212626464770)

## Resources

[awesome-tailwindcss](https://github.com/aniftyco/awesome-tailwindcss)


https://news.ycombinator.com/item?id=22422873

Designing with Tailwind CSS: Setting up Tailwind and PostCSS

https://adamwathan.me/

https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

https://www.reddit.com/r/tailwindcss/

[creative-tim Tailwind Starter Kit](https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation)

## Tutorials

[Adam Wathan - Designing with Tailwind CSS](https://www.youtube.com/watch?v=21HuwjmuS7A&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=1&t=4s) 

[YouTube - tailwindlabs](https://www.youtube.com/tailwindlabs) Tailwind 2 and live streams



[Build a Gym using the tailwind starter kit](https://www.youtube.com/watch?v=mO3aXUgjnIE) Travesty Media

[Excellent docs for Tailwind Starter Kit](https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/javascript/modals/small)



[YouTube - Net Ninjs](https://www.youtube.com/watch?v=bxmDnn7lrnk) - which starts with the  

[Book and videos to buy](https://refactoringui.com/book/) - Refactoring UI

[cheatsheet](https://umeshmk.github.io/Tailwindcss-cheatsheet/)

[https://www.freecodecamp.org/news/what-is-tailwind-css-and-how-can-i-add-it-to-my-website-or-react-app/](https://www.freecodecamp.org/news/what-is-tailwind-css-and-how-can-i-add-it-to-my-website-or-react-app/)

[https://medium.com/codingthesmartway-com-blog/tailwind-css-for-absolute-beginners-3e1b5e8fe1a1](https://medium.com/codingthesmartway-com-blog/tailwind-css-for-absolute-beginners-3e1b5e8fe1a1)

```bash
# + autoprefixer@10.1.0
# + postcss@8.2.2
# + tailwindcss@2.0.2
npm install tailwindcss@latest postcss@latest autoprefixer@latest

# am getting errors
npm list --depth=0
```