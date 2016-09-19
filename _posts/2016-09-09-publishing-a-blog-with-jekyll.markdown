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

This blog is powered by [jekyllrb.com][jekyll]  which uses Ruby to generate static html, and hosted on [GitHub Pages](https://pages.github.com/)

### Why a static site?
<ul>
  <li>Simple</li>
  <li>Free hosting</li>
  <li>Fine grain control over html</li>
  <li>Blazingly fast</li>
  <li>Easily Source Controllable</li>
</ul> 

![Screenshot](/assets/Untitled.png)

Visual Studio Code editing this post!

### End Result

Publish:
{% highlight powershell %}
git add . -A
$message = "Auto commit at " + (Get-Date -Format g)
git commit -m  $message
git push
{% endhighlight %}

This is C#:
{% highlight csharp linenos %}
class Program
{
    static void Main(string[] args)
    {
        //Do stuff
    }
}
{% endhighlight %}

Date to String
{{ site.time | date_to_long_string }}

Build is: [Build]

[build]: https://github.com/djhmateer/djhmateer.github.io/commit/{{ site.github.build_revision }}
[jekyll]: http://jekyllrb.com
