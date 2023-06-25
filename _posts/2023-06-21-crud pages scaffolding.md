---
layout: post
#title: Developer Desktop Build 2023
#description: Building a desktop PC focussed on being developer daily driver.
menu: review
categories: datetime
published: true 
comments: false     
sitemap: true
image: /assets/2023-04-29/5.jpg
---

<!-- [![alt text](/assets/2023-04-29/7.jpg "email"){:width="800px"}](/assets/2023-04-29/7.jpg) -->


I have a database and want to create CRUD pages - specifically Create and Update

Using EF (which I don't usually do) is a good time saver for creating pages

## Scaffold out the Db context and entities

[https://learn.microsoft.com/en-us/ef/core/cli/dotnet](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) - install `dotnet-ef`

```bash
# on windows side - cmd.exe

# 7.0.304
dotnet --version

# Tool 'dotnet-ef' (version '7.0.7') was successfully installed.
dotnet tool install --global dotnet-ef
```

[https://learn.microsoft.com/en-us/ef/core/managing-schemas/scaffolding/?tabs=dotnet-core-cli](https://learn.microsoft.com/en-us/ef/core/managing-schemas/scaffolding/?tabs=dotnet-core-cli) scaffold `POCO's` and `DbContext`

```bash
# add Microsoft.EntityFrameworkCore.Design
# add Microsoft.EntityFrameworkCore.SqlServer
# to the project
# 7.0.7

# both seem to work!
dotnet-ef
dotnet ef

# from cmd.exe in project directory
# dotnet ef dbcontext scaffold "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Chinook" Microsoft.EntityFrameworkCore.SqlServer
dotnet ef dbcontext scaffold "Data Source=.\;Initial Catalog=vll;Trusted_Connection=True;TrustServerCertificate=True" Microsoft.EntityFrameworkCore.SqlServer

dotnet ef dbcontext scaffold "Data Source=.\;Initial Catalog=vll;Trusted_Connection=True;TrustServerCertificate=True" Microsoft.EntityFrameworkCore.SqlServer --table Project --table ProjectStatus

```

To avoid this error: `Microsoft.Data.SqlClient.SqlException (0x80131904): A connection was successfully established with the server, but then an error occurred during the login process.`
use the Trust parts of the connection string as above.

So now I have `VllContext.cs` and `Project.cs` etc..

## Scaffold pages


[https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/model?view=aspnetcore-7.0&tabs=visual-studio](https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/model?view=aspnetcore-7.0&tabs=visual-studio) this is a simple tutorial with 1 `Movie` entity which uses migrations to make the database

[https://learn.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view=aspnetcore-7.0&tabs=visual-studio](https://learn.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view=aspnetcore-7.0&tabs=visual-studio) this is a more detailed tutorial with a more complex data model.

I found these 2 tutorials not what I wanted - 

I want to see how to get a Drop down list working with razor pages, and the scaffolding didn't work... 

In fact I gave up, and used basic html and Dapper/SQL as this was too complex!



On `Pages\Projects` folder, right click, add scaffold item. Select Project.cs as the Model, and VllContent as the context

Need also to patch in EF

```cs
// program.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebApplication1;
//using RazorPagesMovie.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();


builder.Services.AddDbContext<VllContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("Default") ?? throw new InvalidOperationException("Connection string 'RazorPagesMovieContext' not found.")));
```

and 

```json
// appsettings.Development.json
{
    "DetailedErrors": true,
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft.AspNetCore": "Warning"
        }
    },
    "ConnectionStrings": {
        "Default": "Server=.\\;Database=vll;Trusted_Connection=True;"
    }
}
```

## ProjectStatus

[![alt text](/assets/2023-06-22/2.jpg "email"){:width="500px"}](/assets/2023-06-22/2.jpg)

This works fine. Nice CRUD screens with validation and EF goodness.

Notice I called the page something different to the Model name as was getting namespace conflicts.



## Project

[![alt text](/assets/2023-06-22/1.jpg "email"){:width="500px"}](/assets/2023-06-22/1.jpg)

Interesting that the url is now `/Projects/Edit?id=1`

The ProjectStatusId is a drop down with wrong values of 1,2,3 - we need the title. Also the generated code doesn't submit!

Something wrong with the 1 to many code.

