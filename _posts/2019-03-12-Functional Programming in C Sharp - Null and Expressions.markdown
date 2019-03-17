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

- Expressions and ternary operator 
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

Expressions first helps use keep the functions small.  
Immutability helps guides the functions towards being pure (no side effects)

## Expressions
Make everything you do is an expression, rather than a sequence of statements eg if using expression-bodied methods that start with =>

```cs
static void PrintHello() => 
    Console.WriteLine("Hello World from a function");
```
## Immutable data types
These act like [record types](https://fsharpforfunandprofit.com/posts/records/) or `data types` in other languages. Essentially can only be a finitie set of attributes. [good example using With](https://stackoverflow.com/questions/38575646/general-purpose-immutable-classes-in-c-sharp/38596298#38596298)  

Why immutable objects?

Why use the With to return a copy of an object when wanting to mutate it? [Good SO Question here](https://stackoverflow.com/questions/38575646/general-purpose-immutable-classes-in-c-sharp/38596298#38596298)  

## Pure methods
Pure methods don't refer to any global state. The same inputs will always get the same output. Combined with immutable data types this means you can be sure the same inputs will give the same outputs.  

If we have mutable objects it could be possible for another function to mutate the object we were working on concurrently.  

So if we have a pure function (which doesn't act on a mutable global variable) then we can make the function `static`. More [discussion in ch 2.2.3 of the orange book](https://livebook.manning.com/#!/book/functional-programming-in-c-sharp/chapter-2/113)

## Don't use nulls
Nulls wont ever leave C#. LanguageExt was created to help avoid nulls by using an Option.

[null article](https://templecoding.com/blog/2017/01/31/handling-nulls-in-csharp-the-right-way/)  

In F# you work with value types which definately have values.

## Exceptions
Try to avoid. Use  Option<A> or Either<L, R> where L is the error. `Try<A>` or an `Exception<A>` could be used.

## Functors, Applicatives and Monads
Allow us to stay in the elevated context of core functional types such as `Option<A>`, `Either<L, R>`, `Try<A>` etc.. Is IEnumerable a core functional type or maybe Seq?

[good examples at bottom of message](https://github.com/louthy/language-ext/issues/209) which are here too  

### Match Map and Functors
```cs
// Annoying having to do this to get the value
string value = GetValue(true).Match(
    Some: name => $"Hello, {name}",
    None: () => "Goodbye"
);
Console.WriteLine($"{value}");

// Map - Functor
// Lambda inside map wont be invoked if Option is in None state
// Option is a replacement for if statements
Option<string> valueb = GetValue(true).Map(name => $"Hello, {name}");
Console.WriteLine($"{valueb}"); // Some(Hello, Skoucail)

static Option<string> GetValue(bool hasValue) =>
    hasValue
        ? Some("Skoucail")
        : None;

```
Lets see another example of using Map to 'stay in the elevated context' and not have to worry about nulls.
```cs
static void Test()
{
    Option<string> html = GetHtml("a");
    //Option<string> html = GetHtml("c");
    // Shorten html
    Option<string> shortHtml = html.Map(x => x.Substring(0, 1)); // Some(a)
    // Put on https
    Option<string> addedHttps = shortHtml.Map(x => $"https://{x}"); // Some(https://a)

    // Come down from elevated context and deal with None
    string final = addedHttps.Match(Some: x => x, None: () => "No html returned so lambdas not invoked");
}
static Option<string> GetHtml(string url)
{
    if (url == "a") return "aa";
    if (url == "b") return "bb";
    return None;
}

```

### Bind and Monads
Allows us to chain multiple functions together that all the return `Option` eg

```cs
static void Test()
{
    Option<string> html = GetHtml("a");
    //Option<string> html = GetHtml("c");

    Option<string> shortHtml = html.Bind(x => ShortenHtml(x)); // x is a string

    // Put on https using shortened Method syntax so don't need x
    Option<string> addedHttps = shortHtml.Bind(PutOnHttps); 

    Option<string> both = html.Bind(ShortenHtml)
                              .Bind(PutOnHttps);

    // come down from elevated context and deal with None
    string final = addedHttps.Match(Some: x => x, None: () => "No html returned");
    string finalb = both.Match(Some: x => x, None: () => "No html returned");
}
static Option<string> ShortenHtml(string html) =>
    Some(html.Substring(0, 1));

static Option<string> PutOnHttps(string html) =>
    Some("https://" + html);

```

C# has a syntax for monadic types: LINQ

## Collections / Method chaining in LINQ vs Bind  
In my broken links checker example application, after getting the html from a page, I'm dealing with collections a lot and have used a lot of extension method chaining.. is there a better way using Bind?


## Summary
As louthy said in is post, it will take time to all sink in. It can take years to really master it. Most of the functionality in language-ext is there to help compose expressions.



![ps](/assets/2019-03-07/1.png){:width="700px"}


