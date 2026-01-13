---
layout: post
title: 
description: 
menu: review
categories: ai 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2025-11-03/1.jpg "Picard")](/assets/2025-11-03/1.jpg) -->

After watching Rob Conerys [bigmachine.io](https://bigmachine.io/courses/) on AI and [writing a blog on it]() I've tried all the agentic AI's and settled on claude-code

My goal is to write professional software (I've been doing this for a long time), and use claude-code to do it quickly.

[https://github.com/hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

[https://github.com/ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips) -


## ykdoji

- just use claude-code more and get better at it
- do small steps
- make lots of tests
- make prototypes
- take things out and put others in - iterate fast
- use other llms
- ask it to review itself all the time

```bash
/usage

# install chrome extension - Navigate websites, fill forms, capture screenshots, record GIFs, and debug with console logs
#  and network requests.
# careful - https://www.claude.com/chrome  looks buggy at the moment
/chrome
```

## Story

- start with CLAUDE.md
- start with /features and the playlists-spec.md
- build up from the db
- then API
- then http service layer
- front end as simple as possible
- Testing both API and then service
- Exception handling ** started to slow down here
- Logging
- Deploy to live including ssl certs, and easy CD (or a script for me) - **takes time.. good to get a strategy
- 404 pages ** frustrating.. good to get a strategy
- Authenticaion and Authorisation ... ** good to get a strategy

**HERE** - probem with complexity and trying to do too much (therefore slowing down)


## Foo

great thing about AI is being able to swap out ORMS.. then none at all

then take away fields

then ask AI if any suggestions and refactor

same about before but a great tool.

Is AI taking the place of an ORM / Typescript here.. in that I'm using it to scan code. This is obviously dangerous but with tests, it is an interesting experiment.


## Bar

This is a lot of fun - see paper notes on philosophy of code being produced.. and how LLM's are making it easy to be

- flexible
- change parts out quickly (eg logging)
- 

## LLM's

- Claude-code - favourite. Ran out of weekly credits using $20pm

- Gemini - not bad. free tier. slower than Claude and doesn't give as much output. Rate limits downgrade to gemini-2.5-flash after a few hours.

- Codex - couldn't get it to work reliably.. getting weird filesystem errors using WSL2.. couldn't scan files sometimes. VSCode worked better than shell. seems to work sometimes.

Agentic AI is best when you treat it like:
- A staff engineer + pair for drafting, enumerating edge cases, generating scaffolding/tests, code review, and refactors.


## Developing login-spec.md 

I ask claude to help me develop spec documents  eg login-spec.md

It can get too complex and needs proper reviewing. A good rule of thumb.

- specs may show how things must look, never how to write them.
- 500 is ideal

The more complex it gets, the more tokens! Can easily blow through 20k tokens implementing a spec.. yikes.

Alwyas good to use another AI to review the spec (along with claude.md guidance file)

It does come up with good features which I'd never thought of eg timing code to stop attackers guessing email addresses.

Riffing on the spec is good, but soemtimes just good to code it up.

## Split specs up which are too big

[https://www.anthropic.com/engineering/claude-code-best-practices](https://www.anthropic.com/engineering/claude-code-best-practices) 

CLAUDE.md	AI operating rules
playlists-spec.md	Playlist domain truth
frontend-spec.md	UI behavior contract
auth-overview.md	Auth invariants
auth-http.md	Auth HTTP surface
auth-services.md	Auth business logic
auth-sessions.md	Session persistence
auth-security.md	Deferred security


## Just move fast

Okay I did too much.. lets just try and and see what happens.

I've got an authenticaiton backend and some tests..

[![alt text](/assets/2026-01-09/1.jpg "Playlists with auth")](/assets/2026-01-09/1.jpg)

Lets do simplest possible thing - I made a login and register page which allowed me to view playlists just for this user.

## Simplify

- Run review
- Manually go through and decide what to do
- Make sure tests all pass
- Fix things that smell eg throwing an Exception/Error in normal code flow

as the code grows continue to simplify

for example I've got a svelte app which is currently full SPA, but does the registration/login need to be SPA? It introduces complexity which may be simplified.

take each file from top down and simpligy, and put in good logging, and messages.

- server.js - getting rid of dynamic imports by using Node.js --env-file flag so that the env file is loaded. global exception.
- app.js - mainly middleware. This showed me a bug in perf where I was checking the sessesion for every asset.

Check all database calls. So nice to have a raw output and see each call and query time.


## Range Anxiety aka Token Anxiety

I've got a $20pm claude-code subscription and I do hit limits frequently.

For in depth refactoring (ie smaller stuff) it is fine.

For in depth stuff, I find going to gemini pretty good (free for a bit)


## SSR vs Static vs bits non SPA!

I was using SvelteKit with `adapter-node` now I'm using `adapter-static`

The app is much faster using static pages with an express backend.

Yet, AI's keep pointing me towards using adapter-node and I don't understand why. SEO seems to be the reason (which is fine)


## Refactoring from Svelte to React

Opinions on whether good idea
just do it
performance
simplicity

## Models


opus 4.5 - most expensive (default for max plans). Deep work
sonnet 4.5 - middle (default for pro?). Daily driver for refacotrs. start here.
haiku 4.5 - fastest and cheapest. Fast lane for small, low risk edits

```bash
# use the UI to select
/model
/model haiku

/usage
```