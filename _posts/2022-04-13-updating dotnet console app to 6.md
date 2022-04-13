---
layout: post
#title: Python - Bellingcat auto-archiver
# description: Download vs View a PDF or Image from .NET6 Razor Pages with source code
menu: review
categories: C#
published: true 
comments: false     
sitemap: true
image: /assets/2022-03-10/view.jpg 
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->

[https://github.com/djhmateer/OpenVSSolution](https://github.com/djhmateer/OpenVSSolution) is a small utility of mine which opens visual studio from the command shell looking for a `.sln` file in the current directory. 

It was written in .NET Core 2, then 3.1, and now lets upgrade to 6.

## File Scoped Namespace

Using R# to suggest refactoring. [MS Docs](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-10.0/file-scoped-namespaces)

```cs
// before
namespace OpenVSSolution
{
    class Program
    {
        static void Main()
        {
            var currentPath = Directory.GetCurrentDirectory();
```

then:

```cs
// after
namespace OpenVSSolution;

class Program
{
    static void Main()
    {
        var currentPath = Directory.GetCurrentDirectory();

```

## Implicit Namespace


## Implicit Usings

I spun up a new .NET 6 console app to see the `.csproj` file

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <!--<RuntimeIdentifiers>win10-x64</RuntimeIdentifiers>-->
    <TargetFramework>net6.0</TargetFramework>
    <AssemblyName>d</AssemblyName>
    <!--<PublishTrimmed>true</PublishTrimmed>-->
    <!-- added these to use new features -->
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>
```

then my usings went from

```cs
// old
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;

// new
using System.Diagnostics;
```

## Top level statements

[Top-level statements](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

Which means the entire app is:

```c#
using System.Diagnostics;

// https://davemateer.com/coding/2018/11/08/Publish-dot-net-core-console-application.html for more information

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

This works:

```bash
# 60MB exe
dotnet publish -c Release -r win10-x64 -p:PublishSingleFile=true
```

I did get an error:

```bash
# /usr/share/dotnet/sdk/6.0.202/Sdks/Microsoft.NET.Sdk/targets/Microsoft.NET.Sdk.targets(1110,5): warning NETSDK1179: One of '--self-contained' or '--no-self-contained' options are required when '--runtime' is used. [/mnt/c/dev/test/OpenVSSolution/OpenVSSolution/OpenVSSolution.csproj]
```

and I copied the exe into my `c:\sharedTools` directory which is in the Windows path.