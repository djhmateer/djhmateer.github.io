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


<!-- [![alt text](/assets/2025-04-07/1.jpg "email")](/assets/2025-04-07/1.jpg) -->
## Background

I'm working with a client who has a business application close to v1 release using this stack:

- pnpm
- Next.js (although we may be changing as have long compile times.. and don't use Next much.. what?)
- ShadCN UI
- Drizzle
- Zod
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

# update to latest version on next.js which is 15.3.0 on 14th April 25
pnpm update next@latest
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

```tsx
// app/(root)/page.tsx
import sampleData from "@/db/sample-data";
import ProductList from "@/components/product-list";

const Homepage = async () => {
  return (
    <>
      <ProductList
        data={sampleData.products}
        title="Newest Arrivals"
        limit={4}
      />
    </>
  );
};
export default Homepage;
```

and

```tsx
// components/product-list.tsx
const ProductList = ({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        // mobile - 1 column then small 2, medium 3, large 4 columns and up
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product: any) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      ) : (
        <div>
          <p>No product found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
```

Notice we don't have typing yet for `product` or `data` which is really `products`

## Card

```bash
# adds components/ui/card.tsx
pnpx shadcn@latest add card
```

As performance is a big deal in React and Next, I want to be sure to focus on the UI library and interactions too. Understanding what is happening and where, is very important.

However so is simplicity, so lets try and refactor as I go.

Currently have

- ProductList component on home screen which gets products data passed to it, and a title and limit property.
- ProductList handles all its own rendering
- create a ProductCard component ie a single Card... possible don't need?
- He also wants to create a ProductPrice component - no!

## Updates

```bash
# next from 15.2.4 to 15.2.5
# eslint the same as above
# node typoes from 20.17.30 to 22.14.0 (22.14.4 is latest lts)

pnpm up --latest
```

## Tailwind

I find that using LLM's to comment the tailwind to be useful, espeically when it is hidden inside the `globals.css` class.

Ctrl Shift L - Open up new chat window on current file

## 3. Database - Supabase and Vercel

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

Create a new Supabase from the vercel side. West EU (London) called cooking-db

Don't worry about connection strings yet.

### Databases

```bash
# 0.41.0 (client on 0.39.1)
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
pnpm add -D ts-node
# 4.19.3
pnpm add -D tsx

# can then run this typescript console application
npx tsx db/seed

# to load in .env
pnpm install -D dotenv
```

supabase.com/docs/guides/database/connecting-to-postgres](https://supabase.com/docs/guides/database/connecting-to-postgres) - good summary of Supabase connections strategies.

[![alt text](/assets/2025-04-07/3.jpg "email")](/assets/2025-04-07/3.jpg)

- Using Transaction Pooler in production as on Vercel which needs IPv4 and supports large numbers of connections.
- Using Direct Connection to run migrations which may run longer????? wont work on Vercel

Did a test of pooling and direct.. no real difference in speed. Tried to get the pooling side to fail under a long running transaction -(6 minutes).. fine.

Here is a test of creating the schema using a Direct SQL connection to the non pooling side 

[github.com/porsager/postgres](https://github.com/porsager/postgres) aka postgres.js - 7.9k stars - we are using this. Protection against SQL injection with parameters.

[github.com/brianc/node-postgres](https://github.com/brianc/node-postgres) - 12.6k stars. 

supabase.js - doesn't support transactions?


```ts
// db/seed.ts
// To run this console script
// npx tsx db/seed

import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!);
// const sql = postgres(process.env.POSTGRES_URL!);

// can get the sql outputted, including parameters,but not the query time
// const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, {
//   ssl: 'require',
//   debug: (connection: number, query: string, parameters: any[], paramTypes: any[]) => {
//     console.log(' PG Executed query:', query);
//     if (parameters && parameters.length > 0) {
//       console.log(' PG parameters:', parameters);
//     }
//   },
// });

async function noTransactionInsert() {
  console.time();
  const customer = {
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
  };

  try {
    for (let i = 0; i < 1000; i++) {
      console.error("inserting ", i);
      await sql`INSERT INTO customers (name, email, image_url)
        VALUES (${customer.name+i}, ${customer.email}, ${customer.image_url})`;
    }
  } catch (error) {
    console.error("error", error);
  }

  // around 10secs
  console.timeEnd();
}

async function transactionInsert() {
  console.time();
  const customer = {
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
  };

  try {
    await sql.begin(async (sql) => {
      for (let i = 0; i < 1000; i++) {
        console.error("inserting ", i);
        await sql`
          INSERT INTO customers (name, email, image_url)
          VALUES (${customer.name + i}, ${customer.email}, ${customer.image_url})
        `;
      }
    });
  } catch (error) {
    console.error("error", error);
  }

  // around 10secs
  console.timeEnd();
}

noTransactionInsert();
transactionInsert();
```

The above works well from my network.

From vercel side I got a `This Serverless Function has timed out` after 10s. In Project, Settings, Functions, you can go up to 60s on the free tier.

```tsx
// seed/route.ts

export async function GET() {
  try {
    const start = Date.now();
    await noTransactionInsert();
    // transactionInsert();
    const end = Date.now();
    const duration = end - start;

    return Response.json({
      message: `seeded successfully from route in ${duration} milliseconds`,
    });
  } catch (error) {
    console.log("error", error);
    return Response.json({ error }, { status: 500 });
  }
}
```

Performance was much slower on Vercel (I was in a different region to my db). Now it is 3.6s compared to 10sec on my network. 

```json
// vercel.json
{
  "regions": ["lhr1"]
}
```

transactions worked fine on direct and pooling  - no change in speed.

I'm guessing the pooler connection works because I'm not using [Edge](https://supabase.com/docs/guides/functions) functions. [more](https://supabase.com/docs/guides/functions/connect-to-postgres) db connection guide...know more.

I believe I get more pooler connections.

[![alt text](/assets/2025-04-07/4.jpg "email")](/assets/2025-04-07/4.jpg)

I only 'need' POSTGRES_URL (have found that I can use transactions and the pooler fine from Vercel). But can't delete the other env variables.


## testing

I opened 2 terminal windows and ran this on all to simulate some load

```bash
for i in {1..10}; do
  echo "time: $(date +"%T")"
  # s is silent
  curl -s "https://cooking-iota-inky.vercel.app/seedroute"
  echo;
done
```

On the supabase side when I do multi queries at the same time, I get many errors on supabase:

### Prepared Statements

[https://www.postgresql.org/docs/current/sql-prepare.html](https://www.postgresql.org/docs/current/sql-prepare.html)

"Prepared statements potentially have the largest performance advantage when a single session is being used to execute a large number of similar statements. The performance difference will be particularly significant if the statements are complex to plan or rewrite, e.g., if the query involves a join of many tables or requires the application of several rules."

However this doesn't work for a pooled connection.

```tsx
// turn off prepared statments in the pooled connection
const sql = postgres(process.env.POSTGRES_URL!, {
  prepare: false
});
```

Getting a solid: {"message":"seeded successfully from route in 6548 milliseconds"}
accross all connections.

Changing to a NON POOLING

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!);

is faster - about 4000milliseconds across all connection (4 at same time)


But we get on the nano (free db) tier.

- 60 direct connections
- 200 pooler connections

I can see number of connections

```sql
SELECT
   pg_stat_activity.pid,
   ssl AS ssl_connection,
   datname AS database,
   usename AS connected_role,
   application_name,
   client_addr,
   query,
   query_start,
   state,
   backend_start
FROM pg_stat_ssl
JOIN pg_stat_activity
 ON pg_stat_ssl.pid = pg_stat_activity.pid;
```

[![alt text](/assets/2025-04-03/4.jpg "email")](/assets/2025-04-03/4.jpg)

A quiet server with the only query running being the sql above to see display this list.


[![alt text](/assets/2025-04-03/5.jpg "email")](/assets/2025-04-03/5.jpg)

Application name: Supavisor.  Pooling conection


[![alt text](/assets/2025-04-03/6.jpg "email")](/assets/2025-04-03/6.jpg)

2 direct connections.

[![alt text](/assets/2025-04-03/9.jpg "email")](/assets/2025-04-03/9.jpg)

5 direct connections.

### Load test many request at once


```bash
sudo apt install parallel

# run 20 concurrent requets
# 60 in total
# // run in ~/ with ./foo.sh

#!/bin/bash

url="https://cooking-iota-inky.vercel.app/seedroute"
total_requests=60
concurrent_threads=20

# Function to measure time per request
make_request() {
  i=$1
  start_time=$(date +%s%3N)  # milliseconds

  echo "[$i] Requesting: $url"
  curl -s -o /dev/null -w "[%{http_code}] %{url_effective}\n" "$url"

  end_time=$(date +%s%3N)
  elapsed=$((end_time - start_time))
  echo "[$i] Elapsed: ${elapsed} ms"
}

export -f make_request
export url

# Start total timer
total_start=$(date +%s)

# Run parallel
seq 1 $total_requests | parallel -j $concurrent_threads make_request {}

# End total timer
total_end=$(date +%s)
total_elapsed=$((total_end - total_start))

echo ""
echo "✅ Total elapsed time: ${total_elapsed} seconds"
```

### DB Summary

Use the direct POSTGRES_URL_NON_POOLING connection. Faster with prepared statements. Can use transactions. Works with Vercel.

I seem to get more performance using transactions for multiple inserts. Strange.


If use the pooler, need to use prepare: false, otherwise under load from many requests it wont be able to find prepared statment.


## ENV Variables in Vercel

### postgres driver (need)
- POSTGRES_URL
- POSTGRES_URL_NON_POOLING - direct connection. Use this.


### supabase.js uses (don't need)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEYNEXT

### prisma

POSTGRES_PRISMA_URL (don't need)


## Error Handling

asdf

[https://nextjs.org/docs/app/building-your-application/routing/error-handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)


```tsx
// app/global-error.tsx
'use client' // Error boundaries must be Client Components
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}

```

# Logging

My favourite .NET logging library is [Serilog](https://serilog.net/) using [log levels](https://github.com/serilog/serilog/wiki/Configuration-Basics#minimum-level) of

- Verbose
- Debug - internal system events.
- Information - Things happening in the system that correspond to responsibilities. Generally observable actions the system can perform.
- Warning - Service is degraded or behaving outside expected parameters
- Error - Service unavailable or expectation are broken.
- Fatal - Demands immediate attention

I run production servers using VMs, so log to the filesystem.

[![alt text](/assets/2025-04-07/11.jpg "vercel logs")](/assets/2025-04-07/11.jpg)

Can use console.log, console.warn and console.error in vercel. These logs are only kept for 1 hour on the free tier, 1 day on pro and 3 dasy on enterprise.

[Pino](https://getpino.io/) - 15k stars. It is a node.js logger. [arcjet blog](https://blog.arcjet.com/structured-logging-in-json-for-next-js/)

Winston

posthog

### Log Collector

[https://baselime.io/](https://baselime.io/) 7 days log retention and free.

### Error only

[sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/) - this is about logging errors. Includes client and server.




This is the error on vercel side. Probably due to max (?) direct connections - have seen 20.
```json
error Error: write CONNECT_TIMEOUT undefined:undefined
    at <unknown> (.next/server/chunks/748.js:1:9526)
    at Timeout.n [as _onTimeout] (.next/server/chunks/748.js:11:2361) {
  code: 'CONNECT_TIMEOUT',
  errno: 'CONNECT_TIMEOUT',
  address: undefined,
  port: undefined
}
```
[![alt text](/assets/2025-04-07/10.jpg "email")](/assets/2025-04-07/10.jpg)

Using the pooler I can get more db connections. But this is under extreme load of 30 concurrent connections hitting massive inserts.

## TODO

can I use raw sql.. is there an object mapper to a type? Can drizzle do this?






## Foo
orm.drizzle.team/docs/tutorials/drizzle-with-supabase](https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase)

[https://vercel.com/guides/connection-pooling-with-serverless-functions#http-database-apis](https://vercel.com/guides/connection-pooling-with-serverless-functions#http-database-apis) uses PostgREST

_HERE_ - need to look for best practise / advice on Supabase Drizzle and Vercel. 

client is using: drizzle-orm, drizzle-kit which includes DB schema and zod bindings

packages/db/package.json

