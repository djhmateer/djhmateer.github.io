---
layout: post
title:  "What is Docker good for? (Summary)"
date:   2018-02-14 14:06
menu: review
categories: docker 
published: true 
---

1. Using locally on dev machines to run applications where you don't want to install all dependencies
  - eg [Jekyll](/jekyl/2018/01/25/Jekyll-and-Docker.html)
2. Using locally to [explore an application](/docker/2018/02/01/Wordpress-on-Docker.html) and how it runs under different environments
  - eg wordpress running under Apache/Nginx/Memcached/PHP5.6/PHP7.2/MySql
3. Running Docker on a single production box
  - I've used it on Azure to explore performance
  - I am **very** wary of going into production currently 
  - [Here](/wordpress/2018/02/14/Where-to-host-wordpress.html) are a number of options biased towards Azure on hosting Wordpress
4. Running Docker orchestrated eg Kubernetes
  - Need to look into this

## Useful links
[https://www.hanselman.com/blog/WhyShouldICareAboutKubernetesDockerAndContainerOrchestration.aspx](https://www.hanselman.com/blog/WhyShouldICareAboutKubernetesDockerAndContainerOrchestration.aspx)

[https://jimmybogard.com/containers-what-is-it-good-for/](https://jimmybogard.com/containers-what-is-it-good-for/)