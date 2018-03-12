---
layout: post
title:  "What is Docker good for? (Summary)"
date:   2018-02-14 14:06
menu: review
categories: docker 
published: true 
---

> "The big win so far has been to use Docker to help me generate Jekyll blogs"  

1. Using locally on dev machines to run applications where you don't want to install all dependencies
  - eg [Jekyll](/jekyl/2018/01/25/Jekyll-and-Docker.html)
2. Using locally to [Explore an application](/docker/2018/02/01/Wordpress-on-Docker.html) and how it runs under different environments
  - eg Wordpress running under Apache/Nginx/Memcached/PHP5.6/PHP7.2/MySql
3. Using 'locally' as a build server for VSTS
4. Running Docker on a single production box
  - [A number of options biased towards Azure on hosting a PHP App (Wordpress)](/wordpress/2018/02/14/Where-to-host-wordpress.html) 
5. Running Docker with an Orchestrator - Kubernetes (K8s)
  - [Minikube and useful K8s Commands](/kubernetes/2018/03/12/Kubernetes-Commands.html)
  - [Google Kubernetes Engine (GKE)]()
  - [Amazon Container Service (EKS)](https://aws.amazon.com/eks/)
  - [Azure Container Services (AKS) and Container Instances](/azure/2018/03/01/Azure-and-Containers.html)

> If you're going into production, Kubernetes and a Scheduler is where you need to be 

## Useful links
[www.hanselman.com/blog/WhyShouldICareAboutKubernetesDockerAndContainerOrchestration.aspx](https://www.hanselman.com/blog/WhyShouldICareAboutKubernetesDockerAndContainerOrchestration.aspx)

[jimmybogard.com/containers-what-is-it-good-for/](https://jimmybogard.com/containers-what-is-it-good-for/)

[jimmybogard.com/containers-what-are-they-good-for-local-dependencies/](https://jimmybogard.com/containers-what-are-they-good-for-local-dependencies/)