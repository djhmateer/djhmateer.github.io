---
layout: post
title: .NET Core Workers as Services 
description: 
menu: review
categories: WorkerService 
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/3.jpg
---
This is a new type of application template in .NET Core 3.0. It is a starting point for writing long running services.

I am interested as it gives

- DI (which makes using IHttpClientFactory easier)
- Logging

It can give you a linux systemd process or windows service.

```cs
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((hostContext, services) =>
            {
                services.AddHostedService<Worker>();
                services.AddHttpClient();
            });
}
```

and then the worker:

```cs
public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly IHttpClientFactory _factory;

    public Worker(ILogger<Worker> logger, IHttpClientFactory factory)
    {
        _logger = logger;
        _factory = factory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var client = _factory.CreateClient();

        while (!stoppingToken.IsCancellationRequested)
        {
            //_logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            var httpResponseMessage = await client.GetAsync("https://davemateer.com", stoppingToken);

            _logger.LogInformation($"response {(int) httpResponseMessage.StatusCode}");
            await Task.Delay(1000, stoppingToken);
        }
    }
}
```

![alt text](/assets/2019-11-13/20.jpg "Fast response times")

I am getting some very fast response times ie 10-20ms to the homepage. Cached?

![alt text](/assets/2019-11-13/21.jpg "Fast response times")

```cs
protected override async Task ExecuteAsync(CancellationToken stoppingToken)
{
    //var client = _factory.CreateClient();
    while (!stoppingToken.IsCancellationRequested)
    {
        using (var client = new HttpClient())
        {
            var sw = new Stopwatch();
            //_logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            sw.Start();
            var httpResponseMessage = await client.GetAsync("https://davemateer.com", stoppingToken);

            _logger.LogInformation($"response {(int)httpResponseMessage.StatusCode} in {sw.ElapsedMilliseconds}ms");
            sw.Stop();
            await Task.Delay(1000, stoppingToken);
        }
    }
}
```

Using HttpClient it is slower

```bash
netstat -n | grep "TIME_WAIT"
```

## Performance

For a rough check on a live site:

Requests per minute against https://davemateer.com with HttpClient: 1700
Requests per minute against https://davemateer.com with IHttpClientFactory: 3600
