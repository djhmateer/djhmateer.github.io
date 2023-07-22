---
layout: post
title: Python MSSQL 
description: 
#menu: review
categories: python
published: true 
comments: false     
sitemap: true
image: /assets/2023-07-22/2.jpg
---


[![alt text](/assets/2023-07-22/2.jpg "email")](/assets/2023-07-22/2.jpg)

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

```py
# cred_mssql.py
# an easy way to import credentials
server = 'tcp:xxxx.database.windows.net' 
database = 'dbname' 
username = 'dave' 
password = 'secrethere' 

# tweet.py
import cred_mssql
import pyodbc 
from loguru import logger

logger.debug(f'Trying to connect to db')
conn_string = 'DRIVER={ODBC Driver 18 for SQL Server};SERVER='+cred_mssql.server+';DATABASE='+cred_mssql.database+';ENCRYPT=yes;UID='+cred_mssql.username+';PWD='+ cred_mssql.password
logger.debug(conn_string)

# this will throw if it doesn't connect
cnxn = pyodbc.connect(conn_string)
```

## Exceptions

I have had this error from an Ubuntu 20.04 server (on my local network running under Proxmox).

```bash
pyodbc.OperationalError: ('HYT00', '[HYT00] [Microsoft][ODBC Driver 18 for SQL Server]Login timeout expired (0) (SQLDriverConnect)')
```

My WSL2 (Ubuntu 22.04) instance runs fine, as does cloud server on Ubuntu 20.04.

Turns out it was the pfsense firewall blocking the outbound 1433 port.

## Production

[https://github.com/djhmateer/auto-archiver/blob/main/tweet.py](https://github.com/djhmateer/auto-archiver/blob/main/tweet.py) is an example of how I use this in prod.

[https://github.com/djhmateer/auto-archiver/blob/main/infra/server-build.sh](https://github.com/djhmateer/auto-archiver/blob/main/infra/server-build.sh) automated build script for a server.

