---
layout: post
title: Functional Programming in C# - Nulls and Expressions
menu: review
categories: DevOps
published: true 
comments: false
sitemap: false
---

[Part 1](/2019/01/11/Learning-Functional-Programming-in-C-Sharp) describes how I started in FP in C# by learning LINQ and trying Project Euler puzzles.  

This article is about making our C# code more functional by using:

- Expressions 
- Immutable types
- Pure methods
- Option 
- Either
- Functors, Applicatives and Monads

[Inspiration for this article](https://github.com/louthy/language-ext/issues/209)

The initial problems the library was trying to solve was that of:
- Nulls
- Immutability
[Original HN Article from 2014 on language-ext](https://news.ycombinator.com/item?id=8631158)

If we remember that the core tenants of what FP are
- Functions first
- Immutability

Then Expressions first helps use keep the functions small.  
Immutability helps guides the functions towards being pure (no side effects)

## Expressions
Make everything you do is an expression, rather than a sequence of statements eg if using expression-bodied methods that start with =>

```cs
static void PrintHello() => 
    Console.WriteLine("Hello World from a function");
```
## Immutable types
These act like [record types](https://fsharpforfunandprofit.com/posts/records/) or data types in other languages. Essentially can only be a finitie set of attributes. [good example using With](https://stackoverflow.com/questions/38575646/general-purpose-immutable-classes-in-c-sharp/38596298#38596298)  

Why immutable objects?

Why use the With to return a copy of an object when wanting to mutate it? [Good SO Question here](https://stackoverflow.com/questions/38575646/general-purpose-immutable-classes-in-c-sharp/38596298#38596298)  

## Pure methods
Pure methods don't refer to any global state. The same inputs will always get the same output. Combined with immutable types this means you can be sure the same inputs will give the same outputs.  

If we have mutable objects it could be possible for another function to mutate the object we were working on concurrently.  

So if we have a pure function (which doesn't act on a mutable global variable) then we can make the function `static`. More [discussion in ch 2.2.3 of the orange book](https://livebook.manning.com/#!/book/functional-programming-in-c-sharp/chapter-2/113)

## Don't use nulls
Nulls wont ever leave C#. LanguageExt was created to help avoid nulls by using an Option.

[null article](https://templecoding.com/blog/2017/01/31/handling-nulls-in-csharp-the-right-way/)  

In F# you work with value types which definately have values.

## Exceptions
Try to avoid. Use  Option<A> or Either<L, R> where L is the error. `Try<A>` or an `Exception<A>` could be used.

## Functors, Applicatives and Monads
Allow us to stay in the elevated context of core functional types such as `Option<A>`, `Wither<L, R>`, `Try<A>` etc..

[good examples at bottom of message](https://github.com/louthy/language-ext/issues/209)  


![ps](/assets/2019-03-07/1.png){:width="700px"}


