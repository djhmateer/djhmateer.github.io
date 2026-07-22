---
layout: post
title: 
description: 
menu: review
categories: agentic 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---


<!-- [![alt text](/assets/2026-05-20/1.jpg "ii")](/assets/2026-05-20/1.jpg) -->

I've got a couple of projects which need razor sharp focus on the process of what we're doing.

We know in general what there is to do, but what to do first, and how to leverage AI to iterative as fast as possible.

- Vibe code
- something more....
- Agentic Engineering with different personal [see article]()

`spec-driven rapid iteration with constrained AI execution.`

I really liked this:

https://chatgpt.com/share/6a0dbd6c-8428-83eb-8ef6-c77c1b933a71


https://claude.ai/share/24e82bca-6ba3-4848-b72b-8dfe17b54ca9

## 13th of July

I've now had 2 SaaS projects over the last 6 months which have gone like this:

- Someone else has come up with an idea that I like
- They had vibe coded up a web app (in Javascript)
- I've then take the app, then rewritten in React/Python.. and straight Python (with templates)
- Self hosted on Proxmox

In the meantime I've done a project on self hosted LLM's ranking music [here]()

A lot of interest

I've also done another consulting project (React Python MySQL) which I've hosted on Exoscale using similar techniques


## Art of Programming

[https://avi.press/posts/2026-07-10-after-7-years-in-production-scarf-has-reluctantly-moved-away-from-haskell.html](https://avi.press/posts/2026-07-10-after-7-years-in-production-scarf-has-reluctantly-moved-away-from-haskell.html) this article on moving away from Haskell to Python has made me consider what I'm doing in terms of languages. Perhaps a bigger move from Haskell to Python is just the number of people who can be hired.

The art of programming.

I'm a proponent of functional programming, simplicity, and safety in code.

> I also love being an entrepreneur and shipping software that is useful for people

It's nice to use the same languages across different projects, so Python is working well for me (and others I work with are fine with it too).

## Getting things Done

In the spirit of Entrepreneurism, I'm going to continue with Python and see how well it can do for me in small / medium sized projects.

Pieter Levels, FB etc.. use PHP.. and move forward.

So what I need to focus on is

- working real demos which are useful
- moving fast with good dev practises - ie type checking, tests, CD pipeline
- have a reasonable UI

## foo

So I'm gently heading towards

- An app with lots of tests
- With CI
- Running in prod
- Self hosted
- Easily changed 
- Logging
- Exception Handling
- Timezone aware (all dates in UTC, solid testing of pipeline)
- That others can work on..

As always, I'm

- Doing thin slices to get features into prod quickly
- Fixing technical debt as I go (eg type check errors, tests)
- Always considering architecture - is there a better way 
- Focussing on the bigger picture
- Focus on the business side too

Finding the balance between working on tools (yak shaving) and working on the app (being careful not to add features for the sake of it), and the business (ie demoing to clients, marketing, sending out newsletters/tweets of updates etc... )

Something I'm considering currently is

- Are PRG (Post Redirect Get) web based applications still relevant today?

## PRG

I love the 

- Testability of PRG
- No state to worry about in the browser
- Super important when doing complexity such as timezones

## Reviewing the process and light guardrails

I've followed Rob's tutorial for great code [here]() but this needs something less rigid so in CLAUDE.md

```md
## MVP scope check

- Before starting any request that adds a **new feature or capability** (new data type, new integration, new page/workflow) — not bug fixes, styling tweaks, or refactors — check it against the "MVP Scope" section of `PLAN.md`.
- If the request matches something in "Out of MVP" or introduces a capability not mentioned in "In" or "Soon after MVP" at all, say so and ask whether to proceed before building. Name the specific line from `PLAN.md` you're flagging against.
- If it's clearly in scope (matches "In" or "Soon after MVP"), just proceed — don't ask.
- This is a lightweight gut-check, not a formal approval process. Don't apply it to small in-flow additions to work already underway.
```
