---
layout: post
title: Functional Programming in C# - Nulls and Expressions
menu: review
categories: DevOps
published: true 
comments: false
sitemap: false
---

[Part 1](/2019/01/11/Learning-Functional-Programming-in-C-Sharp) summarised how I started in FP in C# by learning LINQ and trying Project Euler puzzles.  
[Part 2](/2018/09/20/Improve-Programming-using-Project-Euler) is a detailed look at the first Euler puzzle with [source code for the first 17 puzzles using LINQ](https://davemateer.visualstudio.com/_git/Euler1)  
[Part x](/2018/12/07/Orange-Book-Functional-Programming-in-C-Sharp) are my notes on the [Orange book](https://www.manning.com/books/functional-programming-in-c-sharp)  

Part 3 is this article on making our C# code more functional by using:

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

In F# you work with record types (value types) which definately have values.

## Exceptions
Try to avoid. Use `Option<A>` or `Either<L, R>` where L is the error. `Try<A>` or an `Exception<A>` are further abstractions over `Either`.

## Functors, Applicatives and Monads
Allow us to stay in the elevated context of core functional types such as `Option<A>`, `Either<L, R>`, `Try<A>` etc.. We can consider `IEnumerable<T>` to be a core functional type as it abstracts away null checking, and does not mutate (ie always returns a new result).

[Good examples at bottom of message](https://github.com/louthy/language-ext/issues/209) which are here too  

### Option, Match, Map and Functors
`IEnumerable` and `Option` are `Functors`. Essentially anything which has a reasonable implementation of Map is a functor.


GetValue below may, or may not return a string. The function signature is 'honest' in that it is obvious that it may or may not return a string as the return type is `Option<string>`.  

`Match` brings down the elevated type. Essentially this is a null check.  

The strategy is to try and work in the elevated level of abstraction to avoid: loops, null checks etc.. which are error prone. Why not abstract this away if we can?  

```cs
// Annoying having to do this to get the value
string value = GetValue(true).Match(
    Some: name => $"Hello, {name}",
    None: () => "Goodbye"
);
Console.WriteLine($"{value}");

// Map - Functor
// Map is like Select for an Option<T>
// Lambda inside map wont be invoked if Option is in None state
// Option is a replacement for if statements
Option<string> valueb = GetValue(true).Map(name => $"Hello, {name}");
Console.WriteLine($"{valueb}"); // Some(Hello, Skoucail)

static Option<string> GetValue(bool hasValue) =>
    hasValue
        ? Some("Skoucail")
        : None;

```
Lets see another example of using `Map` to stay in the elevated context and not have to worry about nulls.
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
Allows us to chain multiple functions together that all the return `Option`. Bind is like `Map` but can flatten two Option<T>'s together.. we don't want an Option<Option<T>>. `SelectMany` is Bind in LINQ, and can also be called `FlatMap` in other langauges.  

Example here is using Bind to compose 2 functions which return an `Option<string>`:  

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
        // Haven't considered the None state
        Some(html.Substring(0, 1));

    static Option<string> PutOnHttps(string html) =>
        html == "" ? None :
        Some("https://" + html);

```
C# has a syntax for monadic types: LINQ

## Collections / Method chaining in LINQ vs Bind  
In my broken links checker example application, after getting the html from a page, I'm dealing with collections and have used extension method chaining.. is there a better way using Bind?

Here is some exploratory code showing that we can stay in the elevated context by using IEnumerable<T> which handles nulls fine, and by using chained extension methods.  
```cs
// C# has a syntax for monadic types: LINQ
// Is Bind the same as method chaining in LINQ when using IEnumerable<T>
// Bind is for working with Option<T> and Either<L,R> but supports IEnumerable<T>
// https://github.com/louthy/language-ext/issues/456
static void Six()
{
    IEnumerable<string> listHrefs = GetListHrefs("a");
    // LINQ extension method style
    IEnumerable<string> final = listHrefs
                                    .ClassifyLinks(); // extension method eg Relative, Absolute

    // Does Bind help? No I don't think so
    //var finalb = listHrefs.Bind(ClassifyLinksb);
}

// Doesn't make sense - we need to be operating on the whole sequence 
//static IEnumerable<string> ClassifyLinksb(string html) => 
//    html.Select(x => ClassifyLink(x));

static IEnumerable<string> ClassifyLinks(this IEnumerable<string> html) => 
    html.Select(ClassifyLink);

static string ClassifyLink(string link) => 
    link == "aa" ? "aaa" : "nothing";

static IEnumerable<string> GetListHrefs(string html)
{
    if (html == "a") yield return "aa";
    yield return null;
}
```
If Option<T> is a replace for if statements, then perhaps we could refactor the ClassifyLink to use Bind?


## Summary
As louthy said in is post, it will take time to all sink in. It can take years to really master it. Most of the functionality in language-ext is there to help compose expressions.



![ps](/assets/2019-03-07/1.png){:width="700px"}


