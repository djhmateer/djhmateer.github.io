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

## GMail caught in Spam

[![alt text](/assets/2021-10-18/spam.jpg "less")](/assets/2021-10-18/spam.jpg)

Email is from me - dave@osr4rightstools.org. 

Email is routed through Google Workspace SMTP from the website osr4rightstools.org 

Email is to: davemateer@gmail.com

I could report not spam this, but a first time user wouldn't know to do this. 

## GMail not Spam

[![alt text](/assets/2021-10-18/notspam.jpg "less")](/assets/2021-10-18/notspam.jpg)

This was promising as wans't caught in spam filter, however it did in Outlook below

## Outlook caught in Junk

[![alt text](/assets/2021-10-18/outlookjunk.jpg "less")](/assets/2021-10-18/outlookjunk.jpg)

Outlook putting into junk folder


## Google Advice

[https://support.google.com/mail/answer/81126?hl=en](https://support.google.com/mail/answer/81126?hl=en) official guidance and a good checklist


[https://toolbox.googleapps.com/apps/checkmx/](https://toolbox.googleapps.com/apps/checkmx/) Handy MX checker

[![alt text](/assets/2021-10-18/checkmx.jpg "less")](/assets/2021-10-18/checkmx.jpg)

[https://blogs-on-gmail.blogspot.com/2019/06/spamhandling.html](https://blogs-on-gmail.blogspot.com/2019/06/spamhandling.html)

## Delete unnecessary TXT records

Done this as was a warning.

## SPF Record

[https://support.google.com/a/answer/10684623](https://support.google.com/a/answer/10684623)

Added a TXT record

`v=spf1 include:_spf.google.com ~all`

## Setup DKIM 

Domain Keys Identified Mail (DKIM)

Need to wait 24-72 hours after setting up a Gmail account before can do this.

[https://support.google.com/a/topic/2752442?hl=en&ref_topic=9061731](https://support.google.com/a/topic/2752442?hl=en&ref_topic=9061731) instructions here

[https://admin.google.com/AdminHome#AppDetails:service=email](https://admin.google.com/AdminHome#AppDetails:service=email) Setup here

[![alt text](/assets/2021-10-18/dkim.jpg "less")](/assets/2021-10-18/dkim.jpg)

## DMARC

[https://support.google.com/a/answer/2466580?hl=en&ref_topic=2759254](https://support.google.com/a/answer/2466580?hl=en&ref_topic=2759254)

Domain-based Mesage Authentication, Reporting, and Conformance (DMARC) is a standard email authentication method.

DMARC is always used with DKIM and SPF

## Reverse DNS record

Verify the sending server PTR record.

[https://intodns.com/](https://intodns.com/) - from here it looks like we don't need a reverse DNS for the webserver. It is purely for the SMTP server which is hosted by google. 



## Message-ID header

We do have a message-id when sending through Workspace

## Postmaster Tools

[https://postmaster.google.com/](https://postmaster.google.com/) - see what the outbound spam rate. This will be interesting in the future seeing what emails are having problems being sent from osr4rightstools.org



## Who gets it right?

A stragtegy could be to take sign up emails or password emails that get through all spam filtes and copy them. To see how they perform.

[mxtoolbox.com](https://mxtoolbox.com) - they have an unsubscribe link (header)

[![alt text](/assets/2021-10-18/mxtoolbox.jpg "less")](/assets/2021-10-18/mxtoolbox.jpg)


## Safe Browsing

[https://transparencyreport.google.com/safe-browsing/](https://transparencyreport.google.com/safe-browsing/)

osr4rightstools.org - no available data

osr4rights.org - no unsafe content found (26th OCt 2020)


[https://search.google.com/search-console](https://search.google.com/search-console) - to verify it is a safe property.











[https://support.google.com/mail/answer/1366858?hl=en&expand=5](https://support.google.com/mail/answer/1366858?hl=en&expand=5)


If you see a question mark next to the sender's name, the message isn't authenticated.

<!-- 
"Services in Azure use IP addresses assigned by Azure and owned by Microsoft. These reverse DNS records (PTR records) must be created in the corresponding Microsoft-owned reverse DNS lookup zones"

[https://docs.microsoft.com/en-us/azure/dns/dns-reverse-dns-for-azure-services](https://docs.microsoft.com/en-us/azure/dns/dns-reverse-dns-for-azure-services) configuring in Azure

```bash
# public IP and associate with the given DNS name
# Basic or Standard for the ip-sku
# Reverse DNS to help with emails
# https://docs.microsoft.com/en-us/azure/dns/dns-reverse-dns-for-azure-services
az network public-ip create \
    --resource-group ${rg} \
    --name ${publicIPName} \
    --sku Standard \
    --zone 1 \
    --dns-name ${dnsname} \
    --reverse-fqdn ${dnsname}.westeurope.cloudapp.azure.com
```

[https://www.debouncer.com/reverse-dns-check](https://www.debouncer.com/reverse-dns-check) is a good place to check.

"Computer networks use the DNS to determine the IP address associated with a domain name. This process is also known as forward DNS resolution. Reverse DNS lookup is the inverse process of this, the resolution of an IP address to its designated domain name.

While receiving an email message, a mail server may try to attempt reverse IP lookup. If PTR record lookup fails (no PTR record) or PTR record is not forward confirmed or looks like generic, the message may be marked as spam or rejected."

[https://hackertarget.com/reverse-dns-lookup/](https://hackertarget.com/reverse-dns-lookup/) another checker -->
