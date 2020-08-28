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

[Cookie authentication without Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-3.1)

[Sample code in ASP.NET Docs](https://github.com/dotnet/AspNetCore.Docs/tree/master/aspnetcore/security/authentication/cookie/samples/3.x/CookieSample)


I've used MS Identity in a number of projects, and have found that:

- you've got to scaffold out all of the pages to make any ui changes
- It is good that can handle 3rd party providers
- It is quite verbose and configurable

[Andrew Lock](https://andrewlock.net/customising-aspnetcore-identity-without-editing-the-pagemodel/) has a great tutorial on how to scaffold out, then only use the relevant bit.

[Around Feb 2020]() I wrote articles on Authentication and Authorisation in .NET Core 3.1, and never got around to publishing them. They felt complex and not quite right for my use case.

My use case is fairly simple as a user can be

- Not logged in
- Logged in as a user
- Logged in as an admin

There are parts of the site

- /
- /member/1 - private just for that member
- /admin - just for admin

And I just want regular cookie based authentication for now - no 3rd party authentication providers.

## Simplest Possible Cookie Auth

asdf

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

## Login Page

asdf




## Features

- Login form
- redirect to login form if try to access any secured page
- Can redirect back to secured page on successful login
- says hello@exmple.com and logout button
- has a remember me button
- remember me works when browser is closed and re-opened
- cookie expires after x days
- NormalUser and Admin role

- anti forgery token.. csrf?




[Bug in generated and sample code C#8 Nullable ref types - returnUrl field is required](https://github.com/dotnet/AspNetCore.Docs/issues/17145)