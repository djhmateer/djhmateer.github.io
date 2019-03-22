---
layout: post
title: Containers  
#menu: review
categories: Containers Docker Kubernetes 
published: true 
comments: true
sitemap: true
---

This is an article I helped write for my [employer - Quorum Network Resources](https://www.qnrl.com) in October 2018. 

I specifically like this first diagram:

![ps](/assets/2019-03-06/1.png)  

It occurred to me that we push projects further 'right' in the diagram above. For example I found that we can [Run Wordpress really well in PaaS](/2019/02/26/Wordpress-on-Azure-PaaS) without the need of the flexibility of containers. [Drupal](https://www.drupal.org/) was a different story and we went left to IaaS (VM). Azure Functions proved invaluable for [Counting Downloads from Blob Storage](/2018/11/07/Azure-Functions-to-Count-Downloads-from-Blob-Storage)

New projects are using as much PaaS and FaaS as possible, containers for services and for the ease of development. We use [Azure DevOps](https://azure.microsoft.com/en-gb/services/devops/) for source control, CI/CD and process management. 


## Executive Summary
Containerisation is a technology that is making it more cost effective to host (can reduce 70% of cloud bill) and deploy software.  

It is an analogous technology event to virtualisation ie deploying software becoming more cost effective as you pack more onto each server.  

Containerisation is the next step, where essentially you don't need multiple copies of the operating system (as you do in each VM), so a major benefit is you can pack more onto the same hardware.  

## What Are Containers?
See diagram above

- Base metal
- IaaS - Infrastructure as a Service
- Containers
- PaaS - Platform as a Service (eg Azure App Service)
- FaaS - Functions as a Service (eg Azure Functions, AWS Lambdas)

Virtual machines offer the most flexibility, however you are responsible for setup (in the Windows world there is usually some manual setup) and patching and ultimately a lot of the resources remain unused.  

PaaS/FaaS give you little control, everything is managed by the cloud provider including when updates are applied. We use them as much as we can.  

PaaS/FaaS allows focussing on the application and the problem to be solved, without much infrastructure thought. They give little control over the environment they run in and everything is managed by the cloud provider including when updates are applied.   

Containers are a medium in that you have control over the base image and what versions of software are running. Everything is in source control and part of the your CI/CD pipeline.  

Why Use Containers?
- Costs decrease as you pack more container resources onto hardware than with VM's
- Makes deployment easier
- Makes testing easier and more consistent
- Platform agnostic

![ps](/assets/2019-03-06/2.png)  
The general workflow we use in Quorum when implementing Containers.    

## When to use Containers?
- When you have separate services 
- Separate teams working on a large application
- If you want to deploy more often with less manual work

## When not to use Containers?
- When you have a good existing Continuous Integration / Continuous Deployment pipeline 
- When you can use PaaS/FaaS

## What is Orchestration and Kubernetes?
Kubernetes is the most popular tool/system to orchestrate containers  

There is a good rule of thumb for containers:  

`If you’re going into production, Kubernetes and a Scheduler is where you need to be"`

Orchestration is a way of managing your containers. Because of their nature, containers are normally restarted more frequently than VM's. Orchestration is a way of managing this process and 'looking after' the health of your containers.  

Orchestration is a way of handling  
- Updates to your containers and scheduling minimal/zero downtime
- Scaling the containers across multiple VM's

These features look at lot like cloud PaaS (eg Azure App Service). They are essentially the same.  

In fact Azure offers AKS (Azure Kubernetes Services) which is Kubernetes PaaS  

## How can Quorum Help?
We have been using Containers for years internally, and over the past 12 months are using in production.   

We work in the Azure Container space, which has changed dramatically over the last year, and can guide you through what works and what doesn't. We will actively encourage you to take the simplest options and not be swayed by hype.  

It is a complex area - let us help you deploy your software easily and reduce your costs. Please drop us an email or call.  

## Final Note
Thanks again to [Quroum](https://www.qnrl.com) for letting me post this here - [drop me a line: david.mateer@qnrl.com](mailto:david.mateer@qnrl.com) if we can help. 




