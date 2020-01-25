---
layout: post
title: Authentication and Authorisation in ASP.NET Core 3.1 
description: 
menu: review
categories: Auth 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/3.jpg
---


I'm developing a SaaS based product, and need Authentication (who you are) and Authorisation (what you're allowed to do in my app).

I use a password manager [eg LastPass](https://lastpass.com) and never use Single Sign on OAuth2 [external authentication providers](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/social/?view=aspnetcore-3.1&tabs=visual-studio) such as Facebook, Google, Twitter, Microsoft as I can never rememmber which one I've used on a particular website. I enjoy the simplicity of separate passwords on each site which are stored in a password manager. This will also simplify the auth process for my SaaS products.

[MS Docs on Authentication](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/individual?view=aspnetcore-3.1) are the obvious place to start.

## File new project GUI

[Following along from this MS Doc](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio) 

![alt text](/assets/2020-01-09/40.jpg "Individual user account"){:width="600px"}  

```bash
# make sure you have the global ef tools installed
dotnet tool install -g dotnet-ef

# apply the migrations for LocalDB
dotnet ef database update
```

![alt text](/assets/2020-01-09/41.jpg "Error doing a dotnet ef database update"){:width="600px"}  
[See this thread if you have any problems with the tool](https://github.com/dotnet/efcore/issues/15448)  

So this works well out of the box giving an EF Context backed store in MSSQL `(localdb)\mssqllocaldb`

![alt text](/assets/2020-01-09/43.jpg "Generate the db locally using migrations"){:width="400px"}  

## Run it with defaults

![alt text](/assets/2020-01-09/45.jpg "it works!"){:width="600px"}  

The defaults are that we need 6 characters, alphanumeric, etc...

![alt text](/assets/2020-01-09/46.jpg "nice developer friendly auto email confirm"){:width="600px"}  



## Scaffolding out Pages

![alt text](/assets/2020-01-09/44.jpg "Where are the pages?"){:width="600px"}  

[MS Docs on Scaffolding out the separate pages](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-3.1&tabs=visual-studio#scaffold-identity-into-a-razor-project-with-authorization)

This has always been perplexing for me that you have to do this separate step to see the source pages as I always end up modifying them.