---
layout: post
title: Twitter Card, Open Graph and Site previews
description: Twitter Card and Open Graph looking at how to get previews working in Twitter, Teams, Slack, Facebook, WhatsApp, LinkedIn. Also looking at the jekyll-seo-tag plugin. 
menu: review
categories: TwitterCard OpenGraph
published: true 
comments: false
sitemap: false
image: /assets/2019-04-07/10.jpg
---

Ever wondered how to get previews of blog post articles on: Twitter, Microsoft Teams, Slack, Facebook, Whats App,LinkedIn?

It is a mix of different html tags that you'll need, as each app does things differently. 

We will look at Twitter Cards and Open Graph. I've used 2 seo-plugins which do this job well: [Jekyll-seo-tag for Jekyll](https://github.com/jekyll/jekyll-seo-tag) and [Yoast SEO for Wordpress](https://yoast.com/wordpress/plugins/seo/).
 
## Twitter Cards
 [Twitter Card Validator](https://cards-dev.twitter.com/validator) gives you a very useful preview of what a tweet would look like eg:

![ps](/assets/2019-04-07/1.png){:width="300px"}   
This is good


![ps](/assets/2019-04-07/3.png){:width="300px"}     
This hasn't had all the necessary tags applied.

[Twitter Card documentation](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started)

The underlying code needed to render my page is:

This is very different from the twitter documentation. I'm using [Jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag)
```html
<!-- can be summary, summary_large_image, app, player-->
<meta name="twitter:card" content="summary_large_image" />
<!-- your twitter username -->
<meta name="twitter:site" content="@dave_mateer" />
```
Content is cached on Twitter for 7 days after a link to a card markup has been published in a tweet.

![ps](/assets/2019-04-07/2.png){:width="400px"}   
This is a `summary` as opposed to the more normal `summary_large_image` that I see in Tweets.

## Open Graph
Twitter first checks it's own cards tags, then falls back to [Open Graph](http://ogp.me/) which [many of the other interesting platforms use](https://stackoverflow.com/questions/10397510/do-services-other-than-facebook-use-open-graph), so what you are expecting to see in the html is something like:  


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

So here the [Jekyll-seo-tag for Jekyll](https://github.com/jekyll/jekyll-seo-tag) plugin is only outputting 2 twitter tags, then using the Open Graph for the rest. Notice the [JSON-LD Site and post metadata Structured Data](https://developers.google.com/search/docs/guides/intro-structured-data) for richer indexing, which can only be a good thing.

## LinkedIn
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) gives good advice eg  

Have an author tag:  
```html
 <meta name="author" content="Dave Mateer">
```
Make sure description is at least 100 characters long

## Chrome Plugin
[Open Graph Preview Chrome plugin](https://chrome.google.com/webstore/detail/open-graph-preview/ehaigphokkgebnmdiicabhjhddkaekgh?hl=en) which renders for:
- Facebook
- Twitter

Which is useful for looking at your pages quickly  


## Summary
It only takes a few tags to get previews working well on Twitter, LinkedIn etc. Update your CMS and blog to get it working! 

<sup>Twitter card image by <a href="https://pixabay.com/users/FrankWinkler-64960/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=540115">Frank Winkler</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=540115">Pixabay</a></sup>