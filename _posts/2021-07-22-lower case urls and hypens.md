---
layout: post
title: Lower case urls and hypens
description: 
menu: review
categories: url 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

I use .NET. 

By default everything is CamelCase eg /Index and /FaceSearch

I move between Windows and Linux machines a lot (usually from Dev to Prod)

For SEO lower case is more preferred (source) 

So for newer projects, lets just go with lowercase for all urls


```cs
public static void Main(string[] args)
{
    Log.Logger = new LoggerConfiguration()

        // **make life easier by going lowercase**
        .Filter.ByExcluding("RequestPath like '/health%'")

```

## Underscores or hypens

[https://stackoverflow.com/questions/119312/urls-dash-vs-underscore](https://stackoverflow.com/questions/119312/urls-dash-vs-underscore)

go-with-hypens

