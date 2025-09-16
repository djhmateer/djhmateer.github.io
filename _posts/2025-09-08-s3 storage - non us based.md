---
layout: post
title: S3 Storage - Non US Based 
description: European S3 storage providers including Hetzner and OVH as alternatives to US-based cloud storage services 
# menu: review
categories: s3 
published: true 
comments: false     
sitemap: true
image: /assets/2024-09-16/1.jpg
---


I've been using [Digital Ocean Spaces](https://cloud.digitalocean.com/) but need S3 storage providers based in Europe with no US ownership:


## Hetzner (Germany)

[![alt text](/assets/2025-09-16/1.jpg "Hetzner")](/assets/2025-09-16/1.jpg)

[Object Storage](https://www.hetzner.com/storage/object-storage/) announced in Dec 2024.

- 5.99 Euro/month - regardless of how many buckets you have
- 1TB-hour of included storage
- 1.5GB traffic per hour (1TB per month)
- Ingress is free

Will send me a recovery key for 2FA in the post if I lose mine. Have to use my authenticator on mobile phone or to remove 2FA I have keys in password storage.

I've started using this for real with rclone - see [s3 viewer article](/2025/09/08/s3-view-and-copy) 

## OVH (France)

[https://www.ovhcloud.com/en-gb/storage-solutions/](https://www.ovhcloud.com/en-gb/storage-solutions/)

- 1-AZ (i.e. not multi zone redundancy) zone on HDD
- Around 10-12 Euro or £7 per TB/month

This is my backup (they offer free credits to start with)




