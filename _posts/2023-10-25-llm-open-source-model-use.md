---
layout: post
# title: LLMs for Entrepreneurial Ideas 
description: 
menu: review
categories: ai 
published: true 
comments: false     
sitemap: true
image: /assets/2023-07-22/1.jpg
---

<!-- [![alt text](/assets/2023-10-10/3.jpg "email"){:width="600px"}](/assets/2023-10-10/3.jpg) -->


[https://www.youtube.com/watch?v=tK1Pivdcl3U]9https://www.youtube.com/watch?v=tK1Pivdcl3U)

[https://huggingface.co/ehartford/dolphin-2.0-mistral-7b](https://huggingface.co/ehartford/dolphin-2.0-mistral-7b) - a model which is based on the text generation model called Mistral-7B which has been fine tuned on the Dolphin dataset - an uncensored dataset.


RunPod to [rent GPU](https://www.runpod.io/)

Inference 

Training


## Mistral 7B

[https://www.youtube.com/watch?v=5mmjig68d40](https://www.youtube.com/watch?v=5mmjig68d40) 

Lets see if I can run this model locally?

Performs better than LLaMA 2 apparently


[https://ollama.ai/](https://ollama.ai/) to run locallly

langchain too - python

labs.perplexity.ai - very fast implementations of llama2

## LLaMA.cpp

[https://www.youtube.com/watch?v=k2FHUP0krqg](https://www.youtube.com/watch?v=k2FHUP0krqg) - using oobabooga with llama.cpp


[https://github.com/ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp) 43k stars.

has bindings for Python, C#, Go etc.. and UI like below

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-py38_23.5.2-0-Linux-x86_64.sh

conda update -n base -c defaults conda

# conda create -n textgen2 python=3.10.9

git clone https://github.com/oobabooga/text-generation-webui.git

./start_linux.sh

# OSError: [Errno 40] Too many levels of symbolic links: '/mnt/c/dev/test/text-generation-webui/installer_files/conda/pkgs/ncurses-6.4-h6a678d5_0/share/terminfo/n/ncr260vt300wpp'






# git clone https://github.com/ggerganov/llama.cpp
# cd llama.cpp

```

## OOBABOOGA Gradio web UI for LLMs - text generation

25k starts

[https://github.com/oobabooga/text-generation-webui](https://github.com/oobabooga/text-generation-webui) which supports llama.cpp

Easy to download new models from TheBloke on Huggingface... can load quantised versions too for less gpu ram. Or use cpu instead but slower.


## A gradio web UI for stable diffusion

100k stars

[https://github.com/AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)