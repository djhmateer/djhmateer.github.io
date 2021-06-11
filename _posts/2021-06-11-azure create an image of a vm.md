---
layout: post
title: Azure create an image of a VM
description: 
menu: review
categories: Azure 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

I've built a VM that I'd like to recreate fairly quickly. It is all scripted using the Azure CLI, but the dependencies are brittle (ie I don't know when things may change on what it downloads), so I want a snapshot image of it.

[https://github.com/djhmateer/osr4rights-tools](https://github.com/djhmateer/osr4rights-tools) contains an Azure CLI script to bring up a vm ready to go. However compiling from source takes time - about 12 minutes.

### Shared Image Gallery
[https://docs.microsoft.com/en-us/azure/virtual-machines/shared-images-cli](https://docs.microsoft.com/en-us/azure/virtual-machines/shared-images-cli) Firstly we need a Shared Image Gallery

```bash
# create new resource group to hold Shared Image Gallery
az group create --name myGalleryRG --location westeurope

# sig is Shared Image Gallery
az sig create --resource-group myGalleryRG --gallery-name myGallery
```

### Create an Image from a VM
[https://docs.microsoft.com/en-us/azure/virtual-machines/image-version-vm-cli](https://docs.microsoft.com/en-us/azure/virtual-machines/image-version-vm-cli) - create an image from a VM


Image definition
Image version

```bash
# show current VMs in subscription
az vm list --output table

# get the id of the VM
az vm get-instance-view -g OSRFACESERACHGPU861 -n osrfacesearchgpu861vm --query id

## create an image definition
# they create a logical grouping for images
az sig image-definition create \
   --resource-group myGalleryRG \
   --gallery-name myGallery \
   --gallery-image-definition myImageDefinition \
   --publisher myPublisher \
   --offer myOffer \
   --sku mySKU \
   --os-type Linux \
   --os-state specialized

# create image version
# this can take a while - 20mins?
az sig image-version create \
   --resource-group myGalleryRG \
   --gallery-name myGallery \
   --gallery-image-definition myImageDefinition \
   --gallery-image-version 1.0.0 \
   --target-regions "westeurope" \
   --replica-count 1 \
   --managed-image "/subscriptions/10cb0eb6-b1e9-40c6-b721-ee2a754f166c/resourceGroups/OSRFACESERACHGPU861/providers/Microsoft.Compute/virtualMachines/osrfacesearchgpu861vm"

```

## Create a VM

```bash
# just lists my images
resourceGroup=myGalleryRG
gallery=myGallery
az sig image-definition list --resource-group $resourceGroup --gallery-name $gallery --query "[].[name, id]" --output tsv


imgDef="/subscriptions/10cb0eb6-b1e9-40c6-b721-ee2a754f166c/resourceGroups/myGalleryRG/providers/Microsoft.Compute/galleries/myGallery/images/myImageDefinition"
vmResourceGroup=myResourceGroupTEST
location=westeurope
vmName=myVM
adminUsername=azureuser

az group create --name $vmResourceGroup --location $location

az vm create\
   --resource-group $vmResourceGroup \
   --name $vmName \
   --image $imgDef \
   --admin-username $adminUsername \
   --generate-ssh-keys

# Error messages
# I'm getting an error saying Parameter 'osProfile' is not allowed
az deployment group list --resource-group OSRFACESERACHGPU203

```

Lets try creating from the GUI
  ahh it is the wrong GPU

Am using
