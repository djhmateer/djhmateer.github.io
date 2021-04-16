---
layout: post
title: 14 Business Logic
description: 
menu: review
categories: C# 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---


[razor-pages-form-validation](https://github.com/djhmateer/razor-pages-form-validation) source sample code.

<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

[![dev](/assets/2021-03-30/budget.jpg "dev"){:width="400px"}](/assets/2021-03-30/budget.jpg)

For smaller projects I'm using

- Code behind in razor pages with as little logic in as possilbe.
- Db.cs file with functional methods in that do all the logic
- Unit tests which hit the functions in the Db file (integration tests hit http, unit tests are allowed to hit the db)

## Idempotency

For dates I inject in a nullable DateTime for testing

## Strategy

- As few layers of abstraction as possible

- As little code as possible - use all latest language features, as if I don't understand the syntax, can easily use Resharper to change (alt enter) to a more verbose

- Create code which is as simple as possible

I tend to write code in any way possible to get it working first. Then refactor.

I'm usually finding out the data edge cases as I write code, and finding when it breaks. So taking my time with each 'screen', throwing away code all the time and keeping at it is important. Good simple code takes time. 

It is always worth the effort whilst writing the code rather than bug fixing in production.

## Standard

Keep code as close to language standard as possible

- linq
- don't go overboard on 'Func<T>'
- don't go overboard on generics
- composition over inheritance

Don't use DI if don't need to
