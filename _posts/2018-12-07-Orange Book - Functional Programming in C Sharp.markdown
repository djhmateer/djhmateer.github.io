---
layout: post
title:  Orange Book - Functional Programming in C Sharp
menu: review
categories: c# functional 
published: true 
comments: false
sitemap: false
---
![ps](/assets/2019-01-11/3.png)  
[Functional Programming in C# book](https://www.manning.com/books/functional-programming-in-c-sharp) is a very in depth book.  

[Chapter 1](#what-is-fp) What is FP? Paradigms, HOF, Immutable   
[Chapter 2](#chapter-2---pure-and-impure-functions)  Pure and Impure Functions, injecting functions, parameterised unit tests   
[Chapter 3](#chapter-3---function-signatures-and-types)  Data objects,  Honest Functions,  Adapter Function for setup (timing), Option type, None, Some, Smart Constructor   
[Chapter 4](#chapter-4---patterns-in-functional-programming) Patterns in FP  Map (Select), Bind, Elevated level of abstraction eg Option T, IEnumerable    
[Chapter 5](#chapter-5---functional-composition) Functional Composition   
[Chapter 6](#chapter-6---functional-error-handling) Part 2 (Becoming Functional) Functional Error Handling



My [strategy and why I'm doing this](/2019/01/11/Learning-Functional-Programming-in-C-Sharp) is:

- Be patient (I've gone back to Chapter 1 many times)
- Experiment in code ([All my source is open](https://github.com/djhmateer/functional-csharp-code))  

Learning by example is how more seasoned developers tend to work best (* link to research papers?).  I've taken this strategy in my FP exploration writing   

## What is FP
- Functions as first-class values
- Avoiding state mutation

## Functions as first-class values
- Func - pointer (delegate) to a method that can take parameters, and returns something
- Lambda expressions - executable code without a method name

```c#
// Variable assigned to function triple takes one int parameter and returns an int 
// lambda expression returns parameter times 3

// The variable triple is assigned to a lambda expression function 
Func<int, int> triple = x => x * 3;
var a = triple(4); // 12

// Passing the function around creating more concise code
// and higher level of abstraction
var g = Enumerable.Range(1, 100)
    .Select(x => triple(x)); // 3, 6, 9..
```

It is more obvious in F# that a variable is assigned to a function

```fsharp
// Variable triple assigned to function accepting int parameter and will return an int
let triple x = x * 3
let a = triple(4) // 12
printfn "a is %i" a // 12
```
## Avoid State Mutation
```cs
// Create and populate an array
int[] nums = { 1, 2, 3 };
// Updates the first value of the array
nums[0] = 7;
var c = nums; // => [7, 2, 3]
```
We should avoid mutating objects in place as above, and favour making new objects as below:

```cs
// Function (predicate signature) accepts an int and returns a bool
Func<int, bool> isOdd = x => x % 2 == 1;
var d = isOdd(3); // true

int[] original = {7, 6, 1};
var sorted = original.OrderBy(x => x); // [1, 6, 7]
var filtered = original.Where(isOdd); // [7, 1]
var e = original; // [7, 6, 1]
```

## Programming Paradigms
[Programming paradigms](https://en.wikipedia.org/wiki/Programming_paradigm) are a way to classify programming languages based on their features. [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) is classified in [6 different paradigms](https://en.wikipedia.org/wiki/Comparison_of_multi-paradigm_programming_languages)

- [Imperative programming](https://en.wikipedia.org/wiki/Imperative_programming) (contrasted with Declaritive) uses statements to change a program's state. eg C#

   - [Procedural](https://en.wikipedia.org/wiki/Procedural_programming) groups instructions into procedures eg C, BASIC
   - [Object Oriented](https://en.wikipedia.org/wiki/Object-oriented_programming) groups instructions together with the part of the state they operate on eg Java, C#, Lisp

- [Declaritive programming](https://en.wikipedia.org/wiki/Declarative_programming) expresses logic of a computation without describing its control flow. eg SQL, regex, functional programming
    - [Functional programming](https://en.wikipedia.org/wiki/Functional_programming) evaluation of functions, avoids changing state eg Lisp, Clojure, Erlang, Haskell, F#, SQL (this domain specific language uses some elements of FP), C#


Many C# solutions rely on imperative style in their method implementations, mutating state in place and using explicit control flow. They use OO design in the large, and imperative programmming in the small. 

## LINQ
LINQ is a functional library introduced in C#3 the contains methods for performing operations on sequences eg:

- Select (Map)
- Where (Filter)
- Sort

```cs
// 2. Functional nature of LINQ
var a = Enumerable.Range(1, 100)
    .Where(x => x % 20 == 0) // filter with a predicate (a function which returns a bool) here using a lambda expression so only get 20,40..
    .OrderBy(x => -x) // sort by descending into a new sequence
    .Select(x => $"{x}%"); // map each numerical value to a string suffixed by a % into a new sequence
```

## Higher Order Function (1. fn as an input)
This type of HOF (fn as an input) is often referred to as a continuation or a callback or Inversion of Control

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
 **MORE examples of simple HOFs???


## HOF (2. to encapsulate setup and teardown) - DB Connection
Sometimes called 'Hole in the middle'

I have used a small [Utility Class](https://github.com/djhmateer/thinkbooks/blob/master/ThinkBooksWebsite/Services/Util.cs) for years with Dapper and [being called like this](https://github.com/djhmateer/thinkbooks/blob/master/ThinkBooksWebsite/Services/BooksRepository.cs)  

So this FP approach allows us to get rid of the using statements.  

**TODO - convert this to async (coming later in book)

Notice also the Timespan extension methods allowing

```c#
var result = logger.GetLogs(7.Days().Ago()).ToList();
```

[Source code for all examples](https://github.com/djhmateer/functional-csharp-code) including a Database project to recreate the FP database in (localdb)\MSSQLLocalDB  

```c#
using static ConnectionHelper; // C#6 - import static members of this type

public static class DBThing
{
    public static void Run()
    {
        //var logger = new DbLogger_V1();
        var logger = new DbLogger_V2();
        var id = logger.Log("test");
        Console.WriteLine($"just inserted id: {id}");
        var result = logger.GetLogs(7.Days().Ago()).ToList();
        result.ForEach(x => Console.WriteLine($"{x.ID} : {x.Timestamp} : {x.Message}"));
    }
}

// 2. Functional way of doing data access
public class DbLogger_V2
{
    string connString = "Server=(localdb)\\mssqllocaldb;Database=FP;Trusted_Connection=True;MultipleActiveResultSets=true";

    // DBLogger doesn't need to know about Creating, Opening or Disposing of the connection
    public int Log(string message)
        => Connect(connString,
            c => c.Query<int>("Insert into Logs(message) values (@message); SELECT CAST(SCOPE_IDENTITY() as int)",
            new { message })
            .Single());

    public IEnumerable<LogMessage> GetLogs(DateTime since)
        => Connect(connString,
            c => c.Query<LogMessage>("SELECT * FROM [Logs] WHERE [Timestamp] > @since", new { since }));
}

// 1. Classic way of doing data access
public class DbLogger_V1
{
    string connString = "Server=(localdb)\\mssqllocaldb;Database=FP;Trusted_Connection=True;MultipleActiveResultSets=true";

    public int Log(string message)
    {
        using (var conn = new SqlConnection(connString))
        {
            conn.Open();
            var result = conn.Query<int>("Insert into Logs(message) values (@message);
             SELECT CAST(SCOPE_IDENTITY() as int)", new { message }).Single();
            return result;
        }
    }

    public IEnumerable<LogMessage> GetLogs(DateTime since)
    {
        var sqlGetLogs = "SELECT * FROM [Logs] WHERE [Timestamp] > @since";
        using (var conn = new SqlConnection(connString))
            return conn.Query<LogMessage>(sqlGetLogs, new { since });
    }
}

public static class ConnectionHelper
{
    // HOF - accepts function as an input
    // Generic method returning a generic object R
    // R is an IEnumerable<LogMessage> when calling GetLogs
    // R is int when calling Log
    // function accepts a SQLConnection, which will return an R
    public static R Connect<R>(string connString, Func<SqlConnection, R> func)
    {
        // using here is a statement (which doesn't return a value)
        using (var conn = new SqlConnection(connString))
        {
            conn.Open();
            return func(conn);
        }
    }
}
public class LogMessage
{
    public int ID { get; set; }
    public DateTime Timestamp { get; set; }
    public string Message { get; set; }
}

public static class TimeSpanExt
{
    public static TimeSpan Seconds(this int @this)
        => TimeSpan.FromSeconds(@this);

    public static TimeSpan Minutes(this int @this)
        => TimeSpan.FromMinutes(@this);

    public static TimeSpan Days(this int @this)
        => TimeSpan.FromDays(@this);

    public static DateTime Ago(this TimeSpan @this)
        => DateTime.UtcNow - @this;
}
```
The new version is  
- More concise
- Avoids duplication
- Separation of concerns

But there is now another layer of complexity (in the source code there is another refactoring too introducing another layer of abstraction for Using).

## Negating a Predicate
Having a Negate extension method gives a nice style when we want to show *non* prime numbers
```cs
public static class PredThing
{
    public static void Run()
    {
        // 1. Write a function that negates a given predicate: whenever the given predicate
        // evaluates to `true`, the resulting function evaluates to `false`, and vice versa.

        var numbers = new[] { 3, 5, 7, 9 };

        // function assigned to a variable takes an int and returns a bool
        Func<int, bool> isPrime = IsPrime;

        foreach (var prime in numbers.Where(isPrime.Negate()))
            Console.WriteLine(prime);
    }

    public static bool IsPrime(int number)
    {
        for (long i = 2; i < number; i++)
            if (number % i == 0)
                return false;
        return true;
    }

    // extension method on Func<t, bool>
    // returns a Func<T, bool>
    // negates a predicate
    public static Func<T, bool> Negate<T>(this Func<T, bool> pred)
    {
        return t => !pred(t);
    }
}
```

## Summary of Ch1 
FP can help make code more concise, maintainable, expressive, robust, testable, and concurrency-friendly.

FP focusses on data transformation rather than state mutation

FP is a collection of techniques based on
- Functions are first-class values
- In-place updates should be avoided

### What can I do now?
- Pass fn's around eg `Func<int,int> triple = x => x*3;i`
    - `list.select(x => triple(x))`
- Write more concise C# with LINQ skills improving!
- Higher Order Function - function that accepts and or returns a fn.
- Predicate - `Func<T, bool>` eg accepts an int, returns bool eg x%2==0
- Use HOF's to raise level of abstraction ie `.Where(IsPrime)`
- Use HOF's to encapsulate DB Connection
- Use nice extension method for time
- Use import static member to make code more concise eg Range
- Use `list.ForEach()` to Console.WriteLine out
- Use Expression Body syntax => as methods get smaller
- Understand lambda expressions (executable code with no method name)

## Chapter 2 - Pure and Impure Functions
As functions become pure they are easier to reason about correctness, test, understand, and performance is easier to enhance.  

In the example below he is taking the `// try 1` ListFormatter and making it a pure function  


```c#
using static System.Console;
using static System.Linq.Enumerable;

public static class Thing
{
    public static void Run()
    {
        var input = new List<string> { "coffee beans", "BANANAS", "Dates" };
        var output = new ListFormatter().Format(input);
        // Method group - same as writing x => WriteLine(x)
        output.ForEach(WriteLine);

        ListFormatter2.Format(input).ForEach(WriteLine);
        ListFormatter3.Format(input).ForEach(WriteLine);
    }
}

// Try 3 - no shared state, so easy to parallelise
static class ListFormatter3
{
    public static List<string> Format(List<string> list) =>
        list.AsParallel()
            .Select(StringExt.ToSentenceCase) 
            .Zip(ParallelEnumerable.Range(1, list.Count), (s, i) => $"{i}. {s}") // s is string, i is int
            .ToList();
}

// Try 2 - pure function as not using a mutable counter
static class ListFormatter2
{
    // when all variables required within a method are provided as input the method can be static
    public static List<string> Format(List<string> list) =>
        list
            .Select(StringExt.ToSentenceCase) // Method group
            .Zip(Range(1, list.Count), resultSelector: (s, i) => $"{i}. {s}") // s is string, i is int
            .ToList();
}

// Try 1
class ListFormatter
{
    int counter;

    // Impure function - mutates global state
    private string PrependCounter(string s)
    {
        return $"{++counter}. {s}";
    }

    // Pure and impure functions applied similarly
    // Expression body syntax C#6
    public List<string> Format(List<string> list)
        => list
            .Select(StringExt.ToSentenceCase) // Pure (Method Group)
            .Select(PrependCounter) // Impure as mutating global state
            .ToList();
}
public static class StringExt
{
    // Pure function (no side effects)
    // because its computation only depends on the input parameter it can be made static
    public static string ToSentenceCase(this string s)
        => s.ToUpper()[0] + s.ToLower().Substring(1);
}

public class ListFormatter_InstanceTests
{
    [Test]
    public void ItWorksOnSingletonList()
    {
        var input = new List<string> { "coffee beans" };
        var output =  ListFormatter3.Format(input);
        Assert.AreEqual("1. Coffee beans", output[0]);
    }

    [Test]
    public void ItWorksOnLongerList()
    {
        var input = new List<string> { "coffee beans", "BANANAS" };
        var output = ListFormatter3.Format(input);
        Assert.AreEqual("1. Coffee beans", output[0]);
        Assert.AreEqual("2. Bananas", output[1]);
    }

    [Test]
    public void ItWorksOnAVeryLongList()
    {
        var size = 100000;
        var input = Range(1, size).Select(i => $"item{i}").ToList();
        var output = ListFormatter3.Format(input);
        Assert.AreEqual("100000. Item100000", output[size - 1]);
    }
}
```
Try2 and Try3 are refactored versions to Pure Functions, which are very easy to test.

Interesting guideline on static methods:
- Make pure functions static
- Avoid mutable static fields
- Avoid direct calls to static methods the perform I/O

## Pushing Pure Boundary Outwards - Validation of DateTime
Using OO it is possible by injecting in a fake DateTime, but a lot of boilerplate.  

Here we are pushing the pure boundary outwards so we have a testable pure DateNotPassedValidator

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

## Injecting Functions as Dependencies  
As opposed to injecting an interface into the constructor of an object (pure DI)  

Here we are injecting the behaviour  

```c#
public sealed class BicExistsValidator : IValidator<MakeTransfer>
{
  readonly Func<IEnumerable<string>> getValidCodes;

  public BicExistsValidator(Func<IEnumerable<string>> getValidCodes)
  {
     this.getValidCodes = getValidCodes;
  }

  public bool IsValid(MakeTransfer cmd)
     => getValidCodes().Contains(cmd.Bic);
}

public class BicExistsValidatorTest
{
  static string[] validCodes = { "ABCDEFGJ123" };

  [TestCase("ABCDEFGJ123", ExpectedResult = true)]
  [TestCase("XXXXXXXXXXX", ExpectedResult = false)]
  public bool WhenBicNotFound_ThenValidationFails(string bic)
  {
      return new BicExistsValidator(() => validCodes)
          .IsValid(new MakeTransfer {Bic = bic});
  }
}
```
BicExistsValidator has no side effects other than the ones caused by invoking the passed in function getValidCodes therefore easy to test.

## Testing impure functions - BMI
This is more about refactoring code to get as much pure as possible

Also injecting the impure functions as dependencies  

```c#
// 1. Write a console app that calculates a user's Body-Mass Index:
//   - prompt the user for her height in metres and weight in kg
//   - calculate the BMI as weight/height^2
//   - output a message: underweight(bmi<18.5), overweight(bmi>=25) or healthy weight
// 2. Structure your code so that structure it so that pure and impure parts are separate
// 3. Unit test the pure parts
// 4. Unit test the impure parts using the HOF-based approach

using static Console;
using static Math;

public enum BmiRange { Underweight, Healthy, Overweight }

public static class Bmi
{
    public static void Run()
    {
        // Injecting functions as dependencies (so we are able to test the Run method below)
        // Passing impure functions into the Run HOF
        Run(Read, Write);
    }

    // HOF returns void, read is a function which takes a string a returns a double, write function that takes a BmiRange and returns void 
    internal static void Run(Func<string, double> read, Action<BmiRange> write)
    {
        // input
        // multiple declarators C#3
        // using the injected function to do a Console.Read and Parse to do a double
        double weight = read("weight")
             , height = read("height");

        // computation
        // static function and extension method on double easy to test as both pure functions
        var bmiRange = CalculateBmi(height, weight).ToBmiRange();

        // output
        // using injected function to Console.WriteLine
        write(bmiRange);
    }
    
    // Isolated the pure computational functions below from impure I/O
    internal static double CalculateBmi(double height, double weight)
       => Round(weight / Pow(height, 2), 2);

    internal static BmiRange ToBmiRange(this double bmi)
       => bmi < 18.5 ? BmiRange.Underweight
          : 25 <= bmi ? BmiRange.Overweight
          : BmiRange.Healthy;

    // Impure functions (will not test)
    // I/O always considered a side effect (as what happens in the outside world will effect the double returned)
    private static double Read(string field)
    {
        WriteLine($"Please enter your {field}");
        return double.Parse(ReadLine());
    }

    private static void Write(BmiRange bmiRange)
       => WriteLine($"Based on your BMI, you are {bmiRange}");
}

public class BmiTests
{
    // Easy to test the pure computational functions!
    [TestCase(1.80, 77, ExpectedResult = 23.77)]
    [TestCase(1.60, 77, ExpectedResult = 30.08)]
    public double CalculateBmi(double height, double weight)
       => Bmi.CalculateBmi(height, weight);

    // testing ToBmiRange
    [TestCase(23.77, ExpectedResult = BmiRange.Healthy)]
    [TestCase(30.08, ExpectedResult = BmiRange.Overweight)]
    public BmiRange ToBmiRange(double bmi) => bmi.ToBmiRange();

    // testing Run
    // this is good as testing the actual output of the program (and not just units)
    // just not testing the impure functions (faking them)
    [TestCase(1.80, 77, ExpectedResult = BmiRange.Healthy)]
    [TestCase(1.60, 77, ExpectedResult = BmiRange.Overweight)]
    public BmiRange ReadBmi(double height, double weight)
    {
        var result = default(BmiRange);
        // defining two pure fake functions to pass into the HOF
        // takes a string as input (the field name) and returns a double
        // we don't need to double.Parse as we control the test data
        Func<string, double> read = s => s == "height" ? height : weight;
        // takes a BmiRange and returns void 
        // uses a local variable (result) to hold the value of BmiRange passed into the function, which the test returns
        Action<BmiRange> write = r => result = r;
        Bmi.Run(read, write);
        return result;
    }
}
```

## Testing Impure Functions - Prime
A simplification of the pattern used above to inject impure functions as dependencies into a HOF constructor
```c#
static class Prime
{
    public static void Run()
    {
        // Injecting functions as dependencies (so we are able to test the Run method)
        // passing impure functions into the Run HOF
        Run(Read, Write);
    }

    // HOF returns void, read is a function which takes a string a returns a double,
    // write function that takes a bool and returns void 
    internal static void Run(Func<int> read, Action<bool> write)
    {
        // input
        // using the injected function to do a Console.Read and Parse to do an int
        int number = read();

        // computation
        // static function easy to test
        bool isNumberPrime = IsPrime(number); 

        // output
        // using injected function to Console.WriteLine
        write(isNumberPrime);
    }

    // Pure function
    internal static bool IsPrime(int number)
    {
        for (long i = 2; i < number; i++)
            if (number % i == 0)
                return false;
        return true;
    }

    // Impure function (will not test)
    // I/O always considered a side effect (as what happens in the outside world will effect the int returned)
    private static int Read()
    {
        WriteLine("Please enter an int");
        return int.Parse(ReadLine());
    }

    // Impure function (will not test)
    private static void Write(bool isPrime)
        => WriteLine($"isPrime: {isPrime}");
}

public class PrimeTests
{
    [TestCase(3, ExpectedResult = true)]
    [TestCase(4, ExpectedResult = false)]
    [TestCase(5, ExpectedResult = true)]
    [TestCase(6, ExpectedResult = false)]
    public bool IsPrime_Simple(int number)
    {
        var result = Prime.IsPrime(number);
        return result;
    }
}
```

## Summary of Ch2
- Functions with side effects (eg I/O, DateTime) are impure.
- Inject in impure functions (Read and Write above)
- Use parameterised unit tests


## Chapter 3 - Function Signatures and Types

## Arrow Notation
f : int -> string  
"f has type int to string"  
`Func<int, string>`o

## Data Objects
Primitive Types are often not specific enough eg Age  

In FP:  
- Logic is encoded in functions  
- Data is captured in data objects (so no logic), which are used as inputs and outputs to these functions  


### Constraining inputs
structs are value types - he uses a struct here
classes are reference types

### Honest functions
An honest function will always abide by its signature (ie should never throw an exception)
```c#
// Data object / custom type / anemic objects that can only represent a valid value for an age
public class Age
{
    private int Value { get; }
    public Age(int value)
    {
        if (!IsValid(value))
            // Age can only be instantiated with a valid value - but Dishonest (can not return Age as it can throw)
            throw new ArgumentException($"{value} is not a valid age"); // see below for Option improvement

        Value = value;
    }

    private static bool IsValid(int age)
        => 0 <= age && age < 120;

    // logic for comparing an Age with another Age
    public static bool operator <(Age l, Age r) => l.Value < r.Value;
    public static bool operator >(Age l, Age r) => l.Value > r.Value;

    // for readability make it possible to compare an Age with an int.
    // the int will first be converted to an Age
    public static bool operator <(Age l, int r) => l < new Age(r);
    public static bool operator >(Age l, int r) => l > new Age(r);

    public override string ToString() => Value.ToString();
}

public static class AgeThing
{
    public static void Run()
    {
        WriteLine("hello!");
        var result = CalculateRiskProfile(new Age(20));
    }

    // Honest function - it honours its signature ie you will always end up with a Risk
    // it will never blow up with a runtime error as Age has to be valid
    public static Risk CalculateRiskProfile(Age age)
        => (age < 60) ? Risk.Low : Risk.Medium;

    // Dishonest function - it will not always abide by its signatured
    // ie will sometimes throw an exception
    public static Risk CalculateRiskProfileDishonest(int age)
    {
        if (age < 0 || 120 <= age)
            throw new ArgumentException($"{age} is not a valid age");

        return (age < 60) ? Risk.Low : Risk.Medium;
    }
}

public enum Risk { Low, Medium, High }

public class AgeTests
{
    [Test]
    public void CalculateRiskProfile_Simple()
    {
        var result = AgeThing.CalculateRiskProfile(new Age(20));
        Assert.AreEqual(Risk.Low, result);
    }
    [Test]
    public void CalculateRiskProfile_SimpleMedium()
    {
        var result = AgeThing.CalculateRiskProfile(new Age(60));
        Assert.AreEqual(Risk.Medium, result);
    }
}
```
honest functions - will always abide by its signature (and not throw an exception for example)
using the operator keyword to help compare between int and Age  

Should model objects in a way that gives you fine control over the range of inputs that your functions will need to handle.

## Absence of data with Unit - Put Timings on functions
Many functions are called for their side effects and return void. Unit is a type (we will use an empty Tuple) that can be used to represent the absence of data.

Void isn't ideal when working with Action and Func so use Unit ie System.ValueTuple:

```c#
using static ConsoleApp1.Chapter3.Instrumentation.F;
using Unit = System.ValueTuple; // empty tuple can only have 1 possible value,  so its as good as no value

namespace ConsoleApp1.Chapter3.Instrumentation
{
    public static class Instrumentation
    {
        // Function returns T - in the case below it is string
        public static T Time<T>(string op, Func<T> f)
        {
            var sw = new Stopwatch();
            sw.Start();

            // run the function returning T
            T t = f();

            sw.Stop();
            Console.WriteLine($"{op} took {sw.ElapsedMilliseconds}ms");
            return t;
        }

        // Had to overload Time just to get Action working
        //public static void Time(string op, Action act)
        //{
        //    var sw = new Stopwatch();
        //    sw.Start();

        //    act();

        //    sw.Stop();
        //    Console.WriteLine($"{op} took {sw.ElapsedMilliseconds}ms");
        //}
    }

    // write an adapter function to modify existing function to convert an Action into a Func<Unit>
    public static class F
    {
        // convenience method that allows you to write return Unit() in functions that return Unit.
        public static Unit Unit() => default(Unit);
    }

    public static class ActionExt
    {
        // extension method on Action that returns Func<Unit>
        public static Func<Unit> ToFunc(this Action action)
        {
            // local function
            Unit Func()
            {
                action();
                // Unit() is F.Unit() which is default(Unit) - Unit() is just a shorthand
                return Unit();
            }

            // could refactor this lambda to a method group
            return () => Func();
        }

        // extension method on Action that returns Func<Unit>
        public static Func<Unit> ToFunc2(this Action action)
        {
            // return a lambda which takes no parameters
            return () =>
            {
                action(); // run the action function
                return Unit(); // return the System.ValueTuple ie our concept of nothing
            };
        }

        // Adapter function for Action<T> ie takes T as a parameter and returns Unit
        public static Func<T, Unit> ToFunc<T>(this Action<T> action)
            => (t) =>
            {
                action(t);
                return Unit();
            };
    }

    public static class InstrumentationThing
    {
        public static void Run()
        {
            Console.WriteLine("hello!");
            var filename = @"..\..\..\file.txt";
            // Function returns a string (the contents of the file)
            // lambda expression - there are no input parameters so ()
            Func<string> read = () => File.ReadAllText(filename);

            //var contents = Instrumentation.Time("reading from file.txt" , () => File.ReadAllText("file.txt"));
            var contents = Instrumentation.Time("reading from file.txt", read);
            Console.WriteLine($"contents: {contents}");

            // but what about a void returning function which takes no parameters 
            //Action write = () => File.AppendAllText(filename, "New content!", Encoding.UTF8);
            Action write = () => File.AppendAllText(filename, "New content!", Encoding.UTF8);
            
            // uses adapter function .ToFunc() to return a ValueTuple (Unit)
            Instrumentation.Time("writing to file.txt", write.ToFunc());
        }
    }
}
```
Unit concept which returns a ValueTuple which is our representation of nothing.  

Adapter function to change Action<> which is void returning function to a Func<Unit>

## Option Type
Option is a container that wraps a value...or no value.
- None - the Option is None
- Some(T) - the Option is Some

Option also called Maybe (Haskell)
- Nothing
- Just

```c#
using static LaYumba.Functional.F;
public static class OptionThing
{
    public static void Run()
    {
        // creates an Option in the None state
        // convention to use _ when a variable is ignored
        // note this is not a C#7 discard https://stackoverflow.com/questions/42920622/c7-underscore-star-in-out-variable/42924200
        // normal variable  with identifier _
        Option<string> _ = None;

        // Option is in the Some state
        Option<string> john = Some("John");

        // want to run different code based on if the Option is None or Some
        string result = Greet(_); // Sorry, who?
        string r2 = Greet("Dave"); // Hello, Dave
        string r3 = Greet(john); // Hello, John

        // 2. Subscriber
        var dave = new Subscriber { Name = "Dave", Email = "davemateer@gmail.com" };
        var newsletter = GreetingFor(dave); // Dear DAVE
        var anon = new Subscriber { Email = "anon@gmail.com" };
        var n2 = GreetingFor(anon); // Dear Subscriber

        // 3. Parsing strings
        // Int.Parse if defined below to return an Option<int>
        Option<int> i1 = Int.Parse("10"); // Some(10)

        // forcing the caller to deal with the None case 
        string rb = i1.Match(
                () => "Not an int!",
                i => $"number is {i}"
             );
        Console.WriteLine(rb);

        // don't want to be able to do i1.HasValue() as this defeats the idea
        // point is we want to make unconditional calls to the content without testing whether the content is there
        Option<int> i2 = Int.Parse("hello"); // None
        int asdf = i2.Match(
            () => 0, // so if the original parse fails, we set it to 0
            x => x); // asdf is 0

    }

    public static string Greet(Option<string> greetee) =>
        // Match (essentially this is a null check) takes 2 functions - for None and Some
        greetee.Match(
            None: () => "Sorry, who?",
            Some: (name) => $"Hello, {name}"
        );

    // conceptually Greet is similar to Greet2
    public static string Greet2(string name)
        => (name == null)
            ? "Sorry, who?"
            : $"Hello, {name}";

    // 2. By using Option you're forcing  the users of the API to handle the case in which no data is available
    // trading run time errors, for compile time errors
    public static string GreetingFor(Subscriber subscriber) =>
        subscriber.Name.Match(
            () => "Dear Subscriber",
            name => $"Dear {name.ToUpper()}");
}

public static class Int
{
    public static Option<int> Parse(string s) => int.TryParse(s, out var result) ? Some(result) : None;
}

public class Subscriber
{
    // rather than nullable, the Name is now optional
    public Option<string> Name { get; set; }
    public string Email { get; set; }
}

```
None should be used instead of null, and Match instead of a null-check

## Smart Constructor Pattern
```c#
using static F;
// data object / custom type / anemic objects that can only represent a valid value for an age
// structs are value types - he uses a struct here
// classes are reference types
public class Age
{
    private int Value { get; }

    // smart constructor
    public static Option<Age> Of(int age)
        => IsValid(age) ? Some(new Age(age)) : None;
    // private ctor
    private Age(int value)
    {
        if (!IsValid(value))
            // Age can only be instantiated with a valid value
            throw new ArgumentException($"{value} is not a valid age"); 

        Value = value;
    }

    private static bool IsValid(int age)
        => 0 <= age && age < 120;

    // logic for comparing an Age with another Age
    public static bool operator <(Age l, Age r) => l.Value < r.Value;
    public static bool operator >(Age l, Age r) => l.Value > r.Value;

    // for readability make it possible to compare an Age with an int.
    // the int will first be converted to an Age
    public static bool operator <(Age l, int r) => l < new Age(r);
    public static bool operator >(Age l, int r) => l > new Age(r);

    public override string ToString() => Value.ToString();
}

public static class AgeThing
{
    public static void Run()
    {
        Console.WriteLine("hello!");
        //var result = CalculateRiskProfile(new Age(20));
        // this isn't going to work as we need to handle the None case in the Option<Age>
        //var result = CalculateRiskProfile(Age.Of(20));

        // regular variable pointing to a function
        // taking a string and returning an Option<Age>
        // using Bind!!!
        Func<string, Option<Age>> parseAge = s => Int.Parse(s).Bind(Age.Of);

        var a = parseAge("26"); // => Some(26)

        // how to work with Option<Age>?
        // Match is easiest
    }

    // honest function - it honours its signature ie you will always end up with a Risk
    // it will never blow up with a runtime error as Age has to be valid
    public static Risk CalculateRiskProfile(Age age)
        => (age < 60) ? Risk.Low : Risk.Medium;
}

public enum Risk { Low, Medium, High }
```
## Summary
- Make functions as specific as possible
- Make functions honest - output should be of expected type - no Exceptions, no nulls
- Use custom types to constrain input values 
- Use smart constructors to instantiate
- Use Option to express the possible absence of a value
- To execute code conditionally use Match

## Examples (Ch 3)
```c#
using static F;
public static class ExamplesThing
{
    public static void Run()
    {
        // 1 Write a generic function that takes a string and parses it as a value of an enum. It
        // should be usable as follows:

        Option<DayOfWeek> a = Enum.Parse<DayOfWeek>("Friday"); // => Some(DayOfWeek.Friday)
                                                               // Enum.Parse<DayOfWeek>("Freeday") // => None

        // 2 Write a Lookup function that will take an IEnumerable and a predicate, and
        // return the first element in the IEnumerable that matches the predicate, or None
        // if no matching element is found. Write its signature in arrow notation:

        bool isOdd(int i) => i % 2 == 1;
        var b = new List<int>().Lookup(isOdd); // => None
        var c = new List<int> { 1 }.Lookup(isOdd); // => Some(1)

        // 3 email thing
        // Email is a type using a smart constructor to return a new Email(string) if the string is valid
        Option<Email> email = Email.Create("davemateer@gmail.com"); 
    }
    // Lookup : IEnumerable<T> -> (T -> bool) -> Option<T>
    public static Option<T> Lookup<T>(this IEnumerable<T> ts, Func<T, bool> pred)
    {
        foreach (T t in ts) 
            // return the first element that matches the predicate
            if (pred(t)) return Some(t);
        return None;
    }

}

// 3 Write a type Email that wraps an underlying string, enforcing that it’s in a valid
// format. Ensure that you include the following:
// - A smart constructor
// - Implicit conversion to string, so that it can easily be used with the typical API
// for sending emails

public class Email
{
    static readonly Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");

    private string Value { get; }

    private Email(string value) => Value = value;

    public static Option<Email> Create(string s)
        => regex.IsMatch(s)
            ? Some(new Email(s))
            : None;

    public static implicit operator string(Email e)
        => e.Value;
}

enum DayOfWeek
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

```

## Level of abstraction
Try to work on higher levels of abstraction (not primitives) eg in Linq

## Chapter 4 - Patterns in Functional Programming  

### Map (Select)
IEnumerable and Option are functors  
Anything that has a reasonable implementation of map is a `functor`. Essentially should apply a function to the containers inner values, and should have no side effects.   

Map for logic and ForEach for side effects

```cs
Option<string> name = Some("Enrico");

name
   .Map(String.ToUpper) // Maps works on Option
   .ForEach(WriteLine); // Foreach similar to Map, but takes an Action rather than a function, so its used to perform side effects

IEnumerable<string> names = new[] { "Constance", "Brunhilde" };

names
   .Map(String.ToUpper) // Map works on IEnumerable (so Option an IEnumerable are specialised containers)
   .ForEach(WriteLine);
```

### Chaining functions with Bind
Bind is like Map but can flatten. 

Here we have 2 functions which return an Option:  
- Int.Parse(s)  
- Age.Of(x)

If we combine them with Map (select):  
```cs
// Apply the Age.Of function to each element of the optI (single, could be None)
// 2 Option types combined give us this problem to work with
Option<int> optI = Int.Parse(s);
Option<Option<Age>> ageOpt = optI.Map(x => Age.Of(x));
```

### Using Bind to compose 2 functions that return an Option
```cs
// Using Bind to chain two functions that return Option so we get a flattened Option<age>
return Int.Parse(s)
    .Bind(x => Age.Of(x));
```

And here is the full example 
```cs
public static class AskForValidAgeAndPrintFlatteringMessage
{
    // Reads users age from console
    // prints out related message
    // Error handling - the age should be valid!
    // Notice lack of if..else statements. Operating on higher level of abstraction with Option so handled

    public static void Run()
        => WriteLine($"Only {ReadAge()}! That's young!");

    static Age ReadAge()
        => ParseAge(Prompt("Please enter your age")).Match(
         () => ReadAge(), // if ParseAge come back as None prompt again
         (age) => age);

    static string Prompt(string prompt)
    {
        WriteLine(prompt);
        return ReadLine();
    }

    static Option<Age> ParseAge(string s)
    {
        // Apply the Age.Of function to each element of the optI (single, could be None)
        // 2 Option types combined give us this problem to work with
        //Option<int> optI = Int.Parse(s);
        //Option<Option<Age>> ageOpt = optI.Map(x => Age.Of(x));

        // Using Bind to chain two functions that return Option so we get a flattened Option<age>
        return Int.Parse(s)
              .Bind(x => Age.Of(x));
    }
}

public class Age
{
    private int Value { get; }
    // private ctor - enforcing that Value can only be set on instantiation
    private Age(int value) => Value = value;

    private static bool IsValid(int age)
        => 0 <= age && age < 120;

    // smart constructor that creates an Age instance from the given int (returns an Option)
    public static Option<Age> Of(int age)
        => IsValid(age) ? Some(new Age(age)) : None;

    public override string ToString() => Value.ToString();
}
```

### Using Bind to flatten a nested list
```cs

class PetsInNeighbourhood
{
    // flattening nested lists with Bind
    // internal modifier is assembly scope (as opposed to private which is class scope)
    internal static void Run()
    {
        var neighbours = new[]
        {
            new {Name = "John", Pets = new Pet[] {"Fluffy", "Thor"}},
            new {Name = "Tim", Pets = new Pet[] {}},
            //new {Name = "Carl", Pets = new Pet[] {"Sybil"}},
            new {Name = "Carl", Pets = new[] {new Pet("Sybil")}},
        };

        IEnumerable<IEnumerable<Pet>> nested = neighbours.Map(n => n.Pets);
        // Flattening a nested list
        IEnumerable<Pet> flat = neighbours.Bind(n => n.Pets);
    }
}

// this implementation is confusing (implicit operator style)
internal class Pet
{
    // private readonly string name;
    // generally considered better to wrap in a property
    private string Name { get; }

    //private Pet(string name) => this.Name = name;
    public Pet(string name) => this.Name = name;

    // when we pass a string to Pet
    // it knows to return a new Pet with that name
    public static implicit operator Pet(string name)
        => new Pet(name);
}
```


Functors are types for which a suitable Map function is defined eg IEnumerable, Option  
Monads are types for which a Bind function is defined eg IEnumerable, Option

### The Return Function
In addition to the Bind function, monads must able have a Return function that lifts a normal value T into a monadic value C<T>. For Option this is the Some function. For IEnumerable he has created a List function.

```cs
internal static void Run()
{
    // List is a function which returns an immutable list for the monad IEnumerable
    IEnumerable<string> empty = List<string>();

    var singleton = List("Dave");

    // nice shorthand syntax for initialising immutable lists
    var many = List("Dave", "Bob", "Alice");
}
```

### The Where Function
Can easily use Where in relation to Option:

```cs
    var a = ToNatural("2"); // Some(2)
    var b = ToNatural("-2"); // None
    var c = ToNatural("hello"); // None
}

// Parse is a function that does the int parse and reuturns Some or None
static Option<int> ToNatural(string s) => Int.Parse(s).Where(IsNatural);

static bool IsNatural(int i) => i >= 0;
```

## Coding at different levels of abstraction
- Regular values such a T (int, Employee etc..)
- Elevated levels eg IEnumerable<>

These elevated levels enable us to better work with the represent operations on the underlying types.  

If you always deal with regular values, you'll probably be stuck with low-level operations such as for loops, null checks etc.. This is inefficient and error-prone

## Examples
Business logic coming into Elevated levels of abstraction. Using Bind a lot to flatten Option, and Map when working with Option.  

```cs
using System.Collections.Generic;
using static F;

class PetsInNeighbourhood
{
    internal static void Run()
    {
        var employees = new Dictionary<string, Employee>();
        employees.Add("dave", new Employee{Id = "dave", WorkPermit = 
            Some(new WorkPermit{Number = "123", Expiry = DateTime.Now.AddDays(-1)})});

        var a = GetWorkPermit(employees, "dave");

        var b = GetValidWorkPermit(employees, "dave");
    }

    static Option<WorkPermit> GetWorkPermit(Dictionary<string, Employee> employees, string employeeId)
        // Lookup is a function which looks up the dictionary key returning an Option
        // Bind is like Map (Select) except it returns a flattened list. Monad.
        => employees.Lookup(employeeId).Bind(e => e.WorkPermit);

    static Option<WorkPermit> GetValidWorkPermit(Dictionary<string, Employee> employees, string employeeId)
        => employees
            .Lookup(employeeId)
            .Bind(e => e.WorkPermit)
            .Where(HasExpired.Negate());

    static Func<WorkPermit, bool> HasExpired => permit => permit.Expiry < DateTime.Now.Date;


    // 4 Use Bind to implement AverageYearsWorkedAtTheCompany, shown below (only
    // employees who have left should be included).
    static double AverageYearsWorkedAtTheCompany(List<Employee> employees)
        => employees
            .Bind(e => e.LeftOn.Map(leftOn => YearsBetween(e.JoinedOn, leftOn)))
            .Average();

    static double YearsBetween(DateTime start, DateTime end)
        => (end - start).Days / 365d;
}

public struct WorkPermit
{
    public string Number { get; set; }
    public DateTime Expiry { get; set; }
}

public class Employee
{
    public string Id { get; set; }
    public Option<WorkPermit> WorkPermit { get; set; }

    public DateTime JoinedOn { get; }
    public Option<DateTime> LeftOn { get; }
} 
```

## Broken Link Checker using Option and Bind

```cs
// 1. Input (impure)
// Get the raw html (or not - will return None if not)
Option<string> html = GetHtml(baseURL);

// 2. Compute
// Bind the html to GetHrefs - in the event of None in html this returns an empty list 
IEnumerable<string> hrefs = html.Bind(GetHrefs);

/// 
public static Option<string> GetHtml(string url)
{
    var handler = new HttpClientHandler();
    var httpClient = new HttpClient(handler);
    try
    {
        HttpResponseMessage rm = httpClient.GetAsync(url).Result;
        string html = rm.Content.ReadAsStringAsync().Result;
        return Some(html);
    }
    catch (Exception ex)
    {
        return None; // Nice and clean - will improve upon later
    }
}

/// 
public static IEnumerable<string> GetHrefs(string html)
{
    var doc = new HtmlDocument();
    doc.LoadHtml(html);
    var hyperlinks = doc.DocumentNode.Descendants("a")
        .Select(a => a.GetAttributeValue("href", null))
        .Where(u => !IsNullOrEmpty(u))
        .Distinct();
    return hyperlinks;
}

```
So this is becoming very nice as we don't have null checking and branching code. It is all very clean. In Chapter 6 we will look at how to handle exceptions as currently we're swallowing it, and returning None.

### Summary

- Structures like Option<T> and IEnumerable<T> can be seen as containers or abstractions allowing you to work more effectively with the underlying values of type T.
- Regular values eg T, elevated values eg Option<T>, IEnumerable<T>
- Some core functions of FP allow you to work effectively with elevated values:
    - Map (Select) applies a function to the inner value(s) and returns a new structure
    - Bind maps an Option returning function onto an Option and flattens the result to avoid a nested Option. Similarily for IEnumerable and other structures
    - Where filters the inner value(s) of a structure according to a given predicate
- Types for which Map is defined are called Functors. Types for which Return and Bind are defined are called Monads


## Chapter 5 - Functional Composition  
```cs
static class Thing
{
    internal static void Run()
    {
        var joe = new Person { First = "Joe", Last = "Bloggs" };
        // method chaining
        // preferable way of achieving functional composition in C#
        var email = joe.AbbreviateName().AppendDomain(); // jobl@manning.com

        // composition in an elevated world
        Option<Person> p = Some(new Person {First = "Joe", Last = "Bloggs"});
        Option<string> a = p.Map(AbbreviateName).Map(AppendDomain);
    }

    static string AbbreviateName(this Person p) => 
        Abbreviate(p.First) + Abbreviate(p.Last);

    static string AppendDomain(this string localPart) =>
        $"{localPart}@manning.com";

    static string Abbreviate(string s) => 
        s.Substring(0, 2).ToLower();
}

class Person
{
    public string First { get; set; }
    public string Last { get; set; }
}
```


## Chapter 6 - Functional Error Handling  
A big chapter starting with:

Either Type  
- Left indicates failure (convention)   
- Right indicates success  

Either is more verbose than Option - which is expected as we choose Either when we need to be explicit about failure conditions.  

Here is a more fully worked example than is in the book - showing a validation pipeline. If it fails validation at any stage it wont go to the next. The reason it failed also comes up as a custom Validation type. We use Either for Left (fail) and Right (Success) which both bring back different types ie Rejection and Candidate

```cs
static class Thing
{
    internal static void Run()
    {
        var dave = new Candidate { Name = "Dave" };
        Either<Rejection, Candidate> result = InterviewEither.FirstRound(dave);
        var output = GetMessage(result); // Success Dave!

        string GetMessage(Either<Rejection, Candidate> res) =>
            res.Match(
                Left: r => $"Rejected due to {r.reason}", // r is our custom type Rejection
                Right: x => $"Success {x.Name}!"
            );

        var bob = new Candidate { Name = "Bob" };
        var result2 = InterviewEither.FirstRound(bob);
        var output2 = GetMessage(result2); // Rejected due to Bob always fails interviews
    }
}

static class InterviewEither
{
    // we have a validation pipeline whereby
    // if it fails at any point it wont go deeper
    public static Either<Rejection, Candidate> FirstRound(Candidate c)
        => Right(c) // setting Right type to be candidate
            .Bind(CheckEligibility)
            .Bind(Interview);

    static Either<Rejection, Candidate> CheckEligibility(Candidate c)
    {
        // delegate variable ie just a pointer to a function
        Func<Candidate, bool> IsEligible = x => x.Name != "Alice";
        if (IsEligible(c)) return c;
        return new Rejection("Not eligible");
    }

    static Either<Rejection, Candidate> Interview(Candidate c)
    {
        if (c.Name == "Bob") return new Rejection("Bob always fails interviews");
        return c;
    }
}

class Candidate
{
    public string Name { get; set; }
}
class Rejection
{
    public string reason { get; set; }

    public Rejection(string reason)
    {
        this.reason = reason;
    }
}
```

### Railway Oriented Programming
[Scott Wlaschin - article and video on ROP Error Handling](http://fsharpforfunandprofit.com/rop/)
- Main track (happy path)
- Parallel track on the Left
- Once you are on the Left track, you stay on it until the end
- If you're on the Right track, with each function application, you will either process along the Right track, or be diverted to the Left track.
- Match is the end of the road, where the disjunction of the parallel tracks takes place.

## Validation - perfect use case for Either  




Then more specialised types:  
- Validation<T>  
- Exception<T>  


Validation










## Other
statement - doesn't return a value
expression - returns a value

static methods 
instance methods

primitive (obsession!)


functions 
closures
HOFs

monads / flatmap
## TOSORT OUT
Interviews, talking to colleagues, writing blogs or presenting at conferences, I like to use a common language to describe concepts. Some of the great educators eg K Scott Allen are very precise in how they talk technically.  

These definitions are in relation to C#. I'll provide more detail as a reference to: Wikipedia, Microsoft documentation and detailed links. 

Separation and encapsulation

**TODO** show evolution of this type of program to a GOSUB which is Procedural?  
Then what should an OO app look like, and what actual OO apps look like  
What an FP looks like  
```c#
10 PRINT "Hello world"
20 GOTO 10
```

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

