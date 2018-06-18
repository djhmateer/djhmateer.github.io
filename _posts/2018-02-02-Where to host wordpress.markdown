---
layout: post
title:  "How to host Wordpress - Docker?"
date:   2018-06-18 04:43
menu: review
categories: wordpress 
published: true 
---
I will run through the logical steps of getting Wordpress from your dev machine and explore the possible hosting options, and whether they are a good idea.

1. Azure Web App (Windows)
2. Azure Web App (Linux)
2. Azure Web App for Containers
3. Azure Container Instances [part 6](/wordpress/2018/04/19/Wordpress-in-AKS.html)
4. Custom Linux VM with Docker and local MySQL
5. Custom Linux VW with hosted Azure MySQL

## 1. Web App (Windows)
![ps](/assets/2018-02-15/mon2.png)  
then  
![ps](/assets/2018-02-15/mon1.png)
The creation of a normal App Service that can host .NET and .NET Core on a Winows Server 2016

## 2. Web App (Linux)
![ps](/assets/2018-02-15/mon3.png)   
Notice is this A Series compute VM (not a B Series burstable)  
![ps](/assets/2018-02-15/mon4.png)  
In the Runtime Stack we can run .NET Core, Java, PHP and Node.  
Web App for Linux is really a **Web Apps For Containers with a pre built image**

## 3. Web App (Docker)
![ps](/assets/2018-02-15/mon5.png)   
Is this Web app for Containers?

![ps](/assets/2018-02-15/mon6.png)   

**HERE**

## 3.Web App for Containers 
Here we can deploy our own Docker images into a container on Azure. [Official Docs](https://azure.microsoft.com/en-gb/services/app-service/containers/)

![ps](/assets/2018-02-15/2tier.png)
This will be a Windows Server running Docker

![ps](/assets/2018-02-15/2docker.png)

here is what we get:

![ps](/assets/2018-02-15/2vm.png)

However this just gets the image from hub.docker.com and creates the container. We need another container created - I used docker-compose.yml on my localhost to get MySQL.

[How to run CMSs on Web App for Containers](https://blogs.msdn.microsoft.com/appserviceteam/2017/11/06/running-a-popular-content-management-solution-on-web-app-for-containers/)

So now we need to create a container with all of our presets baked in (and tuned to Azure). The concept is that the container is immutable and we'll use the **shared** filesystem provided and the hosted MySQL database provided.

Here is the new Dockerfile that builds the image that we need with it pre-ready to go:

```
# docker login --username=davemateer 

# docker build -t davemateer/wordpressbakedforazure:php7.2 .
# docker push davemateer/wordpressbakedforazure:php7.2 

# latest is php7.2
FROM wordpress:latest

RUN apt-get update \
    && apt-get install -y zlib1g-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip 

# don't want to run docker-compose, so want to copy in the bits that we need into this new image

# we want this to be able to spin up automatically and connect to correct db
# host file system should be ok as done in Azure: App settings,
# WEBSITES_ENABLE_APP_SERVICE_STORAGE: true

COPY ./uploads.ini /usr/local/etc/php/conf.d/uploads.ini
## but don't want hosted MySQL connetion string embedded!
COPY ./wp-config.php /var/www/html/wp-config.php  

## need to setup shared filesystem
#COPY ./wp-content /var/www/html/wp-content
```
The wp-config.php has the live database strings hard coded in it. Not ideal, but good to prove it all works. Also am using the containers filesystem, so any themes, plugins or auto updates would not survive a restart, nor an auto scale up/out.

Lets fix these 2 issues:
- Filesystem
- Connection strings not in Docker image

I set the WEBSITES_ENABLE_APP_SERVICE_STORAGE to be true
it looks like /home has to be mounted

![ps](/assets/2018-02-15/storage.png)

## A Working Template from MS
[I followed the Web Apps for Containers Azure Marketplace Template link](https://blogs.msdn.microsoft.com/appserviceteam/2017/09/12/how-to-for-wordpress-on-app-service-windowslinux/)  which 
spun up a docker image:
```
appsvcorg/wordpress-alpine-php:0.2
https://hub.docker.com/r/appsvcorg/wordpress-alpine-php/
```

interestingly the environment variables didn't work (db connection strings) when passed through. I had to manually type them in once, which would have persisted to the filesystem.

Some good samples are [here](https://github.com/Azure-App-Service/wordpress-alpine-php).

![ps](/assets/2018-02-15/autoScale.png)

**however** performance is not good. Its a linux docker image running on a fairly low powered Windows Server.

using apache benchmarks
```
ab -n 1000 -c 100 http://davewordpresst.azurewebsites.net/

#2 instances - 495s
#4 instances - 264s
#10 instances - 182s
```

Summary
- Resilient filesystem
- Resilient MySQL database cluster
- Containers can spin up and down easily to cope with load
- Slow performance on Windows server running Docker with Azure MySQL database 

## 3.Custom Linux VM with Docker and local MySQL 
[Detailed install instructions (part 2 of this series)](/docker/2018/02/01/Wordpress-on-Docker.html#going-to-uat--production)

**Standard DS1_v2 1cpu 3.5GB - £37.71**
```
ab -n 1000 -c 100 http://davewordpressb.westeurope.cloudapp.azure.com/
```
177s to run from a fairly clean 100Mbits connection

Was mostly db was taking power 33% CPU
90% CPU used
2.4MB used (400MB free)

You can scale the VM - however it does take 5 minutes or so. Filesystem is still intact (same disk), therefore as our db_data and wp-data directories are shared to the host, it just all works.


**D16S_V3 16cpu, 64GB - £532**
58secs to run (100MBit line flooded)

**B1s 1cpu 1GB £6.99**
 finish 1.7s
 DOM load: 1s
load test easy to fail the machine.

Have to be careful with such little RAM - would probably be better using Alpine linux. It was very easy to run out of RAM. Can tell Docker how much to use:

```
# docker-compose.yml
services:
   db:
     image: mysql:5.7
     volumes:
       - ./db_data:/var/lib/mysql
     restart: always
     deploy:
       resources:
         limits:
           memory: 200M
```

**B1mS 1 cpu and 2GB RAM £13 per month**
I noticed this machine can take a while to spin up down


## 4.Custom Linux VM with Docker and hosted MySQL
Standard DS1_v2 1cpu 3.5GB - £37.71
100 Compute units db - £64

```
ab -n 1000 -c 100 http://davewordpressb.westeurope.cloudapp.azure.com/
```
140secs to run

## Appendix
Web App Service on Windows and Linux using PHP
If you select this Wordpress template, you'll get Windows Server 2016 with PHP7, connected to a hosted MySQL db.
![ps](/assets/2018-02-15/template.png)

Performance is not good.

## Interesting Links
[http://www.wordpressdocker.com/](http://www.wordpressdocker.com/)

[https://www.joyent.com/blog/wordpress-on-autopilot-with-ssl](https://www.joyent.com/blog/wordpress-on-autopilot-with-ssl)

[https://www.hyper.sh/pricing.html](https://www.hyper.sh/pricing.html)
