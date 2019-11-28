---
layout: post
title: HttpClient User-Agent
description: 
menu: review
categories: HttpClient
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

Writing a broken link checker I came across a [site which behaves strangely - element14.com](https://www.element14.com/community/welcome)

![alt text](/assets/2019-11-13/50.jpg "Erroring after 19s")
Erroring after 19s from the server

[Digging into the issue on StackOverflow](https://stackoverflow.com/questions/59069636/httpclient-with-f5-big-ip-unable-to-read-data-from-transport-connection-yet-c?noredirect=1#comment104377533_59069636)

I found that curl worked albeit slowly

```bash
 curl --trace-ascii curl.trace https://www.element14.com/community/community/welcome
```

=> Send header, 98 bytes (0x62)
0000: GET /community/welcome HTTP/1.1
0021: Host: www.element14.com
003a: User-Agent: curl/7.55.1
0053: Accept: */*
0060: 

```cs
static async Task Main()
{
    var sw = Stopwatch.StartNew();

    var handler = new HttpClientHandler { AllowAutoRedirect = false };
    var httpClient = new HttpClient(handler);

    // Chrome 78 User-Agent
    // always fails with Unable to read data from the transport connection:
    // A connection attempt failed because the connected party did not properly respond after a period of time,
    // or established connection failed because connected host has failed to respond.. 
    const string userAgent = @"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";

    // Curl User-Agent works after 10s
    //const string userAgent = "curl/7.55.1";

    httpClient.DefaultRequestHeaders.Add("User-Agent", userAgent);

    var url = "https://www.element14.com/community/welcome";
    try
    {
        var httpResponseMessage = await httpClient.GetAsync(url);
        var sc = (int)httpResponseMessage.StatusCode;
        Console.WriteLine($"success {sc} in {sw.Elapsed.TotalSeconds}");
    }
    catch (HttpRequestException ex)
    {
        sw.Stop();
        Console.WriteLine($"fail in {sw.Elapsed.TotalSeconds} {ex} \n{ex?.InnerException}");
        // always failing around 19.3 or 19.5ms
    }
}
```

## Timeouts and Exceptions

This behaviour exposed an underlying issues with my link checker in that it timed out only in production (which is on an Ubuntu Linux box) as opposed to after 19s on my Windows development machine.

```cs
###linux catch

```


## Most common user-agents

