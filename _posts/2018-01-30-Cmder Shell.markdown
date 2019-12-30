---
layout: post
title:  Cmder
description: Cmder is my shell of choice - here is how I use it daily and the tweaks I've used over the years
#menu: review
categories: Cmder Curl
published: true 
comments: true
redirect_from: cmder/2018/01/30/Cmder-Shell.html 
sitemap: true
---
[Cmder](http://cmder.net/) is my shell of choice, [and you can download the latest relase from Github](https://github.com/cmderdev/cmder/releases). To update it you simply overwrite the files with the latest versions in the cmder directory.

![ps](/assets/2018-01-30/5.jpg)

Top left window is my blog, top right is my current project. Bottom left is a WSL running Ubuntu where I run bash scripts using the Azure CLI. Bottom right is my scratch shell - commonly used for `ssh` into Linux VMs.

## Where to Install

![ps](/assets/2018-01-30/6.jpg)  

I install in `C:\sharedTools\cmder` (I use cmder full instead of cmder_mini - but both are fine). I then source control this folder and use across my work machine, home laptop and home desktop. [OpenVSSolution is discussed here and I use all the time!](/2018/11/14/Open-visual-studio-from-command-line), AutoHotKey script [is for binding Caps Lock key to the escape key for Vim](/2018/04/10/Autohotkey)

## Aliases

The Nov 2017 release fixes issue that aliases don't work without the legacy console enabled in Win10.

Update the file `C:\sharedTools\cmder\config\user-aliases.cmd`

Here are my favourite aliases

```bat
;= REM p(ush) - add everything, commit everything and push
p=git add . & git commit -m "auto commit" & git push

;= REM git pull
gp=git pull

;= REM m(message) - use this instead of p(push) so can have better commit messages
m=git add . & git commit -m "$*" & git push

;= REM g(it) (l)og - view the commit log nicely
gl=git log --oneline --all --graph --decorate  $*

gs=git status

;= REM parts of the filesystem I use a lot
cdd = cd c:\dev
cdl = cd c:\dev\test
cdj = cd c:\dev\test\brokenlink

;= REM nicely show a file list
ls=ls -lat --show-control-chars -F --color $*

;= REM windows explorer!
e=explorer .

;= REM vs code!
c=code .

clear=cls

;= REM Docker
du = docker-compose up
dup = docker-compose up -d
dd = docker-compose down

;= get rid of any cachedf containers, images, networks and volumes
ddel = docker container prune -f $t docker image prune -af $t docker network prune -f $t docker volume prune -f

;= REM cmder
history=cat -n "%CMDER_ROOT%\config\.history"
unalias=alias /d $1
cmderr=cd /d "%CMDER_ROOT%"
```

## Set Starup Directory

![ps](/assets/2018-01-30/startup.png)

Don't type it in - press the Startup dir which does it for you

## Set Font

![ps](/assets/2018-01-30/7.jpg)

I prefer Consolas 14.

## Git prompt

The Git prompt shows you if there are

![ps](/assets/2018-01-30/3.jpg)

- No changes (white)
- Master branch
- Origin remote

![ps](/assets/2018-01-30/2.jpg)

- Outstanding changes to be committed (yellow italic)

![ps](/assets/2018-01-30/1.jpg)  

- NPM package.json version

The `tachyons@4.11.2` points to the [npm package.json file](https://nodejs.org/en/knowledge/getting-started/npm/what-is-the-file-package-json/)

## Split the Window

![ps](/assets/2018-01-30/split.png)
Very nice to split the screen

## Only show 1 active window in the taskbar

![ps](/assets/2018-01-30/active.png)

Settings (Win Alt P)

## Keyboard shortcuts

Shift Insert - pastes multi line

## Curl

Such a useful tool: 
[run curl from windows](https://superuser.com/questions/134685/run-curl-commands-from-windows-console)  

Essentially download from [here](https://curl.haxx.se/download.html#Win32)

![ps](/assets/2018-04-23/curl.png)  

Then copy curl.exe, libcurl.dll and the .crt file into c:\sharedTools

```bash
:: check for 301 redirect **use this**
curl http://www.qnrl.com -i

:: check for https, and ignore the cert
curl https://www.qnrl.com -i -k

:: check for redirect to www ignoring the cert
curl https://qnrl.com -k

:: just show header information and not html **does not do a GET - uses HEAD**
curl https://www.qnrl.com -I

:: just gives the code eg 302 [https://superuser.com/a/442395/12214](https://superuser.com/a/442395/12214)
curl -s -o /dev/null -w "%{http_code}" https://www.onenote.com
```
