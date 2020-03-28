---
layout: post
title: IMDB Challenge - ETL 
description: 
menu: review
categories: WVD 
published: true 
comments: false
sitemap: false
image: /assets/2019-01-11/3.png
---

![alt text](/assets/2019-01-11/3.png "The Orange book"){:width="300px"}

Dataset: [Direct connect to MySQL](https://relational.fit.cvut.cz/dataset/IMDb) and my version in source control [here]()

## Questions

asdf

## Strategy

Git to source control data, SQL queries, C# importer and analyser, db diagram photo
Analyse csv data with Excel
Draw a rough DB diagram on paper to trial relationships
SSMS with db diagrams to enter schema and 
DB Project in Visual Studio to keep schema source controlled

C# with CsvHelper to load in the delimited text files (Extract)
C# to analyse the data for anomalies and fix (Transform)
C# with Dapper to insert (Load)
SQL to answer questions
C# to answer harder questions - clarity over speed, iterative code fine to start with

## Initial Data Analysis with Excel

Load from CSV (even though it is semicolon separated)

get a feel for data - number of rows

**show image of db diagram

## DB Schema

used the same as the source even though I don't like it:

[Link to my article on db naming](/2016/10/19/ASP.NET-MVC-Sort-Filter,-Page-using-SQL)

Composite keys in link tables thoughts?
Capitalisation of columns names

## ETL with C#

Extract from CSV
Transform and exploring - do we need any data cleansing?
  whitespace where shouldn't be 
  unusual characters - using UTF-8 in db and all queries parameterised

## Querying with SQL

SQL great once I had data loaded

Load scripts very good as can rebuild on any machine with `useDb` flag. If I delete in correct order, then don't need to take off constraints.

C# good for complex queries to understand the data and to get something working even though it will not per as performant.

-count (1)
-group by
-group by having
-put in left join pipeline strategy

## Querying with C#

As we have the load scripts, can use these data structures and LINQ to analyse the data and answer hard questions.

I found a good strategy to be: Think of the datastructure I want to query to get the answer then work back
