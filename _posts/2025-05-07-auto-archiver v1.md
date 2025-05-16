---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: auto-archiver 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

[https://github.com/bellingcat/auto-archiver](https://github.com/bellingcat/auto-archiver) AA source.

there has been a big change in early 2025 marking the 1.0.0 release. I've forked and used the 0.11.3 release for a few years.

[https://auto-archiver.readthedocs.io/](https://auto-archiver.readthedocs.io/) - Auto archiver docs

I'm running Ubuntu 22.04 LTS on my Windows WSL2 instance, and production servers. 

As of 7th May 2025 the current LTS is 24.04.2 LTS so I'm moving to this for AA 1.0 testing.

## Docker Run

First run it will generate a 

```bash
docker run -it --rm -v $PWD/secrets:/app/secrets -v $PWD/local_archive:/app/local_archive bellingcat/auto-archiver -- "https://example.com"
```

[![alt text](/assets/2025-05-08/1.jpg "x")](/assets/2025-05-08/1.jpg)

I wasn't expecting this. Looks like a mix of docker and local bits.

[![alt text](/assets/2025-05-08/2.jpg "x")](/assets/2025-05-08/2.jpg)

Create a nice `orchestration.yaml` file.

However I got

`2025-05-08 13:53:36.480 | INFO     | auto_archiver.core.orchestrator:archive:600 - Trying extractor generic_extractor for https://davemateer.com`

`WARNING: [generic] Falling back on generic information extractor ERROR: Unsupported URL: https://davemateer.com/`

So to debug I'm going on to a local install.


## Git Fork the Code

I've been running my production machines and development, on a branch called `v6-test` for a few years. On dev mahcine I've run under `c:\dev\v6-auto-archiver` and main was on `c:\dev\auto-archiver`.

My `main` branch was important as it contained code for a logging into telethon which was useful

This was all run from Ubuntu 22.04.


Now on Ubuntu 24.04 I'm going to run from `~/code/auto-archiver` for performance.

### Reset main to upstream

I want `main` to remain unchanged for now (legacy important - have telethon useful code in it).

I want v6-test to remain unchanged

I want `dev-upstream` to be exactly the same as upstream main with no additional files. 

```bash
# creating my own branch from dev-upstream
git checkout -b v1-test origin/dev-upstream

# do changes on this branch

# sets the upstream branch so can just do git push
git push -u origin v1-test
```

I can then push my changes to v1-test, then merge into my dev-upstream an do a PR from there. Or just PR straight from v1-test.


## Python

Python 3.10 comes with Ubuntu 22.

Python 3.12.3 comes with Ubuntu 24.


## Poetry

Poetry is a tool for dependency management and packaging. It is more similar to pipenv.

`pyproject.toml` is where you define dependencies

[https://auto-archiver.readthedocs.io/en/latest/development/developer_guidelines.html](https://auto-archiver.readthedocs.io/en/latest/development/developer_guidelines.html) recommends the offical installer for poetry


[https://python-poetry.org/docs/](https://python-poetry.org/docs/)

```bash
# 2.1.3 on 9th May 25
curl -sSL https://install.python-poetry.org | python3 -

# in auto-archiver directory
# I got Invalid marker for 'platform_python_implementation': >= CPython
poetry install

poetry install --with dev

# delete the poetry.lock file
# recreate
# Stripping invalid marker (brotli >=1.0.9 ; platform_python_implementation >= "CPython") found in vk-url-scraper-0.3.27 dependencies
poetry lock

poetry install

# we could run poetry-shell-plugin to and run poetry shell to activate the virtual environment. 
# so wouldn't have to prefix: poetry run
poetry run auto-archiver
```

## Local Requirments 

[https://auto-archiver.readthedocs.io/en/latest/installation/installation.html#installing-local-requirements](https://auto-archiver.readthedocs.io/en/latest/installation/installation.html#installing-local-requirements)

```bash
# FFMpeg
# latest version is 7.1.1 on 9th May 25

# 6.1.1-3ubuntu5 when I installed this way (I think it was just the raw repos. ie didn't need this ppa)
# a few days later: Ubuntu 24 - Noble Numbat
# E: The repository 'https://ppa.launchpadcontent.net/savoury1/ffmpeg4/ubuntu noble Release Noble' does not have a Release file.
# sudo add-apt-repository ppa:savoury1/ffmpeg4 -y
sudo apt update -y
sudo apt upgrade -y
sudo apt install ffmpeg -y


# Firefox - don't do this way!
# it uses the snap version which doesn't work well with geckodriver
#sudo apt install firefox -y
# https://www.omgubuntu.co.uk/2022/04/how-to-install-firefox-deb-apt-ubuntu-22-04

cd ~
sudo add-apt-repository ppa:mozillateam/ppa -y

echo '
Package: *
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 1001
' | sudo tee /etc/apt/preferences.d/mozilla-firefox

echo 'Unattended-Upgrade::Allowed-Origins:: "LP-PPA-mozillateam:${distro_codename}";' | sudo tee /etc/apt/apt.conf.d/51unattended-upgrades-firefox

sudo apt install firefox -y


# Geckdriver
# https://github.com/mozilla/geckodriver/releases/
cd ~
wget https://github.com/mozilla/geckodriver/releases/download/v0.36.0/geckodriver-v0.36.0-linux64.tar.gz
tar -xvzf geckodriver*
chmod +x geckodriver
sudo mv geckodriver /usr/local/bin/
rm geckodriver*

# Fonts
sudo apt install fonts-noto -y

# Docker
docker pull webrecorder/browsertrix-crawler:latest

```

## Run Auto-Archiver in VSCode

```bash
poetry run auto-archiver -- "https://davemateer.com"

# /home/dave/.cache/pypoetry/virtualenvs/auto-archiver-KuCH7_EC-py3.12
poetry env info --path

# in vscode, open a .py file, bottom right on the version, then select interpreter
# paste in the path
```

then install the python extension in vscode.

```json
// launch.json
{
    "version": "0.2.0",
    "configurations": [

        {
            "name": "Python Debugger: Current File with Arguments",
            "type": "debugpy",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            "args": "${command:pickArgs}"
        },
        {
			"name": "AA Demo Main (davemateer@gmail)",
			"type": "debugpy",
			"request": "launch",
			// "program": "src/auto_archiver",
            "module": "src.auto_archiver",
			"console": "integratedTerminal",
			"justMyCode": true,
			"args": ["--config","secrets/orchestration.yaml", '"https://example.com"']
		},
    ]
}

```
Note it use to be type: "python" and now it is type: "debugpy"

This doesn't archive anything, but can run from VSCode by Ctrl F5, or debug via F5 which is great.


## Logging

[https://loguru.readthedocs.io/en/stable/api/logger.html#levels](https://loguru.readthedocs.io/en/stable/api/logger.html#levels)
ie standard log levels with trace and success.

- Trace
- Debug
- Info
- Success
- Warning
- Error
- Critical

Here there are 4 common ones:

- Debug
- Info
- Warning
- Error

In a previous version I've used multiple loggers ie

- 1trace.log
- 3success.log
- 5error.log

This is good enough.

todo: use a parser to feed into Grafana for a dashboard.


## Modules and Orchestration.yaml

This is tricky. I found the simplest starting point to be

```yaml
steps:
  feeders:
    - gsheet_feeder_db
  extractors:
    - generic_extractor
  enrichers:
    - hash_enricher
  databases:
    - gsheet_feeder_db
  storages:
    - s3_storage
  formatters:
    - html_formatter
```

[https://auto-archiver.readthedocs.io/en/latest/installation/config_cheatsheet.html](https://auto-archiver.readthedocs.io/en/latest/installation/config_cheatsheet.html)

[https://auto-archiver.readthedocs.io/en/latest/installation/config_editor.html](https://auto-archiver.readthedocs.io/en/latest/installation/config_editor.html)

## 1.Feeders

```yaml
# 1.FEEDER
gsheet_feeder_db:
  sheet: "AA Demo Main"
  sheet_id: "Sheet1"
  header: 1
  service_account: secrets/service_account_davemateer_gmail.json
  columns:
    url: link
    status: archive status
    # folder: destination folder
    folder: entry number
    archive: archive location
    date: archive date
    thumbnail: thumbnail
    timestamp: upload timestamp
    title: upload title
    # text: text content
    text: textual content
    screenshot: screenshot
    hash: hash
    pdq_hash: perceptual hashes
    wacz: wacz
    replaywebpage: replaywebpage
  allow_worksheets: ["Sheet1"]
  block_worksheets: []
  use_sheet_names_in_stored_paths: false
```

Note the final use_sheet_names - so as not to have a long url in s3 bucket

## 2.Extractors

### Genertic Extractor

This is yt_dlp and handles all of Twitter now (no twitter_archiver or twitter_api_archiver)

There are `dropins` included to handle post data and metadata objects


Video

- YouTube
- Facebook?

Other

- Twitter image

### Youtube

max_comments for youtube

[https://github.com/yt-dlp/yt-dlp/blob/master/README.md#extractor-arguments](https://github.com/yt-dlp/yt-dlp/blob/master/README.md#extractor-arguments)

note below how to set extractor args:

```yml
# orcherstration.yaml

# 2.EXTRACTORS
generic_extractor:
  subtitles: true
  comments: true
  livestreams: true
  live_from_start: true
  proxy: ""
  end_means_success: true
  allow_playlist: true
  max_downloads: 100
  # POT - auto, script or disabled
  # script means use npx etc..
  bguils_po_token_method: auto
  extractor_args: {
     "youtube": {
        "max_comments": "3"
    }
   }
  # checks every 5 days
  ytdlp_update_interval: 5
  # https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#general-options
  ytdlp_args: '--verbose'
  # ytdlp_args: ''

```

### Youtube playlist

If a max_downloads: 2  and there are 26 videos in the playlist, then the linked video may not be downloaded eg https://www.youtube.com/watch?v=WlAHZURxRjY&list=PL7A55EB715FBB2940&index=7

If `allow_playlist: true` then any video linked if it is part of a playlist then it will download all the videos in that playlist.

Comments wont come through as doesn't make sense for lots of videos

Seems more directed for single video

I've put in an issue for fixing the extensions [https://github.com/bellingcat/auto-archiver/issues/305](https://github.com/bellingcat/auto-archiver/issues/305)


### Youtube Live stream

A lot of live streams are 1 - 12 hours long.


### YouTube inappropriate content

have not tested yet - need to be logged in to view this?

need to find a good sample video that is not bad.


### Youtube - POT Tokens

Proof of Origin tokens for YouTube.

"Sign to confirm you're not a bot" when invoking yt-dlp from an IP address flagged by YouTube.

AA needs this to run.

Under the hood it is using [https://github.com/Brainicism/bgutil-ytdlp-pot-provider](https://github.com/Brainicism/bgutil-ytdlp-pot-provider)


```bash
# orchestration.yaml
# POT - auto, script or disabled
# script means use npx etc..
bguils_po_token_method: auto


# this is the recommended way and yuns a node server on 4416
docker run --name bgutil-provider -d -p 4416:4416 brainicism/bgutil-ytdlp-pot-provider
```

[https://auto-archiver.readthedocs.io/en/settings_page/how_to/authentication_how_to.html](https://auto-archiver.readthedocs.io/en/settings_page/how_to/authentication_how_to.html) were out of date. Best to look at: 

[https://github.com/bellingcat/auto-archiver/blob/main/docs/source/how_to/authentication_how_to.md](https://github.com/bellingcat/auto-archiver/blob/main/docs/source/how_to/authentication_how_to.md)



## Facebook

Direct link videos can be downloaded fine.


## Facebook Non video

In generic_extractor, download_for_extractor, dropin_submodule which calls `facebook.py`

self.get_metadata_for_post

then it goes into

facebook.py/extract_post

download_webpage()


yt-dlp has a module called FacebookIE (IE is Info Extractor)

[https://github.com/yt-dlp/yt-dlp/blob/586b557b124f954d3f625360ebe970989022ad97/yt_dlp/extractor/facebook.py#L34](https://github.com/yt-dlp/yt-dlp/blob/586b557b124f954d3f625360ebe970989022ad97/yt_dlp/extractor/facebook.py#L34)



## Twitter / X

works fine using yt-dlp for a basic tweet.

there is a dropin submodule for this.

### Screenshots

If you have problems with firefox profiles, check you don't have the snap version of firefox installed.











### Storage

S3 and Google Drive storage used to be able to a saved URL like:

https://testhashing.fra1.cdn.digitaloceanspaces.com/dia020/1c3df3ed1d2a45b38f686ba7.html

Where dia020 is the Entry Number. I liked this for organisation of files in storage. In fact it is critical to 1 of my clients.

v1 out of the box gives 3 config options in Storage. 

There is also a flag in gsheet_feeder_db to use_sheet_names_in_stored_paths.

### path_generator: flat

https://aademomain.fra1.cdn.digitaloceanspaces.com/iv001/aa-demo-main/sheet1/c0d970c202e2814d56c59089.jpg

### path_generator: url

https://aademomain.fra1.cdn.digitaloceanspaces.com/iv002/aa-demo-main/sheet1/https-twitter-com-dave-mateer-status-1728062510295609772/a1fa7ecda752545d62e9c8f3.jpg

### path_generator: random

https://aademomain.fra1.cdn.digitaloceanspaces.com/dia019/aa-demo-main/sheet1/3b0c9c04057147019dab6ceb/a1fa7ecda752545d62e9c8f3.jpg





### Wayback


https://x.com/dave_mateer/status/1524341442738638848

archiving this writes to `local_archive` with the correct image, but html isn't linking to the image properly.





### Build the docs

I found [https://auto-archiver.readthedocs.io/en/settings_page/how_to/authentication_how_to.html](https://auto-archiver.readthedocs.io/en/settings_page/how_to/authentication_how_to.html) was missing a part on POT tokens.


```bash
sudo apt install python3-sphinx

poetry run make -C docs html

# or run directly
poetry run sphinx-build -b html docs/source docs/_build/html
```


## Cherry pick commit PR back to Bellingcat

I'm working on my fork, on a branch called:

- v1-test

I've got a branch called

- dev-upstream

which is what bellingcat is.

I've got a simple commit https://github.com/djhmateer/auto-archiver/commit/062d67f743dfaf8ec27284834139d02829c0d71f - need the sha.


```bash
- git checkout -b loglevelchange2 origin/dev-upstream

# cherry pick the commit or I could just do the change to this branch!
- git cherry-pick 062d67f743dfaf8ec27284834139d02829c0d71f

# push to origin
- git push origin loglevelchange2

# then on GH I can do the PR to upstream.
```


## Python and Pipenv

I'm using [pipenv](https://github.com/pypa/pipenv) to isolate dependencies in Python projects.

```bash
# need pip so I can install pipenv below
sudo apt install python3-pip

# pip 24.0 (python 3.12)
# pip is linked as well to same
pip3 --version

# install pipenv
pip install --user pipenv


# is pipenv up to date?
# it will tell you what to run if update needed
# on my Ubuntu 22.04 I've only got 3.10 installed
# 21st Jan25:  pipenv-2024.4.0
# it told me to update pip 24.1.2 -> 24.3.1
pip install --upgrade pipenv

# setup a new environment
# as 3.12 is not available on my machine, it downgrades to 3.10
# creates a new Pipfile to put in dependencies
pipenv --python 3.12
# 21st Jan 25 - am using this for testing as the AA is using this.
pipenv --python 3.10

pipenv shell
```


## Auto-archiver

[https://github.com/bellingcat/auto-archiver](https://github.com/bellingcat/auto-archiver) there has been a big change in early 2025 marking the 1.0.0 release. I've forked and used the 0.11.3 release for a few years.

