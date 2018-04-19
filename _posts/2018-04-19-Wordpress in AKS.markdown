---
layout: post
title:  "Wordpress in AKS"
date:   2018-04-19 14:06
menu: review
categories: wordpress 
published: true 
---
Setting up Wordpress well in [Azure Container Services (AKS)](https://azure.microsoft.com/en-gb/services/container-service/) is not easy. 

I'll discuss these parts

Azure Container Services (AKS)  
Azure managed MySQL  
A single node cluster with an Azure attached disk for persistence  
Ingress controller  
Nginx reverse proxy (includes enforcing https)  
Nginx server (enforces www)  

## Setting up the Cluster
I use the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) tool to script all the building in Azure. At the time of writing the version is 2.0.31 and takes a few minutes to install (or longer). [Documentation](https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-create)  


```
az login

# -n is --name, -l is --location
az group create -n aks -l westeurope

# -n is --name, -g is --resource-group, c is --node-count, -k is --kubernetes-version, -s is --node-vm-size
az aks create -n aks -g aks -c 1 -k 1.9.6 -s Standard_B1ms

# useful command to get the supported versions of k8s
az aks get-versions -l westeurope -o table

# the default node-vm-size is Standard_DS1_v2 (3.5GB and 1vcpu for UKP37) which I use in production
# I use the cheaper burst Standard_B1ms (2GB for UKP13) for testing 
``` 
After 20min or so you should have the cluster ready





