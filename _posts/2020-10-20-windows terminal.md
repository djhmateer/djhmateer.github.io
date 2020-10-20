---
layout: post
title: Windows Terminal 
description: 
menu: review
categories: shell 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- ![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"} -->

[Scott Hanselman on YouTube .NET Oxford - Terminals](https://www.youtube.com/watch?v=B4VYjxzx2us&feature=emb_logo) was where I first saw the new [Windows Terminal](https://github.com/microsoft/terminal) with Ubuntu.

I've since stated using it for:

- [AZ CLI IaaS](/2020/01/09/Publishing-ASP-NET-Core-3-App-to-Ubuntu) deployments
- SSH'ing into VM's as the rendering is better, and copy and paste works
- [Running Jekyll](/2020/10/20/running-jekyll-on-wsl2) instead of using docker

It works just fine. For Windows side terminal I'm still on [cmder](https://cmder.net/) for now as I've got nice shortcuts setup and it works.

## Configuring

<!-- ![alt text](/assets/2020-10-20/termianl.jpg "Terminal settings"){:width="600px"} -->
Here is where you can edit the settings:

![alt text](/assets/2020-10-20/terminal.jpg "Terminal settings")

- Set default terminal to Ubuntu

```yml
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "defaultProfile": "{2c4de342-38b7-51cf-b940-2309a097f518}",
    "confirmCloseAllTabs": false,
```

 and further down

- Set fontsize smaller
- Set starting directory 

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

I use [launchy]() and to get it to be able to open UWP apps:

```bash
# Drop into windows explorer address bar to open UWP applications
%windir%\explorer.exe shell:::{4234d49b-0245-4df3-b780-3893943456e1} 

# view details, sort by long name (screenshot below)

# right click create shortcut

# put in c:/sharedTools/links  and updated catalog in launchy to *.lnk
```

![alt text](/assets/2020-09-13/uwp-apps.jpg "Finding UWP apps"){:width="600px"}

## Aliases .bashrc

Create this file using `sudo vim ~/.bash_aliases`

```bash
alias cdd='cd ~/djhmateer.github.io'
alias cdl='cd /mnt/c/dev/test'

# alias p='git add . & git commit -m "auto commit" & git push'
alias p='git add .'

#alias ls='ls -lat'
alias gs='git status'

alias e='explorer.exe .'

alias c='code.exe .'

alias js='bundle exec jekyll serve force_polling --livereload --unpublished'
```

Restart the terminal for the changes to take effect.

