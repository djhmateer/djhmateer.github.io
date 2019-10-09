---
layout: post
title: Blazor Server Side Examples 
description: 
menu: review
categories: .NET  Blazor
published: true 
comments: false     
sitemap: false
image: /assets/2019-08-05/1.jpg
---

## What is Blazor server-side

[Blazor Documentation Introduction](https://docs.microsoft.com/en-us/aspnet/core/blazor/?view=aspnetcore-3.0)

## Componenets

Blazor apps are based on components usually written as a .razor file. Razor is a syntax for combining HTML and C#.

```cs
// Components/Counter.razor
@using Microsoft.AspNetCore.Components.Web

<p>Current count: @currentCount</p>

<button @onclick="IncrementCount">Click me</button>

@code {
    // Private field - encapsulate a property with a private setter? 
    int currentCount; 
    // Function that increments the field
    void IncrementCount() => currentCount++;
}
```

I find it easier to start with a Razor pages project then add in Blazor support:

```cs
// Startup.cs
// in ConfigureServices
services.AddServerSideBlazor();
// in Configure, app.UseEndpoints
endpoints.MapBlazorHub();
```

then wire in a Blazor Component into the page you need it

```cs
// index.html
// add into the page
// notice that <Counter> is linked via the filename Counter.razor
@(await Html.RenderComponentAsync<Counter>(RenderMode.ServerPrerendered))
<script src="_framework/blazor.server.js"></script>
```

## ACounter

This is the canonical first example.

- Press a button
- No page refresh
- update a UI element
- keep state

The component on the server, renders into an in-memory representation of that render tree that can be used to update the UI.

## BComponentsNest

## CPassParametersToComponents


## B - Save json to a file (Service injection)

asdf

## Save to a DB (EF / Dapper)


## Receive updates from webcrawler

asdf

## Tic-tac-toe game


## CRUD / Forms over data


## Typeahead

debounce

## Modal

## Toasts


## File Upload


## Resources 

Scott Hanselman

