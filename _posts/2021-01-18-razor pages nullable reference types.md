---
layout: post
title: Razor Pages Nullable Reference Types
description: 
menu: review
categories: razor 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

## Nullable reference types

Still need to explicitly turn on nullable reference types. 

```xml
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net5.0</TargetFramework>
    <nullable>enable</nullable>
  </PropertyGroup>
```



This is an exploration of how 

C# 8.0 Nullable Rerence Types

Can help in our ASP.NET 5 Razor pages projects

Can [C# 9.0 Records]() help too?

The source code for this is in RecordTest

```cs


```

Essentially I like using nullable reference types as it shows the intention of an object eg

- Email should never be null, so it is required
- Same for password
- Shows that returnUrl is nullable

Use class for the InputModel (ViewModel?) so that handy attributes work. eg

- Email address (gets the right regex on front and back end)
- Password dont show
- Display name


When is ErrorMessage used?

**next try a DTO maybe with a record
a standard form?

## More info


[Nullable reference types - MS Docs](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references)]which I'm a fan of.

https://docs.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types#non-nullable-properties-and-initialization

Null-forgiving operator (dammit)!

https://stackoverflow.com/a/54973095/26086

Aim for non-nullable by default.


