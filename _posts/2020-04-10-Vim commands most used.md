---
layout: post
title: Vim commands most used 
description: Learning new Vim commands is a never ending journey of frustration and happiness. Here are my most used commands. Good luck to us all.
#menu: review
categories: Vim 
published: true 
comments: true     
sitemap: true
image: /assets/2020-04-10/10.jpg
---

![alt text](/assets/2020-04-10/10.jpg "Nuffield tractor 1955"){:width="600px"}  
1955 Nuffield - older technology can be good and make you very happy... Vi was written in 1977...

[I recently found a way to use Vim with my favourite note taking application OneNote](/2020/04/10/OneNote-with-Vim) so I thought I'd revisit my favourite most used commands.

```bash
CapsLock - mapped to escape

h,j,k,l - move cursor
w - move forward by a word
b - move back by a word
{ - move back by paragraph
} - move forward by paragraph
:n - go to line n

o - start writing on next line
x - delete character
dd - delete a line
cc - change whole line
dw - delete word
. - repeat last (useful for deleting a lot)
u - undo
<C - r> - redo

i - insert text at cursor
gg - go to top of document
G - go to end of document
yy - yank line
p - put

v - visual mode (for copying)

ci( - change inside ()
di( - delete inside ()
yi( - yank inside ()

dt" - delete up to "

rp - replace character with p
R - replace mode

J - join next line to this one
~ - capitalise

D - delete to end of line
C - change to end of line

fw - find letter w
; - move again to same character in same direction

A - go to end of line and start inserting

$ - go to end of line (I normally use A as this goes to insert mode too)
0 - go to beginning of line

/ - search
n - next in same direction
N - next in opposite direction

```

Here are my lesser used commands:

```bash
# visual block mode (vertical)
ctrl v, I, move cursor, x   - inserts

I - insert at beginning of line

2dd - delete 2 lines
```

- da" - **D**elete **A**round double quotes
- di] - **D**elete **I**nside square brackets
- dap - **D**elete **A**round **P**aragraph

- xp - **x**delete **p**aste to Swap 2 characters

[These commmands and highlighting style from VimTricks](https://vimtricks.substack.com/) 

## VSCodeVim

[VSCodeVim Roadmap](https://github.com/VSCodeVim/Vim/blob/master/ROADMAP.md) has shows what commands are implemented in my favourite text editor!

```bash
<C S e> - Explorer pane
l or enter - back to editor pane
```

## Vimium

[Vimium Extension for Chrome and Firefox](https://vimium.github.io/)

```bash
j - scroll down
k - scroll up
gg - scroll to top of page
G - scroll to bottom of page

f - follow link in current tab
F - follow link in new tab

H - back

/ - search
' - search on google serach page (puts cursor back into serach box)

? - help
```

## Mail and Vim

[Vmail for Gmail](https://github.com/danchoi/vmail)


[Mutt](https://medium.com/@itsjefftong/mutt-gmail-59447a4bffef) and [Reddit thread on setting up with Gmail too](https://www.reddit.com/r/vim/comments/3ruqh0/mail_and_vim/)

## Other lists

[Greg Hewgill on Stack Overflow](https://stackoverflow.com/a/5400978/26086)

[My post 3 years ago on Vim](/2018/02/21/VIM)

[https://devhints.io/vim](https://devhints.io/vim)

## Windows Keyboard Repeat

This is very useful to make Vim commands mostly navigation feel more responsive eg h,j,k,l and also repeat . in all Vim implementations.

![alt text](/assets/2020-04-10/1.jpg "Setting keyboard repeat rate faster"){:width="300px"}

## Conclusion

Learning new Vim commands is a never ending journey of frustration and happiness.

Good luck to us all!!!!
