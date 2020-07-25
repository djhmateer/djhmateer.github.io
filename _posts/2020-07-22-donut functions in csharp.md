---
layout: post
title: Donut Functions - Hole in the middle - Higher Order Function
description: Tame the ubiquitous beast of complexity. Donut function examples showing a timer.
menu: review
categories: Functional C# BrokenLinkChecker
published: false 
comments: false     
sitemap: false
image: /assets/2020-07-22/donut.jpg
---

[![alt text](/assets/2020-07-22/donut.jpg "Photo by @acreativegangster from Unsplash"){:width="500px"}](https://unsplash.com/@acreativegangster)

I'm [writing articles](/#BrokenLinkChecker) on developing a website broken link checker in C#. This is part of that series. Also
[Part 1 of my series on Functional Programming in C#](/2019/01/11/Learning-Functional-Programming-in-C-Sharp).

It's a good sign when you use something purely out of choice as it feels right, makes code cleaner (IMO) and easier to reason about.

## What is a Donut

I've got a function with does HttpRequests for my broken link checker. I've wrapped this function with a timer function so I can instrument it. This has proven to be super useful in keeping my functions small.

The technique is called `Hole in the middle`, or `Donut` or more precisely is a `Higher Order Function that encapsulates`

[See the Orange Book - Functional Programming in C#](https://livebook.manning.com/book/functional-programming-in-c-sharp/chapter-1/260) for much more detail.

I've been using Functional style programming in C# for a few years, and you'll notice in the code samples below that:

- I'm using [Immutable data objects](/2019/03/12/Functional-Programming-in-C-Sharp-Expressions-Options-Either#immutable-data-objects--smart-constructors) using the With construct as C#9 Data types not out yet.
- I'm not using `Option` types, instead using C#8's null reference checking for safety.
- I'm using tuples when there are 2 or 3 values to return

Essentially I'm aiming to:

- Keep functions small (so easy to reason about)
- Keep everything immutable (to prevent complexity)

ie:

> Tame the ubiquitous beast of complexity

## Timer Wrapper

I have a function which I want to time. But I don't want to clutter the function up with Stopwatch code.

```cs
public static void Main()
{
    // Calling code
    var (output, elapsedMilliseconds) = WithTimer("input for DoSomething", DoSomething);
    Console.WriteLine($"output is: {output} which took: {elapsedMilliseconds}ms");
}

// Wrapper
// Return a tuple with the int output of the inner function, and the elapsedMilliseconds of this WithTimer wrapper
// pass in the string input to the inner function
public static (int, string) WithTimer(string input, Func<string, int> function)
{
    var sw = Stopwatch.StartNew();
    int output = function(input);
    return (output, sw.ElapsedMilliseconds.ToString());
}

// Function
public static int DoSomething(string input)
{
    Thread.Sleep(500);
    return 2;
}
```

The DoSomething function is easy to reason about, and is more testable with a simple input and output.

## Timer Wrapper with Async

Using the same principles here is some real code.

My GetRequestResultAndHtml function takes 3 arguments - `URI` and `HttpClient` and another `URI`.

I am sharing a singleton of 'HttpClient' across the lifetime of the request for [HttpClient connection pooling reasons](https://www.stevejgordon.co.uk/httpclient-connection-pooling-in-dotnet-core)

```cs
// Calling code
// 0. A collection of Tasks seeded with a startingUri which will start straight away
var downloadTasks =
    new List<Uri> { startingUri }
       .Select(x => WithGetRequestResultAndHtml(x, httpClient, startingUri, GetRequestResultAndHtml))
       .ToList();

// Wrapper donut function
public static async Task<(Uri, RequestResult, string? html)>
    WithGetRequestResultAndHtml(Uri uri, HttpClient httpClient, Uri startingUri,
                                Func<Uri, HttpClient, Uri, Task<(RequestResult, string? html)>> function)
{
    var sw = Stopwatch.StartNew();
    var (requestResult, html) = await function(uri, httpClient, startingUri);
    requestResult = requestResult.With(timeSpan:TimeSpan.FromMilliseconds(sw.ElapsedMilliseconds));
    return (uri, requestResult, html);
}

// Inner
public static async Task<(RequestResult, string? html)>
    GetRequestResultAndHtml(Uri uri, HttpClient httpClient, Uri startingUri)
{
    var httpResponseMessage = await httpClient.GetAsync(uri);
    // etc..
    return (requestResult, html);
}
```

Here is a picture to show how the type signatures match up.

![alt text](/assets/2020-07-22/signatures.jpg "Signatures")

I find this picture helps and keeping to good indentation too.

This is where C# gets messy compared with more functional languages like F# and Haskell.

[The GetRequestResultAndHtml uses HttpCompletionOption](https://www.stevejgordon.co.uk/using-httpcompletionoption-responseheadersread-to-improve-httpclient-performance-dotnet) which has interesting IDisposable needs meaning the above function does more that I'd like currently.

[Async article on using Tasks to handle simultaneous http requests](/2020/07/23/concurrency-async-await-and-task) dives into the above code exploring how I do the core of the broken link checker.

[Immutable Data objects / Smart Constructor / With strategy](/2019/03/12/Functional-Programming-in-C-Sharp-Expressions-Options-Either#immutable-data-objects--smart-constructors) looks at how I implement the `RequestResult` above

## DB Connection

This is another use of donut functions. I've started with timers like above, and now moving into experimenting with db connections.


## Conclusion

I regularly use Donut functions for timer instrumentation, even though it looks quite complex to begin with. In the long run it helps to:

> Tame the ubiquitous beast of complexity

Which is always what I'm always trying to do....