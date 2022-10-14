---
layout: post
# title: MSSQL PHP on WSL setup
description: 
menu: review
categories: postgres
published: true 
comments: false     
sitemap: true
image: /assets/2022-09-22/1.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->

<!-- [![alt text](/assets/2022-09-15/fire-map.jpg "email")](/assets/2022-09-15/fire-map.jpg) -->

<!-- [![alt text](/assets/2022-09-15/cookie.jpg "email")](/assets/2022-09-15/cookie.jpg) -->


I wanted to get a local version of Python code running against a Postgres db. I use WSL2.

[https://chloesun.medium.com/set-up-postgresql-on-wsl2-and-connect-to-postgresql-with-pgadmin-on-windows-ca7f0b7f38ab](https://chloesun.medium.com/set-up-postgresql-on-wsl2-and-connect-to-postgresql-with-pgadmin-on-windows-ca7f0b7f38ab)

## Postgres 13

```bash
sudo apt -y install gnupg2
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee  /etc/apt/sources.list.d/pgdg.list
sudo apt update
sudo apt install postgis postgresql-13-postgis-3 -y
```

Below would have got 12

```bash
sudo apt install postgresql postgresql-contrib
sudo apt install postgis postgresql-postgis 

# 12.12
psql --version

sudo service postgresql status
sudo service postgresql start

sudo passwd postgres

sudo -u postgres psql -c "ALTER USER postgres PASSWORD '<new-password>';"
```

### Remove a version

[https://askubuntu.com/a/32735/677298](https://askubuntu.com/a/32735/677298)

```bash
# removes all instances of posgres
sudo apt-get --purge remove postgresql postgresql-*
```

## PGAdmin

[![alt text](/assets/2022-10-12/1.jpg "email")](/assets/2022-10-12/1.jpg)

Connect to WSL Postgres from Windows PGAdmin. Use 127.0.0.1 and not localhost to stop errors such as `could not receive data from server: Socket is not connected (0x00002749/10057)`

## Connect from Python

Remember to update `/etc/postgres/12/main/pg_hba.conf` to allow md5 then restart postgres


```txt
# /etc/postgres/12/main/pg_hba.conf
# sudo service postgresql restart

# Database administrative login by Unix domain socket
#local   all             postgres                                md5

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5

# IPv4 local connections:
host    all             all             127.0.0.1/32            md5

# opening up to outside on port 5432
host    all             all             all                     md5

# IPv6 local connections:
host    all             all             ::1/128                 md5

# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     peer
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md5
```

Using `import psycopg2` we can do a test

```python
import psycopg2

password = 'test'

engine = create_engine('postgresql://postgres:'+password+'@localhost:5432/nasafiremap')
sql.execute('DROP TABLE IF EXISTS MODIS_C6_1_Global_24h'  , engine)
```

## Backup and Restore

I run automated build scripts, so a quick win is to simply back the database on the old vm, then restore on the new one. I'm not worried about losing a minutes worth of transactions.

Also a quick win is to backup every night via a cron job.

```bash

```