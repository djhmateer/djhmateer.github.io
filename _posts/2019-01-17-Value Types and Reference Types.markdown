---
layout: post
title: Value Types and Reference Types 
description: Overview of Value Types, Reference types and immutability. Looking at the benefits of avoiding mutation and what types are Value Reference and which are the outliers, and why it doesn't matter.
#menu: review
categories: Functional C# 
published: true 
comments: true
sitemap: true
image: /assets/2019-04-05/1.jpg
---

![ps](/assets/2019-04-05/1.jpg)  

If we follow the [functional paradigm](/2019/01/11/Learning-Functional-Programming-in-C-Sharp), we should refrain from state mutation altogether: once created, an object never changes.  This is the subject of [an entire chapter of the C# FP Orange Book](https://livebook.manning.com/#!/book/functional-programming-in-c-sharp/chapter-9/)

Here I give an overview of Value Types, Reference types and immutability.  

## Benefits of avoiding mutation

- [Code is easier to read, easier to write, less bugs](https://www.rubypigeon.com/posts/avoid-mutation-functional-style-in-ruby/) ie easier to reason about
- Performance through concurrency

The options discussed in the book are:

- Immutability by convention (but mutation can creep in!)
- Define immutable objects in C# (required some extra work in defining constructors)
- Write data objects in F#

## 1. Value Types

Variables of [value types](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/value-types) directly contain the data:  

- simple types: bool, byte, char, decimal, int etc...  
- structs (eg Point), enum

```cs
// Value types
// the value of 42 is copied to to the variable i
int i = 42;
Update(i);
void Update(int j)
{
    WriteLine(j); // 42
    j = 43;
    WriteLine(j); // 43
}
WriteLine(i); // 42
```

Value types are non-nullable by default, so if you want an `int` to be nullable you have to declare it as `int?`

## 2. Reference Types

Variables of [reference type](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/reference-types) store references to their data eg:

- class
- object
- string

```cs
public class Thing
{
    public string Name { get; set; }
}

var q = new Thing { Name = "test1" };
UpdateThing(q);
// A function with side effects
void UpdateThing(Thing r)
{
    // q and r reference the same object
    r.Name = "test2";
}
WriteLine(q.Name); // test2
```  

### Null

Reference types are nullable ie

```cs
Thing u = null;

if (u.Name == "Dave") return;
```

This compiles but gives us the `System.NullReferenceException` at runtime.

In C#8 we got [Nullable and non-nullable reference types](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references) and can turn this on by setting Nullable

```xml
<PropertyGroup>
  <OutputType>Exe</OutputType>
  <Nullable>enable</Nullable>
</PropertyGroup>
```

This means we get compiler warnings now. I use this as standard in all my projects.

## 3. String - Reference type but behaves like a Value Type

```cs
var aa = "test1";
UpdateString(aa);
void UpdateString(string bb) => bb = "test2";
WriteLine(aa); // test1
```

Strings are not value types since they can be huge.

Value types are stored on the stack which is 1MB for 32-bit and 4MB for 64-bit, so you'd incur many [penalties for doing this](https://stackoverflow.com/a/636935/26086).  

Reference types are stored on the heap.  

It matters whether an object is a value or a reference type but the rest is [an implementation detail](https://stackoverflow.com/a/4487320/26086)  

[String vs string](https://stackoverflow.com/a/215422/26086) - string is an alias for System.String and can be used interchangeably. R# suggests to use the alias string.


## 3.5 Warning CS8618  Non-nullable property 'x' must contain a non-null value when exiting constructor.

[Nullable reference types](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references) MS Documentation

This code will give a compiler warning (remember to set `<nullable>enable</nullable>` in project settings).

```cs
var person = new Person();

class Person
{
    // to avoid warnings, we could set firstName to "" here as a default
    // which would avoid FirstName being null
    // which by using string we are saying the reference should not be null (C# 8 nullable ref type)
    //public Person(int id = 0, string firstName = "")
    //{
    //    ID = id;
    //    FirstName = firstName;
    //}

    // int (like all simple types eg bool, char, byte etc) is a value type, so directly contains the data
    // non nullable by default
    // so an int has an default value of 0 if not set
    public int ID { get; set; }

    // reference type ie stores references to their data
    // reference types are nullable by default
    // https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references
    // to avoid warnings, if we don't use a ctor to explicitly set the string to something, must set to nullable string

    // compiler warning 
    // Warning CS8618  Non-nullable property 'FirstName' must contain a non-null value when exiting constructor.
    // Consider declaring the property as nullable


    // essentially we need to tell the compiler that FirstName could be null (or set it in the ctor)
    public string FirstName { get; set; }
}

```

## 3.6 Warning CS8602 Dereference of a possibly null reference.

This compiles but gives a runtime error

`Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object`

With C# 8.0 nullable reference types there is a compiler warning

```cs
var person = new Person();
person = null;

if (person.FirstName == "Dave") Console.WriteLine("Dave");
```




## 4. Immutable Data Object - Reference type

To enforce immutability on our Data Object / Custom Type / Anemic Object, which is a reference type, we can make the public property read only ie no set.

```cs
public class Person
{
    public string Name { get; } // C#6 getter-only auto-property
    public int Age { get; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
    public override string ToString() => $"{Name} : {Age}";
}

// Immutable data object (so can only set public property on construction)
var s = new Person("test1", 45);
var u = UpdatePersonName(s);
// Make a copy of the Person object and return with an updated value
Person UpdatePersonName(Person t) => new Person("test2", t.Age);
WriteLine(s); // test1, 45
WriteLine(u); // test2, 45
```

This has been a brief look at `Value types` (eg int), `Reference types` (eg custom classes) and making `Immutable Objects`.

Have a look at my [series on leaning FP in C#](/2019/01/11/Learning-Functional-Programming-in-C-Sharp)