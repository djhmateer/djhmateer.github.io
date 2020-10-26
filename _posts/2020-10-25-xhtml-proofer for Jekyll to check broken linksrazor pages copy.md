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

## Results

The output for me

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
bundle exec htmlproofer --allow_hash_href --alt_ignore --assume_extension ./_site &> links.log
```

## Errors
 
On my Ubuntu 20.04.1 LTS machine the script seems to fail with a Ruby runtime error:

```ruby
- ./_site/about.html
  *  External link https://channel9.msdn.com/events/DDD/DDD12-Developer-Day-2017/Streaming-Large-Volumes-of-Data-into-SQL failed: got a time out (response code 0)
htmlproofer 3.16.0 | Error:  HTML-Proofer found 90 failures!
Traceback (most recent call last):
        25: from /usr/local/bin/bundle:23:in `<main>'
        24: from /usr/local/bin/bundle:23:in `load'
        23: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/exe/bundle:34:in `<top (required)>'
        22: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/friendly_errors.rb:123:in `with_friendly_errors'
        21: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/exe/bundle:46:in `block in <top (required)>'
        20: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/cli.rb:24:in `start'
        19: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/vendor/thor/lib/thor/base.rb:476:in `start'
        18: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/cli.rb:30:in `dispatch'
        17: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/vendor/thor/lib/thor.rb:399:in `dispatch'
        16: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/vendor/thor/lib/thor/invocation.rb:127:in `invoke_command'
        15: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/vendor/thor/lib/thor/command.rb:27:in `run'
        14: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/cli.rb:476:in `exec'
        13: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/cli/exec.rb:28:in `run'
        12: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/cli/exec.rb:63:in `kernel_load'
        11: from /var/lib/gems/2.7.0/gems/bundler-2.1.4/lib/bundler/cli/exec.rb:63:in `load'
        10: from /usr/local/bin/htmlproofer:23:in `<top (required)>'
         9: from /usr/local/bin/htmlproofer:23:in `load'
         8: from /var/lib/gems/2.7.0/gems/html-proofer-3.16.0/bin/htmlproofer:11:in `<top (required)>'
         7: from /var/lib/gems/2.7.0/gems/mercenary-0.3.6/lib/mercenary.rb:19:in `program'
         6: from /var/lib/gems/2.7.0/gems/mercenary-0.3.6/lib/mercenary/program.rb:42:in `go'
         5: from /var/lib/gems/2.7.0/gems/mercenary-0.3.6/lib/mercenary/command.rb:220:in `execute'
         4: from /var/lib/gems/2.7.0/gems/mercenary-0.3.6/lib/mercenary/command.rb:220:in `each'
         3: from /var/lib/gems/2.7.0/gems/mercenary-0.3.6/lib/mercenary/command.rb:220:in `block in execute'
         2: from /var/lib/gems/2.7.0/gems/html-proofer-3.16.0/bin/htmlproofer:109:in `block (2 levels) in <top (required)>'
         1: from /var/lib/gems/2.7.0/gems/html-proofer-3.16.0/lib/html-proofer/runner.rb:51:in `run'
/var/lib/gems/2.7.0/gems/html-proofer-3.16.0/lib/html-proofer/runner.rb:176:in `print_failed_tests': \e[31mHTML-Proofer found 90 failures!\e[0m (RuntimeError)
```

As I'm not a Rubyist, but am interested in the results of this tool (I've written many broken link checkers), lets see if it works well from Docker side.

## Docker

[Html proofer in docker](https://hub.docker.com/r/klakegg/html-proofer)

I tried running `sudo apt install docker.io` from WSL2, then tried installing from Windows side following [Docker Desktop WSL 2 backend]


