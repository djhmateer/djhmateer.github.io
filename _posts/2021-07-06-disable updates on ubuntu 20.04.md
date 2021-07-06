---
layout: post
title: Disable auto updates on ubuntu 20.04
description: 
menu: review
categories: Azure 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

[https://linuxconfig.org/disable-automatic-updates-on-ubuntu-20-04-focal-fossa-linux](https://linuxconfig.org/disable-automatic-updates-on-ubuntu-20-04-focal-fossa-linux)

I have libraries which I need to keep on certain versions for GPU work. Any sort of automated update is a problem.

```bash
# apt package log file
/var/log/dpkg.log

# 
sudo vim /etc/apt/apt.conf.d/20auto-upgrades

# FROM
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";

# TO
APT::Periodic::Update-Package-Lists "0";
APT::Periodic::Download-Upgradeable-Packages "0";
APT::Periodic::AutocleanInterval "0";
APT::Periodic::Unattended-Upgrade "1";
```