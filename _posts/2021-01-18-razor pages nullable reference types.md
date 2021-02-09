---
layout: post
title: Razor Pages Nullable Reference Types
description: 
menu: review
categories: razor 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

An exploration into whether Nullable Reference Types (NRTs) work well on the razor pages side of an ASP NET 5 project.

## Nullable reference types (NRT)

[Nullable reference types](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references)

[Work with nullable reference types](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/nullable-reference-types)

[EF Core nullable reference types](https://docs.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types)

Still need to explicitly turn on nullable reference types. 

```xml
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net5.0</TargetFramework>
    <nullable>enable</nullable>
  </PropertyGroup>
```

This is an exploration of how 

C# 8.0 Nullable Rerence Types

Can help in our ASP.NET 5 Razor pages projects

Can [C# 9.0 Records]() help too?

## Display Actors

```cs

public class DBTestModel : PageModel
{
    // Required property
    // the connection string will never be null
    // there is a guard in LoadFromEnvironment
    // so it will always be set to something even blank
    public string ConnectionString { get; set; } = null!;

    // Actors is always going to be a List, possibly empty, never null
    public List<Actor> Actors { get; set; } = null!;

    public async Task OnGetAsync()
    {
        var connectionString = AppConfiguration.LoadFromEnvironment().ConnectionString;
        ConnectionString = connectionString;

        var actors = await Db.GetActors(connectionString);
        //var users = await Db.GetNoUsers(connectionString);

        //foreach (var actor in actors.ToList())
        //{
        //    Log.Information($"{actor}");
        //    var (id, name, sex) = actor; // record deconstruction
        //}
        Actors = actors.ToList();
    }
}

// positional record
// this is nice, but for ViewModels
// I need a class to use Attributes that razor pages can pick up
public record Actor(int ActorID, string Name, string Sex);


//public class UserX
//{
//    public Guid UserId { get; set; }
//    public string? UserName { get; set; }
//}
```


## Login Form

The source code for this is in [RecordTest](https://github.com/djhmateer/record-test)

```cs
public class LoginModelNRTB : PageModel
{
    [BindProperty]
    // there will never be an InputModel on get
    // but if we set to nullable InputModel then the cshtml will produce dereference warnings
    // https://stackoverflow.com/a/54973095/26086
    // so this will get rid of the warnings as we are happy we will never get dereferences on the front
    // ie we are happy the underlying framework will not produce null reference exceptions
    public InputModel Input { get; set; } = null!;


    // 1. Original Class which works
    //public class InputModel
    //{
    //    // don't need required as Email property is non nullable
    //    //[Required]
    //    // makes sure a regex fires to be in the correct email address form
    //    [EmailAddress]
    //    // there should always be an email posted, but maybe null if js validator doesn't fire
    //    // we are happy the underlying framework handles it, 
    //    public string Email { get; set; } = null!;

    //    // When the property is called Password we don't need a [DataType(DataType.Password)]
    //    //[DataType(DataType.Password)]
    //    public string Password { get; set; } = null!;

    //    [Display(Name = "Remember me?")]
    //    public bool RememberMe { get; set; }
    //}

    // 2. Record which works
    public record InputModel
    {
        [EmailAddress] 
        public string Email { get; init; } = null!;

        [DataType(DataType.Password)]
        public string PasswordB { get; init; } = null!;

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; init; }
    }

    // 3. Positional record attributes not being picked up
    // https://stackoverflow.com/questions/66120831/positional-record-attributes-in-asp-net-core
    // https://stackoverflow.com/questions/65934513/net-5-0-web-api-wont-work-with-record-featuring-required-properties
    //public record InputModel(
    //    string Email,
    //    [property:DataType(DataType.Password)] string PasswordB,
    //    [property:Display(Name = "Remember me?")] bool RememberMe);


    public void OnGet() { }

    public IActionResult OnPost()
    {
        if (ModelState.IsValid)
        {
            // Input property of type InputModel is bound because of the [BindProperty] attribute
            Log.Information($"Success! {Input}");
            return LocalRedirect("/");
        }

        Log.Information($"Failure on ModelState validation {Input}");
        return Page();
    }
}


```

Essentially I like using nullable reference types as it shows the intention of an object eg

- Email should never be null, so it is required
- Same for password
- Shows that returnUrl is nullable

Use verbose full declaration for the InputModel so that handy attributes work. eg

- Email address (gets the right regex on front and back end)
- Password dont show
- Display name


I am using NRTs in my new Razor Pages projects and using positional records when I don't need attributes.

Dapper works just fine hydrating the objects.


## Not use for Razor?

What would happen if I turn off NRT's for the razor side?

Keep it simple like in [Razor Pages start sample](https://docs.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-5.0&tabs=visual-studio)

## More info


[Nullable reference types - MS Docs](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references)]which I'm a fan of.

https://docs.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types#non-nullable-properties-and-initialization

Null-forgiving operator (dammit)!

https://stackoverflow.com/a/54973095/26086

Aim for non-nullable by default.


