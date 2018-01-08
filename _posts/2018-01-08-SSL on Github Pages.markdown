---
layout: post
title:  "SSL and HTTPS on Github Pages"
date:   2018-01-07
categories: security
published: true 
---
![Interview](/assets/interview2_500.jpg)

### Summary
I setup my github pages hosted blog site (this one) to be running HTTPS by using Cloudflare. There is no cost involved.

### Cloudflare
I this this article [Cloudflare blog](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/). The concept is that cloudflare registers a certificate for you for free.

### Point DNS to Clourflare
I use [DNSimple](https://dnsimple.com) to register my domain name then pointed the DNS to cloudflare.

### Mixed content errors
asdf

### Enforce HTTPS via Cloudflare
I want all http://davemateer.com and http://www.davemateer.com traffic to resolve to https://davemateer.com
Under the Crypto tab on Cloudflare
![SSL](/assets/2018-01-08/ssl.png)



