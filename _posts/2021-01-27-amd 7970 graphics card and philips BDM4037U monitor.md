---
layout: post
title: AMD 4790 Graphics Card and Philips BDM4037U monitor 
description: 
menu: review
categories: AMD 
published: true 
comments: false     
sitemap: false
image: /assets/2021-01-27/desktop.jpg
---

[![My desktop](/assets/2021-01-27/desktop.jpg "My desktop")](/assets/2021-01-27/desktop.jpg)

Having a great development machine setup is important. 

I've been struggling with my graphics card and monitor setup for years, and frankly gave up getting it running at optimal resolution and refresh rates.

Here is the story of me somewhat fixing it

And learning more than I thought about the wonderful world of graphics cards.


## AMD Radeon HD 7970

I've got 2 of these cards which were bought back around April 2013 for Bitcoin mining.

[![My card 7970](/assets/2021-01-27/msi.jpg "7970"){:width="500px"}](/assets/2021-01-27/msi.jpg)

Looking on the sticker on the back I've got a: R7970 - 2PMD3GD5/OC

On the front it is badged as a [MSI - Micro Star International](https://en.wikipedia.org/wiki/Micro-Star_International) card. MSI make cards based on Nvidia and AMD gpu chips. [https://gpu.userbenchmark.com/](https://gpu.userbenchmark.com/) shows that Nvidia have double the number of cards that AMD have, and currently have a higher user rating. It is hard to get graphics cards just now (eg the AMD Radeon 6800 / 6900 XT and Nvidia 3080 and 3090)

The card is based on the reference [AMD Radeon HD 7000 series - wikipedia article](https://en.wikipedia.org/wiki/Radeon_HD_7000_series) which is a family of GPU's developed by [AMD - Advanced Micro Devices](https://en.wikipedia.org/wiki/Advanced_Micro_Devices) and manufactured by TSMC around Q1 2012. [ATI was bought by AMD in 2006](https://en.wikipedia.org/wiki/ATI_Technologies) and is now a division of AMD. 

[Here is a reference card review](https://www.tweaktown.com/reviews/4510/amd_radeon_hd_7970_3gb_reference_video_card_review/index.html)

It uses the 28nm manufacturing process. By comparison the Nvidia GEFORCE RTX 3090 uses an 8nm process today in early 2021.

In the winter of 2011 this card sold for around $549.

[![Rig](/assets/2021-01-27/rig.jpg "rig"){:width="500px"}](/assets/2021-01-27/rig.jpg)

Many manufacturers (partners) used this design (reference design card) eg Club, Diamon, Gigabyte, HIS, Sapphire, PowerColor. All kept the 7970 in the product name. Except for AMD themselves who rebranded this as the [R9 280X](https://www.techpowerup.com/gpu-specs/radeon-r9-280x.c2398) in late 2013 for $299.

In 2020 this is about a $60USD card on ebay. Apparently running at 1080p (1920 * 1080) is the way to go. 

[MSI R7970-2PMD3GD5/OC](https://www.msi.com/Graphics-Card/R79702PMD3GD5OC/Specification)

[Geeks3d - FurMark 1.25.0.0](https://www.geeks3d.com/dlz/#gpu_benchmarks) includes GPUz which gives great information about the card.

- 2048 shader cores
- 3GB Memory
- 1010 MHz GPU clock
- 1375 MHz Memory clock
- TDP 250W

[techpowerup.com specs](https://www.techpowerup.com/gpu-specs/msi-hd-7970-oc.b339) are the most accurate.

[![My card 7970](/assets/2021-01-27/outputs.jpg "7970"){:width="500px"}](/assets/2021-01-27/outputs.jpg)

- 1 DVI Dual link DVI-I x 1
- 1 HDMI version 1.4a
- 2 Mini displayport version 1.2

It can output at 4k ie:

- 3840*2160
- 60Hhz on the mini display port

The drivers I'm running are from Jan 18, 2021 [from here](https://www.amd.com/en/support/graphics/amd-radeon-hd/amd-radeon-hd-7000-series/amd-radeon-hd-7970)

Card can run at GPU Clock of 1010 MHz, 500MHz, then 300 MHz. If you exceed around 100oC it will throttle back to 500 MHz.

## Fan Speed

[![My card 7970](/assets/2021-01-27/inside.jpg "7970"){:width="500px"}](/assets/2021-01-27/inside.jpg)

So - here is the my real issue with this card.

It is loud.

Screaming like a banshee loud under full load.


[MSI Afterburner](https://www.msi.com/Landing/afterburner) I use to control my fan speed which automatically ramps up and down too quckly and is distracting in everyday use. I have noticed that my cases internal fans were not at max, so this helps cooling now, and the ramping up and down of the gpu fan isn't as pronounced.

[![Demo site](/assets/2021-01-27/gamer.jpg "fan"){:width="800px"}](/assets/2021-01-27/gamer.jpg)


When cranking the card hard eg [War Thunder](https://store.steampowered.com/app/236390/War_Thunder/) which is free to play, on 1080p at Max settings, I'm getting around 100fps.

<!-- [![Demo site](/assets/2021-01-27/138.jpg "fan"){:width="800px"}](/assets/2021-01-27/138.jpg) -->
[![Demo site](/assets/2021-01-27/138.jpg "fan")](/assets/2021-01-27/138.jpg)

The game runs really well!


[![Demo site](/assets/2021-01-27/91.jpg "fan")](/assets/2021-01-27/91.jpg)

Fan going around 90%, temp hitting 97. Super loud. Not good.

After around 100oC the card will thermally throttle to 500MHz clock speed, and I have to restart the machine to get back to full power.

[![Demo site](/assets/2021-01-27/throttled2.jpg "fan"){:width="700px"}](/assets/2021-01-27/throttled2.jpg)

Under everyday load (I'm a developer) I'm throttling the card to 505MHz to keep the temps down and the fan speed down.

## After market cooler

[Arctic Accelero Xtreme 7970 Card Cooler](https://www.amazon.co.uk/Arctic-Cooling-Accelero-Xtreme-7970/dp/B0074VVK52)

[https://www.arctic.de/en/ax3 - Arctic Accelero Xtreme III or IV](https://www.arctic.de/en/ax3) Maybe this newer cooler would help?


## Philips BDM4037U

This can operate at 3840*2160 at 60Hz on the Display port.

[Monitor Manual](https://www.download.p4c.philips.com/files/b/bdm4037uw_00/bdm4037uw_00_dfu_eng.pdf)

- HDMI 1.4: 3840 x 2160 @ 30Hz
- HDMI 2.0: 3840 x 2160 @ 60Hz
- DisplayPort 1.1: 3840 x 2160 @ 30Hz
- DisplayPort 1.2: 3840 x 2160 @ 60Hz

I've found the biggest problem is that the montor is 'smart' and tries to figure what what is connected and therefore what to display. And the graphics card is 'smart' and does the same thing. So it is very hard to get 4k running at 60Hz


### The System has detected a link failure

**update** it also something to do with this error from the AMD driver

[![Demo site](/assets/2021-01-27/error.jpg "error")](/assets/2021-01-27/error.jpg)

From googling around it seems it is to do with the type of Display Port 1.2 cable. And it could be a driver issues problem.

My tactics are:

- use the grey cable (ie a known good one)
- and the hdmi cable I connected to another external monitor
- unplug the power of the monitor then plug back in
- watch on display settings 

I do sometimes get flickering (and a black screen) and have to waggle the cable around at the back of the graphics card.

## CUDA

Cuda is limited to NVIDIA hardware. OpenCL is the best alternative on AMD.

## Youtube

[2016 - Is the HD 7970 still worth buying](https://www.youtube.com/watch?v=rpXpA-xteAI)

## Future

So I do have annoying stability issues with this setup, however when it is working (and the kids don't bump into the computer), it does work beautifully.

However this is not a smart way to go.

I think I'll be going towards an NVidia card, water cooled potentially for less noise whilst gaming, and for the ability to do CUDA based programming.