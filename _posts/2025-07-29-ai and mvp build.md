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

[Source on GH of this MVP](https://github.com/djhmateer/tldw)

Lets assume 

- we know who the customers are
- we are solving a problem for them
- they want to 'Give us their money'

So lets build an MVP 

## MVP of Application

Lets also assume it will

- Have a database
- Be a web application
- Have reasonably professional design
- Be as simple to understand as possible by a developer

## How much to auto-gen?

20+ years of experience of CRUD app builders, many languages and many different codebases (yes enterprise applications specifically) have left me with strong opinions

- huge layers of abstrations in case you need this increase cognitive load
- I prefer the simplest possible solution
- repeating yourself a few times is okay in a code base to reduce complexity
- I prefer technology I can understand (no black magic Next.js)
- complexity always comes back to haunt you

So although I could do a super fast build using React (which I don't know) and Express on the backend (which I don't know) or Next.js everywhere... I'm not going to

Even though this is an MVP

- yes MVP's have a habit of staying in production :-)

I enjoy the artistic beauty of simplicity.


## AI - start with spec.md

https://chatgpt.com/c/68906d91-77b0-8322-ba39-225489d9551f

This was my start with this prompt:

```md
you are an expert software developer. Describe in detail how to go through the process of using ChatGPT to rapidly develop a new proof of concept web application.

I will give AI a sample project structure which includes:

- python and fastAPI for the backend
- postgres database which I'll host on my own vm
- front end html/css and javascript
- front end includes a sample page with css grid for layout, tailwind 4 

what I want to focus on is the AI process ie

- develop md files with a project spec in it (or mdc files?)
- develop coding style guidelines for ai
- use browsertools mcp (with cursor) to test the javascript
- do screenshots of the app to help in testing
- setup .cursorrules file
- setup <xmltag>code here</xmltag> style to help AI understand what is code 
- a spec.md file
- what is an llms.txt file
```

Then next prompt all around `spec.md`
https://chatgpt.com/c/68906e88-9690-8321-a597-ddc20e4d2e5a

```md
please help me develop a spec.md file to use in developing a mvp

the spec is around a project called TLDW - too long didn't write

go into great detail - I want to know each step of this spec.md process

<oldprompt>
in relation to this prompt:
you are an expert software developer. Describe in detail how to go through the process of using ChatGPT to rapidly develop a new proof of concept web application.

I will give AI a sample project structure which includes:

- python and fastAPI for the backend
- postgres database which I'll host on my own vm
- front end html/css and javascript
- front end includes a sample page with css grid for layout, tailwind 4 

what I want to focus on is the AI process ie

- develop md files with a project spec in it (or mdc files?)
- develop coding style guidelines for ai
- use browsertools mcp (with cursor) to test the javascript
- do screenshots of the app to help in testing
- setup .cursorrules file
- setup <xmltag>code here</xmltag> style to help AI understand what is code 
- a spec.md file
- what is an llms.txt file
</oldprompt>

```

start with a `sped.md` file

Go through each section with an LLM iterating

1.Project Overview
2.Core Features Checklist (which I'll use to get the AI tick off when done)
3.User Flow - eg new user, returning user, ai assist, templates
4.Technical stack
5.Data Models
6.API endpoints
7.UI Layout

Interestingly I don't have a good sample project yet for this full stack, only a partial FastAPI project. Let's start with the and see what happens.




## AI - start with engineering ie scaffold out

[https://chatgpt.com/share/6889f8be-dd00-8006-b640-76e80c748d94](https://chatgpt.com/share/6889f8be-dd00-8006-b640-76e80c748d94) 

I typed in the requirements into ChatGPT which in itself is a great exercise. 

I'm working with an experienced front end developer, so I'm going to focus on the back end part of this application and see where AI tools get me

- Can it get me to an MVP fast?
- Can the code be any good?
- Can I use a different framework (eg FastAPI which looks reasonable) which I've never seen
- Can I use a language (Python) which I'm only reasonably familiar with, but I know AI tools have a lot of knowledge about.

### Notes so far

- ChatGPT good at coming up with frameworks to consider 
- ChatGPT great a solving specific problems (eg engineering) - python versions, pyenv, poetry
- Cursor (Claude) when I asked for a simple project for FastAPI gave me some outdated dependency management which I knew I didn't like (pip install)


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
# pyenv to have different versions of python
# maybe don't need on production but do on dev
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
# pyenv install -l

# this downloads and compiles the python version
#pyenv install 3.12.3
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
# or if in the tldw folder
poetry run uvicorn main:app --reload
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

- ask AI how to work with AI
- youtube how to do this thing like paddy

- get python going on a laptop?
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

synthesia



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




