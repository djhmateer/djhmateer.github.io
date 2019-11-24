---
layout: post
title: IAsyncEnumerable try catch 
description: 
menu: review
categories: IAsyncEnumerable 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---


```cs
// SignalR Hub 
public class CrawlHub : Hub
{
    public async IAsyncEnumerable<UIMessage> Crawl(string url, [EnumeratorCancellation]CancellationToken cancellationToken)
    {
        Log.Information("Here");
        // Trying to catch this error further up pipeline as
        // can't try catch here due to yield return
        throw new HubException("This error will be sent to the client!");
        // handing off to Crawler which returns back messages (UIMessage objects) every now and again on progress
        await foreach (var uiMessage in Crawler.Crawl(url, cancellationToken))
        {
            if (uiMessage.Message.Contains("404"))
                await Clients.Caller.SendAsync("ReceiveBrokenLinkMessage", "404 error on blah", cancellationToken);
            else
                // update the stream UI with whatever is happening in static Crawl
                yield return new UIMessage(uiMessage.Message, uiMessage.Hyperlink, uiMessage.NewLine);

            cancellationToken.ThrowIfCancellationRequested();
        }
    }
}
```

![alt text](/assets/2019-11-13/40.jpg "Error being shown on the UI")

```txt
2019-11-24 08:35:48.636 +00:00 [INF] 
2019-11-24 08:35:48.682 +00:00 [INF] Starting up BLC.Website (Program.cs)
2019-11-24 08:35:48.917 +00:00 [INF] Development environment - using developer exception page
2019-11-24 08:35:48.995 +00:00 [INF] Application started. Press Ctrl+C to shut down.
2019-11-24 08:35:48.997 +00:00 [INF] Hosting environment: Development
2019-11-24 08:35:48.998 +00:00 [INF] Content root path: c:\dev\test\BrokenLink\BLC.Website
2019-11-24 08:35:49.138 +00:00 [INF] HTTP GET / responded 200 in 125.315 ms
2019-11-24 08:35:54.652 +00:00 [INF] HTTP GET /scan?urlToCrawl=davemateer.com responded 200 in 34.0029 ms
2019-11-24 08:35:54.820 +00:00 [INF] HTTP POST /crawlHub/negotiate responded 200 in 11.954 ms
2019-11-24 08:35:54.947 +00:00 [INF] Here
```

Error not being shown in the log files.

Normally I would wrap the top level context root in try catch, however this gives a:

> CS1626 C# Cannot yield a value in the body of a try block with a catch clause

[This is discussed in depth here](https://stackoverflow.com/q/346365/26086)