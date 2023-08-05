---
layout: post
title: Adobe Premiere Pro Beginners Guide 
description: 
menu: review
categories: mac
published: true 
comments: false     
sitemap: true
image: /assets/2023-07-22/1.jpg
---

<!-- [![alt text](/assets/2023-07-22/1.jpg "email"){:width="800px"}](/assets/2023-07-22/1.jpg) -->

I was exploring iMovie which was good, but ultimately my apple hardware was too old and frustrating to simple editing on ie chop up clips quickly, which is a super important part of getting good at making movies.

So lets move fast and onto Premiere Pro on new PC hardware.

## Install Proces and Cost

There is a 7 day free trial of Adobe Premiere Pro. £19.97/mo (annual but paid montly), £30.34/mo cancel anytime.

Adobe Genuine Service (AGS) - didn't need to install

Creative Cloud Desktop, which installs Premiere Pro.

took about 15mins. Tutorial didn't start and seemed to hang (worked after a restart of the program). I couldn't figure out the `next` button, so went straight to [youtube](https://www.youtube.com/watch?v=keoszhf4DZ8&t=13s) for guidance on how to use it.

## Nomenclature

- Project Panel - import and organise media
- Source Monitor - review footage
- Timeline - arrange clips into a sequence
- Program monitor - preview

## Create New Project

`c:\premiere` is where I keep my projects

Create Bins

- Broll - shots
- Audio

He did others like:

- Drone shots
- VFX - overlays?

## GoPro footage

`c:\gopro\camping`

- THM file - thumbnail
- LRV file - low resolution video

I like to have correct dates modified when copying to filesystem from my gopro sd card. 

```
robocopy H:\DCIM\100GOPRO c:\gopro /COPY:DT /DCOPY:T
```

But ultimately I used the sequential filenames to get datetime order of footage.

## Create new Sequence

Basically I put anything in here, and let Premiere adjust the sequence to my gopro footage when I add a clip.

Be careful to add in a 5312 * 2988 at 29.97 fps clip first (otherwise you'll have to select all clips, then clip menu, video, scale to frame size)

My [GoPro 11 Black](https://gopro.com/en/gb/shop/cameras/hero11-black/CHDHX-111-master.html) is shooting at:

- 5312 * 2988 (5.3k) at 29.97fps and 59.94fps - 16:9 aspect ratio
- 2704 * 1520 - slomo eg 239.76 fps- 16:9 aspect ratio

common resolutions eg youtube are:

- 2160p - 3860 * 2160 (16:9) which is 4K Ultra HD (UHD)
- 1440p - 2560 * 1440 (16:9)
- 1080p - 1920 * 1080 (16:9)
- 720p - 1280 * 720
- 480p - 854 * 480

YT recommends to upload at the same fps as the camera shooting it - common framerates are 24, 25, 30, 48, 50, 60




## 4. Workspace

Different preset layouts depending on what tasks you're doing

- Editing (main one)


## 5. Importing

- drag it onto timeline
- double click and view in source monitor, use in and out points to grab sections

## 6. Editing keyboard

**try i and o in the source monitor** - to get the rough cut edits

- i - in point
- o - out point

check snap is on (magnet icon in timeline)

use shorten clip rather than cut (razor)


- up down arrow - next section
- mouse wheen - left and right
- alt mouse wheel - zoom

- j and l - fast forward
 
- - and + - zoom in 
- Ctrl + - zoom in 
- Alt and mouse wheen to zoom in an dout

- Ctrl + Shift + Y - redo

### Tools

v - selection tool
c - razor tool
n - rolling edit  (to get cut point to suit actions better)
y - slip tool (change in and out points without changing time)
z - zoom (or alt click to zoom out)

shift delete - delete get rid of space (ripple delete) 

   
## Speed up and slow down clips

right click, speed duration

## transitions

Effects tab in bottom left window or use the Workspace / effets

`Video Transitions / cross dissolve` is nice

zoom in to make shoter by dragging

`cross dissolve` from black at the beginning

`constant power` audio fade in at beginning

### video effects

gaussian blur - to highlight the people for example using a mask

digital zoom - effect control / motion / scale click stopwatch icon at start of clip, then move playhead to end, and do 130% scale [youtube](https://www.youtube.com/watch?v=WfD_xY-YjL8)


## captions and graphics

Workspace / Captions and Graphics

- T - Type tool

highlight the text to make changes to it

## audio

drag it on!
adjust levels

[youtube](https://www.youtube.com/watch?v=WfD_xY-YjL8)

- parametric EQ to enhance vocals
- compressor on vox

then eq on music to take down 1khz vocal range
also compressor on music

## sequence layer for colouring

create new sequence layer

LUT - look up tables

SL IRON LDR is cool

- shift e -  enable / disable layer

## exporting 

- i - set in point at beginning
- o - set out point at end

To clear, right click to clear in and out points

click to export.

upload to youtube and [this](https://www.youtube.com/watch?v=rnFwFq63BrU) is my test video

<!-- [![alt text](/assets/2023-08-01/1.jpg "email"){:width="800px"}](/assets/2023-08-01/1.jpg) -->
[![alt text](/assets/2023-08-01/1.jpg "email")](/assets/2023-08-01/1.jpg)

Interestingly our track from our band got caught in the copyright filter!

[![alt text](/assets/2023-08-01/2.jpg "email")](/assets/2023-08-01/2.jpg)

Aspect ratio is fine at 16:9 (same aspect ratio at 1920*1080), 4k quality ie 3840x2160 ie 2160p. The original footage is mostly on 5312 * 2988 (5.3k)



