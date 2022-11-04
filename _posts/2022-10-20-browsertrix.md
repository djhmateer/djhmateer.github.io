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

[browsertrix-crawler](https://github.com/webrecorder/browsertrix-crawler) is a browser based crawling system using [https://github.com/puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) which is a headless Chrome API.

Part of the [https://webrecorder.net/](https://webrecorder.net/) which is

- [https://webrecorder.net/tools#archivewebpage](https://webrecorder.net/tools#archivewebpage) Chrome extension and standalone desktop app. Allows archiving as you browse.

- [https://replayweb.page/](https://replayweb.page/) view an archive in WARC, WACZ, HAR or WBN. There used to be an electron app but this is in readonly mode now.

- [https://pywb.readthedocs.io/en/latest/index.html](https://pywb.readthedocs.io/en/latest/index.html) python framework for web archive

- [https://github.com/webrecorder/browsertrix-crawler#readme](https://github.com/webrecorder/browsertrix-crawler#readme) - Browsertrix - what we are talking about here

- [https://browsertrix.cloud/](https://browsertrix.cloud/) cloud version of above - alpha stage. K8s and Docker Swarm.

## Specs

[https://github.com/webrecorder/specs](https://github.com/webrecorder/specs) Use cases for decentralised Web Archives is relevant.

[https://specs.webrecorder.net/use-cases/0.1.0/#researcher-saves-an-article](https://specs.webrecorder.net/use-cases/0.1.0/#researcher-saves-an-article) nicer view of above

## Archiveweb.page (Chrome extension)

[https://archiveweb.page/en/install/](https://archiveweb.page/en/install/)

This can save to the .wacz file format.

[![alt text](/assets/2022-10-20/2.jpg "email")](/assets/2022-10-20/2.jpg)



## Single Page from a static site

Lets explore what BC can do

```bash
# --text automated text extraction for full text search
# --collection is where to save
docker run -v $PWD/crawls:/crawls/ -it webrecorder/browsertrix-crawler crawl 
--url https://davemateer.com/2022/09/22/mssql-php-local-on-wsl  
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

Web archive formats supported by webrecorder.net suite of tools

- WARC [Web ARChive](https://en.wikipedia.org/wiki/Web_ARChive) .warc, .warc.gz - Supported - the standard to follow.
- HAR .har - In Progress
- WBN .wbn - Experimental
- ARC .arc - Not supported
- CDX .cdx, .cdxj - Supported
- WACZ - Newly proposed format -  .wacz - In Progress.

## Twitter 

[https://twitter.com/bellingcat/status/1572958778177515520](https://twitter.com/bellingcat/status/1572958778177515520) this will not work and will stall with a message `note: waitForNetworkIdle timed out, ignoring`

```bash
# wont work
docker run -v $PWD/crawls:/crawls/ -it webrecorder/browsertrix-crawler crawl 
--url https://twitter.com/bellingcat/status/1572958778177515520  
--generateWACZ --text --collection a
```

[Browsertrix profiles](https://github.com/webrecorder/browsertrix-crawler#creating-and-using-browser-profiles) a file is made with temporary session cookies.

```bash
docker run -v $PWD/crawls/profiles:/crawls/profiles -it webrecorder/browsertrix-crawler create-login-profile --url "https://twitter.com/login"
```

I'm not comfortable putting my real twitter account into this, as it may go against the Twitter ToC (need to look this up)

## Facebook






