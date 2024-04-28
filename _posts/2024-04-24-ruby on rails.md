---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: ror 
published: true 
comments: false     
sitemap: false
image: /assets/2024-03-03/2.jpg
---

<!-- [![alt text](/assets/2024-02-01/1.jpg "email"){:width="600px"}](/assets/2024-02-02/1.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email"){:width="800px"}](/assets/2024-03-03/2.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email")](/assets/2024-03-03/2.jpg) -->

<!-- [![alt text](/assets/2024-04-24/1.jpg "email")](/assets/2024-04-24/1.jpg) -->

I've been following Rob Conery for many years and respect his technical judgement / entrepreneurial attitude. So when he published [this article](https://bigmachine.io/courses/rails-revisited) it got me thinking:


[![alt text](/assets/2024-04-24/5.jpg "email"){:width="500px"}](/assets/2024-04-24/5.jpg)

Saying how he is moving away fom Javascript front end frameworks (which he'd been doing since 2017) back to RoR. [blog post](https://a.bigmachine.io/posts/a-strange-thing-happened-when-i-told-myself-to-shut-it)


Is Rails is having a resurgence?!

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

## Why consider?

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

## Why not consider?

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


## Play

Sometimes it's important to have fun and play!

AI - everything I do now I'm using [https://chat.openai.com/](https://chat.openai.com/) as a sanity check eg

> should I use apt or apt-get

I prefer apt, but can't remember why. So it turns out apt-get is older, but prefered for scripting as it is more reliable (and wont change)


## Where to Start?????

Okay so after being bitten by the crazyness of Python package management and different versions on the same system, I'm being careful with Ruby.

ChatGPT4 says to use

- [rbenv](https://github.com/rbenv/rbenv) - so can have specific versions of ruby running (less intrusive than rvm)


[https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-22-04](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-22-04) looks similar

[https://guides.rubyonrails.org/getting_started.html](https://guides.rubyonrails.org/getting_started.html) doesn't mention rbenv


[https://gorails.com/setup/ubuntu/22.04](https://gorails.com/setup/ubuntu/22.04) - they used ASDF as a package manager to install  (over rbenv) as will use it to install Node.js as well



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

[https://gorails.com/setup/ubuntu/22.04](https://gorails.com/setup/ubuntu/22.04)

[https://gorails.com/setup/ubuntu/20.04](https://gorails.com/setup/ubuntu/20.04) - this failed for me on Ruby 3.3.1

```bash

asdf install ruby 3.3.1

# fiddle:
#        Could not be configured. It will not be installed.
#        /tmp/ruby-build.20240425165908.8723.ssnzTU/ruby-3.3.1/ext/fiddle/extconf.rb:78: missing libffi. Please install libffi or use --with-libffi-source-dir with libffi source location.

# after feeding the error into chatgpt
sudo apt-get install libffi-dev

sudo apt-get install libssl-dev

sudo apt-get install libyaml-dev

gem install psych

# then it worked!kk

# but doing a gem update --system

# bu then doing a gem install rails is linked to Ruby 2.7 ahh

```



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

# add plugins
# nodejs for frontend javascript
asdf plugin add ruby
asdf plugin add nodejs

# got warnings about can't preserve downloads
# there is 3.3.1 as of 23rd April 2024
# downloads come straight from https://www.ruby-lang.org/en/
asdf install ruby 3.3.0
asdf install ruby 3.3.1

asdf global ruby 3.3.1

gem update --system

# 3.3.1
ruby -v

# 20.12.2 is latest LTS version on nodejs
# why do we need nodejs - handling Javascript in our Rails apps?
# NOT DONE HERE START
asdf install nodejs 20.11.0
asdf global nodejs 20.11.0

which node
#=> /home/username/.asdf/shims/node
node -v
#=> 20.11.0

# Install yarn for Rails jsbundling/cssbundling or webpacker
npm install -g yarn

# NOT DONE HERE END

# latest is 7.1.3.2
gem install rails -v 7.1.3

# 7.1.3
rails -v


## PostgreSQL
sudo apt install postgresql libpq-dev

sudo service postgresql start

**HERE - trying to get it installed on Ubuntu side for user dave
```

## Code

[https://www.youtube.com/watch?v=Hwou03YqH4I](https://www.youtube.com/watch?v=Hwou03YqH4I) this video suggests putting code in `\code` so that it isn't in the Windows filesystem, thus will be much faster.


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


## Rails new

```bash
# create a new rails app
rails new hello-world

# maybe need sqllite?
sudo apt install libsqlite3-dev

bundle install

# start
rails s

# http://localhost:3000

# common postgres error is that the service isn't acutally working
service postgresql start

rails g scaffold post title body:text

rails db:migrate


```



