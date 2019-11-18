---
layout: post
title: Publishing an ASP.NET Core 3 Application to Ubuntu 
description: 
menu: review
categories: Linux 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

[Hosting and Deploying on Linux MS Docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-3.0)

```bash
# This is a framework dependent deployment
# could use self-contained deployment if prefer to to maintain the .NET runtimer on server
dotnet publish --configuration Release
```

I'm using Kestrel on the edge as have only 1 website on the server

## Systemd - Create a Service

Systemd is an init system to provides many features for starting, stopping and managing processes

## cloud-init

/var/log/output.log



![alt text](/assets/2019-11-13/2.jpg "A nicer log")
