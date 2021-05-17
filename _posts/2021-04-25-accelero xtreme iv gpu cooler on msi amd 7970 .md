---
layout: post
title: Accelero Xtreme IV GPU Cooler on MSI AMD 7970   
description: Cooling an MSI AMD 7970 GPU which used to scream like a banshee. It was loud. The banshee is now silenced.
#menu: review
categories: GPU 
published: true 
comments: false     
sitemap: false
image: /assets/2021-04-12/card2.jpg
---

**Update 17th May 2021 After a month of working well the card started locking up with a solid colour on the screen. I've had to abandon this idea - don't know what went wrong**

[![Accelero Xtreme IV](/assets/2021-04-12/card2.jpg "Accelero Xtreme IV")](/assets/2021-04-12/card2.jpg)

[My MSI AMD 7970 card](/2021/01/27/amd-7970-graphics-card-and-philips-BDM4037U-monitor) used to scream like a banshee on full load. It was loud.

[The Accelero Xtreme IV](https://www.arctic.de/en/ax4) GPU Cooler on [Amazon for £51](https://www.amazon.co.uk/gp/product/B00HHMJIIO/ref=ppx_yo_dt_b_asin_title_o03_s00?ie=UTF8&psc=1) is a great addition to it to get it working near silently.

[The Manual](https://support.arctic.de/ax4-rev2) and [secondary](https://gzhls.at/blob/ldb/b/1/e/3/46a7b856c2bf062b38782974e0507801351e.pdf) are good reasources, however [Dans Tech YouTube](https://www.youtube.com/watch?v=q-1n7FLh2L4) was more useful in putting this together.

This has been my first time taking apart a GPU and putting on a cooler. In retrospect it is not tricky, but nonetheless, nerve-wracking.

Have a look at Dan's video for details, but I'm showing you my highlights.


<!-- [![Bitcoin logo](/assets/2021-04-12/card.jpg "Bitcoin"){:width="500px"}](/assets/2021-04-12/card.jpg) -->
[![Thermal Pads](/assets/2021-04-12/card.jpg "Thermal pads")](/assets/2021-04-12/card.jpg)

Thermal Pads

[![Thermal Paste](/assets/2021-04-12/paste.jpg "Thermal Paste")](/assets/2021-04-12/paste.jpg)

Thermal paste. It is very sticky - don't touch it. My GPU is rotated at 45degress off horizontal, and but from looking at the GPU and cooling, it should work (it does)

[![Transparent Shield](/assets/2021-04-12/cover.jpg "Transparent Shield")](/assets/2021-04-12/cover.jpg)

Look carefully and there is a transparent shield to stop the black heatsink (shown in background) hitting any of the circuitry.


## Partial Success

It is so much quieter!

The card isn't getting quite enough cooling. Even with fans at 100% I can overheat the card after a while of maximum usage. Even with the side off the case and case fans on max.

Time to try again, with:

- Crank up the screws that go straight onto the dye

- More thermal paste [https://www.amazon.co.uk/ARCTIC-MX-4-2019-Performance-Durability/dp/B07L9BDY3T/ref=sr_1_3?dchild=1&keywords=thermal%2Bpaste&qid=1618823683&sr=8-3&th=1](https://www.amazon.co.uk/ARCTIC-MX-4-2019-Performance-Durability/dp/B07L9BDY3T/ref=sr_1_3?dchild=1&keywords=thermal%2Bpaste&qid=1618823683&sr=8-3&th=1)



## Success

After cranking down the downs (like the instructions said) performance was much better.

I'm using [nicehash](https://www.nicehash.com/) to stress my card

[![Bitcoin logo](/assets/2021-04-12/77.jpg "Bitcoin")](/assets/2021-04-12/77.jpg)

Gives me a steady 77 (up to 80 over a period of hours) with the case open.

[![Bitcoin logo](/assets/2021-04-12/nice.jpg "Bitcoin")](/assets/2021-04-12/nice.jpg)

Nicehash stressing my card.

[![Bitcoin logo](/assets/2021-04-12/case.jpg "Bitcoin")](/assets/2021-04-12/case.jpg)

Note you can see the brace which extends over 4 slots to keep the card from wobbling. This is very useful and has shown that my connectors were flexing and causing [card issues](/2021/01/27/amd-7970-graphics-card-and-philips-BDM4037U-monitor)

[![Bitcoin logo](/assets/2021-04-12/90.jpg "Bitcoin")](/assets/2021-04-12/90.jpg)

With case closed and case fans on max I'm hitting 90. I've only got 1 intake fan at the front and 1 exhaust at the rear, so could do with more to get better cooling.

With my case fans turned down temps rose up to 94 before I went to max again (thermal throttle is around 97).

## Conclusion

This is a success. 

[Reddit/r/Amd discussion of article here](https://www.reddit.com/r/Amd/comments/my3c5w/cooling_an_msi_amd_7970_gpu_which_used_to_scream/_)

My goal was to get noise down and to be able to play games on this rig without overheating it.


