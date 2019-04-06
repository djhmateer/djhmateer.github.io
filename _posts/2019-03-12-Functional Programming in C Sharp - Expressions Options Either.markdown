---
layout: post
title: Functional Programming in C# - Expressions, Option, Either
description:  Making C# more functional by using abstractions. It has been preceeded by 2 articles on why I've got to here, and the background reasons behind trying functional programming in C#.
#menu: review
categories: Functional C#
published: true 
comments: true
sitemap: true
image: /assets/2019-04-05/2.jpg
---

![ps](/assets/2019-04-05/2.jpg)  

This article is on making *C# code more functional by using functional abstractions*. It has been preceeded by 2 articles on why I've got to here, and the background reasons behind trying functional programming in C#.

[Part 1](/2019/01/11/Learning-Functional-Programming-in-C-Sharp) summarised how I started in FP in C# by learning LINQ and trying Project Euler puzzles.  
[Part 2](/2018/09/20/Improve-Programming-using-Project-Euler) is a detailed look at the first Euler puzzle with [source for the first puzzle](https://github.com/djhmateer/FPInCSharpDemos) and [source code for the next 17 puzzles using Imperative and LINQ](https://davemateer.visualstudio.com/_git/Euler1)  
Part 3 is this article on making C# code more functional by using abstractions from the [excellent functional c# library](https://github.com/louthy/language-ext):

We are going to be looking at:  
- Expressions / ternary operator 
- Pure functions
- Immutable types
- Option type 
- Match and Map
- Bind
- Either type

[Inspiration for this article](https://github.com/louthy/language-ext/issues/209) and where to practically start with FP in C#. The initial problems the C# [functional library language-ext](https://github.com/louthy/language-ext/issues) was trying to solve were that of Nulls and Immutability  [Original HN Article from 2014 on language-ext](https://news.ycombinator.com/item?id=8631158)

If we remember that the core tenants of what FP are
- Functions first
- Immutability

Expressions first helps keep the functions small.  
Immutability helps guide the functions towards being pure (no side effects)  

## Index of Examples
[Source code for this article is here](https://github.com/djhmateer/FPInCSharpDemos) and here are the examples demonstrating FP abstractions:    
- One(); // Pure functions
- Two(); // Immutability, Smart Constructor
- Three(); // Option type with None and Some
- Four(); // Option with Match to primitive
- Five(); // Option and Map (Functor)
- Six(); // IEnumerable and Select (Functor)
- Seven(); // Chaining Map
- Eight(); // Bind
- Nine(); // Bind chain 
- Ten(); // IEnumerable and Extension methods chaining
- Eleven(); // Either - Exception
- Twelve(); // Either - Validation pipeline

## Expressions
Try to make everything you do an expression, rather than a sequence of statements eg if using expression-bodied methods that start with =>

```cs
static void PrintHello() => 
    Console.WriteLine("Hello World from a function");
```
Then prefer `ternary operators` as they are more concise leading to more *readable code*

```cs
static Option<string> GetValue(bool hasValue) =>
    hasValue
        ? Some("Bob")
        : None;

// Even more concise 
static Option<string> GetValue(bool hasValue) => hasValue ? Some("Bob") : None;
```
What we are doing is building up a sequence of expressions which are then very easy to test and reason about.

## Pure functions
Pure functions don't refer to any global state. The same inputs will always get the same output. Combined with immutable data types this means you can be sure the same inputs will give the same outputs.  
```cs
static void One()
{
    // A function is pure if the same input always gives the same output
    // can't have any IO...eg API call, 
    var result = Double(2);

    // This is impure - as the website may be down, so a unit test would return a different result 
    var resultb = GetHtml("test.com");
}

// This is a pure function
// Very easy to unit test
static int Double(int i) => i * 2;

// Pure function - input (int) will always produce the same output (bool)
// as there is no shared state the function can be static
static bool IsPrime(int number)
{
    if (number <= 1) return false;
    if (number == 2) return true;
    if (number % 2 == 0) return false;

    for (long i = 2; i < number; i+=2)
        if (number % i == 0)
            return false;
    return true;
}
```
If we have mutable objects it could be possible for another function to mutate the object we were working on concurrently.  

So if we have a pure function (which doesn't act on a mutable global variable) then we can make the function `static`. More [discussion in ch 2.2.3 of the orange book](https://livebook.manning.com/#!/book/functional-programming-in-c-sharp/chapter-2/113)


## Immutable Data objects / Smart Constructors
We never want to mutate an object in FP, but a create a new one. This makes sure there are no side effects caused somewhere else, thus ensuring a function remains pure. It also makes concurrency simpler.

```cs
// Immutability (Core part of FP!), Smart ctor
static void Two()
{
    PersonOO dave = new PersonOO();
    dave.Name = "dave";
    dave.Age = 45;
    // Don't do this in FP.. F# (by default), Haskell etc. does not allow this
    // Should avoid mutating objects in place and favour making new ones (as can be sure no side effects anywhere else)
    dave.Age = 46;

    Person bob = new Person(name: "bob", age: 22);
    //bob.Age = 23; // compiler doesn't allow this
    // Creating a new version of bob with an updated age
    var bob2 = bob.With(age: 43);
    // A new version of bob with updated age 
    var bob3 = Birthday(bob);
}

// Function is pure - no side effects ie not updating anything which could be used anywhere else
// we are returning a brand new object
static Person Birthday(Person p) => p.With(age: 43);

class PersonOO
{
    public string Name { get; set; }
    public int Age { get; set; }
}

class Person
{
    public string Name { get; } // C#6 Getter only auto-property
    public int Age { get; }

    // Smart constructor enforcing a name and age are given
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    // Updates here, enforcing a new object is returned every time
    // strings are nullable because they are reference types
    public Person With(string name = null, int? age = null)
    {
        // if null, return the current value
        // else set the newly passed in value
        // ?? null coalescing operator
        return new Person(name: name ?? Name, age: age ?? Age);
    }
}
```
Interesting C#8 nullable / non-nullable reference types, same intent as `Option<T>` [discussed here](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/nullable-reference-types)  

These act like [record types](https://fsharpforfunandprofit.com/posts/records/) or `data types` in other languages. Essentially can only be a finitie set of attributes. [good example using With](https://stackoverflow.com/questions/38575646/general-purpose-immutable-classes-in-c-sharp/38596298#38596298)  

Why use the With to return a copy of an object when wanting to mutate it? [Good SO Question here](https://stackoverflow.com/questions/38575646/general-purpose-immutable-classes-in-c-sharp/38596298#38596298)  

## Option type
Many functional languages disallow null values, as null-references can introduce hard to find bugs. Option is a type safe alternative to null values [ref to a few words in this section](https://github.com/nlkl/Optional). As discussed above C#8 is [getting nullable and non-nullable reference types](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/nullable-reference-types) which should give similar safety.   

Pattern: Whenever I'm using a primitive type eg int, string.    

Nulls wont ever leave C#. LanguageExt was created to help avoid nulls by using an Option.  

[null article](https://templecoding.com/blog/2017/01/31/handling-nulls-in-csharp-the-right-way/)    

### None / Some
An `Option<T>` can be in one of two states. `Some` representing the presence of a value and `None` representing the lack of a value. Unlike null, an option type forces the user to check if a value is actually present, thereby mitigating many of the problems of null values.

```cs
// Option type with None and Some
static void Three()
{
    Option<string> html = GetHtmlThree("badurl"); // will fail
    Option<string> htmlb = GetHtmlThree("test.com"); // will succeed
}

static Option<string> GetHtmlThree(string url) =>
    // None represents nothing. Part of language-ext
    // Some represents a container for the string
    url == "test.com" ? Some("html here") : None;
```

### Match
```cs
// Option type with Match down to primitive type
static void Four()
{
    // 2 different results of the GetHtml function
    Option<string> result = None;
    Option<string> resultb = Some("html here");

    // Forces us to deal with the None case
    // Null reference exceptions can't happen as it wont compile unless we handle it
    // Match down to primitive type (as opposed to elevated types of Option<T>, IEnumerable<T>, Either<T>)
    string stringResult = result.Match(Some: x => x, None: () => "none returned"); // none returned
    string stringResultb = resultb.Match(Some: x => x, None: () => "none returned"); // html here
}
```

### Map
We can `Match` down to a primitive type, or can stay in the elevated types and do logic using `Map`
```cs
// Match and Map
static void Five()
{
    string value = GetValue(true)
                   .Match(Some: name => $"Hello, {name}", None: () => "Goodbye");
    Console.WriteLine(value); // Hello, Bob

    // Map - Functor
    // Lambda inside Map wont be invoked if Option is in None state
    // Option is a replacement for if statements ie if obj == null
    // Working in elevated context to do logic
    // Similar to LINQ on IEnumerable.. ie if it is an empty list, then nothing will happen
    Option<string> result = GetValue(true).Map(name => $"Hello, {name}");
    Console.WriteLine(result); // Some(Hello, Bob)

    Option<string> resultb = GetValue(false).Map(name => $"Hello, {name}"); // None
}

// Ternary nice and clean
static Option<string> GetValue(bool hasValue) =>
    hasValue ? Some("Bob") : None;
```

## Map and IEnumerable 
Apply a function to the containers inner values, and take into account None. This is very similar to working with IEnumerable and running a `Select` over each item in the collection. 

```cs
// IEnumerable Map and Select
static void Six()
{
    Option<string> name = Some("Bob");

    // Map works on Option applying the function..just like select on IEnumerable.. they are both functors
    Option<string> result = name.Map(x => x.ToUpper()); // Some(BOB)


    IEnumerable<string> names = new[] { "Bob", "Alice" };

    IEnumerable<string> resultb = names.Map(x => x.ToUpper()); // a normal IEnumerable
    IEnumerable<string> resultc = names.Select(x => x.ToUpper()); // a normal IEnumerable
}

```

### Option, Match, Map and Functors
Allow us to stay in the elevated context of core functional types such as `Option<A>`, `Either<L, R>`, `Try<A>` etc.. We can consider `IEnumerable<T>` to be a core functional type as it abstracts away null checking, and does not mutate (ie always returns a new result).

[Good examples at bottom of message](https://github.com/louthy/language-ext/issues/209) which are here too  

`IEnumerable` and `Option` are `Functors`. Essentially anything which has a reasonable implementation of Map is a functor.

GetValue below may, or may not return a string. The function signature is 'honest' in that it is obvious that it may or may not return a string as the return type is `Option<string>`.  

`Match` brings down the elevated type. Essentially this is a null check.  

The strategy is to try and work in the elevated level of abstraction to avoid: loops, null checks etc.. which are error prone. Why not abstract this away if we can?  

### Map chaining
Lets see another example of using `Map` to stay in the elevated context and not have to worry about nulls. We want to apply multiple functions in the elevated context.  
```cs

// Using Map (to avoid having to check for null at each stage)
static void Seven()
{
    //Option<string> html = GetHtml("a");
    Option<string> html = GetHtml("c");
    // shorten html
    Option<string> shortHtml = html.Map(x => x.Substring(0, 1)); // Some(a)
                                                                 // put on https
    Option<string> addedHttps = shortHtml.Map(x => $"https://{x}"); // Some(https://a)

    // come down from elevated context and deal with None
    string final = addedHttps.Match(Some: x => x, None: () => "No html returned");
}

static Option<string> GetHtml(string url)
{
    if (url == "a") return "aa";
    if (url == "b") return "bb";
    return None;
}
```

## Bind
Rather than having the do separate calls to Map, we can use Bind, which allows us to chain multiple functions together that all the return `Option`. Bind is like `Map` but can flatten two Option<T>'s together.. we don't want an `Option<Option<T>>`. `SelectMany` is Bind in LINQ, and can also be called `FlatMap` in other languages.    

Example here is using Bind to compose 2 functions which return an `Option<string>`:  

```cs
// Bind - Monad - Bind two Option<strings>
// SelectMany or FlatMap
static void Eight()
{
    // If either GetFirstName() or MakeFullName(string firstName) returned None
    // then name would be None
    // return is not an Option<Option<string>>.. but flattened
    Option<string> name = GetFirstName()
                         .Bind(MakeFullName);
    Console.WriteLine(name); // Some(Joe Bloggs)
}

static Option<string> GetFirstName() =>
    Some("Joe");

static Option<string> MakeFullName(string firstName) =>
    Some($"{firstName} Bloggs");

```
Another example of `Bind` on `Option<string>`:

```cs
// Using Bind so we can chain multiple Option<T> functions together
static void Nine()
{
    Option<string> html = GetHtml("a");
    //Option<string> html = GetHtml("c");

    // we don't want to have Option<Option<string>>
    Option<string> shortHtml = html.Bind(x => ShortenHtml(x)); // x is a string

    // put on https using shortened Method syntax so don't need x
    Option<string> addedHttps = shortHtml.Bind(PutOnHttps);

    Option<string> both = html.Bind(ShortenHtml)
                              .Bind(PutOnHttps);

    // Come down from elevated context and deal with None
    string final = addedHttps.Match(Some: x => x, None: () => "No html returned");
    string finalb = both.Match(Some: x => x, None: () => "No html returned");
}

static Option<string> ShortenHtml(string html) =>
    html == "" ? None :
    Some(html.Substring(0, 10));

static Option<string> PutOnHttps(string html) =>
    html.Length < 3 ? None : // business rule to catch invalid html
    Some("https://" + html);
```

## Collections / Method chaining in LINQ vs Bind  
In my broken links checker example application, after getting the html from a page, I'm dealing with collections and have used extension method chaining.. is there a better way using Bind?

Here is some exploratory code showing that we can stay in the elevated context by using IEnumerable<T> which handles nulls fine, and by using chained extension methods.  

Bind is for working with Option<T> and Either<L,R> (and more) but also supports IEnumerable<T> [more information](https://github.com/louthy/language-ext/issues/456)  

```cs
// IEnumerable and Extension methods
static void Ten()
{
    IEnumerable<string> listHrefs = GetListHrefs();
    var baseUrl = "https://davemateer.com";
    // LINQ extension method style
    // if UrlType is Invalid (ie not Absolute or Relative) then don't add to this list
    IEnumerable<string> finalUrl = listHrefs
                                  // extension method which suffixes Relative, Absolute or Invalid
                                  .GetUrlTypes()
                                  // depending on UrlType above, process the url
                                  .ProcessUrls(baseUrl);
}

static IEnumerable<string> ProcessUrls(this IEnumerable<string> urls, string baseUrl) =>
    // ProcessUrl could return None so we use Bind instead of Select
    urls.Bind(x => ProcessUrl(x, baseUrl));

static Option<string> ProcessUrl(string url, string baseUrl) =>
    url.EndsWith("Absolute") ? url :
    url.EndsWith("Relative") ? Some(baseUrl + url) :
    None;

static IEnumerable<string> GetUrlTypes(this IEnumerable<string> html) =>
    // Apply GetUrlType to each element in the list
    html.Select(GetUrlType);

// Using expressions instead of if..return
static string GetUrlType(string link) =>
    link.StartsWith("https://") ? $"{link} : Absolute" :
    link.StartsWith("/") ? $"{link} : Relative" :
    "{link} : Unknown";

static IEnumerable<string> GetListHrefs()
{
    yield return "/programming-in-c-sharp";
    yield return "https://bbc.co.uk";
    yield return "mailto:davemateer@gmail.com";
}

```

## Either - Exception handling
Here we are using `Either` to return back the `Exception` or the valid result html `string`.
```cs
// Either - Exception handling
static void Eleven()
{
    Option<string> result = GetHtml("invalidurl"); // None. ie it will swallow the exception

    Either<Exception, string> resultb = GetHtmlE("invalidurl");  // Left(System.InvalidOperationException)

    // Did the request throw an exception or return html?
    resultb.Match(
        Left: ex => HandleException(ex),
        Right: ProcessPipeline
        );

    // Keep in the elevated context 
    var resultc = resultb.Map(x => x.Substring(0, 1)); // if not an Exception ie Right, then apply a lambda expression

    // Bind an Either<Exception, string> with an Either<Exception, string>
    var resultd = resultb.Bind(DoSomething);
}

static Either<Exception, string> DoSomething(string thing) => thing.Substring(0, 1);

static void HandleException(Exception ex) => Console.WriteLine(ex);

static void ProcessPipeline(string html) => Console.WriteLine(html);

public static Either<Exception, string> GetHtmlE(string url)
{
    var httpClient = new HttpClient(new HttpClientHandler());
    try
    {
        var httpResponseMessage = httpClient.GetAsync(url).Result;
        return httpResponseMessage.Content.ReadAsStringAsync().Result;
    }
    catch (Exception ex) { return ex; }
}
```

## Either - Error Handling (Validation or Exception)
Railway Oriented Programming

```cs
// Either - Errors in Validation handling
static void Twelve()
{
    var url = "https://davemateer.com";
    var result = RunUrlValidationPipeline(url);

    var message = result.Match(Left: r => $"Rejected because: {r.ReasonForRejection}",
        Right: x => "Success"); // Rejected because: Is not in allowed suffixes
}

// Railway oriented validation
// a url which needs to go through a validation pipeline
// if it fails at any point it goes on the left track 
// and wont go any further on right
public static Either<URLRejection, string> RunUrlValidationPipeline(string url) =>
    DoesUrlStartWithHttp(url)
    .Bind(DoesUrlStartWithHttps)
    .Bind(IsUrlInAllowedSuffixes);

public static Either<URLRejection, string> DoesUrlStartWithHttp(string url) => url; // pass

public static Either<URLRejection, string> DoesUrlStartWithHttps(string url) => url; // pass

public static Either<URLRejection, string> IsUrlInAllowedSuffixes(string url)
{
    return new URLRejection { ReasonForRejection = "Is not in allowed suffixes" };
    //return url; // hack for yes it does
}

public class URLRejection
{
    public string ReasonForRejection { get; set; }
}
```

## Either type - Further abstractions Exceptions
`Try<A>` or an `Exception<A>` are further abstractions over `Either`.

## Parameterised Unit Tests
As functions get smaller and are easier to test, it is very useful to be able to test a lot of scenarios using parameters. I'm using `xunit` here:  

```cs
using static Xunit.Assert;

// Parameterised Tests using Xunit
[Theory]
[InlineData("http://microsoft.com/", URLType.Absolute)]
[InlineData("http://microsoft.com", URLType.Absolute)]
[InlineData("https://microsoft.com/", URLType.Absolute)]
[InlineData("https://microsoft.com", URLType.Absolute)]

[InlineData("http://www.microsoft.com/", URLType.Absolute)]
[InlineData("http://www.microsoft.com", URLType.Absolute)]
[InlineData("https://www.microsoft.com/", URLType.Absolute)]
[InlineData("https://www.microsoft.com", URLType.Absolute)]
[InlineData("Https://www.microsoft.com", URLType.Absolute)]

// Site root relative
[InlineData("/", URLType.Relative)]
[InlineData("/2016/10/17/Blog-with-Jekyll-and-host-for-free", URLType.Relative)]

// Document relative - need to watch for these
//[InlineData("dreamweaver/contents.html", URLType.Relative)]

// Protocol relative - meaning current protocol ie http or https 
//[InlineData("//www.adobe.com/support/dreamweaver/contents.html", URLType.Relative)]
[InlineData("//draft.blogger.com/rearrange?blogID=9185258468770746323&widgetType=Profile&widgetId=Profile1&action=editWidget&sectionId=footer-2-2", URLType.Protocol)]

//https://stackoverflow.com/a/28865728/26086
[InlineData("spotify:track:5xRYEnLUno3P8LmAxjFuLg", URLType.Invalid)]
[InlineData("ftp://example.com/download.zip", URLType.Invalid)]
[InlineData("mailto:davemateer@gmail.com", URLType.Invalid)]
[InlineData("file:///home/user/file.txt", URLType.Invalid)]
[InlineData("tel:1-888-555-5555", URLType.Invalid)]
[InlineData("urn:isbn:0451450523", URLType.Invalid)]
[InlineData("view-source:https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn?rq=1", URLType.Invalid)]

[InlineData("#paragraph1", URLType.Invalid)]
[InlineData("#", URLType.Invalid)]

[InlineData("https://davemateer.com/2018/01/30/Cmder-Shell#aliases", URLType.Absolute)]
public static void GetURLType_Absolute_ReturnAbsolute(string input, URLType expected)
{
    var result = input.GetURLType();
    Equal(expected, result);
}
```

## Summary
As [louthy said in his post](https://github.com/louthy/language-ext/issues/209), it will take time to all sink in. It can take years to really master it. Most of the functionality in language-ext is there to help compose expressions.   

These 'basics' of FP in C# allow us to build applications which have:

- Power (do more with less code, raise the level of abstraction)
- Safety (avoiding unnecessary side effects makes code easier to reason about)
- Clarity (we spend more time maintaining and consuming existing code than writing new. Achieving clarity will become more natural)

By having:

- Short methods which are ideally expressions ie just a return or =>
- Composed methods using LINQ for collections, Map and Bind for Option<T>, Either<L,R>
- Static methods so no OO boilerplate
- Immutable objects so no side effects (making our lives easier as the only way something can change is in the function we are in)

With the techniques shown here, I've built an application which crawls for dead links on a website. I've used this application to be the real world test bed as I've gone thorugh learning FP. As in most real world applications, there is much more complexity than initially it looks like. These techniques have guided my code to be simpler and more maintainable.  



<br />
<br />