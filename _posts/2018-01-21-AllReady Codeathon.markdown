---
layout: post
title:  "AllReady Codeathon"
date:   2018-01-21
menu: review
categories: allready 
published: true 
---
![Menu](/assets/2018-01-22-AllReady/header.jpg)

[Humanitarian Toolbox](http://www.htbox.org/) is a wondering cause. [Good conversation](http://www.htbox.org/blog/introducing-james-chambers)

A massive thanks to [Steve Gordon](https://www.stevejgordon.co.uk/) for an excellently ran Codeathon. We did 30PR's during the day with 18 coders working simultaneously. 

### Git Workflow
What I found most challenging was how to use git well whilst a lot of change in the project:

look for an issue in Github Issues and put 'working on it' in the comments section

```
git checkout -b 2204
// work on the code and change files
git add filename (use gitkraken to stage a file - avoid unnecessary whitespace changes)

git checkout master
git stash (as had gulp compiled site.js, mappingTools.js etc I didn't want to commit)
git fetch upstream
git merge upstream/master
git checkout 2204
git rebase master
git push origin 2204 -f  (when ready to push up branch to do a PR)
```
Start the PR message with the corresponding issue number eg #2204 Fixed the image in Edit

### Javascript dependencies
This is worthy of many blog posts. In summary I had to fight to get the js dependencies installed and was not the only one.

I had to reset my repo a few times, just to make sure nothing crazy was happening:

```
git reset --hard head
git clean -dfx
```

This was as good as I got
![Menu](/assets/2018-01-22-AllReady/js.png)


### Appveyor
https://ci.appveyor.com/project/HTBox/allready/history

We use appveyor to check every PR (build and run tests). It did take approx 6:30 per build which meant there was always a queue which sloweded some PR's down.

### Slack
We use a private slack channel throughout the day 
https://htbox.slack.com


Interesting discussions throughout the day were on:
- Why use Mediatr
- Use of async throughout the code
- Use of Tag Helpers