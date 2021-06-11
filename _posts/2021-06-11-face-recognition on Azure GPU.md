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

[https://github.com/djhmateer/osr4rights-tools](https://github.com/djhmateer/osr4rights-tools) is a project where we spin up an Azure VM with a GPU to do face searching for Human Rights investigators. This source contains the Azure CLI build script, and Cloud init deployment script of the VM.

[https://github.com/spatial-intelligence/OSR4Rights](https://github.com/spatial-intelligence/OSR4Rights) source for the Python script that scans faces using the built VM above.

[https://github.com/ageitgey/face_recognition](https://github.com/ageitgey/face_recognition) is the open source project the Python script uses.

[https://github.com/ageitgey/face_recognition#identify-faces-in-pictures](https://github.com/ageitgey/face_recognition#identify-faces-in-pictures) and the technology used is this example of finding a known image ie recognising a person. 

[Wiki of how to use](https://github.com/ageitgey/face_recognition/wiki/Calculating-Accuracy-as-a-Percentage)


## Installing on a GPU

We could use docker, and indeed there is a docker compose file in the face_recognition source. However it is quite out of date.

[https://sparkle-mdm.medium.com/python-real-time-facial-recognition-identification-with-cuda-enabled-4819844ffc80](https://sparkle-mdm.medium.com/python-real-time-facial-recognition-identification-with-cuda-enabled-4819844ffc80) digging into the libraries



[https://github.com/ageitgey/face_recognition#deployment](https://github.com/ageitgey/face_recognition#deployment)

There is a docker version here, but lets stick close to the metal for simplicity. We are automating everything so don't need docker.

## Testing

[![Load](/assets/2021-06-11/load.jpg "load"){:width="800px"}](/assets/2021-06-11/load.jpg)

## Test Datasets

[https://github.com/ageitgey/face_recognition/wiki/Known-Face-Image-Datasets](https://github.com/ageitgey/face_recognition/wiki/Known-Face-Image-Datasets) - 2 in here

- lfw (170MB)
- asian face age dataset


## Copying files from GPU server to local

```bash
# windows to linux
scp 00248.png dave@osrfacesearchgpu605.westeurope.cloudapp.azure.com:/home/dave/facesearch/job3

# linux to windows
scp dave@osrfacesearchgpu605.westeurope.cloudapp.azure.com:/home/dave/facesearch/job3/. .
```

Or use WinSCP