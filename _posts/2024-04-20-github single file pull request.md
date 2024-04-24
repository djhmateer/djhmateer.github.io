---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: git 
published: true 
comments: false     
sitemap: false
image: /assets/2024-03-03/2.jpg
---

<!-- [![alt text](/assets/2024-02-01/1.jpg "email"){:width="600px"}](/assets/2024-02-02/1.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email"){:width="800px"}](/assets/2024-03-03/2.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email")](/assets/2024-03-03/2.jpg) -->

[https://github.com/bellingcat/auto-archiver](https://github.com/bellingcat/auto-archiver) is an open source project. I have a fork [https://github.com/djhmateer/auto-archiver](https://github.com/djhmateer/auto-archiver) 

[![alt text](/assets/2024-04-24/1.jpg "email")](/assets/2024-04-24/1.jpg)

My fork has a branch called `dev-upstream` which should be synced to bellingcat/auto-archiver:main

I have a branch called `djhmateer/auto-archiver:v6-test` where I do all my work

## Pull Request to upstream

- make a copy of entire v6-auto-archiver directory

- from v6-auto-archiver git pull (will get the dev-upstream changes)

- git checkout -b foo origin/dev-upstream

- do changes in v6-auto-archiver (look in the copy directory perhaps using Beyond Compare)

- git add filname

- git commit -m "message"

- git push origin foo

[https://github.com/djhmateer/auto-archiver](https://github.com/djhmateer/auto-archiver) do the PR to main on upstream

remember to change back to `git branch v6-test`

## Compare


[![alt text](/assets/2024-04-24/2.jpg "email")](/assets/2024-04-24/2.jpg)

c:\dev\auto-archiver is a git pull from github.com/bellingcat/auto-archiver main

This makes it easy to go file by file and see the changes using Beyond Compare.