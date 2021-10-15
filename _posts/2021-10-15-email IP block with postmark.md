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


## Postmark

<!-- [![alt text](/assets/2021-10-15/postmark.jpg "postmark"){:width="200px"}](/assets/2021-10-07/http2b.png) -->
[![alt text](/assets/2021-10-15/postmark.jpg "postmark")](/assets/2021-10-15/postmark.jpg)

This is something you never want to see - your email being blocked! 


I've found I can send an HTML email fine to that same address (with no links in it)


Here is the offending problematic email (with a different To address)

[![alt text](/assets/2021-10-15/email.jpg "email")](/assets/2021-10-15/email.jpg)


[https://postmarkapp.com/support/article/815-what-are-bounces-and-spam-complaints](https://postmarkapp.com/support/article/815-what-are-bounces-and-spam-complaints) 


[https://postmarkapp.com/support/article/1158-how-to-fix-isp-blocks](https://postmarkapp.com/support/article/1158-how-to-fix-isp-blocks) 

So from reading the above it looks as if the message was rejected probably due to a local policy.


## Email Scanning / Barracuda

Looking at my logs I discovered some unknown IP's hitting the server directly after the email was sent. They came from [https://www.barracuda.com/](https://www.barracuda.com/).

I assume that `essex.ac.uk` use this service.

```bash
18.133.136.156 - - [15/Oct/2021:12:36:00 +0000] "GET /account/email-address-confirmation/fd788c4e-ccf4-4db3-b066-6354c9aff602 HTTP/1.0" 
200 3318 "-" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; 
.NET CLR 3.0.30729)"
```


[https://ipinfo.io/](https://ipinfo.io/) - the tool I used to get information on an IP

I used to have an email confirmation link like: 

```http://osr4rightstools.org/account/email-address-confirmation/a9493b9b-5eb2-4043-a6c7-bf921df6c4f7```

which was doing a 302 direct to https (the link has since been fixed)

I can only assume that this triggered a rule, and didn't allow the email to be delivered.

Well even after fixing the 302 redirect it still doesn't work

## Email Scanning / Microsoft

I've noticed a similar behaviour from Microsoft (I suspect swansea.ac.uk use Office 365 for email).

Microsoft look at the mails then seem to do

`GET /account/email-address-confirmation/ASDFASDFSADF`

which gave a 404 error from my system as it expects a guid at the end, and MS gave their own string.

It delivered emails nonetheless.


## Don't allow actions on GET

I've since modified my code to have a button in which was recommended here: [https://wordtothewise.com/2013/07/barracuda-filters-clicking-all-links/](https://wordtothewise.com/2013/07/barracuda-filters-clicking-all-links/) article talks about this.

## Try Gmail as an email provider?

I tried copying the email and sending from my Work Gmail GUI which didn't bounce.

So perhaps Barracuda uses the reputation of the SMTP provider to allow emails to get through.


[https://blog.elmah.io/how-to-send-emails-from-csharp-net-the-definitive-tutorial/](https://blog.elmah.io/how-to-send-emails-from-csharp-net-the-definitive-tutorial/)


[https://developers.google.com/gmail/api/quickstart/dotnet](https://developers.google.com/gmail/api/quickstart/dotnet)

Create a Project and enable the API

