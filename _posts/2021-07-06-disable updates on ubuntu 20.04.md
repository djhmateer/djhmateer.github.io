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

In `/var/log/syslog` I noticed:

> Starting Daily apt upgrade and clean activities...

Just before problems started

# Try 1

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

Or here is another way to do it via code:

```bash
cd /home/dave

cat <<EOT >> 20auto-upgrades
APT::Periodic::Update-Package-Lists "0";
APT::Periodic::Download-Upgradeable-Packages "0";
APT::Periodic::AutocleanInterval "0";
APT::Periodic::Unattended-Upgrade "1";
EOT

sudo cp /home/dave/20auto-upgrades /etc/apt/apt.conf.d/20auto-upgrades

```

## Try 2

[https://superuser.com/questions/1327884/how-to-disable-daily-upgrade-and-clean-on-ubuntu-16-04](https://superuser.com/questions/1327884/how-to-disable-daily-upgrade-and-clean-on-ubuntu-16-04)

```bash
sudo apt-get remove unattended-upgrades -y

sudo systemctl stop apt-daily.timer
sudo systemctl disable apt-daily.timer
sudo systemctl disable apt-daily.service
sudo systemctl daemon-reload
```