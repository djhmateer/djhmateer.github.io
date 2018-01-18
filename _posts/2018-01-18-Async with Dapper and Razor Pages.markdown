---
layout: post
title:  "Async with Dapper and Razor Pages"
date:   2018-01-18
menu: review
categories: dapper
published: true 
---
![Menu](/assets/2018-01-08/menu.png)

### Summary
Here is an exmple of using 'Async all the way' using Dapper for data access in an ASP.NET Core 2.0 Razor Pages app.

### Why Use Async in a Web App
Good quesion!
Mainly about scalability of the application

### Simple Example using Dapper 
{% highlight csharp %}
public static IDbConnection GetOpenConnection()
{
    var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ThinkBooksConnectionString"].ConnectionString);
    connection.Open();
    MiniProfiler.Settings.SqlFormatter = new StackExchange.Profiling.SqlFormatters.SqlServerFormatter();
    return new ProfiledDbConnection(connection, MiniProfiler.Current);
}
{% endhighlight %}








