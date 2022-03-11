---
layout: post
title: Download vs View a PDF or Image from .NET6 Razor Pages 
description: Download vs View a PDF or Image from .NET6 Razor Pages with source code
# menu: review
categories: .NET 
published: true 
comments: false     
sitemap: true
image: /assets/2022-03-10/view.jpg 
---

Lets imagine we have a [sample pdf](http://www.africau.edu/images/default/sample.pdf), and .NET6 razor pages application and I want to check security before allowing the user to download or view the pdf.

<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
[![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg)

PDF is downloading - I want to view it.

[![alt text](/assets/2022-03-10/view.jpg "desktop")](/assets/2022-03-10/view.jpg)

It works! So lets see how to do it.  [Source code image-download-test](https://github.com/djhmateer/image-download-test)

```cs
public IActionResult OnGet()
{
    // check security here

    // virtual path (our file is outside of the virtual path so can't use this)
    //return File("/secret/sample.pdf", "application/pdf", "foo.pdf");

    var fileName = @"C:\dev\test\image-download-test\image-download-test\secret\sample.pdf";

    // 1. filestream - works as a download
    //FileStream stream = new FileStream(fileName, FileMode.Open);
    //return File(stream, "application/pdf", "foo.pdf");

    // 2. bytearray - works as a download
    //var bytes = System.IO.File.ReadAllBytes(fileName);
    //return File(bytes, "application/pdf", "foo.pdf");
    // notice constant for application types
    //return File(bytes, MediaTypeNames.Application.Pdf, "foo.pdf");

    // 3. opens pdf view 
    FileStream stream = new FileStream(fileName, FileMode.Open);
    return new FileStreamResult(stream, "application/pdf");
} 
```

The same concept works for `image/jpeg` and `image/png`. Interestingly `image/tiff` is [not supported](https://stackoverflow.com/a/2177012/26086) by most browsers anymore

I use `application/octet-stream` which is a binary file to download a zip file (not to view!). `application/zip` is more prescriptive (see below)

## Zip and Delete

```cs
// Sample code  (Db not implemented here)
// get bytes out of a db
// create a zip file
// delete source files
// return to browser as a zip then delete zip afterwards
public async Task<IActionResult> OnGetAsync()
{
    // streaming available if ever get issues with large files.
    // https://swimburger.net/blog/dotnet/create-zip-files-on-http-request-without-intermediate-files-using-aspdotnet-mvc-razor-pages-and-endpoints?utm_source=twitter&utm_medium=social

    DateTime foo = DateTime.Now;
    // create a unique folder using milliseconds
    long unixTime = ((DateTimeOffset)foo).ToUnixTimeMilliseconds();

    // create a directory eg C:\devDave\onlineportal\Portal.Web\wwwroot\generated-images\compliance\1646320579
    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\generated-images\\compliance\\" + unixTime + "\\");
    var di = Directory.CreateDirectory(path);

    var result = await Db.GetComplianceDocumentForApplicantIdAndAttributeType(proNetConn, applicantId, "Identification");
    if (result != null)
    {
        var filename = result.PersonName + result.Surname + "-Identification" + result.DocumentFileExt;
        await System.IO.File.WriteAllBytesAsync(path + filename, result.Document);
    }

    var result2 = await Db.GetComplianceDocumentForApplicantIdAndAttributeType(proNetConn, applicantId, "RightToWork");
    if (result2 != null)
    {
        var filename2 = result2.PersonName + result2.Surname + "-RightToWork" + result2.DocumentFileExt;
        await System.IO.File.WriteAllBytesAsync(path + filename2, result2.Document);
    }

    var result3 = await Db.GetComplianceDocumentForApplicantIdAndAttributeType(proNetConn, applicantId, "SkillsCard");
    if (result3 != null)
    {
        var filename3 = result3.PersonName + result3.Surname + "-SkillsCard" + result3.DocumentFileExt;
        await System.IO.File.WriteAllBytesAsync(path + filename3, result3.Document);
    }

    // create a zip file eg: C:\devDave\onlineportal\Portal.Web\wwwroot\generated-images\compliance\1646320579.zip
    // contains the 1 to 3 files above
    var compliancePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\generated-images\\compliance\\");
    var zipFileName = unixTime + ".zip";
    var zipFilePathAndName = compliancePath + zipFileName;
    ZipFile.CreateFromDirectory(path, zipFilePathAndName);

    // Delete source files
    Directory.Delete(path, true);

    // Download the zip file and delete afterwards
    // https://stackoverflow.com/a/43981710
    var fs = new FileStream(zipFilePathAndName, FileMode.Open, FileAccess.Read, FileShare.None, 4096, FileOptions.DeleteOnClose);
    return File(fileStream: fs, contentType: MediaTypeNames.Application.Zip, fileDownloadName: zipFileName);
}

```
