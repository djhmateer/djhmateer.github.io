---
layout: post
title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: ai 
published: true 
comments: false     
sitemap: true
image: /assets/2023-10-30/1.jpg
---

<!-- [![alt text](/assets/2023-10-10/3.jpg "email"){:width="600px"}](/assets/2023-10-10/3.jpg) -->
[![alt text](/assets/2023-10-30/1.jpg "email")](/assets/2023-10-30/1.jpg)
A working LLM on my local machine.

[oobabooga/text-generation-webui](https://github.com/oobabooga/text-generation-webui) is a front end for running Large Language Models on local hardware.

A LLM is a type of AI system designed to understand, generate, and interact with human language eg [Open AI GPT-4](), [Google PaLM used in Bard](), [Meta's LLaMa](), [Anthropic Claude 2]()

TextGenWebUI supports

- Transformers
- GPTQ (GPUS)
- AWQ
- EXL2
- llama.cpp (GGML now called GGUF - CPU)
- Llama

[https://www.youtube.com/watch?v=k2FHUP0krqg](https://www.youtube.com/watch?v=k2FHUP0krqg) - using with Matthew Berman

I used the `start_linux.sh` script to get it working, and not his more manual way of `python server.py`. Although I could run from VSCode straight into server.py just fine.

```bash
# cd ~ - doing it from WSL side as had strange filesystem erros from c:/dev/test

# notice the version referes to the version of python you have 
# https://docs.conda.io/projects/miniconda/en/latest/miniconda-other-installer-links.html

wget https://repo.anaconda.com/miniconda/Miniconda3-py38_23.5.2-0-Linux-x86_64.sh

conda update -n base -c defaults conda

# conda create -n textgen python=3.10.9

git clone https://github.com/oobabooga/text-generation-webui.git

# this worked in ~/
# and not having conda started
# selected cpu only
./start_linux.sh

# this just may tick the box on the ui to run cpu only
./start_linux.sh --cpu

# to update
./update_linux.sh 

# to delete and start again
# remove `installer_files` directory
```

And here is the manual install method which didn't work.

```bash
# use manual instructions
# https://github.com/oobabooga/text-generation-webui#manual-installation-using-conda

conda create -n textgen python=3.11
conda activate textgen

pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

pip3 install -r requirements_cpu_only.txt

# not working - getting error below
python3 server.py
# Traceback (most recent call last):
#  File "/mnt/c/dev/textgen/server.py", line 5, in <module>
#    from modules.block_requests import OpenMonkeyPatch, RequestBlocker
#  File "/mnt/c/dev/textgen/modules/block_requests.py", line 4, in <module>
#    import requests
#ModuleNotFoundError: No module named 'requests'
```

## Models

```bash
# to clone models from huggingface or just use the TextGenWebUI
sudo apt-get install git-lfs
git lfs install
```

For me I have to look for CPU models only:

GGML (now called GGUF) - good for CPU only. Only GGUF works for me.
GPTQ - GPU only

- [TheBloke/Llama-2-7b-Chat-GGUF](https://huggingface.co/TheBloke/Llama-2-7b-Chat-GGUF) - works!

- [https://huggingface.co/TheBloke/Llama-2-7B-GGUF](https://huggingface.co/TheBloke/Llama-2-7B-GGUF) - what is the difference between the Chat variant above and this?



- [https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF)

- [https://huggingface.co/TheBloke/Mistral-7B-v0.1-GGUF](https://huggingface.co/TheBloke/Mistral-7B-v0.1-GGUF) what is the instruct variant above?


## Quantization

aka Language Model Quantization - compressing or reducing the size of a LLM

Go for at least Q4 quantization

[good notes here](http://webcache.googleusercontent.com/search?q=cache:https://artificialcorner.com/run-gptq-ggml-gguf-one-library-to-rule-them-all-115b1f84b0e2&sca_esv=577764723&strip=1&vwsrc=0)



## Performance

[https://time.com/4534903/moby-dick-chapter-one/](https://time.com/4534903/moby-dick-chapter-one/)

`please summerise: (chapter 1 of moby dick)`


llama-2-7b-chat.Q4_0.gguf - 192secs. 0.05 tokens/sec.. and it failed. shorter bits of text work. ChatGPT4 did it in a few seconds!


## NEXT

explore different models

look at video from matthew - what are his tests?

clean out all models from directory?

how to train a model?














## xx

[https://www.youtube.com/watch?v=tK1Pivdcl3U](https://www.youtube.com/watch?v=tK1Pivdcl3U)

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
[https://github.com/ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp) 43k stars.

has bindings for Python, C#, Go etc.. and UI like below




## OOBABOOGA Gradio web UI for LLMs - text generation

25k starts

[https://github.com/oobabooga/text-generation-webui](https://github.com/oobabooga/text-generation-webui) which supports llama.cpp

Easy to download new models from TheBloke on Huggingface... can load quantised versions too for less gpu ram. Or use cpu instead but slower.


## A gradio web UI for stable diffusion

100k stars

[https://github.com/AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)