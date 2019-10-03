---
layout: post
title: Default starting point for Web App 2019 
description: 
menu: review
categories: .NET 
published: true 
comments: false     
sitemap: false
image: /assets/2019-08-05/1.jpg
---

https://www.youtube.com/watch?v=lE8NdaX97m0&list=PLdo4fOcmZ0oW8nviYduHq7bmKode-p8Wy&index=2&t=0s

https://github.com/dotnet-presentations/ContosoCrafts

## Naming

Project:
DMContosoCrafts.WebSite

Solution:
DMContosoCrafts

## Add to Source Control

To add a .gitignore file press the button in VisualStudio

## Where to put files

wwwroot (static stuff)
Graphics css etc
 
wwwroot/data
  products.json

Add new File (Shift+F2) extension
https://marketplace.visualstudio.com/items?itemName=MadsKristensen.AddNewFile

Models
  Product.cs

## json

Going to be using json as a datastore, and the new json serialiser `System.Text.Serialization`

```json
 {
    "Id": "jenlooper-cactus",
    "Maker": "@jenlooper",
    "img": "https:\u002f\u002fuser-images.githubusercontent.com\u002f41929050\u002f61567048-13938600-aa33-11e9-9cfd-712191013192.jpeg",
    "Url": "https:\u002f\u002fwww.hackster.io\u002fagent-hawking-1\u002fthe-quantified-cactus-an-easy-plant-soil-moisture-sensor-e65393",
    "Title": "The Quantified Cactus: An Easy Plant Soil Moisture Sensor",
    "Description": "This project is a good learning project to get comfortable with soldering and programming an Arduino.",
    "Ratings": null
  },

```

The data we will be looking at.


```cs

public class Product
{
    public string Id { get; set; }
    public string Maker { get; set; }
    // Mapping the json img to Image in our Product model
    [JsonPropertyName("img")]
    public string Image { get; set; }

    public string Url { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int[] Ratings { get; set; }
    // Easy way to give a nice view of the product (maybe in VS debugging?)
    // could get rid of <Product>
    public override string ToString() =>
        JsonSerializer.Serialize<Product>(this);
}
```

## Service

I want something.. don't care how you do it. SRP
Services/ folder

```cs
namespace DMCrafts.WebSite.Services
{
    public class JsonFileProductService
    {
        // so we can get the path to products.json
        // passed in
        public JsonFileProductService(IWebHostEnvironment webHostEnvironment) =>
            WebHostEnvironment = webHostEnvironment;

        public IWebHostEnvironment WebHostEnvironment { get; }

        // get the file path and name to load
        private string JsonFileName =>
            Path.Combine(
                WebHostEnvironment.WebRootPath, "data", "products.json");

        // get json text and convert to a list
        public IEnumerable<Product> GetProducts()
        {
            // C#8 using declaration
            using var jsonFileReader = File.OpenText(JsonFileName);
            return JsonSerializer.Deserialize<Product[]>
            (jsonFileReader.ReadToEnd(),
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
        }
    }
}
```

## Razor Pages

Lets display the data on the index.cshtml (csharp html)

Logging is a service that is made available by ASP.NET

```cs
public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    //private readonly JsonFileProductService _productService;

    public JsonFileProductService ProductService;

    // private set so can only be set in this class
    public IEnumerable<Product> Products { get; private set; }

    public IndexModel(
        ILogger<IndexModel> logger,
        JsonFileProductService productService)
    {
        _logger = logger;
        ProductService = productService;
        //_productService = productService;
    }

    public void OnGet()
    {
        Products = ProductService.GetProducts();
    }
}
```

Wiring up our product service inside the index.cshtml.cs code behind. todo - refactor this!

```html
<div class="card-columns">
    @foreach (var product in Model.Products)
    {
        <div class="card">
            <div class="card-img" style="background-image: url('@product.Image')"></div>
            <div class="card-body">
                <h5 class="card-title">@product.Title</h5>
            </div>
        </div>
    }
</div>
```

then woring on the css whichs sits on top of bootstrap:

```css

.checked {
  color: orange;
}

.fa-star {
  cursor: pointer;
}

/* Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
for details on configuring this project to bundle and minify static web assets. */
.card-columns .card:hover .card-img {
    opacity: 1;
    -webkit-transform-style: preserve-3d;
}

.card-columns .card-body {
    height: 100px;
    font-family: 'Nunito', sans-serif;
    background: #fbfafd;
}

.card-columns .card-img {
  height: 330px;
  vertical-align: bottom;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  opacity: .8;
}

.modal .card-img {
  height: 500px;
  vertical-align: bottom;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}

.card-columns .card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(37,33,82,.12), 0 4px 8px rgba(37,33,82,.06);
}
.card-footer {
    background: #fbfafd;
}


a.navbar-brand {
    white-space: normal;
    font-family: 'Yellowtail', cursive;
    font-size: xx-large;
    text-align: center;
    word-break: break-all;
}

/* Provide sufficient contrast against white background */
a {
   color: #0366d6;
}

.btn-primary {
    color: #fff;
    background-color: #252152;
    border-color: #252152;
}
.btn-primary:hover {
    color: #fff;
    background-color: #e9a8a6;
    border-color: #e9a8a6;
}

.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  color: #fff;
  background-color: #1b6ec2;
  border-color: #1861ac;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
  font-size: 14px;
}
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

.border-top {
  border-top: 1px solid #e5e5e5;
}
.border-bottom {
  border-bottom: 1px solid #e5e5e5;
}

.box-shadow {
  box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
}

button.accept-policy {
  font-size: 1rem;
  line-height: inherit;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}

body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
p {
    font-family: 'Nunito', sans-serif;
}
h1 {
    font-family: 'Nunito', sans-serif;
}
ul {
    font-family: 'Nunito', sans-serif;
}
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    white-space: nowrap;
    line-height: 60px; /* Vertically center the text there */
    font-family: 'Nunito', sans-serif;
}
/*Backgrounds*/
.bg-navbar {
    background: -webkit-linear-gradient(110deg, #e9a8a6 60%, #252152 60%);
    background: -o-linear-gradient(110deg, #e9a8a6 60%, #252152 60%);
    background: -moz-linear-gradient(110deg, #e9a8a6 60%, #252152 60%);
    background: linear-gradient(110deg, #e9a8a6 60%, #252152 60%);
}
.bg-footer {
    background: -webkit-linear-gradient(110deg, #252152 60%, #e9a8a6 60%);
    background: -o-linear-gradient(110deg, #252152 60%, #e9a8a6 60%);
    background: -moz-linear-gradient(110deg, #252152 60%, #e9a8a6 60%);
    background: linear-gradient(110deg, #252152 60%, #e9a8a6 60%);
}
```
Pages/Shared/
 _Layout.cshtml

```html
<link href="https://fonts.googleapis.com/css?family=Yellowtail&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">
```

patching in google fonts (under site.css in the _Layout.cshtml)

also made some changes to the header to make it look nicer (colours)


