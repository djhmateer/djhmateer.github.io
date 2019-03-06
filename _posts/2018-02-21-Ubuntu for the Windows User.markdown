---
layout: post
title:  Ubuntu for the Windows User
categories: Ubuntu Linux 
published: true 
redirect_from: ubuntu/2018/02/21/Ubuntu-for-the-Windows-User.html 
---
Here are my most used commands in Linux.  Current favoured distibution is Ubuntu Server 16.04.3 LTS (Xenial Xerus).

```
# apt-get is the lower level, apt is meant to be more pleasant!

apt-get update    # updates the package lists
apt-get upgrade   # upgrades current packages
apt-get dist-upgrade  # distribution updates 

apt-get install openssh-server  # so can ssh, and scp into the machine

scp * dave@xps:wordpress/.
scp docker-compose.yml uploads.ini wp-config.php dave@xps:wordpress/.

top

pwd
ls -lat
ps -ef
kill -9 1234

rm -rf *
chmod -777 *

cat /proc/version
uname -a
lsb_release -a

sudo adduser bob

reboot now  
sudo su
```
## Tools
```
# A nice verison of top showing all processors
sudo apt-get install htop
sudo apt-get install iotop
sudo iotop
```


### Installing Docker
Installing Docker](/docker/2018/02/01/Wordpress-on-Docker.html#going-to-uat--production)

### Installing Dot Net Core
[Microsoft](https://www.microsoft.com/net/learn/get-started/windows#linuxubuntu)

### Installing Ubuntu Server
[https://www.ubuntu.com/download/server](https://www.ubuntu.com/download/server)

[Install instructions](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-windows#1) using Rufus to create a bootable USB stick.

