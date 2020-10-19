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

TL;DR

- Hosting Environments
  - Development
  - Production
  - connection string picked up from appsettings.Development.json, appsettings.Production.json
- Builds
  - Debug
  - Release

[ASP.NET Core Configuration](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-4.1)

## Hosting Environment on Development

Locally it knows which one to get from `launchSettings.json`: and the profile I run under. I prefer Kestrel to see all the log messages easily.

These settings allow me to run in Production mode locally (even though the db connection string will be wrong)

- export ASPNETCORE_ENVIRONMENT=Development
- export ASPNETCORE_ENVIRONMENT=Production

But these are overridden by Properties/launchsettings.json:

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

## Hosting Environment on Production

I could use

- export ASPNETCORE_ENVIRONMENT=Development
- export ASPNETCORE_ENVIRONMENT=Production

But these are overridden when on development machine by Properties/launchsettings.json:

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

So it gets the connection string on Production from the appsettings.Production.json file??????

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

## Builds

Debug vs Release build

```bash
sudo dotnet publish --configuration Release
```

