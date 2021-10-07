---
layout: post
title: HTTP/2 with AspNetCore and Nginx
description: Implementing HTTP/2 with Nginx and Kestrel
#menu: review
categories: HTTP/2
published: true 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- ## Introduction -->

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
[![alt text](/assets/2021-10-07/http2b.png "http2"){:width="200px"}](/assets/2021-10-07/http2b.png)

[osr4rightstools.org](https://osr4rightstools.org/) is a site I maintain which uses Nginx as a reverse proxy to Kestrel.

I've implemented HTTP/2 on Nginx, and passes HTTP request version information request headers to Kestrel to allow me to capture the version for logging: 

[https://github.com/djhmateer/osr4rights-tools/blob/main/infra/nginx.conf](https://github.com/djhmateer/osr4rights-tools/blob/main/infra/nginx.conf) repository contains all the code. This nginx conf file shows enabling http2, and forwarding the version.

## What is HTTP/2
[Wikipedia](https://en.wikipedia.org/wiki/HTTP/2)

[Google history](https://developers.google.com/web/fundamentals/performance/http2#:~:text=The%20primary%20goals%20for%20HTTP,request%20prioritization%20and%20server%20push.) A brief history of HTTP/2.

## Who Uses HTTP/2 on the server?

> As of September 2021, 46.2% (after topping out at just over 50%) of the top 10 million websites supported HTTP/2.

- [https://davemateer.com/](https://davemateer.com/) - cloudflare/github pages (this site)
- [https://djhmateer.github.io/](https://djhmateer.github.io) - github pages directly (this site)
- [https://homebrewbeer.netlify.app/](https://homebrewbeer.netlify.app/) - netlify
- google.com

To check http version information I used curl:

```bash

# -I fetch headers only
# -L location ie will redo if a redirect
curl -I -L https://homebrewbeer.netlify.app/

# response
HTTP/2 200 # HERE - it is HTTP/2
cache-control: public, max-age=0, must-revalidate
content-type: text/html; charset=UTF-8
date: Thu, 07 Oct 2021 08:13:51 GMT
etag: "6f707a64bc1db898a2893600ff205662-ssl"
strict-transport-security: max-age=31536000; includeSubDomains; preload
server: Netlify
age: 0
x-nf-request-id: 01FHCX1P4S3GNPSCHD72RVQGC8

# To force a 1.1 connection use
curl -I -v --http1.1 https://osr4rightstools.org
```

<!-- [![alt text](/assets/2021-10-07/logs.jpg "logs"){:width="800px"}](/assets/2021-10-07/logs.jpg) -->
## Clients using HTTP/2

I can see from my Cloudflare stats (which sits in front of davemateer.com):

<!-- [![alt text](/assets/2021-10-07/cloudflare.jpg "error"){:width="500px"}](/assets/2021-10-07/cloudflare.jpg) -->
[![alt text](/assets/2021-10-07/cloudflare.jpg "error")](/assets/2021-10-07/cloudflare.jpg)


## Logging what is the request HTTP version

From nginx a way to pass the http version is to pass to kestrel as a request header:

```bash
# in nginx.conf
# https://scotthelme.co.uk/monitoring-http-2-usage-in-the-wild/
# the request variable ends with HTTP/1.0 HTTP/1.1 or HTTP/2
proxy_set_header X-DM-Request $request; 
```

Then in middleware in the Configure method:

```cs
var xDMRequest = context.Request.Headers.FirstOrDefault(x => x.Key == "X-DM-Request").Value;
string httpVersion = "none";
if (xDMRequest != StringValues.Empty)
{
    // get final HTTP/1.0 or 1.1 or 2
    var bar = xDMRequest.ToString().Split(new[] { "HTTP" }, StringSplitOptions.None).Last();
    httpVersion = $"HTTP{bar}";
}
```

Which gives the HttpVersion column in:

[![alt text](/assets/2021-10-07/logs.jpg "logs")](/assets/2021-10-07/logs.jpg)

The custom logging in osr4rightstools which is used for dashboards and reporting.

## Kestrel and Nginx

[https://stackoverflow.com/questions/41637076/http2-with-node-js-behind-nginx-proxy](https://stackoverflow.com/questions/41637076/http2-with-node-js-behind-nginx-proxy)

From reading the article above, I can see no real benefit running HTTP/2 on Kestrel, especially as nginx and Kestrel are on the same physical server.

I did get Kestrel running 2 as [https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/http2?view=aspnetcore-5.0](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/http2?view=aspnetcore-5.0) HTTP/2 is enabled by default in Kestrel

Enabling HTTP/2 in Kestrel over plain HTTP

[https://stackoverflow.com/questions/58682933/how-do-i-enable-http2-in-c-sharp-kestrel-web-server-over-plain-http](https://stackoverflow.com/questions/58682933/how-do-i-enable-http2-in-c-sharp-kestrel-web-server-over-plain-http)

In appsettings.json

```json
  "Kestrel": {
    "EndpointDefaults": {
      "Protocols": "Http2"
    }
  },
  "AllowedHosts": "*"
```

## Be wary of spikes

[https://www.lucidchart.com/techblog/2019/04/10/why-turning-on-http2-was-a-mistake/](https://www.lucidchart.com/techblog/2019/04/10/why-turning-on-http2-was-a-mistake/) - a good warning of performance issues.

## Conclusion

HTTP/2 has made little difference to my sites. But it is a 'good thing' to keep up to date. 

I think :-)
