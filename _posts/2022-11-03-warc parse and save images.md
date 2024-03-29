---
layout: post
# title: MSSQL PHP on WSL setup
description: 
# menu: review
categories: warc
published: true 
comments: false     
sitemap: true
# image: /assets/2022-09-22/1.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->

<!-- [![alt text](/assets/2022-09-15/fire-map.jpg "email")](/assets/2022-09-15/fire-map.jpg) -->

<!-- [![alt text](/assets/2022-09-15/cookie.jpg "email")](/assets/2022-09-15/cookie.jpg) -->

<!-- ![alt text](/assets/2022-11-03/2.jpg "email")](/assets/2022-11-03/2.jpg) -->

WARC - Web ARChive file format

- Is it useful to store a warc file for every url we are archiving?
- Can we use warc file acquision tools to help in our archiving of difficult sites like Facebook images?
- Parse browsertrix output to get raw image?

## What is the Web ARChive file format?

[https://www.loc.gov/preservation/digital/formats/fdd/fdd000236.shtml](https://www.loc.gov/preservation/digital/formats/fdd/fdd000236.shtml)

[iso spec](https://www.iso.org/standard/68004.html) which you have to buy!

> The WARC (Web ARChive) format specifies a method for combining multiple digital resources into an aggregate archival file together with related information

[http://bibnum.bnf.fr/WARC/](http://bibnum.bnf.fr/WARC/)

WARC/1.1 as on Jan 2017
WARC/1.0 as of Nov 2008

## WARC File and Record

- WARC file is the concatenation of one more more WARC records

### Record

1.record header

- warcinfo (used all the time)
- info
- response (used eg for favicon.ico)
- resource
- request
- metadata
- revisit
- conversion
- continuation


- record content block which can contain any format eg binary image, html
- 2 newlines

[spec](https://archive-access.sourceforge.net/warc/)


Confusing that the request/response seems the wrong way around in my examples

- warcinfo
- response
- request
- warcinfo

## Example

Am using the [archivewebpage]() chrome extension to make a WARC file of [http://brokenlinkcheckerchecker.com/pagea](http://brokenlinkcheckerchecker.com/pagea)


## Parsing a WARC

[https://github.com/webrecorder/pywb](https://github.com/webrecorder/pywb) and docs [https://pywb.readthedocs.io/en/latest/index.html](https://pywb.readthedocs.io/en/latest/index.html)

Replay and recording on web archives - archivewebpage uses this under the hood.

[https://github.com/internetarchive/warc](https://github.com/internetarchive/warc) 2012 last updated! no support for WARC/1.1

## Python Parser

[https://github.com/lxucs/commoncrawl-warc-retrieval](https://github.com/lxucs/commoncrawl-warc-retrieval) a very simple parser. And [blog](https://liyanxu.blog/2019/01/19/retrieve-archived-pages-using-commoncrawl-index/)

## WARCIO - parse and save jpegs

[https://github.com/webrecorder/warcio](https://github.com/webrecorder/warcio) 2020. Supports WARC/1.1. Part of the webrecroder project.

Makes it easy to read a WARC file eg

```py
from warcio.archiveiterator import ArchiveIterator

# pip install pillow
from PIL import Image

from io import BytesIO

from urllib.parse import urlparse
import os
import os.path
import uuid

# can handle gzipped warc files too
input = '/mnt/c/warc-in/building18_0.warc.gz'

with open(input, 'rb') as stream:
    for record in ArchiveIterator(stream):
        if record.rec_type == 'response':
            # http://brokenlinkcheckerchecker.com/img/flower3.jpg
            uri = record.rec_headers.get_header('WARC-Target-URI')
            ct = record.http_headers.get_header('Content-Type')

            if ct == 'image/jpeg':
                status = record.http_headers.statusline
                if status=='200 OK':
                    
                    o = urlparse(uri)
                    # /img/flower3.jpg
                    print(o.path)
                    # flower3.jpg
                    filename = os.path.basename(o.path)
                    print(filename)

                    content = record.content_stream().read()
                    img_bytes_io = BytesIO()
                    img_bytes_io.write(content)

                    # check if already saved this filename 
                    if os.path.isfile(f'/mnt/c/warc-out/{filename}'):
                        filename=str(uuid.uuid4())

                    with Image.open(img_bytes_io) as img:
                        img.save(f'/mnt/c/warc-out/{filename}', format='JPEG')
```

[BytesIO code](https://stackoverflow.com/a/61524319/26086)

I'm using archivepageweb to save a warc file which works well.

[groups.google.io](https://groups.google.com/g/common-crawl/c/DZBOmz-OPoE) potentially an even easier way to write out the jpg. Just pipe the bytes straight to file