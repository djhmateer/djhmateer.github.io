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

<!-- [![alt text](/assets/2024-05-23/1.jpg "email"){:width="500px"}](/assets/2024-05-23/1.jpg) -->

I've got a new form to develop with new database tables in Postgres.

The form needs to look professional which I'll handle in Tailwind

Lets see out of the box, how much the scaffold generators can help.

```bash

# jbuilder is for json api's

# string - character varying (varchar)
# text - no max length
# date
# boolean
# references (FK)
# attachedments (Active Storage)

# db table: investigations
# PK of id
# created_at
# updated_at

# CRUD views
# /investigations
# /investigations/new  (Tailwind form)


# controller
rails g scaffold investigation name:string --no-jbuilder

rails db:migrate


rails g scaffold submission investigation:references contact_name:string contact_email:string contct_phone:string anonymous:boolean incident_name:string factual_summary:text incident_start_date:date incident_end_date:date language:string coordinates:string files:attachments --no-jbuilder


# destroy
rails d scaffold investigation
rails d scaffold submission
```


## Validation

```rb
# model validation
class Investigation < ApplicationRecord
    # name field can't be blank
    # validates :name, presence: true
    validates :name, presence: { message: "Investigation name cannot be blank" }
end
```
lets put on the db too by

- rollback migration with `rails db:rollback`
- create a new migration with `rails generate migration AddNotNullConstraintToInvestigationName`

```rb
class CreateInvestigations < ActiveRecord::Migration[7.1]
  def change
    create_table :investigations do |t|
      # t.string :name
      t.string :name, null: false

      t.timestamps
    end
  end
end

# OR create new migration
class AddNotNullConstraintToInvestigationName < ActiveRecord::Migration[6.1]
  def change
    change_column_null :investigations, :name, false
  end
end

```

## Styling the Site / Investigation Form

Lets use the best possible tools to get a great looking professional site together.

[https://tailblocks.cc/](https://tailblocks.cc/) - open source components

[https://tailwindcss.com/](https://tailwindcss.com/) - hone

[https://tailwindui.com/templates#browse](https://tailwindui.com/templates#browse) - commercial templates and components


```bash
# create a totally new rails app for form testing
# doing large uploads so need this app to be as simple as possible so not
rails new formtest2 -d postgresql -c tailwind --skip-hotwire

rails db:create
rails db:migrate

bin/dev

# Makefile
run:
	bin/dev

.PHONY: run

# git add everything so can easily see changes

# generates: controller (home), action (index), view (index), route (home/index)
rails g controller home index

# routes.rb
root "home#index"

# now we have a simple page
```

Here is the html

```html
<!-- layouts/application.html.erb -->
<!DOCTYPE html>
<html>
  <head>
    <title>Formtest</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <!-- I've taken out "data-turbo-track"... as it isn't doing anyting -->
    <%= stylesheet_link_tag "tailwind", "inter-font", "data-turbo-track": "reload" %>

    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>

  <body>
    <main class="container mx-auto mt-28 px-5 flex">
      <%= yield %>
    </main>
  </body>
</html>

<!-- index.html.erb -->
<div>
  <h1 class="font-bold text-4xl">Home#index</h1>
  <p>Find me in app/views/home/index.html.erb</p>
</div>

```

[![alt text](/assets/2024-05-31/1.jpg "email"){:width="500px"}](/assets/2024-05-31/1.jpg)

No js being loaded. Tailwind css (compiler has been run by make and stripped out unnecessary).
