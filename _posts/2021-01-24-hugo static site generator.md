---
layout: post
title: Hugo Static Site Generator
description: 
menu: review
categories: hugo 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

I wanted a static site generator which

- Was open source
- Had lots of support
- Had a tailwindcss theme
- Wasn't Jekyll (as I've use it for years and have found it good, but the eco-system make me nervous)

I'll probably use Netlify, even though I rate GitHub Pages really well. Its annoying to get multiple sites on one GH account, and also GHP is not for commercial projects. I am intersted in commercial project hosting.

- Netlify for hosting
- Netlify for SSL?
- DNSimple for domain host
- Cloudflare do I need?

## Hugo

[gohugo.io](https://gohugo.io/) is the projects homepage.

To install on WSL2 I go to [https://github.com/gohugoio/hugo/releases](https://github.com/gohugoio/hugo/releases) and find the lastest Linux 64bit.deb

```bash
# replace with the latest filename
wget https://github.com/gohugoio/hugo/releases/download/v0.80.0/hugo_0.80.0_Linux-64bit.deb

sudo dpkg -i hugo_0.80.0_Linux-64bit.deb

# restart the terminal
# v0.80.0 2020-12-31
hugo version

# following https://gohugo.io/getting-started/quick-start/
hugo new site quickstart 
cd quickstart 

git init
git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke

echo 'theme = "ananke"' >> config.toml

# blank website now alive on http://localhost:1313/
hugo server
```


## Themes

[themes.gohugo.io](https://themes.gohugo.io/) is a good place to start.

[https://themes.gohugo.io/blonde/](https://themes.gohugo.io/blonde/) is the one I'm going to try as it uses [tailwindcss](https://tailwindcss.com/) which I'm a fan of.
