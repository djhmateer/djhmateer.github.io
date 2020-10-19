---
layout: post
title: Integration testing of ASP.NET Core 3.1 
description: 
menu: review
categories: xunit 
published: false 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

I've written a lot about using Jekyll using Docker from Windows to get a good experience. However it can be slow to regenerate and update itself which is annoying.

It can also take a lot of resources to run Docker.. so here is a shot of running WSL2 and Jekyll well.


[Dylan Beattie article](https://dylanbeattie.net/2020/05/19/jekyll-on-wsl2.html)

[Medium article](https://medium.com/@hjgraca/using-wsl2-visual-studio-code-for-jekyll-blogging-on-windows-10-99489deb4650)

AFter 

```bash

sudo apt-get update -y && sudo apt-get upgrade -y

sudo apt install ruby-full

sudo gem update

sudo gem install bundler

sudo apt-get install ruby-dev build-essential dh-autoreconf

sudo apt-get install make gcc gpp build-essential zlib1g zlib1g-dev

sudo gem install jekyll

# inside jekyll repo
sudo bundle install

bundle exec jekyll serve

```

However I got a lot of errors like:

ERROR:  Error installing zlib:
        ERROR: Failed to build gem native extension.
extconf failed, exit code 1