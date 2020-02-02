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

[Following along from this MS Doc](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio)

![alt text](/assets/2020-01-09/40.jpg "Individual user account"){:width="600px"}  

Once the project template has finished we need to create the database, and I'm using the default MSSQL and have modified the `appsettings.json` file to give a saner name for my db.

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=aspnet-WebApplication2;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

## SQLite

As an interesting aside you can create a [SQLite version](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=netcore-cli#create-a-web-app-with-authentication):

```bash
# SQLite version - has an app.db file in the root of the project
dotnet new webapp --auth Individual -o WebApp1
# MSSQL version -uld is use-local-database
dotnet new webapp --auth Individual -uld -o WebApp1
```

which gives this as the `appsettings.json` connection string:

```json
  "ConnectionStrings": {
    "DefaultConnection": "DataSource=app.db"
  },
```

[DB Browser for SQLite](https://sqlitebrowser.org/) is a good browser for this db.

## MSSQL

Lets continue with MSSQL and now run the migrations, which means actually standing up the database and creating tables, views etc..

```bash
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

## Run it with defaults

![alt text](/assets/2020-01-09/45.jpg "it works!"){:width="300px"}  

[The defaults are that we need 6 characters, alphanumeric, etc..](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio#configure-identity-services)

![alt text](/assets/2020-01-09/46.jpg "nice developer friendly auto email confirm"){:width="400px"}  

## Scaffolding out Pages - create full identity UI source

![alt text](/assets/2020-01-09/44.jpg "Where are the pages?"){:width="500px"}  

[Lets create full identity UI source](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-3.1&tabs=visual-studio#create-full-identity-ui-source)

Where are the pages eg `/Identity/Account/RegisterConfirmation`? The are provided as a Razor Class Library in a NuGet [Microsoft.AspnetCore.Identity.UI](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity.UI) package.

This has always been perplexing for me that you have to do this separate step to see the source pages as I always end up modifying them.

[Scaffold identity into a Razor project with authorization](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-3.1&tabs=netcore-cli#scaffold-identity-into-a-razor-project-with-authorization)

```bash
# install the scaffolder globally
dotnet tool install -g dotnet-aspnet-codegenerator

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

[AddDefaultIdentity was introduced in .NET Core 2.1](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=netcore-cli#adddefaultidentity-and-addidentity)

```cs
AddIdentity()
AddDefaultUI()
AddDefaultTokenProviders()
```

## Testing

[Chrome delete cookies](chrome://settings/siteData) on localhost to see what cookies are placed. 

Lets get onto Release asap and the easiest way is to publish a WebApp to Azure.

![alt text](/assets/2020-01-09/70.jpg "Publish quickly to Azure"){:width="400px"}  

I created a DB too with the connection string as DefaultConnection 

Default settings gave me (on 2nd Feb 2020):

> HTTP Error 500.30 - ANCM In-Process Start Failure

Set deployment mode to Self Contained and it will work. This was due to Azure not having 3.1.1 version of the runtime. It had 3.1.0. [This blog has a nice way of finding out](https://jonhilton.net/2018/09/26/check-the-versions-of-asp.net-core-available-to-your-azure-app-service/)

![alt text](/assets/2020-01-09/71.jpg "Problem - probably db connection related"){:width="600px"}  

![alt text](/assets/2020-01-09/73.jpg "Problem - probably db connection related"){:width="600px"}  

Add in Development settings in Azure so we can see the problem

![alt text](/assets/2020-01-09/72.jpg "Ah of course it is the migrations not done"){:width="600px"}  

## External Authenticaion Provider - Google

[Overview from MS Docs](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/social/?view=aspnetcore-3.1&tabs=visual-studio)

Lets follow the `ScaffoldingReadMe.txt` to patch in the new code:

services.AddMvc(); // before serives.AddRazorPages();
endpoints.MapControllers(); // before endponts.MapRaorPages();

**how to make sure we've using our new pages?
[how to patch in this new code and not use default](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-3.1&tabs=netcore-cli#feedback) - this seems to be still referred to v2.1

*feedback

[ASP.NET Core documentation sample](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/samples?view=aspnetcore-3.1) - maybe will help in putting in outdated code



