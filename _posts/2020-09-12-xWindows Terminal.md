---
layout: post
title: Windows Terminal 
description: 
menu: review
categories: shell 
published: false 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- ![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"} -->

[Scott Hanselman on YouTube .NET Oxford - Termminals](https://www.youtube.com/watch?v=B4VYjxzx2us&feature=emb_logo)

I'm using the new Windows Terminal 
- for Linux - specifically for doing AZ CLI deployments
- ssh'ing into VM's as the rendering is better for bashtop

It works just fine. For Windows side terminal I'm still on cmder for now.

- Set default terminal to Ubuntu
- Set fontsize smaller
- Set starting directory 

todo
  put in all my handy shortcuts I use in cmder?
  launch terminal from launchy?


```yml
    "$schema": "https://aka.ms/terminal-profiles-schema",

    "defaultProfile": "{2c4de342-38b7-51cf-b940-2309a097f518}",
    "confirmCloseAllTabs": false,
```

 and further down

 ```yml
 "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
            "hidden": false,
            "name": "Ubuntu",
            "source": "Windows.Terminal.Wsl",
            // "startingDirectory": "//wsl$/Ubuntu/mnt",
            "startingDirectory": "c:/dev/test",
            "fontSize": 9
 ```

 What I like so far:

 - Copy and paste works
 - History works ie can scroll backwards to see what happened
 - Bashtop renders properly

## Launchy

```bash
# Drop into windows explorer address bar to open UWP applications
%windir%\explorer.exe shell:::{4234d49b-0245-4df3-b780-3893943456e1} 

# view details, sort by long name (screenshot below)

# right click create shortcut

# put in c:/sharedTools/links  and updated catalog in launchy to *.lnk

```

![alt text](/assets/2020-09-13/uwp-apps.jpg "Finding UWP apps"){:width="600px"}

## Aliases .bashrc

```bash
# ~/.bash_aliases
alias cdd='cd /mnt/c/dev'
alias cdl='cd /mnt/c/dev/test'
#alias p='git add . & git commit -m "auto commit" & git push'

#alias ls='ls -lat'
alias gs='git status'

alias e='explorer.exe .'

alias c='code.exe .'
```

