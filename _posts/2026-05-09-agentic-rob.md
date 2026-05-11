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

https://bigmachine.io/articles/video/eliminate-crappy-slop-code/

https://github.com/robconery/crap-code


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

This is where the gold is


### INTERVIEW.md

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



## Overview

SPEC.md - what we're building, architecture guidelines
CLAUDE.md - just a little..links to SPEC
ORCHESTRATION.md - the process.**THIS IS WHERE THE GOLD IS**
INTERVIEWS.md - this is a start where we get the LLM to improve on the process


## Pi
pnpm add -g @mariozechner/pi-coding-agent
pnpm update -g @mariozechner/pi-coding-agent


