---
layout: post
title: Identity - Authentication and Authorisation in ASP.NET Core 3.1 
description: 
menu: review
categories: Auth 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/3.jpg
---
I'm developing a SaaS based product, and need `Authentication` (who you are) and `Authorisation` (what you're allowed to do) in my app.

[Identity on ASP.NET Core](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio) gives us:

- Local Login with details stored in my database
- Manages users, passwords, profile data, roles, claims, tokens, email confirmation and more
- External/Social Login eg Google, Facebook, Twitter, Microsoft Account

I use a password manager [eg LastPass](https://lastpass.com) and never use [external authentication providers](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/social/?view=aspnetcore-3.1&tabs=visual-studio) such as Facebook, Google, Twitter, Microsoft as I can never remember which one I've used on a particular website. I enjoy the simplicity of separate passwords on each site which are stored in a password manager.

[It seems though that I'm in the minority](https://www.indiehackers.com/product/startday/google-login-vs-regular-email-almost-50-used-g--LzVsMo61s3b85ZRAfLf?utm_campaign=top-milestones-daily&utm_medium=email&utm_source=indie-hackers-emails) I suspect because I regularly use 3 different machines so its difficult to remember which provider I used on a particular website. Google has become a winner apparently.

[MS Docs on ASP.NET Core Security](https://docs.microsoft.com/en-gb/aspnet/core/security/?view=aspnetcore-3.1) are the obvious place to start.

Lets start with a single username and password login, then add in External afterwards.

I am not using a WebAPI or a SPA, otherwise I would be looking at [something like IdentityServer4, Azure AD](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio) to secure the API's

## File new project VS GUI

I highly recommend doing this as [adding scaffoled identity to an existing app](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-3.1&tabs=visual-studio#scaffold-identity-into-a-razor-project-without-existing-authorization) is not straightforward and having a working example is invaluable.

[Following along from this MS Doc](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio)

![alt text](/assets/2020-01-09/40.jpg "Individual user account"){:width="600px"}  

Or we can do it via the CLI

```bash
# MSSQL version -uld is use-local-database
dotnet new webapp --auth Individual -uld -o WebApp1
```

Once the project template has finished we need to create the database, and I'm using the default MSSQL and have modified the `appsettings.json` file to give a saner name for my db.

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=aspnet-WebApplication2;Trusted_Connection=True;MultipleActiveResultSets=true"
  }...
```

## MSSQL

Lets run the migrations, which means actually standing up the database and creating tables, views etc..

[https://dotnet.microsoft.com/download/dotnet-core](https://dotnet.microsoft.com/download/dotnet-core)

```bash
# latest version of dotnet installed?
# currently v3.1.2 and SDK is 3.1.102 (see download link above for latest)
dotnet --info

# make sure you have the global ef tools installed
dotnet tool install -g dotnet-ef

# apply the migrations for LocalDB
dotnet ef database update
```

Could use the PowerShell package manager console in Visual Studio to do `Update-Database` but I am a fan of the command line

### Could not execute because the specified command or file was not found

![alt text](/assets/2020-01-09/41.jpg "Error doing a dotnet ef database update"){:width="600px"}  
[See this thread if you have any problems with the tool](https://github.com/dotnet/efcore/issues/15448), for example forgetting to install it!

So this works well out of the box giving an EF Context backed store in MSSQL `(localdb)\mssqllocaldb`

![alt text](/assets/2020-01-09/43.jpg "Generate the db locally using migrations"){:width="300px"}  

## Run Identity with defaults

![alt text](/assets/2020-01-09/45.jpg "it works!"){:width="300px"}  

[The defaults are that we need 6 characters, alphanumeric, etc..](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio#configure-identity-services)

![alt text](/assets/2020-01-09/46.jpg "nice developer friendly auto email confirm"){:width="800px"}  

A nice developer feature is to have a friendly auto email confirm.

## Scaffolding out Pages - create full identity UI source

![alt text](/assets/2020-01-09/44.jpg "Where are the pages?"){:width="500px"}  

[Lets create full identity UI source](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-3.1&tabs=visual-studio#create-full-identity-ui-source)

Where are the pages eg `/Identity/Account/RegisterConfirmation`? They are provided as a Razor Class Library in a NuGet [Microsoft.AspnetCore.Identity.UI](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity.UI) package.

This has always been perplexing for me that you have to do this separate step to see the source pages as I always end up modifying them.

[Scaffold identity into a Razor project with authorization](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-3.1&tabs=netcore-cli#scaffold-identity-into-a-razor-project-with-authorization)

```bash
# clean nuget packages (close Visual Studio)
# this helps get rid of any dependency issues which may be cached
dotnet nuget locals all --clear

# install the scaffolder globally
dotnet tool install -g dotnet-aspnet-codegenerator

dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add package Microsoft.AspNetCore.Identity.UI
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

# useful for app.UseDatabaseErrorPage();
dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore

# miss out the --files flag to get all identity UI pages --force to override all files
dotnet aspnet-codegenerator identity -dc WebApplication2.Data.ApplicationDbContext
```

So this added in these files:

```bash
# show all untracked files
# git status -u
Areas/Identity/IdentityHostingStartup.cs
Areas/Identity/Pages/Account/ # lots of files added in here
Areas/Identity/Pages/_ValidationScriptsPartial.cshtml
Areas/Identity/Pages/_ViewImports.cshtml
ScaffoldingReadMe.txt
```

## C#8 Nullable Reference Types issue

[I found an issue and raised an issue with a fix as I like to use Nullable Ref Type checking](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-3.1&tabs=visual-studio#create-full-identity-ui-source)

## Put Authorize on a page

Lets make it so the User has to be authenticated to view the privacy page.

```cs
[Authorize]
public class PrivacyModel : PageModel
{
    private readonly ILogger<PrivacyModel> _logger;

    public PrivacyModel(ILogger<PrivacyModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
    }
}
```

![alt text](/assets/2020-01-09/60.jpg "Authorisation on a page"){:width="400px"}  

It works!

## Update Startup.cs

[As I want to retain full control of identity lets Create Full Identity UI Source](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-3.1&tabs=netcore-cli#create-full-identity-ui-source)

## AddDefaultIdentity

[AddDefaultIdentity was introduced in .NET Core 2.1](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=netcore-cli#adddefaultidentity-and-addidentity) to cut down code. However I like to be explicit:

```cs
//services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
//    .AddEntityFrameworkStores<ApplicationDbContext>();

// being more explicit
services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// if not using default need this for redirect to login when access denied
services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = $"/Identity/Account/Login";
    options.LogoutPath = $"/Identity/Account/Logout";
    options.AccessDeniedPath = $"/Identity/Account/AccessDenied";
});
```

## Where to keep Identity Options

The generated file is in

```cs
[assembly: HostingStartup(typeof(BLC.Website.Areas.Identity.IdentityHostingStartup))]
namespace BLC.Website.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                // defaults copied from 
                // https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=netcore-cli#configure-identity-services

                services.Configure<IdentityOptions>(options =>
                {
                    // Password settings.
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredLength = 6;
                    options.Password.RequiredUniqueChars = 0;

                    // Lockout settings.
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                    options.Lockout.MaxFailedAccessAttempts = 5;
                    options.Lockout.AllowedForNewUsers = true;

                    // User settings.
                    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                    options.User.RequireUniqueEmail = true;

                    // not default, but came as part of the template
                    options.SignIn.RequireConfirmedAccount = false;
                    options.SignIn.RequireConfirmedEmail = false;
                });

                // setup the redirect to login page when going to an [Authorised] page
                services.ConfigureApplicationCookie(options =>
                {
                    // Cookie settings
                    options.Cookie.HttpOnly = true;
                    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

                    options.LoginPath = "/Identity/Account/Login";
                    options.AccessDeniedPath = "/Identity/Account/AccessDenied";
                    options.SlidingExpiration = true;
                });
            });
        }
    }
}
```

## Workflow

Should we be waiting for RequiredConfirmedAccount or RequireConfirmedEmail?

This can be very annoying if emails are not delivered quickly, which is a huge topic.

![alt text](/assets/2020-02-03/45.jpg "Waiting for an email to be delivered"){:width="600px"}  

This was 3 minutes after I'd sent the email to SendGrid's API and it was still processing. I got it after 5 minutes. The recovery email seemed to be instant.

## Testing

[Chrome delete cookies](chrome://settings/siteData) on localhost to see what cookies are placed. 

Lets get onto Release asap and the easiest way is to publish a WebApp to Azure.

![alt text](/assets/2020-01-09/70.jpg "Publish quickly to Azure"){:width="400px"}  

I created a DB too with the connection string as DefaultConnection. It created a `Standard 10DTU` as default where there is a `Basic 5DTU` which is fine for testing. I changed it over in the [portal.azure.com UI](https://portal.azure.com).

Default settings gave me (on 2nd Feb 2020):

> HTTP Error 500.30 - ANCM In-Process Start Failure

Set deployment mode to Self Contained and it will work. This was due to Azure not having 3.1.1 version of the runtime. It had 3.1.0. [This blog has a nice way of finding out](https://jonhilton.net/2018/09/26/check-the-versions-of-asp.net-core-available-to-your-azure-app-service/)

![alt text](/assets/2020-01-09/71.jpg "Problem - probably db connection related"){:width="600px"}  

![alt text](/assets/2020-01-09/73.jpg "Problem - probably db connection related"){:width="600px"}  

Add in Development settings in Azure so we can see the problem

![alt text](/assets/2020-01-09/72.jpg "Ah of course it is the migrations not done"){:width="600px"}  

There is an option in VS2019 Publish to include migration on publish. Lets do that.

## Cookies

![alt text](/assets/2020-01-09/74.jpg "Cookies in production"){:width="600px"}  


## Account Confirmation and Password Recovery

I want to make sure email works properly for account confirmation and password recovery, and we need to set this up manually.

[MS Docs on setting up email](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/accconfirm?view=aspnetcore-3.1&tabs=visual-studio)

I'm using [SendGrid](https://sendgrid.com)

[Could store secrets securely in local](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.1&tabs=windows) but I'm not as am doing dev on 3 local machines and have to store the SendGrid API key somewhere.

```bash
dotnet add package SendGrid
```

As usual weird stuff happens while testing email!

So lets go back to [smtp4dev the old windows GUI version](https://github.com/rnwood/smtp4dev) which is a dummy service to make sure our app is actually working.

```cs
// Startup.cs
// using Smtp4Dev and SendGrid
services.AddTransient<IEmailSender, EmailSender>();

// Service/EmailSender.cs
public class EmailSender : IEmailSender
{
    private readonly IWebHostEnvironment env;
    public EmailSender(IWebHostEnvironment env) => this.env = env;

    public Task SendEmailAsync(string email, string subject, string message) => 
        env.IsDevelopment() ? ExecuteSmtp4Dev(subject, message, email) 
            : ExecuteSendGrid(subject, message, email);

    public Task ExecuteSmtp4Dev(string subject, string message, string email)
    {
        var host = "localhost";
        var port = 25;
        var enableSsl = false;
        var userName = "";
        var password = "";
        var senderEmail = "davemateer@gmail.com";

        var client = new SmtpClient(host, port)
        {
            Credentials = new NetworkCredential(userName, password),
            EnableSsl = enableSsl
        };
        return client.SendMailAsync(new MailMessage(senderEmail, email, subject, message) { IsBodyHtml = true });
    }

    public Task ExecuteSendGrid(string subject, string message, string email)
    {
        var sendGridKey = "SECRET";
        var client = new SendGridClient(sendGridKey);
        var sendGridUser = "davemateer@gmail.com";
        var msg = new SendGridMessage()
        {
            From = new EmailAddress("davemateer@gmail.com", sendGridUser),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(email));
        msg.SetClickTracking(false, false);
        return client.SendEmailAsync(msg);
    }

```

Then I had to update the `RegisterConfirmation.cshtml.cs` commenting out the developer code to register a sender:

![alt text](/assets/2020-01-09/75.jpg "Commenting out developer code"){:width="600px"}  

Then even sending emails is tricky.. outlook.com is ignoring the emails I'm sending from my davemateer@gmail.com address (well taking ages to show up.. maybe 5 minutes) and going to junk. Obviously need to set this up properly. [Lets get Google auth working as should be more reliable to implement.](/2020/02/03/External-Authentication-in-ASP.NET-Core-3.1)
