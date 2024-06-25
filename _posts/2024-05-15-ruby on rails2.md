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

[![alt text](/assets/2024-05-23/1.jpg "email"){:width="500px"}](/assets/2024-05-23/1.jpg)

A production Rails site

- Ubuntu 22.04
- Postgres 14 on server
- Puma webserver listening on port 3000 in production
- systemd running puma and logging to log/production.log
- railz3_production database the railz3 user
- source on github
- secrets inside systemd config file as envionment variables
- crud rails
- devise for authentication and password resets etc.
- standard username and password
- devise filter for secret pages (ie have to be logged in to see)
- spina cms for content (only hard coded admin user can see)
- images are working yet

- SSL handled by nginx revserse proxy

```bash
# Dev setup

# version manager for Ruby
# am using rbenv for production as seems simpler
# **NOTE USING ASDF any more as couldn't update to newer version**
# see Deploy section further down on this page

# 17th Jun 2024 - 0.10.0
# asdf update

# 3.3.3 on 17th Jul 2024
# asdf plugin add ruby
# asdf plugin-update ruby # for updates
# asdf install ruby latest

# asdf global ruby 3.3.3
# asdf reshim
# restart shell

# ignores version constraints from Gemfile and update to latest versions available
# eg rails is installed globally
gem update --system

# update system wide gems
gem update
# removes older version
gem cleanup

# updates project gems ie gemfile
bundle update

# 7.1.3.4 on 17th Jun 2024
gem install rails

# in ~/code/
# rails new railz3 -d postgresql -c tailwind

# am not using turbo and have complex file updloads so skip
rails new golfsubmit -d postgresql -c tailwind --skip-hotwire

# add to git which is ready initialised

# creates the 2 db's (development and test) in postgres
rails db:create 
rails db:mirate

# http://localhost:3000/   to see the splash page

# home controller with actions/endpoint of index and a view
rails g controller home index 

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
rails active_storage:install

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

Let's deploy to a standard Ubuntu 22.04 VM. I use proxmox and nginx on another vm to handle ssl via certbot (LetsEncrypt)

**note to myself - look in golfsubmit project for auto build**

[https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-22-04](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-22-04) - one I used without Nodejs


```bash
# use a non root user

# A few Rails features eg Asset Pipeline needs the javascript runtime so may have to install nodejs

## Ruby via rbenv
sudo apt update

# dependencies to install Ruby
sudo apt install -y git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev

# rbenv - install specific versin of Ruby globally, and can update
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash

# I don't think I need to do these 2
# echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
# echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc

# can take time here
# 22nd May 24 - up to date version
rbenv install 3.3.1

# 19th Jun 2024
rbenv install 3.3.3

rbenv global 3.3.1

## Gems

# Can delete the ~/gems directory to flush if getting weird errors from
# previous versions of Ruby or Rails.make


# no documnentation to turn off the generation so to speed up installs of gems
echo "gem: --no-document" > ~/.gemrc

# manages gem dependencies for projects

# A new release of RubyGems is available: 3.5.9 → 3.5.10!
# Run `gem update --system 3.5.10` to update your installation.
gem install bundler

# updated to rubygems-udpate-3.5.10
# bundler 2.5.10
gem update --system

# gems being installed to /home/dave/.rbenv/versions/3.3.1/lib/ruby/gems/3.3.0
# gem env home


## Rails

# install latest version - 7.1.3.3 as of 22nd May 24
# 7.1.3.4 on 19th Jun2024
gem install rails

# update ruby version shims
rbenv rehash

# need to render thumbnails of images in Spina
sudo apt-get install libvips42
```

Now we have Ruby and Rails installed. With Gems configured and it's bundler which 

### PostgreSQL


```bash
# 14.11
sudo apt-get -y install postgresql postgresql-contrib libpq-dev 

sudo vim /etc/postgresql/14/main/pg_hba.conf
# allow postgres user to connect locally without password
# local   all             postgres                                trust

# allow any local user to connect withouth password eg railz
# local   all             all                                     trust

# allow any user from anywhere with no password!
# host    all             all             0.0.0.0/0               trust


# listen_addresses = "*" if want to connect from dev machine for example
sudo vim /etc/postgresql/14/main/postgresql.conf

# need to start this service automatically
sudo systemctl enable postgresql
sudo systemctl start postgresql

sudo -iu postgres
psql

# nice convention of the site name needing a user with same name
CREATE ROLE railz WITH LOGIN PASSWORD 'password' SUPERUSER;

```

I've port forwarded port 5432 to my proxmox server then the vm. Through pfsense, firewall, NAT. Only from local network. 5432 is not open via my external router.


### Webserver

- Puma - which is the webserver I use in dev. Rails comes with a config/puma.rb config file.
- Passenger - integrates with nginx

```bash
rails new railz3 -d postgresql -c tailwind

# on first run this creates a config/puma.rb
# rails server

# create db manually
# bin/rails db:create

# runs tailwind css compiler
# bin/dev 

# expects a user called railz - cool bit of convention
RAILS_ENV=production bin/rails db:create
RAILS_ENV=production bin/rails db:migrate

# check postgres.. did it connect to the correct db by default?
sudo -iu postgres
psql
\l

# Precompile assets
# RAILS_ENV=production bundle exec rails assets:precompile

# Start the server in production mode
# had to change config/environmnets/production to no redirect to ssl
RAILS_ENV=production bundle exec rails server

# in another terminal
# this ran migrations
curl localhost:3000

## auto start on reboot
sudo vim /etc/systemd/system/railz3.service

# Add the following content to the service file (replace placeholders)
[Unit]
Description=My Rails Application

After=network.target

StartLimitBurst=5
StartLimitIntervalSec=600

[Service]
Type=simple
User=dave
WorkingDirectory=/home/dave/railz

# Ensure rbenv is properly initialized
Environment="RBENV_ROOT=/home/dave/.rbenv"
Environment="PATH=/home/dave/.rbenv/shims:/home/dave/.rbenv/bin:/usr/local/bin:/usr/bin:/bin"

# Command to start the Rails server
ExecStart=/home/dave/.rbenv/shims/bundle exec puma -C /home/dave/railz3/config/puma.rb

# I have see this keep restarting and not stop after 5.. strange
# expecially with an encrypted key problem
# had to git stash pop the credentials.yml.enc file back.
Restart=always

Environment="RAILS_ENV=production"

# found that reading from .env file hard so easier to pass like this
Environment="SMTP_ADDRESS=smtp.postmarkapp.com"
Environment="SMTP_USER=big_guid"
Environment="SMTP_PASSWORD=big_guid"

# Output to syslog
#StandardOutput=syslog
#StandardError=syslog
# StandardOutput=append:/home/dave/railz/log/rails_app_stdout.log
# StandardError=append:/home/dave/railz/log/rails_app_stderr.log

SyslogIdentifier=railz

[Install]
WantedBy=multi-user.target


sudo systemctl daemon-reload
sudo systemctl start railz.service
sudo systemctl restart railz.service

# enable on boot
sudo systemctl enable railz.service
sudo systemctl disable railz.service

sudo systemctl status railz.service
```

Wire up

```bash
# ssh to reverse proxy nginx
sudo vim /etc/nginx/sites-available/default

# wire up proxy_pass to new internal vm IP eg 172.16.44.120:3000
# check certbot is there

rails g controller home index about

# config/routes.rb
root "home#index"
```

## Certbot for LetsEncrypt

I'm using Azure Storage for this project to store files, so lets use that to keep a copy of certbot issued letsencrypt certs.

Keys are stored

```bash
# /etc/nginx/sites-available/default
ssl_certificate /etc/letsencrypt/live/hmsoftware.org/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/hmsoftware.org/privkey.pem;

# config is stored in /etc/letsencrypt/renewal/hmsoftware.org.conf
# to disable can put renew_before_expiry = 0
```

running it manually


```bash
sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

# entered email address, and lots of y/n questions
sudo certbot --nginx
```

lets copy the cert to dev

and the nginx config

```

```




## Git update on production

Pull for the first time a site that works on dev. And to update the site when changed are made on dev.

```bash
git pull

# copy .env file settings into the systemd file above

# get gems just for this project
bundle install

# generate
# rails secrets
EDITOR="vim" bin/rails credentials:edit
# created a config/master.key
# if this doesn't work delete the master.key and credentials.yml.enc


CREATE ROLE railz3 WITH LOGIN PASSWORD 'password' SUPERUSER;

RAILS_ENV=production bin/rails db:create

RAILS_ENV=production bin/rails db:migrate

# put in data for cms to work properly
# inserts data even though trying to craete tables
# todo fix this so only data
PGPASSWORD='password' pg_dump -U charlie -h localhost railz3_development > backup.sql

PGPASSWORD='password' psql -U railz3 -h localhost -p 5432 -d railz3_production < backup.sql


```

### Useful prod commands

```bash
git stash 

git stash pop

# if have updated Gemfile
bundle install

# if need to run migrations
RAILS_ENV=production bin/rails db:migrate

# /logs/production.log

# I need this for application to start
# maybe put in .bashrc?
export AZURE_ACCESS_KEY=
RAILS_ENV=production bundle exec rails assets:precompile


# start from command
RAILS_ENV=production bundle exec puma 

sudo vim /etc/systemd/system/railz3.service

sudo systemctl daemon-reload

# **remember to restart service to get latest changes**
sudo systemctl restart railz3.service

sudo systemctl stop railz3.service
sudo systemctl start railz3.service

sudo systemctl status railz3.service

# remember to open up port 25 outbound
```


oo



## OLD

[https://gorails.com/deploy/ubuntu/22.04](https://gorails.com/deploy/ubuntu/22.04) a good guide

[https://www.phusionpassenger.com/docs/tutorials/deploy_to_production/installations/oss/ownserver/ruby/nginx/](https://www.phusionpassenger.com/docs/tutorials/deploy_to_production/installations/oss/ownserver/ruby/nginx/) some updates through this guide which is good