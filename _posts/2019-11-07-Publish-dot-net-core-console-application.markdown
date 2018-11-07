---
layout: post
title:  "Publish a Dot Net Core Console Application"
date:   2018-11-07 09:03
menu: review
categories: coding 
published: true 
comments: true
---

I like to drive my Windows 10 development machine from the command line [Cmder Shell](/cmder/2018/01/30/Cmder-Shell.html):

![ps](/assets/2018-11-07/3.png)

When I typed **d** (short for devenv.exe) it opened up Visual Studio and loaded the **ConsoleApp1.sln**   

How does it do this?  

It found **d.exe** in the path in c:\sharedTools\OpenVSSolution

![ps](/assets/2018-11-07/2.png)

Let's look at my OpenVSSolution:  
![ps](/assets/2018-11-07/4.png)

## What is d.exe?
It is a .NET Core Console Application with [Bitbucket Source](https://bitbucket.org/davemateer/openvssolution)

```c#
static void Main()
{
    var currentPath = Directory.GetCurrentDirectory();
    var files = new DirectoryInfo(currentPath).GetFiles().Where(x => x.Extension == ".sln");

    // where is VS - Community or Enterprise?
    var devenv = @"C:\Program Files (x86)\Microsoft Visual Studio\2017\";
    var vsversion = new DirectoryInfo(devenv).GetDirectories().Where(x => x.Name == "Community");

    var devenvpath = devenv; 
    if (vsversion.Count() == 1)
        devenvpath += @"Community\Common7\IDE\";
    else
        devenvpath += @"Enterprise\Common7\IDE\";

    foreach (var file in files)
    {
        Console.WriteLine($"{file.Name,-20} : Opening this file! "); // nice console formatting
        var proc = new Process();
        proc.StartInfo.FileName = devenvpath + "devenv";
        proc.StartInfo.Arguments = currentPath + @"\" + file.Name;
        proc.Start();
    }
}
```

## How to publish a .NET Core Console Application?
If you do:

```bash
dotnet publish -c Release -r win10-x64 
```

Where -r is the Runtime Identifier [Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish?tabs=netcore21)

It will output:  
![ps](/assets/2018-11-07/5.png)

which gives a 67MB release folder which can be copied to c:\sharedTools\OpenVSSolution  

 **THIS IS NOT GOOD**

 Try transporting to another machine and you may get:

 >   An assembly specified in the application dependencies manifest (d.deps.json) was not found:  
 >   package: 'runtime.win-x64.Microsoft.NETCore.App', version: '2.1.5'  
 >   path: 'runtimes/win-x64/lib/netcoreapp2.1/Microsoft.CSharp.dll'  

To fix you need to -o

```
dotnet publish -c Release -r win10-x64 -o c:\sharedTools\OpenVSSolution
```

This can now be shared amongst all my machines and I don't have to make sure a certain version of .NET Core is installed.

I am running VS 15.8.9. With a previous version of the build tools I had to use:




## SharedTools
I have 3 main developer machines - Work, Home and Laptop. I've got a private bitbucket repository where I keep **c:\sharedTools** synced up, and on each machine I set my path to be c:\sharedTools and a few other nested directories
