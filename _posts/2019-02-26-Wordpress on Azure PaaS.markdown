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

Check always on is on.

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

Rather than generating the file on the server I keep it in source control!

App Service, Advanced Tools, Kudu, Debug console, CMD
```bash
# /site/wwwroot/
# touch .user.ini (had to do it twice before it worked)

upload_max_filesize = 256M
# post size must be bigger than upload
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

Go to log stream and search for any obvious non 200 errors

## web.config
Again I put this file into source control.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
      <staticContent> 
        <!-- stop woff 404.3 errors on admin dashboard -->
        <mimeMap fileExtension=".woff" mimeType="application/x-font-woff" /> 
      </staticContent>
      <security>
        <requestFiltering>
        <!-- Allow upload of large files for restoring -->
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

## WP Super Cache
WP Super Cache will write this into the wp-config. Be careful when testing that you are not logged in, as by default this wont hit the cache.

```php
// the WP Super Cache plugin usually puts these in for us, but easier to keep in source control
define( 'WPCACHEHOME', 'D:\home\site\wwwroot\wp-content\plugins\wp-super-cache/' );
define('WP_CACHE', true);
```

then it will write files into /wwwroot/wp-content/cache/supercache/nameofsite.com
This plugin is in charge of the /cache directory

![ps](/assets/2019-02-26/11.jpg)  
I use 86400ms which is 1 day for the cache timeout.

![ps](/assets/2019-02-26/10.jpg)  
Chrome developer tools (F12) and initial page response is 2.8seconds. I am on a slow database which is the probable cause of that.

Go to a page and look at the source. You should see this:
```html
<!-- Dynamic page generated in 2.305 seconds. -->
<!-- Cached page generated by WP-Super-Cache on 2019-02-27 16:15:52 -->

<!-- super cache -->
```
![ps](/assets/2019-02-26/12.jpg)  
Ctrl F5 the page and we are now at 221ms (notice all the assets are being reloaded)


![ps](/assets/2019-02-26/13.jpg)  
Notice a problem here and not rendering. We are using Visual Builder. The trick is to save out a page, which runs the css minifier.


![ps](/assets/2019-02-26/14.jpg)  

In Summary for a 8.5MB homepage:
- no server file caching (5.8s)
- ctrl f5 no browser caching, and server caching on (1.4-4s)
- f5 browser caching of assets (760-900ms)

![ps](/assets/2019-02-26/15.jpg)  
We have not enabled sending 304 not modified (thus never getting a browser cached page), nor some of the other recommended features yet.

### IIS Caching
It seems that we go down from 250ms to 60ms after some reloads, so IIS is probably doing [Dynamic Output Caching](https://docs.microsoft.com/en-us/iis/overview/dynamic-caching-and-compression)

## Seeding the cache
It can take some some for the cache to be properly built. It is useful to know the final number of pages:  

![ps](/assets/2019-02-26/16.jpg)  

I have my own seeder, but it seems it doesn't always get all the pages, or the pages take a while to build
![ps](/assets/2019-02-26/17.jpg)  

after 2 runs I was back up to all pages cached.

![ps](/assets/2019-02-26/18.jpg)  
For debugging issues the log is excellent:

## Debugging

![ps](/assets/2019-02-26/22.jpg)  
I have *totally* broken the site by clicking on the enable debug option in WP Super Cache.

![ps](/assets/2019-02-26/20.jpg)  
Turned out the _ should be a $.

### wp-config.php
![ps](/assets/2019-02-26/21.jpg)  
I found this by changing wp-config.php

### .user.ini
```bash
upload_max_filesize = 512M
post_max_size = 512M
memory_limit = 256M
max_execution_time = 300
max_input_time = 300

; Example Settings
;display_errors=On
 
; OPTIONAL: Turn this on to write errors to d:\home\LogFiles\php_errors.log
log_errors=On
```
Because it was a php parse error it didn't show in my logs. [maybe this would help](https://stackoverflow.com/a/21429652/26086)

### web.config
I tried to see if IIS logs would help
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
       <!-- added to diagnose 500 errors -->
      <httpErrors errorMode="Detailed" />
      <!-- stop woff 404.3 errors on admin dashboard -->
      <staticContent> 
        <mimeMap fileExtension=".woff" mimeType="application/x-font-woff" /> 
      </staticContent>
      <!-- Allow upload of large files for restoring -->
      <security>
        <requestFiltering>
         <!-- This will handle requests up to 700MB (CD700) -->
         <requestLimits maxAllowedContentLength="737280000" />
      </requestFiltering>
    </security>
    <rewrite>
      <rules>
			<rule name="WordPress: https://qnrlcom.azurewebsites.net" patternSyntax="Wildcard">
				<match url="*"/>
					<conditions>
						<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
						<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true"/>
					</conditions>
				<action type="Rewrite" url="index.php"/>
			</rule></rules>
    </rewrite>
  </system.webServer>
  <!-- added to diagnose 500 errors -->
  <system.web>
        <customErrors mode="Off"/>
        <compilation debug="true"/>
    </system.web>
</configuration>
```
but it was further down the pipeline so this didn't help - 2 places I added diagnose 500 errors code.

## SSL setup
As we are using Azure PaaS we can use an [automated LetsEncrypt cert](https://www.hanselman.com/blog/SecuringAnAzureAppServiceWebsiteUnderSSLInMinutesWithLetsEncrypt.aspx) and the [sjkp/letsencrypt-siteextension wiki](https://github.com/sjkp/letsencrypt-siteextension/wiki/How-to-install)
