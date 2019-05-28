---
layout: post
title: Hosting Drupal on Azure IaaS using Azure CLI
description: 
menu: review
categories: Drupal Azure AzureCLI
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

![alt text](/assets/2019-03-06/1.png "Cloud strategies"){:width="500px"}     

However the comparable performance on a backend admin screen was:

- 14secs to load (full VM power, and full MySQL hosted)
- 4secs on a VM  

The most likely cause is the underlying shared filesystem performance as [discussed here](https://www.reddit.com/r/AZURE/comments/79mx4k/basic_wordpress_website_super_slow_even_with/) and [here](https://drupal.stackexchange.com/questions/256514/performance-is-notoriously-slow).  

We couldn't make the backend admin site usable.  

## Using IaaS (Infrastructure as a Service) ie a VM and AZ CLI
I am a big fan of the [Azure CLI](/2018/02/15/Azure-CLI) so used scripting to make the process as repeatable as possible (Infrastructure as Code).

I generally write bash shell scripts and run them from Windows WSL. This seems to be an easy path with lots of help on the web. To install and update the Azure CLI from WSL there is a [handy 1 liner](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest#install).  

Once installed and logging in:

```bash
az login
# -- useful if you need to change subscription 
# -- az account set --subscription "Visual Studio Enterprise"
# Useful as a sanity check to make sure you are in the right subscription
az group list
```

### AZ CLI
Now lets make a basic Ubuntu LTS (currently 18.04.2) VM to login to:

```bash

```
I have seen nsg rules eg port 80 look like they have completed, but in fact they can't be seen on the UI, and don't seem to have been successful.  



Be careful of any unusual characters in passwords eg $ which can cause bash conflicts  

### Unix Line Endings
Also be careful that text files having unix style line endings. A useful command to fix these are:

```bash

```
### Connect to VM
Lets connect into this VM:

```
ssh azureuser@ukfinancedrupaltest1.westeurope.cloudapp.azure.com
```
If you see an error 'WARNING: POSSIBLE DNS SPOOFING DETECTED!' this could mean that you've used this hostname before. I increment the number at the end and spin up and down infrastructure quickly. The solution is to delete the entry from: `C:\Users\davidma\.ssh\known_hosts`

### Install Apache, PHP7 manually 
Lets install software. This may change with future versions of Ubuntu, as I originally started with 16.04 LTS. Some [simple instructions are here](https://vitux.com/how-to-install-php5-and-php7-on-ubuntu-18-04-lts/) and [Drupal specific on 16.04](https://websiteforstudents.com/install-drupal-cms-on-ubuntu-16-04-lts-with-apache2-mariadb-php-7-1-and-lets-encrypt-ssl-tls/)  

```bash
sudo apt update
# -y = Automatic yes to prompts
sudo apt install apache2 -y
sudo systemctl stop apache2.service
sudo systemctl start apache2.service
sudo systemctl enable apache2.service
sudo apt-get install software-properties-common -y
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install php7.1 libapache2-mod-php7.1 php7.1-common php7.1-mbstring php7.1-xmlrpc php7.1-soap php7.1-gd php7.1-xml php7.1-intl php7.1-mysql php7.1-cli php7.1-mcrypt php7.1-zip php7.1-curl -y
# so we can test PHP
sudo sh -c 'echo "<?php phpinfo(); ?>" > /var/www/html/info.php'
```
Now if go to your [ukfinancedrupaltest2.westeurope.cloudapp.azure.com](http://ukfinancedrupaltest2.westeurope.cloudapp.azure.com) you should see 

![alt text](/assets/2019-05-27/2.png "Apache2 Default Page"){:width="500px"}     
also the [test php](http://ukfinancedrupaltest2.westeurope.cloudapp.azure.com/info.php) should give a test screen  

I have seen commands silently fail, so be careful!

## Use Cloud Init to automatically provision the VM
This is in the same vein as Puppet or Chef

### Database
And a database
```bash

```

## Using hosted Azure MySQL 
This works well. However you are charged egress from the database - see [Do I incur any network data transfer charges](https://azure.microsoft.com/en-gb/pricing/details/mysql/#faq), and Drupal in very database heavy.  Database has a rolling 7 day backup strategy, and we have tested the rollback which works very well. 

## Drupal Caching
To avoid a lot of database egress traffic charges, there is a standard Drupal caching plugin which works well.

## Failover and Blue/Green Resilience
asdf

## 3rd Party Hosting
Very attractive to look at these. We'd need to make sure that crontab jobs are available for our jobs which require updates.

[druplal.org/hosting/enterprise](https://www.drupal.org/hosting/enterprise) list of enterprise hosting
[Platform.sh](https://platform.sh/pricing/)  - have a London Office.  
[ixis](https://ixis.co.uk/contact) - Manchester  

