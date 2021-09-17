---
layout: post
# title: 
description: 
menu: review
categories: azure
published: false 
comments: false     
sitemap: false
image: /assets/2019-11-13/1.jpg
---

## Introduction

<!-- [![alt text](/assets/2021-08-04/local.jpg "local")](/assets/2021-08-04/local.jpg) -->
<!-- [![alt text](/assets/2021-08-29/error.jpg "error"){:width="500px"}](/assets/2021-08-29/error.jpg) -->

The open source [OSR4RightsTools]() project needs user's results to be persisted when a new deployment of the VM happens.

Data is persisted to SQLAzure

Files are served using a url like

- /downloads/90/results.html 
- /downloads/90/results90.zip

- /downloads/89/results.html
- /downloads/89/results89.cs

And authentication/authorisation of these static files happens via downloads.cshtml

## Blob Containers

This is classically how I've stored files.

[https://functionsdm2storage.blob.core.windows.net/outputfiles/foo.zip](https://functionsdm2storage.blob.core.windows.net/outputfiles/foo.zip)

## Azure Files

[https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-linux?tabs=smb311](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-linux?tabs=smb311)

This is an SMB file share

- will be nice as I can control all file security from an OS level