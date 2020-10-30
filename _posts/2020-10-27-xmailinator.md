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

Why not unit test emails so they all go to Mailinator?

I can use the live sendgrid outbound email.

should I use Smtp4Dev as a dev interceptor?


## Real Email

- SendGrid (owned by Twilio) - free for 100 per day (I seem to have 12,000 per month on a legacy plan perhaps). I use this on [hoverflylagoons.co.uk](https://hoverflylagoons.co.uk) This is the recommended option from Azure. They have 25k per month https://stackoverflow.com/questions/17666161/sending-email-from-azure.

- Mailgun
- Mailchimp
- Mailget - 200 free per day

- Gmail SMTP - free 100 outgoing per day
- Amazon SES (Simple Email Service) - 2000 per day if app is hosted in EC2

- [nammshi/smtp Docker Image](https://hub.docker.com/r/namshi/smtp/) with 10m pulls - do I really want to manage a mail server? Or use gmail to forward on?


## Tools

https://www.mail-tester.com/faq

# SendGrid

Need to use API keys now
They have 2FA which will soon be required using Twilio's Authy app.

If you're an Azure customer can [unlock more by following these instructions](https://docs.microsoft.com/en-us/azure/sendgrid-dotnet-how-to-send-email). 25,000 per month. You can only send 100 per day until your account is verfied

Looke like there is a [SendGrid nuget package](https://www.nuget.org/packages/Sendgrid)

Created a sender from davemateer@gmail.com which isn't recommended:

[DMARC](https://sendgrid.com/docs/ui/sending-email/dmarc/)

[Create an API Key in SendGrid](https://app.sendgrid.com/settings/api_keys)


It's interesting that emails take a while (5minutes) to show up in the sendgrid UI, but they can be delivered quickly. Looks like a few seconds to get to mailinator. Impressive. Time will tell if it works well in production.

Simplest possible test code:

```cs
 var apiKey = "longkeyhere";
 var client = new SendGridClient(apiKey);
 var time = System.DateTime.Now.ToString("HH:mm:ss");
 var msg = new SendGridMessage
 {
     From = new EmailAddress("test@example.com", "DX Team"),
     Subject = $"PasswordPostgres time sent is {time}",
     PlainTextContent = "Hello, Email!",
     HtmlContent = "<strong>Hello, Email!</strong>"
 };
 msg.AddTo(new EmailAddress("davemateer@mailinator.com"));
 var response = await client.SendEmailAsync(msg);
```

How to store the SENDGRID_API_KEY ?

## Storing the API key where?

Jinja templating in cloud-init
https://cloudinit.readthedocs.io/en/latest/topics/instancedata.html#instance-metadata

To make sure the codebase remains public, I'll use my secrets folder:

![alt text](/assets/2020-10-27/secrets.jpg "secrets folder")

This isn't checked into source control.






