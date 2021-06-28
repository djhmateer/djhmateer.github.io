---
layout: post
title: Upload large files with ASP NET Core 5 and Kestrel 
description: 
menu: review
categories: Kestrel 
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---



```cs
// to allow large form uploads
services.Configure<KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize = int.MaxValue; // if don't set default value is: 30 MB
});

// to allow large form uploads
services.Configure<FormOptions>(x =>
{
    x.ValueLengthLimit = int.MaxValue;
    x.MultipartBodyLengthLimit = int.MaxValue; // if don't set default value is: 128 MB
    x.MultipartHeadersLengthLimit = int.MaxValue;
});
```