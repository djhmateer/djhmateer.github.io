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
I install in C:\sharedTools\cmder (note I now use cmder full instead of cmder_mini - but both are fine) 

### Aliases
The Nov 2017 release fixes issue that aliases don't work without the legacy console enabled in Win10.

Update the file C:\sharedTools\cmder\config\user-aliases.cmd

Here are my favourite aliases

```
gl=git log --oneline --all --graph --decorate  $*
ls=ls -lat --show-control-chars -F --color $*
e=explorer .
p=git add . -A & git commit -m "auto commit" & git push
c=code .
cdd = cd c:\dev
k=kubectl $*
ka=KeepK8sAlive
```

### Set Starup Directory
![ps](/assets/2018-01-30/startup.png)

### Split the Window
![ps](/assets/2018-01-30/split.png)
Very nice to split the screen

### Only show 1 active window in the taskbar
![ps](/assets/2018-01-30/active.png)

Settings (Win Alt P)

### Keyboard shortcuts
Shift Insert - pastes multi line

## Curl
Such a useful tool: 
[run curl from windows](https://superuser.com/questions/134685/run-curl-commands-from-windows-console)  

Essentially download from [here](https://curl.haxx.se/download.html#Win32)

![ps](/assets/2018-04-23/curl.png)  

Then copy curl.exe, libcurl.dll and the .crt file into c:\sharedTools

```
:: check for 301 redirect
curl http://www.qnrl.com -i

:: check for https, and ignore the cert
curl https://www.qnrl.com -i -k

:: check for redirect to www ignoring the cert
curl https://qnrl.com
```

