---
title: Jekyll GitHub Pages 
description: Jekyll and how I have successfully built a blog over the last 3 years and refined my workflow. 
#menu: review
categories: Jekyll GitHub
comments: true
sitemap: true
image: /assets/2019-07-18/20.jpg
---

![alt text](/assets/2019-07-18/20.jpg "Jekyll"){:width="400px"}

I've been using [Jekyll](https://jekyllrb.com/) ([GitHub source](https://github.com/jekyll/jekyll)) for [nearly 3 years for this blog](/2016/10/17/Blog-with-Jekyll-and-host-for-free) hosted on [GitHub Pages](https://pages.github.com/)  

> Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Think of it like a file-based CMS, without all the complexity  

- I have [Multiple sites hosted on GitHub Pages using separate GitHub Logins](/2019/07/28/Multiple-Github-Logins)
- I use [Docker on my Windows Machine to have it hosted locally and livereload](/2018/01/25/Jekyll-and-Docker)
- I sometimes use [Cloudflare as a domain registrar as they are cheap and for SSL Cert and other CDN goodness](/2018/01/08/SSL-on-Github-Pages)
- I use redirects when I changed my blog naming strategy

This article is a summary of what I've learned so far, and how my workflow has changed.

I'm going to be creating a few websites soon for products which I'd like to use GH Pages for, and maybe Jekyll will be an excellent fit.

## Set up Jekyll locally using Docker

I like to do this as it gives me immediate feedback on how the site looks. It is not strictly necessary as GitHub Pages can do the build for you.

I've written articles on [Setting up Docker and Livereload](/2018/01/25/Jekyll-and-Docker) and [having multiple GitHub Pages User Sites](/2019/07/28/Multiple-Github-Logins), but essentially I now do this:

```bash
# run jekyll on a linux docker image
docker run --rm -v=%cd%:/srv/jekyll -p 4000:4000 -it jekyll/jekyll /bin/bash

# create a new jekyll site in the current directory even if directory is not empty
jekyll new . --force

# will now be able to see your site on localhost:4000 (notice no livereload)
jekyll serve

# keep all gems up to date - most importantly github-pages which will pull all dependencies locally so same as live
bundle update
```

[Docker hub jekyll/jekyll](https://hub.docker.com/r/jekyll/jekyll) and [GitHub Source](https://github.com/envygeeks/jekyll-docker/blob/master/README.md)

![alt text](/assets/2019-07-28/1.png "Files for a Jekyll install"){:width="400px"}

No ruby files (they are inside the docker container), and no theme files (they too are inside the docker container as we're using the default theme minima, which is inside a gem)

## Front Matter

Here is the yml for this page which is under development

```yml
---
title: Jekyll GitHub Pages
description: Description to go here
menu: review
categories: Jekyll GitHub
comments: false
sitemap: false
image: /assets/2019-07-18/1.jpg
---
I've been using Jekyll...
```

- If you change date in front matter, it updates the url which I don't use 
- If you change the title, it will not update url (but is useful for Capitalisation on page)

## Blog post conventions

I have urls like this [https://davemateer.com/2019/07/28/Multiple-Github-Logins](https://davemateer.com/2019/07/28/Multiple-Github-Logins) which I find easy to read and see the date, and the title of the post.

By default Jekyll uses categories in the url which I find can be messy as I like to use a few categories usually.

```yml
# _config.yml
title: Dave Mateer's Blog
email: davemateer@gmail.com
description: In depth articles on software production
baseurl: "" 
url: "https://davemateer.com" 
twitter_username: dave_mateer
github_username:  djhmateer
twitter:
  username: dave_mateer

# the url structure
permalink: /:year/:month/:day/:title

markdown: kramdown

timezone: Europe/London

repository: djhmateer/djhmateer.github.io

plugins:
  - jekyll-redirect-from
  - jekyll-sitemap
  - jekyll-seo-tag # twitter / opengraph
  - jekyll-feed # atom
  - jemoji
  - jekyll-github-metadata

emoji:
  src: "https://github.githubassets.com/images/icons/"

defaults:
  -
    scope:
      path: ""
      # ie not for pages
      type: "posts"
    values:
      # the default layout to use if none is specified
      layout: post
      # I don't use the concept of drafts so default to published true
      published: true

exclude: 
 - Gemfile
 - Gemfile.lock 
 - docker-compose.yml
```

## Hosting on GitHub Pages

I like hosting on GitHub Pages as it is: fast, solid, automatic Lets Encrypt SSL Certificate, and simple.  

You can upload a single index.html file and GH Pages will render that fine, and a full static site, just upload the `_site` directory for Jekyll, and GH Pages will serve that fine.  

However if you upload a Jekyll site GH Pages will automatically build the site.  

You don't need the `Gemfile` when uploading the GH Pages as it only looks at the _config.yml.  

GH only supports [these dependencies](https://pages.github.com/versions/)

```bash
# Gemfile
source "https://rubygems.org"

# Don't specify a version as we want to keep in sync with the github-pages version below
#gem "jekyll", "~> 3.8"

# This is the default theme for new Jekyll sites.
# We haved pulled minima into the 
# gem "minima", "~> 2.0"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
gem "github-pages", group: :jekyll_plugins

# As we are using github-pages don't put any other plugins in here
# as gh-pages pulls many in as dependencies
group :jekyll_plugins do
    # gem "jekyll-feed", "~> 0.6"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?s
```

## Themes

Lets have a look at the themes [included with GH Pages](https://pages.github.com/versions/). The default is minima:

```yml
# _config.yml 
markdown: kramdown
theme: minima
plugins:
  - jekyll-feed
```

By default the [minima theme](https://rubygems.org/gems/minima) and [minima source](https://github.com/jekyll/minima) is hidden away from us in a gemfile which was referenced in `_config.yml`  

```bash
# Show the path of the theme - we're not going to need this
# /usr/local/bundle/gems/minima-2.5.0
bundle show minima
```

An easy way to get all the files is to [clone the soure](https://github.com/jekyll/minima) then copy these directories into your new blog site:

- _layouts
  - default.html - base layout
  - home.html - layout for landing page
  - page.html - layout for pages (ie not posts)
  - post.html - the layout for posts
- _includes
  - disqus_comments.html
  - footer.html
  - google-analytics.html
  - head.html
  - header.html
  - social.html
- _saas 
  - minia.scss - the core
  - minima/_base.scss
  - minmia/_layout.scss
  - minima/_syntax-highlighting.scss
- assets

## Designs

[jekyllrb.com/showcase/](https://jekyllrb.com/showcase/) for interesting showcases  
[talk.jekyllrb.com](https://talk.jekyllrb.com/) for more showcases on sites

## Add-ons to Jekyll

As we're using the standard GH Build we are constrained to the [following dependencies](https://pages.github.com/versions/).  

I use:

- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) - generates a sitemap.xml (for seo)
- [jekyll-github-metadata](https://github.com/jekyll/github-metadata) - puts in GH Revision on page (for troubleshooting builds and sanity checking if worked)
- [jekyll-feed](https://github.com/jekyll/jekyll-feed) generates feed.xml Atom (RSS) feed of posts
- [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) seo meta data and [Open Graph and Twitter Cards](/2019/04/07/Twitter-card-open-graph-site-preview).
- [jemoji](https://github.com/jekyll/jemoji) - for [telephone, twitter etc. icons](/2019/05/27/Jemoji)

However I may well transition to not using these add-ons as described in the first video below.

## Videos

[Getting Sh*t done with Jekyll by Ronan Berder](https://www.youtube.com/watch?v=No7dtPtbtcE) - an excellent video on pragmatic Jekyll usage

[Giraffe Academy](https://www.youtube.com/playlist?list=PLLAZ4kZ9dFpOPV5C5Ay0pHaa0RJFhcmcB) - a good intro set of videos
