---
layout: post
# title: Splash Screen
description: 
menu: review
categories: Excel
published: true 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->

The [previous post on interactive dashboards]() walked through an example.

Here I make my own custom dashboard using the concepts learned from there.

I'm fortunate in that I've got control over webservers, DB and storage, and can design my own log strategy.

TODO
 - share dashboard using Office365?
 - IP country and town lookups

## Summary

We're going to be using
- Live connection to Azure SQL with a readonly user
- Excel Table to store data
- PivotTable for each chart
- PivotChart
- Map Chart
- Slicer
- Dynamic Labelling

## Import Live Data

[https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-excel](https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-excel)

Create a readonly user on Azure for safety. [SO](https://stackoverflow.com/questions/2777422/in-sql-azure-how-can-i-create-a-read-only-user)

```sql
CREATE LOGIN davereadonly WITH PASSWORD = 'secretpassword' 

-- master so can login to SSMS
CREATE USER davereadonlyuser FROM LOGIN davereadonly;

-- osr4rights
CREATE USER davereadonlyuser FROM LOGIN davereadonly;
EXEC sp_addrolemember 'db_datareader', 'davereadonlyuser';
```

Then login

[![alt text](/assets/2021-11-11/get.jpg "conn")](/assets/2021-11-10/get.jpg)

To modify the cached connection string (which is global on the computer)

Data, Get Data, SQL Server Database
There is a Power Query Editor where I can transform data if needed.

After loading I get 19,955 rows of data in an Excel Table.

Rename the Table and worksheet to Data.

## Total Requests

`Alt H O I` auto format column widths

In Excel Table, Table Design, Summerize with PivotTable, New Worksheet


[![alt text](/assets/2021-11-11/requests.jpg "requests")](/assets/2021-11-10/requests.jpg)

Pivot table: RequestsPivot
Worksheet: Requests Pivot

Months field has been created for us.

## Refreshing Data

Data, Refresh All

I have to press it twice - once to update data source, then to update PivotTables

[![alt text](/assets/2021-11-11/refresh.jpg "refresh")](/assets/2021-11-10/refresh.jpg)

Untick enable background refresh - this means we have to only press refresh once now.

If I auto refresh the Data source every minute, it works. However the PivotTable and PivotChart don't automatically update.


[![alt text](/assets/2021-11-11/refresh2.jpg "refresh")](/assets/2021-11-10/refresh2.jpg)

It works when I open the file, but not in real time from the data source which does update every minute.

[https://www.excelcampus.com/vba/refresh-pivot-tables-automatically/](https://www.excelcampus.com/vba/refresh-pivot-tables-automatically/) looks like a VBA macro is the way to do it.


My preference is now:
- PivotTable - refresh on file open
- Data source - refresh on file open, background update is off (so once only for press refresh)

Then I'm happy to press the Refresh All button.

## Multiple Machines

As expected the connection url and db name are stored in the worksheet, but the username and password is not.

To run the dashboard on anohter machine, enter the username and password, and make sure the Azure SQL allows connections from that IP address (set Firewall Rule in Azure Portal).


## Top 10 Pages

Path, Value Filter, Top 10

[![alt text](/assets/2021-11-11/nosort.jpg "nosort")](/assets/2021-11-10/nosort.jpg)

Data source is from the live database

Am trying to sort on `Count of WebLogId` but can't


[https://www.contextures.com/excel-pivot-table-sorting.html](https://www.contextures.com/excel-pivot-table-sorting.html) gave me the clue


[![alt text](/assets/2021-11-11/sort.jpg "sort")](/assets/2021-11-10/sort.jpg)

Sorted. Along with a value filter of top 10 only

## Columns in Bar chart

[![alt text](/assets/2021-11-11/bar.jpg "bar")](/assets/2021-11-10/bar.jpg)

What I'd like to do is drill into a day (eg yesterday) and see what that 500 error was.

Probably need a slicer, and a way to see the raw data

## Exploring Data

Right click

[![alt text](/assets/2021-11-11/details.jpg "details")](/assets/2021-11-10/details.jpg)

Wow that is excellent - can even right click on subtotals

## Setting up values manually 

`yyyy-mm-dd hh:mm:ss.000` worked for fractional dates for SQL Server DateTime.

`Alt H O I` auto format column widths

`Ctrl T` Format as an Excel Table. 

Still can't sort on the count column.
