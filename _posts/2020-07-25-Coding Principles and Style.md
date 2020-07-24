---
layout: post
title: Coding principles and style  
description: 
menu: review
categories: Coding style BrokenLinkChecker
published: false 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"}

Complexity is the beast we are always trying to tame
Don't be afraid to learn new things if useful eg regex (if need speed), FP, Funcs and Tasks (have to know for async await concurrency)

- Aim for Immutable functions, as they are easy to reason about and easy to test
- Try to use higher level (no primitive obsession) types eg URI instead of a string for a url.

- C#8 null reference checking instead of Option type

- Immutable data objects - Constructor based smart types. Data types coming in C#9.  Why - to keep simple and avoid any side effects.

- Keep functions small
- Keep collections in memory (and don't use the db if don't need to)

- Deploy to production fast and use IaC if possible (never need to worry about updates nor manual configuration)

- KISS- do just enough to get things working
- Don't be afraid to throw away code (I'm on version 12 of the checker)

- Tests are your friend..especially parameterised Theory

## Examples of good code

Mikes code

Sepura

CPD

```cs


```


## Spacing

