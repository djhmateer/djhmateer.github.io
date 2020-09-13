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

- Set default terminal to Ubuntu
- Set fontsize smaller
- Set starting directory 

todo
  put in all my handy shortcuts I use in cmder?
  launch terminal from launchy?

https://youtubewithsubtitle.inadram.com/posts/NCRHRvf7hmg/

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



```

