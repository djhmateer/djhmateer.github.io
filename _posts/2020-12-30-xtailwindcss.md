---
layout: post
title: TailwindCSS
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

[tailwindcss.com](https://tailwindcss.com/) is a CSS framework. It is a PostCSS (CSS preprocessor) javascript plugin which looks for custom markers in a .css file, replacing them with css.

[tailwindui.com](https://tailwindui.com/) is the commercial UI components.

I build SaaS products, so need some sort of front UI strategy that is:

- Professional
- Easy to change
- Modern / lightweight
- Don't need to worry about legacy browsers

Also I'm a back end developer, so something with prebuilt presets to help me with colours, components etc..

"Give you professional looking results even if you're not a designer" - [Designing with TailwindCSS videos](https://www.youtube.com/watch?v=21HuwjmuS7A&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR) - sold!

[my-tailwind-project](https://github.com/djhmateer/my-tailwind-project) on GitHub is the sample code for this article.

[designing-with-tailwindcss](https://github.com/tailwindlabs/designing-with-tailwindcss) is the source code that the tailwind author uses in his [videos](https://www.youtube.com/playlist?list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR)

## Setup and Install (Video 1)

[video 1](https://www.youtube.com/watch?v=21HuwjmuS7A&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=1&t=16s)

Lets do a simple plain site [https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)

And lets use VS Code (as that is what people seem to be using, and VS 2019 doesn't seem to be there)

To get tailwindcss and it's dependencies lets use npm.

```bash
# I'm using the 14.15.1 LTS version of Node which has NPM version of 6.14.10
# 30th Dec 2020
node --version
npm --version
# update npm if a patch available
sudo npm install npm@latest -g

# create an empty package.json file
npm init -y

# + tailwindcss@2.0.2
# + autoprefixer@10.1.0
# + postcss-cli@8.3.1
npm install tailwindcss postcss-cli autoprefixer

# creates an empty tailwind.config.js file
# for customising tailwind
npx tailwind init

```

create `postcss.config.js`

```js
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer')
    ]
}
```

create `css/tailwind.css`

tailwind works by looking for custom markers and replacing them with generated code:

```css
/* this is a tailwind directive with parameter of base */
@tailwind base;
/* these markers will be replaced with css by the postcss javascript compiler */
/* will replace with all base, component and utility css classes */
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

Which then generates `public/build/tailwind.css'

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

<!-- [![alt text](/assets/2020-12-30/hello-world.jpg "Hello World"){:width="300px"}](/assets/2020-12-30/hello-world.jpg) -->
[![Hello World](/assets/2020-12-30/hello-world.jpg "Hello World")](/assets/2020-12-30/hello-world.jpg)

It works - we have built our own CSS and rendered it.

[![Hello World2](/assets/2020-12-30/hello-world2.jpg "Hello World2")](/assets/2020-12-30/hello-world2.jpg)

Interestingly `tailwind.css` is 3.9MB - yikes. we certainly need to minify, and hopefully tree-shake (spoiler - [PurgeCSS](https://purgecss.com/)).

## VS Code with Live Reload

`.vscode/settings.json` create this file, so that when the live reload server started up the URL will be `http://127.0.0.1:5501/index.html`

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

[![Large assets](/assets/2020-12-30/azure.jpg "Large assets")](/assets/2020-12-30/azure.jpg)

So this is interesting - 3.9MB of resources, yet only 317kB transferred. It was gzip encoded. Firefox gave slightly different sizes..and the server was quite slow. Interesting.

## Designing with Tailwind CSS (Video 2)

[Second video](https://www.youtube.com/watch?v=Ybybd3GCNn4&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=2)

[source](https://github.com/tailwindlabs/designing-with-tailwindcss) from the author with nice images for the tutorials.


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

Side by side using flex box. 4 different screen sizes the splash page is optinised for.

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

There is nice 1,2,3 column rendering of the cards

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

eg logo-blue.svg which is a colour which doesn't come with tailwind by default.


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


## Optimising for Production with Purgecss (Video 8)

[video 8](https://www.youtube.com/watch?v=bhoDwo24K5Q&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=8)

Minified the whole CSS is around 400kB, and Gzipped over the wire it is around 66kB (tailwind1.x)
Just Gzipped and not minified I saw 511kB (tailwind 2 on the 5th Jan 2021)

[Purgecss](https://purgecss.com/) is a tool to remove unused CSS.

Purgcss is available as a [Postcss plugin](https://purgecss.com/plugins/postcss.html#installation)

```bash
npm install @fullhuman/postcss-purgecss

```

VS Code - Ctrl P to search files in the command pallette

Need to include any file that contains html in our project

Purgecss just uses regex to find tokens in the html (ie class names)

```js
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
            content: [
                './public/index.html'
            ],
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        })
    ]
}
```

[Filesize VS Code extension](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize) to show to filesize.

So now I've got 17kB and Gzipped at 4.77kB. Not minified yet.

As it takes some time, we flag it to only run Purge on a production build

How to set NODE_ENV?

[Looks like PurgeCSS is included under the hood now](https://tailwindcss.com/docs/optimizing-for-production)

```js
// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.html',
  ],

```

This only runs when NODE_ENV is set to production

```bash
export NODE_ENV=production
npm run build
export NODE_ENV=development
```
9.6 kB now (not minified) and 3.1 kB Gzipped



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

## Resources

[awesome-tailwindcss](https://github.com/aniftyco/awesome-tailwindcss)


https://news.ycombinator.com/item?id=22422873

Designing with Tailwind CSS: Setting up Tailwind and PostCSS

https://adamwathan.me/

https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

https://www.reddit.com/r/tailwindcss/



## Tutorials

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