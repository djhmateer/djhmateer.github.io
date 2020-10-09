---
layout: post
title: Wordpress install on VM using cloud-init 
description: How to install Wordpress on a single VM using automated Azure CLI and Cloud-init
#menu: review
categories: wordpress cloud-init
published: true 
comments: true     
sitemap: true
image: /assets/2020-10-05/hoverfly.jpg
---

<!-- ![alt text](/assets/2020-10-05/hoverfly.jpg "Hoverly"){:width="600px"} -->
![alt text](/assets/2020-10-05/hoverfly.jpg "Hoverly")

Gorgeous hoverfly eggs (look like rice) and 2 larvae!

[Source code for this guide](https://github.com/djhmateer/hoverfly-website)

I look after a low traffic niche Wordpress site [hoverflylagoons.co.uk](https://hoverflylagoons.co.uk) for my wife.

After years of frustration with 3rd party hosters (Siteground and Bluehost) I decided to try hosting it myself

A simple VM on Azure with [LAMP](https://stackoverflow.com/questions/10060285/what-is-a-lamp-stack) stack on it.

Yes, that simple!

What no [PaaS](https://www.infoworld.com/article/3223434/what-is-paas-software-development-in-the-cloud.html) or [FaaS](https://en.wikipedia.org/wiki/Function_as_a_service) or [Docker](https://www.docker.com/) / [K8s](https://kubernetes.io/)? 

Nope.

But what about backups and updating?

The script below will build a brand new Ubuntu LTS VM, and give me a working wordpress install with all the latest required versions of dependencies.

I then switch DNS (using [Cloudlare](https://www.cloudflare.com/en-gb/) which does the SSL cert too), then apply the last backup from the live site.

## Azure CLI and Cloud-init scripts

<!-- ![alt text](/assets/2020-10-05/script.jpg "Runnign the bash script"){:width="600px"} -->
![alt text](/assets/2020-10-05/script.jpg "Running the bash script")

Above I am using the new Windows Terminal running Ubuntu, calling the `infra.azcli` bash script which is using the Azure CLI to build a VM, then run script on that new VM.

Below is part of the Azure CLI script source: 

![alt text](/assets/2020-10-05/source.jpg "Source")

[Clone the Source](https://github.com/djhmateer/hoverfly-website)

## DNS

Here is the cloudflare dashboard where I'm switching over to the new VM:

<!-- ![alt text](/assets/2020-10-05/cloudflare.jpg "Cloudflare"){:width="600px"} -->
![alt text](/assets/2020-10-05/cloudflare.jpg "Cloudflare"){:width="600px"}

CNAME to: hoverflytest435.westeurope.cloudapp.azure.com

## A Blank Up to Date Wordpress Site in 5 minutes

<!-- ![alt text](/assets/2020-10-05/wordpress-hello-world.jpg "A blank website"){:width="600px"} -->
![alt text](/assets/2020-10-05/wordpress-hello-world.jpg "A blank website")

I sign in with the newly created credentials:

admin: dave

password: letmein

So we have a fully patched brand new VM with a fully patched blank Wordpress site in 5 minutes.

![alt text](/assets/2020-10-05/all-in-one-migration.jpg "All in one migration installed")

[All in One WP Migration](https://en-gb.wordpress.org/plugins/all-in-one-wp-migration/) already installed

512MB upload limit is patched in using a customised `PHP.ini` file.

Now just import the latest version of the site and you are ready to go!

To connect directly to the VM from Windows Terminal using ssh keys:

```bash
./sshCurrentVm.sh
```

## Site Health

<!-- ![alt text](/assets/2020-10-05/site-health.jpg "Site Health"){:width="600px"} -->
![alt text](/assets/2020-10-05/site-health.jpg "Site Health")

Very useful screen to make sure the site is up to date.

## Size of VM and running out of RAM

![alt text](/assets/2020-10-05/swap.jpg "Hitting swap file")

This VM is a low powered 1GB OF RAM so it is possible to flood it and run out of memory, but it behaves as expected, swaps to disk and recovers after a while. I'm fine with that.

## Conclusion

Using the IaaS strategy of throwing away infrastructure works for me, gives me great control, amazing speed, and is cheap. It also means I don't have to deal with support from 3rd party hosters!

Time to go and admire some more [Gorgeous hoverfly larvae!](https://hoverflylagoons.co.uk/) :-)

## And one more thing

To give an idea of the `cloud-init` build script here it is, comments and all.

```yaml
#cloud-config
# /var/log/cloud-init-output.log - cloud init logs (this script)

# /etc/apache2/sites-available
# /var/www/html
# sudo systemctl restart apache

# how to copy files off server
# scp dave@hoverflytest39.westeurope.cloudapp.azure.com:/home/dave/php.ini .

# https://www.journaldev.com/24954/install-wordpress-on-ubuntu  (suggests Maria)
# https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04
package_upgrade: true
runcmd:
  # Apache
  - sudo apt update -y
  - sudo apt install apache2 -y

  # get helper files from repo
  - cd /home/dave
  - sudo git clone https://github.com/djhmateer/hoverfly-website.git source

  # AllowOverride in web root for url rewriting
  - sudo cp /home/dave/source/infra/000-default.conf /etc/apache2/sites-available
  # cloudflare connects on SSL (even though we're using the default self signed ssl)
  - sudo cp /home/dave/source/infra/default-ssl.conf /etc/apache2/sites-available

  - sudo a2enmod rewrite
  - sudo a2enmod ssl
  - sudo a2ensite default-ssl.conf
  - sudo service apache2 restart

  # Mysql
  - sudo apt install mysql-server -y

  # should i do this?
  #- sudo mysql_secure_installation

  - sudo mysql -e "CREATE DATABASE wordpress;"
  - sudo mysql -e "CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'password';"
  - sudo mysql -e "GRANT ALL ON wordpress.* TO 'wp_user'@'localhost' IDENTIFIED BY 'password';"
  - sudo mysql -e "FLUSH PRIVILEGES;"

  # PHP7.4
  - sudo apt-get update
  - sudo apt install software-properties-common -y
  - sudo add-apt-repository ppa:ondrej/php -y
  - sudo apt-get update

  # PHP - this installs 7.2.24
  #- sudo apt install php libapache2-mod-php php-mysql -y

  - sudo apt install php7.4 libapache2-mod-php php-mysql -y
  - sudo apt install php-curl php-gd php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip -y
  - sudo apt install imagemagick -y
  - sudo apt install php-imagick -y

  # settings needed for wp all in one website import
  # https://help.servmask.com/2018/10/27/how-to-increase-maximum-upload-file-size-in-wordpress/
  # .htaccess works, but not auto generated until after wordpress starts
  # wp-config.php putting in settings didn't work for me
  # **WILL NEED TO PATCH IN NEW VERSION WHEN NEW VERSION OF PHP**
  # - cd /etc/php/7.2/apache2
  - cd /etc/php/7.4/apache2
  - sudo cp php.ini phpoldini.txt
  - sudo cp /home/dave/source/infra/php74.ini /etc/php/7.4/apache2/php.ini

  # delete the apache default index.html
  - sudo rm /var/www/html/index.html
  - sudo cp /home/dave/source/infra/info.php /var/www/html/

  # checks for syntax errors in apache conf
  - sudo apache2ctl configtest
  - sudo systemctl restart apache2

  # Wordpress CLI
  # https://www.linode.com/docs/websites/cms/wordpress/install-wordpress-using-wp-cli-on-ubuntu-18-04/
  - cd ~ 
  - sudo curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
  - sudo chmod +x wp-cli.phar
  - sudo mv wp-cli.phar /usr/local/bin/wp

  - cd /var/www/
  - sudo chown -R www-data:www-data html
  - cd html
  - sudo -u www-data wp core download
  - sudo -u www-data wp core config --dbname='wordpress' --dbuser='wp_user' --dbpass='password' --dbhost='localhost' --dbprefix='wp_'

  - sudo chmod -R 755 /var/www/html/wp-content

  # I need the domain name eg http://hoverflytest427.westeurope.cloudapp.azure.com/
  # - sudo chmod 777 /home/dave/source/infra/wpcoreinstall.sh
  # - sudo -u www-data /home/dave/source/infra/wpcoreinstall.sh
  - sudo -u www-data wp core install --url='https://hoverflylagoons.co.uk' --title='Blog Title' --admin_user='dave' --admin_password='letmein' --admin_email='email@domain.com'

  # plugins
  - sudo -u www-data wp plugin install all-in-one-wp-migration --activate  

  # all in one file extension
  - cd ~
  - sudo curl -O https://import.wp-migration.com/all-in-one-wp-migration-file-extension.zip
  - sudo -u www-data mv all-in-one-wp-migration-file-extension.zip /var/www/html
  - sudo -u www-data wp plugin install all-in-one-wp-migration-file-extension.zip --activate

  # wp mail smtp (I'll bring this in through the restore so don't need to do here)
  #- sudo -u www-data wp plugin install wp-mail-smtp --activate

  # maybe don't need to restart?
  - sudo systemctl restart apache2

final_message: "The system is finally up, after $UPTIME seconds"

  #
  # Bashtop
  #
  # - echo "deb http://packages.azlux.fr/debian/ buster main" | sudo tee /etc/apt/sources.list.d/azlux.list
  # - sudo wget -qO - https://azlux.fr/repo.gpg.key | sudo apt-key add -
  # - sudo apt update -y
  # - sudo apt install bashtop -y

# make a quick test page to signify that the server is ready to go
  # - cd /var/www/cookie-dave-web
  # - echo "Healthy" > healthcheck.html

# OS updates need a reboot?
  # - sudo reboot now

```
