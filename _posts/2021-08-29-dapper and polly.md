---
layout: post
title: Dapper and Polly 
description: Make all your Dapper Queries resilient with retries using Polly.Contrib.WaitAndRetry - I use this everywhere now.
#menu: review
categories: Dapper 
published: true 
comments: false     
sitemap: false
image: /assets/2021-08-29/kids.jpg
---

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->

[![alt text](/assets/2021-08-29/kids.jpg "kids"){:width="500px"}](/assets/2021-08-29/kids.jpg)

I use the following retry strategy in all Dapper DB connection code.

[Example source code from osr4rights](https://github.com/osr4rightstools/osr4rights-tools/blob/main/src/OSR4Rights.Web/DapperExtensions.cs). Please also see how I inject connection strings here.

```cs
// Notice ExecuteAsyncWithRetry instead of ExecuteAsync
public static async Task ResetFailedLoginsForEmailLogin(string connectionString, string email)
{
    using var conn = GetOpenConnection(connectionString);

    await conn.ExecuteAsyncWithRetry(@"
        update login
        set PasswordFailedAttempts = 0
        where Email = @Email
        ", new { email });
}

```

## Introduction

[Polly](https://github.com/App-vNext/Polly/) is a resilience and transient-fault-handling library.

[Polly.Contrib.WaitAndRetry](https://github.com/Polly-Contrib/Polly.Contrib.WaitAndRetry) contains helpers for defining backoff strategies when using wait and retry fault handling.

I'm using these with [Dapper](https://github.com/DapperLib/Dapper) so I've got retries on all my db queries for the inevitable network / SQL Azure blips.

> SqlException: Resource ID : 1. The request limit for the database is 30 and has been reached.

Also if you've overloaded your current [Database Transaction Unit DTU](https://docs.microsoft.com/en-us/azure/azure-sql/database/service-tiers-dtu) quota then you'll see this error, so wait and retry.

## Blips in Azure / Networking

This is my primary use case for Polly.

[DapperPollyConsole]() is a Console app which does many inserts into a SQL Azure log table (around 150 separate inserts per second on the lowest DTU). Over some days I've noticed a few blips:

> 2021-09-03 21:52:39.268 +01:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:01.1117661. Retry attempt Polly.Context 
System.Data.SqlClient.SqlException (0x80131904): A transport-level error has occurred when receiving results from the server. (provider: TCP Provider, error: 0 - The specified network name is no longer available.)
 ---> System.ComponentModel.Win32Exception (64): The specified network name is no longer available.

 and

> 2021-09-04 04:31:11.862 +01:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:00.1693761. Retry attempt Polly.Context 
System.Data.SqlClient.SqlException (0x80131904): A transport-level error has occurred when receiving results from the server. (provider: TCP Provider, error: 0 - The semaphore timeout period has expired.)
 ---> System.ComponentModel.Win32Exception (121): The semaphore timeout period has expired.

So far I've caught these 2 errors above, which both went away after their retry period.

```cs
public static bool ShouldRetryOn(Win32Exception ex)
{
    switch (ex.NativeErrorCode)
    {
        // Timeout expired
        case 0x102:
            Log.Warning("0x102 Timeout Expired");
            return true;
        // Semaphore timeout expired
        case 0x121:
            Log.Warning("0x121 Semaphore Timeout Expired");
            return true;
        default:
            return false;
    }
}
```

[Ben's Gist](https://gist.github.com/hyrmn/ce124e9b1f50dbf9d241390ebc8f6df3#gistcomment-3877418) uses a `TimeoutException` which is a good start


[https://stackoverflow.com/questions/1386962/how-to-throw-a-sqlexception-when-needed-for-mocking-and-unit-testing](https://stackoverflow.com/questions/1386962/how-to-throw-a-sqlexception-when-needed-for-mocking-and-unit-testing)

## DTU Exceed 

Lets consider exceeding the DTU quota - the easier one to test! 

Using multiple threads helped me trip the error. I was using a razor pages web app and the source is [here](https://github.com/osr4rightstools/osr4rights-tools/blob/main/src/OSR4Rights.Web/old/polly-test2.cshtml.cs).

```cs
[BindProperty]
public int NumberOfTries { get; set; }

public void OnPost()
{
    var connectionString = AppConfiguration.LoadFromEnvironment().ConnectionString;

    Parallel.For(0, NumberOfTries, i => Db.InsertLogNotAsync(connectionString, 1, $"try {i}"));
}

// ..snip.. 
// In Db.cs
public static IDbConnection GetOpenConnection(string connectionString)
{
    DbConnection cnn = new SqlConnection(connectionString);
    return cnn;
}

public static void InsertLogNotAsync(string connectionString, int jobId, string text)
{
    using var conn = GetOpenConnection(connectionString);

    // no retry - straight Dapper/ADO execute
    conn.Execute(@"
        insert into Log(JobId, [Text])
        values(@JobId, @Text)
        ", new { jobId, text });
}
```

100,000 inserts was enough to trip the error, then post that 10,000 was enough. After a few times even 1000 was enough to error it.

[![alt text](/assets/2021-08-29/error.jpg "error"){:width="800px"}](/assets/2021-08-29/error.jpg)

## Wait and Retry 3 times with Polly

This code is a simplified version of [https://hyr.mn/dapper-and-polly/](https://hyr.mn/dapper-and-polly/) and [https://hyr.mn/Polly-wait-and-retry](https://hyr.mn/Polly-wait-and-retry). Thank you Ben, and please read his articles.

[Source DapperExtensions.cs](https://github.com/osr4rightstools/osr4rights-tools/blob/main/src/OSR4Rights.Web/DapperExtensions.cs)

```cs
public static class DapperExtensions
{
    private static readonly IEnumerable<TimeSpan> RetryTimes = new[]
    {
        TimeSpan.FromSeconds(1),
        TimeSpan.FromSeconds(2),
        TimeSpan.FromSeconds(3)
    };

    // see Ben's article for the SqlServerTransientException code or
    // https://github.com/osr4rightstools/osr4rights-tools/blob/main/src/OSR4Rights.Web/DapperExtensions.cs
    private static readonly RetryPolicy RetryPolicy = Policy
         .Handle<SqlException>(SqlServerTransientExceptionDetector.ShouldRetryOn) // only transient SQL Exceptions which should be retried
                .Or<TimeoutException>() // any sort of timeout exception should retry
                .OrInner<Win32Exception>(SqlServerTransientExceptionDetector.ShouldRetryOn) // 2 more transient exceptions which MSSQL can throw
                .WaitAndRetry(delay,
                    (exception, timeSpan, retryCount) =>
                    {
                        Log.Warning(
                            exception,
                            $"WARNING: Error talking to Db, will retry after {timeSpan}. Retry attempt {retryCount} "
                        );
                    });

    public static int ExecuteWithRetry(this IDbConnection cnn, string sql, object param = null)
    {
        return RetryPolicy.Execute(() => cnn.Execute(sql, param));
    }
}
```

So this is fine for the occasional blip in SQL Azure, but when a Db is totally overloaded, it only does 3 retries over 3 seconds, then throws an exception to the calling code.

> System.Data.SqlClient.SqlException (0x80131904): Resource ID : 1. The request limit for the database is 30 and has been reached.

## Polly Contrib WaitAndRetry using Jittered backoff

[Using jittered with a large number of retries](https://github.com/Polly-Contrib/Polly.Contrib.WaitAndRetry/blob/master/README.md#using-the-new-jitter-formula-with-a-large-number-of-retries) is a simpler way of handling load fault tolerance.

Not a good solution for load, but it is interesting, and for my use case where I never really expect this to happen, I'm happy. I do expect SQL Azure to blip every now and again (I measured it years ago to once every 500k queries), so this is really what the retry logic is for.


[Full Source](https://github.com/osr4rightstools/osr4rights-tools/blob/main/src/OSR4Rights.Web/DapperExtensions.cs)

```cs
// Non Async with jittered backoff and maxDelay ceiling
public static int ExecuteWithRetry(this IDbConnection cnn, string sql, object param = null!)
{
    // https://github.com/Polly-Contrib/Polly.Contrib.WaitAndRetry/blob/master/README.md#using-the-new-jitter-formula-with-a-large-number-of-retries
    // ceiling on the max delay
    var maxDelay = TimeSpan.FromSeconds(45);

    // retry up to 50 times with a max delay of 45 seconds
    var delay = Backoff.DecorrelatedJitterBackoffV2(medianFirstRetryDelay: TimeSpan.FromSeconds(1), retryCount: 50)
        .Select(s => TimeSpan.FromTicks(Math.Min(s.Ticks, maxDelay.Ticks)));

    var retryPolicy = Policy
        .Handle<SqlException>(SqlServerTransientExceptionDetector.ShouldRetryOn) // only transient SQL Exceptions which should be retried
        //.Handle<SqlException>() // handle all SQL Exceptions
        .Or<TimeoutException>() // any sort of timeout exception should retry
        .OrInner<Win32Exception>(SqlServerTransientExceptionDetector.ShouldRetryOn) // 2 more transient exceptions which MSSQL can throw
        .WaitAndRetry(delay,
            (exception, timeSpan, retryCount) =>
            {
                Log.Warning(
                    exception,
                    $"WARNING: Error talking to Db, will retry after {timeSpan}. Retry attempt {retryCount} "
                );
            });

    return retryPolicy.Execute(() => cnn.Execute(sql, param));
}

```

<!-- [![alt text](/assets/2021-08-29/load.jpg "load")](/assets/2021-08-29/load.jpg) -->

So now the loading of the SQL Database is maxxed out.

And in my warning log I'm seeing:

> 2021-08-29 08:54:17.033 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:44.6197713. Retry attempt 7
System.Data.SqlClient.SqlException (0x80131904): Resource ID : 1. The request limit for the database is 30 and has been reached. See 'http://go.microsoft.com/fwlink/?LinkId=267637' for assistance.
   at System.Data.SqlClient.SqlConnection.OnError(SqlException exception, Boolean breakConnection, Action`1 wrapCloseInAction)

This is error Number 10928 in the `SqlServerTransientExceptionDetector`:

```cs
case 10928:
// SQL Error Code: 10060
// A network-related or instance-specific error occurred while establishing a connection to SQL Server.
// The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server
// is configured to allow remote connections. (provider: TCP Provider, error: 0 - A connection attempt failed
// because the connected party did not properly respond after a period of time, or established connection failed
// because connected host has failed to respond.)"}
```

## Async Versions

99% of my Db code is [async all the way up](https://stackoverflow.com/questions/29808915/why-use-async-await-all-the-way-down/29809054#29809054) and [my dive into asyc](/2020/07/23/concurrency-async-await-and-task) , with the 1% being db access from an event

```cs
public static async Task<LoginSmall?> GetLoginByEmail(string connectionString, string email)
{
    using var conn = GetOpenConnection(connectionString);

    var result = await conn.QueryAsyncWithRetry<LoginSmall?>(@"
        select LoginId, Email, PasswordHash, LoginStateId, RoleId
        from login
        where email = @Email
        ", new { email });

    return result.SingleOrDefault();
}

public static async Task<IEnumerable<T>> QueryAsyncWithRetry<T>(this IDbConnection cnn, string sql, object param = null!)
{
    var maxDelay = TimeSpan.FromSeconds(45);

    var delay = Backoff.DecorrelatedJitterBackoffV2(medianFirstRetryDelay: TimeSpan.FromSeconds(1), retryCount: 50)
        .Select(s => TimeSpan.FromTicks(Math.Min(s.Ticks, maxDelay.Ticks)));

    var retryPolicy = Policy
        .Handle<SqlException>(SqlServerTransientExceptionDetector.ShouldRetryOn)
        .Or<TimeoutException>()
        .OrInner<Win32Exception>(SqlServerTransientExceptionDetector.ShouldRetryOn)
        .WaitAndRetryAsync(delay, // notice Async here
            (exception, timeSpan, retryCount) =>
            {
                Log.Warning(
                    exception,
                    $"WARNING: Error talking to Db, will retry after {timeSpan}. Retry attempt {retryCount}"
                );
            });

    return await retryPolicy.ExecuteAsync(async () => await cnn.QueryAsync<T>(sql, param));
}

public static async Task<int> ExecuteAsyncWithRetry(this IDbConnection cnn, string sql, object param = null!)
{
    var maxDelay = TimeSpan.FromSeconds(45);

    var delay = Backoff.DecorrelatedJitterBackoffV2(medianFirstRetryDelay: TimeSpan.FromSeconds(1), retryCount: 50)
        .Select(s => TimeSpan.FromTicks(Math.Min(s.Ticks, maxDelay.Ticks)));

    var retryPolicy = Policy
        .Handle<SqlException>(SqlServerTransientExceptionDetector.ShouldRetryOn)
        .Or<TimeoutException>()
        .OrInner<Win32Exception>(SqlServerTransientExceptionDetector.ShouldRetryOn)
        .WaitAndRetryAsync(delay,
            (exception, timeSpan, retryCount) =>
            {
                Log.Information(
                    exception,
                    $"WARNING: Error talking to Db, will retry after {timeSpan}. Retry attempt {retryCount}"
                );
            });

    return await retryPolicy.ExecuteAsync(async () => await cnn.ExecuteAsync(sql, param));
}
```

## Other Errors


After loading my log table up with many 10's of millions of rows, and around 1.7GB worth of data


```bash
2021-09-06 05:51:26.040 +00:00 [WRN]  ** -2
2021-09-06 05:51:26.043 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:00.9746383. Retry attempt Polly.Context
System.ComponentModel.Win32Exception (258): Unknown error 258
2021-09-06 05:51:57.022 +00:00 [WRN]  ** -2
2021-09-06 05:51:57.023 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:00.6643847. Retry attempt Polly.Context
System.ComponentModel.Win32Exception (258): Unknown error 258
2021-09-06 05:52:27.686 +00:00 [WRN]  ** -2
2021-09-06 05:52:27.688 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:02.0008523. Retry attempt Polly.Context
System.ComponentModel.Win32Exception (258): Unknown error 258
2021-09-06 05:52:59.698 +00:00 [WRN]  ** -2
2021-09-06 05:52:59.703 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:05.6458546. Retry attempt Polly.Context
System.ComponentModel.Win32Exception (258): Unknown error 258
2021-09-06 05:53:35.370 +00:00 [WRN]  ** -2
2021-09-06 05:53:35.370 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:08.6157430. Retry attempt Polly.Context
System.ComponentModel.Win32Exception (258): Unknown error 258
2021-09-06 05:54:13.990 +00:00 [WRN]  ** -2
2021-09-06 05:54:13.992 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:19.8603534. Retry attempt Polly.Context
System.ComponentModel.Win32Exception (258): Unknown error 258
2021-09-06 05:55:03.853 +00:00 [WRN]  ** -2
2021-09-06 05:55:03.853 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:15.7756957. Retry attempt Polly.Context
System.ComponentModel.Win32Exception (258): Unknown error 258
2021-09-06 05:55:49.653 +00:00 [WRN]  ** -2
2021-09-06 05:55:49.653 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:45. Retry attempt Polly.Context
System.ComponentModel.Win32Exception (258): Unknown error 258
2021-09-06 05:57:04.686 +00:00 [WRN]  ** -2
2021-09-06 05:57:04.687 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:15.2176814. Retry attempt Polly.Context
System.ComponentModel.Win32Exception (258): Unknown error 258
2021-09-06 05:57:49.966 +00:00 [WRN]  ** -2
2021-09-06 05:57:49.966 +00:00 [WRN] WARNING: Error talking to Db, will retry after 00:00:45. Retry attempt Polly.Context
System.ComponentModel.Win32Exception (258): Unknown error 258
```

System.ComponentModel.Win32Exception (258): Unknown error 258

[Unknown Error](https://github.com/DapperLib/Dapper/issues/1435)

So probable locking issue on the table, or timeout or something..

My application wasn't happy during this time. This is the limit of my design... shouldn't be loading the table and low DTU db like this. It is always good to push the edges and see what happens.

