---
layout: post
# title: Updating Open Visual Studio utility to .NET 6 
# description: A small utility which opens visual studio from the command shell looking for a `.sln` file in the current directory. Updating to .NET6
menu: review
categories: git
published: true 
comments: false     
# sitemap: true
image: /assets/2022-04-13/sc.jpg
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->


I'm working on [auto-archiver](https://github.com/bellingcat/auto-archiver) which is written in Python.

Currently the cloud storage used is Digital Ocean Spaces. I'm putting in a feature flag to use Google Drive instead.

Secrets are held in the `.env` file

They use Google Speadsheets already in the application which necessitates Google Drive API access . [See 1. Getting API access to the sheet](/2022/03/16/python-bellingcat-auto-archiver)

## Google Drive using Service Account

[https://developers.google.com/drive/api/quickstart/python](https://developers.google.com/drive/api/quickstart/python)

[https://blog.benjames.io/2020/09/13/authorise-your-python-google-drive-api-the-easy-way/](https://blog.benjames.io/2020/09/13/authorise-your-python-google-drive-api-the-easy-way/)


[![alt text](/assets/2022-04-28/share.jpg "desktop")](/assets/2022-04-28/share.jpg)

[Share a folder with the service account](https://stackoverflow.com/questions/45492703/google-drive-api-oauth-and-service-account) eg `autoarchiverservice@auto-archiver-xxxxx.iam.gserviceaccount.com`

This allows me to read and write to the shared folder on the google drive account (in the is case it is my personal google drive) from the service account.

ie I can see a shared folder_id I can then write inside that folder.


## Code 

[https://developers.google.com/drive/api/guides/manage-uploads](https://developers.google.com/drive/api/guides/manage-uploads)

```py
```

[https://github.com/googleworkspace/python-samples/blob/master/drive/quickstart/quickstart.py](https://github.com/googleworkspace/python-samples/blob/master/drive/quickstart/quickstart.py) Samples

## Uploading a file

[https://github.com/iterative/PyDrive2](https://github.com/iterative/PyDrive2) - could use this.


[https://developers.google.com/drive/api/guides/search-files](https://developers.google.com/drive/api/guides/search-files) API docs


[https://github.com/googleworkspace/python-samples/tree/master/drive/driveapp](https://github.com/googleworkspace/python-samples/tree/master/drive/driveapp)



## Appendix - Google Console

[https://console.cloud.google.com/](https://console.cloud.google.com/) - where you allow access

[https://admin.google.com/](https://admin.google.com/ac/accountchooser?continue=https://admin.google.com/) is used for Google Workspace accounts only


## Appendix - Google Drive Desktop

Using [Google Drive Desktop](https://www.google.com/drive/download/) you can view all your files as a linked drive `G:` in Windows Explorer.

.