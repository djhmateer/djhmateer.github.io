---
layout: post
title: ChatGPT4 Vision 
description: 
# menu: review
categories: ai 
published: true 
comments: false     
sitemap: true
image: /assets/2024-01-15/1.jpg
---

<!-- [![alt text](/assets/2023-10-10/3.jpg "email"){:width="600px"}](/assets/2023-10-10/3.jpg) -->
<!-- [![alt text](/assets/2023-10-30/1.jpg "email")](/assets/2023-10-30/1.jpg) -->

Update 15th Jan 2024 - this is a great API and describes images very well for my use case. I'm comparing it with [open source](/2023/12/14/llm-open-source-vision-image-analysis) - LLaVA and Mixtral 7B.


## Describe an Image

I'm working in human rights investigations. To mitigate trauma for myself and other investigators, I want the AI to descibe in non emotional terms what is in the image.

`could you give a 1 sentence general description of this image please. Also identify objects, people, scenes. Can you also tell me if this would be classified as a traumatic picture for someone to look at`


### Simple Description in 5 words
`describe this image in 5 words`

`describe this image in 1 sentence using non emotional language`


### Traumatic Rating

`give traumatic rating on a scale of 1 - 5`

Even these 2 very simple queries are super useful. 


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

It seemed to be on more sensitive photos. Also it could be the max_tokens limit.

## Final Code

Here is what I used in my final production code with [prompt engineering](/2023/12/14/llm-open-source-vision-image-analysis#prompt-engineering) thought out.

code is in gpt-vision-api/7spreadsheet-chatgpt

[![alt text](/assets/2024-01-15/1.jpg "email")](/assets/2024-01-15/1.jpg)

Structure of test project

```py
import base64
from dotenv import load_dotenv
import os
import gspread
from loguru import logger
from openai import OpenAI
import json

def call_gpt_vision(image_path, text):
    load_dotenv()
    api_key = os.getenv('OPENAI_API_KEY')

    def encode_image(image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    # Getting the base64 string
    base64_image = encode_image(image_path)

    # do I even need the api key?
    client = OpenAI(api_key=api_key)

    completion = client.chat.completions.create(
    model="gpt-4-vision-preview", 
    messages=[
        {
        "role": "user",
        "content": [
            {"type": "text", "text": text},
            {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}"
            },
            },
        ],
        }
    ],
    # https://platform.openai.com/docs/api-reference/chat/create#chat-create-response_format
    # response_format="json_object",
    # max_tokens=2000,
    max_tokens=600,
    stream=True
    )

    content = ""
    for chunk in completion:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="",flush=True)
            content = content + chunk.choices[0].delta.content

    logger.debug(content)
    return content

def main():
    # note 0 based when using get_all_values as referencing a python list
    # for writing using gspread I have to add 1
    entry_number_column_index = 0
    llm_violence_column_index = 4
    llm_5_words_column_index = 5
    llm_1_sentence_column_index = 6
    llm_full_column_index = 7
    archive_status_column_index = 9

    # read Entry Number from spreadsheet
    # look for directory with same name
    # send image to be analysed
    # write result to spreadsheet

    # 1.spreadsheeet
    # Authenticate using the JSON key file
    gc = gspread.service_account(filename='secrets/service_account.json')

    # Open the spreadsheet by its title or URL
    spreadsheet_title = 'AA Demo Main'

    sh = gc.open(spreadsheet_title)

    worksheet = sh.sheet1

    # Read data from the worksheet
    # get all values - so we don't do calls on each row
    all_values = worksheet.get_all_values()


    # iterate over each Entry Number
    row_index = 1
    # for entry_number in entry_numbers[1:6]: # skip first row which is the header, and slice.. gives up to 004
    for row in all_values[1:]: # skip first row which is the header, and slice
        entry_number = row[entry_number_column_index]
        row_index = row_index + 1

        if entry_number is None or entry_number == "":
            # logger.debug(f'ignoring row as no entry number: {row_index}')
            continue

        # only process if archiver status is blank
        archive_status = row[archive_status_column_index]
        if archive_status is None or archive_status == "": 
            pass
        else:
            # logger.debug(f'ignoring row: {row_index}')
            continue

        logger.info(f'row_index: {row_index} entry_number: {entry_number}')

        # does a directory exist with this name?
        subdirectory = f'pics/{entry_number}'
        if not os.path.exists(subdirectory) or not os.path.isdir(subdirectory):
            # logger.debug(f"The specified path is not a valid directory: {subdirectory}")
            continue # the for loop
            
        files = []
        for f in os.listdir(subdirectory):
            if os.path.isfile(os.path.join(subdirectory, f)):
                if f.lower().endswith('.jpg'):
                    files.append(f)

        # Iterate over each image file in the subdirectory
        for file in files:
            logger.debug(f'Calling ChatGPT-4 to analyse this image {file} for Entry Number {entry_number}')
            
            # Path and filename
            image_path = subdirectory + '/' + file

            # 1. Traumatic Violence Level

#Foo1
            text = """

You are a senior human rights investigator.

You are investigating war crimes and human rights violations in myanmar.

Analyse this photo and give a long summary of it. You should focus on anything to do with human rights eg war, guns, blood, destruction


Give a rating from 1 to 5 as to how sensitive / traumatic / violence level for a person to look at it would be.

For example an image with human deaths or graphic human suffering would be a 5 (very severe), burned out village with property damage would be a 3,
 destroyed buildings 3, whereas an landscape scene / nothing traumatic would be a 1 (no violence), civilian equipment eg a crane would be a 1.
   Only give a high rating if it is truly horrible or traumatic - ie a 5 should only be given for human remains etc..


Use clear and concise non emotive language in formal tone.

Output in a valid json format with header: rating, summary, shortsummary
"""

# Lets think step by step, and give a detailed reason why you gave a rating. Put this into the stepbystep output.

        # Foo2
            # text = """
            # Describe in detail what you see in this image. You are a human rights investigator. This image is from a war torn part of the world
            # """

            gpt_result = call_gpt_vision(image_path, text)

            # logger.debug(f'llm violence result is {gpt_result}')

            # # put into LLM full column for testing
            # # maybe another model is better at doing 1 - 5 violence level eg mixtral 7b
            # worksheet.update_cell(row_index, llm_full_column_index +1, gpt_result)
            # continue
        #Foo2 end


            # Convert to GPT-4 output to Python dictionary

            # for conversion to work I need to 
            # strip off ```json at start
            # strip off ``` at end
            foo = gpt_result.replace("```json\n", "", 1)
            foo = foo.replace("```", "", 1)
            
            try:
              data = json.loads(foo)
            except:
                logger.error("Can' decode json")
                continue

            rating = str(data["rating"])
            summary = data["summary"]
            # shortsummary = data["shortsummary"]
            shortsummary = data.get('shortsummary', '')

            # 1.violence level
            current_value = worksheet.cell(row_index, llm_violence_column_index+1).value

            new_value = ""
            foo = ""
            if current_value:
                new_value = current_value + '\n\n' + foo + rating
            else:
                new_value = foo + rating
            worksheet.update_cell(row_index, llm_violence_column_index+1, new_value)

            # 2. Describe in 5 words
            current_value = worksheet.cell(row_index, llm_5_words_column_index+1).value
            new_value = ""
            foo = ""
            if current_value:
                new_value = current_value + '\n\n' + foo + shortsummary
            else:
                new_value = foo + shortsummary

            worksheet.update_cell(row_index, llm_5_words_column_index+1, new_value)

            # 3. Describe in 1 sentence
            current_value = worksheet.cell(row_index, llm_1_sentence_column_index+1).value
            new_value = ""
            foo = ""
            if current_value:
               new_value = current_value + '\n\n' + foo + summary
            else:
               new_value = foo + summary

            worksheet.update_cell(row_index, llm_1_sentence_column_index+1, new_value)

if __name__ == "__main__":
    logger.add("logs/0trace.log", level="TRACE", rotation="00:00")
    main()

```


