---
layout: post
title:  "Language Terms"
menu: review
categories: language 
published: true 
comments: true
sitemap: false
---
Whether it be in an interview situation, talking to colleagues, writing blogs or presenting at conferences, I like to use a common language to describe concepts. Some of the great educators eg K Scott Allen are very precise in how he talks about a subject.


## Styles
- Imperative
   easier to write
   hard to read
   hard to maintain

- Functional 
   hard to write
   easy to read
   easy to maintain
   easy to parallelize

   What is FP
   Functions
  first-class
  pure
  higher order
  composition
  expressions (ie not statements)
Immutability

- OO

Separation and encapsulation

## Class / Type
usually class name in C# is PascalCasing (as opposed to camelCasing in Java)
create an instance of a class

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

closures


![ps](/assets/2018-11-07/2.png)