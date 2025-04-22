---
layout: post
title: Vercel Serverless
description:
menu: review
categories: vercel
published: true
comments: false
sitemap: false
image: /assets/2024-11-12/1.jpg
---

<!-- [![alt text](/assets/2025-04-03/1.jpg "email"){:width="700px"}](/assets/2025-04-03/1.jpg)  -->

<!-- [![alt text](/assets/2025-04-07/1.jpg "email")](/assets/2025-04-07/1.jpg) -->

## Background

I'm working with a client who has a business application close to v1 release using this stack:

- Next.js (although we may be changing as have long compile times.. and don't use Next much.. what?)
- Vercel for hosting

While deliving into logging, I had to understand the serverless architecture of Vercel.

[Wikipedia Serverless](https://en.wikipedia.org/wiki/Serverless_computing) talks about the problems on Monitoring Debugging on this architecture.

# Hosting a Next.js Application on Vercel's Serverless Architecture

When hosting a Next.js application on Vercel using their serverless architecture, it means your application doesn't run continuously on a single persistent vm. Instead, individual HTTP requests can be handled by separate, dynamically provisioned, isolated execution environments, which could be on completely different servers or containers. 

---

## What is Serverless?

Serverless refers to cloud architecture where the responsibility of managing servers (operating systems, software updates, scaling) is abstracted away from developers. Developers focus purely on application logic and not on infrastructure.

- **No server management**: Infrastructure management (servers, scalability, uptime) is handled entirely by the cloud provider (in this case, Vercel).
- **Automatic scaling**: Resources scale dynamically based on traffic. This means each request could, in theory, be served from a distinct, isolated environment.
- **Pay-per-use model**: You typically pay based on the actual usage (requests served, execution time), rather than for fixed server capacity.

---
## How Serverless Works on Vercel for Next.js

When hosting a Next.js app on Vercel, the application is deployed using serverless functions under the hood:

- Pages and API routes become individual serverless functions.
- Each function is stateless and isolated. Vercel provisions and destroys these environments dynamically.
- Static assets are served via a global CDN, completely separate from functions.

---

## Do HTTP Requests Go to Different Processes/Servers?

Yes, each HTTP request can potentially go to a completely different server or execution environment because:

- Serverless functions are ephemeral and provisioned per request or per batch of requests.
- There's no persistent server state between requests.
- Two consecutive requests (even seconds apart) might be handled by different instances, potentially on different physical or virtual machines.

---

## Why Choose Vercel

The developer experience is great, and being able to deploy continuously from GitHub, and revert back easily is great.

It is also free to start with, and custom domains are fine.

It is a good start for Next.js which Vercel wrote

## Negative Points

The costs of Vercel can creep up if you're not careful

Logging and Monitoring is difficult (unless you pay for a Log Drain to an external service) as you're in Serverless architecture.

Build times can get high - this is a problem with Next.js. 8 minutes for the project I'm working on.

