---
layout: post
title: Lets Encrypt 
menu: review
categories: ssl letsencrypt 
published: true 
comments: false
sitemap: false
---
Azure doesn't support [LetsEncrypt](https://letsencrypt.org/) yet. I use an [extension called letsencrypt-siteextension](https://github.com/sjkp/letsencrypt-siteextension) which works on Windows hosted sited using the App Service. Specifically I host Wordpress sites in this way, and this is a great way to get certs.  

[Scott Hanselman](https://www.hanselman.com/blog/SecuringAnAzureAppServiceWebsiteUnderSSLInMinutesWithLetsEncrypt.aspx) has a great walkthrough.  

[How to install docs from extension github](https://github.com/sjkp/letsencrypt-siteextension/wiki/How-to-install)  

## Monitoring
Sometimes this extension fails. I use a [free certificate monitor](https://certificate.tools/expiry-notification) to let me know when certs are about to expire

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

## Create a Service Principal
This is similar to a service account, so we can do unattended work.

Select Azure Active Directory, then Switch Directory
![ps](/assets/2019-03-01/4.png)  


New Application Registration  
![ps](/assets/2019-03-01/5.png)  
Need a domain name that we can access

## Service Principla ClientID and Secret

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


## Testing
https://hoverfly.scm.azurewebsites.net/azurejobs/#/jobs

Looking at the output, everything appears to be working.

![ps](/assets/2019-03-01/9.png)  


http://hoverfly.scm.azurewebsites.net/letsencrypt