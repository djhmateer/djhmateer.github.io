---
layout: post
title: External Authentication in ASP.NET Core 3.1 ie Google social login 
description: 
menu: review
categories: Auth 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/3.jpg
---

Lets patch in Google social login into an ASP.NET Core 3.1 Web Application. [This follows on from my previous article on straight up Authentication and Authorisation using username and password]()




## External Authentication Provider - Google

[Overview from MS Docs](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/social/?view=aspnetcore-3.1&tabs=visual-studio) and [Google Specific](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/social/google-logins?view=aspnetcore-3.1)

```bash
# install the NuGet package for Google auth
dotnet add package Microsoft.AspNetCore.Authentication.Google --version 3.1.1
```

[Go to project page on google to setup the project](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin)



## SQL Delete from all tables

```sql
-- Delete from all tables in the current DB
-- useful for resetting all the identity tables
EXEC sys.sp_msforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'
EXEC sp_MSForEachTable 'SET QUOTED_IDENTIFIER ON; DELETE FROM ?'
EXEC sys.sp_MSForEachTable 'ALTER TABLE ? CHECK CONSTRAINT ALL'
```

## Debuggin

[Strange bug](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/accconfirm?view=aspnetcore-3.1&tabs=visual-studio) and 
[SO answer](https://stackoverflow.com/questions/58824729/problems-with-using-external-login-and-sending-confirmation-mail-in-asp-net-core) and the [GitHub bug tracker](https://github.com/dotnet/aspnetcore/issues/18140)




Below is trying to sign in using debug mode on localhost

![alt text](/assets/2020-02-03/01.jpg "Couldn't sign you in"){:width="400px"}  


