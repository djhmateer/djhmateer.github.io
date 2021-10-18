---
layout: post
# title: CSS and Design for Developers 
description: Email
menu: review
categories: Email 
published: false 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- ## Introduction. -->

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-10-07/http2b.png "http2"){:width="200px"}](/assets/2021-10-07/http2b.png) -->

I send user registration, password reset and job information from [https://osr4rightstools.org/](https://osr4rightstools.org/)

I've had many problems with emails going to spam folder, or being blocked by the ISP [email IP block with Postmark]()

Here are some simple rules to make it less likely, and for your email to appear legitimate

## Symptoms

[![alt text](/assets/2021-10-18/spam.jpg "less")](/assets/2021-10-18/spam.jpg)

Email is from me - dave@osr4rightstools.org. 
Email is routed through G Suite/Workspace SMTP from the website osr4rightstools.org 
Email is to: davemateer@gmail.com

I could report not spam this, but a first time user wouldn't know to do this. 


## Google Advice

[https://blogs-on-gmail.blogspot.com/2019/06/spamhandling.html](https://blogs-on-gmail.blogspot.com/2019/06/spamhandling.html)


[https://support.google.com/mail/answer/81126?hl=en](https://support.google.com/mail/answer/81126?hl=en) official guidance

[https://toolbox.googleapps.com/apps/checkmx/](https://toolbox.googleapps.com/apps/checkmx/) Handy MX checker

[![alt text](/assets/2021-10-18/checkmx.jpg "less")](/assets/2021-10-18/checkmx.jpg)


### Setup DKIM and DMARK

Domain Keys Identified Mail (DKIM)

[https://admin.google.com/AdminHome#AppDetails:service=email](https://admin.google.com/AdminHome#AppDetails:service=email) Setup here

Need to wait 24-72 hours after setting up a Gmail account before can do this.

### Delete unnecessary TXT records

Done this as was a warning.

### SPF Record

[https://support.google.com/a/answer/10684623](https://support.google.com/a/answer/10684623)

Added a TXT record

`v=spf1 include:_spf.google.com ~all`


## Safe Browsing

[https://transparencyreport.google.com/safe-browsing/](https://transparencyreport.google.com/safe-browsing/)

osr4rightstools.org - no available data

osr4rights.org - no unsafe content found (26th OCt 2020)


[https://search.google.com/search-console](https://search.google.com/search-console) - to verify it is a safe property.











[https://support.google.com/mail/answer/1366858?hl=en&expand=5](https://support.google.com/mail/answer/1366858?hl=en&expand=5)


If you see a question mark next to the sender's name, the message isn't authenticated.