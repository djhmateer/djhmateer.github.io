---
layout: post
title: Line Endings ignore in Git 
description: Working in a Windows project with bash shell scripts needs care taken to make line endings consistent 
#menu: review
categories: Git
published: true 
comments: true     
sitemap: true
image: /assets/2020-01-09/1.png
---

![alt text](/assets/2020-01-09/1.png "Git line endings"){:width="400px"}  

My favoured option is the third one *Checkout as-is, commit as-is*

I use Bash shell `.sh` scripts in my Windows projects to automate [Infrastructure as Code](/2020/01/09/Publishing-ASP-NET-Core-3-App-to-Ubuntu), then run these scripts using [Windows Subsystem for Linux - WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

I need to make sure the line endings of my Bash scripts are in the Unix style `LF or \n` and not Windows `CFLF or \r\n`

## Use Sed to fix line endings

In Bash on WSL use [Sed](https://www.geeksforgeeks.org/sed-command-in-linux-unix-with-examples/) to change all line endings to Unix style LF in all .sh files

```bash
sed -i 's/\r$//' *.sh
```

This is quick way to get things working, however it is worth the time taken to make sure you fix these properly in Git across all your machines.

## Set Global Config in Git

If you are not sure what setting you pressed when installing Git for Windows (the screen show in the image above):

```bash
# View current settings
git config --global --edit

# Change to not perform any conversions
git config --global core.autocrlf false
```

[More detail in this Stack Overflow answer](https://stackoverflow.com/a/10419350/26086)

## Set in repository .gitattributes

A repository level text will override a global autocrlf

```bash
# Set default behavior to automatically normalize line endings.
* text=auto
# Bash shell scripts must keep unix line endings
/infra/* text eol=lf
```

[More detail in this Stack Overflow answer](https://stackoverflow.com/a/25653519/26086) and [Edward Thmomson discussion in more detail](https://www.edwardthomson.com/blog/git_for_windows_line_endings.html)  

It has taken me a long frustrating time to get around to understanding line endings in cross platform projects!
