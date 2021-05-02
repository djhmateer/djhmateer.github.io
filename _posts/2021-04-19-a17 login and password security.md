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

[Cookie based authentication](/2020/10/21/cookie-authentication-in-asp.net-core-3.1) with email address and password for authentication is simple.

We should be using a password manager like [Bitwarden](https://bitwarden.com/), [1Password](https://1password.com/), [LastPass](https://www.lastpass.com/) etc.. to generate separate passwords for each site.

However there are situations where we need to generate a password for a user, where we can't expect them to be using a password manager, nor MFA so we try and guide them towards being as secure as possible.


## Help suggest a password - machine-generated password

This is nice - generate some words (which haven't been compromised before)

[https://github.com/glyph/horsephrase](https://github.com/glyph/horsephrase)

## Password Complexity

- 8 characters or more
- 1 Capital letter or more

This is inline with the UK Government current guidelines.

[Troy Hunt on Minimum Password Lengths](https://www.troyhunt.com/how-long-is-long-enough-minimum-password-lengths-by-the-worlds-top-sites/)

## Credential stuffing (password black list)

We don't want our login form username password combination to be easily guessable.

- u: dave@hmsoftware.co.uk
- p: letmein

nor do we want any known username and password combinations to be used 

- u: dave@hmsoftware.co.uk
- p: mypasswordiuseoneverysite

So lets check against known passwords

[https://haveibeenpwned.com/Passwords](https://haveibeenpwned.com/Passwords)



[https://haveibeenpwned.com/API/v3](https://haveibeenpwned.com/API/v3) which is now a paid service at $3.50pm.

Credential stuffing - we don't want users to re-use a known email and password combination.

As we're getting admins to setup passwords initially, a nice little tool is [https://passwordsecurity.info/](https://passwordsecurity.info/) which does the hibp api lookup to see if the password has been compromised.

As soon as we allow users to set their own passwords we need to be much more vigilant.


## Lockout after x attempts

A simple way is to lockout a user after x attempts.

## Geolocation

If you know your site should only be accessed by people in the UK, then a simple geo-lookup on the IP is a simple win.

## Expire

Don't expire passwords

## 2FA Lite

Steam uses this. ie a browser/location you haven't logged in with before, requires a code to be sent to the registered email. 

## Reset password

Link expires after x minutes

## Password managers

I use one and have separate long passwords for each site I have to login to. I do not use 3rd Party Authentication eg Google, Facebook unless I have to.

## Resources

[https://www.metacompliance.com/blog/password-policy-best-practices-2021/](https://www.metacompliance.com/blog/password-policy-best-practices-2021/)

[Storing passwords in a database](/2021/02/13/a7-storing-passwords-in-a-database) properly is critical.

So now we need to make sure that the password the user sets is good. 

[https://www.ncsc.gov.uk/collection/passwords/updating-your-approach](https://www.ncsc.gov.uk/collection/passwords/updating-your-approach)
