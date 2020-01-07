---
layout: post
title:  Useful Git Commands
description: Useful Git commands that I use
categories: Git
published: true 
redirect_from: git/2018/02/01/Useful-Git-Commands.html 
comments: true
sitemap: true
image: /assets/2019-11-13/70.jpg
---

I use Git every day. Here are my favourite commands, which I frequently forget, therefore I've published here.  

![alt text](/assets/2019-11-13/70.jpg "Using Git"){:width="800px"}

**Update 30th Dec 2019** - [I now alias the common commands](/2018/01/30/Cmder-Shell#aliases)  

[Delete Windows Cached passwords using Credential Manager](/2019/07/28/Multiple-Github-Logins)

```bash
# branch
git checkout -b davem/infrastructure

# above is a shortcut for:
git branch davem/infrastructure
git checkout davem/infrastructure

# push the branch to the remote
# -u is short for --set-upstream so I can do a git push and it will go
git push -u origin davem/infrastructure


# replace local version with remote version - https://stackoverflow.com/a/5288284/26086
git stash; git fetch origin; git reset --hard origin/master

# reset any changes done since last commit
git reset --hard head

# get rid of any local files only not in git ie in .gitignore
git clean -dfx

git push -u origin textChanges

# working on OSS projects
git checkout master
git fetch upstream
git merge upstream/master
git checkout 2204
git rebase master
git push origin 2204 -f  

git stash
git apply

git branch -d 2204 # (delete local branch)
git branch -D 2204 # (force delete if hasn't been merged)
git push origin --delete 2204 # (delete remote branch)

git branch -u origin/masterDemoMoneyMinded # (sets upstream branch)

git push -u origin davem/1234 # (shortcut to set upstream branch only need to do once)

git tag -a v1.0.4 -m "adding a tag"
git push --tags
```
