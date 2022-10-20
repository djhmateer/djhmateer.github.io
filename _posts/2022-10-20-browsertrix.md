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

- [https://github.com/webrecorder/browsertrix-crawler#readme](https://github.com/webrecorder/browsertrix-crawler#readme)

- [https://browsertrix.cloud/](https://browsertrix.cloud/) cloud version of above - alpha stage. K8s and Docker Swarm.

## Specs

[https://github.com/webrecorder/specs](https://github.com/webrecorder/specs) Use cases for decentralised Web Archives is relevant.

[https://specs.webrecorder.net/use-cases/0.1.0/#researcher-saves-an-article](https://specs.webrecorder.net/use-cases/0.1.0/#researcher-saves-an-article) nicer view of above

## Archiveweb.page (Chrome extension)

[https://archiveweb.page/en/install/](https://archiveweb.page/en/install/)

This can save to the .wacz file format.

[![alt text](/assets/2022-10-20/2.jpg "email")](/assets/2022-10-20/2.jpg)




## Single Page

Lets explore what BC can do

```bash
docker run -v $PWD/crawls:/crawls/ -it webrecorder/browsertrix-crawler crawl --url https://davemateer.com/2022/09/22/mssql-php-local-on-wsl  --generateWACZ --text --collection mssql11
```

[![alt text](/assets/2022-10-20/1.jpg "email")](/assets/2022-10-20/1.jpg)

The output of the crawler

## ReplayWeb.page

[https://replayweb.page/](https://replayweb.page/) is a browser based viewer that loads web archive files provided. [docs](https://replayweb.page/docs/)

### Formats

Web archive formats

- WARC [Web ARChive](https://en.wikipedia.org/wiki/Web_ARChive) .warc, .warc.gz - Supported - the standard to follow.
- HAR .har - In Progress
- WBN .wbn - Experimental
- ARC .arc - Not supported
- CDX .cdx, .cdxj - Supported
- WACZ - Newly proposed format -  .wacz - In Progress.

## WARC


