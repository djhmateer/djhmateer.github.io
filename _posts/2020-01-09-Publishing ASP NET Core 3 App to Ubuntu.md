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

## Update 20th Aug 2020

[az-kung-fu](https://github.com/Build5Nines/az-kung-fu) scripts are excellent along with the [blog post series](https://build5nines.com/az-kung-fu/). They helped me do fine tuning on the scripts below.

[BrokenLinkCheckerChecker source](https://bitbucket.org/davemateer/brokenlinkcheckerchecker/src/master/infra/) has up to date deploy scripts and thinking.

I've now implemented

- using a /secrets directory to keep in dnsimple token and SSH keys which I don't want in public repos
- SSH keys for my 3 main machine
- Wait for cloud-init to finish (and reboot) before switching over DNS to new VM
- Automatic deletion of older resource groups

## Azure CLI

Below is my Azure CLI Bash script running under WSL using [Cmder as the shell](/2018/01/30/Cmder-Shell). This is for a current project in development that is hosted on a single Ubuntu VM (currenlty) with Nginx as a reverse proxy. Remember to get the [line endings correct ie set to Unix style LF](/2020/01/09/Line-endings-ignore-in-Git)

![alt text](/assets/2019-11-13/3.jpg "Running the Azure CLI from WSL")

So plain text generated passwords are not great, but this is fast and very useful to develop with. Potentially use SSH keys would be nicer as then wouldn't have to copy and paste the password every time.

```bash
#!/bin/bash
# Broken Link Checker Checker azure cli scipt
# run from linux
# eg WSL
# make sure the line endings are LF ie unix style
# if you get weird errors, this is probably the case
# see here for a fix:  https://davemateer.com/2020/01/09/Line-endings-ignore-in-Git
# run from the WSL side
# sed -i 's/\r$//' *.sh
# logging - could use the run.sh file here... but will output the private keys which am not keen on

# activate script debugging from here
set -x

# generate a random suffix between 1 and 1000
int=$(shuf -i 1-1000 -n 1)
# Password must have the 3 of the following: 1 lower case character, 1 upper case character, 1 number and 1 special character
# generate a 34 character password (normal, capitals and numbers)
password=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c34)

rgprefix=BLCC
rg=${rgprefix}${int}
# don't put capitals in dns name below and it needs to be unique (ie not used in azure at the moment)
dnsname=blcctest${int}
adminusername=azureuser${int}
adminpassword=${password}

region=westeurope
vmname=blcctest${int}
vnet=vnet${int}
subnet=subnet${int}
publicIPName=publicIP${int}
nsgname=nsg${int}
nicName=nic${int}
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
# az network nsg rule create \
#     --resource-group ${rg} \
#     --nsg-name ${nsgname} \
#     --name nsgGroupRuleWeb443 \
#     --protocol tcp \
#     --priority 1002 \
#     --destination-port-range 443 \
#     --access allow

# Create a virtual network card and associate with publicIP address and NSG
az network nic create \
    --resource-group ${rg} \
    --name ${nicName} \
    --vnet-name ${vnet} \
    --subnet ${subnet} \
    --public-ip-address ${publicIPName} \
    --network-security-group ${nsgname}

# Create vm which runs the cloud init script to provision 
# Standard_DS1_v2 is the default
# https://azure.microsoft.com/en-gb/pricing/details/virtual-machines/linux/
# https://docs.microsoft.com/en-us/azure/virtual-machines/linux/sizes-general

# If one of my keys exist 
filename="../secrets/sshkey-homelenovo.pub"
if [ -f "$filename" ]; then
az vm create \
    --resource-group ${rg} \
    --name ${vmname} \
    --location ${region} \
    --nics ${nicName} \
    --image ${image} \
    --ssh-key-values ../secrets/sshkey-homelenovo.pub ../secrets/sshkey-work.pub ../secrets/sshkey-homedesktop.pub \
    --custom-data cloud-init.yaml \
    --size Standard_B1s # £5.65
    #--size Standard_B2s # £22.63

    #--size Standard_B1s # £5.65
    # --size Standard_B1LS  # £2.82
    # --size Standard_B1s # £5.65
    # --size Standard_B1ms # £11.26
    # --size Standard_B2s # £22.63
    # --size Standard_B2ms # £45
else
# no ssh keys found so could use username and password or ssh-keys
az vm create \
    --resource-group ${rg} \
    --name ${vmname} \
    --location ${region} \
    --nics ${nicName} \
    --image ${image} \
    --custom-data cloud-init.yaml \
    --size Standard_B2ms \
    --generate-ssh-keys 
    # above means we will use a generated ssh key from this machine
    #--admin-username ${adminusername} \
    #--admin-password ${adminpassword}
fi

# wait until the VM has rebooted and showing the correct screen
# ping this http://brokenlinkcheckerchecker.com/hascloudinitfinished.html
# until it comes back with a 200 (twice in a row as it will be there just before a reboot)
positiveresult="cloud-init has finished!"

while :
do
    curlresult="$(curl http://${dnsname}.westeurope.cloudapp.azure.com/hascloudinitfinished.html)"
    if [[ $curlresult = $positiveresult ]]; then
        echo "1st good result!"
        
        curlresult2="$(curl http://${dnsname}.westeurope.cloudapp.azure.com/hascloudinitfinished.html)"

        if [[ $curlresult2 = $positiveresult ]]; then
            echo "2nd good result!"
            break # out of the do.. onto dns updates
        else
            # strange situation where we got a 200 just before reboot, so wait 60s then continue
            sleep 60s
            break
        fi
        
    else
        echo "not finished, sleeping"
        sleep 9s
    fi
done

# generate dns here.. had trouble doing inside next if statement
generate_post_data()
{
  cat <<EOF
{
  "content": "${dnsname}.westeurope.cloudapp.azure.com",
  "ttl": 60
}
EOF
}

### patch DNS through to the new VM only if the token file exist
filename=../secrets/dnsimpletoken.txt
if [ -f "$filename" ]; then
    echo "dnsimpletoken.txt file found"

    # get the first and only line
    token=$(head -n 1 $filename)
    echo "token is $token"

    # update DNS
    # brokenlinkcheckerchecker.com
    curl https://api.dnsimple.com/v2/63829/zones/brokenlinkcheckerchecker.com/records/18912164 -H "Authorization: Bearer ${token}" -H "Accept: application/json" -H "Content-Type: application/json" -X PATCH -d "$(generate_post_data)" 

    # www.brokenlinkcheckerchecker.com
    curl https://api.dnsimple.com/v2/63829/zones/brokenlinkcheckerchecker.com/records/18987716 -H "Authorization: Bearer ${token}" -H "Accept: application/json" -H "Content-Type: application/json" -X PATCH -d "$(generate_post_data)" 

    # dnet.brokenlinkcheckerchecker.com
    curl https://api.dnsimple.com/v2/63829/zones/brokenlinkcheckerchecker.com/records/19726646 -H "Authorization: Bearer ${token}" -H "Accept: application/json" -H "Content-Type: application/json" -X PATCH -d "$(generate_post_data)" 

    # delete old resource groups
    # https://techcommunity.microsoft.com/t5/itops-talk-blog/how-to-query-azure-resources-using-the-azure-cli/ba-p/360147

    # getting all groups with the rgprefix eg BLCCTEST
    groupstodel=$(az group list --query "[?contains(name, '${rgprefix}')]".name --output tsv)

    for rgtodel in $groupstodel
    do
        if [ "$rgtodel" = "$rg" ]; then  
            echo "not deleting $rgtodel as have just created it"
        else
            #  Delete the old group(s)
	        az group delete \
                    --name $rgtodel \
                    --no-wait \
                    --yes
        fi
    done
fi

# # -o is skip are you sure about ssh keys
echo -e "\nssh -o StrictHostKeyChecking=no dave@${dnsname}.westeurope.cloudapp.azure.com\n"

# make it easy to connect to the vm from windows by creating a bat file
echo -e "\nssh -o StrictHostKeyChecking=no dave@${dnsname}.westeurope.cloudapp.azure.com\n" > ../a.bat
```

![alt text](/assets/2019-11-13/4.jpg "What the script creates")

The Azure CLI script creates these artifacts.  

Be careful if switching between Azure subscriptions midway through deployments - I've had it get confused.

## Cloud-init

This is a python based library which runs commands after the machine builds. It is patched in from the Azure CLI script above.

cloud-init.yaml

```yml
#cloud-config

# /var/log/cloud-init-output.log for debugging this script

# openresty nginx logs in /usr/local/openresty/nginx/logs/error.log and access.log
# nginx conf in /usr/local/openresty/nginx/conf
# to restart openresty after a conf update: sudo systemctl restart openresty

package_upgrade: true
runcmd:
  # install dotnet
  - wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
  - sudo dpkg -i packages-microsoft-prod.deb
  - sudo add-apt-repository universe -y
  - sudo apt-get update -y
  - sudo apt-get install apt-transport-https -y
  - sudo apt-get update -

  # need the sdk as we'll be compiling
  - sudo apt-get install dotnet-sdk-3.1 -y

  # openresty (nginx)
  - wget -qO - https://openresty.org/package/pubkey.gpg | sudo apt-key add -
  - sudo apt-get -y install software-properties-common
  - sudo add-apt-repository -y "deb http://openresty.org/package/ubuntu $(lsb_release -sc) main"
  - sudo apt-get update -y

  # the below registers openresty with systemd systemctl
  - sudo apt-get install openresty -y

  # a nice shortcut sym link
  - sudo ln -s /usr/local/openresty/nginx/ /home/dave/nginx

  # a nice restart command for openresty
  - cd /home/dave
  - echo "sudo systemctl restart openresty" > s.sh
  - sudo chmod 777 s.sh

  - cd /home/dave

  - sudo git clone https://davemateer@bitbucket.org/davemateer/brokenlinkcheckerchecker.git blccsource

  # copy the nginx.conf
  - cd /usr/local/openresty/nginx/conf
  - sudo mv nginx.conf nginxOLD.txt
  - sudo cp /home/dave/blccsource/infra/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

  # copy all the html
  # -a preserves file attributes
  - sudo cp -a /home/dave/blccsource/html/. /usr/local/openresty/nginx/html/.

  # build the dnet part of the site
  - cd /home/dave/blccsource/dnet/dnet
  - sudo dotnet publish --configuration Release
  - cd bin/Release/netcoreapp3.1/publish
  - sudo mkdir /usr/local/openresty/nginx/html/dnet
  - sudo cp -a * /usr/local/openresty/nginx/html/dnet/.

  - sudo chown -R www-data:www-data /usr/local/openresty/nginx/html/dnet
  - sudo chmod -R 777 /usr/local/openresty/nginx/html/dnet

  # keep kestrel alive
  - cd /home/dave/blccsource/infra
  - sudo cp kestrel-blcc.service /etc/systemd/system/kestrel-blcc.service
  - sudo systemctl enable kestrel-blcc.service
  - sudo systemctl start kestrel-blcc.service

#
# Bashtop
#
  - echo "deb http://packages.azlux.fr/debian/ buster main" | sudo tee /etc/apt/sources.list.d/azlux.list
  - sudo wget -qO - https://azlux.fr/repo.gpg.key | sudo apt-key add -
  - sudo apt update -y
  - sudo apt install bashtop -y

# make a quick test page to signify that the server is ready to go
  - cd /usr/local/openresty/nginx/html
  - echo "cloud-init has finished!" > hascloudinitfinished.html

# OS updates need a reboot
  - sudo reboot now
```

and here is an older version using a secret key for a different project

```yml
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

