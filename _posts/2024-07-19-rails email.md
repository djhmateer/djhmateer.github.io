---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: rails 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---


```bash
rails new emailtest -d postgresql -c tailwind --skip-hotwire --skip-jbuilder

# Makefile
run:
	bin/dev

.PHONY: run


rails g controller home index 

# routes.rb
root "home#index"

# text is multi line text box so will set to text column in db
rails g scaffold message to_email:string subject:string body:text --no-jbuilder

# views/layouts/application.html.erb
# put in _nav.html.erb for /messages

# message.rb
class Message < ApplicationRecord
  validates :to_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :subject, presence: true
  validates :body, presence: true
end


# .env for secrets on dev
SMTP_ADDRESS=smtp.postmarkapp.com
SMTP_USER=bigguid
SMTP_PASSWORD=bigguid

# generate a mailer - /app/mailers/user_mailer.rb
# app/views/user_mailer

# or SubmissionMailer or MessageMailer
rails g mailer UserMailer

# maybe easier
# test/mailers/user_mailer_test.rb and 1 more
rails g mailer UserMailer --skip-test-framework


# /app/mailers/user_mailer.rb
class UserMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end
end

# create /app/views/user_mailer/welcome_email.html.erb
<h1>Welcome to My Awesome Site, <%= @user.name %>!</h1>
<p>
  You have successfully signed up to my awesome site,
  <%= @user.email %>.
</p>


# create /app/views/user_mailer/welcome_email.text.erb
Welcome to My Awesome Site, <%= @user.name %>!
You have successfully signed up to my awesome site,
<%= @user.email %>.

# application_mailer
# comment out from@example.com

# development.rb
config.action_mailer.perform_caching = false

# DM I do care if mailer can't send
config.action_mailer.raise_delivery_errors = true

config.action_mailer.default_options = { from: 'dave@hmsoftware.co.uk' }

# DM added this so that even in dev it will send an email
config.action_mailer.smtp_settings = {
    address: ENV['SMTP_ADDRESS'],
    user_name: ENV['SMTP_USER'],
    password: ENV['SMTP_PASSWORD'],
}
```
