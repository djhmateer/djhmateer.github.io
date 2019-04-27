---
layout: post
title: Twitter Card, Open Graph and Site Previews
description: Twitter Card and Open Graph looking at how to get previews working in Twitter, Teams, Slack, Facebook, WhatsApp, LinkedIn. Also looking at the jekyll-seo-tag and yoast plugin. 
# menu: review
categories: TwitterCard OpenGraph
published: true 
comments: true
sitemap: true
image: /assets/2019-04-07/10.jpg
---

Ever wondered how to get previews of blog post articles on: Twitter, Microsoft Teams, Slack, Facebook, Whats App,LinkedIn?

It is a mix of different html tags that you'll need as each website does things differently. 

We will look at [Twitter Cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started) and Open Graph (developed by Facebook). I've used 2 seo-plugins which do this job well: [Jekyll-seo-tag for Jekyll](https://github.com/jekyll/jekyll-seo-tag) and [Yoast SEO for Wordpress](https://yoast.com/wordpress/plugins/seo/).
 
## Twitter Cards
 [Twitter Card Validator](https://cards-dev.twitter.com/validator) gives you a very useful preview of what a tweet would look like eg:

![alt text](/assets/2019-04-07/1.png "Well formed Twitter Card preview"){:width="300px"}   
This is good


![alt text](/assets/2019-04-07/3.png "Badly formed Twitter Card preview"){:width="300px"}     
However this blog post hasn't had all the necessary tags applied, so it gives an ugly 'no image'

[Twitter Card documentation](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started)

The underlying code needed to render my page well is html tags inside the head:

```html
 <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/png" href="/assets/favicon.png">
  <title>Functional Programming in C# - Expressions, Option, Either</title>
  <meta name="description" content="">
  <link rel="stylesheet" href="/css/main.css" /> 
  <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
  <link rel="canonical" href="https://davemateer.com/2019/03/12/Functional-Programming-in-C-Sharp-Expressions-Options-Either">
  <link rel="alternate" type="application/rss+xml" title="Dave Mateer&#39;s Blog" href="https://davemateer.com/feed.xml">
  <link type="application/atom+xml" rel="alternate" href="https://davemateer.com/feed.xml" title="Dave Mateer's Blog" />

    <!-- Begin Jekyll SEO tag v2.5.0 -->
  <title>Functional Programming in C# - Expressions, Option, Either | Dave Mateer’s Blog</title>
  <meta name="generator" content="Jekyll v3.8.5" />
  <!-- Open Graph -->
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

  <!-- Twitter Cards-->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@dave_mateer" />

  <!-- JSON-LD structured data -->
  <script type="application/ld+json">
  {"@type":"BlogPosting","headline":"Functional Programming in C# - Expressions, Option, Either","url":"https://davemateer.com/2019/03/12/Functional-Programming-in-C-Sharp-Expressions-Options-Either","dateModified":"2019-03-12T00:00:00+00:00","datePublished":"2019-03-12T00:00:00+00:00","mainEntityOfPage":{"@type":"WebPage","@id":"https://davemateer.com/2019/03/12/Functional-Programming-in-C-Sharp-Expressions-Options-Either"},"image":"https://davemateer.com/assets/2019-04-05/2.jpg","description":"Making C# more functional by using abstractions. It has been preceeded by 2 articles on why I’ve got to here, and the background reasons behind trying functional programming in C#.","@context":"http://schema.org"}</script>
  <!-- End Jekyll SEO tag -->

  <!-- Author tag that LinkedIn likes -->
  <meta name="author" content="Dave Mateer">
</head>
```
So here the [Jekyll-SEO-Tag for Jekyll](https://github.com/jekyll/jekyll-seo-tag) plugin is only outputting 2 twitter tags, then using the Open Graph for the rest. Notice the [JSON-LD Site and post metadata Structured Data](https://developers.google.com/search/docs/guides/intro-structured-data) for richer indexing, which can only be a good thing.


![alt text](/assets/2019-04-07/2.png "Summary style"){:width="400px"}   
This is a `summary` as opposed to the more normal `summary_large_image` that I see in Tweets.

Be careful that content is cached on Twitter for 7 days after a link to a card markup has been published in a tweet.

## Open Graph
Twitter first checks it's own cards tags, then falls back to Facebook's [Open Graph](http://ogp.me/) which [many of the other interesting platforms use](https://stackoverflow.com/questions/10397510/do-services-other-than-facebook-use-open-graph), so what you are expecting to see in the html is something like:  


```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@nytimesbits" />
<meta name="twitter:creator" content="@nickbilton" />
<meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
<meta property="og:title" content="A Twitter for My Sister" />
<meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />
<meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />
```


## LinkedIn
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) gives good advice on simple posts:

Have an author tag:  
```html
 <meta name="author" content="Dave Mateer">
```
Make sure description is at least 100 characters long:
```html
<meta property="og:description" content="Making C# more functional by using abstractions. It has been preceeded by 2 articles on why I’ve got to here, and the background reasons behind trying functional programming in C#." />
```

## Useful tools and links
[Open Graph Preview Chrome plugin](https://chrome.google.com/webstore/detail/open-graph-preview/ehaigphokkgebnmdiicabhjhddkaekgh?hl=en) which renders for:
- Facebook
- Twitter

Which is useful for looking at your pages quickly  

[Open Graph meta tags and SEO](https://neilpatel.com/blog/open-graph-meta-tags/) are discussed in depth here


## Summary
It only takes a few tags to get previews working well on Twitter, LinkedIn etc. Watch out for caching if you can't see the site previews updating as you would expect - sometimes waiting overnight or a few days cures things.  

Update your CMS and blog to get previews working! 

![alt text](/assets/2019-04-07/10.jpg "Isle of Skye, Scotland"){:width="400px"}
<!-- ![alt text](/assets/2019-04-07/10.jpg ""){:width="300px"}    -->

<sup>Twitter card image by <a href="https://pixabay.com/users/FrankWinkler-64960/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=540115">Frank Winkler</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=540115">Pixabay</a></sup>