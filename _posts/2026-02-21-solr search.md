---
layout: post
title: 
description: 
menu: review
categories: solr 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2025-11-03/1.jpg "Picard")](/assets/2025-11-03/1.jpg) -->

I'm using Solr (based on Lucene) as a fast search for my music site.

[https://musicbrainz.org/](https://musicbrainz.org/) use the same fast search, and their code is open source. I've 

[https://github.com/metabrainz/musicbrainz-server](https://github.com/metabrainz/musicbrainz-server) mb-server

[https://solr.apache.org/guide/solr/latest/deployment-guide/installing-solr.html](https://solr.apache.org/guide/solr/latest/deployment-guide/installing-solr.html)

## Installing

see secrets/create_webserver_cs.sh in xmusic project

## Performance

I had a very expensive query which under load brought solr down causing an OOM (Out of Memory) crash

log files were in `/home/dave/solr-9.10.1/server/logs` and especially look for jvm_crash files

I made the heap bigger, but the query was the main issue

```bash
/home/dave/solr-9.10.1/bin solr stop --all

bin/solr start --user-managed
```

## solr optimisation
Add to /etc/security/limits.conf:                                                                                                                                                                                       
dave soft nofile 65000                                    
dave hard nofile 65000


## Heap

On my production machine with a lot of headroom

```bash
SOLR_HOME/bin/solr.in.sh 

# start at 512MB then can grow to 4GB on demand
SOLR_JAVA_MEM="-Xms512m -Xmx4G"
```

./solr-perf-test.py
=== Solr stress test: 8 workers, 90s, 16 query patterns (tracks + artists) ===

  t=  5s  queries=  5390  qps=  1078  errors=0  slow(>1s)=0  heap=1.1 GB (%17.7)/6 GB  ok
  t= 10s  queries= 24397  qps=  2440  errors=0  slow(>1s)=0  heap=1.6 GB (%26.8)/6 GB  ok
  t= 15s  queries= 41616  qps=  2774  errors=0  slow(>1s)=0  heap=3.3 GB (%54.2)/6 GB  ok
  t= 20s  queries= 60895  qps=  3045  errors=0  slow(>1s)=0  heap=1.5 GB (%25.4)/6 GB  ok
  t= 25s  queries= 80957  qps=  3238  errors=0  slow(>1s)=0  heap=3.4 GB (%57.3)/6 GB  ok
  t= 30s  queries=100911  qps=  3364  errors=0  slow(>1s)=0  heap=1.8 GB (%29.5)/6 GB  ok
  t= 35s  queries=121050  qps=  3459  errors=0  slow(>1s)=0  heap=3.7 GB (%61.5)/6 GB  ok
  t= 40s  queries=141177  qps=  3529  errors=0  slow(>1s)=0  heap=2 GB (%34.1)/6 GB  ok
  t= 45s  queries=161421  qps=  3587  errors=0  slow(>1s)=0  heap=412.6 MB (%6.7)/6 GB  ok
  t= 50s  queries=181309  qps=  3626  errors=0  slow(>1s)=0  heap=2.3 GB (%38.2)/6 GB  ok
  t= 55s  queries=201526  qps=  3664  errors=0  slow(>1s)=0  heap=672.5 MB (%10.9)/6 GB  ok
  t= 60s  queries=221259  qps=  3688  errors=0  slow(>1s)=0  heap=2.5 GB (%42.2)/6 GB  ok
  t= 65s  queries=241222  qps=  3711  errors=0  slow(>1s)=0  heap=883.9 MB (%14.4)/6 GB  ok
  t= 70s  queries=261207  qps=  3732  errors=0  slow(>1s)=0  heap=2.8 GB (%46.2)/6 GB  ok
  t= 75s  queries=281219  qps=  3750  errors=0  slow(>1s)=0  heap=1.1 GB (%18.5)/6 GB  ok
  t= 80s  queries=301200  qps=  3765  errors=0  slow(>1s)=0  heap=3 GB (%50.3)/6 GB  ok
  t= 85s  queries=321521  qps=  3783  errors=0  slow(>1s)=0  heap=1.4 GB (%23)/6 GB  ok
  t= 90s  queries=341509  qps=  3795  errors=0  slow(>1s)=0  heap=3.3 GB (%54.8)/6 GB  ok

=== Final stats ===
  Total queries : 341522
  Errors        : 0
  Slow (>1s)    : 0
  Final heap    : 3.3 GB (%54.8) / 6 GB
  Solr alive    : YES


  Then after the query fix:

  ./z-solr-perf.sh
=== Solr stress test: 8 workers, 90s, 16 query patterns (tracks + artists) ===

  t=  5s  queries= 10954  qps=  2191  errors=0  slow(>1s)=0  heap=718.4 MB (%11.7)/6 GB  ok
  t= 10s  queries= 31315  qps=  3132  errors=0  slow(>1s)=0  heap=2.6 GB (%44)/6 GB  ok
  t= 15s  queries= 51243  qps=  3416  errors=0  slow(>1s)=0  heap=996.5 MB (%16.2)/6 GB  ok
  t= 20s  queries= 71726  qps=  3586  errors=0  slow(>1s)=0  heap=2.9 GB (%48.7)/6 GB  ok
  t= 25s  queries= 91345  qps=  3654  errors=0  slow(>1s)=0  heap=1.2 GB (%20.3)/6 GB  ok
  t= 30s  queries=111561  qps=  3719  errors=0  slow(>1s)=0  heap=3.1 GB (%52.4)/6 GB  ok
  t= 35s  queries=131550  qps=  3759  errors=0  slow(>1s)=0  heap=1.5 GB (%24.6)/6 GB  ok
  t= 40s  queries=151646  qps=  3791  errors=0  slow(>1s)=0  heap=3.4 GB (%56.5)/6 GB  ok
  t= 45s  queries=171696  qps=  3815  errors=0  slow(>1s)=0  heap=1.7 GB (%28.8)/6 GB  ok
  t= 50s  queries=192012  qps=  3840  errors=0  slow(>1s)=0  heap=94.4 MB (%1.5)/6 GB  ok
  t= 55s  queries=212215  qps=  3858  errors=0  slow(>1s)=0  heap=2 GB (%33.5)/6 GB  ok
  t= 60s  queries=232435  qps=  3874  errors=0  slow(>1s)=0  heap=370.7 MB (%6)/6 GB  ok
  t= 65s  queries=252597  qps=  3886  errors=0  slow(>1s)=0  heap=2.3 GB (%37.9)/6 GB  ok
  t= 70s  queries=272968  qps=  3900  errors=0  slow(>1s)=0  heap=660.4 MB (%10.7)/6 GB  ok
  t= 75s  queries=292884  qps=  3905  errors=0  slow(>1s)=0  heap=2.5 GB (%42.3)/6 GB  ok
  t= 80s  queries=313136  qps=  3914  errors=0  slow(>1s)=0  heap=914.2 MB (%14.9)/6 GB  ok
  t= 85s  queries=332784  qps=  3915  errors=0  slow(>1s)=0  heap=2.8 GB (%46)/6 GB  ok
  t= 90s  queries=352745  qps=  3919  errors=0  slow(>1s)=0  heap=1.1 GB (%18.1)/6 GB  ok

=== Final stats ===
  Total queries : 352762
  Errors        : 0
  Slow (>1s)    : 0
  Final heap    : 1.1 GB (%18.1) / 6 GB
  Solr alive    : YES


## Dev
after query fix:

./z-solr-perf.sh
=== Solr stress test: 8 workers, 90s, 16 query patterns (tracks + artists) ===

  t=  5s  queries= 11699  qps=  2340  errors=0  slow(>1s)=0  heap=649.9 MB (%31.7)/2 GB  ok
  t= 10s  queries= 24260  qps=  2426  errors=0  slow(>1s)=0  heap=664.1 MB (%32.4)/2 GB  ok
  t= 15s  queries= 36654  qps=  2444  errors=0  slow(>1s)=0  heap=662.3 MB (%32.3)/2 GB  ok
  t= 20s  queries= 49047  qps=  2452  errors=0  slow(>1s)=0  heap=659.4 MB (%32.2)/2 GB  ok
  t= 25s  queries= 61239  qps=  2450  errors=0  slow(>1s)=0  heap=638.5 MB (%31.2)/2 GB  ok
  t= 27s  queries= 73609  qps=  2726  errors=0  slow(>1s)=0  heap=633.6 MB (%30.9)/2 GB  ok
  t= 32s  queries= 86225  qps=  2695  errors=0  slow(>1s)=0  heap=654.2 MB (%31.9)/2 GB  ok
  t= 37s  queries= 98792  qps=  2670  errors=0  slow(>1s)=0  heap=667.6 MB (%32.6)/2 GB  ok
  t= 42s  queries=111098  qps=  2645  errors=0  slow(>1s)=0  heap=658.1 MB (%32.1)/2 GB  ok
  t= 47s  queries=123182  qps=  2621  errors=0  slow(>1s)=0  heap=623.6 MB (%30.4)/2 GB  ok
  t= 52s  queries=135501  qps=  2606  errors=0  slow(>1s)=0  heap=614.7 MB (%30)/2 GB  ok
  t= 54s  queries=147765  qps=  2736  errors=0  slow(>1s)=0  heap=599.7 MB (%29.3)/2 GB  ok
  t= 59s  queries=160015  qps=  2712  errors=0  slow(>1s)=0  heap=585.2 MB (%28.6)/2 GB  ok
  t= 64s  queries=171363  qps=  2678  errors=0  slow(>1s)=0  heap=480.8 MB (%23.5)/2 GB  ok
  t= 69s  queries=183145  qps=  2654  errors=0  slow(>1s)=0  heap=417.1 MB (%20.4)/2 GB  ok
  t= 74s  queries=195558  qps=  2643  errors=0  slow(>1s)=0  heap=417.1 MB (%20.4)/2 GB  ok
  t= 79s  queries=207838  qps=  2631  errors=0  slow(>1s)=0  heap=400.1 MB (%19.5)/2 GB  ok
  t= 82s  queries=219690  qps=  2679  errors=0  slow(>1s)=0  heap=341.4 MB (%16.7)/2 GB  ok

=== Final stats ===
  Total queries : 219702
  Errors        : 0
  Slow (>1s)    : 0
  Final heap    : 344.7 MB (%16.8) / 2 GB
  Solr alive    : YE


heap is great
less qps than prod, but super fast on the front end.

## tmux

The loader process takes time (maybe 1.5 hours on prod...25mins on dev), so to help debug, I need to see where the sessions have got to if they timeout.

```bash
alias t="tmux new -A -s main"
```


 
