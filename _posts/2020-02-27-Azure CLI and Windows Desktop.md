---
layout: post
title: Azure CLI and Windows Desktop 
description: 
menu: review
categories: Azure IaC WindowsDesktop 
published: true 
comments: true     
sitemap: true
image: /assets/2020-02-03/40.jpg
---

<!-- ![alt text](/assets/2020-02-03/41.jpg "Choosing an image") -->
![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"}

[This follows on from my article on Azure CLI and Windows Server](/2020/01/29/Azure-CLI-and-Windows-Server)

I'm using a VM in Azure to test out a migration virtualisation of a Windows Forms application into 'The Cloud'. By using IaC we can script out the deployment and testing and can get a handle on the inevitable costs issue.

```bash
#!/bin/bash

# activate debugging from here
set -x

# generate a random suffix between 1 and 1000
int=$(shuf -i 1-1000 -n 1)
# Password must have the 3 of the following: 1 lower case character, 1 upper case character, 1 number and 1 special character
# generate a 34 character password (normal, capitals and numbers)
password=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c34)

rg=appnameTEST${int}
dnsname=appnametest${int}
# useful to keep the same name as when typing into multiple machines don't need to remember number
adminusername=dave
adminpassword=${password}
vmname=appnametest

region=westeurope
vnet=vnet
subnet=subnet
publicIPName=publicIP
nsgname=nsg
nicName=nic

# Create a resource group
az group create \
   --name ${rg} \
   --location ${region}

# Create a virtual network
az network vnet create \
    --resource-group ${rg} \
    --name ${vnet} \
    --subnet-name ${subnet}

# Create a network with a public IP and associate with the given DNS name
az network public-ip create \
    --resource-group ${rg} \
    --name ${publicIPName} \
    --dns-name ${dnsname}
    #--allocation-method Static \

# Create a network security group
az network nsg create \
    --resource-group ${rg} \
    --name ${nsgname}

# allow port 3389 rdp
az network nsg rule create \
    --resource-group ${rg} \
    --nsg-name ${nsgname} \
    --name nsgGroupRuleRDP \
    --protocol tcp \
    --priority 1000 \
    --destination-port-range 3389 \
    --access allow

# Create a virtual network card and associate with publicIP address and NSG
az network nic create \
    --resource-group ${rg} \
    --name ${nicName} \
    --vnet-name ${vnet} \
    --subnet ${subnet} \
    --public-ip-address ${publicIPName} \
    --network-security-group ${nsgname}

# windows vm sizes
# https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes
# default is Standard DS1 v2 (1 vcpus, 3.5 GiB memory)
az vm create \
    --resource-group ${rg} \
    --name ${vmname} \
    --nics ${nicName} \
    --image MicrosoftWindowsDesktop:Windows-10:19h2-pro-g2:18363.657.2002091847 \
    --admin-username ${adminusername} \
    --admin-password ${adminpassword} \
    --size Standard_D2s_v3

    # other useful options are
    # --size Standard_D4s_v3
    # --size Standard_DS1_v2

# Use CustomScript extension to install IIS (half of it) and powershell to do other things
# and dump output to a log file
# Useful log files are:
#1.C:\WindowsAzure\Logs\Plugins\Microsoft.Compute.CustomScriptExtension
#2.C:\powershell.txt
#3.C:\ProgramData\chocolatey\logs\chocolatey.log
az vm extension set \
  --publisher Microsoft.Compute \
  --version 1.9 \
  --name CustomScriptExtension \
  --vm-name ${vmname} \
  --resource-group ${rg} \
  --settings '{"fileUris":["https://bitbucket.org/davemateer/consoleapp2/raw/master/infra.ps1"], 
               "commandToExecute":"powershell.exe -ExecutionPolicy Unrestricted -File infra.ps1 > c:\powershell.txt"
              }'

# save to file so don't lose generated password
echo -e "\n${dnsname}.westeurope.cloudapp.azure.com\n${adminpassword}" > ${dnsname}.txt

echo mstsc /v:${dnsname}.westeurope.cloudapp.azure.com
```

## Finding the SKU name for --image

[Finding specific images is hard](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/cli-ps-findimage#find-specific-images)

My tactic is to output everything then find the most up to date version

```bash
# Windows 10 professional images
 az vm image list --offer windows --publisher microsoftwindowsdesktop --location westeurope --sku pro --output tsv --all > out.csv

 # --output table
 # this is useful for viewing on screen
```

![alt text](/assets/2020-02-03/40.jpg "Choosing an image"){:width="600px"}

`MicrosoftWindowsDesktop:Windows-10:19h2-pro-g2:18363.657.2002091847` is the version I'm using ie 1909

![alt text](/assets/2020-02-03/41.jpg "Win 10 Pro"){:width="600px"}

output the list into `tsv` then copy into Excel and order by Version 

- Windows 10 1909 (currently most up to date GA edition)
- Professional (not N, not Enterprise, nor EVD aka Enterprise MultiSession)

It did need a Windows update (updating .NET runtime).

![alt text](/assets/2020-02-03/44.jpg "Order by Version")
<!-- ![alt text](/assets/2020-02-03/44.jpg "Order by Version"){:width="600px"} -->
Order by version to get the latest

## Generation 2 VM's

[Discussion but basically looks good](https://docs.microsoft.com/en-gb/azure/virtual-machines/windows/generation-2) and I prefer to use them

## VM Sizes

![alt text](/assets/2020-02-03/42.jpg "Picking a VM size")
<!-- ![alt text](/assets/2020-02-03/42.jpg "Picking a VM size"){:width="800px"} -->

My current default is:

- D2s_v3 as it gives premium disks
- 2 vcpu, 8GB RAM

## OVH

An alternative is to use your own [bare metal on someone like OVH](https://www.ovh.co.uk/dedicated_servers/) and pay [windows licensing](https://www.ovh.co.uk/dedicated_servers/2014-windows-licences-pricing.xml)

This gives much more horsepower and control but requires more maintenance.

[Cloud-init is supported with OVH](https://docs.ovh.com/gb/en/public-cloud/launch-a-script-when-instance-is-created/)

