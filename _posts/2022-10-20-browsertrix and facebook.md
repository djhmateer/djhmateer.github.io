---
layout: post
# title: MSSQL PHP on WSL setup
description: 
menu: review
categories: browsertrix
published: true 
comments: false     
sitemap: true
image: /assets/2022-09-22/1.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->

<!-- [![alt text](/assets/2022-09-15/fire-map.jpg "email")](/assets/2022-09-15/fire-map.jpg) -->

<!-- [![alt text](/assets/2022-09-15/cookie.jpg "email")](/assets/2022-09-15/cookie.jpg) -->

[browsertrix-crawler](https://github.com/webrecorder/browsertrix-crawler) (BC) is a browser based crawling system using [Puppeteer](https://github.com/puppeteer/puppeteer) which is a headless Chrome API.

Part of the [https://webrecorder.net/](https://webrecorder.net/) suite of tools which includes

- [https://webrecorder.net/tools#archivewebpage](https://webrecorder.net/tools#archivewebpage) Chrome extension and standalone desktop app. Allows archiving as you browse.

- [https://replayweb.page/](https://replayweb.page/) view an archive in WARC and WACZ

## Single Page from a static site

Lets explore what BC can do

```bash
# --text automated text extraction for full text search
# --collection is where to save
docker run -v $PWD/crawls:/crawls/ -it webrecorder/browsertrix-crawler crawl \
--url https://davemateer.com/2022/09/22/mssql-php-local-on-wsl  \
--generateWACZ --text --collection mssql11
```

[![alt text](/assets/2022-10-20/1.jpg "email")](/assets/2022-10-20/1.jpg)

The output of the crawler

[![alt text](/assets/2022-10-20/3.jpg "files")](/assets/2022-10-20/3.jpg)

Main output of the crawler - warc files.

[![alt text](/assets/2022-10-20/4.jpg "files")](/assets/2022-10-20/4.jpg)

first file (unzipped) looking at the warc


## ReplayWeb.page

[![alt text](/assets/2022-10-20/5.jpg "files")](/assets/2022-10-20/5.jpg)

[https://replayweb.page/](https://replayweb.page/) is a browser based viewer that loads web archive files provided. [docs](https://replayweb.page/docs/)

It can get confused so to delete the service worker, click the button from F12 dev toolbar as shown above.


[![alt text](/assets/2022-10-20/6.jpg "files")](/assets/2022-10-20/6.jpg)

then it can render the saved webpage.
### Formats

Web archive formats supported by webrecorder.net suite of tools include

- WARC [Web ARChive](https://en.wikipedia.org/wiki/Web_ARChive) .warc, .warc.gz - Supported - the standard to follow.
- WACZ - Newly proposed format -  .wacz - In Progress.

## Simple site - 1 page only and combine warc

```bash
docker run -v $PWD/crawls:/crawls/ -it webrecorder/browsertrix-crawler crawl \
--url http://brokenlinkcheckerchecker.com/pagec-single-image \
--scopeType page \
--combineWarc \
--collection blcc-single
```

A single page to crawl only

Combine warcs into a single file which is useful for parsing all the images out of.

## Facebook - not logged in - lady simple URL

So I can save the [facebook lady](https://www.facebook.com/photo/?fbid=1329142910787472&set=a.132433247125117) page using webrecorder locally to a warc file which I can parse out the images from.

Can I do this with browsertrix?

```bash
# FB lady works without login
# notice URL is simplified
docker run -v $PWD/crawls:/crawls/ -it webrecorder/browsertrix-crawler crawl \
--url https://www.facebook.com/photo/?fbid=1329142910787472 \
--scopeType page \
--combineWarc \
--collection facebook-lady10
```

Yes this works fine and gets the image I'm interested in so I can [warc parse and save the image]()

It also works fine when logged in (see below)

## Facebook - not logged in - lady full url

if I want more safety with passing special characters to docker then the easiest thing to do is real from a file:

```bash
# FB lady with full URL via url.txt
docker run -v $PWD/crawls:/crawls/ \
-v $PWD/url.txt:/app/url.txt \
-it webrecorder/browsertrix-crawler crawl \
--urlFile /app/url.txt \
--scopeType page \
--combineWarc \
--collection facebook-lady11
```

and

```txt
# url.txt
https://www.facebook.com/102940249227144/photos/pcb.109374295250406/109374168583752/?type=3&theater
```

## Facebook - permalink - building damage - doesn't work

[https://www.facebook.com/permalink.php?story_fbid=pfbid02XiNQpuUtgmovNKF6E5N6xmoxn7LwBjY1T5E9SjyFH4BuRXKtrk8t5Gdxmi4ve5Gdl&id=102940249227144](https://www.facebook.com/permalink.php?story_fbid=pfbid02XiNQpuUtgmovNKF6E5N6xmoxn7LwBjY1T5E9SjyFH4BuRXKtrk8t5Gdxmi4ve5Gdl&id=102940249227144) building damage

```bash
docker run -v $PWD/crawls:/crawls/ -v $PWD/url.txt:/app/url.txt -it webrecorder/browsertrix-crawler crawl --urlFile /app/url.txt --scopeType page --combineWarc --collection building14
```
if I put this in and not logged in, all more CPU cores peg.

restarting docker and deleting containers doesn't work. I have to restart the bash session. Sometimes it does work. Trying to stop it using --rm below

```bash
# remove the container after it stops
docker run -v $PWD/crawls:/crawls/ -v $PWD/url.txt:/app/url.txt -it webrecorder/browsertrix-crawler crawl --urlFile /app/url.txt --scopeType page --combineWarc --collection building14 --rm
```

[![alt text](/assets/2022-10-20/7.jpg "files")](/assets/2022-10-20/7.jpg)

Load Error: Navigation timeout of 90000 ms exceeded

Page Load Failed: Reason: Error: Timeout hit: 180000

Essentially it is 2 times the `--timeout` default of 90seconds

and it doesn't get the images!


## Facebook - building damage - logged in using profiles feature 

[Browsertrix profiles](https://github.com/webrecorder/browsertrix-crawler#creating-and-using-browser-profiles) a file is made with temporary session cookies.

```bash
#fb login create profile
docker run -p 9222:9222 -p 9223:9223 -v $PWD/crawls/profiles:/crawls/profiles/ -it webrecorder/browsertrix-crawler create-login-profile --interactive --url "https://facebook.com/"
```
it creates a state of the browser.. so 16MB profile.. stored in /crawls/profiles/profile.tar.gz


```bash
# run archive on page using logged in profile
# and 30 sec timeout
docker run -v $PWD/crawls:/crawls/ -v $PWD/url.txt:/app/url.txt --rm -it webrecorder/browsertrix-crawler crawl --urlFile /app/url.txt --scopeType page --combineWarc  --profile /crawls/profiles/profile.tar.gz --timeout 30 --collection lady20
```

Success and have the images we want.

But the problem here is we get other images in other posts on the logged in users timeline.

https://www.facebook.com/khitthitnews/posts/pfbid0PTvT6iAccWqatvbDQNuqpFwL5WKzHuLK4QjP97Fwut637CV3XXQU53z1s2bJMAKwl

If we get the photos URL it works well

https://www.facebook.com/khitthitnews/photos/pcb.1646726145764725/1646726009098072/


## Facebook - accept all cookies - works

However a better way is just to accept the cookies, then we don't have the rest of the timeline posts. So using the profile feature to just accept cookies

```bash
# fb accept cookies 
docker run -p 9222:9222 -p 9223:9223 -v $PWD/crawls/profiles:/crawls/profiles/ -it webrecorder/browsertrix-crawler create-login-profile --interactive --url "https://facebook.com/"
```

then

```bash
docker run -v $PWD/crawls:/crawls/ -v $PWD/url.txt:/app/url.txt --rm -it webrecorder/browsertrix-crawler crawl --urlFile /app/url.txt --scopeType page --combineWarc  --profile /crawls/profiles/profile.tar.gz --timeout 30 --collection 40
```




## OLD

## Twitter 

[https://twitter.com/bellingcat/status/1572958778177515520](https://twitter.com/bellingcat/status/1572958778177515520) this will not work and will stall with a message `note: waitForNetworkIdle timed out, ignoring`

```bash
# wont work
docker run -v $PWD/crawls:/crawls/ -it webrecorder/browsertrix-crawler crawl 
--url https://twitter.com/bellingcat/status/1572958778177515520  
--generateWACZ --text --collection a
```
```bash
docker run -v $PWD/crawls/profiles:/crawls/profiles -it webrecorder/browsertrix-crawler create-login-profile --url "https://twitter.com/login"
```


## Specs

[https://github.com/webrecorder/specs](https://github.com/webrecorder/specs) Use cases for decentralised Web Archives is relevant.

[https://specs.webrecorder.net/use-cases/0.1.0/#researcher-saves-an-article](https://specs.webrecorder.net/use-cases/0.1.0/#researcher-saves-an-article) nicer view of above

## Archiveweb.page (Chrome extension)

[https://archiveweb.page/en/install/](https://archiveweb.page/en/install/)

This can save to the .wacz file format.

[![alt text](/assets/2022-10-20/2.jpg "email")](/assets/2022-10-20/2.jpg)

## links

- [https://pywb.readthedocs.io/en/latest/index.html](https://pywb.readthedocs.io/en/latest/index.html) python framework for web archive

- [https://github.com/webrecorder/browsertrix-crawler#readme](https://github.com/webrecorder/browsertrix-crawler#readme) - Browsertrix - what we are talking about here

- [https://browsertrix.cloud/](https://browsertrix.cloud/) cloud version of above - alpha stage. K8s and Docker Swarm.

