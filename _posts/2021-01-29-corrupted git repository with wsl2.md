---
layout: post
title: Corrupted Git repository with WSL2 
description: 
menu: review
categories: git wsl2 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

## Error: object file is empty

For the last few days I've had this blog's git repo getting corrupted with errors like:

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


## Fix broken Git repo

[Stackoverflow answer](https://stackoverflow.com/a/31110176/26086)

```bash
# backup the repo first!
find .git/objects/ -type f -empty | xargs rm
git fetch -p
git fsck --full
```

## Resources

[hacker news](https://news.ycombinator.com/item?id=25612962)
