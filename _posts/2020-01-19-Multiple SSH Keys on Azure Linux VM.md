---
layout: post
title: Multiple SSH Keys for an Azure CLI generated Linux VM
description: 
menu: review
categories: SSH 
published: true 
comments: false     
sitemap: false
image: /assets/2019-11-13/3.jpg
---

![alt text](/assets/2020-01-09/20.jpg "Connecting to a Linux VM using SSH Keys"){:width="600px"}  

An SSH Key (public/private key pair) is the preferred way to connect to a Linux VM.  The benefits are:

- Don't need a password
- Can use an alias eg `ssh blc`
- More secure as can't brute force

[MS Documentation](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/create-ssh-keys-detailed#overview-of-ssh-and-keys)

## Manually Generate Keys

[It is good practise to have separate keys for each machine you connect from](https://stackoverflow.com/questions/4520578/sharing-ssh-keys/12100237#12100237) 

Quite often you'll have generated keys from something else, however if you don't then:

```bash
ssh-keygen -m PEM -t rsa -b 4096
```

Then look in `~/.ssh` or `c:\Users\djhma\.ssh` where the `id_rsa.pub` is the public key

## Azure CLI generate-ssh-keys

A handy way to create or use existing ssh keys when creating a new vm on Azure:

```bash
az vm create --name davetest110 --resource-group rg --generate-ssh-keys

## connect to VM
ssh dave@davetest110.westeurope.cloudapp.azure.com

## connect to the VM ignoring initial do you trust prompt
ssh -o StrictHostKeyChecking=no dave@davetest110.westeurope.cloudapp.azure.com
```

Inside `WSL` which I [run my bash Azure CLI scripts from](/2020/01/09/Publishing-ASP-NET-Core-3-App-to-Ubuntu), this will create or use keys inside `~/.ssh`

- id_rsa.pub - public key
- id_rsa - private key

## StrictHostKeyChecking

Command is useful to ignore the fingerprint check and add the host to the known_hosts file in `~/.ssh`

![alt text](/assets/2020-01-09/22.jpg "Handy to ignore the fingerprint check"){:width="600px"}  

At the end of my build script I echo out the ssh command:

![alt text](/assets/2020-01-09/23.jpg "Ignore the fingerprint check"){:width="600px"}  

```bash
ssh -o StrictHostKeyChecking=no dave@davetest420.westeurope.cloudapp.azure.com
```

## Username

![alt text](/assets/2020-01-09/21.jpg "Getting ssh connection string from Azure UI"){:width="500px"}  

I used the above to figure out the username `dave` to connect with. This is the username of the `WSL` user on my Windows machine.

## Connect from Multiple Machines to the VM

I use 3 machines to develop on on a regular basis:

- Work desktop machine
- Home laptop
- Home desktop machine

So do I share the public/private keys among these 3 machines to connect to my Azure Linux VM's? No!

[It is better to create separate public/private keys for each of the 3 host machines and let the newly created servers know about the 3 machines](https://stackoverflow.com/a/12100237/26086)

```bash
az vm create \
    --resource-group ${rg} \
    --name ${vmname} \
    --location ${region} \
    --nics ${nicName} \
    --image ${image} \
    --ssh-key-values sshkey-work.pub sshkey-homelenovo.pub  \
    --custom-data cloud-init.txt \
    --size Standard_B1ms
```

Above I am passing multiple public keys via the CLI. [This is what gave me a the clue](https://github.com/Azure/azure-cli/issues/9706) and the [Microsoft docs here](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys) 

As an example the `sshkey-work.pub` file is

```bash
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCkOmk7KC89RMQQJ2nnbhTHdbrixtgU7MAvKNjWZPU2MPwmJU1sSdNuIZjdfxA13bZyZ4GaHih9O3zD8gsnIzmer3G3dWRV2AfIWPmUzujmB+yEFIGne/PHb/cnkyYnEhxd5ra4sjYmtL8u+FiP1cnuyn9x4byrdY1OUi4H14uVHAVOeBz050IIaeNodJViRm8RL4w1CFiFj80+3FkDR1IrccWI6MZXCwtq3jd1PwjeEGlW8I3xpA7xgaTO5wwUTVYUwLEoYAq+22pQAl7QXGmHqLh4+IVgNv9MSK69MXDEcIGdj/iypYIeZindZI7lQvQ/TUf5BS3Y8Q1FY0i8mfzR
```

## Connect from Windows

The above works fine connecting from WSL but I like to connect from Windows too

- Windows uses `c:\users\djhma\.ssh\id_rsa`
- WSL uses `~/.ssh/id_rsa`

So how do we share the key between WSL and Windows? [Florian has a good solution](https://florianbrinkmann.com/en/ssh-key-and-the-windows-subsystem-for-linux-3436/#comment-3109) and [a good explanation of permissions on SuperUser](https://superuser.com/a/1183228/12214)

I couldn't get this to work, so a simple workaround is to copy the keys from WSL to Windows side:

```bash
 cp ~/.ssh/* /mnt/c/Users/djhma/.ssh/
```

## Warning: Unprotected Private Key File

If you get this error after copying keys from WSL to Windows

![alt text](/assets/2020-01-09/80.jpg "Setting permissions"){:width="800px"}  

[Setting permissions](https://superuser.com/a/1311633/12214)

## Config file for an Alias

in `c:\Users\djhma\.ssh\config` I have this alias setup:

```bash
Host blc
    User dave
    HostName davetest426.westeurope.cloudapp.azure.com
```

![alt text](/assets/2020-01-09/81.jpg "Setting permissions"){:width="800px"}  

Set permissions on this file too.

then I simply have to type:

```bash
ssh blc
```
