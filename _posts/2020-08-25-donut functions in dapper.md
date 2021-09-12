---
layout: post
title: Donut Functions - Hole in the middle - Higher Order Function in Dapper
description: Tame the ubiquitous beast of complexity. Donut function examples showing a timer and a db connection strategy.
#menu: review
categories: Functional C# BrokenLinkChecker MiniProfiler
published: true 
comments: true     
sitemap: true
image: /assets/2020-07-26/night.jpg
---

[![alt text](/assets/2020-07-26/night.jpg "Photo by @micahtindell from Unsplash"){:width="600px"}](https://unsplash.com/@micahtindell)

I'm [writing articles](/#BrokenLinkChecker) on developing a website broken link checker in C#. This is part of that series.

There is a [intro article on Donut Functions](/2020/07/31/donut-functions-in-csharp) using timers, which caused come controvosy (see comments at the bottom).

TL;DR - [I don't Use This Strategy](/2020/10/12/connect-to-database-using-dapper)

## Dapper

For years I've been connecting to MSSQL static Utility helper method. [Here is a recent ETL article](https://davemateer.com/2020/05/07/Extract-Transform-Load-with-Csharp-Beginners-Guide)

I like my functions to be short and it's annoying to write duplicate code in each function eg

```cs
public static void Main()
{
    var actors = GetActors();

    foreach (var actor in actors) Console.WriteLine(actor);
}

public static IEnumerable<Actor> GetActors()
{
    // this line is duplicated in each function
    using var connection = GetOpenConnection();
    return connection.Query<Actor>(
        @"SELECT TOP 10 *
        FROM Actors");
}

public static IDbConnection GetOpenConnection()
{
    var connection = new SqlConnection(ConnectionString);
    // Dont need as dapper will open
    // connection.Open();
    return connection;
}

public class Actor
{
    public int actorid { get; set; }
    public string name { get; set; }
    public string sex { get; set; }
    public override string ToString() => $"{actorid} {name} {sex}";
}
```

And [I really should use async all the way up](/2020/07/23/concurrency-async-await-and-task#db-connections-async-all-the-way-up) be using `async` these days.

## Dapper Async

```cs
public static async Task Main()
{
    var actors = await GetActors();

    foreach (var actor in actors)  Console.WriteLine(actor);
}

public static async Task<IEnumerable<Actor>> GetActors()
{
    using var connection = GetOpenConnection();
    return await connection.QueryAsync<Actor>(
        @"SELECT TOP 10 *
        FROM Actors");
}

// This could be async but would gain no advantage
// https://stackoverflow.com/a/46802157/26086
public static IDbConnection GetOpenConnection()
{
    var connection = new SqlConnection(ConnectionString);
    // don't need to connection.Open as Dapper will manage.
    // https://stackoverflow.com/a/12629170/26086
    return connection;
}
```

## Non Async Donut

Here is a stripped down version. Similar to the [orange book chapter 1](https://livebook.manning.com/book/functional-programming-in-c-sharp/chapter-1/264)

```cs
// Function
public static IEnumerable<Actor> GetActors()
    // calling a static function
    // passing a multi line lambda (essentially another function) for the WithConnection to run
    => WithConnection(conn =>
    {
       var result = conn.Query<Actor>(
           @"SELECT TOP 10 *
           FROM Actors");
       return result;
    });

// Wrapper returns a generic T eg IEnumerable<Actor>
// It takes as arguments: A Func takes an IDbConnection (which is what we make here) and returns a T of the same type
public static T WithConnection<T>(
    Func<IDbConnection, T> func)
{
    using var conn = new SqlConnection(ConnectionString);
    conn.Open();
    return func(conn);
}
```

## Inject the connection string

Let's pass through the connection string:

```cs
// Function 
public static IEnumerable<Actor> GetActors(string connectionString)
    => WithConnection(connectionString, conn =>
    {
       var result = conn.Query<Actor>(
           @"SELECT TOP 10 *
           FROM Actors");
       return result;
    });

// Wrapper returns a generic T eg IEnumerable<Actor>
// It takes as arguments: A Func takes an IDbConnection (which is what we make here) and returns a T of the same type
public static T WithConnection<T>(
    string connectionString,
    Func<IDbConnection, T> func)
{
    using var conn = new SqlConnection(connectionString);

    conn.Open();

    return func(conn);
}

```

Pure functions are nice with nothing hidden ie configuration. Which means that testing should be easier.

## Async Donut

```cs
public static async Task Main()
{
    Console.WriteLine("Experimenting with a HOF for db connection and using statements");
    Console.WriteLine("so don't have code duplication");
    var actors = await GetActorsAsync(ConnectionString);

    foreach (var actor in actors) Console.WriteLine(actor);
}

// Function
public static async Task<IEnumerable<Actor>> GetActorsAsync(string connectionString)
    => await WithConnection(connectionString, async conn =>
    {
       var result = await conn.QueryAsync<Actor>(
           @"SELECT TOP 10 *
           FROM Actors");
       return result;
    });

// Wrapper returns a generic T eg IEnumerable<Actor>
// It takes as arguments: A Func takes an IDbConnection (which is what we make here) and returns a T of the same type
public static async Task<T> WithConnection<T>(
    string connectionString,
    Func<IDbConnection, Task<T>> func)
{
    await using var conn = new SqlConnection(connectionString);

    await conn.OpenAsync();

    return await func(conn);
}

```

[TardisBank](https://github.com/TardisBank/TardisBank/blob/master/server/src/TardisBank.Api/Db.cs) uses a similar pattern.

For me this is a step too far, and I find that it tricky to reason about. Especially if I should be using async on the conn.Open:

[Dapper difference between conn.OpenAsync and conn.Open](https://stackoverflow.com/questions/46801943/difference-between-connection-openasync-and-connection-open-when-using-dapper-qu)

## Exception handling and Fault Tolerance

Please see [Dapper and Polly](/2021/08/29/dapper-and-polly) article from 29th Aug 2021.


In general any sort of SQL exception in my application should bubbble up to the top level exception handler as it will be exceptional, unless it is fault tolerance handling:

As I'm using SQL Azure, and sometimes it just wont be there (it does happen), I like to have automatic retries and use an excellent library called [Polly](https://github.com/App-vNext/Polly)

[https://hyr.mn/dapper-and-polly/](https://hyr.mn/dapper-and-polly) has a good tutorial where he uses an extension method.

```cs
public static async Task<IEnumerable<Actor>> GetTop10ActorsWithRetry(string connectionString)
    => await WithConnection(connectionString, async x =>
    {
        // Using an extension method to call the polly retry code
        var result = await x.QueryAsyncWithRetry<Actor>(
            @"SELECT TOP 10 *
            FROM Actors");
        return result;
    });
```

We can make the code more terse using our wrapper function. This means we don't need the extension methods.

```cs
public static async Task<T> WithConnection<T>(
    string connectionString,
    Func<IDbConnection, Task<T>> func)
{
    await using var conn = new SqlConnection(connectionString);
    //return await func(conn);
    return await DapperExtensions.RetryPolicy.ExecuteAsync(() => func(conn));
}
```

[Polly-Samples](https://github.com/App-vNext/Polly-Samples)

## Miniprofiler

I've used [Miniprofiler](https://miniprofiler.com/dotnet/) extensively to profile apps in production with the biggest usage being to find slow SQL queries. Here is a guide on setting it up and [my MPActors source on Github using ASP.NET Core 3.1](https://github.com/djhmateer/MPActors)

[![alt text](/assets/2020-07-26/miniprofiler.jpg "miniprofiler on the MPActors projects"){:width="500px"}](https://github.com/djhmateer/MPActors)

Click on the sql and you'll see the raw query

[![alt text](/assets/2020-07-26/sql.jpg "Raw SQL"){:width="500px"}](/assets/2020-07-26/sql.jpg)

I always find it tricky to setup Miniprofiler so will leave this [simple working example in the MPActors repo](https://github.com/djhmateer/MPActors) for my future self :-)

`Microsoft.Data.SqlClient` or `System.Data.SqlClient`. We are using the older `System.Data.SqlClient`

## Conclusion

You can use Donut / Wrapper / Higher Order Functions in C# to connect with Dapper, however I'm choosing not to in my current project.. just because it adds a bit too much complexity for hardly any gain (IMO).

I've since written an [article on using Dapper with Postgres](/2020/10/12/connect-to-database-using-dapper) where I use the non-HOF strategy.

Hope this helps :-)
