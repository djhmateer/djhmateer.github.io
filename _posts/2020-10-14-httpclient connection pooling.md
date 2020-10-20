---
layout: post
title: HttpClient connection pooling
description: HttpClient connection pooling in .NET Core 3.1 - keep it simple and consume few resoures with excellent performance.
#menu: review
categories: HttpClient BrokenLinkChecker
published: true 
comments: true     
sitemap: true
image: /assets/2020-10-14/gull.jpg
---

[![alt text](/assets/2020-10-14/gull.jpg "Gull from @Iamni_bht on Unsplash")](https://unsplash.com/@imani_bht)

I'm writing a broken link checker website and want to make sure the code consumes as few resources as possible and can take a large amount of load (http requests!)

From [Steve Gordon's excellent article HTTPClient Connection pooling in .NET Core > 2.1](https://www.stevejgordon.co.uk/httpclient-connection-pooling-in-dotnet-core):

> HttpClient in .NET Core (since 2.1) performs connection pooling and lifetime management of those connections. This supports the use of a single HttpClient instance which reduces the chances of socket exhaustion whilst ensuring connections re-connect periodically to reflect DNS changes.

I did think I was going to have to use [IHttpClientFactory](/IHttpClientFactory) but using HttpClient is much simpler.

## Connection Pooling

"The SocketsHttpHandler establishes a pool of connections for each unique endpoint which your application makes an outbound HTTP request to via HttpClient. On the first request to an endpoint, when no existing connections exist, a new HTTP connection will be established and used for the request. Once that request completes, the connection is left open and is returned into the pool.

Subsequent requests to the same endpoint will attempt to locate an available connection from the pool. If there are no free connections and the connection limit for that endpoint has not been reached, a new connection will be established. Once the connection limit is reached, requests are held in a queue, until a connection is free to send them."

I blatently ~~stole~~ borrowed this excellent description from Steve Gordon (I think!)

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

We dont want to use this.

```cs
// NO!
var result = httpClient.GetStringAsync(GitHubConstants.RepositoriesPath).Result; 

// Don't store whole response in a string
var result = await httpClient.GetStringAsync(GitHubConstants.RepositoriesPath).ConfigureAwait(false);
return JsonConvert.DeserializeObject<List<GitHubRepositoryDto>>(result);
```

## Conclusion

Keep it simple and use connection pooling!