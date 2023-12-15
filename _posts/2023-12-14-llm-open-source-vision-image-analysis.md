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

[Previously](/2023/10/25/llm-open-source-model-use) I've looked at running an LLM locally on my CPU with TextGenerationWebUI


Also I've looked at [ChatGPT-4 vision](2023/12/05/llm-image-recognition) for my use case of:

- give a traumatic rating of 1 to 5 (so human rights investigators are warned of graphic images)
- describe the image in 5 words
- describe the image in 1 sentence in non emotional language

This is an exploration into whether open source models can achieve a similar (good!) performance.

## LM Studio

[https://lmstudio.ai/](https://lmstudio.ai/) is an easy way to run models locally. 

Version 0.2.9 as of 14th Dec 23.

Supports any `ggml now called gguf` models ie for CPUS. Look [HuggingFace](https://huggingface.co/models) eg


## LLaVA - Large Language and Vision Assistant

[![alt text](/assets/2023-12-14/1.jpg "email"){:width="800px"}](/assets/2023-12-14/1.jpg)

[https://llava-vl.github.io/](https://llava-vl.github.io/) - LLaVA-v1.5 was trained in Sept 23. 

[https://huggingface.co/jartine/llava-v1.5-7B-GGUF](https://huggingface.co/jartine/llava-v1.5-7B-GGUF) - updated 14th Dec. Main files 3 weeks ago.

Notice - need to download the vision adapter too

Trying the Q4 model first (smaller) at 4GB. There is a Q8 (8GB) and f16 (13GB)

[![alt text](/assets/2023-12-14/2.jpg "email"){:width="800px"}](/assets/2023-12-14/2.jpg)

LLaVA successfully working on CPU with vision adapter.

[![alt text](/assets/2023-12-14/6.jpg "email"){:width="800px"}](/assets/2023-12-14/6.jpg)

[https://llava.hliu.cc/](https://llava.hliu.cc/) live demo which runs on a GPU - very useful for prompt testing.

## Python - Q4 - 4GB

Lets try to connect to my locally running model using Python

Notice that I'm referring to the ip address of my windows machine eg `192.168.1.191` as I'm calling Windows from WSL2.

```py
from openai import OpenAI
import base64
import requests
import time

start_time = time.time()

# Point to the local server
# client = OpenAI(base_url="http://localhost:1234/v1", api_key="not-needed")

# using windows IP as I'm calling Python from WSL2 side
client = OpenAI(base_url="http://192.168.1.191:1234/v1", api_key="not-needed")

# image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Adelie_penguins_in_the_South_Shetland_Islands.jpg/640px-Adelie_penguins_in_the_South_Shetland_Islands.jpg"

# 1.Download the image and encode it to base64
# response = requests.get(image_url)
# base64_image = base64.b64encode(response.content).decode('utf-8')

# 2.Get image locally
image_path = f'pics/hchestnut.jpg'

def encode_image(image_path):
      with open(image_path, "rb") as image_file:
          return base64.b64encode(image_file.read()).decode('utf-8')

base64_image = encode_image(image_path)

completion = client.chat.completions.create(
  model="local-model", # not used
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What’s in this image?"},
        {
          "type": "image_url",
          "image_url": {
            "url": f"data:image/jpeg;base64,{base64_image}"
          },
        },
      ],
    }
  ],
  max_tokens=1000,
  stream=True
)

for chunk in completion:
  if chunk.choices[0].delta.content:
    print(chunk.choices[0].delta.content, end="",flush=True)

end_time = time.time()
print(f"Time elapsed: {end_time - start_time} seconds")
```

1:03 to run it from the UI
0:40 to run from python

[![alt text](/assets/2023-12-14/3.jpg "email"){:width="500px"}](/assets/2023-12-14/3.jpg)

292seconds - using E(fficiency) cores... not good. Need to maximise LM Studio app to run on P cores too.

[![alt text](/assets/2023-12-14/4.jpg "email"){:width="400px"}](/assets/2023-12-14/4.jpg)

Notice I'm thermal throttling.

[![alt text](/assets/2023-12-14/5.jpg "email"){:width="400px"}](/assets/2023-12-14/5.jpg)

Core temp and Power Draw graphs are useful.


0:35 is best time.

> The image depicts four penguins standing on top of a snow-covered iceberg. They are scattered across the scene, with two close to each other in the center and two others standing apart at different corners of the iceberg. The background features mountains covered in white snow. It appears to be a peaceful moment as the penguins enjoy their frosty habitat


### Q8 Model - 7GB

0:58 to run


### Q13 Model - 13GB

89s to run


## 1.Giving a trauma rating

This is where I'm finding ChatGPT4 is much better than LLaVA:

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

## Parameters

Nothing working that well so far.

- temo - reduced to 0

## Other Vision Models

llava v1.5 7B Q4, Q8, f16

llava v1.5 13B Q2, Q4, Q5

BakLLaVA 7B Q5

obsidian-3B-f16
 gave nothing


## Prompt Engineering

Could it be that I can get better, and more reliable results with better prompting?

[https://promptperfect.jina.ai/](https://promptperfect.jina.ai/)


[https://www.youtube.com/watch?v=jC4v5AS4RIM](https://www.youtube.com/watch?v=jC4v5AS4RIM)

This is in order of importance:

- task - mandatory
- context - important
- exemplar - important
- persona - nice
- format - nice
- tone - nice

`I'm a 87kg male, give me a 3-month training program`

### Task

Always start Task sentence with Action Verb eg Generate, Give, Write, Analyze

`Generate a 3 month training program`

Or multi task request

`Analyse the collected feedbackj
Summerize the top 3 takeaways
Categorize the rest based on team responsible...
`


### Context

Give just enough information to constrain the endless possibilities

1. What is the users background?
2. What does success look like?
3. What environment are they in?

`I'm a 87kg male looking to put on 5 kg of muscle mass over the next 3 months`

[![alt text](/assets/2023-12-14/7.jpg "email"){:width="400px"}](/assets/2023-12-14/7.jpg)

### Exemplars

Gives 

Here is the task:

`Re-write this bullet point using this structure: I accomplised X by the measure Y that resulted in Z`

Exemplar

`For example: "I lowered the hospital mortality rate by 10% by educating nurses in new protocols which translates to 200 lives saved per year. `

### Exemplar 2



## Persona

Think of an expert who you would like to ask this question

- physiotherapist
- hiring manager
- senior product marketing manager who is good at story telling

or famous invididuals

- act like a legendary investor Warren Buffet
- you are the master storyteller Steve Jobs
-

## Format

Close eyes and imagine what you would like the end result to look like.


eg
- output in table format with column headers: Feedback, Team, and Priority
- output in json format
- output in markdown
- ouutput in paragraphs 

I just received an industry report from my director
first give me the 3 key takeaways them summerize based on topic
use h2 as section headers
here's the report:


### Proofread

`Proofread this email below and correct all typos and grammer mistakes. Bold all changes you make.`

## Tone

`Use a casual tone of voice`
`Use a format tone of voice`
`Give me a witty output`
`Show enthusiasm`
`Sound pessimistic`

But try and convey tone by describing

`I'm writing an email and I want to be taken seriously without coming off as too stuck up and cringy. Ca you please give me a list of 5 tone keywords I can include in a prompt for ChatGPT?`


## Final example

[![alt text](/assets/2023-12-14/8.jpg "email"){:width="500px"}](/assets/2023-12-14/8.jpg)

`Y`