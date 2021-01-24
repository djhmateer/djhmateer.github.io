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

- GitHub for source code
- Netlify for website hosting
- Netlify for SSL?
- DNSimple for domain host
- Cloudflare do I need?

## Install Hugo and create a blog post

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
# this command just builds the diretory structure
# config.toml  - site config
# archetypes/default.md - default markdown
hugo new site quickstart 
cd quickstart 

git init

# adds themes/ananke
# submodule allows you to keep a git repo as a subdirectory of another git repo
git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke

echo 'theme = "ananke"' >> config.toml

# adds into content\posts\my-first-post.md
hugo new posts/my-first-post.md

# blank website now alive on http://localhost:1313/
hugo server
```

The content is [frontmatter style](https://gohugo.io/content-management/front-matter/)

```md
---
title: "My First Post"
date: 2019-03-26T08:47:11+01:00
draft: true
---
```

draft: true will not publish so flip to trye

[![Demo site](/assets/2021-01-24/serve.jpg "demo"){:width="500px"}](/assets/2021-01-24/serve.jpg)

Regenerate times are super fast.

I like links with the date in them so added this to the config file:

```yml
[permalinks]
  posts = "/:year/:month/:title/"
```


## Themes

[themes.gohugo.io](https://themes.gohugo.io/) is a good place to start.

[https://themes.gohugo.io/blonde/](https://themes.gohugo.io/blonde/) is the one I'm going to try as it uses [tailwindcss](https://tailwindcss.com/) which I'm a fan of.

## Hosting on Netlify

[host on Netlify](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/) 

[![New site from Git](/assets/2021-01-24/netlify.jpg "New Site from Git"){:width="500px"}](/assets/2021-01-24/netlify.jpg)

New site from Git, then give Netlify permission on your GitHub repo then add a file in your project root called `netlify.toml`

```yml
[build]
publish = "public" 
command = "hugo --gc --minify" 

[context.production.environment]
HUGO_VERSION = "0.80.0"
HUGO_ENV = "production"
HUGO_ENABLEGITINFO = "true"
```

I changed my site name to [https://homebrewbeer.netlify.app/](https://homebrewbeer.netlify.app/) in Netlify then updates the `config.toml` to recognise that name, then it works. Just push to GH and Netlify will pick regenerate and publish.