---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
#menu: review
categories: rails 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

I want to have a FAQ page on my site which is editable from a CMS ie not a code redeploy.



## Spina CMS

[https://spinacms.com/](https://spinacms.com/) a local CMS that plugs into Rails.

 
 ```bash
 # no!
#  bundle add spina
gem 'spina', '~> 2.18'

# limited to the gems in Gemfile
bundle update

# handles file uploads (default is in /storage)
rails active_storage:install

# spina:install is rake task runner notation
rails spina:install

# name of website
# default theme
# user - we'll change this
# password - we'll change this


# routes.rb
# move this this to the bottom so we still have our normal website, and only do CMS for specific pages
# try spina routes last
mount Spina::Engine => '/'

# http://localhost:3000/admin
```

## Create a FAQs Page

```bash
# create new page in CMS
# put in text
# check route is /faqs
# test it works but style will need changed 
```

- views/layouts/default/application.html.erb - spina application template. Renders _nav. I've made this a copy of the one below
- views/layouts/application.html.erb - rails application template. Renders _nav
- views/layouts/_nav.html.erb - nav partial

in spina

- views/default/pages/show.html.erb - h1, render summary, buttons, layout, render text etc.. wrapped by spina application template

in rails

- views/default/home/dave.html.erb - page content. which is wrapped by rails application template

## Customise

Lets customise and make a repeater, so we've got full control of the css, but can change any of the text.

```json
# this is where we define our content types.
# /config/themes/default.rb

# create a new part called summary
theme.parts = [
    {name: "text", title: "Body", hint: "Your main content", part_type: "Spina::Parts::Text"},
    {name: "summary", title: "Summary", hint: "A summary for your page", part_type: "Spina::Parts::Line"}
]


# create a new view template called faq which has the new summary part
theme.view_templates = [
    {name: "homepage", title: "Homepage", parts: %w[text]},
    {name: "show", title: "Page", parts: %w[text]},
    {name: "faq", title: "FAQ", parts: %w[ummary text]}
  ]

# notice I need a new template called faq
```
