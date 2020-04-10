---
layout: post
title: OneNote with Vim 
description: 
menu: review
categories: OneNote Vim 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"}

I've used [Vim](https://www.vim.org/) in anger [for around 3 years and here are my favourite commands](/2018/02/21/VIM). I never use Vim the actual editor, but the implementations for [Vim for VSCode](https://github.com/VSCodeVim/Vim) and [Vim plugin for Visual Studio](https://github.com/VsVim/VsVim).

The subject of [What are the benefits of using Vim](https://stackoverflow.com/questions/597077/what-are-the-benefits-of-learning-vim) is fascinating. There is [a lot of stuff out there including this fun looking book](https://www.barbarianmeetscoding.com/boost-your-coding-fu-with-vscode-and-vim/introduction/)

I've used [AutoHotkey](https://www.autohotkey.com/) together with [a script](/2018/04/10/Autohotkey) to bind CapsLock to escape key for years.

And I've tied it all together across my machines.

OneNote with Vim bindings is great! Some things give you inexplicable joy. Being able to edit documents without my fingers leaving the keyboard is one of them.

I use [OneNote 2016](https://www.onenote.com/download) which is [now back being fully supported](https://support.office.com/en-gb/article/frequently-asked-questions-about-onenote-6582c7ae-2ec6-408d-8b7a-3ed71a3c2103) and is getting updates eg Dark Mode but only if you're on a consumer edition (ie not an Office 365 ProPlus, but a Office Professional Plus 2019 is okay). [more detail](https://support.office.com/en-gb/article/turn-dark-mode-on-or-off-in-onenote-bb81fb88-968d-4c1a-818d-eec590deadef). Check out File, Account, Office Updates (auto), and About for 16.0.12624.20382 is a good version which can get dark mode. 16.0.11929.20436 cannot.

## Vim_ahk

[vim_ahk on GitHub](https://github.com/rcmdnk/vim_ahk) 

I only use the mappings for OneNote, as I use separate bindings for VSCode and Visual Studio, which are way better

```bash
# c:\Users\djhma\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup

```

### Shortcomings

. repeat last command. I use this after doing a `dd` to delete a line, then I like to continue deleting lines. It doesn't work.

J join 2 lines doesn't work

## OneNote Shortcuts

[From Microsoft OneNote keyboard shortcuts](
https://support.office.com/en-gb/article/keyboard-shortcuts-in-onenote-for-windows-44b8b3f4-c274-4bcc-a089-e80fdcc87950)

ctrl alt n - create new page below current in tab bar
Ctrl M - open new onenote window
ctrl shift [ - decrease size of pages tab bar

ctrl PAGE Down - next page
ctrl PAGE Up - previous page

alt PAGE Up - first page in currently visible

## Map CapsLock to Escape Key

[I used to use Autohotkey](/2018/04/10/Autohotkey) to remap the CapsLock to escape key  which is a very common remapping that Vim users do (it is way easier to hit the CapsLock key than the escape key).

[Now I use Dual-Key-remap on GitHub](https://github.com/ililim/dual-key-remap)

I use the above project now rather an an AutoHotKey mapping as I found that using multiple ahk mappings can cause issues.
