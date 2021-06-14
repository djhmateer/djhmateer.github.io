---
layout: post
title: 21 Hosted Services aka Background Services which perform Background Tasks
description: 
menu: review
categories: HostedService 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---


<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

Many web apps need services which performs background task

- Run a task every day, at a certain time (recurring)
- Alert checking every hour (recurring)
- DB Maintenance every day (recurring)
- Kick something off when a request is received (make a pdf, scan webpages, call python via REST?..) - (initiate work)

[https://app.pluralsight.com/library/courses/building-aspnet-core-hosted-services-net-core-worker-services/table-of-contents](https://app.pluralsight.com/library/courses/building-aspnet-core-hosted-services-net-core-worker-services/table-of-contents) I've taken a lot of information from this great video series by Steve Gordon.

[https://github.com/djhmateer/BackgroundServiceTest](https://github.com/djhmateer/BackgroundServiceTest) is my test source code.

## Type of Background Jobs and logic

[https://www.hangfire.io/overview.html](https://www.hangfire.io/overview.html)

- Fire and forget (jobs executed only once and almost immediately)
- Recurring (fired many times on a schedule)

They use [cron scheduling](https://crontab.guru/#0_22_*_*_1-5) which is super powerful.

### Automatic retries:

However I'm interested in what happens if the recurring time is missed eg if the task is due to run on a Wednesday at 13:00, and for some reason the webserver is down, what should it do?

### Manually kick off a job
Also how to kick off a job manually? This is an initiate task.
  can manually do it by setting lastRunEnd to a long time in past

### Exceptions:
eg What if there is an SMTP exception?


## 1. ASP.NET Core app with Background Service / Hosted Services

BackgroundServices sits outside of the request pipeline but is in the same process.

Each service is started as an async background Task.

This is a great solution for simple tasks, as the deployment is the same ie just a web project.

eg
- polling for data from an external service
- responding to external messages 
- performing data-intensive work


[http://disq.us/p/2ewv38l](http://disq.us/p/2ewv38l) Steve Gordon suggesting start with this, then go to a Worker Service for scale

Background Service or IHostedService

A background service in the same process can be a good fit. Works best if not too intensive. An easier starting point as don't need to deploy something else. It just runs where the ASP.NET Core app runs. eg when you accept a request, but then process something in the background. Can do that quite simply with an in process queue or channel.


Hosted services have been available since ASP.NET Core 2.1 and support doing background tasks outside of the normal request flow.

Hosted service are based on the abstract concept of a Background service which are often synonymous.

### Example

Add BackgroundServices\WeatherCacheService.cs

Derive from an abstract class called BackgroundService which required a using in `Microsoft.Extensions.Hosting`

```cs
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace TennisBookings.Web.BackgroundServices
{
    public class WeatherCacheService : BackgroundService
    {
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            throw new NotImplementedException();
        }
    }
}
```

BackgroundService defines 1 abstract method called ExecuteAsync which we need to provide an implementation of

Background service supports DI

Because we're using async, it's not clean to use a timer, so lets use a loop

Application is cancelled cleanly when the app is shutting down.

```cs
namespace TennisBookings.Web.BackgroundServices
{
    public class WeatherCacheService : BackgroundService
    {
        private readonly IWeatherApiClient _weatherApiClient;
        private readonly IDistributedCache<CurrentWeatherResult> _cache;
        private readonly ILogger<WeatherCacheService> _logger;

        private readonly int _minutesToCache;
        private readonly int _refreshIntervalInSeconds;

        public WeatherCacheService(
            IWeatherApiClient weatherApiClient,
            IDistributedCache<CurrentWeatherResult> cache,
            IOptionsMonitor<ExternalServicesConfig> options,
            ILogger<WeatherCacheService> logger)
        {
            _weatherApiClient = weatherApiClient;
            _cache = cache;
            _logger = logger;
            _minutesToCache = options.Get(ExternalServicesConfig.WeatherApi).MinsToCache;
            _refreshIntervalInSeconds = _minutesToCache > 1 ? (_minutesToCache - 1) * 60 : 30;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var forecast = await _weatherApiClient.GetWeatherForecastAsync(stoppingToken);

                if (forecast is object)
                {
                    var currentWeather = new CurrentWeatherResult { Description = forecast.Weather.Description };

                    var cacheKey = $"current_weather_{DateTime.UtcNow:yyyy_MM_dd}";

                    _logger.LogInformation("Updating weather in cache.");

                    await _cache.SetAsync(cacheKey, currentWeather, _minutesToCache);
                }

                await Task.Delay(TimeSpan.FromSeconds(_refreshIntervalInSeconds), stoppingToken);
            }
        }
    }
}

```
All cancellation tokens are passed down so any tasks can be cancelled.

Exception handling not put in yet (Advanced Hosted Concepts module)

### Registration of the Service

```cs
// startup.cs in ConfigureServices

services.AddHostedService<WeatherCacheService>();

```

How to get this BackgroundService to do something hourly or daily once?

There only ever 1 instance of this BackgroundService running. But it may stop due to the app pool recycling (after 20minutes usually on IIS)

## Example 2 - no DI. Functional approach with Exception Handling

```cs
public class TestService : BackgroundService
   {
       protected override async Task ExecuteAsync(CancellationToken stoppingToken)
       {
           await Task.Delay(2000, stoppingToken);
           Log.Information("Started Background Service");
           var connectionString = AppConfiguration.LoadFromEnvironment().ConnectionString;

           try
           {
               while (!stoppingToken.IsCancellationRequested)
               {
                   // Do we need to run BudgetAlert
                   // lets assume it needs to run once every day
                   //  and we start trying at a certain time.

                   // if webserver is down, it will pick up where left off, and try and do only 1 run


                   // testing task1
                   // want it to run once every 5 minutes starting immediately
                   // starting at 1330
                   var (lastRunStart, lastRunEnd) = await Db.GetBudgetAlert(connectionString);

                   bool shouldRun = false;
                   var frequencyInSeconds = 10;

                   // happy path
                   if (DateTime.Now > lastRunEnd.AddSeconds(frequencyInSeconds)) shouldRun = true;

                   if (shouldRun)
                   {
                       Log.Information("Start task 1");
                       await Db.UpdateBudgetAlertLastRunStart(connectionString);
                       //await Task.Delay(10000, stoppingToken); // doing work, maybe sending emails
                       await Foo.Bar(stoppingToken);

                       Log.Information("End task 1");
                       await Db.UpdateBudgetAlertLastRunEnd(connectionString);
                   }

                   // testing task2
                   // **HERE** maybe we want this to start at 14:45:00 and run every minute at 00 seconds
                   var (_, lastRunEndB) = await Db.GetBudgetAlertB(connectionString);

                   bool shouldRunB = false;
                   var frequencyInSecondsB = 10;

                   if (DateTime.Now > lastRunEndB.AddSeconds(frequencyInSecondsB)) shouldRunB = true;

                   if (shouldRunB)
                   {
                       Log.Information("Start task 2");
                       await Db.UpdateBudgetAlertLastRunStartB(connectionString);
                       await Foo.BarB(stoppingToken);

                       Log.Information("End task 2");
                       await Db.UpdateBudgetAlertLastRunEndB(connectionString);
                   }

                   Log.Information("ping");
                   await Task.Delay(5000, stoppingToken);
               }
           }
           catch (OperationCanceledException)
           {
               Log.Warning("Operation cancelled - can happen when app is shutting down gracefully");
           }
           catch (Exception ex)
           {
               Log.Error(ex, "Exception");
           }
           Log.Warning("Background Service stopped");
       }
   }

   public static class Foo
   {
       public static async Task Bar(CancellationToken stoppingToken)
       {
           try
           {
               await Task.Delay(5000, stoppingToken);
               throw new ApplicationException("blow up - our system should be able to handle this and retry");
               //throw new InvalidOperationException("Operation is not valid due to Bar being in a bad state");
           }
           catch (Exception ex)
           {
               Log.Warning(ex, "Bar task threw an exception, but we want it to retry the next time it is due to run");
           }
       }

       public static async Task BarB(CancellationToken stoppingToken)
       {
           try
           {
               await Task.Delay(5000, stoppingToken);
               throw new ApplicationException("blow upB - our system should be able to handle this and retry");
               //throw new InvalidOperationException("Operation is not valid due to Bar being in a bad state");
           }
           catch (Exception ex)
           {
               Log.Warning(ex, "BarB task threw an exception, but we want it to retry the next time it is due to run");
           }
       }
   }

```
[https://github.com/djhmateer/BackgroundServiceTest](https://github.com/djhmateer/BackgroundServiceTest) Source code is here on GitHub showing a very simple example of how I like to do configuration, Db access, no DI, Nullable Ref Types.


## Coordinating between requests and hosted services (Channels)

upload csv - Coordinating between Requests and hosted services

file saved as temp file, then response to user
the hosted service will be notified when new files have been uploaded

`System.Threading.Channels` - May 2018 around .NET Core 2.1
Thread safe data transfer
ie a thread safe queuing concept

- A producer can write to a `Channel<T>.Writer`
- A consumer can read from a `Channel<T>.Reader`

Many concurrent requests can write to the channel. We are having a single consumer (Hosted Service)

// so the queue doesn't fill up
MaxMessagesInChannel = 100

Accepting strings in the channel which will be the temp filename

BoundedChannel just lets us limit the channel so it is possible that it is full. So this allows us to apply backpressure.


### Writing to the channel
asdf

### Reading from the channel

async streams (C#8) ie await foreach

ie await asynchronously the availability of new data from the channel - whoo no polling!

IREsultProcessor is registered as Scoped in DI as it depends on other services (see DI in ASP.NET Core Steves other course)


## Advanced Hosted Service concepts

## Exception handling

What if an unhandled exception in the BackgroudService?
 need to shut it down gracefully
 and tell the Channel


## 2. Worker Service

A new application template in .NET Core 3.0

Service Workers in 3.0 and IHostedService in 2.x are the same thin.g

The BackgroundService you get in the worker template is an IHostedService.


[https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/hosted-services?view=aspnetcore-5.0&tabs=visual-studio](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/hosted-services?view=aspnetcore-5.0&tabs=visual-studio)

- Background task that runs on a timer
- Queued background tasks that run sequentially

## Timer

Here is a task that runs every x minutes:

And can reference methods of the web app

## How to run in production

Deploy it separately as a Windows service?

[https://devblogs.microsoft.com/aspnet/net-core-workers-as-windows-services/](https://devblogs.microsoft.com/aspnet/net-core-workers-as-windows-services/) He uses sc utility to install it as a windows service.

Steve talks about this in his video

Can run on Linux daemon - systemd. Including the .service file.
Very nice way of writing a linux demoon in .NET to do background processing.. don't need a console app. 

### Push work to background on web app

Background Service

## Previous

Hangfire

[https://github.com/jamesmh/coravel](https://github.com/jamesmh/coravel)
