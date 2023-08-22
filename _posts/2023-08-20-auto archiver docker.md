---
layout: post
title: Auto Archiver Docker 
description: 
menu: review
categories: docker
published: true 
comments: false     
sitemap: true
image: /assets/2023-07-22/1.jpg
---

<!-- [![alt text](/assets/2023-07-22/1.jpg "email"){:width="800px"}](/assets/2023-07-22/1.jpg) -->
<!-- [![alt text](/assets/2023-08-01/1.jpg "email")](/assets/2023-08-01/1.jpg) -->


[https://github.com/bellingcat/auto-archiver/](https://github.com/bellingcat/auto-archiver/)

## Running the docker version

```bash
docker pull bellingcat/auto-archiver

mkdir secrets
cd secrets
vim orchestation.yaml

# https://github.com/bellingcat/auto-archiver/blob/main/example.orchestration.yaml

```

## old to new

service_account.json (my first gmail account) into secrets\service_account.json - googlesheets read and write

- archivers - put in twitter
- database - gsheet_db
- gsheet_feeder - "AA Demo Main" - the name of the spreadsheet which the service_account.json has access to.

```bash
docker run --rm -v $PWD/secrets:/app/secrets -v $PWD/local_archive:/app/local_archive bellingcat/auto-archiver --config secrets/orchestration.yaml
```

[https://www.youtube.com/watch?v=dQw4w9WgXcQ](https://www.youtube.com/watch?v=dQw4w9WgXcQ) test video using youtube-dlp which downloaded fine

## Twitter

However I've got a twitter problem [issue 82](https://github.com/bellingcat/auto-archiver/issues/82)

Lets try the wacz instead on the twitter one

```bash
# create a new profile
docker run -p 6080:6080 -p 9223:9223 -v $PWD/crawls/profiles:/crawls/profiles/ -it webrecorder/browsertrix-crawler create-login-profile --url "https://twitter.com/"
```

- profile.tar.gz has to be in secrets

However I couldn't get wacz to work - just kept timing out. [issued 86](https://github.com/bellingcat/auto-archiver/issues/86)

`
{"logLevel":"error","timestamp":"2023-08-21T10:47:31.054Z","context":"worker","message":"Unknown exception","details":{"type":"exception","message":"net::ERR_PROXY_CONNECTION_FAILED at https://davemateer.com/2022/03/23/is-web-scraping-legal","stack":"Error: net::ERR_PROXY_CONNECTION_FAILED at https://davemateer.com/2022/03/23/is-web-scraping-legal\n    at navigate (file:///app/node_modules/puppeteer-core/lib/esm/puppeteer/common/Frame.js:98:23)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async Deferred.race (file:///app/node_modules/puppeteer-core/lib/esm/puppeteer/util/Deferred.js:79:20)\n    at async Frame.goto (file:///app/node_modules/puppeteer-core/lib/esm/puppeteer/common/Frame.js:64:21)\n    at async CDPPage.goto (file:///app/node_modules/puppeteer-core/lib/esm/puppeteer/common/Page.js:578:16)\n    at async Crawler.loadPage (file:///app/crawler.js:1062:20)\n    at async Crawler.default [as driver] (file:///app/defaultDriver.js:3:3)\n    at async Crawler.crawlPage (file:///app/crawler.js:451:5)\n    at async PageWorker.timedCrawlPage (file:///app/util/worker.js:151:7)\n    at async PageWorker.runLoop (file:///app/util/worker.js:192:9)","workerid":0}}
{
`

## WACZ

**HERE - next try doing it developer side ie not docker... to see the errors**


## Twitter API

The paid API works well.



