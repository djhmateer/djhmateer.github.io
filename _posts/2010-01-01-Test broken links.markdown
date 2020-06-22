---
layout: post
title:  Test broken link page
categories: Test
published: true
comments: false
sitemap: false
---

## Internal broken links

<p> <a href="/brokenurl">Internal broken link</a>  to a page /brokenurl that doesn't exist and goes to the global 404</p>

<p><a href="/brokenurl2/">Internal broken link2 with a trailing slash</a> which should go to the 404 as above</p>

<p><img src="/asdfas.png" />Broken link to an asset - image asdfasd.png</p>

## Canonical ie https and www variants

<p><a href="https://davemateer.com/brokenurl">Absolute Internal broken link</a> which should go to the 404</p>

<p><a href="http://davemateer.com/brokenurl">Absolute http: Internal broken link</a> which should go to the https://davemaere.com/404 page</p>

<p><a href="https://www.davemateer.com/brokenurl">Absolute https://www Internal broken link</a> which should go to the https://davemateer.com/404 page</p>

<p><a href="http://www.davemateer.com/brokenurl">Absolute http://www Internal broken link</a> which should go to the https://davemateer.com/404 page</p>

## Non-Existent Domain Name

<p><a href="https://nodomainhere.co.uk/">Nodomainhere link</a> so a link to a broken domain name</p>

## Blank Hyperlink

<p><a href="">Link with nothing in it ie a href=""</a> blank link - easy to forget.</p>

[A forgotten empty link using markdown]()  

## Edge Cases

I've encountered lots of strange behaviour whilst doing broken link checking usually to do with anti-scraping mechanisms.

<p><a href="https://linkedin.com/in/dave-mateer-6274942/">2. Linked in - working link</a> Usually returns a 999 status code or hits a security check through puppeteer</p>

<p><a href="https://linkedin.com/in/dave-mateer-6274942XXX/">2x. Linked in - not working link</a> Usually returns a 999 status code or hits a security check through puppeteer</p>

<p><a href="https://www.drupal.org">3. Drupal.org- working link</a> Usually hits a security page</p>

<p><a href="https://www.drupal.org/XXX">3x. Drupal.org - not working link</a> Usually hits a security page</p>

<p><a href="https://www.mouser.co.uk/new/mikroe/mikroelektronikaClick/">4. mouser.co.uk</a> akamai fronted giving a 405</p>

<p><a href="https://www.mouser.co.uk/new/mikroe/mikroelektronikaClickXXX/">4x. mouser.co.uk</a> akamai fronted giving a 405</p>

<p><a href="https://www.element14.com/community/community/designcenter/azure-sphere-starter-kits?ICID=azure-sphereCH-topbanne">5. element14.com</a> can timeout - webserver security.</p>

<p><a href="https://www.element14.com/community/community/designcenter/azure-sphere-starter-kitsXXX">5x. element14.com</a> can timeout - webserver security.</p>

<p><a href="https://cert-manager.io/docs/">6. cert-manager.io/docs</a>Weird?</p>

<p><a href="https://cert-manager.io/docsXXX/">6x. cert-manager.io/docsXXX</a>Weird?</p>

<p><a href="https://zillow.com/">7. zillow.com</a>Hits a captcha</p>

<p><a href="https://zillow.com/XXX">7x. zillow.com</a>Hits a captcha</p>

## Normal Cases

<p><a href="https://twitter.com/dave_mateer">twitter/dave_mateer</a> twitter - working link</p>

<p><a href="https://twitter.com/dave_mateerXXX">twitter/dave_mateer</a> twitter - not working link</p>

<p> <a href="https://www.google.co.uk">Google.co.uk</a> sentence of good link </p>