---
layout: post
title: Coding principles and style  - Naming!
description: 
menu: review
categories: Coding style BrokenLinkChecker
published: false 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- ![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"} -->

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

## Previous articles

[SQL Conventions](/2016/10/19/ASP.NET-MVC-Sort-Filter,-Page-using-SQL)

[Simplicity](/2019/05/30/Simplicity) - not published yet

## Naming of Solutions

<!-- ![alt text](/assets/2020-08-17/solution-naming.jpg "Naming a solution"){:width="600px"} -->
![alt text](/assets/2020-08-17/solution-naming.jpg "Naming a solution")

[From Steve Gordon's Pluralsight course](https://app.pluralsight.com/library/courses/integration-testing-asp-dot-net-core-applications-best-practices/table-of-contents)

Naming as .Web - a problem?

I do like this clarity of naming.

[Naming of Git repositories](https://stackoverflow.com/questions/11947587/is-there-a-naming-convention-for-git-repositories) would be something like `tennis-bookings` if we followed convention. [Trending C# repos on GH](https://github.com/trending/c%23?since=monthly) seems to follow this somewhat.

![alt text](/assets/2020-08-17/solution-naming-tardis.jpg "Naming a solution")

[Tardis Bank](https://github.com/TardisBank/TardisBank) has a simpler solution level naming which I prefer. Simpler is always what I strive for if possible. I would name the repo `tardis-bank` though.


`TardisBank.UnitTests`
`TardisBank.IntegrationTests`

Nice clear naming.



## Examples of good code

Mikes code

Sepura

CPD

```cs


```


## Spacing

Code is like art!

Resharper

