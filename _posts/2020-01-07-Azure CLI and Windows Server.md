---
layout: post
title: Azure CLI and Windows Server 
description: Using IaC to have a good devops pipeline for a legacy app which needs to be deployed onto a Windows Server 
menu: review
categories: Azure Infrastructure Windows 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/60.jpg
---

![alt text](/assets/2019-11-13/60.jpg "Laptop"){:width="400px"}

Lets optimise a legacy application which is sitting on expensive Azure VM's and make sure we have a good pipeline

- Make sure costs of VM's are minimised
- How to handle the costs of the database

[I deploy Linux VM's on Azure running .NET Core using a simple automated deployment pipeline](/2019/11/17/Publishing-ASP-NET-Core-3-App-to-Ubuntu)

I've done the same for Windows servers:

## Azure CLI

I use the Azure CLI running from `Windows Subsystem for Linux` to run bash scripts.

```bash
#!/bin/bash

# activate debugging from here
set -x

# generate a random suffix between 1 and 1000
int=$(shuf -i 1-1000 -n 1)
# Password must have the 3 of the following: 1 lower case character, 1 upper case character, 1 number and 1 special character
# generate a 34 character password (normal, capitals and numbers)
password=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c34)

rg=appnameTEST${int}
dnsname=appnametest${int}
adminusername=dave
adminpassword=${password}
vmname=appnametest

region=westeurope
vnet=vnet
subnet=subnet
publicIPName=publicIP
nsgname=nsg
nicName=nic

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

# allow port 3389 rdp 
az network nsg rule create \
    --resource-group ${rg} \
    --nsg-name ${nsgname} \
    --name nsgGroupRuleRDP \
    --protocol tcp \
    --priority 1000 \
    --destination-port-range 3389 \
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

# windows vm sizes
# https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes
# default is Standard DS1 v2 (1 vcpus, 3.5 GiB memory)
az vm create \
    --resource-group ${rg} \
    --name ${vmname} \
    --nics ${nicName} \
    --image win2019datacenter \
    --admin-username ${adminusername} \
    --admin-password ${adminpassword} \
    --size Standard_D2s_v3
    # --size Standard_D4s_v3
    # --size Standard_DS1_v2
    # --image win2016datacenter \
    # --image win2012r2datacenter 
    # --image win2008r2sp1
    # --image win2019datacentercore 


# Use CustomScript extension to install IIS and powershell to do other things
# and dump output to a log file
# Useful log files are:
#1.C:\WindowsAzure\Logs\Plugins\Microsoft.Compute.CustomScriptExtension
#2.C:\powershell.txt
#3.C:\ProgramData\chocolatey\logs\chocolatey.log
az vm extension set \
  --publisher Microsoft.Compute \
  --version 1.9 \
  --name CustomScriptExtension \
  --vm-name ${vmname} \
  --resource-group ${rg} \
  --settings '{"fileUris":["https://bitbucket.org/davemateer/consoleapp2/raw/master/infra.ps1"], 
               "commandToExecute":"powershell.exe -ExecutionPolicy Unrestricted -File infra.ps1 > c:\powershell.txt"
              }'

# save to file so don't lose generated password
echo -e "\n${dnsname}.westeurope.cloudapp.azure.com\n${adminpassword}" > ${dnsname}.txt

echo mstsc /v:${dnsname}.westeurope.cloudapp.azure.com
```

## Performance

What I first noticed was how slow the server UI seemed to respond. The size `Standard_DS1_v2` is the default.  

[Windows VM Family Sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes) was a good start.  

[Dsv3 seems like a good default for now to test for production](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes-general#dsv3-series-1)  lets try `Standard_D4s_v3` and then burstable

## Versions of Windows

[Here are a list of image names for VMs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/cli-ps-findimage)

## Automating a build

On linux I use [Cloud-init](/2020/01/09/Publishing-ASP-NET-Core-3-App-to-Ubuntu) to bash scripts after the VM has built.

I'm using powershell via `az vm extension set` and the `CustomScriptExtension` to run commands after the machine has been built. As you can see I've made the repo public as I don't mind who copies my build, and it makes security easier.

There are numerous ways of automating the build

[az vm run-command invoke](https://docs.microsoft.com/en-us/cli/azure/vm/run-command?view=azure-cli-latest#az-vm-run-command-invoke)

[az vm extension set](https://docs.microsoft.com/en-us/azure/virtual-machines/scripts/virtual-machines-windows-cli-sample-create-vm-iis) custom script extension, which is was I use:

[More docs here for extension](https://docs.microsoft.com/en-us/azure/virtual-machines/extensions/custom-script-windows) and [cli docs](https://docs.microsoft.com/en-us/cli/azure/vm/extension?view=azure-cli-latest) 

### IIS

[Useful SO Question](https://stackoverflow.com/questions/37892173/automating-installation-of-iis?noredirect=1&lq=1) 

```powershell
Install-WindowsFeature -Name web-server, Web-App-Dev,Web-Net-Ext, Web-Net-Ext45,Web-AppInit,Web-ASP,Web-Asp-Net,Web-Asp-Net45,Web-ISAPI-Ext,Web-ISAPI-Filter,Web-Includes,Web-WebSockets -IncludeManagementTools 
```

### Chocolately

Useful for installing some apps, like `sudo apt install` on linux

```powershell
# Get chocolately
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

## GIT
choco install git.install -y
choco install sql-server-management-studio -y
choco install urlrewrite -y
choco install iis-arr -y
```

### SQL Server

To install a developer edition of SQL Server locally on a UAT box, it should be easy? It isn't

[Here is a good tutorial from Octopus](https://octopus.com/blog/automate-sql-server-install) but I couldn't find a way of making it run without manually doing it.

```powershell
Install-WindowsFeature -Name web-server, Web-App-Dev,Web-Net-Ext, Web-Net-Ext45,Web-AppInit,Web-ASP,Web-Asp-Net,Web-Asp-Net45,Web-ISAPI-Ext,Web-ISAPI-Filter,Web-Includes,Web-WebSockets -IncludeManagementTools 

# Folders for websites
New-Item -ItemType Directory c:\inetpub\pathway2
New-Item -ItemType Directory c:\inetpub\pathway2.cdn

# Create new websites
New-WebSite -Name Pathway -Port 80 -HostHeader pathway360.hmsoftware.org -PhysicalPath "$env:systemdrive\inetpub\pathway2"
New-WebSite -Name Pathway_CDN -Port 80 -HostHeader cdn.willowpathway.hmsoftware.org -PhysicalPath "$env:systemdrive\inetpub\pathway2.cdn"

# Get chocolately
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# GIT
choco install git.install -y

# SSMS
choco install sql-server-management-studio -y

# IIS Url Rewrite
# https://www.iis.net/downloads/microsoft/url-rewrite
# https://www.odity.co.uk/articles/how-to-redirect-http-to-https-with-iis-rewrite-module/
choco install urlrewrite -y

# Application Request Routing
# https://www.iis.net/downloads/microsoft/application-request-routing
# https://chocolatey.org/packages/iis-arr
choco install iis-arr -y

# Disable IE Enhanced Security Configuration
function Disable-InternetExplorerESC {
    $AdminKey = "HKLM:\SOFTWARE\Microsoft\Active Setup\Installed Components\{A509B1A7-37EF-4b3f-8CFC-4F3A74704073}"
    $UserKey = "HKLM:\SOFTWARE\Microsoft\Active Setup\Installed Components\{A509B1A8-37EF-4b3f-8CFC-4F3A74704073}"
    Set-ItemProperty -Path $AdminKey -Name "IsInstalled" -Value 0
    Set-ItemProperty -Path $UserKey -Name "IsInstalled" -Value 0
    Stop-Process -Name Explorer
}
Disable-InternetExplorerESC


# SQL Server not working for a standalone install
# but this pulls the source ready to go

# Clone repo which contains SQL Server 2017 Media and config file
New-Item -ItemType Directory c:\sqlserver
cd c:\sqlserver
& 'C:/Program Files/Git/cmd/git.exe' clone https://davemateer@bitbucket.org/davemateer/consoleapp2.git .

# SQL Server Install

$pathToConfigurationFile = "c:\sqlserver\ConfigurationFile.ini"
$copyFileLocation = "C:\Temp\ConfigurationFile.ini"
New-Item "C:\Temp" -ItemType "Directory" -Force 
Copy-Item $pathToConfigurationFile $copyFileLocation -Force

# login to the server and run the command from powershell to complete the install
#& c:\sqlserver\SQLServer\Setup.exe "/ConfigurationFile=c:/temp/ConfigurationFile.ini"
```

I've heard the way to do it is to reboot the machine via the script then keep going and it will install.

