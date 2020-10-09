---
layout: post
title: Git on Linux Credentials being forgotton 
description: If your git session forgets your credentials after 15 minutes on Linux then it could be that you're using the cache instead of the store (for good reasons)
#menu: review
categories: git 
published: true 
comments: true     
sitemap: true
image: /assets/2020-10-05/forget-me-not.jpg
---

<!-- [![alt text](/assets/2020-07-22/donut.jpg "Photo by @acreativegangster from Unsplash"){:width="600px"}](https://unsplash.com/@acreativegangster) -->

<!-- ![alt text](/assets/2020-10-05/forget-me-not.jpg "Forget me not"){:width="600px"} -->
[![alt text](/assets/2020-10-05/forget-me-not.jpg "Forget me not photo by Belinda Fewings")](https://unsplash.com/@bel2000a)

If your git session forgets your credentials after 15 minutes on Linux then it could be that you're using the cache instead of the store (for good reasons)

I'm using 2FA and have to use Personal Access Tokens to write access my repos:

## GitHub push with 2FA (Personal Access Token)

[From the GitHub docs](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) Person Icon, Settings, Developer Settings, Personal access tokens.

[Storing Git passwords from Stackoverflow](https://stackoverflow.com/questions/5343068/is-there-a-way-to-cache-github-credentials-for-pushing-commits)

```bash
# default timeout of 15minutes
git config --global credential.helper cache

# stores on disk
git config --global credential.helper store
```

Hope this helps (and for my future self too)!
