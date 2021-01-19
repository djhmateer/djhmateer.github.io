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

The source code for this is in RecordTest

```cs
// a page to test nullable ref types
// with inbound form post
// https://github.com/dotnet/aspnetcore/issues/22656
// Scaffolding code for login needs more work from the team
// nullable ref types more useful to us for own custom code

public class LoginModelNRT : PageModel
{
    [BindProperty]
    // there will never be an InputModel on get
    // but if we set to nullable InputModel then the cshtml will produce dereference warnings
    // https://stackoverflow.com/a/54973095/26086
    // so this will get rid of the warnings as we are happy we will never get dereferences on the front
    // ie we are happy the underlying framework will not produce null reference exceptions
    public InputModel Input { get; set; } = default!;
    // there may not be a return url
    //public string? ReturnUrl { get; set; }

    //[TempData]
    //// there may b
    //public string? ErrorMessage { get; set; }

    //public record InputModel
    //{
    //    [EmailAddress] public string Email { get; init; } = null!;

    //    [DataType(DataType.Password)] public string Password { get; init; } = null!;

    //    [Display(Name = "Remember me?")]
    //    public bool RememberMe { get; init; }
    //}

    // positional record attribute not being picked up
    //public record InputModel(
    //    string Email,
    //    [DataType(DataType.Password)] string PasswordB,
    //    [Display(Name = "Remember me?")] bool RememberMe);

    public class InputModel
    {
        // https://docs.microsoft.com/en-us/dotnet/csharp/nullable-migration-strategies#late-initialized-properties-data-transfer-objects-and-nullability

        // can't use this ctor with razor pages
        // InvalidOperationException: Could not create an instance of type
        // Model bound complex types must not be abstract or value types and must have a parameterless constructor
        //public InputModel(string email, string password)
        //{
        //    Email = email;
        //    Password = password;
        //}

        // don't need required as it is non nullable
        //[Required]
        // makes sure a regex fires to be in the correct email address form
        [EmailAddress]
        // there should always be an email posted, but maybe null if js validator doesn't fire
        // we are happy the underlying framework handles it, 
        public string Email { get; set; } = null!;

        // When the property is called password we don't need a [DataType(DataType.Password)]
        //[DataType(DataType.Password)]
        public string Password { get; set; } = null!;

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    // need nullable returnUrl to avoid https://github.com/dotnet/aspnetcore/issues/22656
    // a front end error showing that the return field is required (which it isn't required, so it should be nullable)
    public void OnGet(string? returnUrl = null)
    {
        Log.Information(returnUrl);
        // not sure when ErrorMessage is used
        //if (!string.IsNullOrEmpty(ErrorMessage))
        //{
        //    ModelState.AddModelError(string.Empty, ErrorMessage);
        //}

        //ReturnUrl = returnUrl;
    }

    //public async Task<IActionResult> OnPostAsync(string? returnUrl = null)
    // Input property of type InputModel is bound because of the [BindProperty] attribute
    public IActionResult OnPost(string? returnUrl = null)
    {
        //ReturnUrl = returnUrl;

        if (ModelState.IsValid)
        {
            //var user = await AuthenticateUser(conn, Input.Email, Input.Password);
            Log.Information($"{Input}");

            //Log.Information($"User {user.Email} CDRole: {user.CDRole} logged in at {DateTime.UtcNow}");

            // creates a 302 Found which then redirects to the resource
            return LocalRedirect(returnUrl ?? "/");
        }

        // Something failed. Redisplay the form.
        return Page();
    }
}

```

Essentially I like using nullable reference types as it shows the intention of an object eg

- Email should never be null, so it is required
- Same for password
- Shows that returnUrl is nullable

Use class for the InputModel (ViewModel?) so that handy attributes work. eg

- Email address (gets the right regex on front and back end)
- Password dont show
- Display name


When is ErrorMessage used?

**next try a DTO maybe with a record
a standard form?

## Not use for Razor?

What would happen if I turn off NRT's for the razor side?

Keep it simple like in [Razor Pages start sample](https://docs.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-5.0&tabs=visual-studio)

## More info


[Nullable reference types - MS Docs](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references)]which I'm a fan of.

https://docs.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types#non-nullable-properties-and-initialization

Null-forgiving operator (dammit)!

https://stackoverflow.com/a/54973095/26086

Aim for non-nullable by default.


