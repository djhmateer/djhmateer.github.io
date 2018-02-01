---
layout: post
title:  "Apache Benchmarks load testing"
date:   2018-02-01 12:02
#menu: review
categories: apachebenchmarks 
published: true 
---

![ps](/assets/2018-02-01/bash.png)

I use Apache Benchmarks as a simple load tester from Windows 10 Bash (WSL). To get up and running run Bash from your Start Menu (I'm using Ubuntu but there are now other variants possible)

```
apt-get update
apt-get install apache2-utils

-- run 1000 requests at 100 concunnrent connections
-- remember the final / on the url
ab -n 1000 -c 100 http://davewordpress.westeurope.cloudapp.azure.com/
```