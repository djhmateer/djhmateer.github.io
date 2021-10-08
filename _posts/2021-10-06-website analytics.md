---
layout: post
# title: 
description: 
menu: review
categories: analytics
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

## Introduction

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-08-29/error.jpg "error"){:width="500px"}](/assets/2021-08-29/error.jpg) -->

[Google Analytics](https://analytics.google.com/) has been my choice of web analytics for years.

My custom build projects need a dashboard with analytics for

- End of year reporting on what the site has done by the Team Lead
- Daily technical checking / alerting by the site administrator

I control the web servers so am getting metrics from the backend with no Javascript nor cookies. 

- More accurate way of getting analytics as no content blockers eg [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en) with over 10+ million installs

- More trust as not giving information away to a 3rd party eg Google


## End of Year Reporting

[Google Search Console Insights](https://search.google.com/search-console/insights/) gives a nice overview with some good ideas for metrics

[![alt text](/assets/2021-10-06/overview.jpg "local")](/assets/2021-10-06/overview.jpg)
Google search console for my blog

### General Metrics

Here are the useful reportable metrics which could be applied to any website

- Total number of page views - number
- Page views by day/week/month/year - line graph
- Most popular pages - Top 5

How people find you (referrer header information)

- Organic (search engine eg Google, Bing etc) - need to check in the user agent
- Direct (typed in or browser bookmark)
- Referral (ie links from other websites)

### Project Specific Metrics

The first site I am building for is [https://osr4rightstools.org](https://osr4rightstools.org)

- User logins/sessions over time.. or whenever a person has logged in. ie per day.
- New signups over time. Which country their IP is from.
- Tus partial files (ie a sign of potential failure)
- Number of jobs over time


- FaceSearch photos processed (bar chart) **need t
- FaceSearch total VM GPU usage (bar chart)

- HateSpeech words processed
- HateSpeech total VM usage

- Total outbound emails


## Technical Dashboard

- 500 Errors bar chart over time. With most recent top 5 listed below. Broken tus uploads can (unexpected end of content) can do this.

- Application warnings

- Queue size over time

- Number of Polly retries over time


- User password reset lockouts over time


- Application information logs download

- Page response times

- DB Query response times

- 404 - this wil be mostly hacking

- Total traffic (all). including robots

- Time until SSL cert expires


## Getting the information

I'm using Serilog for Application logs

Let see if I can inject in middleware to get all the required information before any Serilog filtering out - for example I've got a /health-check page which is filtered out in serilog info pages.


```bash
# application info log file from serilog.
2021-10-06 09:41:43.146 +00:00 [INF] HTTP GET / responded 200 in 1.3736 ms
2021-10-06 09:41:46.701 +00:00 [INF] HTTP GET /face-search responded 200 in 2.6605 ms
2021-10-06 09:41:48.194 +00:00 [INF] HTTP GET /hate-speech responded 200 in 2.3819 ms
2021-10-06 09:41:50.501 +00:00 [INF] HTTP GET /results responded 200 in 166.7070 ms
```

and

```bash
# application warning log file from serilog
2021-10-06 08:27:34.830 +00:00 [WRN] Http Status code 404 on /remote/fgt_lang
2021-10-06 08:45:13.015 +00:00 [WRN] Http Status code 404 on /vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php
2021-10-06 08:45:13.410 +00:00 [WRN] Http Status code 404 on /api/jsonws/invoke
2021-10-06 08:45:15.283 +00:00 [WRN] Http Status code 404 on /vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php
2021-10-06 08:45:21.137 +00:00 [WRN] Http Status code 404 on /index.php
2021-10-06 08:45:22.465 +00:00 [WRN] Http Status code 404 on /wp-content/plugins/wp-file-manager/readme.txt
2021-10-06 08:45:22.488 +00:00 [WRN] Http Status code 404 on /mifs/.;/services/LogService
2021-10-06 08:45:23.391 +00:00 [WRN] Http Status code 404 on /Autodiscover/Autodiscover.xml
2021-10-06 08:45:26.311 +00:00 [WRN] Http Status code 404 on /_ignition/execute-solution
2021-10-06 08:45:26.936 +00:00 [WRN] Http Status code 404 on /console/
2021-10-06 09:10:00.561 +00:00 [WRN] Http Status code 404 on /.env
```

If you look at [http://brokenlinkcheckerchecker.com/echoback](http://brokenlinkcheckerchecker.com/echoback) this echos back the request headers, which may be useful to log so that

- Can see if a user is trying the site on an older browser by their user agent
- Can see the language the browser is expecting

- Can log the IP address


### Getting IP address

[https://stackoverflow.com/questions/62664348/cant-get-clients-real-ip-when-using-nginx-reverse-proxy](https://stackoverflow.com/questions/62664348/cant-get-clients-real-ip-when-using-nginx-reverse-proxy) as I'm behind an nginx reverse proxy.

[https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/) More detailed information.

## Middleware

[https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-5.0](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-5.0)

[https://stackoverflow.com/questions/56693211/how-to-log-the-response-code-of-all-web-requests-in-net-core](https://stackoverflow.com/questions/56693211/how-to-log-the-response-code-of-all-web-requests-in-net-core)



### Nice to have

- integrated uptime monitor 
- Memory usage over time, Disk space, Disk iops, Network io
- Azure total cost so far


## Alternatives

[https://matomo.org/](https://matomo.org/) Google Analytics alternative the protects your data and your customers' privacy. Used by Amnesty, UN
