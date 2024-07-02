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

Lets see out of the box, how much the scaffold generators can help.

## New Rails App on Dev

To update rails on dev, build a new rails site against postgres with no turbo, see my update and create script in [Rails2]()


## Styling the Site / Investigation Form

To build out the UI ie with navigation, layout and form, with Tailwind UI which includes JS and proper tailwind compilation.

Lets use the best possible tools to get a great looking professional site together. I bought tailwindui

[https://tailblocks.cc/](https://tailblocks.cc/) - open source components

[https://tailwindcss.com/](https://tailwindcss.com/) - home

[https://tailwindui.com/templates#browse](https://tailwindui.com/templates#browse) - commercial templates and components

Here is the html

```html
<!-- app/views/layouts/application.html.erb -->
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

Tailwind CSS (compiler has been run by make and stripped out unnecessary classes).

I developed the UI and Javascript in a separate app as was easier to use html (VS Code and .html.erb files were annoying to get nice shortcuts working on)

I used the CDN version of Tailwind ie which is perfect for development

```html
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@tailwindcss/forms@0.3.4/dist/forms.min.css" rel="stylesheet">
```

## Overall Layout

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Golfsubmit</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- rails css loading -->
  </head>

  <body>

    <!-- top naviation-->
    <nav class="border-b border-gray-200 bg-white">
      <!-- ... -->
   </nav>


    <!-- main content handled in index page -->
    <main>
        <!-- flex container for bg image height and width are full-->
        <!-- .bg-hero css in defined in /aoo/assets/stylesheets/application.css -->
        <div class="flex min-h-screen w-full">
             <!-- flex-1 takes all available space in flex container -->
             <!-- bg-cover background image entire div without stretching -->
             <!-- centers within div -->
             <div class="flex-1 bg-hero bg-cover bg-center bg-no-repeat ">

            <!-- ... -->
    </main>



    <!-- javascript loading handled in index page-->

  </body>
</html>

```

## infield.js - analysing exactly what is happening on requests

I'm getting a 4MB js being delivered to the browser. It was Lastpass.

lets try doing a prod build on dev

```bash
# config/environments/production
# force_ssl = false

# config.assets.compile = true
# otherwise

RAILS_ENV=production bundle exec rails assets:precompile
# to delete all precompiled assets
RAILS_ENV=production bundle exec rake assets:clobber


sudo -iu postgres
psql
# nice convention of the site name needing a user with same name
CREATE ROLE golfsubmit WITH LOGIN PASSWORD 'password' SUPERUSER;


RAILS_ENV=production bin/rails db:create
RAILS_ENV=production bin/rails db:migrate

RAILS_ENV=production bundle exec puma -C config/puma.rb
```

So this didn't help but very useful to see how to do it

## Deploy to Azure

Lets do a build on Azure as this is the final destination. I'm going to use a test domain name [hmsoftware.org](https://hmsoftware.org). However I'm using certbot on another staging server and want to move to Azure. Need to be careful of the rate limit of 5 duplicate certificates issued per week for letsencrypt.

I like to automate my Azure deployments via bash and keep in the /infra directory

[Rails2 - Deploy]()

[Certbot auto deploy]()

[Postgres auto deploy]()


## Rails

```bash
# jbuilder is for json api's

# string - character varying (varchar)
# text - no max length
# date
# boolean
# references (FK)
# attachments (Active Storage)

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

rails g scaffold submission investigation:references contact_name:string contact_email:string contact_phone:string anonymous:boolean incident_name:string factual_summary:text incident_start_date:date incident_end_date:date language:string coordinates:string files:attachments --no-jbuilder

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

## Rails file upload to Storage

[Rails file upload]()
