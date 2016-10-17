---
layout: post
title:  "How to Publish a Blog with Jekyll"
date:   2016-09-09 16:33:16 +0100
categories: update
published: true 
---
### Summary
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
* I had to follow this when got an SSL error: http://stackoverflow.com/a/27641786/26086
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

While doing this tutorial 19th Sept 2016 at 16:49 it seems [GitHub Status](https://status.github.com/) are experiencing problems, and the site isn't updating *typical*

## Put the revision date on each page
I do this on production web apps.  It is the rev date in the footer, showing when the site was 'built'.  Have a look at the bottom of [Stackoverflow](http://stackoverflow.com).   It's an easy check to make sure the deployment pipeline is working.

Put in your timezone line in _config.yml eg

timezone: Europe/London

Then in your footer put:

{% highlight jekyll %}
{% raw  %}
rev:  {{site.time | date: "%Y-%m-%d %H:%M:%S"}} GMT
{% endraw %}
{% endhighlight %}




