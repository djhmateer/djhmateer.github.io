---
layout: post
title: Download vs View a PDF or Image from .NET6 Razor Pages 
description: Download vs View a PDF or Image from .NET6 Razor Pages with source code
# menu: review
categories: .net 
published: true 
comments: false     
sitemap: true
image: /assets/2022-03-10/view.jpg 
---

Lets imagine we have a [sample pdf](http://www.africau.edu/images/default/sample.pdf), I've got a .NET6 razor pages application and I want to check security before allowing the user to download or view the pdf.

<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
[![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg)

PDF is downloading - I want to view it.

[![alt text](/assets/2022-03-10/view.jpg "desktop")](/assets/2022-03-10/view.jpg)

It works!

[Source code image-download-test](https://github.com/djhmateer/image-download-test)

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

The same concept works for `image/jpeg` and `image.png`.

I use `application/octet-stream` which is a binary file, to download a zip file (not to view!)
