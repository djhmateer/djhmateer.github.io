---
layout: post
title: 
description: 
menu: review
categories: agentic 
published: true 
comments: false     
sitemap: false
image: /assets/2026-07-01/1.jpg
---

[![alt text](/assets/2026-07-01/1.jpg "ii")](/assets/2026-06-01/1.jpg)


## TL;DR

I'm classifying around 10k songs using open source LLMs. qwen3.6:35b was the winner (even compared to huge models on expensive hardware). My CPU machine (64GB of DDR5 RAM) took about 10 hours. On a RunPod RTX A5000/A40/L4/RTX 4090 class ie 24GB+RAM card, it took under 2 hours.


## Intro

[https://github.com/djhmateer/llm-mp3-perf-test](https://github.com/djhmateer/llm-mp3-perf-test) is the public repo

mp3 chooser is my private repo

This started as an annoyance that I've got a lot of music on my computer, but listen to the same playlist over and over. So lets test llm's to see if it can find hidden gems in my system that I've not listened to for a long time.

Essentially for each mp3 file, classify the song by giving it a rating.


What I learned what the that MoE (Mixture of Experts) model qwen3.6:35b-a3b worked really well on my 64GB DDR5 machine. It took 10 hours to process all of my songs.

## All Models Tested — Master Table

Every model tested, winner at top. TPS/quality numbers are from the largest reliable sample available for that model (200-song where possible; smaller samples noted). Same model tested on multiple hardware appears as separate rows.

| Model | Hardware | Sample | TPS | s/song | Null% | Mean Rating | Std Dev (higher better) | 90+% | Status |
|-------|----------|--------|-----|--------|-------|------|---------|------|--------|
| **qwen3.6:35b** | CPU DDR5 | 200 | 7.9 | 3.48s | **8%** | 71.7 | **11.8** | 5% | **Winner** |
| **qwen3.6:35b** | GPU RTX A5000 | 200 | 45.5 | 0.60s | 7% | 71.2 | 12.4 | 4.8% | **Winner — GPU confirmed** |
| **qwen3.6:35b** | CPU DDR5 (full library) | 10,531 | 7.4 / 7.2 | 3.70–3.81s | 4.1% | 71.3 | 12.1 | 3.5–3.6% | **Winner — full-scale confirmed (×2 runs)** |
| **qwen3.6:35b** | GPU B200 | 200 | 125.3 | 0.22s | 8% | 71.0 | 11.6 | 3.8% | **Winner — fastest GPU tested** |
| qwen3:30b-instruct | CPU DDR5 | 200 | 12.9 | 2.22s | 11% | 78.4 | 9.5 | 8% | Runner-up (speed) |
| gemma4:26b | CPU DDR5 | 200 | 6.9 | 4.03s | 23% | 76.5 | 10.2 | 10% | Runner-up (quality), null above target |
| mistral-small3.2:24b | CPU DDR5 | 200 | 2.6 | 10.12s | 34% | 72.2 | 12.0 | 6% | Eliminated — too many nulls |
| deepseek-r1:32b | CPU DDR5 | 200 | 2.0 | 59.77s | 25% | 66.6 | 9.8 | 0% | Eliminated — `think=False` ignored, 190s TTFT |
| phi4:14b | CPU DDR5 | 200 | 3.9 | 5.63s | 34% | 74.8 | 6.4 | 5% | Eliminated — worst rating spread |
| qwen3.5:122b-a10b | GPU A100 PCIe | 200 | 11.1 | 2.45s | 20% | 74.1 | 11.4 | 8% | Eliminated — worse recall than winner, 4x slower, ~20x costlier |
| command-r:35b | CPU DDR5 | 32 | 2.0 | 12.16s | 44% | — | — | — | Eliminated — major music-knowledge gaps |
| qwen3:235b-a22b | GPU B200 | 32 (smoke test) | 12.3 | 1.52s | 78% reported (~16% true) | 80.1 | 6.4 | 0% | Eliminated — format-adherence bug (omits `rating` field) |
| qwen2.5:32b | CPU DDR5 | — | 2.1 | — | 36% | — | 8.1 | — | Eliminated — superseded |
| llama3.3:70b | CPU DDR5 | — | — | — | 38% | — | — | — | Eliminated — poor music knowledge (Meta) |
| qwen3.6:35b-a3b-q8_0 | CPU DDR5 | 32 | 6.6 | 4.20s | — | — | — | — | Eliminated — 14% slower than Q4, no quality gain |
| qwen2.5:72b | GPU A40 | 32 | 1.1 | 23.4s | 15.6% | 74.3 | 9.2 | 0% | **Inconclusive** — likely CPU fallback (47GB dense model barely fits 48GB card); retest on A100 pending |
| qwen2.5:72b | CPU DDR5 | — | 0.8 | — | — | — | — | — | Untested for quality — too slow for a real sample |
| qwen3.6:27b-q8_0 | CPU DDR5 | 32 | 1.0 | 27.49s | — | — | — | — | Eliminated — Q8 hits memory bandwidth wall at this size |
| qwen3:8b | CPU DDR4 (WSL2) | — | — | — | 28% | — | 7.5 | — | Eliminated — too small |
| qwen3:14b | CPU DDR4 (WSL2) | — | — | 9.7s | 31% | — | 10.3 | — | Eliminated — slow, high null |
| qwen3:32b | CPU DDR4 (WSL2) | — | 1.1 | — | — | — | — | — | Eliminated — same speed as qwen2.5:32b, worse quality |
| qwen2.5:72b | CPU DDR4 (WSL2, 32GB) | — | — | — | — | — | — | — | Eliminated — OOM (~45GB model, ~32GB RAM) |

Mean rating tells us if the model's calibration is right (~65 average = correctly humble about most songs being just "OK"), and std dev tells you whether it's actually making judgment calls rather than hedging toward the middle

## RunPod

[https://console.runpod.io/](https://console.runpod.io/) - $10 is thier minimum spend. Often the GPU's are not available, so either wait or choose a similar one.

## Openrouter

**TODO - not tried this yet. Will be interesting to see which models here would be good**

there are some free models too.

there are many interesting qwen models to try.


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

Ended up putting in a support ticket to see if I could request this lowest tier of GPU I couldn't 





My 64GB DDR5 CPU machine having been left overnight to process - using tmux so can reconnect in morning. 10 hours to process all 10k songs using qwen3.6:35b MoE LLM.