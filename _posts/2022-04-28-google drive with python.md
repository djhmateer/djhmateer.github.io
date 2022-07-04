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

Lets look at connecting to Google Drive via

- Service Account (as I do with Google Sheet) - didn't use this at 15GB upload limit and file ownership problems
- OAuth2 - Publish Status Testing non Workspace account (ie external), tokens expire after 1 week
- OAuth2 - Publish Status Testing, Workspace account (ie internal), tokens expire after ?
- OAuth2 - Publish Status Published, non Workspace account (ie external) tokens expire after ?

## 1. Service Account

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


## 2. OAuth with Publish Status Testing and External non Workspace User 

[https://developers.google.com/drive/api/quickstart/python](https://developers.google.com/drive/api/quickstart/python) The quickstart for the API guides you down the OAuth route (and not the service account)

- I have a project with the Drive API enabled under a specific user (davemateer@gmail.com)
- Authorization credentials for a Desktop application [Create Access Credentials](https://developers.google.com/workspace/guides/create-credentials)

### Consent Screen

Need to do this before creating the OAuthID

- Internal. Only for Google Workspace customers. Only available to users within your org. Don't need to submit app for verification
- External. App will start in testing mode, and only available to users you add to the list of test users.

[![alt text](/assets/2022-04-28/external.jpg "desktop"){:width="400px"}](/assets/2022-04-28/external.jpg)

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

`token.json` stores the user's access `token` and `refresh_token` and also includes the `client_id` and `client_secret`

There is an expiry which is 1 hour, but this is not the refresh_token expiry



First time through logging in as greenbranflakes@gmail.com I got (I'm logged in with multiple gmail accounts so had to choose)

[![alt text](/assets/2022-04-28/warn.jpg "desktop"){:width="400px"}](/assets/2022-04-28/warn.jpg)

then

[![alt text](/assets/2022-04-28/access.jpg "desktop"){:width="400px"}](/assets/2022-04-28/access.jpg)

Notice the scope we had passed in via code:

```py
from __future__ import print_function

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from googleapiclient.http import MediaFileUpload

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/drive']


def main():
    """Shows basic usage of the Drive v3 API.
    Prints the names and ids of the first 10 files the user has access to.
    """
    token_file = 'gd-token.json'

    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists(token_file):
        creds = Credentials.from_authorized_user_file(token_file, SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print('Requesting new token')
            creds.refresh(Request())
        else:
            print('First run through so putting up login dialog')
            # credentials.json downloaded from https://console.cloud.google.com/apis/credentials
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open(token_file, 'w') as token:
            print('Saving new token')
            print('')
            token.write(creds.to_json())
    else:
        print('Token valid')

    try:
        service = build('drive', 'v3', credentials=creds)

        # 0. About the user
        results = service.about().get(fields="*").execute()
        emailAddress = results['user']['emailAddress']
        print(emailAddress)

        # 1. Call the Drive v3 API
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

Running again and we're not prompted to login again as the `token.json` is saved on the filesystem.


## Tokens

I've got a cron job running every minute on a server which may need to upload files using the above method.

Once logged in, and the token copied to the server, how can I deal with the `refresh_token` which I believe expires after 1 week. Yes it did - 

> Token has been expired or revoked

[https://stackoverflow.com/questions/19766912/how-do-i-authorise-an-app-web-or-installed-without-user-intervention/55164583#55164583](https://stackoverflow.com/questions/19766912/how-do-i-authorise-an-app-web-or-installed-without-user-intervention/55164583#55164583) - good talk in the comments about refresh tokens. The strategies here do what the Python API does and generates a refresh_token so I believe we don't need to use this?

Looks like can only get a 1 week `refresh_token` this way for 'testing' apps before having to go through the consent process again.

[https://stackoverflow.com/questions/66058279/token-has-been-expired-or-revoked-google-oauth2-refresh-token-gets-expired-i?noredirect=1&lq=1](https://stackoverflow.com/questions/66058279/token-has-been-expired-or-revoked-google-oauth2-refresh-token-gets-expired-i?noredirect=1&lq=1)

- Use a paid Google Workspace account (rather than standard gmail) and make OAuth consent screen, User Type: `Internal`.. see all below
- Publishing Status: Go from Testing to Published - but Google has to approve it?... see all below.

`client_secret.json` downloaded from console.cloud.google.com

```json
{
	"installed": {
		"client_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
		"project_id": "auto-archiver-1111111",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://oauth2.googleapis.com/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_secret": "xxxxxxx-xxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxx",
		"redirect_uris": [
			"http://localhost"
		]
	}
}
```
Here is an example of a generated `token.json` after run through the process in [https://developers.google.com/drive/api/quickstart/python](https://developers.google.com/drive/api/quickstart/python)

```json
{
	"token": "ya29.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // refreshed every hour
	"refresh_token": "1//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // stays the same
	"token_uri": "https://oauth2.googleapis.com/token",
    
	"client_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com", // OAuth Client ID from console.cloud.google.com (from client_secret.json)
	"client_secret": "xxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxx", // OAuth Client secret from console.cloud.google.com (from client_secret.json)
	"scopes": [
		"https://www.googleapis.com/auth/drive"
	],
	"expiry": "2022-06-30T10:11:19.033586Z" // Zulu or GMT time. -1 hour in British Summer time. When the token expires (every hour)
}
```

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

## 3. OAuth2 with Google Workspace User (paid)

[https://workspace.google.com/intl/en_uk/pricing.html](https://workspace.google.com/intl/en_uk/pricing.html) this gives 30GB cloud storage, and custom email. This is what I use for my company specifically for email: dave@hmsoftware.co.uk

Workspace can buy storage from One below:


[https://one.google.com/storage](https://one.google.com/storage) This is Google One where my davemateeer@gmail.com email gets 100GB of storage (I used it to store all my photos and backup from iPhone) at £1.59 per month.


[https://console.cloud.google.com/](https://console.cloud.google.com/) lets create the project and enable the API for dave@hmsoftware.co.uk

[https://developers.google.com/drive/api/quickstart/python](https://developers.google.com/drive/api/quickstart/python) this Drive API quickstart is a good place.

- Create new project - Auto Archiver HMS
- Enable: Google Drive API

[![alt text](/assets/2022-04-28/internal.jpg "desktop"){:width="400px"}](/assets/2022-04-28/internal.jpg)

OAuth consent screen, User Type: Internal 

Credentials, Create OAuth

`client_secret.json` or `credentials.json` which is what Python code calls it.

This is working now - I'm using the old service account to talk to the spreadsheet, and the new OAuth Google Workspace account to talk to the Drive.


But who knows how long the `refresh_token` in `token.json` will work for? [https://stackoverflow.com/questions/66058279/token-has-been-expired-or-revoked-google-oauth2-refresh-token-gets-expired-i?noredirect=1&lq=1](https://stackoverflow.com/questions/66058279/token-has-been-expired-or-revoked-google-oauth2-refresh-token-gets-expired-i?noredirect=1&lq=1) the inference is that External and published Testing, has 7 days. And no mention on Internal token.



[https://support.google.com/cloud/answer/10311615#user-type](https://support.google.com/cloud/answer/10311615#user-type) User Type Internal/External and Publishing status Testing / In proudction


## 4. OAuth with Publish Status Published and External non Workspace User 

[![alt text](/assets/2022-04-28/publish.jpg "desktop"){:width="400px"}](/assets/2022-04-28/publish.jpg)

then

[![alt text](/assets/2022-04-28/push.jpg "desktop"){:width="400px"}](/assets/2022-04-28/push.jpg)
then

[![alt text](/assets/2022-04-28/published.jpg "desktop"){:width="400px"}](/assets/2022-04-28/published.jpg)

Well..will this work after 1 week?

[![alt text](/assets/2022-04-28/notverified.jpg "desktop"){:width="400px"}](/assets/2022-04-28/notverified.jpg)

This is looking promising. I don't mind about the warning from Google as I'm the only person using the service.


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