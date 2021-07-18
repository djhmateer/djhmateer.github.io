---
layout: post
title:  SSH.NET
description: 
menu: review
categories: SSH 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

[https://github.com/sshnet/SSH.NET/](https://github.com/sshnet/SSH.NET/)

[https://github.com/djhmateer/console-app-ssh](https://github.com/djhmateer/console-app-ssh) for demo code from this article.

- SSH to a linux VM from C#
- SFTP files to and from a linux VM
- Stream stdout back to C# so can view what is happening

## SSH to a linux vm

```cs
using Renci.SshNet;

var host = $"webfacesearchgpu123.westeurope.cloudapp.azure.com";
var username = "dave";
var password = "secret";

// 1.run a command and get stdout back
using var client = new SshClient(host, username, password);
client.Connect();
// stderr is &2
var cmd = client.CreateCommand("echo 12345; echo 654321 >&2");
var result = cmd.Execute();
Console.Write($"stdout: {result}");

var reader = new StreamReader(cmd.ExtendedOutputStream);
var stderr = reader.ReadToEnd();
Console.Write($"stderr: {stderr}");

client.Disconnect();
```

## SFTP files to vm ie Upload

Upload a file to the remote vm:

```cs
var fileName = "lots-of-images.zip";
var localFilePath = $@"c:\temp\{fileName}";
//var remoteFilePath = "/tmp/test.txt";
var remoteFilePath = $@"/home/dave/facesearch/facesearch_cloud/{fileName}";
using var client = new SftpClient(host, username, password);
try
{
    client.Connect();
    using var s = File.OpenRead(localFilePath);
    // there is an Async BeginUploadFile
    // explore https://github.com/sshnet/SSH.NET/tree/develop/src/Renci.SshNet.Tests/Classes
    client.UploadFile(s, remoteFilePath);
}
catch (SshOperationTimeoutException ex)
{
    var message = $"SshOperationTimeoutException in sftp {ex}";
    Log.Error(ex, "SshOperationTimeoutException in sftp");
    await Task.Delay(5000, cancellationToken);
}
catch (SocketException ex)
{
    var message = $"SocketException in sftp {ex}";
    Log.Error(ex, "SocketException in sftp");
    await Task.Delay(5000, cancellationToken);
}
catch (Exception ex)
{
    Console.WriteLine(ex);
}
finally
{
    client.Disconnect();
}
```

My vm takes longer than 30s to come up, so I'm catching the timeout and have retry logic

[https://github.com/Azure/azure-cli/issues/5275](https://github.com/Azure/azure-cli/issues/5275) there is talk about a raw vm copy which would be nice.

## Sftp files from vm ie Download

```cs
 using var sftp = new SftpClient(host, username, password);
 try
 {
     sftp.Connect();

     //var remoteDirectory = "/tmp";
     // view remote files
     //var files = sftp.ListDirectory(remoteDirectory);
     //foreach (var file in files)
     //{
     //    Console.WriteLine(file.Name);
     //}

     // download file from remote
     string pathRemoteFile = "/tmp/myScript.txt";

     // Path where the file should be saved once downloaded (locally)
     string pathLocalFile = @"c:\temp\myScript.txt";
     using (Stream fileStream = File.OpenWrite(pathLocalFile))
     {
         sftp.DownloadFile(pathRemoteFile, fileStream);
     }
 }
 catch (Exception e)
 {
     Log.Error(e, "Exception in SFTP download");
 }
 finally
 {
     sftp.Disconnect();
 }

```

## Stream results back from an SSH session

```cs
using var client = new SshClient(host, username, password);
client.Connect();
using var shellStream = client.CreateShellStream("Tail", 0, 0, 0, 0, 1024);
shellStream.DataReceived += ShellDataReceived;

var prompt = $"dave@osrfacesearchgpu{number}vm:~$";
var promptFS = $"dave@osrfacesearchgpu{number}vm:~/facesearch$";

// make sure the prompt is there - regex not working yet?
//var output = shellStream.Expect(new Regex(@"[$>]"));
var output = shellStream.Expect(prompt);

shellStream.WriteLine("cd facesearch");
shellStream.Expect(promptFS);

shellStream.WriteLine("./facesearch.py");
shellStream.Expect(promptFS);

client.Disconnect();

static void ShellDataReceived(object sender, Renci.SshNet.Common.ShellDataEventArgs e)
{
  Console.Write(Encoding.UTF8.GetString(e.Data));
}
```

Showing the concept of streaming the VM's stdout back to C#. Also waiting (Expecting) for something to happen ie a command prompt before sending a command to the vm.

## Timeouts and Exceptions and Async

Notice the keepaliveinternal below. For long running jobs I was noticing in the syslog on the target machine an entry like:

`session-4.scope succeeded`

To stop this happening put in the keepalive

```cs
 using var client = new SshClient(host, username, password);
// need this otherwise will timeout after 10 minutes or so
client.KeepAliveInterval = TimeSpan.FromMinutes(1);
try
{
    client.Connect();
    //using var shellStream = client.CreateShellStream("Tail", 0, 0, 0, 0, 1024);
    using var shellStream = client.CreateShellStream("Tail", 0, 0, 0, 0, 1024);
    var counter = 0;
    shellStream.DataReceived += async (o, e) =>
    {
        try
        {
            var responseFromVm = Encoding.UTF8.GetString(e.Data);
            if (responseFromVm.Trim() == "") return;

            Log.Information(responseFromVm);
            // any errors in here would not be caught in the global exception handler
            // too much at the end.. brought the app down.
            //try
            //{
            //    await Db.InsertLog(connectionString, jobId, responseFromVm);
            //}
            //catch (SqlException ex)
            //{
            //    Log.Warning(ex, "SQL Exception");
            //}

            //await writer.WriteAsync(DateTime.Now + $" c: {counter} " + responseFromVm, cancellationToken);
            // maybe we should wait for the writer in case it is full?
            // **DONT DO THIS**
            await writer.WriteAsync(DateTime.Now + $" c: {counter} " + responseFromVm, cancellationToken);
            counter++;
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error in datareceived...pausing for 1sec");

            // no idea why sometimes get lots of errors
            // try a pause?
            await Task.Delay(1000, cancellationToken);
        }
    };

```

** NOT THIS**
Notice also the try/catch inside the DataReceived lambda. I noticed that exceptions were not caught in the outer try catch, but I think are now being caught here okay. This seems interesting and needs further investigation.

[https://github.com/sshnet/SSH.NET/tree/develop/src/Renci.SshNet.Tests](https://github.com/sshnet/SSH.NET/tree/develop/src/Renci.SshNet.Tests) dig here for more examples.

This await in the lambda expression doesn't make sense. Making the state machine when I didn't need one, and many events coming back was causing the app to crash out.


<!-- [![Bitcoin logo](/assets/2021-07-18/crash.jpg "crash"){:width="800px"}](/assets/2021-07-18/crash.jpg) -->
[![Bitcoin logo](/assets/2021-07-18/crash.jpg "crash")](/assets/2021-07-18/crash_full.jpg)


[https://stackoverflow.com/questions/12451609/how-to-await-raising-an-eventhandler-event](https://stackoverflow.com/questions/12451609/how-to-await-raising-an-eventhandler-event)