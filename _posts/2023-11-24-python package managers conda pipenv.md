---
layout: post
# title: LLMs for Business Ideas - human rights
description: 
menu: review
categories: ai 
published: true 
comments: false     
sitemap: true
image: /assets/2023-07-22/1.jpg
---

<!-- [![alt text](/assets/2023-10-10/3.jpg "email"){:width="600px"}](/assets/2023-10-10/3.jpg) -->


## Pipenv

this uses pipfile and pipfile.lock to manage dependencies (not requirements.txt as is common in pip)

pipenv automatically creates and manages a virtual environment for projects.

```bash
# need pip to get pipenv 
sudo apt install python3-pip -y

# install pipenv
pip install --user pipenv

# create a new Pipfile and Pipfile.lock if not there
# otherwise get all dependencies
pipenv install
```

pipfile example

```pip
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
gspread = "*"
boto3 = "*"
argparse = "*"
```

then to run a program

```bash
pipenv run python foo.py
```

## pyenv

[pyenv](https://github.com/pyenv/pyenv) - switch between versions of python

```bash
curl https://pyenv.run | bash

## got this message

WARNING: seems you still have not added 'pyenv' to the load path.

# Load pyenv automatically by appending
# the following to
# ~/.bash_profile if it exists, otherwise ~/.profile (for login shells)
# and ~/.bashrc (for interactive shells) :

export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# Restart your shell for the changes to take effect.

# Load pyenv-virtualenv automatically by adding
# the following to ~/.bashrc:

eval "$(pyenv virtualenv-init -)"

# restart the shell
exec bash
```

then

```bash

# this failed on my system
pyenv install 3.11.4

# ModuleNotFoundError: No module named '_ssl'

#   WARNING: The scripts pip3 and pip3.11 are installed in '/home/dave/.pyenv/versions/3.11.4/bin' which is not on PATH.
#   Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.

# I typed the error into chat gpt and followed hints.. it was probably this that got it working
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev git

# worked
pyenv install 3.11

pyenv install 3.11.4

pyenv virtualenv 3.11.4 foo4

# is this like create?
pyenv local foo4
# or
pyenv activate foo4

# it writes a file called .python-version which includes foo4

# can select this fpyenv from vs code to run the interpreter
```

## pyenv-virtualenv

a pyenv plugin that provides features to manage virtualenvs and conda envs fo rpython.


## Poetry

Once has pyenv setup for python 3.11.4 and working inside the environment called `cir-dedeuplication`

```bash
pip install poetry

poetry install
```
uses `pyproject.toml` for configuration





## OTHER

## Conda (Miniconda)

environemnet management system - including non python projects.

popular in data science

```bash
conda create --name foo python=3.10
conda activate foo

# not working for me
pip install gspread

python3 test.py
```

where test.py is

```py
import sys
import requests
import gspread

# 3.9.14
print("Python intepreter version:")
print(sys.version)

# 2.28.1
print("requests module version:")
print(requests.__version__)
```


## Virtualenv

asf

## venv

built into python from 3.3

## pip-tools

