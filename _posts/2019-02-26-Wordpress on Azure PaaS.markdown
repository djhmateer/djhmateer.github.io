---
layout: post
title: Wordpress on Azure PaaS 
menu: review
categories: wordpress 
published: true 
comments: false
sitemap: false
---
To install Wordpress on Azure PaaS:

## Azure App Service
Create App Service Plan in own resource group eg DaveWebsites
 create App Service eg davemateercom   
 create default Application Insights
 app settings change to PHP7.2

## MySQL
Create MySQL database in own resource group eg DaveWebsitesMySQL
  db name could be: davemysql.mysql.database.azure.com  

![ps](/assets/2019-02-26/3.jpg)  
Allow access for Azure services, and Disable Enforce SSL  

Cloud shell for:
```bash
# be very careful when pasting into cloud shell no space after the p
# a good password is asdflkj23989$$$
# other characters can interfere with bash
mysql --host davexxxx.mysql.database.azure.com --user davexxxx@davexxx -p
create database davemateercom;
```

## Wordpress
Download [Wordpress](https://en-gb.wordpress.org/download/) and unzip in a local folder  

Setup remote repo eg [GitHub](https://github.com), [BitBucket](https://bitbucket.org) or [Azure Devops](https://azure.microsoft.com/en-gb/services/devops/)  

```bash
cd c:\dev\davemateercom
#copy all wordpress files in here
git init
git add .
git commit -m "init"

git remote add origin https://xxxxx.visualstudio.com/davemateercomxxxxx/_git/davemateercomxxxxx
git push -u origin --all
```

## Deployment Center
Setup app service deployment center in Azure
![ps](/assets/2019-02-26/1.jpg)  
App Service Kudu Build server

![ps](/assets/2019-02-26/2.jpg)  

Then link the local git repo to the new remote. To be clear we have 2 remotes now. One is the live website, the other is GitHub or BitBucket..

```bash
git remote add qnrlcom https://$qnrlcom@qnrlcom.scm.azurewebsites.net:443/qnrlcom.git
```

## Wp-config.php
This is an easy way of configuring Wordpress, although it would be much better to store the connection string in Azure.

edit wp-config.php  
if this is first time rename wp-config-sample.php to wp-config.php  
edit MySQL settings   
edit Unique keys and salts using [this url](https://api.wordpress.org/secret-key/1.1/salt/)  
add this to the bottom of wp-config.php  

```php
// value of post_max_size must be large that upload
@ini_set( 'upload_max_filesize' , '512M' );
@ini_set( 'post_max_size', '512M');
@ini_set( 'memory_limit', '256M' );
@ini_set( 'max_execution_time', '300' );
@ini_set( 'max_input_time', '300' );
```

go to the website and put in some test values for username and password (as I'm usually restoring a backup)

## All in One WP Migration
This is a very useful tool to transfer entire websites (eg all files and db)
![ps](/assets/2019-02-26/4.jpg)  

To set the upload_max_filesize in Azure it seems you need the .ini file there too.  [All in One Docs](https://help.servmask.com/2018/10/27/how-to-increase-maximum-upload-file-size-in-wordpress/)

[Microsoft Link](https://blogs.msdn.microsoft.com/azureossds/2016/06/15/uploading-large-files-to-azure-web-apps/)  

![ps](/assets/2019-02-26/5.jpg)  

touch .user.ini
```bash
# post size must be bigger than upload
upload_max_filesize = 512M
post_max_size = 512M
```
![ps](/assets/2019-02-26/6.jpg)  

## WP Super Cache


## SSL setup