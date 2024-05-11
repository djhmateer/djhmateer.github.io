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

<!-- [![alt text](/assets/2024-02-01/1.jpg "email"){:width="600px"}](/assets/2024-02-02/1.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email"){:width="800px"}](/assets/2024-03-03/2.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email")](/assets/2024-03-03/2.jpg) -->

<!-- [![alt text](/assets/2024-04-24/1.jpg "email")](/assets/2024-04-24/1.jpg) -->

I've been following Rob Conery for many years and respect his technical judgement / entrepreneurial attitude. So when he published [this article](https://bigmachine.io/courses/rails-revisited) it got me thinking:


<!-- [![alt text](/assets/2024-04-24/5.jpg "email"){:width="500px"}](/assets/2024-04-24/5.jpg) -->
[![alt text](/assets/2024-04-24/5.jpg "email")](/assets/2024-04-24/5.jpg)

Saying how he is moving away fom Javascript front end frameworks (which he'd been doing since 2017) back to RoR. [blog post](https://a.bigmachine.io/posts/a-strange-thing-happened-when-i-told-myself-to-shut-it)


Is Rails is having a resurgence?!

Is this useful technology to develop sites fast?

## What is Ruby on Rails

[Ruby on Rails](https://rubyonrails.org/) (Rails) is a web application framework written meant to mean to 'compress the complexity' of modern web apps.

[Rails](https://en.wikipedia.org/wiki/Ruby_on_Rails) has been around since 2004. 7.1.3.2 is latest. Written by David Heinemeier Hansson (DHH) of [37signals]()

[Ruby](https://en.wikipedia.org/wiki/Ruby_(programming_language)) started in 1995. v. 3.3.1 is latest as of 23rd April 2024. Written by Yukihiro Matsumoto (Matz)


## Who Uses Rails?

- [Basecamp](https://basecamp.com/) - Project Management Software
- [GitHub](https://github.com/) - [good discussion](https://github.blog/2023-04-06-building-github-with-ruby-and-rails/)
- [https://www.shopify.com/uk](https://www.shopify.com/uk)

## Discussions

[https://news.ycombinator.com/item?id=29577897](https://news.ycombinator.com/item?id=29577897)

[Building GH with Rails](https://news.ycombinator.com/item?id=35478884)

[https://news.ycombinator.com/item?id=40150045](https://news.ycombinator.com/item?id=40150045) some of  shopify team are on the core Rails/Ruby team

## Why Consider?

- Convention over configuration principle - so can build apps quickly with less boilerplate
- Rich ecosystem with gems (libraries)
- Testing - comes with own framework built in
- Active Record ORM

- King of effeciecy and productivity eg CRUD

Conventions, generators, tooling

- Language that is fun to use

It is simple compared to every front end framework which admittadly I'm not cognicent of at all eg: [https://astro.build/](https://astro.build/) which looks great. But.. it's just content for the most part. And I can get as much speed as I like with good servers.

I like to

> Enjoy the work I do every day.. so if that includes playing with a language just because.. then that is fine!

[exit plan](https://a.bigmachine.io/posts/what-s-your-exit-plan)

## Why Not Consider?

- Learning curve
- Less trendy? eg Node.js or Django.
- Scaling - typically requires more resources. However for me this is not a consideration (as backend power is what I can do)
- OOP - I really like the simplicity of functional based programming. I'm nervous about going back to full OOP.

## Alternatives

[https://survey.stackoverflow.co/2023/#most-popular-technologies-webframe](https://survey.stackoverflow.co/2023/#most-popular-technologies-webframe)

- [Node](https://github.com/django/django) - 104k stars
- [React](https://github.com/django/django) - 222k stars
- [Django](https://www.djangoproject.com/) - 76.8k stars on [GH](https://github.com/django/django)
- [Ruby on Rails](https://github.com/django/django) - 54.9k stars
- [ASP.NET Core](https://github.com/dotnet/aspnetcore) - 34.3k stars (but corporate driven)

## Whats wrong with ASP.NET Core

There are some things which bug me about the framework I've used for years:

- Authentication and Authorisation in ASP.NET Core. I had to roll my own to do simple Cookie based auth.
- DB Schema source control / Migrations are not built in
- Scaffolding of pages - I ended up never using that feature


Tangentially I've been using Python for non web based work and I really like how easy it is to work with, and how productive it is. Also not having the compile step is handy. Makes in situ updates easy.




## Where to Start?

Okay so after being bitten by the crazyness of Python package management and different versions on the same system, I'm being careful with Ruby.

ChatGPT4 says to use

- [rbenv](https://github.com/rbenv/rbenv) - so can have specific versions of ruby running (less intrusive than rvm)


[https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-22-04](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-22-04) looks similar

[https://guides.rubyonrails.org/getting_started.html](https://guides.rubyonrails.org/getting_started.html) doesn't mention rbenv


[https://gorails.com/setup/ubuntu/22.04](https://gorails.com/setup/ubuntu/22.04) - they used ASDF as a package manager to install  (over rbenv) as will use it to install Node.js as well

- [asdf](https://asdf-vm.com/) - version manager


## Install Ruby

[GoRails Setup](https://gorails.com/setup/windows/10) is where I got this:


```bash

sudo apt-get install git-core zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev

# Install Ruby using version manager called ASDF
cd
git clone https://github.com/excid3/asdf.git ~/.asdf
echo '. "$HOME/.asdf/asdf.sh"' >> ~/.bashrc
echo '. "$HOME/.asdf/completions/asdf.bash"' >> ~/.bashrc
echo 'legacy_version_file = yes' >> ~/.asdfrc
echo 'export EDITOR="code --wait"' >> ~/.bashrc
exec $SHELL

asdf update

# add plugins
# nodejs for frontend javascript
asdf plugin add ruby
asdf plugin add nodejs


# got warnings about can't preserve downloads
# there is 3.3.1 as of 23rd April 2024
# downloads come straight from https://www.ruby-lang.org/en/
asdf install ruby 3.3.1

asdf global ruby 3.3.1

# see all versions of everything installed with asdf
asdf list 
# uninstall
asdf uninstall ruby 3.3.0

gem update --system

# 3.3.1
ruby -v

```

## Install Nodejs

```bash
# 20.12.2 is latest LTS version on nodejs on 1st May 2024
asdf install nodejs 20.12.2
asdf global nodejs 20.12.2

which node
#=> /home/username/.asdf/shims/node

# may need to restart terninal to get correct node version
node -v
#=> 20.11.0

# npm and npmx 10.3.0 / 10.7.0 on nodejs 20.11.0
# npm and npx 10.5.0 on nodejs 20.12.2
npm -v

# Install yarn for Rails jsbundling/cssbundling or webpacker
# npm install -g yarn
```

I use Go for another site which uses npx. This install above has broken that pipeline fully. Can't even deploy to Netlify.


`hugo v0.92.2+extended linux/amd64 BuildDate=2023-01-31T11:11:57Z VendorInfo=ubuntu:0.92.2-1ubuntu0.1
ERROR 2024/05/02 11:29:22 Page.URL is deprecated and will be removed in Hugo 0.93.0. Use .Permalink or .RelPermalink. If what you want is the front matter URL value, use .Params.url
Error: Error building site: POSTCSS: failed to transform "css/styles.css" (text/css): unknown command: npx. Perhaps you have to reshim?`


I use Jekyll which uses Ruby for another site. This install has broken that too, but I can just deploy to Github Pages and it works there.

## Install Rails

```bash
# this installs the latest ie 7.1.3.2 on 29th Apr 2024
gem install rails

# 7.1.3.2
rails -v

rails new --help
```


## Install PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib libpq-dev

# allow passwords on local
sudo vim /etc/postgresql/14/main/pg_hba.conf
# change local local from peer to md5 **IF you want to be prompted
# change local local from peer to trust **better
# also do the postgrest local all to trust at top

sudo service postgresql start
sudo service postgresql restart

sudo service postgresql status

# WSL2 not the same as other distros
# this will start it
echo "sudo service postgresql start" >> ~/.bashrc



# put in bob user - must be a SUPERUSER so can create new db's
sudo -i -u postgres
psql
CREATE ROLE bob WITH LOGIN PASSWORD 'password';
CREATE ROLE charlie WITH LOGIN PASSWORD 'password' SUPERUSER;
#CREATE DATABASE test OWNER bob;
ALTER USER bob CREATEDB;

#OR create a new SUPERUSER
sudo -u postgres createuser --interactive --pwprompt
# charlie
# password


# test the connection
psql postgresql://bob:password@localhost:5432/test

rails new myapp -d postgresql

# config/database.yml
default: &default
  adapter: postgresql
  encoding: unicode

  host: localhost
  username: bob
  password: password 



# db needs to be created
# rails server will run migrations
rails db:create

\l # list all databases

DROP DATABASE myapp2_development

\c railz_development # connect to a database
\dt # list all tables
\q  # quit
```

To see queries in real time (like for mssql - monitor) I need to update 

```bash
# /etc/postgresql/14/main/postgresql.conf

logging_collector = on
log_directory = '/var/log/postgresql'
log_filename = 'raw-postgresql-%Y-%m-%d_%H%M%S.log'     # log file name pattern,
log_file_mode = 0777 # default is sudo only to read

```

## Code

[https://www.youtube.com/watch?v=Hwou03YqH4I](https://www.youtube.com/watch?v=Hwou03YqH4I) this video suggests putting code in `\code` so that it isn't in the Windows filesystem, thus will be much faster. I'm using `~/code`


[![alt text](/assets/2024-04-25/3.jpg "email"){:width="500px"}](/assets/2024-04-25/3.jpg)

This is what we're aiming for. 

The database needs to be there eg `rails db:create`. I'm getting strange errors after the db is created about auth. The problem was the db needed to be a superuser then the problem went away.

<!-- [![alt text](/assets/2024-04-25/4.jpg "email"){:width="500px"}](/assets/2024-04-25/4.jpg) -->
[![alt text](/assets/2024-04-25/4.jpg "email")](/assets/2024-04-25/4.jpg)

Then `rails s` will run migrations automatically to populate when the home page is loaded. It just has 2 empty tables.

```bash

rails new --help

rails new --database=postgresql #(mssql is there!)
rails new -d postgresql

# css prepreprocessor
rails new --css=tailwind
rails new -c tailwind


# create a new rails app
rails new railz -d postgresql -c tailwind

# runs a bundle install (gem package manager for Ruby which the Gemfile looks after)

# short for server
rails s
```

## Rails g Generators

[https://tailblocks.cc/](https://tailblocks.cc/) - Ready to use tailwind blocks which doesn't seem to be maintained? But looks good. Taking a header and hero from here.


```bash

# home controller will have 2 actions or endpoints - index and about
# /home/index
# /home/about

# /app/views/home/index.html.erb (erb is rails templating)
# /app/views/home/about.html.erb
rails g controller home index about

```

I've set VS Code keybinding to open file to `ctrl ;` by `File, Preferences, Keyboard Shortcuts`

```rb
# config/routes.rb

root "home#index"
```

put in header html into the `\app\views\layouts\application.html.erb`

## Tailwind

Tailwind CSS works by scanning all HTML, JS, and templates for class names. It then generates corresponding sytles and writes to a much smaller static CSS.

```bash
rails s # just runs webserver (Puma)

bin/dev # this starts webserver and tailwind compiler

# don't know how to resolve this warning
# 13:41:45 css.1  | Browserslist: caniuse-lite is outdated. Please run:
# 13:41:45 css.1  |   npx update-browserslist-db@latest
# 13:41:45 css.1  |   Why you should do it regularly: https://github.com/browserslist/update-db#readme
```


Then put in a Hero from Tailblocks.

## VS Code Extension

Ctrl Shift P - format document
 there is no formatter installed for ruby files (am looking at application.html.erb)

 try Ruby Solargraph - can't get formatter working

[![alt text](/assets/2024-04-25/5.jpg "email"){:width="500px"}](/assets/2024-04-25/5.jpg)

ERB Formatter/Beautify - had to run `gem install htmlbeautifier`

ERB Syntax highlight - seems to work

GH Copilot - seems very useful so far for code completion.


## Partials - Refactor out layout

As always use more than 1 layout - yep I do that too!

`vieww\layouts\_nav.html.erb`

```rb
<%=render "layouts/nav" %>
```

/home/about - want this to be /about

## Tests and Tools

scripts directory 

.env file - in the root for db settings etc.. Rails has a better way that encrypts stuff but I like this too. Will probably go towards a secrets directory.


```bash
# Makefile

.PHONY: run test

run:
    bin/dev

test:
    rails test
```

Useful to run `rails routes` to see what are our routes

So our generators created tests:

```rb
# test/controllers/home_controller_test.rb

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    # controller_action_ 
    # url - absolute
    # path - relative
    get home_index_url
    assert_response :success
  end

  test "should get about" do
    get home_about_url
    assert_response :success
  end
end
```

So this is quite a sensible test ie just make sure that each page returns a 200.


## Scaffold

`rails g scaffold user email:uniq name`

[![alt text](/assets/2024-04-25/6.jpg "email"){:width="500px"}](/assets/2024-04-25/6.jpg)

- db migration
- model - a user
- tests
- fixutre?
- route
- controller
- helpers / jbuilder

Notice said

- scaffold user command
- db table is users (plural)
- /users - index
- /users/1 - view
- /users/3/edit  

`rails destroy scaffold user`

wow this is good to delete everything!

`rails g scaffold user email:uniq name --no-jbuilder`


[![alt text](/assets/2024-04-25/7.jpg "email"){:width="500px"}](/assets/2024-04-25/7.jpg)

CRUD! UI is tailwind


[![alt text](/assets/2024-04-25/8.jpg "email"){:width="500px"}](/assets/2024-04-25/8.jpg)

```sql
sudo -i -u postgres
psql

-- list all databases
\l
\c railz2_development
select * from users;
```

There are bits and bobs behind the scenes which are created.

- test\models\user_test.rb - stubbed 
- test\system\users_test.rb - like a UI test. They are brittle. Looking for elements like H1's etc..
- test\fixtures\users.yml - data to run tests


```rb
# test\system\users_test.rb
class UsersTest < ApplicationSystemTestCase
  setup do
    # :one is a symbol an is immutable. Lighter than string value. Used to represent thing eg variables, methods, keys
    @user = users(:one)
  end
```

seems like I had to change

```yml
one:
  email: MyString
  name: MyString

two:
  email: MyString2
  name: MyString2
```

After updating the two above I was still getting a failing test. Looking at pg in real time (see setup above for turning on loggin) I saw the error being a conflict.

```sql
 LOG:  execute <unnamed>: INSERT INTO "users" ("email", "name", "created_at", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id"
2024-05-03 12:09:30.794 BST [100574] charlie@railz2_test DETAIL:  parameters: $1 = 'MyString', $2 = 'MyString', $3 = '2024-05-03 11:09:30.794441', $4 = '2024-05-03 11:09:30.794441'
2024-05-03 12:09:30.795 BST [100574] charlie@railz2_test ERROR:  duplicate key value violates unique constraint "index_users_on_email"
2024-05-03 12:09:30.795 BST [100574] charlie@railz2_test DETAIL:  Key (email)=(MyString) already exists.
2024-05-03 12:09:30.795 BST [100574] charlie@railz2_test STATEMENT:  INSERT INTO "users" ("email", "name", "created_at", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id"
2024-05-03 12:09:30.795 BST [100574] charlie@railz2_test LOG:  statement: ROLLBACK TO SAVEPOINT active_record_1
```
and from ruby side

```rb
Error:
UsersControllerTest#test_should_create_user:
ActiveRecord::RecordNotUnique: PG::UniqueViolation: ERROR:  duplicate key value violates unique constraint "index_users_on_email"
DETAIL:  Key (email)=(MyString) already exists.
```
Interesting.


## Spina CMS

Important to be able to manage content as a solopreneur which is why Wordpress is so popular.

[Spina CMS](https://github.com/spinacms/spina) 2.2k stars and very active. A modern Ruby on Rails CMS with Hotwire

[Prismic](https://prismic.io/) is an alternative. HEadless CMS ie just serves json back. but this is hosted, so if they go down, I go down.


[Installing Spina](https://spinacms.com/docs/getting-started/installing-spina)

```bash
# handles uploads
# default location is in \storage
# can change storage to be S3 or Azure or another CDN
rails active_storage:install

# Gemfile at end
# or could say: bundle add spina
gem 'spina'

bundle

# this is a rake task (the spina:install notation)
rails spina:install
```

However I got this

`rails spina:install
Unrecognized command "spina:install" (Rails::Command::UnrecognizedCommandError)
Did you mean?  yarn:install`

```bash
# /home/dave/gems/gems/spina-2.5.0
bundle info spina
```

### Gem version

The problem was the version of the gem

`gem info spina` gave me 2.5.0

[https://rubygems.org/gems/spina](https://rubygems.org/gems/spina) yet here the latest 2.18

So in the `Gemfile`

```rb
# force the latest
gem "spina", "~> 2.18"

bundle
```

[![alt text](/assets/2024-04-25/9.jpg "email"){:width="500px"}](/assets/2024-04-25/9.jpg)

Ah so turbo-rails is now downgrading to 1.5 from 2.0.5

## Spina

[![alt text](/assets/2024-04-25/10.jpg "email"){:width="500px"}](/assets/2024-04-25/10.jpg)

active_storage and spina have added lots of tables.


[http://localhost:3000/admin](http://localhost:3000/admin) is our CMS admin


<!-- [![alt text](/assets/2024-04-25/11.jpg "email"){:width="500px"}](/assets/2024-04-25/11.jpg) -->
[![alt text](/assets/2024-04-25/11.jpg "email")](/assets/2024-04-25/11.jpg)

Added another page on the backend, and it has hijacked our /about route.

It's using

```bash
# default is the template name
# homepage template is only for the homepage
- app/views/default/pages/homepage.html.erb

# shared is for all others
- show.html.erb
```

In `routes.rb` we can change the order so that some pages are served by Rails and others by the CMS.

We could also mount spina off a subroot like /blog

`git checkout -b spina` - working in a branch.

## Spina Layout

Our /about page is now powered by Spina (in routes.rb)

Spina application layout is in `app/views/layouts/default/application.html.erb`

```html
<!DOCTYPE html>
<!-- spina application template -->
<html>
  <head>
    <title><%= current_spina_account.name %></title>
    <%= csrf_meta_tags %>
    <%= stylesheet_link_tag "tailwind", "inter-font", "data-turbo-track": "reload" %>
    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>
  <body>
    <%= render "layouts/nav" %>
    <main class="container mx-auto mt-28 px-5 flex">
      <%= yield %>
    </main>
  </body>
</html>
```

Original non Spina layout is in `app/views/layouts/application.html.erb` and partial in `_nav.html.erb`

```html
<!DOCTYPE html>
<!-- rails application template -->
<html>
  <head>
    <title>Railz2</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <%= stylesheet_link_tag "tailwind", "inter-font", "data-turbo-track": "reload" %>
    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>
  <body>
    <%= render "layouts/nav" %>
    <main class="container mx-auto mt-28 px-5 flex">
      <%= yield %>
    </main>
  </body>
</html>
```

## Customise Spina so H1's etc are rendered by Tailwind

We're going to get separate parts of the page editable by the backend as the editor [Trix]() only generates vanilla html tags with no classes.


`config/initializers/themes/default.rb` - tweak theme settings.. including spina.

Add a new `theme.part` called summary.

Add summary
`{name: "show", title: "Page", parts: %w[text summary]}`

%w is words - dont need quotes or commas


[![alt text](/assets/2024-04-25/12.jpg "email"){:width="500px"}](/assets/2024-04-25/12.jpg)

Nice - we get a new part of the CMS

Data is saved as Jsonb (binary) in postgres

`/app/views/default/pages/show.html.erb` - 

## Can't see image previews

```bash

# am getting these errors on uploading and trying to view an image

# 08:31:16 web.1  | LoadError (Could not open library 'vips.so.42': vips.so.42: cannot open shared object file: No such file or directory.
# 08:31:16 web.1  | Could not open library 'libvips.so.42': libvips.so.42: cannot open shared object file: No such file or directory.
# 08:31:16 web.1  | Searched in <system library path>, /usr/lib, /usr/local/lib, /opt/local/lib):

# Gemfile
# uncommented gem "image_processing", "~> 1.2"

sudo apt-get install libvips42

```

Installing libvips42 did the trick. Didn't need the gemfile update?


## Editing the show.html.erb template
asdf

# Creating dedicated templates

So this is important - having a CMS that can edit the front of the site well. And not have to worry about shipping new templates all the time.

[https://bigmachine.io/courses/rails-revisited/creating-a-sales-page-the-repeater](https://bigmachine.io/courses/rails-revisited/creating-a-sales-page-the-repeater)

[sales-page.png](https://copywritingcrew.com/wp-content/uploads/2021/11/sales-page.png)

There is a formula, so lets use this formula in the CMS


```html
<!-- /app/views/default/pages/sales.html.erb -->
<!-- what problem are you trying to solve -->
<section id="hook">
</section>

<!-- further define the problem -->
<section id="problem">

<section id="empathy">
</section>

<!-- so I made this thing -->
<section id="solution"></section>
<!-- these are the benefits for you -->
<section id="benefits"></section>
<!-- who am I -->
<section id="cred"></section>
<section id="proof"></section>
<!-- here is my offer to you today -->
<section id="offer"></section>
<section id="guarantee"></section>
<section id="cta"></section>
```

How do we do sections like above in Spina?

`/config/initializers/themes/default.rb` - Theme configuration file. Define everything that's editable in Spina.

- can't use part eg a Hero part - as we're allowed only 1 part type eg ::Text, ::Line
- can't use view_template as this corresponds to a page
- could use a custom part.. but repeater easier
- 

```rb
#/config/initializers/themes/default.rb
  theme.parts = [
    {name: "text", title: "Body", hint: "Your main content", part_type: "Spina::Parts::Text"},
    {name: "title", title: "Title", part_type: "Spina::Parts::Line"},
    {name: "summary", title: "Summary", hint: "A summary for your page", part_type: "Spina::Parts::Line"},
    {name: "image", title: "Image", hint: "An image for your stuff", part_type: "Spina::Parts::Image"},
    {name: "link", title: "Link", hint: "A URL", part_type: "Spina::Parts::Line"},
    {name: "linktext", title: "Link Text", hint: "The text for a link", part_type: "Spina::Parts::Line"},
    {name: "problem", title: "Problem", part_type: "Spina::Parts::Repeater", parts: %w[title text image link linktext]},
    {name: "empathy", title: "Empathy", part_type: "Spina::Parts::Repeater", parts: %w[title text image link linktext]},
  ]

  # View templates
  # Every page has a view template stored in app/views/my_theme/pages/*
  # You define which parts you want to enable for every view template
  # by referencing them from the theme.parts configuration above.
  theme.view_templates = [
    {name: "homepage", title: "Homepage", parts: %w[text]},
    {name: "show", title: "Page", parts: %w[summary text image link linktext]},
    {name: "sales", title: "Sales Page", parts: %w[summary text image link linktext problem empathy]},
  ]
```

## Sales Page - The Layout

Make a hero partial `app/views/spina/pages/_hero.html.erb`

[![alt text](/assets/2024-04-25/13.jpg "email"){:width="500px"}](/assets/2024-04-25/13.jpg)

Notice the slug is now `\widgets` rathen than the long title.

View Template called Sales which is selected when we create a New Page.

Which has a `Parts` called 

- title (every page has to have a title)
- summary::Line
- text named Body ::Text
- image ::Image
- link ::Line
- linktext ::Line
- problem ::Repeater
- empathy ::Repeater

`problem` repeater and `empathy` repeater contain multiple parts.

- title
- text named Body
- image 
- link
- linktext

Then in `app/views/default/pages/sales.html.erb` we can wire it up so it can display many problems.

```html
<!-- app/views/default/pages/sales.html.erb -->
<section id="hook">
  <%=render("hero")%>
</section>

<%if(current_page.content(:problem))%>
<section id="problem">
<%current_page.content(:problem).each do |problem|%>
<section class="text-gray-600 body-font">
  <div class="container px-5  mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
        <%=problem.content(:title)%>
      </h1>
      <div class="lg:w-2/3 mx-auto leading-relaxed text-base">
        <%=problem.content.html(:text)%>
      </div>
    </div>
  </div>
</section>
<%end%>
</section>
<%end%>

<section id="empathy">

</section>
<section id="solution"></section>
<section id="benefits"></section>
<section id="cred"></section>
<section id="proof"></section>
<section id="offer"></section>
<section id="guarantee"></section>
<section id="cta"></section>
```


## What should go in the CMS / Console CLI / Spina Resources for Posts

Stuff that will be updated a lot / by others.

- Sales content
- Raw page content
- Stuff you don't want to redeploy if just a spelling mistake
- Blog posts

```bash
# console - CLI
rails c

# Creates a new user in Rails
# inserts into users table
User.create(email: "test@test.com", name: "Bobby")

# delete
User.find(2).destroy

# Creating a Resource in Spina either by CLI or Migrations
# Access a model inside a module/namespace use ::
# a dot access the methods on the clsas or module 
Spina::Resource.create(name: "Posts", label: "Posts")

# delete
Spina::Resource.find(1).destroy
```

<!-- [![alt text](/assets/2024-04-25/14.jpg "email"){:width="500px"}](/assets/2024-04-25/14.jpg) -->
[![alt text](/assets/2024-04-25/14.jpg "email")](/assets/2024-04-25/14.jpg)

Created a new Resource inside Spina.

## Migration

```bash

# creates in /db/migrate/
rails g migration AddCoursesAndLessonsToSpina

```

Create temp models to help importing data

```rb
# /models/course.rb
class Course < ApplicationRecord
    has_many :lessons
end

# /models/lesson.rb
class Lesson < ApplicationRecord
  belongs_to :course
end

## /db/migrate/...rb


# need to make sure the course table is added
rails db:migrate

```

## PGAdmin 

[https://www.postgresql.org/ftp/pgadmin/pgadmin4/](https://www.postgresql.org/ftp/pgadmin/pgadmin4/)

```bash
# sudo nano /etc/postgresql/14/main/postgresql.conf
listen_addresses = '*'

# sudo vim pg_hba.conf
# add to end to allow password authentication from any IP
host    all             all             0.0.0.0/0               md5

sudo systemctl restart postgresql

# 172.23.16.249
ip addr show eth0
```

[![alt text](/assets/2024-04-25/15.jpg "email"){:width="500px"}](/assets/2024-04-25/15.jpg)

Nice to have a viewer of the db. Running on Windows, talking to WSL2 instance of Postgres.

Courses table

- id (I'm a fan of course_id) name here. but lets see... Identity. Int or Bigint
- name. Text or varchar (character varying)

```sql
ALTER TABLE courses
ADD COLUMN id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY;

CREATE TABLE courses
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    name text,
    CONSTRAINT courses_pkey PRIMARY KEY (id)
)

-- right click on table, backup, Table Options: Use Column Inserts.
INSERT INTO public.courses (id, name) VALUES (1, 'Computer Science Fundamentals');
INSERT INTO public.courses (id, name) VALUES (2, 'Going Out on Your Own as a Solo Programmer');
```

[![alt text](/assets/2024-04-25/18.jpg "email"){:width="500px"}](/assets/2024-04-25/18.jpg)

PGAdmin showing how to create an Identity column Lessons, Right Click Properties, Columns, Edit id, Constraints.

FK addition is on the table level top menu of window: Constraints.

```bash
# redo a migration
rails db:migrate:redo

rails db:rollback
```

then

```rb
class AddCoursesAndLessonsToSpina < ActiveRecord::Migration[7.1]
  # was def change

  # be specific about up and down so can go back
  def up
    # volatile method option (!) ie it will throw an error if it fails
    # ie it will swallow the error if it fails.. so lets force it to throw

    # create a new Resource in the spina admin
    res = Spina::Resource.create!(name: "courses", label: "Courses")

    # query existing courses from the courses table using our temp model
    courses = Course.all 

    # iterate over each course and create a new page in the spina admin
    courses.each do |course|
      page = Spina::Page.create!(
        name: course.name, 
        title: course.name, 
        resource: res)
    end
  end

  def down
    # delete all pages that have a resource_id of the courses resource
    # have to do this first otherwise it will fail due to depedant pages
    Spina::Page.where(resource_id: Spina::Resource.find_by(name: "courses").id).destroy_all

    # then once we've deleted the pages, we can delete the resource
    Spina::Resource.find_by(name: "courses").destroy
  end

end
```

[![alt text](/assets/2024-04-25/16.jpg "email"){:width="500px"}](/assets/2024-04-25/16.jpg)

Imported data into the CMS using little ETL migration. All using ActiveRecord ORM.

create a new page template

```html
<!-- app/views/default/pages/course.html.erb -->

<h1>Course</h1>
```

So we're making sure we can edit course material in the CMS

Need to edit the theme

```rb
# /app/config/initializers/themes/default.rb
  theme.parts = [
    {name: "text", title: "Body", hint: "Your main content", part_type: "Spina::Parts::Text"},
    {name: "body", title: "Body", hint: "Your main content", part_type: "Spina::Parts::Text"},
    {name: "title", title: "Title", part_type: "Spina::Parts::Line"},
    {name: "slug", title: "slug", hint: "slug", part_type: "Spina::Parts::Line"},
    {name: "summary", title: "Summary", hint: "A summary for your page", part_type: "Spina::Parts::Line"},
    {name: "image", title: "Image", hint: "An image for your stuff", part_type: "Spina::Parts::Image"},
    {name: "link", title: "Link", hint: "A URL", part_type: "Spina::Parts::Line"},
    {name: "linktext", title: "Link Text", hint: "The text for a link", part_type: "Spina::Parts::Line"},
    {name: "problem", title: "Problem", part_type: "Spina::Parts::Repeater", parts: %w[title text image link linktext]},
    {name: "empathy", title: "Empathy", part_type: "Spina::Parts::Repeater", parts: %w[title text image link linktext]},
  ]

  # View templates
  # Every page has a view template stored in app/views/my_theme/pages/*
  # You define which parts you want to enable for every view template
  # by referencing them from the theme.parts configuration above.
  theme.view_templates = [
    {name: "homepage", title: "Homepage", parts: %w[text]},
    # {name: "show", title: "Page", parts: %w[text]}
    {name: "show", title: "Page", parts: %w[summary text image link linktext]},
    {name: "sales", title: "Sales Page", parts: %w[summary text image link linktext problem empathy]},
    {name: "course", title: "Course Page", parts: %w[slug summary body]},
  ]
```

[![alt text](/assets/2024-04-25/17.jpg "email"){:width="500px"}](/assets/2024-04-25/17.jpg)

Have added a new Resource called Courses. Imported data into Spina tables using a migration, and now we can edit Course text using the CMS.

Have also added Pages based off this new Resource where we've hacked in the correct json.


## Lessons

A Course can contain multiple Lessons. I've setup a new table with an FK Constraint.

`app/views/default/pages/lesson.htm.erb` - ```<h1>lesson</h1>``` - Page template (for front end)

`config/initializers/themes/default.rb` - Spina CMS where you define everything that is editable

- new view_template called lesson. With parts: slug vimeo summary body
- new part vimeo which is a Line.

`db/migrate/20241234_add_courses_and_lessons_to_spina.rb` - migration.

```bash
# down
rails db:rollback

# up
rails db:migrate

# both
rails db:migrate:redo

```

[![alt text](/assets/2024-04-25/19.jpg "email"){:width="500px"}](/assets/2024-04-25/19.jpg)

Have got a 1 to many relationship now in the CMS.


[![alt text](/assets/2024-04-25/20.jpg "email"){:width="500px"}](/assets/2024-04-25/20.jpg)

Can embed an image with the Trix editor which uploads to ActiveStorage. A Rails plugin. In dev it stores data on disk. In prod it can be S3, GCS, Azure etc.. look in `config/storage.yml`


## Making an Embed


[https://spinacms.com/docs/rendering-content/rich-text](https://spinacms.com/docs/rendering-content/rich-text) 


[![alt text](/assets/2024-04-25/21.jpg "email"){:width="500px"}](/assets/2024-04-25/21.jpg)

`/config/initializers/themes/default.rb` at the bottom put in `  theme.embeds = %w(button youtube vimeo)`



### create a gist


```bash
 rails g spina:embed gist url

#create  app/models/spina/embeds/gist.rb
#create  app/views/spina/embeds/gists/_gist_fields.html.erb
#create  app/views/spina/embeds/gists/_gist.html.erb
```

[![alt text](/assets/2024-04-25/22.jpg "email"){:width="500px"}](/assets/2024-04-25/22.jpg)

The CMS input form

[![alt text](/assets/2024-04-25/23.jpg "email"){:width="500px"}](/assets/2024-04-25/23.jpg)

The output

Rob has a raw html embed too.


## Real world - routing

Lets have Spina only doing the bits I want and I'll handle the rest of the site so can keep control.

`/app/views/layouts/application.html.erb` - rails application template

`/app/views/layouts/default/application.html.erb` - spina application template

`/config/routes.rb` - eg /home/index, /, and the rest is spina


We scaffolded out /users etc.. above. `rails g scaffold user email:uniq name --no-jbuilder`

which gave us a UI and CRUD.

```rb
# /config/initializers/spina.rb
config.disable_frontend_routes = true
```

### Catch_all and thoughts

Nice feature to try and serach for older routes coming in.

Have also got pwned and pwned2 rendering html from a view as a special page (not Spina)


**bits are not working in the catch_all

Use whatever headless cms.. just get content out of templates so can scale your business.


 ## Authentication with Devise

[![alt text](/assets/2024-04-25/24.jpg "email"){:width="500px"}](/assets/2024-04-25/24.jpg)

Spina has it's own simple authentication, handled by spina_users table.

[Devise](https://github.com/heartcombo/devise) is a Rails authentication solution. 23.7k stars. [install](https://github.com/heartcombo/devise#getting-started)

```bash
# adds a line in Gemfile
bundle add devise

# creates config/initializers/devise.rb
# config/locales/devise.en.yml
rails generate devise:install

# follow instructions

# add this line into /config/environments/development.rb
# just so that emails have the correct url port.. not relative... but absolute.
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

Rails has an alerts system called Flash which can output messages.

```html
<!-- add to /app/views.layouts/application.html.erb -->
<!-- rails application template -->
<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>
```

`rails generate devise User` - creates a migration. Using our existing User model which we defined at the start.

Also it created a route. `devise_for :users`

In the migration, leave the core stuff ie email and password.

Change the migration as we have the email address column and index already.

`rails db:migrate`


`rails routes` - we we can see the new routes that devise has setup with teh `devise_for :users` in routes.rb

/users/sign_in
/users/sign_up
/users/sign_out

Why go passwordless

- so in a databreach we don't lose the users password
- poor mans 2FA ie send email and get them to click a link

### devise-passwordless

Am not using.. (have commented out the passwordless commands)

[https://github.com/abevoelker/devise-passwordless](https://github.com/abevoelker/devise-passwordless) 189 stars

Send an email to the user, they click a link, then they are logged in.

```bash
# show all the generators we have
rails g

# generates tons of views in /aoo/views/devise/
rails g devise:views

# we could see the logic in the controllers
# rails g devise:controllers

# app/views/devise/sessions/new.html.erb
# login page

# Gemfile
# gem "devise-passwordless"

# bundle

# rails g devise:passwordless:install

# inserted something into /config/initializers/devise.rb - this is entire config for devise
change `config.mailer_sender` to "dave@hmsoftware.co.uk" in devise.rb

# created: app/views/devise/mailer/magic_link.html.erb
# inserted: config/locales/devise.en.yml

```

### Mailers setup

`config/initializers/devise.rb` - this is entire config for devise. Change `config.mailer_sender` to "dave@hmsoftware.co.uk"

`app/mailers/application_mailer.rb` - change the from address here to `dave@hmsoftware.co.uk`

Application mailer view is in `app/views/layouts/mailer.html.erb` and also the text 

Devise mailer is what we'll be using.

```bash
# .env
SMTP_ADDRESS=smtp.postmarkapp.com
SMTP_USER= big_guid
SMTP_PASSWORD= big_guid

# config/environments/development.rb
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

  config.action_mailer.perform_caching = false

  # DM added this so that even in dev it will send an email
  config.action_mailer.smtp_settings = {
    address: ENV['SMTP_ADDRESS'],
    user_name: ENV['SMTP_USER'],
    password: ENV['SMTP_PASSWORD'],
  }
```

We want to change the text as it gets into spam: magic, link, download are all flags


### Passwordless

I've not done this 

```rb
#app/models/user.rb

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  devise :database_authenticatable, :registerable,
 # devise :magic_link_authenticatable,
         :recoverable, :rememberable, :validatable
         #:validatable
end


# config/routes.rb
 resources :users,
    #controllers: { sessions: "devise/passwordless/sessions" }

#then delete devise passwords

#rm -rf app/views/devise/passwords
#rm -f app/views/devise/mailer/password_change.html.erb
#rm -f app/views/devise/mailer/reset_password_instructions.html.erb

# update nav template to links to the new session ie login page
 <a href="<%= new_user_session_path %>" 

```


For passwordsless I got - `Invalid Email or password.` prompt. So something isn't wired up right. Let's revert back to the simple version of only devise username and password flow.

For standard devise I got a successful sign in but no email sent by default?

Also I can't so a /users/sign_out

- davemateer@gmail.com - is my default user.. 
- djhmateer@hotmail.com / letmein is test
- djhmateer@outlook.com / letmein is test

Reset password did work to email (went to junk though)

## Logging Out

Add this to `_nav.html.erb`

```html
    <!-- rubyism ? means returning true or false -->
    <%if(user_signed_in?)%>

    <%=link_to "Logout", destroy_user_session_path, method: :delete, class: "inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"%>

    <%else%>
    <a href="<%= new_user_session_path %>" class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
    </a>
    <%end%>
```

But it doesn't work.. turbolinks is somehow sending it to get insead of delete verb.

> Error: Couldn't find User with 'id'=sign_out

Solution was to change to `button_to` instead of a href. [More info](https://github.com/heartcombo/devise?tab=readme-ov-file#hotwireturbo) on another workaround.


## Adding social login - OmniAuth

HERE
[https://github.com/settings/developers](https://github.com/settings/developers) Setup an OAuth application.

- Callback URL:
- Enable Device Flow - tick this

```bash
#env
GITHUB_ID
GITHUB_SECRET
```

Also setup on Google OAuth app as well.

[https://github.com/heartcombo/devise/wiki/OmniAuth:-Overview](https://github.com/heartcombo/devise/wiki/OmniAuth:-Overview)


```bash
gem 'omniauth-github'
gem 'omniauth-rails_csrf_protection'

bundle

# shorthand generator command
# want to add fields provider and uid
rails g migration AddOmniauthToUsers provider:string uid:string

rake db:migrate

# declare provider in config/initializers/devise.rb
# GH need to ask it to send back the email
# Google don't need this
config.omniauth :github, ENV["GITHUB_ID"], ENV["GITHUB_SECRET"], scope: "user:email"

# app/models/user.rb
devise :omniauthable, omniauth_providers: %i[facebook]

## NEED TO DO PAGE
# app/views/devise/sessions/new.html.erb
# add outside the form as we're not posting and email or password from user
# Rob disabled turnolinks for entire project as was getting in the way
<%= button_to "Sign in with GitHub", user_github_omniauth_authorize_path, data: { turbo: false } %>

# routes.rb
 devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

# create new controller controller/users/omniauth_callbacks_controller.rb
asdf


# implement in model - user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[github]
  
   # self. is static
   def self.from_omniauth(auth)
    user = User.find_by(email: auth.info.email)

    # if we don't have a user..
    unless user
      user = User.create!(
        email: auth.info.email, 
        provider: auth.provider,
        uid: auth.uid,
        # user.name: auth.info.name,
        name: auth.info.name,
        )
     end
     user
   end
end
```

I noticed that it deleted my encrypted password (as I'd signed up before as a User).


## Integrating Devise and Spina

Currently looking in `spina_users` table.

[https://spinacms.com/docs/advanced/authentication](https://spinacms.com/docs/advanced/authentication)


/config/initializers gets loaded first

the everything in /lib (which is meant for anyting outside normal rails eg service classes)

So put authentication module in initalizers. `bigauth.rb`

```rb
# /initializers/bigauth.rb
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

```

then in 

```rb
# app/models/users.rb
   def is_admin?
    return true if email == "davemateer@gmail.com"
   end
   
```

then

```rb
# initializers/spina.rb
# our module 
config.authentication = "BigAuth"
```

### login and logout

```rb
# config/routes.rb
  devise_for :users, 
    path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register' },
    controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

```

- /login
- /logout
- /register


## The Rewrite

pgdump out existing database and put into `/db/db.sql` - I've used the [Chinook sample db](https://github.com/lerocha/chinook-database/releases/tag/v1.4.5) here.

I've used a modified version of the db so all table names are plural (Rails convention)

```sql
-- generate sql to drop all tables in db
SELECT 'DROP TABLE IF EXISTS "' || tablename || '" CASCADE;' 
FROM pg_tables 
WHERE schemaname NOT IN ('pg_catalog', 'information_schema');

DROP TABLE IF EXISTS "artist" CASCADE;
DROP TABLE IF EXISTS "employee" CASCADE;
DROP TABLE IF EXISTS "customer" CASCADE;
DROP TABLE IF EXISTS "invoice" CASCADE;
DROP TABLE IF EXISTS "invoice_line" CASCADE;
DROP TABLE IF EXISTS "track" CASCADE;
DROP TABLE IF EXISTS "playlist" CASCADE;
DROP TABLE IF EXISTS "playlist_track" CASCADE;
DROP TABLE IF EXISTS "genre" CASCADE;
DROP TABLE IF EXISTS "media_type" CASCADE;
DROP TABLE IF EXISTS "album" CASCADE;
```

then do any changes in `/db/change.sql`

```sql
-- /db/change.sql
alter table album
add price numeric(10,2) not null default 0;
```


```bash
# Makefile
# WATCH OUT FOR TABS and SPACE - use chatgpt to sanity check the file.

# Targets which build things. EVerntually they are all supposed to go together
# to build final software eg rebuild

# Recipes eg db:migrate

# Dependencies eg dev change schema migrate

# if I run make the first command will be executed
# and this will do recipes in order
.PHONY: run test rebuild dev change schema migrate

rebuild: dev change schema migrate

# drops and recreates the chinook table of our railz2_development database
# putting in all data too
dev:
	psql -q railz2_development < db.sql

change:
	psql -q railz2_development < change.sql

schema:
	rails db:schema:dump

migrate:
	rails db:migrate
```

Could use migrations - but I agree with Rob, that this is a great way to move fast and easily.

### schema.rb

`rails db:schema:dump` - writes to /db/schema.rb

This is generated every time you run a migration or you run this command above. This is how activerecord knows what it is doing.

so if we don't want sku

```sql
-- /db/change.sql
alter table albums
drop sku;

-- then run rails db:schema:dump

-- we don't have that in our app / activerecord anymore
```

## Scaffold Existing Data - Plural Table Names

Create new directory in the root called scripts

```bash
# /scripts/scaffolds.sh
# do  order that want to see on form
rails g scaffold customer first_name last_name email:uniq company address city state country postal_code phone fax  --no-migration --no-jbuilder

# /scripts/xscaffolds.sh
rails destroy scaffold customer
```

My chinook database had customer instead of customers as the table name. By convention Rails expects db table names to be plural. So I changed all table names.

- scaffold customer command
- db table is customers (plural)
- /customers - index
- /customers/1 - view
- /customers/3/edit  
- /customers/new

Now we have CRUD forms

So lets build our our app using these RESTful routes.

[tailblocks.cc](https://tailblocks.cc/) Team element to show a grid of our customers


[![alt text](/assets/2024-04-25/25.jpg "email"){:width="500px"}](/assets/2024-04-25/25.jpg)

Can see our customers as we edited the `app/views/customers/index.html.erb` file. Click a link takes us to the edit page.


## Scaffold Everything

Here is a FK in albums

```bash
# scripts/scaffolds.sh

# do order that want to see on form
rails g scaffold customer first_name last_name email:uniq company address city state country postal_code phone fax  --no-migration --no-jbuilder

# references tells us about the FK
# hint about the price being decimal 
rails g scaffold album title artist:references price:decimal --no-migration --no-jbuilder


rails g scaffold artist name:uniq --no-migration  --no-jbuilder

rails g scaffold employee first_name last_name email:uniq title reports_to:int birth_date:date hire_date:date address city state country postal_code phone fax  --no-migration --no-jbuilder

rails g scaffold genre name:uniq --no-migration  --no-jbuilder

# 1 to many - ie 1 customer has many invoices (setup here)
# 1 to many - ie 1 invoice can have many invoice_lines (not setup here)
# so the items by hand later and not in scaffold
# scaffolding is good to think about what forms we want
rails g scaffold invoice customer:references invoice_date:date billing_address billing_city billing_state billing_country billing_postal_code total:decimal --no-migration  --no-jbuilder


rails g scaffold media_type name:uniq --no-migration --no-jbuilder

# paylist_tracks is a many to many relationship
# so that table doesn't need a scaffold
rails g scaffold playlist name:uniq --no-migration --no-jbuilder

rails g scaffold track name composer milliseconds:integer bytes:integer unit_price:decimal album:references media_type:references genre:references --no-migration  --no-jbuilder
```

remember to have the destroy script there too. But don't want to be running destroy once we've started editing the views.

```bash
# /scripts/xscaffold.sh

# have worked on view so comment this out as dont want to destroy it
# rails destroy scaffold customer

rails destroy scaffold album
rails destroy scaffold artist
rails destroy scaffold employee
rails destroy scaffold genre
rails destroy scaffold invoice
rails destroy scaffold media_type
rails destroy scaffold playlist
rails destroy scaffold track
```

to run the script:

`source scripts/scaffold.sh`

Now we have

- /artists
- /albums
- /genres
- /invoices
- /media_types
- /playlists
- /tracks

`source scripts/xscaffold.sh`

`git commit -am "all scaffolds"`


## Many to Many Assoc

[db diagram](https://private-user-images.githubusercontent.com/135025/299867754-cea7a05a-5c36-40cd-84c7-488307a123f4.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTU0MDM5OTIsIm5iZiI6MTcxNTQwMzY5MiwicGF0aCI6Ii8xMzUwMjUvMjk5ODY3NzU0LWNlYTdhMDVhLTVjMzYtNDBjZC04NGM3LTQ4ODMwN2ExMjNmNC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNTExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDUxMVQwNTAxMzJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05MzU0N2RkMTU2NWFiOWYxODUyODE4YTFhNzc4ZDdhNjIwMWYxY2IyNzc5ZmJhNDVlOWY4YThhYzMwZmJmY2M5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.7etCGDOeaQLWirg9czUmQaT5vi26tXAGuRCFsFoIE6k)

Between Tracks and Playlists is a many to many, so how to we add tracks to a playlist?

We already have a 1 to many with

```rb
class Invoice < ApplicationRecord
  # 1 Customer can have many Invoices
  # association method
  belongs_to :customer
end



class Playlist < ApplicationRecord
  # 1 to many relationships
  # has_many
  # belongs_to

  # notice I have to link up on both sides
  # convention: rails looks for link table
  # called playlists_tracks (has to be alphabetical order)

  # 1 playlist can have many trakcs
  # 1 track can be in many playlists
  has_and_belongs_to_many :tracks
  
end


class Track < ApplicationRecord
  # these were put in here by our scaffolding
  # 1 album can have many tracks
  belongs_to :album
  # 1 media type can have many tracks
  belongs_to :media_type
  # 1 genre can have many tracks
  belongs_to :genre

  # 1 playlist can have many trakcs
  # 1 track can be in many playlists
  # link table is playlists_tracks
  has_and_belongs_to_many :playlists
end
```

can test associations with 

```bash
rails c

t = Track.first
p = Playlist.first

# tracks is a method on the instance of p 
# that returns a collection of Tracks
# << is add an item to a collection
# we get an error as this track has been added already to the playlist
# dupe key on playlists_tracks

p.tracks << t

```

## Editing many to many - form

Playlists view

- _form.html.erb -  1 button (form.submit helper). Displays Create or Update Playlist
- _playlist.html.erb - just shows 

- edit.html.erb - edit. Has 3 buttons. Update Playlist, Show this playlist, Back to playlists
- index.html.erb - all the playlists
- new.html.erb - new. 1 button - Back to playlists
- show.html.erb - show. Has 3 buttons - Edit, Back, Destroy


```html
  <h2>Tracks</h2>
  <table>
  <!-- collection_check_boxes method is used to create checkboxes for a collection of objects. -->
  <!-- track_ids is the name of the checkbox -->
  <!-- when post it back it will send an array to our controller 
    Track.all is the data - so we will do all of them
    :id is the value of the checkbox
    :name is the label of the checkbox
  -->
    <%=form.collection_check_boxes :track_ids, Track.all, :id, :name do |b| %>
      <tr>
        <td><%= b.check_box %></td>
        <td><%= b.label %></td>
      </tr>
    <% end %>
```

Notice `track_ids` not `tracks_ids`

[![alt text](/assets/2024-04-25/26.jpg "email"){:width="500px"}](/assets/2024-04-25/26.jpg)

This is brilliant - have spent many hours in other frameworks getting this right.


```rb
# app/controllers/playlists_controller.rb
# Only allow a list of trusted parameters through.
def playlist_params
  # params.require(:playlist).permit(:name)
  # to prevent overposting we need to permit the track_ids
  params.require(:playlist).permit(:name, track_ids: [])
    end
```

[![alt text](/assets/2024-04-25/27.jpg "email"){:width="500px"}](/assets/2024-04-25/27.jpg)

Brilliant!

Added the view code, then allowed the posting via the controller.


## More complex many to many

Essentially a realtionship without a link table.

1 Artist has many albums

```rb
class Artist < ApplicationRecord
    # strange that this is not generated by scaffold
    has_many :albums
    has_many :tracks, through: :albums
end

# our 'link' table
class Album < ApplicationRecord
  # 1 artist can have many albums
  # generated by scaffold
  belongs_to :artist

  has_many :tracks
end

class Track < ApplicationRecord
  belongs_to :album
  # these were put in here by our scaffolding
  # 1 album can have many tracks
  belongs_to :album
  # 1 media type can have many tracks
  belongs_to :media_type
  # 1 genre can have many tracks
  belongs_to :genre

  # 1 track can be in many playlists
  # 1 playlist can have many tracks
  # link table is playlists_tracks
  has_and_belongs_to_many :playlists

  # 1 track can have many artists (ie cover versions)
  # 1 artist can have many tracks
  has_many :artists, through: :album
end
```

testing:

```bash
# For those about to rock we salute you
t = Track.first

# AC/DC are the only band to play
t.artists

# AC/DC
a=Artist.first

# Can see all AC/DC tracks
a.tracks.inspect
```


## TDD

If we do a scaffold it will create controller tests for us.

```rb
# test/controllers

# test/fixtures/albums.yml
# if we have unique constraint say on album title this will fail

one:
  title: MyString # this can be scripted eg SecureRandom.alphanumeric(12)
  artist: one
  price: 9.99

two:
  title: MyString
  artist: two
  price: 9.99

# test/models
```

Tests: Get, New, Create, Show, Edit, Update, Destroy

Useful!!! Good to test this happy path as they are just there for us.


## Filtering Routes

Rails controller have the concept of a filter eg before an action is called, after or around.

So we are redirected to a login page if we're not logged in and want to see albums.

```rb
class AlbumsController < ApplicationController
  # before_action filter.
  # authenticate_user! is a devise method that checks if the user is logged in
  before_action :authenticate_user!

  # calls method set_album to get the album from the db
  # so we don't have to do it in every method
  before_action :set_album, only: %i[ show edit update destroy ]
```

### is_admin authorization

```rb
# /app/controllers/albums_controller.rb
class AlbumsController < ApplicationController
  # before_action filter.
  # authenticate_user! is a devise method that checks if the user is logged in
  # is_admin is our method
  
  before_action :is_admin!, except: %i[ index show ]

# /app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  
  def is_admin!
    redirect_to root_path unless user_signed_in? && current_user.is_admin?
  end

end


# /app/models/user.rb
class User < ApplicationRecord
   # ...  
   def is_admin?
    return true if email == "davemateer@gmail.com"
   end
```


## Tips

[https://tenderlovemaking.com/2014/02/19/adequaterecord-pro-like-activerecord.html](https://tenderlovemaking.com/2014/02/19/adequaterecord-pro-like-activerecord.html) caching for ActiveRecord


[Ruby Object Mapper](https://rom-rb.org/) which used to be called Ruby Data Mapper. Fast alternative to ActiveRecord.

[Ahoy](https://github.com/ankane/ahoy) from Andrew Kane. tracker of visits. Just like my code.



## Shippinh the application!









## OLD



## VS Code Extensions

[https://www.youtube.com/watch?v=4GjXSI6jcLI&t=0s](https://www.youtube.com/watch?v=4GjXSI6jcLI&t=0s)

- Emmet
- GitHub Copilot
- GitLens - to see the changes
- Prettier - CSS / HTML / JS
- Ruby - formatting and prettier
- Ruby extension pack - linter, erb?, symbols
- Solargraph

## Shortcuts

Ctrl B - hide side panel

## Rewrite existing app

Rob is using:

- Rails 7
- Spina CMS - so don't have to redeploy for spelling errors
- Login - magic links and social login (!)

What is

- Hotwire (Turbo under the hood) - sends html over the wire instead of json.. default front end framework for Rails.


## What app should I rewrite / write for fun?

- [https://hmsoftware.co.uk/](https://hmsoftware.co.uk/) - Consulting as a service (product) company.  CMS. Auth. Email.

- New crud site on music. Logins / async back end webservice calling. Fast react style type ahead.


- [https://osr4rightstools.org/](https://osr4rightstools.org/) - no this has very deep hooks into Azure using custom libraries. Uses login forms (with spam protection).

- [https://auto-archiver.com/](https://auto-archiver.com/) - a marketing site for the auto-archiver. Essentially static site and email sender.


- [https://theskatefarmcic.co.uk/](https://theskatefarmcic.co.uk/) - Wordpress site I host on proxmos.. Leave this. 

- [https://hoverflylagoons.co.uk/](https://hoverflylagoons.co.uk/) - Wordpress site I host on proxmos.. Leave this. 



## Future Projects

- CRUD based


## Tech to Try

- Use AI to learn something completely new

- Use AI for fast content generation eg [https://hmsoftware.org/](https://hmsoftware.org/)
- Try GitHub copilot

[![alt text](/assets/2024-04-24/3.jpg "email"){:width="500px"}](/assets/2024-04-24/3.jpg)

- Solopreneur tech stack 

- Postgres
- Bash

[![alt text](/assets/2024-04-24/4.jpg "email"){:width="500px"}](/assets/2024-04-24/4.jpg)


- Static typing for Ruby eg Sorbet


## Install Rails on WSL2 Ubuntu

It turns out I do use Ruby to generate this Jekyll blog hosted on GH Pages on may laptop (Ubuntu 20.04) and Desktop (Ubuntu 22.04). [Post explainng how I do it](/2020/10/20/running-jekyll-on-wsl2). Looks like I'm using Ruby 2.7.0  [Jekyll install](https://jekyllrb.com/docs/) suggests that Ruby3 or higher may have problems.

[https://gorails.com/setup/ubuntu/22.04](https://gorails.com/setup/ubuntu/22.04) - I had a 22.04 instance which failed. So I recommend 22.04


## Install Ubuntu 22.04

Windows Store, Ubuntu 22.04.3 LTS (Orange Icon), Get, Open

Then open a terminal and it should be there. Settings, Profile, Ubuntu 22.04, Appearance, Front size 9

Create my `vim ~/.bash_aliases` file which is linked from `~/.bashrc`

```bash
alias cdd='cd ~/djhmateer.github.io'
alias cdl='cd /mnt/c/dev/test'

alias p='git add . && git commit -m "auto" && git push'
alias gs='git status'
alias gp='git pull'

# default colours are not good for me (green backgrounds for directories)
alias ls='ls -lat --color=auto'

alias e='explorer.exe .'
alias c='code .'

alias js='bundle exec jekyll serve --livereload --unpublished'
alias jsi='bundle exec jekyll serve --livereload --unpublished --incremental'

# https://uly.me/run-jekyll-in-background/
alias jsu='bundle exec jekyll serve --livereload --unpublished > /dev/null 2>&1 &'
alias jsui='bundle exec jekyll serve --livereload --unpublished --incremental > /dev/null 2>&1 &'

alias gj='ps -ef | grep jekyll'

alias up='sudo apt update && sudo apt upgrade -y'

alias d='/mnt/c/sharedtools/OpenVSSolution/d.exe'
```
## Rails 6 - 7


Uses Hotire by default now for javascript



## Play

Sometimes it's important to have fun and play!

AI - everything I do now I'm using [https://chat.openai.com/](https://chat.openai.com/) as a sanity check eg

> should I use apt or apt-get

I prefer apt, but can't remember why. So it turns out apt-get is older, but prefered for scripting as it is more reliable (and wont change)