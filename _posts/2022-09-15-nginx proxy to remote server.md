---
layout: post
# title: Proxmox Beginners Guide
description: 
menu: review
categories: nginx
published: true 
comments: false     
sitemap: true
image: /assets/2022-01-13/upload.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->


[https://osr4rightstools.org/](https://osr4rightstools.org/) is on a VM in Azure. There is an nginx reverse proxy on it, with a kestrel server behind it on the same vm running .NET.


[https://osr4rightstools.org/fire-map/](https://osr4rightstools.org/fire-map/) is on a different vm on Azure eg [http://firemaposr4rights394.westeurope.cloudapp.azure.com](http://firemaposr4rights394.westeurope.cloudapp.azure.com)


To proxy requests through here is the relevant section of the `nginx.conf` file:

[https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) docs

```conf
    # proxy anything from https://osr4rightstools/fire-map
    # to the vm
    # which will answer as if it comes in on the root
    # eg https://osr4rightstools/fire-map/public-page.pgp
    # is http://fireMapOsr4Rights394.westeurope.cloudapp.azure.com/public-page.php
    location /fire-map/ {
        proxy_pass         http://fireMapOsr4Rights394.westeurope.cloudapp.azure.com/;
				 
				# etc ...
    }
```

[![alt text](/assets/2022-09-15/fire-map.jpg "email")](/assets/2022-09-15/fire-map.jpg)