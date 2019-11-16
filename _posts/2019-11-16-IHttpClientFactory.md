---
layout: post
title: IHttpClientFactory 
description: 
menu: review
categories: IHttpClientFactory 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

I'm writing a broken link checker website and want to make sure the code consumes as few resources as possible and can take a large amount of load (http requests!)

[Steve Gordons series](https://www.stevejgordon.co.uk/introduction-to-httpclientfactory-aspnetcore) explains the issues well. Quoting:

If you create too many HttpClients

- It is inefficient as each one will have its own connection pool..
- Can run into socket exhaustion

## Socket Exhaustion

[From the aspnetmonsters article - You're using HttpClient Wrong...](https://aspnetmonsters.com/2016/08/2016-08-27-httpclientwrong/):



## Conclusion

[MS Documentation using in a Console App](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-requests?view=aspnetcore-3.0#use-ihttpclientfactory-in-a-console-app)


![alt text](/assets/2019-11-13/2.jpg "A nicer log")
