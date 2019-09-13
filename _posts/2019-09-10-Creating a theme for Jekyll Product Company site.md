---
layout: post
title: Creating a theme for a Jekyll Product Company Site 
description: 
menu: review
categories: Jekyll Saas SCSS
published: true 
comments: false     
sitemap: false
image: /assets/2019-08-05/1.jpg
---

I'm mostly a back end developer and entrepreneur. Hosting a high performance site with Jekyll on GitHub Pages, content editing in markdown is all something I'm comfortable with. CSS, Javascript and design are things I know less well. So here are my resources for front end for:

- Charity website eg Rewilding Sussex
- Company website eg BrightSoft
- Product website eg Broken Link Checker
- Personal blog eg davemateer.com, mateer.dev, peter [animateddata.com](https://www.animateddata.com/)

## Use a raw HTML Template

Static site generators like Jekyll are templating engines predominantly. If you have a single static long page then maybe you don't need it. 

[Here is a demo Bootstrap4 nonprofit theme](http://themes.semicolonweb.com/html/canvas/demo-nonprofit.html) which may be a good enough start for my charity website.  

## Use an HTML Template with Jekyll

[ExperimentingWithCode](https://experimentingwithcode.com/using-a-bootstrap-theme-with-jekyll/) has a good tutorial on splitting up the [Business Casual Bootstrap4 html tempate](https://startbootstrap.com/themes/business-casual/) and using Jekyll.  

Here is [my implementation of his code](https://github.com/djhmateer/dm-startbootstrap-business-casual) which is more towards that current default of [putting scss partials into /_sass](https://jekyllrb.com/docs/assets/)

{% highlight html %}
{% raw  %}
<!DOCTYPE html>
<html lang="en">
  {% include head.html %}
  <body>
    {% include banner.html %}
    {% include navbar.html %}
    {{ content }}
    {% include footer.html %}
  </body>
</html>
{% endraw %}
{% endhighlight %}

then the generated css is linked:

```html
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template -->
    <link
        href="https://fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/main.css" rel="stylesheet">
</head>
```

This will be minified by the Jekyll Sass build pipeline

## Sass / SCSS

From the [Stackoverflow answer](https://stackoverflow.com/questions/5654447/whats-the-difference-between-scss-and-sass):

[Sass-lang](https://sass-lang.com/) (Syntactically Awesome Style Sheets) is a CSS pre-processor. Style sheets are processed, and turned into regular CSS style sheets. There are 2 syntaxes available for Saas:

- .scss - Sassy CSS. Every CSS stylesheet is a valid SCSS file. Boostrap4 is built on this.
- .saas - older. Uses indentation rather than brackets

Sass allows for variables in CSS.

## Jekyll Sass

[Jekyll documentation](https://jekyllrb.com/docs/assets/#sassscss)

```liquid
---
# Only the main Sass file needs front matter (the dashes are enough)
---

@import "business-casual";
```

business-casual.scss is in the default _sass folder.

/css/main.scss is transformed into /css/main.css which currently isn't minified (but is tiny 1.1k in our case.) Bootstrap4 minified is 23.4k





## Who is the target audience

Developers?  
Is it easy to understand?  

What is the call to action
-try the product
-buy the product
-sign up for newsletter

## Jekyllrb.com

[Showcase of sites](https://jekyllrb.com/showcase/) gives good inspiration  

[Resources](https://jekyllrb.com/resources/)

[https://talk.jekyllrb.com/](https://talk.jekyllrb.com/) a board of talk on Jekyll and themes

## External resources

[jekyllrb.com/resources/](https://jekyllrb.com/resources/) - these are mostly user submitted blog style themes

[https://jekyllthemes.io/](https://jekyllthemes.io/) curated directory with paid themes




![alt text](/assets/2019-08-05/1.jpg "Don't use old phones!"){:width="600px"}
