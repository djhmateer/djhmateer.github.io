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

I need to be able to handle large file uploads, which initially are zip files up to a few GB

## Tus

[https://tus.io/](https://tus.io/) Open Protocol for Resumable File Uploads. 


## Tusdotnet

[https://github.com/tusdotnet/tusdotnet](https://github.com/tusdotnet/tusdotnet) .NET server implementation of the Tus protocol for resumable file uploads.

[https://tus.io/demo.html](https://tus.io/demo.html) Demo showing how a file can resume after a browser tab is closed:



## Tus-js-client

[https://github.com/tus/tus-js-client](https://github.com/tus/tus-js-client) A pure JavaScript client for the tus resumable upload protocol

There is a nice html sample included in the project:


```bash
git clone https://github.com/tus/tus-js-client.git

# gets all the node_modules
npm install

# creates dist folder (essentially tus.js)
npm run build

# run the demos\browser\index.html file
```



## Uppy

[https://github.com/transloadit/uppy](https://github.com/transloadit/uppy) is build by the team at [https://transloadit.com/](https://transloadit.com/) 




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

## >2GB

[https://www.syncfusion.com/forums/158274/err-connection-reset-when-uploading-large-files-on-azure](https://www.syncfusion.com/forums/158274/err-connection-reset-when-uploading-large-files-on-azure) I am getting a connection reset on >2GB files

Maybe this link will help.

## Cloudflare

After switching on cloudflare for my project to do:

- SSL Certificates automatically
- 301 Redirects to Apex domain from www

I noticed that my large file uploads were failing

[https://gridpane.com/kb/cloudflares-cdn-and-upload-limitations/](https://gridpane.com/kb/cloudflares-cdn-and-upload-limitations/) explained why - 100mb file upload limit

Uploading a 92Mb file worked fine, and 121Mb gave (sometimes)

> 413 Request Entity too large cloudflare

A 200Mb actually gave a blank screen in chrome and ()

> ERR_CONNECTION_CLOSED

## A better file uploader

As we want a better file upload the cloudflare constraint should go away and it is much better to have a more solid file uploader. 

- Chunked (to get around 100Mb Cloudlflare limit)
- Resume/Retry on connection interruption
- Progress indicator
- Alleviate intermediate timeout issues in networks

[https://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously-with-jquery](https://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously-with-jquery) it is still a hard problem!










## Historical

Below are some of the older file upload strategies 



## jQuery-file-upload

[https://github.com/blueimp/jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload)

Can do processing on the client to give thumbnails
Drag and drop

[![alt text](/assets/2021-08-04/jquery.jpg "JQuery")](/assets/2021-08-04/jquery.jpg)

[https://stackoverflow.com/questions/56905302/solved-blueimp-jquery-file-upload-doesnt-work-with-asp-net-core-razor-pages](https://stackoverflow.com/questions/56905302/solved-blueimp-jquery-file-upload-doesnt-work-with-asp-net-core-razor-pages) Razor Pages



## Plupload

[https://www.plupload.com/](https://www.plupload.com/)

Great example [https://github.com/jayarjo/plupload-demos/blob/master/README.md](https://github.com/jayarjo/plupload-demos/blob/master/README.md) the UI Widget [here on jsfiddle](http://jsfiddle.net/gh/get/jquery/1.9.1/dependencies/ui/jayarjo/plupload-demos/tree/master/2.x/ui/bundled)

Not much seems to have been done over the last 5 years.

Tried examples but couldn't get easily to work.


## Resumable.js

Firefox 4+ and Chrome 11+

From the guys [https://github.com/23/resumable.js](https://github.com/23/resumable.js) at 23.

## Syncfusion
o[https://www.syncfusion.com/aspnet-core-ui-controls/file-upload](https://www.syncfusion.com/aspnet-core-ui-controls/file-upload)

[https://www.syncfusion.com/sales/speciallicensingprograms](https://www.syncfusion.com/sales/speciallicensingprograms) - possible open source license?

Looks like it will work.


## Telerik

[https://docs.telerik.com/aspnet-core/html-helpers/editors/upload/chunk-upload](https://docs.telerik.com/aspnet-core/html-helpers/editors/upload/chunk-upload) 


Seems to work , but expensive. 

## Devexpress

[https://demos.devexpress.com/ASPNetCore/Demo/FileUploader/ChunkUploading/](https://demos.devexpress.com/ASPNetCore/Demo/FileUploader/ChunkUploading/)