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

If you have a URL single link, and want to archive the page contents, what tools are available?

Am not looking at [multi page web crawling]() nor [investigation management systems]() - which single page archiving can be a part of.

## Archive - What output do you want?

- Screenshot of the page
- An actual html version of the page (so can read all the text)
- Images downloaded
- Videos downloaded
- All the assets eg CSS / JS / HTML

## Who are the customers (of this article)?

I've worked for the past 4 years in Human Rights archiving, where the focus has been on images and video archiving. Screenshots are important for context. Everything is hashed and Tweeted (as a Tweet is considered immutable). Text content and reading of the websites is less important.

- Human rights organisations
- Journalists
- Insurance investigators
- Discussion websites eg Hacker news - to get around paywalls

Me - I have a commerical business selling hosted versions of the auto-archiver. I want to know

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

## General Archival Tools

- Wayback Machine
- Archive.today
- Auto-archiver (which is a colleciton of specific tools)
- PageFreezer (commercial)

## Internet Archive aka Wayback Machine

[https://web.archive.org/](https://web.archive.org/) and [wikipedia entry](https://en.wikipedia.org/wiki/Wayback_Machine)

[https://web.archive.org/web/20240301234613/https://davemateer.com/2016/10/16/Why-Blog](https://web.archive.org/web/20240301234613/https://davemateer.com/2016/10/16/Why-Blog) Shows it getting text and images from a blog post. Interestingly it didn't get the disqus comments.

There is an API so can post to here (we do this in the auto-archiver) 

[![alt text](/assets/2025-01-13/1.png "email")](/assets/2025-01-13/1.png)

There is also a crawler (it's main method of getting data?)


## Archive.today aka archive.ph

This is excellent at getting around paywalls eg [https://archive.ph/FlcDl](https://archive.ph/FlcDl)

If you ever get strange issues (eg site not loading, or even welcome to nginx page), try deleting the site cookie in Chrome. 

[wikipedia](https://en.wikipedia.org/wiki/Archive.today)

[archive.is](https://archive.is) aka [archive.today](https://archive.today) aka [archive.ph](https://archive.ph) and their [faq](https://archive.ph/faq)

[![alt text](/assets/2025-01-13/2.jpg "email")](/assets/2025-01-13/2.jpg)


## Enterprise Archiving Tools

[https://www.pagefreezer.com/](https://www.pagefreezer.com/) - 

 PageFreezer
 WebPreserver - reliable, automated preservation of social media and web evidence (browser plugin - need subscription)

**ahh annoying - they want to call me to do a demo**



[https://www.proofpoint.com/us/resources/data-sheets/archivepoint](https://www.proofpoint.com/us/resources/data-sheets/archivepoint)

[https://www.mirrorweb.com/](https://www.mirrorweb.com/) - 


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


## TikTok



## WARC

Web ARChive files.

## WACZ

Saves everything that a pages gives back to you in a WACZ format.

Then can be viewed on [replayweb.page](https://replayweb.page/?source=https%3A//testhashing.fra1.cdn.digitaloceanspaces.com/dia018/cccbd090f5814c159b8ce767.wacz#view=pages&url=https%3A%2F%2Fx.com%2Fdave_mateer%2Fstatus%2F1524341442738638848&ts=20241219150615)

## MHTML

MIME HTML - essentially a webpage single page archive in a single file.

[https://davemateer.com/assets/Instagram.mhtml](https://davemateer.com/assets/Instagram.mhtml) shows Instagram being archived well.


## Manually Archiving

For instagram can't right click on the image to download it. 

Chrome save as PDF. Works well and gets long viewport pages.

Chrome save as MHTML works well, then can right click and save as image..

[getgreenshot.org](https://getgreenshot.org/) for screenshots on a PC. Mac use Cmd Shift 5 

Right click to save an image (or use F12 developer tools to track down the image)

Saving a video from [YouTuvbe]() - [https://gb.savefrom.net/](https://gb.savefrom.net/) are down. [https://yt1d.com/](https://yt1d.com/) is up and saves videos.



[Archive Page (archive.ph)](https://chromewebstore.google.com/detail/archive-page/gcaimhkfmliahedmeklebabdgagipbia) 90k users. 4.4stars. 123 ratings. Just submits to archive.ph.

[Wayback Machine](https://chromewebstore.google.com/detail/wayback-machine/fpnmgdkabkmnadcjpehmlllkndpkmiak) submits to wayback machine.




## General Tool Lists and Groups

Any generic tools wont work well for big platforms like X. FB etc..

[awesome-web-archiving](https://github.com/iipc/awesome-web-archiving)




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


## Chrome Extensions

[SingleFile](https://chromewebstore.google.com/detail/singlefile/mpiodijhokgodhhofbcjdecpffjipkle?hl=en) - 200k users. 4.3stars. 965 ratings. Saves as .html includes images and formatting. Works with Facebook.

[Save Page WE](https://chromewebstore.google.com/detail/save-page-we/dhhpefjklgkmgeafimnjhojgjamoafof/reviews) 100k users. 4.4 rating. 399 ratings. Saves a page



<!-- !-- [![alt text](/assets/2024-09-04/1.jpg "email"){:width="500px"}](/assets/2024-09-04/1.jpg) --> 
<!-- [![alt text](/assets/2024-09-04/1.jpg "email")](/assets/2024-09-04/1.jpg) -->
