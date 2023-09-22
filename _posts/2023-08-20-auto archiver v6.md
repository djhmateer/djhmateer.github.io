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

Am not running yet have a problem with idempotency ie when a line fails, it affects all following runs.


## Running the docker version

```bash
# check to make sure running latest version by running this again
# https://hub.docker.com/r/bellingcat/auto-archiver
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
# if you get a blank screen, click create profile
# then try again
docker run -p 6080:6080 -p 9223:9223 -v $PWD/crawls/profiles:/crawls/profiles/ -it webrecorder/browsertrix-crawler create-login-profile --url "https://twitter.com/"


docker run -p 6080:6080 -p 9223:9223 -v $PWD/crawls/profiles:/crawls/profiles/ -it webrecorder/browsertrix-crawler create-login-profile --url "https://facebook.com/"

```

- profile.tar.gz has to be in secrets

## WACZ

However I couldn't get wacz to work - just kept timing out. [issued 86](https://github.com/bellingcat/auto-archiver/issues/86) is now fixed as of 25th Aug 2023.

The replayweb.page doesn't work for some reason

[https://replayweb.page/](https://replayweb.page/) - works when I download the wacz and upload here

Direct paste into this UI doesn't work, nor does the direct link eg 

```
https://testhashing.fra1.cdn.digitaloceanspaces.com/https-twitter-com-dave-mateer-status-1505876265504546817/1c834bb7-e8b6-4e.wacz

https://replayweb.page/?source=https%3A//testhashing.fra1.cdn.digitaloceanspaces.com/https-twitter-com-dave-mateer-status-1505876265504546817/1c834bb7-e8b6-4e.wacz#view=pages&url=https%3A//twitter.com/dave_mateer/status/1505876265504546817

```

[![alt text](/assets/2023-08-23/4.jpg "email")](/assets/2023-08-23/4.jpg)

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

Naming structure on folders is not good - I want it to be the entry number eg `DM-001`. This is possible!


Multiple storages not really supported as just writes multiple into the spreadsheet

S3 buckets work well as get image previews in spreadsheet. And the Archive location is handy


[![alt text](/assets/2023-08-23/3.jpg "email")](/assets/2023-08-23/3.jpg)

Annoying can't serve html from Gdrive

[https://www.labnol.org/google-drive-image-hosting-220515](https://www.labnol.org/google-drive-image-hosting-220515) - you can service public images directly from google drive now.


## wacz_enricher

**don't use this at the moment as bug where if it fails, it kills the rest of the run** see FB video to Telegram in my test suite


wacz runs browsertrix-crawler running locally - well it uses Docker.. but this does work. WACZ extract_media flag is set.


why are there 2 _enricher things in archivers: yaml?

well it is so that the archiver will give a `wacz: success` if it is turned on in the archivers section.

we can then get a wacz as an enricher (ie download all images file and wacz file)

## wayback_archiver_enricher

as n archiver can see what it does

but as an enricher?


[![alt text](/assets/2023-08-23/7.jpg "email")](/assets/2023-08-23/7.jpg)


## Telethon

 - telethon - 
 - telegram - more of a hack.. not advised.. no login needed. just beautiful soup

 [my.telegram.org](https://my.telegram.org/apps)

Essentially create an app to get APP ID and HASH [instructions](https://telegra.ph/How-to-get-Telegram-APP-ID--API-HASH-05-27)

then run the auto_archiver and we are 


[![alt text](/assets/2023-08-23/5.jpg "email")](/assets/2023-08-23/5.jpg)

put in phone eg +447584123456
then put in code telethon sends us.

# metadata_enricher

uses exiftool

```bash
sudo apt install exiftool
```

which is stored in the html:

[![alt text](/assets/2023-08-23/6.jpg "email")](/assets/2023-08-23/6.jpg)

## pdq_hash_enricher

writes to column: perceptual hashes

## Facebook wacz enricher and crawler

```bash
# get latest image
docker pull webrecorder/browsertrix-crawler

pip install --upgrade pip

# had problems with pdq_hash on Ubuntu 20_04
pipenv update

pipenv run python -m src.auto_archiver --config secrets/orchestration-aa-demo-main.yaml


docker system prune
```





