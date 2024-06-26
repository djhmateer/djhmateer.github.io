---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: certbot 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2024-04-24/5.jpg "email"){:width="500px"}](/assets/2024-04-24/5.jpg) -->
<!-- [![alt text](/assets/2024-04-24/5.jpg "email")](/assets/2024-04-24/5.jpg) -->

<!-- [![alt text](/assets/2024-05-23/1.jpg "email"){:width="500px"}](/assets/2024-05-23/1.jpg) -->





Keys are stored

```bash
# /etc/nginx/sites-available/default
ssl_certificate /etc/letsencrypt/live/hmsoftware.org/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/hmsoftware.org/privkey.pem;

# config is stored in /etc/letsencrypt/renewal/hmsoftware.org.conf
# to disable can put renew_before_expiry = 0
```

running it manually


```bash
sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

# entered email address, and lots of y/n questions
sudo certbot --nginx
```

lets copy the cert to dev

and the nginx config

```

```