---
layout: post
title: yt-dlp installing the master branch with pipenv
description: 
#menu: review
categories: yt-dlp
published: true 
comments: false     
sitemap: true
image: /assets/2023-07-22/1.jpg
---

<!-- [![alt text](/assets/2023-07-22/1.jpg "email"){:width="800px"}](/assets/2023-07-22/1.jpg) -->
<!-- [![alt text](/assets/2023-08-01/1.jpg "email")](/assets/2023-08-01/1.jpg) -->



<!-- [![alt text](/assets/2023-08-23/3.jpg "email")](/assets/2023-08-23/3.jpg) -->

[https://github.com/yt-dlp/yt-dlp/pull/7890](https://github.com/yt-dlp/yt-dlp/pull/7890) is a fix I want for yt-dlp which isn't in the binary release yet.

[https://github.com/yt-dlp/yt-dlp/wiki/Installation#with-pip](https://github.com/yt-dlp/yt-dlp/wiki/Installation#with-pip) follow these instructions to downloading using pip from master.

```bash
pipenv update

pipenv shell

# 2023.07.06
# this is from the pipfile
yt-dlp --version

python3 -m pip install -U pip setuptools wheel

python3 -m pip install --force-reinstall https://github.com/yt-dlp/yt-dlp/archive/master.tar.gz


# 2023.07.06 - hmmm still the same
# but it is now running the latest master code
yt-dlp --version
```
