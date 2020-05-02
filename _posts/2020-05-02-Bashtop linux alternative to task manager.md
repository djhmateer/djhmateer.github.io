---
layout: post
title: Bashtop Linux resource monitor - alternative to Windows Task Manager 
description: A super useful resource monitor for Linux - similar useful overview to that of Task Manager in Windows.
# menu: review
categories: Linux 
published: true 
comments: true     
sitemap: true
image: /assets/2020-04-28/bashtop-screenshot.jpg 
---

![alt text](/assets/2020-04-28/bashtop-screenshot.jpg "Bashtop screenshot")

[Bashtop](https://github.com/aristocratos/bashtop) is a very handy resource monitor for Linux. I'm using it from the `cmd shell` on Win 10, as [cmder my shell of choice has rendering problems](https://github.com/aristocratos/bashtop/issues/82) connected to Ubuntu 18.04 LTS on an Azure VM, and have installed it using [azlux's open source repository](http://packages.azlux.fr/)

```bash
echo "deb http://packages.azlux.fr/debian/ buster main" | sudo tee /etc/apt/sources.list.d/azlux.list
wget -qO - https://azlux.fr/repo.gpg.key | sudo apt-key add -

sudo apt update
sudo apt install bashtop -y

bashtop
```

Useful shortcut keys are:

- `+` Increase sample time (2500ms is about right for me)
- `-` Decrease sample time (500ms is great but uses a lot of resources!)
- `ESC` Show Options and Help
- `f` - filter process names
- `Up/Down` - select a process
- `Enter` - see more details on a process

<!-- ![alt text](/assets/2020-04-28/bashtop-screenshot2.jpg "Max cpu problem with my crawler"){:width="700px"}   -->
![alt text](/assets/2020-04-28/bashtop-screenshot2.jpg "Max cpu problem with my crawler")

Looking at current inbound traffic for my broken link checker - 21 Mbps

CPU usage is interesting here and I'm exploring why I've got 1 core 100% utilised, when ideally my code should use all resources. [I'm not sure if the relative %age is a bug or feature](https://github.com/aristocratos/bashtop/issues/86)

Using `f - filter` to filter the Web process I'm interested in. I prefer the non filtered screen to give an overview of the server.

To reset the Total Upload and Download counts, [aristocratos](https://github.com/aristocratos/bashtop/issues/63) kindly added this feature, which you can do from the options menu press `ESC` to get there.

![alt text](/assets/2020-04-28/bashtop-options.jpg "Bashtop options"){:width="400px"}  

## Conclusion

As a quick overview on the server this is invaluable!

If you like it consider sponsoring [https://github.com/aristocratos](https://github.com/aristocratos). Or a single [paypal donate](https://www.paypal.me/aristocratos) or a [ko-fi coffee](https://ko-fi.com/aristocratos).
