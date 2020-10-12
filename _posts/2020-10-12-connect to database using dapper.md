---
layout: post
title: Connect to database using Dapper 
description: Here are a few ways of connecting to a database through Dapper! If your preferred ~~religion~~ way isn't here, don't worry, there are many ways of doing it.. probably all good, and if it works for you, then thats what matters.
#menu: review
categories: Dapper BrokenLinkChecker Postgres MSSQL
published: true 
comments: true     
sitemap: true
image: /assets/2020-10-12/db.jpg
---

<!-- ![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"} -->
[![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin)

Here are a 3 ways of connecting to a database through [Dapper](https://github.com/StackExchange/Dapper) with ASP.NET.

If your preferred ~~religion~~ strategy isn't here, don't worry, there are many ways of doing it.. probably all good, and if it works for you, then that's what matters.

> You're probably doing it right. Don't panic!

For MSSQL here have been my [Conventions](/2016/10/19/ASP.NET-MVC-Sort-Filter,-Page-using-SQL)

I've recently started using [Postgres](https://www.postgresql.org/) and am using the [Dapper](https://github.com/StackExchange/Dapper) again for a lightweight mapper in C#. So far it has been super easy switching between MSSQL and Postgres. On the C# side it's just a connection string change and using the `Npgsql` NuGet package instead of `System.Data.SqlClient.SqlConnection`

## 1. Simplest

Let's start with the simpest possible thing to get a db call working.

```cs
using (var connection = new SqlConnection("
Server=(localdb)\\mssqllocaldb;Database=Test;Trusted_Connection=True;MultipleActiveResultSets=true"))
{
    connection.Open();

    var sql = "SELECT * FROM Thing";
    var result = connection.Query<string>(sql).FirstOrDefault();
    return result;
}
```

which coulud be refined to

```cs
var mssqlConnectionString = "Server=(localdb)\\mssqllocaldb;Database=Test;Trusted_Connection=True;MultipleActiveResultSets=true";
using var connection = new SqlConnection(mssqlConnectionString);
// Dapper will open for us
//connection.Open();
return connection.Query<string>("SELECT * FROM Thing").FirstOrDefault();

```

Okay it works, however....

## 2. Async/Await

[I always use async await for Db connections now](/2020/07/23/concurrency-async-await-and-task#db-connections-async-all-the-way-up) so here is a simple awaitable strategy for ASP.NET Core 3.

```cs
public IList<Thing>? Things { get; set; }

private readonly IConfiguration c;
public DBCassiniModel(IConfiguration configuration) => this.c = c;

public async Task OnGetAsync()
{
    var connectionString = c.GetConnectionString("Default");

    var things = await Db.GetThings(connectionString);
    Things = things.ToList();
}

// then in /Services/Db.cs
public static class Db
{
    public static async Task<IEnumerable<Thing>> GetThings(string connectionString)
    {
        using var db = new NpgsqlConnection(connectionString);

        return await db.QueryAsync<Thing>(
           @"SELECT id as Id, date as Date, team as Team, target as Target,
             title as Title, description as Description
             FROM master_plan LIMIT 10");
    }
}

```

I don't think having an `await using var db = ...` which ReSharper recommends is necessary here as the overhead of creating a state machine for such a lightweight call to create a connection is larger.

## 3. Functional WithConnection

[Tardis Bank](https://github.com/TardisBank/TardisBank/blob/master/server/src/TardisBank.Api/Db.cs) uses a functional WithConnnection wrapper:

```cs
 public static Task<IEnumerable<Thing>> GetThingsFunctional(string connectionString)
     => WithConnection(connectionString, async conn =>
     {
         var result = await conn.QueryAsync<Thing>(
             "SELECT id as Id, date as Date, team as Team, target as Target, title as Title, description as Description " +
             "FROM master_plan LIMIT 10");

         return result;
     });

 private static async Task<T> WithConnection<T>(
     string connectionString,
     Func<IDbConnection, Task<T>> connectionFunction)
 {
     using (var conn = new NpgsqlConnection(connectionString))
     {
         conn.Open();

         return await connectionFunction(conn);
     }
 }
```

Which is nice as we can use an [Expression Body Method](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/expression-bodied-members)

However it is somewhat non-idiomatic and the call stack can become confusing.

[A more in depth look at Donut Functions in Dapper, Polly and Miniprofiler discussed here](/2020/07/25/donut-functions-in-dapper)

## Do I really need the using

What if we let the framework clean up after itself and save us some lines of code?

It's an interesting though experiment

```cs
public static async Task<IEnumerable<Thing>> GetThings(string connectionString)
{
    using var db = GetOpenConnection(connectionString);
    return await db.QueryAsync<Thing>("SELECT * FROM Thing");
}

public static async Task<IEnumerable<Thing>> GetThingsNoUsing(string connectionString) =>
    await GetOpenConnection(connectionString)
        .QueryAsync<Thing>("SELECT * FROM Thing");

public static IDbConnection GetOpenConnection(string connectionString) =>
    new NpgsqlConnection(connectionString);

```

So it will probably work for a reasonable traffic site, however [yes you probably should use usings](https://stackoverflow.com/questions/28976924/should-dapper-use-a-using-statement) so look at the final code at the bottom and I've got a `using` back in.

## ASP.NET Core Configuration - Connection Strings

I would like separate db connection strings for:

- Dev
- Running tests locally and on build server
- Prod

The easiest way is to use `Environment Variables` ie appsettings.json. [MS Doc - ASP.NET Core Configuration](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-3.1)

```yaml
# appsettings.json
{
  "AllowedHosts": "*"
}

# appsettings.Development.json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Username=alice;Password=letmein2;Database=postgrescookiedave"
  }
}

# appsettings.Production.json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Username=bob;Password=letmein3;Database=postgrescookiedave",
  }
}

```

## Final Result

The [Full Source](https://github.com/djhmateer/postgres-cookie-dave) code would look like:

```cs
public class DBCassiniModel : PageModel
{
    public IList<Thing>? Things { get; set; }

    IConfiguration c;
    public DBCassiniModel(IConfiguration c) => this.c = c;

    public async Task OnGetAsync()
    {
        var connectionString = c.GetConnectionString("Default");

        var things = await Db.GetThings(connectionString);
        Things = things.ToList();
    }
}

public static class Db
{
    public static async Task<IEnumerable<Thing>> GetThings(string connectionString)
    {
        using var conn = GetOpenConnection(connectionString);

        var result = await conn.QueryAsync<Thing>(
            @"SELECT id as Id, date as Date, team as Team, target as Target,
             title as Title, description as Description
             FROM master_plan LIMIT 10");

        return result;
    }

    public static IDbConnection GetOpenConnection(string connectionString) =>
        new NpgsqlConnection(connectionString);
}
```

I would like this code to be cleaner, but okay for now.

The razor view looks like this:

```html
@page
@model DBCassiniModel
@{
    ViewData["Title"] = "DBCassini";
}
<h1>@ViewData["Title"]</h1>

<table class="table">
    <thead>
        <tr>
            <th> @Html.DisplayNameFor(model => model.Things[0].Id) </th>
            <th> @Html.DisplayNameFor(model => model.Things[0].Date) </th>
            <th> @Html.DisplayNameFor(model => model.Things[0].Team) </th>
            <th> @Html.DisplayNameFor(model => model.Things[0].Target) </th>
            <th> @Html.DisplayNameFor(model => model.Things[0].Title) </th>
            <th> @Html.DisplayNameFor(model => model.Things[0].Description) </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model.Things)
        {
            <tr>
                <td> @Html.DisplayFor(modelItem => item.Id) </td>
                <td> @Html.DisplayFor(modelItem => item.Date) </td>
                <td> @Html.DisplayFor(modelItem => item.Team) </td>
                <td> @Html.DisplayFor(modelItem => item.Target) </td>
                <td> @Html.DisplayFor(modelItem => item.Title) </td>
                <td> @Html.DisplayFor(modelItem => item.Description) </td>
                <td>
                    <a asp-page="./Edit" asp-route-id="@item.Id">Edit</a> |
                    <a asp-page="./Details" asp-route-id="@item.Id">Details</a> |
                    <a asp-page="./Delete" asp-route-id="@item.Id">Delete</a>
                </td>
            </tr>
        }
    </tbody>
</table>

```

[Source is here - PostgresCookieDave](https://github.com/djhmateer/postgres-cookie-dave) and thanks to Rob Conery [PostgreSQL for those Who Can't Even](https://rob.conery.io/2020/01/24/postgresql-for-those-who-cant-even-part-1/)

This is my thinking for my particular use case.

Results May Vary

Works on my Machine

etc.. etc..

:-)