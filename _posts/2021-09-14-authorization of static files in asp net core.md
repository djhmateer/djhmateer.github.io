---
layout: post
# title: 
description: 
menu: review
categories: exception
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-08-29/error.jpg "error"){:width="500px"}](/assets/2021-08-29/error.jpg) -->

I have generated static files on the webserver like:

- /downloads/90/results.html 
- /downloads/90/results90.zip

- /downloads/89/results.html
- /downloads/89/results.csv

I want to check that the user is authenticated and authorised before they can download.

[https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-3.1#static-file-authorization](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-3.1#static-file-authorization)

## Method 1 - use middleware

## Method 2 - Serve via an Action Method

As I've got some custom authentication/authorization and logging all setup with my pipeline, I'd like to keep it simple, so found this a nice wa:

```cs

```
