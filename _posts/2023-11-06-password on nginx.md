---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: ai 
published: true 
comments: false     
sitemap: true
image: /assets/2023-10-30/1.jpg
---

<!-- [![alt text](/assets/2023-11-06/1.jpg "email"){:width="600px"}](/assets/2023-11-06/1.jpg) -->
[![alt text](/assets/2023-11-06/1.jpg "email")](/assets/2023-11-06/1.jpg)

A simple forms based password, which the browser remembers via a cookie.

[https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-22-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-22-04)

```bash
sudo apt install apache2-utils

sudo htpasswd -c /etc/nginx/.htpasswd sammy

sudo vim /etc/nginx/sites-enabled/default

sudo systemctl restart nginx

```

```txt
server {
    listen 80 default_server;

     . . .
   
    auth_basic "Restricted Content";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```

## Conclusion

A very simple way to get a password on a site. I used this for development where I want some stakeholders to be able to see content but not yet released to the world.

