---
layout: post
title: Email for a custom domain using Google Workspace 
description: 
menu: review
categories: email
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-08-29/error.jpg "error"){:width="500px"}](/assets/2021-08-29/error.jpg) -->

My companies domain name is [hmsoftware.co.uk](https://hmsoftware.co.uk)

I use [DNSimple](https://dnsimple.com/) as my registrar (and interestingly DNSimple use [1api.net](http://www.1api.net)), and to host the DNS records.

[WHOIS Info](https://www.ukfast.co.uk/whois.html#2)


<!-- [![alt text](/assets/2021-09-03/dns.jpg "dns"){:width="700px"}](/assets/2021-09-03/dns.jpg) -->
[![alt text](/assets/2021-09-03/dns.jpg "dns")](/assets/2021-09-03/dns.jpg)

As you can see I've been using an email forwarder from [DNSimple](https://dnsimple.com/) so that any email coming to dave@hmsoftware.co.uk is forwarded (via [mailgun](https://www.mailgun.com/)) to my personal gmail account.

However this doesn't let easily send email from dave@hmsoftware.co.uk. So lets do it properly and use a trusted 3rd party to send emails with a good mobile app, and UX on desktop too.

## Google Workspace

[Google Workspace](https://workspace.google.com/products/gmail/) formerly G Suite provides custom domain email for £4.50per user/month. It is possible to [do it for free](https://digital.com/create-email-using-gmail/) using gmail, but I'm more than happy to pay for it as:

- It seamlessly integrated on my mobile
- It worked when I needed it to

So, here is how I did it:

[Set up Gmail with your business address](https://support.google.com/a/answer/172171?hl=en)

[Quick start guide for 1 person business](https://support.google.com/a/answer/9212585)

I need to sign up for a Google Workspace (which isn't the same as my davemateer@gmail.com workspace where I buy 100GB of storage)

They give a 14 day free trial which is the business standard edition £8.28 per user per month. This was slightly annoying to have to buy the more expensive one, then downgrade afterwards.

[Compare the editions](https://support.google.com/a/answer/6043576?hl=en&ref_topic=4425947)

need to downgrade to [business starter edition](https://support.google.com/a/answer/10071876?hl=en) at any time which is £4.14 per user/month

Payment form was excellent and changing DNS records was a breeze as they have instructions for DNSimple!

https://admin.google.com/u/2/ac/signup/setup/v2/explore

[https://admin.google.com/u/2/ac/signup/setup/v2/explore](https://admin.google.com/u/2/ac/signup/setup/v2/explore)


### Chrome Profile

[![alt text](/assets/2021-09-03/chrome.jpg "chrome"){:width="700px"}](/assets/2021-09-03/chrome.jpg)

Having my 2 email accounts open at the same time is very handy in a separate Chrome profile


## Office 365

Didn't choose because of identity. Am using dave@hmsoftware both: workplace and personal accounts for different things.

dave@hmsoftware.co.uk (workplace) is a request to become a microsoft partner
dave@hmsoftwrae.co.uk (personal) is a paid Azure Subscription



## Fastmail and Others

[fastmail.com](https://www.fastmail.com/pricing/) are a good alternative with a custom domain

There are innumerable ways of getting custom domain emails eg [bluehost](https://www.guru99.com/how-to-setup-a-professional-email-address.html).

[thehelm.com discussion](https://news.ycombinator.com/item?id=18238581) is an interesting hybrid non-cloud solution. The discussion here highlights the complexities of email.


## Conclusion


