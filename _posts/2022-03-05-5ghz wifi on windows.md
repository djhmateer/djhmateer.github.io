---
layout: post
# title: Extracting Speech Parts of audio or video using ffmpeg and SpeechBrain 
description: 
menu: review
categories: Wifi 
published: true 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- [![alt text](/assets/2022-01-25/flex.jpg "flex")](/assets/2022-01-25/flex.jpg) -->

My Apple iPhone 6 and MBP's can all successfully connect to my wifi router (which has 2.4GHz and 5GHz broadcasting as the same name) quickly and get the full 300/100 on speedtest.net

My windows devices seem more fickle, and more prone to connect at 2.4GHz.


## Windows Laptop 

[![alt text](/assets/2022-03-05/sun.jpg "desktop")](/assets/2022-03-05/sun.jpg)

Useful status

I get close to the router broadcasting on 2.4 and 5GHz, I can connect at 5GHz.

## WiFi

[From the SO Question](https://superuser.com/questions/1400086/can-you-disable-the-2-4ghz-band-on-a-wi-fi-card)

| Gen     | Standard | Band            |
| ------- | -------- | --------------- |
| Wi-Fi 1 | 802.11b  | 2.4 GHz         |
| Wi-Fi 2 | 802.11a  | 5 GHz           |
| Wi-Fi 3 | 802.11g  | 2.4 GHz         |
| Wi-Fi 4 | 802.11n  | 2.4 GHz / 5 GHz |
| Wi-Fi 5 | 802.11ac | 5 GHz           |
| Wi-Fi 6 | 802.11ax | 5 GHz           |



Then to force 5GHz only:

1. Device Manager » The wireless card » Properties » Advanced Tab
2. 802.11 a/b/g/n Wireless Mode set to 1.5GHz 8021.11a
3. 802.11n/ac Wireless Mode set to 802.11ac

To Force 2.4GHz only:

2. 801.11 a/b/g/n to b/g only (and not dual band)


## Disable 2.4GHz

asdf


## Desktop

[![alt text](/assets/2022-03-05/desktop1.jpg "desktop")](/assets/2022-03-05/desktop1jpg)

The problem - why can't my desktop connect to the SSID on 5GHz?


[![alt text](/assets/2022-03-05/desktop.jpg "desktop")](/assets/2022-03-05/desktop.jpg)

Here is the same desktop connecting to another 5GHz SSID. So the networking card can support 5GHz.

[Wikipedia](https://en.wikipedia.org/wiki/IEEE_802.11ac-2013)

## Mac

[![alt text](/assets/2022-03-05/mac.jpg "desktop"){:width="500px"}](/assets/2022-03-05/mac.jpg)

The Mac can connect to the SSID on 5GHz.

Option and click on the WiFi symbol to get these diagnostics

## Mm

<!-- [![alt text](/assets/2022-03-05/panel.jpg "desktop"){:width="500px"}](/assets/2022-03-05/panel.jpg) -->
[![alt text](/assets/2022-03-05/panel.jpg "desktop")](/assets/2022-03-05/panel.jpg)

Control Panel, Devices, Preferred Band of 5GHz. Makes no difference.

I do have another internet connection and have separate broadcast names for the 2.4 GHz and 5 GHz bands. The 5GHz works fine on the windows devices