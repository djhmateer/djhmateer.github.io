---
layout: post
title: 
description: 
menu: review
categories: phone 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2026-05-20/1.jpg "ii")](/assets/2026-05-20/1.jpg) -->

```bash
sudo apt install ncdu

ncdu /

# or just use du
# don't cross filesystems onto shares
du -ahx / 2>/dev/null | sort -rh > disk-usage.txt

# 100 largest entries

sudo du -ahx / 2>/dev/null | sort -rh | head -100 > disk-usage.txt


# I had 2 pg running
sudo pg_lsclusters
Ver Cluster Port Status Owner    Data directory              Log file
16  main    5433 down   postgres /var/lib/postgresql/16/main /var/log/postgresql/postgresql-16-main.log
18  main    5432 online postgres /var/lib/postgresql/18/main /var/log/postgresql/postgresql-18-main.log
```

## Caching
