---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: excel 
published: true 
comments: false     
sitemap: false
image: /assets/2024-03-03/2.jpg
---

<!-- [![alt text](/assets/2024-02-01/1.jpg "email"){:width="600px"}](/assets/2024-02-02/1.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email"){:width="800px"}](/assets/2024-03-03/2.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email")](/assets/2024-03-03/2.jpg) -->

## Intro

[Excel online](https://www.office.com/launch/Excel/?auth=1)

- Notebook (a spreadsheet) eg DM Test2
- Sheet (a tab) - a Notebook can have many Sheets

## Drop Down Filter List

[![alt text](/assets/2024-03-07/1.jpg "email"){:width="200px"}](/assets/2024-03-07/1.jpg)
<!-- [![alt text](/assets/2024-03-07/1.jpg "email")](/assets/2024-03-07/1.jpg) -->

Create a Named Range in Sheet2 of the names you want


[![alt text](/assets/2024-03-07/2.jpg "email"){:width="600px"}](/assets/2024-03-07/2.jpg)
<!-- [![alt text](/assets/2024-03-07/2.jpg "email")](/assets/2024-03-07/2.jpg) -->

```
Data, Data Validation
Allow, List
=names

Error Alert - Please enter a Name from the Drop down, or add a new one to Sheet2
```

[![alt text](/assets/2024-03-07/3.jpg "email")](/assets/2024-03-07/3.jpg)

Do for whole column except the title. You can extend the validation by selecting more cells (including the ones with validation on) and you'll get the message above. Handy.

## Highlight Header row

```
Select Row
Paint fill yellow
```

I like to Bold the header row text too.

## Wrap Text in Entire Column

```
select column
Home
Alignment icons, Wrap Text
```

## Freeze Row

```
View
Freeze Panes
Freeze Top Row
```

## Protect Top Row from Edits

```
Review
Manage Protection
Unlock Ranges - all the Sheet except top row.

Options
Allow users of this sheet to do everything - tick all
```

[![alt text](/assets/2024-03-07/4.jpg "email")](/assets/2024-03-07/4.jpg)

Protecting the top row from edits. Notice `Pause Protection` if you want to change top row.

You'll need to Pause Protection to do more Data Validation Changes.


## Clear Text Formatting

Home, Editing, Clear Formats

## Clear All Forumula 

Select Column or Row, Copy, Paste Special Values only, then copy that over original.

## Text Box

Insert, Text Box

Useful for notes and guides how to use the sheet.


## Filters on top row of all columns

Select all columns

Data, Sort and Filter (funnel)

## Get Row Number of Name Selected in Filter List

[![alt text](/assets/2024-03-07/5.jpg "email")](/assets/2024-03-07/5.jpg)

```
=MATCH(B3, Sheet2!B$2:B$6,0)+1
```

This is okay, but I'd like to get the NameID

As far as I can see there is no way to pass an idea to the DDL, so we have to use a

- MATCH - returns the relative position ie row 
- INDEX - useful in collaboration with above to get more complex lookups than v and hlookup
- VLOOKUP
- HLOOKUP
- XLOOKUP - new version of V and HLOOKUP

## Get NameID from Sheet2

`=MATCH(C3, Sheet2!B$2:B$6,0)+1`

[![alt text](/assets/2024-03-07/6.jpg "email")](/assets/2024-03-07/6.jpg)

I like a uniqueID.. even though we have to use a lookup to get it!


## INDIRECT

Returns a reference to a cell specificed in a text string.

[![alt text](/assets/2024-03-07/8.jpg "email")](/assets/2024-03-07/8.jpg)

If sheeet2 has `s` scheduled in the SAT row, then FALSE

Uses INDIRECT to reference the relevant row number in Sheet2


[![alt text](/assets/2024-03-07/9.jpg "email")](/assets/2024-03-07/9.jpg)

Then do Data Validation on Sheet1!E


## Update Sheet2

[leave]Data validation not working as circular referecne, and can't control order of formula being evaluated


I can enter a time on Sat on Sheet1, then it updates Sheet2 fine. It then shows in Sheet1 if that person is working.

But linkage from Sheet2 is hard coded back

not good without re-think.

-- --
what about apps scripts

-----
ahh - what about re-think how the sheets work?

lets see employee scheduling examples in Excel

what about keep employee names in a DB ... lets try in another Sheet for now
--
automation
- [done]select employee from list 

- update employee schedule so can't schedule in 2 places
- how about in the Sheet1 just look for any other mentions of Alice on Monday?

--
 okay it feels like trying to get excel to be a database
  lets try scripting
    even if not immediate... don't care... display clashes

## Formulas

Ctrl 1 - bring up menu

## Office Scripts for Excel

Alternative to macros where you write in Typescript.

Need to have Office 365 subscription, and then should see an `Automate` menu item.

```
Automate
New Script
Write Script
```

It is possible to create a button

It is possible to scheudle scripts which uses Power Automate - see below.

It isn't possible to call an Office Script from a cell change.

I have [another blog post on Office Scripts]()

## Filters

Select a cell in column you want to filter

`Home,  Editing Group, Sort and Filter, Filter`


**HERE** working on AutomateTest2 on purple browser tab on 



## Microsoft Power Automate

PA costs £12.30 per user/month


Microsoft Power Automate is a service that helps you create automated workflows between your favorite apps and services to synchronize files, get notifications, collect data, and more.



  











try multiple jobs - alice cooper

hmmm not going to work without scripting









If sheet2 is the source of truth

People never update Sheet2

start on sheet1 JobA


What if JobB tries to get Alice Cooper on Sat?






sheet1
  if should be s in sheet2
 if sheet2







## Tables

[![alt text](/assets/2024-03-07/7.jpg "email")](/assets/2024-03-07/7.jpg)

Should I be keeping the reference names in a table? 

```
Select all data
Insert Table
Table has a header

Select a cell inside table
Table Designer
Name table: TName

Table Styles 
```

This is good purely for reference data ie a source of truth perhaps

Summerise with Pivot Table

Remove Duplicates

Convert to Range

