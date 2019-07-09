---
layout: post
title: Hosting Drupal on Azure IaaS using Azure CLI
description: 
menu: review
categories: Drupal Azure AzureCLI sed
published: true 
comments: false
sitemap: false
image: /assets/2019-05-27/1.png
---

I've blogged on hosting [Wordpress on Azure PaaS](https://davemateer.com/2019/02/26/Wordpress-on-Azure-PaaS) and [Many different Azure options for hosting Wordpress](https://davemateer.com/2018/06/18/Azure-Hosting-Wordpress-Win-Linux-Docker).   

So when I was asked to find [Drupal](https://www.drupal.org/) hosting for an enterprise customer which had to be on Azure, I tried the same strategy.  

[All source listed here is on GitHub](https://github.com/djhmateer/AzureVMDrupal)

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
Now lets make a basic Ubuntu LTS (currently 18.04.2) VM:

```bash
# infra.sh in the demo repo
#!/bin/bash

# activate debugging from here
set -x

rg=DaveDrupalTEST1
dnsname=davedrupaltest1
vmname=davedrupaltest

region=westeurope
vnet=vnet
subnet=subnet
publicIPName=publicIP
nsgname=nsg
nicName=nic
image=UbuntuLTS
adminusername=azureuser
adminpassword=zp1234567890TEST

###
# Create VNET #
###
echo "-= Creating Resource Group ${rg} "
az group create \
   --name ${rg} \
   --location ${region}

az network vnet create \
    --resource-group ${rg} \
    --name ${vnet} \
    --address-prefix 192.168.0.0/16 \
    --subnet-name ${subnet} \
    --subnet-prefix 192.168.1.0/24

az network public-ip create \
    --resource-group ${rg} \
    --name ${publicIPName} \
    --dns-name ${dnsname}

az network nsg create \
    --resource-group ${rg} \
    --name ${nsgname}

# allow ssh
az network nsg rule create \
    --resource-group ${rg} \
    --nsg-name ${nsgname} \
    --name nsgGroupRuleSSH \
    --protocol tcp \
    --priority 1000 \
    --destination-port-range 22 \
    --access allow

# allow port 80
az network nsg rule create \
    --resource-group ${rg} \
    --nsg-name ${nsgname} \
    --name nsgGroupRuleWeb80 \
    --protocol tcp \
    --priority 1001 \
    --destination-port-range 80 \
    --access allow

# allow port 443
az network nsg rule create \
    --resource-group ${rg} \
    --nsg-name ${nsgname} \
    --name nsgGroupRuleWeb443 \
    --protocol tcp \
    --priority 1002 \
    --destination-port-range 443 \
    --access allow

#create a virtual nic
az network nic create \
    --resource-group ${rg} \
    --name ${nicName} \
    --vnet-name ${vnet} \
    --subnet ${subnet} \
    --public-ip-address ${publicIPName} \
    --network-security-group ${nsgname}

#create vm
az vm create \
    --resource-group ${rg} \
    --name ${vmname} \
    --location ${region} \
    --nics ${nicName} \
    --image ${image} \
    --admin-username ${adminusername} \
    --admin-password ${adminpassword} \
    --custom-data cloud-init.txt 

```
Notice the custom-data at the end, which is cloud-init (see below)  

Be careful of any unusual characters in passwords eg $ which can cause bash conflicts  

### Fix Line Endings with sed
Also be careful that text files having unix style line endings. A useful command to fix these are:

```bash
sed -i 's/\r$//' *.sh
```
### Test connect to the VM
Lets connect into this VM:

```
ssh azureuser@davedrupaltest1.westeurope.cloudapp.azure.com
```
If you see an error 'WARNING: POSSIBLE DNS SPOOFING DETECTED!' this could mean that you've used this hostname before. I increment the number at the end and spin up and down infrastructure quickly. The solution is to delete the entry from: `C:\Users\davidma\.ssh\known_hosts`

### Install Apache, PHP7 manually (don't do this!)
Use cloud-init - see below.  

Lets install software. This may change with future versions of Ubuntu, as I originally started with 16.04 LTS. Some [simple instructions are here](https://vitux.com/how-to-install-php5-and-php7-on-ubuntu-18-04-lts/) and [Drupal specific on 16.04](https://websiteforstudents.com/install-drupal-cms-on-ubuntu-16-04-lts-with-apache2-mariadb-php-7-1-and-lets-encrypt-ssl-tls/)  

```bash
sudo apt update
sudo apt install apache2 -y
sudo systemctl stop apache2.service
sudo systemctl start apache2.service
sudo systemctl enable apache2.service
sudo apt-get install software-properties-common -y
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install php7.1 libapache2-mod-php7.1 php7.1-common php7.1-mbstring php7.1-xmlrpc php7.1-soap php7.1-gd php7.1-xml php7.1-intl php7.1-mysql php7.1-cli php7.1-mcrypt php7.1-zip php7.1-curl -y
sudo sh -c 'echo "<?php phpinfo(); ?>" > /var/www/html/info.php'
```
Now if go to your [davedrupaltest1.westeurope.cloudapp.azure.com](http://davedrupaltest1.westeurope.cloudapp.azure.com) you should see 

![alt text](/assets/2019-05-27/2.png "Apache2 Default Page"){:width="500px"}     
also the [test php](http://davedrupaltest1.westeurope.cloudapp.azure.com/info.php) should give a test screen  

I have seen commands silently fail, so be careful!

## Use Cloud Init to automatically provision the VM (do this!)
[cloud-init](https://cloud-init.io/) is in the same vein as Puppet or Chef ie it helps automating software installation on VM. [it is supported on Azure VM deployment](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-automate-vm-deployment)

```bash
# cloud-ini.txt in the repo
#cloud-config
package_upgrade: true
packages:
  - apache2
runcmd:
  - apt-get install software-properties-common -y
  - sudo add-apt-repository ppa:ondrej/php -y
  - sudo apt update
  - sudo apt install php7.1 libapache2-mod-php7.1 php7.1-common php7.1-mbstring php7.1-xmlrpc php7.1-soap php7.1-gd php7.1-xml php7.1-intl php7.1-mysql php7.1-cli php7.1-mcrypt php7.1-zip php7.1-curl -y
  - sudo sh -c 'echo "<?php phpinfo(); ?>" > /var/www/html/info.php'

```

### Database
And a database connection
```bash
#!/bin/bash

# activate debugging from here
set -x

rg=DaveMysqlTEST1
region=westeurope

# db name must be unique 
mysqlserver=davetestx
sqladmin=adminusernamex
sqlpassword=password123456789TK

echo "create resource group ${rg}"
az group create \
   --name ${rg} \
   --location ${region}

# SKUs are developer is B_Gen5_1, prod is GP_Gen5_2
echo "create mysql server"
az mysql server create \
    --resource-group ${rg} \
    --name ${mysqlserver} \
    --location ${region} \
    --admin-user ${sqladmin} \
    --admin-password ${sqlpassword} \
    --sku-name GP_Gen5_2 \
    --ssl-enforcement Disabled \
    --version 5.7
    --storage-size 50000

#configure firewalls
echo "begin azure firewall"
az mysql server firewall-rule create \
    --name allAzureIPs \
    --server ${mysqlserver} \
    --resource-group ${rg} \
    --start-ip-address 0.0.0.0 \
    --end-ip-address 0.0.0.0

echo "end azure firewall"
```

### Manual Steps
I am using [Drupal 7.67 which can be downloaded here](https://www.drupal.org/project/drupal) or clone it straight onto the webserver.  
```bash
# Add to the end of the php.ini
sudo vim /etc/php/7.1/apache2/php.ini

memory_limit = 512M 
upload_max_filesize = 512M
max_execution_time = 360
date.timezone = Europe/London

sudo systemctl restart apache2.service

cd /var/www/html

# useful to get drupal on the webserver quickly
git clone --branch 7.x https://git.drupalcode.org/project/drupal.git .

# Never leave like this in production!
chmod -R 777 .

# create the settings.php file
cd sites/default
cp default.settings.php settings.php
# https://www.drupal.org/docs/7/install/step-3-create-settingsphp-and-the-files-directory
chmod 755 settings.php
vim settings.php
# around line 247 to avoid having to use the UI, you can do this
$databases = array (
  'default' =>
  array (
    'default' =>
    array (
      'database' => 'davetest',
      'username' => 'adminusernamex@davetestx',
      'password' => 'password123456789TKT',
      'host' => 'davetestx.mysql.database.azure.com',
      'port' => '',
      'driver' => 'mysql',
      'prefix' => '',
    ),
  ),
);

cd ..
# need this to be correct as can't do configuration / caching properly
chmod 644 default

# create a cloud shell and create the database
mysql --host davetestx.mysql.database.azure.com --user adminusernamex@davetestx -p 
password123456789TKT
create database davetest;

# next steps are optional to create a separate VirtualHost
# or could put the site in default root ie /var/www/html
sudo mkdir davetest

#git clone xxxxxx - # your source drupal repo here
# use the PAT (Personal Access Token) method eg u: davemateer@gmail.com p: pat

# setup a 
sudo nano /etc/apache2/sites-available/davetest.conf

<VirtualHost *:80>
     ServerAdmin admin@example.com
     DocumentRoot /var/www/html/davetest/public_html
     ServerName davetest.westeurope.cloudapp.azure.com
     ServerAlias davetest.westeurope.cloudapp.azure.com

     ErrorLog ${APACHE_LOG_DIR}/error.log
     CustomLog ${APACHE_LOG_DIR}/access.log combined

      <Directory /var/www/html/davetest/public_html/>
            Options FollowSymlinks
            AllowOverride All
            Require all granted
      </Directory>

      <Directory /var/www/html/davetest/public_html/>
            RewriteEngine on
            RewriteBase /
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule ^(.*)$ index.php?q=$1 [L,QSA]
      </Directory>
</VirtualHost>

sudo systemctl restart apache2.service
sudo a2ensite davetest.conf
sudo a2enmod rewrite
sudo a2enmod env
sudo a2enmod dir
sudo a2enmod mime

sudo systemctl restart apache2.service

# need to wire up the database connection settings in Drupal here if not done already
```
![alt text](/assets/2019-05-27/3.png "Installing Drupal 7"){:width="400px"}     
Handy to use the UI to put in the database settings.

![alt text](/assets/2019-05-27/4.png "Clean install of Drupal 7"){:width="500px"}     
Clean install of Drupal 7

## Using hosted Azure MySQL 
This works well. ~~However you are charged egress from the database - see~~ [Do I incur any network data transfer charges](https://azure.microsoft.com/en-gb/pricing/details/mysql/#faq).  egress is only charged if the data leaves the Azure network.

Database has a rolling 7 day backup strategy, and we have tested the rollback which works very well. 

## Restoring from an existing db
The Azure Cloud shell is very useful. Be careful with passwords for the MySQL instance - $ and % can trip up (and need to be escaped). 

```bash
# dump out db
mysqldump --host olddb.mysql.database.azure.com  --user adminusername@olddb  -p olddbname > output.sql

# I then use the very handy download file tool from Azure Cloud Shell

# restore
mysql --host davetestx.mysql.database.azure.com --user adminusernamex@davetestx -p davetest < output.sql
password123456789TK
```

## Drupal Caching
To avoid a lot of database egress traffic charges, there is a standard Drupal caching plugin which works well.

![alt text](/assets/2019-05-27/5.png "Turn on caching"){:width="500px"}     

![alt text](/assets/2019-05-27/6.png "A cache hit"){:width="500px"}     
Browser requested the page, and drupal served from its cache ie didn't hit the database

![alt text](/assets/2019-05-27/7.png "A browser cache hit"){:width="500px"}     
Browser served pages from its own cache as got a 304 

Remember when testing the cache to not be logged in, as we never want any sort of admin user to be hitting the cache and seeing out of date content.  

![alt text](/assets/2019-05-27/9.png "Turn off errors"){:width="500px"}     
Turn off errors! If you get `cache MISS` then it could be due to errors in the site. [This blog post](https://www.jeffgeerling.com/blogs/jeff-geerling/always-getting-x-drupal-cache) was very helpful.

![alt text](/assets/2019-05-27/8.png "IP Geolocation turned off"){:width="500px"}     
We found IP Geolocation causing SESS cookie problems for anonymous users:  [article here](http://redcrackle.com/blog/how-detect-which-module-creates-session-cookie)

## SSL with Lets-Encrypt
We have used [certbot](https://certbot.eff.org/lets-encrypt/ubuntuxenial-apache) and [external tools](/2019/03/01/Lets-Encrypt) to monitor if the cert is about to run out (hence certbot may need looking at)

## Failover and Blue/Green Resilience
I was asked to look into how to host a Drupal 7 site and have 

- High Availability (fault tolerant) if one webserver went down (we had an outage due to memory issues)
- Updated scenario - a Blue/Green scenario where we could patch the 'offline' webserver


- [Overview of Azure Load Balancer](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-overview) and [SKU comparison](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-overview#skus) has a Basic and Standard, but is a *load balancer* and can't handle all traffic to 1 machine then failover to another

- [Azure Traffic Manager](https://docs.microsoft.com/en-us/azure/traffic-manager/traffic-manager-overview) is also a load balancer but can handle failover scenarios

[Blue-Green Deployments using Azure Traffic Manager](https://azure.microsoft.com/en-us/blog/blue-green-deployments-using-azure-traffic-manager/)  


![alt text](/assets/2019-05-27/10.png "HA and Blue Green"){:width="300px"}     
Azure Traffic Manager to handle routing between Blue and Green. Then Load Balancers are providing High Availability in each region (as these would be split).  Big thank you to RC for this.

A more simple design would be to have ATM and 2 VM's.



[Availability Sets ensure the VMs are distributed across isolated hardware clusters](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-availability-sets) is a normal thing to do. 

[Scale Sets allow you to deploy identical vms which auto-scale](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-create-vmss)

[Azure Load Balancer allows you to spread the load](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-load-balancer)

## 3rd Party Hosting
So as you can see it takes effort to host Drupal and to set it up. It also takes some significant resources/cost to run this per month, which makes 3rd party hosting a viable alternative. 

Very attractive to look at these. We'd need to make sure that crontab jobs are available for our jobs which require updates.

[druplal.org/hosting/enterprise](https://www.drupal.org/hosting/enterprise) list of enterprise hosting  

[Platform.sh](https://platform.sh/pricing/)  - have a London Office.  
[ixis](https://ixis.co.uk/contact) - Manchester  

