---
layout: post
title:  "Publishing a blog with Jekyll"
date:   2016-09-09 06:24:16 +0100
categories: update
published: true 
---
I started blogging about 8 years ago [programgood.net](http://www.programgood.net)  It turned into a very good ideas repository, not a blog.  *That's fine.*  

I'd now like to try a more 'walkthrough' style blog, taking inspiration from [hanselman.com](http://www.hanselman.com) and [ScottGu](http://weblogs.asp.net/scottgu/introducing-asp-net-5) 

I'm an ASP.NET / MSSQL guy, and have written business applications for rather a long time.

This blog is powered by [jekyllrb.com](https://jekyllrb.com/)  which uses Ruby to generate static html, and hosted on [GitHub Pages](https://pages.github.com/)

### Why a static site?
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
* Install <a href="https://chocolatey.org/install">chocolatey.org</a> using: 
{% highlight powershell %}
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex
{% endhighlight %}
* reopen powershell as administrator
* Install Ruby using:
{% highlight powershell %}
choco install ruby -y
{% endhighlight %}
* reopen shell as administrator
{% highlight powershell %}
gem install jekyll
{% endhighlight %}
* open poshgit shell (my normal shell installed automatically with <a href="https://desktop.github.com/">GitHub Desktop</a>)
* cd c:\dev\web
* jekyll new testsite
* cd testsite
* gem install bundle
* bundle
* jekyll serve

![Screenshot](/assets/Posh1.png)

Jekyll site is running!

![Screenshot](/assets/DemoSiteNoCss.png)

Oh no - what has happened to the style??

![Screenshot](/assets/FixConfig.png)

Comment out with a # the url line.

![Screenshot](/assets/DemoSite.png)

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

![Screenshot](/assets/Untitled2.png)

I found it can take up to a minute to appear live, the trick being to watch for this message in Settings, GitHub pages:
 

![Screenshot](/assets/GitHub.png)
