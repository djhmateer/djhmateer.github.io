---
layout: post
title: Storing datetimes in a database 
#description: Building a desktop PC focussed on being developer daily driver.
#menu: review
categories: datetime
published: true 
comments: false     
sitemap: true
image: /assets/2023-04-29/5.jpg
---

<!-- [![alt text](/assets/2023-04-29/7.jpg "email"){:width="800px"}](/assets/2023-04-29/7.jpg) -->

I like to store datetimes in my databases as Utc eg `DateTimeCreatedUtc` as a matter of principle. datetimes are hard.

My Linux servers are generally in Holland (Azure West), and clients generally in the UK, which is mostly UTC+1 timezone depending on daylight savings. Even if I used UK webservers and UK SQL Azure db, their default timezone may not be set right.

## C#

I like to use server side rendering where possible, so if I know my user is in the UK timezine, I can adjust any dates sent to them by

```c#
# razor pages syntax
# note this would give server time (Holland)
@p.DateTimeCreatedUtc.ToLocalTime() 

# new extension method to get current users profile timezone
# or if not logged then default to UK Timezone
// @p.DateTimeCreatedUtc.ToUserProfileLocalTime() 
@p.DateTimeCreatedUtc.UtcToGmt() 


public static class DateHelper
{
    public static DateTime UtcToGmt(this DateTime dateTime)
    {
        // GMT Standard Time should correct for daylight savings
        // http://www.cryer.co.uk/brian/csharp/localisation_in_a_nutshell.htm#daylight_saving
        return TimeZoneInfo.ConvertTimeFromUtc(dateTime, TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time"));
    }
}
```

`DateTimeCreatedUtc` is of .NET type `DateTime` so then extension method above is on that.


[http://www.cryer.co.uk/brian/csharp/localisation_in_a_nutshell.htm#TimeZoneInfo.FindSystemTimeZoneById](http://www.cryer.co.uk/brian/csharp/localisation_in_a_nutshell.htm#TimeZoneInfo.FindSystemTimeZoneById)

15th Jun 2023 (so no daylight savings) and we are UTC+1 in the UK

eg created a record at 13:14:34

so it is stored as: 12:14:34

And displays from the dutch server as the correct time of 13:14:34

## Python

```py
import datetime
import time
# now in utc to write to a db
dt_now_utc = datetime.datetime.now(datetime.timezone.utc)


# reading utc from db using pyodbc
next_tweet_utc_naive = row.TimeToTryTweetUtc
# naive datetime to timezone aware so can do a compare
next_tweet_utc = next_tweet_utc_naive.replace(tzinfo=datetime.timezone.utc)


if (dt_now_utc > next_tweet_utc):
    pass
#etc..
```



