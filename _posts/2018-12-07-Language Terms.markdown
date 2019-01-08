---
layout: post
title:  Language Terms
menu: review
categories: language 
published: true 
comments: false
sitemap: false
---
Interviews, talking to colleagues, writing blogs or presenting at conferences, I like to use a common language to describe concepts. Some of the great educators eg K Scott Allen are very precise in how they talk technically.  

These definitions are in relation to C#. I'll provide more detail as a reference to: Wikipedia, Microsoft documentation and detailed links. 

## Programming Paradigms
[Programming paradigms](https://en.wikipedia.org/wiki/Programming_paradigm) are a way to classify programming languages based on their features. [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) is classified in [6 different paradigms](https://en.wikipedia.org/wiki/Comparison_of_multi-paradigm_programming_languages)

- [Imperative programming](https://en.wikipedia.org/wiki/Imperative_programming) (contrasted with Declaritive) uses statements to change a program's state. eg C#

   - [Procedural](https://en.wikipedia.org/wiki/Procedural_programming) groups instructions into procedures eg C, BASIC
   - [Object Oriented](https://en.wikipedia.org/wiki/Object-oriented_programming) groups instructions together with the part of the state they operate on eg Java, C#, Lisp

- [Declaritive programming](https://en.wikipedia.org/wiki/Declarative_programming) expresses logic of a computation without describing its control flow. eg SQL, regex, functional programming
    - [Functional programming](https://en.wikipedia.org/wiki/Functional_programming) evaluation of functions, avoids changing state eg Lisp, Clojure, Erlang, Haskell, F#, SQL (this domain specific language uses some elements of FP), C#

Separation and encapsulation

## Class 
[C# Programming Guide](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/index)  
Create an instance of a [class](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes)
```c#
// Declaring an object of type Person
// Creating an instance of a Person class
Person person = new Person();
```
A type that is declared as a class is a reference type. At run time when you declare a variable of a reference type that variable contains the value null, until you explicitly create an instance of the class by using the new operator.

- A class defines a type of object
- An object is a concrete entity based on a class, sometime referred to as an instance of a class

## Fields Properties Methods
Object orientated programming principles say that, the internal workings of a class should be hidden from the outside world. If you expose a field you're in essence exposing the internal implementation of the class. Therefore we wrap fields with Properties [SO Source](https://stackoverflow.com/a/295140/26086)

```c#
class Program
{
    static async Task Main()
    {
        // create an object of type Person passing a value to the constructor
        // which will set the public property
        var person = new Person("Dave", 45);
        Console.WriteLine(person.Greeting());
    }
}

public class Person
{
    // Auto Property (C#3 which generates a private field)
    public string Name { get; set; }

    // Field commonly named _age or age (almost always should be private)
    private int _age;

    // Property. When accessed it uses the underlying field
    public int Age
    {
        get { return _age; }
        set { _age = value; }
    }

    // Constructor that takes argument (or are these parameters?)
    public Person(string name, int age)
    {
        // Initialising property
        Name = name;
        // Initialising property which sets the private field
        Age = age;
    }

    // Method using Expression bodied memmber (C#7)
    public string Greeting() => $"Hello {Name}, who is {_age} years old";
}
```
[Properties](https://docs.microsoft.com/en-us/dotnet/csharp/properties)  

[Capitalisation](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/capitalization-conventions)


## Arguments vs Parameters
pass an argument (value) and accept a parameter (reference to that value) [SO question](https://stackoverflow.com/a/1663724/26086)  
```c#
Foo(1, 2);  // 1 and 2 are arguments as they are *values*
void Foo(int x, int y); // x and y are parameters as they are *names*
```
but they are used interchangeably 

## Async Await
In the example above the entry point into the Console Application is a
[Static async Task Main()](https://blogs.msdn.microsoft.com/mazhou/2017/05/30/c-7-series-part-2-async-main/) which is new in C#7.1  

```c#
// Static readonly Field so PascalCasing
private static readonly HttpClient HttpClient = new HttpClient();

static async Task Main()
{
    var sw = new Stopwatch();
    sw.Start();
    var countOfNumberOfTimesDotNetUsed = GetDotNetCountAsync("https://dotnetfoundation.org");
    var r2 = GetDotNetCountAsync("https://davemateer.com");
    var r3 = GetDotNetCountAsync("https://docs.microsoft.com/en-us/dotnet/csharp/async");
    var r4 = GetDotNetCountAsync("https://docs.microsoft.com/en-us/dotnet/csharp/pattern-matching");
    Console.WriteLine("here");
    Console.WriteLine(await r2);
    Console.WriteLine(await r3);
    Console.WriteLine(await r4);
    Console.WriteLine(await countOfNumberOfTimesDotNetUsed);
    Console.WriteLine(sw.ElapsedMilliseconds);
}

public static async Task<int> GetDotNetCountAsync(string url)
{
    // Suspends GetDotNetCountAsync() to allow the caller 
    // to accept another request, rather than blocking on this one.
    var html = await HttpClient.GetStringAsync(url);
    System.Threading.Thread.Sleep(1000);
    return Regex.Matches(html, @"\.NET").Count;
}
```
Without the new async entrypoint we couldn't use await in the Main method (and would have to write more code)  

[Async programming docs](https://docs.microsoft.com/en-us/dotnet/csharp/async) "If you have any I/O-bound needs (such as requesting data from a network or accessing a database), you'll want to utilize asynchronous programming."

> Async all the way (down/up)

[SO Answer](https://stackoverflow.com/a/29809054/26086)  

# FP
- Funcs
- Delegate
   allow us to create variables that point to methods

Action - delegate (pointer) to a method that takes 0, one for more input parameters but does not return anything
Func - same as above but returns a value (or reference)

```c#
// 1. Functions as first class values
// assign a function to a variable 
// function assigned to variable triple takes one int parameter and returns an int 
Func<int, int> triple = x => x * 3;
var range = Enumerable.Range(1, 3);
// pass a variable (a function!) in as an argument
var triples = range.Select(triple).ToList(); // 3,6,9

// call the function
var result = triple.Invoke(3); // 9

// 2. Functional nature of LINQ
var a = Enumerable.Range(1, 100)
    .Where(x => x % 20 == 0) // filter using a predicate so only get 20,40,60,80,100
    .OrderBy(x => -x) // sort by descending into a new sequence
    .Select(x => $"{x}%"); // map each numerical value to a string suffixed by a % into a new sequence

```
lambda expressions
They are a way to define a method
Lambda expression are a way to create executable code

## Higher Order Function (fn as an input)
This type often referred to as a continuation or a callback or Inversion of Control

This HOF takes a function as an argument (functions that depend on other functions) 
```c#
static class Program
{
    static void Main()
    {
        // 4.1 HOF
        var numbers = new[] { 3, 5, 7, 9 };
        foreach (var prime in numbers.Find(IsPrime))
            Console.WriteLine(prime);

    }

    // 4.1 Higher Order Function - second parameter Func is another function which takes an int parameter
    // returns a bool 
    // function that depends on a function as an input - often referred to as a callback or continuation or inversion of control
    // this is the most common usage of a HOF
    public static IEnumerable<int> Find(this IEnumerable<int> values, Func<int, bool> predicate)
    {
        foreach (var number in values)
            if (predicate(number))
                yield return number;
    }
    public static bool IsPrime(int number)
    {
        for (long i = 2; i < number; i++)
            if (number % i == 0)
                return false;
        return true;
    }
}

```

## HOF to encapsulate setup and teardown - DB Connection
Sometimes called 'Hole in the middle'

See next blog post on DB Connection


## Negating a Predicate
Having a Negate extension method gives a nice style when we want to show *non* prime numbers
```c#
// 1. Write a function that negates a given predicate: whenever the given predicate
// evaluates to `true`, the resulting function evaluates to `false`, and vice versa.
public static void PrimeTest()
{
    var numbers = new[] { 3, 5, 7, 9 };

    // function assigned to a variable takes an int and returns a bool
    Func<int, bool> isPrime = IsPrime;

    foreach (var prime in numbers.Where(isPrime.Negate()))
        //foreach (var prime in numbers.Where(IsPrime2.Negate()))
        Console.WriteLine(prime);
}

// a Field!
static Func<int, bool> IsPrime2 = x =>
{
    for (long i = 2; i < x; i++)
        if (x % i == 0)
            return false;
    return true;
};

// extension method on Func<t, bool>
// returns a Func<T, bool>
// negates a predicate
public static Func<T, bool> Negate<T>(this Func<T, bool> pred)
{
    return t => !pred(t);
}

public static bool IsPrime(int number)
{
    for (long i = 2; i < number; i++)
        if (number % i == 0)
            return false;
    return true;
}
```

## Pure and Impure Functions
As functions become pure they are easier to reason about and performance is easier to enhance - in this case using parallelise  
```c#
class Program
{
    static void Main()
    {
        var input = new List<string> { "coffee beans", "BANANAS", "Dates" };
        var output = new ListFormatter().Format(input);
        // Method group - same as writing x => WriteLine(x)
        output.ForEach(WriteLine);

        var b = ListFormatter2.Format(input);
        b.ForEach(WriteLine);

        var c = ListFormatter3.Format(input);
        c.ForEach(WriteLine);
    }
}
// try 3 - no shared state, so easy to parallelise
static class ListFormatter3
{
    public static List<string> Format(List<string> list) =>
        list.AsParallel()
            .Select(StringExt.ToSentenceCase) // Method group
            .Zip(ParallelEnumerable.Range(1, list.Count), (s, i) => $"{i}. {s}") // s is string, i is int
            .ToList();
}

// try 2 - pure function as not using a mutable counter
static class ListFormatter2
{
    // when all variables required within a method are provided as input the method can be static
    public static List<string> Format(List<string> list) =>
        list
            .Select(StringExt.ToSentenceCase) // Method group
            .Zip(Enumerable.Range(1, list.Count), (s, i) => $"{i}. {s}") // s is string, i is int
            .ToList();
}

// try 1
class ListFormatter
{
    int counter;

    // impure function - mutates global state
    string PrependCounter(string s) => $"{++counter}. {s}";

    // pure and impure functions applied similarly
    // Expression body syntax C#6
    public List<string> Format(List<string> list)
        => list
            .Select(StringExt.ToSentenceCase) // pure
            .Select(PrependCounter) // impure as mutating global state
            .ToList();
}

public static class StringExt
{
    // Pure function (no side effects)
    // because its computation only depends on the input parameter it can be made static
    public static string ToSentenceCase(this string s)
        => s.ToUpper()[0] + s.ToLower().Substring(1);
}
```

Interesting guideline on static methods:
- Make pure functions static
- Avoid mutable static fields
- Avoid direct calls to static methods the perform I/O

## Testing Impure Functions - DateTime
Using OO it is possible by injecting in a fake DateTime, but a lot of boilerplate.

```c#
public class DateNotPastValidator : IValidator<MakeTransfer>
{
  DateTime Today { get; }

  public DateNotPastValidator(DateTime today)
  {
     this.Today = today;
  }

  public bool IsValid(MakeTransfer cmd)
     => Today <= cmd.Date.Date;
}
```
This is now a pure function. Instead of injecting an interface we can inject a value. Essentially pushing the side effect of reading the current date outwards.  

This works well for Configuration and environment specific settings, but things are rarely this easy.

## Testing impure functions - BMI




## Other
statement - doesn't return a value
expression - returns a value


functions 
closures
HOFs

monads / flatmap