---
layout: post
title:  "AllReady Codeathon"
date:   2018-01-21
menu: review
categories: allready 
published: true 
---

A massive thanks to Steve Gordon for an excellently ran Codeathon. We did 30PR's during the day with 18 coders working simultaneously. 

### Slack
We use slack throughout the day
https://htbox.slack.com

### Git Workflow
Whilst the is a lot of change in the project:

look for an issue in Github Issues and put 'working on it' in the comments section
git checkout -b 2204
git add filename (or use gitkraken to easily stage a file - being careful to avoid unnecessary whitespace change commits)

git checkout master
git stash (this was very useful as had .lockfiles etc for the js dependencies and ancilliary build artifacts)
git fetch upstream
git merge upstream/master
git checkout 2204
git rebase master
git push origin 2204 -f  (when ready to push up branch to do a PR)


### Tips
Start the PR message with the corresponding issue number eg #2204 Fixed the image in Edit

### Appveyor
https://ci.appveyor.com/project/HTBox/allready/history

We use appveyor to check every PR (build and run tests). It did take approx 6:30 per build which meant there was always a queue, and slowed some PR's down.







[https://www.stevejgordon.co.uk/cqrs-using-mediatr-asp-net-core](https://www.stevejgordon.co.uk/cqrs-using-mediatr-asp-net-core) 

### Why Use Mediatr? 
In process messaging - a way of easily splitting up the application. Driving towards microservices?

### Simple Example 
{% highlight csharp %}

{% endhighlight %}

### Using Dapper (Async)
asdf

### Passing a List<ViewModel>
asdf

### Cancellation Tokens
I don't forsee users having to manually cancel any of the async jobs, so am ignoring the cancellation tokens.