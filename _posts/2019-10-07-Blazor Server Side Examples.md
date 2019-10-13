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

// One way data binding 
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

Notice here that I'm using ServerPrerendered. This is used to prerender a site for SEO or even just to present a better experience for the user.

[SQL-MisterMagoo gives an explanation:](https://gitter.im/aspnet/Blazor?at=5d72228ba08e2b4bd29896bf)  

- Server = the index is sent to the client, then the SignalR connection is made, and when the connection becomes active, the components are rendered and sent to the client (the user sees and can interact with your components)

- ServerPrerendered is for mainly, but not exclusively for SEO - the current layout is rendered server side and sent to the client in the initial Response - it is "Static" content - the user does not yet have a connection to the "Blazor" server - there is no SignalR connection yet, but there will be one soon. Once the connection is Active, the client is updated with a new render of the components which is interactive.jk

## ACounter (One way binding)

This is the canonical first example.

- Press a button
- No page refresh
- update a UI element (One way binding from backing field to )
- keep state

The component on the server, renders into an in-memory representation of that render tree that can be used to update the UI.

## ASlider (Two way binding)

## BComponentsNest

## CPassParametersToComponents

## DWeatherFetchData

Comes from the example template in Blazor, but converted to not be a SPA but just a component on the page.

- OnInitializedAsync

> Any asynchronous operations, which require the component to re-render once they complete, should be placed in the OnInitializedAsync method.

**problem here is that the service is being called Twice... why?

https://docs.microsoft.com/en-us/aspnet/core/blazor/hosting-models?view=aspnetcore-3.0#stateful-reconnection-after-prerendering

okay to solve this
https://github.com/aspnet/AspNetCore/issues/13448

Contosocrafts has the same issue

## B - Save json to a file (Service injection)

asdf

## Save to a DB (EF / Dapper)

## Receive updates from webcrawler

asdf

## Tic-tac-toe game

## CRUD / Forms over data

## Typeahead

Look at Blazored example
debounce

## Modal

## Toasts


## File Upload


## Resources and People

Scott Hanselman

[Blazored](https://github.com/Blazored) by [Chris Saintly](https://chrissainty.com/) and [twitter](https://twitter.com/Chris_Sainty)

[SQL-MisterMagoo](https://github.com/SQL-MisterMagoo?tab=repositories)

[Awesome-Blazor](https://github.com/AdrienTorris/awesome-blazor)

[Gitter Blazor channel](https://gitter.im/aspnet/Blazor)

[The Original talk by Steve Sandersen in Jul 2017 NDC](https://www.youtube.com/watch?v=MiLAE6HMr10)

[Balanced article and discussion by Scott Allen](https://odetocode.com/blogs/scott/archive/2019/09/24/the-blazor-bet.aspx)

## Videos and Books

- [An Introduciton to Building Applicaitons in Blazor](http://blazorhelpwebsite.com/Market/Books/AnIntroductiontoBuildingApplicationswithBlazor.aspx) 

- [Hanselman and Richardson ContosoCrafts](https://www.youtube.com/watch?v=lE8NdaX97m0&list=PLdo4fOcmZ0oW8nviYduHq7bmKode-p8Wy&index=2&t=0s) 

- [dotnetconf vidoes 2019](https://www.youtube.com/playlist?list=PLReL099Y5nRd04p81Q7p5TtyjCrj9tz1t)

## Component Libraries

[Radzen - free](https://razor.radzen.com/)

[Blazorise](https://rcbootstrapdemo.blazorise.com/) 

## Problems

[Blazer Server prerendering with parameters to components - will be back in 3.1](https://github.com/aspnet/AspNetCore/issues/14433)  
[More dicussion of same issue here](https://github.com/aspnet/AspNetCore/issues/13721)

## Service being called twice

when using Hanselman style embedding blazor component in a page
