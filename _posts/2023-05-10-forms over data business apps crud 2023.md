---
layout: post
#title: Developer Desktop Build 2023
#description: Building a desktop PC focussed on being developer daily driver.
menu: review
categories: business
published: true 
comments: false     
sitemap: true
image: /assets/2023-04-29/5.jpg
---

<!-- [![alt text](/assets/2023-04-29/7.jpg "email"){:width="800px"}](/assets/2023-04-29/7.jpg) -->

x

A client/boss comes to you and says `I need a new business application to do x`

Lets assume that

- It has been thought out ie there is monetary value in doing something 
- It is an internal business app
- It has some sort of data storage eg CRUD app - Create Read Update Delete of data
- The company are relatively technical or have aspirations to be so
- It is multi user (I'm commonly looking between 2 and 50 users)

What are the risks in doing nothing?

- People getting stressed as manual processes are too hard. Commonly I've seen many many spreadsheets with 1 or 2 people holiding it all together, so the risk is that if they leave, it all falls apart

- Mistakes happening as copy and pasting between different systems

## Options

In order of complexity and cost

- do nothing
- tweak what is there already eg spreadsheet
- buy an off the shelf new solution eg SaaS product
- look for open source solutions
- build a new application using high level tools eg no code / low code
- build a new application using high level framework of choice eg ASP.NET Core / PHP Laravel / Ruby on Rails


## Historical Background

MS Access forms over data..

### 1999
- PHP / MySQL / HTML on Linux
- deployment using FTP

### 2005
- ASP.NET / MSSQL / CSS / JS on Windows Servers then Azure then Linux VM's on and off cloud
- Wordpress hosted on proxmox hypervisor for performance and costs
- Nginx for reverse proxy 
- Kestrel for webserver
- Dapper and Polly and high perf SQL and resilience
- git for source control / github
- functional programming for solving complex state and simplifying code
- async for performance
- azure CLI for deploymnet ie fully automated build of VM's
- fully custom authentication and authorisation for asp.net cookie
- uploading large files in http
- serilog for logging
- Razor page templating
- PWA
- Bootstrap
- jQuery
- Postmark for email sending
- DNSimple for DNS
- Docker/K8s (and when not to use it!)

### 2020
- Python for data processing and interacting with Google Spreadsheets
- Postgres and PHP for custom mapping
- cron for recurring jobs
- Google Drive API for storage
- Custom CSS for front end flexbox, Tailwind
- Excel dashboard for simple reporting connecting to live azure db


### 2023
No Code

Low Code
 - MS Power Platform ($20 per month per user)
 - Google App Sheet (similar to above)

 monday.com


### Summary
 over time I've gone from simplicity, to very complex, and now back to the simplest possible thing with the least amount of code possible.

 [https://matt-rickard.com/bell-curve-ideas](https://matt-rickard.com/bell-curve-ideas) gives some great quotes eg

 `Spreadsheets should be replaced by real software.
Beginners/Experts: Spreadsheets are often more maintainable, more usable, and more extensible than most software projects.`


 ## StackOverflow of Developers 2022

 [https://survey.stackoverflow.co/2022/#work-company-info](https://survey.stackoverflow.co/2022/#work-company-info)


## 2023 options

### Database centric

Databases store information, but we need a way (code) to create a UI to do things with that info

High Code
- Node
- React
- Express
- ASP.NET Core / MSSQL
- Python Django
- Flask
- Next.js
- PHP and Laravel
- LAMP

Low Code
- [MS Power Apps](https://powerplatform.microsoft.com/en-gb/power-apps/) - part of power platform which includes power bi
- [Google App Sheet](https://cloud.google.com/appsheet) - taken over from App Maker
- [Mendix](https://www.mendix.com/)
- [Zoho]https://www.zoho.com/creator/pricing.html?src=hdd)

- [Retool](https://retool.com/)
- [Illa-builder](https://github.com/illacloud/illa-builder) - open source alternative to retool
- [Budibase]() - open source alternative to PowerApps, Mendix and OutSystemes... code is opional. 18.2k stars on GH
- [AppSmith]() - needs code
- [Tooljet]()
- [airplane.dev]

### Spreadsheet centric

Spreadsheets give a UI over information, so users can present, CRUD and organise data. But this is at the expense functionality ...

[Spreadsheet vs Database ultimate guide](https://budibase.com/blog/data/spreadsheet-vs-database/)

- Google Sheets
- Excel online

> The simple explanation is that spreadsheets just make it incredibly easy to build simple reports, data entry tools, processes, and even automations, without any advanced technical knowledge.

### Hybrid

- [Airtable]() allows for easy data processing (no code!), but with a database underneath. Focus on data management
- [monday.com]() manage and streamline workflows. (no code). Focus on work and CRM management






## Previous Articles
2020-05-16 I tried writing this

 https://streamlit.io/

think about CRUD apps
 resell other people stuff?
   stand on the shoulders of giants
  make plugins

https://retool.com/
  Comments him writing to customers
 Rohan email re dot net rocks

 ## Options

 Code

 PHP Laravel






