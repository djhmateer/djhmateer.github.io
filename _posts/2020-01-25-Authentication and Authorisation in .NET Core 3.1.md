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
I'm developing a SaaS based product, and need `Authentication` (who you are) and `Authorisation` (what you're allowed to do in my web app).

[Identity on ASP.NET Core](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio) gives us this

- Supports login functionality
- Manages users, passwords, profile data, roles, claims, tokens, email confmation and more

I use a password manager [eg LastPass](https://lastpass.com) and never use Single Sign on OAuth2 [external authentication providers](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/social/?view=aspnetcore-3.1&tabs=visual-studio) such as Facebook, Google, Twitter, Microsoft as I can never rememmber which one I've used on a particular website. I enjoy the simplicity of separate passwords on each site which are stored in a password manager. This will also simplify the auth process for my SaaS products.

[MS Docs on Authentication](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/individual?view=aspnetcore-3.1) are the obvious place to start.

## File new project VS GUI

[Following along from this MS Doc](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio) 

![alt text](/assets/2020-01-09/40.jpg "Individual user account"){:width="600px"}  

Once the project template has finished we need to create the database, and I'm using the default MSSQL:

```bash
# make sure you have the global ef tools installed
dotnet tool install -g dotnet-ef

# apply the migrations for LocalDB
dotnet ef database update
```

Could use the Powershell package manager console in Visual Studio to do `Update-Database` but I am a fan of the command line

### Could not execute becuase the specificed command or file was not found

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

# add nuget packages to the project
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add package Microsoft.AspNetCore.Identity.UI
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

# list options
dotnet aspnet-codegenerator identity -h

# this is the minimum number of files - use the fully qualified name of your DB context
dotnet aspnet-codegenerator identity -dc WebApplication1.Data.ApplicationDbContext --files "Account.Register;Account.Login"

# miss out the --files flag to get all identity UI pages
# --force to override all files
dotnet aspnet-codegenerator identity -dc WebApplication1.Data.ApplicationDbContext --force
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

Lets follow the `ScaffoldingReadMe.txt` to patch in the new code:

services.AddMvc(); // before serives.AddRazorPages();
endpoints.MapControllers(); // before endponts.MapRaorPages();

**how to make sure we've using our new pages?
[how to patch in this new code and not use default](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-3.1&tabs=netcore-cli#feedback) - this seems to be still referred to v2.1

*feedback

[ASP.NET Core documentation sample](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/samples?view=aspnetcore-3.1) - maybe will help in putting in outdated code



