---
layout: post
title: Extract Transform Load with C# 
description: Extract Transform Load a CSV into MSSQL with C#, Dapper and CSVHelper.
menu: review
categories: Dapper ETL
published: true 
comments: false
sitemap: false
image: /assets/2020-03-01/dbdiag.png
---

![alt text](/assets/2020-03-01/dbdiag.png "DB Diagram"){:width="500px"}

Many times in my career I've worked on Extract Transform Load (ETL) projects. Often they have grown organically through stored procedures, take a hours to run and are fragile.

Here are a few questions my university friend challenged me to answer on an IMDB dataset. I decided to use SQL Server and focus on **veracity of the answers over speed**.

[Source code for this article is here]() and the [IMDB dataset came from here](https://relational.fit.cvut.cz/dataset/IMDb)

## Sample Questions

- How many female actors are listed in the dataset supplied?
- List the movie titles and number of directors involved for movies with more
than 6 directors
- Number of movies directed by Spielberg

## Strategy

The 'source of truth' data is coming from CSV files so the first thing to do is protect these files and get them under source control.

Then I analysed csv data with Excel and drew a rough DB diagram on paper to trial relationships

I used SSMS with db diagrams to enter schema and Foreign Key constraints

DB Project in Visual Studio to keep schema source controlled


C# with [CsvHelper](https://joshclose.github.io/CsvHelper/) to load in the delimited text files (Extract)
C# to analyse the data for anomalies and fix (Transform)
C# with [Dapper](https://github.com/StackExchange/Dapper) to insert (Load)
SQL to answer questions
C# to answer harder questions - clarity over speed, iterative code fine to start with

## Initial Data Analysis with Excel

Load from CSV (even though it is semicolon separated)

get a feel for data - number of rows

**show image of db diagram

## DB Schema

I used the same as the source even though I don't like it:

[Link to my article on db naming](/2016/10/19/ASP.NET-MVC-Sort-Filter,-Page-using-SQL)

Composite keys in link tables thoughts?
Capitalisation of columns names

I like source controlling the schema using Visual Studio DB Compare project

## ETL with C#

- Extract from CSV
- Transform and exploring - do we need any data cleansing?
    - whitespace where shouldn't be
    - unusual characters - using UTF-8 in db and all queries parameterised
    - custom validation
- Load using Dapper
    - using the handy object mapper
    - [Could use SQLBulkCopy and FastMember](https://github.com/djhmateer/TwitterFullImporter/blob/master/SQLBulkCopyDemo/Program.cs) if Dapper isn't fast enough

Below is the Actors table load. [Full source code can be found here]()

```cs
// 1.Extract Actors
var actors = LoadActorsFromCsv();
Console.WriteLine($"Total Actors imported from csv is {actors.Count}"); // 98,690

// Transform
foreach (var actor in actors)
{
    // check for leading or trailing whitespace
    if (ListStringsContainLeadingOrTrailingWhitespace(new List<string>
        {actor.actorid, actor.name, actor.sex}))
        Console.WriteLine($"whitespace in {actor.actorid}");

    // check for interesting/bad/unusual characters that could affect results eg LF?.. all queries are paramerterised so no probs with ' chars
    // okay due to db handing unicode UTF-8 and using nvarchar to hold strings

    // Custom validation
    if (!IsSexACapitalMOrF(actor.sex))
        Console.WriteLine("non M or F in Actor sex column");

    var sql = @"
    INSERT Actors
    VALUES (@actorid, @name, @sex)";
    // don't need INSERT INTO
    // don't need to specify column names
    // dapper will map column names from actor object
    db.Execute(sql, actor);
}

private static List<Actor> LoadActorsFromCsv()
{
    using var reader = new StreamReader("..\\..\\..\\..\\..\\data\\actors.csv");
    using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
    csv.Configuration.Delimiter = ";";
    return csv.GetRecords<Actor>().ToList();
}

public class Actor
{
    // favouring the simplest data type string in this load
    // until I understand the data (ie what edge cases are there)
    public string actorid { get; set; }
    public string name { get; set; }
    public string sex { get; set; }
}

```

These load scripts are very good as can rebuild on any machine with a clone from source control. This is a very simple load script with no thought towards insert performance. [I could use SQLBulkCopy and FastMember](https://github.com/djhmateer/TwitterFullImporter/blob/master/SQLBulkCopyDemo/Program.cs) if Dapper isn't fast enough. Using `.AsParallel()` above didn't produce any gains, and actually hurt performance sometimes.

## Reloading of Dataset

The ability to totally recreate the db from the 'source of truth' is so important. Basiclly using Visual Studio DB project to create the schema, then the ETL package to populate the tables is super simple.

## Unit Tests

I write xunit paramertarised tests for the functions that do the checking. Easy to do when you're in C#

## Errors and Logging

Try Catch and log out to serilog. Often I'll use a railway oriented style of - ie the data has to go through all the checks before allowed into the db. If it goes off on a branch line, it is not allowed into the db, it must go to the errors table.

## Querying with SQL

SQL great once the data is loaded to answer some of the easier questions.

- count (1)
- group by
- group by having
- put in left join pipeline strategy

I find that my functional set based SQL skills wane over time and it is easier to start thinking of a problem in an iterative manner first (ie get it working first, then work on performance later)

As we have the load scripts, can use these data structures and LINQ to analyse the data and answer hard questions.

I found a good strategy to be: Think of the datastructure I want to query to get the answer then work back
