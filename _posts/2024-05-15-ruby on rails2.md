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

asdf install ruby

# ignores version constraints from Gemfile and update to latest versions available
# eg rails is installed globally
gem update --system

bundle update

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

## Importing Data

Want as much in the CMS as possible so don't have to redeploy the site and can edit online.

- Page content - stuff that will be updated
- Courses which have Lessons. 
- Each Lesson has text and a video.
- Books
- Blog Posts

My first site is going to be a 1 page portfolio site so lets go to auth.

## Authentication

[Devise]()

```bash
bundle add devise

rails generate devise:install

# /config/environments/development.rb

  # DM I do care if the mailer fails
  config.action_mailer.raise_delivery_errors = false

  # DM this is the route that the email will use
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
  
  # DM added this so that even in dev it will send an email
  config.action_mailer.smtp_settings = {
    address: ENV['SMTP_ADDRESS'],
    user_name: ENV['SMTP_USER'],
    password: ENV['SMTP_PASSWORD'],
  }

# .env
SMTP_ADDRESS=smtp.postmarkapp.com
SMTP_USER=big_guid
SMTP_PASSWORD=big_guid

# flash messages setup
# only in rails app template - application.html.erb
<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>

# add authentication stuff to our existing User model 
# add columsn to table with migration
# added a route
rails g devise User

# comment out add email table and index in migration
rails db:migrate

# optional - but this generates views that we can change
rails g devise:views
```

The model is where we configure devise

Routes are like:

- /users/sign_up
- /users/sign_in

Views are in:

- /views/devise/sessions/new.html.erb which is login aka sign_in

```bash
# devise.rb
  config.mailer_sender = 'dave@hmsoftware.co.uk'

# application_mailer.html.erb
# we're using the deivse mailer though.. so maybe don't need this.
default from: "dave@hmsoftware.co.uk"
```

email templates are in /views/layouts/mailer/html.erb

login button on _nav

```bash
# notice using a button to logout as need a DELETE verb and turbo interfered
# a href login is fine as GET
    <%if(user_signed_in?)%>
      <%=button_to "Logout",destroy_user_session_path,  method: :delete, class: "inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"%>
    <%else%>
      <a href="<%= new_user_session_path %>" class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
      </a>
    <%end%>
```
then

```rb
# routes.rb
# nicer routes for pages
  devise_for :users,
  # ie /login and not /users/login
    path: '',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      sign_up: 'register'
    }
```

## Devise and Spina

```rb
# make sure admin user hard coded in user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, #:registerable,
         :recoverable, :rememberable, :validatable

  def is_admin?
      return true if email =="davemateer@gmail.com"
  end
end
  
# create config/initialisers/bigauth.rb
# frozen_string_literal: true

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
      # paths and routes are not available in the initializer so hard code
      redirect_to "/login" unless logged_in?
    end
  end

# spina.rb
config.authentication = "BigAuth"
```

So I can now login to the site and Spina admin is integrated.

## Error

However if I go to any Spina rendered page which renders login and logout via the _nav partial I get this error:

` undefined local variable or method `destroy_user_session_path' 

```html
<!-- destroy_user_session_path is a devise helper but for some reason isn't working so hard coded path -->
<%=button_to "Logout","/logout", method: :delete,
```

## Authorise

```rb
class HomeController < ApplicationController
  # this puts auth on for all pages on home controller
  # before_action :authenticate_user!

  # only on the secret page do we want to authenticate
  # before_action :authenticate_user!, only: [:secret]

  # needs to be an admin to see secret page otherwise redirect to root
  before_action :is_admin!, only: [:secret]

  def is_admin!
    redirect_to root_path unless user_signed_in? && current_user.is_admin?
  end

  def index
  end

  def dave
  end

  def secret
  end
end
```

## Deploy

Let's deploy to a standard VM. I run nginx on my proxmox server to handle ssl from certbot. So here I'll deploy to a simple 

[https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-22-04](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-22-04) - one I used


[https://gorails.com/deploy/ubuntu/22.04](https://gorails.com/deploy/ubuntu/22.04) a good guide

[https://www.phusionpassenger.com/docs/tutorials/deploy_to_production/installations/oss/ownserver/ruby/nginx/](https://www.phusionpassenger.com/docs/tutorials/deploy_to_production/installations/oss/ownserver/ruby/nginx/) some updates through this guide which is good


**HERE trying to get a simple install**

```bash
# use a non root user

# A few Rails features eg Asset Pipeline needs the javascript runtime so may have to install nodejs

sudo apt update

# dependencies to install Ruby
sudo apt install git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev

# rbenv
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash

echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc

# can take time here
rbenv install 3.3.1

rbenv global 3.3.1

# gems

# no documnentation to turn off the generation so to speed up installs of gems







gem update --system

gem install bundler
```


webservers

- Puma - which is the webserver I use in dev. Rails comes with a config/puma.rb config file.
- Passenger - integrates with nginx





