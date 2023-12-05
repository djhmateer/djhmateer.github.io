---
layout: post
title: Creating a Wordpress Website with ChatGPT4 and TailwindCSS 
description: 
# menu: review
categories: wordpress
published: true 
comments: false     
sitemap: true
image: /assets/2023-12-01/1.jpg
---

<!-- [![alt text](/assets/2023-07-22/1.jpg "email"){:width="800px"}](/assets/2023-07-22/1.jpg) -->
<!-- [![alt text](/assets/2023-08-01/1.jpg "email")](/assets/2023-08-01/1.jpg) -->

<!-- [![alt text](/assets/2023-08-23/3.jpg "email")](/assets/2023-08-23/3.jpg) -->


<!-- [https://www.youtube.com/watch?v=LJyfhD5CUiM](https://www.youtube.com/watch?v=LJyfhD5CUiM) -->

<!-- [![alt text](/assets/2023-10-10/3.jpg "email"){:width="600px"}](/assets/2023-10-10/3.jpg) -->

<!-- [![alt text](/assets/2023-10-16/9.jpg "email")](/assets/2023-10-16/9.jpg) -->
<!-- [![alt text](/assets/2023-10-16/9.jpg "email"){:width="600px"}](/assets/2023-10-16/9.jpg) -->


This post is a work in progress as I continue building [theskatefarmcic.co.uk](https://theskatefarmcic.co.uk/)

See previous post on [setting up Wordpress](/2023/11/30/wordpress-too-many-redirects) as a vanilla install using on my Proxmox Home Lab with nginx reverse proxy and certbot for SSL.

## Pages

I want a single page website, so in Wordpress lets set that up:

Pages, Create new Page, Home Page

Settings, Reading, static page, Home Page.


## Wordpress New Theme - disable auto-formatting

[https://github.com/djhmateer/wordpress-blank-theme](https://github.com/djhmateer/wordpress-blank-theme)

I'm using a custom theme (which is very raw as I want to do all the design work in straigh html then just copy it to WP).

But I need to disable the addition of adding line feeds.

```php
# in functions.php
remove_filter( 'the_content', 'wpautop' );
```

upload to wp-content/themes/my_custom_theme

chmod the folder so can write to it, and ftp to it. This is useful to make changes to the theme.

Or I could zip the files and: Appearance, Theme to add to wordpress.


## Classic Editor

Plugins, Add, Classic Editor

[![alt text](/assets/2023-10-16/4.jpg "classic editor with tailwindcss")](/assets/2023-10-16/4.jpg)

In Settings, Writing - this should now be the default editor.



## Design

[https://tailwindcss.com/docs/installation/play-cdn](https://tailwindcss.com/docs/installation/play-cdn)

Tailwind CSS
Hamburger menu

Responsive


## Images

Upload to Wordpress via Media, Add new Media File


## Process


[![alt text](/assets/2023-12-01/2.jpg "asfd")](/assets/2023-12-01/1.jpg)

Use raw html, vs code and live server for immediate results. CSS is classes with TailwindCSS.

ChatGPT4 to create new sections as needed.