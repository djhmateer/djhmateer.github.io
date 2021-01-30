---
layout: post
title: MSI 4790 Graphics Card and Philips BDM4037U monitor 
description: 
menu: review
categories: MSI 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

Having a great development machine setup is important. I've been struggling with my graphics card and monitor setup for years, and frankly gave up getting it running at optimal resolution and refresh rates.

Here is the story of me somewhat fixing it

And learning more than I thought about the wonderful world of graphics cards.

Having a great dispaly is so nice!


## AMD Radeon HD 7970

[![My card 7970](/assets/2021-01-27/msi.jpg "7970"){:width="500px"}](/assets/2021-01-27/msi.jpg)

Looking on the sticker on the back I've got a: R7970 - 2PMD3GD5/OC

On the front it is badged as a [MSI - Micro Star International](https://en.wikipedia.org/wiki/Micro-Star_International) card. MSI make cards based on Nvidia and AMD gpu chips.

The card is based on the reference [AMD Radeon HD 7000 series - wikipedia article](https://en.wikipedia.org/wiki/Radeon_HD_7000_series) which is a family of GPU's developed by [AMD - Advanced Micro Devices](https://en.wikipedia.org/wiki/Advanced_Micro_Devices) and manufactured by TSMC around Q1 2012. [ATI was bought by AMD in 2006](https://en.wikipedia.org/wiki/ATI_Technologies) and is now a division of AMD. In the winter of 2011 it sold for around $549.

It uses the 28nm manufacturing process. By comparison the Nvidia GEFORCE RTX 3090 uses an 8nm process today in early 2021.

Many manufacturers (partners) used this design (reference design card) eg Club, Diamon, Gigabyte, HIS, Sapphire, PowerColor. All kept the 7970 in the product name. 

[Here is a reference card review](https://www.tweaktown.com/reviews/4510/amd_radeon_hd_7970_3gb_reference_video_card_review/index.html)

AMD rebranded this as the [R9 280X](https://www.techpowerup.com/gpu-specs/radeon-r9-280x.c2398) in late 2013 for $299.

In 2020 this is about a $60USD card on ebay. Apparently running at 1080p (1920 * 1080) is the way to go

[MSI R7970-2PMD3GD5/OC](https://www.msi.com/Graphics-Card/R79702PMD3GD5OC/Specification)


[geeks3d](https://www.geeks3d.com/dlz/#gpu_benchmarks) includes GPUz which gives great information about the card.

- 2048 shader cores
- 3GB Memory
- 1010 MHz GPU clock
- 1375 MHz Memory clock
- TDP 250W

- Oct 8th 2013

[techpowerup.com specs](https://www.techpowerup.com/gpu-specs/msi-hd-7970-oc.b339) are the most accurate.

[gpuzoo excellent specs](https://www.gpuzoo.com/GPU-AMD/Radeon_HD_7970_GHz_Edition.html)

It can output at 4k ie:

- 1 DVI Dual link DVI-I x 1
- 1 HDMI version 1.4a
- 2 Mini displayport version 1.2

- 3840*2160
- 60Hhz on the mini display port


The drivers I'm running are from Jan 18, 2021 [from here](https://www.amd.com/en/support/graphics/amd-radeon-hd/amd-radeon-hd-7000-series/amd-radeon-hd-7970)

Card should run at GPU Clock of 1010MHz, bit it does seem to throttle back 500MHz which is good.

## Fan Speed

[MSI AFterburner](https://www.msi.com/Landing/afterburner) I use to control my fan speed which automatically ramps up and down too fast and is distracting in everyday use.

[![Demo site](/assets/2021-01-27/gamer.jpg "fan"){:width="500px"}](/assets/2021-01-27/gamer.jpg)

[![Demo site](/assets/2021-01-27/fan.jpg "fan"){:width="500px"}](/assets/2021-01-27/fan.jpg)

I've noticed that Furmark will run so hot - up to 97oC that my cooler can't keep up, then the GPU thermal throttles back to 500MHz. The only way to reset it I've found is to reboot.


## Philips BDM4037U

This can operate at 3840*2160 at 60Hz on the Display port.

[Monitor Manual](https://www.download.p4c.philips.com/files/b/bdm4037uw_00/bdm4037uw_00_dfu_eng.pdf)

- HDMI 1.4: 3840 x 2160 @ 30Hz
- HDMI 2.0: 3840 x 2160 @ 60Hz
- DisplayPort 1.1: 3840 x 2160 @ 30Hz
- DisplayPort 1.2: 3840 x 2160 @ 60Hz

I've found the biggest problem is that the montor is 'smart' and tries to figure what what is connected and therefore what to display. And the graphics card is 'smart' and does the same thing. So it is very hard to get 4k running at 60Hz

My tactics are:

- use the grey cable (ie a known good one)
- and the hdmi cable I connected to another external monitor
- unplug the power of the monitor then plug back in
- watch on display settings 

## CUDA

[https://developer.nvidia.com/cuda-downloads](https://developer.nvidia.com/cuda-downloads)

Installed Nsight for VS 2019
Nsight monitor

There are VS2019 samples in `c:\ProgramData\NVIDIA Corporation\CUDA Samples\v11.2`


## Youtube

[2016 - Is the HD 7970 still worth buying](https://www.youtube.com/watch?v=rpXpA-xteAI)
