---
layout: post
title: Azure DevOps  
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

For continuous delivery especially for collaboration / more complex projects this pipeline is invaluable. It needs time and work to set it up and maintain it. 
 
You can pick and choose which services to use eg could keep using GitHub


There has been [a lot of people commenting on the UI](https://news.ycombinator.com/item?id=18983586) and I can confirm there is a steep learning curve.  

[Excellent video from NDC London 2019](https://www.youtube.com/watch?v=ges0Q07-kSc) giving a good overview starting with the many names some of the tools have been called eg VSTS, VSO, TFS  

[AzureDevOps Hands On Labs](https://www.azuredevopslabs.com/)  

[Microsoft Architecture Solutions](https://azure.microsoft.com/en-gb/solutions/architecture/?solution=devops)  

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

So the azure-pipelines.yml describes the Build and the Release?  

The documentation recommends using the yaml way so everything is in source control, however others I've talked to in real life use the gui currently.

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
A push to master branch automatically triggers a deploy to Test [http://webapplication1dm-test.azurewebsites.net/](http://webapplication1dm-test.azurewebsites.net/) then manually Approve to promote to Prod [http://webapplication1dm.azurewebsites.net/](http://webapplication1dm.azurewebsites.net/)

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
A handy screen to see how many build minutes we have used. Notice that Public projects get free build minutes.   
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

then in the Azure portal we can put in the secret connection strings. We don't need the build chain to insert them (yet) as we have already got our Test and Prod enviornments built.

![ps](/assets/2019-03-07/23.png)    

To access the configuration settings from say `Index.cshtml.cs`, you can use the ASP.NET Core's DI to inject in IConfiguration which then allows us to read:
- appsettings.json when running locally
- Azure Application Settings and Connection Strings (these take precedence)  
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
        //var environment = _config.GetValue<string>("ConnectionStrings:DefaultConnection");
        //var connection = new SqlConnection(_config.GetConnectionString("WebApplication1ConnectionString"));
        var connection = _config.GetConnectionString("DefaultConnection");
        var stage = _config.GetValue<string>("Stage");
        ConnectionString = connection;
        Stage = stage;
    }
}
```
and on the razor view:

```html
<h1 class="display-4">Welcome!_   n</h1>
<p>Message is: @Model.Message</p>
<p>Stage is: @Model.Stage</p>
<p>ConnectionString is: @Model.ConnectionString</p>

```

## Variable Substitution - Display Build information on the website
To know exactly which build you are looking at on a Test / Prod server, and to be able to tie that back to a commit is invaluable. I also like to know which connection string the app thinks it has (with security). So many production issues have been saved this way.  

I am using a [json transform of the appsetting.json file](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/transforms-variable-substitution?view=azure-devops)  

[Build Variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml) defined here  

[Release Variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/release/variables?view=azure-devops&tabs=batch)  defined   

- Build.BuildNumber eg 20190312.2 - typically this is used to make a git Tag 
- Build.BuildId eg 62 useful for making <a href="https://dev.azure.com/penhemingway/WebApplication1/_build/results?buildId=62"> a hyperlink to the build</a>  
- Release.ReleaseId eg 50 useful for making a <a href="https://dev.azure.com/penhemingway/WebApplication1/_releaseProgress?_a=release-pipeline-progress&releaseId=50">hyperlink for the release</a>  

The [Build.BuildNumber format can be modified](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/options?view=azure-devops&tabs=yaml)

I now use a BuildNumber like: `20190312_1426_77` ie $(Date:yyyyMMdd)_$(Date:HHmm)_$(BuildID)   

![ps](/assets/2019-03-07/25.png)    
Setting the BuildNumber which is useful to display at the bottom of the final websites.  

```json
{
  "Stage": "Local",
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=WebApplication1;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "DevOpsBuildNumber" :  "BuildNumberNotSet",
  "DevOpsBuildId" :  "BuildIdNotSet",
  "DevOpsReleaseId" :  "ReleaseIdNotSet",
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

then variables being defined on the DevOps dashboard:


## DevOps Status

I had an issue where the Build was triggering when a new commit was found on the branch, but the Release pipeline wasn't picking up that a new artifact was there.  It turned out to be an issue with DevOps which was shown on the [status.dev.azure.com board](https://status.dev.azure.com/)  

Even an hour after it was fixed I noticed issues - seeing a 17minute then 6minute then 4minute lag between Build finishing and Release artifact being picked up. I'm assuming it is message queues clearing.  

## Build Agent

![ps](/assets/2019-03-07/24.png)    

https://azuredevopslabs.com/labs/java/dockerbuildagent/


## AzureDevOps TLA's
PBI - Product Backlog Item  


