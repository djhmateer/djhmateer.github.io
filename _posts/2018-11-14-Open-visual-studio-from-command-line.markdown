---
layout: post
title:  Open Visual Studio Solution from Command Line
categories: C# 
published: true 
comments: true
redirect_from: coding/2018/11/14/Open-visual-studio-from-command-line.html 
sitemap: true
---

I like to drive my Windows 10 development machine from the command line using the [Cmder Shell](/cmder/2018/01/30/Cmder-Shell.html):

![ps](/assets/2018-11-07/3.png)

When I type **d** (short for devenv.exe) it opens up Visual Studio and loads the **ConsoleApp1.sln**   

How does it do this?  

It found **d.exe** in the path in c:\sharedTools\OpenVSSolution

![ps](/assets/2018-11-07/2.png)

Let's look at my OpenVSSolution:  
![ps](/assets/2018-11-07/4.png)

## What is d.exe?
It is a .NET Core Console Application called [OpenVSSolution](https://github.com/djhmateer/OpenVSSolution) with a download exe link [here](https://github.com/djhmateer/OpenVSSolution/releases). **If you want to download it now and put it in the path now go for it.**


```c#
static void Main()
{
    var currentPath = Directory.GetCurrentDirectory();

    // Get the most recently accessed solution file or return null if none
    var slnfile = new DirectoryInfo(currentPath).GetFiles()
        .Where(x => x.Extension == ".sln")
        .OrderBy(x => x.LastAccessTimeUtc)
        .FirstOrDefault();
    if (slnfile == null)
    {
        Console.WriteLine("No .sln file found");
        return;
    }

    // Where is VS - Community or Enterprise?
    var devenvpath = @"C:\Program Files (x86)\Microsoft Visual Studio\2017\";
    var vsdiretory = new DirectoryInfo(devenvpath).GetDirectories();

    if (vsdiretory.Any(x => x.Name == "Community"))
        devenvpath += @"Community\Common7\IDE\";
    else if (vsdiretory.Any(x => x.Name == "Enterprise"))
        devenvpath += @"Enterprise\Common7\IDE\";
    else
    {
        Console.WriteLine($"Neither Visual Studio Community nor Enterprise can be found in {devenvpath}");
        return;
    }

    // Call VS in a new process and return to the shell
    Console.WriteLine($"{slnfile.Name,-20} : Opening this file! "); 
    var proc = new Process();
    proc.StartInfo.FileName = devenvpath + "devenv";
    proc.StartInfo.Arguments = currentPath + @"\" + slnfile.Name;
    proc.Start();
}
```
and the reason it is called d.exe is in the .csproj file I've named the assembly as d.
```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.1</TargetFramework>
    <AssemblyName>d</AssemblyName>
  </PropertyGroup>

</Project>
```

## How to Publish and Distribute a .NET Core Console Application?
If you do:

```
dotnet publish -c Release
```
[Microsoft Docs dotnet publish](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish?tabs=netcore21)

-c is for Configuration. Default is Debug.  

## Framework-dependent deployment (FDD)
You'll get a 24kb Framework-dependent deployment (FDD) [Microsoft .NET Core Application Deployment](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish?tabs=netcore21) which you can run from the command line with `dotnet d.dll`  

You don't have to target the operating system - so this dll can run on Linux as well.  

## Self-contained deployment (SCD)
Let's target only the Windows platform:

```bash
dotnet publish -c Release -r win10-x64 
```
The -r is the Runtime Identifier [Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish?tabs=netcore21)

It will output:  
![ps](/assets/2018-11-07/a10.png)  
~~So here is the .exe~~ **No it isn't** - see below

...you deploy your app and any required third-party dependencies along with the version of .NET Core that you used to build the app. [Microsoft .NET Core Application Deployment](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish?tabs=netcore21) 

This doesn't include any [native dependencies](https://github.com/dotnet/core/blob/master/Documentation/prereqs.md) but they are included from Win7SP1 and above on Windows.

This is a Self-contained deployment (SCD) This looks like it should work as there is an .exe and a publish folder with the version of .NET Core in the publish directory.

On Windows this gives a 67MB release folder which looks like it should be able to be copied and distributed.

However..   
## Assembly specified in the application dependencies manifest (d.deps.json) was not found
 Try transporting to another machine and you may get:

 >   An assembly specified in the application dependencies manifest (d.deps.json) was not found:  
 >   package: 'runtime.win-x64.Microsoft.NETCore.App', version: '2.1.5'  
 >   path: 'runtimes/win-x64/lib/netcoreapp2.1/Microsoft.CSharp.dll'  

## Go into the publish directory
![ps](/assets/2018-11-07/a11.png)  


This can now be shared amongst all my machines and I don't have to make sure a certain version of .NET Core is installed.

## Update 16th Nov 2018
Some more interesting comments on this article are on the [reddit question](https://redd.it/9xa13n) and related [stackoverflow](https://stackoverflow.com/questions/973561/starting-visual-studio-from-a-command-prompt/53299917)

## Update 5th Apr 2019
Code now looks for a VS2019 install and prefers that over a VS2017 install.  