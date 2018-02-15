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

## 1.Web App Service on Windows
ikjh

## Interesting Links
[http://www.wordpressdocker.com/](http://www.wordpressdocker.com/)

[https://www.joyent.com/blog/wordpress-on-autopilot-with-ssl](https://www.joyent.com/blog/wordpress-on-autopilot-with-ssl)

[https://www.hyper.sh/pricing.html](https://www.hyper.sh/pricing.html)