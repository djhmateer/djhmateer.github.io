---
layout: post
title: Immutable Objects List and IEnumerable 
description: 
menu: review
categories: lists BrokenLinkChecker 
published: false 
comments: false
sitemap: false
image: /assets/2020-05-21/kids-pools.jpg
---

I'm working on a broken link checking application and use in-memory collections:

- List
- Queue

I use `async/await` so don't have to use threading ie don't need to use ConcurrentList, ConcurrentQueue etc.. 

[Task blog post](/2019/11/30/Task)

## Types

```cs

var linksCrawled = new List<Foo>(); // A lookup list so don't request a link twice

class Foo
{
    public Uri Uri { get; set; }
    public HttpStatusCode? ResponseCode { get; set; }
    public string? ExceptionText { get; set; }
    public override string ToString() =>
        $"{Uri} {(ResponseCode == null ? "null response code" : $"{(int)ResponseCode}{ResponseCode}")} {ExceptionText}";
}
```

C#8 Nullable ref type checking turned on

Should I get rid of the setter and use constructor based setting only? For safety.

Or can I just be very careful in code and always return a new collection?

ie

```cs
// never do this?
linksCrawled.Add(newLink);

// do this?
linksCrawled = linksCrawled.Add(newLink);
```

reference types?


```cs
 // Has the Uri been requested already in linksCrawled
// but want to ignore any fragments eg
// https://davemateer.com/about/#
List<Foo> filteredLinksCrawled = linksCrawled.Where(x => UriComparer(x.Uri, hyperlinkUri)).ToList();
if (filteredLinksCrawled.Count > 1)
{
    // https://stackoverflow.com/a/18124170/26086
    // ToList() creates a copy of the list, so can remove elements fro
    var first = filteredLinksCrawled.First();
    Log.Debug($"duplicate Uri in linksCrawled error. deleting all. then adding 1 in again {first}");
    for (int i = linksCrawled.Count - 1; i >= 0; i--)
    {
        if (linksCrawled[i].Uri == first.Uri)
            linksCrawled.RemoveAt(i);
    }
    var newFoo = new Foo { Uri = first.Uri, ResponseCode = first.ResponseCode, ExceptionText = first.ExceptionText };
    linksCrawled.Add(newFoo);
}
```

**I wonder if much simpler to always return a new collection when adding?
ie always have thing immutable

## C#9 data type

Records




ctions and ref types
   keeping things immutable

Article of ienumerable vs lists
   And immutable 
Immutablelist 

  Immutable objects 
  Always return new collection
     Where is my blog article on this
       Ref types vs value types

![alt text](/assets/2020-06-20/wsl-list.jpg "WSL --list --verbose")

## Conclusion

