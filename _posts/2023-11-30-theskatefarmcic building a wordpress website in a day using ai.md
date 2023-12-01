---
layout: post
title: Wordpress - too many redirects using nginx reverse proxy
description: 
#menu: review
categories: wordpress
published: true 
comments: false     
sitemap: true
image: /assets/2023-12-01/1.jpg
---

<!-- [![alt text](/assets/2023-07-22/1.jpg "email"){:width="800px"}](/assets/2023-07-22/1.jpg) -->
<!-- [![alt text](/assets/2023-08-01/1.jpg "email")](/assets/2023-08-01/1.jpg) -->

<!-- [![alt text](/assets/2023-08-23/3.jpg "email")](/assets/2023-08-23/3.jpg) -->


<!-- [https://www.youtube.com/watch?v=LJyfhD5CUiM](https://www.youtube.com/watch?v=LJyfhD5CUiM) -->

<!-- [![alt text](/assets/2023-10-10/3.jpg "email"){:width="600px"}](/assets/2023-10-10/3.jpg) -->

<!-- [![alt text](/assets/2023-10-16/9.jpg "email")](/assets/2023-10-16/9.jpg) -->
[![alt text](/assets/2023-12-01/1.jpg "email"){:width="600px"}](/assets/2023-12-01/1.jpg)


I'm building a website for a friend for his new Skate Park [theskatefarmcic.co.uk](https://theskatefarmcic.co.uk/)

It is a Wordpress site (of which I've installed many times), but this post explains an interesting redirect issue.

- DNS handled by [DNSimple](https://dnsimple.com/) with ALIAS to mateer.hopto.org which is a dynamic DNS pointing to an nginx reverse proxy on the Proxmox server.

- Certbot handling SSL 

- Ubuntu 22.04 (LTS) VM

## Wordpress Install

On Ubuntu

```bash
sudo apt update -y
sudo apt upgrade -y

sudo apt install apache2 -y

# Mysql
sudo apt install mysql-server -y

# drop database wordpress
sudo mysql -e "CREATE DATABASE wordpress;"
sudo mysql -e "CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'password';"
sudo mysql -e "GRANT ALL ON wordpress.* TO 'wp_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# PHP
sudo apt install php libapache2-mod-php php-mysql -y

sudo apt install php-curl php-gd php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip -y

sudo apt install php-imagick -y

sudo systemctl restart apache2

## Wordpress
# use the CLI to get a bit more automation

cd /home/dave
sudo curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar

sudo chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp


cd /var/www/html
sudo chown -R www-data:www-data /var/www

sudo -u www-data wp core download

sudo -u www-data wp core config --dbname='wordpress' --dbuser='wp_user' --dbpass='password' --dbhost='localhost' --dbprefix='wp_'

sudo chmod -R 755 /var/www/html/wp-content

# ideally have ssl running before doing this step
# so that we don't have to change from http to https for admin interface
sudo -u www-data wp core install --url='https://theskatefarmcic.co.uk' --title='Blog Title' --admin_user='dave' --admin_password='letmein' --admin_email='email@domain.com'
```

## Too Many Redirects on Admin

I got into an interesting situation where I couldn't get into the /wp-admin and was getting too many redirects.

To help in debugging here are the strategies I used to look for errors:

```bash
# 1. reverse proxy turn back on port 80
# comment out certbot redirects at bottom of this file
/etc/nginx/sites-available/default

# check proxy logs 
/var/log/nginx

# test config
sudo nginx -t 
sudo systemctl restart nginx


# 2. wordpress apache logs
# check traffic actually getting to this server (and not redirecting from proxy)
/var/log/apache2/

# 3. test from Chrome (and other machines to negate cookies)
# F12 dev tools, right click on reload, Empty Cache and Hard Reload option

# should be a 302 to wp-login.php
curl -I https://theskatefarmcic.co.uk/wp-admin/
# should be 200
curl -I https://theskatefarmcic.co.uk/wp-login.php

# verbose
curl -v https://theskatefarmcic.co.uk/wp-login.php

# 4 wordpress
# /etc/php/8.1/apache2
php.ini
 display_errors to On

# /var/www/html/wp-config.php
WP_DEBUG to True

# at bottom of wp-config.php
if($_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https'){

    $_SERVER['HTTPS'] = 'on';
    $_SERVER['SERVER_PORT'] = 443;
}

# useful to force
#define('WP_HOME','https://theskatefarmcic.co.uk/');
#define('WP_SITEURL','https://theskatefarmcic.co.uk/');

# useful in debugging to make sure things are working
# define('FORCE_SSL_ADMIN', false);
```

The problem was that it didn't think it was on https as the Apache server isn't! The link from nginx to apache is on http transport. So we just have to tell it that it is.

[https://stackoverflow.com/a/63167875](https://stackoverflow.com/a/63167875)
