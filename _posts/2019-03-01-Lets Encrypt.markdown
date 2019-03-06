---
layout: post
title: Lets Encrypt 
#menu: review
categories: SSL LetsEncrypt Azure
published: true 
comments: false
sitemap: true
---
Azure doesn't support [LetsEncrypt](https://letsencrypt.org/) yet. I use an [extension called letsencrypt-siteextension](https://github.com/sjkp/letsencrypt-siteextension) which works on Windows hosted sited using the App Service. 

Currently I'm
- Using Lets Encrypt on Azure for smaller projects which are **not mission critical**
- Using classic paid for certs for larger commercial sites (as there are a lot of moving parts for LE on Azure) 

[Scott Hanselman](https://www.hanselman.com/blog/SecuringAnAzureAppServiceWebsiteUnderSSLInMinutesWithLetsEncrypt.aspx) has a great walkthrough.  

[How to install docs from extension github](https://github.com/sjkp/letsencrypt-siteextension/wiki/How-to-install)    

The guide below is a collection of learning over many different websites and configurations, and is meant as a guide to you (and to my future self). 

## Monitoring
Sometimes this extension fails. I use a [free certificate monitor](https://certificate.tools/expiry-notification) and [keychest.net](https://keychest.net) to let me know when certs are about to expire

## App Service Plan and App Service in same Resource Group 
![ps](/assets/2019-03-01/1.png)  

## Azure Web Jobs - Storage Connection Strings
You need some Blob storage (see screenshot above - Storage account). `Storage` or `StorageV2` `BlobStorage` will not work.  

I use:
- Standard performance
- StorageV2
- Locally Redundant Storage (LRS)
- Cool

![ps](/assets/2019-03-01/2.png)  
it should be

```bash
AzureWebJobsDashboard
AzureWebJobsStorage

DefaultEndpointsProtocol=https;AccountName=[myaccount];AccountKey=[mykey];
```
You get the key from inside the storage, in Access Keys:

![ps](/assets/2019-03-01/3.png)  

## Create a Service Principal (App Registration)
This is similar to a service account, so we can do unattended work.

Select Azure Active Directory, then Switch Directory
![ps](/assets/2019-03-01/4.png)  


New Application Registration  
![ps](/assets/2019-03-01/5.png)  
The sign on URL in this case is more informational and not critical (ie could be https://davemateer.com)

## Service Principal ClientID and Secret

![ps](/assets/2019-03-01/6.png)  
After saving, the key will be displayed. *Copy this somewhere as you can't see it again*  

The application is now ready and the service principle is created on our tenant.

Will need applicationID (shown in screenshot)


## Grant Permissions to Service Principal
Go to resource group:  

![ps](/assets/2019-03-01/7.png)  
Interestingly I don't have permissions yet to add the role assignment


![ps](/assets/2019-03-01/8.png)  
On Azure AD I can see my role as User.

When you do have access (I had to get my domain Global Administrator to do it for me) you should be able to:  

![ps](/assets/2019-03-01/10.png)  


## Install the Lets Encrypt Site Extension  

![ps](/assets/2019-03-01/11.png)  
The one to choose is `Azure Let's Encrypt` as [described here on his blog](https://wp.sjkp.dk/lets-encrypt-on-azure-web-apps-using-a-function-app-for-automated-renewal/). The other one is part of a more advanced setup.  

If you see `"No route registered for '/letsencrypt/'"` then just restart the website.  


![ps](/assets/2019-03-01/12.png)  
## Configure Site Extension

Either goto: [https://qnrlcom.scm.azurewebsites.net/letsencrypt](https://qnrlcom.scm.azurewebsites.net/letsencrypt) or click on the browse link in Extensions:

![ps](/assets/2019-03-01/13.png)  
 
 which will take you to the automated installation:  



![ps](/assets/2019-03-01/14.png)  
How to find tenent  

![ps](/assets/2019-03-01/15.png)  
How to find subscriptionID

![ps](/assets/2019-03-01/16.png)  
ClientID is ApplicationID of the Azure Active Directory, App Registration


Update Application settings - true if haven't already added the setting.

![ps](/assets/2019-03-01/18.png)  
So it looks like I may need the Global Administrator to do this.

## Custom Domains and SSL
![ps](/assets/2019-03-01/19.png)  
I had already setup my custom domain on the app service.  


Interestingly I've got another certificate visible (I'm guessing it is on a per App Service Plan basis ie you can see all certificates here on this 'VM') 

![ps](/assets/2019-03-01/20.png)  
Selecting the 2 sites I want a cert for

![ps](/assets/2019-03-01/21.png)  

I had wrongly pointed my DNS A Record. Notice there is an error report URL from Lets Encrypt.

![ps](/assets/2019-03-01/23.png)  
I had the wrong storage account settings. And also noticed that 'always on' needs to be set to on otherwise jobs wont run.

## Testing
[https://hoverfly.scm.azurewebsites.net/azurejobs](https://hoverfly.scm.azurewebsites.net/azurejobs)  - jobs dashboard

[http://hoverfly.scm.azurewebsites.net/letsencrypt](http://hoverfly.scm.azurewebsites.net/letsencrypt)  - setup of certs

![ps](/assets/2019-03-01/9.png)  

Looking at the output, everything appears to be working.

## Final
![ps](/assets/2019-03-01/24.png)  

## How to install a cert for an upcoming live server
I'm doing a migration of qnrl.com to a new site, and may use LetsEncrypt in the future.

![ps](/assets/2019-03-01/25.png)  

LetsEncrypt can't validate the domain as it is pointing to the current live server. The simple solution is to flip to the new site at an out of hours time, get the cert and flip back using DNS. I use Azure's Traffic Manager which is excellent. We do have a current certificate so I may run both in parallel.

## Summary
- Use Lets Encrypt on Azure for smaller projects which are **not mission critical**
- Use classic paid for certs for larger commercial sites (as there are a lot of moving parts for LE on Azure) 



