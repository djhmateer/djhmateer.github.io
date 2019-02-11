---
layout: post
title:  Netlify with Jekyll
categories: netlify jekyll
published: true 
redirect_from: netlify/2018/02/02/Netlify-with-Jekyll.html 
---
I use Jekyll for this website, and for our [wedding website](https://web.archive.org/web/20180901013553/https://daveellie.co.uk/). I used Github pages for this website, however it isn't easy to have multiple GH pages from a single GH account, so here is how I did it with Netlify.

I chose this as it is near the top of [the official deployment docs](https://jekyllrb.com/docs/deployment-methods/#netlify), and followed the [mentioned blog post](https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/)

I used [docker]({% post_url 2018-01-25-Jekyll and Docker %}) on my local windows machine to create the new Jekyll site:

```
docker run --rm  -v=%cd%:/srv/jekyll -it jekyll/jekyll /bin/bash
jekyll new daveellie
```
then docker-compose.yml:

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
with _config.docker.yml
```
url: "http://localhost:4000"
```
then a special file for netlify called .ruby-version
```
2.4.2
```
this is because their default ruby version is 2.1.2 which doesn't play well with the latest version of Jekyll.

I spun up the container
```
docker-compose up
```
Then pushed to the new GH [repo](https://github.com/djhmateer/daveellie)

The rest of the install was fine using DNSimple for DNS, and netlify to get the HTTPS cert from letsencrypt. All traffic is forced to be https.

## Use Netlify just to host static content
The default way is to get Netlify to build Jekyll then publish. What if we just want it to host the static content, which speeds up the deployment time to live.

![ps](/assets/2018-02-02/net.png)
Remove the build command (jekyll build) and it will serve the static content from _site without doing any building.

![ps](/assets/2018-02-02/vsc.png)
Not forgetting to make sure your _site is commited into your repo.


![ps](/assets/2018-02-02/screen.png)
Site live and empty.