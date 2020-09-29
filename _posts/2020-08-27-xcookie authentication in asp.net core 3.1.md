---
layout: post
title: ASP.NET Security - Cookie Authentication in ASP.NET Core 3.1
description: 
menu: review
categories: authentication 
published: false 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- ![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"} -->

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

[Part 1 Source code - OnlyAuthentication](https://github.com/djhmateer/only-authentication) then [Part 2 Role Based Source code here](https://github.com/djhmateer/cookie-dave) and a [Scaffolded out ASP.NET Core default identity sample is here](https://github.com/djhmateer/authentication-dave)

## Nomenclature

In my application I'm using these terms:

- User - email, ???, password hash, isEmailVerified

- Role
  - Tier1 (my free tier, but need to be a successfully registered and active account)
  - Tier2 (paid tier, need to be successfully registered)
  - Admin (me)

A User can have multple Roles.

- Security - How to keep the application secure and the correct user sees the correct data

- Identity - Is Microsoft.AspNetCore.Identity.UI that supports login functionality. Manage users, passwords, pofile data, roles, claims, token, email confirmation and more.

- Authentication - user provides credentials that are then compared to those stored in a db ie determining the user's identity.

- Authorisation - what the user is allowed to do (ie the Roles they have)

## Part 1 - Cookie Forms Authentication

My use case is a SaaS products (I make tools to make sure websites are working). I'm not using JWT tokens (yet) as my app is light on JavaScript.

Use a Password manager to keep all my passwords

It is simple to implement, and as a SaaS business owner I want things to work well (In the early days of Stackover most of their support tickets were on identity)

[Cookie authentication without Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-3.1) which links to a good  [sample project in ASP.NET Docs](https://github.com/dotnet/AspNetCore.Docs/tree/master/aspnetcore/security/authentication/cookie/samples/3.x/CookieSample)

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

Also in the source I've simplified the pages - not using the in built logger, nor _validationscriptspartial... lot of tweaks to make it all more obvious.

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

Currently I only need one Role which makes it simpler!

## Part 3 - Testing

To aid in simplicity I've intentionally left

- Anonymous browsing enabled by default
- Attribute based Role based Authorization on each page

I like this as it leaves the code much less cluttered, but we have to be careful as the defaults are open on each page, so lets put tests on

[Integration Testing ASP.NET Core Applications: Best Practices](https://app.pluralsight.com/library/courses/integration-testing-asp-dot-net-core-applications-best-practices/table-of-contents) by Steve Gordon is an excellent Pluralsight course, and I'm using the strategies discussed there.

I've got [another blog post on ASP.NET Core Web Testing]() which goes into more detail on the testing here.

In summary I'm testing:

- HealthCheckTests - /healthcheck responds with a 200, not redireted, and no caching
- Pages/HomePageTests - should give a 200 and an H1 with "Welcome to CookieDave"
- GeneralPageTests  - all anonymous pages work, not redirected, correct media type text/html
- ErrorTests - /nothere page should give a status code of 404 and a friendly custom message
- AuthenticationTests - all pages requiring authentication should give a 302Redirect to /account/login
- Pages/Tier1NeededTests - If logged user has Role of Tier1, Tier2 or Admin then they should be able to view
- Pages/Tier2NeededTests - If logged user has Role of Tier2 or Admin then they should be able to view


## Part 4 - Database






















































- Simple Role model
- [A better way to handle authorisation - Jon P Smith](https://www.thereformedprogrammer.net/a-better-way-to-handle-asp-net-core-authorization-six-months-on/)

From the language used [here](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/secure-data?view=aspnetcore-3.1) we will have 3 security 'Groups'

- Registered users. User Role
- Admins.. Admin Role

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

## RBAC

[User Roles and Permissions on Drupal](https://www.drupal.org/drupalorg/docs/user-accounts/user-roles-and-permissions)

- Anonymous user
- Email Unverified User
- Authenticated User
- Admin

## Other Links

[Andrew Lock](https://andrewlock.net/customising-aspnetcore-identity-without-editing-the-pagemodel/) has a great tutorial on how to scaffold out, then only use the relevant bit.

[In Feb 2020]() I wrote articles on using the standard Authentication and Authorisation in ASP.NET Core 3.1, and never published them. They felt overly complex for me.


- next post will have Register, Forget password forms
- The hext blog post will cover testing
- The second blog post will be on persistance.
- Then making sure passwords are good with HIBP API
- Then alternatives?
- Deploy to Azure VM using AZ CLI
- enable lock out to prevent brute force
- anti forgery token.. csrf?
- cookie expires after x days


Really, all the users care about is... get security out of my way, and let me into the app!

## Policy Based Auth

This is nice as can define everything in the startup
 and have a fallback

but it is another concept..


```cs
  public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

            services.AddAuthorization(options =>
            {
                options.AddPolicy(AtLeastTier1, p => p.RequireRole(Tier1Role, Tier2Role, AdminRole));

                options.AddPolicy(AtLeastTier2, p => p.RequireRole(Tier2Role, AdminRole));

                options.AddPolicy(AdminOnly, p => p.RequireRole(AdminRole));

                options.FallbackPolicy = new AuthorizationPolicyBuilder()
                    // user has to be authenticated to view a page by default
                    .RequireAuthenticatedUser()
                    .Build();
            });

            // set all page Policy rules
            services.AddRazorPages(x =>
            {
                x.Conventions.AllowAnonymousToPage("/Index");
                x.Conventions.AllowAnonymousToPage("/Anonymous");
                x.Conventions.AllowAnonymousToPage("/ThrowException");
                x.Conventions.AllowAnonymousToPage("/Error");
                x.Conventions.AllowAnonymousToPage("/Account/Login");
                x.Conventions.AllowAnonymousToPage("/Account/Logout");

                x.Conventions.AuthorizePage("/Tier1RoleNeeded", AtLeastTier1);
                //x.Conventions.AuthorizePage("/Crawl", AtLeastTier1);

                x.Conventions.AuthorizePage("/Tier2RoleNeeded", AtLeastTier2);

                x.Conventions.AuthorizePage("/AdminRoleNeeded", AdminOnly);
            });

            services.AddHttpContextAccessor();
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
            }

            app.UseStaticFiles();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Strict });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
            });
        }
    }

        public class CDRole
    {
        public const string Tier1Role = "Tier1Role";
        public const string Tier1AndTier2Role = "Tier1Role,Tier2Role";
        public const string Tier2Role = "Tier2Role";
        public const string AdminRole = "AdminRole";
    }

    public class CDPolicy
    {
        public const string AtLeastTier1 = "AtLeastTier1";
        public const string AtLeastTier2 = "AtLeastTier2";
        public const string AdminOnly = "AdminOnly";
    }

```

## STuff
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