---
layout: post
title:  "How to setup SSL and HTTPS on Github Pages with Cloudflare"
date:   2018-01-07
categories: security
published: true 
---
![Menu](/assets/2018-01-08/menu.png)

### Summary
I setup my github pages hosted blog site (this one) to be running HTTPS by using Cloudflare. There is no cost involved.

### Cloudflare
I used this article [Cloudflare blog](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/) but didn't setup any rules yet. The concept is that Cloudflare registers a certificate for you for free.

![Cert](/assets/2018-01-08/cert.png)

### Point DNS to Clourflare
I use [DNSimple](https://dnsimple.com) to register my domain name then pointed its DNS to Cloudflare.
![DNS](/assets/2018-01-08/dns.png)

### Enforce HTTPS via Cloudflare
I want all [http://davemateer.com](http://davemateer.com) and http://www.davemateer.com traffic to resolve to https://davemateer.com
Under the Crypto tab on Cloudflare
![SSL](/assets/2018-01-08/https.png)




