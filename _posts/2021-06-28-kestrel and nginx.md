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

## simple way of getting kestrel to bind to port 80 for demo
## don't use * in prod, don't use this is prod ie running web process as root
#sudo dotnet OSR4Rights.Web.dll --urls "http://*:80"

# run app on port 5000
cd /var/www
/usr/bin/dotnet OSR4Rights.Web.dll --urls "http://*:5000"

# redirect 5000 to port 80 internally
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 5000

# I use systemd for keepalive and autorestart
/usr/bin/dotnet OSR4Rights.Web.dll --urls "http://*:5000"

# make the systemd service to keep Kestrel alive
sudo cp /gitsource/infra/kestrel-osr.service /etc/systemd/system/kestrel-osr.service

# auto start on machine reboot
sudo systemctl enable kestrel-osr.service

#  start the Kestrel web app using systemd using kestrel-blc.service text files
sudo systemctl start kestrel-osr.service

```

I'm using iptables as can't bind to port 80 on a non sudo user:
[https://serverfault.com/questions/112795/how-to-run-a-server-on-port-80-as-a-normal-user-on-linux](https://serverfault.com/questions/112795/how-to-run-a-server-on-port-80-as-a-normal-user-on-linux)

Big problems on restart of the server, have to rerun the iptables command. Also issues when doing an apt upgrade - I found that it caused issues where I couldn't get port 80 bound.


## Systemd


```bash
# kestrel-osr.service (should go in /etc/systemd/system/kestrel-osr-service)
[Unit]
Description=Website running on ASP.NET 5 

[Service]
WorkingDirectory=/var/www
ExecStart=/usr/bin/dotnet OSR4Rights.Web.dll --urls "http://*:5000"

Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10

# copied from dotnet documentation at
# https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-3.1#code-try-7
KillSignal=SIGINT
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

# the name in sudo systemctl status will be kestrel-osr.service

SyslogIdentifier=dotnet-OSR4Rights.Web
User=www-data

[Install]
WantedBy=multi-user.target
```

## YARP - Yet another reverse proxy

[https://microsoft.github.io/reverse-proxy/articles/getting_started.html](https://microsoft.github.io/reverse-proxy/articles/getting_started.html)

