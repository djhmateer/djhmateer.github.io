---
layout: post
title: Async await
description: 
menu: review
categories: Async 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/3.jpg
---

This post is to remind my future self how async await works in .NET.

[Async programming with async and await - MS Docs](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)

[My article on Tasks and creating multiple http connections](/Task) goes into depth, but this article is an overview reminder.  

Here are some salient parts of that article:

- Code reads like a sequence of statements
- But executes ..based on.. when a task completes

I found this article quite difficult to read but [the working source code is good](https://github.com/dotnet/samples/blob/master/snippets/csharp/tour-of-async/AsyncBreakfast-final/Program.cs).

## Async Concurrency

2 things happening together and not blocking the Main method.

```cs
static async Task Main(string[] args)
{
    var sw = Stopwatch.StartNew();

    // 2 tasks will be going simultaneously
    // asynchronous concurrency - this is appropriate when you have I/O bound code eg http
    Console.WriteLine("Starting DoSomethingA task");
    Task<string> doSomethingTaskA = DoSomething("A");

    Console.WriteLine("Starting DoSomethingB task");
    var doSomethingTaskB = DoSomething("B");

    // can do work that doesn't rely on doSomething results
    Console.WriteLine("doing other stuff");

    // await suspends the function Main, and can't continue until doSomethingTask completes
    string resultA = await doSomethingTaskA;
    Console.WriteLine($"resultA is {resultA}");

    string resultB = await doSomethingTaskB;
    Console.WriteLine($"resultb is {resultB}");

    Console.WriteLine($"finished in {sw.ElapsedMilliseconds}");
}

static async Task<string> DoSomething(string whereCalledFrom)
{
    Console.WriteLine($"inside DoSomething called from {whereCalledFrom}");
    await Task.Delay(5000);
    Console.WriteLine($"done {whereCalledFrom}");
    return $"result {whereCalledFrom}";
}

```

![alt text](/assets/2020-01-09/10.jpg "Output from console"){:width="300px"}  
Interestingly the DoSomethingB finsihed first above, yet we had to await the A task finishing first. We could use the Task.WhenAny() pattern to get the first completed task.

## Async all the way

Async await allows the thread not be locked


[Async await with Dapper article](2018/01/18/Async-with-Dapper-and-Razor-Pages)