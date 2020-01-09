---
layout: post
title: Infrastructure as Code for an ASP.NET Core 3.1 Web App on Ubuntu 
description: Automate deploying of an Ubuntu VM on Azure then building and installing an ASP.NET Core 3.1 application
#menu: review
categories: AzureCLI Linux cloud-init
published: true 
comments: true     
sitemap: true
image: /assets/2019-11-13/3.jpg
---

I'm a fan of Infrastructure as Code (IaC) so I can script out building up my infrastructure using:

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest) from Bash on [Windows Subsystem for Linux - WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to build a VM and networking
- [Cloud-init](https://cloud-init.io/) to run scripts on the newly created VM
- [Nginx](https://www.nginx.com/) reverse proxying to [Kestrel](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-3.1)
- [Systemd](https://en.wikipedia.org/wiki/Systemd) to monitor Kestrel

This allows us to be able to spin up a new environment with the latest OS patches, apt-get updates etc.. on it within 5 minutes.  The goal is to have a docker-like environment where we treat the server(s) as replaceable 'things', and I'm continually spinning up new instances when patches are applied.

Some questions I'm still working on are:

- How to do full CI/CD ie do the build on another server (using Azure DevOps probably). This solution below is perfect for the dev phase of a project
- How to handle DNS changeover of a live domain with significant traffic
- How will I handle state ie where the is the DB?

As with all these things it is a gradual improvement of the process that is important.

## Azure CLI

Below is my Azure CLI Bash script running under WSL using [Cmder as the shell](/2018/01/30/Cmder-Shell). This is for a current project in development that is hosted on a single Ubuntu VM (currenlty) with Nginx as a reverse proxy. Remember to get the [line endings correct ie set to Unix style LF](/2020/01/09/Line-endings-ignore-in-Git)

![alt text](/assets/2019-11-13/3.jpg "Running the Azure CLI from WSL")

So plain text generated passwords are not great, but this is fast and very useful to develop with. Potentially use SSH keys would be nicer as then wouldn't have to copy and paste the password every time.

```bash
# infra.sh
#!/bin/bash

# activate debugging from here
set -x

# generate a random suffix between 1 and 1000
int=$(shuf -i 1-1000 -n 1)
# Password must have the 3 of the following: 1 lower case character, 1 upper case character, 1 number and 1 special character
# generate a 34 character password (normal, capitals and numbers)
password=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c34)

rg=DaveTEST${int}
dnsname=davetest${int}
adminusername=azureuser${int}
adminpassword=${password}

vmname=davetest

region=westeurope
vnet=vnet
subnet=subnet
publicIPName=publicIP
nsgname=nsg
nicName=nic
# use current LTS Version of Ubuntu - 18.04.3 as of 8th Nov 2019
image=UbuntuLTS

# Create a resource group
az group create \
   --name ${rg} \
   --location ${region}

# Create a virtual network
az network vnet create \
    --resource-group ${rg} \
    --name ${vnet} \
    --subnet-name ${subnet} 

# Create a network with a public IP and associate with the given DNS name
az network public-ip create \
    --resource-group ${rg} \
    --name ${publicIPName} \
    --dns-name ${dnsname}
    #--allocation-method Static \

# Create a nework security group
az network nsg create \
    --resource-group ${rg} \
    --name ${nsgname}

# allow port 22 ssh
az network nsg rule create \
    --resource-group ${rg} \
    --nsg-name ${nsgname} \
    --name nsgGroupRuleSSH \
    --protocol tcp \
    --priority 1000 \
    --destination-port-range 22 \
    --access allow

# allow port 80
az network nsg rule create \
    --resource-group ${rg} \
    --nsg-name ${nsgname} \
    --name nsgGroupRuleWeb80 \
    --protocol tcp \
    --priority 1001 \
    --destination-port-range 80 \
    --access allow

# allow port 443
az network nsg rule create \
    --resource-group ${rg} \
    --nsg-name ${nsgname} \
    --name nsgGroupRuleWeb443 \
    --protocol tcp \
    --priority 1002 \
    --destination-port-range 443 \
    --access allow

# Create a virtual network card and associate with publicIP address and NSG
az network nic create \
    --resource-group ${rg} \
    --name ${nicName} \
    --vnet-name ${vnet} \
    --subnet ${subnet} \
    --public-ip-address ${publicIPName} \
    --network-security-group ${nsgname}

# Create vm which runs the cloud init script to provision apache, php etc
# Standard_DS1_v2 is the default
# az vm list-sizes
# https://azure.microsoft.com/en-gb/pricing/details/virtual-machines/linux/
# https://docs.microsoft.com/en-us/azure/virtual-machines/linux/sizes-general

az vm create \
    --resource-group ${rg} \
    --name ${vmname} \
    --location ${region} \
    --nics ${nicName} \
    --image ${image} \
    --admin-username ${adminusername} \
    --admin-password ${adminpassword} \
    --custom-data cloud-init.txt \
    --size Standard_B1ms
    # --size Standard_DS1_v2

# B1MS

# echo -e "\n${dnsname}.westeurope.cloudapp.azure.com\nssh ${adminusername}@${dnsname}.westeurope.cloudapp.azure.com\n${adminpassword}"
# -o is skip are you sure about ssh keys
echo -e "\nssh -o StrictHostKeyChecking=no ${adminusername}@${dnsname}.westeurope.cloudapp.azure.com\n${adminpassword}"
# save to file
# echo -e "\n${dnsname}.westeurope.cloudapp.azure.com\nssh ${adminusername}@${dnsname}.westeurope.cloudapp.azure.com\n${adminpassword}" & > infra.txt
```

![alt text](/assets/2019-11-13/4.jpg "What the script creates")

The Azure CLI script creates these artifacts.  

Be careful if switching between Azure subscriptions midway through deployments - I've had it get confused.

## Cloud-init

This is a python based library which runs commands after the machine builds. It is patched in from the Azure CLI script above.

cloud-init.txt

```bash
#cloud-config

package_upgrade: true
runcmd:
  - wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
  - sudo dpkg -i packages-microsoft-prod.deb
  - sudo add-apt-repository universe -y
  - sudo apt-get update -y
  - sudo apt-get install apt-transport-https -y
  - sudo apt-get update -y

  # nginx
  - sudo apt-get install nginx -y

  # use the runtime when get build pipeline working
  - sudo apt-get install dotnet-sdk-3.1 -y
  - sudo mkdir /var/www
  - cd /var/www

  # Clone the repo - using an account with readonly privs only to that repo
  # this is what I'd type, but special characters needs to be escaped
  #- sudo git clone https://penhemingway:SECRET@bitbucket.org/davemateer/brokenlink.git
  # escape chars https://stackoverflow.com/questions/6172719/escape-character-in-git-proxy-password?noredirect=1&lq=1
  - sudo git clone https://penhemingway:SECRET@bitbucket.org/davemateer/brokenlink.git blsource

  # nginx config
  - sudo cp /var/www/blsource/infra/nginxdefault.txt /etc/nginx/sites-available/default
  - sudo nginx -s reload

  # create a publish directory for Kestrel
  - sudo mkdir /var/www/blweb

  # publish the app
  - cd /var/www/blsource/BLC.Website
  - sudo dotnet publish --configuration Release 

  # copy files to publish directory
  - cd bin/Release/netcoreapp3.1/publish/
  - sudo cp -a * /var/www/blweb/.

  # change ownership of the files - TODO review this
  - sudo chown -R www-data:www-data /var/www/blsource
  - sudo chown -R www-data:www-data /var/www/blweb
  - sudo chmod -R 777 /var/www/blsource

  # make the systemd service to keep Kestrel alive
  - cd /var/www/blsource/infra
  - sudo cp kestrel-blc.service /etc/systemd/system/kestrel-blc.service

  # start the Kestrel web app using systemd using kestrel-blc.service text files
  - sudo systemctl enable kestrel-blc.service
  - sudo systemctl start kestrel-blc.service

  # TOOD enable firewall and other security

  # Setup git on the server to make it easy to make changes there directly
  - sudo git config --global user.name "Pen Hemingway"
  - sudo git config --global user.email "penhemingway@outlook.com"

  - sudo rm -rf /var/www/html

  # OS updates need a reboot
  # it sometimes needs this
  #- sudo restart now
```

[Fix line endings with SED](/2019/05/28/Hosting-Drupal-on-Azure#fix-line-endings-with-sed) if you need to switch from Windows to Unix line endings.  

![alt text](/assets/2019-11-13/5.jpg "Machine is now ready")

To debug any issues with this script look in `/var/log/cloud-init-output.log`

**update Jan 2020** There are many alternatives to cloud-init including:

-[CustomScriptExtension](https://docs.microsoft.com/en-us/azure/virtual-machines/extensions/custom-script-linux) which I've used successfully for Windows Server IaC automations. This essentially runs a powershell script on the Windows server after it is built.

-[Run-command invoke](https://docs.microsoft.com/en-us/cli/azure/vm/run-command?view=azure-cli-latest#az-vm-run-command-invoke) which I've explored unsuccessfully for Windows Server IaC automation.

## Nginx Config

```bash
# nginxdefault.txt

server {
    listen        80;
    server_name   *.westeurope.cloudapp.azure.com;
    location / {
        proxy_pass         http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
    location /crawlHub {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Notice to get SignalR working properly with Websockets we have to have the second /crawlHub section [as described here](https://stackoverflow.com/questions/48300288/signalr-in-asp-net-core-behind-nginx)

## Systemd - Create a Service

Systemd is an init system to provides many features for starting, stopping and managing processes

```bash
# kestrel-blc.service

[Unit]
Description=BLC.Website running on ASP.NET CORE 3

[Service]
WorkingDirectory=/var/www/brokenlink2
ExecStart=/usr/bin/dotnet BLC.Website.dll

Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=dotnet-BLC.Website
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```

## Kestrel on the edge or Nginx

~~I'm using Kestrel on the edge as have only 1 website on the server~~ I found that I was getting permission errors binding to port 80 spinning up Kestrel from systemd (used to monitor the service). The work arounds [here on Server Fault](https://serverfault.com/questions/268099/bind-to-ports-less-than-1024-without-root-access) didn't work for me first time, and felt at the edge of my Linux knowledge.

There are good docs here [Hosting and Deploying on Linux with Nginx](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-3.0) so I recommend that.

## Useful commands and debugging

To see cloud init problems look in `/var/log/cloud-init-output.log`  

nginx config is in `/etc/nginx/sites-available/default`

To reload nginx config `sudo nginx -s reload`

To debug kestrel systemd problems:

- sudo systemctl status kestrel-blc.service
- sudo journalctl -fu kestrel-blc.service

## Conclusion

I spin up and tear down servers all the time safe in the knowledge that everything is source controlled. Going back to configuring servers manually is so.... 20th Century :-)
