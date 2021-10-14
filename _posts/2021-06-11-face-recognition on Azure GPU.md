---
layout: post
title: Face-recognition on Azure GPU 
description: 
menu: review
categories: GPU 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

[https://github.com/osr4rightstools/osr4rights-tools](https://github.com/osr4rightstools/osr4rights-tools) is a project where we spin up an Azure VM with a GPU to do face searching for Human Rights investigators. This source contains the Azure CLI build script, and Cloud init deployment script of the VM.

[https://github.com/spatial-intelligence/OSR4Rights](https://github.com/spatial-intelligence/OSR4Rights) source for the Python script that scans faces using the built VM above.

[Wiki of how to use face_recognition](https://github.com/ageitgey/face_recognition/wiki/Calculating-Accuracy-as-a-Percentage)


## Installing on a GPU

We could use docker, and indeed there is a docker compose file in the face_recognition source. However it is quite out of date.

[https://sparkle-mdm.medium.com/python-real-time-facial-recognition-identification-with-cuda-enabled-4819844ffc80](https://sparkle-mdm.medium.com/python-real-time-facial-recognition-identification-with-cuda-enabled-4819844ffc80) digging into the libraries

[https://github.com/ageitgey/face_recognition#deployment](https://github.com/ageitgey/face_recognition#deployment)

As you can see from the build script it is quite involved to install, and getting the correct versions of the libraries working is tricky.

- [face_recognition](https://github.com/ageitgey/face_recognition) Python lib that we use to  [identify faces in pictures](https://github.com/ageitgey/face_recognition#identify-faces-in-pictures) which uses dlib
- [dlib](http://dlib.net/) C++ toolkit containing machine learning algorithms
- [NVIDIA-cuda-toolkit](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=20.04&target_type=deb_local)



## Only spinning up when needed / Performance

It is expensive keeping a GPU machine running all the time, so lets only spin one up when needed.

[https://github.com/osr4rightstools/osr4rights-tools](https://github.com/osr4rightstools/osr4rights-tools) contains an Azure CLI script to bring up a vm ready to go. However compiling from source takes time - about 12 minutes.

- Create Azure resources (some in parallel with no-wait) - 1:28
- Run bash build script on VM

## Creating an Image

see next blog article


# bash script

[apt or apt-get](https://itsfoss.com/apt-vs-apt-get-difference/) go with the newer apt?

## Nvtop

Impossible to initialize nvidia nvml : Driver/library version mismatch

This happened when I did an apt-get upgrade



## Testing

[![Load](/assets/2021-06-11/load.jpg "load"){:width="800px"}](/assets/2021-06-11/load.jpg)

GPU doing fine, with 2 instances of the single threaded app working using 2 of the CPU cores.

- [bpytop](https://github.com/aristocratos/bpytop) for CPU monitoring
- [nvtop](https://github.com/Syllo/nvtop) for GPU monitoring
- watch nvidia-ami for GPU monitoring too

## Test Datasets

[https://github.com/ageitgey/face_recognition/wiki/Known-Face-Image-Datasets](https://github.com/ageitgey/face_recognition/wiki/Known-Face-Image-Datasets) - 2 in here

- [http://vis-www.cs.umass.edu/lfw/](http://vis-www.cs.umass.edu/lfw/) lfw (170MB)
- [http://afad-dataset.github.io/](http://afad-dataset.github.io/)asian face age dataset
- [https://github.com/NVlabs/ffhq-dataset/](https://github.com/NVlabs/ffhq-dataset/)



## Copying files from GPU server to local

```bash
# windows to linux
scp 00248.png dave@osrfacesearchgpu605.westeurope.cloudapp.azure.com:/home/dave/facesearch/job3

# linux to windows
scp dave@osrfacesearchgpu605.westeurope.cloudapp.azure.com:/home/dave/facesearch/job3/. .
```

Or use WinSCP