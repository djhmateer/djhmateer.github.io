---
layout: post
title: Integration testing of ASP.NET Core 3.1 
description: 
menu: review
categories: xunit 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

[Integration Testing ASP.NET Core Applications: Best Practices](https://app.pluralsight.com/library/courses/integration-testing-asp-dot-net-core-applications-best-practices/table-of-contents) by Steve Gordon is an excellent Pluralsight course, and I'm using the strategies discussed there.

[Integration Tests MD Docs](https://docs.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-3.1) is a great starting point

## Setting up a Integration Tests project for Web App

Add new project, xunit.

Add nuget package: `Microsoft.AspNetCore.Mvc.Testing` then update the other nuget packages too.

In the `.csproj` file change build to .Web

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <IsPackable>false</IsPackable>
  </PropertyGroup>
```

To disable shadowcopying which stops tests executing in a different directory from the build output. As we need the appsettings.json file to be placed alongside th e dll for db connection string.

`xunit.runner.json` add in and

```json
{
	"shadowCopy": false
}
```

## Healthcheck page

From the standard Razor pages web project (.NET Core 3.1)

[MS Docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-3.1)

[Hanselman article](https://www.hanselman.com/blog/HowToSetUpASPNETCore22HealthChecksWithBeatPulsesAspNetCoreDiagnosticsHealthChecks.aspx)

```cs
// startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // ...
    services.AddHealthChecks();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // ...
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapHealthChecks("/healthcheck");
        // ...
    });

```

## Healthchecktest

Make a HealthCheckTests.cs page

```cs
// IClassFixture is a Generic interface which expects a class type which will act as a fixture
// WebApplicationFactory is the type - which is in AspNetCore.Mvc.Testing
// Startup is the entry point for the service under test

public class HealthCheckTests : IClassFixture<WebApplicationFactory<Startup>>
{
    private readonly HttpClient _httpClient;

    public HealthCheckTests(WebApplicationFactory<Startup> factory)
    {
        // create a client that we can use to send a request to the test server
        _httpClient = factory.CreateDefaultClient();
    }

    [Fact]
    public async Task HealthCheck_ReturnsOk()
    {
        var response = await _httpClient.GetAsync("/healthcheck");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}

```

and run it from VS, R# or the CLI:

```bash

dotnet test -c Release

```

### ClassFixture

> An [xUnit feature](https://xunit.net/docs/shared-context) used to create, setup and teardown a shared test class instance, used across all test methods defined in the test class

So starting up the test server is only done once. So this is faster.

## WebApplicationFactory

[Andrew Locke](https://andrewlock.net/converting-integration-tests-to-net-core-3/). Asp.NET Core includes`Microsoft.AspNetCore.TestHost' which contains an in-memory web host that doesn't use the networking layer.

## General Page Tests

Here we are testing that the page

- Gives some form of success code eg 20x
- Has the correct media type

```cs
public class GeneralPageTests : IClassFixture<WebApplicationFactory<Startup>>
{
    private readonly WebApplicationFactory<Startup> _factory;

    public GeneralPageTests(WebApplicationFactory<Startup> factory)
    {
        _factory = factory;
    }

    public static IEnumerable<object[]> ValidUrls => new List<object[]>
    {
        new object[] {"/"},
        new object[] {"/Index"},
        new object[] {"/Privacy"},
        //new object[] {"/Enquiry"}
    };

    [Theory]
    [MemberData(nameof(ValidUrls))]
    public async Task ValidUrls_ReturnSuccessAndExpectedContentType(string path)
    {
        var expected = new MediaTypeHeaderValue("text/html");

        var client = _factory.CreateClient();
        //var client = _factory.CreateDefaultClient();

        var response = await client.GetAsync(path);

        response.EnsureSuccessStatusCode();

        Assert.Equal(expected.MediaType, response.Content.Headers.ContentType.MediaType);
    }

}
```

`CreateClient` will automatically follow redirects and handle cookies. We will see in Auth tests below that it is easy to turn this off.

## AngleSharp - Sane html

It is also really useful to see if the page is actually what we expect eg does the title and h1 match (are we getting the correct pages rendered)

```cs
// Helpers/HtmlHelpers.cs
public static async Task<IDocument> GetDocumentAsync(HttpResponseMessage response)
{
    var contentStream = await response.Content.ReadAsStreamAsync();

    var browser = BrowsingContext.New();

    var document = await browser.OpenAsync(virtualResponse =>
    {
        virtualResponse.Content(contentStream, shouldDispose: true);
        virtualResponse.Address(response.RequestMessage.RequestUri).Status(response.StatusCode);
    });

    return document;
}

// HomePageTests.cs
[Fact]
public async Task Get_ReturnsPageWithExpectedH1AndTitle()
{
    var client = _factory.CreateClient();

    var response = await client.GetAsync("/");

    response.EnsureSuccessStatusCode();

    using var content = await HtmlHelpers.GetDocumentAsync(response);

    var h1 = content.QuerySelector("h1");
    Assert.Equal("Welcome to the Pro Broken Link Checker", h1.TextContent);

    var title = content.Title;
    Assert.Equal("Pro Broken Link Checker - Pblc.Web", title);
}
```

## Identity - Authenticaion and Authorisation




## Authentication Testing

```cs
public class AdminTests : IClassFixture<WebApplicationFactory<Startup>>
{
    private readonly WebApplicationFactory<Startup> _factory;

    public AdminTests(WebApplicationFactory<Startup> factory)
    {
        factory.ClientOptions.AllowAutoRedirect = false;
        _factory = factory;
    }

    [Fact]
    public async Task Get_SecurePageIsForbiddenForAnUnauthenticatedUser()
    {
        var client = _factory.CreateClient();

        var response = await client.GetAsync("/Admin");

        Assert.Equal(HttpStatusCode.Redirect, response.StatusCode);
        Assert.StartsWith("http://localhost/identity/account/login", response.Headers.Location.OriginalString, StringComparison.OrdinalIgnoreCase);
    }

}
```

also test all pages which require Authentication

```cs
public class AuthenticationTests : IClassFixture<WebApplicationFactory<Startup>>
{
    private readonly WebApplicationFactory<Startup> _factory;

    public AuthenticationTests(WebApplicationFactory<Startup> factory)
    {
        factory.ClientOptions.AllowAutoRedirect = false;
        _factory = factory;
    }

    [Theory]
    [InlineData("/Admin")]
    [InlineData("/Admin/Staff/Add")]
    [InlineData("/Admin/Courts/Bookings/Upcoming")]
    [InlineData("/Admin/Courts/Booking/1/Cancel")]
    [InlineData("/Admin/Courts/Maintenance/Upcoming")]
    [InlineData("/FindAvailableCourts")]
    [InlineData("/BookCourt/1")]
    [InlineData("/Bookings")]
    public async Task Get_SecurePageRedirectsAnUnauthenticatedUser(string url)
    {
        var client = _factory.CreateClient();

        var response = await client.GetAsync(url);

        Assert.Equal(HttpStatusCode.Redirect, response.StatusCode);
        Assert.StartsWith("http://localhost/identity/account/login", response.Headers.Location.OriginalString, StringComparison.OrdinalIgnoreCase);
    }
}

```

## Displaying output using ITestOutputHelper

Here is an easy way to get debug output in a test runner.

```cs
private readonly ITestOutputHelper output;
private readonly string connectionString;

public DbTests(ITestOutputHelper output)
{
    this.output = output;
    connectionString = "Host=localhost;Username=alice;Password=letmein2;Database=passwordpostgres";
}

[Fact]
public async Task ShouldBeAbleToInsertLogin()
{
    var login = new Login
    {
        Email = $"{Guid.NewGuid().ToString()}@mailinator.com",
        PasswordHash = Guid.NewGuid().ToString()
    };
    output.WriteLine("hello world");

    var returnedLogin = await Db.InsertLogin(connectionString, login);

    Assert.Equal(login.Email, returnedLogin.Email);
    Assert.Equal(login.PasswordHash, returnedLogin.PasswordHash);
    Assert.True(returnedLogin.LoginId > 0);
}

```


## Other

https://andrewlock.net/creating-parameterised-tests-in-xunit-with-inlinedata-classdata-and-memberdata/


https://andrewlock.net/creating-strongly-typed-xunit-theory-test-data-with-theorydata/#using-theorydata-with-the-classdata-attribute

Crawler12 tests I've implemented it






but essentially we need to

- Create a new xUnit project
- Add `Microsoft.AspNetCore.Mvc.Testing` nuget
- Change the .csproj Sdk to Microsoft.NET.Sdk.Web
- Add in xunit.runner.json: shadowCopy: false
- Reference the web project

```cs
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace CookieDave.Web.IntegrationTests
{
    public class HealthCheckTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly HttpClient _httpClient;

        public HealthCheckTests(WebApplicationFactory<Startup> factory)
        {
            _httpClient = factory.CreateDefaultClient();
        }

        [Fact]
        public async Task HealthCheck_ReturnsOk()
        {
            var response = await _httpClient.GetAsync("/healthcheck");

            //Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            response.EnsureSuccessStatusCode();
        }
    }
}

```

Class Fixture - An xUnit feature used to create, set up and teardown a shared test class instance, used across all test methods defined in the test class.

Normally xUnit creates a new instance of a test class for each test method. When using a Class Fixture a Single shared instance is created ie setup (creating the test server)

ie this is faster that creating a new server for each tast method.

WebApplicationFactory - AspNetCore.Mvc.Testing library - bootstraps an application using an in-memory test server

So no real networking layer - fast!

### CreateClient

- ClientDefaultClient
- CreateClient
    - Follows redirects
    - Handles cookies
    - Can configure using .ClientOptions

### Testing response code and content type

A sanity check test that all anonymous pages respond correctly

### Testing content with AngleSharp

Brittle testing that the H1 is giving the exptected content.

### Authentication and Authorisation Testing

Access to restricted pages is prevented for unauthenticated users.

We need to register an AuthenticationHandler to use during testing



### Custom 404

https://joonasw.net/view/custom-error-pages

Use this so doesn't interfere with Forbidden status code return.

### CustomWebApplicationFactory

This is useful for the

can inject a fake database
can inject in custom connection strings, use environment etc...










