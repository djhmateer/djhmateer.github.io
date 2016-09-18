---
layout: page
title: All Posts
permalink: /allPosts/
---

All posts page


    {% for post in site.posts %}

        {{ post.date | date: "%b %-d, %Y" }}
        {{ post.url | prepend: site.baseurl }}">{{ post.title | escape }}
         {{ post.excerpt }}
    {% endfor %}

{% include icon-github.html username="djhmateer" %} 