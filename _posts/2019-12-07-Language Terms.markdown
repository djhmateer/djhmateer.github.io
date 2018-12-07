---
layout: post
title:  "Language Terms"
date:   2018-12-07 09:03
menu: review
categories: language 
published: true 
comments: true
---
## Styles
- Imperative
- Functional
- OO

Separation and encapsulation

## Class / Type
usually class name in C# is PascalCaseing (as opposed to camelCasing in Java)
create an instance of a class

muliple
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
- Funcs
- Delegate
   allow us to create variables that point to methods

Action - delegate (pointer) to a method that takes 0, one for more input parameters but does not return anything
Func - same as above but returns a value (or reference)

Higher Order Functions

closures


![ps](/assets/2018-11-07/2.png)