---
layout: post
# title: Updating Open Visual Studio utility to .NET 6 
# description: A small utility which opens visual studio from the command shell looking for a `.sln` file in the current directory. Updating to .NET6
menu: review
categories: selenium
published: true 
comments: false     
sitemap: true
image: /assets/2022-04-13/sc.jpg
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->

## Cookies popup on Facebook Video

[Example Facebook public page](https://www.facebook.com/Karenni-Free-Burma-Rangers-111193108038684/videos/343188674422293/)

If you open this in incognito (and make sure no FB cookies exist) you will see the popup

> Allow the use of cookies from Facebook in this browswer


[![alt text](/assets/2022-04-20/cook.jpg "desktop")](/assets/2022-04-20/cook.jpg)


The video in the background can be downloaded fine by [https://github.com/yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)

[auto-archiver]() does a screenshot of the page and I wanted to get rid of the popup

## Screenshot a FB page without cookie popup 

FB makes it hard to dynamically select the button on the page directly.  

However if you login (even a failed login) and get a cookie it will work:

```py
from selenium import webdriver
import time
from selenium.webdriver.common.by import By

options = webdriver.FirefoxOptions()
options.headless = True
driver = webdriver.Firefox(options=options)
driver.set_window_size(1400, 2000)

# Navigate to Facebook
driver.get("http://www.facebook.com")

# click the button: Allow Essential and Optioanl Cookies
foo = driver.find_element(By.XPATH,"//button[@data-cookiebanner='accept_only_essential_button']")
foo.click()

# now am logged in, go to original page
driver.get("https://www.facebook.com/watch/?v=343188674422293")
time.sleep(6)

# save a screenshot
driver.save_screenshot("screenshot.png")
```

## Burmese characters not rendering

**todo**

[Need font installed on machine](https://stackoverflow.com/questions/36490461/selenium-firefoxdriver-gettext-utf-8-encoding) maybe this would help


## Download a non public Facebook Video

So you have to be logged in to download it [SO question](https://webapps.stackexchange.com/questions/58690/how-can-i-download-non-public-facebook-video/92332)

I followed the instructions here

- chrome dev tools reload
- first request, copy as cUrl
- copy all inside single quotes: -H 'cookie: datr=asdfasfsdaf'
- export FB_COOKIE="paste"

It will be interesting to see when the cookie stops working as there are many, and some with long expirey dates.


[https://github.com/ytdl-org/youtube-dl/issues/3936](https://github.com/ytdl-org/youtube-dl/issues/3936)

## How to login to Facebook

This would help if I need to screenshot a private page. Or potentially just pass the cookie like in ytdlp above.

```py
from selenium import webdriver
import time
from selenium.webdriver.common.by import By

options = webdriver.FirefoxOptions()
options.headless = True
driver = webdriver.Firefox(options=options)
driver.set_window_size(1400, 2000)

# Navigate to Facebook
driver.get("http://www.facebook.com")

# click the button: Allow Essential and Optioanl Cookies
foo = driver.find_element(By.XPATH,"//button[@data-cookiebanner='accept_only_essential_button']")
foo.click()

# Search & Enter the Email or Phone field & Enter Password
username = driver.find_element(By.ID,"email")
password = driver.find_element(By.ID,"pass")
submit = driver.find_element(By.NAME,"login")

username.send_keys("test@gmail.com")
password.send_keys("password")

# Click Login
submit.click()

# now am logged in, go to original page
driver.get("https://www.facebook.com/watch/?v=343188674422293")
time.sleep(6)

# save a screenshot
driver.save_screenshot("screenshot.png")
```

