---
layout: post
title: Homelab Web Server 
description: Spinning up an Ubuntu Nginx webserver at home and using Dynamic DNS.
#menu: review
categories: DNS 
published: true 
comments: false     
sitemap: true
image: /assets/2022-01-12/router.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->

Why run a homelab webserver?

- Spin up dev and test environments quickly eg for different projects I need versions of .NET, Python etc.
- Leave them up and not incur cloud charges
- Run a production website cheaper than running on the cloud

In this article I'm going to do the simplest possible thing

- Ubuntu Server on bare metal (no virtualisation)
- Nginx webserver
- No DMZ
- Dynamic DNS to keep a track of changing public IP address
- Wire up own domain name

## Connection

I've got a 48 MBits/s / 11 MBits/s Plusnet connection.

[![alt text](/assets/2022-01-12/router.jpg "router")](/assets/2022-01-12/router.jpg)

I'm using the standard free Plusnet Hub One router.


## Ubuntu Server

Am using a spare PC (5 year old Intel i5) with 16GB of RAM and have a new 1TB M.2 SSD in it.

To test the concept I put on [Ubuntu Server 20.04.3 LTS](https://ubuntu.com/download/server) including installing SSH Server.

I used [https://www.balena.io/etcher/](https://www.balena.io/etcher/) to burn the ISO onto an 8GB USB drive (my motherboard didn't like the 16GB Kingston).

[![alt text](/assets/2022-01-12/ssh.jpg "r")](/assets/2022-01-12/ssh.jpg)

Can connect to the new Ubuntu machine called silver, from ssh on WSL2.

then installed Nginx:
```bash
sudo apt-get install nginx -y
```

As an aside I installed Ubuntu Server using the wireless network adapter which caused confusion as I had to disable the adapter when I went to wired. It was noticably slower on wireless.

[https://linuxconfig.org/ubuntu-20-04-connect-to-wifi-from-command-line](https://linuxconfig.org/ubuntu-20-04-connect-to-wifi-from-command-line) 

```bash
# networking config files (comment out the wireles one)
cd /etc/netplan/

# show networking 
# 192.168.1.139 local network
ip a
```

[![alt text](/assets/2022-01-12/1.jpg "r")](/assets/2022-01-12/1.jpg)

Can hit the webserver locally from my Windows Machine. `http://silver` works as well. DNS resolution is handled by the router as all on DHCP. 



## External Networking

[![alt text](/assets/2022-01-12/admin.jpg "admin")](/assets/2022-01-12/admin.jpg)

Allowing port 80 to the home server which is called silver. Nginx is running (as we have proven) so should answer on port 80.

[![alt text](/assets/2022-01-12/ip.jpg "ip")](/assets/2022-01-12/ip.jpg)

Finding out my public IP using google.

[![alt text](/assets/2022-01-12/phone.jpg "phone")](/assets/2022-01-12/phone.jpg)

Using 4G connection from my phone to hit webserver externally - it worked!

## Dynamic DNS

[https://www.noip.com/](https://www.noip.com/) As I'm not on a static IP address I need a free service like to keep track of what is my current IP.

[![alt text](/assets/2022-01-12/noip.jpg "noip")](/assets/2022-01-12/noip.jpg)

After signing up on their website, my router can update their service when it's public IP changes. Very handy.

[![alt text](/assets/2022-01-12/hopto.jpg "hopto")](/assets/2022-01-12/hopto.jpg)

I can now access my webserver from this domain name which I chose from [https://noip.com](https://noip.com)

[![alt text](/assets/2022-01-12/dnsimple.jpg "dnsimple")](/assets/2022-01-12/dnsimple.jpg)

To use a domain I own, I can use an Alias record.

[![alt text](/assets/2022-01-12/blcc.jpg "blcc")](/assets/2022-01-12/blcc.jpg)

## Conclusion

We have a working website live on the internet.

Next steps are

- Be more secure (DMZ / different subnet than main home network) 
- Test SSL works ie port 443 (it works fine)
- Use a hypervisor so can have many VM's on the box (article coming soon)
- Transfer over a production website and turn off Azure

