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

Having a great development machine setup is important. I've been struggling with my graphics card and monitor setup to get it running at optimal capacity for many years, and frankly gave up.

Here is the story of me somewhat fixing it

And not wanting to touch the setup 

Having a great dispaly is so nice!


## Graphics Card AMD Radeon

Looking on the sticker on the back I've got an [MSI R7970-2PMD3GD5/OC](https://www.msi.com/Graphics-Card/R79702PMD3GD5OC/Specification)

[geeks3d](https://www.geeks3d.com/dlz/#gpu_benchmarks) includes GPUz which gives great information about the card.

The GPU is an ATI Radeon R9 200 / HD 7970 from around 2013. [techpowerup.com specs](https://www.techpowerup.com/gpu-specs/msi-hd-7970-oc.b339). 2048 cores. 3GB RAM

This can output at 4k ie:

- 3840*2160
- 60Hhz on the mini display port

Strangely the specs sheets say the max resolution is lower, but I can run 4k fine. Possibly I've got a newer model.

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

There are VS2019 samples in 

