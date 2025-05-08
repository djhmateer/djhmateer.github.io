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

As of 7th May 2025 the current LTS is 24.04.2 LTS so I'm moving to this for aa 1.0 testing.


run auto-archiver from WSL side




## Python

Python 3.10 comes with Ubuntu 22.

Python 3.12.3 comes with Ubuntu 24.


## Pipx and Poetry

[https://pipx.pypa.io/stable/installation/](https://pipx.pypa.io/stable/installation/)


[https://python-poetry.org/docs/](https://python-poetry.org/docs/)

```bash
sudo apt install pipx

# update to 1.7.1 (7th May 2025)
pipx install pipx


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

