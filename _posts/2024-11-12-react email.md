---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: react
published: true 
comments: false     
sitemap: false
image: /assets/2024-11-12/1.jpg
---

<!-- !-- [![alt text](/assets/2024-09-04/1.jpg "email"){:width="500px"}](/assets/2024-09-04/1.jpg) --> 
<!-- [![alt text](/assets/2024-09-04/1.jpg "email")](/assets/2024-09-04/1.jpg) -->

I'd like to create marketing emails easily, and do great transactional emails from sites. 

HTML emails (and associative text ones) are tough to get right with their inline CSS, and watching out for getting caught in spam filters.

[https://react.email/](https://react.email/) - is it good?

## Hello World

[https://react.email/docs/getting-started/automatic-setup](https://react.email/docs/getting-started/automatic-setup)


```bash
# create a folder called react-email-starter
npx create-email@latest

# hung with last line npm http fetch GET 200 https://registry.npmjs.org/clone 74ms (cache revalidated)
# npm verbose reify failed optional dependency /home/dave/code/react/react-email-starter/node_modules/@next/swc-win32-x64-msvc
# worked 2nd time
npm i --verbose

# delete node_modules
# delete the cache
npm cache clean --force
npm i --verbose

# now it will stall again

npm run dev
```

Without doing anything

[![alt text](/assets/2024-11-12/1.jpg "email")](/assets/2024-11-12/1.jpg)

Already wired up to send via [resend]()

[![alt text](/assets/2024-11-12/2.jpg "email")](/assets/2024-11-12/2.jpg)

Broken logo in the sample.

[![alt text](/assets/2024-11-12/3.jpg "email")](/assets/2024-11-12/3.jpg)

Same problem with this sample.

## Resend

asdf

## Postmark

asdf
