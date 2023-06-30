---
layout: post
title: Tweepy and Twitter 
description: Accessing the free Twitter API with new limits and what you can now do 
# menu: review
categories: twitter
published: true 
comments: false     
sitemap: true
image: /assets/2023-06-30/1.jpg
---

<!-- [![alt text](/assets/2023-04-29/7.jpg "email"){:width="800px"}](/assets/2023-04-29/7.jpg) -->

As of 30th June 2023, here is the status of the Twitter API, and what you can do, and how to do it.

[https://developer.twitter.com/en/portal/](https://developer.twitter.com/en/portal/) is the developer portal


[Tweepy](https://docs.tweepy.org/en/latest/getting_started.html) and [https://github.com/tweepy/tweepy](https://github.com/tweepy/tweepy) is the Python wrapper I'm using. [tweepy.org](https://www.tweepy.org/) link to discord chat which is very active.

## Setup

Sign up to the `Free` developer account on [https://developer.twitter.com/en/portal/](https://developer.twitter.com/en/portal/). 

<!-- [![alt text](/assets/2023-04-29/6.jpg "email"){:width="800px"}](/assets/2023-04-29/6.jpg) -->

<!-- [![alt text](/assets/2023-06-30/1.jpg "email"){:width="800px"}](/assets/2023-06-30/1.jpg) -->
[![alt text](/assets/2023-06-30/1.jpg "email")](/assets/2023-06-30/1.jpg)

This was created by default for a newly signed up developer account. Notice App has to be in a Project. If things stop working, check it hasn't moved to be a standalone app (which can happen if the app gets suspended I believe)


[![alt text](/assets/2023-06-30/2.jpg "email")](/assets/2023-06-30/2.jpg)


Setting user authentiction settings (click on the `Set up` link inside the App which is inside the Project)

App permissions - which enable OAuth 1.0a Authentication
 - Read and write (we can't read on free tier, so just using write)

You'll need to setup the OAuth2.0 auth as well, and it gives you the keys, even though I don't need to use that. 

## Secrets

Are on the `App`

[![alt text](/assets/2023-06-30/3.jpg "email")](/assets/2023-06-30/3.jpg)

Just need these tokens


### Consumer Keys

Like username and password for your `App`

- API Key
- API Key Secret

### Authentication Tokens

In general these represent the `User` that you are making a request on behalf of [source](https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api)

- Access Token
- Access Token Secret

You'll need to generate these 4 above


## Example - Calling Twitter API v2 with OAuth 1.0a Authentication

```py
import tweepy
import time

# AutoArchiver2App / Keys and Tokens / Consumer Keys / API Key and Secret 
consumer_key="secret"
consumer_secret="secret"

# AutoArchiver2App / Keys and Token / Authentication Tokens / Access Token and Secret
access_token="secret"
access_token_secret="secret"

# Tweepy's interface for make requests to Twitter API v2
client = tweepy.Client(
    consumer_key=consumer_key,
    consumer_secret=consumer_secret,
    access_token=access_token,
    access_token_secret=access_token_secret
)

# as can't have 2 exactly the same tweets in a row so put in a time
message = f"Hello Twitter from tweepy - hitting Twitter API v2 with OAuth 1.0a Authentication at unixtime {time.time()}. Please ignore :-)"
client.create_tweet(text=message)
```

## Limits on the Free API access

[About the Twitter API and Access levels](https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api#v2-access-level)

- Tweet creation

1,500 Tweets posted per month

## Types of Access

Here are the highlights:

- Free. 1,500 Tweets Post per month limit. No Pull of tweets.

- Basic ($100/month). 3,000 Tweets post per month. 10,0000 Pull per month

- Pro ($5000/month)

- Enterprise

- Academic Research access [https://developer.twitter.com/en/products/twitter-api/academic-research/application-info](https://developer.twitter.com/en/products/twitter-api/academic-research/application-info) looks like not accepting new applications currently.


## Rate Limits

[https://developer.twitter.com/en/docs/twitter-api/rate-limits](https://developer.twitter.com/en/docs/twitter-api/rate-limits)

- Free .. 50 Tweets per 24 hours. Giving 1,500 Tweets per month
- Basic .. 100 Tweets per 24 hours. Giving 3,000 Tweets per month

## Length of Tweets

[https://twitter.com/imPrachiPoddar/status/1671003918665646081](https://twitter.com/imPrachiPoddar/status/1671003918665646081) showing a tweet of 25,000 characters for subscribers aka Twitter Blue.

[https://help.twitter.com/en/using-twitter/twitter-blue](https://help.twitter.com/en/using-twitter/twitter-blue) £9.60 per month.

[https://help.twitter.com/en/using-twitter/verified-organizations#verifiedorgs-pricing](https://help.twitter.com/en/using-twitter/verified-organizations#verifiedorgs-pricing) verified organisation at £1,140 per month.

## Alternatives to Twitter API Search

[https://github.com/JustAnotherArchivist/snscrape](https://github.com/JustAnotherArchivist/snscrape) 3.7k stars. Python

[https://github.com/n0madic/twitter-scraper](https://github.com/n0madic/twitter-scraper) 564 stars, Go

