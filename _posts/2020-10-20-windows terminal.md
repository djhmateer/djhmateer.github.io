---
layout: post
title: Windows Terminal 
description: Running the new Windows Terminal and customising it using aliases
#menu: review
categories: Terminal 
published: true 
comments: true     
sitemap: true 
image: /assets/2020-10-19/term.jpg
---

<!-- ![alt text](/assets/2020-10-19/term.jpg "terminal screenshot"){:width="600px"} -->
![alt text](/assets/2020-10-19/term.jpg "terminal screenshot")

## Update 20th April 2022

My Ubuntu 18.04 instance had an issue with apt where it wasn't udpating properly

```bash
apt update
apt upgrade
# something broken with apt and not updating
# dpkg: error processing archive libpython3.9-minimal_3.9.12-1+bionic2_amd64.deb

# didn't work fixing the broken install
sudo apt -f install
```

Installed Ubuntu 20.04 on wsl using Windows Store.

Using WSL Terminal, Settings. Can set the default instance now to 20.04 in the json file.

Font Size 9

Solarized Dark

Starting directory not working yet [discussion](https://github.com/microsoft/WSL/issues/6995)

Create .bashrc like below.



## Intro

My Windows terminal running an alias `js` which is Jekyll Serve which starts up my blog locally.

[Scott Hanselman on YouTube .NET Oxford - Terminals](https://www.youtube.com/watch?v=B4VYjxzx2us&feature=emb_logo) was where I first saw the new [Windows Terminal](https://github.com/microsoft/terminal) with Ubuntu.

I've since stated using it for:

- [AZ CLI IaaS](/2020/01/09/Publishing-ASP-NET-Core-3-App-to-Ubuntu) deployments
- SSH'ing into VM's as the rendering is better, and copy and paste works
- [Running Jekyll](/2020/10/20/running-jekyll-on-wsl2) instead of using docker

It works just fine. For Windows side terminal I'm still on [cmder](https://cmder.net/) for now as I've got nice shortcuts setup and it works.

## Configuring

<!-- ![alt text](/assets/2020-10-20/termianl.jpg "Terminal settings"){:width="600px"} -->
Here is where you can edit the settings:

![alt text](/assets/2020-10-19/terminal.jpg "Terminal settings")

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
- Bashtop renders properly.

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

## Aliases .bashrc (.bash_aliases)

Create this file using `sudo vim ~/.bash_aliases`

```bash
alias cdd='cd ~/djhmateer.github.io'
alias cdl='cd /mnt/c/dev/test'

alias p='git add . && git commit -m "auto" && git push'
alias gs='git status'
alias gp='git pull'

# default colours are not good for me (green backgrounds for directories)
alias ls='ls -lat --color=auto'

alias e='explorer.exe .'
alias c='code .'

alias js='bundle exec jekyll serve --livereload --unpublished'
alias jsi='bundle exec jekyll serve --livereload --unpublished --incremental'

# https://uly.me/run-jekyll-in-background/
alias jsu='bundle exec jekyll serve --livereload --unpublished > /dev/null 2>&1 &'
alias jsui='bundle exec jekyll serve --livereload --unpublished --incremental > /dev/null 2>&1 &'

alias gj='ps -ef | grep jekyll'

alias up='sudo apt update && sudo apt upgrade -y'

alias d='/mnt/c/sharedtools/OpenVSSolution/d.exe'
```

Restart the terminal for the changes to take effect.

## Useful commands

ctrl r - Reverse search for commands types in shell

## Colours

![alt text](/assets/2020-10-19/colours.jpg "Great colours!")

[Hanselmans article](https://www.hanselman.com/blog/setting-up-a-shiny-development-environment-within-linux-on-windows-10) describes setting up [dircolors-solarized](https://github.com/seebi/dircolors-solarized) which I did.

Essentially clone the dircolors-solarized repo into your home directory, copy any of the `dircolors*` files to ~, and rename `dircolors.256dark` to `.dircolors`

## Launching Visual Studio from Linux

This is launching Visual Studio Windows side, but using the ability of WSL2 to launch Windows applications:

![alt text](/assets/2020-10-19/vs.jpg "Launch visual studio from linux")

I usually have multiple WSL2 Terminal's open all the time for:

- Navigating between different VS Solutions (quite often I'll have a few reference projects and my own one open)
- Use d.exe to [launch Visual Studio from the current directory](/2018/11/14/Open-visual-studio-from-command-line)
- p to Push doing an auto commit the current repo
- jup - Jekyyll Up Process - run my blog locally and return to command line (ie run invisibly)


## SSH Key

To generate an SSH key:

```bash
# select defaults
ssh-keygen

# ~/.ssh/id.rsa.pub
# rename to: sshkey-4790.pub
```

I take the public key and use it in my /secrets folder for projects. Even though it isn't a secret thats where I put it. I also share it between machines using OneDrive.

## Git branch and status

I'd like to have bash show my branch name and status when inside a git repo. I've not found anything I like so far, so keeping it simple for now.

## Conclusion

I'm starting to use [Windows Terminal](/2020/10/20/running-jekyll-on-wsl2) ~~more and more~~ all the time instead of my old favourite terminal [cmder](/2018/01/30/Cmder-Shell), especially for [Jekyll](/2020/10/20/running-jekyll-on-wsl2)

Give it a shot, you may like it!

