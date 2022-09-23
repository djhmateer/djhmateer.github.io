---
layout: post
# title: Proxmox Beginners Guide
description: 
menu: review
categories: Azure
published: true 
comments: false     
sitemap: true
image: /assets/2022-01-13/upload.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->

Azure burstable VMs eg `Standard B2s` (2 vcpus, 4GB memory) are cost efficient at £26.12 per month.

To monitor the CPU credits remaining:

[![alt text](/assets/2022-09-15/1.jpg "email")](/assets/2022-09-15/1.jpg)

There is also an alert you can setup to email if it falls below a certain threshold - see blog below.

[https://www.danielstechblog.io/monitoring-azure-b-series-vm-banked-credits/](https://www.danielstechblog.io/monitoring-azure-b-series-vm-banked-credits/)

I've also found the disk iOPs are fairly limited on the burstable I'm using here. But generally it is totally fine and a great choice.