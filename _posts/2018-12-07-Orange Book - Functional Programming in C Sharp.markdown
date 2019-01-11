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
Learning by example is how more seasoned developers tend to work best (* link to research papers?).  I've taken this strategy in my FP exploration writing   

- Action - pointer (delegate) to a method that can take parameters and returns nothing
- Func - pointer (delegate)  to a method that can take parameters, and returns something

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
    .Where(x => x % 20 == 0) // filter with a predicate (a function which returns a bool) here using a lambda expression so only get 20,40..
    .OrderBy(x => -x) // sort by descending into a new sequence
    .Select(x => $"{x}%"); // map each numerical value to a string suffixed by a % into a new sequence

```
- Lambda expressions - are a way to define a method / create executable code without a method name

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
As functions become pure they are easier to reason about correctness, test, understand, and performance is easier to enhance.  

In the example below he is taking the // try 1 ListFormatter and making it a pure function  


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
BicExistsValidator has no side effects other than the ones caused by invoking the passed in function getValidCodes

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
        // injecting functions as dependencies (so we are able to test the Run method)
        // passing impure functions into the Run HOF
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

    // Impure function (will not test)
    // I/O always considered a side effect (as what happens in the outside world will effect the double returned)
    private static double Read(string field)
    {
        WriteLine($"Please enter your {field}");
        return double.Parse(ReadLine());
    }

    // Impure function (will not test)
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
        // injecting functions as dependencies (so we are able to test the Run method)
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

    // pure function
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

## Ch3 - Data Objects -  Primitive Types are often not specific enough eg Age
In FP:  
- Logic is encoded in functions  
- Data is captured in data objects, which are used as inputs and outputs to these functions  


```c#
// data object / custom type / anemic objects that can only represent a valid value for an age
// structs are value types - he uses a struct here
// classes are reference types
public class Age
{
    private int Value { get; }
    // Age can only be instantiated with a valid value
    public Age(int value)
    {
        if (!IsValid(value))
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
        Console.WriteLine("hello!");
        var result = CalculateRiskProfile(new Age(20));
    }

    // honest function - it honours its signature ie you will always end up with a Risk
    // it will never blow up with a runtime error as Age has to be valid
    public static Risk CalculateRiskProfile(Age age)
        => (age < 60) ? Risk.Low : Risk.Medium;

    // dishonest function - it will not always abide by its signature
    // ie will sometimes throw an ArgumentException
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

## Absence of data with Unit
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
        // point is we want to make unconditional calls to the contens without testing whether the content is there
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