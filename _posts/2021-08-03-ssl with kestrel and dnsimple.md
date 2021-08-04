---
layout: post
# title: 
description:
menu: review
categories: Dates 
published: true 
comments: false     
sitemap: false
image: /assets/2021-07-26/save.jpg
---

<!-- [![alt text](/assets/2021-07-26/save.jpg "Turn auto build on save off")](/assets/2021-07-26/save.jpg) -->

I have a domain [https://osr4rightstools.org](https://osr4rightstools.org) which I need an SSL cert on

Tl;DR - Using Cloudflare for automatic SSL cert generation, and 301 Permanent DNS Redirects from www to apex (non-www).

I'm using [https://dnsimple.com/](https://dnsimple.com/) as a domain registrar.


## Cloudflare

I need to delegate my domain's Cloudflare we need to change nameservers away from DNSimple to Cloudflare.

I only need 1 record:

CNAME	pm-bounces.osr4rightstools.org	pm.mtasv.net

which is for PostMark email. There is a domain key record

Delete Name

```bash
# delete nameservers
ns1.dnsimple.com
ns2.dnsimple.com
ns3.dnsimple.com
ns4.dnsimple.com

# add nameservers
jean.ns.cloudflare.com
lars.ns.cloudflare.com

```

Auto HTTPS Rewrites? - no
  to stop mixed content?
  I want to handle this manually in the site - should never be mixed content

Always Use HTTPS - yes
  Redirect all http to https

Auto minify - no


Brotli compression - no

Then we need to patch in again:

CNAME www osr4rightstools732.westeurope.cloudapp.azure.com
CNAME @ osr4rightstools732.westeurope.cloudapp.azure.com

Interestingly cloudflare use CNAME flattening (RFC 1034) which [https://serverfault.com/a/613830/10392](https://serverfault.com/a/613830/10392) is not regarded highly.

The TTL on Cloudflare free is auto, so it can take a while to propagate


## Get all traffic to resolve to apex rather than www

DNSimple has a URL feature that would do this, but you need to pay for HTTPS redirection, so we can handle it on the server instead.

Can Kestrel redirect all to apex?

Usually I do it with [nginx](https://stackoverflow.com/questions/7947030/nginx-no-www-to-www-and-www-to-no-www) or with [Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200172286-Configuring-URL-forwarding-or-redirects-with-Cloudflare-Page-Rules)

[![alt text](/assets/2021-08-04/apex.jpg "Redirect")](/assets/2021-08-04/apex.jpg)

So this sends a 301 Permanent Redirect (as opposed to a 302 Temporary Redirect)

```bash
# returns a 200
curl -I https://osr4rightstools.org

# 301 permanent redirect to https://osrrightstools.org
curl -I http://osr4rightstools.org

# 301 permanent redirect to https://osr4rightstools.org
curl -I https://www.osr4rightstools.org

#4 301 to https://osr4rightstools.org
curl -I http://www.osr4rightstools.org

# 301 redirect to https://osr4rightstools.org/privacy
curl -I https://www.osr4rightstools.org/privacy
```

# Cache Level: Bypass

[![alt text](/assets/2021-08-04/cache.jpg "Cache")](/assets/2021-08-04/cache.jpg)

I don't want Cloudflare to cache anything.


## Other

For cloudflare I use a CNAME

CNAME osr4rights.org to osr4rightstools732.westeurope.cloudapp.azure.com


For VM on Azure I use

ALIAS brokenlinkchecker.org blchecker218.westeurope.cloudapp.azure.com

Hoverfly lagoons are pointing to cloudflare nameservers.


setup an ALIAS?

## ALIAS for Apex (direct to VM)

[https://support.dnsimple.com/articles/differences-between-a-cname-alias-url/?utm_source=dnsimple.com&utm_medium=referral&utm_campaign=formhelp](https://support.dnsimple.com/articles/differences-between-a-cname-alias-url/?utm_source=dnsimple.com&utm_medium=referral&utm_campaign=formhelp)

> Use an ALIAS record if you’re trying to alias the root domain (apex zone), or if you need other records for the same name.

ALIAS	osr4rightstools.org	osr4rightstools732.westeurope.cloudapp.azure.com

## CNAME for www (direct to VM)

> Use a CNAME record if you want to alias one name to another name, and you don’t need other records (such as MX records for emails) for the same name.


This is fine as we want MX email to go to test@osr4rightstools.org not test@www.osr4rightsrools.org

## Https cert

We could get a cert from LetsEncrypt through DNSimple. However then I would have to manually install the cert every 3 months on the Kestrel webserver.

Lets go with Cloudflare


