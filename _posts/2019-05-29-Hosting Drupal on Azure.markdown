---
layout: post
title: Hosting Drupal on Azure 
description: 
menu: review
categories: Drupal Azure
published: true 
comments: false
sitemap: false
image: /assets/2019-05-27/1.png
---

I've blogged on hosting [Wordpress on Azure PaaS](https://davemateer.com/2019/02/26/Wordpress-on-Azure-PaaS) and [Many different Azure options for hosting Wordpress](https://davemateer.com/2018/06/18/Azure-Hosting-Wordpress-Win-Linux-Docker).   
So when I was asked to find [Drupal](https://www.drupal.org/) hosting for an enterprise customer which had to be on Azure, I tried the same strategy.  

## What is Drupal?
[Drupal on Wikipedia](https://en.wikipedia.org/wiki/Drupal) tells us it came out in 2000, and uses PHP and MySQL. So interestingly it precedes [Wordpress](https://en.wikipedia.org/wiki/WordPress) by 3 years.

I'm using Drupal 7 as this is what the design shop uses who built the site.

## Don't host Drupal on Azure PaaS (Platform as a Service)
In today's modern Cloud world I dislike using bare metal or unmanaged VM's, and always prefer to go more 'right' in the diagram below

![ps](/assets/2019-03-06/1.png)  

However the comparable performance was:

- 14secs to load the site on PaaS (full VM power, and full MySQL hosted)
- 4 secs on a VM  

The most likely cause is the underlying shared filesystem performance as [discussed here](https://www.reddit.com/r/AZURE/comments/79mx4k/basic_wordpress_website_super_slow_even_with/) and [here](https://drupal.stackexchange.com/questions/256514/performance-is-notoriously-slow).  

We couldn't make the backend admin site usable.  

## Using IaaS (Infrastructure as a Service) ie a VM and AZ CLI
this works relatively well. VM is backed up 

.sh scripts to build up the VM quickly



## Using hosted Azure MySQL 
This works well. However you are charged egress from the database - see [Do I incur any network data transfer charges](https://azure.microsoft.com/en-gb/pricing/details/mysql/#faq), and Drupal in very database heavy.  Database has a rolling 7 day backup strategy, and we have tested the rollback which works very well. 


## Drupal Caching
asdfasfd


## 3rd Party Hosting
Very attractive to look at these. We'd need to make sure that crontab jobs are available for our jobs which require updates.




