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

I'm a fan of Infrastructure as Code (IaC) so I can script out building up my infrstructure using:

- Azure CLI from Bash on WSL (Windows Subsystem for Linux) to build a VM and networking
- Cloud-init to run scripts on the newly created VM
- Nginx reverse proxying to Kestrel
- Systemd to monitor kestrel

This allows us to be able to spin up a new environment with the latest OS patches on it within 5 minutes.  

## Azure CLI

```bash

```

```bash
# This is a framework dependent deployment
# could use self-contained deployment if prefer to to maintain the .NET runtimer on server
dotnet publish --configuration Release
```

## Systemd - Create a Service

Systemd is an init system to provides many features for starting, stopping and managing processes

## Kestrel on the edge or Nginx

~~I'm using Kestrel on the edge as have only 1 website on the server~~ I found that I was getting permission errors binding to port 80 spinning up Kestrel from systemd (used to monitor the service). The work arounds [here on Server Fault](https://serverfault.com/questions/268099/bind-to-ports-less-than-1024-without-root-access) didn't work for me first time, and felt at the edge of my Linux knowledge.

There are good docs here [Hosting and Deploying on Linux with Nginx](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-3.0) so I recommend that.

## cloud-init

/var/log/output.log



![alt text](/assets/2019-11-13/2.jpg "A nicer log")
