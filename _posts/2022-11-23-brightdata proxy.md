---
layout: post
# title: MSSQL PHP on WSL setup
description: 
menu: review
categories: proxy
published: true 
comments: false     
sitemap: true
image: /assets/2022-09-22/1.jpg
---

<!-- ![alt text](/assets/2022-11-03/2.jpg "email")](/assets/2022-11-03/2.jpg) -->

[brightdata.com](https://brightdata.com) - who provide proxying. Their onboarding process was brilliant.

I'm doing an http1.0 curl request which works for maybe 20 times, then fails when the target website doesn't like my IP anymore. Changing networks (for example to my phone) works. So, lets try a proxy 

I know when it works as get a 200 back, otherwise get a 302 redirect to their login page, even though the page is public.

Lets try the data_centre proxy first ($5 credit for free when sign up with credit card)

```bash
curl --proxy zproxy.lum-superproxy.io:22225  \
  --proxy-user brd-customer-hl_xxxxxxxx-zone-data_center:yyyyyyyyyyyy  \
  "https://www.facebook.com/khitthitnews/posts/pfbid0PTvT6iAccWqatvbDQNuqpFwL5WKzHuLK4QjP97Fwut637CV3XXQU53z1s2bJMAKwl"
```

-User: brd-customer-hl_xxxxxxxx-zone-data_center
-Password: yyyyyyyyy 


## Curl

Customer support on brightdata was exceptional! I got an answer back in minutes.

```bash
curl --proxy zproxy.lum-superproxy.io:22225 \
 --proxy-user brd-customer-hl_xxxxxxxx-zone-data_center:yyyyyyyyyyyy  \
 --silent \
 --http1.0  \
 "https://www.facebook.com/khitthitnews/posts/pfbid0PTvT6iAccWqatvbDQNuqpFwL5WKzHuLK4QjP97Fwut637CV3XXQU53z1s2bJMAKwl"
```


