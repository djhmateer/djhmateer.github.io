---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: ror 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2024-04-24/5.jpg "email"){:width="500px"}](/assets/2024-04-24/5.jpg) -->
<!-- [![alt text](/assets/2024-04-24/5.jpg "email")](/assets/2024-04-24/5.jpg) -->

```bash
# version manager for Ruby
asdf update

# ignores version constraints from Gemfile and update to latest versions available
# eg rails is installed globally
gem update --system

# in ~/code/
rails new railz3 -d postgresql -c tailwind

# add to git which is ready initialised

# creates the 2 db's (development and test) in postgres
rails db:create 

# http://localhost:3000/  

# home controller with 2 actions/endpoint of index and about
rails g controller home index about

rails db:mirate

# config/routes.rb
root "home#index"

# app/views/layouts/application.html.erb
# patch in a Header from https://tailblocks.cc/ in the body.

# Makefile
run:
	bin/dev

test:
	rails test

.PHONY: test run

# patch in a Hero
# app/views/home/index.heml.erb

# partial
# patch in the Heder
# app/views/layouts/_nav.html.erb

<%= render "layouts/nav" %>

# routes
 get '/about', to: 'home#about'

# create /scripts directory for working with db
# create .env for db settings
```

## Scaffolding

```bash
# scaffold a user with an email which is unique
rails g scaffold user email:uniq name --no-jbuilder

rails destroy scaffold user

```

Run the migrations from the UI and it creates `users` table in db.

CRUD now available looking good in Tailwind on `/users`

## Spina CMS

[https://spinacms.com/](https://spinacms.com/) a local CMS that plugs into Rails.

 
 ```bash
 # no!
#  bundle add spina
gem 'spina', '~> 2.18'

# limited to the gems in Gemfile
bundle update

# handles file uploads (default is in /storage)
rails active_record:install

# spina:install is rake task runner notation
rails spina:install
```

[http://localhost:3000/admin](http://localhost:3000/admin)

- views/layouts/default/application.html.erb - spina application template. Renders _nav
- views/layouts/application.html.erb - rails application template. Renders _nav
- views/layouts/_nav.html.erb - nav partial

in spina

- views/default/pages/show.html.erb - h1, render summary, buttons, layout, render text etc.. wrapped by spina application template

in rails

- views/default/home/dave.html.erb - page content. which is wrapped by rails application template

routes.rb - move spina to the bottom so now we have a choice of which routes eg spina or rails.

## Spina customise about page

config/initializers/themes/default.rb

- Part eg text, summary
- A Part has Part Types eg Line, Test, Image...
- A View Template eg show has Parts eg text, summary

Get the Tailwind CSS correct in app template

- Add parts for the form
- summary, image, link, linktext

Then patch into `show.html.erb` - the spina all pages template

[![alt text](/assets/2024-05-16/1.jpg "email"){:width="500px"}](/assets/2024-05-16/1.jpg)

Image, Title, Summary, Link, LinkText, Body - all editable on the CMS.

## Spina customise a product Sales page view template

```html
<section id="hook"></section>
<section id="problem"></section>
<section id="empathy"></section>
<section id="solution"></section>
<section id="benefits"></section>
<section id="cred"></section>
<section id="proof"></section>
<section id="offer"></section>
<section id="guarantee"></section>
<section id="cta"></section>
```

Each section needs: Title, Image, Summary, Text

- Part - a single thing like Text
- View template - multiple Parts - corresponds to a page

- New View Template called sales which is a has all ususal parts including repeater

eg /widgets

[![alt text](/assets/2024-05-16/2.jpg "email"){:width="500px"}](/assets/2024-05-16/2.jpg)

- View template - sales
- Which has many Parts eg Title, Summary
- Including a Repeater Part called Problem and Empathy
- which have Parts on them.

[![alt text](/assets/2024-05-16/3.jpg "email"){:width="500px"}](/assets/2024-05-16/3.jpg)

A sales page with problems that we can edit on the CMS.

**HERE at Importing data with migrations**
