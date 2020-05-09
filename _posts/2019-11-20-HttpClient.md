---
layout: post
title: HttpClient
description: 
menu: review
categories: HttpClient
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

I'm writing a broken link checker website and want to make sure the code consumes as few resources as possible and can take a large amount of load (http requests!)

From [HTTPClient Connection pooling in .NET Core > 2.1](https://www.stevejgordon.co.uk/httpclient-connection-pooling-in-dotnet-core):

> HttpClient in .NET Core (since 2.1) performs connection pooling and lifetime management of those connections. This supports the use of a single HttpClient instance which reduces the chances of socket exhaustion whilst ensuring connections re-connect periodically to reflect DNS changes.

I did think I was going to have to use [IHttpClientFactory](/IHttpClientFactory) but using HttpClient is much simpler.

## Connection Pooling

The SocketsHttpHandler establishes a pool of connections for each unique endpoint which your application makes an outbound HTTP request to via HttpClient. On the first request to an endpoint, when no existing connections exist, a new HTTP connection will be established and used for the request. Once that request completes, the connection is left open and is returned into the pool.

Subsequent requests to the same endpoint will attempt to locate an available connection from the pool. If there are no free connections and the connection limit for that endpoint has not been reached, a new connection will be established. Once the connection limit is reached, requests are held in a queue, until a connection is free to send them.

## Real life

```cs
public static async IAsyncEnumerable<UIMessage> Crawl(string url)
{
    // want to share the HttpClient so can use ConnectionPooling and lifetime management 
    // of those connections
    var httpClient = new HttpClient();

    // Get base url eg davemateer.com should return https://davemateer.com etc..
    var (success, baseUrl, errorMessage) = await GetBaseUrl(url, httpClient);
    if (!success)
    {
        Log.Warning($"Can't GetBaseUrl: {url} - getting {errorMessage}");
        yield return new UIMessage($"Error: {errorMessage} trying {url}", true);
        yield break;
    }

    // ip address for debugging
    var ips = await Dns.GetHostAddressesAsync(url);

    Log.Information($"requesting {baseUrl}");
    yield return new UIMessage($"base {baseUrl} {ips[0].MapToIPv4()}", true);

    // We have a good base url eg https://davemateer.com, so start the crawl

    // simulate internal links
    for (int i = 0; i < 100; i++)
    {
        var sw = Stopwatch.StartNew();
        yield return new UIMessage($"{baseUrl}", true);
        var httpResponseMessage = await httpClient.GetAsync(baseUrl);
        yield return new UIMessage($"{(int)httpResponseMessage.StatusCode} {sw.ElapsedMilliseconds}", false);
    }

    // simulate external links
    var url2 = "https://google.co.uk";
    var url2b = "google.co.uk";
    ips = await Dns.GetHostAddressesAsync(url2b);
    var httpResponseMessage2 = await httpClient.GetAsync(url2);
    yield return new UIMessage($"{url2} {ips[0].MapToIPv4()} {(int)httpResponseMessage2.StatusCode} ", true);

    url2 = "https://bbc.co.uk";
    url2b = "bbc.co.uk";
    ips = await Dns.GetHostAddressesAsync(url2b);
    httpResponseMessage2 = await httpClient.GetAsync(url2);
    yield return new UIMessage($"{url2} {ips[0].MapToIPv4()} {(int)httpResponseMessage2.StatusCode} ", true);
}
```

![alt text](/assets/2019-11-13/32.jpg "Connection pool sharing")
Shared connection for all that went to davemateer.com. New connections for google.co.uk and bbc.co.uk

![alt text](/assets/2019-11-13/34.jpg "Very fast when sharing a pool")
Very fast when sharing

![alt text](/assets/2019-11-13/35.jpg "Slower when a new HttpClient is made every time")
Slower when a new HttpClient is made every time

## Netstat

```bash
# n- Addresses and port numbers in numerical form
netstat -n | grep "TIME_WAIT"

# f -Fully Qualified Domain Name
netstat -f

# a - all connections and  listening ports
# o - owning process id
netstat -ano

# count the number of connecitons
# wc - word count
netstat -ano | grep "216.58" | wc -l
```

## Streaming

[From this blog on streaming](https://josefottosson.se/you-are-probably-still-using-httpclient-wrong-and-it-is-destabilizing-your-software/) 

dont want to use

```cs
// NO!
var result = httpClient.GetStringAsync(GitHubConstants.RepositoriesPath).Result; 

// Don't store whole response in a string
var result = await httpClient.GetStringAsync(GitHubConstants.RepositoriesPath).ConfigureAwait(false);
return JsonConvert.DeserializeObject<List<GitHubRepositoryDto>>(result);
```




## DELETE BELOW?


## Connection Lifetime 120s

```cs
static async Task Main(string[] args)
{
    var ips = await Dns.GetHostAddressesAsync("www.google.com");

    foreach (var ipAddress in ips)
    {
        Console.WriteLine(ipAddress.MapToIPv4().ToString());
    }

    var socketsHandler = new SocketsHttpHandler
    {
        PooledConnectionLifetime = TimeSpan.FromMinutes(10),
        PooledConnectionIdleTimeout = TimeSpan.FromMinutes(5),
        MaxConnectionsPerServer = 10
    };

    var client = new HttpClient(socketsHandler);

    //We can see, that in this case, only 1 connection is opened to the remote endpoint.
    //After each request, that connection is returned to the pool and is therefore
    //available for re-use when the next request is issued.
    for (var i = 0; i < 5; i++)
    {
        _ = await client.GetAsync("https://www.google.com");
        await Task.Delay(TimeSpan.FromSeconds(2));
    }

    Console.WriteLine("Press a key to exit...");
    Console.ReadKey();
}
```

"We can see, that in this case, only 1 connection is opened to the remote endpoint. After each request, that connection is returned to the pool and is therefore available for re-use when the next request is issued."

![alt text](/assets/2019-11-13/31.jpg "1 Connection Used")

## Connection Lifetime 1s

```cs
static async Task Main(string[] args)
{
    var ips = await Dns.GetHostAddressesAsync("www.google.com");

    foreach (var ipAddress in ips)
    {
        Console.WriteLine(ipAddress.MapToIPv4().ToString());
    }

    var socketsHandler = new SocketsHttpHandler
    {
        PooledConnectionLifetime = TimeSpan.FromSeconds(1),
        PooledConnectionIdleTimeout = TimeSpan.FromSeconds(1),
        MaxConnectionsPerServer = 10
    };

    var client = new HttpClient(socketsHandler);

    for (var i = 0; i < 5; i++)
    {
        _ = await client.GetAsync("https://www.google.com");
        await Task.Delay(TimeSpan.FromSeconds(2));
    }

    Console.WriteLine("Press a key to exit...");
    Console.ReadKey();
}
```

We can see, 5 connections are opened to the remote endpoint.

![alt text](/assets/2019-11-13/30.jpg "5 Connections Used")

## Max Connections

```cs
static async Task Main(string[] args)
{
    var ips = await Dns.GetHostAddressesAsync("www.google.com");

    foreach (var ipAddress in ips)
    {
        Console.WriteLine(ipAddress.MapToIPv4().ToString());
    }

    var socketsHandler = new SocketsHttpHandler
    {
        PooledConnectionLifetime = TimeSpan.FromSeconds(60),
        PooledConnectionIdleTimeout = TimeSpan.FromMinutes(20),
        MaxConnectionsPerServer = 10
    };

    var client = new HttpClient(socketsHandler);

    var sw = Stopwatch.StartNew();

    var tasks = Enumerable.Range(0, 200).Select(i => client.GetAsync("https://www.google.com"));

    await Task.WhenAll(tasks);

    sw.Stop();

    Console.WriteLine($"{sw.ElapsedMilliseconds}ms taken for 200 requests");

    Console.WriteLine("Press a key to exit...");
    Console.ReadKey();

}
```

2 MaxConnectionsPerServer - took 5.8s
10 Connections used in parallel - took 1.3 secs for 200 requests

![alt text](/assets/2019-11-13/32.jpg "10 Connections Used")

If we comment out MaxConnectionsPerServer, it will use 200 connections which takes longer (1.9s), as it is not Pooling. **need to look into this more**


