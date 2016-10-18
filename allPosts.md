---
layout: page
title: All Posts
menu: review
permalink: /allPosts/
published: true

---
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> {{ post.excerpt | remove: '<p>' | remove: '</p>' }}
    </li>
  {% endfor %}
</ul>