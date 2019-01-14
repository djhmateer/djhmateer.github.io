---
layout: post
title: Learning Functional Programming in C Sharp 
menu: review
categories: functional c# 
published: true 
comments: false
sitemap: false
---
My journey so far in exploring Functional Programming in C# and the resources I've found most useful:

## Why learn FP techniques
[NDC Video by Enrico Buonanno](https://www.youtube.com/watch?v=wJq86IXkFdQ) has a very good introduction as to why we should consider FP in C# - he is the author of the orange book linked below. 

- Power (do more with less code, raise the level of abstraction)
- Safety (avoiding unnecessary side effects makes code easier to reason about)
- Clarity (we spend more time maintaining and consuming existing code than writing new. Achieving clarity will become more natural)

I have a tricky programming problem, which I've tried and the code is rapidly turning into complex unmaintainable spaghetti. So this is my reason.

As a side effect it has pushed my C# language skills and is thoroughly enjoyable!

## Strategy
- Be patient
- Experiment in code

These techniques are for *an ambitious breed of developer* who is aiming for code which is: concise, elegant, robust and maintainable.

The orange book below is *very* thorough, and I suspect to fully understand the ideas I'll have to learn other languages just as the author did. [F#](https://web.archive.org/web/20161027124919/http://www.programgood.net/CategoryView,category,F.aspx) and [Haskell](2016/10/18/Learn-You-a-Haskell-for-Fun-and-Profit) are the 2 natural fits. I'm going to push very hard in C# first as I know it well.

'Change the way you think is hard, and learning the syntax is relatively easy'

### Pluralsight    
  [K Scott Allen - Linq Fundamentals with C#6 Pluralsight](https://app.pluralsight.com/library/courses/linq-fundamentals-csharp-6/table-of-contents)

- Extension methods
- Select
- Where
- OrderBy
- Any
- All
- Take
- Lambda expressions

## Project Euler
After doing the Pluralsight course [I did the first 17 or so Euler puzzles in an FP / Linq way](https://davemateer.visualstudio.com/DefaultCollection/Euler1/_git/Euler1?path=%2FREADME.md&version=GBmaster) and explanation of the [first one](/2018/09/20/Improve-Programming-using-Project-Euler)

### ReSharper
![ps](/assets/2019-01-11/1.png)  
Using [ReSharper](https://www.jetbrains.com/resharper/) to understand the names of different concepts and different ways of writing something  

### Euler
Did some Euler problems in a functional way ie use Linq as much as possible
[Project Euler FP](/2018/09/20/Improve-Programming-using-Project-Euler)   

[Repository of Imperative and Functional Approaches for first 17 or so](https://davemateer.visualstudio.com/_git/Euler1)  

### C# Language Skills

### Books
![ps](/assets/2019-01-11/3.png)  
[Functional Programming in C# book](https://www.manning.com/books/functional-programming-in-c-sharp) is a very in depth book.  It took me many attempts to understand Chapter 1.  

[My detailed post notes on the book](/2018/12/07/Orange-Book-Functional-Programming-in-C-Sharp)

