---
layout: post
title: Cookie Authentication in ASP.NET Core 3.1
description: 
menu: review
categories: authentication 
published: false 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- ![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"} -->

I've used MS Identity in a number of projects, and have found that:

- You've got to scaffold out all of the pages to make any ui changes
- It is good that can handle 3rd party providers
- It is quite verbose and configurable
- There is a lot in there I don't need

[Andrew Lock](https://andrewlock.net/customising-aspnetcore-identity-without-editing-the-pagemodel/) has a great tutorial on how to scaffold out, then only use the relevant bit.

[Around Feb 2020]() I wrote articles on Authentication and Authorisation in .NET Core 3.1, and never published them. They felt complex and not quite right for my use case.

My use case is fairly simple as a user can be

- Not logged in
- Logged in as a User Role
- Logged in as an Admin Role

There are parts of the site

And I just want regular cookie based authentication for now - no 3rd party authentication providers.

## Simplest Possible Cookie Auth

[Cookie authentication without Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-3.1)

[Sample code in ASP.NET Docs](https://github.com/dotnet/AspNetCore.Docs/tree/master/aspnetcore/security/authentication/cookie/samples/3.x/CookieSample)

```cs
// in configureservices method
services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie();

// in configure method
app.UseAuthentication();
```

add in 

```cs
// ApplicationUser.cs

// Pages/Account/Login.cshtml

// Extensions/UrlHelperExtensions.cs

```

## Login top menu bar

From the [MS Cookie Example](https://github.com/dotnet/AspNetCore.Docs/tree/master/aspnetcore/security/authentication/cookie/samples/3.x/CookieSample)

```html
@inject Microsoft.AspNetCore.Http.IHttpContextAccessor HttpContextAccessor;
<!DOCTYPE html>
<html lang="en">
<!-- etc -->

@if (HttpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
{
    <li class="nav-item">
        <a class="nav-link text-dark" asp-area="" asp-page="/Account/Manage/Index" title="Manage">Hello @User.Identity.Name!</a>
    </li>
    <li class="nav-item">
        <form class="form-inline" asp-area="" asp-page="/Account/Logout" asp-route-returnUrl="@Url.Page("/", new { area = "" })" method="post">
            <button type="submit" class="nav-link btn btn-link text-dark">Logout</button>
        </form>
    </li>
}
else
{
    <li class="nav-item">
        <a class="nav-link text-dark" asp-area="" asp-page="/Account/Register">Register</a>
    </li>
    <li class="nav-item">
        <a class="nav-link text-dark" asp-area="" asp-page="/Account/Login">Login</a>
    </li>

}
</ul>

```

add in the service

```cs
// startup.cs
services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
```

## Account/Login.cshtml

oasdf

## Account/Logout.cshtml

```cs
public async Task<IActionResult> OnPost()
{
    Log.Information($"User {User.Identity.Name} logged out");

    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

    // Does a 302Found GET request to the current page
    return RedirectToPage();
}
```

and the html

```html
<!-- this wont work - will produce a 400 -->
<form class="form-inline" action="/Account/Logout" method="post">
    <button type="submit" class="nav-link btn btn-link text-dark">Logout</button>
</form>

<!-- this will work as using the tag helper which generates the anti forgery token -->
<form class="form-inline" asp-page="/Account/Logout" method="post">
    <button type="submit" class="nav-link btn btn-link text-dark">Logout</button>
</form>

```

The `asp-page` tag helper inside the form [Does this](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/working-with-forms?view=aspnetcore-3.1) which includes generating the Request Verification Token.

<!-- ![alt text](/assets/2020-08-27/400.jpg "400 error missing antiforgery"){:width="600px"} -->
![alt text](/assets/2020-08-29/400.jpg "400 error missing antiforgery"){:width="700px"}

To see this detailed logging (I'm using Serilog here) use these settings:

```cs
 public static void Main(string[] args)
 {
     Log.Logger = new LoggerConfiguration()
         // Comment this out to see detailed aspnetcore logging 
         //.MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
         .Enrich.FromLogContext()
         .WriteTo.Console()
```

asdf 

## Tag helpers

[Tag Helpers](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/tag-helpers/built-in/anchor-tag-helper?view=aspnetcore-3.1)

Some of the tag helpers provide no value to me, so I always prefer simplicity if I can:

```html
<!-- asp-page is a tag helper -->
<a class="nav-link text-dark" asp-page="/Privacy">Privacy</a>

<!-- generated so I use this -->
<a class="nav-link text-dark" href="/Privacy">Privacy</a>

<!-- very useful to allow for smart caching -->
 <script src="~/js/site.js" asp-append-version="true"></script>
```

[SO Tag Helpers](https://stackoverflow.com/tags/tag-helpers/info)

## RenderSection

[Generally we want to load js at the bottom of the page](https://stackoverflow.com/questions/2105327/should-jquery-code-go-in-header-or-footer) so the browser can render the text and images as quickly as possible. Caveat empor here for a multitude of reasons.

```html
<!-- _Layout.cshtml -->

<script src="~/lib/jquery/dist/jquery.min.js"></script>
<script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="~/js/site.js" asp-append-version="true"></script>

<!-- if there is any extra js eg jquery.validate.min.js on the login screen then load it here -->
@await RenderSectionAsync("Scripts", required: false)

</body>
</html>
```

This used to be in `/Shared/_ValidationScriptsPartial.cshtml` but I've deleted that file and prefer to show directly the script reference in the files that I need them in:

```html
<!-- login.cshtml -->
@section Scripts {
    <script src="~/lib/jquery-validation/dist/jquery.validate.min.js"></script>
    <script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"></script>
}
```

## Cookie config options

We can add in config options to the cookie service like:

```cs
services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(x => x.AccessDeniedPath = "/Account/AccessDenied");
```

## Cookie Policy Middleware

As we're not using OAuth2 we can set the cookie same-site attribute to strict

```cs
// Cookie same-site attribute
var cookiePolicyOptions = new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.Strict,
};
app.UseCookiePolicy(cookiePolicyOptions);

```

## What cookies are created

`chrome://settings/cookies/detail?site=localhost` useful command in chrome

In Chrome click on the i next to localhost, then view cookies.

<!-- ![alt text](/assets/2020-08-29/cookies.jpg "Cookies"){:width="600px"} -->
![alt text](/assets/2020-08-29/cookies.jpg "Cookies")

And this is what the payload is:

![alt text](/assets/2020-08-29/cookie-normal.jpg "Inside the cookie")


[How does cookie authentication work](https://stackoverflow.com/a/32218069/26086)

## .AspNetCore.Cookies

asdf
 **HERE** - dive into what this cookie means

## .AspNetCore.Antiforgery

X-CSRF - Cross Site Request Forgery

[Prevent Cross-Site Request Forgery](https://docs.microsoft.com/en-us/aspnet/core/security/anti-request-forgery?view=aspnetcore-3.1)

```cs
// startup.cs - renaming .AspNetCore.Antiforgery.xxx token
services.AddAntiforgery(options => options.Cookie.Name = "X-CSRF-TOKEN-DAVE");
```

## Persistent Cookies

[Persistent Cookies](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-3.1#persistent-cookies) for the Remember Me feature.

```cs
// login.cshtml.cs
var authProperties = new AuthenticationProperties
{
    IsPersistent = true,
    // Whether the authentication session is persisted across 
    // multiple requests. When used with cookies, controls
    // whether the cookie's lifetime is absolute (matching the
    // lifetime of the authentication ticket) or session-based.
};
```

## Scaffolding

[Andrew Lock](https://andrewlock.net/customising-aspnetcore-identity-without-editing-the-pagemodel/) has a great tutorial on how to scaffold out, then only use the relevant bit.

Project is [authentication-dave]() 

```bash
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add package Microsoft.AspNetCore.Identity.UI
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

# dotnet tool install -g dotnet-aspnet-codegenerator
dotnet tool update -g dotnet-aspnet-codegenerator

# to see the list of file you can scaffold
dotnet aspnet-codegenerator identity -lf

# scaffold only the Register page
# creates IdentityHostingStartup.cs
#  need to delete services.AddDefaultIdentity from Startup.cs
dotnet aspnet-codegenerator identity -dc TestApp.Data.ApplicationDbContext --files "Account.Register"

# scaffold all the pages
dotnet aspnet-codegenerator identity -dc TestApp.Data.ApplicationDbContext

#
dotnet tool update --global dotnet-ef

# multiple db contexts have been created so need to specify which one
dotnet ef migrations add DMInitialCreate --context AuthenticationDave.Web.Data.ApplicationDbContext
dotnet ef database update --context AuthenticationDave.Web.Data.ApplicationDbContext
```

So this took some work to get going properly - multiple db contexts, multiple connection strings. DbUpdate to run migrations. It shouldn't be this complex (for my use case).

## ReturnUrl

I'm a fan on null checking `<nullable>enable</nullable>` [Nullable Reference Types](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references) and [Whats new in C#8](/2020/07/24/Whats-new-in-C-8)

Lets start with the feature of 

## Serilog Logging

[Setting up serilog in ASP.NET Core 3](https://nblumhardt.com/2019/10/serilog-in-aspnetcore-3/)]

For me this cleans up the code as don't need the injected in ILogger everywhere.

[Using Seq to view the logs is useful too](https://docs.datalust.co/docs/getting-started-with-docker)

```bash
docker run --name seq -e ACCEPT_EULA=Y -p 5341:80 datalust/seq:latest
```

## Authorize

[MS Docs - Inntroduction to Authorisation](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/introduction?view=aspnetcore-3.1)

- Simple Role model
- More complex Policy based model
- [A better way to handle authorisation - Jon P Smith](https://www.thereformedprogrammer.net/a-better-way-to-handle-asp-net-core-authorization-six-months-on/)

From the language used [here](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/secure-data?view=aspnetcore-3.1) we will have 3 security 'Groups'

- Registered users. User Role
- Admins.. Admin Role

### Authorization Attributes

Using the Authorize attribute on a PageModel class ensures that the user is Logged In.

```cs
[Authorize]
public class UserRoleNeededModel : PageModel
{
    public void OnGet()
    {
    }
}
```

Or more securely this code in startup requires that all pages be Authorized unless `AllowAnonymous` attribute is applied.

```cs
services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

// remember to put on login and index pages and any pages you want anoymous users to see!
[AllowAnonymous]
   public class LoginModel : PageModel
```

However to avoid cluttering with attributes I prefer the following conventions:

### Authorization Conventions with Razor Pages

[MS Docs - Razor Pages authorization conventions](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/razor-pages-authorization?view=aspnetcore-3.1)

```cs
// all pages need an authenticated user by default
services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

// allow pages here 
services.AddRazorPages(x =>
{
    x.Conventions.AllowAnonymousToPage("/");
    x.Conventions.AllowAnonymousToPage("/Login");
});
```

## Roles

```cs
[Authorize(Roles = "Admin")]
```

Without using the complexity of MS Identity, how could we create simple Roles

- User (ie authenticated / logged in)
- Admin (this can be a bool IsAdmin flag in the database)

Essentially when we make our user we want to know whether she `IsAdmin`:

```cs
public class ApplicationUser
{
    public string Email { get; set; }
    public string FullName { get; set; }
    public bool IsAdmin { get; set; }
}
```

All we need is included in [MS Docs - This sample for simple Authenticaion](https://github.com/dotnet/AspNetCore.Docs/blob/master/aspnetcore/security/authentication/cookie/samples/3.x/CookieSample/Pages/Account/Login.cshtml.cs) which includes a list of `Claim`

A simple bit of logic to set the correct claim and we have Roles working in our sample.

```cs
var claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, user.Email),
    new Claim("FullName", user.FullName),
    new Claim(ClaimTypes.Role,  user.IsAdmin ? "Admin" : "User"),
};
```

If you don't get the correct role, you're redirect to to AccessDenied:

![alt text](/assets/2020-08-29/access-denied.jpg "Access denied"){:width="600px"}

### Policy Based Authorisation - Razor Pages Conventions

[MS Docs - Policy based authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies?view=aspnetcore-3.1)

```cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

    services.AddAuthorization(options =>
    {
        // all authenticated users are in the role of User.
        //options.AddPolicy("User", p => p.RequireRole("User"));
        options.AddPolicy("Admin", p => p.RequireRole("Admin"));

        // has to be authenticated to view a page by default
        options.FallbackPolicy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();
    });

    // allow pages here
    services.AddRazorPages(x =>
    {
        x.Conventions.AllowAnonymousToPage("/Index");
        x.Conventions.AllowAnonymousToPage("/Account/Login");
        x.Conventions.AllowAnonymousToPage("/Account/Logout");

        // all authenticated users have the User role so this is not needed
        //x.Conventions.AuthorizePage("/UserRoleNeeded", "User");
        x.Conventions.AuthorizePage("/AdminRoleNeeded", "Admin");
    });

    services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
}
```

[Joydip article](https://www.red-gate.com/simple-talk/dotnet/c-programming/policy-based-authorization-in-asp-net-core-a-deep-dive/)

[Ziyad article](http://www.ziyad.info/en/articles/24-Role_Based_Folder_Authorization)

## Features

- Login form
- redirect to login form if try to access any secured page
- Can redirect back to secured page on successful login
- says hello@exmple.com and logout button
- has a remember me button
- remember me works when browser is closed and re-opened
- cookie expires after x days
- NormalUser and Admin role
- enable lock out to prevent brute force

- anti forgery token.. csrf?

[Bug in generated and sample code C#8 Nullable ref types - returnUrl field is required](https://github.com/dotnet/AspNetCore.Docs/issues/17145)