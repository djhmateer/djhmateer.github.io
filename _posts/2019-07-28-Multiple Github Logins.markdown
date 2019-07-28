---
layout: post
title: Multiple GitHub Logins 
description: 
menu: review
categories: GitHub 
published: true 
comments: false
sitemap: false
image: /assets/2019-07-18/1.jpg
---
I use multiple GitHub logins to host mutiple GitHub pages websites: 

- [https://github.com/djhmateer](https://github.com/djhmateer) - my main GH account
- [https://github.com/penhemingway](https://github.com/penhemingway) - my [nom de guerre](https://en.wiktionary.org/wiki/nom_de_guerre) 

Yes it is possible to host multiple 'websites' under a single GH login using the [2 static hosting models that GH give](https://help.github.com/en/articles/user-organization-and-project-pages).

- User and Organisation Pages eg [djhmateer.github.io](https://djhmateer.github.io)
- Project Pages sites eg [djhmateer.github.io/startbootstrap-jekyll](https://djhmateer.github.io/startbootstrap-jekyll)

In my opinion this is messy, as you get cross pollination potentially with: djhmateer.github.io (which is davemateer.com) pointing to davemateer.com/startbootstrap-jekyll. 

## Multiple GH Logins
Make sure [your version of git is up to date](https://git-scm.com/download). As of 28th July 2019 it is 2.22.0.

![alt text](/assets/2019-07-18/4.png "Git Credential Manager"){:width="400px"}     
We want Git Credential Manager.

## Delete current cache of passwords (Windows)
Search for `Credential Manager` from the start key on Windows and delete any cached access tokens.

![alt text](/assets/2019-07-18/5.png "Remove cached access token from credential manager"){:width="400px"}     

then login on your main account again to GH

![alt text](/assets/2019-07-18/7.png "Login to GH"){:width="400px"}     

## HTTPS not SSH Keys
We are using https not ssh keys
![alt text](/assets/2019-07-18/6.png "HTTPS not SSH"){:width="400px"}     

Lets go to our 2nd account:

```bash
git clone https://github.com/penhemingway/penhemingway.github.io.git
git remote -v

# we get
#origin  https://github.com/penhemingway/penhemingway.github.io.git (fetch)
#origin  https://github.com/penhemingway/penhemingway.github.io.git (push)

git remote set-url origin https://penhemingway@github.com/penhemingway/penhemingway.github.io.git

#origin  https://penhemingway@github.com/penhemingway/penhemingway.github.io.git (fetch)
#origin  https://penhemingway@github.com/penhemingway/penhemingway.github.io.git (push)

git config credential.useHttpPath true
```
![alt text](/assets/2019-07-18/8.png "HTTPS not SSH"){:width="400px"}     
Now login with the 2nd account and it works

## What have we done?
[Technically this issues explains more](https://github.com/microsoft/Git-Credential-Manager-for-Windows/issues/749) but essentially we are telling the 2nd account to `useHttpPath` which means along with providing the username in the remote, it can use a different login.  

I like having my main account as the default.





