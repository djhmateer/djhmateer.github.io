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

## Data Analysis with Excel

Load from CSV (even though it is semicolon separated)

get a feel for data - number of rows

**show image of db diagram

## DB Schema

used the same as the source even though I don't like it:

[link to my goto article on db design]()

## ETL

Extract from CSV
Transform and exploring - do we need any data cleansing?
  whitespace where shouldn't be 
  unusual characters - using UTF-8 in db and all queries parameterised

## Querying with SQL

SQL great once I had data loaded

Load scripts very good as can rebuild on any machine with `useDb` flag. If I delete in correct order, then don't need to take off constraints.


C# good for complex queries to understand the data and to get something working even though it will not per as performant.

## Querying with C#

As we have the load scripts, can use these data structures and LINQ to analyse the data and answer hard questions.

I found a good strategy to be: Think of the datastructure I want to query to get the answer then work back