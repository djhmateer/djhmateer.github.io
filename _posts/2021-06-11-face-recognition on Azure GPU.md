---
layout: post
title: Face-recognition on Azure GPU 
description: 
menu: review
categories: GPU 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

[https://github.com/djhmateer/osr4rights-tools](https://github.com/djhmateer/osr4rights-tools) is a project where we spin up an Azure VM with a GPU to do face searching for Human Rights investigators. This source contains the Azure CLI build script, and Cloud init deployment script of the VM.

[https://github.com/spatial-intelligence/OSR4Rights](https://github.com/spatial-intelligence/OSR4Rights) source for the Python script that scans faces using the built VM above.

[https://github.com/ageitgey/face_recognition](https://github.com/ageitgey/face_recognition) is the open source project the Python script uses.

[https://github.com/ageitgey/face_recognition#identify-faces-in-pictures](https://github.com/ageitgey/face_recognition#identify-faces-in-pictures) and the technology used is this example of finding a known image ie recognising a person. 

[Wiki of how to use](https://github.com/ageitgey/face_recognition/wiki/Calculating-Accuracy-as-a-Percentage)


## Installing on a GPU

We could use docker, and indeed there is a docker compose file in the face_recognition source. However it is quite out of date.

[https://sparkle-mdm.medium.com/python-real-time-facial-recognition-identification-with-cuda-enabled-4819844ffc80](https://sparkle-mdm.medium.com/python-real-time-facial-recognition-identification-with-cuda-enabled-4819844ffc80) digging into the libraries



[https://github.com/ageitgey/face_recognition#deployment](https://github.com/ageitgey/face_recognition#deployment)

There is a docker version here, but lets stick close to the metal for simplicity. We are automating everything so don't need docker.

## Testing

[![Load](/assets/2021-06-11/load.jpg "load"){:width="800px"}](/assets/2021-06-11/load.jpg)

GPU doing fine, with 2 instances of the single threaded app working using 2 of the CPU cores.

- [bpytop](https://github.com/aristocratos/bpytop) for CPU monitoring
- [nvtop](https://github.com/Syllo/nvtop) for GPU monitoring
- watch nvidia-ami for GPU monitoring too

## Test Datasets

[https://github.com/ageitgey/face_recognition/wiki/Known-Face-Image-Datasets](https://github.com/ageitgey/face_recognition/wiki/Known-Face-Image-Datasets) - 2 in here

- lfw (170MB)
- asian face age dataset

## Only spinning up when needed

It is expensive keeping a GPU machine running all the time, so lets only spin one up when needed.

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
# this can take a while
az sig image-version create \
   --resource-group myGalleryRG \
   --gallery-name myGallery \
   --gallery-image-definition myImageDefinition \
   --gallery-image-version 1.0.0 \
   --target-regions "westeurope" \
   --replica-count 1 \
   --managed-image "/subscriptions/10cb0eb6-b1e9-40c6-b721-ee2a754f166c/resourceGroups/OSRFACESERACHGPU861/providers/Microsoft.Compute/virtualMachines/osrfacesearchgpu861vm"

```

## Copying files from GPU server to local

```bash
# windows to linux
scp 00248.png dave@osrfacesearchgpu605.westeurope.cloudapp.azure.com:/home/dave/facesearch/job3

# linux to windows
scp dave@osrfacesearchgpu605.westeurope.cloudapp.azure.com:/home/dave/facesearch/job3/. .
```

Or use WinSCP