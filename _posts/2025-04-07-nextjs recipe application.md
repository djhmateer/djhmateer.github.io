---
layout: post
title: Next.js Recipe Application
description:
menu: review
categories: nextjs
published: true
comments: false
sitemap: false
image: /assets/2024-11-12/1.jpg
---

<!-- [![alt text](/assets/2025-04-03/1.jpg "email"){:width="700px"}](/assets/2025-04-03/1.jpg)  -->
<!-- [![alt text](/assets/2025-04-03/1.jpg "email")](/assets/2025-04-03/1.jpg) -->

## Background

I'm working with a client who has a business application close to v1 release using this stack:

- pnpm
- Next.js (although we may be changing as have long compile times.. and don't use Next much.. what?)
- ShadCN UI
- Zod
- Drizzle
- tRPC
- Vercel for hosting
- Supabase for Postgres and Auth (including SSO)

It has been an impressive development effort by a talented single young developer in the company (of around 150 people).

As the application is at the core of what the company does, the risk of all the knowledge being with a single developer is large.

I've been brought in to

- Get the project released ie v1 - essentially get the developer focussed on the remaining large features to do
- Make sure the app is secure, does what the business needs to etc..
- Write documentation so that the I / others can support it and develop on it

To be able to accomplish the above a properly understand the stack, I always like to have side projects to test what is happening. This is one of these projects.

It is also a lot of fun to explore new technology (and the reason I'm in this job!)

This starts off the same as the [Traversy]() course as it is good for pnpm, next.js, shadcn, zod

## Next.js

[en.wikipedia.org/wiki/Next.js](https://en.wikipedia.org/wiki/Next.js) is a React framework which enables extra features including Server Side Rendering. [github.com/vercel/next.js](https://github.com/vercel/next.js) 131k stars on GH. It is a solid framework used by many of the worlds largest companies.

[react.dev](https://react.dev/) recommends a full stack framework like Next.js or Remix to do routing and data fetching.

### Problems and Alternatives

Compilation times in Next are slow, issues with the App router, random compilation bugs, and some state management weirdness

[tanstack.com/start/latest](https://tanstack.com/start/latest) - very new (still in Beta). 10k downloads per month on [npm](https://www.npmjs.com/package/@tanstack/start)

[github.com/remix-run/react-router](https://github.com/remix-run/react-router) - 54k stars on GH. No server side rendering?

## Hello world

simple react snippets -sfc. Stateless Function arrow Component

`/code/premium-docs`

`/code/cooking`

See [blog here](/2025/03/05/nextjs) to get latest version of node via nvm

I prefer [pnpm](https://pnpm.io/pnpm-vs-npm)

```bash
# Next 15.2.4 as of 7th Apr 25
npx create-next-app@latest
# prostore
# typescript (yes - default)
# eslint (yes)
# tailwind (yes - default)
# src directory (no - default)
# App Router (yes - default)
# Turbopack for next dev (no)
# Customize aliases (no - default)

# These are my default - same as above just using pnpm
pnpx create-next-app@latest cooking --ts --eslint --tailwind --no-src-dir --app --no-turbopack --no-import-alias --use-pnpm

cd cooking
# approve the build step for the warning I got
# node_modules/.pnpm/sharp@0.33.5/node_modules/sharp: Running install script, done in 949ms
pnpm approve-builds

# short for run dev
pnpm dev
```

and first page

```tsx
// app/page.tsx
// sfc - Stateless Function Component
const Homepage = () => {
  return <>Cooking</>;
};

export default Homepage;
```

Traversy does some CSS bits (Tailwind 4)

## ShadCN UI

Lets use [ui.shadcn.com](https://ui.shadcn.com/) components to help speed up the build process

[Installation](https://ui.shadcn.com/docs/installation/next)

```bash
# slate as base colour
pnpm dlx shadcn@latest init

# add a button
pnpm dlx shadcn@latest add button
```

then to see the component

```tsx
import { Button } from "@/components/ui/button";

const Homepage = () => {
  // return <>Cooking</>;
  return <Button>Click me</Button>;
};

export default Homepage;
```

## Layout Groups

Just a grouping of pages ie for admin or normal layouts

`app/(root)/layout.tsx`

I don't link this (root) name as it is confusing to the Main `app/layout.tsx` layout.

(authorised) is a good name.

## Constants

I'm not doing these for now

## Header and Footer

`components/shared/header/index.tsx` - would be simpler to drop the shared, and rename to header.tsx.. easier to find the file as well. Am now using `components/header.tsx`. Shared did represent components which contained components, but I prefer simplicity.

Using icons from [lucide.dev/guide/packages/lucide-react](https://lucide.dev/guide/packages/lucide-react)

```bash
pnpm install lucide-react
```

<!-- [![alt text](/assets/2025-04-07/1.jpg "email"){:width="700px"}](/assets/2025-04-07/1.jpg)  -->

[![alt text](/assets/2025-04-07/1.jpg "email")](/assets/2025-04-07/1.jpg)

Using tailwind and flexbox for responsive UI.

[![alt text](/assets/2025-04-07/2.jpg "email")](/assets/2025-04-07/2.jpg)

Smaller screens don't show the text title

Footer is a simple component in `components/footer.tsx` which is linked to in the `app/(root)/layout.tsx`

## Dropdown menu

```bash
# adds in components/ui/dropdown-menu.tsx
pnpx shadcn@latest add dropdown-menu
```

## Loading and Notfound

`app/loading.tsx` sfc.

Could use [npmjs.com/package/react-spinners](https://www.npmjs.com/package/react-spinners)

Or a simple loader.gif file

```tsx
// app/loading.tsx
import Image from "next/image";
import loader from "@/assets/loader.gif";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Image src={loader} width={100} height={100} alt="Loading..." />
    </div>
  );
};
export default Loading;
```

and a nice test on the homepage:

```tsx
// app/(root)/page.tsx
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
  await delay(2000);
  return <>Homepage</>;
```

Notfound:

```tsx
// app/not-found.tsx
```

Am using a `use client` directive as using an onClick event javascript. Much simpler to just use a <Link> component, or a Button with a Link:

```tsx
// app/not-found.tsx

<div className="mt-4 ml-0">
  {/* <Button asChild variant="ghost"> */}
  <Button asChild>
    <Link href="/">Go Home</Link>
  </Button>
</div>
```

## Sheet menu (for small screen menu flyout)

asdf


## Sample Data

```ts
// db/sample-data.ts
const sampleData = {
  products: [
    {
      name: 'Polo Sporting Stretch Shirt',
      slug: 'polo-sporting-stretch-shirt',
      category: "Men's Dress Shirts",
      description: 'Classic Polo style with modern comfort',
      images: [
        '/images/sample-products/p1-1.jpg',
        '/images/sample-products/p1-2.jpg',
      ],
      price: 59.99,
      brand: 'Polo',
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: 'banner-1.jpg',
    },
    {
      name: 'Brooks Brothers Long Sleeved Shirt',
      slug: 'brooks-brothers-long-sleeved-shirt',
```

Use this to get a UI going, then will use this to seed a database with.


**am in product-list.tsx




## Vibe Coding

[https://en.wikipedia.org/wiki/Vibe_coding](https://en.wikipedia.org/wiki/Vibe_coding)

An AI dependent programming technique where you describe a problem to an LLM tuned for coding.

**Try this for moving quickly**
