---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: vpn
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- !-- [![alt text](/assets/2024-09-04/1.jpg "email"){:width="500px"}](/assets/2024-09-04/1.jpg) --> 
<!-- [![alt text](/assets/2024-09-04/1.jpg "email")](/assets/2024-09-04/1.jpg) -->



## Windows


Location: USA - Houston

Protocol - OpenVPN - UDP


## Linux

[vpn setup for linux](https://www.expressvpn.com/support/vpn-setup/app-for-linux/#command-line)


[download linux](https://www.expressvpn.com/setup#linux)

```bash
# check above page for latest (copy link from download button)
wget https://www.expressvpn.works/clients/linux/expressvpn_3.76.0.4-1_amd64.deb


sudo dpkg -i expressvpn_3.76.0.4-1_amd64.deb

# enter activation code
expressvpn activate

# USA - Houston is not there (but is on Windows)
expressvpn list all

# houston
expressvpn connect usho

# dallas
expressvpn connect usda


- If your VPN connection unexpectedly drops, internet traffic will be blocked to protect your privacy.
- To disable Network Lock, disconnect ExpressVPN then type 'expressvpn preferences set network_lock off'.


expressvpn status


expressvpn disconnect

```

I'm experimenting with using the standard protocol on linux to see if there are any problems. It is working well (I'm starting then stopping the vpn in code so a short run connection is working fine)
