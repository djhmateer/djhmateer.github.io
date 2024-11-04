---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
# menu: review
categories: games
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- !-- [![alt text](/assets/2024-09-04/1.jpg "email"){:width="500px"}](/assets/2024-09-04/1.jpg) --> 
<!-- [![alt text](/assets/2024-09-04/1.jpg "email")](/assets/2024-09-04/1.jpg) -->

[replayweb.page](https://replayweb.page) is very useful for viewing wacz files. You can pass in an external file URL to read. That file server needs to trust the website to load it (cors). On digitalocean spaces you need to use a command line tool to set the correct permissions.

[replayweb.page test](https://replayweb.page/?source=https%3A//testhashing.fra1.cdn.digitaloceanspaces.com/aa001/c1d46c18798f4b548b952751.wacz#view=pages&url=https%3A%2F%2Fx.com%2Fdave_mateer%2Fstatus%2F1524341442738638848&ts=20241007105203)

[do s3cmd docs](https://docs.digitalocean.com/products/spaces/reference/s3cmd/)

[replay.web docs](https://replayweb.page/docs/embedding/cors-settings/#manual-setup-nginx)


```bash
sudo apt-get install s3cmd

s3cmd --configure

# key
# secret
# US as default

# fra1.digitaloceanspaces.com

# %(bucket)s.fra1.digitaloceanspaces.com

# enter for defaults
# y - to test

# ls
s3cmd ls s3://testhashing/

s3cmd setcors cors.xml s3://testhashing/
```

here is the xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <CORSRule>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedHeader>*</AllowedHeader>
    <ExposeHeader>Content-Range</ExposeHeader>
    <ExposeHeader>Content-Encoding</ExposeHeader>
    <ExposeHeader>Content-Length</ExposeHeader>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
  </CORSRule>
</CORSConfiguration>
```

Perhaps would be good to be more specific once tested with `<AllowedOrigin>https://replayweb.page</AllowedOrigin>`

purge the cdn cache!

[https://cors-test.codehappy.dev/](https://cors-test.codehappy.dev/) - useful tester website
