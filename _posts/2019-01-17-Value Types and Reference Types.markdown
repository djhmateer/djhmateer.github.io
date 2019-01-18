---
layout: post
title: Value Types and Reference Types 
menu: review
categories: functional c# 
published: true 
comments: false
sitemap: false
---
If we follow the functional paradigm, we should refrain from state mutation altogether: once created, an object never changes.  This is the subject of [an entire chapter of the Orange Book](https://livebook.manning.com/#!/book/functional-programming-in-c-sharp/chapter-9/)

The 3 options discussed in the book are:
- Immutability by convention (but mutation can creep in!)
- Define immutable objects in C# (required some extra work in defining constructors)
- Write data objects in F#

## 1.Value Types
variables of value types directly contain the data
  bool,byte,char,decimal, int etc...
  structs, enum

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

## 2.Reference Types
  variables of reference type store references to their data
  class
  object
  string

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
## 3.String - Reference type but behaves like a Value Type
```cs
var aa = "test1";
UpdateString(aa);
void UpdateString(string bb) => bb = "test2";
WriteLine(aa); // test1
```
Strings are not value types since they can be huge.   

Value types are stored on the stack which is 1MB for 32-bit and 4MB for 64-bit, so you'd incur many [penalties for doing this](https://stackoverflow.com/a/636935/26086).  

Reference types are stored on the heap.  

It matters whether an object is a value or a reference type but the rest is [an implementation deatil](https://stackoverflow.com/a/4487320/26086)  

[String vs string](https://stackoverflow.com/a/215422/26086) - string is an alias for System.String and can be used interchangeably. R# suggests to use the alias string.

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
