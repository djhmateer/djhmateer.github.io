---
layout: post
title: Google Drive with Python 
# description: A small utility which opens visual studio from the command shell looking for a `.sln` file in the current directory. Updating to .NET6
menu: review
categories: Google
published: true 
comments: false     
# sitemap: true
image: /assets/2022-04-13/sc.jpg
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->


I'm working on [auto-archiver](https://github.com/bellingcat/auto-archiver) which is written in Python.  [Getting API access to a Google Sheet](/2022/03/16/python-bellingcat-auto-archiver#1-getting-api-access-to-the-google-sheet) describes how we can get a `Service Account` setup to read and write to the sheet. 

## Google Drive using Service Account

[https://blog.benjames.io/2020/09/13/authorise-your-python-google-drive-api-the-easy-way/](https://blog.benjames.io/2020/09/13/authorise-your-python-google-drive-api-the-easy-way/)

From the link above so we have a `service_account.json`.

[https://console.cloud.google.com/](https://console.cloud.google.com/) Google Developers Console, API's, Credentials

## Python Client Library

[https://developers.google.com/drive/api/quickstart/python](https://developers.google.com/drive/api/quickstart/python) - from here you can explore the API.

```py
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/drive']

creds = service_account.Credentials.from_service_account_file('service_account.json', scopes=SCOPES)
        
service = build('drive', 'v3', credentials=creds)

# 1. Call the Drive v3 API to get files
results = service.files().list().execute()
items = results.get('files', [])

for item in items:
    print(u'{0} ({1})'.format(item['name'], item['id']))
```

[https://github.com/djhmateer/auto-archiver/blob/main/dm_drive2.py](https://github.com/djhmateer/auto-archiver/blob/main/dm_drive2.py) lots more code examples for uploading, searching for files, searching for folders, creating folders

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

## Ownership of Files

I would like the target shared folder's owner to become the owner of the files I'm uploading. This is tricky. So lets see what using an OAuth client ID can do


## OAuth

[https://developers.google.com/drive/api/quickstart/python](https://developers.google.com/drive/api/quickstart/python) The quickstart for the API guides you down the OAuth route (and not the service account)

- I have a project with the Drive API enabled under a specific user (davemateer@gmail.com)
- Authorization credentials for a Desktop application [Create Access Credentials](https://developers.google.com/workspace/guides/create-credentials)

### Consent Screen

Need to do this before creating the OAuthID

- Internal. Only for Google Workspace customers. Only available to users withing your org. Don't need to submit app for verification
- External. App will start in testing mode, and only available to users you add to the list of test users.

Select External, add a Title (Auto-Archiver) and email address of contact and dev (davemateer@gmail.com)

Scopes - none

Test users - I've added a separate test account with no files in it's drive yet (greenbranflakes@gmail.com)

### Create OAuth ID

Name: Auto-Archiver-Alpha (name wont be shown to end users)

Can download a `client_secret.json` or `credentials.json` (this is what code samples call it)

- Client ID eg `701301107170-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com`
- Client Secret eg `yyyyyyy-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-zzzzzzzz`

This is restricted to the test user added above.


### Code

[https://developers.google.com/drive/api/quickstart/python](https://developers.google.com/drive/api/quickstart/python) from code in here

`token.json` stores te user's access `token` and `refresh_token` and also includes the `client_id` and `client_secret`

There is an expiry which is 1 hour, but this is not the refresh_token expiry



First time through logging in as greenbranflakes@gmail.com I got (I'm logged in with multiple gmail accounts so had to choose)

[![alt text](/assets/2022-04-28/warn.jpg "desktop")](/assets/2022-04-28/warn.jpg)

then

[![alt text](/assets/2022-04-28/access.jpg "desktop")](/assets/2022-04-28/access.jpg)

Notice the scope we had passed in via code:

```py
from __future__ import print_function

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']


def main():
    """Shows basic usage of the Drive v3 API.
    Prints the names and ids of the first 10 files the user has access to.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

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

Then success, the app displayed the files in greenbranflakes@gmail.com drive.

Running again and we're not prompted to login again as the `token.json` is saved on the filesystem. Interestingly I got 1 hour on the refresh token. What happens after this hour?

## Upload files to own Drive

As user greenbranflakes@gmail.com

```py
# Change scope to give full access to the Drive
SCOPES = ['https://www.googleapis.com/auth/drive']

# service account
# creds = Credentials.from_service_account_file('service_account.json', scopes=SCOPES)

# oauth - assume the refresh token is there
creds = Credentials.from_authorized_user_file('token.json', SCOPES)

# ... snip .. see above

# 2. Upload a file to a folder
gbf_folder = '1WQf421zvXKJpWEeEY1YV9seEwgMCdxlZ'
file_metadata = {
    'name': 'photo.jpg',
    'parents': [gbf_folder]
}
media = MediaFileUpload('files/photo.jpg',
    mimetype='image/jpeg',
    resumable=True)
file = service.files().create(body=file_metadata,
    media_body=media,
    fields='id').execute()
```

[https://github.com/djhmateer/auto-archiver/blob/main/dm_drive3_upload.py](https://github.com/djhmateer/auto-archiver/blob/main/dm_drive3_upload.py) has good samples on how to do different actions

## Refresh Tokens

I've got a cron job running every minute on a server which may need to upload files using the above method.

Once logged in, and the token copied to the server, how can I deal with the `refresh_token` which I believe expires after 1 week.

[https://stackoverflow.com/questions/19766912/how-do-i-authorise-an-app-web-or-installed-without-user-intervention/55164583#55164583](https://stackoverflow.com/questions/19766912/how-do-i-authorise-an-app-web-or-installed-without-user-intervention/55164583#55164583) - good talk in the comments about refresh tokens. The strategies here do what the Python API does and generates a refresh_token so I believe we don't need to use this?

Looks like can only get a 1 week `refresh_token` this way for 'testing' apps before having to go through the consent process again.

[https://stackoverflow.com/questions/66058279/token-has-been-expired-or-revoked-google-oauth2-refresh-token-gets-expired-i?noredirect=1&lq=1](https://stackoverflow.com/questions/66058279/token-has-been-expired-or-revoked-google-oauth2-refresh-token-gets-expired-i?noredirect=1&lq=1)

## 1 Week Refresh Token

So the app is working but I believe the refresh_token will stop working in 7 days. To get around this:

- Use a paid Google Workspace account (rather than standard gmail) and make OAuth consent screen, User Type: `Internal`
- Publishing Status: Go from Testing to Published







## Appendix

## API Key

[![alt text](/assets/2022-04-28/apikey.jpg "desktop")](/assets/2022-04-28/apikey.jpg)

[https://developers.google.com/drive/api/v3/reference/about/get](https://developers.google.com/drive/api/v3/reference/about/get) About: get

I created an API key yet couldn't get it to authorize:

```bash
curl \
  'https://www.googleapis.com/drive/v3/about?key=[YOUR_API_KEY]' \
  --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
  --header 'Accept: application/json' \
  --compressed
```

Mainly as I couldn't get an access token (am not using OAuth2)

## Service Account




## Code 

[https://developers.google.com/drive/api/quickstart/python](https://developers.google.com/drive/api/quickstart/python) Google Drive for Developers Drive API - Python.

[https://developers.google.com/drive/api/guides/manage-uploads](https://developers.google.com/drive/api/guides/manage-uploads)



Prints file names and ID's of everything that is shared with this service account. It produces a flat list so files in subdirectories will be listed.

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