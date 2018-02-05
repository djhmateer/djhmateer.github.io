---
layout: post
title:  "Wordpress on Docker"
date:   2018-02-01 12:22
menu: review
categories: git
published: true 
---
I wanted to explore a legacy Wordpress site:

- Slow to load (5secs before anything happens)
- Hosted in Azure on an App Service? pointing to MSSQL
- Using the Avada theme
- Difficult to upgrade (apparently)
- Security was a concern (related to above?)

Like any Legacy application it has taken weeks and weeks to gather information (people involved, usernames, passwords, logins to Azure). I'm still guessing as to what version of things are running. But I've enough to do a proof of concept migration.

I had a number of pieces of advice around the need to tweak Wordpress with Avada to get it to run well (PHP / Wordpress is not my area). A fellow colleague had built a custom Ubuntu16 VM 6 months ago and had got it working, but the migration had never happened. I wanted to get the website running well.

This felt like a good use case for containers as they gave an

- easy development setup environment
- easy way to test in production for performance

At the time of writing I've **no idea** if it is a good idea to go into production with Docker.

The first step was to get Wordpress running locally

## Official Wordpress Image
[here](https://hub.docker.com/_/wordpress/) it is. Over 10million pulls. It gets very regular updates. [Github](https://github.com/docker-library/wordpress) repo. 

There is a [quickstart](https://docs.docker.com/compose/wordpress/) tutorial from Docker on how to install wordpress.
I followed it and it worked well.

...until it didn't work well. So below is what I ended up with:

## Customising Wordpress
To get the Avada theme working well here is a summary 

- I'm using localhost:80 so I can easily scp this file to the UAT server
- Custom uploads.ini (php.ini) for Avada
- Custom wp-config.php for Avada settings and localhost upload tweak
- Custom image based off Wordpress with added ziparchive for Avada

```
-- create docker-compose.yml
version: '3'

services:
   db:
     image: mysql:5.7
     volumes:
       - ./db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     depends_on:
       - db
    # image: wordpress:latest
     image: davemateer/wordpresswithziparchive
     ports:
       - "80:80"
     restart: always
     #environment:
     #  WORDPRESS_DB_HOST: db:3306
     #  WORDPRESS_DB_USER: wordpress
     #  WORDPRESS_DB_PASSWORD: wordpress
     volumes: 
       - ./uploads.ini:/usr/local/etc/php/conf.d/uploads.ini 
       - ./wp-content:/var/www/html/wp-content
       - ./wp-config.php:/var/www/html/wp-config.php
#volumes:
#    db_data:
```

## Uploads.ini
This essentially extends php.ini
[here](https://theme-fusion.com/avada-doc/getting-started/requirements-for-avada/) are the official recommendations for Avada theme.

This is the Server Environment settings in Avada System Status when you get there!

```
file_uploads = On

max_execution_time = 600
memory_limit = 500M
post_max_size = 500M
upload_max_filesize = 500M

max_input_vars=3000
```

## wp-config.php
Wordpress environment settings. I got this file onto my host by going into a running container and copying it out

```
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', true);
define('WP_MEMORY_LIMIT', '256M' );
define('WP_MAX_MEMORY_LIMIT', '512M');

define('FS_METHOD', 'direct');
```
## Install Avada Theme
[Avada](https://themeforest.net/item/avada-responsive-multipurpose-theme/2833226?ref=ThemeFusion) is a paid for theme with no demo theme that I could see.

Here is how I installed the theme
![ps](/assets/2018-02-01/theme.png)

On localhost I found that it didn't work [here](https://www.barrykooij.com/unable-to-install-plugins-on-localhost/) is the fix which is below in wp-config. Or you can patch it direcly into wp-content/themes, but then you need to go into the container itself and do it...

After activating Avada there is a useful System Status:

![ps](/assets/2018-02-01/status.png)

I had quite a few reds:

## Make Custom Wordpress Image based off Official
This is purely to install another package in the container that Avada needs (ziparchive to unzip demo files)

When there is an update to the official Wordpress image, I need to update my own image. For example on 1st Feb 2018 there was an update to the official image for [WordpressCLI](http://wp-cli.org/) to 1.5.0.

## Publish Image to DockerHub
I followed the instructions [here](https://ropenscilabs.github.io/r-docker-tutorial/04-Dockerhub.html)
ending up with this Dockerfile and directory structure

![ps](/assets/2018-02-01/dockerfile.png)

```
# Dockerfile
# docker build -t davemateer/wordpresswithziparchive .

FROM wordpress:latest

RUN apt-get update \
    && apt-get install -y zlib1g-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip 
``` 
commands I ran were

```
docker build -t davemateer/wordpresswithziparchive .
docker login --username=davemateer 
-- still learning how best to tag here
docker tag e3f davemateer/wordpresswithziparchive:firsttry
docker push davemateer/wordpresswithziparchive
```
## Going to UAT / Production
I found docker easy to install on Ubuntu 16.04 LTS [here](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04) are good instructions.

I'm using Azure both the DS1_v2 (£37 per month) and the B1 (£7 per month) as trial images

```
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce
sudo docker run hello-world
```

![ps](/assets/2018-02-01/fire.png)
Open up port 80

## Copy files to UAT
```
scp * dave@13.69.10.225:wordpress/.
```

## Use Docker on Azure
What is available for hosted docker?
   how about a reliable filesystem?
What is available for hosted MySQL?


## Interesting Links
[http://www.wordpressdocker.com/](http://www.wordpressdocker.com/)
[https://www.joyent.com/blog/wordpress-on-autopilot-with-ssl](https://www.joyent.com/blog/wordpress-on-autopilot-with-ssl)
[https://www.hyper.sh/pricing.html](https://www.hyper.sh/pricing.html)




