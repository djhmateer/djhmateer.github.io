---
layout: page
title: All Posts
permalink: /allPosts/
---

All posts page


    {% for post in site.posts %}

        - {{ post.date | date: "%b %-d, %Y" }}<a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title | escape }}</a> {{ post.excerpt }}
    {% endfor %}

{% include icon-github.html username="djhmateer" %} 