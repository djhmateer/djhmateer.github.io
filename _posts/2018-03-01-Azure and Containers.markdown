---
layout: post
title:  "Azure and Conatiners"
date:   2018-03-01 15:35
menu: review
categories: azure 
published: true 
---
At the time of writing these were [some of the options](https://azure.microsoft.com/en-gb/services/container-instances/) for using containers on Azure. Interestingly both below were only in Preview, whereas the Google Kontainer Engine (K8s) and Amazon EC2 Container Service have been around longer.

![ps](/assets/2018-03-01/container.png)


## 0. Roll your own K8s Cluster
[Pluralsight](https://app.pluralsight.com/library/courses/getting-started-kubernetes/table-of-contents) covers this using kubeadm.

I use the [AzureCLI](/azure/2018/02/15/Azure-CLI.html) to automate bringing up the 3 VM's in Azure.


## 1. Azure Container Services (AKS) - (Preview)
This is managed K8s  

Simplify the deployment, managment of a Kubernetes cluster
[Intro blog post of 24th Oct 2017](https://azure.microsoft.com/en-gb/blog/introducing-azure-container-service-aks-managed-kubernetes-and-azure-container-registry-geo-replication/)

[Docs](https://docs.microsoft.com/en-gb/azure/aks/intro-kubernetes) from MS

[Home on Azure](https://azure.microsoft.com/en-us/services/container-service/) - fully managed K8s container orchestration service.

## 2. Azure Container Instances (Preview)
[Docs](https://docs.microsoft.com/en-gb/azure/container-instances/)   

Its an application in a container, running in the cloud