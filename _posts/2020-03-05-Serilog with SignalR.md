---
layout: post
title: Serilog with SignalR 
description: Setting up the excellent Serilog to work with SignalR on ASP.NET Core 3.1
menu: review
categories: Serilog SignalR
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

This article is part of a series on developing an ASP.NET Core 3.1 SaaS product

- Entrepreneurial
- [From Developer to Business Owner - SaaS](/2019/06/20/From-Developer-to-Business-Owner-SaaS) **not published**
- [How to start freelancing and contracting](/2019/07/18/How-to-start-Freelancing-and-Contracting) **not published**
- [Starting a SaaS company book reviews](/2019/07/18/Starting-a-SaaS-company-book-reviews) **np**
- [Startup company podcasts and people](/2019/07/26/Startup-company-podcasts-and-people) **np**
- [Startup nomenclature Accounting](/2019/07/26/Startup-nomenclature-Accounting) **np**

- [Make - bootstrappers Handbook](/2019/10/15/Make-Bootstrappers-Handbook) **not published**

- [Userful website tools for starting own SaaS](/2019/07/19/Website-Tools) **np**
- [SEO](/2019/06/20/SEO-Search-Engine-Optimisation) **np**
- [Blog Hosting 2019](/2019/06/20/Blog-Hosting-2019) **np**

- [HTML Website or Static Site generated by Jekyll](/2019/09/10/Creating-a-theme-for-Jekyll-Product-Company-site) **not published**

- [Web hosting Options in .NET Core 3 for my SaaS](/2019/11/07/VM-Containers-PaaS-or-FaaS-for-my-SaaS-product) **not published**
- [Infrastructure as Code for an ASP.NET Core 3.1 Web App on Ubuntu](/2020/01/09/Publishing-ASP-NET-Core-3-App-to-Ubuntu)
- [SignalR](/2019/10/23/SignalR) **not published**

- [Hosting Environment configuration and Running Kestrel on the edge - don't do it](/2019/11/13/ASP-NET-Core-3-Hosting-Environment) **not published**
- [Fixing line endings in Git for Windows and Linux](/2020/01/09/Line-endings-ignore-in-Git)
- Logging with Serilog and SignalR (this article) **not published yet**
- [Identity - Authentication and Authorisation in ASP.NET Core 3.1](/2020/03/05/Authentication-and-Authorisation-in-ASP.NET-Core-3.1) **not published**
- [External Authentication in ASP.NET 3.1 ie Google Social Login](/2020/02/03/External-Authentication-in-ASP.NET-Core-3.1) **not published**

- [http client](/2019/11/20/HttpClient) 
- [IHttpClientFactory - don't need to use now](/2019/11/16/IHttpClientFactory) **not published**
- [IAsyncEnumerable try catch](/2019/11/24/IAsyncEnumerable-try-catch) **not pusblished**
- [Task](/2019/11/30/Task) **not published - merge with below**
- [Async Await](/2020/01/17/Async-Await) **not published**

- [Donut Functions](/2019/11/22/Donut-Functions-in-C) **not pusblished**
- [Tuple deconstruction vs Option/Maybe/Either](/2019/11/15/Tuple-vs-Option-or-Maybe) ** not published**
- [Http user-agent](/2019/11/28/HttpClient-User-Agent) **not published**

- [Coding Style](/2020/02/28/Coding-Style) **not published**

## How to Setup Serilog

Add NuGet package `Serilog.AspNetCore`

```cs
public class Program
{
public static void Main(string[] args)
{
   Log.Logger = new LoggerConfiguration()
        //.MinimumLevel.Information() // this is the default
        // Suppress framework log noise eg routing and handling
        // so we'll see warnings and errors from the framework
        .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
        .Enrich.FromLogContext()
        .WriteTo.Console()
        .WriteTo.File(@"logs/warning.txt", restrictedToMinimumLevel: LogEventLevel.Warning, rollingInterval: RollingInterval.Day)
         // careful - lots of data here
        .WriteTo.File(@"logs/info.txt", restrictedToMinimumLevel: LogEventLevel.Information, rollingInterval: RollingInterval.Day)
        .CreateLogger();
    try
    {
        Log.Information("");
        Log.Information("Starting up BLC.Website (Program.cs)");
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
            //logging.AddFilter("Microsoft.AspNetCore.SignalR", LogLevel.Information);
            logging.AddFilter("Microsoft.AspNetCore.SignalR", LogLevel.Warning);
            // turn on for connection debugging
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

If not MinimumLevel is specified, then Information level and higher will be processed.

## Development workflow

It is nice to see colour in the output, but I rarely (at the moment) use the command line to run apps and still use VisualStudio.

![alt text](/assets/2019-11-13/1.jpg "Console logging"){:width="700px"}
<!-- ![alt text](/assets/2019-11-13/1.jpg "Console logging") -->
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

`Startup.cs`

```cs

app.UseHttpsRedirection();
app.UseStaticFiles();

// don't want request logging for static files so put it here in the pipeline
app.UseSerilogRequestLogging();
```

![alt text](/assets/2019-11-13/2.jpg "A nicer log"){:width="700px"}

## Conclusion and Further Reading

I used these articles to help me setup Serilog in my SignalR based application.

[Serilog in ASP.NET Core 3](https://nblumhardt.com/2019/10/serilog-in-aspnetcore-3/)

[Logging and Diagnostics in SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/diagnostics?view=aspnetcore-3.0)

[Top level global error handler with IAsyncEnumerable](/IAsyncEnumerable-try-catch)


[Seq](https://datalust.co/) looks like a good way of analysing the logfiles in production coupled with Serilog. I'll get to that :-)