---
layout: post
title: DNSimple API to Automate updating DNS record 
description: Using DNSimple's API to update an ALIAS record for newly created VM in a build script
#menu: review
categories: DNSimple
published: true 
comments: true
sitemap: true
image: /assets/2019-01-09/32_small.jpg
---

As part of my [build script for a new product](/2020/01/09/Publishing-ASP-NET-Core-3-App-to-Ubuntu) I frequently spin up a new virtual machine in Azure which gives me a domain name such as:

`https://davetest956.westeurope.cloudapp.azure.com`

I then want to automatically patch this through to a root domain so I can easily test it and to demo it.

`https://hmsoftware.uk`

## DNSimple

I use [DNSimple](https://dnsimple.com/) as a register and to host my domains. They have fantastic customer service - big thanks to Kayla who answered some queries for me on the sandbox, and allowed me to figure this all out in a few hours.

Lets use their API to automate the update of the ALIAS record.

![alt text](/assets/2020-01-09/30.jpg "Manually entered values into DNSimple UI"){:width="600px"}

I'll be using Azure DevOps soon for a CI/CD pipeline, however there is something really nice about having a simple automated pipeline and not worrying about Azure DevOps yet. 

## Sandbox

[DNSimple API v2 Documentation](https://developer.dnsimple.com/v2/) suggest using their sandbox first which is invaluable as you can't make any mistakes in there (nor spend money!)

[You need to create a totally separate login to this site compared with dnsimple.com.](https://sandbox.dnsimple.com/) I recommend using a separate email so that your password manager doesn't get confused.

![alt text](/assets/2020-01-09/31.jpg "Create an Account Token"){:width="600px"}  

The preferred way is to use an Account Token:

```bash
# using an account token (preferred way)
curl -H 'Authorization: Bearer V1zX3u1diJJoS3GXjMErZ3DNxXXXXXXX' https://api.sandbox.dnsimple.com/v2/whoami

# HTTP Basic Authentication (not recommended) 
 curl -u 'djhmateer@hotmail.com:SERCRETPASSWORD' -H 'Content-Type: application/json' https://api.sandbox.dnsimple.com/v2/whoami
```

I found this curl command worked in `WSL` but not on Windows. Yes I do have curl installed on Windows, but there are differences.

## Modify a DNS record in the Sandbox

[The Zone Record API docs](https://developer.dnsimple.com/v2/zones/records/).

Lets create a test domain which won't be actually registered:

![alt text](/assets/2020-01-09/32.jpg "Create a test domain"){:width="600px"}  

Notice here the `AccountID` is 1297 and the new domain is: `asdf12345.net`

[https://sandbox.dnsimple.com/a/1297/domains/asdf12345.net/records](https://sandbox.dnsimple.com/a/1297/domains/asdf12345.net/recordsA)

And now lets try and create a new record using curl:

```bash
curl  -H 'Authorization: Bearer V1zX3u1diJJoS3GXjMErZ3DNXXXXXXXX' \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '
{
  "name": "",
  "type": "MX",
  "content": "mxa.asdf12345.net",
  "ttl": 600,
  "priority": 10}
' \
      https://api.sandbox.dnsimple.com/v2/1297/zones/asdf12345.net/records
```

![alt text](/assets/2020-01-09/33.jpg "Created a new record!"){:width="600px"}  

And it worked!

Now lets edit this record. I used the UI to help me get information that I'll need:

[https://sandbox.dnsimple.com/a/1297/domains/asdf12345.net/records/1592704/edit](https://sandbox.dnsimple.com/a/1297/domains/asdf12345.net/records/1592704/edit) which gives the `recordID` of 1592704

```bash
curl  -H 'Authorization: Bearer V1zX3u1diJJoS3GXjMEXXXXXXXXXXXXX' \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/json' \
      -X PATCH \
      -d '
{
  "name": "",
  "type": "MX",
  "content": "mxa.asdf12345.net",
  "ttl": 60,
  "priority": 10}
' \
      https://api.sandbox.dnsimple.com/v2/1297/zones/asdf12345.net/records/1592704

```

and this updated the TTL to 60s

## Modify a DNS in Prod

Below is the actual code I used to update my ALIAS record

```bash
curl  -H 'Authorization: Bearer XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/json' \
      -X PATCH \
      -d '
{
   "content": "davetest858.westeurope.cloudapp.azure.com",
  "ttl": 60
  }
' \
      https://api.dnsimple.com/v2/63829/zones/hmsoftware.uk/records/17539400
```

so lets patch this into my infrastructure build script using [a nice trick from Stackoverflow for making variables work](https://stackoverflow.com/a/17032673/26086):

```bash
## patch DNS through to the new VM
generate_post_data()
{
  cat <<EOF
{
  "content": "${dnsname}.westeurope.cloudapp.azure.com",
  "ttl": 60
}
EOF
}

curl  -H 'Authorization: Bearer XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/json' \
      -X PATCH \
      -d "$(generate_post_data)" \
      https://api.dnsimple.com/v2/63829/zones/hmsoftware.uk/records/17539400

```

![alt text](/assets/2020-01-09/34.jpg "The DNS update worked"){:width="600px"}  

## Difference between A, CNAME, ALIAS and URL records

[This article gives detail](https://support.dnsimple.com/articles/differences-between-a-cname-alias-url/?utm_source=dnsimple.com&utm_medium=referral&utm_campaign=formhelp) which for me boils down to:

- ALIAS as we are using the root domain (apex zone) - https://hmsoftware.uk
- CNAME is using a subdomain eg blc.hmsoftware.uk

## TTL

[The time-to-live default time is 1 hour on DNSimple with the lowest being 1 minute](https://support.dnsimple.com/articles/what-minimum-time-to-live/).

> If you are preparing to change DNS records you may want to lower the TTL so that change occurs more quickly During normal operation its usually better to keep the TTL at 1 hour or more so request to common name servers only need to be refreshed once an hour. This results in better performance for your clients.

[Some more discussion here on ServerFault](https://serverfault.com/questions/388289/what-are-the-benefits-of-a-high-ttl-for-dns)

I'm going to keep my TTL at 1 minute as DNSimple can handle the tiny load during my development phase. Will make higher once the platform becomes more stable.

## Conclusion

DNSimple provide a really nice API to update a record automatically, and just sits there in my deployment pipeline **providing happiness every time I run the script**!
