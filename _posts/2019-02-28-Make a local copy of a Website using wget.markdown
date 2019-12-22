---
layout: post
title: Make a local copy of a website using wget
menu: review
categories: Wget 
published: true 
comments: false
sitemap: false
---
We are updating our company website, and the webmaster wanted to save all the years worth of articles which haven't come into the new version of the site.. 

My first reaction was we don't need to as [it will be there in archive.org](https://archive.org/web/), but it doesn't seem to have go the site

![ps](/assets/2019-02-28/1.png)  

Some of the pages hadn't been captured.

## Wget
```bash
wget --mirror --convert-links --html-extension https://davemateer.com
```

![ps](/assets/2019-02-28/1.png)  
This worked really well.  

However for my corporate site which uses javascript and Wordpress the capture didn't work.
