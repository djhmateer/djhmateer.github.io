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

However I've got a twitter problem [issue](https://github.com/bellingcat/auto-archiver/issues/82)