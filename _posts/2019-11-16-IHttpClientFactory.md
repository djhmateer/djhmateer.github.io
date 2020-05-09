---
layout: post
title: IHttpClientFactory 
description: 
menu: review
categories: IHttpClientFactory 
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

[From NuGet](https://www.nuget.org/packages/Microsoft.Extensions.Http/): 
The HttpClient factory is a pattern for configuring and retrieving named HttpClients in a composable way. The HttpClient factory provides extensibility to plug in DelegatingHandlers that address cross-cutting concerns such as service location, load balancing, and reliability. The default HttpClient factory provides built-in diagnostics and logging and manages the lifetimes of connections in a performant way.

I'm writing a broken link checker website and want to make sure the code consumes as few resources as possible and can take a large amount of load (http requests!)

[MS Documentation - Make HTTP Requests using IHttpClientFactory in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-requests?view=aspnetcore-3.0)

[Steve Gordons series](https://www.stevejgordon.co.uk/introduction-to-httpclientfactory-aspnetcore) explains the issues well. Quoting:

If you create too many HttpClients

- It is inefficient as each one will have its own connection pool..
- Can run into socket exhaustion

Some great in-depth articles are:

- [From the aspnetmonsters article - You're using HttpClient Wrong...](https://aspnetmonsters.com/2016/08/2016-08-27-httpclientwrong/):
- [You are probably still using httpclient wrong](https://josefottosson.se/you-are-probably-still-using-httpclient-wrong-and-it-is-destabilizing-your-software/)

## What not to do 

[YouTube from NDC](https://www.youtube.com/watch?v=ojDxK_-I-To)

```cs
public static async Task Main()
{
    Console.WriteLine("Starting connections");
    for (var i = 0; i < 20; i++)
    {
        // HttpClient implements IDisposable
        // creating many connection pools
        // risk is can run out of sockets (if loads of runs)
        // can stay in TIMEWAIT state of 240s
        // ~16,000 ephemeral ports on windows
        using (var client = new HttpClient())
        {
            var result = await client.GetAsync("https://davemateer.com");
            Console.WriteLine(result.StatusCode);
        }
    }
    Console.WriteLine("Connections done");
}
```

```bash
netstat -n | grep "TIME_WAIT"
```

![alt text](/assets/2019-11-13/10.jpg "All the connections remain open for 4 minutes")

Can see all the sockets remain open for 4 minutes.

## Use an HttpClient Singleton

This has the problem of DNS not being updated

## IHttpClientFactory

- Manages the lifetime of HttpMessageHandlers
- Central location for naming and configuring logical httpclients
- Integreates with Polly
- Diagnostics and logging

## Simplest possible thing with HttpClientFactory

The HttpClientFactory uses DI

## Basic Usage

Strangely the basic example isn't a console app, but a ASP.NET Core 3 app, so here is mine plugging into a SignalR Hub:

```cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddRazorPages();
    // send errors to the client
    services.AddSignalR(x => x.EnableDetailedErrors = true);

    // adds in HttpClientFactory
    services.AddHttpClient();
}
```

Registering the factory with DI, so it can be requested:

```cs
// SignalR Hub 
public class CrawlHub : Hub
{
    private readonly IHttpClientFactory factory;

    public CrawlHub(IHttpClientFactory factory) => this.factory = factory;

    public async IAsyncEnumerable<UIMessage> Crawl(string url, [EnumeratorCancellation]CancellationToken cancellationToken)
    {
        //var x = factory.CreateClient();
        //var httpResponseMessage = await x.GetAsync("https://davemateer.com", cancellationToken);

        // handing off to Crawler which returns back messages (UIMessage objects) every now and again on progress
        await foreach (var uiMessage in Crawler.Crawl(url, factory).WithCancellation(cancellationToken))
        {
            if (uiMessage.Message.Contains("404"))
                // it should be displayed on the error list - this is not a stream
                await Clients.Caller.SendAsync("ReceiveBrokenLinkMessage", "404 error on blah", cancellationToken);
            else
                // update the stream UI with whatever is happening in static Crawl
                yield return new UIMessage(uiMessage.Message, uiMessage.NewLine);

            cancellationToken.ThrowIfCancellationRequested();
        }
    }
}
```

Demo code showing how to get HttpClientFactory working in SignalR

## Named Clients

Named clients 

Will this help with perf as wont need to re-negotiate ssl eg with crawling https://davemateer.com I'll be doing 100's of calls, so want to be as effecient as possible.


## Typed Clients

Same as Named clients but don't need to use strings as keys



## Generate Clients

Used in conjunction with 3rd party libraries.

## Handlers eg Polly

asdf

## Logging

asdf






https://garywoodfine.com/making-api-calls-with-httpclientfactory-in-console-applications/

https://docs.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests






## Console App
https://nodogmablog.bryanhogan.net/2018/07/polly-httpclientfactory-and-the-policy-registry-in-a-console-application/






## Never use .Result

on asynchronous methods. Even .GetAwaiter().GetResult().

Don't use HttpClient in a using()..
Dont use HttpClient..
Use IHttpClientFactory
Use a typed client instead of a named one
Stream the response string


## Socket Exhaustion

## Conclusion

[MS Documentation using in a Console App](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-requests?view=aspnetcore-3.0#use-ihttpclientfactory-in-a-console-app)


![alt text](/assets/2019-11-13/2.jpg "A nicer log")
