---
layout: post
title: Azure IaaS Blue Green Linux Webservers
description: 
menu: review
categories: Azure IaaS 
published: true 
comments: false
sitemap: false
image: /assets/2019-04-05/1.jpg
---

I give this plugin two :+1:!

When PaaS isn't good enough for hosting a web application we use IaaS. Drupal didn't work well, and Wordpress stuggles on PaaS with intensive plugins such as Divvi theme builder.  

There is surprisingly little help out there to go further than a single VM.  

[Blue-Green deployments using Azure Traffic Manager](https://azure.microsoft.com/en-gb/blog/blue-green-deployments-using-azure-traffic-manager/)  
[The DOs and Donts of Blue-Green deployment](https://minops.com/blog/2015/02/the-dos-and-donts-of-bluegreen-deployment/)  
is it A/B, Red/Black...


[Using Azure Traffic Manager](https://azure.microsoft.com/en-us/blog/blue-green-deployments-using-azure-traffic-manager/ )


## A Single VM with Hosted Azure MySQL

![ps](/assets/2019-04-07/1.png)  


## Multiple VMs with a single Hosted Azure MySQL using Azure Load Balancer 
This is good for load balancing, but not for:  

- Master / backup
- Blue / Green deployments

Loadbalancing failovers happens automatically. Upgrades can be done on the secondary vm and then switched over.  

[Create lb using the cli](https://docs.microsoft.com/en-us/azure/load-balancer/quickstart-create-basic-load-balancer-cli) 
[Azure Load Balancer SKU](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-overview#skus) it seems we have to pay for it now (or are recommended to)

```bash
#put code in here from /UKFDrupal repo
```

[How to add/remove a vm from the lb](https://docs.microsoft.com/en-us/azure/load-balancer/quickstart-create-basic-load-balancer-cli)
```bash
# remove nic1 from lb
az network nic ip-config address-pool remove \
    --resource-group dmtest3 \
    --nic-name nic1 \
    --ip-config-name ipConfig1 \
    --lb-name myLoadBalancer \
    --address-pool myBackEndPool 

# add nic1 from lb
az network nic ip-config address-pool add \
    --resource-group dmtest3 \
    --nic-name nic1 \
    --ip-config-name ipConfig1 \
    --lb-name myLoadBalancer \
    --address-pool myBackEndPool
```

- Azure Load Balancer
- Availability Set
- Multiple VM's

- Virtual Machine Scale Sets (VMSS)  - for autoscale based on the same VM image  


## Multi VMs and multiple DB's
- Azure Traffic Manager
- Multiple VM's
- Multiple Azure MySQL db's

We would use ATM here as it requires it's VM's to be in different regions for failover and load balancing.  

I have not used this for Drupal/Wordpress as the complexity of keeping databases in sync is not required for us currently.
