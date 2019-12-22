---
layout: post
title: ASP.NET Core 3 Hosting Environment
description: 
menu: review
categories: ASP.NETCore3 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

I'm running an Ubuntu server running ASP.NET Core 3 with Kestrel on the edge.

To start my app I've got a shell script

```bash
# up.sh
sudo dotnet run --configuration Debug --urls=http://0.0.0.0:80
```

## Debug and Release Configuration

[MS Docs](https://docs.microsoft.com/en-us/dotnet/core/deploying/deploy-with-cli)

```bash
dotnet publish -c Debug
dotnet publish -c Release
```

However the Release version had pdb files, and the directory looks identical on disk.

## Hosting Environment

I want to control the hosting environment so I can flick to production/deveopment easily and have different features.

```cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        Log.Information("Development environment - using developer exception page");
        app.UseDeveloperExceptionPage();
    }
    else
    {
        Log.Information("Non Development environment - errors go to /Error");
        app.UseExceptionHandler("/Error");
        app.UseHsts();
    }
```

I could use

- export ASPNETCORE_ENVIRONMENT=Development
- export ASPNETCORE_ENVIRONMENT=Production

But these are overridden by Properties/launchsettings.json:

```json
{
  "iisSettings": {
    "windowsAuthentication": false, 
    "anonymousAuthentication": true, 
    "iisExpress": {
      "applicationUrl": "http://localhost:51294",
      "sslPort": 44392
    }
  },
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "BLC.Website": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

I'd like to force it to use a 'command' or something via a command line switch.

I guess using a build server would be more usual here.

maybe trying doing a publish from Visual Studio?

## DB Connection Strings and Secrets

Okay these should never be stored in source control, and I envisage will be more easily injected in via the Build Server (Azure DevOps). But for the simplest possible solution:

- dbconnection strings etc

- appsettings.Development.json
- appsettings.Production.json