---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: ror 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2024-04-24/5.jpg "email"){:width="500px"}](/assets/2024-04-24/5.jpg) -->
<!-- [![alt text](/assets/2024-04-24/5.jpg "email")](/assets/2024-04-24/5.jpg) -->

<!-- [![alt text](/assets/2024-05-23/1.jpg "email"){:width="500px"}](/assets/2024-05-23/1.jpg) -->


[tailwindui.com](https://tailwindui.com/) are the commerical components of [tailwindcss](https://tailwindcss.com/)

I'm using Ruby on Rails and want a 

- Professional looking few page site
- Top Menu
- Mobile friendly
- Form elements
- Submit button
- Footer

Also

- Login box
- Great looking 404 page

## VS Code Formatter 

I'm using straight html and a direct css link to develop the site initially and serving via vs code live server.

```html
  <script src="https://cdn.tailwindcss.com"></script>
```

settings, html format, HTML Format Wrap Line Length, 0 disable

- Ctrl Shift P, format documnent
- Ctrl / - comment and uncomment

## Blocks

- Stacked Layout - Dashboard
- Container - constrained with padded content (the form below)
- Form Layouts - Stacked


## Datepicker

[https://flowbite.com/docs/plugins/datepicker/](https://flowbite.com/docs/plugins/datepicker/)




Also the getting started on Rails [guide](https://flowbite.com/docs/getting-started/rails/)


## Icons

[https://heroicons.com/](https://heroicons.com/)



## Autocomplete

html attribute

## Map

I want to be alble to point on a map and get a lat, long coordinate back.

- Google Maps
- Azure Maps (was Bing Maps) - 5,000 map tiles are free. Then $4.50 per 1,000 transactions <500k
- Mapbox
- Leaflet.js

Lets try Azure maps first.


[https://learn.microsoft.com/en-gb/azure/azure-maps/quick-demo-map-app](https://learn.microsoft.com/en-gb/azure/azure-maps/quick-demo-map-app)

Create an `Azure Maps Account` resource

rg: maps
name: ContosoMaps

Get Primary key (Shared Key)

Patch into line 70 of the html sample [here](https://github.com/Azure-Samples/AzureMapsCodeSamples/blob/main/Samples/Tutorials/Interactive%20Search/Interactive%20Search%20Quickstart.html)

The above is a good sample - be careful as there are other examples which use the v2 version of the sdk which cause side effects with Tailwind.

[https://samples.azuremaps.com/](https://samples.azuremaps.com/)

## Form with background image

Similar to [https://otplink.icc-cpi.int/](https://otplink.icc-cpi.int/)

I've got a 

- Nav bar with mobile
- Form layout
- Icons
- Validation errors
- Auto complete
- Date Picker with javascript
- Map with javascript to patch coordinates into input box

So I can do a full page bg image via:

```html
<!-- height and width are full-->
<div class="flex h-screen w-full">
  <!-- flex-1 takes all available space in flex container -->
   <!-- bg-cover backgroudn image entire div without stretching -->
   <!-- centers within div -->
   <!-- no repeat -->
  <div class="flex-1 bg-hero bg-cover bg-center bg-no-repeat"></div>
</div>
```

Chat GPT was excellent at helping with this. I ended up with

```html

```











## .html.erb
For working with html.erb files

- format the html
- be able to comment and uncomment lines easily

I use 

- Rails (which uses Slim)

to get =begin%> and =end%>

ctrl shift p, open user settings (json)

## Menu

With help from ChatGPT I've put in some id's to help with javascript menu expand/collapse
```html
  <header class="bg-white">
  <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="flex lg:flex-1">
      <a href="#" class="-m-1.5 p-1.5">
        <span class="sr-only">Your Company</span>
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
      </a>
    </div>
    <div class="flex lg:hidden">
    <!-- DM -->
      <button id="open-menu-button" type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span class="sr-only">Open main menu</span>
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
    <div class="hidden lg:flex lg:gap-x-12">
      <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Product</a>
      <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Features</a>
      <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
      <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Company</a>
    </div>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
    </div>
  </nav>
  <!-- Mobile menu, show/hide based on menu open state. -->
  <!-- DM -->
  <div id="mobile-menu" class="lg:hidden" role="dialog" aria-modal="true">
    <!-- Background backdrop, show/hide based on slide-over state. -->
    <div class="fixed inset-0 z-10"></div>
    <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div class="flex items-center justify-between">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
        </a>
        <!-- DM -->
        <button id="close-menu-button" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Close menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Product</a>
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
          </div>
          <div class="py-6">
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

```

## Rails config

Here is a way to wire up the js in rails:

```bash
# app/javascript/direct_uploads.js
# put custom js in here


# /config/importmap.rb
 pin "direct_uploads", to: "direct_uploads.js"

 # app/javascript/application.js
 import "direct_uploads" 

# /config/tailwind.config.js
```

and foo.js
```js
// javascript/foo.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("Hello from foo.js!")
    const openMenuButton = document.getElementById('open-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
  
    openMenuButton.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  
    closeMenuButton.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
```
