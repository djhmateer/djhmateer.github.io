---
layout: post
# title: MSSQL PHP on WSL setup
description: 
menu: review
categories: browsertrix
published: true 
comments: false     
sitemap: true
image: /assets/2022-09-22/1.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->

<!-- [![alt text](/assets/2022-09-15/fire-map.jpg "email")](/assets/2022-09-15/fire-map.jpg) -->

<!-- [![alt text](/assets/2022-09-15/cookie.jpg "email")](/assets/2022-09-15/cookie.jpg) -->

Part of the [https://webrecorder.net/](https://webrecorder.net/) which is

- [https://webrecorder.net/tools#archivewebpage](https://webrecorder.net/tools#archivewebpage) Chrome extension and standalone desktop app. Allows archiving as you browse. (THIS ONE)

- [https://replayweb.page/](https://replayweb.page/) view an archive in WARC, WACZ, HAR or WBN. There used to be an electron app but this is in readonly mode now.

- [https://pywb.readthedocs.io/en/latest/index.html](https://pywb.readthedocs.io/en/latest/index.html) python framework for web archive

- [https://github.com/webrecorder/browsertrix-crawler#readme](https://github.com/webrecorder/browsertrix-crawler#readme) - Browsertrix - what we are talking about here

- [https://browsertrix.cloud/](https://browsertrix.cloud/) cloud version of above - alpha stage. K8s and Docker Swarm.


## Demo

This can save to the .wacz file format or warc

[![alt text](/assets/2022-11-03/2.jpg "email")](/assets/2022-11-03/2.jpg)

then

[![alt text](/assets/2022-11-03/3.jpg "email")](/assets/2022-11-03/3.jpg)

downloading the warc 1.1, then unzipping the .warc file, gives a single file output like below:


## Output

[![alt text](/assets/2022-11-03/1.jpg "email")](/assets/2022-11-03/1.jpg)

raw html of the site in the warc file



[![alt text](/assets/2022-11-03/4.jpg "email")](/assets/2022-11-03/4.jpg)

download on a 1.1 warc, unzip, then view warc


## Facebook

[https://www.facebook.com/photo/?fbid=1329142910787472&set=a.132433247125117](https://www.facebook.com/photo/?fbid=1329142910787472&set=a.132433247125117)


[![alt text](/assets/2022-11-03/5.jpg "email")](/assets/2022-11-03/5.jpg)

so it does work, but can we get the raw image (and screenshot)?


## Alternatives
[ArchiveWeb.page](https://chrome.google.com/webstore/detail/webrecorder-archivewebpag/fpeoodllldobpkbkabpblcfaogecpndd?hl=en&gl=US) has 5000+ users. Updated Oct 2, 2022

[WARCreate](https://chrome.google.com/webstore/detail/warcreate/kenncghfghgolcbmckhiljgaabnpcaaa?hl=en&gl=US) 1000+ users. June 30, 2021 updated. couldn't get it to work on Chrome 107.

[WebPreserver](https://chrome.google.com/webstore/detail/webpreserver/ebofmienemijnilnonphmmmahgmnpflh?hl=en&gl=US) 2000+ users. Oct 15, 2022 updated - this needs paid webpreserver below:

paid version [https://www.pagefreezer.com/webpreserver/](https://www.pagefreezer.com/webpreserver/)


