---
layout: post
# title: CSS and Design for Developers 
description: Email
menu: review
categories: CSS 
published: false 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- ## Introduction. -->

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-10-07/http2b.png "http2"){:width="200px"}](/assets/2021-10-07/http2b.png) -->


## Email scanning link checkers

Looking at my logs I noticed that whenever I sent an email certain domains I would get the included links in that email hit on my webserver just afterwards. Maybe a few seconds, maybe a few minutes

[https://ipinfo.io/](https://ipinfo.io/) to dig into the origin of the requests gave me


## Barracuda

[https://www.barracuda.com/](https://www.barracuda.com/)


I used to have an email confirmation link something like:

```https://osr4rightstools.org/account/email-address-confirmation/a9493b9b-5eb2-4043-a6c7-bf921df6c4f7```

And this is what barracuda hit, which registered the email.

[https://wordtothewise.com/2013/07/barracuda-filters-clicking-all-links/](https://wordtothewise.com/2013/07/barracuda-filters-clicking-all-links/) article talks about this, with the simple workaround of having to put a button on the form eg.


So


## Microsoft

