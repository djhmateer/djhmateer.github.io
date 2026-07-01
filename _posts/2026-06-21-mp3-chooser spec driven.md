---
layout: post
title: 
description: 
menu: review
categories: agentic 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---


[![alt text](/assets/2026-07-01/1.jpg "ii")](/assets/2026-06-01/1.jpg)

My 64GB DDR5 CPU machine having been left overnight to process - using tmux so can reconnect in morning. 10 hours to process all 10k songs using qwen3.6:35b MoE LLM.


[https://github.com/djhmateer/llm-mp3-perf-test](https://github.com/djhmateer/llm-mp3-perf-test) is the public repo

mp3 chooser is my private repo

This started as an annoyance that I've got a lot of music on my computer, but listen to the same playlist over and over. So lets test llm's to see if it can find hidden gems in my system that I've not listened to for a long time.

Essentially for each mp3 file, classify the song by giving it a rating.


## Local LLM

I put results [here]() but here is a summary:


| Rank | Model | TPS | Std dev | Null% | Mean | Verdict |
|------|-------|-----|---------|-------|------|---------|
| 1 | **qwen3.6:35b** | 7.9 | **11.8** | **8%** | 71.7 | 🏆 Winner — best quality on every metric |
| 2 | mistral-small3.2:24b | 2.6 | 12.0 | 34% | 72.2 | High spread but way too many nulls |
| 3 | qwen3:30b-instruct | 12.9 | 9.5 | 11% | 78.4 | Runner-up (fastest) — rates too generously |
| 4 | gemma4:26b | 6.9 | 10.2 | 23% | 76.5 | Runner-up (quality) — decent but generous |
| 5 | deepseek-r1:32b | 2.0 | 9.8 | 25% | 66.6 | Good calibration but unusably slow (190s TTFT) |
| 6 | phi4:14b | 3.9 | 6.4 | 34% | 74.8 | Terrible spread — can't tell decent from classic |
| — | qwen3.6:35b-a3b-q8_0 | 6.6 | — | — | — | Q8 of the winner — 14% slower, no quality gain |
| — | qwen3.6:27b-q8_0 | 1.0 | — | — | — | Memory bandwidth wall — ~80h for full library |
| — | command-r:35b | 2.0 | — | 44% | — | Major music knowledge gaps (Cohere) |
| — | qwen2.5:32b | 2.1 | — | 36% | — | Superseded by qwen3.6 |
| — | llama3.3:70b | — | — | 38% | — | Meta models lack music knowledge |
| — | qwen2.5:72b | 0.8 | — | — | — | Too slow on CPU — GPU only |
| — | qwen3:32b | 1.1 | — | — | — | Same speed as qwen2.5:32b, worse quality |
| — | qwen3:14b | — | 10.3 | 31% | — | Slow (9.7s/song), too many nulls |
| — | qwen3:8b | — | 7.5 | 28% | — | Too small — weak spread and knowledge |


What I learned what the that MoE (Mixture of Experts) model qwen3.6:35b-a3b worked really well on my 64GB DDR5 machine. It took 10 hours to process all of my songs.


## Cloud LLM - Azure

I tried Azure (as have got an MSDN subscription credits), but proving hard to request 

https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/overview

Requesting quota (enter quota in top search resources) for .  filter by nv..or by a10

Standard NVADSA10v5 Family vCPUs  - 1
Standard NDASv4_A100 Family vCPUs - 2 **this is wrong - massive 8GPU per vm**

In UK West (most other regions had warnings as to not available or low availability)

I'm on a free developer account, so no idea if it will work.

"We were unable to adjust your quota.
Standard NDASv4_A100 Family vCPUs, UK West, Visual Studio Enterprise and 1 other quotas cannot be adjusted at this time. To follow up on unfulfilled requests, contact the support team."


Standard NCASv3_T4 Family vCPUs

Ended up putting in a support ticket to see if I could request this lowest tier of GPU






## Foo

```bash
curl -fsSL https://ollama.com/install.sh | sh

# fast and 2GB
ollama pull qwen2.5:3b

# 9GB
ollama pull qwen2.5:14b

# needs 20GB ram which shoudl fit in default alloc of 32GB on a 64GB RAM machine
ollama pull qwen2.5:32b
```


```python
uv run python phase0.5_llm_poc/llm_poc.py --path "The Beatles/Abbey Road/01 Come Together.mp3"

uv run python phase0.5_llm_poc/llm_poc.py --all --model qwen2.5:3b

uv run python phase0.5_llm_poc/llm_poc.py --all --model qwen2.5:14b

uv run python phase0.5_llm_poc/llm_poc.py --all --model qwen2.5:32b
```


