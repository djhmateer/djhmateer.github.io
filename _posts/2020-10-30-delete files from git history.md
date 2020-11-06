---
layout: post
title: Delete files from git history 
description: Deleting files from Git history on a public GitHub repo.
#menu: review
categories: Git 
published: true 
comments: true     
sitemap: true
image: /assets/2020-10-30/github.jpg
---

[![alt text](/assets/2020-10-30/github.jpg "Photo from @yancymin on Unsplash")](https://unsplash.com/@yancymin)

Imagine you've checked in an API key into Git by accident and pushed it to a public Git repo.

It happens!

Lets (try to) fix it.

[GitHub docs on removing sensitive data from a repo](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/removing-sensitive-data-from-a-repository)

[How to remove file from git repo](https://itextpdf.com/en/blog/technical-notes/how-completely-remove-file-git-repository)

## The Problem

Using the GitHub we can demonstrate the problem:

![alt text](/assets/2020-10-30/historybutton.jpg "History button on Github")

Pressing the history button on the file I know that had an API key checked in brings up the commit history

![alt text](/assets/2020-10-30/history.jpg "A commit a few days ago had the problem (it is fixed now)")

I don't really care about the history of this file, so lets delete the history


## BFG

[BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) is a handy tool, however there is no `apt get` way to install it, so I did the following:

```bash
# install java
sudo apt install default-jre

# cd into the root of the repo you are working on

# download the jar 
# c current dir, O is shell output 
wget -cO - https://repo1.maven.org/maven2/com/madgag/bfg/1.13.0/bfg-1.13.0.jar > bfg.jar

# many people alias bfg='java -jar bfg.jar'
java -jar bfg.jar --delete-files Enquiry.cshtml.cs

# strip out the unwanted dirty data
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# I had to do a force
git push --force
```

## It works (mostly) 

![alt text](/assets/2020-10-30/history2.jpg "It worked - history deleted")

Yes it did - I can no longer see the history.

Hmmmm but I can still see them from [this link](https://github.com/djhmateer/password-postgres/blob/a73f27214c3b56a6337aebde99b0ca38ca129de3/src/PasswordPostgres.Web/Pages/Enquiry.cshtml.cs)

![alt text](/assets/2020-10-30/history3.jpg "Why can I still link to it?")

## Why can I still see it on GitHub

However there is still a sneaky way to see the old commit, and for me the link was

https://github.com/djhmateer/password-postgres/commits/a73f27214c3b56a6337aebde99b0ca38ca129de3/src/PasswordPostgres.Web/Pages/Enquiry.cshtml.cs

And I could still see the file

[This exaplains why](https://itextpdf.com/en/blog/technical-notes/how-completely-remove-file-git-repository) in Scenario 4.

## GitGuardian

[GitGuardian](https://github.com/GitGuardian) is an automated secrets detection and remediation service which should help stop secrets being checked in.

After installing you can then view that status on the [Gitguardian Dashboard](https://dashboard.gitguardian.com/)

## Conclusion

Be careful with secret keys.

It is a real pain if you've checked in a key into a public repo on GitHub.

If it's your own project and you don't care about the history, delete everything and start again. By far the most secure and easiest way.
