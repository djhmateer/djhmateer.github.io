---
layout: post
title:  "Blog with Jekyll and host for Free"
date:   2016-10-17
categories: jekyll githubpages
published: true 
redirect_from: "/jekyll/2016/10/17/Blog-with-Jekyll-and-host-for-free.html"
---
![Cows](/assets/Cows_500.jpg)

**25th Jan 2018 - please see updated <a href="/2018/01/25/Jekyll-and-Docker.html">post</a> on installing Jekyll using Docker**


Excellent for developers who know Git, even if you don't know Ruby like me :-)

This blog is powered by [jekyllrb.com](https://jekyllrb.com/)  which uses Ruby to generate static html, and is hosted on [GitHub Pages](https://pages.github.com/)

### Why a static site?
Firstly a static site is just html pages.  No server side processing.  No database.  Just html, css and javascript files being served up.  This means any webserver will work just fine eg IIS, Apache, NGINX etc..

* Simple
* Free hosting
* Fine grain control over html
* Blazingly fast
* Easily Source Controllable

![Screenshot](/assets/Untitled.png)

Visual Studio Code editing this post

### How to get started
These instructions are what I found worked on Windows10 as of 19th Sept 2016.  I use 3 machines regularly at work and home, so found a way.

Official notes [here](https://jekyllrb.com/docs/windows/#installation)

* Windows key, Windows Powershell, run as administrator
* Set Powershell Execution
{% highlight powershell %}
Set-ExecutionPolicy RemoteSigned
{% endhighlight %}

* Install <a href="https://chocolatey.org/install">chocolatey.org</a> using: 
{% highlight powershell %}
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex
{% endhighlight %}
* Reopen Powershell as administrator
* Install Ruby using:
{% highlight powershell %}
choco install ruby -y
{% endhighlight %}
* Reopen Powershell as administrator
{% highlight powershell %}
gem install jekyll
{% endhighlight %}
* open poshgit shell (my normal shell installed automatically with <a href="https://desktop.github.com/">GitHub Desktop</a>)
* cd c:\dev\web
* jekyll new testsite
* cd testsite
* gem install bundle
* bundle
* I had to follow this when got an SSL error when bundle was out of date and needed upgrading: [Stackoverflow](https://stackoverflow.com/a/27641786/26086)
* jekyll serve

![Screenshot](/assets/Posh1.png)

Jekyll site is running!

<img src="/assets/DemoSiteNoCss.png" width="400" />

Oh no - what has happened to the style??

![Screenshot](/assets/FixConfig.png)

Comment out with a # the url line.

<img src="/assets/DemoSite.png" width="400" />

Much nicer!!!

## Publish to GitHub Pages

.\p.ps1  which is a shortcut to:

{% highlight powershell %}
git add . -A
$message = "Auto commit at " + (Get-Date -Format g)
git commit -m  $message
git push
{% endhighlight %}

End result:

I found it can take up to a minute to appear live, the trick being to watch for this message in Settings, GitHub pages:
 
![Screenshot](/assets/GitHub.png)

While doing this tutorial 19th Sept 2016 at 16:49 it seems [GitHub Status](https://www.githubstatus.com/) are experiencing problems, and the site isn't updating *typical*

## Put the revision date on each page
I do this on production web apps.  It is the rev date in the footer, showing when the site was 'built'.  Have a look at the bottom of [Stackoverflow](https://stackoverflow.com).   It's an easy check to make sure the deployment pipeline is working.

Put in your timezone line in _config.yml eg

timezone: Europe/London

Then in your footer put:

{% highlight jekyll %}
{% raw  %}
rev:  {{site.time | date: "%Y-%m-%d %H:%M:%S"}} GMT
{% endraw %}
{% endhighlight %}

## Make Shortcut serve
So you can type .\s  and get local version running on http://127.0.0.1:4000/ or http://localhost:4000

{% highlight powershell %}
jekyll serve --drafts
{% endhighlight %}

## Peer review your blog posts
I create hidden live links on my site for review and use

{% highlight jekyll %}
{% raw  %}
{% for post in site.posts %}
{% if post.menu != 'review' %}
<li>
    <a href="{{ post.url }}">{{ post.title }} </a>
</li>
{% endif %}
{% endfor %} 
{% endraw %}
{% endhighlight %}

then my post to be reviewed is in _posts with a menu property of review

{% highlight jekyll %}
{% raw  %}
---
layout: post
title:  "Test Review"
menu: review
categories: jekyll
published: true
---
test
{% endraw %}
{% endhighlight %}

The 'review' bits need to be put in the feed.xml too:

{% highlight jekyll %}
{% raw  %}
{% for post in site.posts limit:100 %}
{% if post.menu != 'review' %}
<item>
    <title>{{ post.title | xml_escape }}</title>
    <description>{{ post.content | xml_escape }}</description>
    <pubDate>{{ post.date | date_to_rfc822 }}</pubDate>
    <link>{{ post.url | prepend: site.baseurl | prepend: site.url }}</link>
    <guid isPermaLink="true">{{ post.url | prepend: site.baseurl | prepend: site.url }}</guid>
    {% for tag in post.tags %}
    <category>{{ tag | xml_escape }}</category>
    {% endfor %}
    {% for cat in post.categories %}
    <category>{{ cat | xml_escape }}</category>
    {% endfor %}
</item>
{% endif %}
{% endfor %}
{% endraw %}
{% endhighlight %}




