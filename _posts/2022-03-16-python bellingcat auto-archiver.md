---
layout: post
title: Python - Bellingcat auto-archiver
# description: Download vs View a PDF or Image from .NET6 Razor Pages with source code
menu: review
categories: Python
published: true 
comments: false     
sitemap: true
image: /assets/2022-03-10/view.jpg 
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->

[https://github.com/bellingcat/auto-archiver](https://github.com/bellingcat/auto-archiver) the library I'm exploring which uses Python 3.9

In this article I'll go through setting up my virtual Python developement environment for this library.

[Previous Python blog](/2021/06/09/python)

## Python Installation

[Python.org](https://www.python.org/downloads/) is currently on 3.10.3 (16th March 2022 release). I'm using 3.9.11 (16th March 2022 release) as had issues with debugging with VS Code with 3.10.

[Python Installation Guide Documents](https://docs.python-guide.org/starting/install3/linux/#install3-linux) - below is how I did it.

```bash
# on Ubuntu 20.04 there is 3.8.10
python3 -V
python3.8 -V

# I want the latest version of Python 3.9
sudo add-apt-repository ppa:deadsnakes/ppa -y

# 3.9.11 as of 16th March 2022
sudo apt install python3.9 -y

# what python modules are installed using apt
apt list --installed | grep python

# add pip to the path
# ./bashrc add to end
# https://stackoverflow.com/questions/61026031/pip-installation-for-python3-problem-consider-adding-this-directory-to-path
# export PATH="$PATH:/Library/Frameworks/Python.framework/Versions/3.8/bin"
export PATH=/home/dave/.local/bin:$PATH

# 20.0.2 - this is old
sudo apt install python3-pip -y

# update pip to 22.0.4
pip install --upgrade pip

# Setting up the virtual environment we're using for Python
# to deal with dependencies
# https://docs.python-guide.org/dev/virtualenvs/#virtualenvironments-ref
# 2022.1.8
pip install --user pipenv

cd project-folder

# create Pipfile and Pipfile.lock if not there
# gets all dependencies if an existing project (or need to update)
pipenv install

# install Requests library and create 
# Pipfile - used to track dependencies

# this may use 3.8
pipenv install requests

# specific version
#pipenv --python 3.9 install requests

pipenv install numpy

# activate the shell!
pipenv shell

# run inside the virtual env
pipenv run python main.py

# update dependencies
pipenv update
```

Python program I used to print the version of the module I was using, and the Python interpreter version.

```py
# If running in non-virtual don't need to import this module 2.22.0 is there already (comes with Ubuntu as apt python3-requests)
# latest is 2.27.1
import requests
import sys
# we do need to import numpy
import numpy as np

print("requests module version:")
print(requests.__version__)

print("numpy module version:")
print(np.__version__)

response = requests.get('https://httpbin.org/ip')
print('Your IP is {0}'.format(response.json()['origin']))

x = requests.get('https://w3schools.com/python/demopage.htm')
print(x.text)

# 3.6.9 when run with python3 
print("Python intepreter version:")
print(sys.version)
```

[![alt text](/assets/2022-03-16/38.jpg "desktop")](/assets/2022-03-16/38.jpg)
pipenv working, but using pythom 3.8.10 to create the environment.

[![alt text](/assets/2022-03-16/310.jpg "desktop")](/assets/2022-03-16/310.jpg)
Better - using 3.10. Eventually I had to downgrade all to 3.9 to get VS Code debugging working below


## Setup Dev Env - VS Code

[![alt text](/assets/2022-03-16/38.jpg "desktop")](/assets/2022-03-16/38.jpg)

After making sure I can run test python program from the command line in the pipenv. I'm using WSL2 Ubuntu 18.04 with the same setup as production above ie Python 3.10.3, the latest pip, and latest pipenv.

I can run a python file fine, but when it comes to debugging:

[![alt text](/assets/2022-03-16/error.jpg "desktop")](/assets/2022-03-16/error.jpg)

Potentially a problem with 3.10 [Stack Overflow](https://stackoverflow.com/questions/70943244/attributeerror-module-collections-has-no-attribute-mutablemapping)?

Lets get a debugging environment setup in VSCode

How to target 3.9.11 which was updated on 16th March 2022.

`Ctrl Shift P, Python: Select Interpreter`

[![alt text](/assets/2022-03-16/pipenv.jpg "desktop")](/assets/2022-03-16/pipenv.jpg)

Select the virtual environment for this project


[![alt text](/assets/2022-03-16/debug.jpg "desktop")](/assets/2022-03-16/debug.jpg)

Debugger working in 3.9 on VSCode

Here is my `.vsocde/launch.json` specificing which file should enter/start debugging with (very useful if have anohter file open and don't want to start with that). Also passing the default arguments to.

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Python: auto_archive --sheet",
			"type": "python",
			"request": "launch",
			"program": "auto_archive.py",
			"console": "integratedTerminal",
			"justMyCode": true,
			"args": ["--sheet","Test Hashing"]
		},
		{
			"name": "Python: Current File",
			"type": "python",
			"request": "launch",
			"program": "${file}",
			"console": "integratedTerminal",
			"justMyCode": true
		}
	]
}
```


## Auto-archiver 

[https://github.com/bellingcat/auto-archiver](https://github.com/bellingcat/auto-archiver)

[![alt text](/assets/2022-03-16/auto.jpg "desktop")](/assets/2022-03-16/auto.jpg)

`pipenv install` to install modules.

Notice am using 3.9.11 which is excellent.

Lets look at the dependencies and setup as showin in the `README.md`

### 1. Getting API access to the Google Sheet

The archiver needs access to a Google Sheet to get the URL to process.

[https://docs.gspread.org/en/latest/oauth2.html#enable-api-access-for-a-project](https://docs.gspread.org/en/latest/oauth2.html#enable-api-access-for-a-project)

[https://docs.gspread.org/en/latest/#](https://docs.gspread.org/en/latest/#) gspread is a python API for Google Sheets

[https://console.cloud.google.com/](https://console.cloud.google.com/) Google Developers Console, Create new Project, auto-archiver

- Head to Google Developers Console and create a new project (or select the one you already have).
- In the box labeled “Search for APIs and Services”, search for “Google Drive API” and enable it.
- In the box labeled “Search for APIs and Services”, search for “Google Sheets API” and enable it.

[![alt text](/assets/2022-03-16/goog.jpg "desktop")](/assets/2022-03-16/goog.jpg)

Setting

After getting a json key which is saved as `service_account.json`

Share sheet with the client_email in downloaded file.

setup a new project, gspread-test

```bash
pipenv --python 3.9 install requests
pipenv install gspread
pipenv run python main.py

# copy downloaded file to  \\wsl$\Ubuntu-18.04\home\dave\.config\gspread\service_account.json
```
then

```py
import gspread

gc = gspread.service_account()

# put name of your spreadsheet in here
sh = gc.open("Example spreadsheet")

print(sh.sheet1.get('A1'))
```

So we can access the Google Sheet now via an API. [Google limits](https://developers.google.com/sheets/api/limits) shows we can do quite a lot of reads and writes before getting a `429: Too many requests`. About 1 read and 1 write per second. Free service.

## 2. FFmpeg install locally

```bash
# ffmpeg/bionic-updates,bionic-security,now 7:3.4.8-0ubuntu0.2 amd64 
# 3.4.8
apt list --installed | grep ffm
```

latest version is 7:4.4.1-3ubuntu5 as of 17th March 2022  which is 4.4.1

[![alt text](/assets/2022-03-16/ffm.jpg "desktop")](/assets/2022-03-16/ffm.jpg)

I was getting a strange error while chopping up a video into images `[swscaler @ 0x55746e4a73a0] deprecated pixel format used, make sure you did set range correctly` so lets see if v.4 fixes it.

[SO Install FFmpeg 4 on Ubuntu](https://askubuntu.com/a/1360862/677298) - but this PPA is on hold.

```bash
# 4.4.1
sudo add-apt-repository ppa:savoury1/ffmpeg4
sudo apt-get update
sudo apt-get install ffmpeg
```

Still getting same error after updating to 4.


## 3. Firefox and Geckodriver

```bash
# firefox 98
sudo apt install firefox -y
```

[https://github.com/mozilla/geckodriver](https://github.com/mozilla/geckodriver)

```bash
# check version numbers
wget https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz
tar -xvzf geckodriver*
chmod +x geckodriver
sudo mv geckodriver /usr/local/bin/
```


## 4. Env File

.env file create
```
DO_SPACES_REGION=
DO_BUCKET=
DO_SPACES_KEY=
DO_SPACES_SECRET=
INTERNET_ARCHIVE_S3_KEY=asdf
INTERNET_ARCHIVE_S3_SECRET=asdf
TELEGRAM_API_ID=12345
TELEGRAM_API_HASH=0123456789abcdef0123456789abcdef
```

```bash
pipenv run python auto_archive.py --sheet 'Test Hashing'
```

README is out of date with regard to what columns are required

Need a digitaloceanspace.com endpoint to store 

- archive location (a copy of the media)
- screenshot 
- thumbnail
- thumbnail index

Add launch.json for vscode (see top of this page) to pass in the `--sheet='Test Hashing'` which works for run and debug.

There is a class which defines the column headers in the spreadsheet in `gworksheet.py`



## Python Syntax and Flow

While understand the [auto-archiver](https://github.com/bellingcat/auto-archiver) I took notes:

[What does if name main do](https://stackoverflow.com/questions/419163/what-does-if-name-main-do) ie where is the entry point of the app?

```py
# foo.py
# all code at indentation level 0 gets executed
# there is no implicit main() function
print("before import")
import math

print("before functionA")
def functionA():
    print("Function A")

print("before functionB")
def functionB():
    print("Function B {}".format(math.sqrt(100)))

# Python interpreter defines a few special variables.. we care about __name__ here.
# which is the name of the file being executed
# if we import foo from another module, it wont fire
print("before __name__ guard")
if __name__ == '__main__':
    functionA()
    functionB()
print("after __name__ guard")
```

## Python Modules

Can be

1 - Standard Library (eg import os) so there already

2 - Third party module (eg requests) so need to import

3 - Application Specific (eg archivers) which are in a folder in the project

```py
# Standard Lib 
# https://github.com/python/cpython/blob/3.9/Lib/argparse.py
import argparse

# Third party Module - not imported directly via pip
import requests 

# App specific Module in archivers folder loading __init__.py
import archivers
```

`requests` third party module is interesting as it wasn't included in the pipfile, yet it was already on my Ubuntu 20 install by default as had been loded by apt:

```bash
apt list --installed | grep python3-requests
```

Here is a `Pipfile` which get the 3rd party modules

```
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
gspread = "*"
boto3 = "*"
python-dotenv = "*"
# In Python standard lib
# argparse = "*"
beautifulsoup4 = "*"
tiktok-downloader = {git = "https://github.com/msramalho/tiktok-downloader"}
bs4 = "*"
loguru = "*"
ffmpeg-python = "*"
selenium = "*"
snscrape = "*"
yt-dlp = "*"
telethon = "*"

[dev-packages]
autopep8 = "*"

[requires]
python_version = "3.9"
```

Notice the mistake with argparse. I also need to bring in requests for Ubuntu18 machines. I believe another module depends on it, and it is probably bad form to not include it specifically as we do reference it directly in auto-archiver.

We are using the `pipenv` virtaul environment so can have segregation between projects. Here is how to install / update / run

```bash
pipenv install
pipenv run python auto_archive.py --sheet "Test Hashing"
```

## Code with comments

```py
# dont need this module?
# import logging

# TODO - reorder imports alphabatically
# 1. Standard library
# 2. Third party
# 3. Application specific

# Standard Lib - notice main and 3.9 branch
# https://github.com/python/cpython/blob/main/Lib/os.py
# https://github.com/python/cpython/blob/3.9/Lib/os.py
import os

# Standard Lib 
import datetime

# Standard Lib 
# used to be imported by pip
# https://github.com/python/cpython/blob/3.9/Lib/argparse.py
import argparse

# Third party Module - not imported directly via pip
# something else depends on it and loads it
# is this bad form?
import requests 

# Standard Lib 
# https://github.com/python/cpython/blob/3.9/Lib/shutil.py
import shutil

# Third party Module - Google spreadsheet
import gspread

# Third party Module - logger is now a variable from loguru
from loguru import logger

# Third party Module - python-dotenv in pip
# reads key value pairs from a .env file and set as env variables
from dotenv import load_dotenv

# Third party Module - webdriver is a module. in pip
from selenium import webdriver

# Standard Lib 
import traceback

# App specific Module in archivers folder loading __init__.py
import archivers

# App specific Module in storages folder loading __init__.py
from storages import S3Storage, S3Config

# App specific Module in utils folder loading __init__.py
from utils import GWorksheet, mkdir_if_not_exists

# print("Python intepreter version:")
# import sys
# print(sys.version)

# print("requests module version:")
# print(requests.__version__)

# logger.info("Before load_dotenv()")

# calling function in dotenv external module
# todo - why is this at level 0 and not inside main?
load_dotenv()
```


## Digital Ocean Spaces 

[https://cloud.digitalocean.com/](https://cloud.digitalocean.com/)

Sign up, create a new Spaces. I used frankfurt, and called my space: testhashing

API to generate Key and Secret

```
DO_SPACES_REGION=fra1
DO_BUCKET=testhashing
DO_SPACES_KEY=XXXXXXXXXXXXXXXXX
DO_SPACES_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
INTERNET_ARCHIVE_S3_KEY=asdf
INTERNET_ARCHIVE_S3_SECRET=asdf
```

[![alt text](/assets/2022-03-16/excel.jpg "desktop")](/assets/2022-03-16/excel.jpg)

Then it has sort of worked with my Links of:

- [https://twitter.com/LaMinMgMaung/status/1500053890246533121](https://twitter.com/LaMinMgMaung/status/1500053890246533121) which has 2 images in the tweet
- [https://twitter.com/FreeBurmaRangrs/status/1500900146216943621](https://twitter.com/FreeBurmaRangrs/status/1500900146216943621) 1 video in the tweet 
- [https://twitter.com/FreeBurmaRangrs/status/1500899598671523855](https://twitter.com/FreeBurmaRangrs/status/1500899598671523855) 1 video
- [https://www.youtube.com/watch?v=sDE-qZdi8p8](https://www.youtube.com/watch?v=sDE-qZdi8p8) a video



## CyberDuck - download Folder from storage

DO Spaces doesn't let you download an entire folder, as I want to explore what the script has done locally, so lets do that:

[https://cyberduck.io/download/](https://cyberduck.io/download/) to download folder from S3

[![alt text](/assets/2022-03-16/duck.jpg "desktop")](/assets/2022-03-16/duck.jpg)

Remember to put in the Path (bucket name) otherwise you'll get a `Cannot read container configuration` error

## Auto-archiver

Ignore first row - assume headings

Archive status column - if filled it, this row will be skipped

if job fails on 'Archive in progress' it is stalled and won't resume.

Tweet with 1 image
https://twitter.com/minmyatnaing13/status/1499415562937503751

Tweet with 2 images 
https://twitter.com/LaMinMgMaung/status/1500053890246533121

tweet with 3 images
https://twitter.com/TheChindwin/status/1499644637664845827


## List of classes

Python is dynamically typed so we can't specify an element type for a list.


```py
# a list of Classes, where each class has a function called download
active_archivers = [
  archivers.TelegramArchiver(s3_client, driver),
  archivers.TiktokArchiver(s3_client, driver),
  archivers.YoutubeDLArchiver(s3_client, driver),
  archivers.TwitterArchiver(s3_client, driver),
  archivers.WaybackArchiver(s3_client, driver)
]

for archiver in active_archivers:
         logger.debug(f'Trying {archiver} on row {row}')

         try:
             result = archiver.download(url, check_if_exists=True)
         except Exception as e:
             result = False
             logger.error(f'Got unexpected error in row {row} with archiver {archiver} for url {url}: {e}\n{traceback.format_exc()}')
```

then each archiver class inherits off a base class.

Returns an ArchiveResult.

```py
from .base_archiver import Archiver, ArchiveResult

class TwitterArchiver(Archiver):
    name = "twitter"

    def download(self, url, check_if_exists=False):
        if 'twitter.com' != self.get_netloc(url):
            return False

        tweet_id = urlparse(url).path.split('/')
        if 'status' in tweet_id:
            i = tweet_id.index('status')
            tweet_id = tweet_id[i+1]
        else:
            return False

        scr = TwitterTweetScraper(tweet_id)

        try:
            tweet = next(scr.get_items())
        except:
            logger.warning('wah wah')
            return False

        if tweet.media is None:
            return False

        urls = []

        for media in tweet.media:
            if type(media) == Video:
                variant = max(
                    [v for v in media.variants if v.bitrate], key=lambda v: v.bitrate)
                urls.append(variant.url)
            elif type(media) == Gif:
                urls.append(media.variants[0].url)
            elif type(media) == Photo:
                urls.append(media.fullUrl)
            else:
                logger.warning(f"Could not get media URL of {media}")

        page_cdn, page_hash, thumbnail = self.generate_media_page(urls, url, tweet.json())

        screenshot = self.get_screenshot(url)

        return ArchiveResult(status="success", cdn_url=page_cdn, screenshot=screenshot, hash=page_hash, thumbnail=thumbnail, timestamp=tweet.date)
```

YouTubeDL is for YouTube and twitter (video)

Twitter archiver is just for an image(s) in a tweet


## Files

[![alt text](/assets/2022-03-16/twitter1image.jpg "desktop")](/assets/2022-03-16/twitter1image.jpg)

The raw image is the corret filename and is the original filesize

- twitter__media_FM7-ggCUYAQHKWW.jpg - 19KB
- 720*540

1. Raw image
2. Html with raw json from twitter
3. Screenshot of the tweet

[https://webtrickz.com/download-images-in-original-size-on-twitter/](https://webtrickz.com/download-images-in-original-size-on-twitter/)

[![alt text](/assets/2022-03-16/twitter1html.jpg "desktop")](/assets/2022-03-16/twitter1html.jpg)

includes the raw twitter object.

[![alt text](/assets/2022-03-16/twitter1screenshot.jpg "desktop")](/assets/2022-03-16/twitter1screenshot.jpg)

screenshot of the original tweet

Twitter archiver does not render a thumbnail sometimes (look in the cell it will be there). Maybe the type of jpg?

[![alt text](/assets/2022-03-16/twitter1excel.jpg "desktop")](/assets/2022-03-16/twitter1excel.jpg)

Notice there is no 1. link to the raw image - sometimes there is in the Thumbnail!

To get these links working you need to turn on the CDN from DigitalOcean.

## Hashing

[Hashlib](https://docs.python.org/3.9/library/hashlib.html) is a standard library.

They are using sha256 (SHA2) to hash the image.

## Spaces vs Empty in Excel Sheet

careful - otherwise it will ignore 

## Python Exception Handling

```py
try:
    tweet = next(scr.get_items())
    # except: 
	except Exception as e:
        logger.warning('wah wah')
        False
```

## Twitter Images - Snscrape

[https://github.com/JustAnotherArchivist/snscrape](https://github.com/JustAnotherArchivist/snscrape)

Used to get tweets (but the library to use as a library is undocumented)

Am sometimes getting a key error on [https://twitter.com/LaMinMgMaung/status/1500053890246533121](https://twitter.com/LaMinMgMaung/status/1500053890246533121) which has 2 images in the tweet.

Please see next article on the legality of scraping public data (it is legal)

## Twitter Video - YouTubeDLP

can't do muliple videos?

checks in DO storage to see if already archived

hash of mp4 matched github.io

Archive Lodation: the mp4
Screenshot: didn't work properly

Thumanil Index - very useful

## Youtube Video - YouTubeDLP

can't do muliple videos?

## Telegram

Telethon is a telegram client. App tries telethon 

Telethon - needs an API Key otherwise prompts to enter phone number or key on command line

`anon.session` is written to the filesystem

## Facebook

Facebook with video works with the screenshot showing the cookie page

Facebook with image doesn't work.

There is code to pass a facebook cookie. Which doesn't work (mistake - 4 w's in the code).

```bash
# create new shell variable
FB_COOKIE=123

echo $FB_COOKIE

# it isn't an enviornment variable yet
printenv FB_COOKIE

# export is used to set environment variables
export FB_COOKIE

# or just this
export FB_COOKIE="TS07YrM8wKMqv4f3jQRWIb8y"

# it works
printenv FB_COOKIE

# to persist in Ubuntu
# ~/.profile
# export FB_COOKIE="123" 
```



## Problems
Some screenshots dosn't work of long tweets


## VSCode

Format Document
 using autopep3 - added to dev-packages


`Shift Alt F` - format


## Submit PR

remove import logging from auto_archive.py

sort the imports


argparse can take out of pip as now maintained within Python standard lib
https://pypi.org/project/argparse/


should we bring in requests in the pipfile to get lastest version?

fix docs - not right column names

## OLD BELOW

```bash
# Pip is a tool for installing Python packages from PyPI
## 22.0.45 from /home/dave/.local/lib/python3.9/site-packages/pip (python 3.9)
pip3 --version

# I've got lots of tools installed... lets isolate in a virtual environment below
pip3 list

# on Ubuntu pip refers to python2 and pip3 refers to python3.. 
# on virtual environments we don't care about that
command -v pip3
```

## Pipenv - Virtual Environments

[Medium](https://medium.com/@DJetelina/pipenv-review-after-using-in-production-a05e7176f3f0)

This is a [hot topic](https://stackoverflow.com/questions/41573587/what-is-the-difference-between-venv-pyvenv-pyenv-virtualenv-virtualenvwrappe?rq=1) and complex. But as the [tool I'm exploring](https://github.com/bellingcat/auto-archiver) uses it, then I'll stick with it.

[Digital Ocean on Ubuntu 20](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-programming-environment-on-an-ubuntu-20-04-server) use [venv](https://docs.python.org/3/library/venv.html)

[https://docs.python-guide.org/starting/install3/linux/#pipenv-virtual-environments](https://docs.python-guide.org/starting/install3/linux/#pipenv-virtual-environments) guide

Python virtual environments allow you to install python modules in an isolated location for a specific project.

[https://pypi.org/project/pipenv/](https://pypi.org/project/pipenv/)

[https://pipenv.pypa.io/en/latest/](https://pipenv.pypa.io/en/latest/) documentation

```bash
# this worked
# and looks like it has used python3.9
pip install pipenv

# maybe should have done this https://docs.python-guide.org/dev/virtualenvs/
# https://pipenv.pypa.io/en/latest/install/#pragmatic-installation-of-pipenv
# essentially a pragmatic install if have existing toolchains
# which I don't really, so can ignore.
pip install --user pipenv

cd project-folder

# install Requests library and create 
# Pipfile - used to track dependencies
pipenv install requests
```

[![alt text](/assets/2022-03-16/1.jpg "desktop")](/assets/2022-03-16/1.jpg)

It worked. First use of pipenv.

```py
# requests module
import requests

response = requests.get('https://httpbin.org/ip')
print('Your IP is {0}'.format(response.json()['origin']))

x = requests.get('https://w3schools.com/python/demopage.htm')
print(x.text)
```

then run with 

```bash
# it worked giving my ip address
pipenv run python main.py

# by using code below I could tell it was using the Python 3.9.10 interpreter
```

## What Version of Python is my program running?

- Python3.9.10 running when I do python3.9 script.py
- Pip 22.0.4
- Pipenv 2022.1.8

```py
import sys

print("Hello world")

# 3.9.10 when run with python3.9 script.py
# 3.6.9 when run with python3 script.py
# 2.7.17 when run with python script.py
print(sys.version)
```

## Pipenv

```bash
cd project-folder

# get dependencies for this projet
pipenv install

# install requests library in this project
pipenv install requests

# install specific version of flask
pipenv install flask==0.12.1

#
pipenv install numpy


# activate the shell!
pipenv shell

# can now run 
# this works running 3.9.10 as the interpreter
python main.py

# run command inside the virtual env
# running 3.9.10 
pipenv run python main.py
```

So this is excellent - I now have the correct version of python and dependencies under a virtual environment.

## Updating Python to 3.10 (latest) 

```bash
# 3.8.10
python3 -V

sudo add-apt-repository ppa:deadsnakes/ppa

sudo apt install python3.10

# need this for pipenv otherwise get ModuleNotFoundError: No module named 'distutils.cmd' error
sudo apt install python3.10-distutils

# 3.10.2
python3.10 -V

# create new virtual environment for new version of python
# if just do pipenv it will link to python 3.9
pipenv install --python 3.10

cd project-folder

pipenv install requests

# 3.10.2 interpreter
pipenv run python main.py
```


## Running in production

Am running Ubuntu 20.04.4 on [Proxmox hypervisor](/2022/01/13/proxmox) in home office lab.

Script is in [source control - infra](https://github.com/djhmateer/auto-archiver/tree/main/infra)

After restoring/buiding from a base image I can follow the instructions in `infra/server-build.sh`

```bash
#!/bin/sh

# Script to configure production server
# Run the 3 commands below manually

# git clone https://github.com/djhmateer/auto-archiver
# sudo chmod +x ~/auto-archiver/infra/server-build.sh
# ./auto-archiver/infra/server-build.sh

# Use Filezilla to copy secrets - .env and service-account.json

## Python
sudo apt update -y
sudo apt upgrade -y
sudo apt autoremove -y

sudo add-apt-repository ppa:deadsnakes/ppa -y

# etc...
```

Then a new server is running after 4:20. This works well for deploying updated instances of the codebase. Takes 20 seconds for the cron job to start.

