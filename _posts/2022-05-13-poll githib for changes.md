---
layout: post
# title: Updating Open Visual Studio utility to .NET 6 
# description: A small utility which opens visual studio from the command shell looking for a `.sln` file in the current directory. Updating to .NET6
menu: review
categories: api
published: true 
comments: false     
# sitemap: true
image: /assets/2022-04-13/sc.jpg
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->

I've using my proxmox virtual server for testing. Rather than rebuild VM every time I was to use this test server, lets poll github for changes to the repo.

[https://gist.github.com/grant-roy/49b2c19fa88dcffc46ab](https://gist.github.com/grant-roy/49b2c19fa88dcffc46ab) is where I got the base of the script I'm using


```bash
#!/bin/sh
#This is a simple bash script that will poll github for changes to your repo,
#if found pull them down, and then rebuild and restart a Jekyll site running
#in Nginx. Note, we cannot use cron to schedule a job every 5 seconds, so we create
#a script that executes an infinite loop that sleeps every 5 seconds
#We run the script with nohup so it executes as a background process: $nohup ./update-jekyll

while true
do

#move into your git repo where your jekyll site is
cd ~/api-security-test;

git fetch;
LOCAL=$(git rev-parse HEAD);
REMOTE=$(git rev-parse @{u});

#if our local revision id doesn't match the remote, we will need to pull the changes
if [ $LOCAL != $REMOTE ]; then
    echo "pulled new code and merging"
    git pull origin master;

    echo "stopping kestrel"
    sudo systemctl stop kestrel.service

    sudo dotnet publish /home/dave/api-security-test/ --configuration Release --output /var/www

    echo "starting kestrel"
    sudo systemctl start kestrel.service
fi
sleep 5
done
```




[![alt text](/assets/2022-05-09/chrome.jpg "desktop")](/assets/2022-05-09/chrome.jpg)

