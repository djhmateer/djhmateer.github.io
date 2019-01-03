---
layout: post
title:  "Wordpress on Docker"
date:   2018-02-01 12:22
menu: review
categories: docker 
published: true 
sitemap: false
---

This is part 2 of a [series](/docker/2018/02/14/What-is-docker-good-for.html)


I wanted to explore a legacy Wordpress site:

- Slow to load (5 secs before anything happens)
- Hosted in Azure on a Windows App Service pointing to MSSQL using project [Nami](http://projectnami.org/how-did-we-get-here/)
- Using an old Avada theme
- Difficult to upgrade (apparently)
- Security was a concern (related to above?)

Like any Legacy application it has taken many weeks to gather information (people involved, usernames, passwords, logins to Azure). ~~I'm still guessing as to what version of things are running~~. I had just enough to run the application and I used Docker to help me explore.

I had a number of pieces of advice around the need to tweak Wordpress with Avada to get it to run well (PHP / Wordpress is not my area). A fellow colleague had built a custom Ubuntu16.04 VM 6 months ago and had got it working, but the migration had never happened. I wanted to get the website running well.

This felt like a good use case for containers as they gave an

- Easy development setup environment
- Easy way to test in production for performance

At the time of writing I've **~~no idea~~** **concerns** if it is a good idea to go into production with Docker. 

The first step was to get Wordpress running locally.  

## Official Wordpress Image
[hub.docker.com](https://hub.docker.com/_/wordpress/) has over 10 million pulls. It gets very regular updates. [Github](https://github.com/docker-library/wordpress) source. 

There is a [quickstart](https://docs.docker.com/compose/wordpress/) tutorial from Docker on how to install wordpress.
I followed it and it worked well.

...until it didn't work well. So below is what I ended up with:

## Customising Wordpress
**Update** all below is not necessary (however very instructive). The trick is to mount the whole volume for wordpress:

``` 
- ./html:/var/www/html
```

To get the Avada theme working well here is a summary 

- I'm using localhost:80 so I can easily scp this file to the live server
- Custom uploads.ini (php.ini) for Avada
- Custom wp-config.php for Avada settings and localhost upload tweak
- Custom image based off Wordpress with added ziparchive for Avada

```
# docker-compose.yml
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
     #image: wordpress:latest
     #image: davemateer/wordpresswithziparchive:php5.6
     image: davemateer/wordpresswithziparchive:php7.2
     ports:
       - "80:80"
     restart: always
     # We have a custom wp-config.php so don't need to pass these environment vars in
     #environment:
     #  WORDPRESS_DB_HOST: db:3306
     #  WORDPRESS_DB_USER: wordpress
     #  WORDPRESS_DB_PASSWORD: wordpress
     volumes: 
       - ./uploads.ini:/usr/local/etc/php/conf.d/uploads.ini 
       - ./wp-content:/var/www/html/wp-content
       - ./wp-config.php:/var/www/html/wp-config.php
volumes:
    db_data:
```
The official wordpress:latest is commented out with my custom image set.. which is defined below:

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
[Avada](https://themeforest.net/item/avada-responsive-multipurpose-theme/2833226?ref=ThemeFusion) is a paid for theme with no demo theme that I could see. At $60 it isn't worth thinking about, so I bought it.

Here is how I installed the theme
![ps](/assets/2018-02-01/theme.png)

On localhost I found that it didn't work [here](https://www.barrykooij.com/unable-to-install-plugins-on-localhost/) is the fix which is below in wp-config. Or you can patch it direcly into wp-content/themes, but then you need to go into the container itself and do it...

After activating Avada there is a useful System Status:

![ps](/assets/2018-02-01/status.png)

I had quite a few reds:

## Make Custom Wordpress Image 
This is purely to install another package in the container that Avada needs (ziparchive to unzip demo files)

When there is an update to the official Wordpress image, I need to update my own image. For example on 1st Feb 2018 there was an update to the official image for [WordpressCLI](http://wp-cli.org/) to 1.5.0.

## Publish Image to DockerHub
I followed the instructions [here](https://ropenscilabs.github.io/r-docker-tutorial/04-Dockerhub.html)
ending up with this Dockerfile and directory structure

![ps](/assets/2018-02-01/dockerfile.png)

This was the Dockerfile I have ended up with:

```
# Dockerfile
# docker login --username=davemateer 

# docker build -t davemateer/wordpresswithziparchive:php7.2 .
# docker push davemateer/wordpresswithziparchive:php7.2 

# docker build -t davemateer/wordpresswithziparchive:php5.6 .
# docker push davemateer/wordpresswithziparchive:php5.6

# latest is php7.2
FROM wordpress:latest
#FROM wordpress:php5.6

RUN apt-get update \
    && apt-get install -y zlib1g-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip 
```
## Going to UAT / Production
I found docker easy to install on Ubuntu 16.04 LTS [here](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04) are good instructions.

I'm using Azure both the DS1_v2 (£37 per month) and the B1S (£6.99 per month) as trial images

```
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce
# sudo docker run hello-world
# this should work below but there is a bug in docker compose so get the latest
# sudo apt install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
# logout and login again to make sure correct version of docker-compose is running
```

![ps](/assets/2018-02-01/fire.png)
Open up port 80

## Docker-compose bug
ERROR: Version in "./docker-compose.yml" is unsupported. You might be seeing this error because you're using the wrong Compose file version. Either specify a version of "2" (or "2.0")

If you see this then follow instructions [here](https://github.com/docker/compose/releases) to get the latest release

```
curl -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
# logout and login
docker-compose --version
```

## Copy files to UAT
```
mkdir wordpress (on remote)
scp * dave@13.69.10.225:wordpress/.
```

## Corrupted MySQL
`Fatal error: Can't open and lock privilege tables: Incorrect file format 'user'`

Following this link:
[fatal error](https://stackoverflow.com/questions/28521530/mysql-fatal-error-cant-open-and-lock-privilege-tables-incorrect-file-format) I had a 
I got MySQL running enough using the --skip-grant-tables to get a dump of the database

## Lost password
We didn't have a login to WP, so the trick was to reset the password in the db [here](https://codex.wordpress.org/Talk:Resetting_Your_Password)

## Upgrading Issues / Legacy Versions of PHP and Wordpress
I found the plugin [All in one WP Migration](https://en-gb.wordpress.org/plugins/all-in-one-wp-migration/) useful to dump the entire legacy site which came in around 300MB. This was all plugins, themes and database dump. So everything was overwritten in the new site.

However what I found was that the existing legacy system [13.73.162.214](http://13.73.162.214) (actually this was the demo system that my colleague built) was running:

- PHP5.5.9-1ubuntu4.22
- Wordpress 4.7.9 (latest is 4.9.4)
- MySQL 5.5.59
- Avada 3.9.3 (latest is 5.x)

Then when I built with the latest wordpress image:
- PHP7.2-apache
- Wordpress 4.9.3 (latest is 4.9.4)
- MySQL 5.7.21
- Avada 3.9.5 (latest is 5.x)

I got PHP7 errors
### Front end error
```
Fatal error: Uncaught Error: [] operator not supported for strings in 
  /var/www/html/wp-content/plugins/LayerSlider/includes/slider_markup_init.php:83

added this into line 82 in slider_markup_init.php
/var/www/html/wp-content/plugins/LayerSlider/includes/slider_markup_init.php
$lsInit = array(); $lsContainer = array(); $lsMarkup = array();
```

### Admin error
```
Fatal error: Uncaught Error: [] operator not supported for strings in 
   /var/www/html/wp-content/plugins/revslider/includes/framework/base-admin.class.php:71

C:\Dev\test\wordpress\wp-content\plugins\revslider\includes\framework\base-admin.class.php
change line 21
private static $arrMetaBoxes = array();		//option boxes that will be added to post

```
I could then get the PHP7 site to work.

## Performance Issues
I noticed that reverting to PHP5.6 made the site a slower. Also this is a sercurity risk problem (not upgrading)

## PHP7.x version
As the feedback has been that it is very hard to update this site and 'it breaks when I update things' we really need to push to be on the latest bits and to keep on top of updates.

## Using Docker to run PHP5.6 and PHP7.2
I've used 2 docker instances to help me upgrade the site from PHP5.6 to the latest PHP7.2

This has been invaluable to spin up different versions of the underlying infrastructure to help in figuring out a new environment.

```
# docker build -t davemateer/wordpresswithziparchive:php7.2 .
# docker push davemateer/wordpresswithziparchive:php7.2 

# docker build -t davemateer/wordpresswithziparchive:php5.6 .
# docker push davemateer/wordpresswithziparchive:php5.6

# latest is php7.2
#FROM wordpress:latest
FROM wordpress:php5.6

RUN apt-get update \
    && apt-get install -y zlib1g-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip 
```

What I ended up doing was creating 2 custom images in hub.docker tagged as PHP5.6 and PHP7.2  Both had the zip library compiled in which helped me locally testing.

Then I worked locally getting the Avada theme upgrading from the existing: PHP5.6 install and Avada 3.9.3
This was a very indepth process:

## Avada Upgrade
From Avada 3.9.3 to the latest 5.x

- Buy the theme for $60
- Get the product 

Go through process of figuring out how to register

[https://theme-fusion.com/avada-doc/install-update/how-to-update-theme/](https://theme-fusion.com/avada-doc/install-update/how-to-update-theme/)

[https://theme-fusion.com/avada-doc/getting-started/register-purchase-avada-version-4-0-3-lower/](https://theme-fusion.com/avada-doc/getting-started/register-purchase-avada-version-4-0-3-lower/)

then get an API key:

[https://themeforest.net/user/davemateer2/api_keys/edit](https://themeforest.net/user/davemateer2/api_keys/edit)


On the cheapest VM on Azure £6.99 per month the Wordpress default homepage was loading in:

-PHP5.6
  -finish 1.1s
-PHP7
  -finish 900ms

Upping the VM to a D16s_v3 (16core 64MB RAM)

Running Apache Benchmarks

```
ab -n 1000 -c 100 http://davewordpressb.westeurope.cloudapp.azure.com/
```

![ps](/assets/2018-02-08/bigVM.png)
Data was coming down line at 100Megabits (line is 130) and memory usage on VM was 2.2GB at peak load.

With a £6.99 VM timed out the load test and didn't come back up again after 5 minutes

This was due to memory usage - a workaround is to limit the available memory within Docker.






