---
layout: page
title: All Posts
menu: review
permalink: /allPosts/
published: true
---

<ul>
  {% for post in site.posts %}
    {% if post.menu == 'review' %}
    <li>
      <a href="{{ post.url }}">{{ post.title }} - {{ post.date | date: "%-d %B %Y" }} *not published*</a>
    </li>
    {% endif %}
  {% endfor %}
  <li></li>
  {% for post in site.posts %}
    {% if post.menu != 'review' %}
    <li>
      <a href="{{ post.url }}">{{ post.title }} - {{ post.date | date: "%-d %B %Y" }} </a>
    </li>
    {% endif %}
  {% endfor %}
</ul>
