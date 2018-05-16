---
layout: post
title:  "What is Docker good for? (Summary)"
date:   2018-02-14 14:06
menu: review
categories: docker 
published: true 
---
After 4 months on exploring Docker and Kubernetes heavily here is a summary of what I've found. I use Docker daily to generate this blog, and we use Kubernetes in production to run a legacy Wordpress site.

1. Using locally on dev machines to run applications where you don't want to install all dependencies
  - eg [Jekyll](/jekyl/2018/01/25/Jekyll-and-Docker.html)
2. Using locally to [Explore an application](/docker/2018/02/01/Wordpress-on-Docker.html) and how it runs under different environments
  - eg Wordpress running under Apache/Nginx/Memcached/PHP5.6/PHP7.2/MySql
3. Running Docker on a single production box
  - [A number of options biased towards Azure on hosting a PHP App (Wordpress)](/wordpress/2018/02/14/Where-to-host-wordpress.html) 
4. [Minikube](/kubernetes/2018/03/12/Kubernetes-Commands.html)
5. [Azure Container Instances](/azure/2018/03/01/Azure-and-Containers.html)
6. [Azure Kubernetes Service](/wordpress/2018/04/19/Wordpress-in-AKS.html)

> If you're going into production, Kubernetes and a Scheduler is where you need to be 

## Useful links

[www.hanselman.com/blog/WhyShouldICareAboutKubernetesDockerAndContainerOrchestration.aspx](https://www.hanselman.com/blog/WhyShouldICareAboutKubernetesDockerAndContainerOrchestration.aspx)

[jimmybogard.com/containers-what-is-it-good-for/](https://jimmybogard.com/containers-what-is-it-good-for/)

[jimmybogard.com/containers-what-are-they-good-for-local-dependencies/](https://jimmybogard.com/containers-what-are-they-good-for-local-dependencies/)
