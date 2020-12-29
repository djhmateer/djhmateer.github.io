---
layout: post
title: GitHub Main and and Master 
description: 
menu: review
categories: GitHub 
published: true 
comments: false     
sitemap: false
image: /assets/2020-12-02/ios2.png
---

<!-- [![alt text](/assets/2020-12-02/ios2.png "PWA"){:width="300px"}](/assets/2020-12-02/ios2.png) -->

This is some helper coder for me, as I always forget the handy 3 lines when creating a new repo on GH:

## VS Add to Source control

Creates a `master` branch rather than `main` so I like to create the repo from GH.

```bash
git remote add origin https://github.com/djhmateer/cs9-features.git
git branch -M main
git push -u origin main
```
