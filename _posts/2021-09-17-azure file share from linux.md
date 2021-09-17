---
layout: post
# title: 
description: 
menu: review
categories: azure
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

## Introduction

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-08-29/error.jpg "error"){:width="500px"}](/assets/2021-08-29/error.jpg) -->

The open source [OSR4RightsTools]() project needs user's results to be persisted when a new deployment of the VM happens.

Data is persisted to SQLAzure

Files are served using a url like

- /downloads/90/results.html 
- /downloads/90/results90.zip

- /downloads/89/results.html
- /downloads/89/results89.cs

And authentication/authorisation of these static files happens via downloads.cshtml

## Blob Containers

This is classically how I've stored files.

[https://functionsdm2storage.blob.core.windows.net/outputfiles/foo.zip](https://functionsdm2storage.blob.core.windows.net/outputfiles/foo.zip)

## Azure Files

### Deploy File Share

[https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal) Create an Azure / SMB file share

- Standard File Shares - HDD
- Premium File Shares - SSD 

GPv2 Accounts allow Azure files on HDD, and contain blob containers, queues and tables (standard)

FileStorage storage account are for SSD only (premium)

[https://azure.microsoft.com/en-gb/pricing/details/storage/files/](https://azure.microsoft.com/en-gb/pricing/details/storage/files/) costs for tiers

Redundancy - LRS - Locally redundant storage

Tier of File Share - Hot (will try cold) as cheaper than transaction-optimised. These are all in Standard HDD, so billing is based on usage rather than quota (which is what premium is)

```bash
#!/bin/bash

# Create Storage / Azure file share 

# should only ever need to do once

rg=storage
region=westeurope
storageAccountName="osrstorageaccount"

# create resource group
az group create \
   --name ${rg} \
   --location ${region}

# create storage account
# https://docs.microsoft.com/en-us/cli/azure/storage/account?view=azure-cli-latest#az_storage_account_create
az storage account create \
    --resource-group $rg \
    --name $storageAccountName \
    --kind StorageV2 \
    --sku Standard_LRS

shareName="osrshare"

# create file share
# https://docs.microsoft.com/en-us/cli/azure/storage/share-rm?view=azure-cli-latest#az_storage_share_rm_create
az storage share-rm create \
    --resource-group $rg \
    --storage-account $storageAccountName \
    --name $shareName \
    --access-tier "Hot" \
    --quota 10
    # --output none

# 10GB quota
# storage tiers - TransactionOptimized is default.. Hot and Cool are others
```

[https://azure.microsoft.com/en-gb/pricing/details/storage/files/](https://azure.microsoft.com/en-gb/pricing/details/storage/files/) useful for seeing costs

[https://docs.microsoft.com/en-us/azure/storage/files/storage-files-planning#storage-tiers](https://docs.microsoft.com/en-us/azure/storage/files/storage-files-planning#storage-tiers) more detailed planning information.


### Mount File Share

[https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-linux?tabs=smb311](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-linux?tabs=smb311)

This is an SMB file share

- will be nice as I can control all file security from an OS level
- speed isn't an issue (as smb can be slow)


Lets try on Ubuntu 20.04.3 LTS (GNU/Linux 5.8.0-1041-azure x86_64) which is this image on the 17th Sept 2021.

`image=Canonical:0001-com-ubuntu-server-focal:20_04-lts-gen2:latest`

I should be able to use SMB 3.1.1 as we're on 18.04.5 LTS+

install AZ CLI on Ubuntu [docs](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt) with

```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# but how to do this from my deploymed VM?
# https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli
# look in bash scripts for osr4rights.. 
az account login

resourceGroupName="storage"
storageAccountName="osrstorageaccount"

# This command assumes you have logged in with az login
# check connection
# httpEndpoint=$(az storage account show \
#     --resource-group $resourceGroupName \
#     --name $storageAccountName \
#     --query "primaryEndpoints.file" | tr -d '"')
# smbPath=$(echo $httpEndpoint | cut -c7-$(expr length $httpEndpoint))
# fileHost=$(echo $smbPath | tr -d "/")

# open firewall... do I need this?
# nc -zvw3 $fileHost 445


fileShareName="osrshare"
mntRoot="/mount"
mntPath="$mntRoot/$storageAccountName/$fileShareName"

sudo mkdir -p $mntPath

# sudo mkdir -p /osrshare


# This command assumes you have logged in with az login
httpEndpoint=$(az storage account show \
    --resource-group $resourceGroupName \
    --name $storageAccountName \
    --query "primaryEndpoints.file" | tr -d '"')
smbPath=$(echo $httpEndpoint | cut -c7-$(expr length $httpEndpoint))$fileShareName

storageAccountKey=$(az storage account keys list \
    --resource-group $resourceGroupName \
    --account-name $storageAccountName \
    --query "[0].value" | tr -d '"')

#sudo mount -t cifs $smbPath $mntPath -o username=$storageAccountName,password=$storageAccountKey,serverino

# allow all local users access to the share
# https://unix.stackexchange.com/a/375523/278547
# sudo mount -t cifs $smbPath $mntPath -o username=$storageAccountName,password=$storageAccountKey,serverino,noperm

# sudo mount -t cifs $smbPath $mntPath -o username=osrstorageaccount,password=$storageAccountKey,serverino,noperm

# useful to unmount
#sudo umount -l /mount/osrstorageaccount/osrshare
```

## Production

This is what I use in production (password redacted)

```bash
sudo mkdir /mnt/osrshare

# allow all local users access to the share
# https://unix.stackexchange.com/a/375523/278547
sudo mount -t cifs //osrstorageaccount.file.core.windows.net/osrshare /mnt/osrshare -o username=osrstorageaccount,password=xxxxxxxxxg==,serverino,noperm
```
 



