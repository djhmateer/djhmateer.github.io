---
layout: post
# title: Splash Screen
description: 
menu: review
categories: Excel
published: true 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


Making dashboards is a skill.

I'm fortunate in that I've got control over webservers, DB and storate, and can design my own log strategy.

Like many recent projects, I'm favouring simplicity and have found that I can write sufficiently well to the OLTP DB with small to medium size projects. 

- User dashboard
 - Who has logged in most recently
 - Who needs help using our system
 - Tools with most interest
 - Serach engines giving the most traffic (and what terms)
 - End of year reports

- Developer / Devops dashboard
 - Email delivery problem
 - 500 errors
 - Critical Errors eg app pool recycle
 - Unusual activity (spike in traffic)
 - Too many Polly retry errors (need to up database power)
 - SQL query times
 - Server memory usage (can I scale up / down)
 - Server disk space
 - Server CPU usage (can I scale up / down)
 - Days since last deploy (and therefore patch)
 
 Alerting from the dashboard? potentially using slack for notifications like [https://www.listennotes.com/blog/the-boring-technology-behind-a-one-person-23/](https://www.listennotes.com/blog/the-boring-technology-behind-a-one-person-23/). Maybe when a new user registers

## Others
asdf

[https://grafana.com/](https://grafana.com/)


## Excel to mock up quickly

[https://www.youtube.com/watch?v=K74_FNnlIF8](https://www.youtube.com/watch?v=K74_FNnlIF8)