---
layout: post
title: Vim commands most used 
description: 
menu: review
categories: Vim 
published: true 
comments: false     
sitemap: false
image: /assets/2020-04-10/10.jpg
---

![alt text](/assets/2020-04-10/10.jpg "Nuffield tractor 1953"){:width="600px"}

[I've been using Vim in anger for 3 years now](/2018/02/21/VIM) and have recently [found a way to use it with my favourite note taking application OneNote](/2020/04/10/OneNote-with-Vim) so I thought I'd revisit my favourite most used commands and learn some more the the process.

```bash
CapsLock - mapped to escape
h,j,k,l - move up, down, left, right
w - move forward by a word
o - start writing on next line
x - delete character
dd - delete a line
dw - delete word
. - repeat deleting a line (useful for deleting a lot)
u - undo
i - insert
gg - go to top of document
G - go to end of document
yy - yank line
P - put

v - visual mode (for copying)

ci( - change inside ()
di( - delete inside ()

rp - replace character with p

J - join next line to this one
~ - capitalise

D - delete to end of line

fw - find lettter w

A - go to end of line and start inserting

$ - go to end of line (I normally use A as this goes to insert mode too)
0 - go to beginning of line
```

Here are my lesser used commands:

```bash
# visual block mode (vertical)
ctrl v, I, move cursor, x   - inserts

I - insert at beginning of line

2dd - delete 2 lines

:w - write (I have autosave enabled on VSCode)
:q - quit (I never seem to need it)

```

## _vimrc

```bash

```

## Keyboard repeat set faster

This is very useful to make navigation feel more responsive eg h,j,k,l and also repeat .

![alt text](/assets/2020-04-10/1.jpg "Setting keyboard repeat rate faster"){:width="400px"}