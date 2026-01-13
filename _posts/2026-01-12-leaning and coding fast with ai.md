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

As an experienced developer AI seems to be allowing 

- must faster dev times for specific bits of software
- makes learning new tech faster
- makes changing parts of a stack easier

I'm doing a talk soon about this.

## Goal

Want more product sales in my software company

I've tried marketing for years and product market fit for current software seems not quite right (ie only got 2 main clients)

So lets use new AI to build things / explore new ideas / market new ideas

- fast

## Building Fast

Okay, so I love building things and exploring new technology

Just build stuff and deploy it!


## Learning fast

- use agentic AI a lot and experiment
- build a project and put into production

## Refactor fast

`I'd like to change the frontend from svelte to react. please ask me questions as to how to progress `
this is a good strategy, but needs guiding

This worked in about 30 minutes. Firstly I noticed the js bundled.. nice. 

## Philosophy

- Simple
- Get into production asap
- Do small things (or big things break into small steps)
- Use tests so can see regressions
- Do reviews all the time in claude-code, gemini and codex
- Be as automated as possible - ie deploy all the time
- Go through file by file asking if can simplify and looking for code that doesn't make sense.


## Start with a spec document

eg in `docs/frontend-design-system-spec.md`

Do this in plan-mode which will create a 

`please help me develop a spec for the frontend design system. I'd like to use https://ui.shadcn.com/ and I'd like to start with a very simple (and minimal) set of components. ask questions if you're not sure`

This did grind hard for 5 minutes using tokens! (on middle model)



## Help the LLM

Have got a section in Claude.md pointing to: https://ui.shadcn.com/llms.txt

Now I can ask things like

`please suggest next UI component to add from shadcn` and it found Card (as an optimisation as I use a similar strategy in 3 places)
