---
layout: post
title: Cookie Authentication in ASP.NET Core 3.1
description: Implementing cookie based authentication, claims based role authorisation in ASP.NET Core 3.1.
#menu: review
categories: Authentication BrokenLinkChecker
published: true
comments: true     
sitemap: true
image: /assets/2020-10-21/nic.jpg
---

[![alt text](/assets/2020-10-21/nic.jpg "Crowd by @nickxshotz")](https://unsplash.com/@nickxshotz)

I've used [ASP.NET (Core) Security and Identity](https://docs.microsoft.com/en-us/aspnet/core/security/?view=aspnetcore-3.1) for over a decade.

[This Twitter thread](https://twitter.com/ReactiveRich/status/1305281794229645313) sums it up...Identity is hard! And ASP.NET hasn't a great answer (IMO)

I made time to think about security in more detail for my SaaS company. I've got a basic set of requirements, so I want a simple implementation.

This is the first blog post where I will cover:

- Nomenclature
- Why Cookie (Forms based) Authentication
- Simple Authorisation (no Roles)
- Role based Authorisation
- Login / Logout forms
- Remember me
- Redirect to login form if try to access any secured page then return URL

[Part 1 Source code - OnlyAuthentication](https://github.com/djhmateer/only-authentication)

[Part 2 Role Based Source code here](https://github.com/djhmateer/cookie-dave) 

[Scaffolded out ASP.NET Core default identity sample is here](https://github.com/djhmateer/authentication-dave)

[Part 3 and 4 Source - Using Postgres](https://github.com/djhmateer/password-postgres/tree/main/src)


[In Early 2020 I wrote articles on using the standard Authentication and Authorisation in ASP.NET Core 3.1](/2020/01/09/Authentication-and-Authorisation-in-ASP.NET-Core-3.1), and never published them. They felt overly complex for my needs. [Early 2020 External Authentication](/2020/01/10/External-Authentication-in-ASP.NET-Core-3.1) again not published as complex and I didn't need.


## Nomenclature

In my application I'm using these terms:

- User - email, role_id, password_hash, verified

- Role
  - Tier1 (my free tier, but need to be a successfully registered and active account)
  - Tier2 (paid tier, need to be successfully registered)
  - Admin (me)

- Security - How to keep the application secure and the correct user sees the correct data

- Identity - ie Microsoft.AspNetCore.Identity.UI that supports login functionality. Manage users, passwords, pofile data, roles, claims, token, email confirmation and more.

- Authentication - User provides credentials that are then compared to those stored in a db ie determining the user's identity.

- Authorisation - What the user is allowed to do (ie the Role they have)

## Part 1 - Cookie Forms Authentication

My use case is a SaaS products (I make tools to make sure websites are working). I'm not using JWT tokens (yet) as my app is light on JavaScript.

Use a Password manager to keep all my passwords

It is simple to implement, and as a SaaS business owner I want things to work well (In the early days of Stackover most of their support tickets were on identity)

[Cookie authentication without Identity on MS Docs](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-3.1) which links to a good  [sample project in ASP.NET Docs](https://github.com/dotnet/AspNetCore.Docs/tree/master/aspnetcore/security/authentication/cookie/samples/3.x/CookieSample)

Essentially start with a blank ASP.NET Core Razor pages project, then can add in config options

```cs
// ConfigureServices method
services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme);

app.UseAuthentication();
app.UseAuthorization();
// As we're not using OAuth2 we can set the cookie same-site attribute to strict
app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Strict });

```

Then we need to patch in the login form etc.. copy it from [here](https://github.com/djhmateer/authentication-dave/tree/master/AuthenticationDave.Web/Areas/Identity/Pages/Account). 

I'm a fan of Serilog and using Kestrel when developing so I can see an output like this:

<!-- ![alt text](/assets/2020-08-29/login.jpg "Login and viewing log files"){:width="600px"} -->
![alt text](/assets/2020-08-29/login.jpg "Login and viewing log files")

Also in the source I've simplified the pages ie not using the in built logger to reduce code.

### Authorization Attribute

Using the Authorize attribute on a PageModel class ensures that the user is Logged In. 

```cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace OnlyAuthentication.Web.Pages
{
    [Authorize]
    public class PrivacyModel : PageModel
    {
        public void OnGet() { }
    }
}
```

This makes sure that someone has to be logged in to view the privacy page

## Part 2 - Role based Authorization

[MS Docs - Introduction to Authorisation](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/introduction?view=aspnetcore-3.1)

[Part 2 Role Based Source code here](https://github.com/djhmateer/cookie-dave)

- Role
  - Tier1 (my free tier, but need to be a successfully registered and active account)
  - Tier2 (paid tier, need to be successfully registered)
  - Admin (me)

![alt text](/assets/2020-08-29/login2.jpg "Login")

All pages now have optional Role protection

```cs
using CookieDave.Web.Data;
using Microsoft.AspNetCore.Mvc.RazorPages;
using static CookieDave.Web.Data.CDRole;

namespace CookieDave.Web.Pages
{
    // Which strongly typed CDRoles are needed to view this page
    [AuthorizeRoles(Tier1, Tier2, Admin)]
    public class Tier1RoleNeeded : PageModel
    {
        public void OnGet() { }
    }
}

// https://stackoverflow.com/a/24182340/26086
public class AuthorizeRolesAttribute : AuthorizeAttribute
{
    public AuthorizeRolesAttribute(params string[] roles) => Roles = string.Join(",", roles);
}

static class CDRole
{
    public const string Tier1 = "Tier1";
    public const string Tier2 = "Tier2";
    public const string Admin = "Admin";
}
```

And to programatically see the Role Claims we can:

```cs
using System.Security.Claims;
using CookieDave.Web.Data;
using Microsoft.AspNetCore.Mvc.RazorPages;
using static CookieDave.Web.Data.CDRole;

namespace CookieDave.Web.Pages
{
    [AuthorizeRoles(Tier1, Tier2, Admin)]
    public class CrawlModel : PageModel
    {
        public string? Message { get; set; }

        public void OnGet()
        {
            var roleClaims = User.FindAll(ClaimTypes.Role);

            Message = "Role claims are: ";
            foreach (var claim in roleClaims)
            {
                // Tier1, Tier2, Admin etc...
                Message += claim.Value + " ";
            }
        }
    }
}

```

To see how I give a different user a Cliam, look inside of `Login.cshtml.cs` file

```cs
 public async Task<IActionResult> OnPostAsync(string? returnUrl = null)
 {
     ReturnUrl = returnUrl;

     if (ModelState.IsValid)
     {
         var user = await AuthenticateUser(conn, Input.Email, Input.Password);

         if (user == null)
         {
             ModelState.AddModelError(string.Empty, "Invalid login attempt.");
             return Page();
         }

         var claims = new List<Claim>
         {
             new Claim(ClaimTypes.Name, user.Email),
             //new Claim("FullName", user.FullName),
             new Claim(ClaimTypes.Role,  user.CDRole)
         };

         var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

         Log.Information($@"CDRole: {user.CDRole}");
         Log.Information($@"Remember me: {Input.RememberMe}");

         var authProperties = new AuthenticationProperties
         {
             //AllowRefresh = <bool>,
             // Refreshing the authentication session should be allowed.

             //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
             // The time at which the authentication ticket expires. A 
             // value set here overrides the ExpireTimeSpan option of 
             // CookieAuthenticationOptions set with AddCookie.

             IsPersistent = Input.RememberMe, // false is default
             //IsPersistent = true,
             // Whether the authentication session is persisted across 
             // multiple requests. When used with cookies, controls
             // whether the cookie's lifetime is absolute (matching the
             // lifetime of the authentication ticket) or session-based.

             //IssuedUtc = <DateTimeOffset>,
             // The time at which the authentication ticket was issued.

             //RedirectUri = <string>
             // The full path or absolute URI to be used as an http 
             // redirect response value.
         };

         await HttpContext.SignInAsync(
             CookieAuthenticationDefaults.AuthenticationScheme,
             new ClaimsPrincipal(claimsIdentity),
             authProperties);

         Log.Information($"User {user.Email} CDRole: {user.CDRole} logged in at {DateTime.UtcNow}");

         // creates a 302 Found which then redirects to the resource
         return LocalRedirect(returnUrl ?? "/");
     }

     // Something failed. Redisplay the form.
     return Page();
 }

```

Currently I only need one Role per User.

If you don't get the correct Role, you're redirected to to AccessDenied:

![alt text](/assets/2020-08-29/access-denied.jpg "Access denied"){:width="800px"}

This [can be changed to another page](https://stackoverflow.com/a/39252027/26086) but I've kept with the convention.


## Part 3 - Testing

I've got [a blog post in this series on ASP.NET Core Web Testing](/2020/10/21/x2integration-testing-of-asp.net-core-3.1) which goes into more detail on the testing here.

To aid in simplicity I've intentionally left

- Anonymous browsing enabled by default
- Attribute based Role based Authorization on each page

I like this as it leaves the code much less cluttered, but we have to be careful as the defaults are open on each page, so lets put tests on

[Integration Testing ASP.NET Core Applications: Best Practices](https://app.pluralsight.com/library/courses/integration-testing-asp-dot-net-core-applications-best-practices/table-of-contents) by Steve Gordon is an excellent Pluralsight course, and I'm using the strategies discussed there.


In summary I'm testing:

- HealthCheckTests - /healthcheck responds with a 200, not redireted, and no caching
- Pages/HomePageTests - should give a 200 and an H1 with "Welcome to CookieDave"
- GeneralPageTests  - all anonymous pages work, not redirected, correct media type text/html
- ErrorTests - /nothere page should give a status code of 404 and a friendly custom message
- AuthenticationTests - all pages requiring authentication should give a 302Redirect to /account/login
- Pages/Tier1NeededTests - If logged user has Role of Tier1, Tier2 or Admin then they should be able to view
- Pages/Tier2NeededTests - If logged user has Role of Tier2 or Admin then they should be able to view
- Enquiry - Post Form testing a XSS Antiforgery token.. it should work

## Part 4 - Persistence (Database)

It has been so worthwhile not having persistence whilst understanding my needs for Identity (Parts 1 - 3 above). It has made the code much easier to reason about and learn how it works.

[Storing passwords in a database](/2020/10/14/storing-passwords-in-a-database) is a big topic so I've split it out into another article.

[Configuration and Hosting Environments]() to get the correct connection strings etc.. for correct environments

Testing becomes more intersting too with persistence - [much more detail here - ASP.NET Core Web Testing](/2020/10/21/x2integration-testing-of-asp.net-core-3.1)



## Further Reading

[A better way to handle authorisation - Jon P Smith](https://www.thereformedprogrammer.net/a-better-way-to-handle-asp-net-core-authorization-six-months-on/)

[User Roles and Permissions on Drupal](https://www.drupal.org/drupalorg/docs/user-accounts/user-roles-and-permissions)


[Andrew Lock](https://andrewlock.net/customising-aspnetcore-identity-without-editing-the-pagemodel/) has a great tutorial on how to scaffold out, then only use the relevant bit.

## Conclusion

I've got 4 more articles coming delving into Testing, Configuration, Storing Passwords, and Razor Pages.

Learning how to do a simple Cookie based Identity based site with just the parts I need feels really freeing. I've now got great tests, great certainty on my apps security, and a very simple codebase anyone can understand.


