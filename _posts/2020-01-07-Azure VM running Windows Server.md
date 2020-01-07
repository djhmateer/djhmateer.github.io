---
layout: post
title: Azure VM running Windows Server 
description: Using IaC to have a good devops pipeline for a legacy app which needs to be deployed onto a Windows Server 
menu: review
categories: Azure Infrastructure Windows 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/60.jpg
---

![alt text](/assets/2019-11-13/60.jpg "Laptop"){:width="400px"}

Lets optimise a legacy application which is sitting on expensive Azure VM's and make sure we have a good pipeline

- Make sure costs of VM's are minimised
- How to handle the costs of the database

[I deploy Linux VM's on Azure running .NET Core using a simple automated deployment pipeline](/2019/11/17/Publishing-ASP-NET-Core-3-App-to-Ubuntu)

I've done the same for Windows servers:

## Azure CLI

I use the Azure CLI running from Windows Subsystem for Linux to run bash scripts. Here is a snippet of the script.

```bash
az vm create \
    --resource-group ${rg} \
    --name ${vmname} \
    --nics ${nicName} \
    --image win2016datacenter \
    --admin-username ${adminusername} \
    --admin-password ${adminpassword} \
    --size Standard_DS1_v2
```

## Performance

What I first noticed was how slow the server UI seemed to respond. The size `Standard_DS1_v2` is the default.  

[Windows VM Family Sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes) was a good start.  

[Dsv3 seems like a good default for now to test for production](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes-general#dsv3-series-1)  lets try `Standard_D4s_v3` and then burstable

## Versions of Windows

[Here are a list of image names for VMs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/cli-ps-findimage)







