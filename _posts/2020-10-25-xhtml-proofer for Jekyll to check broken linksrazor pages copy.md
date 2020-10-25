---
layout: post
title: html-proofer - Finding broken links in Jekyll
description: 
menu: review
categories: RazorPages 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

[html-proofer on GitHub](https://github.com/gjtorikian/html-proofer)

```bash
# get all gem files up to date
sudo bundle update

# add to Gemfile
gem 'html-proofer'

sudo bundle update

# start up the site
# I use the alias: jsu
# 'bundle exec jekyll serve --livereload --unpublished > /dev/null 2>&1 &

# allow_hash_href -	ignores the href="#"
# empty_alt_ignore - ignores images with empty alt tags
# assume_extension - Automatically add extension (e.g. .html) to file paths, to allow extensionless URLs (as supported by Jekyll 3 and GitHub Pages)
# --log_level: debug
htmlproofer --allow_hash_href --empty_alt_ignore --assume_extension ./_site
```

output here is:

```html
- ./_site/2016/10/16/Why-Blog.html
  *  image /assets/Dave_180.jpg does not have an alt attribute (line 0)
  *  internally linking to /2019/04/07/Twitter-card-open-graph-site-preview, which does not exist (line 0)
     <a href="/2019/04/07/Twitter-card-open-graph-site-preview">wrote a blog post on it</a>
  *  internally linking to /about, which does not exist (line 0)
     <a class="page-link" href="/about">About</a>
  *  linking to internal hash # that does not exist (line 0)
     <a href="#" class="menu-icon">
      <!-- <a class="menu-icon"> -->
        <svg viewBox="0 0 18 15" width="18px" height="15px">
          <path fill="#424242" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z"></path>
          <path fill="#424242" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z"></path>
          <path fill="#424242" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z"></path>
        </svg>
      </a>
```


```bash


bundle exec htmlproofer --allow_hash_href --alt_ignore ./_site &> links.log

```