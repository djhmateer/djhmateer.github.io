---
layout: post
title:  "Docker Delete Containers Images Networks and Volumes"
date:   2018-01-26
# menu: review
categories: docker 
published: true 
---

I use these commands all the time in Docker to reset my system.

If you are like me I create a lot of containers and have many images cluttering up my disk. Also the networks can cause confusing errors if left around. So I use **powershell** to easily delete everything. Bash instructions [here](https://www.elliotjreed.com/remove-all-docker-containers-volumes-networks-and-images/)

```
docker ps -a -q | % { docker rm $_ }
docker rmi $(docker images -q)
docker network prune
docker volume prune
```

![ps](/assets/2018-01-25-Docker/ps.png)

