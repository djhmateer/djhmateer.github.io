---
layout: post
# title: Updating Open Visual Studio utility to .NET 6 
# description: A small utility which opens visual studio from the command shell looking for a `.sln` file in the current directory. Updating to .NET6
menu: review
categories: git
published: true 
comments: false     
# sitemap: true
image: /assets/2022-04-13/sc.jpg
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->


I'm working on [auto-archiver](https://github.com/bellingcat/auto-archiver) and have my own [fork](https://github.com/djhmateer/auto-archiver)

Most projects I work on I'm the sole developer so generally work on the main (I prefer this to master now)


```bash
# machine default to main
git config --global init.defaultBranch main

# so can rewrite history before pushing to online Git service
git commit --allow-empty -m "Initial commit"

```

## Working on main and merging ie Syncing a fork

As a sanity check I always make a copy of the entire directory

I did the initial fork from the GUI. To work from command line I have to add the `upstream` manually to my repo:

[Configuring a remote for a forl](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-for-a-fork)

```bash
# origin  https://github.com/djhmateer/auto-archiver.git (fetch)
# origin  https://github.com/djhmateer/auto-archiver.git (push)
git remote -v

# configuring upstream remote for the fork
git remote add upstream https://github.com/bellingcat/auto-archiver

#
git fetch upstream
```

[![alt text](/assets/2022-04-27/fetch.jpg "desktop")](/assets/2022-04-27/fetch.jpg)

So I now have:

[![alt text](/assets/2022-04-27/branch.jpg "desktop")](/assets/2022-04-27/branch.jpg)

```bash
# download new data from remote - harmless. whereas git pull would try to integrate and merge
git fetch

# view all remote branches
git branch -r

# make sure we are on the main local branchj
git checkout main

# merge changes from upstream/main
# will not lose any local changes
git merge upstream/main
```

## Do a PR

An an way to manually merge in changes from the upstream is to create a PR on my own fork.

[![alt text](/assets/2022-04-27/ui.jpg "desktop")](/assets/2022-04-27/ui.jpg)

Creating a PR into my own fork.

[![alt text](/assets/2022-04-27/conflict.jpg "desktop")](/assets/2022-04-27/conflict.jpg)

So we have a conflict - this is good as I want to review code coming into my fork.

The instructions `use the command line` above say to

```bash
# create new branch bellingcat-main from my main branch
git checkout -b bellingcat-main main

# pull the main branch from bellingcat. Into my bellingcat-main
git pull https://github.com/bellingcat/auto-archiver.git main

# I now have merge conflicts and changes
# Use VSCode like below to see the changes and merge
```

[![alt text](/assets/2022-04-27/vscode.jpg "desktop")](/assets/2022-04-27/vscode.jpg)

I did the above and got conflicts. Lets use VS Code to resolve them. 

```bash
git add .
git commit -m "merged"

git checkout main
git merge --no-ff bellingcat-main
# this automatically closed the PR
git push origin main

# don't need to delete remote branch as the PR did it.
#git push -d origin bellingcat-main

# delete localy branch
git branch -d bellingcat-main

```

## Create a PR to the upstream and manually do changes

I would like to create a simple PR with a single change from my fork which has many changes. All working on the `main` branch.

[![alt text](/assets/2022-04-27/pr.jpg "desktop")](/assets/2022-04-27/pr.jpg)

From my fork lets open a PR.

The file I want to create a PR for is

[https://github.com/djhmateer/auto-archiver/blob/main/archivers/youtubedl_archiver.py](https://github.com/djhmateer/auto-archiver/blob/main/archivers/youtubedl_archiver.py)

hmmm can I branch off the upstream/main ?

[branch](https://stackoverflow.com/questions/38004838/git-how-to-ensure-new-branch-is-based-on-upstream-master)

[set-upstream](https://stackoverflow.com/questions/37770467/why-do-i-have-to-git-push-set-upstream-origin-branch)

```bash
# create a new branch and checkout
git checkout -b foo

# check if anything happened upstreawm
git fetch upstream

# foo branch is now the same as upstream/main
git reset --hard upstream/main

# same as -u
git push --set-upstream origin foo 

# do changes
git add .
git commit -m "Updated wwww to www"
git push

# then create a PR from the foo branch
```

## Create a PR from main 

Create a branch on my fork with some changes - want an easy way to see all changes.


```bash
git checkout -b bar

# pull the main branch from bellingcat. Into my bellingcat-main
git pull https://github.com/bellingcat/auto-archiver.git main

```