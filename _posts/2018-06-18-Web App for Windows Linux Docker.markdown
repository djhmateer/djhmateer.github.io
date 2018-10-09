---
layout: post
title:  "Web App for Windows Linux Docker"
date:   2018-06-18 04:43
#menu: review
categories: wordpress 
published: true 
comments: true
---
Lets explore potential Azure hosting options focussing on Wordpress which I've [had to deploy](/wordpress/2018/05/31/Wordpress-in-AKS.html)

1. Web App (Windows)
2. App Service on Linux
3. Web App (Docker) / Web App for Containers
4. Azure Container Instances   

Summary: I'm not using any of the above. Web App for Containers looks extremely promising, but I need faster disks as [described here](/wordpress/2018/05/29/Wordpress-Persistence-AKS.html). If you've got a workload which isn't disk intensive then Web App for Containers is a good fit.

I am continuing to use Azure Kubernetes Service in production for Wordpress which is [covered in this article](/wordpress/2018/05/31/Wordpress-in-AKS.html)

## 1. Web App (Windows)
Create a resource, Web, Web App  
![ps](/assets/2018-02-15/mon2.png){:width="400px"}  
then  
![ps](/assets/2018-02-15/mon1.png){:width="800px"}  
The creation of a normal App Service that can host .NET and .NET Core on a Winows Server 2016. **I don't want to host Wordpress on a Windows Server mainly as it is unusual to do so.**

## 2. Azure App Service on Linux
[Docs](https://docs.microsoft.com/en-gb/azure/app-service/containers/app-service-linux-intro)  This is a pre built Docker image (running on a Linux host)

![ps](/assets/2018-02-15/mon3.png){:width="800px"}    
Notice is this A Series compute VM (not a B Series burstable)  
![ps](/assets/2018-02-15/mon4.png){:width="300px"}      
In the Runtime Stack we can run .NET Core, Java, PHP and Node.  
Web App for Linux is really a **Web Apps For Containers with a pre built image**  

## 3. Web App (Docker) - Web App for Containers
[Hanselman](https://www.hanselman.com/blog/PennyPinchingInTheCloudDeployingContainersCheaplyToAzure.aspx) has a good post on this.  
There are 2 ways to do this. Firstly search for Web App, then select Docker, secondly search for Web App for Containers. They will both get to this screen:

![ps](/assets/2018-02-15/mon7.png)   

Here we can deploy our own Docker images into a container on Azure. [Official Docs](https://azure.microsoft.com/en-gb/services/app-service/containers/)  

Once you have a [MySQL instance installed in Azure](/wordpress/2018/05/31/Wordpress-in-AKS.html#mysql-database) I find the easiest way is to [use the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) to spin up a new database:
```
az mysql db create -g amysql -s davemysql -n dteste 

-- delete the database 
az mysql db delete -g amysql -s davemysql -n dteste 
```
![ps](/assets/2018-02-15/wordpressmysql.png){:width="500px"}   
```
dtestd
dave@davemysql
Secret!!
davemysql.mysql.database.azure.com
```
You can connect Wordpress up to a hosted MySQL and it will all work, except that a restart of the container will bring you back to a wordpress install page as the default Wordpress image will write to the local (containers) filesystem
### Web App for Containers - multi container
Following this [Create Wordpress tutorial](https://docs.microsoft.com/en-gb/azure/app-service/containers/tutorial-multi-container-app)

[az appservice plan create](https://docs.microsoft.com/en-us/cli/azure/appservice/plan?view=azure-cli-latest#az-appservice-plan-create)  

[az webapp create](https://docs.microsoft.com/en-us/cli/azure/webapp?view=azure-cli-latest#az_webapp_create)  
```
az group create -n dtestf -l westeurope

az appservice plan create -g dtestf -n dtestf --sku B1 --is-linux

-- name will be davewordpress.azurewebsites.net
az webapp create -g dtestf -p dtestf -n davewordpress --multicontainer-config-type compose --multicontainer-config-file compose-wordpress.yml

```
with the docker-compose (ie compose-wordpress.yml) being:

```
# compose-wordpress.yml
version: '3.3'

services:
   db:
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "8000:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
volumes:
    db_data:

```
So we are persisting the mysql data in a named volume, so it can survive a restart. The wordpress instance can't though.
Let's move to a hosted version of MySQL and a shared volume.

```
# compose-wordpress-hosteddb.yml
version: '3.3'

services:
   wordpress:
     image: microsoft/multicontainerwordpress
     volumes:
      - ${WEBAPP_STORAGE_HOME}/site/wwwroot:/var/www/html
     ports:
       - "8000:80"
     restart: always
```
then
```
-- configure db variables in wordpress and the MySQL Cert
az webapp config appsettings set --resource-group dtestf --name davewordpress --settings WORDPRESS_DB_HOST="davemysql.mysql.database.azure.com" WORDPRESS_DB_USER="dave@davemysql" WORDPRESS_DB_PASSWORD="Secret" WORDPRESS_DB_NAME="dtestf" MYSQL_SSL_CA="BaltimoreCyberTrustroot.crt.pem"

-- update the container
az webapp config container set --resource-group dtestf --name davewordpress --multicontainer-config-type compose --multicontainer-config-file compose-wordpress-hosteddb.yml
```
I got rid of the MYSQL_SSL_CA as I'm not currently enforcing SSL from the webserver to db.

**Performance problem** - for the same site it takes 1.7s compared to 1s on K8s with an attached disk. This was measured using WP-Super-Cache turned on, so files being served from disk.  The reason for this is they are using the slow Azure Files.


### Add Redis

```
az webapp config appsettings set --resource-group dtestf --name davewordpress --settings WP_REDIS_HOST="redis"
```
Update the compose file:

```
# compose-wordpress-hosteddb.yml
version: '3.3'

services:
   wordpress:
     image: microsoft/multicontainerwordpress
     ports:
       - "8000:80"
     restart: always

   redis:
     image: redis:3-alpine
     restart: always
```

```
-- update the container
az webapp config container set --resource-group dtestf --name davewordpress --multicontainer-config-type compose --multicontainer-config-file compose-wordpress-hosteddb.yml

```

We can then install WP and turn on the Redis Object cache. I couldn't see any noticible difference.

### Logs
```
https://davewordpress.scm.azurewebsites.net/api/logs/docker
```
Then follow the href link


## 4. Azure Container Instances
At the time of writing these were [diagram at bottom of this page](https://azure.microsoft.com/en-gb/services/container-instances/) the options for using containers on Azure. 

![ps](/assets/2018-03-01/container.png)

[Overview](https://docs.microsoft.com/en-gb/azure/container-instances/)   
[Docs](https://docs.microsoft.com/en-gb/azure/container-instances/container-instances-overview)

It seems like the use case for these currently is to do short lived containers (they offer per second billing). Maybe a 'do stuff' ccontainer. Azure functions may be a better way if possible.

- no high availability
- no load balancing
- no scaling
- no monitoring

- fast startup
- public IP
- persistent storage



## What Not to Do
**Below are some articles and dead ends! Please be wary**

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

## Custom Linux VM with Docker and local MySQL 
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


## Custom Linux VM with Docker and hosted MySQL
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
