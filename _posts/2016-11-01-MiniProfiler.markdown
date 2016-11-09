---
layout: post
title:  "Making applications faster using MiniProfiler"
menu: review
categories: MiniProfiler
published: true
---
Performance is an **essential part of any business application**. MiniProfiler is one of the tools I use to continually measure this. In fact over the last 2 years, **every application** I have written (and had to work on) has had MiniProfiler in it at some stage.

What is good performance? Ask the people who use your system.  In my experience users will tell you with **brutal honesty** what they think :-) There is a lot of [research](http://stackoverflow.com/a/164290/26086) too.


## What is MiniProfiler?
* Is a lightweight profiler
* [MiniProfiler](http://miniprofiler.com/) shows how long database queries take (commonly the bottleneck in my applications)
* Can show page render times, AJAX calls, API calls
* ASP.NET MVC / Webforms
* Development and Production (good security to lock it down)

![Cows](/assets/MiniProfiler_1.jpg)

Miniprofiler **overlays query times** on any webpage. Here is a page showing 2 SQL queries which took 25.9ms to run.

## 1. Improving Query Times
By far my biggest use of MiniProfiler is tuning SQL queries. Here is an example of a home page (always a good place to start looking at where to start optimising) query which took 160ms to run a search.

{% highlight sql %}
SELECT * FROM Author 
WHERE (@AuthorID IS NULL OR AuthorID = @AuthorID)
AND (@FirstName IS NULL OR FirstName LIKE CONCAT(@FirstName,'%'))
AND (@LastName IS NULL OR LastName LIKE '%' + @LastName + '%')
AND (@DateOfBirth IS NULL OR DateOfBirth = @DateOfBirth)
ORDER BY " + sanitizedSortColumn + " " + sortDirection + @"
OFFSET " + offset + @" ROWS 
FETCH NEXT " + numberOfResults + " ROWS ONLY";
{% endhighlight %}

The business didn't need lastname searching to be %lastname%, just lastname%, so after changing that:

{% highlight sql %}
AND (@LastName IS NULL OR LastName LIKE CONCAT(@LastName,'%'))
{% endhighlight %}

We can see the performance improvement immediately:

![Cows](/assets/MiniProfiler_2.jpg)

33ms query time now (from 160ms)


## 2. Duplicate queries

![Cows](/assets/MiniProfiler_3.jpg)

Another useful feature is highlighting if there are duplicate queries shown in red with a !

## 3. Seeing where ORM queries need to be replaced
I like Object Relational Mappers (ORMs) as they can save time writing boilerplace [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) SQL.  [Entity Framework](https://www.asp.net/entity-framework) and [Dapper.Contrib](https://github.com/StackExchange/dapper-dot-net/tree/master/Dapper.Contrib) are what I have most recently used.

For high performance screens (typically home screens, summary views of large datasets) it can be writing an abstraction on top of an abstraction.. why optimise LINQ when SQL gives you much more control?

[Dapper](https://github.com/StackExchange/dapper-dot-net) is very close to raw ADO, and I generally use that for high performance screens. It gives the safety of a good mapper with performance.

Here is a screen where using an ORM is **asking for trouble**

![Cows](/assets/MiniProfiler_5.jpg)

Filtering, Sorting and Paging. Also returning a count of total records.  Difficult to get right in an ORM, and fine in SQL.  Very fast performance (18ms).

## 4. N+1
If you have 50 Authors on the screen, and each has an AuthorStatusID which is Foreign Key'd to an AuthorStatus table:

![Cows](/assets/MiniProfiler_8.jpg)

I have 50 Authors on the screen, and MiniProfiler is showing 52 queries, and showing as Duplicate queries.  A huge red flag :-)

{% highlight csharp %}
// Horrible way of getting the AuthorStatus eg Alive or Dead
foreach (var author in result)
{
    var authorStatusName = db.Query<string>("SELECT Name from AuthorStatus WHERE AuthorStatusID = @AuthorStatusID",
        new { author.AuthorStatusID }).FirstOrDefault();
    author.AuthorStatusName = authorStatusName;
}
{% endhighlight %}

Lets get the database to do the hard work:

{% highlight csharp %}
var sql = @"
        SELECT a.*, s.Name AS AuthorStatusName FROM Author a
        INNER JOIN AuthorStatus s ON a.AuthorStatusID = s.AuthorStatusID
        WHERE (@AuthorID IS NULL OR AuthorID = @AuthorID)
        AND (@FirstName IS NULL OR FirstName LIKE CONCAT(@FirstName,'%'))
        AND (@LastName IS NULL OR LastName LIKE CONCAT(@LastName,'%'))
        AND (@DateOfBirth IS NULL OR DateOfBirth = @DateOfBirth)
        ORDER BY " + sanitizedSortColumn + " " + sortDirection + @"
        OFFSET " + offset + @" ROWS 
        FETCH NEXT " + numberOfResults + " ROWS ONLY";
{% endhighlight %}

![Cows](/assets/MiniProfiler_9.jpg)

380ms to 9ms - much much faster!  The other 2 times are browserlink javascript calls from visual studio.


## 5. API calls
![Cows](/assets/MiniProfiler_6.jpg)

A project of mine which does many calls to the Spotify API.  On this page there were 6 API calls, and 1 SQL call.  MiniProfiler was very useful in highlighting **which API calls were taking the most time**  Interestingly I found issues with Azure's DNS, which meant it was much faster to run on EC2 for a while (was a geolocation lookup issue). Also I found doing API calls in parallel worked well for Spotify (whose response times are fantastic).

live site [DavesTopMusic](http://www.davestopmusic.com/Artists/Details/12Chz98pHFMPJEknJQMWvI)

## Conclusion
Being able to quantify performance is essential in diagnosing problems and coming up with solutions.

Performance is a [Feature](https://blog.codinghorror.com/performance-is-a-feature/) - implement it :-)
<br />
<br />
<br />
<br />
<br />
<br />
<br />
