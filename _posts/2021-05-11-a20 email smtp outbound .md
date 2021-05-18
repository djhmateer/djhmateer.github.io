---
layout: post
title: 20 - Email SMTP Outbound 
description: 
menu: review
categories: Form 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---


<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

[https://www.learnrazorpages.com/razor-pages/forms/select-lists#creating-options](https://www.learnrazorpages.com/razor-pages/forms/select-lists#creating-options)

`System.Net.Mail.SmtpClient` - it is suggested not to use this.


[https://docs.microsoft.com/en-us/dotnet/api/system.net.mail.smtpclient?view=net-5.0#remarks](https://docs.microsoft.com/en-us/dotnet/api/system.net.mail.smtpclient?view=net-5.0#remarks)


And instead use [https://github.com/jstedfast/MailKit](https://github.com/jstedfast/MailKit)

Sending a message [https://github.com/jstedfast/MailKit#using-mailkit](https://github.com/jstedfast/MailKit#using-mailkit)

html email
[https://stackoverflow.com/questions/41160536/how-to-send-html-message-via-mimekit-mailkit](https://stackoverflow.com/questions/41160536/how-to-send-html-message-via-mimekit-mailkit)

## Papercut SMTP for Dev localhost

[https://github.com/ChangemakerStudios/Papercut-SMTP](https://github.com/ChangemakerStudios/Papercut-SMTP)

## Sending Attachments with MailKit

Here is how I send attachments:

```cs
byte[]? reportResults;

taResults = await Db.GetTimesheetAnalysisReportByProjectId(proNetConn, projectId);

await using var memoryStream = new MemoryStream();
await using var streamWriter = new StreamWriter(memoryStream);
await using var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

await csvWriter.WriteRecordsAsync(taResults.OrderByDescending(x => x.TotalGrossAmount));
await streamWriter.FlushAsync();

reportResults = memoryStream.ToArray();

if (command == "Send CSV to email")
{
    var email = new TSGEmail(
        EmailAddress: profile.Email,
        Subject: subject,
        HtmlText: htmlText,
        AttachmentByteArray: reportResults,
        AttachmentFileName: subject + ".csv"
    );

    Email.Send(emailConfiguration, email);

}
else if (command == "Download CSV Report")
{
    //https://joshclose.github.io/CsvHelper/
    //https://stackoverflow.com/questions/21093150/using-csvhelper-to-output-stream-to-browser

    var memoryStream = new MemoryStream(reportResults);
    return new FileStreamResult(memoryStream, "text/csv") { FileDownloadName = subject + ".csv" };
}

// Email.cs

