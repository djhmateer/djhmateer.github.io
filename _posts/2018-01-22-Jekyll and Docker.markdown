---
layout: post
title:  "Jekyll and Docker"
date:   2018-01-25
# menu: review
categories: jekyl
published: true 
---
![Menu](/assets/2018-01-25-Docker/screen.png)

I like using [Jekyll](https://jekyllrb.com/) and have had this site on [Github pages](https://pages.github.com/) for a few years. Running Jekyll locally on my Windows machine was tricky to setup (I am not a Rubyist), and after a year I gave up! I just sent all changes straight to live.

It is now very easy to get Jekyll running locally with Docker using the official [Jekyll Image](https://hub.docker.com/r/jekyll/jekyll/)

## Install Docker
Firstly install [Docker CE (Community Edition)](https://www.docker.com/community-edition)

## Jekyll/Jekyll Docker Image
Then run the Jekyll image on Docker from a new test directory

```
cd c:/temp
docker run --rm  -v=%cd%:/srv/jekyll -it jekyll/jekyll /bin/bash
```

- --rm means ReMove container after it exits (useful for short lived containers or commands)
- -v is anonymous Volume attach the current directory to /srv/jekyll inside the Linux container
- -it is Interactive Terminal so we can see output on the screen
- jekyll/jekyll is the docker hub image
- /bin/bash is the command we want to run ie go to bash

If all goes well you should end up with this:

![Bash](/assets/2018-01-25-Docker/bash.png)

Now you can run commands:

```
jekyll new myblog
```
![new](/assets/2018-01-25-Docker/new.png)

You now have a brand new Jekyll site in c:\temp\myblog

## How does the Jekyll container interact with c:
When we start the container we map a volume (the -v below)
```
docker run --rm  -v=%cd%:/srv/jekyll -it jekyll/jekyll /bin/bash
```
The container is continually reading new posts (watching the _posts folder) then regenerating the static _site

## How I write articles

- open my [shell](http://cmder.net/) in c:\dev\djhmateer.github.io
- git pull 
- docker-compose up
- edit or create new markdown post files in VS Code in the c:\dev\djhmateer.github.io\_posts directory
- press F5 in my browser pointing to localhost:4000
- fix mistakes in blog post
- git commit -am "changes"
- git push


## Serving the site Locally
We need to open up port 4000 from docker. Exit out of bash and re-run the command:
```
docker run --rm  -v=%cd%:/srv/jekyll -p 4000:4000 -it jekyll/jekyll /bin/bash
jekyll serve --force_polling 
```
If you see any errors (eg can't bind) it probably means you have the port open somewhere else. For me it is when I've got docker containers leftover I didn't know about. Here is how I fix these errors:

```
-- list all docker containers (running and stopped)
docker ps -a
-- remove container ID's 1, 2, and 3 
docker rm -f 1 2 3
```

Now you should be able to see your site by going to localhost:4000 in your browser

## Delete all Docker Containers, Images and Networks
I wrote another [article](/docker/2018/01/26/Docker-Delete-Containers-Images-Networks-and-Volumes.html) on this as it is so important.

## Docker-compose.yml
Lets make it easier to run up docker by using the built in docker-compose cli. Here is the config file **docker-compose.yml** that I use:

```
version: '3'

services:
  jekyll: 
    image: jekyll/jekyll
    container_name: davemateer-com
    environment:
        - JEKYLL_ENV=docker
    command: jekyll serve --config _config.yml,_config.docker.yml --force_polling 
    ports:
        - 4000:4000
    volumes:
        - ./:/srv/jekyll
```
I've added --force_polling so it regenerates on a file save.

It also references a new file called **_config.docker.yml** which contains this line

```
url: "http://localhost:4000"
```

this is to get around the 0.0.0.0 problem on Windows with the home link created in Jekyll see [here](https://tonyho.net/jekyll-docker-windows-and-0-0-0-0/) for more details.

```
-- start the system
docker-compose up
-- stop the system
docker-compose down
```
If you do changes to your **_config.yml** file restart the docker container (ctrl c out, then docker-compose up). The force_polling doesn't pick up _config file changes.


## Going to Production
This is just as normal. Push your repository to Github pages and it will do all it's own regenning.

If you get stuck, try looking at the source for this blog [here](https://github.com/djhmateer/djhmateer.github.io)

## Updating Jekyll
At time of writing the Jekyll/Jekyll image is runing Jekyll 3.6.2. If you delete your gemfile.lock and run bundle update you will get all the dependencies again. If you take off the version numbers it pulled jekyll 3.7.0 at the time of writing. 
```
-- my Gemfile
source "https://rubygems.org"
gem "jekyll", "~> 3.6.2"
gem "minima", "~> 2.0"
```
I've kept my blog at 3.6.2 at the moment

## Caching 
To improve docker-compose up times it looks like it is possible to cache the Gems locally [see Caching](https://github.com/envygeeks/jekyll-docker/blob/master/README.md)

## Summary
- Install Docker
- Run a single command to get Jekyll working inside a container
- Create a new blog
- View site working on localhost:4000
- Automatic regeneration of site on file save
