---
layout: post
title: Serilog with SignalR 
description: 
menu: review
categories: Serilog SignalR
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

I used these articles to help me setup Serilog in my application as I wanted

- Console logging
- and File logging (rolling)
- On dev and live (Ubuntu Linux)

[Serilog in ASP.NET Core 3](https://nblumhardt.com/2019/10/serilog-in-aspnetcore-3/)

[Logging and Diagnostics in SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/diagnostics?view=aspnetcore-3.0)

## How to Setup

Add NuGet package Serilog.AspNetCore

```cs

```

## Log Levels

- Verbose
- Debug - internal system events
- Information - describe what is happening in the system
- Warning - when service is degraded
- Error - functionality is unavailable
- Fatal - top level critical

If not MinimumLevel is specificed, then Information level and higher will be processed.

## Development workflow

It is nice to see colour in the output:

![alt text](/assets/2019-11-13/1.jpg "Console logging"){:width="600px"}


[Hanselman post on developing locally with ASP.NET Core under HTTPS](https://www.hanselman.com/blog/DevelopingLocallyWithASPNETCoreUnderHTTPSSSLAndSelfSignedCerts.aspx) 

```bash
# install local https cert
dotnet dev-certs https --trust

dotnet run
```
