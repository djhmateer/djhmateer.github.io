---
layout: post
#title: Python - Bellingcat auto-archiver
# description: Download vs View a PDF or Image from .NET6 Razor Pages with source code
menu: review
categories: Networking
published: true 
comments: false     
sitemap: true
image: /assets/2022-03-10/view.jpg 
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->

My ISP [Plusnet](https://www.plus.net/) sent me a new router named the [Plusnet Hub Two](https://www.plus.net/help/broadband/router-setup-guides/hub-two/) after I signed up again with them for another 2 years.

[![alt text](/assets/2022-04-11/one.jpg "desktop")](/assets/2022-04-11/one.jpg)

Lets see how good the new router is compared to the older [Hub One](/2022/01/12/home-web-server)

[![alt text](/assets/2022-04-11/back.jpg "desktop")](/assets/2022-04-11/back.jpg)


[fasterbroadband router review](https://www.fasterbroadband.co.uk/broadband-reviews/plusnet)

It is a rebrand of the [BT Smart Hub 2](). Has better aerials and improved internal filters. Can change DNS too.

Summary

- Can it handle WiFi6? (no)
- Is the range any better? (no, but it seems to not have a the lag whilst deciding between bands)
- I've got 14 days cooling off period for new contract (until April the 19th) which is £24.99 per month which gives me around 48 down and 11 up. The biggest reason I'm still with them is good customer service. ie they answer the phone and sort billing problems out quickly.
- I've got a [proxmox server](/2022/01/13/proxmox) hosting a website so need 80 and 443 port forwarded. (works fine)
- I use dynamic dns - NoIP. (Works fine)
- I need static reserved IP internal addresses so proxmox works well. (works fine)
- I'm splitting 2.4GHz and 5GHz bands as have [dropoff/switching](/2022/03/05/5ghz-wifi-on-windows) lag on some devices (Windowns desktop and iPhone7). Favouring 5GHz. (no this didn't work - can't do it on this new device)

## Wifi

```
| Gen     | Standard | Band            |
| ------- | -------- | --------------- |
| Wi-Fi 1 | 802.11b  | 2.4 GHz         |
| Wi-Fi 2 | 802.11a  | 5 GHz           |
| Wi-Fi 3 | 802.11g  | 2.4 GHz         |
| Wi-Fi 4 | 802.11n  | 2.4 GHz / 5 GHz |
| Wi-Fi 5 | 802.11ac | 5 GHz           |
| Wi-Fi 6 | 802.11ax | 5 GHz           |
```
[From the SO Question](https://superuser.com/questions/1400086/can-you-disable-the-2-4ghz-band-on-a-wi-fi-card)

[![alt text](/assets/2022-04-11/prop.jpg "desktop")](/assets/2022-04-11/prop.jpg)

So the new hub can't do WiFi6. But, I've got 780 each way to the router from my desktop which is fine.

Can't separate the 2.4 and 5GHz networks [here](https://community.plus.net/t5/Tech-Help-Software-Hardware-etc/Separate-Bands-with-a-Smarthub-2-or-Plusnet-Hub-2/td-p/1843141)

Speed seems the same at 45.5 and 13.6

[![alt text](/assets/2022-04-11/man.jpg "desktop")](/assets/2022-04-11/man.jpg)

This is nice to see all the devices, and you can rename them.

## Summary

It works. The line has been solid for the last 7 years and I can't remember any downtime.

[Trooli](https://www.trooli.com/#packages) is so tempting for the teccie in me with 300/100 speed and WiFi6 router. However we want a telephone for emegencies (young family), and having a slower, stable internet connect is fine. Having plusnet who answer the phone and sort things out is a plus too. Trooli have some work to do (there are negative reviews out there).

After a week of trying this ....



