---
layout: post
title: Donut Functions - Hole in the middle - Higher Order Function in Dapper
description: Tame the ubiquitous beast of complexity. Donut function examples showing a timer and a db connection strategy.
menu: review
categories: Functional C# BrokenLinkChecker
published: false 
comments: false     
sitemap: false
image: /assets/2020-07-22/donut.jpg
---

[![alt text](/assets/2020-07-22/donut.jpg "Photo by @acreativegangster from Unsplash"){:width="500px"}](https://unsplash.com/@acreativegangster)

I'm [writing articles](/#BrokenLinkChecker) on developing a website broken link checker in C#. This is part of that series.

There is a [intro article on Donut functions]() using timers.

## Dapper

For years I've been connecting to MSSQL static Utility helper method. [Here is a recent ETL article](https://davemateer.com/2020/05/07/Extract-Transform-Load-with-Csharp-Beginners-Guide)

```cs
using (var connection = Util.GetOpenConnection())
{
    IEnumerable<Actor> actors = connection.Query<Actor>("SELECT TOP 10 * FROM actors");
}

public class Util
{
    public static IDbConnection GetOpenConnection()
    {
        var connection = new SqlConnection("Server=(localdb)\\mssqllocaldb;Database=IMDBChallenge;Trusted_Connection=True;MultipleActiveResultSets=true");
        connection.Open();
        return connection;
    }
}

```

## Miniprofiler

I've used [Miniprofiler]() extensively to profile apps in production. To set it up








https://livebook.manning.com/book/functional-programming-in-c-sharp/chapter-1/264

```cs

```

## TardisBank

Here is an example of using a Donut function to connect to the database.

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







