---
layout: post
title:  AutoHotkey
categories: AutoHotkey
published: true 
redirect_from: autohotkey/2018/04/10/Autohotkey.html 
sitemap: true
comments: true
---

**Update 11th April 2020** I now use another tool to map CapsLock to my escape key - [OneNote with Vim](/2020/04/10/OneNote-with-Vim#map-capslock-to-escape-key)

I use [AutoHotkey](https://autohotkey.com/) to map the escape key to the caps-lock key which is useful when using Vim.  

To run the ahk script on startup of Windows 10 I used this [article](https://www.maketecheasier.com/schedule-autohotkey-startup-windows/)

Here is my script to to do the mapping, which is placed in my users Startup folder:

```bash
#caps.ahk (C:\Users\djhma\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup)

#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

#SingleInstance Force
if not A_IsAdmin
	Run *RunAs "%A_ScriptFullPath%" ; (A_AhkPath is usually optional if the script has the .ahk extension.) You would typically check  first.

Capslock::Esc
```

## Running AHK as Admin

[The script above is being forced to run as admin](https://www.autohotkey.com/boards/viewtopic.php?f=5&t=21278) as explained in this article. The reason for this is that running Visual Studio as administrator causes AHK to lose the caps lock map, so this is the workaround.
