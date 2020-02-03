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

![alt text](/assets/2020-01-09/43.jpg "Generate the db locally using migrations"){:width="300px"}  



## External Authentication Provider - Google

[Overview from MS Docs](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/social/?view=aspnetcore-3.1&tabs=visual-studio) and [Google Specific](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/social/google-logins?view=aspnetcore-3.1)

```bash
# install the NuGet package for Google auth
dotnet add package Microsoft.AspNetCore.Authentication.Google --version 3.1.1
```

[Go to project page on google to setup the project](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin)




