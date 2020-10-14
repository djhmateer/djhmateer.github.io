---
layout: post
title: Storing passwords in a database 
description: 
menu: review
categories: Postgres 
published: false 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

This is a follow on article from [Cookie Authentication in ASP.NET Core](/2020/08/27/cookie-authentication-in-asp.net-core-3.1) where I explain why I'm using a very simple cookie based strategy for Authentication and Authorisation and I'm not using all of `Microsoft.AspNetCore.Identity.*`

[Source code for this article in password-postgres](https://github.com/djhmateer/password-postgres)

Essentially all I need to do is 'hash' the password the user gives in the registration page then store it in the db.

Then when a user logs in we 'hash' that and compare it to the one in the db.

`System.Security.Cryptography`

`RNGCryptoServiceProvider`


```cs

```

## Hashing

Hash - a unique fingerprint

MD5 / SHA1 - have been shown to be manipulable so don't use
SHA256/SHA512 - both well tested

## Salting

An attacker could generate hashes based on a list of common passwords then try these. This is a rainbow table.

To avoid this a random bit of data is added when hashing called a 'salt'. The salt should be random and unique for every password.

This means that even users with the same password will have unique hashes.

The salt is stored along with the hash int he db ie password + salt

## Implementations

Bcrypt
PBKDF2



## What does MS Identity use under the hood

[PasswordHasher in MS Identity](https://github.com/dotnet/aspnetcore/blob/bfec2c14be1e65f7dd361a43950d4c848ad0cd35/src/Identity/Extensions.Core/src/PasswordHasher.cs)

## Links

[Storing passwords in net core](https://medium.com/dealeron-dev/storing-passwords-in-net-core-3de29a3da4d2) - great article where I got a lot of background

[how to process passwords](https://dev.to/nathilia_pierce/how-to-process-passwords-as-a-software-developer-3dkh)

[Troy Hunt - Encryption vs Hashing](https://www.troyhunt.com/we-didnt-encrypt-your-password-we-hashed-it-heres-what-that-means/)
