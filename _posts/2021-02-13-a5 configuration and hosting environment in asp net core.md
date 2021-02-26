---
layout: post
title: 5. Configuration and Hosting Environment in ASP.NET Core
description: 
menu: review
categories: Configuration ASP.NETCore BrokenLinkChecker 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

Managing configurations eg connection strings for: Development / Test / Production is very important.

Here I'm going to describe a stragegy that suits me, and is simple.

[ASP.NET Core Configuration MS Docs](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-4.1)

[Steve Gordon's Configuration and Options in .NET Core and ASP.NET Core Apps Pluralsight](https://app.pluralsight.com/library/courses/dotnet-core-aspnet-core-configuration-options/table-of-contents)

[Steve Talks Code article and video](http://stevetalkscode.co.uk/category/functional-programming)

[I'm using Password Postgres sample project](https://github.com/djhmateer/password-postgres) to demonstrate how I setup configration.

[TardisBank source](https://github.com/TardisBank/TardisBank) has heavily influened this code - thank you!

[Integration Testing ASP.NET Core Applications: Best Practices](https://app.pluralsight.com/library/courses/integration-testing-asp-dot-net-core-applications-best-practices/table-of-contents) by Steve Gordon is an excellent Pluralsight course, and I'm using some of the strategies discussed there.

## Summary

- Hosting Environments: Development, Test, Production
- Build configuration: Debug, Release

## Hosting Environment on Development

Lets imagine we are running in `launchSettings.json` Development Hosting Environment.

This means that `IConfiguration` will read from our `appsettings.Development.json` file.

[GetConnectionString MS Docs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.configuration.configurationextensions.getconnectionstring?view=dotnet-plat-ext-3.1) is a handy shortcut:

```cs
public class DBTestModel : PageModel
{
    private readonly IConfiguration c;
    public string? ConnectionString { get; set; }
    public IList<Employee>? Employees { get; set; }

    public DBTestModel(IConfiguration c) => this.c = c;

    public async Task OnGetAsync()
    {
        var connectionString = c.GetConnectionString("Default");
        //var connectionString = c.GetSection("ConnectionStrings")["Default"];
        ConnectionString = connectionString;

        var employees = await Db.GetEmployees(connectionString);
        Employees = employees.ToList();
    }
}
```

## Making it simpler by not using IConfiguration

I'm liking this way of getting configuration:

```cs
public class DBTestModel : PageModel
{
    public string? ConnectionString { get; set; }
    public IList<Employee>? Employees { get; set; }

    public async Task OnGetAsync()
    {
        var connectionString = AppConfiguration.LoadFromEnvironment().ConnectionString;
        ConnectionString = connectionString;

        var employees = await Db.GetEmployees(connectionString);
        Employees = employees.ToList();
    }
}

```

and the AppConfiguration class is:

```cs
public class AppConfiguration
{
    public string ConnectionString { get; }

    private AppConfiguration( string connectionString) => 
        ConnectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));

    public static AppConfiguration LoadFromEnvironment()
    {
        // This reads the ASPNETCORE_ENVIRONMENT flag from the system

        // set on production server via the dot net run command
        // set on development via the launchSettings.json file
        // set in IntegrationTests project via CustomWebApplicationFactory so use the fast WebApplicationFactory
        // set on UnitTest projects via the TestBase
        var aspnetcore = "ASPNETCORE_ENVIRONMENT";
        var env = Environment.GetEnvironmentVariable(aspnetcore);

        string connectionString;
        switch (env)
        {
            case "Development":
            case "Test":
                connectionString = new ConfigurationBuilder().AddJsonFile("appsettings.Development.json")
                    .Build().GetConnectionString("Default");
                break;
            case "Production":
                connectionString = new ConfigurationBuilder().AddJsonFile("appsettings.Production.json")
                    .Build().GetConnectionString("Default");
                break;
            default:
                throw new ArgumentException($"Expected {nameof(aspnetcore)} to be Development, Test or Production and it is {env}");
        }

        return new AppConfiguration(connectionString);
    }
}
```

I like that my page code behinds are simpler as I don't need to do constructor based DI to get the configuration.


## Kestrel

<!-- ![alt text](/assets/2020-10-12/kestrel.jpg "Kestrel"){:width="800px"} -->
![alt text](/assets/2020-10-12/kestrel.jpg "Kestrel")

Running in self hosted Kestrel instead of IIS Express, defining the enviornment in launchsettings.json settings:

```yml
# launchsettings.json
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

![alt text](/assets/2020-10-21/ex2.jpg "The exception in Production Hosting Environment"){:width="800px"}

So I can easily flip to the Production Hosting Environment showing as a friendly error message. Notice I've put in some extra info whilst I fully understand the configuration system:

## Hosting Environment on Production Server

On the Production Server I set the ASPNETCORE_ENVIRONMENT to Production when starting the app. I'm using an Ubuntu 18 LTS machine with the latest .NET Core installed

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
# Set the Hosting Environment to Production - app get read this.
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```

## Configuration in Startup.cs

I've kept the original injected way of switching between environments here:

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


## Build Configuration

On production the build server runs this command to use a Release build configuration.

```bash
sudo dotnet publish --configuration Release
```

This is the Build Configuration, and not the Hosting Environment.

This has caught me so many times!

## Unit Tests

I've got a separate blog post coming on Unit/Integration testing, but here are the bits pertinant to configuration.

I'm defining Unit Tests here as testing my service classes eg Db.cs class, which hits a database live.

```cs
 public class DbTests : TestsBase
 {
     private readonly string connectionString;
     public DbTests() => connectionString = AppConfiguration.LoadFromEnvironment().ConnectionString;

     [Fact]
     public async Task ShouldBeAbleToInsertLogin()
     {
         var login = new Login
         {
             Email = $"{Guid.NewGuid().ToString()}@mailinator.com",
             PasswordHash = Guid.NewGuid().ToString()
         };

         var returnedLogin = await Db.InsertLogin(connectionString, login);

         Assert.Equal(login.Email, returnedLogin.Email);
         Assert.Equal(login.PasswordHash, returnedLogin.PasswordHash);
         Assert.True(returnedLogin.LoginId > 0);
     }
}

public class TestsBase
{
    public TestsBase() => 
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Test");
}
```

So the Unit tests get a connection string from the main .Web project by calling `LoadFromEnvironment` in our AppConfiguration class.

The Unit tests know their `ASPNETCORE_ENVIRONMENT` variable is Test as we set it in a TestsBase class.


## Integration Tests

I'm defining Integration Tests as hitting the Website, albeit I'm using a WebApplicationFactory so that the testing is fast (and I don't have to spin up an acutal webserver and hit http endpoints)

The trick is set the `ASPNETCORE_ENVIRONMENT` in CustomeWebApplicationFactory

```cs
public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Test");
    }
}
```

Then we don't need to worry about Shadowcopy=false trick, as we've doing a really simple configuration impmentation.

## Configuration of Staging on Windows Server 2019

[https://ifyoudo.net/how-to-setup-aspnetcore_environment-variable-on-an-iis-website](https://ifyoudo.net/how-to-setup-aspnetcore_environment-variable-on-an-iis-website)

Essentially set the machine level ASPNETCORE_ENVIRONMENT to Staging.


## Other configuration eg mail server settings

Email is an important part of any SaaS business. Very important! 

I'm now using [Postmark](https://postmarkapp.com/) to deliver my outbound transactional email.

[Postmark](/2020/11/08/xpostmark) is my write up in detail

[SendGrid Unsupported Media Type](/2020/11/01/sendgrid-unsupported-media-type) I tried as have used it for years (and continue to)

[Mailinator](/2020/10/27/xmailinator) was a useful service, but I'm not using it now (see postmark article for why)

So where do I store my API Keys / Server Tokens / Secrets.

As I'm using raw VM's and not using any secret storage, I've built a simple approach:

<!-- ![alt text](/assets/2020-10-21/secrets.jpg "Secrets"){:width="800px"} -->
![alt text](/assets/2020-10-21/secrets.jpg "Secrets")

This folder is not checked into source control.

![alt text](/assets/2020-10-21/secrets2.jpg "Secrets the details")

There are simple text files for my API keys

When my [Azure CLI script runs - here is a demo](https://github.com/djhmateer/password-postgres/blob/main/infra/infra.azcli), this is near the top

```bash
## search and replace the {{SENDGRID_API_KEY}} in cloud-init.yaml
## which is stored in the projects secrets/ folder
## which isn't checked into public source control (kept on OneDrive)
## then make sure this new cloud-init-with-secrets.txt is in /secrets

## Assuming if sendgridfilename exists, then postmark will too
sendgridfilename="../secrets/sendgrid-passwordpostgres.txt"
postmarkfilename="../secrets/postmark-passwordpostgres.txt"
if [ -f "$sendgridfilename" ]; then
  sendgridkey=$(cat "$sendgridfilename")
  postmarkkey=$(cat "$postmarkfilename")

  # this will overwrite without asking
  cp cloud-init.yaml ../secrets/cloud-init-with-secrets.yaml

  # replace
  sed -i -e "s/{{SENDGRID_API_KEY}}/$sendgridkey/g" ../secrets/cloud-init-with-secrets.yaml
  sed -i -e "s/{{POSTMARK_SERVER_TOKEN}}/$postmarkkey/g" ../secrets/cloud-init-with-secrets.yaml

else
  read -p "Sendgrid file not found, press any key to continue - do you really want to continue? (no infrastructure created yet)"
fi

```

So this inserts keys into my cloud-init.yml file which is passed to the VM on creation, so the keys end up on the destination server without being checked into source control.

```yml
  # will use bash templating to insert this secret in
  - echo "Creating secrets directory with api keys in"
  - sudo mkdir /var/www/web/secrets
  - cd /var/www/web
  # todo work on these as was getting strange problems
  - chmod -R 777 secrets
  - cd secrets
  # this is replaced when infra.azcli is run
  - printf "{{SENDGRID_API_KEY}}" > sendgrid-passwordpostgres.txt
  - printf "{{POSTMARK_SERVER_TOKEN}}" > postmark-passwordpostgres.txt
```

I like this simple solution.

## Robots.txt

[Hanselman article](https://www.hanselman.com/blog/using-the-aspnet-core-environment-feature-to-manage-development-vs-production-for-any-config-file-type)