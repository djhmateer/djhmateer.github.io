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

## Why consider?

- Convention over configuration principle - so can build apps quickly with less boilerplate
- Rich ecosystem with gems (libraries)
- Testing - comes with own framework built in
- Active Record ORM

- King of effeciecy and productivity eg CRUD

Conventions, generators, tooling

- Language that is fun to use

## Why not consider?

- Learning curve
- Less trendy? eg Node.js or Django.
- Scaling - typically requires more resources. However for me this is not a consideration (as backend power is what I can do)
- OOP - I really like the simplicity of functional based programming. I'm nervous about going back to full OOP.

## Alternatives

[https://survey.stackoverflow.co/2023/#most-popular-technologies-webframe](https://survey.stackoverflow.co/2023/#most-popular-technologies-webframe)

- Node.js
- React
- [Django](https://www.djangoproject.com/)


## Whats wrong with ASP.NET Core

There are some things which bug me about the framework I've used for years:

- Authentication and Authorisation in ASP.NET Core. I had to roll my own to do simple Cookie based auth.
- DB Schema source control / Migrations are not built in
- Scaffolding of pages - I ended up never using that feature


Tangentially I've been using Python for non web based work and I really like how easy it is to work with, and how productive it is. Also not having the compile step is handy. Makes in situ updates easy.


## Play

Sometimes it's important to have fun and play!

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

- Hotwire (Turbo under the hood) - sends html over the wire instead of json..

## What app should I rewrite / write for fun?

- New crud site on music. Logins / async back end webservice calling. Fast react style type ahead.

- [https://hmsoftware.co.uk/](https://hmsoftware.co.uk/) - a static page for my company



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