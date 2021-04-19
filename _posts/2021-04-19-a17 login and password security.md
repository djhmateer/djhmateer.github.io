---
layout: post
title: 17 Login and password security
description: 
menu: review
categories: Razor 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

I love the simplicity of [Cookie based authentication](/2020/10/21/cookie-authentication-in-asp.net-core-3.1)

[Storing passwords in a database](/2021/02/13/a7-storing-passwords-in-a-database) properly is critical.

So now we need to make sure our workflow is good:

## Setting / Registering a new user

I'm generally making intranet applications, so the user is setup by back end admins. There is no concept of the user self registering.

## Complexity of Password

We don't want our login form username password combination to be easily guessable.

u: dave@hmsoftware.co.uk
p: letmein

[Troy Hunt on Minimum Password Lengths](https://www.troyhunt.com/how-long-is-long-enough-minimum-password-lengths-by-the-worlds-top-sites/)

[https://haveibeenpwned.com/API/v3](https://haveibeenpwned.com/API/v3) which is now a paid service at $3.50pm.

Credential stuffing - we don't want users to re-use a known email and password combination.

As we're getting admins to setup passwords initially, a nice little tool is [https://passwordsecurity.info/](https://passwordsecurity.info/) which does the hibp api lookup to see if the password has been compromised.

As soon as we allow users to set their own passwords we need to be much more vigilant.

## Lockout after x attempts

A simple way is to lockout a user after x attempts.

## Geolocation

If you know your site should only be accessed by people in the UK, then a simple geo-lookup on the IP is a simple win.

## 2FA Lite

Steam uses this. ie a browser/location you haven't logged in with before, requires a code to be sent to the registered email. 

## Reset password

Link expires after x minutes

## Password managers

I use one and have separate long passwords for each site I have to login to. I do not use 3rd Party Authentication eg Google, Facebook unless I have to.





