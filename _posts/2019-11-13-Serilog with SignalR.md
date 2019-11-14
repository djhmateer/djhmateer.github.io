---
layout: post
title: Serilog with SignalR 
description: 
menu: review
categories: Serilog SignalR
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

I used these articles to help me setup Serilog in my application as I wanted

- Console logging
- and File logging (rolling)
- On dev and live (Ubuntu Linux)

[Serilog in ASP.NET Core 3](https://nblumhardt.com/2019/10/serilog-in-aspnetcore-3/)

[Logging and Diagnostics in SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/diagnostics?view=aspnetcore-3.0)

## How to Setup

Add NuGet package Serilog.AspNetCore

```cs
public class Program
{
public static void Main(string[] args)
{
    Log.Logger = new LoggerConfiguration()
        .MinimumLevel.Information() // this is the default
        .Enrich.FromLogContext()
        .WriteTo.Console()
        .WriteTo.File("log.txt", rollingInterval: RollingInterval.Day)
        .CreateLogger();

    try
    {
        Log.Information("Starting up");
        CreateHostBuilder(args).Build().Run();
    }
    catch (Exception ex)
    {
        Log.Fatal(ex, "Application start-up failed");
    }
    finally
    {
        Log.CloseAndFlush();
    }
}

public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .UseSerilog()
        // configuring logging for SignalR
        .ConfigureLogging(logging =>
        {
            logging.AddFilter("Microsoft.AspNetCore.SignalR", LogLevel.Information);
            //logging.AddFilter("Microsoft.AspNetCore.Http.Connections", LogLevel.Debug);
        })
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
}

```

## Log Levels

Here is my interpretation of Log Levels:

- Verbose
- Debug - internal system events
- Information - describe what is happening in the system
- Warning - eg an HttpRequestException in GetBaseUrl - normal but good to know about
- Error - When a path in the app is taken and it shouldn't be. Recoverable.
- Fatal - Top level critical. App stops. Not recoverable. Maybe a user gets into a state and can't use the app.

If not MinimumLevel is specificed, then Information level and higher will be processed.

## Development workflow

It is nice to see colour in the output:

<!-- ![alt text](/assets/2019-11-13/1.jpg "Console logging"){:width="600px"} -->
![alt text](/assets/2019-11-13/1.jpg "Console logging")
However this is quite noisy.

## Setup dev HTTPS cert

[Hanselman post on developing locally with ASP.NET Core under HTTPS](https://www.hanselman.com/blog/DevelopingLocallyWithASPNETCoreUnderHTTPSSSLAndSelfSignedCerts.aspx) 

```bash
# install local https cert
dotnet dev-certs https --trust

dotnet run
```

## Turn off existing logging

There are a few spots in the application that traces of the default logger might remain. In appsettings.Development.json and appsettings.json, get rid of the logging section so all that is left is:

```json
{
  "AllowedHosts": "*"
}
```

## Writing to the log

Here are 2 methods to writing to the log. The [preferred way is Log.Information](https://nblumhardt.com/2019/10/serilog-in-aspnetcore-3/#writing-your-own-log-events)

```cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
{
    logger.LogInformation("******Inside Configure2");
    Log.Information("***Inside configure 3");

    if (env.IsDevelopment())
    {
        logger.LogInformation("****In Development Environment");
        app.UseDeveloperExceptionPage();
    }
}
```

## Writing to the log from a SignalR Hub

```cs
public class CrawlHub : Hub
{
    public async IAsyncEnumerable<Thing> Crawl(string url, [EnumeratorCancellation]CancellationToken cancellationToken)
    {
        var count = 10;
        // patch in the crawler for the url passed in
        for (var i = 0; i < count; i++)
        {
            Log.Information($"inside crawl {url}");
            cancellationToken.ThrowIfCancellationRequested();
        }
        // ....
    }
}

```

## Tuning the logs

Program.cs

```cs
Log.Logger = new LoggerConfiguration()
    //.MinimumLevel.Information() // this is the default
    // Suppress framework log noise eg routing and handling
    // so we'll see warnings and errors from the framework
    .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
```

Startup.cs

```cs

app.UseHttpsRedirection();
app.UseStaticFiles();

// don't want request logging for static files so put it here in the pipeline
app.UseSerilogRequestLogging();
```

<!-- ![alt text](/assets/2019-11-13/2.jpg "Console logging"){:width="600px"} -->
![alt text](/assets/2019-11-13/2.jpg "A nicer log")

## DevOps

[Seq](https://datalust.co/) looks like a good way of analysing the logfiles in production coupled with Serilog. I'll get to that :-)
