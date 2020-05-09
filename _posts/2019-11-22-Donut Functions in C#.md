---
layout: post
title: Donut Functions
description: 
menu: review
categories: Functional C#
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

Sometimes called Hole in the Middle

## Timer Wrapper with string input, int output function

I have a function which I want to time. But I don't want to clutter the function up with Stopwatch code.

```cs
// Calling code
//(int output, string elapsedMilliseconds) = WithTimer("input for DoSomething", x => DoSomething(x));
(int output, string elapsedMilliseconds) = WithTimer("input for innerFunction DoSomething", DoSomething);

// Wrapper
// Return a tuple with the int output of the inner function, and the elapsedMilliseconds of this WithTimer wrapper
// pass in the string input to the inner function
public static (int output, string elapsedMilliseconds) WithTimer(string input, Func<string, int> function)
{
    var sw = Stopwatch.StartNew();
    int output = function(input);
    return (output, sw.ElapsedMilliseconds.ToString());
}

// Function that DoesSomething
public static int DoSomething(string input)
{
    Thread.Sleep(500);
    return 2;
}
```

## Passing a statement lambda into the WithTimer

Instead of passing a function ie DoSomething function which we want to run, just pass in a lambda expression which does the thing.

```cs
(int output, string elapsedMilliseconds) = WithTimer("input for innerFunction", x =>
{
    string input = x;
    Thread.Sleep(500);
    return 2;
});

```

## Passing 2 arguments into WithHttpTimer

My HttpClientRequest function takes 2 arguments - url and httpClient. I am sharing a singleton of HttpClient across the lifetime of the request for [HttpClient connection pooling reasons](/HttpClient)

```cs
// Calling code
// pass in a url, httpClient and the function to run
//(HttpResponseMessage httpResponseMessage, string elapsedMilliseconds) = WithHttpTimer(url, httpClient, (x,y) => HttpClientRequestB(x,y));
// Calling code using Method Group syntax
(HttpResponseMessage httpResponseMessage, string elapsedMilliseconds) = 
    WithHttpTimer(url, httpClient, HttpClientRequestB);
//
var (httpResponseMessage, elapsedMilliseconds) =
        WithHttpTimer(url, httpClient, (x, y) =>
        {
            return y.GetAsync(x).Result;
        });

//
var (httpResponseMessage, elapsedMilliseconds) =
        WithHttpTimer(url, httpClient, (x, y) => y.GetAsync(x).Result);

// Wrapper
// takes a string, httpClient, and a function
// returns an httpResponseMessage and elapsedMillisecoonds
public static (HttpResponseMessage output, string elapsedMilliseconds) WithHttpTimer(string url, HttpClient httpClient, Func<string, HttpClient, HttpResponseMessage> function)
{
    var sw = Stopwatch.StartNew();
    var output = function(url, httpClient);
    return (output, sw.ElapsedMilliseconds.ToString());
}

// Function
// Returning HttpResponseMessage to check the status code
public static HttpResponseMessage HttpClientRequestB(string url, HttpClient httpClient)
{
    //var httpClient = new HttpClient();
    var httpResponseMessage = httpClient.GetAsync(url).Result;
    //httpResponseMessage = CheckCharacterSet(httpResponseMessage);
    return httpResponseMessage;

}
```

## Timer Wrapper using Async

I use async all the way and one of the main functions I want to wrap is using HttpClient, which I want to be async. And I need to make sure it is cancellable, so a stalled HttpClient call can be immediately cancelled.

```cs
// Calling code
var (outputB, elapsedMillisecondsB)  = await WithTimerAsync("input for DoSomethingAsync", DoSomethingAsync);

// Wrapper
public static async Task<(int output, string elapsedMilliseconds)> WithTimerAsync(string input, Func<string, Task<int>> function)
{
    var sw = Stopwatch.StartNew();
    int output = await function(input);
    return (output, sw.ElapsedMilliseconds.ToString());
}

// Function
public static async Task<int> DoSomethingAsync(string input)
{
    await Task.Delay(500);
    return 2;
}
```

## HttpClient Wrapper using Async

```cs
// Calling code
//var (httpResponseMessage, elapsedMilliseconds) =
//    await WithHttpTimerAsync(url, httpClient, (x, y) => y.GetAsync(x));
// Calling code passing ct - very handy as it is in scope
var (httpResponseMessage, elapsedMilliseconds) =
    await WithHttpTimerAsync(url, httpClient, (x, y) => y.GetAsync(x, cancellationToken));

// Wrapper
public static async Task<(HttpResponseMessage output, string elapsedMilliseconds)>
            WithHttpTimerAsync(string url, HttpClient httpClient, 
                Func<string, HttpClient, Task<HttpResponseMessage>> function)
{
    var sw = Stopwatch.StartNew();
    var output = await function(url, httpClient);
    return (output, sw.ElapsedMilliseconds.ToString());
}
```

## HttpClient Wrapper using Async in a separate method passing ct through

Need to be able to handle exceptions ie what if the connection goes down / site goes down / doesn't exist?

```cs
// Calling code
var (httpResponseMessage, elapsedMilliseconds) =
    await WithHttpTimerAsync(url, httpClient, cancellationToken, HttpClientRequestAsync);

// Wrapper
public static async Task<(HttpResponseMessage output, string elapsedMilliseconds)>
            WithHttpTimerAsync(string url, HttpClient httpClient, CancellationToken cancellationToken,
                               Func<string, HttpClient, CancellationToken, Task<HttpResponseMessage>> function)
{
    var sw = Stopwatch.StartNew();
    var output = await function(url, httpClient, cancellationToken);
    return (output, sw.ElapsedMilliseconds.ToString());
}

// Function
public static Task<HttpResponseMessage> HttpClientRequestAsync
    (string url, HttpClient httpClient, CancellationToken cancellationToken)
{
    return httpClient.GetAsync(url, cancellationToken);
}

// Function async - should it be this?
// see Tardis below
public static async Task<HttpResponseMessage> HttpClientRequestAsync
    (string url, HttpClient httpClient, CancellationToken cancellationToken)
{
    return await httpClient.GetAsync(url, cancellationToken);
}
```

## Final version with Exception handling

Using tuple deconstruction with a nullable errorMessage

```cs
```

## Tardis

Interesting that some functions are not async yet return a Task eg ScheduleByAccount

https://github.com/TardisBank/TardisBank/blob/master/server/src/TardisBank.Api/Db.cs

```cs
// return a Task even though not async
public static Task<IEnumerable<Schedule>> ScheduleByAccount(string connectionString, Account account)
{
    // local function which is async
    async Task<IEnumerable<Schedule>> ConnectionFunction(IDbConnection conn)
    {
        var result = await conn.QueryAsync<Schedule>(@"SELECT
            schedule_id as ScheduleId,
            account_id as AccountId,
            time_period as TimePeriod,
            next_run as NextRun,
            amount as Amount
            FROM schedule
            WHERE account_id = @AccountId", account);
        return result;
    }

    var result2 =  WithConnection<IEnumerable<Schedule>>(connectionString, ConnectionFunction);

    return result2;
}
```

## DB Connection Wrapper


![alt text](/assets/2019-11-13/32.jpg "Connection pool sharing")
Shared connection for all that went to davemateer.com. New connections for google.co.uk and bbc.co.uk

