---
layout: post
title:  Calling Azure from C# wih Azure SDKs and Bash
description: 
menu: review
categories: Azure 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

I've used the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) for many years which I drive from WSL2 Bash. 

Now I've got a C# project where I need to spin up a Virtual Machine in Azure, so need to control Azure from C#

Under the hood I need to call the [Azure REST API](https://docs.microsoft.com/en-us/rest/api/azure/), so can use

- The new Azure SDK for .NET Preview (2020)
- The Azure SDK
- Shell out to bash and call the Azure CLI

TL;DR - I'm using the Azure CLI as it

- Has good documentation
- I can pass a cloud-init bash script to run on VM completion

Even though the SDK should be the best way to go.


## 1.Azure SDK for .NET Preview (2020)
[https://devblogs.microsoft.com/azure-sdk/introducing-new-previews-for-azure-management-libraries/](https://devblogs.microsoft.com/azure-sdk/introducing-new-previews-for-azure-management-libraries/) Introducing new previews for Azure Management Libraries

[https://github.com/Azure/azure-sdk-for-net/blob/master/doc/mgmt_preview_quickstart.md](https://github.com/Azure/azure-sdk-for-net/blob/master/doc/mgmt_preview_quickstart.md) quickstart 

`Azure.Core` - correct new namespace which uses async. 

[https://docs.microsoft.com/en-gb/samples/azure-samples/azure-samples-net-management/compute-create-vm/](https://docs.microsoft.com/en-gb/samples/azure-samples/azure-samples-net-management/compute-create-vm/) good samples.tutorial (with bits that don't work in preview2)

So the new SDK looks promising (with all async goodness), but not ready yet.


## 2.Azure SDK

[https://github.com/djhmateer/AzureSDKConsole](https://github.com/djhmateer/AzureSDKConsole) my demo code

Namespaces like `Microsoft.Azure.Management.Fluent`

[https://docs.microsoft.com/en-gb/dotnet/azure/sdk/authentication](https://docs.microsoft.com/en-gb/dotnet/azure/sdk/authentication)

`Azure.Identity` is a newer library which is beginning to be used with the legacy SDK.

[https://docs.microsoft.com/en-us/dotnet/api/overview/azure/virtualmachines](https://docs.microsoft.com/en-us/dotnet/api/overview/azure/virtualmachines)

[https://github.com/Azure/azure-libraries-for-net#ready-to-run-code-samples-for-virtual-machines](https://github.com/Azure/azure-libraries-for-net#ready-to-run-code-samples-for-virtual-machines) useful samples

## Authentication File

[https://github.com/Azure/azure-libraries-for-net/blob/master/AUTH.md](https://github.com/Azure/azure-libraries-for-net/blob/master/AUTH.md) following these good instructions

```bash

# make sure you're logged in as the correct user
az account show

# get details of the subscription for logged in account
# interestingly it shows 2 subscriptions for my dave@hmsoftware.co.uk account which is wrong
az account list

# set the subscription just to make sure
az account set --subscription 'Azure subscription 1'

# need to be 
az ad sp create-for-rbac --sdk-auth > my.azureauth
```

[https://docs.microsoft.com/en-gb/cli/azure/create-an-azure-service-principal-azure-cli](https://docs.microsoft.com/en-gb/cli/azure/create-an-azure-service-principal-azure-cli) creating an Azure Service Principle with the Azure CLI

## Demo Code

[https://github.com/Azure-Samples/compute-dotnet-create-virtual-machines-from-generalized-image-or-specialized-vhd](https://github.com/Azure-Samples/compute-dotnet-create-virtual-machines-from-generalized-image-or-specialized-vhd)

Need to set AZURE_AUTH_LOCATION environment variable to the full path location of `my.azureauth`

`Microsoft.Azure.Management.Fluent` import from NuGet 

I couldn't figure out how to get an Ubuntu 20_04 LTS Gen 2 VM running, and passing it a cloud-init script to run. It was complaining about not being able to find Python.

[https://github.com/djhmateer/AzureSDKConsole](https://github.com/djhmateer/AzureSDKConsole) from my demo code
```cs
// vm
Console.WriteLine("Creating a Linux VM");
var linuxVM = azure.VirtualMachines.Define(linuxVmName1)
        .WithRegion(Region.EuropeWest)
        //.WithNewResourceGroup(rgName)
        .WithExistingResourceGroup(resourceGroup)
        //.WithNewPrimaryNetwork("10.0.0.0/28")
        //.WithPrimaryPrivateIPAddressDynamic()
        //.WithNewPrimaryPublicIPAddress(publicIpDnsLabel)
        .WithExistingPrimaryNetworkInterface(networkInterface1)
        // Nice strongly typed image names - but old
        //.WithPopularLinuxImage(KnownLinuxVirtualMachineImage.UbuntuServer16_04_Lts)
        // az vm image list --publisher Canonical --sku 20_04-lts-gen2 --output table --all
        //.WithLatestLinuxImage("Canonical", "0001-com-ubuntu-server-focal", "20_04-lts-gen2")
        //.WithLatestLinuxImage("Canonical", "0001-com-ubuntu-server-focal", "20_04-lts")
        .WithLatestLinuxImage("Canonical", "0001-com-ubuntu-server-focal", "20_04-lts")
        .WithRootUsername(userName)
        .WithRootPassword(password)
        // look into this need pem format
        //.WithSsh()
        // **look into this **
        //.WithUnmanagedDisks()
        // Nice strongly typed machine size - but need a crib sheet for costs
        // https://azure.microsoft.com/en-gb/pricing/details/virtual-machines/linux/
        //.WithSize(VirtualMachineSizeTypes.Parse("Standard_D2a_v4"))
        // £5 per month
        .WithSize(VirtualMachineSizeTypes.StandardB1ms)
        .DefineNewExtension("CustomScriptForLinux")
            .WithPublisher("Microsoft.OSTCExtensions")
            .WithType("CustomScriptForLinux")
            .WithVersion("1.4")
            .WithMinorVersionAutoUpgrade()
            // pulling a bash script from a Uri
            .WithPublicSetting("fileUris", ApacheInstallScriptUris)
            // sending the bash script
            .WithPublicSetting("commandToExecute", apacheInstallCommand)
            .Attach()
        .Create();
```

I found this more difficult to use, and it wouldn't work for the cloud-init.

On the AZ CLI I can do something like this:

```bash
az vm create \
    --resource-group ${rg} \
    --name ${vmname} \
    --location ${region} \
    --nics ${nicName} \
    --image ${image} \
    --custom-data simple_bash.sh \
    --admin-username ${adminusername} \
    --admin-password ${adminpassword} \
    --size Standard_NC4as_T4_v3
```

## 3.Bash - Azure CLI

[https://jackma.com/2019/04/20/execute-a-bash-script-via-c-net-core/](https://jackma.com/2019/04/20/execute-a-bash-script-via-c-net-core/)

I found this method to be much cleaner (!) as could use my existing bash scripts which are very simple.

The code from jackma above is nice too as it 

- Catches Exceptions and bubbles them up
- Gets stdout messages
- Gets stderr messages
- Can pass a parameter to the bash

[https://github.com/djhmateer/osr4rights-tools](https://github.com/djhmateer/osr4rights-tools) for full examples.

## 4.Bash - Azure CLI with CliWrap

[https://github.com/Tyrrrz/CliWrap](https://github.com/Tyrrrz/CliWrap) has 498k downloads

[https://github.com/djhmateer/bash-test-cli-wrap](https://github.com/djhmateer/bash-test-cli-wrap) my demo code

CliWrap is a library for interacting with external command line interfaces. It provides a convenient model for launching processes, redirecting input and output streams, awaiting completion, handling cancellation, and more.

- Event steam stdout and stderr in real time to C#
- Pass cancellation token

```cs
// Run this from WSL2 side as I'm expecting to use bash
// dotnet run
static async Task Main(string[] args)
{
    // 1.Task based 
    //var result = await Cli.Wrap("infra.azcli")
    //                .WithWorkingDirectory(workingDir)
    //                .ExecuteAsync();

    // 2.Pull based event stream
    // https://github.com/Tyrrrz/CliWrap#pull-based-event-stream
    // don't need to call .ExecuteAsync as we are calling ListenAsync below
    var cmd = Cli.Wrap("infra.azcli");

    // Can pass a cancellation token
    using var cts = new CancellationTokenSource();

    // Cancel automatically after a timeout of 10 seconds
    //cts.CancelAfter(TimeSpan.FromSeconds(10));

    // Cli will throw if a non 0 return status
    try
    {
        await foreach (var cmdEvent in cmd.ListenAsync(cts.Token))
        {
            switch (cmdEvent)
            {
                case StartedCommandEvent started:
                    //_output.WriteLine($"Process started; ID: {started.ProcessId}");
                    Console.WriteLine($"Process started; ID: {started.ProcessId}");
                    break;
                case StandardOutputCommandEvent stdOut:
                    //_output.WriteLine($"Out> {stdOut.Text}");
                    Console.WriteLine($"Out> {stdOut.Text}");
                    break;
                case StandardErrorCommandEvent stdErr:
                    //_output.WriteLine($"Err> {stdErr.Text}");
                    Console.WriteLine($"Err> {stdErr.Text}");
                    // it could be that we want to exit here if any of the script writes to stderr
                    // make sure script debugging turned off ie no set -x
                    break;
                case ExitedCommandEvent exited:
                    //_output.WriteLine($"Process exited; Code: {exited.ExitCode}");
                    Console.WriteLine($"Process exited; Code: {exited.ExitCode}");
                    break;
            }
        }
    }
    catch (OperationCanceledException e)
    {
        Console.WriteLine("Operation cancelled - can I recover / clean up?");
    }
    catch (Exception ex)
    {
        Console.WriteLine("Exception - this can be caused when the bash command returns a non 0 status");
    }

    //Console.WriteLine($"Result: {result}");
    Console.WriteLine($"Done");

```