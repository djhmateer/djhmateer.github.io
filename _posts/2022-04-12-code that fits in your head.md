---
layout: post
#title: Python - Bellingcat auto-archiver
# description: Download vs View a PDF or Image from .NET6 Razor Pages with source code
menu: review
categories: C#
published: true 
comments: false     
sitemap: true
image: /assets/2022-03-10/view.jpg 
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->

Book notes from [Code That Fits in Your Head]() by Mark Seemann

To help me be structured in learning from this book.


Flicking thorugh the book purely for pleasure, the things which stick in my mind to try are:

- take my time
- turn on all error messages
- play with the code base that comes with it
- think about the rule of 6 or 7 things in head
- do more tests
- try git stash
- automate the build and continuous integration - push to main results in a deploy to production
- try not using Dapper?
- try doing good commit messages


- time boxing 25 minutes then go for a break
- spend time walking outside

I don't like that he uses raw ADO when Dapper saves time.

I don't like his use of DI, when simler more compositional ways are available.

I do want to explore his functional core, imperative outer..

## Sample Code

Strangely you have to download the zip file from [informit](https://www.informit.com/store/code-that-fits-in-your-head-heuristics-for-software-9780137464401) and not do a clone.

<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->
```bash
dave@DESKTOP-JVJF0CV:/mnt/c/dev/test/restaurant$ git status
Refresh index: 100% (113/113), done.
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .editorconfig
        modified:   .gitignore
        modified:   Build.sln
        modified:   LICENCE
        modified:   README.md
        modified:   Restaurant.RestApi.SqlIntegrationTests/ConcurrencyTests.cs
```

I found that all the files had windows line endings after unzipping, which hadn't been committed.

```bash
# lots of modified files
git status

# reset back to last commit
#git reset --hard 8d1fdb4c340516656bad55a69c9a7823996a4e14

# reset back to last commit
git reset --hard HEAD

# all good
git status
```

## 1 Art or Science

Use the advanced ideas of others..

Beauty in code.

## 2 Checklists

For starting a new code base:

- Use Git
- Automate the build
- Turn on all error messages

```bash
# Mark uses Restaurant for the zip file - I prefer github-style lower case and hypen
mkdir repo-name

# set my machine git default branch name to main
git config --global init.defaultBranch main

git init

# so can rewrite history before pushing to online Git service
git commit --allow-empty -m "Initial commit"
```

[![alt text](/assets/2022-04-12/api.jpg "desktop")](/assets/2022-04-12/api.jpg)

Visual Studio, New ASP.NET Core Web API (using .NET 3.1 for clarity along with book)

Copy the `.gitignore` from somewhere. Or delete the git repo and let VS do it (but this creates a master repo). Interestingly it also creates a `.gitattributes` which sets the default behaviour to automatically normalise line endings. Which in my case are windows.

[Install .NET on Linux](https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu) which is where I do builds from:

```bash
# build.sh
#!/usr/bin/env bash
dotnet build --configuration Release
```

So I'm building a .NET3.1 solution with .NET6 SDK.

```bash
# create new remote, after creating a new repo on gh
git remote add origin https://github.com/djhmateer/dm-restaurant.git

# -M shortcut for --move --force  https://errorsfixing.com/what-does-the-m-mean-in-git-branch-m-main/ as default branch is master
# we don't need to do this as have done above
# git branch -M main

# set origin as the upstream remote 
git push -u origin main
```

Continuous integration servers could be: TeamCity, Jenkins, Github etc. Appveyor

### Turn on All Error Messages

