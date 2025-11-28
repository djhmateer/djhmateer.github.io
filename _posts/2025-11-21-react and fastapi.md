---
layout: post
title: 
description: 
menu: review
categories: react 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2025-11-03/1.jpg "Picard")](/assets/2025-11-03/1.jpg) -->

I'm looking at an existing project which needs work done on the security side. Specifically it is home grown tokens. Much better to have session based approach http only cookies.

The project is

- React 18
- React Router v6
- Created with Create React App
- Webpack for build

backend

- FastAPI on Python 3.12
- MySQL
- no ORM
- Poetry (I introduced - want to use uv later). Was just requirements.txt before that.

## Green field

If were starting afresh with a similar React app (no Next.js style server framework), what would I choose?

Also I've got to work with another developer who is comfortable with the above stack.


Bunderler / Dev tooling
- Vite seems to have taken over rather than CRA/webpack


### Vite

like webpack

Created by Evan You who created vue.js to simplify and speed up the process


- Serves code locally
- Bundles the js and assets for production

```bash

# standard React project with Hot Module Replacement
npm create vite

corepack enable
corepack prepare pnpm@latest --activate

# 10.23.0 on 21st Nov 25
pnpm -v

pnpm create vite

# React (not Vue)
# React Router v7

# uses this
# pnpm create react-router@latest

pnpm dev


# swc is speedy web compiler
# a rust based js/ts compiler that replaces babel 
# faster but less plugins
# this doesn't have a router in it.
pnpm create vite react-swc-ts  --template react-swc-ts

# hot reload, dev
pnpm dev

# prod build into dist
pnpm build

# eslinter
pnpm lin

# see prod locally
pnpm preview
```

vite.config.ts


## React Router

Need a router for multiple pages.

v7 - wont notice too much difference

```
pnpm add react-router-dom
```

/ 
/search
/login
/logout

## React

components are PascalCase eg App.tsx, Home.tsx, Search.tsx

App.tsx

```tsx
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import './App.css'

// Layout and routes combined
function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>My App</h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

```

## CSS
 
So we don't have problems with rendering, need a solid CSS framework. This is after trying to get a footer to render and it disappearing.

[![alt text](/assets/2025-11-21/1.jpg "EPlatform")](/assets/2025-11-21/1.jpg)

Vite for build

React Router v7, Tailwind v4

So I have the above working.

## Deploy

Lets deploy to my 'live' server which is just internal, but on another machine. Will be pefect for testing client/server soon.

### Refactor

When I tried to deploy to prod I had to get a webserver going, so lets spin in FastAPI to serve the static content as well.

am going for a project structre

```
/client
/server

```

### uv

```
curl -LsSf https://astral.sh/uv/install.sh | sh

source $HOME/.local/bin/env 
```

[![alt text](/assets/2025-11-21/2.jpg "Fast API serving static content")](/assets/2025-11-21/2.jpg)

Fast API serving static content

Am stick with Python 3.12 for now even though 3.14.0 is released. For safe dependencies.

```bash
uv python list

# Install latest Python
uv python install 3.13

# Use it in your project
# cd server
# uv python pin 3.13

# update packages
uv lock --upgrade        # upgrade all resolved packages
uv sync                  # install them into your environment

```


VSCode should use the intepreter in the project: ` /home/dave/vite/vite-project-3/server/.venv/bin/python` which was not automatically selected.


## Routes

`http://192.168.1.179:81/` - home
`http://192.168.1.179:81/search` - search

`http://192.168.1.179:81/api/health` health check endpoint handled by fastAPI.


## Uvicorn

  workers = (2 × CPU cores) + 1

  So --workers 4 is just an example - you'd adjust based on your server.

  Why multiple workers?

  - Uvicorn is single-threaded - one worker can only use one CPU core
  - Multiple workers = parallel request handling across cores
  - Fault tolerance - if one worker crashes, others keep serving

  However, since uvicorn is async (handles I/O concurrency well), you might not need as many workers as a sync server. For I/O-bound apps (database calls, API requests), even 1-2
  workers can handle high concurrency.


`nproc` to see number of cores - I've got access to 20 cores on my test prod VM.


## VSCode

```json
    "version": "0.2.0",
    "configurations": [
        {
            "name": "FastAPI Server",
            "type": "debugpy",
            "request": "launch",
            "module": "uvicorn",
            "args": ["main:app", "--reload"],
            "cwd": "${workspaceFolder}/server",
            "console": "integratedTerminal"
        },
        {
            "name": "Python Debugger: Current File",
            "type": "debugpy",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal"
        }
    ]
```

This launches FastAPI in VSCode using the correct default interpreter in `/home/dave/vite/vite-project-3/server/.venv/bin/python`

not sorted out debugging yet!

```bash
# notes on how to start the app normally in dev (not debug which is to use launch.json)
# python
cd server 
uv run uvicorn main:app --reload

# react - vite - port 5173 - custom node webserver
cd client 
pnpm dev


## Other front end commands
pnpm build

# port 4173 - prod port
pnpm preview

pnpm lint

```

HERE
- keep launch.json for when need debug
- otherwise 2 separate windows

cd server && uv run uvicorn main:app --reload

## API

Lets explore how best to implement an api with fastAPI and React

[https://github.com/fastapi/full-stack-fastapi-template](https://github.com/fastapi/full-stack-fastapi-template)

servertime

/api/servertime

if I call [http://192.168.1.179:81/api/servertime](http://192.168.1.179:81/api/servertime) I get:

```json
{"time":"2025-11-22T07:45:30.300811Z"}
```

how does it know what is dev and what is prod?

```bash
# on dev
cd server
ENVIRONMENT=development uv run uvicorn main:app --reload --port 8000

# react - vite - port 5173 - custom node webserver
cd client 
pnpm dev

# in prod I'm using
export ENVIRONMENT=production
uv run uvicorn main:app --host 0.0.0.0 --port 3000
```


## Security of the API
1. Classic server-side sessions + HTTP-only cookie

User POSTs {username, password} to /auth/login.

FastAPI validates creds and creates a session record in your DB/Redis:
Backend sets a session cookie:
Every subsequent request from React uses fetch/axios with credentials: "include" so the cookie goes along automatically.

A FastAPI dependency reads the cookie, loads the session from the store, and attaches current_user to the request.



2. JWT access tokens + HTTP-only cookies

[https://github.com/fastapi-users/fastapi-users](https://github.com/fastapi-users/fastapi-users) - maintenance mode

[https://github.com/jordanisaacs/fastapi-sessions/](https://github.com/jordanisaacs/fastapi-sessions/) - maintenance mode

[https://github.com/amisadmin/fastapi-user-auth](https://github.com/amisadmin/fastapi-user-auth) - 385 stars



Why are there no libraries like [https://github.com/better-auth/better-auth](https://github.com/better-auth/better-auth) which is a full TS stack for auth, for react and python?


Should I leverage!

Django

Flask?



## How to login to front end - authentication and authorisation

Session-based authentication is straightforward and secure - the backend maintains session state (in MySQL), sends a session cookie to the browser. Libraries like FastAPI-Sessions handle this cleanly, or you can roll your own with something like itsdangerous for signed cookies.


## MySQL
 
[https://pypi.org/project/mysql-connector-python/](https://pypi.org/project/mysql-connector-python/) - 940 stars on GH. async.. Official MySQL driver from Oracle. heavier, slower (pure python and not c)

[https://github.com/PyMySQL/PyMySQL](https://github.com/PyMySQL/PyMySQL) - 7.8k stars.. 1.1.2 on 3 months ago.

[https://github.com/aio-libs/aiomysql](https://github.com/aio-libs/aiomysql) - 1.9k stars. port of above for async.

[https://github.com/PyMySQL/mysqlclient](https://github.com/PyMySQL/mysqlclient) - 2.5k stars. 2.2.7 is 9 months old. 10 years old.

### ORMS

[https://github.com/sqlalchemy/sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) - 11.2k stars. 2.0.44 4 days ago. Uses any driver under the good eg MyMySQL

[https://github.com/fastapi/sqlmodel](https://github.com/fastapi/sqlmodel) 17.2k stars. 0.0.27 1 hour ago. Written by same guy as FastAPI. Based on Python type annotations, and powered by Pydantic and SQLAlchemy.

There is also Peewee and Tortoise ORM.

### lightweight ORMS

[records]() - not maintained

[pugsql](https://github.com/mcfunley/pugsql) - 758 stars

[aiosql]()

[databases]() - not maintained

## abstraction

Have settles for a tiny helper function for now to help with abstractions.

## Security

So lets introduce for route based security.


  | Endpoint    | Method | Auth Required | Description                                       |
  |-------------|--------|---------------|---------------------------------------------------|
  | /api/login  | POST   | No            | Login with {"username": "...", "password": "..."} |
  | /api/logout | POST   | No            | Clears session cookie                             |
  | /api/me     | GET    | Yes           | Returns current user info                         |
  | /api/users  | GET    | Yes           | Now protected - requires login                    |

  singular table names (although plural is common too in mysql - like in PostgreSQL)

## Session Based Authentication with Secure Cookies

[![alt text](/assets/2025-11-21/3.jpg "Session Based")](/assets/2025-11-21/3.jpg)

session_id cookie

   1. LOGIN                              2. SUBSEQUENT REQUESTS
      ──────                                ────────────────────

      Client                                Client
        │                                     │
        │ POST /api/login                     │ GET /api/users
        │ {email, password}                   │ Cookie: session_id=abc123xyz...
        │ credentials: 'include'              │ credentials: 'include'
        ▼                                     ▼
      Server                                Server
        │                                     │
        │ ① Lookup user by email              │ ① Extract session_id from Cookie
        │ ② Verify password (Argon2)          │ ② Query DB: SELECT * FROM session
        │ ③ Generate 32-byte token            │    JOIN user WHERE session_id = ?
        │    (secrets.token_urlsafe)          │    AND expires_at > NOW()
        │ ④ INSERT into session table         │ ③ Return user_id, email
        │    (7-day expiry)                   │
        │ ⑤ Set HTTP-only cookie              │
        ▼                                     ▼
      Client                                Client
        │                                     │
        │ Browser stores cookie               │ Request proceeds or 401
        │ automatically (HTTP-only)           │
        └─────────────────────────────────────┘

and then key differences to below

  | Opaque Token Header                | This Project (Session Cookie)    |
  |------------------------------------|----------------------------------|
  | Token sent in Authorization header | Session ID sent in Cookie header |
  | Client stores with js-cookie       | Browser stores automatically     |
  | Client must attach to each request | Browser attaches automatically   |
  | Accessible to JavaScript           | HTTP-only (no JS access)         |

  ## Opaque Token Authentication

  - pure sessions
  - JWT

  hybrid approach is opaque token authentication
  ie essentially stores in js-cookie

  
    1. LOGIN                          2. SUBSEQUENT REQUESTS
    ──────                            ────────────────────

    Client                            Client
      │                                 │
      │ POST /api/login/                │ GET /api/account/123
      │ {email, password}               │ Authorization: token:abc123xyz...
      ▼                                 ▼
    Server                            Server
      │                                 │
      │ ① Lookup user by email          │ ① Extract token from header
      │ ② Verify password (Argon2id)    │ ② Query DB: SELECT * FROM token
      │ ③ Generate 30-char token        │    WHERE token = ?
      │ ④ INSERT into token table       │ ③ Check if valid (expiry bug!)
      │ ⑤ Return token to client        │ ④ Return user_id, admin flag
      ▼                                 ▼
    Client                            Client
      │                                 │
      │ Store in cookie (js-cookie)     │ Request proceeds or 401
      └─────────────────────────────────┘

  Pros of This Approach

  1. Simple to implement - No crypto libraries needed for JWT signing
  2. Easy revocation - Just delete the token row
  3. Server controls session - Can invalidate anytime
  4. No token size bloat - 30 chars vs 300+ for JWT
  5. User data always fresh - Joins with user table each request

  Cons of This Approach

  1. Database hit every request - Scalability concern
  2. No built-in expiry mechanism - Must implement manually (and it's broken)
  3. Token theft = full access - No additional binding (IP, device, etc.)
  4. Multiple active tokens - No limit on concurrent sessions per user

[https://medium.com/identity-beyond-borders/jwt-vs-opaque-tokens-all-you-need-to-know-307bf19bade8](https://medium.com/identity-beyond-borders/jwt-vs-opaque-tokens-all-you-need-to-know-307bf19bade8)


  [https://www.permit.io/blog/a-guide-to-bearer-tokens-jwt-vs-opaque-tokens](https://www.permit.io/blog/a-guide-to-bearer-tokens-jwt-vs-opaque-tokens)

[https://stackoverflow.com/questions/40375508/whats-the-difference-between-jwts-and-a-bearer-token](https://stackoverflow.com/questions/40375508/whats-the-difference-between-jwts-and-a-bearer-token)

[https://zitadel.com/blog/jwt-vs-opaque-tokens](https://zitadel.com/blog/jwt-vs-opaque-tokens)

## External links with Tokens

Okay so I've got a system (currently using session based authentication with secure cookies).