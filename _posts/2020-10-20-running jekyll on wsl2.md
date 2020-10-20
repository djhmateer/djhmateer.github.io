---
layout: post
title: Running Jekyll on WSL2 
description: Running Jekyll on WSL2 - performance gains and do I actually use it...
menu: review
categories: Jekyll WSL2 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-19/jekyll_island.jpg
---

[![alt text](/assets/2020-10-19/jekyll_island.jpg "Jekyll Island by @_zachreiner_")](https://unsplash.com/@_zachreiner_)

I've [written a lot about using Jekyll](/2019/07/28/Jekyll-Github-Pages) using Docker from Windows to get a good experience. However it can be slow to regenerate and update itself which is annoying.

Here is a shot of running WSL2 and Jekyll well.

[Dylan Beattie article](https://dylanbeattie.net/2020/05/19/jekyll-on-wsl2.html)

[Medium article](https://medium.com/@hjgraca/using-wsl2-visual-studio-code-for-jekyll-blogging-on-windows-10-99489deb4650)

I got errors like this following the medium article

```bash
ERROR:  Error installing zlib:
        ERROR: Failed to build gem native extension.
extconf failed, exit code 1
```

After some playing around this worked for me:

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

## VSCode - Remote WSL

To easily view and edit files inside WSL2

[Remote - WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)

## Performance

It is still fairly slow for me

![alt text](/assets/2020-10-19/perf.jpg "Performance is still quite slow for me")]

However this is stil way better than docker perf:

![alt text](/assets/2020-10-19/docker.jpg "Docker perf")]

Even taking out all the plugins still took 30s on docker to run, so it looks

## Conclusion

It is a lot faster running Jekyll on WSL2, however I'm not switching yet as I'm used to the Docker way and it is also annyoing for me saving assets to WSL from Windows side...

I have to look at my Jekyll site and do some performance optimisations to make it regenerate faster.

[Here is my current technical way I structure my Jekyll site](/2019/07/28/Jekyll-Github-Pages) and [A great video on Jekyll with tips on keeping it simple](https://www.youtube.com/watch?v=No7dtPtbtcE)

Happy Jekylling!