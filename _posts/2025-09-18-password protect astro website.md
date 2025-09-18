---
layout: post
# title: Pull Requests 
description: 
menu: review
categories: astro 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

<!-- [![alt text](/assets/2025-08-30/6.jpg "Volcano")](/assets/2025-08-30/6.jpg) -->

I was asked to help put a password on an astro website. It is for a projects page where my friend only wants people with that password to be able to see that page. He's got good reasons why

The project is built in [astro](https://astro.build/) which is

- A JavaScript framework for building fast content-driven sites
- Renders components on the server by using ahead of time time (Static Site) - mostly Astro sites on netlify use this

To have some sort of authentication which is good, ideally it is on the server, so

[Netlify](https://www.netlify.com/pricing/#pricing-table) does this but only on Pro plan which is $20pm where you can use a `_headers` file or `netlify.toml` for basic auth - which isn't a great solution.

## Netlify

I deployed my same [auth-test](https://github.com/djhmateer/auth-test) app on netlify [https://auth-test-green.netlify.app/](https://auth-test-green.netlify.app/)


[![alt text](/assets/2025-09-18/2.jpg "Netlify")](/assets/2025-09-18/2.jpg)

Just need a password for this route. Ideally want a nice modal popup

### Edge Function

- netlify/functions for Node.js serverless functions
- netlify/edge-functions for Deno runtime edge functions

```ts
// netlify/edge-functions/basic-auth.ts
export default async (req: Request, context: any) => {
  const auth = req.headers.get("authorization") || "";
  const expectedUser = Deno.env.get("BASIC_USER") || "user";
  const expectedPass = Deno.env.get("BASIC_PASS") || "pass";

  // Expect "Basic base64(user:pass)"
  const ok = (() => {
    if (!auth.startsWith("Basic ")) return false;
    const decoded = atob(auth.replace(/^Basic\s+/i, ""));
    const [u, p] = decoded.split(":");
    return u === expectedUser && p === expectedPass;
  })();

  if (!ok) {
    return new Response("Authentication required.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Restricted"' }
    });
  }

  // let the request pass through to static files
  return context.next();
};
```

then in `netlify.toml`

```yaml
[[edge_functions]]
path = "/projects/*"
function = "basic-auth"
```

[![alt text](/assets/2025-09-18/5.jpg "Wire up env")](/assets/2025-09-18/5.jpg)

Wiring up environmental variables


[![alt text](/assets/2025-09-18/4.jpg "Basic HTTP Auth")](/assets/2025-09-18/4.jpg)

Basic HTTP Auth

[![alt text](/assets/2025-09-18/3.jpg "Header")](/assets/2025-09-18/3.jpg)

Notice the base64 encoded header is `ZGF2ZTox` which is [https://www.base64decode.org/](https://www.base64decode.org/) `dave:1` which was the username and password combo

to forget this cached HTTP Basic Auth header in Chrome (it isn't a cookie), just restart chrome, or go ingognito

## Modal popup (or a form)

So next up is to figure out how to do a form post with a password that authenticates.



## Appendix

### Cloudflare Pages

[https://auth-test-7eo.pages.dev/projects/](https://auth-test-7eo.pages.dev/projects/)

Careful not to hit the specific deployed version eg [https://b3f0283e.auth-test-7eo.pages.dev/projects/](https://b3f0283e.auth-test-7eo.pages.dev/projects/) which doesn't hit the auth rule.

[![alt text](/assets/2025-09-18/1.jpg "Zero Trust")](/assets/2025-09-18/1.jpg)

It looks like Zero Trust would do it, but heavyweight