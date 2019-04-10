---
layout: post
title: Twitter Card, Open Graph and Site previews **Work in Progress**
description: Twitter Card and  Open Graph looking at how to get previews working in Twitter, Teams, Slack, Facebook, WhatsApp, LinkedIn. Also looking at the jekyll-seo-tag plugin. 
menu: review
categories: TwitterCard OpenGraph
published: true 
comments: false
sitemap: false
image: /assets/2019-04-05/1.jpg
---

Ever wondered how to get previews of blog post articles on:

- Twitter
- Microsoft Teams 
- Slack
- Facebook
- Whats App
- LinkedIn

![ps](/assets/2019-04-07/1.png)  
This is summary_large_image

![ps](/assets/2019-04-07/2.png)  
This is summary

## Twitter Card
[Twitter Card documentation](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started)

[Twitter Card Validator](https://cards-dev.twitter.com/validator) gives you a preview of what a tweet will look like.  
The underlying code needed to render my page is:

### Jekyll-seo-tag
This is very different from the twitter documentation. I'm using [Jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag)
```html
<!-- can be summary, summary_large_image, app, player-->
<meta name="twitter:card" content="summary_large_image" />
<!-- your twitter username -->
<meta name="twitter:site" content="@dave_mateer" />
```
Content is cached on Twitter for 7 days after a link to a card markup has been published in a tweet.

## Open Graph
Twitter first checks it's own cards tags, then falls back to Open Graph

```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@nytimesbits" />
<meta name="twitter:creator" content="@nickbilton" />
<meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
<meta property="og:title" content="A Twitter for My Sister" />
<meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />
<meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />
```

and on my site:

```html
<meta property="og:title" content="Functional Programming in C# - Expressions, Option, Either" />
<meta property="og:locale" content="en_US" />
<meta name="description" content="Making C# more functional by using abstractions. It has been preceeded by 2 articles on why I’ve got to here, and the background reasons behind trying functional programming in C#." />
<meta property="og:description" content="Making C# more functional by using abstractions. It has been preceeded by 2 articles on why I’ve got to here, and the background reasons behind trying functional programming in C#." />
<link rel="canonical" href="https://davemateer.com/2019/03/12/Functional-Programming-in-C-Sharp-Expressions-Options-Either" />
<meta property="og:url" content="https://davemateer.com/2019/03/12/Functional-Programming-in-C-Sharp-Expressions-Options-Either" />
<meta property="og:site_name" content="Dave Mateer’s Blog" />
<meta property="og:image" content="https://davemateer.com/assets/2019-04-05/2.jpg" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2019-03-12T00:00:00+00:00" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@dave_mateer" />
<script type="application/ld+json">
{"mainEntityOfPage":{"@type":"WebPage","@id":"https://davemateer.com/2019/03/12/Functional-Programming-in-C-Sharp-Expressions-Options-Either"},"@type":"BlogPosting","url":"https://davemateer.com/2019/03/12/Functional-Programming-in-C-Sharp-Expressions-Options-Either","dateModified":"2019-03-12T00:00:00+00:00","datePublished":"2019-03-12T00:00:00+00:00","headline":"Functional Programming in C# - Expressions, Option, Either","image":"https://davemateer.com/assets/2019-04-05/2.jpg","description":"Making C# more functional by using abstractions. It has been preceeded by 2 articles on why I’ve got to here, and the background reasons behind trying functional programming in C#.","@context":"http://schema.org"}</script>
```

So here the plugin is only using 2 twitter tags, then using the Open Graph for the rest.  

## LinkedIn
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/inspect/)  

Have an author tag:  
```html
 <meta name="author" content="Dave Mateer">
```

Make sure description is at least 100 characters long

## Chrome Plugin
[Open Graph Preview Chrome plugin](https://chrome.google.com/webstore/detail/open-graph-preview/ehaigphokkgebnmdiicabhjhddkaekgh?hl=en) which renders for:
- facebook
- twitter
- vk.com
- ok.ru


## Yeost SEO - Wordpress
This plugin helps put in similar tags


