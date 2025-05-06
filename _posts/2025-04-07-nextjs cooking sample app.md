---
layout: post
title: Next.js Family Cooking Sample App
description:
menu: review
categories: nextjs
published: true
comments: false
sitemap: false
image: /assets/2025-04-07/10.jpg
---

<!-- [![alt text](/assets/2025-04-03/1.jpg "email"){:width="700px"}](/assets/2025-04-03/1.jpg)  -->

<!-- [![alt text](/assets/2025-04-07/1.jpg "email")](/assets/2025-04-07/1.jpg) -->

In this article I'll exploring and demoing:

- Creating a Next.js app with create-next-app
- Deploying to Vercel
- ShadCN/UI for UI components
- How to use Groups and Layouts (and how to simplify)
- Lucide icons
- Layout
- Loading and not-found pages
- Tailwind v4 for css classes
- Caching, network requests and the network boundary
- TypeScript safefuards eg Language Server tsc, Code Formatter Prettier and Linter ESLint
- Postgres (Supabase) - pooling vs direct connects
- Drizzle ORM - mapping and migrations
- Using postgres driver and drizzle and drizzle with sql to seed (ie console app)
- Using drizzle with page.tsx and a server Action to select data
- Using drizzle generated Select and Insert types to give type safety
- Logging and Error handling

This is a work in progress article with next steps to be:

- zod
- react hook forms
- validation
- multiple tables in db
- edit and create forms combinations (and how to avoid compleity)
- authentication and authorisation


## Thoughts

- Complexity creeps into the sample apps I've followed 
- Pairing the sample codebase down to a minimum makes things much easier to deal with as a 'beginner' 
- Some of the best codebases I've worked on have been the simplest to understand. Thats where this codebase is heading

- AI is brilliant helping you learn a new framework/language - I used cursor (Claude) all the time to help me with syntax and to explain cocncepts like when a type is generated.


- Logging and Error handling are inherintly complex in this blurred network boundary abstraction..

## Big Picture thoughts

Next.js is a complex abstraction of client/server boundaries

It feels somewhat like Flash / Flex in that using the same language for the client and server.

What is next.js / react really good for?

Does a business CRUD application need this?

When working with a team of people of mixed abilties should we try for simpler abstractions in react/next


## Hello world

See [blog here](/2025/03/05/nextjs) to get latest version of node via nvm. Also npm and pnpm.

I've started back here at the beginning multiple times on

- empty-next 
- cooking - went too far down track with abstracted generic elements which I didn't like
- family-cooking

simple react snippets -sfc. Stateless Function arrow Component

`/code/premium-docs`

```bash
# Next 15.2.4 as of 7th Apr 25
npx create-next-app@latest
# prostore
# typescript (yes - default)
# eslint (yes)
# tailwind (yes - default)
# src directory (no - default)
# App Router (yes - default)
# Turbopack for next dev (no). I'm now prefering this.
# Customize aliases (no - default)

# These are my default - same as above just using pnpm
# pnpx create-next-app@latest cooking --ts --eslint --tailwind --no-src-dir --app --no-turbopack --no-import-alias --use-pnpm
# pnpx create-next-app@latest empty-next --ts --eslint --tailwind --no-src-dir --app --turbopack --no-import-alias --use-pnpm
pnpx create-next-app@latest family-cooking --ts --eslint --tailwind --no-src-dir --app --turbopack --no-import-alias --use-pnpm

cd cooking
# approve the build step for the warning I got
# node_modules/.pnpm/sharp@0.33.5/node_modules/sharp: Running install script, done in 949ms
# writes to pnpm-workspace-yaml
pnpm approve-builds

# short for run dev
pnpm dev

# build optimised prod build (I used webpack - can change in packages.json)
pnpm build
# run as prod
pnpm run start

# update to latest version on next.js which is 15.3.0 on 14th April 25
pnpm update next@latest

# update all packages to latest 
pnpm up --latest
```

and first page

```tsx
// app/page.tsx
// sfc - Stateless Function Component
// notice this isn't async. only use async when need to to avoid double page request
const Homepage = () => {
  return <>Cooking</>;
};

export default Homepage;
```

I'm going to try the new Geist font (default) as this is what comes with Next15. No I'm not - the old way has less code

Traversy does some CSS bits (Tailwind 4)

Hello world comes in at 431kB total. 

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

## Groups and Layouts

Just a grouping of pages ie for admin or normal layouts

`app/(root)/layout.tsx`

I don't link this (root) name as it is confusing to the Main `app/layout.tsx` layout.

- (admin) or (authorised) is a good name.
- (site) is good for the actual site

However for simplicity, lets try **no layout groups**. So all layout will go in `app/layout.tsx`. This will mean the same header and footer in all pages, but fine. I've also put all header and footer info in there for simplicity. Much nicer for a small site!

## Header and Footer

Using icons from [lucide.dev/guide/packages/lucide-react](https://lucide.dev/guide/packages/lucide-react)

```bash
pnpm install lucide-react
```

<!-- [![alt text](/assets/2025-04-07/1.jpg "email"){:width="700px"}](/assets/2025-04-07/1.jpg)  -->
<!-- 
[![alt text](/assets/2025-04-07/1.jpg "email")](/assets/2025-04-07/1.jpg)

Using tailwind and flexbox for responsive UI.
 -->
<!-- [![alt text](/assets/2025-04-07/2.jpg "email")](/assets/2025-04-07/2.jpg) -->

Smaller screens don't show the text title

<!-- Footer is a simple component in `components/footer.tsx` which is linked to in the `app/(root)/layout.tsx` -->

[![alt text](/assets/2025-04-07/21.jpg "email")](/assets/2025-04-07/21.jpg)

Sample layout derived from traversy.

## Loading 

`app/loading.tsx` sfc.

Could use [npmjs.com/package/react-spinners](https://www.npmjs.com/package/react-spinners)

Or a simple loader.gif file

```tsx
// app/loading.tsx
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="p-6  w-1/3 text-center">
        <h1 className="text-2xl mb-4">Loading....</h1>
      </div>
    </div>
  );
};

export default Loading;
```

and a nice test on the homepage:

```tsx
// app/page.tsx
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
  await delay(2000);
  return <>Homepage</>;
```

However on production, this page will be cached, so lets force it to be rerendered every time.

## Not Found

```tsx
// app/not-found.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <Image
        priority={true}
        src='/images/logo.svg'
        width={48}
        height={48}
        alt={`Family-Cooking logo`}
      />
      <div className='p-6 rounded-lg shadow-md w-1/3 text-center'>
        <h1 className='text-3xl font-bold mb-4'>Not Found</h1>
        <p className='text-destructive'>Could not find requested resource</p>
        <Button
          variant='outline'
          className='mt-4 ml-2'
          onClick={() => (window.location.href = '/')}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}

```

Am using a `use client` directive as using an onClick event javascript. Much simpler to just use a <Link> component, or a Button with a Link:. Or is it?

## Linting errors ignore

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
```

## Images in Public or assets

Public is just public ie foo.com/image.jpg

- want to keep large files out of the JS bundle
- don't need optimisation on dynamic imports

Assets 

- allows bundling, type-checking


## Tailwind v4

We created our app with 

```bash
pnpx create-next-app@latest family-cooking --ts --eslint --tailwind --no-src-dir --app --turbopack --no-import-alias --use-pnpm
```

```tsx
// postcss.config.json
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

then
```css
@import "tailwindcss";

/* sets up tailwind bits with variables defined below in :root */
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

/* setting variables for the theme eg background colour, text-foreground */
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.129 0.042 264.695);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.208 0.042 265.755);
  --primary-foreground: oklch(0.984 0.003 247.858);
  --secondary: oklch(0.968 0.007 247.896);
  --secondary-foreground: oklch(0.208 0.042 265.755);
  --muted: oklch(0.968 0.007 247.896);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent: oklch(0.968 0.007 247.896);
  --accent-foreground: oklch(0.208 0.042 265.755);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.704 0.04 256.788);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.984 0.003 247.858);
  --sidebar-foreground: oklch(0.129 0.042 264.695);
  --sidebar-primary: oklch(0.208 0.042 265.755);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.968 0.007 247.896);
  --sidebar-accent-foreground: oklch(0.208 0.042 265.755);
  --sidebar-border: oklch(0.929 0.013 255.508);
  --sidebar-ring: oklch(0.704 0.04 256.788);
}

/* setting up the base styles from variables defined above */
/* based off traversy media tutorial */
/* used to have a dark theme which is defined in the theme inline here */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

Notice above I'm not using an utility classes in the css, so all code will be raw Tailwind v4.

[![alt text](/assets/2025-04-07/22.jpg "email")](/assets/2025-04-07/22.jpg)

Layout with good padding, muted lines, icons, buttons, header with media queries so title disappears on smaller screens. A centered footer.


## Sheet menu (for small screen menu flyout)

Am not doing this for now.

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


Traversy abstracted out

- ProductList
- ProductCard
- ProductPrice

For simplicity, I've merged all these together into the home page to see what happens. It's certaily made cognitive load easier.

```bash
# adds components/ui/card.tsx
pnpx shadcn@latest add card
```

## Tailwind

I find that using LLM's to comment the tailwind to be useful, espeically when it is hidden inside the `globals.css` class.

Ctrl Shift L - Open up new chat window on current file

## Caching and Network Requests

If a there is a page (server or client side) which is linked from the homepage, it will be pre fetched therefore will do no network request when the page is clicked. A SPA.

It will not be fetched if it is marked "force-dynamic"

[https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)

```ts
// page is always rendered fresh on the server for each request
// page isn't cached at build time.
// 'auto' default. cache as much as possible while allowing components to opt into dynamic behaviour. Why do I get a network request if the is default. and don't when this isn't specified?
// 'force-static'.  want to make sure page is completely static.
// 'error'. force static and throw an error if any components use dynamic
// 'force-dynamic' - need fresh data on every request
export const dynamic = "force-dynamic";
```

If you link to a page which isn't currently linked.. it does a full page load

If you link a page which is dynamic it does a request (but only that but not full page ie 800bytes for my test)

### use server or use client

Note that having a "use server" directive doesn't mean there is a network request to the server.

Use server pattern used when need to be an auto generated api on the server to fetch data.

[https://overreacted.io/what-does-use-client-do/#two-worlds-two-doors](https://overreacted.io/what-does-use-client-do/#two-worlds-two-doors)

```ts
// global-error.tsx
// by default Next.js uses Server Components, so have to say if need client

// all functions in the file are to be executed on the server (default)
// "use server";
"use client";

// export default function AboutPage() {
// "use server" has to be async
export default async function AboutPage() {
```

### Server Components

This allows client side code to call an automatically generated API to get some data.

Essentially we have a single program split between two machines.

However I'm going towards using tRPC. Will get all working with components, drizzle and zod first.

### Server Functions

asdf

## Linting

As a reminder here are the safeguards in TS:

1. Language Server - tsc
2. Code Formatter - Prettier
3. Linter - ESLint

I've created a new [Vercel.com](https://vercel.com/) project by pushing to GitHub and linking up.

```ts
// next.config.ts
const nextConfig: NextConfig = {
  // show warnings in console but wont break production build
  eslint: {
    ignoreDuringBuilds: true,
  },
};
```

To run the linter `pnpm lint` - also need to get rid of ' in html. I prefer to run the linter.

## Package.json

To see what packages need updating

[![alt text](/assets/2025-04-07/18.jpg "email")](/assets/2025-04-07/18.jpg)

delete the node_modules folder and pnpm-lock.yaml then run pnpn install

I then just update manually the package.json file to whatever version I need then run pnpm i again.


## 3. Database - Supabase and Vercel

Create a new Supabase from the vercel side. West EU (London) called cooking-db

```bash
# 0.41.0 (client on 0.39.1). 0.43.1 on 28th Apr 25
# https://github.com/drizzle-team/drizzle-orm
# pnpm update didn't get latest
pnpm add drizzle-orm

# 3.4.5 (client on 3.4.5)
# https://github.com/porsager/postgres
pnpm add postgres

# 0.30.6 (client on 0.30.4)
# I got a warning: Ignored build scripts: esbuild.
# Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
# but then missed the approval step
# to revert check pnpm-workspace.yaml and delete the changed ignored part
pnpm add -D drizzle-kit

# 10.9.2 - have added to easily run ts as a console app
# pnpm add -D ts-node

# 4.19.4 on 3rd May 25
pnpm add -D tsx

# to load in .env
# 16.5.0 on 3rd May 25
pnpm install -D dotenv

# can then run this typescript console application
npx tsx db/seed
```

### DB Summary

See [here]() for detailed post on my experimentation with Supabase and Vercel and Next.js.

[drizzle supabase docs](https://orm.drizzle.team/docs/get-started/supabase-new)

Essentially:

Use the direct POSTGRES_URL_NON_POOLING connection. Faster with prepared statements. Can use transactions. Works with Vercel.

I seem to get more performance using transactions for multiple inserts. Strange.

If use the pooler, need to use prepare: false, otherwise under load from many requests it wont be able to find prepared statment.

## ENV Variables in Vercel

### postgres driver (need)

- POSTGRES_URL
- POSTGRES_URL_NON_POOLING - direct connection. Use this.

## Simple DB Connection and Insert

```ts
// db/seed/console-seed-sql.ts

// npx tsx db/seed/console-seed-sql

import "dotenv/config";
import postgres from "postgres";
import sampleData from "./traversy-sample-data";

const client = postgres(process.env.POSTGRES_URL_NON_POOLING!);

async function seedProducts() {
  await client`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  for (const product of sampleData.products) {
    console.log("inserting product", product.name);
    await client`
      INSERT INTO products (name, image_url)
      VALUES (${product.name}, ${product.images[0]});
    `;
  }
}

async function main() {
  console.log("dropping and creating public schema");
  await client`DROP SCHEMA public CASCADE;`;
  await client`CREATE SCHEMA public;`;

  console.log("begin transaction");
  try {
    await seedProducts();
  } catch (error) {
    console.error("error", error);
  }
  console.log("end transaction");
  // close the connection so that the console app can exit
  await client.end();
}

main();
```

Warning - this does drop and recreate.

[![alt text](/assets/2025-04-07/23.jpg "email")](/assets/2025-04-07/23.jpg)

Successful SQL Insert.


## Drizzle ORM Models and Migrations

Lets explore

- Drizzle and how it works
- Can it just be a micro orm ie a mapper for raw SQL queries like Dapper?
- Explore the migrations
- I do want to use this as an orm as that is what my sample prod project is


[https://orm.drizzle.team/docs/get-started/supabase-new](https://orm.drizzle.team/docs/get-started/supabase-new)


```ts
// ./drizzle.config.ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Used by Drizzle Kit
export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL_NON_POOLING!,
  },
});
```

then

```ts
// db/schema.ts (just a sample - not the real products one)
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
```

```bash
# make changes but doesn't create migration files.
# can create files by running generate
npx drizzle-kit push

# or
# generate migrations
npx drizzle-kit generate

# apply
npx drizzle-kit migrate
```

## Products schema

I used AI to help generate this schema:

```ts
// ./db/drizzle-schema.ts
import {
  pgTable,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  images: jsonb("images"), // Store array of image paths as JSON
  brand: varchar("brand", { length: 255 }).notNull(),
  description: text("description").notNull(),
  stock: integer("stock").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull().default("0"),
  rating: decimal("rating", { precision: 3, scale: 2 }).notNull().default("0"),
  numReviews: integer("num_reviews").notNull().default(0),
  isFeatured: boolean("is_featured").notNull().default(false),
  banner: varchar("banner", { length: 255 }),
  createdAt: timestamp("created_at", { precision: 6 }).defaultNow().notNull(),
});
```

then 2 different ways of inserting - both with type safety giving red squiggly.

I prefer the first way as it gives more detail on which are the type problems ie squiggly is on connect line rather than hovering over.

```ts
// To run this console script
// npx tsx db/seed/console-seed-drizzle

import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
// import sampleData from "./traversy-sample-data";
import { productsTable } from "./drizzle-schema";

const db = drizzle(process.env.POSTGRES_URL_NON_POOLING!);

async function main() {
  const product: typeof productsTable.$inferInsert = {
    name: "Polo Sporting Stretch Shirt",
    slug: "polo-sporting-stretch-shirt",
    category: "Men's Dress Shirts",
    brand: "Polo",
    description: "Classic Polo style with modern comfort",
    images: [
      "/images/sample-products/p1-1.jpg",
      "/images/sample-products/p1-2.jpg",
    ], //jsonb
    stock: 5,
    price: "59.99", //
    rating: "4.5", //
    numReviews: 10,
    isFeatured: true,
    banner: "banner-1.jpg",
    //this gets red squiggly here
    // foo: "bar",
  };

  await db.insert(productsTable).values(product);
  console.log("New product created!");

  await db.insert(productsTable).values({
    name: "Polo Sporting Stretch Shirt2",
    slug: "polo-sporting-stretch-shirt",
    category: "Men's Dress Shirts",
    brand: "Polo",
    description: "Classic Polo style with modern comfort",
    images: [
      "/images/sample-products/p1-1.jpg",
      "/images/sample-products/p1-2.jpg",
    ],
    stock: 5,
    price: "59.99",
    rating: "4.5",
    numReviews: 10,
    isFeatured: true,
    banner: "banner-1.jpg",
    // this doesn't get red squiggly but values above does, and foo is in the error
    // foo: "bar",
  });
  console.log("New product2 created!");


  for (const product of sampleData.products) {
    console.log("inserting product", product.name);

    // useful to use $insertInsert to debug type problems
    const productFoo: typeof productsTable.$inferInsert = {
      name: product.name,
      slug: product.slug,
      category: product.category,
      brand: product.brand,
      description: product.description,
      // an array stored as jsonb in postgres
      images: product.images,
      stock: product.stock,
      // pass to drizzle as string even though it expects a numeric type
      price: String(product.price),
      // minefield, and will probably store prices as pence/cents anyway to avoid this. 
      // price: Number(product.price),
      rating: String(product.rating),
      numReviews: product.numReviews,
      isFeatured: product.isFeatured,
      banner: product.banner,
    };

    await db.insert(productsTable).values(productFoo);

  }

  process.exit(0);
}
main();
```

### Add columns

Just add into the schema

```ts
  email: varchar({ length: 255 }).notNull(),
  stuff: varchar({ length: 255 }),
```

then run `npx drizzle-kit push` or generate files and migrate to update the db.

### Remove column

Update the schema definition and push.

Get a nice message about "THIS ACTION WILL CAUSE DATA LOSS AND CANNOT BE REVERTED"

You can get out of sync by pushing a change.. then generating a migration and migrating.

### Migrations

```bash
# creates the files (I like in db/migrations)
npx drizzle-kit generate

# run the migrations live
npx drizzle-kit migrate
```

If you already have your db up to date, with test data using `npx drizzle-kit push` then you can mark the migration as already applied:

[https://github.com/drizzle-team/drizzle-orm/discussions/1604](https://github.com/drizzle-team/drizzle-orm/discussions/1604)

Seems like not the thing to do.

Lets not do a push, unless am happy to blow the database away.

## User Stories

This is a neat feature I saw in Dave Gray's video series
[Dave Gray](https://www.youtube.com/watch?v=tiSm8ZjFQP0)

[source](https://github.com/gitdagray/nextjs-full-stack-project)

### UserStories.md

put in repo so can see the progress, and what to do next. Agreed with the customer.

1. [x] Replace current sticky note system
2. [ ] Add a public facing page with basic contact info
3. [ ] Add a passwordless employee login to the app
4. [ ] Show a real-time open tickets page after login
5. [ ] Provide easy navigation & search for customers & tickets
6. [ ] Provide a logout option
7. [ ] Require users to login at least once per week
8. [ ] Provide a way to remove employee access asap if needed
9. [ ] Customers have an ID, full address, phone, email & notes
10. [ ] Tickets have an ID, title, notes, created & updated dates
11. [ ] Tickets are either OPEN or COMPLETED
12. [ ] Tickets are assigned to specific employees
13. [ ] Users can have Employee, Manager, or Admin permissions
14. [ ] All users can create and view tickets
15. [ ] All users can create, edit and view customers
16. [ ] Employees can only edit their assigned tickets
17. [ ] Managers and Admins can view, edit, and complete all tickets
18. [ ] Desktop mode is most important but the app should be usable on tablet devices as well.
19. [ ] Light / Dark mode option requested by employees
20. [ ] Expects quick support if anything goes wrong with the app

## Drizzle with React Components

from Dave Gray video

```ts
// db/index.ts
// todo - rename this file!?

import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";

// config({ path: ".env.local" });
config({ path: ".env" });

const db = drizzle(process.env.POSTGRES_URL_NON_POOLING!);

// drizzle logger
// const db = drizzle(process.env.POSTGRES_URL_NON_POOLING!, {
//   logger: true,
// });

export { db };
```

Drizzle connection abstraction.

```ts
// db/schema.ts
// Drizzle schema

import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  phone: varchar("phone", { length: 255 }).unique().notNull(),
  address1: varchar("address1", { length: 255 }).notNull(),
  address2: varchar("address2", { length: 255 }),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zip: varchar("zip", { length: 10 }).notNull(),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
  tech: varchar("tech", { length: 255 }).notNull().default("unassigned"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// create relations
// 1 customer can have many tickets
export const customersRelations = relations(customers, ({ many }) => ({
  tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  customer: one(customers, {
    fields: [tickets.customerId],
    references: [customers.id],
  }),
}));
```

Also good idea - use AI to generate sample data!


## Load Products from Database

Using Server Action ie async functions that are executed on the server.

We can submit a form to these actions (ie they generate a API under the hood)

```ts
// db/product.actions.ts
"use server";

import { productsTable } from "./drizzle-schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { desc } from "drizzle-orm";
// import all tables needed for Object Based Syntax
import * as schema from "./drizzle-schema";

export async function getLatestProducts() {

  // Query builder syntax
  //   const db = drizzle(process.env.POSTGRES_URL_NON_POOLING!);
  //   const products = await db
  //     .select()
  //     .from(productsTable)
  //     .orderBy(desc(productsTable.createdAt))
  //     .limit(3);

  // Object Based Syntax which is more type safe
  const db = drizzle(process.env.POSTGRES_URL_NON_POOLING!, { schema });
  const products = await db.query.productsTable.findMany({
    orderBy: [desc(productsTable.createdAt)],
    limit: 5,

  });
  return products;
}
```

and page

```tsx
// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// import sampleData from "@/db/traversy-sample-data";
import { getLatestProducts } from "@/db/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  // ...
```

## Drizzle Select and Insert Type

By using inferSelect we can get the type from the drizzle-schema of the returned object:

```ts
// db/seed/console-seed-drizzle.ts

 // SELECT
  const bar = await db.query.productsTable.findFirst({
    orderBy: [desc(productsTable.createdAt)],
  });

  // the type of bar is productsTable.$inferSelect or undefined
  console.log("bar", bar?.name);

  // forcing it to be defined
  const bar2 = bar!
  console.log("bar2", bar2.name);

  // specifically typed
  // $inferSelect is a type generated by Drizzle ORM to represent the shape
  // of the data returned from a select query. This is attached to the productsTable object here.
  const firstProduct: typeof productsTable.$inferSelect = bar!;
  console.log("firstProduct name", firstProduct.name);
```

[docs](https://orm.drizzle.team/docs/goodies#type-api)


## Drizzle Raw SQL (like Dapper)

[https://orm.drizzle.team/docs/goodies#raw-sql-queries-execution](https://orm.drizzle.team/docs/goodies#raw-sql-queries-execution)

```ts
// SELECT SQL
const result = await db.execute<typeof productsTable.$inferSelect>(
  sql`SELECT * FROM products ORDER BY created_at DESC`
);
console.log("name of last inserted product", result[0].name);
```

## Drizzle in a Server Action

I've got a page which needs data selected from the Products table.


```ts
// db/product.actions.ts
"use server";

import { productsTable } from "./drizzle-schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { desc } from "drizzle-orm";
// import all tables needed for Object Based Syntax
import * as schema from "./drizzle-schema";

export async function getLatestProducts() {

  // Query builder syntax
  //   const db = drizzle(process.env.POSTGRES_URL_NON_POOLING!);
  //   const products = await db
  //     .select()
  //     .from(productsTable)
  //     .orderBy(desc(productsTable.createdAt))
  //     .limit(3);

  // Object Based Syntax which is more type safe
  const db = drizzle(process.env.POSTGRES_URL_NON_POOLING!, { schema });
  
  const products = await db.query.productsTable.findMany({
    orderBy: [desc(productsTable.createdAt)],
    limit: 5,
  });

  // this is typed from drizzle productsTable.$inferSelect
  // console.log("products", products[0].name);
  return products;
}
```

In the page, lets just use drizzle and not zod

## Page.tsx

```tsx
// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getLatestProducts } from "@/db/db.actions";
// import { selectProductSchemaType } from "@/zod-schemas/product";
import { productsTable } from "@/db/drizzle-schema";
const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  // zod
  // let limitedData: selectProductSchemaType[];

  // drizzle
  let limitedData: typeof productsTable.$inferSelect[];

  let showData = true;
  if (latestProducts.length > 0) {
    limitedData = latestProducts.slice(0, 5);
  } else {
    showData = false;
  }
```

A wire up of drizzle to the `product.actions.ts` where the api has been created behind the scenes.

**HERE** - this is the limit of where I got to.


## Zod

Lets create types eg when I display on the homepage I want an array of Product not any.  `let limitedData: any[];`

- compile time checking
- run time checking (which will allow us to have form validation)

Eg we want a name to have at least 3 characters.

```bash
# 0.7.1 on 4th May 25
pnpm install drizzle-zod

# 3.24.3 on 4th May 25
pnpm install zod
```

and zod-schema:

```ts
// zod-schemas/product.ts

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { productsTable } from "@/db/drizzle-schema";

// don't need some fields for insert new product
// eg createdAt, updatedAt, id, rating...
// so a separate schema for insert
export const insertProductSchema = createInsertSchema(productsTable, {
  name: (s) => s.min(3, "Name of product at least 3 characters"),
  slug: (s) => s.min(3, "Slug of product at least 3 characters"),
  category: (s) => s.min(3, "Category of product at least 3 characters"),
  // TODO test
  // images is an array of strings, stored as jsonb in db
  images: (s) => s.array().nonempty("At least 1 image is required"),
  brand: (s) => s.min(3, "Brand of product at least 3 characters"),
  description: (s) => s.min(10, "Description at least 10 characters"),
  // TODO test
  stock: (s) => s.min(0, "Stock of product greater than 0..test this!"),
  price: (s) => s.min(0, "Price of product greater than 0...test this!"),
  // no need for rating
  // no need for numReviews
  // no need for isFeatured
  // no need for banner
  // no need for createdAt (auto generated)
});

// createSelectSchema(productsTable) automatically generates a Zod schema
// that matches the shape of a row selected from the productsTable in your database.
export const selectProductSchema = createSelectSchema(productsTable);



export type insertProductSchemaType = typeof insertProductSchema._type;

export type selectProductSchemaType = typeof selectProductSchema._type;
```
and lets test the zod schema


createSelectSchema(productsTable) automatically generates a Zod schema that matches the shape of a row selected from the productsTable in your database.




## Queries

```ts
// lib/queries/getCustomer.ts

import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCustomer(id: number) {
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));

  // to force the only customer and not an array of 1
  return customer[0];
}
```

and

```tsx
// app/(root)/customer/form/page.tsx
import { getCustomer } from "@/lib/queries/getCustomer";

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;

    // Edit customer form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
          </>
        );
      }
      console.log(customer);
      // put customer form component
    } else {
      // new customer form component
    }
  } catch (e) {
    // will get ouptutted to the console ie vercel logs
    throw e;
  }
}
```

Using a Search Param:

[http://localhost:3000/customers/form?customerId=4](http://localhost:3000/customer/form?customerId=4)

We can see the customer returned in the console.

### Tickets

They are more interesting as

- no customerId and no ticketId - error
- customerId - Create a new ticket for this customer
- ticketId - Edit this ticket

[http://localhost:3000/tickets/form?ticketId=2](http://localhost:3000/tickets/form?ticketId=2)

```tsx
// (root)/tickets/form/page.tsx

import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    // if no customerId or ticketId, return error
    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form
          </h2>
        </>
      );
    }

    // New ticket form ie a customerId is provided
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
          </>
        );
      }

      // if customer is not active, return error
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active.
            </h2>
          </>
        );
      }

      // return new ticket form
      console.log(customer);
    }

    // Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      // return edit ticket form
      console.log("ticket: ", ticket);
      console.log("customer: ", customer);
    }
  } catch (e) {
    throw e;
  }
}
```

Logical, but don't know if I like this complexity.

## Zod

[https://www.youtube.com/watch?v=bg6KyucKd88](https://www.youtube.com/watch?v=bg6KyucKd88) Next.js with React-Hook-Form, Drizzle-Zod and ShadCN/ui

I'm following this Dave Gray video now

```ts
// zod-schemas/customer.ts
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  address1: (schema) => schema.min(1, "Address is required"),
  city: (schema) => schema.min(1, "City is required"),
  state: (schema) => schema.length(2, "State must be exactly 2 characters"),
  email: (schema) => schema.email("Invalid email address"),
  zip: (schema) =>
    schema.regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits"
    ),
  phone: (schema) =>
    schema.regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid phone number format. Use XXX-XXX-XXXX"
    ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;

export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
```

Nice to have built in email validation (it is hard to get right)

Lets see if this wires up well

## React Hook Form (shadcn form)

[https://ui.shadcn.com/docs/components/form](https://ui.shadcn.com/docs/components/form) Shadcn From wraps react-hook-form

> Forms are tricky

I agree with this quote from shadcn.

Why not the new Next Form in Next.js 15?

This is client and server side validation of the form

Lets colocate the "use client" component (as its not being used anywhere else)

```tsx
// app/(root)/customers/form/CustomerForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/zod-schemas/customer";

type Props = {
  customer?: selectCustomerSchemaType;
};

export default function CustomerForm({ customer }: Props) {
  const defaultValues: insertCustomerSchemaType = {
    // null coalescing operator
    // better choice than (or) || short circuit operator which accepts first truthy value
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    email: customer?.email ?? "",
    phone: customer?.phone ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    notes: customer?.notes ?? "",
  };

  const form = useForm<insertCustomerSchemaType>({
    // when tab out of a field, it will validate
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  async function submitForm(data: insertCustomerSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer Form
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
        >
          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>
    </div>
  );
}
```

which is called from:

```tsx
// app/(root)/customer/form/page.tsx
import { getCustomer } from "@/lib/queries/getCustomer";
import CustomerForm from "@/app/(root)/customers/form/CustomerForm";

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;

    // Edit customer form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
          </>
        );
      }
      console.log(customer);
      // update customer
      return <CustomerForm customer={customer} />;
    } else {
      // create customer
      return <CustomerForm />;
    }
  } catch (e) {
    // will get ouptutted to the console ie vercel logs
    throw e;
  }
}
```


## Create the Form Elements

```bash
npx shadcn@latest add input select textarea checkbox
```

Lets abstract out


```tsx
// components/inputs/InputWithLabel.tsx

// https://ui.shadcn.com/docs/components/form
// we're abstracting out the anatomy of every input form as described in link above

"use client";

import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

// typescript generics
// s is for schema
type Props<S> = {
    fieldTitle: string;
    nameInSchema: keyof S & string;
    className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<S>({
    fieldTitle,
    nameInSchema,
    className,
    ...props
}: Props<S>) {

    const form = useFormContext();

    return (
        <FormField
        control={form.control}
        name={nameInSchema}
        render={({ field }) => (
            <FormItem>
                <FormLabel
                    className="text-base"
                    htmlFor={nameInSchema}
                >
                    {fieldTitle}
                </FormLabel>

                <FormControl>
                    <Input
                        id={nameInSchema}
                        className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
                        {...props}
                        {...field}
                    />
                </FormControl>

                <FormMessage />
            </FormItem>
        )}
    />
    )

}
```

## Customer Create and Edit

Both now work.. and Edit populates the form as expected. Including the Select List which is great.

Also on edit when I do a reset, it populates the original data. Nice.

## Tickets need Checkbox

Am not liking the abstracted complexity of the form elements.



## Authentication and Authorisation

[https://www.youtube.com/watch?v=VueEcnP9LZg](https://www.youtube.com/watch?v=VueEcnP9LZg)

Using Kinde which I don't want


## Submit to Server Action

Type safe server actions?

[https://next-safe-action.dev/(https://next-safe-action.dev/)] mutations.

[https://www.youtube.com/watch?v=4IJonW24uck](https://www.youtube.com/watch?v=4IJonW24uck)













[![alt text](/assets/2025-04-07/20.jpg "email")](/assets/2025-04-07/20.jpg)

Form with validation working. Goes to 1 column on smaller screens.


We've also created a TextAreaWithLabel, SelectWithLabel

Am not liking the complexity of these abstractions.







and this works for

[![alt text](/assets/2025-04-07/19.jpg "email")](/assets/2025-04-07/19.jpg)

[http://localhost:3000/customers/form?customerId=2](http://localhost:3000/customers/form?customerId=2)

and

[http://localhost:3000/customers/form](http://localhost:3000/customers/form)

This seems to be powerful as it allows

- validation over the whole stack - including on forms
- granular eg must be 3 letters or more..

There is a [plugin for Drizzle](https://orm.drizzle.team/docs/zod) that allows you to generate Zod schemas from Drizzle ORM schemas.

[https://zod.dev/?id=installation](https://zod.dev/?id=installation)

[https://github.com/colinhacks/zod](https://github.com/colinhacks/zod)

[https://github.com/drizzle-team/drizzle-orm/tree/main/drizzle-zod](https://github.com/drizzle-team/drizzle-orm/tree/main/drizzle-zod)

```bash
pnpm add zod

pnpm add drizzle-zod

# 7.56.1 on 29th Apr 25
pnpm add react-hook-form

# 5.0.1 on 29th Apr 25
pnpm add @hookform/resolvers

# 2.5.0 on 29th Apr 25
# added in componenets/ui/form.tsx and label.tsx
npx shadcn@latest add form
```

**HERE** using traversy Zod validation.. video
**ALSO** https://orm.drizzle.team/docs/zod generate zod schemas from drizzle orm?????

[https://www.youtube.com/watch?v=djDgTYrFMAY](https://www.youtube.com/watch?v=djDgTYrFMAY) Dave Gray video series. 13 videos each about 1:30 long.

He is using: ShadCN, Lucide icons, [Kinde](https://kinde.com/) for authentication and authorization.

## Loading Spinner

loading.tsx

For some reason my spinner works for direct page, but not if clicked on internally.

## Error Handling

[https://nextjs.org/docs/app/building-your-application/routing/error-handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

```tsx
// app/global-error.tsx
"use client"; // Error boundaries must be Client Components

// this is for handing errors on the client side
import Link from "next/link";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    // should send to Sentry or something!
    // Sentry.captureException(error);

    console.error(
      "Logged to developer tools from global-error.tsx - sorry about this!"
    );
  }, [error]);

  return (
    <div>
      <h2>This is the client side global error page ie global-error.tsx.</h2>
      <Link href="/">Go Home</Link>
    </div>
  );
}
```

Note this will display a nice page, but not a 500 on Vercel.

There is also error.tsx for finer grained.

Here is my sample server component page to throw an error:

```tsx
// app/(root)/sample-error/page.tsx

// always render the page on the server
// skip all forms of caching
// this is the opposite of static pages which are generated at build time and cached
export const dynamic = "force-dynamic";

// not async unless need it
export default function SampleErrorPage() {
  try {
    // this gets logged to the console on vercel
    throw new Error("sample error in theserver component");
  } catch (error) {
    // this gets logged first in the sample function error
    // console.error("in try catch.. with caught error included ", error);
    console.error("in try catch.. don't need to output the error again");
    throw error;
  }
  return <>Sample Error Page text</>;
}
```

and here is the error on vercel:

[![alt text](/assets/2025-04-07/17.jpg "email")](/assets/2025-04-07/17.jpg)

## Logging and Monitoring

[Nextjs logging]() article

## TODO

can I use raw sql.. is there an object mapper to a type? Can drizzle do this?

## Foo

orm.drizzle.team/docs/tutorials/drizzle-with-supabase](https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase)

[https://vercel.com/guides/connection-pooling-with-serverless-functions#http-database-apis](https://vercel.com/guides/connection-pooling-with-serverless-functions#http-database-apis) uses PostgREST

_HERE_ - need to look for best practise / advice on Supabase Drizzle and Vercel.

client is using: drizzle-orm, drizzle-kit which includes DB schema and zod bindings

packages/db/package.json

## Debugging

```ts
// middleware.ts
// to see http requests on dev like in vercel if we run in prod ie pnpm run start (after a pnpm build)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(`[Middleware] ${request.method} ${request.nextUrl.pathname}`);
  return NextResponse.next();
}
```

To see the requests that are happening on dev side.

[![alt text](/assets/2025-04-07/16.jpg "email")](/assets/2025-04-07/16.jpg)

Also be careful that disable cache is unticked. Then we can see the cache being hit and minimal calls back to server (only when dynamic like in SeedPage above)

If it's an async funciton, then can hit the disk cache instead. But in not async, then no requests are made at all.

### VERCEL_FORCE_NO_BUILD_CACHE

put in as an environment variable = 1 if you this is message below and you don't like some of the build:

> Restored build cache from previous deployment

I had found that I'd taked out some packages, and they were still in the cached build assets on vercel. They probably didn't do anything, but wanted to get rid of them.



## FOO

## Background

I'm working with a client who has a business application close to v1 release using this stack:

- pnpm
- Next.js (although we may be changing as have long compile times.. and don't use Next much.. what?)
- ShadCN UI
- Drizzle
- Zod
- React Hook Form (ShadCN Form)
- Vercel for hosting
- Supabase for Postgres and Auth (including SSO)
- tRPC

It has been an impressive development effort by a talented single young developer in the company (of around 150 people).

As the application is at the core of what the company does, the risk of all the knowledge being with a single developer is large.

I've been brought in to

- Get the project released ie v1 - essentially get the developer focussed on the remaining large features to do
- Make sure the app is secure, does what the business needs to etc..
- Write documentation so that the I / others can support it and develop on it

To be able to accomplish the above a properly understand the stack, I always like to have side projects to test what is happening. This is one of these projects.

It is also a lot of fun to explore new technology (and the reason I'm in this job!)

This starts off with the same as the [Traversy](https://www.traversymedia.com/products/next-js-ecommerce/categories/2156730994) course as it is good for pnpm, next.js, shadcn, zod

## Benefits of Next.js vs .NET/Python/Rails

- The person doing all the development knowns Next.js really well (this is super important!)
- Next.js is popular and well supported - [Stackoverflow 2024 Survey](https://survey.stackoverflow.co/2024/technology#most-popular-technologies-webframe)
- Vercel is very good
- Same language (and framework) on client and server blurring the network boundary - interesting concept 

We shall see.

## Next.js

[en.wikipedia.org/wiki/Next.js](https://en.wikipedia.org/wiki/Next.js) is a React framework which enables extra features including Server Side Rendering. [github.com/vercel/next.js](https://github.com/vercel/next.js) 131k stars on GH. It is a solid framework used by many of the worlds largest companies.

[react.dev](https://react.dev/) recommends a full stack framework like Next.js or Remix to do routing and data fetching.

### Problems and Alternatives

Compilation times in Next are slow, issues with the App router, random compilation bugs, and some state management weirdness

[tanstack.com/start/latest](https://tanstack.com/start/latest) - very new (still in Beta). 10k downloads per month on [npm](https://www.npmjs.com/package/@tanstack/start)

[github.com/remix-run/react-router](https://github.com/remix-run/react-router) - 54k stars on GH. No server side rendering?

[https://wasp.sh/](https://wasp.sh/) looks interesting. 16.6k stars. React, Node and Prisma. Rails-like framework.
