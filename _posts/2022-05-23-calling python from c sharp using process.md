---
layout: post
# title: Updating Open Visual Studio utility to .NET 6 
# description: A small utility which opens visual studio from the command shell looking for a `.sln` file in the current directory. Updating to .NET6
menu: review
categories: api
published: true 
comments: false     
# sitemap: true
image: /assets/2022-04-13/sc.jpg
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->

From `api-security-test` repo this was a way to

- receive a dto
- write it to a file
- call a python script
- which runs sudo as another user
- return a dto

I didn't end up using this as the python app took 10 seconds or more to load up the ML model, so it was better to keep the python app running and polling for file changes.

```cs
app.MapPost("/hs", Handler3);
async Task<IResult> Handler3(HSDto hsdtoIn)
{
    // csv helper to write inbound hsdto to a csv
    var recordsToWrite = new List<HSDto>();
    recordsToWrite.Add(hsdtoIn);

    using (var writer = new StreamWriter("/home/dave/hatespeech/temp/input.csv"))
    using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
    {
        csv.WriteRecords(recordsToWrite);
    }

    // call the python script
    // python3 PreBERT.py -m xlm-roberta-base -d all_train -s TE1.csv -fn hate_speech_results
    var start = new ProcessStartInfo();
    start.FileName = "bash";
    start.WorkingDirectory = "/home/dave/hatespeech";

    var command = "python3 PreBERT.py -m xlm-roberta-base -d all_train -s temp/input.csv -fn temp/output";

    // process running as www-data, but we want to run Python script as dave
    start.Arguments = $"-c \"sudo -u dave {command}\"";

    start.UseShellExecute = false;
    start.RedirectStandardOutput = true;
    start.RedirectStandardError = true;

    logger.Information(" Starting Python");
    using (Process process = Process.Start(start))
    {
        //using (StreamReader reader = process.StandardOutput)
        using (StreamReader reader = process.StandardError)
        {
            string result = reader.ReadToEnd();
            logger.Information($" inside: {result}");
        }
    }
    logger.Information(" Ending Python");

    var hsdto = new HSDto { };

    // read temp/output.csv
    using (var reader = new StreamReader("/home/dave/hatespeech/temp/output.csv"))
    using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
    {
        var records = csv.GetRecords<PythonDTO>();
        foreach (var record in records)
        {
            logger.Information($"record Text: {record.Text} ");
            logger.Information($"record Predi: {record.Prediction} ");
            logger.Information($"record HS: {record.HateScore} ");

            hsdto.Text = record.Text;
            hsdto.Score = record.HateScore;
            hsdto.Prediction = record.Prediction;
        }
    }

    return Results.Json(hsdto);
}
```
