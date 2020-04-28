---
layout: post
title: Bashtop Linux resource monitor - a replacement for Windows Task Manager 
description: A super useful resource monitor for Linux - similar useful overview to that of Task Manager in Windows.
menu: review
categories: Linux 
published: true 
comments: false     
sitemap: false
image: /assets/2020-04-28/bashtop-screenshot.jpg 
---

![alt text](/assets/2020-04-28/bashtop-screenshot.jpg "Bashtop screenshot"){:width="700px"}  
<!-- ![alt text](/assets/2020-04-28/bashtop-screenshot.jpg "Bashtop screenshot") -->

[Bashtop](https://github.com/aristocratos/bashtop) is a very handy resource monitor for Linux. I'm using it from the `cmd shell` on Win 10 connected to Ubuntu 18.04LTS on an Azure VM, and have installed it using [azlux's open source repository](http://packages.azlux.fr/)

```bash
echo "deb http://packages.azlux.fr/debian/ buster main" | sudo tee /etc/apt/sources.list.d/azlux.list
wget -qO - https://azlux.fr/repo.gpg.key | sudo apt-key add -

apt install bashtop
bashtop
```

Useful shortcut keys are:

- `+` Increase sample time
- `-` Decrease sample time
- ESC Show options
- f - filter process names
- up/down - select a process
- enter - see more details on a process

![alt text](/assets/2020-04-28/bashtop-screenshot-filtered.jpg "Bashtop screenshot filtered"){:width="800px"}  

Using `f - filter` to filter the Web process I'm interested in.

Looking at current inbound traffic for my broken link checker - 20.7Mbps

CPU usage is not good - I'm exploring why I've got 1 core 100% utilised.

Memory usage is fine

![alt text](/assets/2020-04-28/bashtop-screenshot-max.jpg "Max cpu problem with my crawler"){:width="700px"}  

I prefer the non filtered screen to give an overview of the server.

To reset the Total Upload and Download counts rebooting the machine works. [I created an enhancement suggestion too](https://github.com/aristocratos/bashtop/issues/63)

## Conclusion

As a quick sanity check on the server this is invaluable. Very useful!

If you like it consider sponsoring [https://github.com/aristocratos](https://github.com/aristocratos) as I have!
