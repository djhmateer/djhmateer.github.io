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

It would be handy tp deploy all of `spina_` table data to production. I do auto backups when a new vm is created so a very simple way to deploy spina is just to get it started, then just remember the db changes I've made and updated on prod whilst developing.

```bash
sudo -iu postgres
psql

\c golfsubmit_development
\dt # show all tables

# show all spina tables
SELECT tablename FROM pg_tables WHERE tablename LIKE 'spina_%';

# example
pg_dump -U postgres -d golfsubmit_development -t spina_accounts -f spina_backup.sql

# Run on DEV
# --clean include drop table if exists
pg_dump -U postgres -d golfsubmit_development --clean \
-t spina_accounts \
-t spina_attachment_collections \
-t spina_attachment_collections_attachments \
-t spina_attachments \
-t spina_layout_parts \
-t spina_lines \
-t spina_page_parts \
-t spina_pages \
-t spina_structure_items \
-t spina_structure_parts \
-t spina_structures \
-t spina_texts \
-t spina_users \
-t spina_rewrite_rules \
-t spina_page_translations \
-t spina_line_translations \
-t spina_text_translations \
-t spina_navigations \
-t spina_options \
-t spina_settings \
-t spina_media_folders \
-t spina_images \
-t spina_image_collections \
-t spina_image_collections_images \
-t spina_resources \
-t spina_navigation_items \
-f spina_backup.sql

# spina_accounts
# spina_navigations
# spina_page_translations
# spina_pages ie 2 simple pages. json_attributes contains the page definition. jsonb
# spina_rewrite_rules ie faq2 to faq slug
# spina_users - davemateer user with a le... password (will put in devise soon)

# Run of PROD
psql -U postgres -d golfsubmit_production < /home/dave/spina_backup.sql

```
