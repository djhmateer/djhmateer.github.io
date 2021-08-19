---
layout: post
# title: Upload large files with ASP NET 5 and Kestrel 
description: 
menu: review
categories: log 
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->

I like to keep applications as simple as they can be. Here is a good example of db access which has a logical flaw, and exploring into how to solve it.

Inserting log files into a database is somewhat of an anti-pattern. But sometimes it is very useful, and I'm using it for some critical business logic:

> When was the last time something was logged to db

Essentially so I can shutdown a VM after is has been dormant for x minutes.


## Async from an Event

System.Data.SqlClient.SqlException (0x80131904): Resource ID : 1. The 
request limit for the database is 30 and has been reached. See
 line 269
 when I did a big run :-)
 in fact just extract files for Wedding error'd out too
   try upping power to 10dtu for fun

After incresing the DTU of the DB from 5 to 10 DTU I got a different error

> System.Data.SqlClient.SqlException (0x80131904): Resource ID : 1. The request limit for the database is 60 and has been reached. See 'http://go.microsoft.com/fwlink/?LinkId=267637' for assistance.

```cs
public static async Task InsertLog(string connectionString, int jobId, string text)
{
    using var conn = GetOpenConnection(connectionString);

    await conn.ExecuteAsync(@"
        insert into Log(JobId, [Text])
        values(@JobId, @Text)
        ", new { jobId, text });
}

shellStream.DataReceived += async (o, e) =>
{
    var responseFromVm = Encoding.UTF8.GetString(e.Data).Trim();
    if (responseFromVm != "")
    {
        Log.Information(responseFromVm);

        await Db.InsertLog(connectionString, jobId, responseFromVm);
    }
};
```

As the underlying event isn't async, adding async here adds overhead, and causes errors.

[https://stackoverflow.com/questions/27761852/how-do-i-await-events-in-c](https://stackoverflow.com/questions/27761852/how-do-i-await-events-in-c) how it could be implemented

Switching back to non async fixes these errors


## Non Async 

```cs
public static void InsertLogNotAsync(string connectionString, int jobId, string text)
{
    using var conn = GetOpenConnection(connectionString);

    try
    {
        conn.Execute(@"
        insert into Log(JobId, [Text])
        values(@JobId, @Text)
        ", new { jobId, text });
    }
    catch (Exception ex)
    {
        // Interestingly I'm not hitting this catch
        Log.Warning(ex, "Exception in InsertLogNotAsync");
        // swallow
    }
}

using var shellStream = client.CreateShellStream("Tail", 0, 0, 0, 0, 1024);
shellStream.DataReceived += (o, e) =>
{
    var responseFromVm = Encoding.UTF8.GetString(e.Data).Trim();
    if (responseFromVm != "")
    {
        Log.Information(responseFromVm);

        Db.InsertLogNotAsync(connectionString, jobId, responseFromVm);
    }
};

// blah
shellStream.WriteLine($"unzip {fileName} -d job");
// wait until this unzip command is finished
// will produce a lot of DataReceived events above
shellStream.Expect(promptFSC);

shellStream.WriteLine("./faceservice_main.py -i job/ -j 123");
// wait until this command is finished
// will produce a lot of DataReceived events above
shellStream.Expect(promptFSC);
```

## Todo - make a console app with events to blast this code 


Also to retry Azure Db 

## Strategies 

How about
- Researching event marshalling back to main?.. how to do 50 at a time or every 5 seconds?

- A simple table with a datetime that is continually being updated (and keep logs in text files where they belong)

- Creating an in-memory concurrent queue that I could gradually then insert into the db in batches, and a minimum batchperiod. like [https://github.com/serilog/serilog-sinks-mssqlserver](https://github.com/serilog/serilog-sinks-mssqlserver)

Update a concurrentlist from an event...
 how to batch update a db from this???



## Azure Db Retries


In another project I found that once every 500,000 inserts I'd get some strange SQL error from Azure, which needed a retry and then it would work.

**Azure hole in the middle strategy?