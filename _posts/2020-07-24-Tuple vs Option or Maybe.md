---
layout: post
title: Tuple deconstruction vs Option / Maybe / Either 
description: 
menu: review
categories: Functional BrokenLinkChecker
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

[This Tweet by Mike Hadlow](https://twitter.com/mikehadlow/status/1194570824176545792) on using a Tuple(bool,T) vs using a `Maybe<T>` / `Option<T>` / `Either<Exception, T>` got me thinking:

[My 3 part series on FP in C#](/2019/03/12/Functional-Programming-in-C-Sharp-Expressions-Options-Either)

Here is a function I've been writing using [language-ext](https://github.com/louthy/language-ext)

**todo - put in a simple Option<string> blacklist function to demonstrate the differences**

```cs
// calling code
public static async void Main2(string urlToProcess)
{
    Either<Exception, string> r = await GetBaseUrl(urlToProcess);
    var baseUrl = r.Match(Left: ex => "", Right: x => x);
    if (baseUrl == "") return; // todo - get exception to the UI
    //...
}

// the function
public static Either<Exception, string> GetBaseUrl(string url)
{
    if (url.StartsWith("http://") || url.StartsWith("https://")) { }
    else
        url = "http://" + url;

    var httpClient = new HttpClient();
    const string userAgent = @"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36";
    httpClient.DefaultRequestHeaders.Add("User-Agent", userAgent);
    string redirectedToUrl;
    try
    {
        var httpResponseMessage = httpClient.GetAsync(url).Result;
        httpResponseMessage = CheckCharacterSet(httpResponseMessage);
        var sc = (int)httpResponseMessage.StatusCode;
        redirectedToUrl = httpResponseMessage.RequestMessage.RequestUri.ToString();
    }
    catch (Exception ex)
    {
        return ex;
    }
    return redirectedToUrl.Remove(redirectedToUrl.Length - 1);
}

// testing the function
[Theory]
[InlineData("bbc.co.uk", "https://www.bbc.co.uk")]
[InlineData("https://bbc.co.uk", "https://www.bbc.co.uk")]
public static async void FixUrl_Happy(string input, string expected)
{
    Either<Exception, string> r = await GetBaseUrl(input);
    var baseUrl = r.Match(Left: ex => "", Right: x => x);
    Equal(expected, baseUrl);
}

```

This forces us to deal with the Exception case albeit badly

Using a tuple:

```cs
// calling code
public static async IAsyncEnumerable<UIMessage> Crawl(string url)
{
    var (success, baseUrl, errorMessage) = await GetBaseUrl(url);
    if (!success)
    {
        Log.Warning($"Can't GetBaseUrl: {url} - getting {errorMessage}");
        // break out...
    }
    Log.Information($"requesting {baseUrl}");
    // ...
}

// the function
public static async Task<(bool success, string? processedUrl, string? errorMessage)> GetBaseUrl(string url)
{
    if (url.StartsWith("http://") || url.StartsWith("https://")) { }
    else
        url = "http://" + url;

    var httpClient = new HttpClient();
    const string userAgent = @"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36";
    httpClient.DefaultRequestHeaders.Add("User-Agent", userAgent);
    string redirectedToUrl;
    try
    {
        var httpResponseMessage = await httpClient.GetAsync(url);
        httpResponseMessage = CheckCharacterSet(httpResponseMessage);
        //var sc = (int)httpResponseMessage.StatusCode;
        redirectedToUrl = httpResponseMessage.RequestMessage.RequestUri.ToString();
    }
    catch (Exception ex)
    {
        return (success: false, default, ex.InnerException?.Message);
    }

    // There will always be a trailing / character which we don't want
    return (success: true, redirectedToUrl.Remove(redirectedToUrl.Length - 1), default);
}

// testing the function
[Theory]
[InlineData("bbc.co.uk", "https://www.bbc.co.uk")]
[InlineData("https://bbc.co.uk", "https://www.bbc.co.uk")]
public static async Task GetBaseUrl_Happy(string input, string expected)
{
    var (success, processedUrl, errorMessage) = await GetBaseUrl(input);
    if (success)
        Equal(expected, processedUrl);
    else
        Equal(expected, errorMessage);
}
```

## Conclusion

There is no 'right way' to code. I'm aiming to make my code 

- clear
- testable

Currently both ways seem pretty good. I'm not using any monadic composition of the tuple(bool, T) yet, but lets see how it goes.


![alt text](/assets/2019-11-13/2.jpg "A nicer log")
