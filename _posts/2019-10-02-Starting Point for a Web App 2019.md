---
layout: post
title: Starting point for Web App in 2019 and Blazor
description: Looking at how to start Web Application in 2019 and deciding not to use Blazor.
#menu: review
categories: Blazor .NET Standards JSON
published: true 
comments: true     
sitemap: true
image: /assets/2019-10-03/3.jpg
---

TL;DR - I'm [not recommending Blazor yet](/2019/10/07/Blazor)

[Scott Hanselman](https://twitter.com/shanselman) and [Leslie Richardson](https://twitter.com/lyrichardson01) have made a surprisingly in-depth 'beginners tutorial' on ASP.NET Core 3.0 covering:

- Naming
- The new json serialiser
- Razor Pages
- Creating an API
- Server Side Blazor

[The Youtube video series is here](https://www.youtube.com/watch?v=lE8NdaX97m0&list=PLdo4fOcmZ0oW8nviYduHq7bmKode-p8Wy&index=2&t=0s) and source is [here on github.com/dotnet-presentations/ContosoCrafts](https://github.com/dotnet-presentations/ContosoCrafts). I've got my test repo [DMCrafts on Bitbucket](https://bitbucket.org/davemateer/dmcrafts/src/master/).  

This blog post is a collection of my research and initial findings into mostly Blazor. It will be interesting to see how this space evolves in the next few years.

## Naming Standards

I like how they name initial solution and project:

- Solution: DMContosoCrafts  
- Web Project: DMContosoCrafts.Website

![alt text](/assets/2019-10-03/5.jpg "Files"){:width="200px"}  

I like where things are:

- wwwroot for anything static
- Components for razor components used in server side blazor
- Controllers for API Controllers
- Models for our C# representation of domain objects
- Pages for the dynamic .cshtml razor pages
- Services for 'resposity' style data access

[I talked about my SQL Standards here](/2016/10/19/ASP.NET-MVC-Sort-Filter,-Page-using-SQL)

To add a .gitignore file press the button in VisualStudio

Add new File [(Shift+F2) extension from Mads Kristensen](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.AddNewFile) is useful.

## JSON

We are going to be using a JSON file as a datastore, using the new serialiser `System.Text.Serialization`

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

The data we will be looking at and updating is stored in  `wwwroot/data/products.json`

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

Our C# representation of the Product stored in `Models/Product.cs`

## Services

I use a services folder to store my Repositories (when using a db). So using the Single Responsibility Principle, here we are just getting the products from the products.json file.

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

`Services/JsonFileProductService.cs`

## Razor Pages

Lets display the data on the `index.cshtml` (csharp html)  

Logging is a service that is made available by ASP.NET and is injected in. Below we are injecting in our service created above.

```cs
public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;

    public JsonFileProductService ProductService;

    // private set so can only be set in this class
    public IEnumerable<Product> Products { get; private set; }

    public IndexModel(
        ILogger<IndexModel> logger,
        JsonFileProductService productService)
    {
        _logger = logger;
        ProductService = productService;
    }

    public void OnGet()
    {
        Products = ProductService.GetProducts();
    }
}
```

Wiring up our product service inside the index.cshtml.cs code behind.

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

...etc
```

Pages/Shared/
 _Layout.cshtml

```html
<link href="https://fonts.googleapis.com/css?family=Yellowtail&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">
```

patching in google fonts (under site.css in the _Layout.cshtml)

also made some changes to the header to make it look nicer (colours)

## A Low Level API

Endpoints are a bit more flexible than routes, however this is low level (doing it in startup.cs)

```cs
// not an ideal way to create an API but good to see
endpoints.MapGet("/products", context =>
{
    var products = app.ApplicationServices.GetService<JsonFileProductService>().GetProducts();
    var json = JsonSerializer.Serialize<IEnumerable<Product>>(products);
    return context.Response.WriteAsync(json);
});
```

[jsonview.com chrome extension](https://jsonview.com/) but that didn't work for me. [this one did JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)

## Route ProductsController API

`/Controllers/ProductsController.cs` Add, New Controller, Scaffold Empty Controller

So now we get by default /api/products, however below we have /products

```cs
[Route("[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    public JsonFileProductService ProductService { get; }

    public ProductsController(JsonFileProductService productService)
    {
        ProductService = productService;
    }

    [HttpGet]
    public IEnumerable<Product> Get()
    {
        // default is to return json (do in startup)
        return ProductService.GetProducts();
    }
}
```

Then have to wire this up in startup (as we've been in Razor pages and now need to tell startup about Controller)

```cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddRazorPages();
    // only add what we need ie just controllers
    services.AddControllers();
    // singleton would be only one of these services
    // transient comes and goes.. geta
    services.AddTransient<JsonFileProductService>();
}

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();

    app.UseRouting();

    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapRazorPages();
        endpoints.MapControllers();
```

AddControllers in ConfigureServices, and endpoints.MapControllers in Configure.

## Ratings API

AddRating function

- Get - get information
- Post - insert a new record
- Put - update a record
- Patch - update a little bit of a record

```cs
public void AddRating(string productId, int rating)
{
    var products = GetProducts();

    var product = products.First(x => x.Id == productId);

    if (product.Ratings is null)
        product.Ratings = new int[] { rating };
    else
    {
        var ratings = product.Ratings.ToList();
        ratings.Add(rating);
        product.Ratings = ratings.ToArray();
    }

    using var outputStream = File.OpenWrite(JsonFileName);
    JsonSerializer.Serialize(
        new Utf8JsonWriter(outputStream, new JsonWriterOptions
        {
            SkipValidation = true,
            Indented = true
        }),
        products
    );
}
```

Modified code from the video that adds a rating if none there already, then serialises it out to file.

```cs
// https://localhost:44341/products/rate?ProductId=jenlooper-cactus&rating=5
[HttpGet]
[Route("Rate")]
public ActionResult Get(
    [FromQuery]string productId, 
    [FromQuery]int rating)
{
    ProductService.AddRating(productId, rating);

    // returns a 200
    return Ok();
}
```

## Blazor

Lets make a component (reusable) by first taking the card into a Blazor Component, then adding SPA like functionality to press a button and it increments the star rating.

`Components/ProductsList.razor` Add new Razor Component

```html
<!-- ProductList.razor -->
using Microsoft.AspNetCore.Components.Web
@using DMCrafts.WebSite.Models
@using DMCrafts.WebSite.Services
@inject JsonFileProductService ProductService
<div class="card-columns">
    @foreach (var product in ProductService.GetProducts())
    {
        <div class="card">
            <div class="card-img" style="background-image: url('@product.Image')"></div>
            <div class="card-body">
                <h5 class="card-title">@product.Title</h5>
            </div>
        </div>
        <div class="card-footer">
            <small class="text-muted">
                <button @onclick="(e => SelectProduct(product.Id))"
                        data-toggle="modal" data-target="#productModal" class="btn btn-primary">More Info</button>
            </small>
        </div>
    }
</div>
@code {
    Product selectProduct;
    string selectProductId;

    void SelectProduct(string productId)
    {
        selectProductId = productId;
        selectProduct = ProductService.GetProducts().First(x => x.Id == productId);
    }
}
```

This is a razor component

```cs
// ConfigureServices
services.AddServerSideBlazor();

// Configure
endpoints.MapBlazorHub();
```

Wiring up Blazor in startup.cs

```html
<!-- index.html -->
@(await Html.RenderComponentAsync<ProductList>(RenderMode.ServerPrerendered))

<script src="_framework/blazor.server.js"></script>
```

At the end of index.html here we are patching in our blazor component, and the javascript file to make updates happen.

Pin the productId

![alt text](/assets/2019-10-03/1.jpg "Pinning"){:width="600px"}

Making a modal popup using bootstrap

![alt text](/assets/2019-10-03/2.jpg "Modal working"){:width="600px"}

Wow so it is working and displaying the correct product in the modal popup. Without writing any javascript.

## Add in Star Rating System

Fontawesome class for star glyphs

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

Databinding - just change the variable.

DB gets updated

```html
@using Microsoft.AspNetCore.Components.Web
@using DMCrafts.WebSite.Models
@using DMCrafts.WebSite.Services
@inject JsonFileProductService ProductService


<div class="card-columns">
    @foreach (var product in ProductService.GetProducts())
    {
        <div class="card">
            <div class="card-img" style="background-image: url('@product.Image')"></div>
            <div class="card-body">
                <h5 class="card-title">@product.Title</h5>
            </div>
        </div>
        <div class="card-footer">
            <small class="text-muted">
                <button @onclick="(e => SelectProduct(product.Id))"
                        data-toggle="modal" data-target="#productModal" class="btn btn-primary">
                    More Info
                </button>
            </small>

        </div>
    }
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

@if (selectedProduct != null)
{
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productTitle">@selectedProduct.Title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-img" style="background-image: url('@selectedProduct.Image');">
                        </div>
                        <div class="card-body">
                            <p class="card-text">@selectedProduct.Description</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    @if (voteCount == 0)
                        {
                            <span>Be the first to vote!</span>
                        }
                        else
                        {
                            <span>@voteCount @voteLabel</span>
                        }
                        @for (int i = 1; i < 6; i++)
                        {
                            var currentStar = i;
                            if (i <= currentRating)
                            {
                                <span class="fa fa-star checked" @onclick="(e => SubmitRating(currentStar))"></span>
                            }
                            else
                            {
                                <span class="fa fa-star" @onclick="(e => SubmitRating(currentStar))"></span>
                            }
                        }
                </div>
            </div>
        </div>
    </div>
}

@code {
    Product selectedProduct;
    // State managed on the server
    string selectedProductId;

    void SelectProduct(string productId)
    {
        selectedProductId = productId;
        selectedProduct = ProductService.GetProducts().First(x => x.Id == productId);
        GetCurrentRating();
    }

    int currentRating = 0;
    int voteCount = 0;
    string voteLabel;

    void GetCurrentRating()
    {
        if(selectedProduct.Ratings == null)
        {
            currentRating = 0;
            voteCount = 0;
        }
        else
        {
            voteCount = selectedProduct.Ratings.Count();
            voteLabel = voteCount > 1 ? "Votes" : "Vote";
            // average
            currentRating = selectedProduct.Ratings.Sum() / voteCount;
        }

        System.Console.WriteLine($"Current rating for {selectedProduct.Id}: {currentRating}");
    }

    void SubmitRating(int rating)
    {
        System.Console.WriteLine($"Rating received for {selectedProduct.Id}: {rating}");
        ProductService.AddRating(selectedProductId, rating);
        SelectProduct(selectedProductId);
    }
}
```

![alt text](/assets/2019-10-03/4.jpg "Stars working"){:width="600px"}  

Epic! We have a:

- Modal popup being passed the correct data with no javascript nor page refresh
- A voting system with ajax like funcitonality with no javascript nor custom webservice

## Publish to Azure

I deployed to an Azure App Service (Windows) using the VS2019 UI: Right click, Publish, DMCrafts

I needed to set in the pubish settings:

- Deployment Mode: Self-Contained
- Target Runtime: win-x86

[github.com/dotnet-presentations/ContosoCrafts](https://github.com/dotnet-presentations/ContosoCrafts) is where the original code is.

## More Information

[dotnet.microsoft.com](https://dotnet.microsoft.com/) is where these vidoes are (learn)

[dotnet.microsoft.com/platform/community](https://dotnet.microsoft.com/platform/community) is links to all the community related things eg: [gitter.im/aspnet](https://gitter.im/aspnet/Home) and [discordapp.com](https://discordapp.com/channels/143867839282020352/276477384780152834)

[dotnetconf videos on youtube - blazor videos here](https://www.youtube.com/playlist?list=PLReL099Y5nRd04p81Q7p5TtyjCrj9tz1t)

[Steve Smith - @ardalis Clean Architecture starting point](https://github.com/ardalis/CleanArchitecture) is a more in depth starting point. 

## Summary

This is an interesting start to a project, but as of today I'm not recommending the Blazor part.

- ASP.NET Core 3.0 Razor Pages app
- Deployed to Windows Azure PaaS
- JSON data store
- System.Text.Serialization new serializer
- C#8 Features (using declaration)
- Server Side Blazor to give AJAX like interactivity without the need for a custom webservice or any javascript
