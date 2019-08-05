---
layout: post
title: Azure Sphere MT3620
description: What is the Azure Sphere MT3620 Starter kit, what is Azure Sphere and my initial impressions on getting code samples working
# menu: review
categories: IoT AzureSphere
published: true 
comments: true     
sitemap: true
image: /assets/2019-08-05/1.jpg
---

I saw an [IoT device on sale for £4.60 rather than £50](https://www.element14.com/community/groups/azuresphere) so I thought I'd give it a try.  

I've never 'done' IoT [Internet of Things](https://en.wikipedia.org/wiki/Internet_of_things) devices before, having heard lots about [Raspberry Pi's](https://www.raspberrypi.org/) and [Arduino's](https://www.arduino.cc/).

![alt text](/assets/2019-08-05/1.jpg "Azure Sphere MT3620"){:width="600px"}

From the [wikiedpia page on Azure Sphere](https://en.wikipedia.org/wiki/Azure_Sphere) we can see it is a linux based os created for IoT which is heavily focussed on security.

[The specs are here](https://www.element14.com/community/community/designcenter/azure-sphere-starter-kits?ICID=azure-sphereCH-topbanner) and [more specs from the mother company avnet here](https://www.avnet.com/shop/us/products/avnet-engineering-services/aes-ms-mt3620-sk-g-3074457345636825680/?aka_re=1) and [PDF Manual here](https://www.avnet.com/opasdata/d120001/medias/docus/196/Azure%20Sphere%20Starter%20Kit%20User%20Guide%20(v1.3).pdf)  

This is the one of the first in the [Azure Sphere](https://azure.microsoft.com/en-us/services/azure-sphere/get-started/) range of boards.  

## What is Azure Sphere

From [What is Azure Sphere](https://docs.microsoft.com/en-us/azure-sphere/product-overview/what-is-azure-sphere):

> Azure Sphere is a secured, high-level application platform with built-in communication and security features for internet-connected devices

It is an ecosystem comprising of

- New class of MicroController (MCU) Unit
- Secured OS (Linux)
- Cloud services ie Azure

## Getting Started with the MT3620

[From Getting Started](https://docs.microsoft.com/en-us/azure-sphere/install/install)

- Plug in your device and wait (maybe 5 minutes) for the USB drivers to install
- [Install the SDK for Visual Studio](https://aka.ms/AzureSphereSDKDownload) which took 15 minutes on my laptop and it seemed to hang, but was just a large background download happening

## Setup Azure Sphere Account

[So this is not very user friendly but following along it did work](https://docs.microsoft.com/en-us/azure-sphere/install/azure-directory-account)  

> Azure Sphere uses Azure Active Directory (AAD) to enforce enterprise access control. Therefore, to use Azure Sphere, you need a Microsoft work or school account (sometimes called an organizational account) that is associated with an AAD.

Essentially I have a personal/MSA account which I needed to create a new user on which is associated with a tenant. I had an existing default AD directory created.

![alt text](/assets/2019-08-05/2.jpg "Azure AD"){:width="800px"}  
Getting the name of my default directory

![alt text](/assets/2019-08-05/3.jpg "Creating a new user"){:width="700px"}  
Use the correct directory name, and set to Global administrator, and copy the password

```bash
# commands used
azsphere login
azsphere tenant create --name davetest
azsphere device claim
```

## Setup Networking

[Configure networking](https://docs.microsoft.com/en-us/azure-sphere/install/configure-wifi)

```bash
azsphere device wifi add --ssid theskifftng --key secret

azsphere device wifi show-status

# my board came with 19.05 and needed an update to 19.07
# updates should happen within 15-20mins
# during this time it may produce an error when you run this command
azsphere device show-ota-status
```

## Building a Blink Application

[Quickstarts](https://docs.microsoft.com/en-us/azure-sphere/quickstarts/qs-overview)

```bash
azsphere device prep-debug
```

Visual Studio, New project, Azure Sphere Blink

okay got a green light to blink! in debug mode, debugging on the board, written in C

```c
#include <stdbool.h>
#include <errno.h>
#include <string.h>
#include <time.h>

#include <applibs/log.h>
#include <applibs/gpio.h>

int main(void)
{
    Log_Debug(
        "\nVisit https://github.com/Azure/azure-sphere-samples for extensible samples to use as a "
        "starting point for full applications.\n");

    int fd = GPIO_OpenAsOutput(9, GPIO_OutputMode_PushPull, GPIO_Value_High);
    if (fd < 0) {
        Log_Debug(
            "Error opening GPIO: %s (%d). Check that app_manifest.json includes the GPIO used.\n",
            strerror(errno), errno);
        return -1;
    }

    const struct timespec sleepTime = {1, 0};
    while (true) {
        GPIO_SetValue(fd, GPIO_Value_Low);
        nanosleep(&sleepTime, NULL);
        GPIO_SetValue(fd, GPIO_Value_High);
        nanosleep(&sleepTime, NULL);
    }
}
```

so it seems it only supports C at the moment (although C++ is a maybe)

## Blinking light

[link](https://www.element14.com/community/groups/internet-of-things/blog/2019/04/24/avnets-azure-sphere-starter-kit-out-of-box-demo-part-1-of-3?ICID=azuresphere-kit-datasheet-widget) and [Avnet Github Link](https://github.com/Avnet/AvnetAzureSphereStarterKitReferenceDesign.git)

It shows:

```bash
Remote debugging from host 192.168.35.1
Version String: Avnet-Starter-Kit-reference-V1.0
Avnet Starter Kit Simple Reference Application starting.
LSM6DSO Found!
LPS22HH Found!
LSM6DSO: Calibrating angular rate . . .
LSM6DSO: Please make sure the device is stationary.
LSM6DSO: Calibrating angular rate complete!
Opening Starter Kit Button A as input.
Opening Starter Kit Button B as input.
SSID: theskifftng
Frequency: 5180MHz
bssid: dc:9f:db:b1:82:d3

LSM6DSO: Acceleration [mg]  : -1.2200, -0.1220, 15.7380
LSM6DSO: Angular rate [dps] : 0.00, 0.00, -0.07
LSM6DSO: Temperature  [degC]: 34.95
LPS22HH: Pressure     [hPa] : 1008.31
LPS22HH: Temperature  [degC]: 32.77
```

[Demo2](https://www.element14.com/community/groups/internet-of-things/blog/2019/05/01/azure-sphere-starter-kit-out-of-box-demo-blog-post-2) is showing the IoT hub on Azure

[Demo3](https://www.element14.com/community/groups/internet-of-things/blog/2019/05/09/avnets-azure-sphere-starter-kit-out-of-box-demo-part-3-of-3) is IoT Central on Azure

[Azure Sphere Samples on GitHub](https://github.com/Azure/azure-sphere-samples)
These seem quite low level

## Extending the board

There are 2 [click board sockets](https://www.mouser.co.uk/new/mikroelektronika/mikroelektronikaClick/) which [seems like a standard](https://www.mikroe.com/mikrobus)

![alt text](/assets/2019-08-05/5.png "Extending"){:width="600px"}

## Conclusion

I got the board setup, connected to Wifi, updated the OS, connected to Azure using Azure Active Directory, ran the LED blinking sample, and ran the temperate sending sample app.

Observations are:

- Have to program the board in C (I like higher level languages like C# or Python)
- It seems currently to be targeted at manufacturers
- It is heavily focussed on security
- You are locked into Azure ecosystem 
- It still feels very early (this is the first real development board)
- There are not many examples around to help

I did this as an experiment into IoT as I've never been interested. This has piqued my interest, and I'd like to know more about boards which

- Can be used to monitor wildlife eg birds, mammals
- Can be used to transmit data eg [LoRaWAN](https://www.thethingsnetwork.org/) and [hn discussion](https://news.ycombinator.com/item?id=20562684)
- Monitor insect experiments eg temperature, humidity, water level, video

I suspect that a [Raspberry Pi 4](https://www.raspberrypi.org/) or an [Arduino](https://www.arduino.cc/) or [bbc micro:bit](https://microbit.org/) will be interesting to research, which have much larger ecosystems.
