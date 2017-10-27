---
layout: post
title:  "Making Business Applications perform - MiniProfiler"
menu: review
categories: MiniProfiler
published: true
---
Performance is an **essential part of any business application**.

Badly perfoming software generally **doesn't deliver its intended benefits** to an organisation and is **frustrating** which leads to **user's mistakes**.  It usually **costs** more to maintain due to it being slow to develop/test/deploy.


[MiniProfiler](http://miniprofiler.com/) is one of the tools I use to continually measure performance. Over the last 2 years, **every application** I have written (and had to work on) has had MiniProfiler in it at some stage.


What is good performance? Ask the people who use your system.  In my experience users will tell you with **brutal honesty** what they think. There is a lot of [research](http://stackoverflow.com/a/164290/26086) too.


## What is MiniProfiler?
* [MiniProfiler](http://miniprofiler.com/) can show how long database queries take (commonly the bottleneck in my applications)
* Can show API calls, AJAX Calls, Controller and View render times
* ASP.NET MVC / Webforms
* Can be used in Development and Production (has good security)

![Cows](/assets/MiniProfiler_1.jpg)

Miniprofiler **overlays query times** on any webpage. Here is a page showing 2 SQL queries which took 25.9ms to run.

Now let me show you the 3 most important features I like about MP

## 1. Improving Query Times
**By far my biggest use of MiniProfiler is tuning SQL queries**. Here is an example of a home page (always a good place to start looking at where to start optimising) query which took 160ms to run a search.

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

## 2. Seeing where ORM queries need to be replaced
Object Relational Mappers (ORMs) **save developers time** writing boilerplace [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) SQL.  [Entity Framework](https://www.asp.net/entity-framework) and [Dapper.Contrib](https://github.com/StackExchange/dapper-dot-net/tree/master/Dapper.Contrib) are what I most commonly use.

For high performance screens (typically home screens, summary views of large datasets) it can be writing an abstraction on top of an abstraction.. why optimise LINQ when SQL gives you much more control?

MiniProfiler makes it continually obvious where the problems are, therefore allowing developers to switch to raw SQL in those places.


[Dapper](https://github.com/StackExchange/dapper-dot-net) is very close to raw ADO, and I generally use that for high performance screens. It gives the safety of a good mapper with performance.



![Cows](/assets/MiniProfiler_5.jpg)
Here is a screen where using an ORM would be **asking for trouble**

Filtering, Sorting and Paging. Also returning a count of total records.  Difficult to get right in an ORM, and fine in SQL.  Very fast performance (18ms).

## 3. API calls
![Cows](/assets/MiniProfiler_6.jpg)

API (Application Programming Interface) calls eg a lookup to Active Directory, a call to Google Maps,

A project of mine which does many calls to the Spotify API.  On this page there were 6 API calls, and 1 SQL call.  MiniProfiler was very useful in highlighting **which API calls were taking the most time**  Interestingly I found issues with Azure's DNS, which meant it was much faster to run on EC2 for a while (was a geolocation lookup issue). Also I found doing API calls in parallel worked well for Spotify (whose response times are fantastic).

live site [DavesTopMusic](http://www.davestopmusic.com/Artists/Details/12Chz98pHFMPJEknJQMWvI)


## Conclusion
Performance is an **essential part of any business application**, and a [Feature](https://blog.codinghorror.com/performance-is-a-feature/)

I use [MiniProfiler](http://miniprofiler.com/) to quantify performance.
<br />
<br />
<br />
<br />
<br />
<br />
<br />
