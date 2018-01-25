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

It is now very easy to get Jekyll running locally using the official [Jekyll Docker image](https://hub.docker.com/r/jekyll/jekyll/)

## Install Docker
Firstly install [Docker CE (Community Edition)](https://www.docker.com/community-edition)

## Jekyll/Jekyll Docker Image
Lets spin up the Jekyll image on Docker from a new test directory

```
cd c:/temp
docker run --rm  -v=%cd%:/srv/jekyll -it jekyll/jekyll /bin/bash
```

- --rm means ReMove container after it exits (useful for short lived containers or commands)
- -v is Volume mountain the current directory to /srv/jekyll inside the container (it is Alpine linux)
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

## Serving the site Locally
We need to open up port 4000 from docker to serve. So exit out of bash and re run the docker command:
```
docker run --rm  -v=%cd%:/srv/jekyll -p 4000:4000 -it jekyll/jekyll /bin/bash
```

if you see any errors (eg can't bind) it probably means you have the port open somewhere else. For me it is when I've got docker containers leftover I didn't know about. Here is how I fix these errors:

```
-- list all docker containers (running and stopped)
docker ps -a
-- remove container ID's 1, 2, and 3 
docker rm -f 1 2 3
```

Now you should be able to see your site by going to localhost:4000 in your browser

## Delete all Docker Containers, Images and Networks
If you are like me I create a lot of containers and have many images cluttering up my disk. Also the networks can cause confusing errors if left around. So I use **powershell** to easily delete everything (note I've not covered volumes here). Bash instructions [here](https://www.elliotjreed.com/remove-all-docker-containers-volumes-networks-and-images/)

```
docker ps -a -q | % { docker rm $_ }
docker rmi $(docker images -q)
docker network prune
```

![ps](/assets/2018-01-25-Docker/ps.png)

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

## Going to Production
This is just as normal. Push your repository to Github pages and it will do all it's own regenning.o

If you get stuck, try looking at the source for this blog [here](https://github.com/djhmateer/djhmateer.github.io)