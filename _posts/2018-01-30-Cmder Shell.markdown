---
layout: post
title:  "Cmder"
date:   2018-01-30
#menu: review
categories: cmder
published: true 
---
[Cmder](http://cmder.net/) is my shell of choice. [download from github](https://github.com/cmderdev/cmder/releases)
### Where to Install
![ps](/assets/2018-01-30/c.png)
I install in C:\sharedTools\cmder_mini and have this referenced in my Path.

### Aliases
The Nov 2017 release fixes issue that aliases don't work without the legacy console enabled in Win10.

Update the file C:\sharedTools\cmder_mini\config\user-aliases.cmd

Here are my favourite aliases!

```
e=explorer .
p=git add . -A & git commit -m "auto commit" & git push
c=code .
cdd = cd c:\dev
```

### Set Starup Directory
![ps](/assets/2018-01-30/startup.png)

### Split the Window
![ps](/assets/2018-01-30/split.png)
Very nice to split the screen

### Only show 1 active window in the taskbar
![ps](/assets/2018-01-30/active.png)

Settings (Win Alt P)