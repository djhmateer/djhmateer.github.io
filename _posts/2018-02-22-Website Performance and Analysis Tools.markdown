---
layout: post
title:  "Website Performance and Analysis Tools"
date:   2018-02-22 10:25
#menu: review
categories: website 
published: true 
---

Here are some of my favourite tools for web perf and analytics:

## Monitoring
[Uptimerobot.com](https://uptimerobot.com) - Free tier. 50 monitors. Sends a request every 5 minutes to a website.

[Pingdom.com](https://www.pingdom.com) - Free tier. Gives average response times.  

[Azure Application Insights](https://azure.microsoft.com/en-gb/services/application-insights/)
## Infrastructure
[Builtwith.com](https://builtwith.com) - eg is this a wordpress site, what webserver etc..

## Link Checking
[Deadlinkchecker.com](https://www.deadlinkchecker.com) This handles redirects well

## Command line tools
[Curl](/cmder/2018/01/30/Cmder-Shell.html#curl)

## Performance
[Apache benchmarks](/apachebenchmarks/2018/02/01/Apache-Benchmarks.html) load testing from the command line  
[JMeter](https://jmeter.apache.org/) and [this video](https://www.youtube.com/watch?v=8NLeq-QxkSw) was a useful 10 minute guide.

[YSlow](http://yslow.org/) for testing webpages as a browser plugin  
[Lighthouse Chrome extension](https://developers.google.com/web/tools/lighthouse/)  
[Webpagetest.org](https://www.webpagetest.org) - scores on perf, compression, caching, CDN

## Security
I found an incomplete SSL Cert security chain using:
[SSL Labs](https://www.ssllabs.com/ssltest/)  

Issues with security headers
[SecurityHeaders.com](https://securityheaders.com/)

[OWASP Zed Attach Proxy (ZAP)](https://github.com/zaproxy/zaproxy/wiki/Introduction) pen testing tool for finding vulnerabilities in web apps. I've only briefly used this and it pointed to the same issues as SecurityHeaders.com above.

## Web Accessibility
[Guidelines](https://www.wuhcag.com/wcag-checklist/)   
[Lighthouse Chrome extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en)
