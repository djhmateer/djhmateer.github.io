---
layout: post
title: Concurrency with Async Await and Task
description: 
menu: review
categories: Task Async Concurrency
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---
I'm writing a broken link checker and need simultaneous http connections

The 2 strategies I considered:

- Multiple threads (synchronous concurrency)
- Async await (asynchronous concurrency)

[Stephen Cleary wrote in these comments](https://markheath.net/post/constraining-concurrent-threads-csharp)

> Synchronous concurrency (parallelism) is using multiple threads, and is an appropriate choice if you have CPU-bound code.

> Asynchronous concurrency is a form of concurrency that does not require additional threads, and is an appropriate choice if you have I/O-bound code.

[Good overview on SO](https://stackoverflow.com/a/29809054/26086) of when to use async await

So I went with async await as I'm I/O bound with my http connections.

## What is Async Await

Here are the salient parts of [Async programming with async and await - MS Docs](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)

- Code reads like a sequence of statements
- But executes based on when a task completes

## Async Concurrency

2 things happening together and not blocking the Main method. So there are not 2 threads.

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

Interestingly the DoSomethingB finished first above, yet we had to await the A task finishing first. We could use the Task.WhenAny() pattern to get the first completed task.

## Using Task to get multiple connections

[This example comes from MS Docs](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/start-multiple-async-tasks-and-process-them-as-they-complete) on how to handle multiple http request using async await.

```cs
static async Task Main()
{
    var httpClient = new HttpClient();

    var urlList = SetUpURLList();

    List<Task<(int length, long elapsedMilliseonds)>> downloadTasks = urlList.Select(
        url =>
        {
            return ProcessURL(url, httpClient);
        }).ToList();

    // ***Add a loop to process the tasks one at a time until none remain.
    while (downloadTasks.Count > 0)
    {
        // Identify the first task that completes.
        Task<(int length, long elapsedMilliseconds)> firstFinishedTask = await Task.WhenAny(downloadTasks);

        // ***Remove the selected task from the list so that you don't
        // process it more than once.
        downloadTasks.Remove(firstFinishedTask);

        // Await the completed task.
        var (length, elapsedMilliseconds) = await firstFinishedTask;

        // add a new task 
        //downloadTasks.Add(ProcessURL("https://davemateer.com", httpClient));
        Console.WriteLine($"Length of download: {length} in {elapsedMilliseconds}ms");
    }
}

static async Task<(int length, long elapsedMilliseconds)> ProcessURL(string url, HttpClient client)
{
    var sw = Stopwatch.StartNew();
    var httpResponseMessage = await client.GetAsync(url);

    // Retrieve the website contents from the HttpResponseMessage.
    byte[] urlContents = await httpResponseMessage.Content.ReadAsByteArrayAsync();

    return (urlContents.Length, sw.ElapsedMilliseconds);
}

private static List<string> SetUpURLList() =>
    new List<string>
    {
        "https://msdn.microsoft.com",
        "https://msdn.microsoft.com/library/windows/apps/br211380.aspx",
        "https://msdn.microsoft.com/library/hh290136.aspx",
        "https://msdn.microsoft.com/library/dd470362.aspx",
        "https://msdn.microsoft.com/library/aa578028.aspx",
        "https://msdn.microsoft.com/library/ms404677.aspx",
        "https://msdn.microsoft.com/library/ff730837.aspx"
    };
```

[Is async await concurrent](https://stackoverflow.com/a/7663734/26086) is a good question ie should I be worried about thread safety writing back to the downloadTasks? In this case no.

Interestingly we can use Lists, Queues etc.. and don't need to use ConcurrentList, ConcurrentQueue in the async await world.

I'm not passing a cancellation token (yet), and have commented out a line to add another task while still in the loop which works.

I think this WhenAny solution is appropriate but [if there are too many tasks on the queue](https://devblogs.microsoft.com/pfxteam/processing-tasks-as-they-complete/) then it may not be. I'm going to limit the number of tasks for a different reason below.

## Limiting the tasks

A simple solution is to limit the number of tasks added to the list:

```cs
// if there are already 2 queries waiting don't put any more on the downloadTasks list
if (downloadTasks.Count > 2)
    await Task.Delay(500);
else
    // add a new task
    downloadTasks.Add(ProcessURL("https://davemateer.com", httpClient));
```

## Limiting the tasks in a smarter manner





## Async all the way up

DB Connections are another I/O bound task where asynchronous concurrency is a good fit. Async await allows the thread not be blocked but must be async all the way.

[Async await with Dapper article](/2018/01/18/Async-with-Dapper-and-Razor-Pages)
