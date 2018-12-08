---
layout: post
title:  AutoHotkey
categories: AutoHotkey
published: true 
redirect_from: autohotkey/2018/04/10/Autohotkey.html 
---

I use [AutoHotkey](https://autohotkey.com/) to map the escape key to the caps-lock key which is useful when using Vim.  

To run the ahk script on startup of Windows 10 I used this [article](https://www.maketecheasier.com/schedule-autohotkey-startup-windows/) 

Here is my script to to do the mapping, which is placed in my users Startup folder:

```
#caps.ahk (C:\Users\davidma\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup)
Capslock::Esc
```
