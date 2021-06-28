---
layout: post
title: Upload large files with ASP NET 5 and Kestrel 
description: 
menu: review
categories: Kestrel 
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---


I'm using Kestrel on Ubuntu 20.04 as an internet facing edge web server, using ASP.NET 5 with Razor Pages.

I need to be able to handle large file uploads, which initially are zip files up to 500MB.

## A Simple Upload form

```html
<form method="post" enctype="multipart/form-data">
    <input type="file" asp-for="Upload" />
    <input type="submit" />
</form>
```
then on the code behind

```cs
[BindProperty]
public IFormFile? Upload { get; set; }

public async Task<IActionResult> OnPostAsync(CancellationToken cancellationToken)
{
    var connectionString = AppConfiguration.LoadFromEnvironment().ConnectionString;

    // check that Upload is something
    if (Upload is { } && Upload.Length > 0)
    {
        Log.Information($"Uploaded file {Upload.FileName}");
        // eg C:\Users\djhma\AppData\Local\Temp on Windows
        var path = Path.GetTempPath();

        // get next jobId from Db
        var jobId = await Db.InsertJobWithOrigFileNameAndReturnJobId(connectionString, Upload.FileName);

        var fileName = Path.Combine(path, $"job-{jobId}.tmp");

        // copy uploaded file to tempPath location as job-{jobId}.tmp
        using (var fileStream = new FileStream(fileName, FileMode.Create, FileAccess.Write))
        {
            await Upload.CopyToAsync(fileStream, cancellationToken);
        }

        // The Result page will kick off the job
        return Redirect($"Results/{jobId}");
    }

    return RedirectToPage("UploadFailed");
}


```

## Startup.cs

```cs
// to allow large form uploads
services.Configure<KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize = int.MaxValue; // if don't set default value is: 30 MB
});

// to allow large form uploads
services.Configure<FormOptions>(x =>
{
    x.ValueLengthLimit = int.MaxValue;
    x.MultipartBodyLengthLimit = int.MaxValue; // if don't set default value is: 128 MB
    x.MultipartHeadersLengthLimit = int.MaxValue;
});
```