---
layout: post
title: Concurrency with Async Await and Task
description: Asynchronous concurrency with async await and having multiple http connections. Controlling it with a list of Tasks.
#menu: review
categories: Task C# Async Concurrency BrokenLinkChecker
published: true 
comments: true     
sitemap: true
image: /assets/2020-07-22/runners.jpg
---

[![alt text](/assets/2020-07-22/runners.jpg "Photo by @slelham from Unsplash"){:width="700px"}](https://unsplash.com/@slelham)

I'm [writing articles](/#BrokenLinkChecker) on developing a website broken link checker in C#. 

I need simultaneous http connections as 1 at a time is toooo slow :-) The 2 strategies considered were:

- Multiple threads (synchronous concurrency)
- Async await (asynchronous concurrency)

[Stephen Cleary wrote in these comments](https://markheath.net/post/constraining-concurrent-threads-csharp)

> Synchronous concurrency (parallelism) is using multiple threads, and is an appropriate choice if you have CPU-bound code.

> Asynchronous concurrency is a form of concurrency that does not require additional threads, and is an appropriate choice if you have I/O-bound code.

So I went with async await as I'm I/O bound with my http connections whilst the crawler is working.

This took my a while to get my head around, and a big thanks to [Tom Parslow](https://twitter.com/almostobsolete) for guidance.

## What is Async Await

Here are the salient parts of [Async programming with async and await - MS Docs](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)

- Code reads like a sequence of statements
- But the code path executes based on when a task completes

> Async/await ... is not about threads. It's about suspending the execution awaiting for the result, and releasing resources for other code [source](https://stackoverflow.com/questions/25591848/async-await-multi-core)

[Async all the way down](https://stackoverflow.com/a/29809054/26086) I found to be a good explanation too.

[C# under the hood async](https://www.markopapic.com/csharp-under-the-hood-async-await/) shows in detail how the underlying generated state machine works if you want to dive deeper.

## Async Concurrency

Show me some code....

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

Interestingly the DoSomethingB finished first above, yet we had to await the A task finishing first. We could use the Task.WhenAny() pattern (shown below) to get the first completed task.

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

Interestingly we can use `Lists`, `Queues` etc.. as behind the scenes it is all thread safe (the same thread!) just state machines and callbacks doing control flow.. We don't need to use `ConcurrentList` etc..

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

We can use simple constructs to limit what goes into our downloadTask's list based on the baseUrl

```cs
// Dictionary of baseurl, number of items currently downloading,  we only want x connections per baseurl
var dictionaryOfBaseUrlsCurrentlyRequesting = new Dictionary<string, int>();

// then in the main program loop
var numberOfConnectionsToBaseUrl = dictionaryOfBaseUrlsCurrentlyRequesting.GetOrCreateValue(urlProcessedBase, 1);

if (numberOfConnectionsToBaseUrl <= maxConnectionsToBaseUrl && downloadTasks.Count <= maxDownloadTasks - 1)
{
    // add another task to downloadTasks
}

```

Is this way we can:

- Limit max number of connections to a baseurl domain to 6
- Limit the max number of httpClient connections from the server to 200

## Will this use multiple cores

Yes, however it is way I used the Task's which can use multiple cores. Here is a [bashtop screenshot](/2020/05/02/Bashtop-linux-alternative-to-task-manager) of a crawler using [PuppeteerSharp](https://github.com/hardkoded/puppeteer-sharp) (which takes a lot of resources to run as it is Chrome).

![alt text](/assets/2020-07-22/bashtop1.jpg "A single Task"){:width="600px"}

The crawler running 1 Task at a time

![alt text](/assets/2020-07-22/bashtop2.jpg "A single Task"){:width="600px"}

The crawler running 12 Tasks at a time, on an 8 core machine.

## There is no thread

> IO tasks are not CPU bound and thus do not require a thread. The main point of async is to not block threads during IO bound tasks


> There is actually someone doing the work in the background with I/O operations. It is not a thread but another dedicated hardware component doing its job

[Stackoverflow answer and discussion](https://stackoverflow.com/questions/37419572/if-async-await-doesnt-create-any-additional-threads-then-how-does-it-make-appl)

## DB Connections async all the way up

DB Connections are another I/O bound task where asynchronous concurrency is a good fit. Async await allows the thread not be blocked but must be async all the way. [The SO answer on async all the way up](https://stackoverflow.com/questions/29808915/why-use-async-await-all-the-way-down/29809054#29809054) is enlightening.

[Async await with Dapper article](/2018/01/18/Async-with-Dapper-and-Razor-Pages) showed my initial explorations of async a few years ago. I can't imagine not using async now for situations like this.

Async has become the default for db work.

## Summary

> Asynchronous concurrency is a form of concurrency that does not require additional threads, and is an appropriate choice if you have I/O-bound code.

For my I/O bound Http and DB calls async await concurrency is a good fit.

I love that I can treat the code as 'normal' without having to use multi-threading techniques and special collections which deal with locking.

The secret sauce of async await gives us developers a huge amount of power!

<br />
<br />