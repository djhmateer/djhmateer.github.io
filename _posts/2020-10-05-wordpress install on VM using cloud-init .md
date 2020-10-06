---
layout: post
title: Wordpress install on VM using cloud-init 
description: How to install Wordpress on a single VM using automated Azure CLI and Cloud-init
#menu: review
categories: wordpress cloud-init
published: true 
comments: true     
sitemap: true
image: /assets/2020-10-05/hoverfly.jpg
---

<!-- ![alt text](/assets/2020-10-05/hoverfly.jpg "Hoverly"){:width="600px"} -->
![alt text](/assets/2020-10-05/hoverfly.jpg "Hoverly")

Gorgeous hoverfly larvae!

[Source code for this guide](https://github.com/djhmateer/hoverfly-website)

I look after a low traffic niche Wordpress site [hoverflylagoons.co.uk](https://hoverflylagoons.co.uk) for my wife.

After years of frustration with 3rd party hosters (Siteground and Bluehost) I decided to try hosting it myself

A simple VM on Azure with [LAMP](https://stackoverflow.com/questions/10060285/what-is-a-lamp-stack) stack on it.

Yes, that simple!

What no [PaaS](https://www.infoworld.com/article/3223434/what-is-paas-software-development-in-the-cloud.html) or [FaaS](https://en.wikipedia.org/wiki/Function_as_a_service) or [Docker](https://www.docker.com/) / [K8s](https://kubernetes.io/)? 

Nope.

But what about backups and updating?

The script below will build a brand new Ubuntu LTS VM, and give me a working wordpress install with all the latest required versions of dependencies.

I then switch DNS (using [Cloudlare](https://www.cloudflare.com/en-gb/) which does the SSL cert too), then apply the last backup from the live site.

## Azure CLI and Cloud-init scripts

<!-- ![alt text](/assets/2020-10-05/script.jpg "Runnign the bash script"){:width="600px"} -->
![alt text](/assets/2020-10-05/script.jpg "Running the bash script")

Above I am using the new Windows Terminal running Ubuntu, calling the `infra.azcli` bash script which is using the Azure CLI to build a VM, then run script on that new VM.

Below is part of the Azure CLI script source: 

![alt text](/assets/2020-10-05/source.jpg "Source")

[Clone the Source](https://github.com/djhmateer/hoverfly-website)

## DNS

Here is the cloudflare dashboard where I'm switching over to the new VM:

<!-- ![alt text](/assets/2020-10-05/cloudflare.jpg "Cloudflare"){:width="600px"} -->
![alt text](/assets/2020-10-05/cloudflare.jpg "Cloudflare"){:width="600px"}

CNAME to: hoverflytest435.westeurope.cloudapp.azure.com

## A Blank Up to Date Wordpress Site in 5 minutes

<!-- ![alt text](/assets/2020-10-05/wordpress-hello-world.jpg "A blank website"){:width="600px"} -->
![alt text](/assets/2020-10-05/wordpress-hello-world.jpg "A blank website")

I sign in with the newly created credentials:

admin: dave

password: letmein

So we have a fully patched brand new VM with a fully patched blank Wordpress site in 5 minutes.

![alt text](/assets/2020-10-05/all-in-one-migration.jpg "All in one migration installed")

[All in One WP Migration](https://en-gb.wordpress.org/plugins/all-in-one-wp-migration/) already installed

512MB upload limit is patched in using a customised `PHP.ini` file.

Now just import the latest version of the site and you are ready to go!

To connect directly to the VM from Windows Terminal using ssh keys:

```bash
./sshCurrentVm.sh
```

## Site Health

<!-- ![alt text](/assets/2020-10-05/site-health.jpg "Site Health"){:width="600px"} -->
![alt text](/assets/2020-10-05/site-health.jpg "Site Health")

Very useful screen to make sure the site is up to date.

## Size of VM and running out of RAM

![alt text](/assets/2020-10-05/swap.jpg "Hitting swap file")

This VM is a low powered 1GB OF RAM so it is possible to flood it and run out of memory, but it behaves as expected, swaps to disk and recovers after a while. I'm fine with that.

## Conclusion

Using the IaaS strategy of throwing away infrastructure works for me, gives me great control, amazing speed, and is cheap. It also means I don't have to deal with support from 3rd party hosters!

Time to go and admire some more [Gorgeous hoverfly larvae!](https://hoverflylagoons.co.uk/) :-)
