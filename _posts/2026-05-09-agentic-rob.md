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

<!-- [![alt text](/assets/2026-03-10/1.jpg "static")](/assets/2026-03-10/1.jpg) -->

I'm making and working with others a few software projects. All of them are using Claude Code (to some degree) and all are facing the same becoming eroded and becoming tricky to reason about. The problem being it will become very hard to change this code, and fix bugs. 

This article 

[https://bigmachine.io/articles/video/eliminate-crappy-slop-code/](https://bigmachine.io/articles/video/eliminate-crappy-slop-code/)

[https://github.com/robconery/crap-code](https://github.com/robconery/crap-code)


Describes a process where different agents hand off to each other using files.

use of principles
use of patterns


He uses the pi coding agent instead of Claude Code, as it is leaner

pnpm add -g @mariozechner/pi-coding-agent

pi
 draws from extra usage
 14.99 I've spent
https://claude.ai/settings/usage

## Hello World

I'm finding this a bit tricky to get my head around, so lets do a hello world app using this process.

`hello-world-agentic`

### SPEC.md

    ```md
    # Hello World Command Line Application

    This is a hello world application on the linux command line - Ubuntu 24 under WSL2.

    ## Stack

    Use Python, and uv (I think) for the version of python and any packages I'll need

    ## Architectural Guidelines

    - Prefer functional style of programming
    - Simplicity is key
    - All testing lives in the `/tests` directory.
    ```

### CLAUDE.md

    ```md
    # Instructions

    This is a demo Hello World app for Python. See @SPEC.md


    The goal of this project to **avoid crap code**, and to use reasonable architectural patterns and principles (including Gang of Four) to avoid technical debt and to make changing things a bit easier in the future.

    ## Rules

    - ALWAYS work in a branch, never `main`. If we are in `main`, stop and recommend a branch and offer to create one and move on.
    - Always add comments to code, which explain the WHY, not the what. Do not comment variables unless there's a solid reason. Always comment on logic and choices in code.
    - Use emoji for readability in all markdown documents.
    - The entire process pipeline should be idempotent, even for duplicate data.
    - DO NOT ALLOW SILENT FAILURE. `console.error` if there's ever a problem.
    ```

### ORCHESTRATION.md

This is where the gold is. It started off with 

- Process - Scrum lite.
- The Agent Team (8 agents)
- Sprint directory layout
- Branching
- Commit policy
- Planning Phase
- Development Phase
- Failure and Retry
- Idempotency of the pipeline
- Final review (when all tasks are complete)
- Escalation

**todo - put in link**


### INTERVIEW.md - PHASE 0

This is the 0 step. ie review our process before embarking. Great for advice on what tooling to use in this project (and how to specify it)

    ```md
    # Ask me!

    One question at a time, please. Interview me about each section below. I'm using pi.dev, so these choices should work well with the tooling (skills, extensions, etc).

    ## Orchestration.md
    Go over @ORCHESTRATION.md and help me fill in anything I didn't think about. I want a solid process with a single goal: NO CRAP CODE.

    ## Code Policies and Styleguides
    How do we write “good code”? Part of it is by ensuring small functions and implementing good patterns and practices, including:

    - SOLID, always present, with emphasis on SRP.
    - Gang of Four, always userful, don't go overboard.
    - Architectural patterns that fit, such as Hex, Onion, etc.
    - Best practice coding conventions for whatever language and platform.
    - Behavior-driven design fits nicely, with constraints on happy/sad path etc.
    - Well-documented code that helps others understand what's going on. The "Why", not the what. Classes, methods, not variables. Any decisions made in code, stuff like that.

    ## Agent Definitions
    Use the orchestration doc to help me define the agent team.
    ```

[![alt text](/assets/2026-05-11/1.jpg "ii")](/assets/2026-05-11/1.jpg)

Then run pi: `Use @INTERVIEWS.md and lets go`

It asked me some great questions including if I wanted tasks to run in parallel. no! Run in waves. 4 strike counter of any kind..and fail. Tagging ... no.  Sprint naming (short slugs),

[![alt text](/assets/2026-05-11/2.jpg "ii")](/assets/2026-05-11/2.jpg)

Now we've finished going through ORCHESTRATION and now onto CODE_POLICY.md which is has generated from inside INTERVIEW.md.

It asked me about patterns.. and for hello world, we've agreed a core logic layer.

We've also agreed some fairly tough pyton:

 - mypy --strict — mandatory, no escape hatches
 - pytest --cov --cov-fail-under=90 — 90% coverage gate on every task  
 - ruff check + ruff format --check — lint and format enforced   

[![alt text](/assets/2026-05-11/3.jpg "ii")](/assets/2026-05-11/3.jpg)

 It's now gone on to define the `/docs/agents` as the final part of the `INTERVIEW.md`


## SPRINT 1 - PHASE 1 - Planning Phase - Sprint Proposal

So I asked it to kick off the first sprint (well it asked me after the end of PHASE 0)

Interestingly pi locked up, and on a restart, I was easy to get back into things.. it knew we should be talking about sprint 1.

[![alt text](/assets/2026-05-11/4.jpg "ii")](/assets/2026-05-11/4.jpg)

```md
🧭 Sprint Proposal
 │ Goal         │ A CLI app that prints Hello, {name}!, defaulting to Hello, World! if no name is given     │                                                
 │ Sprint name  │ hello-world-cli                                                                           │                                                
 │ Branch       │ sprint/hello-world-cli                                                                    │                                                
 │ Verification │ uv sync, pytest --cov --cov-fail-under=90, ruff check, ruff format --check, mypy --strict │                                                
 Does this look right to you? If so, I'll create the branch and kick off the full planning sequence (PO → Architect → Tester → your approval → PM). 🚀   
```


[![alt text](/assets/2026-05-11/5.jpg "ii")](/assets/2026-05-11/5.jpg)

Manually approving the Sprint - `planning-summary.md`

[![alt text](/assets/2026-05-11/6.jpg "ii")](/assets/2026-05-11/6.jpg)

`user-stories` are brilliant!

## Summary so far

In `sprint.log`

```md
[2026-05-11] PLANNING STARTED
  Orchestrator: Sprint `hello-world-cli` initiated.
  Goal: CLI app prints `Hello, {name}!`, defaults to `Hello, World!` if no name given.
  Branch `sprint/hello-world-cli` created.
  Sprint directory scaffolded.

[2026-05-11] AGENT: Product Owner — generating user stories + acceptance criteria
  Output: user-stories.md ✅

[2026-05-11] AGENT: Architect — sprint architecture + reviewer checklist
  Output: architecture.md ✅
  Output: reviewer-checklist.md ✅
  ADR-001: validation in core layer

[2026-05-11] AGENT: Tester — test stubs committed
  Output: tests/test_core.py (6 stubs) ✅
  Output: tests/test_cli.py (5 stubs) ✅

[2026-05-11] PLANNING: Awaiting human approval on planning-summary.md
```
Okay, so lets go do next phase where the PM agent writes the task spec + wave plan, and we go straight into development.

## Srint 1 - PHASE 2 - Development

```md
 🏁 Sprint Complete — hello-world-cli

 │ Task   │ Description                       │ Strikes │ Status │                                                                                                          
 │ task-1 │ Project scaffold + pyproject.toml │ 0       │ ✅     │                                                                                                          
 │ task-2 │ Core logic core.py                │ 0       │ ✅     │                                                                                                          
 │ task-3 │ CLI entry point cli.py            │ 1       │ ✅     │                                                                                                          
 Verification: uv sync ✅ · pytest 11/11 ✅ · coverage 100% ✅ · ruff check ✅ · ruff format ✅ · mypy --strict ✅                                                          

 ```                                                                                                                                                                        
   $ hello          → Hello, World!                                                                                                                                         
   $ hello Dave     → Hello, Dave!                                                                                                                                          
   $ hello ""       → Error: ... (stderr, exit 1)                                                                                                                           
   $ hello a b      → usage error (stderr, exit 2)                                                                                                                          
 ```                                                                                                                                                                        
                                                                                                                                                                            
 Next step per ORCHESTRATION.md: 🏛 Architect does the final review, then PM updates architecture.md, project_memory.md, and README.md — then you approve and we merge to    
 main.                                                                                                                                                                      
 Want me to proceed with the final review?                                                                                          
 ```


## Sprint 1 - Phase 3 - Final Review

updated docs/architecture.md, project_memory.md, and README.md

it even merged into main for me.

okay this is impressive

- it has thought of lots of edge cases I wouldn't have eg just white space
- it asked me in depth what should happen (before starting to code) eg what if nothing


## Asked a question about entry point - module

It even made a quick branch to explain the new way of approaching python.






## Foo

## Overview

SPEC.md - what we're building, architecture guidelines
CLAUDE.md - just a little..links to SPEC
ORCHESTRATION.md - the process.**THIS IS WHERE THE GOLD IS**
INTERVIEWS.md - this is a start where we get the LLM to improve on the process


## Pi
pnpm add -g @mariozechner/pi-coding-agent
pnpm update -g @mariozechner/pi-coding-agent


