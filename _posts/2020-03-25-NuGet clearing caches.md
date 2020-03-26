---
layout: post
title: NuGet Clearing Caches
description: 
menu: review
categories: NuGet 
published: true 
comments: false
sitemap: false
image: /assets/2020-03-01/10.jpg
---

![alt text](/assets/2020-03-01/10.jpg "packages folder"){:width="400px"}

When I'm reviewing new projects, or being really strict in checking builds I like fully delete anything cached on my local dev machine. So it will emulate a fresh build server.

## Clearing the Caches

There are [3 ways to clear NuGet caches](https://stackoverflow.com/questions/30933277/how-can-i-clear-the-nuget-package-cache-using-the-command-line)

VS2019, Tools, Options, NuGet Package Manager, General, Clear all caches

Or from the command line, and these both do the same thing.

```bash
dotnet nuget locals all --clear

nuget locals all -clear
```

Which gives output like:

```bash
Clearing NuGet HTTP cache: C:\Users\dave\AppData\Local\NuGet\v3-cache
Clearing NuGet global packages folder: C:\Users\dave\.nuget\packages\
Clearing NuGet Temp cache: C:\Users\dave\AppData\Local\Temp\NuGetScratch
Clearing NuGet plugins cache: C:\Users\dave\AppData\Local\NuGet\plugins-cache
Local resources cleared.
```

## Clearing packages folder

Even doing a Clean Solution in Visual Studio won't get rid of the packages folder in the solution.

So remember to delete `packages` in your solution (then watch inside the directory as it rebuilds)

As a side note - the `packages` folder should not be checked into source control (it is ignored in the default .NET .gitignore file)

## DotNetCore

The above was working from a .NET Framework solution using VS2019.

There does seem to be potential differences in the .NET Core solutions.

