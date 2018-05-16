---
layout: post
title:  "Azure and Containers"
date:   2018-03-01 15:35
menu: review
categories: azure 
published: true 
---
This is part 5 of a [series](/docker/2018/02/14/What-is-docker-good-for.html)

At the time of writing these were [some of the options](https://azure.microsoft.com/en-gb/services/container-instances/) for using containers on Azure. Interestingly all managed container services are in preview, with the Google Kubernetes Engine (GKE) being the most supported. Amazon is still in private preview.

![ps](/assets/2018-03-01/container.png)

## Azure Container Instances (Preview)
[Overview](https://docs.microsoft.com/en-gb/azure/container-instances/)   
[Docs](https://docs.microsoft.com/en-gb/azure/container-instances/container-instances-overview)

It seems like the use case for these currently is to do short lived containers (they offer per second billing).

- no high availability
- no load balancing
- no scaling
- no monitoring

- fast startup
- public IP
- persistent storage
