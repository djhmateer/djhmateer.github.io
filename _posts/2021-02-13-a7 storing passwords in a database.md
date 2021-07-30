---
layout: post
title: 7. Storing passwords in a database 
description: 
menu: review
categories: Postgres 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

This is a follow on article from [Cookie Authentication in ASP.NET Core](/2020/10/21/cookie-authentication-in-asp.net-core-3.1) where I explain why I'm using a very simple cookie based strategy for Authentication and Authorisation and I'm not using all of `Microsoft.AspNetCore.Identity.*`

[Source code for this article in password-postgres](https://github.com/djhmateer/password-postgres) and in [https://github.com/djhmateer/osr4rights-tools/tree/main/src/OSR4Rights.Web](https://github.com/djhmateer/osr4rights-tools/tree/main/src/OSR4Rights.Web)

[Storing Passwords in .NET article](https://medium.com/dealeron-dev/storing-passwords-in-net-core-3de29a3da4d2) is where I borrowed a lot of the thinking here.

[TardisBank](https://github.com/TardisBank/TardisBank/blob/master/server/src/TardisBank.Api/Password.cs) inspired the source code.

Essentially all I need to do is hash the password the user gives in the registration page then store it in the db.

Then when a user logs in we hash that and compare it to the one in the db.

## Hashing

Hash - a unique fingerprint

MD5 / SHA1 - have been shown to be manipulable so don't use
SHA256/SHA512 - both well tested

## Salting

An attacker could generate hashes based on a list of common passwords then try these. This is a rainbow table.

To avoid this a random bit of data is added when hashing called a 'salt'. The salt should be random and unique for every password.

This means that even users with the same password will have unique hashes.

The salt is stored along with the hash in the db ie password + salt

## Implementations

[How to securely has passwords on Security Stackexchange](https://security.stackexchange.com/questions/211/how-to-securely-hash-passwords) has a great write up. The TL;DR is to use:

- Bcrypt
- PBKDF2

PBKDF2 is what ASP.NET Core Identity uses under the hood [PasswordHasher in MS Identity](https://github.com/dotnet/aspnetcore/blob/master/src/Identity/Extensions.Core/src/PasswordHasher.cs) so I'm going to implement exactly that (with only the bits I need)

[Rob Conery - Deciding which hashing algorithm to use](https://bigmachine.io//blog/deciding-which-hashing-algorithm-to-use) digs deep.
## Source

```cs

```

So stored password hash may be:

`10000.4QtTb7jPc272uy8MmoWBkw==.CNTvz9T6kHq2/Bo7K7MdJfRvgItamXGR3lUtXL1IgrI=`

So we are using:

"PBKDF2 (RFC 2898) algorithm supplied in the .NET Core runtime. It’s a battle tested algorithm that takes a password and runs it through a hash algorithm (we’re using SHA512) a set number of times which at the end produces a large blob of binary to use as a “key”. This process is referred to as key derivation. The implementation in .NET will automatically create a random salt for us of a specified size. "

## Links

[Storing passwords in net core](https://medium.com/dealeron-dev/storing-passwords-in-net-core-3de29a3da4d2) - great article where I got a lot of background

[how to process passwords](https://dev.to/nathilia_pierce/how-to-process-passwords-as-a-software-developer-3dkh)

[Troy Hunt - Encryption vs Hashing](https://www.troyhunt.com/we-didnt-encrypt-your-password-we-hashed-it-heres-what-that-means/)

[Security Stackexchange - How to securely has passwords](https://security.stackexchange.com/questions/211/how-to-securely-hash-passwords)

[password-hasing.net](https://password-hashing.net/)

[.NET Implementation of Agron](https://github.com/mheyman/Isopoh.Cryptography.Argon2)
