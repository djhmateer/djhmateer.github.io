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

## Customise Backend 

Lets customise and make a repeater, so we've got full control of the css, but can change any of the text.

```bash
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

## Render on Frontend

```html
<!-- views/default/pages/faq.html.erb -->

<!-- faqs is using this template -->
<h1 class="text-3xl"><%= current_page.title %></h1>

<p class="text-xl">
   <%= current_page.content(:summary) %> 
</p>

<!-- this renders the divs etc that the editor puts in -->
<%=content.html(:text)%>
```

## Deploy to Production

I tried a few ways to get this right

A vanilla deploy without any data write to 2 tables

- ar_internal_metadata (1 rows) environment = production!
- schema_migrations (23 rows)
- spina_ are all empty which is bad as I need a way to login!

So lets just do a raw SQL dump from dev and run on prod. Except for ar_internal_metadata and schema_migrations


```bash
# in secrets directory
 pg_dump -U postgres -d golfsubmit_development --clean --exclude-table=ar_internal_metadata --exclude-table=schema_migrations  -f - | sed 's/OWNER TO dave/OWNER TO golfsubmit/g' > dev_backup.sql

# scp to server

# run
psql -U postgres -d golfsubmit_production -f /home/dave/secrets/dev_backup.sql
```

useful commands:

```bash
sudo -iu postgres
psql

\c golfsubmit_development
\dt # show all tables
```

## Use Devise for Auth into Spina

```rb
# config/initializers/bigauth.rb
# Used as Spina's authentication module
module BigAuth
  extend ActiveSupport::Concern

  included do
    helper_method :current_spina_user
    helper_method :logged_in?
    helper_method :logout_path
  end

  # Spina user falls back to devise user session in the case there is one and it is of a superadmin.
  def current_spina_user
    Spina::Current.user ||= current_user if current_user.is_admin?
  end

  # Returns falsy unless there is a logged in superadmin
  def logged_in?
    return current_spina_user if user_signed_in?
    false
  end

  # Not used
  def logout_path
    spina.admin_logout_path
  end

  private

  # Redirects user to sign in if not logged in as a superadmin
  def authenticate
    redirect_to "/login" unless logged_in?
  end
end

```

then 

```rb
# user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, #:registerable,
         :recoverable, :rememberable, :validatable

  def is_admin?
    return true if email =="davemateer@gmail.com"
    return true if email =="foo@gmail.com"
  end
end

```

then

```rb
#initializers/spina.rb
config.authentication = "BigAuth"
```

## Outbound email templates


