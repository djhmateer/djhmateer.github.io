---
layout: post
title: Azure IaaS Webservers
description: 
menu: review
categories: Azure IaaS 
published: true 
comments: false
sitemap: false
image: /assets/2019-04-05/1.jpg
---

When PaaS isn't good enough for hosting a web application we use IaaS. Drupal didn't work well, and Wordpress stuggles on PaaS with intensive plugins such as Divvi theme builder.

## A Single VM with Hosted Azure MySQL

![ps](/assets/2019-04-07/1.png)  


## Multiple VMs with a single Hosted Azure MySQL
Using this for 
- Master / backup
- Blue / Green deployments

Failover happens automatically using

- Azure Load Balancer
- Availability Set
- Multiple VM's

## Multi VMs and multiple DB's
- Azure Traffic Manager
- Multiple VM's
- Multiple Azure MySQL db's

We would use ATM here as it requires it's VM's to be in different regions for failover and load balancing.  

I have not used this for Drupal/Wordpress as the complexity of keeping databases in sync is not required for us currently.
