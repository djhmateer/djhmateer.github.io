---
layout: post
# title: Python - Bellingcat auto-archiver
# description: Download vs View a PDF or Image from .NET6 Razor Pages with source code
menu: review
categories: Legal
published: true 
comments: false     
sitemap: true
image: /assets/2022-03-10/view.jpg 
---
<!-- [![alt text](/assets/2022-03-09/vsc.jpg "desktop"){:width="500px"}](/assets/2022-03-09/vsc.jpg) -->
<!-- [![alt text](/assets/2022-03-10/down.jpg "desktop")](/assets/2022-03-10/down.jpg) -->


In this article I'm going to discuss the technical problems of getting public information from a website ie not from API

My specific use case is I do work with a Human Rights Organisation who document human rights issues. Often there are social media images/video which can be used as future evidence.

Depending on the region eg Ukraine, Myanmar there are more popular networks. I'm more focussed on Myanmar so in order of importance:

1. Twitter
2. Facebook
3. Telegram
4. YouTube

Investigators find the social media articles then have to:

- Create a new row in a Google Sheet
- Enter the URL into Link Column in spreadsheet
- Manually download the image or video from the social media site
- Create a new folder in Google Drive with a Case Number
- Copy downloaded media to Google Drive
- Make a hash of the image using [this](https://emn178.github.io/online-tools/sha3_512_checksum.html) to prove it hasn't been altered after that date
- Tweet the hash (treating Twitter like Blockchain as it should never disappear)

Then later on there are checks where the hash is duplicated etc

With some automation after manually 

- Creating a new row and entering the case number 
- Enter URL into a special link columnb 

The automation does:

- Script reads url from sheet
- Downloads the image(s) or video(s) from website eg facebook
- Creates a new folder in Google Drive (todo)
- Saves original media to cloud storage in case number folder (todo)
- Enters archive location URL of google cloud file in spreadsheet 
- Takes a screenshot of the social media site
- Creates thumbnails of videos
- Puts in duration in seconds of video

Technologies used in the [auto-archiver](https://github.com/bellingcat/auto-archiver) from Bellingcat are:

- Google Drive and Docs API to read/write to the DB
- Python 3.9 app running on a server on a cron job every minute to check for new rows (arhive column is blank)
- [https://github.com/JustAnotherArchivist/snscrape](https://github.com/JustAnotherArchivist/snscrape) 1.1k stars - twitter
- FFmpeg for creating thumbnails and yt-dlp
- Firefox and [Geckodriver](https://github.com/mozilla/geckodriver) for screenshots 5.8k stars
- Digital Ocean Spaces - S3 compatible storage

[Bellingcat auto-archiver](/2022/03/16/python-bellingcat-auto-archiver) write up


## Alternatives to auto-archiver (open source)

TL;DR - I've not found automation which does this well.

Lets look in GitHub for the most starred projects for Twitter


[https://github.com/twintproject/twint](https://github.com/twintproject/twint) 12.8k stars. More about scraping large amounts on content. eg scrape all Tweets of a User.

[Hitomi-Downloader](https://github.com/KurtBestor/Hitomi-Downloader/releases/tag/v3.7i) - couldn't get image unless cookie was there.

[https://github.com/kevinzg/facebook-scraper](https://github.com/kevinzg/facebook-scraper)

## Alternatives to auto-archiver (commercial)

As we just want to request a single page from a social media platform, this is not what most commercial scrapers do.

They generally

- Use proxy's to avoid being banned (we don't care as very few requests)
- Do screenshots (which we can do with selenium style)
- Send back raw html (which we'd have to parse)

[https://apify.com/](https://apify.com/) who have a [Twitter Scraper](https://apify.com/vdrmota/twitter-scraper) and a [Facebook Pages Scraper]() which is under maintenance - 626k runs.
 - hmm couldn't get it running.

[https://www.scrapingbee.com/#faq](https://www.scrapingbee.com/#faq)


[https://phantombuster.com/](https://phantombuster.com/)


[https://brightdata.com/legality-of-web-data-collection](https://brightdata.com/legality-of-web-data-collection)


[https://proxycrawl.com/how-to-scrape-facebook](https://proxycrawl.com/how-to-scrape-facebook)


# Commerical Scrapers doing good

[https://apify.com/web-scraping#benefit-humanity](https://apify.com/web-scraping#benefit-humanity)

[https://brightinitiative.com/](https://brightinitiative.com/)


## Archivers

[https://mnemonic.org/en/about/methods](https://mnemonic.org/en/about/methods) - they may do things manually


## Legal

Please see [previous article on legalities of scraping public information]() - it is legal
