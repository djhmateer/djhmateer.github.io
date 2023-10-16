---
layout: post
title: Certbot on Nginx with Reverse Proxy
description: 
#menu: review
categories: certbot
published: true 
comments: false     
sitemap: true
image: /assets/2023-10-12/3.jpg
---

<!-- [![alt text](/assets/2023-07-22/1.jpg "email"){:width="800px"}](/assets/2023-07-22/1.jpg) -->
<!-- [![alt text](/assets/2023-08-01/1.jpg "email")](/assets/2023-08-01/1.jpg) -->

<!-- [![alt text](/assets/2023-08-23/3.jpg "email")](/assets/2023-08-23/3.jpg) -->
<!-- ![alt text](/assets/2023-10-05/2.jpg "email")](/assets/2023-10-05/2.jpg) -->

I use [Let's Encrypt](https://letsencrypt.org/) for SSL certs for all my sites. I've been manually copying them in, getting them issued from [DNSimple](https://dnsimple.com/) who I use for DNS. 

But I need to do this every 3 months, so lets automate it 

## ChatGPT-4

`on nginx webserver how can I get an automated bash script running to check SSL certificate using Lets Encrypt`

So it recommended using [https://certbot.eff.org/](https://certbot.eff.org/)

## Reverse Proxy

```bash
sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo certbot --nginx
# log saved to
# /var/log/letsencrypt/letsencrypt.log

# wow it seems to have worked
Which names would you like to activate HTTPS for?
We recommend selecting either all domains, or all domains in a VirtualHost/server block.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: hoverflylagoons.co.uk
2: hmsoftware.org
3: osr4rightstools.org
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel): 2
Requesting a certificate for hmsoftware.org

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/hmsoftware.org/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/hmsoftware.org/privkey.pem
This certificate expires on 2024-01-10.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for hmsoftware.org to /etc/nginx/sites-enabled/default
Congratulations! You have successfully enabled HTTPS on https://hmsoftware.org
```

But I'm running a reverse proxy, so need to run certbot on that proxy (not the actual server where the files are). I'm forwarding to http on the webserver.

```bash
# nginx conf file
/etc/nginx/sites-available/default

# test the config file
# pay attention to any warnings here around ssl - see below!
sudo nginx -t

# restart
sudo systemctl restart nginx
```

## Error

[![alt text](/assets/2023-10-12/2.jpg "email")](/assets/2023-10-12/2.jpg)

Open developer tools F12, right click on reload to do a handy Empty Cache and Hard Reload.

Chrome is giving:

> ERR_SSL_PROTOCOL_ERROR
> This site can’t provide a secure connectionhmsoftware.org sent an invalid response.

Error in `/var/log/nginx/error.log`

> 2023/10/12 19:21:12 [crit] 1413#1413: *56 SSL_do_handshake() failed (SSL: error:142090BA:SSL routines:tls_early_post_process_client_hello:bad cipher) while SSL handshaking, client: 37.152.225.211, server: 0.0.0.0:443

## Timezone Issue

I found my server wasn't in the correct timezone, so was 1 hour out.

```bash
# was showing UTC
date

# showed my timezone at UTC
timedatectl

# okay now have correct timezone
sudo timedatectl set-timezone Europe/London
```

This wasn't the only problem (if that did matter)

## Cert Checker is Fine!

[![alt text](/assets/2023-10-12/1.jpg "email")](/assets/2023-10-12/1.jpg)

This looks good, but my browser doesn't load.


## Nginx Config

I found that it worked if I commented out the `options-ssl-nginx.conf` file.
```bash
# reverse proxy for hmsoftware.org/api/aa
server {
    #listen 80;
    server_name hmsoftware.org;
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/hmsoftware.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/hmsoftware.org/privkey.pem; # managed by Certbot
    #include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
```

A clue.. lets try and fix this because we do want these settings

[![alt text](/assets/2023-10-12/3.jpg "email")](/assets/2023-10-12/3.jpg)

## Options-ssl-nginx.conf

`/etc/letsencrypt/options-ssl-nginx.conf`

```
# This file contains important security parameters. If you modify this file
# manually, Certbot will be unable to automatically provide future security
# updates. Instead, Certbot will print and log an error message with a path to
# the up-to-date file that you will need to refer to when manually updating
# this file. Contents are based on https://ssl-config.mozilla.org

ssl_session_cache shared:le_nginx_SSL:10m;
ssl_session_timeout 1440m;
ssl_session_tickets off;

ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;

ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
```

So my conf file was okay.

[https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf](https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf)


## Another Error and Solution

> SSL_do_handshake() failed (SSL: error:142090BA:SSL routines:tls_early_post_process_client_hello:bad cipher) while SSL handshaking,

It turns out the problem was with another certificate in my nginx conf file - the self signed cert. After recreating it everything worked.

[https://serverfault.com/a/846214](https://serverfault.com/a/846214) instruction on how to create a self signed cert.

```bash
sudo nginx -t
#nginx: [warn] "ssl_stapling" ignored, issuer certificate not found for certificate "/etc/ssl/certs/nginx-selfsigned.crt"

# create a new cert
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt

# wire up the new cert
server {
        listen 443 ssl;
        listen [::]:443 ssl;
        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;
```

## Reverse Proxy

Am using http to proxy to the next box. It's on the same hypervisor as the reverse proxy, so I'm not concerned about encryption all of the way.

```bash
server {
    #listen 80;
    server_name hmsoftware.org;
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/hmsoftware.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/hmsoftware.org/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    location / {
        proxy_read_timeout 36000s;
        proxy_http_version 1.1;
        proxy_buffering off;

        client_max_body_size 0;
        proxy_redirect off;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_hide_header X-Powered-By;
        proxy_pass_header Authorization;
        proxy_pass http://172.16.44.110;
}
```

[![alt text](/assets/2023-10-12/4.jpg "email")](/assets/2023-10-12/4.jpg)

SSL cert working over reverse proxy now!