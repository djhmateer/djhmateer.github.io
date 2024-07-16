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

Uploading files on any web framework can be hard. Especially if there are: multiple files, large files, network interruptions, cancellations, resumes, and the want to show nice progress bars.

So lets guide the user into the pit of success.

## Strategy

Only do file uploads after everything else is saved 

Allow the user a backup method of getting files to you eg [https://wetransfer.com/](https://wetransfer.com/)

Allow the user an easy way to try again.

Do minimal javascript (as my clients may be on old devices)

## Demo Codebase

This codebase shows

- Form upload with single file
- Form upload with multi files

- Text input then file upload on next page (no - we don't need it)

- JS upload
- JS upload with progress bar and percentage and multi files

- JS direct upload to Azure
- JS direct upload to S3 (Digital Ocean)


## Form Uploads

Here is a Rails build script to demo a single file upload

```bash
# check updates (be careful the version of ruby is what rails wants)

# update rbenv
cd ~/.rbenv
git pull

# will get latest ruby build bits
cd ~/.rbenv/plugins/ruby-build
git pull

# list
rbenv install -l

rbenv install 3.3.3

rbenv global 3.3.3
rbenv rehash

# verify version
ruby -v

# Rails - 7.1.3.4
gem update --system

gem install rails

rails new uploadtest -d postgresql -c tailwind --skip-hotwire --skip-jbuilder

# Makefile
run:
	bin/dev

.PHONY: run

rails db:create
rails db:migrate

# controller and view
rails g controller home index 

# config/routes.rb
root "home#index"

# creates migrations for 3 tables
rails active_storage:install

# single attachment of a model called communication
# creates CRUD
rails g scaffold communication name:string image:attachment --no-jbuilder

# views/layouts/application
# put in _nav.html.erb for /communications

# multiple files attached
# https://edgeguides.rubyonrails.org/active_storage_overview.html#has-many-attached
rails g scaffold message name:string files:attachments --no-jbuilder
```

Now lets change where it saves the file (it uses local by default)

I'm going to be using files stores like DigitalOcean and Azure Blob Storage as I don't want to be storing the files on the webserver.



## Azure 

azure-storage-ruby is being deprecated soon 
[https://github.com/Azure/azure-storage-ruby](https://github.com/Azure/azure-storage-ruby) - gem is called [azure-storage-blob](https://rubygems.org/gems/azure-storage-blob)


I'm using rails 7.1.3.4  on Ruby 3.3.3 (locked on this as latest 3.3.4 not good for rails yet)

[https://edgeguides.rubyonrails.org/active_storage_overview.html](https://edgeguides.rubyonrails.org/active_storage_overview.html) edge guide doesn't talk about near deprecation

[https://github.com/rails/rails/issues/49983](https://github.com/rails/rails/issues/49983) discussion

There is now an external gem file called [https://github.com/testdouble/azure-blob](https://github.com/testdouble/azure-blob)

```bash
# setup a .env file with

# primary_key look in properties in Azure Storage Explorer
AZURE_ACCESS_KEY=HUmoV+eqgRC72whm etc..

# add a container called uploadtest-development

# also remember CORS

# storage.yml
microsoft:
  # old one
  # service: AzureStorage
  # new one
  service: AzureBlob

  storage_account_name: functionsdm2storage
  storage_access_key: <%= ENV['AZURE_ACCESS_KEY'] %>
  container: uploadtest-<%= Rails.env %>

# add to gemfile
# old deprecated one
# gem 'azure-storage-blob', '~> 2.0', '>= 2.0.3'

# new one
gem 'azure-blob'

bundle update

# change AzureStorage service to AzureBLog in storage
```

## Separate page for file upload

We never want to lose data, so lets make sure the initial form is successfully submitted.

Actually rails does a great job of this out of the box. As far as I can tell it does a good job of saving form data before doing uploads, and even the js library does retries.


## Direct Uploads



## Other info


## Frameworks

- ActiveStorage - part of Rails.
- Carrierwave 8k stars, Mar 2024 - rackspace / Google cloud
- Paperclip - 9k. deprecated. recommend ActiveStorage
- Refile - 2.5k. 4 years ago.
- Shine - 3k, 1 month ago. Disk, S3, Google. [https://shrinerb.com/docs/advantages#direct-uploads](https://shrinerb.com/docs/advantages#direct-uploads)

then the JS front ends for

- resumable file uploads
- multiple uploads at the same time

**check out S3 sdk (js?) and azure

then

- [https://github.com/transloadit/uppy](https://github.com/transloadit/uppy)

[https://edgeguides.rubyonrails.org/active_storage_overview.html](https://edgeguides.rubyonrails.org/active_storage_overview.html)

```bash

# active_storage

# creates migrations for 3 tables
rails active_storage:install

```

### config/storage.yml

local, s3, google, Azure Storage

### config/environments/development.rb

```rb
  # Store uploaded files on the local file system (see config/storage.yml for options).
  config.active_storage.service = :local
```

## CRUD Scaffold including attachment

```bash
# single attachedment
rails g scaffold communication name:string image:attachment --no-jbuilder

# multi attachements
rails g scaffold message name:string images:attachments --no-jbuilder

# ***HERE setup post which will be a direct upload test

rails db:migrate

```

[![alt text](/assets/2024-05-29/1.jpg "email"){:width="500px"}](/assets/2024-05-29/1.jpg)

CRUD screens built including a file upload which uses active_storage

```rb
# active_storage - https://edgeguides.rubyonrails.org/active_storage_overview.html#has-one-attached

class Communication < ApplicationRecord
  # 1 to 1 mapping between records and files
  has_one_attached :image
end
```

to render onscreen:

```html
```

### Data Structure

Insert records

- `active_storage_blobs` - data about file eg key (filename in storage), filename, content type, checksum, byte_size, created_at
- `active_storage_attachments` - join on Communication model table to blobs eg record_type = Communication, record_id is the communication pk.

Stores file in local /storage in a directory like `/aa/cc/aaccr414lboisl6a9moto2ptc540` which we can get from blobs table.


## Direct Uploads

[https://edgeguides.rubyonrails.org/active_storage_overview.html#direct-uploads](https://edgeguides.rubyonrails.org/active_storage_overview.html#direct-uploads)

We need to use some javascript, so [here is how Rails 7 handles js](https://guides.rubyonrails.org/working_with_javascript_in_rails.html) 

I can use import maps to import JavaScript modules without transpiling or bundling. So no node.js or yarn needed.

[https://github.com/rails/importmap-rails](https://github.com/rails/importmap-rails)

To add a new package:

```bash
# adds a line to config/importmap.rb
# adds js into vendor/javascript/activestorage.js
# 5.2.8 which seems like latest
# https://www.npmjs.com/package/activestorage
# Pinning "activestorage" to vendor/javascript/activestorage.js via download from https://ga.jspm.io/npm:activestorage@5.2.8-1/app/assets/javascripts/activestorage.js
# bin/importmap pin activestorage

# I found I had to change th importmap.rb file to
pin "@rails/activestorage", to: "activestorage.esm.js"

# then import package into application.js
import * as ActiveStorage from "@rails/activestorage"
ActiveStorage.start()

# I found that js files not being updated unless I did
rails assets:precompile
# solution was to delete public/assets directory

# then add direct_upload in the form
<%= form.file_field :images, multiple: true, direct_upload:true, class

# CORS - Cross Origin Resource Sharing 

```

[![alt text](/assets/2024-05-29/6.jpg "email"){:width="500px"}](/assets/2024-05-29/6.jpg)

```bash
# for https://hmsoftware.uk
# Content-Type,Content-MD5,x-ms-blob-content-disposition,x-ms-blob-type
# Cache-Control,Content-Language,Content-Type,Expires,Last-Modified,Pragma

# for http://localhost:3000 (handy for dev testing)
# Content-Type,Content-MD5,x-ms-blob-content-disposition,x-ms-blob-type, Access-Control-Allow-Origin
# Cache-Control,Content-Language,Content-Type,Expires,Last-Modified,Pragma, Access-Control-Allow-Origin

```

## Direct Upload Progress

**todo - see golfsubmit project**

Let's show the user a progress bar or something

[Here is some simple js](https://edgeguides.rubyonrails.org/active_storage_overview.html#example) on the rails guiide.

```bash
# javascript/direct_uploads.js
# add in code from above

# importmap.rb
pin "direct_uploads", to: "direct_uploads.js"

# application.js
import "direct_uploads"
```


## S3 Digital Ocean

**todo - but works just like azure**

```bash
# config/environments/development.rb

```

[![alt text](/assets/2024-07-11/1.jpg "email"){:width="500px"}](/assets/2024-07-11/1.jpg)

CORS [comment by Trav](https://www.digitalocean.com/community/tutorials/how-to-use-activestorage-in-rails-6-with-digitalocean-spaces) helped me.



