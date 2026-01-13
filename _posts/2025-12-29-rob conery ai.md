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

I've subscribe to Rob Conerys [bigmachine.io](https://bigmachine.io/courses/), specifically for the AI deadlines course he has just done in Nov 2025. I like his affable video style and his written English.

As an entrepreneur and developer I'm intriguied by AI and have been deep into it for a year, so lets see what Rob does.

I thought I'd pull out the bits which have worked for me, and add in thoughts along the way.

I find watching experienced developers that I always learn things I'm not expecting to.


## What I'm Building vs How I'm building It

I love exploring how to build applications (my speciality is web based apps - Line of Business / CRUD)
I've been doing it for 26 years.

I'd like to focus more now on **What** I'm building, so having a toolchain that lets me iterate quickly is important.

I think LLM aided entrepreneur and software development works.

This article is all about exploring the toolchain, so I can focus on the **What** 

The what subject that I'm building here is something I've been consdering and exploring for over a decade.


## LLMs

Claude - Claude Code is my favourite for code tasks. I was on the $100pm plan and have now downgraded to $20pm
Copilot (Claude, Gemini or ChatGPT) - $10pm For Git commit messages it is great, and code tab completion
ChatGPT - for questions $20pm

I don't currently use:

Google Gemini - Generous free
OpenAI Codex  - Works fine and I get access with $20pm subscription to ChatGPT


## Tools

[![alt text](/assets/2025-12-20/1.jpg "terminal")](/assets/2025-12-30/1.jpg)

`Ctrl-Shift-P` Terminal -  Create New Terminal in Editor Area, keyboard shortcut to `Ctrl-Shift-/`

`Ctrl-Shift-P` Keyboard Shortcuts - JSON

```json
{
  "key": "ctrl+a",
  "command": "editor.action.selectAll",
  "when": "editorTextFocus"
}
```

### .gitignore

Very handy tool to write .gitignore files

```bash
echo "function gi() { curl -sL https://www.toptal.com/developers/gitignore/api/\$@ ;}" >> \
~/.bashrc && source ~/.bashrc

#gi node
```

### .vscode/settings.json

This is experimental currently.

```json
{
    "github.copilot.chat.commitMessageGeneration.instructions": [
      {
        "text": "Follow best practices for git commit messages. Add extra detail, but don't exceed a paragraph. Add emoji"
      }
    ],
}
```

I've found I need to do it a few times to get commit messages I like.

### Code Completion

[![alt text](/assets/2025-12-20/1.jpg "terminal")](/assets/2025-12-30/1.jpg)

Very handy for tab completion of text.  When I'm being creative I turn this off.

### Keyboard Shortcuts

`Ctrl-Shift-V` - Open Preview (Markdown)
`Ctrl-Shift-/` - Open Terminal in Editor Area (as defined above)


## Mindset - Small Steps

Key to AI is taking small steps and not to vibe out an application (unless it is a demo, and that works for me)

I'm going to use a similar tech stack to Rob

- Express as a backend API
- SQLite3 as dev db

```bash
# corepack is distributed with Node.js - I'm on 24.11.1 (latest LTS)
# see previous articles on installing node (using nvm) which gives corepack which lets us install pnpm

# latest version of pnpm is 10.26.2 on 30th Dec 20205
corepack prepare pnpm@latest --activate

# creates package.json
pnpm init

git init

gi node > .gitignore
```

## CLAUDE.md - Spec and Context

`CLAUDE.md` adds context. So that we fine tune Claude to make the answers more relevant, and prompts shorter

Here is a starter

```md
# Project Overview

# Specification


# The Stack

- Express
- SQLite3

# Response Tone

In your responses, get to the point quickly. Do not pretend you're human. Don't embellish answers with cheerful exclamation. Summaries should be extremely terse.

# Markdown Files

Where appropriate, use emoji for readability. Stick to the current facts of the project and do not make things up.
```

I'm on the fence about emojis.


## CLAUDE.md Style Guidelines

claude.md

## Installing Better-SQLite3 and Drizzle

[https://github.com/WiseLibs/better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - simplest library for SQLite3 in Node.js

```bash
# 12.5.0 on 30th Dec 25
# also installs sqlite3 - 5.1.7
pnpm install better-sqlite3
```

I've moved away from sequelize to Drizzle.

## Create DB

`create an initial SQLite3 schema for the project in db/schema.sql Add tables and relationships for a music list app that I might have missed. Text only for review.`

Very handy - can change quickly to suit.

`Create test data using @db/schema.sql as a guide. Add 10 items to each table. And whatever other data is needed. Make sure the emails use "test.com", but have some fun with the rest of the data using a 1980's music theme. Output to db/test_data.sql`

`create the database and add the test data to db/xmusic.db`

SQLite Viewer Extension to see data in VSCode

### DAL

`Create the Artist model`

`Create the data access layer`

AI is great at this boring stuff.

I moved ORM from sequelize to drizzle and it is wonderful for this!

## Test First Development

Work in a branch so can easily reverse

If working as a single developer (as I often do) lets try and keep files as simple as possible. 

It is lovely to be using tests again - fills with confidence whilst doing refactoring.


I've got a fairly static `CLAUDE.md` file with rules that I'm putting in as I develop the code in the style I like.

I'm putting in specs for feautres in `/specs/playlist-spec.md`

Am going through line by line the tests and functions to see if I like them / understand all in detail.

eg Trying object destructuring for calling JS functions so they are clearer.


## Reviewing Code

I'm always getting the LLM to reivew its own code.. eg

`do a code reivew based on what is in claude.md`


## Direction

Thin slice of the app working end to end (and in `production`)





