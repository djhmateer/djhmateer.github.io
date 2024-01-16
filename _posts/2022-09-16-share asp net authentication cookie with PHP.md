---
layout: post
# title: Proxmox Beginners Guide
description: 
# menu: review
categories: authentication
published: true 
comments: false     
sitemap: true
image: /assets/2022-09-15/cookie.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->

<!-- [![alt text](/assets/2022-09-15/fire-map.jpg "email")](/assets/2022-09-15/fire-map.jpg) -->


I use .NET cookie based authentication and authorisation on the .NET side of [https://osr4rightstools.org/](https://osr4rightstools.org/). There is a separate VM running Apache / PHP which runs the /fire-map side.

We need some way of authentication and authorising users on the PHP side.

It is a low traffic site, and here I'd like to show a simple way of accomplishing what we need.

## Concept

[![alt text](/assets/2022-09-15/cookie.jpg "email")](/assets/2022-09-15/cookie.jpg)

.NET creates an authentication cookie called `.AspNetCore.Cookies` which is encrypted using a key on the server side. I store this encryption key in a shared drive on Azure so that rebuilding the VM doesn't delete the encryption key. Otherwise users would be logged out automatically after every vm rebuild.

Authentication cookie lasts for 2 weeks

The code for setting this cookie is in my login.html.cs file and explained in [https://andrewlock.net/exploring-the-cookieauthenticationmiddleware-in-asp-net-core/](https://andrewlock.net/exploring-the-cookieauthenticationmiddleware-in-asp-net-core/)


## Use the DB

Conceptually I can read the cookie from PHP side as I'm on the same domain:

```
Name: .AspNetCore.Cookies
Value: CfDJ8E3QvFTfjVJMpjdSl5cfjIYBk_vmRLXYID3ozWnMqkjufHMaVBOSfCzJgYgrLCo2XgskrGPdDN3vP_Qk52kTy_ywAsXYOYnoiHVRxxzN8...
```

If I store this value in my database when I do a login on .NET side, then I can infer what I need to know

DB Table picture

So I'm not decrypting the cookie, but using the CookieValue to lookup in my database.

## PHP Side

[Install MSSQL Driver](https://docs.microsoft.com/en-us/sql/connect/php/installation-tutorial-linux-mac?view=sql-server-ver16)


Need PHP 7.4 for latest version of PHP drivers for SQL Server. Ubuntu 20.04 is good, 21.04 and 21.10 (so not the latest 22.04.1 LTS!)


[![alt text](/assets/2022-09-15/pdo.jpg "email")](/assets/2022-09-15/pdo.jpg)


## Require or Include for every page

As we're not using the inbuilt

```php
session_start();
// usercode eg 101
 $_SESSION['usercode']=$_POST['usercode'];
```


### Logout

## When a cookie expires

The browser deletes it automatically and wont send, so we would just be prompted to login again, which would issue a new cookie which will create/update the Cookie table for that user.

So a

## Multiple logins from different browsers

The cookie value remains the same.

### Sessions / Idempotency

I'm not using any sort of state between requests. The cookie just proves who is logged in (authenticaton) and what what they are allowed to access (authorisation)


## Decrypt Key PHP code 

I could decrypt the cookie using PHP as I've got the decryption key available on a shared drive. But I couldn't easily figure this out.

## Nginx to check authentication

Essentially using OAuth2 with JWT tokens. OpenID connect etc.. For a larger scale system with heavier load I would use this.

[nginx docs](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-subrequest-authentication/#:~:text=To%20perform%20authentication%2C%20NGINX%20makes,403%20%2C%20the%20access%20is%20denied)



