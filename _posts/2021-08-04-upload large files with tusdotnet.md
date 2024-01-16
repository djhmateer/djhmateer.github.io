---
layout: post
title: Upload and Resume large files with TusDotNet
description: 
# menu: review
categories: Kestrel 
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

I'm using Kestrel on Ubuntu 20.04 as an internet facing edge web server, using ASP.NET 5 with Razor Pages. 

Update - am using nginx as a reverse proxy now so can handle: redirect to apex, ssl cert, no iptables direct to port 5000. Detailed blog [here]()


I need to be able to handle large file uploads, which initially are zip files up to a few GB

[https://github.com/djhmateer/tus-test](https://github.com/djhmateer/tus-test) is a sample project

[https://github.com/osr4rightstools/osr4rights-tools](https://github.com/osr4rightstools/osr4rights-tools) bigger project

## Tus

[https://tus.io/](https://tus.io/) Open Protocol for Resumable File Uploads. 

[https://tus.io/demo.html](https://tus.io/demo.html) 

Give user feedback on upload progress

[![alt text](/assets/2021-08-04/demo.jpg "demo"){:width="650px"}](/assets/2021-08-04/demo.jpg)

and then can resume even after the browser has been closed.

[![alt text](/assets/2021-08-04/resume.jpg "resume"){:width="650px"}](/assets/2021-08-04/resume.jpg)

[https://github.com/transloadit/uppy](https://github.com/transloadit/uppy) is build by the team at [https://transloadit.com/](https://transloadit.com/) who wrote Tus.

## TusDotNet

[https://github.com/tusdotnet/tusdotnet](https://github.com/tusdotnet/tusdotnet) .NET server implementation of the Tus protocol for resumable file uploads.



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

<!-- [![alt text](/assets/2021-08-04/tustest.jpg "tustest"){:width="750px"}](/assets/2021-08-04/tustest.jpg) -->
[![alt text](/assets/2021-08-04/tustest.jpg "tustest")](/assets/2021-08-04/tustest.jpg)

Resume works fine with the sample server implementation

[![alt text](/assets/2021-08-04/resume2.jpg "resume2")](/assets/2021-08-04/resume2.jpg)

I had some issues with the server side implementation and resuming.

[![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg)

It uses local storage to remember previous uploads


Razor Pages Source for this demo is [https://github.com/djhmateer/tus-test](https://github.com/djhmateer/tus-test)

Remember to run npm.

## Test files

To test the validity of the files, we need something to verify:

[https://github.com/NVlabs/ffhq-dataset/](https://github.com/NVlabs/ffhq-dataset/) - Flickr-Faces-HQ Dataset. Has 70k images on Google Drive totally 2.56TB.

I ended up making sample image zips up to 

- 100MB was a limit (imposed by cloudflare)
- 2GB was a limit (imposed by some filesystems)
- 4GB 
- 6GB 

## Manually Create large test files

[https://stackoverflow.com/questions/257844/quickly-create-a-large-file-on-a-linux-system](https://stackoverflow.com/questions/257844/quickly-create-a-large-file-on-a-linux-system)

```bash
dd if=/dev/zero of=1GB.test bs=1G count=1
```

Can be useful, but I prefer to have files I can sanity check.


## A Simple Upload form

The simplest possible thing is always a great place to start, but having no user feedback is not a good experience.

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

## Cloudflare and Tus

After switching on cloudflare for my project to do:

- SSL Certificates automatically
- 301 Redirects to Apex domain from www

I noticed that my large file uploads were failing (on a simple pre Tus upload)

[https://gridpane.com/kb/cloudflares-cdn-and-upload-limitations/](https://gridpane.com/kb/cloudflares-cdn-and-upload-limitations/) explained why - 100mb file upload limit

Uploading a 92Mb file worked fine, and 121Mb gave (sometimes)

> 413 Request Entity too large cloudflare

A 200Mb actually gave a blank screen in chrome and

> ERR_CONNECTION_CLOSED

Interestingly I found that chunking which Tus supports gave strange errors through Cloudflare. So I turned off Cloudflare.

## Tus Bugs

When a successful file upload, why does it prompt if I upload that file again? I found that it was the file permissions on the tusstore on my production server. [OSR4Rights-Tools](https://github.com/osr4rightstools/osr4rights-tools) has it implemented properly with the permissions set on VM build stage.

don't have javascript popup as Chrome wont work if that window isn't in focus



## Historical

Below are some other file upload strategies 

### jQuery-file-upload

[https://github.com/blueimp/jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload)

Can do processing on the client to give thumbnails
Drag and drop

[![alt text](/assets/2021-08-04/jquery.jpg "JQuery")](/assets/2021-08-04/jquery.jpg)

[https://stackoverflow.com/questions/56905302/solved-blueimp-jquery-file-upload-doesnt-work-with-asp-net-core-razor-pages](https://stackoverflow.com/questions/56905302/solved-blueimp-jquery-file-upload-doesnt-work-with-asp-net-core-razor-pages) Razor Pages

### Plupload

[https://www.plupload.com/](https://www.plupload.com/)

Great example [https://github.com/jayarjo/plupload-demos/blob/master/README.md](https://github.com/jayarjo/plupload-demos/blob/master/README.md) the UI Widget [here on jsfiddle](http://jsfiddle.net/gh/get/jquery/1.9.1/dependencies/ui/jayarjo/plupload-demos/tree/master/2.x/ui/bundled)

Not much seems to have been done over the last 5 years.

Tried examples but couldn't get easily to work.


### Resumable.js

Firefox 4+ and Chrome 11+

From the guys [https://github.com/23/resumable.js](https://github.com/23/resumable.js) at 23.

### Syncfusion
[https://www.syncfusion.com/aspnet-core-ui-controls/file-upload](https://www.syncfusion.com/aspnet-core-ui-controls/file-upload)

[https://www.syncfusion.com/sales/speciallicensingprograms](https://www.syncfusion.com/sales/speciallicensingprograms) - possible open source license

### Telerik

[https://docs.telerik.com/aspnet-core/html-helpers/editors/upload/chunk-upload](https://docs.telerik.com/aspnet-core/html-helpers/editors/upload/chunk-upload) 


### Devexpress

[https://demos.devexpress.com/ASPNetCore/Demo/FileUploader/ChunkUploading/](https://demos.devexpress.com/ASPNetCore/Demo/FileUploader/ChunkUploading/)