---
layout: post
title:  "How to setup SSL and HTTPS on Github Pages with Cloudflare"
categories: SSL Cloudflare GitHub
published: true 
redirect_from: "/security/2018/01/07/SSL-on-Github-Pages.html"
sitemap: true
---
![Menu](/assets/2018-01-08/menu.png)

### Summary
I setup my github pages hosted blog site (this one) to be running HTTPS by using Cloudflare. There is no cost involved.

### Update 2018
Github pages now automatically gets a LetsEncrypt certificate for you! No need to use Cloudflare to do this.

### Cloudflare
I used this article [Cloudflare blog](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/) but didn't setup any rules yet. The concept is that Cloudflare registers a certificate for you for free.

![Cert](/assets/2018-01-08/cert.png)

### Point DNS to Cloudflare
I use [DNSimple](https://dnsimple.com) to register my domain name then pointed it's DNS to Cloudflare.
![DNS](/assets/2018-01-08/dns.png)

### Enforce HTTPS via Cloudflare
I want all [http://davemateer.com](http://davemateer.com) and [http://www.davemateer.com](http://www.davemateer.com) traffic to resolve to [https://davemateer.com](https://davemateer.com)
Under the Crypto tab on Cloudflare
![SSL](/assets/2018-01-08/https.png)

### Turn off Injected Javascript (Email Address Obfuscation)
By default you will get an injected javascript file on all pages to help email addresses be obfuscated called email-decode.min.js. No thank you. In the Scrape Shield menu option.
![SSL](/assets/2018-01-08/email.png)
and server side excludes I turned off too.

### Don't use Cloudflare's Cache
We can disable it for 3 hours like this
![SSL](/assets/2018-01-08/devmode.png)
Or disable it completely using a page rule:
![Rule](/assets/2018-01-08/rule.png)










