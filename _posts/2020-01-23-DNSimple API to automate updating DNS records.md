---
layout: post
title: DNSimple API to Automate updating DNS record 
description: 
menu: review
categories: DNSimple
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/3.jpg
---

As part of my [build script](/2020/01/09/Publishing-ASP-NET-Core-3-App-to-Ubuntu) I spin up a new virtual machine in Azure which I give a name such as:

- https://davetest956.westeurope.cloudapp.azure.com

Which I then want to automatically patch through to a root domain

- https://hmsoftware.uk

I use [DNSimple](https://dnsimple.com/) to register and host my domain hmsoftware.uk, so lets use their API to automate the update

![alt text](/assets/2020-01-09/30.jpg "Manually entered values into DNSimple UI"){:width="400px"}  

## Difference between A, CNAME, ALIAS and URL records

[This article gives detail](https://support.dnsimple.com/articles/differences-between-a-cname-alias-url/?utm_source=dnsimple.com&utm_medium=referral&utm_campaign=formhelp) 

- ALIAS as we are using the root domain (apex zone) - https://hmsoftware.uk
- CNAME is using a subdomain

## Automating the update of DNS

[DNSimple API v2 Documentation](https://developer.dnsimple.com/v2/) suggest using their sandbox first:

`api.sandbox.dnsimple.com` is the sandbox endpoint domain

Can authenticate via HTTP Basic Authenication adn OAUTH2 token

Account token - recommended. Only to the resource connected to the account
User Token

## Sandbox

https://sandbox.dnsimple.com/

It seemed that I should be able to login to the sandbox with existing DNSimple credentials but that didn't work.

