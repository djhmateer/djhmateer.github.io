---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
# menu: review
categories: certbot 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2024-04-24/5.jpg "email"){:width="500px"}](/assets/2024-04-24/5.jpg) -->
<!-- [![alt text](/assets/2024-04-24/5.jpg "email")](/assets/2024-04-24/5.jpg) -->

<!-- [![alt text](/assets/2024-05-23/1.jpg "email"){:width="500px"}](/assets/2024-05-23/1.jpg) -->


Goal: to be able to deploy a VM running certbot many times via an Azure CLI bash script, and have the SSH cert stored somewhere. We are rate limited to only 5 duplicate certificates per week by LetsEncrypt.

## Deploy certs from dev and setup certbot on live

I've got a certbot set of certs locally on my dev machine which have been issued for a few years, so lets deploy those.

To get certbot running manually I followed the instructions on [https://certbot.eff.org/](https://certbot.eff.org/) and [my blog](/2023/10/12/certbot-on-nginx-reverse-proxy)

Essentially

```bash
sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

# follow the instructions in the shell
sudo certbot --nginx
```

I've got a few months left on the certs, so enough to play with many deployments


```bash
# Certbot for Letsencrypt

# take current certs off proxmox server
# sudo tar czvf l.tar.gz /etc/letsencrypt/

# copy from remote to local
# scp dave@172.16.44.101:/home/dave/l.tar.gz .

sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo mkdir /etc/letsencrypt
sudo cp -R /home/dave/secrets/letsencrypt/. /etc/letsencrypt/.

# Delete files in /live/hmsoftware.org/ and leave directory
sudo find /etc/letsencrypt/live/hmsoftware.org/ -type f -exec rm -f {} \;

# make sym links 
sudo ln -s /etc/letsencrypt/archive/hmsoftware.org/cert5.pem /etc/letsencrypt/live/hmsoftware.org/cert.pem
sudo ln -s /etc/letsencrypt/archive/hmsoftware.org/chain5.pem /etc/letsencrypt/live/hmsoftware.org/chain.pem
sudo ln -s /etc/letsencrypt/archive/hmsoftware.org/fullchain5.pem /etc/letsencrypt/live/hmsoftware.org/fullchain.pem
sudo ln -s /etc/letsencrypt/archive/hmsoftware.org/privkey5.pem /etc/letsencrypt/live/hmsoftware.org/privkey.pem

# good test
# sudo certbot renew --dry-run

## Nginx

sudo cp /home/dave/infra/nginx.conf /etc/nginx/sites-available/default

# test nginx conf
# sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx
# sudo nginx -s reload
```

And the nginx conf file:

```bash
# /etc/nginx/sites-available/default.conf

# redirect http to https apex
# http://www.hmsoftware.org
# http://hmsoftware.org 
server {
    listen        80;
    server_name   www.hmsoftware.org hmsoftware.org;
    return 301    https://hmsoftware.org$request_uri;
}

# redirect https www to apex
# https://www.hmsoftware.org
server {
    listen        443 ssl;
    server_name   www.hmsoftware.org;

    ssl_certificate /etc/letsencrypt/live/hmsoftware.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/hmsoftware.org/privkey.pem; # managed by Certbot

    return 301    https://hmsoftware.org$request_uri;
}

server {
  server_name hmsoftware.org;

  location / {
        proxy_pass         http://localhost:3000;
        # to stop 110sec nginx timout of long running kestrel queries
        # https://stackoverflow.com/questions/18740635/nginx-upstream-timed-out-110-connection-timed-out-while-reading-response-hea
        proxy_read_timeout 3600;
        # so tus can resume
        # https://github.com/tusdotnet/tusdotnet/issues/105
        proxy_request_buffering off;

        # https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-5.0
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;

        # https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/
        proxy_set_header X-Real-IP $remote_addr; 
        
        # for passing the original http version eg HTTP/1.0 1.1 or 2
        proxy_set_header X-DM-Request $request; 
        # test
        proxy_set_header X-DM-Referer $http_referer; 
        # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; <---this line too

        # https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-5.0#configure-the-firewall
        #2021/10/07 08:43:24 [emerg] 3968#3968: zero size shared memory zone "one"
        # limit_req  zone=one burst=10 nodelay;
    }

    # Disable max size of upload eg 100M
    client_max_body_size 0;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/hmsoftware.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/hmsoftware.org/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
} 
```

[![alt text](/assets/2024-06-26/1.jpg "email"){:width="500px"}](/assets/2024-06-26/1.jpg)

Current date is 26th June, this is a brand new VM deployment with cert copied manually from dev machine. 

## Will this renew automatically?

Running `sudo certbot renew --dry-run` on the server looks promising

`systemctl list-timers` shows 5mins left on the `snap.certbot.renew.service`

Log files are in `/var/log/letsencrypt`

<!-- [![alt text](/assets/2024-06-26/2.jpg "email"){:width="500px"}](/assets/2024-06-26/2.jpg) -->
[![alt text](/assets/2024-06-26/2.jpg "email")](/assets/2024-06-26/2.jpg)

Looks good - nothing to do and it has checked automatically.

It checks twice per day by default, and will renew when it has less than 30 days until expiration. So I've got until August the 7th until it should renew.

**need to check and leave overnight**


## 4 URLs Check

[https://www.digicert.com/help/](https://www.digicert.com/help/) is a good checker for www and apex ie do both.

```bash
# 200
curl -I https://hmsoftware.org

## 301 Moved 
curl -I https://www.hmsoftware.org

## 301 Moved
curl -I http://www.hmsoftware.org

## 301 Moved Permanently to https://hmsoftware.org/
curl -I http://hmsoftware.org
```
https://hmsoftware.org/ - good

So I had a cert which has only been issued to hmsoftware.org and not to www.hmsoftware.org. Maybe because the original nginx configuration was not answering on www.hmsoftware.org. This is done automatically when we request a new certificate.

Lets blow it all away and do a manual run and see what happens ie what directories are created. No new files or directories were created, I just needed nginx to answer on www during the renewal process.

```bash
# this errored saying I have to use --expand to have the www cert too
 sudo certbot certonly --nginx --staging -d hmsoftware.org -d www.hmsoftware.org --email davemateer@gmail.com --agree-tos --non-interactive --no-eff-email --dry-run

# success dry run
 sudo certbot certonly --nginx --staging -d hmsoftware.org -d www.hmsoftware.org --email davemateer@gmail.com --agree-tos --non-interactive --no-eff-email --expand --dry-run

# errord - need to pass --break-my-certs flag!
  sudo certbot certonly --nginx --staging -d hmsoftware.org -d www.hmsoftware.org --email davemateer@gmail.com --agree-tos --non-interactive --no-eff-email --expand 

# Renewing an existing certificate for hmsoftware.org and www.hmsoftware.org
# Successfully received certificate.
# Certificate is saved at: /etc/letsencrypt/live/hmsoftware.org/fullchain.pem
# Key is saved at:         /etc/letsencrypt/live/hmsoftware.org/privkey.pem
# Certbot has set up a scheduled task to automatically renew this certificate in the background.
  sudo certbot certonly --nginx --staging -d hmsoftware.org -d www.hmsoftware.org --email davemateer@gmail.com --agree-tos --non-interactive --no-eff-email --expand --break-my-certs

sudo systemctl restart nginx

# lets get a real cert for both domains - dry run 
sudo certbot certonly --nginx -d hmsoftware.org -d www.hmsoftware.org --email davemateer@gmail.com --agree-tos --non-interactive --no-eff-email --dry-run

# real - and force renewal and staging cert not expired and we want a real one
sudo certbot certonly --nginx -d hmsoftware.org -d www.hmsoftware.org --email davemateer@gmail.com --agree-tos --non-interactive --no-eff-email --force-renewal
```

## Store certs in Azure Storage

I could mount the certs as a fileshare in AzureStorage

But I prefer backing up to blob storage for speed and simpicity.

Have got a script on the prod server writing the certs to Azure Blob storage every 12 hours.

```py
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import os
from azure.storage.blob import BlobServiceClient

# got this from Azure Storage Explorer right clicking on the container I created under Blob Containers.
# then got shared access signature
sas_url = "https://xxxstorageaccount.blob.core.windows.net/gl ..."
blob_service_client = BlobServiceClient(account_url=sas_url)

container_name = "hmsoftwareorg"

container_client = blob_service_client.get_container_client(container_name)

# prod
certbot_path = '/etc/letsencrypt/archive/hmsoftware.org/'  # Path to Certbot certificates

# dev testing
# certbot_path = "/home/dave/code/golfsubmit/secrets/letsencrypt/archive/hmsoftware.org/"

# Upload files
for root, dirs, files in os.walk(certbot_path):
    for file in files:
        file_path = os.path.join(root, file)
        blob_client = container_client.get_blob_client(file_path.replace(certbot_path, ''))
        with open(file_path, "rb") as data:
            blob_client.upload_blob(data, overwrite=True)
            # print(f"Uploaded {file_path} to Azure Storage.")

# print("All files uploaded successfully.")
```
then

```bash
# setup a cron job to backup ssl certs all the time to azure
cd /home/dave

cat <<EOT >> run-backup-certbot-to-azure
# this is every 2 minutes
# */2 * * * * dave cd /home/dave/secrets && pipenv run python /home/dave/secrets/backup-certbot-to-azure.py

# every 12 hours 

# send stdout and stderr to syslog via logger
* */12 * * * dave cd /home/dave/secrets && pipenv run python /home/dave/secrets/backup-certbot-to-azure.py 2>&1 | /usr/bin/logger -t certbot-backup
EOT

sudo mv run-backup-certbot-to-azure /etc/cron.d

sudo chown root /etc/cron.d/run-backup-certbot-to-azure
sudo chmod 600 /etc/cron.d/run-backup-certbot-to-azure
```



## Delete a website from certbot

```bash
# this deletes directories too
sudo certbot delete --cert-name yourdomain.com
```

## Commands

Some useful commands

```bash

# certonly doesn't make changes to nginx conf
# dry run will not issue a cert (and use up allocation) but will check all is good
sudo certbot certonly --nginx -d hmsoftware.org -d www.hmsoftware.org --email davemateer@gmail.com --agree-tos --non-interactive --no-eff-email --dry-run

# staging cert you can ask for more more - a dummy cert
 sudo certbot certonly --nginx --staging -d hmsoftware.org -d www.hmsoftware.org --email davemateer@gmail.com --agree-tos --non-interactive --no-eff-email 

# register only does:
# makes /etc/letsencrypt/accounts
# makes /etc/letsencrypt/renewal-hooks
 sudo certbot register -d hmsoftware.org --email davemateer@gmail.com --agree-tos --non-interactive --no-eff-email

# can force a renew
sudo certbot renew --force-renewal
```

## Summary

To deploy

- Check Azure storage for new certs from current vm and copy to Dev vm
- Deploy a new VM with certs from Dev VM
- Copy certs every 12 hours to Azure Storage from live
- When live VM needs a new cert it gets it


