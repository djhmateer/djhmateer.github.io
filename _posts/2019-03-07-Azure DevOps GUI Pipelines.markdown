---
layout: post
title: Azure DevOps GUI Pipelines
menu: review
categories: DevOps
published: true 
comments: false
sitemap: false
---
[Azure DevOps](https://azure.microsoft.com/en-gb/services/devops/) is a collection of services:

- Boards (like Jira or Trello- idea to release of software.)
- Repos (like GitHub, BitBucket)
- Pipelines 
     - Builds and automated tests - (like TeamCity, Appveyor, CircleCI, Jenkins)
     - Releases - (like Jenkins, Octopus deploy)
- Test plans (manual and exploratory testing tools)
- Artifacts - packages eg nuget

[Use the YAML way of defining Azure DevOps](/2019/03/21/Azure-DevOps-YAML-Pipelines). I found that exploring the GUI was very helping in understanding the product, but Infrastructure as Code (IaC) is **where you should be**

For continuous delivery especially for collaboration / more complex projects this pipeline is invaluable. It needs time and work to set it up and maintain it.

You can pick and choose which services to use eg could keep using GitHub

There has been [a lot of people commenting on the UI](https://news.ycombinator.com/item?id=18983586) and I can confirm there is a steep learning curve.  

[Excellent video from NDC London 2019](https://www.youtube.com/watch?v=ges0Q07-kSc) giving a good overview starting with the many names some of the tools have been called eg VSTS, VSO, TFS  

[AzureDevOps Hands On Labs](https://www.azuredevopslabs.com/)  

[Microsoft Architecture Solutions](https://azure.microsoft.com/en-gb/solutions/architecture/?solution=devops)  

## Goal

Goal is that infrastructure should be defined just like code, which can be checked into source control. So then we can spin up all the infrastructure in Azure at any point eg for a Feature branch that I want to test.  

Perhaps there is webserver (PaaS) and a database (MSSQL) initially.  

Below is shown how to setup the Build and Release pipelines in the GUI, however [in the next article we will explore the azure-pipelines.yml recommended way](). **This is what I use in production**  

## Settings
<!-- <img src="/assets/2019-03-07/1.png" width="600" align="left" hspace="15">  -->

Turning off Boards, Artifacts and Test Plans helps reduce noise. I'm keeping this Project private
![ps](/assets/2019-03-07/1.png){:width="700px"}

## Release Pipelines

After setting up a repository with a single index.html in it with 'Hello World' as text, lets make a Continuous Deployment pipeline that deploys to the live Azure App Service whenever a new commit is pushed to the master branch.

### Step 1 - Add an Artifact

![ps](/assets/2019-03-07/2.png){:width="800px"}  
Wiring up the Artifact directly to the master branch of the Repo (not doing any building)

### Step 2 - Trigger getting the Artifact

![ps](/assets/2019-03-07/3.png)  
Trigger to deploy whenever there is a push to the branch (master as defined in first step)  

### Step 3 - Stages create an Agent to do the Deploy

![ps](/assets/2019-03-07/4.png)  
Use VS2017 here - could use Ubuntu, Server 2019, Mac, Self Hosted agent

### Step 4 - Azure App Service Deploy

![ps](/assets/2019-03-07/5.png)  
So it is zipping up everything in the linked repository and sending to an already created App Service in Azure.  

![ps](/assets/2019-03-07/7.png)
For each release you can see the logs, and could deploy from here manually eg to **roll back** to a previous release.  

![ps](/assets/2019-03-07/6.png)

[Azure App Service Deploy](https://github.com/Microsoft/azure-pipelines-tasks/blob/master/Tasks/AzureRmWebAppDeploymentV4/README.md) - looks like it uses Zip Deploy  


Stages, Prod Deploy - 1 job, 1 task, using a Windows machine running VS2017 to do the deploy (could use Ubuntu or Server 2019 with VS2019).  

Time to deploy to live site between 35s and 60s.  

## Build Pipeline

There is the yaml or visual designer way to do the Build. [From the Azure DevOps Docs](https://docs.microsoft.com/en-gb/azure/devops/pipelines/get-started/pipelines-get-started?toc=/azure/devops/pipelines/toc.json&bc=/azure/devops/boards/pipelines/breadcrumb/toc.json&view=azure-devops) comments at the bottom it seems like yaml doesn't have stages in Releases (eg dev, test, prod) or approvals in Releases which are very important.  

The documentation recommends using the yaml way so everything is in source control, however others I've talked to who use this in production suggest the UI. 

### Visual Designer

![ps](/assets/2019-03-07/8.png)

Creating a new build pipeline

![ps](/assets/2019-03-07/9.png)

Selecting the visual designer

![ps](/assets/2019-03-07/10.png)   
If Enable CI is not checked then it will not trigger on a Repo change.

![ps](/assets/2019-03-07/11.png)   
Building all projects on an Ubuntu machine. Interestingly I've not got any test projects defined, so it just gives a warning.

![ps](/assets/2019-03-07/12.png)   
Setting the source Repo for the Build and branch. Tagging source repo always

![ps](/assets/2019-03-07/13.png)   
We can see in source control which every build and its `$build.buildNumber` [More Information on Microsoft Docs](https://docs.microsoft.com/en-gb/azure/devops/pipelines/repos/pipeline-options-for-git?view=azure-devops) and [all the predefined variables](https://docs.microsoft.com/en-gb/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml)

![ps](/assets/2019-03-07/14.png)   
We're inheriting Ubuntu build server from the Pipeline.

Restore, Build, Test, Publish, and Publish Artifact (which doesn't go into the Azure DevOps Artifacts, but is accessible from the Agent whic does Releases

## Stages

A push to master branch automatically triggers a deploy to Test http://webapplication1dm-test.azurewebsites.net then manually Approve to promote to Prod http://webapplication1dm.azurewebsites.net

![ps](/assets/2019-03-07/17.png)   

![ps](/assets/2019-03-07/20.png)   
Setting up the Approval process so that I can approve.

![ps](/assets/2019-03-07/21.png)   
If you do this, then can only deploy the latest to Prod. I prefer the ability to promote any build to Prod (and can then easily promote a previous build to prod if something breaks), so use `Unlimited` above

![ps](/assets/2019-03-07/18.png)   
We have Release-23 in Test and Release-22 in Prod.

## Email Alerts

Look in your personal settings to turn them on or off
![ps](/assets/2019-03-07/22.png)


## Build Minutes and Parallel Jobs

A handy screen to see how many build minutes we have used. Notice that Public projects get free build minutes.  See below as I've gone to using the faster Self-hosted build agents.  
![ps](/assets/2019-03-07/16.png)    

## Connection strings and secrets

We want an automated pipeline to put in the correct secrets into the application depends on which Stage eg Test/Prod we are in.  

The simplest workflow is if we are using a ASP.NET Core web app, then put in variables in `appsettings.json` 

```json
{
  "Stage": "Local",
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=WebApplication1;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```
Then in the Azure portal we can put in the secret connection strings. We don't need the build chain to insert them (yet) as we have already got our Test and Prod enviornments built.

![ps](/assets/2019-03-07/23.png)    

To access the configuration settings from say `Index.cshtml.cs`, you can use the ASP.NET Core's DI to inject in IConfiguration which then allows us to read:
-appsettings.json when running locally
-Azure Application Settings and Connection Strings (these settings take precedence)

```cs
public class IndexModel : PageModel
{
    private readonly IConfiguration _config;
    public string Message { get; set; }
    public string ConnectionString { get; set; }
    public string Stage { get; set; }

    public IndexModel(IConfiguration config)
    {
        _config = config;
    }

    public void OnGet()
    {
        Message = "test message";
        var connectionString = _config.GetConnectionString("DefaultConnection");
        var stage = _config.GetValue<string>("Stage");
        ConnectionString = connectionString;
        Stage = stage;
    }
}
```

On the razor view:  

```html
<h1 class="display-4">Welcome!_   n</h1>
<p>Message is: @Model.Message</p>
<p>Stage is: @Model.Stage</p>
<p>ConnectionString is: @Model.ConnectionString</p>

```

## Variable Substitution - Display Build information on the website

To know exactly which build you are looking at on a Test / Prod server is invaluable. So many production issues have been solved this way.  

![ps](/assets/2019-03-07/30.png)
Here we are on the Test stage, connected to the test database, on build 104 done at 14:22 on the 13th of March 2019.

![ps](/assets/2019-03-07/31.png)
The same build on Prod.

To add a variable which we can substitute:  

- Add variable into appsettings.json with local settings
- Make sure in Releases (all Stages) that in Deploy Azure App Service, the File transforms JSON variable substitution is set eg **/appsettings.json 
- Add variable in Releases, Variables.

If you put the same variable in Azure dashboard Application settings it will override any previous settings 

```json
  "Stage": "Local",
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=WebApplication1;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "DevOpsBuildNumber" :  "BuildNumberNotSet",
  "DevOpsBuildId" :  "BuildIdNotSet",
  "DevOpsReleaseId" :  "ReleaseIdNotSet",
```

appsettings.json  

I am using a [json transform of the appsetting.json file](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/transforms-variable-substitution?view=azure-devops)  

![ps](/assets/2019-03-07/28.png)    
Set the json transform in Test and Prod Stages

![ps](/assets/2019-03-07/27.png)    
Adding in variable in Releases, Variables


[Build Variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml) defined here  

[Release Variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/release/variables?view=azure-devops&tabs=batch)  defined   

- Build.BuildNumber eg 20190312.2 - typically this is used to make a git Tag 
- Build.BuildId eg 62 useful for making <a href="https://dev.azure.com/penhemingway/WebApplication1/_build/results?buildId=62"> a hyperlink to the build</a>  
- Release.ReleaseId eg 50 useful for making a <a href="https://dev.azure.com/penhemingway/WebApplication1/_releaseProgress?_a=release-pipeline-progress&releaseId=50">hyperlink for the release</a>  

The [Build.BuildNumber format can be modified](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/options?view=azure-devops&tabs=yaml)

I now use a BuildNumber like: `20190312_1426_77` ie $(Date:yyyyMMdd)_$(Date:HHmm)_$(BuildID)   

![ps](/assets/2019-03-07/25.png)    
Setting the BuildNumber which is useful to display at the bottom of the final websites.  

![ps](/assets/2019-03-07/29.png)    
Having the BuildNumber 101, BuildDateTime 13:48, Stage: Test, and db connection string (part of it!).. provides invaluable debug information. [StackOverflow](https://stackoverflow.com) do something similar with the BuildNumber.  

To access this data from code:   

```cs
var connectionString = _config.GetConnectionString("DefaultConnection");
// so wont throw if < 50
ConnectionString = new string(connectionString.Skip(7).Take(50).ToArray());

Stage = _config.GetValue<string>("Stage");
DevOpsBuildId = _config.GetValue<string>("DevOpsBuildId");
DevOpsBuildNumber = _config.GetValue<string>("DevOpsBuildNumber");
DevOpsReleaseId = _config.GetValue<string>("DevOpsReleaseId");
```

## DevOps Status

I had an issue where the Build was triggering when a new commit was found on the branch, but the Release pipeline wasn't picking up that a new artifact was there.  It turned out to be an issue with DevOps which was shown on the [status.dev.azure.com board](https://status.dev.azure.com/)  

Even an hour after it was fixed I noticed issues - seeing a 17minute then 6minute then 4minute lag between Build finishing and Release artifact being picked up. I'm assuming it is message queues clearing.  

## Linux Docker Build Agent

To speed up the Builds and Releases I use my own Linux build agent running as a Docker container on my local windows machine (fast desktop with a 140Mbps synchronous internet connect). This is not recommended for Production, but is very good for experimentation with the system.

[Build agent on Docker Hub](https://hub.docker.com/_/microsoft-azure-pipelines-vsts-agent) and instructions

```bash
docker run -e VSTS_ACCOUNT=penhemingway -e VSTS_TOKEN=************** -e VSTS_POOL=MateerPool -e VSTS_AGENT='workdesktop-agent' -it mcr.microsoft.com/azure-pipelines/vsts-agent
```

-VSTS_ACCOUNT is from: https://dev.azure.com/penhemingway/  
-PAT Token can be got from: DevOps Portal, Your user icon, Security, then:  
-VSTS_POOL is an obvious name (see below in Organisational settings, Agent Pools)  
-VSTS_AGENT is the name of your build server  

![ps](/assets/2019-03-07/24.png)    

![ps](/assets/2019-03-07/26.png)    
Setting up own pool makes it clearer in Builds and Pipelines (instead of the nebulous Default).

Performance improvements on local vs Hosted Ubuntu:
-Builds from 2:30 to 17seconds
-Release stage is much faster 

To see changes in Dev takes **50 seconds** now, compared with **3:30**.

## Windows Build Agent

Apparently they are [working on a Windows Docker build agent](https://mohitgoyal.co/2019/01/05/running-azure-devops-private-agents-as-docker-containers/) but for now we have to use a local one:

![ps](/assets/2019-03-07/40.png)    
I found that using Powershell was the way forward (so don't download the agent). Essentially:

```powershell
mkdir agent ; cd agent
Add-Type -AssemblyName System.IO.Compression.FileSystem ; [System.IO.Compression.ZipFile]::ExtractToDirectory("$HOME\Downloads\vsts-agent-win-x64-2.148.1.zip", "$PWD")

# configures the agent - I chose to not run it as a service
.\config.cmd

# runs it in the powershell
.\run.cmd
```

- pat (personal access token) is found from Personal, Security on the dev.azure.com page
- url is of the form:  https://dev.azure.com/djhmateer
- pool is: DJHMateerWindowsPool
- name is: WorkDesktopWindows

## Using a database

SQL Server hosted on Azure 

To get debug error messages on Test, use the environment variable:

```bash
ASPNETCORE_ENVIRONMENT = Development
```

## AzureDevOpsDemoGenerator

[https://azuredevopsdemogenerator.azurewebsites.net](https://azuredevopsdemogenerator.azurewebsites.net) generates up sample DevOps projects with Boards,. Repos, Pipelines, Test Plans and Artifacts.  

[https://azuredevopslabs.com/labs/azuredevops/continuousintegration/](https://azuredevopslabs.com/labs/azuredevops/continuousintegration/) requries the Parts Unlimited project be setup. This is an ASP.NET 4.5 project talking to MSSQL.  

## AzureDevOps TLA's

PBI - Product Backlog Item  

## Summary

We have looked at using the GUI for driving Azure DevOps.

In the [next article we will look at driving the Pipeline from yml which is the recommended way]()
