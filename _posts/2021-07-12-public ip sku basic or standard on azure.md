---
layout: post
title: HTML Email 
description: 
menu: review
categories: Email 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->


`It is recommended to use parameter "--public-ip-sku Standard" to create new VM with Standard public IP`

[https://docs.microsoft.com/en-us/azure/virtual-network/public-ip-addresses#ip-address-version](https://docs.microsoft.com/en-us/azure/virtual-network/public-ip-addresses#ip-address-version)




[https://azure.microsoft.com/en-gb/pricing/details/ip-addresses/](https://azure.microsoft.com/en-gb/pricing/details/ip-addresses/)

## Basic sku

slightly cheaper

- dynamic or static allocation
- open by default
- no availability zones

## Standard sku

- secure by default. 
- Allow inbound with network security group. 
- Assigned to nics.

- always uses static allocation

`[Coming breaking change] In the coming release, the default behavior will be changed as follows when sku is Standard and zone is not provided: For zonal regions, you will get a zone-redundant IP indicated by zones:["1","2","3"]; For non-zonal regions, you will get a non zone-redundant IP indicated by zones:null.`


 
## Zones

Even using these recommended settings:

```bash
# public IP and associate with the given DNS name
az network public-ip create \
    --resource-group ${rg} \
    --name ${publicIPName} \
    --sku Standard \
    --zone 1 \
    --dns-name ${dnsname}

# nic and associate with vnet, publicip
# Basic or Standard for the ip-sku
az network nic create \
    --resource-group ${rg} \
    --name ${nicName} \
    --vnet-name ${vnet} \
    --subnet ${subnet} \
    --public-ip-address ${publicIPName} \
    --network-security-group ${nsgname}

# Create vm which runs the cloud init script to provision 

    # --custom-data create_webserver.sh \
# If one of my keys exist 
# uncomment line below to get ssh keys working
filename="../secrets/sshkey-homelenovo.pub"
if [ -f "$filename" ]; then
az vm create \
    --resource-group ${rg} \
    --name ${vmname} \
    --location ${region} \
    --nics ${nicName} \
    --image ${image} \
    --ssh-key-values ../secrets/sshkey-homelenovo.pub ../secrets/sshkey-4790-1804.pub \
    --size Standard_B1ms
```

It still gives me the warning:

``It is recommended to use parameter "--public-ip-sku Standard" to create new VM with Standard public IP``


## Dynamic or Stable IP address?