---
layout: post
title:  "Jekyll and Docker"
# menu: review
categories: Jekyll Docker
published: true 
comments: true
redirect_from: /jekyl/2018/01/25/Jekyll-and-Docker.html
sitemap: true
---
![Menu](/assets/2018-01-25-Docker/screen.png)

I like using [Jekyll](https://jekyllrb.com/) and have had this site on [Github pages](https://pages.github.com/) for a few years. Running Jekyll locally on my Windows machine was tricky to setup (I am not a Rubyist), and after a year I gave up! I just sent all changes straight to live.

It is now very easy to get Jekyll running locally with Docker using the official [Jekyll Image](https://hub.docker.com/r/jekyll/jekyll/)

## Install Docker

Firstly install [Docker CE (Community Edition)](https://www.docker.com/community-edition)

## Jekyll/Jekyll Docker Image

Then run the [Jekyll image on Docker](https://hub.docker.com/r/jekyll/jekyll) from a new test directory

```bash
cd c:/temp/myBlog
docker run --rm -v=%cd%:/srv/jekyll -it jekyll/jekyll /bin/bash
```

- --rm means ReMove container after it exits (useful for short lived containers or commands)
- -v is anonymous Volume attach the current directory to /srv/jekyll inside the Linux container
- -it is Interactive Terminal so we can see output on the screen
- jekyll/jekyll is the docker hub image
- /bin/bash is the command we want to run ie go to bash

If all goes well you should end up with this:

![Bash](/assets/2018-01-25-Docker/bash.png)

Now you can run commands:

```bash
jekyll new .
```

![new](/assets/2018-01-25-Docker/new.png)

You now have a brand new Jekyll site in c:\temp\myBlog. On 28th July 2019, this was Jekyll 3.8.6

![Bash](/assets/2018-01-25-Docker/1.png)
These are the files produced

## Serving the site Locally

We need to open up port 4000 from docker. Exit out of bash and re-run the command:

```bash
docker run --rm -v=%cd%:/srv/jekyll -p 4000:4000 -it jekyll/jekyll /bin/bash
jekyll serve --force_polling
```

If you see any errors (eg can't bind) it probably means you have the port open somewhere else. For me it is when I've got docker containers leftover I didn't know about. Here is how I fix these errors:

```bash
-- list all docker containers (running and stopped)
docker ps -a
-- remove container ID's 1, 2, and 3
docker rm -f 1 2 3
```

Now you should be able to see your site by going to localhost:4000 in your browser

![Bash](/assets/2018-01-25-Docker/2.png)

If it doesn't work try deleting all of Dockers [remnants](/docker/2018/01/26/Docker-Delete-Containers-Images-Networks-and-Volumes.html)

## Docker-compose.yml and Livereload

Lets make it easier to run up docker by using the built in docker-compose cli. Here is the config file **docker-compose.yml** that I use:

Livereload required Jekyll >3.7.

```yml
version: '3'

services:
  jekyll: 
    image: jekyll/jekyll
    container_name: davemateer-com
    environment:
        - JEKYLL_ENV=docker
    # force_polling makes the linux box watch for any changes to files, then it will regenerate
    # livereload gets the browser to automatically refresh when changes happen to files
    command: jekyll serve --force_polling --livereload 
    ports:
        - 4000:4000
        - 35729:35729
    volumes:
        - ./:/srv/jekyll
```

```bash
-- start the system
docker-compose up
-- stop the system
docker-compose down
```

If you do changes to your **_config.yml** file restart the docker container (ctrl c out, then docker-compose up). The force_polling doesn't pick up _config file changes.

## How I write articles

- open my [shell](http://cmder.net/) in c:\dev\djhmateer.github.io
- git pull (I have [an alias](/cmder/2018/01/30/Cmder-Shell.html) - gp)
- docker-compose up
- edit or create new markdown post files in c:\dev\djhmateer.github.io\_posts directory
- magically watch as the browser updates (I've got autosave turned on in VSCode) 
- git commit -am "changes" then push (I have [an alias](/cmder/2018/01/30/Cmder-Shell.html) - p)

## Going to Production

Push your repository to [Github Pages](https://pages.github.com/) and it will do all it's own regenning on their server. So you can just edit posts and push them to Github and it will work. However I do really like seeing real time blog posts.  

If you get stuck, try looking at the source for this [blog](https://github.com/djhmateer/djhmateer.github.io)  

## Updating Jekyll

At time of writing the Jekyll/Jekyll image is ~~runing Jekyll 3.7.3~~ As of 25th Nov 2018 it is 3.8.5

```bash
docker run --rm -v=%cd%:/srv/jekyll -it jekyll/jekyll /bin/bash
bundle update jekyll
```

If you delete your gemfile.lock and run jekyll bundle update you will get all the dependencies again (actually I didn't need to delete the lock file sometimes). It pulled jekyll 3.7.3 at the time of writing, but I make sure its the same as the [docker version](https://github.com/envygeeks/jekyll-docker)

## Caching 

To improve docker-compose up times it looks like it is possible to cache the Gems locally [see Caching](https://github.com/envygeeks/jekyll-docker/blob/master/README.md)

## Multiple Github accounts

**update 28th July 2019** I've [written an article here](/2019/07/28/Multiple-Github-Logins) on how to do it.

**SSH Keys - I don't use this anymore**
You are only allowed 1 Github Pages account per user. [Here](https://code.tutsplus.com/tutorials/quick-tip-how-to-work-with-github-and-multiple-accounts--net-22574) is how I have multiple GitHub accounts on 1 machine. As an aide memoire this is what I do on my Win 10 machines:  

```bash
cd \users\davidma\.ssh
-- create a new public and private key
-- save it as id_rsa_ph
ssh-keygen -t rsa -C "penhemingway@outlook.com"

-- logon to Github and add the .pub ssh key so GH can identify this user

start-ssh-agent
-- add the new key to our agent (I use ph to denote penhemingway)
ssh-add id_rsa_ph

-- create a new config file
edit config

#Default GitHub - /djhmateer (davemateer@gmail.com)
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa
#New account - /penhemingway (penhemingway@outlook.com)
Host github-ph
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_ph

cd /dev/test/penhemingway.github.io
git remote remove origin
git remote add origin git@github-ph:penhemingway/penhemingway.github.io.git
git push --set-upstream origin master
```
