---
layout: post
title: 11 Serilog Logging in razor pages on asp net core 
description: 
menu: review
categories: Serilog 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

[https://serilog.net/](https://serilog.net/) is my preferred logger.

I use it in development as a console output using Kestrel:


<!-- [![dev](/assets/2021-03-10/dev.jpg "dev"){:width="500px"}](/assets/2021-03-10/dev.jpg) -->
[![dev](/assets/2021-03-10/dev.jpg "dev")](/assets/2021-03-10/dev.jpg)


And is production to write to files.

[Source Code - passowrd-postgres](https://github.com/djhmateer/password-postgres) is what I'm using here.

## Setup

```c#
// Program.cs
public static void Main(string[] args)
{
    Log.Logger = new LoggerConfiguration()
                // `LogEventLevel` requires `using Serilog.Events;`
                // gets rid of lots of noise
                //.MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
                // if only do warning, then will get duplicate error messages when an exception is thrown, then again when re-executed
                // we do get 2 error message per single error, but only 1 stack trace
                .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Fatal)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                // use c:/logs/passwordpostgres/ sometimes if can't control permissions on prod 
                .WriteTo.File(@"logs/warning.txt", restrictedToMinimumLevel: LogEventLevel.Warning, rollingInterval: RollingInterval.Day)
                .WriteTo.File(@"logs/info.txt", restrictedToMinimumLevel: LogEventLevel.Information, rollingInterval: RollingInterval.Day)
                //.WriteTo.Seq(Environment.GetEnvironmentVariable("SEQ_URL") ?? "http://localhost:5341")
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
        .UseSerilog() // <- Add this line
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
```

then lets wire in serilog middleware into the aspnet core pipeline to provide useful information on each page visited:

```cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();

    }
    else
    {
        app.UseExceptionHandler("/CustomError");
    }

    app.UseStaticFiles(); 

    // https://khalidabuhakmeh.com/handle-http-status-codes-with-razor-pages
    // https://andrewlock.net/retrieving-the-path-that-generated-an-error-with-the-statuscodepages-middleware/
    app.UseStatusCodePagesWithReExecute("/CustomError", "?statusCode={0}");

    app.UseRouting();

    // don't want request logging for static files so put this serilog middleware here in the pipeline
    app.UseSerilogRequestLogging(); // <- add this

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Strict });

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapRazorPages();
    });
}
```

Then when we want logging:

```cs
public async Task OnGetAsync()
{
    Log.Information("In dbtest");
    var connectionString = AppConfiguration.LoadFromEnvironment().ConnectionString;
    ConnectionString = connectionString;

    var employees = await Db.GetEmployees(connectionString);
    Employees = employees.ToList();
}
```

## 500 error logs twice

For exceptions and other status code we display the CustomError page and then reexecute the page so that the URL reamains as expected eg /pagethatshouldwork and not /customError

[![error](/assets/2021-03-10/errors.jpg "errors")](/assets/2021-03-10/errors.jpg)

This means I'm currently getting 2 serilog entries.

```cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();

    }
    else
    {
        app.UseExceptionHandler("/CustomError");
    }

    //app.UseMiniProfiler();

    app.UseStaticFiles(); 

    // https://khalidabuhakmeh.com/handle-http-status-codes-with-razor-pages
    // https://andrewlock.net/retrieving-the-path-that-generated-an-error-with-the-statuscodepages-middleware/
    app.UseStatusCodePagesWithReExecute("/CustomError", "?statusCode={0}");

    app.UseRouting();

    // don't want request logging for static files so put this serilog middleware here in the pipeline
    app.UseSerilogRequestLogging(); // <- add this

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Strict });

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapRazorPages();
    });
}

```

[![errors](/assets/2021-03-10/errors2.jpg "errors")](/assets/2021-03-10/errors2.jpg)

Notice that it is the `Microsoft.AspNetCore.Dianostics.ExceptionHandlerMiddleware` is new this time.

```cs
Log.Logger = new LoggerConfiguration()
       // `LogEventLevel` requires `using Serilog.Events;`
       // gets rid of lots of noise
       .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
       //.MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Fatal)
```
I was supressing this before with LogEventLevel.Fatal

[![noise](/assets/2021-03-10/noise.jpg "noise")](/assets/2021-03-10/noise.jpg)

Default (nothing) is Information.

[![noise](/assets/2021-03-10/verbose.jpg "verbose")](/assets/2021-03-10/verbose.jpg)

And here is full Verbose.

The levels of logs are:

- Verbose
- Debug
- Information
- Warning
- Error
- Fatal


## Filtering

its possible that we may be able to filter out the second one [github issue](https://github.com/dotnet/aspnetcore/issues/19740) 

[https://github.com/serilog/serilog-expressions](https://github.com/serilog/serilog-expressions)

Looks very powerful eg

```cs
public static void Main(string[] args)
{
    Log.Logger = new LoggerConfiguration()
        // gets rid of lots of noise
        // filter out /healthcheck
        .Filter.ByExcluding("RequestPath like '/health%'")
        
        // same as 
       //.MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Fatal)
       .Filter.ByExcluding("SourceContext = 'Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware'")

```


## Other information

[Setting up serilog in ASP.NET Core 3](https://nblumhardt.com/2019/10/serilog-in-aspnetcore-3/)]

For me this cleans up the code as don't need the injected in ILogger everywhere.

[Using Seq to view the logs is useful too](https://docs.datalust.co/docs/getting-started-with-docker)

```bash
docker run --name seq -e ACCEPT_EULA=Y -p 5341:80 datalust/seq:latest
```

