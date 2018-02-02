---
layout: post
title:  "Useful Git Commands"
date:   2018-02-01 10:00
#menu: review
categories: git
published: true 
---

I use Git every day. Here are my favourite commands, which I frequently forget, therefore I've published here. 

```
git reset --hard head
git clean -dfx

--working on OS projects
git checkout master
git fetch upstream
git merge upstream/master
git checkout 2204
git rebase master
git push origin 2204 -f  

git stash
git apply

git push origin --delete 2204 (delete remote branch)

git tag -a v1.0.4 -m "adding a tag
git push --tags

```