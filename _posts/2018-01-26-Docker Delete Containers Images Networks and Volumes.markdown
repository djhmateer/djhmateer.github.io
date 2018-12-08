---
layout: post
title:  Docker Delete Containers Images Networks and Volumes
# menu: review
categories: docker 
published: true 
redirect_from: docker/2018/01/26/Docker-Delete-Containers-Images-Networks-and-Volumes.html 
---

I use these commands all the time in Docker to reset my system.

### Update 9th Oct 2018
I like to go back to a clean slate easily so have a [cmder shortcut](/cmder/2018/01/30/Cmder-Shell.html)
```
ddel
```

### Update 30th Jan 2018
From [this](https://stackoverflow.com/a/34616890/26086) article I now use 

Day to day in testing (keep images)
```
docker container prune -f 
docker network prune -f
docker volume prune -f

```
and **nuclear** option to delete all images too

```
docker container prune -f 
docker image prune -af
docker network prune -f
docker volume prune -f

```

## Original
If you are like me I create a lot of containers and have many images cluttering up my disk. Also the networks can cause confusing errors if left around. So I use **powershell** to easily delete everything. Bash instructions [here](https://www.elliotjreed.com/remove-all-docker-containers-volumes-networks-and-images/)

```
docker ps -a -q | % { docker rm $_ }
docker rmi $(docker images -q)
docker network prune
docker volume prune
```

![ps](/assets/2018-01-25-Docker/ps.png)

