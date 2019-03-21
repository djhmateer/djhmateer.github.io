---
layout: post
title: Azure DevOps YAML Pipelines
menu: review
categories: DevOps
published: true 
comments: false
sitemap: false
---
In the [previous article on Azure DevOps GUI Pipelines]() we got a CI/CD pipeline working deploying an ASP.NET Core 2.2 application to Azure PaaS, using Windows and Linux hosted build agents.  

In this article we are doing this in code `azure-pipelines.yml` with the goal of:

- Every new feature branch will get its own Azure Resource Group and all assets, so can test independently
- Infrastructure as Code (IaS) - so we can test the deployed infrastructure (and control changes)

[Source code is here in pipelines-dotnetcoreb](https://dev.azure.com/djhmateer/pipelines-dotnetcoreb)  

Once cloned and built locally, to get your own version working you'll need

- a local agent running (although can use their slower hosted agents). [See previous article]()
- Azure Resource Manager service connection

## VS Code Extension
Azure Pipelines extension


## Azure Resource Manager service connection  
![ps](/assets/2019-03-21/1.png)  
This gives DevOps permission to work on the Azure Subscription.  

Be careful not to select a Resource Group as that limits the access.  

## Build 
asdf

[Do I need quotes for string in YAML](https://stackoverflow.com/questions/19109912/do-i-need-quotes-for-strings-in-yaml) well, as there are so many caveats a good rule of thumb is to use quotes.  

## Variables
[Predefined Variables](https://docs.microsoft.com/en-gb/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml) here  

[Build Number Format](https://docs.microsoft.com/en-gb/azure/devops/pipelines/build/options?view=azure-devops&tabs=yaml)  only in BuildNumber ie name: will it change /refs/heads/master to refs_heads_master


## Publish
[PublishBuildAArtifacts@1](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/publish-build-artifacts?view=azure-devops)

## Deploy to Existing Azure
[AzureRmWebAppDeployment@4 documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-rm-web-app-deployment?view=azure-devops)

## Azure CLI - Build new Infrastructure
Am using the Azure CLI for this rather than Azure Resource Manager (ARM) templates as I find it easier.  

[AzureCLI@1 documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-cli?view=azure-devops)  

```yml
# Azure CLI
# Run Azure CLI commands against an Azure subscription in a Shell script when runnning on Linux agent or Batch script when running on Windows agent.
- task: AzureCLI@1
  inputs:
    azureSubscription: 'pipelines-dotnet-core-connectionc' 
    scriptLocation: 'inlineScript'
    #inlineScript: 'az --version'
    inlineScript: 'az group create -l westeurope -n TestRG'
```

and introducing a variable:
```yml
variables:
  buildConfiguration: 'Release'
  azureRegion: 'westeurope'

- task: AzureCLI@1
  displayName: Azure CLI - Inline Task - Deploy new Infrastructure
  inputs:
    azureSubscription: 'pipelines-dotnet-core-connectionc' 
    scriptLocation: 'inlineScript'
    inlineScript: 'az group create -l $(azureRegion) -n TestRG'
```
## Azure CLI - Pass variables to file
nd then an external file:
[AzureCLI@1 documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-cli?view=azure-devops)

```yml

```




