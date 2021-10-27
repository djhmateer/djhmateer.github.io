---
layout: post
title: Sending email via Google Workspace / Gmail with C#
description: Email
menu: review
categories: Email 
published: false 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- [![alt text](/assets/2021-10-15/postmark.jpg "postmark"){:width="200px"}](/assets/2021-10-07/http2b.png) -->
<!-- [![alt text](/assets/2021-10-15/postmark.jpg "postmark")](/assets/2021-10-15/postmark.jpg) -->

There are 3 ways to send emails from a webserver via [Google Workspace](https://en.wikipedia.org/wiki/Google_Workspace) (formerly G Suite) / free Gmail:

1. SMTP - Less Secure, Port 587, pass username and password directly
2. API using Service Account - 2 step OAuth2. (not for Gmail)
3. API using 3 step OAuth2

Options 2 and 3 are significantly more complicated than using a provider such as [Postmark]() which is a simple API key.

## Why send email through Workspace/Gmail

I've been having problems with emails being quarantined / rejected sending through Postmark to academic institutions, who I imagine have strict inbound email policies. 

So I'm trying Workspace (and will try Office365 next) to see if emails get through.

I'm not sending a lot of email either - mostly user login confirmations, password resets ie transactional email.

### TL;DR

Postmark was working just fine. It was the content of my email. Sending via Google Workspace didn't make a difference.

[How not to get caught in spam filters with a new domain](/2021/10/18/how-to-not-get-caught-in-spam-filters-with-a-new-domain) is where I discuss this problem.

For reference I've published this information below.

## 1. SMTP

The easiest, not recommended, and least secure method.

Google Workspace: 2,000 messages per day (500 for trial accounts). [more information](https://support.google.com/a/answer/166852#zippy=). Only after $100 spent etc will it go up to 2,000.

I've already signed up for Google Workspace for the domain osr4rightstools.org, and have a single email: dave@osr4rightstools.org. I'm using the cheaper `Google Workspace Business Starter` rather than the default `Google Workspace Business Standard`. £4.14 per month.

[https://admin.google.com/](https://admin.google.com/) Sign in with super administrator privileges for the domain eg osr4rightstools.org

[![alt text](/assets/2021-10-17/lesssecure.jpg "less")](/assets/2021-10-17/lesssecure.jpg)

Enable Less Secure setting for users.

[https://support.google.com/a/answer/6260879?hl=en-GB](https://support.google.com/a/answer/6260879?hl=en-GB) more information

[https://myaccount.google.com/security](https://myaccount.google.com/security) Login to myccount and turn on Less Secure:


[![alt text](/assets/2021-10-17/lesssecure2.jpg "less")](/assets/2021-10-17/lesssecure2.jpg)

Turn on less secure.

```cs
var m = new MimeMessage();
var fromAddress = "dave@osr4rightstools.org";
  m.From.Add(new MailboxAddress("Dave Mateer", fromAddress));
  //m.To.Add(new MailboxAddress("Dave (Gmail)", toEmailAddress));
  // todo a to name?
  m.To.Add(MailboxAddress.Parse(toEmailAddress));

  m.Subject = osrEmail.Subject;

  var bodyBuilder = new BodyBuilder
  {
      HtmlBody = htmlBody,
      TextBody = textBody
  };

  m.Body = bodyBuilder.ToMessageBody();
  try
  {
      using var c = new SmtpClient();
      await c.ConnectAsync("smtp.gmail.com", 587);
      // Note: since we don't have an OAuth2 token, disable
      // the XOAUTH2 authentication mechanism.
      c.AuthenticationMechanisms.Remove("XOAUTH2");

      await c.AuthenticateAsync("dave@osr4rightstools.org", gmailPassword);
      await c.SendAsync(m);
      await c.DisconnectAsync(true);

      return true;
  }
```

## 2 and 3 Create a project in Google Cloud

I never successfully got these approaches working, but they should.

My main issues were the complexity of getting OAuth2 working, and it didn't feel like the correct tool for sending transactional email.

2. API using Service Account - 2 step OAuth2. (not for Gmail)
3. API using 3 step OAuth2

[https://developers.google.com/gmail/api/quickstart/dotnet](https://developers.google.com/gmail/api/quickstart/dotnet) .NET Quickstart for the Gmail API which links to:

[https://developers.google.com/workspace/guides/create-project](https://developers.google.com/workspace/guides/create-project) create a new project in Google cloud platform:

[https://console.cloud.google.com/](https://console.cloud.google.com/)

[![alt text](/assets/2021-10-17/project.jpg "prpoject")](/assets/2021-10-17/project.jpg)

project name: osr-email


## Enable Google Workspace API

Select project, Enable Apis and Services
Select Gmail API, Enable

## Create Credentials

[https://developers.google.com/workspace/guides/create-credentials](https://developers.google.com/workspace/guides/create-credentials)


### OAuth Consent screen

"When you use OAuth 2.0 for authorization, your app requests authorizations for one or more scopes of access from a Google Account. Google displays a consent screen to the user including a summary of your project and its policies and the requested scopes of access."

The above doesn't really make sense for us, as hopefully we'll just do this once for the `dave@hmsoftware.co.uk` user we want to send email from, and then it should alwyas remain active.

Internal - as I'm only going to be sending email from my single internal email - in this case `dave@hmsoftware.co.uk`


[![alt text](/assets/2021-10-17/consent.jpg "consent")](/assets/2021-10-17/consent.jpg)

I'm using my domain here - but will use the osr domain soon.

Don't need to put anything in Scopes.


### Create OAuth clientID credential

Credentials, Create Credentials, OAuth client ID

[![alt text](/assets/2021-10-17/oauth.jpg "oauth")](/assets/2021-10-17/oauth.jpg)

Application Type: Web

Authorised redirect URIs: https://localhost:5001/signin-oidc

[![alt text](/assets/2021-10-17/json.jpg "json")](/assets/2021-10-17/json.jpg)

Download the file `client_secret_7065.json`


## Create a new .NET Web Project

[GmailAPITest]() here is the source code for my test project

It is a .NET5 Razor Pages project with no Authentication turned on.

[![alt text](/assets/2021-10-17/json.jpg "json")](/assets/2021-10-17/json.jpg)

Solution running in Kestrel - select the GmailAPITest drop down (which may be IISExpress) to force Kestrel which gives nices debug informaiton which we'll use. You can see in `launchSettings.json` the default port of 5001 which we used above as the redirect.

Now lets import the NuGet packages

`Google.Apis.Gmail.v1` - v1.55.0.2356, 3.1M downloads, upadated 8th Sept 2021

[https://github.com/googleapis/google-api-dotnet-client](https://github.com/googleapis/google-api-dotnet-client) - this is the older Google API Dotnet Client library, not the newer idiomatic [https://github.com/googleapis/google-cloud-dotnet](https://github.com/googleapis/google-cloud-dotnet) Cloud Client libraries for DotNet which don't seem to include a Gmail API yet.

`Google.Apis.Auth.AspNetCore3` v1.55.0, 143K downloads, updated 8th Sept 2021 

There is a [https://github.com/googleapis/google-api-dotnet-client/tree/main/Src/Support/Google.Apis.Auth.AspNetCore3.IntegrationTests](https://github.com/googleapis/google-api-dotnet-client/tree/main/Src/Support/Google.Apis.Auth.AspNetCore3.IntegrationTests) sample which uses Google Drive and Calendar APIs. But this includes code that walks us through the auth process.

## Conclusion

An interesting foray into the Google Workspaces, which I ultimately didn't need.

I hope this may be of help to you.

Or my future self!
