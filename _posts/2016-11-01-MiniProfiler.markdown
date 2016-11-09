---
layout: post
title:  "Making applications faster using MiniProfiler"
menu: review
categories: MiniProfiler
published: true
---
Performance is an **essential part of any business application**. MiniProfiler is one of the tools I use to continually measure this. In fact over the last 2 years, **every application** I have written (and had to work on) has had MiniProfiler in it at some stage.

What is good performance? Ask the people who use your system what they think. There is a lot of [research](http://stackoverflow.com/a/164290/26086) too.


## What is MiniProfiler?
* [MiniProfiler](http://miniprofiler.com/) shows how long database queries take (commonly the bottleneck)
* Used on Web applications eg ASP.NET MVC / Webforms applications
* Can be used in Development and Production

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


## Conclusion
Being able to quantify performance is essential in diagnosing problems and coming up with solutions.

Performance should be a [Feature](https://blog.codinghorror.com/performance-is-a-feature/) and a technical read on how fast the average StackOverflow page takes to load (23ms) is 
[here](http://nickcraver.com/blog/2016/02/17/stack-overflow-the-architecture-2016-edition/)

<br />
Get in touch and allow me to help.
<br />
<br />
<br />
<br />
<br />
<br />
