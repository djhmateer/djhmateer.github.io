---
layout: post
title: NuGet Clearing Caches
description: Clearing out NuGet caches to be sure the solution is working
#menu: review
categories: NuGet 
published: true 
comments: true
sitemap: true
image: /assets/2020-03-01/10.jpg
---

![alt text](/assets/2020-03-01/10.jpg "packages folder"){:width="400px"}

When I'm reviewing new projects, or being really strict in checking builds I like fully delete anything cached on my local dev machine so it will emulate a fresh build server.

## Clearing the Caches

There are [3 ways to clear NuGet caches](https://stackoverflow.com/questions/30933277/how-can-i-clear-the-nuget-package-cache-using-the-command-line) that I know about

VS2019, Tools, Options, NuGet Package Manager, General, Clear all caches

Or from the command line, and these both seem to do the same thing. [NuGet CLI Download](https://www.nuget.org/downloads)

```bash
dotnet nuget locals all --clear

nuget locals all -clear
```

Which gives output:

```cmd
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

There does seem to be differences in the .NET Core solutions. See [here](https://stackoverflow.com/questions/30933277/how-can-i-clear-the-nuget-package-cache-using-the-command-line)