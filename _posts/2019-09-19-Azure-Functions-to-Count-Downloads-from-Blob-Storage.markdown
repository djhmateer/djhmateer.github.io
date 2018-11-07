---
layout: post
title:  "Azure Functions to Count Downloads from Blob Storage"
date:   2018-10-15 09:43
menu: review
categories: azure 
published: true 
comments: true
---

We use Azure Blob Storage to host .mp4 videos for a client and  wanted to have an accurate download count on a per video basis. Here was my [initial question on Stack Overflow](https://stackoverflow.com/q/51657349/26086)  

Using Azure Functions and basing it on the strategy from [Chris Johnson](http://www.chrisjohnson.io/2016/04/24/parsing-azure-blob-storage-logs-using-azure-functions/) and his [source](https://github.com/LoungeFlyZ/AzureBlobLogProcessing) we have a good solution.


## What are Azure Functions? 
[Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/)
> Azure Functions is a serverless compute service that enables you to run code on-demand without having to explicitly provision or manage infrastructure.


Let's create an Azure Function locally in Visual Studio, New Project.
![ps](/assets/2018-10-16/1.png)

then 

![ps](/assets/2018-10-16/22.png){:width="700px"}  
 

[Functions v2 (.NET Standard)](https://docs.microsoft.com/en-us/azure/azure-functions/functions-versions) is where new feature work and improvements are being made so that is what we are using.


![ps](/assets/2018-10-16/32.png)

And if we go to http://localhost:7071/api/Function1?name=dave we'll get back

![ps](/assets/2018-10-16/42.png)  

We have **created an Azure Function locally which responds to an HTTP Request**

## Deploy to Live
Let's deploy this to Azure  
![ps](/assets/2018-10-16/5.png){:width="400px"}  
Create a new function from the Azure portal  
![ps](/assets/2018-10-16/6.png){:width="500px"}   
Name the function, RG and Storage  
![ps](/assets/2018-10-16/7.png){:width="800px"}    

These assets are created  
![ps](/assets/2018-10-16/8.png){:width="700px"}  

Inside the newly created function, let's setup how to deploy to it.  
## Deploy using Local Git
For local development I find using Local Git deployment is excellent.  Use *Deployment Center* to setup then:

![ps](/assets/2018-10-16/b31.png)  
Use the **App Credentials** so they are specific to this app only. User credentials are across your entire Azure estate.

```bat
git remote add azure https://$davemtest@davemtest.scm.azurewebsites.net:443/davemtest.git  
git push -u azure master
```
Setting up deployment from the command line.  Use -u (--set-upstream) means that you can simply do git push and not specify which remote.

![ps](/assets/2018-10-16/30.png)  
Sometimes you'll get a badly cached password - this is where you delete it.

![ps](/assets/2018-10-16/a10.png){:width="800px"}   
If all has gone well the function will deploy. So now, grab the URL  
![ps](/assets/2018-10-16/a11.png){:width="500px"}   
Testing the function - it worked!

## Blob Storage 
Now we can deploy Azure Functions we need to setup some storage to host some .mp4 video files:  

![ps](/assets/2018-10-16/a13.png){:width="700px"}  
Add a Storage account to the resource group   

![ps](/assets/2018-10-16/a14.png)    
Handy overview of types of [storage accounts](https://docs.microsoft.com/en-gb/azure/storage/common/storage-account-overview). Essentially v2:  

> General-purpose v2 accounts deliver the lowest per-gigabyte capacity prices for Azure Storage  

Handy storage pricing calculator [here](https://azure.microsoft.com/en-gb/pricing/details/storage/blobs/) showing what hot/cool costs, and the different types of resilience:

Basically in order or cost and uptime using Storage V2 (general purpose v2)
- Locally-redundant storage (LRS)
- Geo-redundant storage (GRS)
- Read-access geo-redundant storage (RA-GRS) 

create video container and put anonymous read access on it.

![ps](/assets/2018-10-16/a23.png)    

![ps](/assets/2018-10-16/a24.png)    

Use [Azure Storage Explorer](https://azure.microsoft.com/en-gb/features/storage-explorer/) to put up some test videos.  

[https://davemtestvideostorage.blob.core.windows.net/videos/a.mp4](https://davemtestvideostorage.blob.core.windows.net/videos/a.mp4) should now work. Seeking to a specific time in the video will not work [more detail](https://blog.thoughtstuff.co.uk/2014/01/streaming-mp4-video-files-in-azure-storage-containers-blob-storage/). Use [This Console App](https://github.com/djhmateer/AzureBlobVideoSeekFix) to fix.   

Turn on logging of downloads:

![ps](/assets/2018-10-16/a17.png)    

This will create a $logs folder **only visible in Azure Storage Explorer**.  

![ps](/assets/2018-10-16/a18.png)    

~~This $logs folder holds the logs for each download from blob storage, so we just have to watch this folder with a Blob trigger (as the $logs files are blobs), then parse the file and store the data in a SQL Azure db.~~  

The above strategy misses some downloads in high volume situations.  
## Copy Logs

So we will use a similar strategy to [Chris Johnson](http://www.chrisjohnson.io/2016/04/24/parsing-azure-blob-storage-logs-using-azure-functions/) and his [source](https://github.com/LoungeFlyZ/AzureBlobLogProcessing):

- Create a timer trigger function to copy $logs files to a new container called \showlogs  
- Put a blob watcher on the \showlogs folder  

It is useful to run the function locally to test it is working.

[Final source Github repo here](https://github.com/djhmateer/AzureFunctionBlobDownloadCount)

```cs
public static class CopyLogs
{
     // RunOnStartup true so debugging easier both locally and live
     [FunctionName("CopyLogs")]
     public static void Run([TimerTrigger("0 */30 * * * *", RunOnStartup = true)] TimerInfo myTimer, ILogger log)
     {
         log.LogInformation($"C# CopyLogs Time trigger function executed at: {DateTime.Now}");

         var container = CloudStorageAccount.Parse(GetEnvironmentVariable("DaveMTestVideoStorageConnectionString")).CreateCloudBlobClient().GetContainerReference("showlogs/");
```
Part of the code showing how to get the connection string. For testing locally you'll need a local.settings.json which isn't uploaded to Azure Functions.  
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "DaveMTestVideoStorageConnectionString": "DefaultEndpointsProtocol=https;AccountName=davemtestvideostorage;AccountKey=SECRETKEYHERE;EndpointSuffix=core.windows.net"
  }
}
```
and on live:

![ps](/assets/2018-10-16/b32.png)    
 
So we should now be able to connect to storage on local and live.  

It seems you are supposed to use App Settings for Storage Account connection strings, but Connection String for a SQL connection string, which we'll see later. [Microsoft Docs](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob#input---configuration).  App Settings do work for both.  

[Azure Functions Database](https://docs.microsoft.com/en-us/azure/azure-functions/functions-scenario-database-table-cleanup) gives more details on why Connection Strings may be better - possibly better integration with VS.

## Setup DB and File Parsing
To hold the results of the file parsing I created a simple 5DTU SQL Azure database - the lowest powered db available.
![ps](/assets/2018-10-16/a20.png)    
connect to the db from SSMS  

```sql
CREATE TABLE [dbo].[VideoDownloadLog](
	[VideoDownloadLogID] [int] IDENTITY(1,1) NOT NULL,
	[TransactionDateTime] [datetime] NOT NULL,
	[OperationType] [nvarchar](255) NULL,
	[ObjectKey] [nvarchar](255) NULL,
	[UserAgent] [nvarchar](255) NULL,
	[Referrer] [nvarchar](1024) NULL,
	[FileName] [nvarchar](255) NULL,
	[DeviceType] [nvarchar](255) NULL,
	[IPAddress] [nvarchar](255) NULL,
	[RequestID] [nvarchar](255) NULL,
	[RequestStatus] [nvarchar](255) NULL,
 CONSTRAINT [PK_VideoDownloadLog] PRIMARY KEY CLUSTERED 
(
	[VideoDownloadLogID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
```
Put in a table to hold the data.  

Now we have all the concepts to run the entire solutions which can be found [Github Repo Here](https://github.com/djhmateer/AzureFunctionBlobDownloadCount)  

## Exceptions
Exceptions are caught and bubbled up to the Azure Portal UI

Retry 5 times if exception [Guidance on Exceptions here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-error-pages)

## Report from the database
![ps](/assets/2018-10-16/b33.png)    

Now it is easy to create a report that the client can see every month to see how many downloads they have had.

## Summary
- Azure Blob Storage to hold videos that can be streamed
- Setup logging on Blob Storage
- Copy logs every 5 minutes using an **Azure Function**
- Parse the logs into a database using an **Azure Function**


