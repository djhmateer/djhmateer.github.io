---
layout: post
# title: ChatGPT4 Vision 
description: 
menu: review
categories: ai 
published: true 
comments: false     
sitemap: true
image: /assets/2023-10-30/1.jpg
---

<!-- [![alt text](/assets/2023-10-10/3.jpg "email"){:width="600px"}](/assets/2023-10-10/3.jpg) -->
<!-- [![alt text](/assets/2023-10-30/1.jpg "email")](/assets/2023-10-30/1.jpg) -->

[Previously](/2023/10/25/llm-open-source-model-use) I've looked at running an LLM locally on my CPU with [TextGenerationWebUI]()


 I've looked at ChatGPT-4 vision for my use case of:

- give a traumatic rating of 1 to 5 (so human rights investigators are warned of graphic images)
- describe the image in 5 words
- desctibe the imgae in 1 sentence in non emotional language

## LM Studio

[https://lmstudio.ai/](https://lmstudio.ai/)

Version 0.2.9 as of 14th Dec 23.

Supports any `ggml now called gguf` ie for CPUS - Llama, MPT and StarCoder model on [HuggingFace](https://huggingface.co/models) eg

- Llama 2
- Orcae
- Vicuna
- Novus Hermes

Based on [https://github.com/ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)


## LLaVA

[![alt text](/assets/2023-12-14/1.jpg "email"){:width="800px"}](/assets/2023-12-14/1.jpg)

[https://llava-vl.github.io/](https://llava-vl.github.io/) - LLaVA-v1.5-7B was trained in Sept 23.

[https://huggingface.co/jartine/llava-v1.5-7B-GGUF](https://huggingface.co/jartine/llava-v1.5-7B-GGUF) - updated 14th Dec. Main files 3 weeks ago.

Notice - need to download the vision adapter too

Trying the Q4 model first (smaller) at 4GB.

[![alt text](/assets/2023-12-14/2.jpg "email"){:width="800px"}](/assets/2023-12-14/2.jpg)

LLaVA successfully working on CPU with vision adapter.

## Python - Q4 - 4GB

Lets try to connect to my locally running model using Python

Notice that I'm referring to the ip address of my windows machine eg `192.168.1.191` as I'm calling Windows from WSL2.

```py

```

1:03 to run it from the UI
0:40 to run from python


[![alt text](/assets/2023-12-14/3.jpg "email"){:width="500px"}](/assets/2023-12-14/3.jpg)

292seconds - using E cores... not good.

[![alt text](/assets/2023-12-14/4.jpg "email"){:width="400px"}](/assets/2023-12-14/4.jpg)

When LM Studio is non minimised on the desktop I use all cores. Notice I'm thermal throttling.

0:35 is best time.

> The image depicts four penguins standing on top of a snow-covered iceberg. They are scattered across the scene, with two close to each other in the center and two others standing apart at different corners of the iceberg. The background features mountains covered in white snow. It appears to be a peaceful moment as the penguins enjoy their frosty habitat


### Q8 Model - 7GB

> This image is a beautiful composition featuring four penguins standing together on an icy snowy field with mountains in the background. They are located atop a glacier, adding to the majesty of this scene. The group of penguins appears to be enjoying their time in nature while creating a striking visual for the viewers. The combination of these cute birds and the stunning mountainous landscape creates an impressive image that is sure to capture the attention of anyone who sees it


> This is a group of four penguins standing in the snow, facing different directions. One penguin is near the left edge of the image and three others are positioned more towards the center-right of the picture. The first two penguins stand closer together and appear to be looking at each other, while the third penguin stands slightly further away and appears to look in a different direction. The scene seems to be captured during winter or at an icy location where these penguins have gathered, possibly searching for food or interacting with one another

0:58 to run


### Q13 Model - 13GB

89s to run


## 1.Giving a trauma rating


`This image is from a war torn area. give a rating from 1 to 5 as to how sensitive it is please.`

[https://llava.hliu.cc/](https://llava.hliu.cc/) this works really well.  It uses llava-v1.5-13b on a GPU.


[PsiPi/liuhaotian_llava-v1.5-13b-GGUF](PsiPi/liuhaotian_llava-v1.5-13b-GGUF) - lets try this model locally




I want to give a 1 to 5 rating of an image on how traumatic it is to look at. eg if it shows human suffering, upsetting images,

This is to mitigate trauma for human rights researchers

ChatGPT4 was resonable with this prompt:
`Is this a sensitive picture? please give 1 word summary. give a rating from 1 to 5 as to how sensitive it is please. summerise in 1 sentence`

It gave a godo summery like:

> Summary: Nature
> Rating: 1
> Sentence: The image shows a close-up of a flowering plant with a cluster of white flowers featuring hints of pink, set against a backdrop of green foliage, and appears to be non-sensitive content.


LLaVA not so good

> The image features a tree with little white flowers in the middle of its branches. The flowers are clustered together and look quite attractive. The tree is situated near some green leaves, which add to the overall visual appeal of the scene.


## 2.Summerise Image

`summerise this image` seems to work eg

> A group of purple flowers blooms in the branches of a tree.

> The image showcases a white flowering tree with pink blossoms, creating a beautiful scene. The tree is filled with tiny white flowers and draped in pink flora. These delicate petals are scattered throughout the tree, with some near the top, middle, and lower branches. The vibrant display of flowers creates an appealing and serene atmosphere.


## Other Vision Models

llava 11.5 7B Q8

llava v1.5 13b Q2_K
  nope

BakLLaVA 7B

obsidian-3B-f16
 gave nothing



