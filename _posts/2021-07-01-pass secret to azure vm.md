---
layout: post
title: Inject secrets to VM 
description: 
menu: review
categories: Azure 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

I use the Azure CLI to create VM's. I need to be able to pass secrets to it from my local machine

- Have got 4 secret guids I need to inject write to a configuration file
- Email secret for Postmark / Sendgrid

## run-command to create a file on the vm

A simple way to run a script on a remote vm

[https://argonsys.com/microsoft-cloud/library/how-to-run-scripts-on-azure-virtual-machines-with-the-run-command/](https://argonsys.com/microsoft-cloud/library/how-to-run-scripts-on-azure-virtual-machines-with-the-run-command/)

```bash
# creates /etc/systemd/system/kestrel-osr.service
az vm run-command invoke \
    -g ${rg} \
    -n ${vmname} \
    --command-id RunShellScript \
    --scripts @../secrets/create-kestrel-osr-with-secrets.sh

# gets .NET, clones source code, does a release build, starts systemd kestrel service
# systemd reads from file created on the vm above
# and sets environmental variables and starts kestrel webserver
az vm run-command invoke \
    -g ${rg} \
    -n ${vmname} \
    --command-id RunShellScript \
    --scripts @create_webserver.sh
```

Where my `../secrets/create-kestrel-osr-with-secrets.sh` file is:

```bash
#!/bin/sh

cd /home/dave

# EOT is End of Transmission
cat <<EOT >> kestrel-osr.service
[Unit]
Description=Website running on ASP.NET 5 

[Service]
WorkingDirectory=/var/www
ExecStart=/usr/bin/dotnet OSR4Rights.Web.dll --urls "http://*:5000"

Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10

# copied from dotnet documentation at
# https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-3.1#code-try-7
KillSignal=SIGINT
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

Environment=AZURE_CLIENT_ID=guid here
Environment=AZURE_TENANT_ID=guid here
Environment=AZURE_CLIENT_SECRET=guid here
Environment=AZURE_SUBSCRIPTION_ID=guid here

SyslogIdentifier=dotnet-OSR4Rights.Web
User=www-data

[Install]
WantedBy=multi-user.target
EOT

# environmental variable secrets
sudo cp /home/dave/kestrel-osr.service /etc/systemd/system/kestrel-osr.service
```

and my `create_webserver.sh` file is

```bash
#!/bin/sh

# go with newer apt which gets dependency updates too (like linux-azure)
sudo apt update -y
sudo apt upgrade -y
  
# Install .NET 5 on Ubutu 20.04 LTS
wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb

sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-5.0

# create document root for published files 
sudo mkdir /var/www
# etc..
```


Log files from the run-command can be found:

```bash
# logs for stdout and stderr
/var/lib/waagent/run-command/download/
```

## cloud-init

## Azure VM Custom Script Extension

Uses Azure VM Agent to download and run scripts on a VM. however it is somewhat heavyweight. It needs to be removed once run.

## az vm extension set

[https://docs.microsoft.com/en-us/cli/azure/vm/extension?view=azure-cli-latest](https://docs.microsoft.com/en-us/cli/azure/vm/extension?view=azure-cli-latest)

## Key Vault
asdf

## Azure secrets

```bash
# this is for certificates only
az vm create --secrets

```

## Bash templating / search and replace 

<!-- ![alt text](/assets/2020-10-21/secrets.jpg "Secrets"){:width="800px"} -->
![alt text](/assets/2020-10-21/secrets.jpg "Secrets")

This folder is not checked into source control.

![alt text](/assets/2020-10-21/secrets2.jpg "Secrets the details")

There are simple text files for my API keys

When my [Azure CLI script runs - here is a demo](https://github.com/djhmateer/password-postgres/blob/main/infra/infra.azcli), this is near the top

```bash
## search and replace the {{SENDGRID_API_KEY}} in cloud-init.yaml
## which is stored in the projects secrets/ folder
## which isn't checked into public source control (kept on OneDrive)
## then make sure this new cloud-init-with-secrets.txt is in /secrets

## Assuming if sendgridfilename exists, then postmark will too
sendgridfilename="../secrets/sendgrid-passwordpostgres.txt"
postmarkfilename="../secrets/postmark-passwordpostgres.txt"
if [ -f "$sendgridfilename" ]; then
  sendgridkey=$(cat "$sendgridfilename")
  postmarkkey=$(cat "$postmarkfilename")

  # this will overwrite without asking
  cp cloud-init.yaml ../secrets/cloud-init-with-secrets.yaml

  # replace
  sed -i -e "s/{{SENDGRID_API_KEY}}/$sendgridkey/g" ../secrets/cloud-init-with-secrets.yaml
  sed -i -e "s/{{POSTMARK_SERVER_TOKEN}}/$postmarkkey/g" ../secrets/cloud-init-with-secrets.yaml

else
  read -p "Sendgrid file not found, press any key to continue - do you really want to continue? (no infrastructure created yet)"
fi

```

So this inserts keys into my cloud-init.yml file which is passed to the VM on creation, so the keys end up on the destination server without being checked into source control.

```yml
  # will use bash templating to insert this secret in
  - echo "Creating secrets directory with api keys in"
  - sudo mkdir /var/www/web/secrets
  - cd /var/www/web
  # todo work on these as was getting strange problems
  - chmod -R 777 secrets
  - cd secrets
  # this is replaced when infra.azcli is run
  - printf "{{SENDGRID_API_KEY}}" > sendgrid-passwordpostgres.txt
  - printf "{{POSTMARK_SERVER_TOKEN}}" > postmark-passwordpostgres.txt
```

I like this simple solution.

## Robots.txt

[Hanselman article](https://www.hanselman.com/blog/using-the-aspnet-core-environment-feature-to-manage-development-vs-production-for-any-config-file-type)