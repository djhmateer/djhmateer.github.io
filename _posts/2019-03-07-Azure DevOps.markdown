---
layout: post
title: Azure DevOps  
date: 2019-03-06
menu: review
categories: DevOps
published: true 
comments: false
sitemap: false
---

[Azure DevOps](https://azure.microsoft.com/en-gb/services/devops/) is a collection of services:

- Boards (like Jira - idea to release of software.)
- Repos (like GitHub, BitBucket)
- Pipelines (Build, Run Automated Tests and Deploy like Appveyor, CircleCI, Jenkins, Octopus)
- Test plans (manual and exploratory testing tools)
- Artifacts - packages eg nuget

For continuous delivery especially for collaboration / more complex projects this pipeline is invaluable. It needs time and work to set it up and maintain it. 
 
You can pick and choose which services to use eg could keep using GitHub


There has been [a lot of people commenting on the UI](https://news.ycombinator.com/item?id=18983586) and I can confirm there is a steep learning curve.  

[Excellent video from NDC London 2019](https://www.youtube.com/watch?v=ges0Q07-kSc) giving a good overview starting with the many names some of the tools have been called eg VSTS, VSO, TFS

## Settings 
<img src="/assets/2019-03-07/1.png" width="600" align="right" hspace="15">  

Turning off Boards, Artifacts and Test Plans helps reduce noise. I'm keeping this Project private

After setting up a repository with a single index.html in it with 'Hello World' as text, lets make a Continuous Deployment pipeline that deploys to the live Azure App Service whenever a new commit is pushed to the master branch.



![ps](/assets/2019-03-07/1.png)  

PBI - Product Backlog Item  


