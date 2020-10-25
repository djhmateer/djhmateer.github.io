---
layout: post
title: Razor Pages 
description: 
menu: review
categories: RazorPages 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->
## Tag helpers

2

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

[Bug in generated and sample code C#8 Nullable ref types - returnUrl field is required](https://github.com/dotnet/AspNetCore.Docs/issues/17145)

## Serilog Logging

[Setting up serilog in ASP.NET Core 3](https://nblumhardt.com/2019/10/serilog-in-aspnetcore-3/)]

For me this cleans up the code as don't need the injected in ILogger everywhere.

[Using Seq to view the logs is useful too](https://docs.datalust.co/docs/getting-started-with-docker)

```bash
docker run --name seq -e ACCEPT_EULA=Y -p 5341:80 datalust/seq:latest
```



`chrome://settings/cookies/detail?site=localhost` useful command in chrome

In Chrome click on the i next to localhost, then view cookies.

<!-- ![alt text](/assets/2020-08-29/cookies.jpg "Cookies"){:width="600px"} -->
![alt text](/assets/2020-08-29/cookies.jpg "Cookies")

And this is what the payload is:

![alt text](/assets/2020-08-29/cookie-normal.jpg "Inside the cookie")

[How does cookie authentication work](https://stackoverflow.com/a/32218069/26086)

![alt text](/assets/2020-08-29/cookie-remember.jpg "2 week expire remember me")
2 Week expiration - remember me has been ticked and the browser will remember the user for 2 weeks through machine restarts / server restarts and browswer restarts.


https://app.pluralsight.com/library/courses/authentication-authorization-aspnet-core/table-of-contents

