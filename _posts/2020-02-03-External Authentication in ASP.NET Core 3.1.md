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

Lets patch in Google social login into an ASP.NET Core 3.1 Web Application. [This follows on from my previous article on straight up Authentication and Authorisation using username and password](/2020/01/25/Authentication-and-Authorisation-in-ASP.NET-Core-3.1) and I've found it harder that it should be IMHO.

## External Authentication Provider - Google

[Overview from MS Docs](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/social/?view=aspnetcore-3.1&tabs=visual-studio) and [Google Specific](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/social/google-logins?view=aspnetcore-3.1)

```bash
# install the NuGet package for Google auth
dotnet add package Microsoft.AspNetCore.Authentication.Google --version 3.1.1
```

[Go to project page on google to setup the project](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin) essentially getting:
a `clientID` and `clientSecret` associated with a callback url eg `https://webapplication2dmtest.azurewebsites.net/signin-google`

## SQL Delete from all tables

To aid in resetting the system, I found connecting to the remote DB locally via [SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) to be good with the following commands (be careful).

```sql
select * from [dbo].[AspNetRoleClaims]
select * from [dbo].[AspNetRoles]
select * from  [dbo].[AspNetUserClaims]

-- Google userID here
select * from [dbo].[AspNetUserLogins]

select * from  [dbo].[AspNetUserRoles]

-- stuff in here
select * from  [dbo].[AspNetUsers]

select * from  [dbo].[AspNetUserTokens]

--delete from [AspNetUserLogins]
--delete from [AspNetUsers]
```

## Bugs

[Strange bug](https://docs.microsoft.com/en-gb/aspnet/core/security/authentication/accconfirm?view=aspnetcore-3.1&tabs=visual-studio) and 
[SO answer](https://stackoverflow.com/questions/58824729/problems-with-using-external-login-and-sending-confirmation-mail-in-asp-net-core) and the [GitHub bug tracker](https://github.com/dotnet/aspnetcore/issues/18140)

I found using the following for test was useful

```cs
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

    // note this! I'm trusting that the google account is coming back is good
    // am only authenticating through google so this is fine (facebook is a different story) 
    options.SignIn.RequireConfirmedAccount = false;
    options.SignIn.RequireConfirmedEmail = false;
});

```


Below is trying to sign in using debug mode on localhost

![alt text](/assets/2020-02-03/01.jpg "Couldn't sign you in"){:width="400px"}  


