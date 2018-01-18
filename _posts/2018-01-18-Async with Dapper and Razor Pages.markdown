---
layout: post
title:  "Async with Dapper and Razor Pages"
date:   2018-01-18
menu: review
categories: dapper
published: true 
---

### Summary
Here is an exmple of using 'Async all the way' using Dapper for data access in an ASP.NET Core 2.0 Razor Pages app.

### Why Use Async in a Web App
If you are hitting a single database then this probably wont speed up your app

However it will allow greater scalability of the application as the web thread wont be locked?**need more info**

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








