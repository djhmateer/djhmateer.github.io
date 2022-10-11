---
layout: post
# title: Proxmox Beginners Guide
description: 
menu: review
categories: python
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

To make dependencies easier in dev and production, I use `pipenv`. 

```bash
# Python 3.8.2 comes with Ubuntu 20_04 but we want newer
sudo add-apt-repository ppa:deadsnakes/ppa -y

sudo apt update -y

# get Python 3.9.14 (11th Oct 2022)
sudo apt install python3.9 -y

# to stop WARNING: The scripts pip, pip3 and pip3.8 are installed in '/home/dave/.local/bin' which is not on PATH.
export PATH=/home/dave/.local/bin:$PATH

# need pip to get pipenv 
sudo apt install python3-pip -y

# update pip to 22.2.2 (11th Oct 2022)
pip install --upgrade pip

# install pipenv
pip install --user pipenv
```

## Pipfile

```bash
# create a new Pipfile and Pipfile.lock if not there
# otherwise get all dependencies
pipenv install
```

Add a dependency to pipfile eg [https://postmarkapp.com/send-email/python](https://postmarkapp.com/send-email/python) which I use for sending emails

```txt
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
postmarker = "*"
numpy = "*"
requests = "*"

[dev-packages]

[requires]
python_version = "3.9"
```

## Sample Python

```py
import sys
import os
import requests
import numpy as np

# https://postmarkapp.com/send-email/python
from postmarker.core import PostmarkClient
import postmarker

# 3.9.14
print("Python intepreter version:")
print(sys.version)

# 2.28.1
print("requests module version:")
print(requests.__version__)

# 1.23.3
print("numpy module version:")
print(np.__version__)

# 1.0
print("Postmarker version:")
print(postmarker.__version__)

# token = os.environ['POSTMARK_TOKEN']
token = os.environ.get('POSTMARK_TOKEN')

# send to black hole (will succeed if no errors)
if token is None:
  token = 'POSTMARK_API_TEST'

postmark = PostmarkClient(server_token=token)
postmark.emails.send(
  From='help@osr4rightstools.org',
  To='davemateer@gmail.com',
  Subject='Postmark test',
  HtmlBody='Successful test - this is html'
)
```

## Run 

```bash
# check to make sure all dependencies are installed
pipenv install

# run inside the virtual environment
pipenv run python email-test.py
```

## VSCode

[![alt text](/assets/2022-10-11/1.jpg "email")](/assets/2022-10-11/1.jpg)

`Ctrl Shift P` - Python select Interpreter, then select the `service-firemap` or whatever your directory is called. Or press on the `3.9.14 64-bit` icon on bottom of screen

If you don't see the correct pipenv, close and reopen vscode.

[![alt text](/assets/2022-10-11/2.jpg "email")](/assets/2022-10-11/2.jpg)

Ready to debug! With all dependencies installed in the pipenv.