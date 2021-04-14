---
layout: post
title: 16 - Custom Authorisation with IAsyncPageFilter  
description: 
menu: review
categories: Razor 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---


In many of my pages I've a multi-tenant scenario. Ie I've a ClientId which is in the Claim, and they have access to some ProjectId's. So I want to make sure that any client logged in who can see `/Dashboard/123` which is projetId 123, should not be able to change the url to 124 and see that Project if they are not supposed to.

Rather than put a call into every Handler (Method) in my app to check, lets write a Filter:

```cs
// This is registered in startup.cs and runs on every page
// it is only for auth on project pages (ie when a user is logged in)
public class CustomPageFilter : IAsyncPageFilter
{
    public async Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context) => await Task.CompletedTask;

    public async Task OnPageHandlerExecutionAsync(PageHandlerExecutingContext context, PageHandlerExecutionDelegate next)
    {
        // is this a route which need auth?
        // ie where we need to check if that clientt has access to that project?
        var routeData = context.RouteData;
        var result = routeData.Values.TryGetValue("projectid", out var projectIdString);

        if (result)
        {
            var clientIdString = context.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "ClientId")?.Value;
            var result = int.TryParse(clientIdString, out int clientId);

            // does this clientId have access to this projectId?
            // just check in the list of projects
            var conn = AppConfiguration.LoadFromEnvironment().ConnectionString;
            int.TryParse(projectIdString as string, out int projectIdInt);

            bool doesClientIdHaveAccessToProjectId = await Db.DoesClientIdHaveAccessToProject(conn, clientId, projectIdInt);

            if (doesClientIdHaveAccessToProjectId == false)
                context.HttpContext.Response.Redirect("/Account/AccessDenied");
            else
                await next.Invoke();
        }
        else
            await next.Invoke();
    }
}

```

then wired up in statup.cs

```cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddRazorPages().AddMvcOptions(options =>
    {
        options.Filters.Add(new ClientProjectAuthenticationFilter());
    });

    // ..
}
```

