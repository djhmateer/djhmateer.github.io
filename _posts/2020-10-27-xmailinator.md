---
layout: post
title: Mailinator 
description: 
menu: review
categories: Mailinator 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

[Mailinator](https://www.mailinator.com/) can it help in testing web apps that need to deliver email?

## What is Mailinator

It is a public inbox, so I can send an email eg `davemateer@mailinator.com` and it will get there. You just put in a filter in their website to see your email

![alt text](/assets/2020-10-27/davemateer.jpg "first email message")

Here is my first email sent from davemateer@gmail.com (using the gmail website) to davemateer@mailinator.com:

It lasts for serveral hours before being deleted

## What is it good for?

Testing that your emails are really being delivered!


should I use Smtp4Dev as a dev interceptor?


## Real Email

- [nammshi/smtp Docker Image](https://hub.docker.com/r/namshi/smtp/) with 10m pulls - do I really want to manage a mail server? Or use gmail to forward on?
- Sendgrid - free for 100 per day. This is the recommended option from Azure. They have 25k per month https://stackoverflow.com/questions/17666161/sending-email-from-azure

- Mailgun
- Mailchimp
- Mailget - 200 free per day

- Gmail SMTP - free 100 outgoing per day
- Amazon SES (Simple Email Service) - 2000 per day if app is hosted in EC2


## Tools

https://www.mail-tester.com/faq
