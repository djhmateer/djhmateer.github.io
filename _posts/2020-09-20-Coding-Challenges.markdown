---
layout: post
title:  "Improve at Programming with Project Euler"
date:   2018-10-10 09:03
menu: review
categories: coding 
published: true 
comments: true
---

What is [projecteuler.net](https://projecteuler.net/)?  

From [Wikipedia](https://en.wikipedia.org/wiki/Project_Euler):  
Named after the 18th Century Swiss mathematician, widely considered the most prolific mathematician of all time.

*The website is a series of problems intended to be solved with computer programs.*

Since its creation in 17 years ago, a new problem has been added every 2 weeks giving a total of 600 problems.

There are more than 800,000 users from all over the world who have solved 1 problem.

I've been using this site over the last 7 years to learn new languages, and to improve my skills in existing languages


## Euler1
The [first question](https://projecteuler.net/problem=1) is:  

```
If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.  
Find the sum of all the multiples of 3 or 5 below 1000.  
```

Visually this looks like:

![ps](/assets/2018-10-10/1.jpg){:width="300px"}

### Imperative approach
Lets try this using the latest version (10th Oct 2018) of the .NET Core runtime which is 2.1, which includes the [C# language](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) which is version 7.3. [Download](https://www.microsoft.com/net/download) for Win / Mac. 

```
private static void Main() => Console.WriteLine($"Answer is: {Run(10)}");

// 1. Imperative approach. Take every number from 1..number and see if it is divisible by 3 or 5
private static int Run(int number)
{
    int total = 0;
     for (var i = 1; i < number; i++)
         if (i % 3 == 0 || i % 5 == 0)
             total += i;
     return total;
}
```
Interesting points to consider here are:

- Expression Body Member usage in Main method
- String interpolation in Main
- Not using brackets in Run method 

### Functional approach
I am interested in Functional Programming, and on this, my fifth time going through some Euler puzzles I'm pusing in that direction. [Linq](https://en.wikipedia.org/wiki/Language_Integrated_Query) Language Integrated Query introduced in .NET3.5 in 2007 is very functional set of concepts.  

```
private static int RunLinq(int number) => Enumerable.Range(1, number - 1).Where(x => x % 3 == 0 || x % 5 == 0).Sum();
```
- Create a range
- Pass a Lambda expression which is a Predicate (a function which takes parameter(s) and returns a bool)
- Finally using the Sum extension method


### TDD 
I find Euler problems lead themselves to easy unit testing and TDD. This is especially useful when trying new ways solving a problem.  

I use [Xunit](https://xunit.github.io/docs/getting-started-dotnet-core) with Visual Studio. Firstly install Xunit and then the test runner.


![ps](/assets/2018-10-10/2.png)

![ps](/assets/2018-10-10/3.png)

then solve the Error:
### Program has more than one entry point defined
![ps](/assets/2018-10-10/4.png)

[Detail](https://andrewlock.net/fixing-the-error-program-has-more-than-one-entry-point-defined-for-console-apps-containing-xunit-tests/) but essentially:

- Edit the csproj file (right click on the project in visual studio)
- Add 1 line.. 'GenerateProgramFile false GenerateProgramFile' so the csproj file should look like:

```
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.1</TargetFramework>
    <GenerateProgramFile>false</GenerateProgramFile>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="xunit" Version="2.4.0" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.4.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
    </PackageReference>
  </ItemGroup>
</Project>
```
![ps](/assets/2018-10-10/5.png)
Successfully test your test runner (I prefer R# test runner)

### Euler1 TDD
```
[Fact]
public void RunTest() => Assert.Equal(23, Run(10));
```
then the implementation:  

```
private static int Run(int number)
{
    int total = 0;
    for (var i = 1; i < number; i++)
        if (i % 3 == 0 || i % 5 == 0)
            total += i;
    return total;
}
```

## Refactoring tools  
I use Visual Studio and [Resharper](https://www.jetbrains.com/resharper/) to explore different ways to write express code. In this example R# helped me discover (and use all the time now)

- Expression body member
- Brackets
- Import static member for Enumerable   

## Source
All source code for this Euler1 problem is on [Github](https://github.com/djhmateer/Euler1Article)
