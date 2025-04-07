---
layout: post
title: Next.js 
description:
menu: review
categories: nextjs
published: true
comments: false
sitemap: false
image: /assets/2024-11-12/1.jpg
---
<!-- [![alt text](/assets/2025-04-03/1.jpg "email"){:width="700px"}](/assets/2025-04-03/1.jpg)  -->
<!-- [![alt text](/assets/2025-04-03/1.jpg "email")](/assets/2025-04-03/1.jpg) -->

## Background

I'm working with a client who has a business application close to v1 release using this stack:

- pnpm
- Next.js (although we may be changing as have long compile times.. and don't use Next much.. what?)
- Zod
- Drizzle
- tRPC
- Vercel for hosting
- Supabase for Postgres and Auth (including SSO)

It has been an impressive development effort by a talented single young developer in the company (of around 150 people).

As the application is at the core of what the company does, the risk of all the knowledge being with a single developer is large.

I've been brought in to

- Get the project released ie v1 - essentially get the developer focussed on the remaining large features to do
- Make sure the app is secure, does what the business needs to etc..
- Write documentation so that the I / others can support it and develop on it


To be able to accomplish the above a properly understand the stack, I always like to have side projects to test what is happening. This is one of these projects.

It is also a lot of fun to explore new technology (and the reason I'm in this job!)

## Next.js

[https://en.wikipedia.org/wiki/Next.js](https://en.wikipedia.org/wiki/Next.js) is a React framework which enables extra features including Server Side Rendering. [https://github.com/vercel/next.js](https://github.com/vercel/next.js) 131k stars on GH. It is a solid framework used by many of the worlds largest companies.

[https://react.dev/](https://react.dev/) recommends a full stack framework like Next.js or Remix to do routing and data fetching.


### Problems and Alternatives

Compilation times in Next are slow, issues with the App router, random compilation bugs, and some state management weirdness

[https://tanstack.com/start/latest](https://tanstack.com/start/latest) - very new (still in Beta). 10k downloads per month on [npm](https://www.npmjs.com/package/@tanstack/start)

[React Router](https://github.com/remix-run/react-router) - 54k stars on GH. No server side rendering?


## Hello world


simple react snippets -sfc. Stateless Function arrow Component

JavaScript (ES6) code snippets - 

`/code/premium-docs`

`/code/cooking`

See [blog here](/2025/03/05/nextjs) to get latest version of node via nvm

I prefer [pnpm](https://pnpm.io/pnpm-vs-npm)

```bash
# Next 15.2.4 as of 7th Apr 25
npx create-next-app@latest
# prostore
# typescript (yes - default)
# eslint (yes)
# tailwind (yes - default)
# src directory (no - default)
# App Router (yes - default)
# Turbopack for next dev (no)
# Customize aliases (no - default)

# These are my default - same as above just using pnpm
npx create-next-app@latest cooking2 --ts --eslint --tailwind --no-src-dir --app --no-turbopack --no-import-alias --use-pnpm

```













## Vibe Coding

[https://en.wikipedia.org/wiki/Vibe_coding](https://en.wikipedia.org/wiki/Vibe_coding)

An AI dependent programming technique where you describe a problem to an LLM tuned for coding.

**Try this for moving quickly**

