---
layout: post
title:  "What is Docker good for? (Summary)"
date:   2018-02-14 14:06
menu: review
categories: docker 
published: true 
sitemap: false
---
After 4 months on exploring Docker and Kubernetes heavily here is a summary of what I've found. I use Docker daily to generate this blog, and we use Kubernetes in production to run a legacy Wordpress site.

1. [Jekyll](/2018/01/25/Jekyll-and-Docker) locally so don't install dependencies
2. [Explore an application](/2018/02/01/Wordpress-on-Docker) locally to understand it
  - eg Wordpress running under Apache/Nginx/Memcached/PHP5.6/PHP7.2/MySql
3. [Azure hosting](/2018/02/14/Where-to-host-wordpress) of Wordpress 
4. [Minikube](/2018/03/12/Kubernetes-Commands)
5. [Azure Container Instances](/2018/03/01/Azure-and-Containers)
6. [Azure Kubernetes Service](/2018/04/19/Wordpress-in-AKS) Wordpress

> If you're going into production, Kubernetes and a Scheduler is where you need to be 

## Useful links

[www.hanselman.com/blog/WhyShouldICareAboutKubernetesDockerAndContainerOrchestration.aspx](https://www.hanselman.com/blog/WhyShouldICareAboutKubernetesDockerAndContainerOrchestration.aspx)

[jimmybogard.com/containers-what-is-it-good-for/](https://jimmybogard.com/containers-what-is-it-good-for/)

[jimmybogard.com/containers-what-are-they-good-for-local-dependencies/](https://jimmybogard.com/containers-what-are-they-good-for-local-dependencies/)
