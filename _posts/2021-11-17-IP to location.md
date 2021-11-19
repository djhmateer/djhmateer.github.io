---
layout: post
# title: Splash Screen
description: 
menu: review
categories: IP
published: true 
comments: false     
sitemap: false
image: /assets/2021-10-07/http2b.png
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->

As part of my dashboarding project I'd like to get an IP address location on the visitors to my websites so that

- Can see when legitimate users are having trouble with the site
- Looks good!
- See obvious hacking attempts

## ip-api.com

This is what I'm using.

Free for non-commercial use with a rate limit of 45 requests per minute

[https://members.ip-api.com/#pricing](https://members.ip-api.com/#pricing)

Lets take 3 IPs and see the difference:

### My home IP - UK

```json
{
    "query": "209.93.9.222",
    "status": "success",
    "continent": "Europe",
    "continentCode": "EU",
    "country": "United Kingdom",
    "countryCode": "GB",
    "region": "ENG",
    "regionName": "England",
    "city": "Lewes",
    "district": "",
    "zip": "BN7",
    "lat": 50.9027,
    "lon": -0.0124,
    "timezone": "Europe/London",
    "offset": 0,
    "currency": "GBP",
    "isp": "British Telecommunications PLC",
    "org": "INFONET Services Corporation",
    "as": "AS6871 Plusnet",
    "asname": "Plusnet",
    "mobile": false,
    "proxy": false,
    "hosting": false
}
```

- City - Lewes
- SubDivision - 
- Country - United Kingdom
- CountryCode - GB
- Continent - Europe
- Lat - 50.9027
- Long - -0.0124

So no accuracy rating.

Better accuracy in terms of provider - they got Plusnet

Hosting - better. Can tell if private or not.


### India

```json
{
    "query": "139.59.78.248",
    "status": "success",
    "continent": "Asia",
    "continentCode": "AS",
    "country": "India",
    "countryCode": "IN",
    "region": "KA",
    "regionName": "Karnataka",
    "city": "Bengaluru",
    "district": "",
    "zip": "560100",
    "lat": 12.9634,
    "lon": 77.5855,
    "timezone": "Asia/Kolkata",
    "offset": 19800,
    "currency": "INR",
    "isp": "DigitalOcean",
    "org": "DigitalOcean, LLC",
    "as": "AS14061 DigitalOcean, LLC",
    "asname": "DIGITALOCEAN-ASN",
    "mobile": false,
    "proxy": true,
    "hosting": true
}
```

City - Bengaluru
Subdivision - Karnataka
Country - India
CountryCode - IN
Continent - Asia
Lat - 12.9634
Long - 77.5855
Traits - DigitalOcean

This is better data as hetting hosting true.

### Russia

```json
{
    "query": "5.188.62.214",
    "status": "success",
    "continent": "Europe",
    "continentCode": "EU",
    "country": "Russia",
    "countryCode": "RU",
    "region": "SPE",
    "regionName": "St.-Petersburg",
    "city": "St Petersburg",
    "district": "",
    "zip": "",
    "lat": 59.8761,
    "lon": 30.4339,
    "timezone": "Europe/Moscow",
    "offset": 10800,
    "currency": "RUB",
    "isp": "PIN DC",
    "org": "",
    "as": "AS34665 Petersburg Internet Network ltd.",
    "asname": "PINDC-AS",
    "mobile": false,
    "proxy": true,
    "hosting": false
}
```

Nice proxy information.

In summary - there seems to be more information here. Except I'm not getting an accuracy rating on the lat/lomg.


## Implementing ip-api.com

[https://ip-api.com/docs/api:json](https://ip-api.com/docs/api:json)

`http://ip-api.com/json/209.93.9.222` gives:

```json
{
  "query": "209.93.9.222",
  "status": "success",
  "country": "United Kingdom",
  "countryCode": "GB",
  "region": "ENG",
  "regionName": "England",
  "city": "Lewes",
  "zip": "BN7",
  "lat": 50.9027,
  "lon": -0.0124,
  "timezone": "Europe/London",
  "isp": "British Telecommunications PLC",
  "org": "INFONET Services Corporation",
  "as": "AS6871 Plusnet"
}
```

However I want some more information, so following the docs [https://ip-api.com/docs/api:json](https://ip-api.com/docs/api:json)

```json
{
  "query": "209.93.9.222",
  "status": "success",
  "continent": "Europe",
  "country": "United Kingdom",
  "countryCode": "GB",
  "regionName": "England",
  "city": "Lewes",
  "zip": "BN7",
  "lat": 50.9027,
  "lon": -0.0124,
  "timezone": "Europe/London",
  "isp": "British Telecommunications PLC",
  "org": "INFONET Services Corporation",
  "as": "AS6871 Plusnet",
  "asname": "Plusnet",
  "mobile": false,
  "proxy": false,
  "hosting": false
}
```

Here is .NET6 script

```cs
// Get ips from db
var ips = await Db.GetDistinctIPsFromWebLog(connectionString);

var client = new HttpClient();

// loop through all IPs to find info
var i = 1;
foreach (var ip in ips)
{
    Log.Information($"{i} - {ip} ");

    // patch in ip into query and use shorthand field selector
    var url = $"http://ip-api.com/json/{ip}?fields=22278139";

    try
    {
        var ipAddressInfo = await client.GetFromJsonAsync<IPAddressInfo>(url);

        if (ipAddressInfo?.status != "success")
        {
            Log.Error(ipAddressInfo?.message);
            throw new ApplicationException("query fail");
        }

        // write info to db
        await Db.InsertIPAddressInfo(connectionString, ipAddressInfo);

        // allowed 45 requests per minute so delay
        await Task.Delay(2000);
        i++;

    }
    catch (Exception ex)
    {
        Log.Error(ex, "Caught Exception");
        throw;
    }
}
Log.Information("finished");

// deserialize to this shape
public class IPAddressInfo
{
    public string message { get; set; }
    public string status { get; set; }
    public string continent { get; set; }
    public string country { get; set; }
    public string countryCode { get; set; }
    public string regionName { get; set; }
    public string city { get; set; }
    public string zip { get; set; }
    public float lat { get; set; }
    public float lon { get; set; }
    public string timezone { get; set; }
    public string isp { get; set; }
    public string org { get; set; }
    // as is a confusing name, so map to asx
    [JsonPropertyName("as")]
    public string asx { get; set; }
    public string asname { get; set; }
    public bool mobile { get; set; }
    public bool proxy { get; set; }
    public bool hosting { get; set; }
    public string query { get; set; }
}
```

- Lat and Long can be wildly inaccurate
- All data can be very inaccurate, so take with a grain a salt 

However this does give me some good information already

- Country
- See see universities logging in (that I expect to)

## Maxmind

[https://www.maxmind.com/en/geoip2-precision-demo](https://www.maxmind.com/en/geoip2-precision-demo) - good live demo

- GeoIP2 Precision City Web Service
- GeoIP2 City
- GeoLite2 City

[https://www.maxmind.com/en/geoip2-precision-services](https://www.maxmind.com/en/geoip2-precision-services)

1000 requests per day on their [GeoLite2 Free Geolocation Data](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data?lang=en) or can download the db.

This is slightly less accurate than their paid product.

[https://dev.maxmind.com/geoip/geolocate-an-ip/databases?lang=en](https://dev.maxmind.com/geoip/geolocate-an-ip/databases?lang=en) impressive they have packages for C#, Java, Node, PHP, Python and Ruby

[https://maxmind.github.io/GeoIP2-dotnet/](https://maxmind.github.io/GeoIP2-dotnet/)

`MaxMind.GeoIP2` has 5.2M downloads and updated 19th Nov 2020. 4.0.1

GeoIP2 Precision offers 3 services: Insights, City, and Country. 
GeoLite2 offers 2 services: City and Country

[![alt text](/assets/2021-11-17/country.jpg "country")](/assets/2021-11-17/country.jpg)

Showing the different names the UK has in different languages.

[![alt text](/assets/2021-11-17/city.jpg "city")](/assets/2021-11-17/city.jpg)

This query looks promising for my home dynamic IP of `209.93.9.222`

- City - Lewes
- MostSpecificSubdivision - East Sussex
- Country.Name - United Kingdom
- Country.IsoCode - GB
- Continent - Europe
- Location.Latitude - 50.9027
- Location.Longitude - -0.0124
- Location.AccuracyRadius - 5 (km?)
- Traits.AutonomousSystemOrganization - British Telecommunications PLC

What I'm not getting is accurate: SystemOrganization. It should be Plusnet.


`139.59.78.248` is a random automated request for a page not there from India:

- City - Bengaluru 
- MostSpecificSubdivision - Karnataka 
- Country.Name - India 
- Country.IsoCode - IN
- Continent - Asia 
- Location.Latitude - 12.9634 
- Location.Longitude - 77.5855 
- Location.AccuracyRadius - 50 (km?)
- Traits.AutonomousSystemOrganization - DIGITALOCEAN-ASN

Not missing any data compared to [https://www.maxmind.com/en/geoip2-precision-demo](https://www.maxmind.com/en/geoip2-precision-demo)

`5.188.62.214` is a automated posting IP from Russia:

- City - 
- MostSpecificSubdivision -
- Country.Name - Russia 
- Country.IsoCode - RU 
- Continent - Europe 
- Location.Latitude - 55.7386 
- Location.Longitude - 37.6068 
- Location.AccuracyRadius - 1000km
- Traits.AutonomousSystemOrganization - Petersburg Internet Network 

Not missing any data compared to [https://www.maxmind.com/en/geoip2-precision-demo](https://www.maxmind.com/en/geoip2-precision-demo)

## Excel

To get data from multiple tables I found the easiest way was to create a brand new connection, advances, then do a sql query

```sql
select *
from weblog w
join IPAddressInfo ip
on w.IPAddress = ip.IPAddress
```

This is an expensive query (joining on a nvarchar) but good enough for POC.

To edit this query:

Power query, advanced editor, then can edit the power query language.

## Map

The map type is not a pivotchart.

I don't have Geographic and Stock Data types in Excel for some reason.

[https://support.microsoft.com/en-us/office/create-a-map-chart-in-excel-f2cfed55-d622-42cd-8ec9-ec8a358b593b?ui=en-us&rs=en-us&ad=us](https://support.microsoft.com/en-us/office/create-a-map-chart-in-excel-f2cfed55-d622-42cd-8ec9-ec8a358b593b?ui=en-us&rs=en-us&ad=us) a good demo




## Todo

I could do anohter query on maxmind to get accuracy of the lat long (and do a compare)

## Alternatives

[https://ipdata.co](https://ipdata.co/) - didn't give plusnet for me. 1500 per day free for non commerical

