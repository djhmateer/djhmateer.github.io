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

Except it isn't. Here is the summary (June 2021) for a general purpose workload. ie webserver.

- B-series for burstable low power (can reserve for 3 years)
- Av2 series for low power (can't reserve)
- Dav4 or Dasv4 for General purpose (AMD)
- Dv4 or Dav4 for General purpose (Intel)
- Ddv4 for 50% larger local storage and better disk IOPS

The v5 Intel machines are in preview.

The s means premium storage. eg Dav4 or Dasv4.

You can have

- Pay as you go
- 1 year reserved
- 3 year reserved
- Spot pricing (if workload can tolerate interruptions - can receive notifications 30seconds in advance)


[https://docs.microsoft.com/en-us/azure/virtual-machines/sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes)

A tactic I use is to see what is recommended on the home page of here:

[https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-general](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-general)

Pricing here is good: **best page**

[https://azure.microsoft.com/en-gb/pricing/details/virtual-machines/linux/](https://azure.microsoft.com/en-gb/pricing/details/virtual-machines/linux/) 

## 1.General Purpose

[https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-general](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-general)

## Av2 (General Purpose, cost-effective)
Standard_A4m_v2 £113 (4vcpu and 32GB)

No reserved instances.

Xeon 2.3GHz

This may be the same old hardware as the B series.

## B-series (Burstable)
I have used burstable VM's as I'm doing a lot of low traffic web applications:

Xeon 2.3GHz - seems they can be many different kinds of processor

-size Standard_B1s # £5.65
-size Standard_B1LS  # £2.82
-size Standard_B1s # £5.65
-size Standard_B1ms # £11.26
-size Standard_B2s # £22.63 (4GB)
-size Standard_B2ms # £45 (8GB)
-size Standard_B4ms # £90 (16GB)
-size Standard_B8ms # £90 (8vcpu and 32GB) - I got an 8272CL at 2.6 GHz here.

Next I'm going to only look at the most up to date hardware which is v4 (and v5 is in preview)

## Dav4 and Dasv4 (Generable purpose production)
AMD EPYC 7452 up 2.35 up to 3.35GHz (2020)

Standard_D4a_v4 £104 (4vcpu and 16GB)


## Dv4 (General purpose, balance CPU and memory)
DSv4 - means premium storage

Xeon 8272 (Cascade Lake 2019)

Ddv4 series has better local disk IOPS

D16ds_v4 £590pm (16vcpu and 64GB RAM)


## Dv5 (preview)
Have requested access to this.

Xeon 8370C (Ice Lake)

## DCv2 - confidentiality series


## 2.Compute Optimised

[https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-compute](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-compute)

## FSv2 (Compute Optimised, raw compute power)
should be running 8272 (Cascade Lake 2019)

Older was maybe Xeon 8168 (Skylake - 2017)
[https://www.cpubenchmark.net/cpu.php?cpu=Intel+Xeon+Platinum+8168+%40+2.70GHz&id=3111](https://www.cpubenchmark.net/cpu.php?cpu=Intel+Xeon+Platinum+8168+%40+2.70GHz&id=3111) Score of 33503




## Spot


I'm involved in a project which can use GPU's to do image detection. [https://github.com/osr4rightstools/osr4rights-tools/tree/main/faceSearchInfra](https://github.com/osr4rightstools/osr4rights-tools/tree/main/faceSearchInfra)


## Errors

If you get a bash error from the cli like:

The template deployment 'vm_deploy_NvIDE7GELcvxjdzxuBr7nPMjmO1gU' is not valid according to the validation procedure. The tracking id is 'c06112ff-e8a0-4624-95c3-2a1a7d04xxxx'. See inner errors for details.

To see more detail:

```bash
az monitor activity-log list --correlation-id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

It is more than likely you don't have enough cores, or that you need to request that machine type.




## Other info

Bnehcmark
[https://docs.microsoft.com/en-us/azure/virtual-machines/linux/compute-benchmark-scores](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/compute-benchmark-scores) Benchmark scores.
