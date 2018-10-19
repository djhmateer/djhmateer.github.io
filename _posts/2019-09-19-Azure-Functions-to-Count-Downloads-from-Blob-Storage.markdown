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


## 1. Create a Test Azure Function Locally
What are [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/)?
> Azure Functions is a serverless compute service that enables you to run code on-demand without having to explicitly provision or manage infrastructure.


Lets create an Azure Function locally in Visual Studio, New Project.
![ps](/assets/2018-10-16/1.png)

then 

![ps](/assets/2018-10-16/22.png){:width="700px"}  
[Functions v2 (.NET Standard)](https://docs.microsoft.com/en-us/azure/azure-functions/functions-versions) is where new feature work and improvements are being made so that is what we are using.


![ps](/assets/2018-10-16/32.png)

And if we go to http://localhost:7071/api/Function1?name=dave we'll get back

![ps](/assets/2018-10-16/42.png)  

We have created an Azure Function locally which responds to an HTTP Request 

## 2. Deploy to Live
Lets deploy this to Azure  
![ps](/assets/2018-10-16/5.png){:width="400px"}  
Create a new function from the Azure portal  
![ps](/assets/2018-10-16/6.png){:width="500px"}   
Name the function, RG and Storage  
![ps](/assets/2018-10-16/7.png){:width="800px"}    

These assets are created  
![ps](/assets/2018-10-16/8.png){:width="700px"}  

Inside the newly created function, lets setup how to deploy to it.  

Check Deployment credentials are setup, then Deployment options to setup local git deployment.  

Using a local git deployment is very useful, but you'll need to use the same username across everything in you Azure subscription. For example I've got davemtest as the username here.

```bat
git remote add azure https://davemtest@davemtest.scm.azurewebsites.net:443/davemtest.git  
git push -u azure master
```
Setting up deployment from the command line.  

![ps](/assets/2018-10-16/a10.png){:width="800px"}   
Function has been deployed.  
![ps](/assets/2018-10-16/a11.png){:width="500px"}  
Testing the function - it worked!

## 3. Blog Storage 
![ps](/assets/2018-10-16/a13.png){:width="700px"}  
Lets add a Storage account to the test resource group   

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

[https://davemtestvideostorage.blob.core.windows.net/videos/a.mp4](https://davemtestvideostorage.blob.core.windows.net/video/a.mp4) should now work. Seeking to a specific time in the video will not work [detail](https://blog.thoughtstuff.co.uk/2014/01/streaming-mp4-video-files-in-azure-storage-containers-blob-storage/). Use [This Console App](https://github.com/djhmateer/AzureBlobVideoSeekFix) to fix.   

Turn on logging of downloads:

![ps](/assets/2018-10-16/a17.png)    

This will create a $logs folder only visible in Azure Storage Explorer.  

![ps](/assets/2018-10-16/a18.png)    

~~This $logs folder holds the logs for each download from blob storage, so we just have to watch this folder with a Blob trigger (as the $logs files are blobs), then parse the file and store the data in a SQL Azure db.~~  

The above looks like it works, but it does miss some downloads in high download situations.  

So we will:

- Create a timer trigger function to copy $logs files to a new container called \showlogs  
- Put a blob watcher on the \showlogs folder  


It is useful to run the function locally to test it is working

```cs
public static class ProcessLogs
{
    [FunctionName("ProcessLogs")]
    public static void Run([BlobTrigger("showlogs/{name}", Connection = "davemtestvideostorage")]Stream myBlob, string name, ILogger log)
    {
        log.LogInformation($"Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");
    }
}
```

and local.settings.json
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "davemtestvideostorage": "DefaultEndpointsProtocol=https;AccountName=davemtestvideostorage;AccountKey=SECRETKEYHERE;EndpointSuffix=core.windows.net"
  }
}

```

This can prove that when a file is put into the correct location in Blob storage the function will trigger.

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

Now we have all the concepts to run the entire solutions which can be found:  [here on Github]() 

## Test Azure Function locally
With a connection to the remote Blobs, and connection to the remote SQL Server. I found there could be quite a delay in between doing a download at the $logs file being written - up to 8 minutes.

![ps](/assets/2018-10-16/a21.png)    
Data successfully getting to the database. There is some logic in the code to deal with the vagaries of the $logs

**how to deal with db connection strings

## Publish Azure Function to Live
As before
```
git push azure master
```

Put in the storage connection string into the Azure portal

![ps](/assets/2018-10-16/a22.png)    
```
"davemtestvideostorage": "DefaultEndpointsProtocol=https;AccountName=davemtestvideostorage;AccountKey=SECRET CHANGE ME;EndpointSuffix=core.windows.net"
```

So this should run, but in my experience it doesn't, so the trick has been to put in a 5 minute timer function as well.

```cs
public static class TimerBump
{
    [FunctionName("TimerBump")]
    public static void Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
    {
        log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
    }
}
```

## Azure Functions 
Exceptions are caught and bubbled up to the Azure Portal UI:

RunOnStartup handy for debugging

Retry 5 times if excpetion [Guidance on Exceptions here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-error-pages)


Be careful for UTC time offsets.

## Report from the database
Now it is easy to create a report that the client can see every month to see how