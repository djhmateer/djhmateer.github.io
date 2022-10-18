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

# custom compressed file format which pg_restore can restore from
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

It would be very nice to backup to a shared drive on Azure so can keep backups between vm updates. See notes on smb mounting in 2021-09-17-azure file share.

## backup and restore db for a new deployment

I like deployments to be fully automated. So when I run [infra.sh](https://github.com/osr4rightstools/osr4rights-tools/blob/main/fire-map-infra/infra.azcli) to create a new PHP vm I want the old db to be backed up and restored on to the new vm

```bash
echo "backing up database from old vm on $resourcegroup"
pgpassword=$(<../secrets/pgpassword.txt)
file_name=`date +%d-%m-%Y-%I-%M-%S-%p`.backup
pg_dump -Fc -d postgres://postgres:${pgpassword}@$resourcegroup.westeurope.cloudapp.azure.com:5432/nasafiremap > $file_name

echo "restoring to new vm on $rg"
export PGPASSWORD=$pgpassword
pg_restore -h $rg.westeurope.cloudapp.azure.com -U postgres -v -d "nasafiremap" $file_name
```

This pulls the backup file down to my local dev machine, which is useful for a snapshot offsite backup

