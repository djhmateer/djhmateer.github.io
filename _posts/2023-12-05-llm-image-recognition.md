---
layout: post
title: ChatGPT4 Vision 
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

Summary so far for AI


1. Coding / technical - ChatGPT4 is my go to. For technical problems I use an LLM first, Google second. eg how do I install Wordpress on Linux
2. Assimilating information and summerising  - I was sent an NDA to sign. Paste it into an LLM and it is invaluable.
3. Generation (text / image) - generating content / images - great for demo websites
4. Coversation (chatbots) - good for kids to explore with
5. Knowledge accessibility 

6. Images - see below


Image Analysis

Image Description into English

Image 


## Describe an Image

I'm working in human rights investigations. To mitigate trauma for myself and other investigators, I want the AI to descibe in non emotional terms what is in the image.

`could you give a 1 sentence general description of this image please. Also identify objects, people, scenes. Can you also tell me if this would be classified as a traumatic picture for someone to look at`


### Simple Description in 5 words
`describe this image in 5 words`

`describe this image in 1 sentence using non emotional language`


### Traumatic Rating

`give traumatic rating on a scale of 1 - 5`

Even these 2 very simple queries are super useful. 


## Which LLMs are good?

ChatGPT4 looks good, but will be expensive. Lets find out if there are any other more suited models

ideally I wwant to run these models myself via an API
 as have 10's thousands


[https://llava-vl.github.io/](https://llava-vl.github.io/) look into?

[https://lmstudio.ai/](https://lmstudio.ai/) perhaps this is useful?


## Chat GPT-4 API

[https://platform.openai.com/](https://platform.openai.com/) and the [vision](https://platform.openai.com/docs/guides/vision) documentation.

```python
# I couldn't get conda working so using pipenv (see previous blog article on virtual envs for more detail)

# created a new Pipfile defaulting to python 3.11.6.. my base is 3.10.12
pipenv install

# to explore inside the shell
pipenv shell

# run the program
pipenv run foo.py

# add to Pipfile
openai = "*"

# get new dependencies
pipenv update

# remember in VSCode to select the interpreter inside the pipenv environment
```

Frist program:

```py
from openai import OpenAI

# notice that it magically loaded the api key from the .env file
client = OpenAI()

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)

message = completion.choices[0].message
content = message.content
# displays \n as line feeds
print(content)
```

[https://platform.openai.com/usage](https://platform.openai.com/usage) - can see that running this a few times costs a tiny bit of mnoney eg 0.01

## Vision

```py
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4-vision-preview",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What’s in this image?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
          },
        },
      ],
    }
  ],
  max_tokens=300,
)

print(response.choices[0])
```

[![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg "email"){:width="600px"}](https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg)

Output is

> The image shows a wooden boardwalk pathway extending into the distance through a lush green wetland area or meadow. The grass and vegetation on either side are tall and dense, indicating a healthy, natural habitat that could be home to a variety of wildlife. The sky is predominantly blue with some scattered white clouds. The lighting suggests it could be late afternoon or early evening when the photo was taken, due to the soft glow and long shadows. The scenery looks peaceful and serene, ideal for a nature walk or to simply enjoy the outdoor environment


cost was around $0.015. It tool 1,226 tokens for this 1 request.

## Send an image

Rather than a public URL we can send an image as a base64 encoded verstion.


```py
import base64
import requests
from dotenv import load_dotenv
import os

# lets load from the .env file using python-dotenv which is in Pipfile
load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')


# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "pics/hchestnut.jpg"

# Getting the base64 string
base64_image = encode_image(image_path)

headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {api_key}"
}

payload = {
  "model": "gpt-4-vision-preview",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What’s in this image?"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": f"data:image/jpeg;base64,{base64_image}"
          }
        }
      ]
    }
  ],
  "max_tokens": 300
}

response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

print(response.json())
```

[![alt text](https://pbs.twimg.com/media/FSeMVBsWUAMDEun?format=jpg&name=large "email"){:width="600px"}](https://pbs.twimg.com/media/FSeMVBsWUAMDEun?format=jpg&name=large)

> The image shows a cluster of white flowers with prominent pink spots and numerous stamens extending outward, creating a frilly appearance. The flowers are likely part of a single inflorescence, which is a cluster of flowers arranged on a stem that is composed of a main branch or a complicated arrangement of branches. The inflorescence is surrounded by green leaves with serrated margins. The flowers could possibly belong to a tree or large shrub, and the structure suggests that they might be part of the family Rosaceae, which includes many flowering trees and shrubs, though without more specific information or context, it is difficult to identify the exact species. The overall setting appears to be an outdoor area with abundant foliage, indicative of a garden or natural area.


# Specific questions

This question sometimes didn't work on ChatGPT-4

`Is this a sensitive picture? please give 1 word summary. give a rating from 1 to 5 as to how sensitive it is please. summerise in 1 sentence`

Errors like:

> I'm sorry, I can't assist with this request.

It seemed to be on more sensitive photos.

## Videos

I tried a sample aa005 mp4 video and it failed to analyse it.
