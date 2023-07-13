---
layout: post
title: Python MSSQL 
description: 
menu: review
categories: python
published: true 
comments: false     
sitemap: true
image: /assets/2023-07-06/1.jpg
---


<!-- [![alt text](/assets/2023-07-06/1.jpg "email")](/assets/2023-07-06/1.jpg) -->

WIth C# I know how to

- connect to mssql using a micro orm (Dapper)
- retry mssql using Polly

How to do this from Python side on Linux servers

[Python Driver for SQL Server](https://learn.microsoft.com/en-us/sql/connect/python/python-driver-for-sql-server?view=sql-server-ver16)

## Install ODBC then pyodbc

[https://learn.microsoft.com/en-us/sql/connect/python/pyodbc/python-sql-driver-pyodbc?view=sql-server-ver16](https://learn.microsoft.com/en-us/sql/connect/python/pyodbc/python-sql-driver-pyodbc?view=sql-server-ver16)

### ODBC

[Docs](https://learn.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver16&tabs=alpine18-install%2Calpine17-install%2Cdebian8-install%2Credhat7-13-install%2Crhel7-offline)


## pyodbc

```bash
pip install pyodbc

# or add to Pipfile
pip install --upgrade pip

# gets pyodbc 4.0.39 which is most up to date as of Apr 14th 2023 (today is 10th July 2023)
pipenv update

```

## First Query

[From connect to SQL](https://learn.microsoft.com/en-us/sql/connect/python/pyodbc/step-3-proof-of-concept-connecting-to-sql-using-pyodbc?view=sql-server-ver16)

```python

```
