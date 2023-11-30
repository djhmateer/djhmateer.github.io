---
layout: post
# title: ChatGPT-4 Create a Wordpress Website - Pressure Washer Rental
description: 
menu: review
categories: ai 
published: true 
comments: false     
sitemap: true
image: /assets/2023-10-16/9.jpg
---

<!-- [![alt text](/assets/2023-07-22/1.jpg "email"){:width="800px"}](/assets/2023-07-22/1.jpg) -->
<!-- [![alt text](/assets/2023-08-01/1.jpg "email")](/assets/2023-08-01/1.jpg) -->

<!-- [![alt text](/assets/2023-08-23/3.jpg "email")](/assets/2023-08-23/3.jpg) -->


<!-- [https://www.youtube.com/watch?v=LJyfhD5CUiM](https://www.youtube.com/watch?v=LJyfhD5CUiM) -->

<!-- [![alt text](/assets/2023-10-10/3.jpg "email"){:width="600px"}](/assets/2023-10-10/3.jpg) -->

<!-- [![alt text](/assets/2023-10-16/9.jpg "email")](/assets/2023-10-16/9.jpg) -->
<!-- [![alt text](/assets/2023-10-16/9.jpg "email"){:width="600px"}](/assets/2023-10-16/9.jpg) -->


For a friend I'm building a website for his new Skate Park.

- DNS handled by [DNSimple]() with ALIAS to mateer.hopto.org which is a dynamic DNS pointing to an nginx reverse proxy on the Proxmox server.

- Certbot handling SSL - sudo certbot --nginx

- Setup a new Ubuntu 22.04 (LTS) VM

## Wordpress Install

On Ubuntu 22.04

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
# sudo -u www-data wp core download --force

# sudo rm wp-config.php
sudo -u www-data wp core config --dbname='wordpress' --dbuser='wp_user' --dbpass='password' --dbhost='localhost' --dbprefix='wp_'

sudo chmod -R 755 /var/www/html/wp-content

# be careful to have ssl running before doing this step
# so that we don't have to change from http to https for admin interface
sudo -u www-data wp core install --url='https://theskatefarmcic.co.uk' --title='Blog Title' --admin_user='dave' --admin_password='letmein' --admin_email='email@domain.com'
```

## Too Many Redirects on Admin

I got into an interesting situation where I couldn't get into the /wp-admin and was getting too many redirects.

```bash
# /etc/php/8.1/apache2
php.ini
 display_errors to On

# /var/www/html/wp-config.php
```php
WP_DEBUG to True

# at bottom of wp-config.php
if($_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https'){

    $_SERVER['HTTPS'] = 'on';
    $_SERVER['SERVER_PORT'] = 443;
}

#define('WP_HOME','https://theskatefarmcic.co.uk/');
#define('WP_SITEURL','https://theskatefarmcic.co.uk/');
```

The problem was that it didn't think it was on https as the Apache server isn't! The link from nginx to apache is on http transport. So we just have to tell it that it is.
