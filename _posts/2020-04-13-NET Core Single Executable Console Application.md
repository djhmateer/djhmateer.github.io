---
layout: post
title: NET Core Single Executable Console Application 
description: How to create a single small .NET Core 3.1 executable.
#menu: review
categories: C# 
published: true 
comments: true     
sitemap: true
image: /assets/2020-04-10/forget_me_not.jpg
---

![alt text](/assets/2020-04-10/forget_me_not.jpg "Small .NET Core exe"){:width="500"}  

I have a simple .NET Core Console Application

We can now make a single .EXE runnable Console Application file in .NET Core 3

Whooooo!!!

![alt text](/assets/2020-04-10/dotnetcore_console_application.jpg ".NET Core Console Application"){:width="742px"}  

Here is my [Open Source project which looks in your current directory and opens up the .sln file in Visual Studio](https://github.com/djhmateer/OpenVSSolution). It is a tool I use every day [for the last few years](/2018/11/14/Open-visual-studio-from-command-line)

Lets bring it up to the [latest version of .NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core) and just have a single .exe file to distribute. (handy check to see what version of .NET Core you've got installed `dotnet --version`)

## Single File Executable

[From MS Docs](https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-core-3-0#single-file-executables) if you run the following command you'll get a single exe.

```bash
dotnet publish -c Release -r win10-x64 -p:PublishSingleFile=true
```

![alt text](/assets/2020-04-10/single_file_exe.jpg "Single file exe"){:width="600px"}  

Wow this is a large exe for essentially a very simple app, lets make it smaller:

## Assembly Linking to make smaller

[Assembly linking docs - add in PublishedTrimmed](https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-core-3-0#single-file-executables)

```xml
<PropertyGroup>
  <OutputType>Exe</OutputType>
  <RuntimeIdentifiers>win10-x64</RuntimeIdentifiers>
  <TargetFramework>netcoreapp3.1</TargetFramework>
  <AssemblyName>d</AssemblyName>
  <PublishTrimmed>true</PublishTrimmed>
</PropertyGroup>
```

Lets run publish again and see if the trimmed exe is smaller:

```bash
dotnet publish -c Release -r win10-x64 -p:PublishSingleFile=true
```

![alt text](/assets/2020-04-10/single_file_exe_smaller.jpg "Smaller exe"){:width="600px"}  

Better!

[Scott Hanselman has a good post on this](https://www.hanselman.com/blog/MakingATinyNETCore30EntirelySelfcontainedSingleExecutable.aspx) but I couldn't get it working as he did with all config in the .csproj file.

## 4th July 2020 Update

After a strange error that I'm not sure why happened:

"An assembly specified in the application dependencies manifest (d.deps.json) was not found:
    package: 'runtimepack.Microsoft.NETCore.App.Runtime.win-x64', version: '3.1.3'
    path: 'Microsoft.Win32.Registry.dll'"

I recompiled the solution again using VS tooling which is nice:

![alt text](/assets/2020-04-10/vs-publish.jpg "Publish from VS"){:width="600px"}  

## Conclusion

It makes me very happy to be able to distribute a single .exe again for my console apps.
