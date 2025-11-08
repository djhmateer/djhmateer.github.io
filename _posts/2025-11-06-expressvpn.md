---
layout: post
title: 
description: 
menu: review
categories: vpn 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2025-11-03/1.jpg "Picard")](/assets/2025-11-03/1.jpg) -->

[![alt text](/assets/2025-11-07/1.jpg "Using direct access to view console")](/assets/2025-11-07/1.jpg)

Using hypervisor console to connect as ssh by default gets killed when vpn connects.

## Background

Windows - works fine

WSL2 - doesn't work


## Ubuntu 24


[https://www.expressvpn.com/support/vpn-setup/app-for-linux-cli/](https://www.expressvpn.com/support/vpn-setup/app-for-linux-cli/)

```bash
# 7th Nov 25
# right click on icon on above page to get most current version
wget https://www.expressvpn.works/clients/linux/expressvpn-linux-universal-4.1.1.10039.run

chmod +x expressvpn-linux-universal-4.1.1.10039.run

./expressvpn-linux-universal-4.1.1.10039.run

echo 'secretecode' > ~/expressvpn_code.txt


expressvpnctl login ~/expressvpn_code.txt

expressvpnctl background enable

expressvpnctl get regions

# doing this in an ssh session will kill ssh!
expressvpnctl connect "Australia - Sydney"

# will connect to previous location eg Sydney for me
expressvpnctl connect


expressvpnctl status

# to get ip address
curl ifconfig.me

# look this up on a browser to check region - this is correct ie Sydney
https://whatismyipaddress.com/ip/45.133.5.10

# my current uk ip address is: 37.152.225.195

expressvpnctl disconnect


```

