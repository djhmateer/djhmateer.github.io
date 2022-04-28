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

Currently the cloud storage used is Digital Ocean. I'm putting in a feature flag to use Google Drive instead.

Secrets are held in the `.env` file

They use Google Speadsheets already in the application. [See 1. Getting API accerss to the sheet](/2022/03/16/python-bellingcat-auto-archiver)

Essentially there is a secret file `service_account.json` which the gspread library uses.

```py
import gspread

gc = gspread.service_account()

# put name of your spreadsheet in here
sh = gc.open("Example spreadsheet")

print(sh.sheet1.get('A1'))

```

## Google Console

[https://console.cloud.google.com/](https://console.cloud.google.com/)

## Google Drive using Service Account

[https://developers.google.com/drive/api/quickstart/python](https://developers.google.com/drive/api/quickstart/python)

I do have google drive API enabled already (for google spreadsheets)

[https://blog.benjames.io/2020/09/13/authorise-your-python-google-drive-api-the-easy-way/](https://blog.benjames.io/2020/09/13/authorise-your-python-google-drive-api-the-easy-way/)

## Reading files from Google Drive

```py
from google.oauth2 import service_account

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def main():
    SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']

    creds = service_account.Credentials.from_service_account_file('service_account.json',
            scopes=SCOPES)
        
    try:
        service = build('drive', 'v3', credentials=creds)

        # Call the Drive v3 API
        results = service.files().list(
            pageSize=10, fields="nextPageToken, files(id, name)").execute()
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

Code modified from [https://github.com/googleworkspace/python-samples/blob/master/drive/quickstart/quickstart.py](https://github.com/googleworkspace/python-samples/blob/master/drive/quickstart/quickstart.py) 


Using [Google Drive Desktop](https://www.google.com/drive/download/) you can view all your files as a linked drive `G:` in Windows Explorer.

Strange that the v3 API is only listing 5 files.

## Uploading a file

[https://github.com/iterative/PyDrive2](https://github.com/iterative/PyDrive2) - could use this.


[https://developers.google.com/drive/api/guides/search-files](https://developers.google.com/drive/api/guides/search-files) API docs


