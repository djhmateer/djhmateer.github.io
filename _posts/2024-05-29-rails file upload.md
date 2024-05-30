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

### New

Insert records

- `active_storage_blobs` - data about file eg key (filename in storage), filename, content type, checksum, byte_size, created_at
- `active_storage_attachments` - join on Communication model table to blobs eg record_type = Communication, record_id is the communication pk.

Stores file in local /storage in a directory like `/aa/cc/aaccr414lboisl6a9moto2ptc540` which we can get from blobs table.


### Destroy

Does a hard delete


## Microsoft Azure

```bash
# Gemfile
gem 'azure-storage-blob', '~> 2.0', '>= 2.0.3'

bundle update

# config/environments/development.rb
# Store uploaded files on the local file system (see config/storage.yml for options).
# config.active_storage.service = :local
config.active_storage.service = :microsoft

# config/storage.yml
microsoft:
  service: AzureStorage
  storage_account_name: functionsdm2storage
  # primary_key look in functionsdm2stoage and properties in Azure Storage Explorer
  storage_access_key: <%= ENV['AZURE_ACCESS_KEY'] %>
  # useful so don't cross contaminate development and production on Azure.
  container: railz3-<%= Rails.env %>

# .env for secrest on dev
# service file for prod
# sudo vim /etc/systemd/system/railz3.service
```

[https://github.com/Azure/azure-storage-ruby](https://github.com/Azure/azure-storage-ruby) support is being [deprecated by MS](https://azure.microsoft.com/en-gb/updates/retirement-notice-the-azure-storage-ruby-client-libraries-will-be-retired-on-13-september-2024/) in favour of the REST API.

[https://azure.github.io/azure-sdk/policies_support.html#package-lifecycle](https://azure.github.io/azure-sdk/policies_support.html#package-lifecycle) annoying they are not supporting Ruby libraries.


[![alt text](/assets/2024-05-29/2.jpg "email"){:width="500px"}](/assets/2024-05-29/2.jpg)

Successful upload from dev to railz3-development. Also from production to railz3-production.

When delete from UI, it hard deletes from storage.


## File Types and Sizes 

- png party 2.7MB
- jpg rainbow 221kb
- webp landscape 151kb
- tiff 1.1MB (didn't render properly - browsers don't natively support)
- zip 200MB (can see file being uploaded to webserver, then uploaded to storage). Works fine. Interestingly the download works straight to the browser through a link like: https://hmsoftware.uk/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MzYsInB1ciI6ImJsb2JfaWQifX0=--d368a421c553a01298a34c41c03502b8f3972a0f/glan.zip?disposition=attachment

- pdf - no preview
- docx - strange filename 
- xlxs - 12k
- ad1 - fine
- csv - fine
- pptx - fine
- mp4  - 259MB
- zip - 4.6GB nginx 500 server error
- zip - 700MB nginx 500 error
- b mov - 694kb - worked


[![alt text](/assets/2024-05-29/3.jpg "email"){:width="500px"}](/assets/2024-05-29/3.jpg)

`iftop` is the name of the tool. `sudo apt-get install iftop` then run with sudo.

200MB file - can see it being received by the webserver. Then slowly being transmitted.  The webserver is on a fast internal network and a slow uplink to Azure.

Larger files like 700MB caused the reverse proxy to fail which was writing the file to disk. It was actually an out of disk space error on the proxy.


## Multiple attachments

```bash
# https://edgeguides.rubyonrails.org/active_storage_overview.html#has-many-attached

# each message has many images
rails g scaffold message name:string images:attachments --no-jbuilder

```

asdf

```rb
class Message < ApplicationRecord
  has_many_attached :images
end

```

[![alt text](/assets/2024-05-29/4.jpg "email"){:width="500px"}](/assets/2024-05-29/4.jpg)

Attaching 25 files over 1.3GB in total. Uploading the from server to Azure storage is taking > 20 minutes, and the connections are all staying open and not failing. Very impressive.


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


## Javascript

- Drag and drop files
- Upload progress
- Resume
- Upload direct

[https://github.com/dropzone/dropzone](https://github.com/dropzone/dropzone) - 17.9k not maintained


[![alt text](/assets/2024-05-29/7.jpg "email"){:width="500px"}](/assets/2024-05-29/7.jpg)

Uploading multiple files. Showing progress with a bar. However on large uploads the bar isn't progressing ie it is at 0% or 100%

So there is a problem in the CSS / js..

I can do it properly in c:\foo\index

is turbo causing issues?
could put percentage on the end too 

maybe time to look at design????


## Retries?



## Debug



## Active Storage

[https://edgeguides.rubyonrails.org/configuring.html#configuring-active-storage](https://edgeguides.rubyonrails.org/configuring.html#configuring-active-storage) - detailed config.


