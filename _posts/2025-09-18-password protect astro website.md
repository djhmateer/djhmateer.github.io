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

## JWT Strategy with a Form

Essentially using a cookie, just like http session cookies.

Lets explore a friends working project to see 

- how it works
- check the AI implementation!


```bash
# node 22.19.0 - on 19th Sept 25. 
# I use nvm and this is up to date
node -v

# 11.6.0 on 19th Sept 25
npm install -g npm

npm outdated

npm update

# npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
npm install

# localhost:4321
npm run dev
```

copy .env.example to .env

```bash
# .env
# Set a secure password for accessing protected routes
AUTH_PASSWORD=letmein

# JWT Secret Key - Use a long, random string in production
# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=xxxxxxxxxxxxx

# Environment
NODE_ENV=production
```

in packages.json

@astrojs/netlify - enabling sessions with Netlify Blobs

vite - Linking this project to a Netlify site lets you deploy your site, use any environment variables defined on your team and site and much more. Run npx netlify init to get started.


[![alt text](/assets/2025-09-18/6.jpg "Env variables")](/assets/2025-09-18/6.jpg)

Site is live on Netlify.

[https://test-auth-astro.netlify.app/](https://test-auth-astro.netlify.app/)


[![alt text](/assets/2025-09-18/7.jpg "It didn't work")](/assets/2025-09-18/7.jpg)

Needed to redeploy for it to pickup the new env variables.

### Development

Can't get it working in dev properly

## HTML

Lets take out astro from the equation, and start from the beginning to see how this is all put together.


project is: auth-test-html-jwt

netlify - done. [https://effortless-zabaione-6d6056.netlify.app/](https://effortless-zabaione-6d6056.netlify.app/)

`I'd like to add a simple password to the projects directory. I'm hosting this project on the free tier of netlify. please use a JWT approach. give me options before you do anything`

  Option 1: Client-Side JWT with Static Secret

  - Simple login form that validates against a hardcoded password
  - Generates JWT client-side and stores in localStorage
  - Protected pages check for valid JWT before rendering content
  - Pros: Simple, works on static hosting
  - Cons: Password visible in source code, not truly secure

  Option 2: Netlify Functions + JWT

  - Use Netlify serverless functions for password validation
  - Function generates JWT on successful auth
  - Client stores JWT and validates on protected pages
  - Pros: Password not exposed in client code
  - Cons: Requires Netlify Functions (available on free tier)

  Option 3: Third-Party Auth Service

  - Integrate with service like Auth0, Firebase Auth, or Supabase
  - JWT handled by the service
  - Pros: Most secure, professional approach
  - Cons: More complex setup, external dependencies

  Option 4: Simple Hash-Based Auth

  - Store password hash in client code
  - Validate password client-side, generate JWT
  - Pros: Password not in plaintext
  - Cons: Still client-side validation, hash can be reverse-engineered


## Option 1 - JWT in Local Storage

[![alt text](/assets/2025-09-18/9.jpg "Auth token")](/assets/2025-09-18/9.jpg)

JWT token stored in local storage on browser

[https://github.com/djhmateer/auth-test-html-jwt/releases/tag/v1.0-option1](https://github.com/djhmateer/auth-test-html-jwt/releases/tag/v1.0-option1)

Lets try this for fun and see how insecure it is!

  - Visit /login.html and enter password "1"
  - JWT token is generated and stored in localStorage (1 hour expiration)
  - /projects/ directory is protected - redirects to login if not authenticated
  - Home page shows current authentication status
  - Logout functionality clears the token

  The system uses client-side JWT with a simple signature scheme. The password is hardcoded as "1" and the projects directory will automatically redirect unauthenticated users to the login page.

However

  - If the browser doesn't have javascript enabled I can see the projects secrets directory?  F12, Ctrl Shift P, Disable Javascript

  - There was a flash of the page before the JS kicked in the login page 

[![alt text](/assets/2025-09-18/8.jpg "Auth token")](/assets/2025-09-18/8.jpg)

Auth token

Behind the scenes it used [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) which is written by Auth0 [https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) but hasn't been updated for a while. Looks reasonable.

AI hadn't put the package in my local repo and had pinned it to latest version (number).. not great.


## Option 2 - JWT with Netlify Functions as an HTTP Cookie

Using server side validaton, so when JavaScript is turned off we are still not able to see the secret pages.

AI suggested a very old version of netlify-cli which I need for local testing only. So lets not include. 23.6.0 as of 22nd Sept 25.

[https://effortless-zabaione-6d6056.netlify.app/](https://effortless-zabaione-6d6056.netlify.app/)

AI suggested that the functions return html

So /login.html POSTS to `/.netlify/function/login` which handles password validation and JWT generation using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken). 

First iteration on AI, it works, but there is html being sent back from the function.

[![alt text](/assets/2025-09-18/10.jpg "Auth token")](/assets/2025-09-18/10.jpg)

[https://www.jwt.io/](https://www.jwt.io/) - useful for decoding the token, especially seeing the expiry date.


However to get this to work cleanly I'm having to serve html directly from a function.

Because this is serverless, we need a jwt. If we had asp.net or something with a persistent sesssion (which may need a db to store it). Essentially we're creating the same thing.

## Option 3 - Middleware

Lets use Edge Functions in netlify which will give similar functionality.

**HERE**

## Foo

I wonder if there is a simpler way to do a simple password on netflify. ie using standard http sessions cookies as jwt has a lot of unecessary features and complexity.


## Appendix

### Cloudflare Pages

[https://auth-test-7eo.pages.dev/projects/](https://auth-test-7eo.pages.dev/projects/)

Careful not to hit the specific deployed version eg [https://b3f0283e.auth-test-7eo.pages.dev/projects/](https://b3f0283e.auth-test-7eo.pages.dev/projects/) which doesn't hit the auth rule.

[![alt text](/assets/2025-09-18/1.jpg "Zero Trust")](/assets/2025-09-18/1.jpg)

It looks like Zero Trust would do it, but heavyweight