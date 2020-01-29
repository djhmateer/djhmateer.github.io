---
layout: post
title: Azure CLI and Windows Server 
description: Using IaC to have a devops pipeline for a legacy app which needs to be deployed onto a Windows Server 
menu: review
categories: Azure IaC Windows 
published: true 
comments: false     
sitemap: false
image: /assets/2020-01-09/50.jpg
---

![alt text](/assets/2020-01-09/50.jpg "Installing on Windows Server"){:width="400px"}

Imagine this play matt is Windows Server and we need to install all the toys on it automatically...

Lets optimise a legacy application which is sitting on expensive Azure VM's and make sure we have a good pipeline.

The first step I like to do is setup the most minimal automated pipeline so I can test the application and spin in up and down with easy. So although I love Azure DevOps, I like to do things manually first.

- Make sure costs of VM's are minimised
- How to handle the costs of the database

[I deploy Linux VM's on Azure running .NET Core using a simple automated deployment pipeline](/2019/11/17/Publishing-ASP-NET-Core-3-App-to-Ubuntu)

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
# useful to keep the same name as when typing into multiple machines don't need to remember number
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
    # other useful options are
    # --size Standard_D4s_v3
    # --size Standard_DS1_v2
    # --image win2016datacenter \
    # --image win2012r2datacenter 
    # --image win2008r2sp1
    # --image win2019datacentercore 


# Use CustomScript extension to install IIS (half of it) and powershell to do other things
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

On Linux I use [Cloud-init](/2020/01/09/Publishing-ASP-NET-Core-3-App-to-Ubuntu) to bash scripts after the VM has built.

Here on Windows I'm using PowerShell via `az vm extension set` and the `CustomScriptExtension` to run commands after the machine has been built. As you can see I've made the repo public as I don't mind who copies my build.

There are numerous ways of automating the build

[az vm run-command invoke](https://docs.microsoft.com/en-us/cli/azure/vm/run-command?view=azure-cli-latest#az-vm-run-command-invoke)

[az vm extension set](https://docs.microsoft.com/en-us/azure/virtual-machines/scripts/virtual-machines-windows-cli-sample-create-vm-iis) custom script extension, which is was I use:

[More docs here for extension](https://docs.microsoft.com/en-us/azure/virtual-machines/extensions/custom-script-windows) and [cli docs](https://docs.microsoft.com/en-us/cli/azure/vm/extension?view=azure-cli-latest) 

### PowerShell installing IIS

[Useful SO Question](https://stackoverflow.com/questions/37892173/automating-installation-of-iis?noredirect=1&lq=1)

```powershell
Install-WindowsFeature -Name web-server, Web-App-Dev,Web-Net-Ext, Web-Net-Ext45,Web-AppInit,Web-ASP,Web-Asp-Net,Web-Asp-Net45,Web-ISAPI-Ext,Web-ISAPI-Filter,Web-Includes,Web-WebSockets -IncludeManagementTools
```

### Chocolatey

Useful for installing some apps, and it is like any package manager eg apt `sudo apt install` on Linux

```powershell
# Get chocolately
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

choco install git.install -y
choco install sql-server-management-studio -y
choco install urlrewrite -y
choco install iis-arr -y
```

### SQL Server and Full PowerShell Script

To install a developer edition of SQL Server locally on a UAT box, it should be easy? It isn't

[Here is a good tutorial from Octopus](https://octopus.com/blog/automate-sql-server-install) which I couldn't quite get to work, ending up with running the install script automatically when a user (me) first logs into the VM.

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

## Run the command on first logon (trick to get SQL Server to install properly)
function OnStartup-ScheduleSqlServerSetupFile {
     $regPath = "HKLM:\Software\Microsoft\Windows\CurrentVersion\RunOnce"
     $command = 'c:\sqlserver\SQLServer\Setup.exe /ConfigurationFile=c:/temp/ConfigurationFile.ini'
     New-ItemProperty $regPath -Name "SqlSetupCompletion" -Value $command | Out-Null
     Write-Host "Scheduled Execution of SQL Server"
}

OnStartup-ScheduleSqlServerSetupFile
```

Many thanks to SteveG for the run command on first logon trick!

### configurationfile.ini

This is the custom MSSQL configuration build file described in the [Octopus blog](https://octopus.com/blog/automate-sql-server-install). I used it to install MSSQL into a `.\dev` instance

```ini
;SQL Server 2017 Configuration File
[OPTIONS]

IACCEPTSQLSERVERLICENSETERMS="True"

; By specifying this parameter and accepting Microsoft R Open and Microsoft R Server terms, you acknowledge that you have read and understood the terms of use. 

IACCEPTPYTHONLICENSETERMS="True"

; Specifies a Setup work flow, like INSTALL, UNINSTALL, or UPGRADE. This is a required parameter. 

ACTION="Install"

; Specifies that SQL Server Setup should not display the privacy statement when ran from the command line. 

SUPPRESSPRIVACYSTATEMENTNOTICE="False"

; By specifying this parameter and accepting Microsoft R Open and Microsoft R Server terms, you acknowledge that you have read and understood the terms of use. 

IACCEPTROPENLICENSETERMS="False"

; Use the /ENU parameter to install the English version of SQL Server on your localized Windows operating system. 

ENU="True"

; Setup will not display any user interface. 

QUIET="True"

; Setup will display progress only, without any user interaction. 

QUIETSIMPLE="False"

; Parameter that controls the user interface behavior. Valid values are Normal for the full UI,AutoAdvance for a simplied UI, and EnableUIOnServerCore for bypassing Server Core setup GUI block. 
; got at error if not comment this out
;UIMODE="Normal"

; Specify whether SQL Server Setup should discover and include product updates. The valid values are True and False or 1 and 0. By default SQL Server Setup will include updates that are found. 

UpdateEnabled="True"

; If this parameter is provided, then this computer will use Microsoft Update to check for updates. 

USEMICROSOFTUPDATE="True"

; Specify the location where SQL Server Setup will obtain product updates. The valid values are "MU" to search Microsoft Update, a valid folder path, a relative path such as .\MyUpdates or a UNC share. By default SQL Server Setup will search Microsoft Update or a Windows Update service through the Window Server Update Services. 

UpdateSource="MU"

; Specifies features to install, uninstall, or upgrade. The list of top-level features include SQL, AS, IS, MDS, and Tools. The SQL feature will install the Database Engine, Replication, Full-Text, and Data Quality Services (DQS) server. The Tools feature will install shared components. 

FEATURES=SQLENGINE

; Displays the command line parameters usage 

HELP="False"

; Specifies that the detailed Setup log should be piped to the console. 

INDICATEPROGRESS="False"

; Specifies that Setup should install into WOW64. This command line argument is not supported on an IA64 or a 32-bit system. 

X86="False"

; Specify a default or named instance. MSSQLSERVER is the default instance for non-Express editions and SQLExpress for Express editions. This parameter is required when installing the SQL Server Database Engine (SQL), or Analysis Services (AS). 

INSTANCENAME="DEV"

; Specify the root installation directory for shared components.  This directory remains unchanged after shared components are already installed. 

INSTALLSHAREDDIR="C:\Program Files\Microsoft SQL Server"

; Specify the root installation directory for the WOW64 shared components.  This directory remains unchanged after WOW64 shared components are already installed. 

INSTALLSHAREDWOWDIR="C:\Program Files (x86)\Microsoft SQL Server"

; Specify the Instance ID for the SQL Server features you have specified. SQL Server directory structure, registry structure, and service names will incorporate the instance ID of the SQL Server instance. 

INSTANCEID="DEV"

; TelemetryUserNameConfigDescription 

SQLTELSVCACCT="NT Service\SQLTELEMETRY$DEV"

; TelemetryStartupConfigDescription 

SQLTELSVCSTARTUPTYPE="Automatic"

; Specify the installation directory. 

INSTANCEDIR="C:\Program Files\Microsoft SQL Server"

; Agent account name 

AGTSVCACCOUNT="NT Service\SQLAgent$DEV"

; Auto-start service after installation.  

AGTSVCSTARTUPTYPE="Manual"

; CM brick TCP communication port 

COMMFABRICPORT="0"

; How matrix will use private networks 

COMMFABRICNETWORKLEVEL="0"

; How inter brick communication will be protected 

COMMFABRICENCRYPTION="0"

; TCP port used by the CM brick 

MATRIXCMBRICKCOMMPORT="0"

; Startup type for the SQL Server service. 

SQLSVCSTARTUPTYPE="Automatic"

; Level to enable FILESTREAM feature at (0, 1, 2 or 3). 

FILESTREAMLEVEL="0"

; Set to "1" to enable RANU for SQL Server Express. 

ENABLERANU="False"

; Specifies a Windows collation or an SQL collation to use for the Database Engine. 

SQLCOLLATION="SQL_Latin1_General_CP1_CI_AS"

; Account for SQL Server service: Domain\User or system account. 

SQLSVCACCOUNT="NT Service\MSSQL$DEV"

; Set to "True" to enable instant file initialization for SQL Server service. If enabled, Setup will grant Perform Volume Maintenance Task privilege to the Database Engine Service SID. This may lead to information disclosure as it could allow deleted content to be accessed by an unauthorized principal. 

SQLSVCINSTANTFILEINIT="True"

; Windows account(s) to provision as SQL Server system administrators. 

; SQLSYSADMINACCOUNTS="##MyUser##"
SQLSYSADMINACCOUNTS="pathwaytest\dave"
; 
; The default is Windows Authentication. Use "SQL" for Mixed Mode Authentication. 

SECURITYMODE="SQL"

; The number of Database Engine TempDB files. 

SQLTEMPDBFILECOUNT="2"

; Specifies the initial size of a Database Engine TempDB data file in MB. 

SQLTEMPDBFILESIZE="8"

; Specifies the automatic growth increment of each Database Engine TempDB data file in MB. 

SQLTEMPDBFILEGROWTH="64"

; Specifies the initial size of the Database Engine TempDB log file in MB. 

SQLTEMPDBLOGFILESIZE="8"

; Specifies the automatic growth increment of the Database Engine TempDB log file in MB. 

SQLTEMPDBLOGFILEGROWTH="64"

; Provision current user as a Database Engine system administrator for %SQL_PRODUCT_SHORT_NAME% Express. 
;ADDCURRENTUSERASSQLADMIN="True"

; Specify 0 to disable or 1 to enable the TCP/IP protocol. 

TCPENABLED="1"

; Specify 0 to disable or 1 to enable the Named Pipes protocol. 

NPENABLED="1"

; Startup type for Browser Service. 

BROWSERSVCSTARTUPTYPE="Automatic"

SAPWD="somethingsecret!!22"
```

## Conclusion

We can now spin up and down Windows infrastructure on Azure with ease. I'm using this to explore a legacy application and optimise its running costs. It makes life much easier as a developer to know I don't need to remember how to setup a server. It is in source control.

Welcome to making your life easier in the 21st Century. 