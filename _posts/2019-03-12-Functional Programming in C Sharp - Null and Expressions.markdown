---
layout: post
title: Functional Programming in C# - Expressions, Option, Either
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

- Expressions and the ternary operator 
- Immutable types
- Pure methods
- Option type 
- Match and Map
- Either type
- Bind

[Inspiration for this article](https://github.com/louthy/language-ext/issues/209)

The initial problems the C# [functional library language-ext](https://github.com/louthy/language-ext/issues) was trying to solve were that of:
- Nulls 
- Immutability  
[Original HN Article from 2014 on language-ext](https://news.ycombinator.com/item?id=8631158)

If we remember that the core tenants of what FP are
- Functions first
- Immutability

Expressions first helps keep the functions small.  
Immutability helps guide the functions towards being pure (no side effects)

## Expressions
Make everything you do is an expression, rather than a sequence of statements eg if using expression-bodied methods that start with =>

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

## Immutable Data objects / Smart Constructors
We never want to mutate an object in FP, but a create a new one. This makes sure there are no side effects caused somewhere else, thus ensuring a function remains pure. It also makes concurrency simpler.

```cs
static void A()
{
    PersonOO dave = new PersonOO();
    dave.Name = "dave";
    dave.Age = 45;
    // We don't do this in FP.. F# (by default), Haskell etc. does not allow this
    // Should avoid mutating objects in place and favour making new ones (as can be sure no side effects anywhere else)
    dave.Age = 46;

    Person bob = new Person(name:"bob", age:42);
    // Creating a new version of bob with an updated age
    var bob2 = bob.With(age: 43);
    // Another new version of bob with an updated age 
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
        return new Person(
            name: name ?? Name,
            age: age ?? Age
            );
    }
}
```
Interesting C#8 nullable / non-nullable reference types (same intent as Option<T>) [discussed here](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/nullable-reference-types)

These act like [record types](https://fsharpforfunandprofit.com/posts/records/) or `data types` in other languages. Essentially can only be a finitie set of attributes. [good example using With](https://stackoverflow.com/questions/38575646/general-purpose-immutable-classes-in-c-sharp/38596298#38596298)  

Why use the With to return a copy of an object when wanting to mutate it? [Good SO Question here](https://stackoverflow.com/questions/38575646/general-purpose-immutable-classes-in-c-sharp/38596298#38596298)  

## Pure functions
Pure functions don't refer to any global state. The same inputs will always get the same output. Combined with immutable data types this means you can be sure the same inputs will give the same outputs.  

If we have mutable objects it could be possible for another function to mutate the object we were working on concurrently.  

So if we have a pure function (which doesn't act on a mutable global variable) then we can make the function `static`. More [discussion in ch 2.2.3 of the orange book](https://livebook.manning.com/#!/book/functional-programming-in-c-sharp/chapter-2/113)

## Option type
Many functional languages disallow null values, as null-references can introduce hard to find bugs. Option is a type safe alternative to null values [ref to a few words in this section](https://github.com/nlkl/Optional). As discussed above C#8 is [getting nullable and non-nullable reference types](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/nullable-reference-types) which should give similar safety.   

Pattern: Whenever I'm using a 'base type' eg int, string.  

Nulls wont ever leave C#. LanguageExt was created to help avoid nulls by using an Option.  

[null article](https://templecoding.com/blog/2017/01/31/handling-nulls-in-csharp-the-right-way/)    


### None / Some
An `Option<T>` can be in one of two states. `Some` representing the presence of a value and `None` representing the lack of a value. Unlike null, an option type forces the user to check if a value is actually present, thereby mitigating many of the problems of null values.

```cs
// Option<string> - may or may not contain a value
static void B()
{
    // None represents nothing.
    Option<string> html = None;
    // Some is a container for the string
    Option<string> htmlb = Some("html here");

    // Forces us to deal with the None case
    string result = html.Match(Some: x => x, None: () => "none returned"); // none returned
    string resultb = htmlb.Match(Some: x => x, None: () => "none returned"); // html here
}
```

// HERE *** C()

### Match
A function which returns an `Option<string>`
```cs
Option<string> html = GetHtml(url);
// an invalid url would return None
// a valid request would return the html
string result = html.Match( Some: x => x, None: () => "none returned");

// Function signature is honest - it may, or may not return a string
public static Option<string> GetHtml(string url)
{
    var httpClient = new HttpClient(new HttpClientHandler());
    try
    {
        var responseMessage = httpClient.GetAsync(url).Result;
        return responseMessage.Content.ReadAsStringAsync().Result;
    }
    catch (Exception ex) { return None; }
}
```

## Map on Option
Apply a function to the containers inner values, and take into accout None

```cs
Option<string> name = Some("Enrico");

// Map works on Option applying the function..just like select on IEnumerable.. they are both functors
Option<string> result = name.Map(x => x.ToUpper()); // Some(ENRICO)


IEnumerable<string> names = new[] { "Bob", "Alice" };

IEnumerable<string> resultb = names.Map(x => x.ToUpper()); // a normal IEnumerable
IEnumerable<string> resultc = names.Select(x => x.ToUpper()); // a normal IEnumerable
```

### Map vs Match - Keep on Elevated
We can `Match` down to a concrete type, or can stay in the elevated types and do logic using `Map`
```cs
// Option and Match
static void One()
{
    // Match down to concrete type (as opposed to elevated types of Option<T>, IEnumerable<T>, Either<T>)
    string value = GetValue(true).Match(
        Some: name => $"Hello, {name}",
        None: () => "Goodbye"
    );
    Console.WriteLine(value); // Hello, Bob

    // Map - Functor
    // Lambda inside Map wont be invoked if Option is in None state
    // Option is a replacement for if statements ie if obj == null
    // Working in elevated context to do logic
    // Similar to LINQ on IEnumerable.. ie if it is an empty list, then nothing will happen
    Option<string> valueb = GetValue(true).Map(name => $"Hello, {name}");
    Console.WriteLine(valueb); // Some(Hello, Bob)
}

// Ternary nice and clean
static Option<string> GetValue(bool hasValue) => hasValue
        ? Some("Bob")
        : None;

```

### Option, Match, Map and Functors
Allow us to stay in the elevated context of core functional types such as `Option<A>`, `Either<L, R>`, `Try<A>` etc.. We can consider `IEnumerable<T>` to be a core functional type as it abstracts away null checking, and does not mutate (ie always returns a new result).

[Good examples at bottom of message](https://github.com/louthy/language-ext/issues/209) which are here too  

`IEnumerable` and `Option` are `Functors`. Essentially anything which has a reasonable implementation of Map is a functor.

GetValue below may, or may not return a string. The function signature is 'honest' in that it is obvious that it may or may not return a string as the return type is `Option<string>`.  

`Match` brings down the elevated type. Essentially this is a null check.  

The strategy is to try and work in the elevated level of abstraction to avoid: loops, null checks etc.. which are error prone. Why not abstract this away if we can?  

### Map multiple
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

## Bind
Allows us to chain multiple functions together that all the return `Option`. Bind is like `Map` but can flatten two Option<T>'s together.. we don't want an Option<Option<T>>. `SelectMany` is Bind in LINQ, and can also be called `FlatMap` in other langauges.  

Example here is using Bind to compose 2 functions which return an `Option<string>`:  

Threee() in source code
```cs
// Using Bind so we can chain multiple Option<T> functions together
static void Three()
{
    Option<string> html = GetHtml("a"); // Some(aa)

    Option<string> shortHtml = html.Bind(x => ShortenHtml(x)); // x is a string.. Some(a)

    // Put on https using shortened Method syntax so don't need x
    Option<string> addedHttps = shortHtml.Bind(PutOnHttps); // Some(https://a)

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
Another example of `Bind` on `Option<string>`:

```cs
// Bind - Monad - Bind two Option<strings>
static void Five()
{
    // If either GetFirstName() or MakeFullName(string firstName) returned None
    // then name would be None
    // return is not an Option<Option<string>>.. but flattened
    Option<string> name = GetFirstName().Bind(MakeFullName);
    Console.WriteLine(name); // Some(Joe Bloggs)
}

static Option<string> GetFirstName() =>
    Some("Joe");

static Option<string> MakeFullName(string firstName) =>
    Some($"{firstName} Bloggs");
```
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

## Either type - Exceptions
Use `Option<A>` or `Either<L, R>` where L is the error. `Try<A>` or an `Exception<A>` are further abstractions over `Either`.


## Either - Error Handling (Validation or Exception)
Railway Oriented Programming

## Either - Exception handling
asdf

## Either - Validation
asdf

## Database Connection
asdf

## Parameterised Unit Tests
asdf


## Summary
As louthy said in is post, it will take time to all sink in. It can take years to really master it. Most of the functionality in language-ext is there to help compose expressions.   

These 'basics' of FP in C# allow us to build applications which have:

- Power (do more with less code, raise the level of abstraction)
- Safety (avoiding unnecessary side effects makes code easier to reason about)
- Clarity (we spend more time maintaining and consuming existing code than writing new. Achieving clarity will become more natural)

By having:

- Short methods which are ideally expressions ie just a return or =>
- Composed methods using LINQ for collections, Map and Bind for Option<T>, Either<L,R>
- Static methods so no OO boilerplate
- Immutable objects so no side effects (making our lives easier as the only way something can change is in the function we are in)
