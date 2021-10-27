---
layout: post
title: Barracuda Email Block 
description: Problems with transaction email being blocked by Barracuda 
menu: review
categories: Email 
published: false 
comments: false     
sitemap: false
image: /assets/2021-10-15/postmark.jpg
---
<!-- ## Introduction. -->

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-10-07/http2b.png "http2"){:width="200px"}](/assets/2021-10-07/http2b.png) -->

<!-- [![alt text](/assets/2021-10-15/postmark.jpg "postmark"){:width="200px"}](/assets/2021-10-07/http2b.png) -->
[![alt text](/assets/2021-10-15/postmark.jpg "postmark")](/assets/2021-10-15/postmark.jpg)

This is something you never want to see - your email being blocked! 

This is some aggressive filtering.

I've found I can send an HTML email fine to that same address with no link in it through Gmail GUI. 

Here is the offending problematic email (with a different To address)

[![alt text](/assets/2021-10-15/email.jpg "email")](/assets/2021-10-15/email.jpg)


[https://postmarkapp.com/support/article/815-what-are-bounces-and-spam-complaints](https://postmarkapp.com/support/article/815-what-are-bounces-and-spam-complaints) 


[https://postmarkapp.com/support/article/1158-how-to-fix-isp-blocks](https://postmarkapp.com/support/article/1158-how-to-fix-isp-blocks) 

So from reading the above it looks as if the message was rejected probably due to a local policy.

Interestingly Gmail wasn't blocked with the same email.


## Email Scanning / Barracuda

Looking at my logs I discovered some unknown IP's hitting the server directly after the email was sent. They came from [https://www.barracuda.com/](https://www.barracuda.com/).

I assume that `essex.ac.uk` use this service. [https://www.essex.ac.uk/staff/it-services/email-quarantine](https://www.essex.ac.uk/staff/it-services/email-quarantine) yes they do. It hits Barracuda first. It wont notify the user unless they have setup a rule (and logged in to barracuda).

[https://www.barracudacentral.org/lookups/lookup-reputation](https://www.barracudacentral.org/lookups/lookup-reputation) tool to check reputation, and to help classify.


```bash
18.133.136.156 - - [15/Oct/2021:12:36:00 +0000] "GET /account/email-address-confirmation/fd788c4e-ccf4-4db3-b066-6354c9aff602 HTTP/1.0" 
200 3318 "-" "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; 
.NET CLR 3.0.30729)"
```

[https://ipinfo.io/](https://ipinfo.io/) - the tool I used to get information on an IP

I used to have a one click email confirmation GET link like: 

```http://osr4rightstools.org/account/email-address-confirmation/a9493b9b-5eb2-4043-a6c7-bf921df6c4f7```

which was doing a 302 direct to https (the link has since been fixed)

I can only assume that this triggered a rule, and didn't allow the email to be delivered.

Well even after fixing the 302 redirect it still doesn't work

[https://wordtothewise.com/2013/07/barracuda-filters-clicking-all-links/](https://wordtothewise.com/2013/07/barracuda-filters-clicking-all-links/) article talks about this, with the simple workaround of having to put a button on the form, as having an action on a GET request is not normal. As causes problems as I've just found here.

[![alt text](/assets/2021-10-15/confirmation.jpg "email")](/assets/2021-10-15/confirmation.jpg)

Have a button so the action happens on a POST.


## Try Gmail / Workspace (G Suite) 

I tried copying the email and sending from my work Gmail GUI which didn't bounce.

[![alt text](/assets/2021-10-15/gmail-block.jpg "email")](/assets/2021-10-15/gmail-block.jpg)

This is an example of failed email bounce/block in the Gmail GUI.


So perhaps Barracuda uses the reputation of the SMTP provider to allow emails to get through.

### Setting up Gmail with C# Web App

So this is tricky. Google have turned off 'Allow less secure apps' which would allow a simple username and password (for your gmail account!) to be used to send email. We must now using OAuth2, which is a good thing!



[https://www.emailarchitect.net/easendmail/ex/c/20.aspx](https://www.emailarchitect.net/easendmail/ex/c/20.aspx)

[https://console.developers.google.com/](https://console.developers.google.com/)

- Create project
- OAuth Consent screen
- Create credentials (OAuth client id) - web application, redirect uri: https://localhost:5001/foo

So I now have a ClientID and ClientSecret

- Enable Gmail API
- Edit scopes

But I need to workflow on my webapp ie the redirect uri

`Google.Apis.Auth.AspNetCore3` is a helper

The ASP.NET Core 3 Auth extension library contains a Google-specific OpenIdConnect auth handler.
Supports incremental auth, and an injectable IGoogleAuthProvider to supply Google credentials.

It uses MS OpenID Connect.

[https://developers.google.com/api-client-library/dotnet/guide/aaa_oauth#configure-your-application-to-use-google.apis.auth.aspnetcore3](https://developers.google.com/api-client-library/dotnet/guide/aaa_oauth#configure-your-application-to-use-google.apis.auth.aspnetcore3) following these instructions

Here is a sample application:
[https://github.com/googleapis/google-api-dotnet-client/tree/main/Src/Support/Google.Apis.Auth.AspNetCore3.IntegrationTests](https://github.com/googleapis/google-api-dotnet-client/tree/main/Src/Support/Google.Apis.Auth.AspNetCore3.IntegrationTests)



**HERE**
[https://developers.google.com/api-client-library/dotnet/guide/aaa_oauth#web-applications-asp.net-core-3](https://developers.google.com/api-client-library/dotnet/guide/aaa_oauth#web-applications-asp.net-core-3)

`Google.Apis.Auth.AspNetCore3`

did the google for Web Server Application, to get initial clientid and clientsecret

redirect URI is: https://localhost:5001/signin-oidc

signin-oicdc is important (it is hardcoded in the libraray and not one of my pages)

new Razor Pages project


`Google.Apis.Gmail.v1`


GoogleApiException: Google.Apis.Requests.RequestError
Request had insufficient authentication scopes. [403]
Errors [
Message[Insufficient Permission] Location[ - ] Reason[insufficientPermissions] Domain[global]
]

looking for labels

add scopes in OAuthConsent screen

okay I can see scopes of

email, profile, openid.. but no label

ah, I bet I have to refresh the token.

to check the access token:


[https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=](https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=)


So the access_token expires in 3600s which is 1 hour





[https://blog.elmah.io/how-to-send-emails-from-csharp-net-the-definitive-tutorial/](https://blog.elmah.io/how-to-send-emails-from-csharp-net-the-definitive-tutorial/)


[https://developers.google.com/gmail/api/quickstart/dotnet](https://developers.google.com/gmail/api/quickstart/dotnet)

Create a Project and enable the API

Got a `client_secret_XXXXXXXXX-xxxxxxxxxxxxxx.apps.googleusercontent.com.json` file

Downloaded quickstart app from [https://github.com/googleworkspace/dotnet-samples/blob/master/gmail/GmailQuickstart/GmailQuickstart.cs](https://github.com/googleworkspace/dotnet-samples/blob/master/gmail/GmailQuickstart/GmailQuickstart.cs)

Patched that into the app as `credentials.json` which allowed me to go through OAuth2 flow and get back

`Google.Apis.Auth.OAuth2.Responses.TokenResponse-user` - a file.

However this token will expire

I seem to need a 

ClientID
ClientSecret


