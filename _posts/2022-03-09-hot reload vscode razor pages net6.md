---
layout: post
title: Hot Reload with VSCode and Razor Pages in .NET6
description: 
menu: review
categories: .net 
published: true 
comments: false     
sitemap: false
image: /assets/2022-03-09/vsc.jpg 
---

<!-- [![alt text](/assets/2022-01-25/flex.jpg "flex")](/assets/2022-01-25/flex.jpg) -->
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
[![alt text](/assets/2022-03-09/vsc.jpg "desktop")](/assets/2022-03-09/vsc.jpg)

VS2022 was causing huge performance issues on a internal corp VM with big issues. So I switched to VS Code. I love Resharper so that's the reason I've resisted VSCode for .NET.

Using a .NET6 Razor Pages project and VS Code

I found the easiest way to run Hot Reload was to not use Ctrl-F5, but to launch a terminal

```bash
# go into the Razor Pages Web project folder (usually 1 below solution level)
cd WebApp
dotnet watch

# trying to only see the errors and not warnings
# can't yet do with dotnet watch
# this seems to work
dotnet build /clp:ErrorsOnly

```

Also I turn off autosave - File menu

Had to use powershell as terminal disabled on the corp machine.

`ASPNETCORE_ENVIRONMENT` variable wasn't set in powershell, so I'm defaulting to dev environment if none set.

Hot reload is a super useful feature!
