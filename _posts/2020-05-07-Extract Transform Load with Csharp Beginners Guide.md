---
layout: post
title: Extract Transform Load with C# - Beginners Guide
description: Extract Transform Load CSV's into MSSQL with C#, Dapper, Serilog and CSVHelper. A beginners guide to being powerful and keeping it simple
# menu: review
categories: Dapper ETL CSVHelper Serilog
published: true 
comments: true
sitemap: true
image: /assets/2020-03-01/dbdiag.png
---

![alt text](/assets/2020-03-01/dbdiag.png "DB Diagram"){:width="600px"}

Many times in my career I've worked on Extract Transform Load (ETL) projects. Often they have grown organically through stored procedures, take hours to run and are fragile.

Below are a few questions my university friend challenged me to answer on an IMDB dataset. 

I decided to focus on the **veracity of the answers over speed** as ultimately that was the big unknown in the systems I've worked on:

Is the ETL package doing the right thing / what is it missing?

And paraphrasing a [Nick Craver Tweet](https://twitter.com/Nick_Craver/status/1257868725308608514)  
&nbsp;

> My general approach is the dumbest, simplest thing that works well

&nbsp;

[Source code, data and anwsers for this article is here](https://github.com/djhmateer/etlWithIMDB) and the [IMDB dataset was extracted from here](https://relational.fit.cvut.cz/dataset/IMDb)

## Sample Questions

1. How many female actors are listed
2. The number of female actors and the number of male actors as a single query
3. The movie titles and number of directors involved for movies with more than 6 directors

## Strategy

The 'source of truth' data is coming from CSV files (see the source project data directory) so the first thing to do is protect these files and get them under source control.

Then I imported the CSV data with Excel (Data, Import) saving as xlsx (incluced in source project data directory), and drew a rough DB diagram on paper to trial the relationships

I used [SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms) with db diagrams to enter the schema and simple 1 to many ie link table Foreign Key constraints

![alt text](/assets/2020-03-01/ssms-diagram.jpg "DB Diagram"){:width="600px"}

I used a [SQL Server Database Project](https://docs.microsoft.com/en-us/sql/ssdt/how-to-create-a-new-database-project?view=sql-server-ver15) Visual Studio to keep the schema source controlled

- C# with [CsvHelper](https://joshclose.github.io/CsvHelper/) to load in the delimited text files (Extract)
- C# to analyse the data for anomalies and fix (Transform)
- C# with [Dapper](https://github.com/StackExchange/Dapper) to insert (Load)
- SQL to answer questions once the verified clean data was loaded
- C# to answer harder questions. Clarity over speed, iterative code fine to start with

![alt text](/assets/2020-03-01/db-compare.jpg "DB Compare"){:width="700px"}

DB project in Visual Studio comparing source control to the `(localdb)/mssqllocaldb`

## DB Schema

I used the same schema and naming convention as the source even though I don't like it: [Link to my article on db naming](/2016/10/19/ASP.NET-MVC-Sort-Filter,-Page-using-SQL)

Some observations were:

- Composite keys in link tables
- Capitalisation of columns names

## ETL with C#

- Extract from CSV
- Transform and exploring - do we need any data cleansing?
    - whitespace where shouldn't be
    - unusual characters - using UTF-8 in db and all queries parameterised
    - custom validation
- Load using Dapper
    - using the handy object mapper
    - [Could use SQLBulkCopy and FastMember](https://github.com/djhmateer/TwitterFullImporter/blob/master/SQLBulkCopyDemo/Program.cs) if Dapper isn't fast enough

Below is the salient code: 

```cs

var sw = Stopwatch.StartNew()
using var db = Util.GetOpenConnection();

// A simple flag to switch on an off parts of the etl load (some took some time)
bool writeToDb = true;
if (writeToDb)
{
    // clear down db first in correct order
    db.Execute("DELETE FROM MoviesToDirectors");
    // snip..
    db.Execute("DELETE FROM Actors");
}

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

    // check for interesting/bad/unusual characters that could affect results eg LF?..
    // all queries are paramerterised so no probs with ' chars
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
    if (writeToDb) db.Execute(sql, movie);
}

Console.WriteLine($"done in {sw.Elapsed.TotalSeconds}");

// snip...

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

public class Util
{
    public static IDbConnection GetOpenConnection()
    {
        var connection = new SqlConnection(  
            "Server=(localdb)\\mssqllocaldb;Database=IMDBChallenge;Trusted_Connection=True;"
            + "MultipleActiveResultSets=true");
        connection.Open();
        return connection;
    }
}
```

These load scripts are very good as can rebuild on any machine with a clone from source control. This is a very simple load script with no thought towards insert performance. [I could use SQLBulkCopy and FastMember](https://github.com/djhmateer/TwitterFullImporter/blob/master/SQLBulkCopyDemo/Program.cs) if Dapper isn't fast enough. Using `.AsParallel()` above didn't produce any gains, and actually hurt performance sometimes.

[There is a MiniProfiler for Consoleapps](https://miniprofiler.com/dotnet/ConsoleDotNetCore) which looks useful if you want to see performance and good logging.

## Serilog Logging

[Serilog](https://serilog.net/) is my logger of choice. Here are the [Serilog configuration basics](https://github.com/serilog/serilog/wiki/Configuration-Basics).

```cs
Log.Logger = new LoggerConfiguration()
     .WriteTo.Console()
     .WriteTo.File("../../../logs/log-.txt", rollingInterval: RollingInterval.Day)
     .CreateLogger();
Log.Information("Starting");
```

![alt text](/assets/2020-03-01/etl-output.jpg "ETL Output"){:width="800px"}
<!-- ![alt text](/assets/2020-03-01/etl-output.jpg "ETL Output") -->

[Preserving Object Structure - @Destructuring](https://github.com/serilog/serilog/wiki/Structured-Data#preserving-object-structure) is useful as shown above in the output and below in code:

```cs
foreach (var r in ratings)
{
    if (ListStringsContainLeadingOrTrailingWhitespace(new List<string> { r.movieid, r.rank.ToString(), r.votes.ToString(), r.distribution }))
    // @Destructuing my own Rating type (r)
        Log.Warning("Ratings whitespace somewhere in {@R} ", r);
}
```

## Unit Tests

I write xunit paramertarised tests for the functions that do the checking. Easy to do when you're in C#

```cs

[Theory]
[InlineData(null, true)]
[InlineData("", true)]
[InlineData("              ", true)]
[InlineData("asdf", false)]
[InlineData(" asdf", true)]
[InlineData("asdf ", true)]
[InlineData(" asdf  ", true)]
[InlineData("asdf asdf", false)]
public static void ContainsLeadingOrTrailingWhitespace_Tests(string s, bool expected)
{
    var result = ContainsLeadingOrTrailingWhitespace(s);
    Assert.Equal(expected, result);
}

```

## Errors and Logging

Try Catch and log out to serilog. Often I'll use a railway oriented style pipeline of - ie the data has to go through all the checks before allowed into the db. If it goes off on a branch line, it is not allowed into the db, it must go to the errors table.

## CSVHelper Errors

If you have problmes in the source of truth then have to be able to trap them.

[How to dump out problem rows in the CSV which cannot be read](https://github.com/JoshClose/CsvHelper/issues/803)

This strategy helps us get any issues that CSVHelper may have eg malformed rows

## Querying with SQL

SQL great once the data is loaded to answer some of the easier questions. Some notes to my future self include:

- count (1) - more performant than count(*)
- group by having - interesting syntax
- multiple left join pipeline strategy

## Exploring data with C#

I find that my functional set based SQL skills wane over time and it is easier to start thinking of a problem in an iterative manner first (ie get it working first, then work on performance later)

As we have the load scripts, can use these data structures and LINQ to analyse the data and answer hard questions.

I found a good strategy to be: Think of the datastructure I want to query to get the answer then work back

```cs
class Foo
{
    public string maleActorID { get; set; }
    public List<Bar> listBars { get; set; }
}

class Bar
{
    public string femaleActorIDworkedWith { get; set; }
    public List<string> movieIDsWorkedOnWithThisFemaleActor { get; set; }
}

```

## Conclusion

This is a simple strategy, however extremely effective, if you are a C# developer. Most of the issues I've seen with ETL packages have been with DB admins starting them, or people just trying their best.

There a many many tools out there to help you, however I would always advise the **simpler the better**
