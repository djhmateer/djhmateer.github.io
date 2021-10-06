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

- Organic (search engine eg Google, Bing etc)
- Direct (typed in or browser bookmark)
- Referral (ie links from other websites)

### Project Specific Metrics

The first site I am building for is [https://osr4rightstools.org](https://osr4rightstools.org)

- User logins over time
- New signups over time. Which country their IP is from.
- Number of jobs over time

- FaceSearch photos processed (bar chart)
- FaceSearch total VM GPU usage (bar chart)

- HateSpeech words processed
- HateSpeech total VM usage


## Technical Dashboard

- 500 Errors bar chart over time. With most recent top 5 listed below

- 404 - this wil be mostly hacking

- Total traffic (all). including robots


### Nice to have

- Memory usage over time, Disk space, Disk iops, Network io
- Azure total cost so far


## Alternatives

[https://matomo.org/](https://matomo.org/) Google Analytics alternative the protects your data and your customers' privacy. Used by Amnesty, UN
