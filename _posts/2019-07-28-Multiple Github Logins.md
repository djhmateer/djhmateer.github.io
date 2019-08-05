---
layout: post
title: Multiple GitHub Logins 
description: Using multiple GitHub logins to host multiple GitHub Pages static sites. I'm using HTTPS rather than SSH keys. 
#menu: review
categories: GitHub 
published: true 
comments: true   
sitemap: true
image: /assets/2019-07-18/6.png
---
I use multiple GitHub logins to host multiple [GitHub Pages User Sites](https://pages.github.com/#tutorial):

- [https://github.com/djhmateer](https://github.com/djhmateer) - my main GH account which hosts [davemateer.com](https://davemateer.com)
- [https://github.com/penhemingway](https://github.com/penhemingway) - my 2nd account [penhemingway.github.io](https://penhemingway.github.io)

![alt text](/assets/2019-07-18/6.png "HTTPS not SSH"){:width="350px"}     
 Importantly I use HTTPS, which is now the norm, [rather than SSH Keys](https://medium.com/@pinglinh/how-to-have-2-github-accounts-on-one-machine-windows-69b5b4c5b14e)

## Multiple GH Logins
Make sure [your version of git is up to date](https://git-scm.com/download). As of 28th July 2019 it is 2.22.0. and you've got Git Credenital Manager installer. This is for Windows, but I'm sure the *nix concepts will be the same.

![alt text](/assets/2019-07-18/4.png "Git Credential Manager"){:width="400px"}     
We want Git Credential Manager.

## Delete current cache of GitHub passwords
Search for `Credential Manager` from the start key on Windows and delete any cached passwords. 

![alt text](/assets/2019-07-18/5.png "Remove cached access token from credential manager"){:width="400px"}     

## Edit the git config file
In a repo requiring your 2nd GH account:

![alt text](/assets/2019-07-28/2.png "Edit the config file"){:width="800px"}     

So I specify the name of any non-default GH accounts, and add useHttpPath.  

I prefer manually editing the .git/config file. To see the hidden file in VS Code, File, Preferences, Settings, search for exclude. Delete the .git setting.

## git commands 
This is another way of doing the above.

```bash
git clone https://github.com/penhemingway/penhemingway.github.io.git
git remote -v

# we get
#origin  https://github.com/penhemingway/penhemingway.github.io.git (fetch)
#origin  https://github.com/penhemingway/penhemingway.github.io.git (push)

# add in the username in front of github.com
git remote set-url origin https://penhemingway@github.com/penhemingway/penhemingway.github.io.git

git remote -v
# view the changes
#origin  https://penhemingway@github.com/penhemingway/penhemingway.github.io.git (fetch)
#origin  https://penhemingway@github.com/penhemingway/penhemingway.github.io.git (push)

# update httpPath
# any credentials used should be associated with full repository path, not the entire domain eg github.com default (our main account)
git config credential.useHttpPath true
```
![alt text](/assets/2019-07-18/8.png "HTTPS not SSH"){:width="400px"}     
Now login with the 2nd account and it works

## What have we done?
[Technically this issues explains more](https://github.com/microsoft/Git-Credential-Manager-for-Windows/issues/749) 

![alt text](/assets/2019-07-18/9.png "Got 2 cached passwords now"){:width="400px"}     
And looking at the Windows Credential Manager (after you've logged into your default GH account again) you can see our 2 cached passwords.   

So now I don't notice I'm working with multiple GitHub Accounts on one machine.




