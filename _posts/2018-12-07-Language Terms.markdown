---
layout: post
title:  "Language Terms"
menu: review
categories: language 
published: true 
comments: false
sitemap: false
---
Interviews, talking to colleagues, writing blogs or presenting at conferences, I like to use a common language to describe concepts. Some of the great educators eg K Scott Allen are very precise in how they talk technically.  

These definitions are in relation to C#. I'll provide more detail as a reference to: wikipedia, microsoft documentation and detailed links. 

## Programming Paradigm 
[Programming paradigms](https://en.wikipedia.org/wiki/Programming_paradigm) are a way to classify programming languages based on their features. [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language) is classified in [6 different paradigms](https://en.wikipedia.org/wiki/Comparison_of_multi-paradigm_programming_languages)

- Imperative (contrasted with Declaritive)
   [Imperative programming](https://en.wikipedia.org/wiki/Imperative_programming) uses statements to change a program's state. eg C#

   - [Procedural](https://en.wikipedia.org/wiki/Procedural_programming) groups instructions into procedures eg C, BASIC
   - [Object Oriented](https://en.wikipedia.org/wiki/Object-oriented_programming) groups instructions together with the part of the state they operate on eg Java, C#, Lisp


* Declaritive (contrasted with Imperative)
   [Declaritive programming](https://en.wikipedia.org/wiki/Declarative_programming) expresses logic of a computation without describing its control flow. eg SQL, regex, functional programming
    - [Functional programming](https://en.wikipedia.org/wiki/Functional_programming) evaluation of functions, avoids changing state eg Lisp, Clojure, Erlang, Haskell, F#, SQL (this domain specific language uses some elements of FP), C#

## History
- Machine code - first generation language
- Assembly - second generation
- Procedural - third generation
- Object oriented
- Declaritive - fourth generation

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
```c#
public class Person
{
    // Auto-implemented property
    public string Name { get;set; }

    // Public field - unusual
    public int age;


    // Constructor that takes an argument
    public Person(string name)
    {
        Name = name;
    }

    // Method using Expression bodied memmber (C#7)
    public string Greeting() => $"Hello {Name}";
}

class Program
{
    static async Task Main()
    {
        // create an object of type Person 
        // passing a value to the constructor
        // which will set the public property
        var person = new Person("Dave");

        Console.WriteLine(person.Greeting())
    }
}
```
[Properties](https://docs.microsoft.com/en-us/dotnet/csharp/properties)  **HERE in broken link scratch
[Static async Main in C#7.1](https://blogs.msdn.microsoft.com/mazhou/2017/05/30/c-7-series-part-2-async-main/)


Access modifier is public here



properties - PascalCase  
fields - usually private and camelCase or _camelCase  
to hold state

constructor
invoke a method
  to implement behaviours

static method

## Arguments vs Parameters
pass an argument (value) and accept a parameter (reference to that value)
```c#
Foo(1, 2);  // 1 and 2 are arguments
void Foo(int x, int y); // x and y are parameters
```
# FP
Why FP
Easier
Easier to test
less code
get stuff done faster

- Funcs
- Delegate
   allow us to create variables that point to methods

Action - delegate (pointer) to a method that takes 0, one for more input parameters but does not return anything
Func - same as above but returns a value (or reference)


lambda expressions
They are a way to define a method
Lambda expression are a way to create executable code


## Higher Order Functions
This HOF takes a function as an argument (functions that depend on other functions) 
```c#
// Higher Order Function - second parameter Func is another function which takes an int parameter
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

static void Main()
{
    // a Func is a delegate 
    // a delegate allows us to create a variable to point to a method
    // lambdas can declare a function inline
    // lambda expression is an easy way to define a method
    // which takes an int here and returns an int
    Func<int, int> timesThree = x => x * 3;
    var result = timesThree(2); // 6

    // anonymous method
    // delegate allows us to create a variable to point to a method
    //Func<int, int> triple = delegate(int x) { return x * 3; };

    // a local function (using expression body syntax) is similar
    //int triple(int x) => x * 3;

    var numbers = new[] { 3, 5, 7, 9 };
    foreach (var prime in numbers.Find(IsPrime))
        Console.WriteLine(prime);

    // pass a lambda into the HOF - receives an int, returns a bool
    // x would be be number inside the HOF
    var resultb = numbers.Find(x => x % 3 == 0);
}

```

functions 
closures
HOFs

monads / flatmap


![ps](/assets/2018-11-07/2.png)