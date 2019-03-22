---
layout: post
title: Azure DevOps YAML Pipelines **Work in Progress**
menu: review
categories: DevOps
published: true 
comments: false
sitemap: false
---
In the [previous article on Azure DevOps GUI Pipelines](/2019/03/07/Azure-DevOps-GUI-Pipelines) we got a CI/CD pipeline working deploying an ASP.NET Core 2.2 application to Azure PaaS, using Windows and Linux hosted build agents.  

In this article we are doing this in code `azure-pipelines.yml` with the goal of:

- Every new feature branch will get its own Azure Resource Group and all assets, so can test independently
- Infrastructure as Code (IaC) - so we can test the deployed infrastructure (and control changes)

[Source code is here in pipelines-dotnetcoreb](https://dev.azure.com/djhmateer/pipelines-dotnetcoreb)  

Once cloned and built locally, to get your own version working you'll need

- a local agent running (although can use their slower hosted agents). [See previous article]()
- Azure Resource Manager service connection

## VS Code Extension
Azure Pipelines extension is very handy for code completion.


## Azure Resource Manager service connection  
![ps](/assets/2019-03-21/1.png)  
This gives DevOps permission to work on the Azure Subscription.  

Be careful not to select a Resource Group as that limits the access.  

## Build 
[Do I need quotes for string in YAML](https://stackoverflow.com/questions/19109912/do-i-need-quotes-for-strings-in-yaml) well, as there are so many caveats a good rule of thumb is to use quotes.  

## Variables
Passing variables around can be difficult.  Documentation on 
[Predefined Variables](https://docs.microsoft.com/en-gb/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml) here      

[Build Number Format](https://docs.microsoft.com/en-gb/azure/devops/pipelines/build/options?view=azure-devops&tabs=yaml)  only in BuildNumber ie name: will it change /refs/heads/master to refs_heads_master  I had to do string manipulation in bash to extract the actual branch name.

## Publish
[PublishBuildArtifacts@1 documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/publish-build-artifacts?view=azure-devops) notice the @1 means version 1.

## Deploy to Existing Azure
[AzureRmWebAppDeployment documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-rm-web-app-deployment?view=azure-devops)

## Azure CLI - Build new Infrastructure inline
Am using the Azure CLI for this rather than Azure Resource Manager (ARM) templates as I'm more experienced in the CLI.

[AzureCLI documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-cli?view=azure-devops)  

Here is a very simple inline example of creating azure infrastructure from Azure DevOps yml.  

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
However we really need an external script to do this:  

## Final Files 
[AzureCLI@1 documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-cli?view=azure-devops)  

`azure-pipelines.yml` is defined below:  
Essentially all you need is this file (and the service connection), and you have a full CI/CD pipeline.  

The script will:

- Do a build on a hosted local build agent
- Package the build into a zip file ready for webdeployment
- Create Azure infrastructure for the current branch *if not already existing*
- Deploy new code to the infrastructure

![ps](/assets/2019-03-21/2.png)  
Inside the resource group there is an app service plan and an app service.  
![ps](/assets/2019-03-21/3.png)  

```yml
# Build ASP.NET Core project using Azure Pipelines
# https://docs.microsoft.com/azure/devops/pipelines/languages/dotnet-core?view=vsts

# Defines the BuildNumber in Devops which is useful to display at the bottom of output website 
# can reference $(BuildNumber) in code below to create a resource group
# $(SourceBranch)
name: $(Date:yyyyMMdd)_$(Date:HHmm)_$(BuildId)_$(SourceBranch) #eg 20190321_1309_140_refs_heads_master

# Default is master, so not required 
trigger:
  #- master
  # We want to trigger a build and do a release on new infrastructure on all pushes to Feature Branches
  - '*' 

pool:
  # uncomment a specific name to run a hosted local agent (faster)
  name: 'DJHMateerLinuxPool'
  #name: 'DJHMateerWindowsPool'
  vmImage: 'Ubuntu 16.04'
  #vmImage: 'vs2017-win2016' # other options: 'macOS-10.13', 'vs2017-win2016'
  
# https://docs.microsoft.com/en-gb/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch
# working with variables
variables:
  buildConfiguration: 'Release'
  # these are passed to azure.sh bash script at the bottom of this file
  azureRegion: 'westeurope'
  #branch: $(Build.SourceBranch) # refs/heads/master
  #rg: 'TestRG-$(Build.BuildNumber)' # eg Master-20190321_1309_140 as defined as name: at the top
  # $(Build.SourceBranch) is refs/heads/master which is no good for a rg name
  #webappname: 'dotnetcoreb$(Build.BuildId)' # dotnetcoreb120  # required


steps:
#a
#- bash: |
    #echo "Hello world from $AGENT_NAME running on $AGENT_OS"
    #echo "BuilID is $BUILD_BUILDID"
    #echo "SourceBranch is $BUILD_SOURCEBRANCH" # refs/heads/master
    #case $BUILD_REASON in
            #"Manual") echo "$BUILD_REQUESTEDFOR manually queued the build." ;;
            #"IndividualCI") echo "This is a CI build for $BUILD_REQUESTEDFOR." ;;
            #"BatchedCI") echo "This is a batched CI build for $BUILD_REQUESTEDFOR." ;;
        #*) $BUILD_REASON ;;
    #esac
  #displayName: Hello world

# cross platform scripts and passing variables
# https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/cross-platform-scripting?view=azure-devops&tabs=yaml
# get rid of refs/heads from refs/heads/master branch naming
- bash: |
    export IPADDR=$(ip addr | grep 'state UP' -A2 | tail -n1 | awk '{print $2}' | cut -f1  -d'/')
    echo "##vso[task.setvariable variable=IP_ADDR]$IPADDR"
    echo "SourceBranch is $BUILD_SOURCEBRANCH" # refs/heads/master
    #DAVE=$BUILD_SOURCEBRANCH | rev | cut -d/ -f1 | rev
    DAVE=$BUILD_SOURCEBRANCH 
    WORDTOREMOVE="refs/heads/"
    DAVE=${DAVE//$WORDTOREMOVE/}
    echo "##vso[task.setvariable variable=DAVE_SOURCEBRANCH]$DAVE"
  displayName: Dave Test 

# now we use the value, no matter where we got it
- script: |
    echo The IP address is $(IP_ADDR)
    echo Branch is $(DAVE_SOURCEBRANCH)

# script is a cmd or bash call
# https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema?view=azure-devops&tabs=schema#script
# simple test echo
#- script: 'echo rg is $(rg)'
  #displayName: 'Echo variables rg is $(rg)'

# task is a building block of pipelines
# https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema?view=azure-devops&tabs=schema#task
# needed to run dotnetsay and the main project
- task: DotNetCoreInstaller@0
  displayName: Install .NET Core SDK 2.2.101
  name: install_dotnetcore_sdk
  enabled: true
  inputs:
    packageType: 'sdk'
    version: '2.2.101'

#- script: |
#   dotnet build --configuration $(buildConfiguration)
  #  dotnet test dotnetcore-tests --configuration $(buildConfiguration) --logger trx
  # dotnet publish --configuration $(buildConfiguration) --output $BUILD_ARTIFACTSTAGINGDIRECTORY


# displayname says dotnet build Release
- script: dotnet build --configuration $(buildConfiguration)
  displayName: 'dotnet build $(buildConfiguration)' 

# needed for the drop
#- script: dotnet publish --configuration $(buildConfiguration) --output $(Build.ArtifactStagingDirectory)
#  displayName: 'dotnet publish --configuration $(buildConfiguration) --output $(Build.ArtifactStagingDirectory)' 

# no test in solution at the moment
#- task: PublishTestResults@2
# displayName: PublishTestResults@2 
  #condition: succeededOrFailed()
# inputs:
  # testRunner: VSTest
    #testResultsFiles: '**/*.trx'

# same as dotnet publish but with some flags for web deployment 
- task: DotNetCoreCLI@2
  displayName: DotNetCoreCli - dotnet publish zip to ArtifactStagingDirectory for web project
  inputs:
    command: publish
    publishWebProjects: True
    arguments: '--configuration $(BuildConfiguration) --output $(Build.ArtifactStagingDirectory)'
    zipAfterPublish: True

# so can see in Summary tab the actual files we published - gives a zip inside a zip
# step not necessary 
#- task: PublishBuildArtifacts@1
  #displayName: Running PublishBuildArtifacts@1 - Publishing Artifact *not required*
  #inputs:
      ## Path to the folder we wish to publish
      #PathtoPublish: '$(Build.ArtifactStagingDirectory)'
      #name: 'drop'

 
# Azure CLI 
# Run Azure CLI commands against an Azure subscription in a Shell script when runnning on Linux agent or Batch script when running on Windows agent.
# https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-cli?view=azure-devops
#- task: AzureCLI@1
  #displayName: Azure CLI - Inline Task - Deploy new Infrastructure
  #inputs:
    #azureSubscription: 'pipelines-dotnet-core-connectionc' 
    #scriptLocation: 'inlineScript'
    ##inlineScript: 'az --version'
    #inlineScript: 'az group create -l $(azureRegion) -n $(rg)'

- task: AzureCLI@1
  displayName: Azure CLI - Run azure.sh bash script
  inputs:
    azureSubscription: 'pipelines-dotnet-core-connectionc' 
    #scriptLocation: 'inlineScript'
    #inlineScript: 'az group create -l $(azureRegion) -n TestRG'
    scriptPath: azure.sh
    arguments: $(azureRegion) TEST-pipelinesb-$(DAVE_SOURCEBRANCH) pipelinesb-$(DAVE_SOURCEBRANCH)

# Deploy to Azure App Service 
# https://docs.microsoft.com/en-us/azure/devops/pipelines/targets/webapp?view=azure-devops&tabs=yaml
- task: AzureRmWebAppDeployment@4
  displayName: AzureRmWebAppDeployment - Deploying to Azure App Service $(webappname)
  inputs:
    azureSubscription: 'pipelines-dotnet-core-connectionc'
    #WebAppName: 'pipelinesdm2'
    WebAppName: 'pipelinesb-$(DAVE_SOURCEBRANCH)'
    ResourceGroupName: 'TEST-pipelinesb-$(DAVE_SOURCEBRANCH)'
    Package: $(Build.ArtifactStagingDirectory)/**/*.zip
    ## to get around file locked when deploying to Windows PaaS
    #renameFilesFlag: True
    ## another workaround for PaaS
    TakeAppOfflineFlag: True
 
#- bash: 'echo webappname is $(webappname).azurewebsites.net' # https://github.com/MicrosoftDocs/vsts-docs/issues/2327


```



Here is the `azure.sh` which is being called

```bash
#!/bin/bash

set -x
# a
#az group create -l westeurope -n TestRG2

#AZURE_REGION="northeurope"
AZURE_REGION=$1
RESOURCEGROUP_NAME=$2 #TestRG-20190321_1631_172_refs_heads_master 
SERVICEPLAN_NAME="dotnetcoreb-asp"
# https://docs.microsoft.com/en-us/cli/azure/webapp?view=azure-cli-latest#az-webapp-create
#SERVICEPLAN_SKU="FREE"
SERVICEPLAN_SKU="D1" # this is Shared
WEBAPP_NAME=$3

echo "Azure Region is $AZURE_REGION" # westeurope
echo "RESOURCEGROUP_NAME is $RESOURCEGROUP_NAME" # TestRG-20190321_1631_172_refs_heads_master

az group create \
  --name $RESOURCEGROUP_NAME \
  --location $AZURE_REGION 

#az sql server create --name $SQL_SERVER_NAME --location $LOCATION --resource-group $RESOURCEGROUP_NAME 
#--admin-user $SQL_ADMIN_USERNAME --admin-password $SQL_ADMIN_PASSWORD

#az sql server firewall-rule create --resource-group $RESOURCEGROUP_NAME --server $SQL_SERVER_NAME -n AllowAllWindowsAzureIps 
#--start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0

#az sql db create --resource-group $RESOURCEGROUP_NAME --server $SQL_SERVER_NAME --name $SQL_DATABASE_NAME --edition $SQL_EDITION 
#--collation $SQL_COLLATION --max-size $SQL_MAXSIZE --service-objective $SQL_SERVICEOBJECTIVE

# https://docs.microsoft.com/en-us/cli/azure/appservice/plan?view=azure-cli-latest
az appservice plan create \
    --name $SERVICEPLAN_NAME \
    --resource-group $RESOURCEGROUP_NAME \
    --sku $SERVICEPLAN_SKU

az webapp create \
    --name $WEBAPP_NAME \
    --resource-group $RESOURCEGROUP_NAME \
    --plan $SERVICEPLAN_NAME

#SQL_CONNECTIONSTRING="Data Source=tcp:'$(az sql server show -g $RESOURCEGROUP_NAME -n $SQL_SERVER_NAME --query fullyQualifiedDomainName -o tsv)'
#,1433;Initial Catalog='$SQL_DATABASE_NAME';User Id='$SQL_ADMIN_USERNAME';Password='$SQL_ADMIN_PASSWORD';"
#az webapp config connection-string set --resource-group $RESOURCEGROUP_NAME --name $WEBAPP_NAME --connection-string-type SQLServer 
#--settings DefaultConnection="$SQL_CONNECTIONSTRING"
```
when working with bash files on windows:

- debug info at top useful so can see in devops ui what the actual commands were
- careful not to put a space after a multiline \
- careful to set LF as the line endings (and git doesn't do anything improper)
- max number of free ServerFarms allowed is 10 (for an MSDN subscription)

## Next
Get an end to end application working with:
- BuildNumber at bottom of website
- SQL Database
- Protected production environment (manual step to publish to it)
- Blue/Green environment
- Staging
- Every feature branch gets its own Infrastructure
- Unit Testing, Selenium testing, Load testing (manual)




