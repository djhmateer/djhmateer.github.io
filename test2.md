---
layout: none
---

<div class="home">

<img src="/assets/2019-01-11/6.jpg" />  
<p></p>

<p> <a href="/notthere">Internal link relative broken</a> asdfsdadf </p>
<p> <a href="https://www.qnrl.com/asdf">External link absolute broken</a> asdfsdadf </p>

<p> <a href="https://www.google.co.uk">Google test link</a> asdfsdadf </p>
<ul>
  {% for post in site.posts %}
    {% if post.menu != 'review' %}
    <li>{{post.categories[0] }} - 
      <a href="{{ post.url }}">{{ post.title }} - {{ post.date | date: "%-d %B %Y" }} </a>
    </li>
    {% endif %}
  {% endfor %}
</ul>

---

<h1>Posts by Tag</h1>

{% assign items = site.categories | sort %}
{% for category in items %}
  <h3>{{ category[0] }}</h3>
  <ul>
    {% for post in category[1] %}
      {% if post.menu != 'review' %}
        <li><a href="{{ post.url }}">{{ post.title }} - {{ post.date | date: "%-d %B %Y" }} </a></li>
      {% endif %}
    {% endfor %}
  </ul>
{% endfor %}
</div>
