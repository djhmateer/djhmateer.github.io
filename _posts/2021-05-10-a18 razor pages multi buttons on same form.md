---
layout: post
title: 18 Razor Pages multiple buttons on the same form post
description: 
menu: review
categories: Form 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---


<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

```html
<form id="frm-report" asp-page-handler="report" method="post">

<input class="btn --secondary" type="submit" name="command" value="Send CSV to email" />
<input class="btn --primary" type="submit" name="command" value="Download CSV Report" />

</form>
```


```cs
public async Task<IActionResult> OnPostReportAsync(string command)
{
    if (command == "Send CSV to email")
    {

    }
    else if (command = "Download CSV Report")
    {

    }
}

```