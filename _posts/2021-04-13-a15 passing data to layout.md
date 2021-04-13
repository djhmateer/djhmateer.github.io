---
layout: post
title: 15 Passing Data to Layout Page
description: 
menu: review
categories: Razor 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

In many of my pages I want to pass a projectId and projectName to my `_Layout.cshtml` page to display the name on the page and to render links in the menu.

This surprised me how tricky it was, however there is an elegant way.

## Not Using ViewBag

This was my first try as it was easy.

```cs
[AuthorizeRoles(ClientUser)]
public class ReportsModel : PageModel
{
    // eg /Repoorts/123
    // Model binder wiring up projectId
    // cshtml has this directive at the top:  @page "{projectId:int}"
    public async Task<IActionResult> OnGetAsync(int projectId, bool? openTab2)
    {
        var connectionString = AppConfiguration.LoadFromEnvironment().ConnectionString;

        var project = await Db.GetProjectById(connectionString, projectId);

        ViewData["ProjectId"] = projectId;
        ViewData["ProjectName"] = project.Name;

        return Page();
    }
```

Then in the `_Layout.cshtml` file 

```cs
@{int projectId = (int)ViewData["ProjectId"]; }
```

## Using the ActionFilterAttribute

[How to set ViewBag properties for all Views without using a base class for Controllers?](https://stackoverflow.com/a/21130867)

Very useful so I don't have to write the above code on every page to pass data to the layout.

```cs
public class ViewBagActionFilter : ActionFilterAttribute
{

    public ViewBagActionFilter(IOptions<Settings> settings){
        //DI will inject what you need here
    }

    public override void OnResultExecuting(ResultExecutingContext context)
    {
        // for razor pages
        if (context.Controller is PageModel)
        {
            var controller = context.Controller as PageModel;
            controller.ViewData.Add("Avatar", $"~/avatar/empty.png");
            // or
            // controller.ViewBag.Avatar = $"~/avatar/empty.png";

            //also you have access to the httpcontext & route in controller.HttpContext & controller.RouteData
        }

        // for Razor Views
        // if (context.Controller is Controller)
        // {
        //     var controller = context.Controller as Controller;
        //     controller.ViewData.Add("Avatar", $"~/avatar/empty.png");
        //     // or
        //     controller.ViewBag.Avatar = $"~/avatar/empty.png";

        //     //also you have access to the httpcontext & route in controller.HttpContext & controller.RouteData
        // }

        base.OnResultExecuting(context);
    }
}

```

[MS Docs](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/filters?view=aspnetcore-5.0)

## Razor Pages Action Filters

[https://docs.microsoft.com/en-us/aspnet/core/razor-pages/filter?view=aspnetcore-5.0](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/filter?view=aspnetcore-5.0)

[https://www.learnrazorpages.com/razor-pages/filters](https://www.learnrazorpages.com/razor-pages/filters)

This is what I have started using as I like that I need to opt into it, it is Razor pages specific, and that async worked easily.

It is simpler too as don't need to register globally.

```cs
public class LayoutFilterAttribute : ResultFilterAttribute
{
    public override async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
    {
        var doesProjectIdExist = context.RouteData.Values.TryGetValue("projectid", out var projectIdString);

        // only if a projectId is passed in routing eg /Dashboard/123
        if (doesProjectIdExist)
        {
            var conn = AppConfiguration.LoadFromEnvironment().ConnectionString;

            int.TryParse(projectIdString as string, out int projectIdInt);

            var project = await Db.GetProjectById(conn, projectIdInt);

            // this if failing on a redirect
            // so check that Result is the expected Type
            if (context.Result is PageResult result)
            {
                result.ViewData["ProjectId"] = projectIdInt;
                result.ViewData["ProjectName"] = project?.Name;
            }

            //try
            //{
            //    var result = (PageResult) context.Result;
            //    result.ViewData["ProjectId"] = projectIdInt;
            //    result.ViewData["ProjectName"] = project?.Name;
            //}
            //catch (Exception ex)
            //{

            //}
    }

        await next.Invoke();
    }
}

```
then on my code:

```cs
[AuthorizeRoles(ClientUser)]
[LayoutFilter]
public class DashboardModel : PageModel 
{
 // ...
}
```

