---
layout: post
title: Azure VM Sizes
description: 
menu: review
categories: VM 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---


<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

Choosing an Azure VM Size for a new project is a minefield!

[https://docs.microsoft.com/en-us/azure/virtual-machines/sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes)

[https://azure.microsoft.com/en-gb/pricing/details/virtual-machines/linux/](https://azure.microsoft.com/en-gb/pricing/details/virtual-machines/linux/) - search for GPU  - **good pages for Pricing!!**

## Bs-series - low to moderate workloads
I have used burstable VM's as I'm doing a lot of low traffic web applications:

Xeon 2.3GHz

-size Standard_B1s # £5.65
-size Standard_B1LS  # £2.82
-size Standard_B1s # £5.65
-size Standard_B1ms # £11.26
-size Standard_B2s # £22.63 (4GB)
-size Standard_B2ms # £45 (8GB)
-size Standard_B4ms # £90 (16GB)
-size Standard_B8ms # £90 (8vcpu and 32GB)


## Av2 Standard
Standard_A4m_v2 £113 (4vcpu and 32GB)

Xeon 2.3GHz

This may be the same old hardware as the B series.


## D2a - D96a v4

For production workloads

AMD EPYC 7452 up 2.35 up to 3.35GHz

Standard_D4a_v4 £104 (4vcpu and 16GB)

what are the newest CPU's?

## Spot






I'm involved in a project which can use GPU's to do image detection. [https://github.com/djhmateer/osr4rights-tools/tree/main/faceSearchInfra](https://github.com/djhmateer/osr4rights-tools/tree/main/faceSearchInfra)

The question is should we use GPU's as it brings a lot of complexity.

In the end we are using CPU's as much as possible, however we do have the GPU working.



### NCsv3-series Tesla V100 (2017) - recommended

Standard_NC6s_v3

1.5x faster - £2.28 per hour

### NCas_T4_v3 - NVIDIA T4 GPUs (2018) - recommended

$0.39 per hour
Spot VM £0.09 per hour (look into 90% savings on spot instances)

Standard_NC4as_T4_v3

[https://docs.microsoft.com/en-us/azure/virtual-machines/nct4-v3-series](https://docs.microsoft.com/en-us/azure/virtual-machines/nct4-v3-series)

```bash
# to see why am getting NotAvailableForSubscription or not in location
az vm list-skus --size Standard_NC4as_T4_v --all --output table
```
## Errors

If you get a bash error from the cli like:

The template deployment 'vm_deploy_NvIDE7GELcvxjdzxuBr7nPMjmO1gU' is not valid according to the validation procedure. The tracking id is 'c06112ff-e8a0-4624-95c3-2a1a7d04xxxx'. See inner errors for details.

To see more detail:

```bash
az monitor activity-log list --correlation-id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```





