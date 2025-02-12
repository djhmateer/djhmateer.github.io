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

Need to archive webpages but are unsure of the best method? 

This guide will walk you through **my favourite tools and techniques** to ensure your links are preserved.  

## In This Article  

1. **Why Archive?** – The importance of preserving webpages.  
2. **General Archival Tools** – The most reliable solutions.  
3. **Platform-Specific Archival Tools** – What works best for different sites.  
4. **Manual Archival Methods** – Including browser extensions.  
5. **Appendix** – Additional resources and insights.  

## Key Summary

- **[Wayback Machine](https://web.archive.org/save)** – Always a solid choice (though platforms like X, Instagram, and Facebook may not archive well).  
- **[archive.ph](https://archive.ph/)** – Best for bypassing paywalls.  
- **[Bellingcat/auto-archiver](https://github.com/bellingcat/auto-archiver)** – The most effective solution for comprehensive archiving. You can also use my hosted version at [auto-archiver.com](https://auto-archiver.com/).  
- **[webrecorder](https://webrecorder.net/)** - The best tool for crawling sites

This article was written to explore alternatives to Bellingcat’s open-source **auto-archiver** which I use a lot. To date, I have not found a better solution. If you have suggestions or thoughts, please get in touch: **davemateer@gmail.com**.


## 1. Why Archive?

Before we dive into the methods of archiving single URLs, it is essential to understand the motivation behind preserving webpages. In our ever-changing digital landscape, online content can vanish as quickly as it appears. For professionals working in investigative fields, ensuring that a verifiable record of web pages exists is paramount.

### Who Might Benefit?

If you work in any of these areas, archiving is likely to be an invaluable tool:

- **Human Rights Investigative Organisations** – This is my own field, where our work has been [recognised with an international award which we are very proud of!](https://www.swansea.ac.uk/press-office/news-events/news/2024/11/research-on-using-mobile-phone-evidence-in-human-rights-cases-wins-prestigious-impact-prize.php)
- **Investigative Journalism**
- **Insurance Investigations**
- **Corporate Investigations**
- **Law Enforcement**
- **Legal Teams and Firms**
- **Other Investigative Organisations**
- **Online Discussion Forums** eg [Hacker News](https://news.ycombinator.com)
- **Digital Preservation** eg [Digital Preservation Coalition](https://www.dpconline.org/) or any of their su


### What Should You Archive?

Depending on your requirements, there are various elements you may wish to preserve:

- **Screenshots** – To capture the exact visual context of a webpage.
- **HTML Versions** – Keeping the structure and content accessible even if the original site is altered.
- **Images and Videos** – Particularly important for evidence, especially in human rights cases.
- **Text Content** – While secondary to visual evidence, it still offers valuable context.
- **WARC or WACZ Files** – Enabling you to replay the entire page and observe changes over time.
- **Hashes and Timestamps** – Providing proof of an asset’s existence at a specific moment.
- **Bypassing Paywalls** – Allowing access to content that might otherwise be restricted.

### The Purpose Behind Archiving

The core reasons for archiving webpages include:

- **Analysis** – Facilitating detailed reviews and investigations long after the original content has been updated or removed.
- **Preservation** – Maintaining a reliable record for articles, reports, or legal cases.

Over the past four years, I have dedicated myself to human rights archiving, focusing on safeguarding images and videos before they are removed by major platforms. While text is valuable, it is often the visual evidence—captured through screenshots and preserved multimedia—that provides the most compelling support for an investigation.


By utilising techniques such as hashing and recording on immutable platforms, we can ensure that these records remain untampered. This guide will help you select the best tools and methods to archive single URLs effectively, ensuring your links are preserved for thorough analysis and long-term reference.



# 1.1 What to Archive (Input)

When you're deep into an investigation, you come across [this tweet](https://twitter.com/dave_mateer/status/1524341442738638848)—and wonder how to capture every detail. That's where the auto-archiver tool comes in. It pulls URLs from a Google Spreadsheet, letting you archive content with ease.

## Setting Up Your Archive Input

Imagine you have a list of URLs organised in a spreadsheet with columns already configured for the auto-archiver. Here’s an example screenshot of such a setup:

[![Spreadsheet Setup](/assets/2025-01-13/10.jpg "Spreadsheet Setup")](#)

Once the archiving kicks off (within a minute), the tool processes these URLs and writes the results directly back into the spreadsheet:

[![Archiver Output](/assets/2025-01-13/11.jpg "Archiver Output")](#)

## Exploring the Archive Details

Every archived page includes a details page, which you can access via a direct [link](https://testhashing.fra1.cdn.digitaloceanspaces.com/iv001/7049ee36a7214ee78846dbfd.html). On this page, you’ll find:

- **Full Resolution Images:** Complete with EXIF metadata.
- **Reverse Image Search Links:** Helping you track the image’s origins.
- **Screenshots:** A visual capture of the page at the time of archiving.

Take a look at this snapshot:

[![Details Page](/assets/2025-01-13/12.jpg "Details Page")](#)

Moreover, the archive also stores a timestamped hash of the file, a [WACZ archive]() of the entire page, and the full text content of the Tweet:

[![Additional Archive Details](/assets/2025-01-13/13.jpg "Additional Archive Details")](#)

## Why Google Spreadsheets?

I’ve found that [Google Spreadsheets](https://docs.google.com/) is flexible and free, and fantastic for collaboration. Whether you’re handling a sheet with 70,000+ rows or collaborating with over 10 people at once, Google Sheets can handle the heavy lifting—albeit with a bit of extra memory and horsepower required.

## Curated Test Links for Archiving

During my research, I compiled a list of test links that covers various scenarios—ranging from pages with numerous images to those with extensive content. You can check out the [Google Spreadsheet of Test Links](https://docs.google.com/spreadsheets/d/1X7yqklWh2AnzzdILtoKeJgzx2L2PfwWJqIQ4UhhRYHg) to see these examples in action. If you have any interesting links you'd like to have archived, feel free to drop me a line at **davemateer@gmail.com**.

## Final Thoughts on inputs

It quickly became apparent that archiving large platforms—where most of my work is concentrated—often demands specialized, targeted archivers. Whether you're preserving social media posts, digital images, or comprehensive web pages, the right tools make all the difference.


# 1.3 How to Store Archives (Output)

When it comes to storing your archives, the best option depends on your organisation's needs and the infrastructure you already have in place. Here are some common storage solutions I work with:

- **S3 Storage:** For instance, [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/).
- **Google Workspace/Drive:** Utilize [Google Drive](https://workspace.google.com/intl/en_uk/products/drive/).
- **Local/Network Storage:** Use your own servers or network storage for complete control.

## DigitalOcean Spaces

DigitalOcean Spaces is particularly effective in public mode. It can host any file and make it viewable online. For example, check out this [Instagram auto-archiver output](https://testhashing.fra1.cdn.digitaloceanspaces.com/dia031/c87e98048a2f4a09a66e1ea3.html). Additionally, you can set up a [CORS policy](/2024/10/08/cors-on-digitalocean) to host WACZ files and use them with [ReplayWeb](https://replayweb.page/) for viewing the captured page.

## Google Drive

Google Drive offers excellent control over files within your domain. However, it's important to note that while it's great for file management, you cannot serve a webpage directly from it or use it for direct image linking.

![Google Drive Example](/assets/2025-01-13/14.jpg "Google Drive Example")

## Additional Tools

For those managing S3 storage, [Cyberduck S3 Viewer](https://cyberduck.io/) is a great tool to view and copy files to your S3 buckets




# 2. General Archival Tools

## 2.1 Wayback Machine

Also known as the Internet Archive or simply [web.archive.org](https://web.archive.org/), the Wayback Machine is one of the most popular and free archival tools available today.

![Wayback Machine Interface](/assets/2025-01-13/8.jpg "Wayback Machine Interface")

If you want to save a webpage, a great starting point is [web.archive.org/save](https://web.archive.org/save). I always make it a point to submit my archived content here—often through their [API](https://archive.org/account/s3.php). This invaluable service, provided by the non-profit Internet Archive, has helped preserve [hundreds of billions](https://en.wikipedia.org/wiki/Wayback_Machine) of pages over the last 23 years.

However, it's important to note that the Wayback Machine doesn't capture every site. For instance, platforms like Instagram and Facebook often have limitations or might not be archived at all.

![Overloaded API Warning](/assets/2025-01-13/15.jpg "Overloaded API Warning")

Keep in mind that the service can sometimes get overloaded. The API, in particular, might take up to 5 minutes to confirm a successful save.



## 2.2 Auto-archiver

The auto-archiver is a robust collection of tools developed by the amazing team at [Bellingcat](https://www.bellingcat.com/resources/2022/09/22/preserve-vital-online-content-with-bellingcats-auto-archiver-tool/). I've been using and contributing to this project for the past three years, and I even offer it as a [hosted service](https://auto-archiver.com/).

This suite of tools is designed to help you archive content from several specific platforms, including:

- **Instagram**
- **Facebook**
- **X/Twitter**
- **Telegram**
- **TikTok**
- **YouTube**
- **VK**

### Downsides

While the auto-archiver is exceptional for capturing raw data, there are some challenges to keep in mind:

- **Complex Setup:** It can be hard to configure properly.
- **No UI:** There isn’t a user-friendly interface available.
- **Limited User Base:** It doesn't have a massive following yet.
- **Constant Tweaking:** It requires ongoing adjustments to keep pace with platform changes.

### Upsides

Despite these challenges, the auto-archiver offers several significant advantages:

- **Unmatched Raw Results:** There is nothing better for capturing pure archival data.
- **Commercial Support:** You can get direct support and even speak with the source contributors (including me!).
- **Proven Stability:** It has been running reliably for over four years across various platforms (AWS, Azure, and bare metal).


## 2.3 Archive.today

[archive.today](https://archive.today) is known by several names, including:

- [archive.ph](https://archive.ph)
- [archive.is](https://archive.is)


All these URLs redirect to the same service.

[![Archive.today Screenshot](/assets/2025-01-13/16.jpg "Archive.today Screenshot")](#)

This service is particularly effective at getting around paywalls—for example, take a look at [this archived page](https://archive.ph/FlcDl). I've found nothing better for accessing paywalled content, which is why [Hacker News](https://news.ycombinator.com/) often links to articles saved via Archive.today.
If you ever run into issues—such as the site not loading or seeing a "Welcome to nginx" page—try deleting the site cookie in Chrome.

For more information, you can check out their [FAQ](https://archive.ph/faq). It's worth noting that the identity of the site's owner is kept under wraps, likely due to the controversial nature of bypassing paywalls and potential breaches of EULAs.


## 2.4 Other Open Source

These tools are interesting, but not as useful for my specific needs—I prefer the auto-archiver described above. Nevertheless, here are some noteworthy open source archiving projects:

- **[ArchiveBox](https://github.com/ArchiveBox/ArchiveBox)**  
  A fully featured self-hosted solution with a dedicated website. With 23k stars, it’s similar to the auto-archiver but less specialized, and it's excellent for self-hosting.

- **[Webrecorder](https://webrecorder.net/archivewebpage/)**  
  A Chrome extension that saves pages as WARC/WACZ files. This project is by Ilya, the same mind behind the impressive [Browsertrix Crawler](https://github.com/webrecorder/browsertrix-crawler) (702 stars), which we use with the auto-archiver to save WACZ files.

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

## Other Commercial Archiving Tools

Surprisingly, there aren’t many commercial tools that can archive single pages as effectively as the open source options. However, some case/investigation management systems include basic archiving tools:

- **[Atlos](https://www.atlos.org/)**  
  This platform includes a basic screenshot tool and even integrates with the auto-archiver.
  
  <img src="/assets/2025-01-13/9.jpg" alt="Atlos Screenshot" width="400" />

- **[Hunch.ly](https://hunch.ly/)**  
  An OSINT tool designed for online investigations, available as both an app and an extension. It automatically captures content during your investigative process.

So far, I haven’t encountered any enterprise archiving tools that meet the needs of single-page investigative archiving as effectively as these solutions.

### 2.5.1 PageFreezer

**[PageFreezer](https://www.pagefreezer.com/)** is a Vancouver-based company with around 50-100 employees. I’ve had the pleasure of interacting with Doug, who is incredibly friendly and helpful!  

PageFreezer specializes in capturing changes to web pages over time and provides a user-friendly interface to view these changes, similar to the Wayback Machine. Their services are particularly useful for legal and investigative purposes.  

They offer two main products:  

1. **PageFreezer**: Focuses on tracking and visualizing changes to web pages over time.  
2. **WebPreserver**: A reliable, automated tool for preserving social media and web evidence. It’s a browser plugin that requires a subscription and allows exports in OCR PDF, MHTML, or WARC formats.  

#### Key Features:  
- **Social Media Preservation**:  
  - **Facebook**: Bulk capture capabilities, including headless crawling of all links in a timeline.  
  - **Twitter**: Comprehensive archiving of tweets and threads.  
  - **LinkedIn**: Preservation of profiles and posts.  
  - **YouTube**: Capturing video metadata and content.  

PageFreezer primarily caters to law enforcement agencies, legal firms, and investigators, making it a go-to solution for professionals who need reliable and legally admissible web and social media archiving.  
### 2.5.2 MirrorWeb

**[MirrorWeb](https://www.mirrorweb.com/)** is a prominent player in the web archiving space, focusing on large-scale website archiving rather than single-page preservation. They are trusted by prestigious organizations, including:  

- **[National Records of Scotland](https://www.mirrorweb.com/national-records-of-scotland)**  
- **[UK Parliament Web Archive](https://webarchive.parliament.uk/)**  
- **[UK National Archives Web Archive](https://www.nationalarchives.gov.uk/webarchive/)**  

MirrorWeb’s strength lies in its ability to archive entire websites comprehensively, making it an ideal solution for institutions that need to preserve large volumes of web content for historical or legal purposes.  

Their Chief Revenue Officer (CRO) is also exceptionally friendly and approachable, which adds to the overall positive experience of working with them.  

If your needs involve archiving entire websites rather than individual pages, MirrorWeb is a solid choice.  


## 2.5.3 Archive-it

[Archive-it](https://archive-it.org/) is a subscription service built by the Internet Archive (see [Wikipedia](https://en.wikipedia.org/wiki/Internet_Archive) for more details). It is designed for archiving entire websites over time, capturing their evolution and preserving historical snapshots.
  

### Other Tools

Here are a couple of additional tools worth mentioning, though they cater to more specific use cases:

- **[CivicPlus Social Media Archiving](https://www.civicplus.com/social-media-archiving/)**:  
  This tool focuses on **government social media archiving** and compliance. It’s designed to help government agencies back up and manage their social media content to meet regulatory requirements.  

- **[Smarsh](https://www.smarsh.com/solutions/business-need/archiving)**:  
  Smarsh specializes in **company communications governance and archiving**. It’s a comprehensive solution for businesses that need to archive and manage communications (e.g., emails, chats, and social media) for compliance, legal, or regulatory purposes.  

While these tools are highly specialized, they serve important roles in their respective domains—government compliance and enterprise communications governance.  



## 3. Specific Platform Archival Tools and Lower Level Libraries

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

[urlbox.com](https://urlbox.com/) is a very professional screenshotting service.


## 4. Manually Archiving

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






## 5. Appendix


## General Strategy

- Is there API access eg X/Twitter
- Always submit to the Wayback Machine (unless it is Facebook or Tiktok which never works Jan 2025)
- WACZ is always good to try and get
- For specialised sites, they probabaly don't want you to archive it, so you have to write specific tools, or find ones.

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



## 5. Appendix

[Andrew Jackson](https://anjackson.net/about/) - [Digital Preservation Coalition](https://www.dpconline.org/about/contact-us) Technical Architect.


[Archiving Social Media with Browsertrix](https://blogs.bl.uk/webarchive/2024/10/archiving-social-media-with-browsertrix.html)

**HERE**





This is an opinionated list and I wont mention the tools that are not useful for me! [awesome-web-archiving](https://github.com/iipc/awesome-web-archiving) contains more with a much broader scope.

Am not looking at [multi page web crawling]() nor [investigation/evidence management systems]() - which archiving is often a part of.

## WARC

Web ARChive files.

[https://wiki.archiveteam.org/index.php/The_WARC_Ecosystem](https://wiki.archiveteam.org/index.php/The_WARC_Ecosystem)

## WACZ

Saves everything that a pages gives back to you in a WACZ format.

Then can be viewed on [replayweb.page](https://replayweb.page/?source=https%3A//testhashing.fra1.cdn.digitaloceanspaces.com/dia018/cccbd090f5814c159b8ce767.wacz#view=pages&url=https%3A%2F%2Fx.com%2Fdave_mateer%2Fstatus%2F1524341442738638848&ts=20241219150615)


## MHTML

MIME HTML - essentially a webpage single page archive in a single file.

[https://davemateer.com/assets/Instagram.mhtml](https://davemateer.com/assets/Instagram.mhtml) shows Instagram being archived well.

## WORM

[https://en.wikipedia.org/wiki/Write_once_read_many](https://en.wikipedia.org/wiki/Write_once_read_many)


## Hashing

A hash is a unique identifier for a file. It is a single value which can be used to verify the integrity of a file. 

We use them to verify images (haven't changed) and to verify the .html page (which includes singular hashes, so is a hash of hashes) hasn't changed.

### Why Hash

Lets back up and consider why we are archiving.

(these views are by a colleague in the legal sector)

If it is for the purposes of future legal proceedings, there is an argument that private retention of data is more than sufficient.

"I feel these kinds of systems overcomplicate an already trustworthy process which is accepted by courts across the world for the safe management of digital evidence.

The courts are pragmatic, if you are happy to stand up and say that you performed this action and this time which resulted in this data being produced, the risk of a two year stretch for contempt of court is more than enough to dissuade manipulation.

Adding further complexity isn’t going to add trust but remove the ability of the investigators, jury, or judiciary to understand how these processes work and why they are performed."

### Options for Hashing

But where do you store them that is secure and we are sure that they are immutable (ie can't be changed after they are created)?

Options are:

- Blockchains
- Immutable blog services eg Twitter
- Timestamping Services
- Write Once, Read-Many (WORM) Storage
- Git with Cryptographic Signing (Internal Use)
- Secure DB with Write-Once Constraints
- Physical Print / Cold Storage

Twitter has been a good options, but is recently falling out of favour politically and with trustworthyness. Accounts can be blocked, tweets removed and thus would remove proof. (thank you to another colleague for thoughts)

### Timestamping

> This can be used to prove that a certain file existed at a certain time, useful for legal purposes, for example, to prove that a certain file was not tampered with after a certain date.

Timestamping via external timestamp authorities that obey RFC3161 eg [auto archiver implementation](https://github.com/bellingcat/auto-archiver/blob/e8138eac1c79626c4c16226dcda8eb644db119e4/src/auto_archiver/enrichers/timestamping_enricher.py#L17-L23)

> In summary, while a hash confirms that a file has not been altered, timestamping provides a trustworthy record of when the file existed. Timestamping essentially uses the hash as a foundational element but adds the crucial element of time, which is especially valuable in legal, archival, or compliance contexts.

### OpenTimestamps

[https://opentimestamps.org/](https://opentimestamps.org/) - OpenTimestamps is a protocol for timestamping files and proving their integrity over time. It puts on the hash onto a blockchain eg Bitcoin has been running for 16 years. opentimestamps for 8 years.

## Foo

[Archivists saving work from data.gov](https://news.ycombinator.com/item?id=42881367)

[https://github.com/harvard-lil/bag-nabit](https://github.com/harvard-lil/bag-nabit) stamps with cert so people can rclone


[BitIt](https://en.wikipedia.org/wiki/BagIt) protocol

[Scoop](https://github.com/harvard-lil/scoop) - output to wacz and warc



## Google Spreadsheets performance

[![alt text](/assets/2025-01-13/7.jpg "email")](/assets/2025-01-13/7.jpg) 

Google Console - graphs showing my auto-archivers polling the Google Spreadsheets. This is an amazing service where you can see I'm currently querying 2 times per second consistently with no major issues.



## Conclusion

I have a commerical business selling hosted versions of the [auto-archiver](https://github.com/bellingcat/auto-archiver). I wanted to know

- Are there any better products out there? (not that I know of!)
- Are my customers getting their money's worth? (I think so)
- Should I partner with other organisations to sell their products? (haven't found any)
- Who needs archiving help? (investigators)

Please get in touch davemateer@gmail.com if you've any comments



