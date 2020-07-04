---
layout: post
title: Broken Link Checker Checker 
description: Broken links in websites annoy me! This is a project to help test my broken link checker tool.. it is a checker checker. Useful to see request headers and edge cases.
menu: review
categories: nginx openresty azurecli 
published: true 
comments: false     
sitemap: false
image: /assets/2020-06-30/crying.jpg
---

![alt text](/assets/2020-06-30/crying.jpg "Photo by Marcos Paulo Prado from unsplash"){:width="500px"}

Broken links in websites annoy me.

You come to a website and expect quality.

I built a tool to help me check my broken link checker is working: [brokenlinkcheckerchecker.com](http://brokenlinkcheckerchecker.com).

[Source code for this project](https://github.com/djhmateer/brokenlinkcheckerchecker)

## Internal Links

Internal links are easy to fix [like this one](/brokenurl) which will go to the sites 404 page. So when I realised this blog had lots of issues, I built a tool to crawl the site and find the broken links, look at the internal assets (css, js, pdf files etc..). My tool is very fast and does great highlighting of where the issues are eg:

## External Links

I expanded the tool to make sure the external links were there ie not a 404 error, or a network error (ie a mis-typed domain name). And this is where the edge cases started.

The website contains external edge case links which don't play as expected, and have put them in a [brokenlinkcheckerchecker.com](http://brokenlinkcheckerchecker.com). I use this website to check my Broken Link Checker.



## Request Headers

An easy way to see request headers is to use [this docker image nginx-echo-headers](https://hub.docker.com/r/brndnmtthws/nginx-echo-headers/) and [here is the github source](https://github.com/brndnmtthws/nginx-echo-headers/blob/master/nginx.conf)

```bash
docker run -p 8080:8080 brndnmtthws/nginx-echo-headers

curl localhost:8080
```

![alt text](/assets/2020-06-30/curl-request-headers.jpg "Request headers from curl"){:width="400px"}

Then running from Chrome incognito we can see the request headers and the request:

![alt text](/assets/2020-06-30/request-headers.jpg "Request headers from Chrome"){:width="800px"}

Behind the scenes it is [using openresty #echo_client_request_headers](https://github.com/openresty/echo-nginx-module#echo_client_request_headers)

## OpenResty

asdf

## Log Request Headers to Nginx access.log

asdf

## Building the VM Web app with Cloud-init and Azure

For projects of this size I use [this strategy](/2020/01/09/Publishing-ASP-NET-Core-3-App-to-Ubuntu)

- Azure CLI to script out the VM I want and OS (Ubuntu 18.04)
- Cloud-init to auto run commands once the machine is built
- Git to transfer files

I've taken the good parts of Docker eg [treating my servers like cattle and not pets](https://devops.stackexchange.com/questions/653/what-is-the-definition-of-cattle-not-pets). So I don't generally care if a server goes down.

I constantly rebuild my server every time I do updates

- never need to worry about OS updates (just run the script again)
- never need to worry about how to install apps as it is source controlled in the build script
- I find this less complex that Docker/K8s as it is a just a raw VM
- I use ssh keys so never need to remember passwords

[github.com/djhmateer/brokenlinkcheckerchecker](https://github.com/djhmateer/brokenlinkcheckerchecker) is where all the source is.

## Timings

It takes under 3 minutes to build the infrastructure onto Azure ie creating Resource Groups, vnets, network rules, and creating the VM.

It takes a further 2.5 minutes for the cloud-init scripts to pull install packages and configure the server and do a reboot. This depends on the power of the VM used.

<!-- ![alt text](/assets/2020-06-30/blcc2.jpg "Website working"){:width="500px"} -->
![alt text](/assets/2020-06-30/blcc2.jpg "Website working")

## Azure-CLI

You'll need the Azure CLI installed on your version of WSL. I [use apt](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest). Am also using WSL2 now which seems to be faster at installing the azure cli package.

![alt text](/assets/2020-06-30/wsl-output.jpg "WSL Output"){:width="500px"}

This is running the azure-cli shell script.

<!-- ![alt text](/assets/2020-06-30/low-memory.jpg "Low Memory"){:width="500px"} -->
![alt text](/assets/2020-06-30/low-memory.jpg "Low Memory")

I've seen this every now and again when running a super low powered VM where is gets hung on doing apt-updates and running out of memory. It never seems to recover. Just run the script again, or use a higher powered VM.

## Cloud-init

[Cloud-init](https://cloud-init.io/) is a tool supported by: Azure, AWS, Google, Rackspace, OVH etc.. which allows configuration of a VM once it is build. I use it simply to run commands eg:

```bash
#cloud-config

package_upgrade: true
runcmd:
  - wget -qO - https://openresty.org/package/pubkey.gpg | sudo apt-key add -
  - sudo apt-get -y install software-properties-common
  - sudo add-apt-repository -y "deb http://openresty.org/package/ubuntu $(lsb_release -sc) main"
  - sudo apt-get update -y

  # the below registers openresty with systemd systemctl
  # to restart openresty: sudo systemctl restart openresty
  - sudo apt-get install openresty -y

```

I find this way easier to manage and debug that Docker.

After the shell script runs and you wait a while for the cloud-init script to run, I connect from my windows shell:

![alt text](/assets/2020-06-30/shell.jpg "Connecting from cmder windows shell"){:width="600px"}

Notice I don't need a password as am using [ssh keys](/2020/03/05/Multiple-SSH-Keys-on-Azure-Linux-VM).

![alt text](/assets/2020-06-30/blcc.jpg "The website from Chrome"){:width="600px"}

![alt text](/assets/2020-06-30/access-log.jpg "Viewing the access log with full request headers"){:width="800px"}

The access log with full request headers on all pages.

![alt text](/assets/2020-06-30/echoback.jpg "The special echoback page"){:width="800px"}

## Conclusion

asdf