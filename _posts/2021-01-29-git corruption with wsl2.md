---
layout: post
title: Git corruption with WSL2 
description: Having a corrupt git repo is scary. For the last few days I've had this blog's git repo getting corrupted. There is an insiders build fix.
#menu: review
categories: Git WSL2 
published: true 
comments: false     
sitemap: true
image: /assets/2021-01-27/corrupt.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

[![Corrupt](/assets/2021-01-27/corrupt.jpg "Michael Dziedzic on Unsplash"){:width="600px"}](https://unsplash.com/@lazycreekimages)

Having a corrupt git repo is scary.

For the last few weeks I've had this blog's git repo getting randomly corrupted.

Summary: There is a [fix on the Windows Dev Insider Build](https://github.com/microsoft/WSL/issues/5895) - 21292. I'm currently on stable build of 19042.804

## Error: object file is empty

I've had this blog's git repo getting corrupted with errors like:

```bash
error: object file .git/objects/79/cbddeb3c2e2e6cb41f301bdf1e10c0508066e3 is empty
error: object file .git/objects/79/cbddeb3c2e2e6cb41f301bdf1e10c0508066e3 is empty
fatal: loose object 79cbddeb3c2e2e6cb41f301bdf1e10c0508066e3 (stored in .git/objects/79/cbddeb3c2e2e6cb41f301bdf1e10c0508066e3) is corrupt
```

These are sitting on a fully patched Win10 machine (29th Jan 2021) runing WSL2 fully patched. The files are sitting WSL side ie in `/home/dave/djhmateer.github.io`


## Git Version

I had version 2.17.1

Lokking at [git-scm](https://git-scm.com/download/linux) I can see the latest is 2.30.0 so lets see if this helps

```bash
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git
```

okay now I'm at 2.30.0

This didn't work

## Fix broken Git repo

[Stackoverflow answer](https://stackoverflow.com/a/31110176/26086)

```bash
# backup the repo first!
find .git/objects/ -type f -empty | xargs rm
git fetch -p
git fsck --full
```

## Resources and a Fix!

[Reddit discussion](https://www.reddit.com/r/bashonubuntuonwindows/comments/leqz8t/wsl2_corrupts_ext4_filesystem_fix_for_git/)

[Hacker news](https://news.ycombinator.com/item?id=25612962) discussion with a broken link which should be: [WSL issue on GH](https://github.com/microsoft/WSL/issues/5026)

[Updated HN link](https://news.ycombinator.com/item?id=26045767) just in case there is any interesting future discussion.

[Fix on dev insider build](https://github.com/microsoft/WSL/issues/5895) of insiders preview build 21292 in Mid Jan 2021 [21292 announcement](https://blogs.windows.com/windows-insider/2021/01/13/announcing-windows-10-insider-preview-build-21292/)

I can't confirm that it is fixed yet as don't want to run Dev insider build on my main machine yet.

