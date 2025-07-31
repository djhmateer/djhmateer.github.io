---
layout: post
# title: Pull Requests 
description: 
menu: review
categories: mvp 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

How good is AI at getting to an MVP (Minimum Viable Product) stage?

Lets assume 

- we know who the customers are
- we are solving a problem for them
- they want to 'Give us their money'

So lets build an MVP 

## MVP of Application

Lets also assume it will

- have a database
- a web application
- have reasonable design
- be reasonably simple

## AI

[https://chatgpt.com/share/6889f8be-dd00-8006-b640-76e80c748d94](https://chatgpt.com/share/6889f8be-dd00-8006-b640-76e80c748d94) 

I typed in the requirements into ChatGPT which in itself is a great exercise. 

I'm working with an experienced front end developer, so I'm going to focus on the back end part of this application and see where AI tools get me

- Can it get me to an MVP fast?
- Can the code be any good?
- Can I use a different framework (eg FastAPI which looks reasonable) which I've never seen
- Can I use a language (Python) which I'm only reasonably familiar with, but I know AI tools have a lot of knowledge about.

### Notes so far

- ChatGPT great a solving directed problems (eg engineering) - python versions, pyenv, poetry
- Cursor when I asked for a simple project for FastAPI gave me some outdated dependency management which I knew I didn't like (pip install)


## Python

As we're using python lets do it properly, and use AI to help solve engineering / version challenges

As I know we're going for a custom build of a VM (I'm good at this), lets find out the best versions with all latest speed improvements to install.

3.13.5 was released on 11th Jun 2025 (about 6 weeks ago)

I'm using 3.12.3 on another project, which seems to be the most stable and supported.

3.13.5 is latest stable with small speed improvements over 3.12. Optional JIT is experimental but promising.

Python 3.12.3 comes with Ubuntu 24.04.2 (Latest LTS as of 31st Jul 25 and 5 years of security updates) which I'm using on dev and prod. Ubuntu 25 (only 6 months of security updates) comes with python 3.13.3

### pyenv for multiple version of python on a system

I'm going to try 3.13.5 but need to isolate it, as I use 3.12.3 for other projects. 

https://github.com/pyenv/pyenv

```bash
curl -fsSL https://pyenv.run | bash

echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init - bash)"' >> ~/.bashrc

echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.profile
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.profile
echo 'eval "$(pyenv init - bash)"' >> ~/.profile

## restart shell
exec "$SHELL"

## 2.6.5 on 31st Jul 25
pyenv

# install python dependencies before attempting to install new python version
sudo apt update; sudo apt install make build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev curl git \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

# list available versions
# there is a t version, which means tuned. don't use yet.
pyenv install -l

# this downloads and compiles the python version
pyenv install 3.12.3
pyenv install 3.13.5

# should see 3 including system
pyenv versions

cd code/tldw
# I want to keep 3.12.3 as my default, but I found global system had shim errors when running my test python program so best to use 3.12.3
# pyenv global system
pyenv global 3.12.3

# this writes a file - .python-version in the code/tldw directory specifically for this directory
pyenv local 3.13.5
# pyenv shell 3.13.5

poetry install
# if big changes from previous
poetry lock
poetry install

# to see the path to python
# then select interpreter on vscode/cursor
poetry env info
```

## Project Dependencies

So immediately with prior knowledge I know there are good ways of dependency management in python in 2025

- poetry (latest version is 2.1.3 on 31st July 2025)
- hatch

chatgpt seems better at creating an init

```bash
# initialize in an existing folder
poetry init

# Add dependencies
poetry add fastapi uvicorn

# I need to create a file here

# Run the app
# it was tldw_app.main
# but a mix of tldw-app folder, and tldw_app class... don't want.. so try none
poetry run uvicorn tldw.main:app --reload
```

[![alt text](/assets/2025-07-31/1.jpg "Dependencies")](/assets/2025-07-31/1.jpg)

A test app making sure I have cursor working with the correct version of python.

## FastAPI

As I know what I'm doing (roughly), lets see if the docs can get me going faster than AI

"FastAPI is a modern, fast (high-performance), web framework for building APIs with Python based on standard Python type hints"

[https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)


```bash

# this wont work - need fastapi[standard] extras
fastapi dev main.py

# an ASGI server - what runs the FastAPI app and serves on http://127.0.0.1:8000/
uvicorn main:app --reload

# prod
# looks like could use gunicorn to handle multiple workers, but raw okay if managed using systemd and small/medium apps
uvicorn main:app --host 0.0.0.0 --port 8000
```


[![alt text](/assets/2025-07-31/2.jpg "API Swagger Docs")](/assets/2025-07-31/2.jpg)

[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) - interactive Swagger UI which lets you test the endpoints.

Also [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc) an alternative, but not interactive ie can't test. Can generate an OpenAPI.json file [http://127.0.0.1:8000/openapi.json](http://127.0.0.1:8000/openapi.json) which can be used by Postman or code generators.


Okay now I understand what is going on, lets get AI to generate a new endpoing. It does it very well! /items/foo

```py
# FastAPI class inherts from Starlette which is an ASGI framework for building async web services in Python
from fastapi import FastAPI

# create an instance of the FastAPI class
app = FastAPI()

# path operation decorator
# path is also called an endpoint or route

# operation refers to one of the http methods eg get, post, put, delete
@app.get("/")
# path operation function

# https://fastapi.tiangolo.com/tutorial/first-steps/#define-a-path-operation-decorator

# could be that we don't need async eg db call
# https://fastapi.tiangolo.com/async/#in-a-hurry
async def root():
    return {"message": "Hello World"}


# Define a new GET endpoint for /items/foo
@app.get("/items/foo")
async def get_items_foo():
    # Return a JSON response with item information
    return {"item_id": "foo", "item_name": "Foo Item", "description": "This is the foo item"}
```


[![alt text](/assets/2025-07-31/3.jpg "AI generated simple items/foo endpoint")](/assets/2025-07-31/3.jpg)

**TODO** next is see how AI get generate 

- sample CRUD endpoints 
- a lightweight ORM (dapper style?) connector to local postgres
- front end generators like  FastAPI-Admin / Piccolo_admin 
- or custom svelte/vue/ raw html/css/js

---
---


**DEV NOTES BELOW NOT DONE**

## Next
nginx
 and use certbot to handle ssl certs


swagger client / tests?


try a gui builder like FastAPI-Admin
or piccolo_admin
or use svelte

or html/css/js
Jinja2




## All in one Vibe coding sites

https://bolt.new/~/stackblitz-starters-zotmtg6q

https://v0.dev

Interesting, but....

## AI's

chatgpt

cursor (Claude?)

## FOO

for a complex webapp:

v0

shadcn/ui uses radixui 
tailwindcss

next - lots of pages... 
(and react).
 these are the 'defaults' of AI

**try different tech stacks with AI

full JS - svelte... next?
full server - .NET, Python, RoR, PHP, Rust?


- Simple
- No ORMs!
- Only a few devs, so can be agile and lean



## TODO

podcast: https://syntax.fm/show/923/getting-the-most-out-of-ai-coding

linting and formatting - ruff?

Cursor Rules



## MVP Single Page Website 

single page website saying what we're doing, to get a launch list of email addresses.

have screenshots of final product (mock ups?)

https://www.figma.com/sites/




