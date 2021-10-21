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

I've had problems with emails going to the spam folder, or being blocked by the ISP [email IP block with Postmark]()

## GMail caught in Spam

Here was my initial email try which was caught in spam:

[![alt text](/assets/2021-10-18/spam.jpg "less")](/assets/2021-10-18/spam.jpg)

Email is from me - dave@osr4rightstools.org. 

Email is routed through Google Workspace SMTP from the website osr4rightstools.org 

Email is to: davemateer@gmail.com

I could report not spam this, but a first time user wouldn't know to do this. 

## GMail not Spam

[![alt text](/assets/2021-10-18/notspam.jpg "less")](/assets/2021-10-18/notspam.jpg)

This was promising as wasn't caught in spam filter. However had no link in it.

[![alt text](/assets/2021-10-18/signed.jpg "less")](/assets/2021-10-18/signed.jpg)

Notice it was signed by Google so DKIM / DMARC not setup yet for the osr4rights.org domain

[![alt text](/assets/2021-10-18/signed2.jpg "less")](/assets/2021-10-18/signed2.jpg)

A day later when DKIM / DMARC had been setup.


## Outlook caught in Junk

[![alt text](/assets/2021-10-18/outlookjunk.jpg "less")](/assets/2021-10-18/outlookjunk.jpg)

Outlook putting into junk folder

Event with DKIM / DMARC on, it is still going to junk, and we can see the message headers:

[![alt text](/assets/2021-10-18/source.jpg "less")](/assets/2021-10-18/source.jpg)

We can analyse the headers via [https://toolbox.googleapps.com/apps/messageheader/analyzeheader](https://toolbox.googleapps.com/apps/messageheader/analyzeheader)


[![alt text](/assets/2021-10-18/analyze.jpg "less")](/assets/2021-10-18/analyze.jpg)

Which doesn't give us any clues.

[https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/anti-spam-message-headers?view=o365-worldwide](https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/anti-spam-message-headers?view=o365-worldwide)

[https://mha.azurewebsites.net/](https://mha.azurewebsites.net/) Microsoft header analyser.

Thankfuly sending from the Gmail GUI to penhemingway@outlook.com gets put into the junk too 

[![alt text](/assets/2021-10-18/test11.jpg "less")](/assets/2021-10-18/test11.jpg)

After setting up DKIM and DMARC this email got through to outlook.

Interestingly the same email did not get through to an email on sussex.ac.uk (who use Office365)

I now suspect it is down to the message content.

## Google Advice

[https://support.google.com/mail/answer/81126?hl=en](https://support.google.com/mail/answer/81126?hl=en) official guidance and a good checklist

[https://toolbox.googleapps.com/apps/checkmx/](https://toolbox.googleapps.com/apps/checkmx/) Handy MX checker

[![alt text](/assets/2021-10-18/checkmx.jpg "less")](/assets/2021-10-18/checkmx.jpg)

[https://blogs-on-gmail.blogspot.com/2019/06/spamhandling.html](https://blogs-on-gmail.blogspot.com/2019/06/spamhandling.html)

## Content of the message

I've setup the server side ie 
- SPF record
- DKIM signing
- DMARC record set to quarantine and reports coming directly to dave@
- Mail delivery by Google Workspace so should be trusted

So now we need to look at content

- Don't mix different types of content eg don't include content about promotions in purchase receipt messages
- Make it not spammy and good content
- Look good?

Well my first email to a new user is their confirmation of email address.

Rather than getting into the complexity of HTML email, I'd like to test with a plain text (it is html) email like this to get the content correct.

[![alt text](/assets/2021-10-18/textemail.jpg "less")](/assets/2021-10-18/textemail.jpg)

- This got to davemateer@gmail.com
- Was reported junk to penhemingway@outlook.com
- Was reported junk to xxx@sussex.ac.uk


### HTML Content

[https://github.com/leemunroe/responsive-html-email-template](https://github.com/leemunroe/responsive-html-email-template) I've used this template in the past.


## Server Side

[https://toolbox.googleapps.com/apps/checkmx/](https://toolbox.googleapps.com/apps/checkmx/) Handy MX checker

[https://mxtoolbox.com/](https://mxtoolbox.com/) - checks the dmarc policy
sr4rights

[https://hunter.io/email-verifier](https://hunter.io/email-verifier) - checks to see if an email address is valid. From this I'm turning off my catch all.

## SPF Record

[https://support.google.com/a/answer/10684623](https://support.google.com/a/answer/10684623)

Added a TXT record

`v=spf1 include:_spf.google.com ~all`

## Setup DKIM 

Domain Keys Identified Mail (DKIM) is to help prevent spoofing on outgoing messages.

Need to wait 24-72 hours after setting up a Gmail account before can do this.

[https://support.google.com/a/topic/2752442?hl=en&ref_topic=9061731](https://support.google.com/a/topic/2752442?hl=en&ref_topic=9061731) instructions here

[https://admin.google.com/AdminHome#AppDetails:service=email](https://admin.google.com/AdminHome#AppDetails:service=email) Setup here

[![alt text](/assets/2021-10-18/dkim.jpg "less")](/assets/2021-10-18/dkim.jpg)

Essentially it is adding a TXT record to DNS.

## DMARC

[https://support.google.com/a/answer/2466580?hl=en&ref_topic=2759254](https://support.google.com/a/answer/2466580?hl=en&ref_topic=2759254) about DMARC.

Domain-based Mesage Authentication, Reporting, and Conformance (DMARC) is a standard email authentication method.

DMARC is always used with DKIM and SPF

[https://support.google.com/a/answer/10032674](https://support.google.com/a/answer/10032674) before you set up DMARC

[https://toolbox.googleapps.com/apps/main/](https://toolbox.googleapps.com/apps/main/) google admin toolbox

### 1. Start with a Relaxed DMARC Policy

Add a TXT record `_dmarc.osr4rightstools.org` with the policy:

`v=DMARC1; p=none; rua=mailto:dmarc-reports@osr4rightstools.org`

I need a catchall email 

Every mail server that gets mail from your domain sends daily reports to dmarc-reports@osr4rightstools.org

### 2. Quarantine messages

[https://mxtoolbox.com/](https://mxtoolbox.com/) - checks the dmarc policy. From here I got:

"This Warning indicates that the DMARC record for this domain is not currently protected against phishing and spoofing threats. To resolve this Warning you will need to set a Quarantine or Reject policy on the domain's DMARC record. Setting a Quarantine or Reject value will prevent fraudsters from spoofing the domain as mail servers will Quarantine or Reject messages that fail authentication tests.

*Note: It is advised to not set a Quarantine or Reject policy until you have evaluated your DMARC reports to make sure you don't have any legitimate senders that have email delivery problems."

So I'm not worried about this as have no legitimate senders from osr4rightstools.org apart from myself.

`v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@osr4rightstools.org`

### 3. Reject all unauthenticated messages

`v=DMARC1; p=reject; rua=mailto:dmarc-reports@osr4rightstools.org`

I've changed my record to mail reports to dave@osr4rightstools.org so I don't have a catch-all email, nor do I need another user dmarc-reports@ setup on Google Workspace.




### Setting up a Catch-all 

I've decided not to setup a catch-all currently to follow best practise. 

[https://support.google.com/a/answer/6297084#delivery&zippy=%2Cstep-create-or-edit-the-name-of-the-route%2Cstep-specify-what-happens-to-the-messages](https://support.google.com/a/answer/6297084#delivery&zippy=%2Cstep-create-or-edit-the-name-of-the-route%2Cstep-specify-what-happens-to-the-messages)

[![alt text](/assets/2021-10-18/catchall.jpg "less")](/assets/2021-10-18/catchall.jpg)

[https://admin.google.com/ac/apps/gmail/routing](https://admin.google.com/ac/apps/gmail/routing) go to admin.google.com, apps, gmail, routing (not default routing)





## Postmaster Tools

[https://postmaster.google.com/](https://postmaster.google.com/) - see what the outbound spam rate. This will be interesting in the future seeing what emails are having problems being sent from osr4rightstools.org

[https://stackoverflow.com/questions/63222298/google-postmaster-tools-no-data-to-display-message](https://stackoverflow.com/questions/63222298/google-postmaster-tools-no-data-to-display-message) however the tools are not well thought of.


## Who gets it right?

A stragtegy could be to take sign up emails or password emails that get through all spam filtes and copy them. To see how they perform.

[mxtoolbox.com](https://mxtoolbox.com) - they have an unsubscribe link (header)

[![alt text](/assets/2021-10-18/mxtoolbox.jpg "less")](/assets/2021-10-18/mxtoolbox.jpg)


## Safe Browsing

[https://transparencyreport.google.com/safe-browsing/](https://transparencyreport.google.com/safe-browsing/)

osr4rightstools.org - no available data

osr4rights.org - no unsafe content found (26th OCt 2020)


[https://search.google.com/search-console](https://search.google.com/search-console) - to verify it is a safe property.







## Delete unnecessary TXT records

Done this as was a warning.

## Reverse DNS record

Verify the sending server PTR record.

[https://intodns.com/](https://intodns.com/) - from here it looks like we don't need a reverse DNS for the webserver. It is purely for the SMTP server which is hosted by google. 

## Message-ID header

We do have a message-id when sending through Workspace






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
