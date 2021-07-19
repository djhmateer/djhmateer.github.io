---
layout: post
title: Writing to a Channel from an Event 
description: 
menu: review
categories: Email 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->


```cs
 public ChannelReader<string> Counter(string jobId, CancellationToken cancellationToken)
 {
     var channel = Channel.CreateUnbounded<string>();

     int.TryParse(jobId, out var jobIdInt);

     _ = WriteItemsAsync(channel.Writer, jobIdInt, cancellationToken);

     return channel.Reader;
 }

private async Task WriteItemsAsync(ChannelWriter<string> writer, int jobId, CancellationToken cancellationToken)
{
      Exception? localException = null;

      // Top level exception handler
      try
      {
          using var client = new SshClient(host, username, password);
          try
          {
              client.Connect();
              using var shellStream = client.CreateShellStream("Tail", 0, 0, 0, 0, 1024);

	      // Don't do this
	      //shellStream.DataReceived += async (o, e) =>
              //{
              //    Log.Information(Encoding.UTF8.GetString(e.Data));
              //    var responseFromVm = Encoding.UTF8.GetString(e.Data);
              //    if (responseFromVm.Trim() == "") return;

	      //    await writer.WriteAsync(responseFromVm, cancellationToken);
	      //};

              shellStream.DataReceived += (o, e) =>
              {
                  var responseFromVm = Encoding.UTF8.GetString(e.Data).Trim();
                  if (responseFromVm != "")
                  {
                      Log.Information(responseFromVm);

                      var result = writer.TryWrite(DateTime.Now.ToLongTimeString() + " " + responseFromVm);
                      if (!result) Log.Error("can't write to channel");
                  }
              };

          }
          // etc..
      }
      // etc..
}

```

Using async await did not work well, and every now and again I'd get a hard crash of the system which wouldn't be caught:

[![Bitcoin logo](/assets/2021-07-18/crash.jpg "crash")](/assets/2021-07-18/crash_full.jpg)

As explained here, it is not a good fit.

[https://stackoverflow.com/questions/12451609/how-to-await-raising-an-eventhandler-event](https://stackoverflow.com/questions/12451609/how-to-await-raising-an-eventhandler-event)

So I'm using a simple non async way of writing to the unbounded queue, which is behaving as expected.