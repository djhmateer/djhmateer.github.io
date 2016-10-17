---
layout: page
title: All Posts
permalink: /allPosts/
published: false
---
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> {{ post.excerpt | remove: '<p>' | remove: '</p>' }}
    </li>
  {% endfor %}
</ul>