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



