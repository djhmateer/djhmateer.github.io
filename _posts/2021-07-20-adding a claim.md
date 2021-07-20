---
layout: post
title: Adding a claim 
description: 
menu: review
categories: Claim 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

[/2020/10/21/cookie-authentication-in-asp.net-core-3.1](/2020/10/21/cookie-authentication-in-asp.net-core-3.1) is where I showed how I did cookie authentication and setups claims

`System.Security.Claim`

```cs
var claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, user.Email),
    new Claim(ClaimTypes.Role,  user.CDRole)
};

var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

var authProperties = new AuthenticationProperties { IsPersistent = false };

await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

```

And then I want to add a new Claim, as the logged in user is now impersonating another user, so I want to persist this information

```cs
// This looks like it works, but doesn't stick
 HttpContext.User.Identities.FirstOrDefault()?.AddClaim(new Claim("ImpersonatedLoginId", impersonatedLoginId.ToString()));
```

## Solution

Essentially just re-signin, copying any relevant data from the initial Claims.

```cs

// The initial login Name which we want to copy. 
var nameString = HttpContext.User.Identity?.Name;

var claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, nameString),
    new Claim(ClaimTypes.Role,   CDRole.ReadOnlyConsultant),
    new Claim("LoginRocId", loginRocIdString),

    new Claim("ClientId", impersonatedLoginProfile.ClientId.ToString()),
    new Claim("LoginId", impersonatedLoginId.ToString()) // rest of the app will think I am the impersonated loginId eg 109
};

var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

// To prevent confusion I'm going to set this to false
// so that the read only consultant has to log back in and be specific on who they impersonate
var authProperties = new AuthenticationProperties { IsPersistent = false };

// sign in again
await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
```