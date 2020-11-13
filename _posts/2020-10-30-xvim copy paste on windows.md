---
layout: post
title: Vim copy and paste on Windows 
description: 
menu: review
categories: Vim 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->


## VS Code

I use VS Code to write this blog, and have [vscodevim](https://github.com/VSCodeVim/Vim)

Copy and Paste out of VS Code (eg to notepad) can be annoying.

[From this SO Answer](https://stackoverflow.com/a/61066089/26086)

```yml
# add this to settings.json
"vim.useSystemClipboard": true
```
This is handy as Ctrl V is the visual block mode which I use. Update - Ctrl Q works just fine for visual block mode.

However sometimes Ctrl C V is handy.. so I'm trying out that as the default too:

```yml
"vim.handleKeys": {
    "<C-c>": false,
    "<C-v>": false,
    "<C-a>": false, # select all is handy
    "<C-f>": false # find is handy
}
```

## Visual Studio

I use [VsVim by Jared Parsons](https://github.com/VsVim/VsVim)

[From this issue - Clipboard for VsVim not synced](https://github.com/VsVim/VsVim/issues/2423) I created

```bash
# c:\Users\djhma
# .vsvimrc
:set clipboard=unnamed
```

I'm noticing a stutter / pause when doing x to delete lots of characters. I believe this is to do with the clipboard.

## Azure Data Explorer

This can use the same VsCodeVim vsix [see here](https://github.com/VSCodeVim/Vim/issues/2677#issuecomment-398183822)


