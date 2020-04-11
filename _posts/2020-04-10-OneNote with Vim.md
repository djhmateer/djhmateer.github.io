---
layout: post
title: OneNote with Vim 
description: OneNote with Vim bindings is giving me great joy! Here I describe how I've set it up with vim_ahk Autohotkey scripts on Windows.
#menu: review
categories: OneNote Vim 
published: true 
comments: true     
sitemap: true
image: /assets/2020-04-10/2.jpg
---

![alt text](/assets/2020-04-10/2.jpg "OneNote with Vim"){:width="600px"}

I've used [Vim](https://www.vim.org/) in anger for 3 years (here are my [favourite commands so far](/2018/02/21/VIM)). I never use Vim the editor, but the implementations for [Vim for VSCode](https://github.com/VSCodeVim/Vim) and [Vim plugin for Visual Studio](https://github.com/VsVim/VsVim), and now OneNote!!!!

The subject of [What are the benefits of using Vim](https://stackoverflow.com/questions/597077/what-are-the-benefits-of-learning-vim) is fascinating. There is [a lot of stuff out there including this fun looking book](https://www.barbarianmeetscoding.com/boost-your-coding-fu-with-vscode-and-vim/introduction/)

> Some things give you inexplicable joy. Being able to edit text well is one. Chocolate is the another!

## OneNote

I use OneNote every day for lists and research. I like how it is easy to put in screenshots, and it syncs well, including to my iPhone. I've also got a shared OneNotes with my wife (who uses a Mac) and for clients I work with.

I have switched back to using [OneNote 2016](https://www.onenote.com/download) which is [now back being fully supported](https://support.office.com/en-gb/article/frequently-asked-questions-about-onenote-6582c7ae-2ec6-408d-8b7a-3ed71a3c2103)

## Vim_ahk

[vim_ahk on GitHub](https://github.com/rcmdnk/vim_ahk) is a script for [Autohotkey](https://www.autohotkey.com/). Install Autohotkey, then clone the vim_ahk repo and put `vim.ahk` and the `lib` folder into you `sharedTools` folder

![alt text](/assets/2020-04-10/5.jpg "shared tools folder"){:width="350px"}

```bash
# Startup folder - put links here to run automatically on Startup
# C:\Users\djhma\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
# C:\Users\dave\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```

Then make shortcuts and put into your startup folder:

![alt text](/assets/2020-04-10/3.jpg "My auto Startup folder"){:width="400px"}

The default for vim_ahk is to map to many apps:

![alt text](/assets/2020-04-10/4.jpg "ahk settings"){:width="350px"}

I only use mappings for OneNote as I have separate [bindings for VSCode](https://github.com/VSCodeVim/Vim) and [Visual Studio](https://marketplace.visualstudio.com/items?itemName=JaredParMSFT.VsVim), which are more integrated into each application.

![alt text](/assets/2020-04-10/6.jpg "comment out apps don't want"){:width="450px"}

To turn off these bindings which survives a restart I've commented out the apps which I don't want.

### What doesn't work in vim_ahk

. repeat last command. I use this after doing a `dd` to delete a line  
J join 2 lines doesn't work

## Map CapsLock to Escape Key

[I use Dual-Key-remap on GitHub](https://github.com/ililim/dual-key-remap) and set a shortcut from my startup directory to load it on restart.

I found that using multiple ahk mappings, like [the script I used to use](/2018/04/10/Autohotkey) along with vim_ahk was tricky.

## OneNote Shortcuts

[From Microsoft OneNote keyboard shortcuts](
https://support.office.com/en-gb/article/keyboard-shortcuts-in-onenote-for-windows-44b8b3f4-c274-4bcc-a089-e80fdcc87950)

Ctrl PAGE Down - next page  
Ctrl PAGE Up - previous page  

Ctrl Alt n - create new page below current in tab bar  
Ctrl M - open new OneNote window  

Ctrl Alt 1 - make Heading 1,2 etc..
Ctrl Alt 0 - make normal size text

## Conclusion

Using Vim makes editing text a joy. Every time I put effort into learning more about Vim it makes me smile, and finding out how to use Vim in my favourite note taking application is spectacular!

Now I'm off to [learn new Vim skills](https://stackoverflow.com/a/5400978/26086) and [publish my Vim commands most used](/2020/04/10/Vim-commands-most-used)

Make your life happier with Vim and Chocolate!

![alt text](/assets/2020-04-10/8.jpg "Vim and chocolate make you happy!"){:width="600px"}