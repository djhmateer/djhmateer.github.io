---
layout: post
title: Updating Open Visual Studio utility to .NET 6 
description: A small utility which opens visual studio from the command shell looking for a `.sln` file in the current directory. Updating to .NET6
# menu: review
categories: C#
published: true 
comments: false     
sitemap: true
image: /assets/2022-04-13/sc.jpg
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->

[OpenVSSolution](https://github.com/djhmateer/OpenVSSolution) is a small utility of mine which opens Visual Studio:

[![alt text](/assets/2022-04-13/sc.jpg "desktop")](/assets/2022-04-13/sc.jpg)

Type `d` short for `devenv` into shell which opens Visual Studio with the `sln` file in the current directory.

It was written in [2018](/2018/11/14/Open-visual-studio-from-command-line) in .NET Core 2, then [3.1](/2020/04/13/NET-Core-Single-Executable-Console-Application) in 2020, and now lets upgrade to 6 in 2022!


## Top level statements

[Top-level statements](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements) are great in getting rid on boilerplate code.  The entire app is now:

```c#
using System.Diagnostics;

var currentPath = Directory.GetCurrentDirectory();

// To debug a certain sln file hard code in the path to test
//var currentPath = @"c:\dev\test\dm-restaurant";

// Get the most recently accessed solution file or return null if none
var slnFile = new DirectoryInfo(currentPath).GetFiles()
    .Where(x => x.Extension == ".sln")
    .OrderBy(x => x.LastAccessTimeUtc)
    .FirstOrDefault();
if (slnFile == null)
{
    Console.WriteLine("No .sln file found");
    return;
}

// Prefer VS2022, VS2019 then VS2017
var devEnvPath = @"C:\Program Files\Microsoft Visual Studio\";
if (Directory.Exists(devEnvPath))
{
    // VS2022 is x64 only
    var vsDirectoryVersion64 = new DirectoryInfo(devEnvPath).GetDirectories();
    if (vsDirectoryVersion64.Any(x => x.Name == "2022"))
    {
        devEnvPath += @"2022\";
    }
}
else
{
    // x86
    devEnvPath = @"C:\Program Files (x86)\Microsoft Visual Studio\";
    var vsDirectoryVersion = new DirectoryInfo(devEnvPath).GetDirectories();
    if (vsDirectoryVersion.Any(x => x.Name == "2019"))
        devEnvPath += @"2019\";
    else if (vsDirectoryVersion.Any(x => x.Name == "2017"))
        devEnvPath += @"2017\";
    else
    {
        Console.WriteLine(
            $"Neither Visual Studio Community, Professional nor Enterprise can be found");
        return;
    }
}


var vsDirectory = new DirectoryInfo(devEnvPath).GetDirectories();
if (vsDirectory.Any(x => x.Name == "Community"))
    devEnvPath += @"Community\Common7\IDE\";
else if (vsDirectory.Any(x => x.Name == "Professional"))
    devEnvPath += @"Professional\Common7\IDE\";
else if (vsDirectory.Any(x => x.Name == "Enterprise"))
    devEnvPath += @"Enterprise\Common7\IDE\";
else
{
    Console.WriteLine(
        $"Neither Visual Studio Community, Professional nor Enterprise can be found in {devEnvPath}");
    return;
}

// Call VS in a new process and return to the shell
Console.WriteLine($"{slnFile.Name,-20} : Opening this file! ");
var proc = new Process();
proc.StartInfo.FileName = devEnvPath + "devenv";

// Enclose single argument in "" if file path or sln name includes a space
var arguments = "\"" + currentPath + @"\" + slnFile.Name + "\"";

proc.StartInfo.Arguments = arguments;
proc.Start();
```

## Deployment

[Single file deployment](https://docs.microsoft.com/en-us/dotnet/core/deploying/single-file/overview) you can use the GUI or CLI 

[![alt text](/assets/2022-04-13/set.jpg "desktop")](/assets/2022-04-13/set.jpg)

I used these settings to get a 14.5MB file which runs fast.

The command line switches are something like below, but the GUI was good enough for now.

```bash
# 60MB exe
dotnet publish -c Release -r win-x64 -p:PublishSingleFile=true
```

and I copied the exe into my `c:\sharedTools` directory which is in the Windows path.