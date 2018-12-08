---
layout: post
title:  Apache Benchmarks load testing
#menu: review
categories: ApacheBenchmarks http 
published: true 
redirect_from: apachebenchmarks/2018/02/01/Apache-Benchmarks.html 
---

![ps](/assets/2018-02-01/bash.png)

I use Apache Benchmarks as a simple load tester from Windows 10 Bash (WSL). To get up and running run Bash from your Start Menu (I'm using Ubuntu but there are now other variants possible)

```
apt-get update
apt-get install apache2-utils

-- run 1000 requests at 100 concunnrent connections
-- remember the final / on the url
ab -n 1000 -c 100 http://davewordpress.westeurope.cloudapp.azure.com/

-- dont look at Content-Length. Useful if caching or adverts or dynamic content
ab -n 1000 -c 100 -l http://
```
