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

## 15GB Limit on Service Account

This came as a surprise that

> Storage is counted against the person who uploaded the file, not the owner of the folder.

So the shared folder (which has 100GB of space in it's quota) suddenly got errors:

> The user's Drive storage quota has been exceeded

It was the service accounts free 15GB of storage which had been exceeded.

[https://stackoverflow.com/a/68313988/26086](https://stackoverflow.com/a/68313988/26086)


## Code 

[https://developers.google.com/drive/api/guides/manage-uploads](https://developers.google.com/drive/api/guides/manage-uploads)

[https://github.com/djhmateer/auto-archiver/blob/main/dm_drive2.py](https://github.com/djhmateer/auto-archiver/blob/main/dm_drive2.py)



```py
from google.oauth2 import service_account

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def main():
    # SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
    SCOPES = ['https://www.googleapis.com/auth/drive']

    creds = service_account.Credentials.from_service_account_file('service_account.json', scopes=SCOPES)
        
    try:
        service = build('drive', 'v3', credentials=creds)

        # Call the Drive v3 API
        results = service.files().list().execute()
        items = results.get('files', [])

        if not items:
            print('No files found.')
            return

        print('Files:')
        for item in items:
            print(u'{0} ({1})'.format(item['name'], item['id']))
        
    except HttpError as error:
        # TODO(developer) - Handle errors from drive API.
        print(f'An error occurred: {error}')


if __name__ == '__main__':
    main()
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