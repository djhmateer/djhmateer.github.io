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
sudo vim /etc/postgres/14/main/pg_hba.conf
# change local local from peer to md5

sudo service postgresql start

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