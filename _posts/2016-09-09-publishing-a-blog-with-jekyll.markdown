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

This blog is powered by [jekyllrb.com][jekyll]  which uses Ruby to generate static html, which is then hosted on GitHub Pages.

### Why a static site?
<ul>
  <li>Simple</li>
  <li>Free hosting (Github pages, Azure free websites, S3.. whatever)</li>
  <li>Fine grain control over html</li>
  <li>Blazingly fast</li>
  <li>Easiy Source Controllable</li>
</ul> 

![Screenshot](/assets/Untitled.png)

Visual Studio Code editing this post!


... you can [get the PDF]({{ site.url }}/assets/test pdf.pdf) directly.

**Bold** This is a now a paragraph

This is Ruby code:
{% highlight ruby linenos %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
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
