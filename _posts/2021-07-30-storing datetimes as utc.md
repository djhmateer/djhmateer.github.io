---
layout: post
# title: 
description:
menu: review
categories: Dates 
published: true 
comments: false     
sitemap: false
image: /assets/2021-07-26/save.jpg
---

<!-- [![alt text](/assets/2021-07-26/save.jpg "Turn auto build on save off")](/assets/2021-07-26/save.jpg) -->

When starting a new project I default to store datetimes as UTC using this `DateTimeUtc` naming standard:

> UTC = Universal Time Coordinate or Greenwich Mean Time

## MSSQL

<!-- [![alt text](/assets/2021-07-30/sql.jpg "Utc"){:width="450px"}](/assets/2021-07-30/sql.jpg) -->
[![alt text](/assets/2021-07-30/sql.jpg "Utc")](/assets/2021-07-30/sql.jpg)

You can see above I'm using the mssql [getutcdate](https://stackoverflow.com/questions/14996306/getutcdate-function) function to put in the date when a login in created.

This makes sense when my prod server is in a different timezone (I used Azure Europe West which is in Holland and I'm in the UK).

Note I'm not storing where the login/user is, so can't give her feedback on when she created her account.

## Not a silver bullet

[https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/)  Very interesting reading on why datetimes are hard(er) than initially they should be! 



