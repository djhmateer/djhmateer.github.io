---
layout: post
# title: Updating Open Visual Studio utility to .NET 6 
# description: A small utility which opens visual studio from the command shell looking for a `.sln` file in the current directory. Updating to .NET6
menu: review
categories: linux
published: true 
comments: false     
# sitemap: true
image: /assets/2022-04-13/sc.jpg
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->

## systemctl

`systemctl` is a way to start processes automatically and to recover from crashes. I'm using Ubuntu20.04

Typically I've got a `python-hatespeech.service` file which sits in `/etc/systemd/system/python-hatespeech.service`

The file looks like:

```txt
# helper file which should be checked into source control
# copy to /etc/systemd/system/python.service

[Unit]
Description=Python worker

[Service]
WorkingDirectory=/home/dave/hatespeech

# todo refactor to get rid of superfluous args
ExecStart=/usr/bin/python3 PreBERT.py -m xlm-roberta-base -d all_train -s input/input.csv -fn output/output

Restart=always
# Restart service after 10 seconds if crash
RestartSec=10

SyslogIdentifier=pyton-hatespeech
User=dave

[Install]
WantedBy=multi-user.target
```

then

```bash
# useful commands
sudo systemctl enable python.service
sudo systemctl start python.service
sudo systemctl status python.service

# to stop a long running job?
ps -ef | grep hatespeech
kill -9 pid
```

for ASP.NET jobs I use:

```txt
# copy to /etc/systemd/system/kestrel.service

[Unit]
Description=API running on ASP.NET 6 

[Service]
WorkingDirectory=/var/www
ExecStart=/usr/bin/dotnet APISecurityTest.dll --urls "http://*:5000"

Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10

# copied from dotnet documentation at
# https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-3.1#code-try-7
KillSignal=SIGINT
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

SyslogIdentifier=dotnet-api-security-test
User=www-data

[Install]
WantedBy=multi-user.target
```

## cron

I use `cron` to run a process every minute

`/etc/cron.d/run-auto-archive` is the file

```txt
* * * * * dave /home/dave/auto-archiver/infra/cron.sh
```

then

```bash
# allow cron to run the file
sudo chown root /etc/cron.d/run-auto-archive
sudo chmod 600 /etc/cron.d/run-auto-archive
```

`cron.sh` is:

```bash
#!/bin/bash

# run cron.sh every minute as user dave

# so only 1 instance of this will run if job lasts longer than 1 minute
# https://askubuntu.com/a/915731/677298
if [ $(pgrep -c "${0##*/}") -gt 1 ]; then
     echo "Another instance of the script is running. Aborting." >> /home/dave/log.txt 2>&1
     exit
fi

cd /home/dave/auto-archiver
PATH=/usr/local/bin:$PATH

pipenv run python auto_archive.py --sheet "Test Hashing" --use-filenumber-as-directory --storage=gd
```