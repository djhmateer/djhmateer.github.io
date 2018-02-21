---
layout: post
title:  "Ubuntu for the Windows User"
date:   2018-02-21 11:19
menu: review
categories: ubuntu 
published: true 
---
Here are my most used commands in Linux.  Current distibution is Ubuntu Server 16.04.3 LTS (Xenial Xerus)

```
# apt-get is the lower level, apt is meant to be more pleasant!

apt-get update    # updates the package lists
apt-get upgrade   # upgrades current packages
apt-get dist-upgrade  # distribution

apt-get install openssh-server  # so can ssh, and scp into the machine

scp * dave@xps:wordpress/.
scp docker-compose.yml uploads.ini wp-config.php dave@xps:wordpress/.


top

ps -ef
kill -9 1234

rm -rf *

reboot now  # when need to reboot
sudo su
```
### Installing Docker
[Installing Docker](/docker/2018/02/01/Wordpress-on-Docker.html#going-to-uat--production)

### Installing Dot Net Core
[Microsoft](https://www.microsoft.com/net/learn/get-started/windows#linuxubuntu)

### Installing Ubuntu Server
[https://www.ubuntu.com/download/server](https://www.ubuntu.com/download/server)

[Install instructions](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-windows#1) using Rufus to create a bootable USB stick.

