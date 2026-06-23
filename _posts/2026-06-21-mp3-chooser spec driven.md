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


<!-- [![alt text](/assets/2026-05-20/1.jpg "ii")](/assets/2026-05-20/1.jpg) -->

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


