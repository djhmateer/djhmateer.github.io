---
layout: post
# title: MSSQL PHP on WSL setup
description: 
menu: review
categories: facebook
published: true 
comments: false     
sitemap: true
image: /assets/2022-09-22/1.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->

<!-- [![alt text](/assets/2022-09-15/fire-map.jpg "email")](/assets/2022-09-15/fire-map.jpg) -->

<!-- [![alt text](/assets/2022-09-15/cookie.jpg "email")](/assets/2022-09-15/cookie.jpg) -->

<!-- ![alt text](/assets/2022-11-03/2.jpg "email")](/assets/2022-11-03/2.jpg) -->

Is it possible to use Facebook's Graph API to get public posted data and images? Essentially rather than scraping it.

Tl;DR - NO :-) See end of article for what I do.

I work in Open Source Human Rights investigations, we want to safely archive images so that they can't disappear from facebook

[https://www.facebook.com/khitthitnews/posts/1637247636712576](https://www.facebook.com/khitthitnews/posts/1637247636712576) is a good example. Which has 1 image in it. It is public facing (you don't need to be logged in to view it).

Other social media platforms make it easy to retrieve public data eg Twitter API, Telegram, TikTok, VK

## Facebook Graph API

[Graph API Get Started](https://developers.facebook.com/docs/graph-api/get-started) describes how to

- Register as a Facebook Developer
- Create a new Facebook App
- Use the [Graph Explorer](https://developers.facebook.com/tools/explorer)

[![alt text](/assets/2022-11-09/1.jpg "email")](/assets/2022-11-09/1.jpg)

token is valid for 90 minutes

notice the app needs permission to access `email` address.

## me Node

A Node is a thing.. eg Post, User


```bash
# me (gives name and id by default)
# me?fields=id,name,email

{
  "id": "10166951349825331",
  "name": "Dave Mateer",
  "email": "davemateer@gmail.com"
}
```

If you click on the id in the explorer you'll get

```bash
# 10166951349825331
{
  "name": "Dave Mateer",
  "id": "10166951349825331"
}

```

## Post Node

you'll need user_posts permissions

On the `User Node`, looking at all `Posts` for that User.

```bash
# 10166951349825331?fields=id,name,email,posts
{
  "id": "10166951349825331",
  "name": "Dave Mateer",
  "email": "davemateer@gmail.com",
  "posts": {
    "data": [
      {
        "created_time": "2022-07-11T10:25:46+0000",
        "message": "Hi Everyone - this is a test public video for a project I'm working on!",
        "id": "10166951349825331_10166561853820331"
      },
      {
        "created_time": "2022-06-03T09:16:34+0000",
        "message": "Resting tree. Going up the hill last night for Jubilee beacon lighting.",
        "id": "10166951349825331_10166448187020331"
      },

```

Clicking on one of the `Posts Nodes`

```bash
# 10166951349825331_10166448187020331?fields=id, created_time, message, full_picture
{
  "id": "10166951349825331_10166448187020331",
  "created_time": "2022-06-03T09:16:34+0000",
  "message": "Resting tree. Going up the hill last night for Jubilee beacon lighting.",
  "full_picture": "https://scontent.ffab1-2.fna.fbcdn.net/v/t39.30808-6/283266029_10166448185560331_1411838295880156780_n.jpg?stp=dst-jpg_p180x540&_nc_cat=104&ccb=1-7&_nc_sid=8024bb&_nc_ohc=ddn5e7zlZT8AX94BWAp&_nc_ht=scontent.ffab1-2.fna&edm=ADqbNqUEAAAA&oh=00_AfC69LxOJAlLuGhenIjzq02FA0x1TwJ7DIJEBOApWOf82w&oe=6371570B"
}
```

## Photos Edge

An Edge is a collection? or a connection between 2 nodes.

```bash
# all photos from User Node.
# 10166951349825331/photos
{
  "data": [
    {
      "created_time": "2013-04-21T09:55:31+0000",
      "name": "Ellie and I with the 7 sisters in the background.  Sussex.",
      "id": "10152770795170331"
    },
    {
      "created_time": "2010-02-07T21:09:46+0000",
      "name": "Victoria Park :-)",
      "id": "476048985330"
    }, ...

```

## Photo Node

```bash
# all different sizes of photos
# 10152770795170331?fields=name,created_time,images
{
  "name": "Ellie and I with the 7 sisters in the background.  Sussex.",
  "created_time": "2013-04-21T09:55:31+0000",
  "images": [
    {
      "height": 639,
      "source": "https://scontent.ffab1-2.fna.fbcdn.net/v/t1.18169-9/532862_10152770795170331_944541926_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd7718&_nc_ohc=R6GcykLnruYAX9CwLbp&_nc_ht=scontent.ffab1-2.fna&edm=AMAeTUEEAAAA&oh=00_AfClXYDQpZyQ_dvVtL-pbK_5vOUWG1nKXXEOZfwDd3sgLA&oe=63933675",
      "width": 852
    },...
    {
      "height": 225,
      "source": "https://scontent.ffab1-2.fna.fbcdn.net/v/t1.18169-9/532862_10152770795170331_944541926_n.jpg?stp=dst-jpg_p75x225&_nc_cat=106&ccb=1-7&_nc_sid=dd7718&_nc_ohc=R6GcykLnruYAX9CwLbp&_nc_ht=scontent.ffab1-2.fna&edm=AMAeTUEEAAAA&oh=00_AfA7kYNJzjq0cvNSES01-2b55DgCkCUCQTkr_uokG_tIIA&oe=63933675",
      "width": 300
    }
  ],
  "id": "10152770795170331"
}
```

## Can I query a public post in the same way?

[https://mobile.facebook.com/khitthitnews/posts/pfbid0PTvT6iAccWqatvbDQNuqpFwL5WKzHuLK4QjP97Fwut637CV3XXQU53z1s2bJMAKwl](https://mobile.facebook.com/khitthitnews/posts/pfbid0PTvT6iAccWqatvbDQNuqpFwL5WKzHuLK4QjP97Fwut637CV3XXQU53z1s2bJMAKwl) link to a post

[https://www.facebook.com/photo/?fbid=1329142910787472](https://www.facebook.com/photo/?fbid=1329142910787472) link to a photo

I know the ID of khitthitnews is 1646726009098072

```bash
# 1646726009098072
{
  "error": {
    "message": "(#10) This endpoint requires the 'pages_read_engagement' permission or the 'Page Public Content Access' feature. Refer to https://developers.facebook.com/docs/apps/review/login-permissions#manage-pages and https://developers.facebook.com/docs/apps/review/feature#reference-PAGES_ACCESS for details.",
    "type": "OAuthException",
    "code": 10,
    "fbtrace_id": "AaU8dElApqiYPX1kSrfhpyi"
  }
}
```

## page_public_content_access

[docs](https://developers.facebook.com/docs/features-reference/page-public-content-access)

> The Page Public Content Access feature allows your app access to the Pages Search API and to read public data for Pages

But the allowed usage is for `competitive benchmark analysis`

[stackoverflow](https://stackoverflow.com/questions/50455988/facebook-pages-api-page-public-content-access-review-screencast)


## server-to-server apps

[server-to-server apps](https://developers.facebook.com/docs/development/create-an-app/server-to-server-apps) is what I would like to use, but probably not enough access.

## Workarounds

[apify](https://blog.apify.com/how-to-scrape-facebook-pages-posts-comments-photos-and-more/) good background on legality, issues with datacentre scraping. I couldn't get their crawler working on FB  though.

[https://www.scrapingbee.com/](https://www.scrapingbee.com/)


## scapers doing good
[https://apify.com/web-scraping#benefit-humanity](https://apify.com/web-scraping#benefit-humanity)

[https://brightinitiative.com/](https://brightinitiative.com/)





[https://phantombuster.com/](https://phantombuster.com/)


[https://brightdata.com/legality-of-web-data-collection](https://brightdata.com/legality-of-web-data-collection)


[https://proxycrawl.com/how-to-scrape-facebook](https://proxycrawl.com/how-to-scrape-facebook)