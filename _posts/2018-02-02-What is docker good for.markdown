---
layout: post
title:  "What is Docker good for?"
date:   2018-02-14 14:06
menu: review
categories: docker 
published: true 
---

1. Using locally on dev machines to run applications where you don't want to install all dependencies
  - eg Jekyll [here](/jekyl/2018/01/25/Jekyll-and-Docker.html) is how I use it
2. Using locally to explore an application and how it runs under different environments
  - eg wordpress running under Apache/Nginx/Memcached/PHP5.6/PHP7.2/MySql
  - tuning application settings eg for Avada theme in wordpress you need to do custom php.ini and wp-config.php settings
  - [here](/docker/2018/02/01/Wordpress-on-Docker.html) much more detail
3. Running Docker on a single production box
  - I've used it on Azure to explore performance
  - I **very** wary of going into production currently 
  - [here](/wordpress/2018/02/14/Where-to-host-wordpress.html) are a number of options biased towards Azure on hosting Wordpress
4. Running Docker orchestrated eg Kubernetes
  - Need to look into this

## Useful links
[https://www.hanselman.com/blog/WhyShouldICareAboutKubernetesDockerAndContainerOrchestration.aspx](https://www.hanselman.com/blog/WhyShouldICareAboutKubernetesDockerAndContainerOrchestration.aspx)

[https://jimmybogard.com/containers-what-is-it-good-for/](https://jimmybogard.com/containers-what-is-it-good-for/)