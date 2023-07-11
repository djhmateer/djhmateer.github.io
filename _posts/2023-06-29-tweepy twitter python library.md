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

### Bearer Token

Only use if it is non User related. Otherwise we need to use the way above. The app-only bearer token is by definition app-only and doesn't have a user contxt [source](https://github.com/tweepy/tweepy/discussions/1974)


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

# 280 characters test
message = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas"

# 281 - this fails
# message = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat masx"

try: 
    client.create_tweet(text=message)
except Exception as e:
    # eg 403 Forbidden You are not allowed to create a Tweet with duplicate content
    # 400 Bad Request Your Tweet text is too long. For more information on how Twitter determines text length see https://github.com/twitter/twitter-text.
    # 429 Too Many Requests - if you go over the 50 a day limit for example (free tier)
    print(f'unexpected error creating tweet: \n\n{e}\n')

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

The current max length of a tweet is 280 characters

[https://twitter.com/imPrachiPoddar/status/1671003918665646081](https://twitter.com/imPrachiPoddar/status/1671003918665646081) showing a tweet of 25,000 characters for subscribers aka Twitter Blue.

[https://help.twitter.com/en/using-twitter/twitter-blue](https://help.twitter.com/en/using-twitter/twitter-blue) £9.60 per month.

[https://help.twitter.com/en/using-twitter/verified-organizations#verifiedorgs-pricing](https://help.twitter.com/en/using-twitter/verified-organizations#verifiedorgs-pricing) verified organisation at £1,140 per month.

[![alt text](/assets/2023-06-30/4.jpg "email")](/assets/2023-06-30/4.jpg)

You need a phone number to subscribe, then it needs to be reviewed to get a blue tick.

[notes on who is eligible](https://www.marketingoptimised.com/post/how-long-does-it-take-to-get-blue-tick-on-twitter-blue#:~:text=To%20qualify%20for%20the%20blue,is%20older%20than%207%20days.) my test account may not work.


[![alt text](/assets/2023-06-30/5.jpg "email")](/assets/2023-06-30/5.jpg)

After about a week my test account was `verified` - having no profile. Here is a [tweet with 281 characters](https://twitter.com/pjhemingway/status/1678383700562571265) - the old limit is 280.

Interestingly the API doesn't allow me to post > 280 characters.

[https://docs.tweepy.org/en/stable/client.html#tweepy.Client.create_tweet](https://docs.tweepy.org/en/stable/client.html#tweepy.Client.create_tweet) and [twtitter API ref](https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets)


[https://twittercommunity.com/t/how-to-post-280-4000-characters-via-api-v2/191156](https://twittercommunity.com/t/how-to-post-280-4000-characters-via-api-v2/191156)

[https://twittercommunity.com/t/how-to-post-280-4000-characters-via-api-v2/191156](https://twittercommunity.com/t/how-to-post-280-4000-characters-via-api-v2/191156) insider chat that not available.



## Alternatives to Twitter API Search

[https://github.com/JustAnotherArchivist/snscrape](https://github.com/JustAnotherArchivist/snscrape) 3.7k stars. Python

[https://github.com/n0madic/twitter-scraper](https://github.com/n0madic/twitter-scraper) 564 stars, Go


**News on 1st July 2023**
[https://news.ycombinator.com/item?id=36540957](https://news.ycombinator.com/item?id=36540957) requiring an account to view tweets!


- verified accounts are limited to reading 6000 posts/day
- univerified accounts are limited to reading 600 posts/day
- new unverified accounts to 300 day

## Twitter Professional

[detail](https://business.twitter.com/en/help/account-setup/professional-accounts.html#:~:text=Professionals%20are%20any%20person%20or,their%20livelihood%20is%20a%20professional.)

