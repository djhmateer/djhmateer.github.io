---
layout: post
title:  Web Hosting Options in .NET Core3 - VM Containers PaaS or FaaS for my SaaS
description: 
menu: review
categories: Infrastructure
published: true 
comments: false     
sitemap: false
image: /assets/2019-10-15/1.jpg
---

I am building a greenfield SaaS (Software as a Service) product which is a Broken Link Checker.  

I've had nearly a decade of experience in Azure mostly on the PaaS side which I love. Also have used VM's / Containers / FaaS (Functions as a Service) for corporate clients.  

[An article on hosting Drupal using IaaS with Azure CLI and Cloud Init](/2019/05/28/Hosting-Drupal-on-Azure)

## Eat my own dogfood

So now it is my money on the line, what infrastructure am I going to choose to run my first SaaS product? Well, what is the spec I hear you say:

- It is a broken link checker so will need a lot on inbound bandwidth
- I'm using SignalR on the frontend (Websockets) which can consume resources on the server
- I'm using Puppeteer which is memory hungry (Chrome)
- .NET Core 3, so hope to run on Linux (which I know enough about)
- Will need a datastore (MSSQL is what I've used for years)
- Will need to be mindful of the IP (and being blocked by some domains)

- Simplicity
- Lots of unit tests
- Lots of integration tests

## 1.Colocation

Buy my own server hardware and co-locate it somewhere eg [Fastnet in Brighton](https://fastnet.co.uk/data-centre-hosting/).  No thanks. I'm not a hardware guy so want to abstract this away.

[https://www.hetzner.com/colocation/13-rack](https://www.hetzner.com/colocation/13-rack)
  14U Rack
  2TB of traffic
  1GBit/s port

## Azure IaaS (Infrastructure as a Service)

My first choice is to run VM's on Azure (as have got some free credits that they give everyone) and I'm used to their interface, so lets have a look at pros and cons:

- Bandwidth costs
- Memory costs
- Ease of deployment

I want a docker-esque style of deployment without the complexity, so I've used cloud-init before to deploy to a newly created VM.

- Must be super simple and agile
- Deployments must be really fast
- Automated testing (Azure DevOps)?
- VM patching easily handled by throwing it away and creating a new one
- Test environments easily created by script
- New Live environments (I forsee scaling out to different locations) scriptable

I had some scripts lying around that makes it easy to create VM's on Azure, so lets explore that:

### Azure VM create

[Setting up WSL, Azure CLI and Cloud Init](/2019/05/28/Hosting-Drupal-on-Azure)

I am using Bash on Windows Subsystem for Linux and the Azure CLI to create and run scripts to

- spin up a new Ubuntu LTS VM
- allow port 22 for SSH access
- allow port 80 for http
- allow port 443 for https
- install the .NET Core SDK
- create /var/www directory
- clone the repository from bitbucket (using a dedicated user)

I can then SSH into the VM and spin up the app and see the output.

```bash
cd /var/www/brokenlink

# This does: sudo dotnet run --urls=http://0.0.0.0:80 
./up.sh
```

- setup www-data user properly
- setup permissions on the folder
- setup systemd to monitor Kestrel [MS docs](https://docs.microsoft.com/en-gb/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-3.0#monitor-the-app)

then:

- eventually get rid of the SDK and only have the runtime
- then probably have a Azure DevOps agent (or Octopus)
- so build would happen then push artifacts to the agent

I'm running kestrel as an edge server. [MS Docs on when you should use a reverse proxy](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-3.0) - the big one for me is running multiple websites on the same machine is an issue for Kestrel. I'm not doing that here, so keeping things simple is vital.

I've tested websockets (for signalR) which work fine with the default implementation of Kestrel.

I'm pretty sure I'll be moving off Azure because of bandwidth and memory costs, but it is good for now for development ie super easy to spin up a test VM with running code on it.

[Azure OVH and Hetzer all support cloud-init](https://cloudinit.readthedocs.io/en/latest/topics/availability.html) so I'm hoping a move to OVH will not be too hard.

How to handle Dev / Test / Live?

How to handle persistence of data? I'll probably use MSSQL or Postgres.
  will probably use fast SQL import scripts for all test data to start with

How to handle live code updates
live db schema changes
patching of the VM - this should be easy if I can recreate the VM every time

## 2.Public Cloud VM

[ovh public cloud](https://www.ovh.co.uk/vps/vps-cloud-ram.xml)
2 vcores
30GB RAM
50GB SSD
£40 per month
100Mbps unlimited traffic

## 3.VPS (Virtual Private Server - virtualision layer)

Much cheaper than public cloud

[ovh.co.uk/vps/](https://www.ovh.co.uk/vps/)  
12GB RAM
50GB disk
2 vcores
£18 per month

[ionos.co.uk](https://www.ionos.co.uk/servers/vps#packages) 

[https://www.hetzner.com/cloud](https://www.hetzner.com/cloud) 
 8GB RAM
 2vCPU
 20TB of traffic

## 4.Dedicated Servers (no virtualisation)

[OVH Dedicated Servers](https://www.ovh.co.uk/dedicated_servers/) around £55pm

Guaranteed bandwidth of 500 Mbit/s with burst available unlimited traffic

[Hertzner](https://www.hetzner.com/dedicated-rootserver/matrix-ex) around £50 per month

## Containers

I use containers daily for [writing this blog](2018/01/25/Jekyll-and-Docker), but after [a year of looking after deployments to an AKS Kubernetes cluster](2019/03/06/High-Level-Containerisation) I don't want to use containers if I don't have to. 

I'm a one man software company and want to keep things as simple as possible.

## PaaS

Windows?
Linux - which is a docker container under the hood

## FaaS

Tempting to build out my service this way, and I did spike it.

- Azure Durable Functions
- Azure Queues
- Azure SQL

![alt text](/assets/2019-10-23/4.jpg "Deploying"){:width="600px"}