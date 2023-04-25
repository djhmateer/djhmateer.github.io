---
layout: post
title: Developer Desktop Build 2023
description: 
menu: review
categories: hardware
published: true 
comments: false     
sitemap: true
image: /assets/2023-01-30/1.jpg
---

<!-- ![alt text](/assets/2022-11-03/2.jpg "email")](/assets/2022-11-03/2.jpg) -->

This is a daily driver PC for the next 5 - 7 years as a developer (only occasional gamer!). 


[![alt text](/assets/2023-01-30/3.jpg "email")](/assets/2023-01-30/3.jpg)

Why change? I've run out of disk space on the current machine (which has 256GB SSD) and maxing out memory (16GB), and have a smart caution on one of my 4TB spinning HDD drives. [Crystal DiskInfo](https://crystalmark.info/en/software/crystaldiskinfo/) to get stats

I'm going for a fairly average power build with high storage and high memory, and it's my first every build from parts, so just having fun!

Interestingly Damien Edwards has built around 12 machines over the last 3 years [Video Here](https://www.youtube.com/watch?v=Lv4eiMajw2M) so this may be a fun start of building as a hobby! at 29 minutes in he starts the build with tips eg how tight to tighten screws.

[PCParkPicker of Hanselrig](https://pcpartpicker.com/user/DamianEdwards/saved/#view=444DwP)

[PCPartPicker summary](https://uk.pcpartpicker.com/user/davemateer/saved/#view=h9q6Q7) of this build

[LTT sister build](https://www.youtube.com/watch?v=AOdp09SYhCc) - z690, 3060ti

[CPU chooser - toms guide](https://www.tomshardware.com/reviews/best-cpus,3986.html) 

## Buying Kit

Inspect boxes when you receive them for damage!

Where to buy stuff in the UK?

-Amazon. Good as can cross ship if have got a problem. support bot try and get.
-scan.co.uk
-overclockers.co.uk


[reddit buildapcsalesuk](https://www.reddit.com/r/buildapcsalesuk/)

## CPU

Team Blue (Intel).. team Red (AMD)

Intel (13th gen - Raptor Lake) - £313

-Core i5-13600K or KF (KF = no onboard graphics). Prefer to get integrated graphics so easier to test on boot up.

LGA-1700 socket

[cpu mark](https://www.cpubenchmark.net/cpu.php?cpu=Intel+Core+i5-13600K&id=5008) 38,400

[![alt text](/assets/2023-01-30/1.jpg "email")](/assets/2023-01-30/1.jpg)

I went for this as very [good price for performance](https://www.cpubenchmark.net/cpu_value_available.html) - this processor is still great value for the power (was in Jan 23 and now Apr 23)

[![alt text](/assets/2023-01-30/2.jpg "email")](/assets/2023-01-30/2.jpg)

Interestinly the xxxx is only $90 more..

## Motherboard (MOBO)

We're going for LGA-1700 as there are 1,700 pins on 12th and 13th gen of CPU's

Want at least 2 * m.2 slots

[Toms Guide](https://www.tomshardware.com/best-picks/best-motherboards)

MSI PRO Z690-A WIFI DDR4 ATX LGA1700 Motherboard £200

Also Asus are a good brand


B660M - no. can be slower

z690 - yes. Good for overclocking if need it 

z790 - don't need yet

I'm going with DDR4 RAM currently

ATX, Micro ATX and Mini-ITX. (Mini is smaller than Micro)

[PC Builder](https://www.youtube.com/watch?v=JEViM1s4UMY)

2 types of headers with different pins
aRBB - addressable rgb
RBG


## Wifi

Useful to have as things like mirrorcast or wideeye need wifi. Even if you're using wired ethernet.

## CPU Contact Frame

To stop the scissor mechanism from bending the CPU, thus causing issues for cooling.

## RAM

You want to buy a paired memory kit, so the DIMM (Dual Inline Memory Module)'s are matched



They don't have 64HB DIMMs yet (DDR5)

64GB of DDR4

Corsair LPX  amazon

3200 DDR4 (only need 3600 if overclock)

will the mobo support XMP to this RAM type that I'm going to buy?
## SSD Storage

Put dev on different drive to the system so I want 2 * m.2

m.2 SSD

PCIe 4.0 is the latest eg Samsung 990 Pro. But expensive. Actually 5.0 is latest!

2280 is the mainstream length of an ssd

[Crystal disk info](https://crystalmark.info/en/software/crystaldiskinfo/) to get smart ie how degraded is ssd and other drives. I've got a caution on one of my spinning drives (Uncorrectable sector count of 8). So time to retire that drive for sure. My main SSD an 840 PRO Series 256 has a 75% wear levelling count.

need to make sure to upgrade the firmware of the ssd

## CPU Cooler

You can air cool a 13900k but you will be limiting it. Damien recommends large water coolers for modern cpus

On setup if we tell the mobo it has AIO (All in one, so I don't have to plug in hoses, they are done already) or Watner cooling the cpu can draw as much power as it needs.. 250-350W!

Air cooler

[Deepcool AK620 68.99 CFM CPU Cooler]()

or

ARCTIC Liquid Freezer II 360 A-RGB 48.8 CFM Liquid CPU Cooler - but it costs £180

Use arctix thermal paste mx5

## PSU

Modular power supply means none of the cables are attached

Platinum is highly efficient

Corsair are good.

cheaper ones will be nosier and less efficient maybe

## BIOS

Simple and Advanced mode

OC - overclocking! Not tiner

CPU cooler tuning - want full power (water)

TPM2.0 built in for Win 11.

XMP 1 - enable that profile.. then reboot
 switch disabled to this profile
 then it will do memory training.. black screen

he was on 4000 MHz, then with XMP (Extreme memory profile), can go faster. to 5200 MHz


## Windows

Win 11 Pro?

Windows 11 setup without network to get around not being able to do a local install. Shift 10 open terminal, oob slash something, which will reboot back into oob

```cmd
# search for drivers for network card (wired and wireless)
# there were on a tiny usb key that came with the mobo
pnputil
# beginnings of hack to allow local account
oobe\bypassnro
```

then usb key that came with motherboard 

sign up with personal account

Samsung Magician - to update SSD firmware

MSI Centre to update mobo drivers


[HW Info 64](https://www.hwinfo.com/download/) to monitor temps

Cinebench r23 to give load (use MS Store to easily get it)


Here is my old 4790k running cinebench with an air cooler

[![alt text](/assets/2023-01-30/4.jpg "email")](/assets/2023-01-30/4.jpg)

pulling 100W and maxing around 92 degrees (hit 97 later on 30min run). Didn't thermal throttle (yet)

I got: 4,712, 4,560.. single runs... then for a 30 min run (Test Stability) 4,702

39,600 is what hanselman got on his 13900k (LTT only got 36,000 with no work) - so good silicon!


Intel XTU - to do overclocking of CPU. But core isolation. 

[AIDA64](https://aida64.co.uk/download) for memory testing

## Case

Mid tower

## GPU 

Team Green (Nvidia) vs Team Red (AMD)

[PC Builder GPU Price spreadsheet](https://docs.google.com/spreadsheets/d/1Y-XKBPTL8RyAuw_Kkcye1FIjFGlnb7dacdN3EEybWGs/edit#gid=955405380)

do not buy 3060 8gb.. need 12gb

3070 msi model?

I want to go with NVidia purely as can then talk to the gpu

[amazon bestseller gpu](https://www.amazon.co.uk/gp/bestsellers/computers/430500031/ref=zg_b_bs_430500031_1)

But I'm not gaming at the moment, and prices are falling. Don't want kids gaming on my PC!



### Cables

ATX connector is to the mobo

need 2 CPU cables?


## Networking

Am putting in ethernet, but also wifi is super userful

I want a long antenna option


## Monitor

I want to game at 144MHz at 1440p. Probably 27inch

- 1080p
- 1440p
- 4k

[PC Builder - best gaming monitor 2023](https://www.youtube.com/watch?v=00l3Uq6oyic)

## Keyboard

I like Microsoft keyboards and mice.. for development. But letters have worn off current once.


[Microsoft Desktop 2000](https://www.amazon.co.uk/Microsoft-Wireless-Desktop-Keyboard-Layout/dp/B0055JDLVG/) £34

[Microsoft Wireless 4000](https://www.amazon.co.uk/Microsoft-Wireless-Mobile-Mouse-4000/dp/B0992LXCLT/) £60


XXXXXXX
## Strategy

Read up on background on latest CPUs, MOBO (Motherboards), Memory, GPUS, monitors, keyboards, m.2, SSD, WiFi

- PCPro Magazine
- [reddit.com/r/buildapc](https://www.reddit.com/r/buildapc/) - 6.2m members, 4.8k online
- Linus Tech Tips


## DUMP
w computer fun!
 uk pc build reddit?
 quietpc
 https://www.cyberpowersystem.co.uk/category/pc-filter/price-1500to1999/
https://www.chillblast.com/learn/intel-or-amd-cpu-a-buyers-guide/
   best bang for buck

 get a previous gen or 2?
 compare cpu's
  https://www.cpubenchmark.net/
  get bang for buck!

https://pcpartpicker.com/list/8DKbY9
https://uk.pcpartpicker.com/list/8DKbY9
 UK amazon - £300 monitor - 27"
  1ms response
  1080

https://www.pcspecialist.co.uk/
 voucher code in PRO22

ssd
 1tb £86

memory 32GB £84

cpu cooler
 £105


## Windows 11 Pro vs Win 11 Home

[MS Compare Win](https://www.microsoft.com/en-us/windows/compare-windows-11-home-vs-pro-versions?r=1)

- Bitlocker on pro

[WSL2 is on home](https://learn.microsoft.com/en-us/windows/wsl/faq#wsl-2) for Win 10 and 11

## Pre build ideas

[https://buildredux.com/pages/build-your-pc](https://buildredux.com/pages/build-your-pc) good, better, best


## CPU - AMD or Intel?

asdf

virtualisation

## Motherboard

asdf

## Network card

Would love an extendable aerial for wifi

## Graphics - Nvidia or AMD

I want to be able to play latest titles

CUDA?

3070 8GB

3060Ti 8GB - made by MSI GeForce

## Screen

I've never had a 'gaming' screen ie high refresh rate.. would be fun to try


## Memory

32 or 64GB probably

## Disks

1 or 2TB



New Mechanical disk?