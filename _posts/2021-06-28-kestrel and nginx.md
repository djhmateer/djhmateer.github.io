---
layout: post
title: Kestrel as internet facing edge web server
description: 
menu: review
categories: Kestrel 
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

[https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/when-to-use-a-reverse-proxy?view=aspnetcore-5.0](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/when-to-use-a-reverse-proxy?view=aspnetcore-5.0)

Let's setup Kestrel as an internet facing (edge) server

I've used nginx in the past as a reverse proxy, but we don't officially need it anymore. So lets keep it simple and just use Kestrel.

## Setting up Kestrel

Summary is:

```bash
# publish the web app
sudo dotnet publish /gitsource/src/OSR4Rights.Web --configuration Release --output /var/www

# do I need this?
# export ASPNETCORE_ENVIRONMENT=Production

# run app on port 5000
cd /var/www
/usr/bin/dotnet OSR4Rights.Web.dll --urls "http://*:5000"

# redirect 5000 to port 80 internally
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 5000


## simple way of getting kestrel to bind to port 80 for demo
## don't use this in prod
# except this wont pick up the ASPNETCORE_ENVIRONMENT setting above
# and need to run as root
sudo /usr/bin/dotnet OSR4Rights.Web.dll --urls "http://*:80"
```

I'm using iptables as can't bind to port 80 on a non sudo user:
[https://serverfault.com/questions/112795/how-to-run-a-server-on-port-80-as-a-normal-user-on-linux](https://serverfault.com/questions/112795/how-to-run-a-server-on-port-80-as-a-normal-user-on-linux)





## YARP - Yet another reverse proxy

[https://microsoft.github.io/reverse-proxy/articles/getting_started.html](https://microsoft.github.io/reverse-proxy/articles/getting_started.html)

## Timeout?

Trying to diagnose a 400 (Page isn't working) Error on a large upload. Initially thought it was a timeout, but it was around 1:15 it failed.


Sometimes got a 502 (Bad Gateway) too.
Here are some good guides:

[https://andrewlock.net/5-ways-to-set-the-urls-for-an-aspnetcore-app/](https://andrewlock.net/5-ways-to-set-the-urls-for-an-aspnetcore-app/)

[https://swimburger.net/blog/dotnet/how-to-run-aspnet-core-as-a-service-on-linux](https://swimburger.net/blog/dotnet/how-to-run-aspnet-core-as-a-service-on-linux)

