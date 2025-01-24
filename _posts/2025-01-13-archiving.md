---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: archiving
published: true 
comments: false     
sitemap: false
image: /assets/2024-11-12/1.jpg
---

[![alt text](/assets/2025-01-13/5.jpg "email"){:width="500px"}](/assets/2025-01-13/5.jpg) 

Photo by <a href="https://unsplash.com/@eyed?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Abinash Jothimani</a> on <a href="https://unsplash.com/photos/an-open-book-sitting-on-top-of-a-table-P4KX6qSaBcY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      

If you have a URL single link, and want to archive the page contents, what tools are available?

## Why Archive? 

You may be come from these areas:

- Human rights investigative organisations
- Investigative Journalists
- Insurance Investigators
- Law Enforcement
- Legal firms
- Other investigative organisations
- Discussion websites eg Hacker news - to get around paywalls

Depending on your use case, you may want to archive different things.

- Screenshot of the page
- HTML version of the page (so can read it)
- Images (perhaps for evidence)
- Videos
- All the assets eg CSS / JS / HTML
- WARC / WACZ so you can replay the page (perhaps showing changes over time)


For example I've worked for the past 4 years in Human Rights archiving, where the focus has been on images and video archiving (before it gets taken down by large platforms).

Screenshots are important for context. Everything is hashed and Tweeted (as a Tweet is considered immutable). Text content and reading of the websites is less important.

Me - I have a commerical business selling hosted versions of the [auto-archiver](https://github.com/bellingcat/auto-archiver). I want to know

- Are there any better products out there?
- Are my customers getting their money's worth?
- Should I partner with other organisations to sell their products?
- Who needs archiving help?

## What sites do you want to archive?

- [Instagram](https://instagram.com)
- [Facebook](https://facebook.com)
- [X/Twitter](https://x.com)
- [Telegram](https://telegram.com)
- [TikTok](https://tiktok.com)
- [YouTube](https://youtube.com)
- [vk.com](https://vk.com)

Specific page from a general websites eg [davemateer.com Advent of Code](https://davemateer.com/2024/12/02/advent-of-code)

In the research for this article I came up with specific links to test which have specific use cases eg number of images, size of page etc..

[Google Spreadsheet of Test Links](https://docs.google.com/spreadsheets/d/1X7yqklWh2AnzzdILtoKeJgzx2L2PfwWJqIQ4UhhRYHg)

## Plan

I'm going to cover

- General Archival Tools
- Specific Archival Tools
- Screenshots
- Manual Archival (including browser extensions)

This is an opinionated list and I wont mention the tools that are not useful for me! [awesome-web-archiving](https://github.com/iipc/awesome-web-archiving) contains more with a much broader scope.

**HERE - I've tried all the tools in Acquisition**
Monolity very popular - raw downloader
SingleFile popular - extension which saves a single file.

## General Archival Tools

- Wayback Machine
- Archive.today
- PageFreezer (commercial)
- Auto-archiver (which is a colleciton of specific tools)


## Internet Archive aka Wayback Machine

[https://web.archive.org/](https://web.archive.org/) and [wikipedia entry](https://en.wikipedia.org/wiki/Wayback_Machine)

[https://web.archive.org/web/20240301234613/https://davemateer.com/2016/10/16/Why-Blog](https://web.archive.org/web/20240301234613/https://davemateer.com/2016/10/16/Why-Blog) Shows it getting text and images from a blog post. Interestingly it didn't get the disqus comments.

There is an API so can post to here (we do this in the auto-archiver) 

<!-- [![alt text](/assets/2025-01-13/1.png "email")](/assets/2025-01-13/1.png) -->

There is also a crawler (it's main method of getting data?)


## Archive.today aka archive.ph

This is excellent at getting around paywalls eg [https://archive.ph/FlcDl](https://archive.ph/FlcDl)

If you ever get strange issues (eg site not loading, or even welcome to nginx page), try deleting the site cookie in Chrome. 

[wikipedia](https://en.wikipedia.org/wiki/Archive.today)

[archive.is](https://archive.is) aka [archive.today](https://archive.today) aka [archive.ph](https://archive.ph) and their [faq](https://archive.ph/faq)

[![alt text](/assets/2025-01-13/2.jpg "email")](/assets/2025-01-13/2.jpg)



## RELEVANT GENERAL ARCHIVING TOOLS I'VE TRIED 

- [https://github.com/ArchiveBox/ArchiveBox](https://github.com/ArchiveBox/ArchiveBox) - fully featured 23k stars. Self hosted with website. Like the auto-archiver but not as specific. Much better self hosting.

- [https://webrecorder.net/archivewebpage/](https://webrecorder.net/archivewebpage/) - chrome extension based save as WARC / WACZ. Ilya project who makes the excellent [https://github.com/webrecorder/browsertrix-crawler](https://github.com/webrecorder/browsertrix-crawler) which we use the auto-archiver to save a WACZ.

- [https://github.com/internetarchive/heritrix3](https://github.com/internetarchive/heritrix3) - 2.9k stars. 45 contributers. Internet Archive's web crawler project. Interesting, but output is just the same as the Wayback Machine (I assume)

- [https://github.com/Y2Z/monolith](https://github.com/Y2Z/monolith) - 12.4k stars. 28 contributers. Rust. Embeds CSS, images and JS assets. Good for general cases. 

The monolith tool differs from simply doing a “Save as MHTML” in that it inlines all external resources directly within a single HTML file (via data URIs and similar techniques). This means everything—CSS, JavaScript, fonts and images—gets folded into the HTML source itself, producing a standalone file that doesn’t rely on the MHTML format.

Conversely, Chrome’s “Save as MHTML” creates an MHTML file, which is a special archive-like format bundling external resources. Although it’s also a single file, MHTML support can vary between browsers and requires a programme or browser that understands the format. A monolithic HTML file (as produced by monolith) is still just a normal HTML file and is typically more portable and accessible across different platforms and tools without needing MHTML support.

- [https://github.com/harvard-lil/scoop](https://github.com/harvard-lil/scoop) - new project looking at provinence.

- [https://perma.cc/](https://perma.cc/) - used by academics, law and libraries. $10 per month for 10 links. $100 for 500 links. Built by Harvard Library Innovation Lab with Ilya.



## Enterprise Archiving Tools

[https://www.pagefreezer.com/](https://www.pagefreezer.com/) - 

 PageFreezer

 WebPreserver - reliable, automated preservation of social media and web evidence (browser plugin - need subscription). Export to ocr pdf, mhtml or warc.

 Facebook - bulk capture. Headless crawl of all links in a timeline? 
 Twitter
 LinkedIn
 YouTube

They sell to law enforcement agencies, legal firms and investigators 



[https://www.proofpoint.com/us/resources/data-sheets/archivepoint](https://www.proofpoint.com/us/resources/data-sheets/archivepoint)

[https://www.mirrorweb.com/](https://www.mirrorweb.com/) - has the [national records of Scotland](https://www.mirrorweb.com/national-records-of-scotland) web archive. And the [UK Parliament Web Archive](https://webarchive.parliament.uk/)

**HERE - explore more of mirrorweb or proofpoint**???


[https://www.perplexity.ai/](https://www.perplexity.ai/) -    


[https://archive-it.org/](https://archive-it.org/) Built at the internet archive. A subscription service. [https://en.wikipedia.org/wiki/Internet_Archive](https://en.wikipedia.org/wiki/Internet_Archive)




## Specific Platform Archival Tools and Lower Level Libraries

There are some excellent libraries for archiving specific platforms. The auto-archiver uses many of these tools and brings them together.

### Instagram

- public account eg [https://www.instagram.com/farmersguardian/](https://www.instagram.com/farmersguardian/) 

- private account eg you need to accept someone before they can see your posts. eg  [https://www.instagram.com/davemateer/](https://www.instagram.com/davemateer/)

In the auto-archiver we use [https://hikerapi.com/](https://hikerapi.com/) to get Instagram public data.

### Instagram Private - Instagrapi

[https://github.com/subzeroid/instagrapi](https://github.com/subzeroid/instagrapi) 4.6k stars from the makers of HikerAPI.

[https://subzeroid.github.io/instagrapi/](https://subzeroid.github.io/instagrapi/) documentation.

This is a good library, with some excellent tips on how to use it in the documentation. I wrote a POC of this for the auto-archiver.


## Facebook

I wrote an integration for the auto-archiver for Facebook specifically for images

## Telegram

Auto-archiver has an integration for Telegram via the library called Telethon [https://github.com/bellingcat/auto-archiver/blob/main/src/auto_archiver/archivers/telethon_archiver.py](https://github.com/bellingcat/auto-archiver/blob/main/src/auto_archiver/archivers/telethon_archiver.py)

## X / Twitter

As of Jan 2025, [https://github.com/yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp) is a good tool for archiving X/Twitter. The paid API is good for a backup.

## Videos eg YouTube TikTok

[https://github.com/yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp) is excellent.


## VK

Auto-archiver has an integration for VK via [https://github.com/bellingcat/vk-url-scraper](https://github.com/bellingcat/vk-url-scraper)




## Screenshots

[Playwright](https://playwright.dev/) is excellent. I use it in a headfull (ie not headless as this is detected often) manner to get screenshots. I use [xvfb-run](https://manpages.debian.org/bullseye/xvfb/xvfb-run.1.en.html) to run it in a virtual framebuffer on my linux servers to run playwright headfully.


## Manually Archiving

For instagram can't right click on the image to download it. 

Chrome save as PDF. Works well and gets long viewport pages.

Chrome save as MHTML works well, then can right click and save as image..

[getgreenshot.org](https://getgreenshot.org/) for screenshots on a PC. Mac use Cmd Shift 5 

Right click to save an image (or use F12 developer tools to track down the image)

Saving a video from [YouTuvbe]() - [https://gb.savefrom.net/](https://gb.savefrom.net/) are down. [https://yt1d.com/](https://yt1d.com/) is up and saves videos.



[Archive Page (archive.ph)](https://chromewebstore.google.com/detail/archive-page/gcaimhkfmliahedmeklebabdgagipbia) 90k users. 4.4stars. 123 ratings. Just submits to archive.ph.

[Wayback Machine](https://chromewebstore.google.com/detail/wayback-machine/fpnmgdkabkmnadcjpehmlllkndpkmiak) submits to wayback machine.

## Chrome Extensions

[![alt text](/assets/2025-01-13/4.jpg "email"){:width="500px"}](/assets/2025-01-13/4.jpg) 

[SingleFile](https://chromewebstore.google.com/detail/singlefile/mpiodijhokgodhhofbcjdecpffjipkle?hl=en) - [https://github.com/gildas-lormeau/SingleFile](https://github.com/gildas-lormeau/SingleFile) 16.6k stars. 200k users. 4.3stars. 965 ratings. Saves as .html includes images and formatting. Notice notes and highlighting.

This is different to save-as mhtml as

- Singlefile is designed to preserve the look and feel fidelity whereas mhtml is less consistent with dynamic/interactive pages.
- Singlefile can adjust timing, do autosave and more config. MHTML has much less config.
- However MHTML preserves the page better (as singlefile changes it to embed binary data)



[Save Page WE](https://chromewebstore.google.com/detail/save-page-we/dhhpefjklgkmgeafimnjhojgjamoafof/reviews) 100k users. 4.4 rating. 399 ratings. Saves a page.











## General Strategy

- Is there API access eg X/Twitter
- Always submit to the Wayback Machine (unless it is Facebook or Tiktok which never works Jan 2025)
- WACZ is always good to try and get
- For specialised sites, they probabaly don't want you to archive it, so you have to write specific tools, or find ones.

## Where to store your Archives?

- S3 storage eg [DigitalOcean Spaces]()
- Google Drive 

DO is good in public mode as can host any file and view online.

GD is excellent as it gives full domain user contraol over files. But you can't serve a webpage from it nor direct link an image.



## TODO

https://archive.is/Fv1yU

https://archive.today/cLcWH


using Tor to get around IP blocking on YT
https://github.com/rinvii/yt-transcript

list of awesome - archiving?

## Other web sites which archive (not useful for me)

[https://perma.cc/](https://perma.cc/) - used by academics, law and libraries. $10 per month for 10 links. $100 for 500 links. Built by Harvard Library Innovation Lab.

[https://www.freezepage.com/](https://www.freezepage.com/) - generic... didn't work for me.

[https://webrecorder.net/browsertrix/](https://webrecorder.net/browsertrix/) - Cloud based archiving - more towards crawling too?  Tried to do a trial but got stuck after active card check. Under the hood it is just running a wacz, so all the problems that the auto-archiver has (eg Instagram) are the same here.

[![alt text](/assets/2025-01-13/3.jpg "email")](/assets/2025-01-13/3.jpg)

[https://archivebox.io/](https://archivebox.io/) 23k stars on GH. Similar to auto-archiver.. uses Chrome, wget, yt-dlp, submits to archive.org. They also offer a commerical service..





<!-- !-- [![alt text](/assets/2024-09-04/1.jpg "email"){:width="500px"}](/assets/2024-09-04/1.jpg) --> 
<!-- [![alt text](/assets/2024-09-04/1.jpg "email")](/assets/2024-09-04/1.jpg) -->

## Appendix

Am not looking at [multi page web crawling]() nor [investigation/evidence management systems]() - which archiving is often a part of.

## WARC

Web ARChive files.

## WACZ

Saves everything that a pages gives back to you in a WACZ format.

Then can be viewed on [replayweb.page](https://replayweb.page/?source=https%3A//testhashing.fra1.cdn.digitaloceanspaces.com/dia018/cccbd090f5814c159b8ce767.wacz#view=pages&url=https%3A%2F%2Fx.com%2Fdave_mateer%2Fstatus%2F1524341442738638848&ts=20241219150615)

## MHTML

MIME HTML - essentially a webpage single page archive in a single file.

[https://davemateer.com/assets/Instagram.mhtml](https://davemateer.com/assets/Instagram.mhtml) shows Instagram being archived well.

