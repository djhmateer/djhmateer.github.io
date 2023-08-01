---
layout: post
title: Apple Mac vs Windows keyboard setup, shortcuts and apps
description: 
# menu: review
categories: mac
published: true 
comments: false     
sitemap: true
image: /assets/2023-07-22/1.jpg
---

[![alt text](/assets/2023-07-22/1.jpg "email"){:width="800px"}](/assets/2023-07-22/1.jpg)

Lets see how to Win and Mac compare with keyboard shortcuts (I've been a Windows guys for many years)

## Apps

- Activity Monitor (Task Manager)
- Finder (Explorer)
- Terminal (Terminal in WSL2)
- VS Code 
- OneNote
- Photos (nothing good on windows)


## MacOS Shortcuts

- Cmd Space (Windows key) - search
- alt tab (alt tab) - switch windows
- Cmd C (ctrl C) - copy
- cmd V (ctrl V) - paste
- cmd q (alt f4) - close app

- ctrl cmd q (win l) - lock screen
- cmd z (ctrl z) - undo

- xxx (Win E) - open finder / explorer from anywhere

## Terminal shortcuts

- Cmd + / - increase font size

## Chrome shortcuts

- Cmd L (Ctrl D) - cursor in address bar / location bar
- cmd t (ctrl t) - open new tab
- cmd w (ctrl w) - close tab
- cmd tab (ctrl tab) - switch between chrome tabs

## iMovie shortcuts
see blog article

## Linux side

- brew (apt) eg to install wget 
- brwew install python  (I had 3.8.2 installed with catalina)

## Finder 

- ctrl click (right click) - get get info on a folder

- View, Show Path Bar
- View, Show Status Bar

- Users is where Movies is. (can just drag this to external hard disk if need be)

## Setup machine

- system preferences, mouse, reverse wheel direction
- system preferences, keyboard, map caps lock to escape (check both keyboards!)
- to enable keyboard repeating (Which I use in vim to move left and right)

```bash
# then reboot to get auto keyboard repeat
defaults write -g ApplePressAndHoldEnabled -bool false
```

- to get hash symbol Alt-3

brew problem not supported anymore on catalina eg installing wget taking ages (1 hour) as it is building from cmake. vim taking ages as it built rust as a dependency.
