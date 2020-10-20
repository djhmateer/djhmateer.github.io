---
layout: post
title: MSSQL Graph 
description: 
menu: review
categories: MSSQL Graph
published: false 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"}

## What is a graph database

[Tony Bater eloquently answered this](https://www.sqlservercentral.com/articles/relational-database-or-graph-database-why-not-have-both) by asking: What problem is so intractable that SQL Server is not the best solution.

His domain of healthcare, specifically a complex hierarchy of related concepts.

## Why use one

Hierarchy - can use recursive queries in MSSQL using Common Table Expressions eg [here](https://stackoverflow.com/questions/14518090/recursive-query-in-sql-server) and [MS Docs](https://docs.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql?view=sql-server-ver15)

## MSSQL

[MSSQL introduced SQL Graph](https://docs.microsoft.com/en-us/sql/relational-databases/graphs/sql-graph-overview?view=sql-server-ver15) functionality in SQL2017, then included more in SQL2019 (specifically a `SHORTEST_PATH` implementation)

[RedGate 2017 example](https://www.red-gate.com/simple-talk/sql/t-sql-programming/sql-graph-objects-sql-server-2017-good-bad/)

[RedGate 2019 follow up example with shortest_path](https://www.red-gate.com/simple-talk/sql/sql-development/sql-server-2019-graph-database-and-shortest_path/) which includes [the sql script](https://1drv.ms/u/s!ApgSbfuN8DmZnMZyL0ATb0ZnmOkvqg?e=VwBGjy) to create the graph database.

## Nodes and Edges

- Nodes are the things eg Members, Actors, Posts  
- Edges are the relationships eg writtenBy, likes, actedIn

## Syntax and ORMs

```sql
-- members like the replies to their posts
INSERT Likes ($to_id,$from_id) VALUES
       ((SELECT $node_id FROM dbo.ForumPosts WHERE PostID = 4),
       (SELECT $node_id FROM dbo.ForumMembers WHERE MemberID = 1)),
```

The syntax to insert data is verbose and a good candidate for an ORM to help however [Entity Framework doesn't have support yet](https://stackoverflow.com/questions/46733719/syntax-for-entity-framework-query-to-sql-server-2017-graph-database) 

Notice here that `INSERT INTO` is just `INSERT` which is [quite a common shortcut apparently](https://www.red-gate.com/simple-talk/sql/learn-sql-server/working-with-the-insert-statement-in-sql-server/). The same is true for `DELETE FROM tablename` ie just use `DELETE tablename`

I use my own ETL to generate raw SQL to insert data. I've found that unsurprisingly it is much slower to insert than just into raw tables:

## Neo4J

Is a popular JVM based Graph database. There is an official [.NET driver for it too](https://neo4j.com/developer/dotnet/)

## Other articles

[Terry McCann from adatis](https://adatis.co.uk/sql-server-2017-graph-data-processing-an-introduction/)

[Degrees of separation using a CTE](https://stackoverflow.com/questions/55717636/finding-shortest-path-up-to-ten-degrees-of-separation)

[Another degrees of separation using a CTE](https://stackoverflow.com/questions/33814857/sql-query-6-degrees-of-separation-for-network-analysis)
