---
layout: post
title:  Ubuntu for the Windows User
categories: Ubuntu Linux 
published: true 
redirect_from: ubuntu/2018/02/21/Ubuntu-for-the-Windows-User.html 
sitemap: true
---
Here are my most used commands in Linux.  Current favoured distibution is Ubuntu Server 16.04.3 LTS (Xenial Xerus).

```bash
# apt-get is the lower level, apt is meant to be more pleasant!

sudo apt update        # updates packages
sudo apt --upgradeable  # shows list
sudo apt upgrade        # does the upgrade


apt-get update    # updates the package lists
apt-get upgrade   # upgrades current packages
apt-get dist-upgrade  # distribution updates

apt-get install openssh-server  # so can ssh, and scp into the machine

# copy to the linux machine
scp * dave@xps:wordpress/.
scp docker-compose.yml uploads.ini wp-config.php dave@xps:wordpress/.

# copy from the linux machine
-p preserving date
-r recurse
scp -rp azureuser@testmachine.westeurope.cloudapp.azure.com:/var/log/apache2/* .

top
df -h  # check disk usage

tar cc
tar xvf

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

## Azure CLI

[One line from MS Docs to install AzureCLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest#install) and [Drupal and AzureCLI](/2019/05/28/Hosting-Drupal-on-Azure).

If you come across file lock issues - debconf dbdriver config dat is locked by another process, try [this link](https://askubuntu.com/questions/136881/debconf-dbdriver-config-config-dat-is-locked-by-another-process-resource-t) which tells you to find the process then kill it.

```bash
sudo fuser -v /var/cache/debconf/config.dat
kill PID
```

## Tools

```bash
# A nice verison of top showing all processors
sudo apt-get install htop
sudo apt-get install iotop
sudo iotop
```

### Installing Docker

[Installing Docker](/docker/2018/02/01/Wordpress-on-Docker.html#going-to-uat--production)

### Installing Dot Net Core

[Microsoft](https://www.microsoft.com/net/learn/get-started/windows#linuxubuntu)

### Installing Ubuntu Server

[https://www.ubuntu.com/download/server](https://www.ubuntu.com/download/server)

[Install instructions](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-windows#1) using Rufus to create a bootable USB stick.

