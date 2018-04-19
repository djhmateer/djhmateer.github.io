---
layout: post
title:  "Wordpress in AKS"
date:   2018-04-19 14:06
menu: review
categories: wordpress 
published: true 
---
Setting up Wordpress well in [Azure Container Services (AKS)](https://azure.microsoft.com/en-gb/services/container-service/) is not easy. 

## Background business problem
We had an issue where an existing Wordpress installation was years out of date, and could not be updated becuase it was running a version of Wordpress called Project Nami. This meant that some plugins wouldn't work, and therefore the entire application was not updated.  

It had become very slow (5s to load the home page).   

## What we considered
We looked at many options including shared hosting, dedicated hosting, a custom VM, a VM running Docker, and orchestrated Docker (K8s).   

We ran a VM running Docker for many months as a test server - essentially a linux vm with Docker installed using docker-compose to run Wordpress and MySql in different containers.


## Why host Wordpress in K8s?
- Managed Linux machine
- Easy to deploy to
- Easy to update - critical for Wordpress
- Density of application on 1 machine - easy to put multiple apps in the cluster



## What are we building?
Azure Container Services (AKS)  
Azure managed MySQL  
A single node cluster with an Azure attached disk for persistence  
Ingress controller  
Nginx reverse proxy (includes enforcing https)  
Nginx server (enforces www)  

## Setting up the AKS Cluster
I use the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) tool to script all the building in Azure. At the time of writing the version is 2.0.31 and takes a few minutes to install (or longer). [Documentation](https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-create)  


```
az login

# -n is --name, -l is --location
az group create -n aks -l westeurope

# -n is --name, -g is --resource-group, c is --node-count, -k is --kubernetes-version, -s is --node-vm-size
az aks create -n aks -g aks -c 1 -k 1.9.6 -s Standard_B1ms

# useful command to get the supported versions of k8s
az aks get-versions -l westeurope -o table

# the default node-vm-size is Standard_DS1_v2 (3.5GB and 1vcpu for UKP37) which I use in production
# I use the cheaper burst Standard_B1ms (2GB for UKP13) for testing 
``` 
After 20min or so you should have the cluster ready

![ps](/assets/2018-04-19/aks.png)

The aks resource group has been created, and also an automatically created group which contains all the resources

![ps](/assets/2018-04-19/aks2.png)

and the worker (minion) VM is here:

![ps](/assets/2018-04-19/aks3.png)
## Dashboard
I find the dashboard useful - mostly to see what is waiting to happen and if the cluster is ready. It's also a great way to look around and see how the different parts of Kubernetes fit together.
```
# bring up the dashboard
az aks browse -n aks -g aks

# get the credentials of the cluster (you may need this if the above command fails)
az aks get-credentials -n aks -g aks
```

![ps](/assets/2018-04-19/dash.png)

My work network seems to drop the tunnel after a few minutes.
![ps](/assets/2018-04-19/port.png)

Making a simple keepalive app to hit the site worked for me:

```
static void Main()
{
  while (true)
  {
    var request = (HttpWebRequest)WebRequest.Create("http://127.0.0.1:8001");
 
    using (var response = (HttpWebResponse) request.GetResponse())
    using (var stream = response.GetResponseStream())
    using (var reader = new StreamReader(stream))
       Console.WriteLine(reader.ReadToEnd());

    System.Threading.Thread.Sleep(29000);
  }
}
```

## Hosted MySQL Database
[Azure Database for MySQL](https://azure.microsoft.com/en-gb/services/mysql/)
is the Azure hosted MySQL which is now fully supported.  As above it is easily scripted:
```
az group create -n amysql -l westeurope
az mysql server create -l westeurope -g amysql -n bobmysql -u bob -p secretpassword123$ --sku-name B_Gen5_1
:: in production I use the more powerful GP_Gen5_2 

az mysql db create -g amysql -s bobmysql -n wordpress

az mysql server firewall-rule create --resource-group amysql --server bobmysql --name "AllowAllWindowsAzureIps" --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0

az mysql server update --resource-group amysql --name bobmysql --ssl-enforcement Disabled

:: creating a secret in k8s to store the password to connect to the db
kubectl create secret generic mysql-pass --from-literal=password=secretpassword123$

:: useful command to connect to the db from the Azure CLI (web interface)
mysql --host bobmysql.mysql.database.azure.com --user bob@bobmysql -p

```

So now we have a hosted database

![ps](/assets/2018-04-19/mysql.png)

I've turned off SSL enforcement and allowed all Azure IP's access to this database here. Things to consider for the future.


## Reverse Proxy and Ingress

