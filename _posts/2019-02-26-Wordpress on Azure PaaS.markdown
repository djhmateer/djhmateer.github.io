---
layout: post
title: Wordpress on Azure PaaS 
menu: review
categories: wordpress 
published: true 
comments: false
sitemap: false
---
Install [Wordpress](https://en-gb.wordpress.org/download/) on Azure Windows PaaS (Platform as a Service):  

I have [written a lot on different Wordpress hosting options in Azure](/2018/06/18/Azure-Hosting-Wordpress-Win-Linux-Docker), backed up with years of trying different options and the evolution of Azure. 

Here I'm going to cover:
- Azure App Server
- MySQL setup
- Wordpress
- Deploying via local git
- wp-config.php
- .user.ini
- All in One WP Migration
- WP Super Cache
- SSL

## Azure App Service
Create an App Service Plan in it's own resource group eg DaveWebsites  

Create an App Service eg davemateercom  using the default Application Insights settings

Change app settings PHP7.2

## MySQL
Create a hosted MySQL database in own resource group eg DaveWebsitesMySQL  

db name could be: davemysql.mysql.database.azure.com  

![ps](/assets/2019-02-26/3.jpg)  
Allow access for Azure services, and Disable Enforce SSL  

Cloud shell for:
```bash
# be very careful when pasting into cloud shell no space after the p
# a good password is asdflkj23989$$$
# other characters can interfere with bash
mysql --host davexxxx.mysql.database.azure.com --user davexxxx@davexxx -p
# create a databasename the same as the website app service
create database davemateercom;
```

## Wordpress
Download [Wordpress](https://en-gb.wordpress.org/download/) and unzip in a local folder  

Setup a remote repo eg [GitHub](https://github.com), [BitBucket](https://bitbucket.org) or [Azure Devops](https://azure.microsoft.com/en-gb/services/devops/). This is to store the files, and is not part of the deployment pipeline.

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
Then select the App Service Kudu Build server

![ps](/assets/2019-02-26/2.jpg)  

Then link the local git repo to the new remote. To be clear we have 2 remotes now. One is the live website, the other is GitHub or BitBucket..

```bash
git remote add qnrlcom https://$qnrlcom@qnrlcom.scm.azurewebsites.net:443/qnrlcom.git
```
Notice the $qnrlcom username  

If you type in the wrong password see [here to clear the local windows cache](/2018/11/07/Azure-Functions-to-Count-Downloads-from-Blob-Storage#deploy-using-local-git)

## wp-config.php 

Edit wp-config.php locally   
if this is first time rename wp-config-sample.php to wp-config.php   
edit MySQL settings putting in dbname, username etc..   
edit Unique keys and [salts using this url](https://api.wordpress.org/secret-key/1.1/salt/)    

if updating this file and using WP Super Cache, put these lines in too
```php
// the WP Super Cache plugin usually puts these in for us, but easier to keep in source control
define( 'WPCACHEHOME', 'D:\home\site\wwwroot\wp-content\plugins\wp-super-cache/' );
define('WP_CACHE', true);
```

Some documentation suggest putting int @ini_set in wp_config. I found using .user.ini to work as show in the next section.  

```php
// value of post_max_size must be large that upload
// didn't seem to work from here
/*@ini_set( 'upload_max_filesize' , '512M' );
@ini_set( 'post_max_size', '512M');
@ini_set( 'memory_limit', '256M' );
@ini_set( 'max_execution_time', '300' );
@ini_set( 'max_input_time', '300' );
*/
```

## .user.ini
[Official Documentation](https://docs.microsoft.com/en-us/azure/app-service/web-sites-php-configure)  

Rather than generating the file on the server, I keep it in source on 

App Service, Advanced Tools, Kudu, Debug console, CMD
```bash
# /site/wwwroot/
# touch .user.ini (had to do it twice before it worked)

upload_max_filesize = 256M
post_max_size = 512M
memory_limit = 256M
max_execution_time = 300
max_input_time = 300

; Example Settings
;display_errors=On
 
; OPTIONAL: Turn this on to write errors to d:\home\LogFiles\php_errors.log
log_errors=On
```

Restarting the app is important to get it to read as 5 minutes cache.

## PHP Errors 
Turn on php log_errors shown above  
/LogFiles
![ps](/assets/2019-02-26/8.jpg)  
php errors  

## Diagnostic Logs and Log Stream
Turn on Diagnostics Logs

![ps](/assets/2019-02-26/9.jpg)  

Go to log stream:


## web.config
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
      <staticContent> 
        <mimeMap fileExtension=".woff" mimeType="application/x-font-woff" /> 
      </staticContent>
      <security>
        <requestFiltering>
         <!-- This will handle requests up to 700MB (CD700) -->
         <requestLimits maxAllowedContentLength="737280000" />
      </requestFiltering>
    </security>
    <rewrite>
      <rules>
	<rule name="WordPress: https://davexxxxxxx.azurewebsites.net" patternSyntax="Wildcard">
		<match url="*"/>
			<conditions>
				<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
				<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true"/>
			</conditions>
		<action type="Rewrite" url="index.php"/>
	</rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

woff is to stop 404.3 errors which happened on admin dashboard for missing mimetypes - fonts.  

maxAllowedContentLength is so I can upload large (300MB) files to the All in One WP Migration plugin. This is to do a restore of a site.  

The other rewrite section was written in by default by Azure.
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