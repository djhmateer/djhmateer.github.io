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
      <a href="{{ post.url }}">{{ post.title }}</a> 
    </li>
  {% endfor %}
</ul>

<!-- asdf
{{  post.excerpt | remove: '<p>' | remove: '</p>' }} -->