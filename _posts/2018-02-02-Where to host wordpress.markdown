---
layout: post
title:  "How to host Wordpress - Docker?"
date:   2018-02-14 14:23
menu: review
categories: wordpress 
published: true 
---
I will run through the logical steps of getting Wordpress from your dev machine and explore the possible hosting options, and whether they are a good idea.

0. Test it on your local machine with Docker for Linux running
1. Web app service on Windows with PHP on Windows Server 2016 IIS
2. Web app service on Linux (runs Docker - can only run PHP5.6 and 7.0)
3. Web App for Containers (Hosted Docker - you give it a Docker image so can run PHP7.2)
4. Custom Linux VM with Docker installed 
5. Custom Linux VW with hosted Azure MySQL

9. Azure Container Services (Kubernetes)

12. Wordpress 'TopTier' 
     - [wpengine](https://wpengine.com/) from USD30 per month
13. Wordpress 'MidTier' 
     - [2020](http://www.2020media.com/shared-hosting/wordpress-hosting) from UKP10 per month
     - [bluehost](https://www.bluehost.com/products/wordpress-hosting) from USD20 per month
14. Wordpress 'LowTier'  
     - [123-reg](https://www.123-reg.co.uk/web-hosting/wordpress.shtml) from UKP12 per year

## 1. Test Wordpress on local machine using Docker
Use my local machine to sanity check what is going on with image. I always go with the [nuclear](docker/2018/01/26/Docker-Delete-Containers-Images-Networks-and-Volumes.html) option to delete everything to do with docker before I start, so I get fresh images and I know nothing is lying around.

Previous to that I check in with official Wordpress image and maybe [rebuild my own image](/docker/2018/02/01/Wordpress-on-Docker.html#publish-image-to-dockerhub)

```
docker container prune -f
docker image prune -af
docker network prune -f
docker volume prune -f
```
then also delete any locally created files:

```
# I use windows explorer to delete the directories on local machine
del db_data
del wp-content
# gets all images and runs containers
docker-compose up
```

You should then be able to see:
![ps](/assets/2018-02-14/wp.png)

I use [All-in-One WP Migration](https://en-gb.wordpress.org/plugins/all-in-one-wp-migration/) to easily import an entire site (and theme)
![ps](/assets/2018-02-14/import.png)

Then your site is ready locally.

I've got many issues with broken links, slightly broken import sections etc.. But they are easily contained within Docker, and get easily import and export (with all files source controlled).

## Windows App Service
![ps](/assets/2018-02-15/2windows.png)
then
![ps](/assets/2018-02-15/2win2.png)
The creation of a normal App Service that can host .NET on Win Server 2016

## Linux App Service
![ps](/assets/2018-02-15/2windows.png)
then
![ps](/assets/2018-02-15/2linux3.png)
So the Web App Service for linux is really a Web Apps For Containers with a pre built image

## 1.Web App Service on Windows and Linux using PHP
If you select this Wordpress template, you'll get Windows Server 2016 with PHP7, connected to a hosted MySQL db.
![ps](/assets/2018-02-15/template.png)

Performance is not good.

## 2.Web App for Containers - Deploy Docker to Azure
Here we can deploy our own Docker container to Azure. [Official Docs](https://azure.microsoft.com/en-gb/services/app-service/containers/)

![ps](/assets/2018-02-15/2tier.png)
then

![ps](/assets/2018-02-15/2docker.png)

here is what we get:

![ps](/assets/2018-02-15/2vm.png)

However this just gets the image from hub.docker.com and creates the container. We need another container created - I used docker-compose.yml on my localhost to get MySQL.

[How to run CMSs on Web App for Containers](https://blogs.msdn.microsoft.com/appserviceteam/2017/11/06/running-a-popular-content-management-solution-on-web-app-for-containers/)



## Interesting Links
[http://www.wordpressdocker.com/](http://www.wordpressdocker.com/)

[https://www.joyent.com/blog/wordpress-on-autopilot-with-ssl](https://www.joyent.com/blog/wordpress-on-autopilot-with-ssl)

[https://www.hyper.sh/pricing.html](https://www.hyper.sh/pricing.html)