---
layout: post
# title: Jekyll GitHub Pages 
description: 
menu: review
categories: Jekyll GitHub
published: true 
comments: false
sitemap: false
image: /assets/2019-07-18/1.jpg
---
I've been using [Jekyll](https://jekyllrb.com/) and [it's source](https://github.com/jekyll/jekyll) for [nearly 3 years for this blog](/2016/10/17/Blog-with-Jekyll-and-host-for-free). 

> Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Think of it like a file-based CMS, without all the complexity

- I have [Multiple sites hosted on GitHub Pages using separate GitHub Logins]()
- I use [Docker on my Windows Machine to have it hosted locally and livereload]()
- I sometimes use [Cloudflare as a domain registrar as they are cheap and for SSL Cert and other CDN goodness]()
- I use redirects when I changed my blog naming strategy

This article is on how jekyll works and choosing a theme. I struggled to show a friend how to get it working for her [blog website](https://agoyal.co.uk).

I'm going to be creating a few websites soon for products which I'd like to use GH Pages for, maybe Jekyll.  

## Blog Sites on GH Pages / Jekyll
If you [follow my initial tutorial on setting up Jekyll locally]() we can:

- Create local site (notice no ruby files)
- Docker-compose file so can easily run it locally
- Setup on GitHub Pages

![alt text](/assets/2019-07-28/1.png "Files for a Jekyll install"){:width="400px"}     

### Gemfile
Lets setup the gemfile to use the [GitHub pages gem](https://github.com/github/pages-gem) which will force Jekyll locally to use the same version as on GH Pages. [Here are the versions of gems and themes used on GH Pages](https://pages.github.com/versions/) as GH Pages will do a build for us automatically. GH Pages uses Jekyll 3.8.5 as of 28th July 2019. Whereas latest Jekyll is 3.8.6

```bash
# comment out the 3.8.6 version 
# gem "jekyll", "~> 3.8.6"

# comment in the github-pages gem
gem "github-pages", group: :jekyll_plugins
```
then you'll probably need to delete gemfile.lock (as you're essenitally downgrading jekyll) file, then run docker-compose up. 

```bash
# clear down all cached containers to make sure you get the latest
# my shortcut for all these commands in ddel
docker container prune -f $t docker image prune -af $t docker network prune -f $t docker volume prune -f
# spin up the docker image in interactive mode
docker run --rm -v=%cd%:/srv/jekyll -p 4000:4000 -it jekyll/jekyll /bin/bash
# update the gem bundles
bundle update 
```
Every now and again run the bundle update to keep your local instance up to date with what is being done on GH Pages. This is a very 'secure' way of working as:

- There is no dynamic part of your website so nothing to hack!
- GH does a rebuild every time, so they are responsible for keeping everything up to date (including all infrastructure)

## _config.yml and Themes
Lets have a look at the themes [included with GH Pages](https://pages.github.com/versions/). The default is minima:

```bash
# Build settings
markdown: kramdown
theme: minima
#theme: jekyll-theme-architect
plugins:
  - jekyll-feed
```
we could j



What are the themes options on GH Pages interface?

What is the GH gem plugin?

### _config.yml

## Product Sites on GH Pages / Jekyll
Why have multiple logins? Yes it is possible to host multiple 'websites' under a single GH login using the [2 static hosting models that GH give](https://help.github.com/en/articles/user-organization-and-project-pages).

- User and Organisation Pages eg [djhmateer.github.io](https://djhmateer.github.io)
- Project Pages sites eg [djhmateer.github.io/startbootstrap-jekyll](https://djhmateer.github.io/startbootstrap-jekyll)

In my opinion this is messy, as you get cross pollination potentially with: djhmateer.github.io (which is davemateer.com) pointing to davemateer.com/startbootstrap-jekyll. 



