---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: postgres 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2024-04-24/5.jpg "email"){:width="500px"}](/assets/2024-04-24/5.jpg) -->
<!-- [![alt text](/assets/2024-04-24/5.jpg "email")](/assets/2024-04-24/5.jpg) -->

<!-- [![alt text](/assets/2024-05-23/1.jpg "email"){:width="500px"}](/assets/2024-05-23/1.jpg) -->

I've got postgres running locally on a production VM which runs a website.

- Run VM deploy script which takes old db and restores onto new vm
- VM runs backup script every x minutes and stores db backup onto Azure storage

## Deploy copying old vm db to new vm

Run VM deploy script which takes old db and restores onto new vm

```bash
# part of infra.azcli

# B.  DB DUMP and RESTORE
printf "\n\n\** B. BACKUP DB on old VM, copy to dev, send to new vm, restore on new VM** \n\n"

# Big assumption is that there is only old RG
groups=$(az group list --query "[?contains(name, '${rgprefix}')]".name --output tsv)

for rgold in $groups
do
    if [ "$rgold" = "$rg" ]; then  
      echo "current rg so ignore"
    else
      echo "old rg is $rgold"

      # run pg_dump on old vm
      # dump file will be saved in /home/dave
      # F c  - Format compressed
      # f - file output

      # it will overwrite automatically
      # default U is posgres
      # default h is localhost
      # default p is 5432
      ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null dave@${rgold}.westeurope.cloudapp.azure.com 'pg_dump -U postgres -d golfsubmit_production  -Fc -f golfsubmit_production.dump'

      # copy file to dev and put in in dev secrets
      scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null dave@${rgold}.westeurope.cloudapp.azure.com:/home/dave/golfsubmit_production.dump /home/dave/code/golfsubmit/secrets/
    fi
done

# normal 
DB_FILENAME_TO_RESTORE="golfsubmit_production.dump"

# restore from Azure storage - copy file to /secrets on dev"
# DB_FILENAME_TO_RESTORE="2024-07-01__11_45_01.dump"

# copy db dump file to new vm
scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null /home/dave/code/golfsubmit/secrets/${DB_FILENAME_TO_RESTORE} dave@${dnsname}.westeurope.cloudapp.azure.com:/home/dave/db.dump

# restore on new vm
# --clean is drop objects before creating
# --if-exists is only drop if exists
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null dave@${dnsname}.westeurope.cloudapp.azure.com 'pg_restore -U postgres --clean --if-exists -v -d golfsubmit_production db.dump'
```

## Backup every x minutes on vm and copy to azure

VM runs backup script every x minutes and stores db backup onto Azure storage

```bash
# part of create_webserver.sh
printf "\n\n** 8.5 pg_dump every 15 mins **\n\n"

cd /home/dave
mkdir /home/dave/db-backups/

cat <<EOT >> run-backup-db
# this is every 15 minutes
# https://crontab.guru/#20_*/12_*_*_*
# send stdout and stderr to syslog via logger
*/2 * * * * dave cd /home/dave/secrets && ./backup-db.sh 2>&1 | /usr/bin/logger -t backup-db

EOT

sudo mv run-backup-db /etc/cron.d

sudo chown root /etc/cron.d/run-backup-db
sudo chmod 600 /etc/cron.d/run-backup-db

sudo chmod +x /home/dave/secrets/backup-db.sh



# The shell script that the above cron job runs every x minutes
# /secrets/backup-db.sh
#!/bin/sh

BACKUP_DIR="/home/dave/db-backups/"

#  30-06-2024-01-55-04-PM.dump
# FILE_NAME=$BACKUP_DIR`date +%d-%m-%Y-%I-%M-%S-%p`.dump

#  2024-06-30__14-55-04.dump (-u is UTC)
FILE_NAME=$BACKUP_DIR`date -u +%Y-%m-%d__%H-%M-%S`.dump

pg_dump -U postgres -d golfsubmit_production  -Fc -f $FILE_NAME



## NOTES

# F c  - Format compressed
# f - file output

# it will overwrite automatically
# default U is posgres
# default h is localhost
# default p is 5432

pg_dump -U postgres -h localhost -p 5432 -d golfsubmit_production  -F c -f golfsubmit_production.dump
pg_dump -U postgres -h localhost -d golfsubmit_production  -F c -f golfsubmit_production.dump
pg_dump -U postgres -d golfsubmit_production  -Fc -f golfsubmit_production.dump


# -v is verbose
pg_restore -U postgres -v -d golfsubmit_production golfsubmit_production.dump

# --clean is drop objects before creating
# --if-exists is only drop if exists
pg_restore -U postgres --clean --if-exists -v -d golfsubmit_production golfsubmit_production.dump

```

## Copy dump files to azure every x minutes and delete from local vm

```bash
# part of create_webserver.sh

printf "\n\n ******************"
printf "8.7 PYTHON to copy all pgdump files to storage every 15 mins then delete from local directory\n"
printf "******************"

cd /home/dave

cat <<EOT >> run-backup-db-dump-to-azure
*/2 * * * * dave cd /home/dave/secrets && pipenv run python /home/dave/secrets/backup-db-dump-to-azure.py 2>&1 | /usr/bin/logger -t backup-db-to-azure
EOT

sudo mv run-backup-db-dump-to-azure /etc/cron.d

sudo chown root /etc/cron.d/run-backup-db-dump-to-azure
sudo chmod 600 /etc/cron.d/run-backup-db-dump-to-azure

```

then the python file that the above cron job calls:

```py
#backup-db-dump-to-azure.py
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import os
from azure.storage.blob import BlobServiceClient

# shared access signature (sas) url
# create container, then right click on Azure Storage Explorer to get SAS and give appropriate permissions
sas_url = "https://glanstorageaccount.blob.core.windows.net/dbbackups?sv=20 **ETC**"
blob_service_client = BlobServiceClient(account_url=sas_url)

container_name = "dbbackups"

container_client = blob_service_client.get_container_client(container_name)

# prod
db_dump_path = '/home/dave/db-backups/'  # Path to db-backups 

# Upload files
for root, dirs, files in os.walk(db_dump_path):
    for file in files:
        file_path = os.path.join(root, file)
        blob_client = container_client.get_blob_client(file_path.replace(db_dump_path, ''))
        with open(file_path, "rb") as data:
            blob_client.upload_blob(data, overwrite=True)
            print(f"Uploaded {file_path} to Azure Storage.")
        # Delete the file after uploading
        os.remove(file_path)
        print(f"Deleted {file_path} from local file system.")

print("All files uploaded successfully.")
```

## Conclusion

A very simple and cost effective way (and powerful!) of keeping a single webserver website deployed in an automated manner.
