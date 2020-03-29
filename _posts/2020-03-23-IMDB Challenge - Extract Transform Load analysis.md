---
layout: post
title: IMDB Challenge - ETL 
description: 
menu: review
categories: WVD 
published: true 
comments: false
sitemap: false
image: /assets/2020-03-01.dbdiag.png
---

![alt text](/assets/2020-03-01.dbdiag.png "DB Diagram"){:width="300px"}

Many times in my career I've worked on Extract Transform Load (ETL) solutions. Often they have grown organically through stored procedures, take a time (hours) to run, and are fragile.

Here is an interesting challenge my friend gave me to answer 15 questions on a dataset. The challenge was originally set for a different database, but I decided to use SQL Server and more focus on veracity of the answer over speed

[Source code for this article is here]() and the [dataset originally came from here](https://relational.fit.cvut.cz/dataset/IMDb)

## Questions

asdf

## Strategy

Git to source control data, SQL queries, C# importer and analyser, db diagram photo
Analyse csv data with Excel
Draw a rough DB diagram on paper to trial relationships
SSMS with db diagrams to enter schema and Foreign Key constraints
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
    INSERT INTO Actors
    (actorid
    ,name
    ,sex)
    VALUES (@actorid
    ,@name
    ,@sex)
    ";
    // handy mapper - don't need to specify column names
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
    // favouring the simplest data type in this load
    // until I understand the data well
    public string actorid { get; set; }
    public string name { get; set; }
    public string sex { get; set; }
}

```

These load scripts are very good as can rebuild on any machine with a clone from source control.

## Querying with SQL

SQL great once the data is loaded to answer some of the easier questions.

-count (1)
-group by
-group by having
-put in left join pipeline strategy

## Querying with C#

C# is good for complex queries to understand the data and to get something working even though it will not be as performant.

As we have the load scripts, can use these data structures and LINQ to analyse the data and answer hard questions.

I found a good strategy to be: Think of the datastructure I want to query to get the answer then work back
