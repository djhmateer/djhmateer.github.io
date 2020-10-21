---
layout: post
title: Configuration and Hosting Environment in ASP.NET Core 3.1 
description: 
menu: review
categories: Configuration ASP.NETCore BrokenLinkChecker 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

Managing configurations eg connection strings for: Dev / Test / Prod is very important as you don't want to mix them up!

[ASP.NET Core Configuration MS Docs](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-4.1)

[I'm using Password Postgres sample project](https://github.com/djhmateer/password-postgres) to demonstrate how I setup configration.


## Summary

- Hosting Environments: Development, Production
  db connection string picked up from appsettings.Development.json, appsettings.Production.json

- Build configuration: Debug, Release

## DeveloperExceptions

This is turned on in `Startup.cs`:

```cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        Log.Information("Hosting Environment is Developer, displaying Developer Exception pages");
        app.UseDeveloperExceptionPage();
    }
    else
    {
        Log.Information("Hosting Environment is non Developer, show friendly messages"); 
        app.UseExceptionHandler("/Error");
    }
// ...
```


![alt text](/assets/2020-10-21/dev.jpg "Dev exception"){:width="800px"}
<!-- ![alt text](/assets/2020-10-21/dev.jpg "Dev exception") -->

Notice nice log messages from kestrel, then when we click on ThrowException:

I pressed ctrl-F5 ie run in non-debug Release mode, but I'm still in Development hosting environment

![alt text](/assets/2020-10-21/ex.jpg "The exception"){:width="800px"}

The exception showing the source line number (12), file ThrowException.cshtml.cs and the stack trace. We don't want to show this unfriendly error to end users.

## Hosting Environment on Development

Locally it knows which one to get from `launchSettings.json`: and the profile I run under. I prefer Kestrel to see all the log messages easily.

These settings allow me to run in Production mode locally (even though the db connection string will be wrong)

We could just type in an enivornment variable:

- export ASPNETCORE_ENVIRONMENT=Development
- export ASPNETCORE_ENVIRONMENT=Production

These are overridden by Properties/launchsettings.json:

```yml
{
  "profiles": {
    "CookieDave.Web (Development)": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "http://localhost:4999",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "CookieDave.Web (Production)": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "http://localhost:4999",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Production"
      }
    }
  }
}

```

So essentially I'm setting the `ASPNETCORE_ENVIRONMENT` variable.

![alt text](/assets/2020-10-21/ex2.jpg "The exception in Production Hosting Environment"){:width="800px"}

Here is the same exception displayed in the Production Hosting Environment showing as a friendly error message. Notice I've put in some extra info whilst I fully understand the configuration system:

```cs
 public class ErrorModel : PageModel
 {
     public string? Message { get; set; }
     public string? OriginalPath { get; set; }

     public void OnGet()
     {
         var exceptionHandlerPathFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();

         OriginalPath = exceptionHandlerPathFeature.Path;
         Exception exception = exceptionHandlerPathFeature.Error;

         Message = "Message: " + exceptionHandlerPathFeature.Error.Message;
         Message += ", InnerException.Message: " + exceptionHandlerPathFeature.Error.InnerException?.Message;
         Message += ", Type: " + exception.GetType();
     }
 }

```
I'll turn off this detail when I go to production.


## Hosting Environment on Production

Standard Hosting Environment names: Development, Staging, Production (according to _ValidationScriptsPartial)

On Production I set the ASPNETCORE_ENVIRONMENT to Production when starting the app

```bash
# kestrel.service
[Unit]
Description=Kestrel.Web

[Service]
WorkingDirectory=/var/www/web
ExecStart=/usr/bin/dotnet PasswordPostgres.Web.dll

Restart=always
# Restart service after 9 seconds if the dotnet service crashes:
RestartSec=9
KillSignal=SIGINT
SyslogIdentifier=dotnet-kestrel.Web
User=www-data
# Set the Hosting Environment to prouduction - app get read this.
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```

So it gets the connection string on Production from the appsettings.Production.json file

```cs
public DBTestModel(IConfiguration c) => this.c = c;

public async Task OnGetAsync()
{
    // use this on startup.cs to display correct error pages
    // defined on server as Production
    // defined on dev machine in launchsettings.json as Development
    var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
    EnvironmentString = environment;

    // using IConfiguration to get the connection string
    var connectionString = c.GetConnectionString("Default");
    ConnectionString = connectionString;

    var employees = await Db.GetEmployees(connectionString);
    Employees = employees.ToList();
}
```

## Build Configuration

On production the build server runs this command to use a Release build configuration.

```bash
sudo dotnet publish --configuration Release
```

## Tests


## Other configuration eg mail server settings

We don't want live emails going out for Dev and Test.


