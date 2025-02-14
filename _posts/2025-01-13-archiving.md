---
layout: post
title: Web Page Archiving 
description: 
menu: review
categories: archiving
published: true 
comments: false     
sitemap: false
image: /assets/2024-11-12/1.jpg
---

<!-- [![alt text](/assets/2025-01-13/5.jpg "email"){:width="500px"}](/assets/2025-01-13/5.jpg)  -->

[![](/assets/2025-01-13/5.jpg "Photo by https://unsplash.com/@eyed"){:width="300px"}](/assets/2025-01-13/5.jpg) 


# How to Archive Single URLs: A Guide  

Need to archive webpages but are unsure how to go about it? 

This guide will walk you through **my favourite tools and techniques** to ensure your links are archived in the best way possible.  

## In This Article  

1. **Why Archive?** – The importance of preserving webpages.  
2. **General Archival Tools** – The most reliable solutions.  
3. **Platform-Specific Archival Tools** – What works best for different sites.  
4. **Manual Archival Methods** – Including browser extensions.  
5. **Appendix** – Additional resources and thoughts.  

## Key Summary

- **[Bellingcat/auto-archiver](https://github.com/bellingcat/auto-archiver)** – The most effective solution for comprehensive archiving I know of. Shameless plug: I have a [hosted version](https://auto-archiver.com/).  
- **[Wayback Machine](https://web.archive.org/save)** – I always submit URLs here (though platforms like X, Instagram, and Facebook may not archive well).  
- **[Archive.ph](https://archive.ph/)** – Very good and better than auto-archiver or wayback for bypassing paywalls.  
- **[Webrecorder](https://webrecorder.net/)** - Good tool for crawling sites

This article was written to explore alternatives to Bellingcat’s open-source **auto-archiver** which I use a lot. To date, I haven't found a better solution. If you have suggestions or thoughts, please get in touch: **davemateer@gmail.com**.


## 1. Why Archive?

Before we dive into the methods of archiving single URLs, it is essential to understand the motivation behind preserving webpages. In our ever-changing digital landscape, online content can disappear (often very quickly from large platforms). For professionals working in investigative fields, ensuring that this content is preserved is paramount.

### Who Might Benefit?

I've found that archiving is useful for a wide range of professionals:

- **Human Rights Investigative Organisations** – This is my own field, where our work has been [recognised with an international award which we are very proud of!](https://www.swansea.ac.uk/press-office/news-events/news/2024/11/research-on-using-mobile-phone-evidence-in-human-rights-cases-wins-prestigious-impact-prize.php)
- **Investigative Journalism**
- **Insurance Investigations**
- **Corporate Investigations**
- **Law Enforcement**
- **Legal Teams and Firms**
- **Other Investigative Organisations**
- **Online Discussion Forums** eg [Hacker News](https://news.ycombinator.com)
- **Digital Preservation** eg [Digital Preservation Coalition](https://www.dpconline.org/) or any of their supporters


### What Should You Archive?

Depending on your requirements, there are various elements you may wish to preserve:

- **Screenshots** – To capture the exact visual context of a webpage.
- **HTML Versions** – Keeping the structure and content accessible even if the original site is altered.
- **Images and Videos** – Particularly important for evidence, especially in human rights cases.
- **Text Content** – Valuable context.
- **WARC or WACZ Files** – Enabling you to replay the entire page and observe changes over time.
- **Hashes and Timestamps** – Providing proof of an asset’s existence at a specific moment.

### The Purpose Behind Archiving

Archiving webpages is crucial for two main reasons:

- **Analysis:** It allows us to conduct detailed reviews and investigations long after the original content has been updated or removed.
- **Preservation:** It helps maintain a reliable record for articles, reports, or even legal cases.

For the past four years, I have been involved in human rights archiving, focusing on safeguarding images and videos before they vanish from major platforms. While text is valuable, it is often the visual evidence—captured through screenshots or preserved multimedia—that offers the most compelling support for an investigation.

By utilising techniques such as hashing and recording on immutable platforms (which we are stopping in favour of timestamping), we can ensure that these records remain untampered.



# 1.1 What to Archive (Input)

 If you're deep into an investigation, and come across [a tweet](https://twitter.com/dave_mateer/status/1524341442738638848) which is important, then paste it into a spreadsheet. That's where the auto-archiver tool comes in. It pulls URLs from a Google Spreadsheet, then archives it.

## Setting Up Your Archive Input

Imagine you have a list of URLs organised in a spreadsheet with columns already configured for the auto-archiver. Here’s an example screenshot of such a setup:

[![Spreadsheet Setup](/assets/2025-01-13/10.jpg "Spreadsheet Setup")](#)

Once the archiving kicks off (usually within a minute), the tool processes these URLs and writes the results directly back into the spreadsheet:

[![Archiver Output](/assets/2025-01-13/11.jpg "Archiver Output")](#)

## Exploring the Archive Details

Every archived page includes a details page, which you can access via a direct [link](https://testhashing.fra1.cdn.digitaloceanspaces.com/iv001/7049ee36a7214ee78846dbfd.html). On this page, you’ll find:

- **Full Resolution Images:** Complete with EXIF metadata and hashes
- **Screenshots:** A visual capture of the page at the time of archiving.
- **Reverse Image Search Links:** Helping you track the image’s origins.
- **A timestamp hash:** Which proves the content at this moment in time. 

Take a look at this snapshot:

[![Details Page](/assets/2025-01-13/12.jpg "Details Page")](#)

Moreover, the archive also stores a timestamped hash of the file, a [WACZ archive]() of the entire page, and the full text content of the Tweet:

[![Additional Archive Details](/assets/2025-01-13/13.jpg "Additional Archive Details")](#)

## Why Google Spreadsheets?

I’ve found that [Google Spreadsheets](https://docs.google.com/) is flexible and free, and fantastic for collaboration. I worked on sheets with 70,000+ rows (per tab) and collaborating with over 10 people at once. It can use significant resources on my machine, and can slow down, but is extremely impressive. 

## Curated Test Links for Archiving

During my research, I compiled a list of test links that covers various scenarios—ranging from pages with numerous images to those with extensive content. You can check out the [Google Spreadsheet of Test Links](https://docs.google.com/spreadsheets/d/1X7yqklWh2AnzzdILtoKeJgzx2L2PfwWJqIQ4UhhRYHg) to see these examples in action. If you have any interesting links you'd like to have archived, feel free to drop me a line at **davemateer@gmail.com**.

## Final Thoughts on inputs

It quickly became apparent that archiving large platforms—where most of my work is concentrated—often demands specialised, targeted archivers. That is why the auto-archiver worked well (as it has plugins for each platform). 


# 1.3 How to Store Archives (Output)

When it comes to storing your archives, the best option depends on your organisation's needs and the infrastructure you already have in place. Here are some common storage solutions I work with:

- **S3 Storage:** For instance, [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/).
- **Google Workspace/Drive:** [Google Drive](https://workspace.google.com/intl/en_uk/products/drive/).
- **Local/Network Storage:** Use your own servers or network storage.

## DigitalOcean Spaces

DigitalOcean Spaces is particularly effective in public mode. It can host any file and make it viewable online. For example, check out this [Instagram auto-archiver output](https://testhashing.fra1.cdn.digitaloceanspaces.com/dia031/c87e98048a2f4a09a66e1ea3.html). Additionally, you can set up a [CORS policy](/2024/10/08/cors-on-digitalocean) to host WACZ files and use them with [ReplayWeb](https://replayweb.page/) for viewing the captured page.

## Google Drive

Google Drive offers excellent control over files within your domain. However, it's important to note that while it's great for file management, you cannot serve a webpage directly from it / use it for direct image linking.

![Google Drive Example](/assets/2025-01-13/14.jpg "Google Drive Example")

## Additional Tools

For those managing S3 storage, [Cyberduck S3 Viewer](https://cyberduck.io/) is a great tool to view and copy files to your S3 buckets




# 2. General Archival Tools

## 2.1 Wayback Machine

The Wayback Machine from the Internet Archive or simply [web.archive.org](https://web.archive.org/), is the most popular free archival tool available today.

![Wayback Machine Interface](/assets/2025-01-13/8.jpg "Wayback Machine Interface")

I always submit my archived urls here—often through their [API](https://archive.org/account/s3.php). This invaluable service, provided by the non-profit Internet Archive, has helped preserve [hundreds of billions](https://en.wikipedia.org/wiki/Wayback_Machine) of pages over the last 23 years.

However, it's important to note that the Wayback Machine doesn't work well with larger platforms like Instagram (currently blocked) and Facebook. Your mileage may vary.

![Overloaded API Warning](/assets/2025-01-13/15.jpg "Overloaded API Warning")

Keep in mind that the service can sometimes get overloaded. The API, in particular, might take up to 5 minutes to confirm a successful save and you can see above a 21 minute wait from the web UI.


## 2.2 Auto-archiver

The auto-archiver is a great knitting together of the best open source tools (which is continually evolving) by the amazing team at [Bellingcat](https://www.bellingcat.com/resources/2022/09/22/preserve-vital-online-content-with-bellingcats-auto-archiver-tool/). I've been using and contributing to this project for the past three years, and I even offer it as a [hosted service](https://auto-archiver.com/).

This suite of tools is designed to help you archive content from several specific platforms, including:

- **Instagram**
- **Facebook**
- **X/Twitter**
- **Telegram**
- **TikTok**
- **YouTube**
- **VK**

### Downsides

While the auto-archiver is the best at what it does, there are some challenges to keep in mind:

- **Complex Setup:** It can be hard to configure properly (currently being worked on - Feb 2025)
- **No UI:** There isn’t a user-friendly interface available.
- **Limited User Base:** It doesn't have a massive following yet.
- **Constant Tweaking:** It requires ongoing adjustments to keep pace with platform changes.

### Upsides

Despite these challenges, the auto-archiver offers several significant advantages:

- **Unmatched Raw Results:** There is nothing better for capturing pure archival data.
- **Commercial Support:** You can get direct support and even speak with the source contributors (including me!).
- **Proven Stability:** It has been running reliably for over four years across various platforms (AWS, Azure, and bare metal).
- **Python:** It is written in Python, so can be easily understoon, and worked on by others.


## 2.3 Archive.today

[archive.today](https://archive.today) is known by several names, including:

- [archive.ph](https://archive.ph)
- [archive.is](https://archive.is)


All these URLs redirect to the same service.

[![Archive.today Screenshot](/assets/2025-01-13/16.jpg "Archive.today Screenshot")](#)

This service is particularly effective at getting around paywalls—for example, take a look at [this archived page](https://archive.ph/FlcDl). I've found nothing better for accessing paywalled content, which is why [Hacker News](https://news.ycombinator.com/) often links to articles saved via Archive.today.
If you ever run into issues—such as the site not loading or seeing a "Welcome to nginx" page—try deleting the site cookie in Chrome.

For more information, you can check out their [FAQ](https://archive.ph/faq). It's worth noting that the identity of the site's owner is kept under wraps, likely due to the controversial nature of bypassing paywalls and potential breaches of EULAs.


## 2.4 Open Source

These tools are interesting, but not as useful for my specific needs—I prefer the auto-archiver described above. Nevertheless, here are some noteworthy open source archiving projects:

[![alt text](/assets/2025-01-13/3.jpg "Archivebox"){:width="500px"}](/assets/2025-01-13/3.jpg)

Screenshot from Archivebox - notice the common problem of popups on large platforms

- **[ArchiveBox](https://github.com/ArchiveBox/ArchiveBox)**  
  A fully featured self-hosted solution with a dedicated website. With 23k stars, it’s similar to the auto-archiver (with a nice front end) but less specialised, and it's excellent for self-hosting.

- **[Webrecorder](https://webrecorder.net/archivewebpage/)**  
  A Chrome extension that saves pages as WARC/WACZ files. This project is by [Ilya Kreymer](https://www.linkedin.com/in/ilya-kreymer-55110093/), the same person behind the great [Browsertrix Crawler](https://github.com/webrecorder/browsertrix-crawler) (702 stars), which we use with the auto-archiver to save WACZ files. See the end of this article for more on this.

- **[Heritrix 3](https://github.com/internetarchive/heritrix3)**  
  The Internet Archive’s web crawler project with 2.9k stars and 45 contributors. Its output is largely similar to what the Wayback Machine produces.

- **[Monolith](https://github.com/Y2Z/monolith)**  
  A Rust-based tool with 12.4k stars and 28 contributors that embeds CSS, images, and JavaScript assets into a single HTML file—ideal for general archiving cases.

- **[Scoop](https://github.com/harvard-lil/scoop)**  
  A new project focused on provenance.

- **[Perma.cc](https://perma.cc/)**  
  Widely used by academics, legal professionals, and libraries. It costs $10 per month for 10 links or $100 for 500 links. This service is built by the Harvard Library Innovation Lab in collaboration with Ilya.

- **[Conifer](https://conifer.rhizome.org/)**  
  Note: I’ve already submitted a bug report (as of January 29, 2025).

## Commercial Archiving Tools

Surprisingly, there aren’t many commercial tools that can archive single pages as effectively as the open source options. However, some case/investigation management systems include basic archiving tools:

- **[Atlos](https://www.atlos.org/)**  
  This platform includes a basic screenshot tool and even integrates with the auto-archiver.
  
[![](/assets/2025-01-13/9.jpg "Atlos Screenshot"){:width="500px"}](/assets/2025-01-13/9.jpg) 

- **[Hunch.ly](https://hunch.ly/)**  
  An OSINT tool designed for online investigations, available as both an app and an extension. It automatically captures content during your investigative process. $110 per year.

So far, I haven’t encountered any enterprise archiving tools that meet the needs of single-page investigative archiving as effectively as these solutions.

### 2.5.1 PageFreezer

**[PageFreezer](https://www.pagefreezer.com/)** is a Vancouver-based company with around 50-100 employees. I chatted to Doug, who is incredibly friendly and helpful showing me how their products work.

PageFreezer specializes in capturing changes to web pages over time and provides a user-friendly interface to view these changes, similar to the Wayback Machine. 

They offer two main products:  

1. **PageFreezer**: Focuses on tracking and visualizing changes to web pages over time.  This crawls.
2. **WebPreserver**: An automated tool for preserving social media and web evidence. It’s a chromium browser plugin that requires a subscription and allows exports in OCR PDF, MHTML, or WARC formats. Bulk capture on Facebook, Instagram, TikTok (all on date ranges)

#### Key Features:  
- **Social Media Preservation**:  
  - **Facebook**: Bulk capture capabilities including all posts on a timeline.  
  - **Twitter**: 
  - **LinkedIn**: 
  - **YouTube**: 
  - **TikTok**
  - **Reddit**
  - **Instagram**
  - **Rumble**
  - **TruthSocial**
  - **BlueSky**
  - **Threads**

PageFreezer primarily caters to law enforcement agencies, government agencies, legal firms, and investigators.

Pricing is around the $3350per year for a single user.

### 2.5.2 MirrorWeb

**[MirrorWeb](https://www.mirrorweb.com/)** is a focusses on large-scale website archiving rather than single-page preservation. They have large clients like: 

- **[National Records of Scotland](https://www.mirrorweb.com/national-records-of-scotland)**  
- **[UK Parliament Web Archive](https://webarchive.parliament.uk/)**  
- **[UK National Archives Web Archive](https://www.nationalarchives.gov.uk/webarchive/)**  


## 2.5.3 Archive-it

[Archive-it](https://archive-it.org/) is a subscription service built by the Internet Archive (see [Wikipedia](https://en.wikipedia.org/wiki/Internet_Archive) for more details). It is designed for archiving entire websites over time, capturing their evolution and preserving historical snapshots.
  

### Other Tools

Here are a couple of additional tools worth mentioning, though they cater to more specific use cases:

- **[CivicPlus Social Media Archiving](https://www.civicplus.com/social-media-archiving/)**:  
  This tool focuses on **government social media archiving** and compliance. It’s designed to help government agencies back up and manage their social media content to meet regulatory requirements.  

- **[Smarsh](https://www.smarsh.com/solutions/business-need/archiving)**:  
  Smarsh specializes in **company communications governance and archiving**. It’s a comprehensive solution for businesses that need to archive and manage communications (e.g., emails, chats, and social media) for compliance, legal, or regulatory purposes.  


## 3. Platform-Specific Archival Tools and Libraries

For archiving content from specific platforms, there are several excellent libraries available. The **auto-archiver** leverages many of these tools.

### Instagram

Instagram archiving can be divided into two categories: **public accounts** and **private accounts**.  

- **Public Accounts**:  
  Example: [Farmers Guardian](https://www.instagram.com/farmersguardian/)  
  These accounts are accessible to anyone without requiring permission.  

- **Private Accounts**:  
  Example: [Dave Mateer](https://www.instagram.com/davemateer/)  
  Access to these accounts requires approval from the account owner.  

In the auto-archiver, we use **[HikerAPI](https://hikerapi.com/)** to retrieve data from public Instagram accounts.  

#### Instagram Private - Instagrapi

For private Instagram accounts, we rely on **[Instagrapi](https://github.com/subzeroid/instagrapi)**, a library developed by the creators of HikerAPI. With 4.6k stars on GitHub, it’s a robust tool for accessing private Instagram data.  

- **Documentation**: [Instagrapi Docs](https://subzeroid.github.io/instagrapi/)  
- **Usage**: The documentation provides excellent tips and guidance. I’ve also developed a proof-of-concept (POC) for integrating Instagrapi into the auto-archiver.  

### Facebook

For Facebook, I created a custom integration in the auto-archiver specifically designed to archive **images**. This functionality ensures that images from Facebook can be preserved.


## Telegram

The Auto-archiver now features seamless integration with Telegram, utilising the Telethon library. You can explore the implementation [here](https://github.com/bellingcat/auto-archiver/blob/main/src/auto_archiver/archivers/telethon_archiver.py).

## X / Twitter

As of January 2025, [yt-dlp](https://github.com/yt-dlp/yt-dlp) is a fantastic tool for archiving content from X (formerly Twitter). For an extra layer of reliability, the paid API serves as a backup.

## Videos (e.g. YouTube, TikTok)

When it comes to video archiving, [yt-dlp](https://github.com/yt-dlp/yt-dlp) is the standard tool.

## VK

The Auto-archiver also integrates with VK through the [VK URL Scraper](https://github.com/bellingcat/vk-url-scraper)

## Screenshots

For capturing screenshots, [Playwright](https://playwright.dev/) is superb. I typically run it in headful mode (rather than headless, as the latter is often easily detected) to obtain more reliable captures. On my Linux servers, I utilise [xvfb-run](https://manpages.debian.org/bullseye/xvfb/xvfb-run.1.en.html) to operate within a virtual framebuffer.

For a professional solution, [urlbox.com](https://urlbox.com/) offers a top-tier screenshotting service.


## 4. Manually Archiving

When it comes to manually archiving content start simple and see what works for you.

### Images

- **Chrome Save as PDF:** This feature works well, especially for capturing long, scrolling pages.
- **Chrome Save as MHTML:** This option is also effective. Once the page is saved as MHTML, you can right-click to save any images you need.
- **Screenshots:** 
  - On a PC, [Greenshot](https://getgreenshot.org/) is an excellent free tool.
  - On a Mac, simply use the shortcut `Cmd + Shift + 5` or other variants for capturing screenshots.
- **Image Save As:** When available, you can right-click an image to save it directly, or use the F12 developer tools to locate and extract the image source.

### Videos

- **YouTube and Similar Platforms:** Note that while [gb.savefrom.net](https://gb.savefrom.net/) is currently blocked from the UK, [yt1d.com](https://yt1d.com/) is operational and can be used to save non copyrighted videos.


### Chromium Extensions

#### These extensions submit to archiving services:

- **Archive Page (archive.ph):** This [Chrome extension](https://chromewebstore.google.com/detail/archive-page/gcaimhkfmliahedmeklebabdgagipbia), with 90k users, a 4.4-star rating, and 123 reviews, simply submits pages to archive.ph.
- **Wayback Machine:** This [extension](https://chromewebstore.google.com/detail/wayback-machine/fpnmgdkabkmnadcjpehmlllkndpkmiak) allows you to submit pages directly to the Wayback Machine


####  These extensions attempt to save the web page themselves:

- **Webrecorder Archive Webpage:** This [extension](https://github.com/webrecorder/archiveweb.page) archives webpages as a WACZ files or WARC.

<!-- [![](/assets/2025-01-13/18.jpg "Archive Webpage dashboard"){:width="700px"}](/assets/2025-01-13/18.jpg)  -->
[![](/assets/2025-01-13/18.jpg "Archive Webpage dashboard")](/assets/2025-01-13/18.jpg) 
Archive Webpage dashboard. This is offline using browser local storage to view the saved session.

<!-- [![](/assets/2025-01-13/17.jpg "Archive view"){:width="700px"}](/assets/2025-01-13/17.jpg)  -->
[![](/assets/2025-01-13/17.jpg "Archive view")(/assets/2025-01-13/17.jpg) 
Again the machine is offline viewing this.

<!-- [![](/assets/2025-01-13/19.jpg "Instagram on a non logged in machine"){:width="700px"}](/assets/2025-01-13/19.jpg)  -->
[![](/assets/2025-01-13/19.jpg "Instagram on a non logged in machine")](/assets/2025-01-13/19.jpg) 

**Here is another computer, not logged into Instagram

<!-- [![](/assets/2025-01-13/20.jpg "Non logged in machine viewing wacz"){:width="700px"}](/assets/2025-01-13/20.jpg)  -->
[![](/assets/2025-01-13/20.jpg "Non logged in machine viewing wacz")](/assets/2025-01-13/20.jpg) 

Here is that same computer viewing the wacz of the logged in the machine.


ArchiveWeb.page allows users to archive what they browse, storing captured data directly in the browser. Users can download this data as files to their hard drive. Users can also delete any and all archived data at any time. ArchiveWeb.page does not collect any usage or tracking data


<!-- [![](/assets/2025-01-13/21.jpg "Facebook logged in"){:width="700px"}](/assets/2025-01-13/21.jpg)  -->
[![](/assets/2025-01-13/21.jpg "Facebook logged in"){}](/assets/2025-01-13/21.jpg) 
Facebook logged in capturing the page.

<!-- [![](/assets/2025-01-13/22.jpg "Facebook view on different machine"){:width="700px"}](/assets/2025-01-13/22.jpg)  -->
[![](/assets/2025-01-13/22.jpg "Facebook view on different machine")](/assets/2025-01-13/22.jpg) 
Downloaded and uploaded wacz to different machine and got a good render. The infinite scroll comments do not work properly.

I'm excited about this tool as it gives the great feature of being logged into sites, and saving exactly what the users sees.

- **SingleFile** This [extension](https://chromewebstore.google.com/detail/singlefile/mpiodijhokgodhhofbcjdecpffjipkle?hl=en-US&utm_source=ext_sidebar) 200k users, saves the complete webpage as a singlefile, changing the html to embed assets. 


## 5. Appendix

This article is an opinionated list and I wont mention the tools that are not useful for me! I am not looking at multi page web crawling nor investigation/evidence/case management systems - which archiving is often a part of.

[awesome-web-archiving](https://github.com/iipc/awesome-web-archiving) contains more with a much broader scope.


## WARC and WACZ file formats

The WACZ format is a more recent development, designed to simplify the sharing and replay of web archives. It is essentially a zipped collection of WARC files, along with additional metadata and an index to facilitate easier access and replay of the archived content.

Web ARChive files.

[https://wiki.archiveteam.org/index.php/The_WARC_Ecosystem](https://wiki.archiveteam.org/index.php/The_WARC_Ecosystem)


Both file formats can be viewed on [replayweb.page](https://replayweb.page/?source=https%3A//testhashing.fra1.cdn.digitaloceanspaces.com/dia018/cccbd090f5814c159b8ce767.wacz#view=pages&url=https%3A%2F%2Fx.com%2Fdave_mateer%2Fstatus%2F1524341442738638848&ts=20241219150615)

Replay web is somewhat confusing (when I started). But with testing I found that it really does work offline, viewing well what was captured at the time the wacz/warc was captured.

## MHTML

MIME HTML - essentially a webpage single page archive in a single file which can be very useful. Chromium browsers can do this manually using a right click.

[https://davemateer.com/assets/Instagram.mhtml](https://davemateer.com/assets/Instagram.mhtml) shows Instagram being archived well.

In comparison to the SinglePage open source projects which rewrites the page assets into a single file.

## Hashing

A hash serves as a unique identifier for a file—a single value that confirms the file's integrity. We use hashes to ensure that images remain unchanged and to verify that our HTML pages (which incorporate individual hashes, effectively a hash of hashes) have not been tampered with.

Before proceeding, it’s worth reflecting on why we archive content in the first place.

*(The following insights come from a colleague in the legal sector)*

> If the objective is to support future legal proceedings, there is an argument that private retention of data may be more than sufficient:
> "I feel these kinds of systems overcomplicate an already reliable process, one that is accepted by courts around the world for the safe management of digital evidence.
> 
> The courts are pragmatic; if you can confidently state that you performed a particular action at a specific time, resulting in the production of certain data, the risk of a two-year sentence for contempt of court is more than enough to deter any manipulation.
> 
> Adding further complexity doesn’t necessarily build trust—it can instead hinder the ability of investigators, juries, or the judiciary to understand the processes and their purposes."

### Options for Hashing

But where can you store these hashes in a secure and immutable manner—that is, ensuring they cannot be altered after creation? Consider the following options:

- **Blockchains**
- **Immutable Blog Services** (e.g. X/Twitter)
- **Timestamping Services**
- **Write Once, Read Many (WORM) Storage**
- **Git with Cryptographic Signing (Internal Use)**
- **Secure Databases with Write-Once Constraints**
- **Physical Print / Cold Storage**

Although Twitter has been a reliable option in the past, it is increasingly falling out of favour both politically and in terms of trustworthiness. Accounts can be blocked and tweets removed, which may undermine the evidence.

### Timestamping

Timestamping is a method that can prove a file existed at a specific moment in time, which is invaluable for legal purposes—such as confirming that a file has not been altered after a given date.

One approach is to use external timestamp authorities that adhere to RFC3161, as illustrated by the [auto-archiver implementation](https://github.com/bellingcat/auto-archiver/blob/e8138eac1c79626c4c16226dcda8eb644db119e4/src/auto_archiver/enrichers/timestamping_enricher.py#L17-L23).

> In summary, while a hash confirms that a file remains unaltered, timestamping provides a reliable record of when the file existed. It essentially builds upon the hash by incorporating the crucial element of time—a feature that is especially valuable in legal, archival, or compliance contexts.

[Technical details on verifying timestamps](https://github.com/bellingcat/auto-archiver/issues/187)

### OpenTimestamps

The timestamping method described above relies on the authority of various trusted root entities.

[OpenTimestamps](https://opentimestamps.org/) is a protocol designed for timestamping files and proving their integrity over time. It embeds the hash onto a blockchain—Bitcoin has been operational for 16 years, and OpenTimestamps has been around for 8 years.

## People and Interesting Articles

- [Andrew Jackson](https://anjackson.net/about/) – Technical Architect at the [Digital Preservation Coalition](https://www.dpconline.org/about/contact-us).
- [Archiving Social Media with Browsertrix](https://blogs.bl.uk/webarchive/2024/10/archiving-social-media-with-browsertrix.html)
- [Archivists Saving Work from data.gov](https://news.ycombinator.com/item?id=42881367)
- [bag-nabit](https://github.com/harvard-lil/bag-nabit) – Stamps with a certificate so that people can use rclone.
- [BitIt](https://en.wikipedia.org/wiki/BagIt) protocol
- [Scoop](https://github.com/harvard-lil/scoop) – Outputs to WACZ and WARC.

## Conclusion

I run a business called [**Auto-Archiver.com**](https://auto-archiver.com/), which offers hosted versions of the [**Auto-Archiver**](https://github.com/bellingcat/auto-archiver) tool. As I continue to develop and refine this service, I’ve been reflecting on a few key questions:  

- **Are there better products out there?** (Not that I know of!)  
- **Are my customers getting their money’s worth?** (I believe so!)  
- **Should I partner with other organisations to sell their products?** (maybe - I want to see if https://archiveweb.page/ is useful to my clients )  
- **Who needs archiving help?** (Investigators, researchers, and organisations dealing with sensitive or time-sensitive data.) 

<br />
<br />

---

<br />
<br />

This blog post is a snapshot of my journey in the world of archiving, the tools I’ve encountered, and the questions I’m asking as I grow my business. If you’re passionate about digital preservation or have insights to share please get in touch at **davemateer@gmail.com**.



