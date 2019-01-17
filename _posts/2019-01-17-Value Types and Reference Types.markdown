---
layout: post
title: Value Types and Reference Types 
menu: review
categories: functional c# 
published: true 
comments: false
sitemap: false
---

## Value Types
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

## Reference Types
  variables of reference type store references to their data
  class
  object
   string

```cs
public class Thing
{
    public string Name { get; set; }
}

// A function with side effects 
var q = new Thing { Name = "test1" };
UpdateThing(q);
void UpdateThing(Thing r)
{
    // q and r reference the same object 
    r.Name = "test2";
}
WriteLine(q.Name); // test2
```

Lets do this properly

```cs
public class Person
{
    public string Name { get; }
    public int Age { get; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
    public override string ToString() => $"{Name} : {Age}";
}

// Reference types done right
// immutable data object (so can only set on construction)
var s = new Person("test1", 45); 
var u = UpdatePersonName(s);
Person UpdatePersonName(Person t)
{
    // Make a copy of the Person object and return that
    var output = new Person("test2", t.Age);
    return output;
}
WriteLine(s); // test1, 45
WriteLine(u); // test2, 45

```



