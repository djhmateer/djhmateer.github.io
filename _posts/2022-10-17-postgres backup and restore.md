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

## cron daily backup of db

[https://gist.github.com/linuxkathirvel/90771e9d658195fa59e0f0b921f7e22e](https://gist.github.com/linuxkathirvel/90771e9d658195fa59e0f0b921f7e22e) I ended up using this strategy to create a daily backup job.

```bash
# /etc/cron.d/postgres-cron-backup

# 1400UTC (1500UK Summer Time). nasa download happens at 0100 and 1300 UTC
0 14 * * *  dave   /home/dave/source/fire-map-infra/postgres-cron-backup.sh
```

then

```bash
#!/bin/bash
# /home/dave/source/fire-map-infra/postgres-cron-backup.sh

BACKUP_DIR="/home/dave/"
FILE_NAME=$BACKUP_DIR`date +%d-%m-%Y-%I-%M-%S-%p`.sql

pg_dump -Fc -U postgres nasafiremap > $FILE_NAME
```

As we're not using a password, we need to trust local connections

```txt
# /etc/postgres/12/main/pg_hba.conf
# sudo service postgresql restart

# Database administrative login by Unix domain socket
#local   all             postgres                                md5

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     trust

# IPv4 local connections:
host    all             all             127.0.0.1/32            trust

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


## old

[https://www.tecmint.com/backup-and-restore-postgresql-database/](https://www.tecmint.com/backup-and-restore-postgresql-database/)

I run automated build scripts, so a quick win is to simply back the database on the old vm, then restore on the new one. I'm not worried about losing a minutes worth of transactions.

Also a quick win is to backup every night via a cron job.

[https://unix.stackexchange.com/a/417327/278547](https://unix.stackexchange.com/a/417327/278547) /etc/crond.d vs crontab

[https://serverfault.com/questions/352835/crontab-running-as-a-specific-user](https://serverfault.com/questions/352835/crontab-running-as-a-specific-user) and can run as a specific user
