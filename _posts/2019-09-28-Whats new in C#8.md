---
layout: post
title: Whats new in C#8
description: 
menu: review
categories: C# 
published: true 
comments: false     
sitemap: false
image: /assets/2019-08-05/1.jpg
---

C#8 runs on .NET Core 3 and both are installed with Visual Studio 16.3

[Mads Torgersen at dotnetconf](https://www.youtube.com/watch?v=TJiLhRPgyq4&list=PLReL099Y5nRd04p81Q7p5TtyjCrj9tz1t&index=3&t=0s) shows a good demo.

## Null Debugger Message
Error messages now show what is null

![alt text](/assets/2019-09-29/1.jpg "Shows where null actually is"){:width="400px"}

```cs
class Program
{
    static void Main(string[] args)
    {
        var miguel = new Person("Migueal", "de Icaza");
        var length = GetMiddleNameLength(miguel);
        Console.WriteLine(length);
    }

    private static int GetMiddleNameLength(Person person)
    {
        var middle = person.MiddleName;
        return middle.Length;
    }
}

class Person
{
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }

    public Person(string firstName, string lastName)
    {
        FirstName = firstName;
        //MiddleName = middleName;
        LastName = lastName;
    }
}
```

## Enable Nullable Reference Types 
In the .csproj file (edit by double clicking on the file) add in a <Nullable> section which is enabled. This featured is disabled by default.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp3.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>
```

Then we'll get a compiler warning:  
![alt text](/assets/2019-09-29/2.jpg ""){:width="600px"}

[Reference types](/2019/01/17/Value-Types-and-Reference-Types) eg MiddleName string auto property is now considered to be non nullable.

> Warning CS8618 Non-nullable property 'MiddleName' is uninitialized. Consider declaring the property as nullable.	ConsoleApp1	

## Nullable Reference Types
[One of the differences between value types and reference types is that value types are not nullable while reference types are nullable](https://www.telerik.com/blogs/c-8-nullable-references)

We could have:

```cs
// nullable reference type
public string? MiddleName {get; set;}
```

So now that the public API shows a nullable MiddleName, the consumer will now give warnings:

![alt text](/assets/2019-09-29/3.jpg "Dereference of possible null reference"){:width="400px"}

```cs
private static int GetMiddleNameLength(Person person)
{
    var middle = person.MiddleName;
    // no more error as we are catching the null
    if (middle == null) return 0;
    return middle.Length;
}
```

[Pattern matching in C#7 SO answer](https://stackoverflow.com/a/43295208/26086)

```cs
private static int GetMiddleNameLength(Person person)
{
    var middle = person.MiddleName;
    // pattern match in c#7
    // checks null even when overriden == operator
    if (middle is null) return 0;
    // compiler understands that if we get here, then middle can't be null (flow analysis of code)
    return middle.Length;
```

Ctrl+R,I to inline the temp variable

```cs
if (person.MiddleName is null) return 0;
// we've checked property of parameter so MiddleName
// must not be null
return person.MiddleName.Length;
```
asdf

```cs
private static int GetMiddleNameLength(Person person)
{
    // ?. operator - only does dereference if not null
    // ?? null coalescing operator
    return person.MiddleName?.Length ?? 0;
}
```

## Pattern Matching

asdf

```cs
private static int GetMiddleNameLength(Person? person)
{
    // is something ie not null
    // ?. operator - only does dereference if not null
    // ?? null coalescing operator
    //if (person?.MiddleName is { }) return person.MiddleName.Length;
    //return 0;

    // naming the new recursive property pattern
    // drill down into properties
    //if (person?.MiddleName is { } middle) return middle.Length;

    // going into the property
    //if (person?.MiddleName is { Length: var length } ) return length;

    // ? conditional expression
    // then could use expression bodied member
    return person?.MiddleName is { Length: var length } ? length : 0;
```

## Dammit Operator!
Not allowed to call it dammit operator. Null ignoring operator.

```cs
var middle = person.MiddleName;
// null ignoring operator
return middle!.Length;
```

## Turn off warnings
Can turn off at a file level

```cs
#nullable disable
```
But if we want to have nullable reference types eg

```cs
#nullable disable warnings
// #nullable disable annotations
public string? MiddleName { get; set; }
```
but disable the warnings we need disable warnings.

So this is how we can take chunks of code and get warnings bit by bit.

