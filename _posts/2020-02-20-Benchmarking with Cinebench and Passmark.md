---
layout: post
title: Benchmarking with Cinebench and Passmark 
description: Looking at how powerful my machines are at the moment compared with the best around today
#menu: review
categories: Benchmarking 
published: true 
comments: true     
sitemap: true
image: /assets/2020-02-03/20.jpg
---

Professional curiosity is a wonderful thing! I'm interested in finding out more about the hardware my software runs on. So I thought I'd look at all the laptops and desktops I use.

[Linus tech tips on YouTube is great for keeping up to date](https://www.youtube.com/user/LinusTechTips/videos)

I've got machines which I use all the time so here they are rated (most powerful first) according to [Cinebench](https://www.maxon.net/en-gb/products/cinebench-r20-overview/), which is a rough guide to CPU performance. Cinebench is available on the Apple Store, Microsoft Store and [direct from maxon.net](https://www.maxon.net/en-us/support/downloads/)

![alt text](/assets/2020-02-03/20.jpg "Work desktop 4790K"){:width="300px"}  

- Work Desktop (Intel i7-4790K at stock 4GHz, 16GB RAM, 256SSD and 4TB rust spinner). Bought in July 2014 from [QuietPC](https://quietpc.com)

![alt text](/assets/2020-02-03/22.jpg "Home desktop"){:width="300px"}  

- Home Desktop (Intel i5-6600, 16GB RAM 128GB M.2 PCIe NVMe SSD, 4TB rust spinner). Bought in Sept 2016 from  [QuietPC](https://quietpc.com)

![alt text](/assets/2020-02-03/21.jpg "Home laptop E560"){:width="300px"}  

- Laptop (Lenovo E560 Intel i7-6500, 16GB RAM, 256SSD). Bought in November 2017

![alt text](/assets/2020-02-03/24.jpg "Mias laptop"){:width="250px"}  

- Asus X550C touchscreen laptop 

![alt text](/assets/2020-02-03/23.jpg "Old MBP"){:width="250px"}  

- Old Mac Book Pro (mid 2010 model, Intel Core 2 Due 2.4GHz, 4GB RAM, 256SSD) for doing iPhone photo transfers and learning Macish

And various other laptops I support which I'll need to get a Cinebench score for. Please let me know your fastest (and slowest) scores in the comments

- Ellie's MBP (2015, 256SSD)
- XPS17 (8GB RAM, no SSD as stolen for old MBP)
- XPS15 (dodgy - hard resets after a few minutes when warming up)

## Azure hardware

![alt text](/assets/2020-02-03/25.jpg "Azure Windows Server D2s_v3"){:width="250px"}  

- Azure Windows Server, Standard_D2s_v3 Server (Intel Xeon Platinum 8171M 2.1GHz, 1 core, 2 threads) $154 per month

![alt text](/assets/2020-02-03/31.jpg "Azure Windows Desktop D2s_v3"){:width="250px"}  

- Azure Windows 10 Desktop 1909, Standard_D2s_v3 Server (Intel Xeon Platinum 8171M 2.1GHz, 1 core, 2 threads) Interestingly Cinebench reports 2.1GHz and it doesn't seem to turbo to 2.6.  
- Also interesting is 357 then 344 score I got afterwards.. maybe it was doing other tasks as the machine had just been built.

![alt text](/assets/2020-02-03/26.jpg "Azure Windows Server Standard_B2s"){:width="250px"}  

- Azure Standard_B2s Server (Intel Xeon E5-2673 v4, 2 cores, 4GB RAM) $41 per month

![alt text](/assets/2020-02-03/27.jpg "Azure Windows Server Standard_H8"){:width="250px"}  

- Azure Standard_H8 Server (Intel Xeon E5-2667 v3, 8 cores, 56GB RAM) - $1,245 per month

![alt text](/assets/2020-02-03/28.jpg "Azure Windows Server Standard_D16s_v3"){:width="250px"}  

- Azure Standard_D16s_v3 Server (Intel Xeon Platinum 8171M, 16 cores, 64GB) - $1238 per month

[Azure VM Sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-b-series-burstable?toc=/azure/virtual-machines/linux/toc.json&bc=/azure/virtual-machines/linux/breadcrumb/toc.json)

[Azure pricing calculator](https://azure.microsoft.com/en-gb/pricing/calculator/?service=virtual-machines)

Interestingly it is reporting Server 2016 but it is 2019 installed. And the processor should be 2.6GHz but is reporting 2.1 (and during load it is only hitting 2.1).  This is a very low score, which could point to having access to a slow dev machine to be a good thing (or as I do, have everything as infrastructure as code so you can easily spin up and down machines).

## How often should we refresh local hardware

I used to get new machines every 3 years as a matter of principle, however:

It has really surprised me that my main development machine is nearly 6 years old and is still fast. I regularly reinstall Windows 10 and have plenty of RAM and a reasonable SSD.

It has also surprised me how fast desktop machines are in comparison to laptops.

My main applications these days are:

- VS2019 with Resharper
- VSCode (Electron)
- Paint.NET
- OneNote
- Teams
- Cmder for the shell
- Windows Subsystem for Linux (running Azure CLI bash scripts)
- WhatsApp (Electron)
- Plex (for running the family's media streaming to the TV powered by an Amazon Fire Stick)

So in terms of performance, I've got no issues at the moment. Technology does wear out though, so keeping things fresh is a good idea.

[Here are Cinebench rankings](https://hwbot.org/benchmark/cinebench_-_r15/halloffame) showing that my score of 1919 is measly compared to modern CPUS eg Ryzen 7 3700X [passmark score of 23,840](https://www.cpubenchmark.net/cpu.php?cpu=AMD+Ryzen+7+3700X&id=3485) compared with [passmark of 11,164](https://www.cpubenchmark.net/cpu_lookup.php?cpu=Intel+Core+i7-4790K+%40+4.00GHz&id=2275) for my 4790K.

So in total, a doubling a power (roughly) for a modern day system.

## Other Benchmarks

[cpubenchmark.net](https://www.cpubenchmark.net/) is good for seeing specific CPU's with the [entire list of cpus](https://www.cpubenchmark.net/CPU_mega_page.html) 

[userbenchmark.com](https://userbenchmark.com) looks to [be flawed](https://www.tomshardware.com/uk/news/userbenchmark-benchmark-change-criticism-amd-intel,40032.html)

## Conclusion

Older machines are more than powerful enough for my needs, however I will keep hardware fresh to keep learning and made sure lack of power never gets in my way.