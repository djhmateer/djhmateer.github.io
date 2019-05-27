---
layout: post
title: Simplicity 
description: 
menu: review
categories: Programming 
published: true 
comments: false
sitemap: false
image: /assets/2019-05-27/1.png
---

A discussion on 
[Hacker news post on Solid Principles: A Software Developer's Framework to Robust, Maintainable Code](https://news.ycombinator.com/item?id=19955467) struck a real chord, specifically around: **simplicity**

As programmers our jobs are to understand problems, investigate and write solution. 

Just as in writing, it takes a long time to write something elegant:  [Blaise Pascal](https://en.wikiquote.org/wiki/Blaise_Pascal) the 15th Century mathematician, logician, physicist and theologian is attributed with [first saying](https://quoteinvestigator.com/2012/04/28/shorter-letter/):

> Je n’ai fait celle-ci plus longue que parce que je n’ai pas eu le loisir de la faire plus courte.

> I have made this longer than usual because I have not had time to make it shorter.




I've been involved a project where it took days to figure out how to order a drop down list in a WPF application. The application was new to me, and had been architected using the best practices of the day

- MVVM
- EF Genertic Repository
- Lots of abstractions (all well thought out and correct OO protections levels) 
- Lots of unit tests
- Lots of integration tests
- A good devops pipeline (TeamCity to Octopus)

The result was that I had to delve through a lot of code and files to gather what was going on. It took days to find out that if I flipped the order of something it gave a good result.  

The point of the story is that it is a complex application, where it perceivably could have been much simpler. My suspician is that 'best practice' has been detrimental to this project, and if the maintainer had focussed on simplicity then maintaining the project (ie my job) would have been much easier.  

## ORMs
[Interesting Twitter conversation](https://twitter.com/mikehadlow/status/1129353584854949889)

## SOLID
asdf

## People
[JP Boodhoo](https://twitter.com/jpboodhoo?lang=en)






