---
layout: post
title:  "Async with Dapper and Razor Pages"
#menu: review
categories: Async Dapper SQL
published: true 
redirect_from: "/dapper/2018/01/18/Async-with-Dapper-and-Razor-Pages.html"
sitemap: true
---

### Summary
Here is an exmple of using 'Async all the way' using Dapper for data access in an ASP.NET Core 2.0 Razor Pages app.

### Why Use Async in a Web App
If you are hitting a single database then this probably won't speed up your app

However it will allow greater scalability of the application as the web thread won't be locked

### Simple Example using Dapper 
{% highlight csharp %}

 public class IndexModel : PageModel
 {
    private readonly Thing _thing;

    public IndexModel(Thing thing) => _thing = thing;

    public string Message;
    
    public async Task OnGetAsync()
    {
        var result = await _thing.RunQueryAsync();
        Message = result;
    }

    // Non async way - comment this out as can't have OnGet and OnGetAsync
    public void OnGet()
    {
        _thing.RunQuery();
    } 
}

public class Thing
{
    public async Task<string> RunQueryAsync()
    {
        using (var connection = new SqlConnection("Server=(localdb)\\mssqllocaldb;Database=AllReady;Trusted_Connection=True;MultipleActiveResultSets=true"))
        {
            await connection.OpenAsync();

            var sql = "Select Name From Organization";
            var result = await connection.QueryAsync<string>(sql);
            return result.FirstOrDefault();
        }
    }

    public string RunQuery()
    {
        using (var connection = new SqlConnection("Server=(localdb)\\mssqllocaldb;Database=AllReady;Trusted_Connection=True;MultipleActiveResultSets=true"))
        {
            connection.Open();

            var sql = "Select asd From Organizations";
            var result = connection.Query<string>(sql).FirstOrDefault();
            return result;
        }
    }
}

{% endhighlight %}
