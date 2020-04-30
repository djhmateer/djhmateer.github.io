---
layout: post
title: HDD vs SSD SATA vs M2 NVMe - CrystalDiskMark results summary
description: Using an old HDD is a seriously bad idea! Disk Performance review of an HDD / SSD / SSD M.2 NVMe
#menu: review
categories: SSD 
published: true 
comments: true     
sitemap: true
image: /assets/2020-04-19/5.jpg
---

I needed to reinstall Win10 on my spare laptop that I'd stolen the SSD out of and had a 10 year old hard disk sitting around.

> Seriously bad idea!

It took all day to install Windows 10 and updates (compared to an hour or so I'd expect)

This got me curious as to performance differences between modern day drives and older drives.

[CrystalDiskInfo](https://crystalmark.info/en/download/) is good for the information, and [CrystalDiskMark - scroll down page](https://crystalmark.info/en/download/) gives a good idea of benchmark speed. [Reviewers on Amazon commonly use this tool](https://www.amazon.co.uk/gp/customer-reviews/R10MQS63PSXP2K/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B07LGF54XR)

## HDD / SSD / M.2 NVMe

A summary of terms:

- HDD  
    - SATA - Serial ATA bus
    - Laptops use 2.5" and full size are 3.5"

- SSD - Solid State Drive
    - SATA Usually 2.5 inch same size as Latpop HDD. 9.5mm or 7mm deep
    - mSATA - wafer think defunct standard
    - M.2 - wafer thin using a speed up technique called NVMe.

[Good article on Amazon about disks](https://www.amazon.co.uk/ospublishing/story/e3f3d5b1-09de-4652-b163-fa9a308bad33/ref=sxin_7?pd_rd_w=PLPJM&pf_rd_p=832a297b-927a-4f4b-9373-25187b5b678b&pf_rd_r=C7PE83186DNWGFZGX8X7&pd_rd_r=0dd0fa8c-8e58-4018-a6d8-a7d911fcecb7&pd_rd_wg=woWXU&qid=1587060816&cv_ct_pg=search&cv_ct_wn=osp-single-source&ascsubtag=amzn1.osa.e3f3d5b1-09de-4652-b163-fa9a308bad33.A1F83G8C2ARO7P.en_GB&linkCode=oas&cv_ct_id=amzn1.osa.e3f3d5b1-09de-4652-b163-fa9a308bad33.A1F83G8C2ARO7P.en_GB&tag=pcmagukonsite00-21&cv_ct_cx=ssd)

## HDD - 10 years old

![alt text](/assets/2020-04-19/1.jpg "Old Disk perf"){:width="800px"}  

From around the 2010 era of an Apple MacBook Pro.

## HDD - 8 years old

![alt text](/assets/2020-04-19/2.jpg "8 year old"){:width="800px"}  

Came with my XPS17 laptop (had dual ones of this drive)

## HDD - 5 years old

![alt text](/assets/2020-04-19/4.jpg "2 years old"){:width="668px"}  

4TB Western Digital inside a fast desktop. This is interesting - the perf of a relatively new HDD hasn't improved a lot.

## SSD - SATA 2.5 inch

![alt text](/assets/2020-04-19/3.jpg "3 year old laptop"){:width="666px"}  

Came with 3 year old Lenovo E560 laptop.

Notice it is 5 times the speed of the best HDD's I have!

## PCI Express to M.2 NVMe

If you've an old desktop, even a 14 year old motherboard (as my good friend has done) you can put in an M.2 NVMe drive using a PCI Express adapter. The motherboard didn't support x3 lanes, but even so with x2 lanes he was getting an impressive 1600 MB/s

[Glotrends PCIE NVMe Adapter Card PCIE GEN3 Full Speed for PC Desktop](https://www.amazon.co.uk/gp/product/B07FMM9G35/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&psc=1)

So this seems like a better option than using a SATA SSD (I could be wrong here but worth experimenting with - [See this PCWorld Article for more detail](https://www.pcworld.com/article/2899351/everything-you-need-to-know-about-nvme.html)).

## SSD - M.2 NVMe

![alt text](/assets/2020-04-19/5.jpg "Desktop"){:width="666px"}  

Wow - this is insanely fast compared to my SATA SSD

[Here is the latest Crucial SSD release giving an idea of where we are today](https://www.tomshardware.com/uk/news/crucial-p5-m2-nvme-ssds-fastest)

## Workload

If you've a large database workload eg 8TB of data, then it is cost prohibitive to put that all on M.2 NVMe (and gets into the questions of enough PCI Express Lanes). So perhaps consider:

- M.2 NVMe - 1TB. System. DB Indexes
- SATA SSD - 2TB. Secondary Indexes and log files
- HDD - 8TB - Main data

It all depends on your scenario. I'm a software developer and run a 256MB NVMe and 4TB HDD which is enough for me (just).

## Linus Tech Tips

[Linus Tech Tips on YouTube](https://www.youtube.com/user/LinusTechTips/featured) is an excellent resource. Search for SSD / HDD on there to find out the latest tech. [Linustechtrip forums](https://linustechtips.com/main/forum/38-storage-devices/) and a great deep dive resource.

## TRIM / SMART / DeepSleep

[See this stackoverflow thread for upgrading MacBook Pros to faster disks in detail](https://apple.stackexchange.com/questions/287644/do-macbooks-support-nvme-ssd-drives-via-the-use-of-a-sintech-adapter)

## Conclusion

It makes a massive difference having a good drive in your machine!

Always run your system drive from an SSD, and use HDDs cheap storage.
