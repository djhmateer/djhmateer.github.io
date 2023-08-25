---
layout: post
title: Auto Archiver v6
description: 
menu: review
categories: archiver
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

## Local Version Install

```bash

# 23.1.2 on python 3.10
pip --version

# 23.2.1 now on 23rd Aug 2023
pip install --upgrade pip

pipenv install

pipenv run python -m src.auto_archiver --config secrets/orchestration.yaml
```

## Google Drive Upload

<!-- [![alt text](/assets/2023-08-23/1.jpg "email"){:width="800px"}](/assets/2023-08-23/1.jpg) -->
[![alt text](/assets/2023-08-23/1.jpg "email")](/assets/2023-08-23/1.jpg)
 `filename_generator: static`


[![alt text](/assets/2023-08-23/2.jpg "email")](/assets/2023-08-23/2.jpg)
`filename_generator: random`

I'd like the folder name to be the same as the entry name eg `DM_001` - and I don't think the code can do that yet.

## Debug v6 python

`attempted relative import with no known parent package`


hmm how to debug? when I have relative imports [here](https://stackoverflow.com/questions/16981921/relative-imports-in-python-3)

The trick is to use the `module` directive instead of `program` in vscode `launch.json`

```json
{
	"name": "AA Demo Main (davemateer@gmail)",
    "type": "python",
	"request": "launch",
    // "program": "src/auto_archiver",
    "module": "src.auto_archiver",
	"console": "integratedTerminal",
	"justMyCode": true,
	"args": ["--config","secrets/orchestration.yaml"]
}
```

## Thoughts

Naming structure on folders is not good - I want it to be the entry number eg `DM-001`

Multiple storages not really supported as just writes multiple into the spreadsheet

S3 buckets work well as get image previews in spreadsheet. And the Archive location is handy


[![alt text](/assets/2023-08-23/3.jpg "email")](/assets/2023-08-23/3.jpg)

Annoying can't serve html from Gdrive

[https://www.labnol.org/google-drive-image-hosting-220515](https://www.labnol.org/google-drive-image-hosting-220515) - you can service public images directly from google drive now.







