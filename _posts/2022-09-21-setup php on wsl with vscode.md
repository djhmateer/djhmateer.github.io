---
layout: post
# title: Proxmox Beginners Guide
description: 
# menu: review
categories: php
published: true 
comments: false     
sitemap: true
image: /assets/2022-09-21/2.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->

<!-- [![alt text](/assets/2022-09-15/fire-map.jpg "email")](/assets/2022-09-15/fire-map.jpg) -->

<!-- [![alt text](/assets/2022-09-15/cookie.jpg "email")](/assets/2022-09-15/cookie.jpg) -->

To get PHP installed on my WSL2 instance running Ubuntu 20.04.3 and code editing from VS Code on Windows side:

```bash
sudo apt install php7.4 php7.4-curl php7.4-xml php7.4-zip php7.4-mbstring php7.4-gd php7.4-xdebug

sudo apt install php7.4-dev
```

## VS Code

`Remote - WSL` open any folder in WSL, which I already had installed

### Linter

VSCode Preferences, Settings. Search for PHP settings (there are some linters ready to go - need path for php). I've not set these up.

- disabled PHP Suggest Basic
- disabled PHP Validate Enable

### Debug

[https://code.visualstudio.com/docs/languages/php](https://code.visualstudio.com/docs/languages/php) suggests running `PHP Debug with XDebug` for debugging [download](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug)


did a `phpinfo();` and ran debug in VSCode

Copied output to [https://xdebug.org/wizard](https://xdebug.org/wizard)

## Install XDebug on WSL

```bash
wget tar -xvzf xdebug-3.1.5.tgz

## had all the extensions I needed

tar -xvzf xdebug-3.1.5.tgz

cd xdebug-3.1.5

phpize

./configure

make

sudo cp modules/xdebug.so /usr/lib/php/20190902

## zend_extension = xdebug
sudo vim /etc/php/7.4/cli/conf.d/20-xdebug.ini
```

## php.ini

[![alt text](/assets/2022-09-21/1.jpg "email")](/assets/2022-09-21/1.jpg)

Note - the error `Cannot load Xdebug - it was already loaded` was due to me adding extra lines a the bottom of `php.ini` which I didn't need:

php.ini in `/etc/php/7.4/cli` and also in `/etc/php/7.4/apache`

```bash
# didn't need these added to bottom of php.ini
zend_extension="/usr/lib/php/20190902/xdebug.so"
xdebug.mode = debug
xdebug.start_with_request = yes
```

## Browser window?

I can get a debug console working, but expected a browser window to work, which hasn't so far.

[![alt text](/assets/2022-09-21/2.jpg "email")](/assets/2022-09-21/2.jpg)

F5 doesn't seem to start debugging, but the icon does. Error has gone away as I took out the php.ini settings.


## PHP Errors

I got enough working to debug my issue. [https://www.cloudways.com/blog/php-debug/](https://www.cloudways.com/blog/php-debug/) contains deeper debugging.