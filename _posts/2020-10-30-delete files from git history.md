---
layout: post
title: Delete files from git history 
description: 
menu: review
categories: Git 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

Imagine you've checked in an API key into Git by accident and pushed it to a public Git repo.

It happens!

Lets fix it.

## The Problem


![alt text](/assets/2020-10-30/historybutton.jpg "History butotn on Github")

Pressing the history button on the file I know that had an API checked in brings up the commit history

![alt text](/assets/2020-10-30/history.jpg "A commit a few days ago had the problem (it is fixed now)")

I don't really care about the history of this file, so lets delete the history


## BFG

[BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

```bash
# install java
sudo apt install default-jre

wget https://repo1.maven.org/maven2/com/madgag/bfg/1.13.0/bfg-1.13.0.jar

# alias bfg is java -jar bfg.jar

java -jar bfg.jar --delete-files Enquiry.cshtml.cs

bfg --delete-files YOUR-FILE-WITH-SENSITIVE-DATA

# strip out the unwanted dirty data
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# I had to do a force
git push --force

```

## Did it work


![alt text](/assets/2020-10-30/history2.jpg "It worked - history deleted")

Yes it did - I can no longer see the history.

Hmmmm but I can still see them from [this link](https://github.com/djhmateer/password-postgres/blob/a73f27214c3b56a6337aebde99b0ca38ca129de3/src/PasswordPostgres.Web/Pages/Enquiry.cshtml.cs)

![alt text](/assets/2020-10-30/history3.jpg "Why can I still link to it?")

## Read the messages


Found 139 objects to protect
Found 3 commit-pointing refs : HEAD, refs/heads/main, refs/remotes/origin/main

Protected commits
-----------------

These are your protected commits, and so their contents will NOT be altered:

 * commit 0887ec7a (protected by 'HEAD') - contains 1 dirty file :
        - src/PasswordPostgres.Web/Pages/Enquiry.cshtml.cs (3.7 KB)

WARNING: The dirty content above may be removed from other commits, but as
the *protected* commits still use it, it will STILL exist in your repository.

Details of protected dirty content have been recorded here :

/mnt/c/dev/test/password-postgres.bfg-report/2020-10-30/10-20-45/protected-dirt/

If you *really* want this content gone, make a manual commit that removes it,
and then run the BFG on a fresh copy of your repo.


So lets take a copy of the text and delete it.

```bash

git rm Enquiry.cshtml.cs

sudo java -jar bfg.jar --delete-files Enquiry.cshtml.cs

git reflog expire --expire=now --all && git gc --prune=now --aggressive

```