---
layout: post
title: SendGrid Unsupported Media Type 415 
description: UnsupportedMediaType - Http Status Code of 415 trying to send an email from a Linux box to SendGrid using their API. 
#menu: review
categories: Email Bash 
published: true 
comments: true     
sitemap: true
image: /assets/2020-11-01/control.jpg
---

[![alt text](/assets/2020-11-01/control.jpg "Control tower from @marcuszymer on Unsplash")](https://unsplash.com/@marcuszymmer)

UnsupportedMediaType - Http Status Code of 415 trying to send an email from a Linux box to SendGrid using their API. 

But it worked on Windows, so what gives?

[The HTTP 415 Unsupported Media Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415) client error response code indicates that the server refuses to accept the request because the payload format is in an unsupported format. The format problem might be due to the request's indicated Content-Type or Content-Encoding , or as a result of inspecting the data directly.

## Control Character

After some digging around with this code: 

```cs
 Log.Information("Linux looking for apikey for sendgrid");
 // https://stackoverflow.com/a/15259355/26086
 var thing = await System.IO.File.ReadAllTextAsync(filepath + "/secrets/sendgrid-passwordpostgres.txt");

 // Control character \U000A found in position 69.
 // LF
 for (int ctr = 0; ctr < thing.Length; ctr++)
 {
     if (char.IsControl(thing, ctr))
         Log.Information("Control character \\U{0} found in position {1}.",
             Convert.ToInt32(thing[ctr]).ToString("X4"), ctr);
 } 
                
 // This got rid of the \n at the end
 apiKey = new string(thing.Where(c => !char.IsControl(c)).ToArray());
```

Turns out when I was writing out my api key using bash echo was inserting the linefeed:

```bash
  # this is replaced when infra.azcli is run
  # we don't want a linefeed at the end (echo does by default)
  #- echo "{{SENDGRID_API_KEY}}" > sendgrid-passwordpostgres.txt
  - printf "{{SENDGRID_API_KEY}}" > sendgrid-passwordpostgres.txt
```

So using `printf` was a better was to write out my key from bash.




