---
layout: post
title: Postgres 
description: 
menu: review
categories: Postgres BrokenLinkChecker 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- ![alt text](/assets/2020-02-03/41.jpg "Choosing an image"){:width="600px"} -->

[PostgreSQL](https://www.postgresql.org/) is a database which is

- Lighweight (31MB download on Linux compared to many GB for MSSQL)
- Very powerful
- No licensing issues (compared to MSSQL)

[PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) is also known as Postgres which I find easier to write.

After 15 years using MSSQL with a bit of MySQL, I have an ideal SaaS project where Postgres may be a good fit.

## Installing on Windows

I'm using version 12.4.1 as on my Ubuntu 18.04 LTS server this is still the default. 13 is the newest.

[PostgreSQL docker image](https://hub.docker.com/_/postgres) and a quick start:

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

I like to install on my machine though:

[Download Postgres here](https://www.postgresql.org/download/)

Which installs to:

C:\Program Files\PostgreSQL\12

and data files are in:

C:\Program Files\PostgreSQL\12\data

I followed all the defaults with the salient points being:

- superuser: postgres
- p: letmein (choose a good local password!)
- port: 5432

After the install the Stack Builder dialog pops up:

![alt text](/assets/2020-11-09/stackbuilder.jpg "Stack Builder"){:width="500px"}

Can install other components here like the powerful [PostGIS](https://postgis.net/), and [Npgsql](https://www.npgsql.org/) driver. I didn't install anything. I'll let my own .NET projects handle the driver package management through NuGet.

## pgAdmin 4


![alt text](/assets/2020-11-09/pgadmin.jpg "pg admin"){:width="800px"}

By default this is installed - launch from the start menu `pgadmin` which starts admin server and launches the browser. 

I prefer to use Azure Data Studio:


## Azure Data Studio 

[Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/extensions/postgres-extension?view=sql-server-ver15) with Postgres extension [here to download](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15) is based on VS Code and is my preferred front end to Postgres.

I'm using version 1.23.0 (October 14, 2020) of ADS and 0.2.6 of the PostgreSQL estension for Azure Data Studio.

![alt text](/assets/2020-11-09/ads.jpg "Azure Data Studio"){:width="800px"}

then if the connection is successful you'll see

![alt text](/assets/2020-11-09/ads-logged-in.jpg "Azure Data Studio successful login"){:width="600px"}

## SQL 

The first thing to notice is you can't right click on the Databases and create a new db. But lets just do it all in SQL:

![alt text](/assets/2020-11-09/sql.jpg "SQL and creating the db"){:width="800px"}

After creating the db, remember to chage the connection to use the new db.

```sql
CREATE DATABASE passwordpostgres;

-- Remember to stop and reconnect to your new db!

-- dev
CREATE ROLE alice SUPERUSER LOGIN PASSWORD 'letmein2';

-- prod
--CREATE ROLE bob SUPERUSER LOGIN PASSWORD 'letmein3'

-- for testing Register and Login
CREATE TABLE login (
	login_id integer generated always AS IDENTITY primary key,
	email text UNIQUE NOT NULL,
	password_hash text NOT NULL,
	verified boolean NOT NULL
);

CREATE INDEX login_email_index ON login (email);

-- for DBTest
CREATE TABLE employee (
    first_name varchar (99),
    last_name varchar (100), 
    address varchar (4000)
);

-- rob's cassini
-- no pk yet (applied after the import_data)
create table master_plan(
  date text,
  team text,
  target text,
  title text,
  description text
);

INSERT INTO employee (first_name, last_name, address) VALUES ('John', 'Smith', '123 Duane St');

INSERT INTO employee (first_name, last_name, address) VALUES ('Dave', 'Mateer', '1 Main St');
INSERT INTO employee (first_name, last_name, address) VALUES ('Dave2', 'Mateer2', '2 Main St');
INSERT INTO employee (first_name, last_name, address) VALUES ('Dave3', 'Mateer3', '3 Main St');
INSERT INTO employee (first_name, last_name, address) VALUES ('Dave4', 'Mateer4', '4 Main St');

COPY master_plan
FROM 'c:/temp/master_plan.csv'
WITH DELIMITER ',' HEADER CSV;;

alter table master_plan
add id serial primary key;

```

F5 to run a query

## Projects and Help

[Postgresql and Dapper](https://dotnetcorecentral.com/blog/postgresql-and-dapper-in-net-core-part-1/) was nice simple start with the easiest thing to get going.

[TardisBank](https://github.com/TardisBank/TardisBank/tree/master/db) helped me understand how to use Postgres with .NET well.

[Rob Conery - PostgreSQL for those who can't even part 1](https://rob.conery.io/2020/01/24/postgresql-for-those-who-cant-even-part-1/) showed me how to import a csv easily.


## Capital letters

[The default is to use lower case](https://dev.to/lefebvre/dont-get-bit-by-postgresql-case-sensitivity--457i) for

- db name
- table names
- columns


## Connection String and Getting Data

[Connect to a database using Dapper](/2020/10/12/connect-to-database-using-dapper) explains how I like to manage connections


Here you can see I'm taking the lower case Postgres to the CamelCase .NET standard

```cs
public static async Task<IEnumerable<Employee>> GetEmployees(string connectionString)
{
    using var conn = GetOpenConnection(connectionString);

    var result = await conn.QueryAsync<Employee>(
        "SELECT first_name as FirstName, last_name as LastName, address as Address " +
        "FROM employee");

    return result;
}
```

## Installing on Ubuntu

[How to Install and Use PostgreSQL on Ubuntu 18.04](https://cloudinit.co/how-to-install-and-use-postgresql-on-ubuntu-18-04/)

I'm using a simple bash command on creation of the vm:

```bash
# Postgres
- sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
- wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
- sudo apt-get update
- sudo apt-get -y install postgresql

- sudo systemctl start postgresql@12-main

# create Db, Role of Bob for app to conect to 
# -a is to print all the output inclding data to stdout (useful for debugging)
- cd /home/dave/source/infra
- sudo -u postgres psql -a -f create_db.sql
- sudo -u postgres psql -a -f create_role.sql

# insert seed data
- sudo -u postgres psql -d passwordpostgres -a -f create_tables.sql
- sudo -u postgres psql -d passwordpostgres -a -f insert_data.sql
- sudo -u postgres psql -d passwordpostgres -a -f import_data.sql
```

## Roles

I've created a Superuser role above which is not good for production.


## Backups

asdf

## How to deal with recreating db's

I use IaaS to spin up and down VM's all the time when deploying code. Currently I'm running Postgres on the same machine as the webserver. When you can run everything you need on a single VM with 1GB of RAM, it is blazingly fast to run (with no network latency) and makes life very simple. Years of docker, K8s have taught me the value of simplicity.

## Tuning of Postgres

[PGTune](https://pgtune.leopard.in.ua/#/) helps to tune Postgres for the server you are running on and workload.

## Casting

This seems very powerful!

```sql
SELECT  '2019-06-22 12:39:08'::timestamp - '2019-06-22 10:58:01'::timestamp

--multi casting
--would return "2019-06-22"
select '2019-06-22 12:39:08'::timestamp::date::text
```

