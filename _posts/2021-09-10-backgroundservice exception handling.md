---
layout: post
# title: 
description: 
menu: review
categories: exception
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-08-29/error.jpg "error"){:width="500px"}](/assets/2021-08-29/error.jpg) -->

[Background-tasks](/2021/05/27/a21-background-tasks) my initial blog post.

I had a problem in my backgroundservice, where inside a catch (inside the Foo method below) I did a db call which correctly threw an exception. 

What happened next surprised me.

## Silently Failing BackgroundService

The entire backgroundservice just 'stalled'. No logs, nor did the app continue reading from the channel.

[Full source](https://github.com/djhmateer/BackgroundServiceTest/tree/master/BackgroundServiceTest/BackgroundServices) which includes the channel.

```cs
public class Test2Service : BackgroundService
{
    private readonly Test2Channel _test2Channel;
    public Test2Service(Test2Channel test2Channel) => _test2Channel = test2Channel;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Log.Information("Started Test2Service");

        await foreach (var filePathAndName in _test2Channel.ReadAllAsync())
        {
            Log.Information($"got a message from the channel {filePathAndName}");
            try
            {
                Log.Information("inside try");

                // if an exception is thrown, then next in the channel will not be read
                throw new ApplicationException("TEST exception.. ");
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "HS - Job failed - in overall catch");

                // very bad as the background service will 'stall'
                // the host will still be running
                // but we are outside of the await foreach now
                // so reader is stopped
                throw new ApplicationException("maybe a db call fails");
                Log.Information("unreachable");
            }
            finally
            {
                Log.Information("inside finally");
            }

            Log.Information("unreachable");
        }
    }
}
```

It turns out this is being tweaked in .NET6 [https://docs.microsoft.com/en-us/dotnet/core/compatibility/core-libraries/6.0/hosting-exception-handling](hosting-exception-handling) so that .NET6 logs the error and stops the host.


## Handling Exceptions

Here is how I handle exceptions in my backgroundservice now

```cs
public class Test2Service : BackgroundService
{
    private readonly Test2Channel _test2Channel;
    public Test2Service(Test2Channel test2Channel) => _test2Channel = test2Channel;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Global exception handler for entire Test2Service
        try
        {
            await Task.Delay(2000, stoppingToken);
            Log.Information("Started Test2Service");

            await foreach (var filePathAndName in _test2Channel.ReadAllAsync(stoppingToken))
            {
                // an outer try catch to get any exceptions thrown in the catch or finally of the inner
                // and to make sure the service keeps reading from the channel
                try
                {
                    await Foo(stoppingToken, filePathAndName);
                }
                catch (Exception ex)
                {
                    Log.Error(ex,
                        "Outer service exception handler - something threw in the inner catch or finally. We want the await foreach channel reader to keep going");
                }
            }
        }
        catch (Exception ex)
        {
            Log.Fatal(ex, "Test2Service has stopped fatally!");
            // in .NET5 without this, it would not stop the host
            // https://docs.microsoft.com/en-us/dotnet/core/compatibility/core-libraries/6.0/hosting-exception-handling
            // .NET6 logs it and stops the host now (which is better than silently failing!)
        }
    }

    private static async Task Foo(CancellationToken stoppingToken, string? filePathAndName)
    {
        Log.Information($"got a message from the channel {filePathAndName}");
        try
        {
            await Task.Delay(4000, stoppingToken);

            Log.Information("inside try");

            throw new ApplicationException("TEST exception.. ");
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Test2Service - in catch");

            // I want to update my job status in the Db to be Exception
            // and clean up, as we're in some unknown state now
            // but if something throws here I need an outer try catch
            throw new ApplicationException("A bad sql method here throwing");
            Log.Warning(ex, "unreachable");
        }
        finally
        {
            Log.Information("inside finally - will run even if an exception is thrown in the catch");
            // this hides the exception thrown above in the global try catch
            throw new ApplicationException("throwing from finally");
            Log.Information("unreachable");
        }

        Log.Information("End of foreach - should we awaiting the next one in the channel now");
    }
}
```

## Production 

[OSR4Rights BackgroundServices](https://github.com/osr4rightstools/osr4rights-tools/tree/main/src/OSR4Rights.Web/BackgroundServices) an open source project I'm working on which uses these concepts.

There is much more detailed code including

- nameof(Method) to make easier to control messages
- try catch inside catch

## Nested Try Catch

```cs
try
{
    ZipFile.ExtractToDirectory(uploadedFileAndPath, zipExtractPath);
}
catch (Exception ex)
{
    Log.Information(ex, $"FS - Trying to delete the uploadedfileandpath {uploadedFileAndPath}");

    try
    {
        System.IO.File.Delete(uploadedFileAndPath);

        Log.Information($"FS - Successfully deleted uploadedfileandpath {uploadedFileAndPath}");
    }
    catch (Exception e)
    {
        Log.Warning(e, $"FS  - Failed to delete file");
        // swallow exception and continue
    }

    return Page();
}
```

## Throwing 

```cs
using var sftp = new SftpClient(host, username, password);
try
{
    sftp.Connect();

    // download html file from remote
    {
        string pathRemoteFile = "/home/dave/hatespeech/hate_speech_result.html";

        // Path where the file should be saved once downloaded (locally)
        //var path = Path.Combine(Environment.CurrentDirectory, "wwwroot/downloads");
        var path = Path.Combine(Environment.CurrentDirectory, $"wwwroot/downloads/{jobId}");

        // create a new directory for the job results
        Directory.CreateDirectory(path);

        var htmlFileName = "result.html";
        var pathLocalFile = Path.Combine(path, htmlFileName);
        Log.Information($"Local path is {pathLocalFile}");

        using (Stream fileStream = File.OpenWrite(pathLocalFile))
            sftp.DownloadFile(pathRemoteFile, fileStream);

        sftp.DeleteFile(pathRemoteFile);

        Log.Information($"Html downloaded to {pathLocalFile}");
    }

    // download csv file from remote 
    {
        string pathRemoteFile = "/home/dave/hatespeech/hate_speech_result.csv";

        // Path where the file should be saved once downloaded (locally)
        var path = Path.Combine(Environment.CurrentDirectory, $"wwwroot/downloads/{jobId}");

        // create a new directory for the job results
        //Directory.CreateDirectory(path);

        var htmlFileName = "result.csv";
        var pathLocalFile = Path.Combine(path, htmlFileName);
        Log.Information($"Local path is {pathLocalFile}");

        using (Stream fileStream = File.OpenWrite(pathLocalFile))
            sftp.DownloadFile(pathRemoteFile, fileStream);

        Log.Information($"Csv downloaded to {pathLocalFile}");

        // instead of SSH'ing to box to remove files as we did in FaceSearchFileProcessingService
        // we can use sftp as only have a single file to delete
        sftp.DeleteFile(pathRemoteFile);

        Log.Information($"HS Remote file deleted {pathRemoteFile}");
    }
}
catch (Exception e)
{
    Log.Error(e, "HS Exception in SFTP download / delete");

    // good
    throw;

    // bad
    // re throwing caught exception changes stack information
    // throw e

    // bad 
    // lose stack information
    // throw new Exception("asdf");

}
finally
{
    // finally useful for disposing of resources
    // https://stackoverflow.com/a/547806/26086
    sftp.Disconnect();
}

```

[https://stackoverflow.com/a/547806/26086](https://stackoverflow.com/a/547806/26086) showing catch and finally. Careful not to throw unexpectedly inside either


## Why

Examples as to why my background service can legitimately fail:

- Underlying Azure VM has been deleted (it happens). In this case the user will get an error, and can re-submit the job
- Dev/Prod use the same infrastructure so can get out of sync. This handles it gracefully


## More Info

[https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/hosted-services?view=aspnetcore-5.0&tabs=visual-studio](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/hosted-services?view=aspnetcore-5.0&tabs=visual-studio) docs

[SO - Why use finally](https://stackoverflow.com/a/547806/26086) 
