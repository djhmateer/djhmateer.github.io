---
layout: post
title: Hugo Static Site Generator on WSL2 to Netlify
description: Beginners guide on how to get going. Using a TailwindCSS theme.
#menu: review
categories: Hugo 
published: true 
comments: false     
sitemap: true
image: /assets/2021-01-24/hugo-logo-wide.svg
---

[![Hugo](/assets/2021-01-24/hugo-logo-wide.svg "Hugo")](/assets//2020-10-12/hugo-logo-wide.svg)

I wanted a static site generator which

- Was open source
- Had lots of support
- Had a tailwindcss theme
- Wasn't Jekyll (as I've use it for years and have found it good, but the eco-system make me nervous as I'm not a rubyist.. and I wanted to explore something else)

I'll probably use Netlify, even though I rate GitHub Pages (GHP) really well. Its annoying to get multiple sites on one GH account, and also GHP is not for commercial projects. I am intersted in commercial project hosting.

So in summary this is the plan:

- Hugo running on WSL2 on Win 10 for static site generation
- GitHub for source code
- Netlify for website hosting
- DNSimple for a new domain name
- Netlify or Cloudflare for SSL for new domain name

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

# updating all the submodules
# git submodule update --remote --merge

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

draft: true will not publish so flip to true

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

[https://themes.gohugo.io/bento/](https://themes.gohugo.io/bento/) is Bento which I've ended up using.

```bash
git submodule add https://github.com/opera7133/Blonde.git themes/Blonde

git submodule add https://github.com/leonardofaria/bento.git themes/bento

# if first time cloning your repo then need to get the submodules
#git submodule update --init --recursive

cd themes/Blonde
cd themes/bento

# install npm v 14 here https://github.com/nodesource/distributions/blob/master/README.md#deb
# npm 6.14.11
# if you get errors here try npm install -g npm@latest
# npm - 7.5.3
npm install

sudo npm install -g postcss postcss-cli
sudo npm install -g autoprefixer

# to update the submodule
git submodule update --remote --merge
```

After doing this I got an error building the site with Blonde so gave up!

Error: Error building site: failed to render pages: render of "home" failed: "/home/dave/beer/hugo-quickstart/themes/Blonde/layouts/_default/list.html:8:32": execute of template failed: template: _default/list.html:8:32: executing "main" at <.Paginate>: error calling Paginate: 'pager size' must be a positive integer

### exampleSite

I missed this important bit!

Have a look in most of the themes and you'll see an exampleSite directory which is where you'll find a demo of how to setup this themes site.

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

## Images Videos and Posts

Here is my first shot at where to put new posts `content/posts`

[![New site from Git](/assets/2021-01-24/screen.jpg "Posts"){:width="500px"}](/assets/2021-01-24/screen.jpg)

Images are in `public\images`

And there is a handy YouTube shortcut

```
[How to sterilise homebrew equipment](https://www.youtube.com/watch?v=vSoshc1ukGY)
```

And here [is the result](https://homebrewbeer.netlify.app/2021/01/how-to-get-started-home-brewing-beer-beer-from-a-kit/)


[![Beer](/assets/2021-01-24/beer.jpg "Posts"){:width="500px"}](/assets/2021-01-24/beer.jpg)

## Summary

Hugo seems to work well and is fast. 

What I like is the simple installation of a binary. 

I've yet to get into styling of the tailwindcss theme, but I've got just enough working to show people about home brewing beer!
