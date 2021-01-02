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

[tailwindcss.com](https://tailwindcss.com/) is a CSS framework. It is a PostCSS (CSS preprocessor) javascript plugin which looks for custom makers in a .css file, replacing them with css.

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

## Setup and Install

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
[![alt text](/assets/2020-12-30/hello-world.jpg "Hello World")](/assets/2020-12-30/hello-world.jpg)

It works - we have built our own CSS and rendered it.

[![alt text](/assets/2020-12-30/hello-world2.jpg "Hello World2")](/assets/2020-12-30/hello-world2.jpg)

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

[![alt text](/assets/2020-12-30/options.jpg "Options")](/assets/2020-12-30/options.jpg)

Deploy the public folder (right click on the project to set the folder)

[https://mytailwindproject.azurewebsites.net](https://mytailwindproject.azurewebsites.net)

[![alt text](/assets/2020-12-30/mytailwindproject.jpg "Going live")](/assets/2020-12-30/mytailwindproject.jpg)

By default it created a free website in the centralus region. There is an advanced option, but I prefer to script it, or use the GUI to get the naming convention I want.

[![alt text](/assets/2020-12-30/azure.jpg "Large assets")](/assets/2020-12-30/azure.jpg)

So this is interesting - 3.9MB of resources, yet only 317kB transferred. It was gzip encoded. Firefox gave slightly different sizes..and the server was quite slow. Interesting.

## Designing with Tailwind CSS

[Second video](https://www.youtube.com/watch?v=Ybybd3GCNn4&list=PL7CcGwsqRpSM3w9BT_21tUU8JN2SnyckR&index=2)

[source](https://github.com/tailwindlabs/designing-with-tailwindcss) from the author with nice images for the tutorials.





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