---
layout: post
title: 
description: 
menu: review
categories: music 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2025-11-03/1.jpg "Picard")](/assets/2025-11-03/1.jpg) -->

[https://musicbrainz.org/](https://musicbrainz.org/)

Data open and allowed for commercial (with donations)

## Building the DB

Sample database useful 376MB
[https://data.metabrainz.org/pub/musicbrainz/data/](https://data.metabrainz.org/pub/musicbrainz/data/) - sample folder

fullexport folder has:

- mbdump.tar.bz2 - 6GB
- mbdump-derived.tar.bz2 - 454MB


[https://github.com/metabrainz/musicbrainz-server/blob/master/INSTALL.md](https://github.com/metabrainz/musicbrainz-server/blob/master/INSTALL.md)

```bash
# full db was 21.3GB uncompressed in Jan 2026
# mbdump folder should be in the root of the musicbrainz-server folder
# took 25 mins on dev.. indexes took a while.
./admin/InitDb.pl --createdb --import mbdump --echo

# materialized/denormalised tables build to improve performance
# once done the materialized tables are keep up to date with triggers
./admin/BuildMaterializedTables --database=MAINTENANCE all
```

## Counts

This was taken after a import on the full. No materialised tables eg area_containment have been generated yet.

[![alt text](/assets/2026-01-18/1.jpg "counts")](/assets/2026-01-18/1.jpg)


## Entities - mbdump core dump

Good starting point:

[https://musicbrainz.org/doc/MusicBrainz_Entity](https://musicbrainz.org/doc/MusicBrainz_Entity) - there is a video on here explaining the entities.


[https://musicbrainz.org/doc/MusicBrainz_Database/Schema](https://musicbrainz.org/doc/MusicBrainz_Database/Schema)


I'm trying to get an overview the data to see how it can help my application, and what features the data may give me.

### Artist

[https://musicbrainz.org/search?query=muse&type=artist&method=indexed](https://musicbrainz.org/search?query=muse&type=artist&method=indexed)


[https://musicbrainz.org/artist/9c9f1380-2516-4fc9-a3e6-f9f61941d090](https://musicbrainz.org/artist/9c9f1380-2516-4fc9-a3e6-f9f61941d090)


```sql
-- search is case sensitive
select * from artist a 
where name like 'Muse%'
```

- id (integer) is internal primary key used for all FK's/joins
- gui (UUID) is the public MBID which is stable 


The problem is we get a lot of Muse named bands

ChatGPT is great at feeding in results and getting understanding of a table


```sql


```

The trick is knowing when to stop ie what isn't important - for me the type of the area eg is United Kingdom a Country.. is obvious. Same for Teignmouth being a 'city'..

I have found that I still draw on paper a schema diagram:

album
releases - different editions
realease_groups - albums




MBID

Artist- eg musician, engineer, illustrator
  eg **muse

Work - https://musicbrainz.org/doc/Work
  eg a work that is written by an invididual songwriter
 eg a song

Recording - audio
 **eg Enter Sandman
 
Instruments - devices to make music

Label 

Release-group - eg logical grouping of all releases of an album (a release can belong to only 1 relase group)
  **eg Black Holes and Revelations
  release ** eg - eg a CD release in Europe
    eg digital download on itunes
  *eg Black Holes and Revelations - Japan

Area - geographic region eg cities, states, counties

Place eg Staple Sentre

Event eg where people can attend

Series - a related squece of entities
   eg a tour..


## Download DB

Need to login to 

[https://musicbrainz.org/](https://musicbrainz.org/)

[https://metabrainz.org/profile](https://metabrainz.org/profile) - then oauth to here?

### licensing
asdf

## Cover ART
https://coverartarchive.org/

Hosted on archive.org

Need to REST it?
