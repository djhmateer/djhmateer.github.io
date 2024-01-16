---
layout: post
#title: Find and Validate Niches for a Self Funded Company 
# description: A small utility which opens visual studio from the command shell looking for a `.sln` file in the current directory. Updating to .NET6
# menu: review
categories: google
published: true 
comments: false     
sitemap: true
image: /assets/2022-06-30/1.jpg
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->


[![alt text](/assets/2022-06-30/1.jpg "desktop")](/assets/2022-06-30/1.jpg)

To take control of a file in Google Drive (and for it to come out of your quota) the person owning the file must press the Share icon (person) and `Transfer ownership`

Notice the 2 users here are gmail, not a custom google workspace domain

## Google Workspace

You can't transfer files from a workspace domain eg `dave@hmsoftware.co.uk` to non workspace eg `davemateer@gmail.com`.

Files can only be transferred within the workspace domain.


## Sorry, sharing is unavailable at this time

When doing multiple files I got this error. What fixed it for me was turning off my `uBlock origin` ad blocker in Chrome.

## Multiple files

I found that a screenful of files worked and any more could be problematic and slow.

Filter was `owner:me` and transferring to another user.

## Filtering

Google drive filtering is very powerful - there is a pop up icon, or you can put in commands in the search box eg:

```bash

# only this user
owner:autoarchiverservice@auto-archiver-344412.iam.gserviceaccount.com

# only this user
owner:autoarchiverb@auto-archiver-344412.iam.gserviceaccount.com

# not this user and not this other user
-owner:autoarchiverservice@auto-archiver-344412.iam.gserviceaccount.com -owner:autoarchiverb@auto-archiver-344412.iam.gserviceaccount.com
```

## Sorry, you have exceeded your sharing quota

On the receiving users end they got this message after around 50 files received.

Wait 24hs to see what happens. After a few days I was able to transfer 600 files to a new ownership.

## Another solution

If possible another way is to simply login as that target user on your machine with Google Drive then use a tool like [Beyond Compare](https://www.scootersoftware.com/index.php) to transfer files

Use Google Drive desktop for drive mappings then `.shortcut-targets-by-id` in Beyond Compare to get left and right side setup.

I filter by Orphaned Files (ie ones which are only on 1 side) then `Ctrl L` to copy to the left had side.

