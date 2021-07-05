---
layout: post
title: Inject secrets to VM with az vm run-command
description: 
menu: review
categories: Azure 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

[https://docs.microsoft.com/en-us/azure/virtual-machines/linux/run-command](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/run-command)

`Azure.Identity` 1.4.0 (May 12, 2021)
`Azure.ResourceManager.Compute` 1.0.0-preview.2 (Sept 24th 2020)

```cs
var resourceGroupName = "webfacesearchgpu611";

// linux
//export AZURE_CLIENT_ID = guid
//export AZURE_TENANT_ID = 
//export AZURE_CLIENT_SECRET = 
//export AZURE_SUBSCRIPTION_ID = 

// win
//setx AZURE_CLIENT_ID guid
//setx AZURE_TENANT_ID 
//setx AZURE_CLIENT_SECRET 
//setx AZURE_SUBSCRIPTION_ID 
var subscriptionId = Environment.GetEnvironmentVariable("AZURE_SUBSCRIPTION_ID");

var computeClient = new ComputeManagementClient(subscriptionId, new DefaultAzureCredential(),
    new ComputeManagementClientOptions() { Diagnostics = { IsLoggingContentEnabled = true } });

var virtualMachinesClient = computeClient.VirtualMachines;

var input = "sudo git clone https://github.com/spatial-intelligence/OSR4Rights facesearch";

// run the command
var foo = await virtualMachinesClient.StartRunCommandAsync(resourceGroupName, "vm", new RunCommandInput("RunShellScript") { Script = { input } });

```