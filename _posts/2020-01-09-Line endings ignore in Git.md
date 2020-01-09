---
layout: post
title: Line endings ignore in Git 
description: Working in a Windows project with bash shell scripts needs care taken to make line endings consistent 
menu: review
categories: Git
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/60.jpg
---

![alt text](/assets/2020-01-09/1.png "Git line endings"){:width="400px"}

I use bash scripts on Windows, so need to make sure the line endings are in Unix format ie `LF` not Windows `CFLF`

## Use Sed to fix line endings

```bash
sed -i 's/\r$//' *.sh
```

In bash on WSL use Sed to change all line endings to Unix style LF in all .sh files

## Set Global Config in Git

If you are not sure what setting you pressed when installing Git for Windows:

```bash
# View current settings
git config --global --edit

# Change to not perform and conversions
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