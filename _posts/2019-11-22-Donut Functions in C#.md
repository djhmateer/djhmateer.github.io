---
layout: post
title: Donut Functions
description: 
menu: review
categories: Functional C#
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

Sometimes called Hole in the Middle

## Timer Wrapper with string input, int output function

I have a function (method) which I want to time. But I don't want to clutter the function up with Stopwatch code.

```cs
// Calling code
//(int output, string elapsedMilliseconds) thing = WithTimer("input for DoSomething", x => DoSomething(x));
(int output, string elapsedMilliseconds) thing = WithTimer("input for innerFunction DoSomething", DoSomething);

// Wrapper
// Return a tuple with the int output of the inner function, and the elapsedMilliseconds of this WithTimer wrapper
// pass in the string input of the inner function
public static (int output, string elapsedMilliseconds) WithTimer(string input, Func<string, int> function)
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

## Passing a lambda function into the WithTimer

Instead of having a DoSomething function which we want to run, just pass in a lambda expression which does the thing.

```cs
(int output, string elapsedMilliseconds) thing = WithTimer("input for innerFunction", x =>
{
    string input = x;
    Thread.Sleep(500);
    return 2;
});

```

## Timer Wrapper using Async

I use async all the way and one of the main functions I want to wrap is using HttpClient, which I want to be async. And I need to make sure it is cancellable, so a stalled HttpClient call can be immediately cancelled.

```cs
// calling code
(int output, string elapsedMilliseconds) thing2 = await WithTimerAsync("input for DoSomethingAsync", DoSomethingAsync);

// Wrapper
public static async Task<(int output, string elapsedMilliseconds)> WithTimerAsync(string input, Func<string, Task<int>> function)
{
    var sw = Stopwatch.StartNew();
    int output = await function(input);
    return (output, sw.ElapsedMilliseconds.ToString());
}

// Function
async Task<int> DoSomethingAsync(string input)
{
    await Task.Delay(500);
    return 2;
}



```


## DB Connection Wrapper


![alt text](/assets/2019-11-13/32.jpg "Connection pool sharing")
Shared connection for all that went to davemateer.com. New connections for google.co.uk and bbc.co.uk

