---
layout: post
title: Travery Media Next.js 15
description: 
menu: review
categories: js 
published: true 
comments: false     
sitemap: false
image: /assets/2024-11-12/1.jpg
---

<!-- [![alt text](/assets/2025-03-05/2.jpg "email"){:width="700px"}](/assets/2025-03-05/2.jpg)  -->

[https://www.traversymedia.com/products/next-js-ecommerce](https://www.traversymedia.com/products/next-js-ecommerce)

A commercial course $15 with a Stack

- Next.js 15 / React 19
- PostgreSQL (via vercel / neon)
- Prisma ORM
- TypeScript, ESLint and Zod (zod schemas for data validation)
- ShadCN UI
- Next Auth
- React Hook Form (form state, validation, submission)
- Jest Testing
- Vercel Deployment

Note - my code is in `wprostore`

## 1.2

[https://prostore-one.vercel.app/](https://prostore-one.vercel.app/)

Prisma studio is a web UI for the db


## 1.3 Environment

I've blogged about these in more detail [here](/2025/04/01/vscode-typescript-tsserver-formatting-and-linting)

Prettier (55m) eg puts in forgotten semicolons, or fixes spaces. Do ctrl alt F to format, then select prettier as the default ts formatter.


ESLint (42m) - check code for errors, and enforce a style guide eg if you have a variable declared, but never used, it will let you know

Prisma (2.4m) - ORM extension to give nice highlighting of schema

Simple React Snippets (5.2m) - keyboard shortcuts eg SFC to create a Stateless Function Components 

Tailwind CSS Intellisense (9.5m)

JavaScript (ES6) code snippets - eg for console.log and try catch blocks

Markdown Preview Enhanced (6.9m)


## 1.4 Project setup

Use the premium docs project instructions - nice.  `code/premium-docs`

Final Source: [https://github.com/bradtraversy/prostore](https://github.com/bradtraversy/prostore) and there is a tailwind4 branch which is needed.


## 2.1 App Creation and Basic layout

```bash
# 15.2.3 as of 18th March 25
# it prompted me to update
npx create-next-app@latest
# prostore
# typescript (yes - default)
# eslint (yes)
# tailwind (yes - default)
# src directory (no - default)
# App Router (yes - default)
# Turbopack for next dev (no)
# Customize aliases (no - default)
```

Notice I'm using npm and not pnpm

```bash
# Next.js 15.2.3
npm run dev
```

```tsx
// sfc - arrow function style component
const HomePage = () => {
  return <>Prostore</>;
}
  
export default HomePage;
```

then in 

```tsx
// app/layout.tsx
// use the Inter font.

```

I'm getting strange Tailwind errors because it has been updatd from 3 to 4.

[Discord](https://discord.com/channels/1072292915306577940/1322981813735653477/) server very useful.

Trick was to use the latest tailwind4 branch and copy in the `globals.css` file.

```bash
npx create-next-app@latest --use-pnpm
```

## 2.3 ShadCN UI Setup

[https://ui.shadcn.com/](https://ui.shadcn.com/)


install [https://ui.shadcn.com/docs/installation/next](https://ui.shadcn.com/docs/installation/next)

```bash
pnpm dlx shadcn@latest init
# choose slate
# installs components.json

pnpm dlx shadcn@latest add button
# creates components/ui/button.tsx
```

then can use this component

```tsx
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return ( 
    <div>
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}
 
export default HomePage;
```

## 2.4 Root Layout and Constants

We can have multiple layouts which will be very useful for normal and for admin

`app/(root)/layout.tsx` Parenthesis is a group. This will have cart, orders, most of the pages.

`app/(root)/page.tsx` homepage with standard layout

and

`app/(auth)/layout.tsx` is another as we don't want entire menu

`app/(auth)/sign-in/page.tsx`   - sign in page with different layout

and

`app/admin` is a standard route

`app/admin/layout.tsx` is a standard route

`app/admin/page.tsx` admin home page


### Constants

```ts
// lib/constants/index.ts
// if the env variable is not set, use the default value
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Prostore";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "A modern ecommerce store built with Next.js and Tailwind CSS";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

// .env
// # this is the .env variable 
// # which overrides the default values in lib/constants/index.ts
NEXT_PUBLIC_APP_NAME="Prostore"
NEXT_PUBLIC_APP_DESCRIPTION="A modern ecommerce store built with Next.js and Tailwind CSS"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
```

This is strange the double up of constants.

and to pass in the page title

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};
```

and 

```tsx
// app/(root)/page.tsx
export const metadata: Metadata = {
  title: "Home"
}
```

Gives

[![alt text](/assets/2025-03-19/1.jpg "email"){:width="500px"}](/assets/2025-03-19/1.jpg) 

Good page title.

## 2.5 Header and Footer Components

```tsx
// components/shared/header/index.tsx
const Header = () => {
    return  <>Header</>;
};
 
export default Header;
```

then in the layout

```tsx
// app/(root)/layout.tsx
import Header from "@/components/shared/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // height of whole screen and flex column
    <div className="flex h-screen flex-col">
      {/* header component from components/shared/header/index.tsx */}
      <Header />
        {/* wrapper is a utility class in global.css */}
        <main className="flex-1 wrapper">{children}</main>
    </div>
  );
}
```

Icons from [lucide-react](https://lucide.dev/guide/packages/lucide-react)

`pnpm install lucide-react`


`components/shared/header/index.tsx` for the Header component

`components/footer.tsx` for the Footer which isn't shared. Nicer naming convention!

Lots of TailwindCSS and Flexbox getting the design setup including not displaying the name on smaller screensizes.

<Link> component with a <Image> inside for logo

<Button> component to have nice hover over states using Ghost theme with <Link> inside



[![alt text](/assets/2025-03-19/2.jpg "email"){:width="600px"}](/assets/2025-03-19/2.jpg) 



## 2.6 Theme Mode

`pnpm add next-themes` for helping switch between light and dark modes

`pnpm dlx shadcn@latest add dropdown-menu` for drop down. adds in `components/ui/dropdown-menu.tsx`

In AopLayout import that ThemeProvider from next-themes


Going to be using somme client hooks from next-themes, so need to be a client side component

```tsx
// components/shared/header/mode-toggle.tsx

```


[![alt text](/assets/2025-03-19/3.jpg "email"){:width="800px"}](/assets/2025-03-19/3.jpg) 

The server doesn't have a window, so that is the problem. The `suppressHydrationWarning` on the root html tag doesn't suppress this warning alone.

we need to make sure the component is mounted before it uses or changes the theme.

```tsx
"use client";

// for hydration warning fix
import { useState, useEffect } from "react";

// hooks from next-themes
import { useTheme } from "next-themes";

// for dropdown menu
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, SunMoon } from "lucide-react";

const ModeToggle = () => {
  // hydration warning fix
  const [mounted, setMounted] = useState(false);

  // setTheme called from onClick on dropdown menu from chadcn ui
  const { theme, setTheme } = useTheme();

  // useEffect to prevent hydration warning
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    // https://ui.shadcn.com/docs/components/dropdown-menu
    <DropdownMenu>
      {/* asChild as we've got a butotn inside of it */}
      <DropdownMenuTrigger asChild>
        {/* border on icon get rid of */}
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {theme === "system" ? (
            <SunMoon />
          ) : theme === "dark" ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
```

2.6 Loading and Not Found

```tsx
// app/loading.tsx
// sfc
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
      <Image src={loader} width={150} height={150} alt="Loading..." />
    </div>
  );
};

export default Loading;
```

then a test on 

```tsx
// app/(root)/page.tsx
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const metadata: Metadata = {
  title: "Home",
};

const HomePage = async () => {
  // await delay(2000);

  // simpler way to delay without the need for the delay function
  // the resolver function is called when the timeout is up essentially
  // telling the promise to resolve ie "I'm done now"
  await new Promise((resolver) => setTimeout(resolver, 2000));

  return (
    <div>
      <h1>Hello World</h1>
      {/* <Button>Click me</Button> */}
    </div>
  );
};

export default HomePage;
```

### not-found.tsx

```tsx
// we're using onClick to navigate to the home page
"use client";

import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Image
        priority={true}
        // public/images/logo.svg
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
      />
      <div className="p-6 rounded-lg shadow-md w-1/3 text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        {/* destructive is red */}
        <p className="text-destructive">Could not find requested resource</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => (window.location.href = "/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
```

TODO - why does this have to be client side?? Maybe it is faster / preferable? It could easily be server side?

2.7 Responsive Sheet Menu

[shadcn sheet](https://ui.shadcn.com/docs/components/sheet)

This is for a smaller screen and the 3 dots, menu 'sheet' that flys in.

`pnpm dlx shadcn@latest add sheet `

```tsx
// components/shared/header/menu.tsx
import { EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import ModeToggle from './mode-toggle';

const Menu = () => {
  return (
    <>
      <div className="flex justify-end gap-3">
        <nav className="md:flex hidden w-full max-w-xs gap-1">
          {/* Light and dark mode toggle */}
          <ModeToggle />

          {/* Cart button */}
          <Button asChild variant="ghost">
            <Link href="/cart">
              {/* Shopping cart icon */}
              <ShoppingCart />
              Cart
            </Link>
          </Button>

          {/* Sign in button */}
          <Button asChild>
            <Link href="/sign-in">
              {/* User icon */}
              <UserIcon />
              Sign In
            </Link>
          </Button>
        </nav>

        {/* sheet component for mobile */}
        <nav className="md:hidden">
          <Sheet>
            <SheetTrigger className="align-middle">
              {/* the vertical dots */}
              <EllipsisVertical />
            </SheetTrigger>
            {/* the sheet menu content */}
            <SheetContent className="flex flex-col items-start">
              <SheetTitle>Menu</SheetTitle>
              {/* light and dark mode toggle */}
              <ModeToggle />
              {/* cart button */}
              <Button asChild variant="ghost">
                <Link href="/cart">
                  <ShoppingCart />
                  Cart
                </Link>
              </Button>
              {/* sign in button - will be in another component soon*/}
              <Button asChild>
                <Link href="/sign-in">
                  <UserIcon />
                  Sign In
                </Link>
              </Button>
              {/* need description for the sheet otherwise get a warning */}
              <SheetDescription></SheetDescription>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default Menu;
```

and then called from 

```tsx
// components/shared/header/index.tsx
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
const Header = () => {
  return (
    // tailwind is flex columns of width full.
    //  border-b is a border on the bottom of the element.
    <header className="w-full border-b">
      {/* flex-between is a custom class */}
      {/* flex justify-between items-center; */}
      <div className="wrapper flex-between">
        {/* logo on left hand side */}
        <div className="flex-start">
          <Link href="/" className="flex-start">
            {/* public/images/logo.svg */}
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority={true}
            />
            {/* show on large screens and up */}
            <span className="hidden lg:block font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
        </div>

        {/* Right hand side menu in its own component */}
        <Menu />
        
      </div>
    </header>
  );
};

export default Header;
```

[![alt text](/assets/2025-03-19/4.jpg "email"){:width="500px"}](/assets/2025-03-19/4.jpg) 
There is something a bit off with html styles but all conceptually fine for now (and working!)

## 2.9 List Sample Products


```ts
// simple js objects so we don't need to connect to a db yet
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
// ...
```

then 

```tsx
// components/shared/product/product-list.tsx
// sfc

// any is used because later we will create a product type (zod?)
// title is optional so use a ?
// limit is optional and a number
const ProductList = ({ data, title, limit }: { data: any; title?: string; limit?: number }) => {
  // if limit is provided, slice the data to the limit
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        // mobile - 1 column then 2,3,4 columns on larger screens
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product: any) => (
            <div>{product.name}</div>
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

and wired up the home page:

```tsx
// app/(root)/page.tsx
import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";

const HomePage = () => {
  console.log(sampleData);

  return (
      <ProductList data={sampleData.products} title="Newest Arrivals" limit={4} />
  );
};

export default HomePage;
```

## 2.10 Product Card

`pnpm dlx shadcn@latest add card`

```tsx
// components/shared/product/product-card.tsx
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.slug}`}>
          <Image
            priority={true}
            src={product.images![0]}
            alt={product.name}
            className='aspect-square object-cover rounded'
            height={300}
            width={300}
          />
        </Link>
      </CardHeader>
      <CardContent className='p-4 grid gap-4'>
          <div className='text-xs'>{product.brand}</div>
          <Link href={`/product/${product.slug}`}>
            <h2 className='text-sm font-medium'>{product.name}</h2>
          </Link>
        <div className='flex-between gap-4'>
          <p>{product.rating} stars</p>
          {product.stock > 0 ? (
            <p className='font-bold'>${product.price}</p>
          ) : (
            <p className='text-destructive'>Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
```

and this is called from `product-list.tsx`

```tsx
// components/shared/product/product-list.tsx
import ProductCard from './product-card';

// any is used because later we will create a product type (zod?)
// title is optional so use a ?
// limit is optional and a number
const ProductList = ({ data, title, limit }: { data: any; title?: string; limit?: number }) => {
  // if limit is provided, slice the data to the limit
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        // mobile - 1 column then 2,3,4 columns on larger screens
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product: any) => (
            // <div>{product.name}</div>
            // need a unique key for each product otherwise error
            <ProductCard key={product.slug} product={product} />
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

[![alt text](/assets/2025-03-19/5.jpg "email"){:width="800px"}](/assets/2025-03-19/5.jpg) 

So looking good using shadui!

But there is a lot of complexity and files (components) all over the place.


## 2.11 Product Price Component

```tsx
// components/shared/product/product-price.tsx
// sfc
import { cn } from "@/lib/utils";

// takes a value and a className
// types of number and classname is optional and a string
const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  // Ensure two decimal places
  const stringValue = value.toFixed(2);

  // Get the int/float ie 23 and 99 for $23.99
  // destructure the integer and decimal with brackets
  const [intValue, floatValue] = stringValue.split(".");

  // always want to return a class of 2xl, but optionally another class
  // use utility function in lib/utils for dunmaic classes
  return (
    <p className={cn("text-2xl", className)}>
        {/* dollar sign is smaller and up the top */}
      <span className="text-xs align-super">$</span>
      {intValue}
      {/* float is smaller and up the top */}
      <span className="text-xs align-super">.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
```

and called from 

```tsx
// components/shared/product/product-card.tsx
import ProductPrice from "./product-price";
// ...
 <ProductPrice value={Number(product.price)} />
```

[![alt text](/assets/2025-03-19/6.jpg "email"){:width="800px"}](/assets/2025-03-19/6.jpg) 

Now we have the small dollar sign and cents.

### Summary so far 

- pnpm for dependencies
- Tailwind v4 for CSS
- Prettier for code formatting great - shift alt F.
-scaffolding out the UI first out of components from [shadcn](https://ui.shadcn.com/)
- everything is server side rendered apart from when need hooks eg for changing the `mode-toggle` light and dark theme 
- lucide.dev for icons
- a lot of small files containing components (which I'm not liking) - complexity. But maybe they will be reused and make it worth it.
- a lot of files names page.tsx and layout.tsx. hard to navigate
- deep structure eg components/shared/product/product-list.tsx - simplify?


## 3.1 Database intro

- Neon for cloud Postgres (I have used Supabase)
- Prisma for ORM
- Schema and Models that define... 
- Then can run Migrations that will create db tables
- Seed data
- Zod schema validation type validator
- Home and details page

## 3.2 PostgreSQL and Prisma Setup

[https://neon.tech/pricing](https://neon.tech/pricing) - 10 projects. 10 branches. Max time on non-primary branch: 5 hours.  0.5GB storage, 190 compute hours.

Vercel, Integrations, Storage - Neon or Supabase are the Postgres options.

London, wprostore-db

So, interesting I've created a db, but not inside any project in Vercel.


### Prisma

[https://www.prisma.io/](https://www.prisma.io/) - ORM.

```bash
# dev dependency
pnpm install prisma --save-dev
pnpm install @prisma/client --save-dev

# to remove a package (I didn't install as a dev dependency)
pnpm remove @prisma/client

# pnpm update available 10.6.1 -> 10.6.5  on 20th March 20205
# I got this but the update worked!
# Nothing to stop. No server is running for the store at /home/dave/.local/share/pnpm/store/v10
pnpm self-update

# generated prisma/schema.prisma
# put in DATABASE_URL in .env
# need to get from neon (the normal one with pgbouncer)!!!
pnpx prisma init
```

Using prisma exention for vscode.

So just a code formatter for `.prisma` files

Ctrl Shift P, Preferences open user settings [JSON]

```json
 "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  }
```

## 3.3 Prisma Models and Migrations

schema - all together

each definition eg User is a model

```json
// prisma/schema.prisma
// this whole file is the Schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// this is a Model
model Product {
  // @id means this is the primary key
  // @default(dbgenerated("")) means this is a db generated UUID with a type of db UUID
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String
  // Each model must have 1 unique field
  // index on the db
  slug        String   @unique(map: "product_slug_idx")
  category    String
  images      String[]
  brand       String
  description String
  stock       Int
  // DM - I prefer to use Int and cents for prices
  price       Decimal  @default(0) @db.Decimal(12, 2)
  rating      Decimal  @default(0) @db.Decimal(3, 2)
  runReviews  Int      @default(0)
  isFeatured  Boolean  @default(false)
  banner      String?

  // Timestamp(6) includes milliseconds
  createdAt DateTime @default(now()) @db.Timestamp(6)
}
```

and script to run the schema to re-gen our models before deplay:

```json
// package.json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate"
  },
```
then

```bash
# generated prisma client in node_mofules
pnpx prisma generate

# creates the prisma/migrations/timestamp_init/migration.sql file
# runs it on the database!
pnpm prisma migrate dev --name init

# http://localhost:5555/
# can view live data, create, delete rows
pnpx prisma studio
```

## 3.4 Seed Sample Data


```ts
import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: sampleData.products,
  });

  console.log("Database seeded successfully");
}

main();
```

then to run

```bash
# am getting strange error about can't find
# DATABASE_URL - but it is in the root .env file
# error: Environment variable not found: DATABASE_URL.
pnpx tsx ./db/seed

# had to run 
# This will re-establish the link between schema.prisma and .env file.
pnpx prisma generate

# I had to update the db as typo in prisma.schema
pnpm prisma migrate dev --name numReviews

pnpx tsx ./db/seed

# check out seeded data
pnpx prisma studio
```

## 3.5 Fetch data from DB

Going to be using `Server Actions` - just async functions which are executed on the server.

We're going to get the form to post to a server action.

We'll just use an event to fetch data...mind bend!! Or we'll stick in straight in a component (which is server rendered)

Better than using API routes which is what would have been done in pre Next.js v14 land. API routes still useful if we have a mobile app and a webapp which want to use the same backend. For a monolithic app, then server actions are better/simpler.


```ts
// lib/actions/product.actions.ts
"use server";

import { PrismaClient } from "@prisma/client";

// Get latest products

export const getLatestProducts = async () => {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
  // this is a prisma object
  return data;
};
```

and from the homepage


```tsx
// app/(root)/page.tsx
// import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";

// import the action
import { getLatestProducts } from "@/lib/actions/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  // console.log(sampleData);

  return (
    // <ProductList data={sampleData.products} title="Newest Arrivals" limit={4} />
    <ProductList data={latestProducts} title="Newest Arrivals" />
  );
};

export default HomePage;
```

It works! But am getting an error due to decimal type, so lets convert the prisma object to a js object using a wrapper function.

```ts
// lib/utils.ts
// Convert a prisma object to a JS object
// TS generic - T is placeholder eg a string, object, prisma object
// return type is same as input type
// eg if a product object, should be a product object returned
export const convertToPlainObject = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};
```

and using on the server action:

```ts
// lib/actions/product.actions.ts

  // convert prisma object to plain JS object
  return convertToPlainObject(data);
```

## 3.6 Zod - Validation

Currently we're using the `any` type eg in 

A product-list contains a product-card which contains a product-price.

```tsx
// components/product/product-card.tsx

// input to the arrow function is product of type any
// there is no output
const ProductCard = ({ product }: { product: any }) => {
```

So when we call the React component ProductCard with a prop like this:

```tsx
// shared/product/product-list.tsc
// pass to product card a product js object.
<ProductCard key={product.slug} product={product} />
```

[https://zod.dev/](https://zod.dev/)

```ts
// types/index.ts
import { z, ZodIntersection } from "zod";
import { insertProductSchema } from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
}
```

install zod

```bash
pnpm install zod
```

```ts
// lib/validators.ts
import { z } from "zod";

const currency = z
.string()
.refine((value) => /^\d+(\.\d{2})?$/.test(value), {
  message: 'Price must have exactly 2 decimal places',
})

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  brand: z.string().min(3, 'Brand must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 1 character'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have have at least 1 image is required'),
  isFeatured: z.boolean(),
  // video said this
//   banner: z.string().optional(),
  banner: z.string().nullable(),
  price: currency,
});
```

Multiple cursor case preserve - extension.. recommends


```ts
// lib/utils.ts
// Format a number to 2 decimal places
export function formatNumberWithDecimals(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}
```

Now we can use our new type


```tsx
// components/shared/product/product-card.tsx
import { Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
```

[![alt text](/assets/2025-03-19/7.jpg "email"){:width="800px"}](/assets/2025-03-19/7.jpg) 

We get a warning in vscode that can't find the type product.slug if the zod schema doesn't define it. File turns red in tree layout to show problems.

However the app still ran.. it was a banner type problem.


## 3.7 Serverless Environment Config

[Neon Serverless driver](https://neon.tech/docs/serverless/serverless-driver)

Vercel is a serverless (just means multi servers?) environment. We need some config to help

Neon Serverless driver supports Connect to the db via WebSockets

Traditionally db's maintained persistent TCP connections, but serverless is designed to scale, so can't persist connections between invocations.

- Neon - need to install serverless driver
- Prisma adapter
- WebSockets package

```bash
# 0.10.4 on 21st Mar 25
pnpm i @neondatabase/serverless 
# 6.5.0 on 21st Mar 25
pnpm i @prisma/adapter-neon
# 8.18.1
pnpm i ws

# dev dependencies
# 8.18.0
pnpm i @types/ws --save-dev

# 4.0.9
pnpm i bufferutil --save-dev
```

To use the prisma adaper 

```json
// prisma/schema.adapter

generator client {
  provider = "prisma-client-js"
  // so can use the prisma adapter for neon
  // which will allow websockets
  previewFeatures = ["driverAdapters"]
}
```

then 

```bash
# when we change the prisma schema adapter need to regenerate
pnpmx prisma generate
```

then need some config

```ts
// db/prisma.ts
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
const pool = new Pool({ connectionString });

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon(pool);

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
```

Notice above we're instantiating the client. So we can use this in our server function so don't have to new up each time:

```ts
// lib/actions/product.actions.ts
// import { PrismaClient } from "@prisma/client";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get latest products
export const getLatestProducts = async () => {
//   const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });
  // convert prisma object to plain JS object
  return convertToPlainObject(data);
};
```

Nice wrapper.

If problems delete the `.next` folder and rerun `pnpm dev`

TODO - is there something similar for Supabase? I've just used raw TCP connections when need a transaction... otherwise pooler.. find out best practise here.

[Looks good](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/database/connecting-to-postgres/serverless-drivers.mdx)

[reddit complexity](https://www.reddit.com/r/nextjs/comments/1hwd49d/the_best_way_to_use_supabase_with_vercel_nextjs/)

Chat about rpc above

## 3.8 Product Details Page


```ts
// lib/actions/product.actions.ts

// Get single product by slug
export const getProductBySlug = async (slug: string) => {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
};
```

create a new page to handing the dynamic slug routing

[http://localhost:3000/product/polo-sporting-stretch-shirt](http://localhost:3000/product/polo-sporting-stretch-shirt)

In Next 15 it is a bit different to get the query params (not search params which are after the ?)

```tsx
// app/(root)/product/[slug]/page.tsx
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";

const ProductDetailPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);

  if (!product) notFound(); 

  return <div>{product.name}</div>;
};

export default ProductDetailPage;
```

`pnpx shadcn@latest add badge`

and now some more UI code to display the product details page:

```tsx
// app/(root)/product/[slug]/page.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductPrice from "@/components/shared/product/product-price";

import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";

const ProductDetailPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            {/* <ProductImages images={product.images} /> */}
          </div>
          {/* Details Column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              {/* <Rating value={Number(product.rating)} /> */}
              <p>{product.numReviews} reviews</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <ProductPrice
                  value={Number(product.price)}
                  className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/* Action Column */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>Price</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant="outline">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out Of Stock</Badge>
                  )}
                </div>
                {/* {product.stock > 0 && (
                  <div className="flex-center">
                    <AddToCart
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images![0],
                      }}
                    />
                  </div>
                )} */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="h2-bold mb-5">Customer Reviews</h2>
        {/* <ReviewList
          userId={userId || ""}
          productId={product.id}
          productSlug={product.slug}
        /> */}
      </section>
    </>
  );
};

export default ProductDetailPage;
```


[![alt text](/assets/2025-03-19/8.jpg "email"){:width="800px"}](/assets/2025-03-19/8.jpg) 

Coming together well using shadcn/ui components and flex and tailwind. DB calls happening from dev to live db using websockets (probably) and prisma ORM

## 3.9 Images

```tsx
// components/shared/product/product-images.tsx
// take in a prop of images (an array of strings)
//  and return a list of images
const ProductImages = ({ images }: { images: string[] }) => {
    // console.log(images);
    return (
        <>pimages</>
    );
}
 
export default ProductImages;
```

and wire this up to the product detail page:

```tsx
// app/(root)/product/[slug]/page.tsx
import ProductImages from "@/components/shared/product/product-images";
///...

const ProductDetailPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>
```

Interestingly we're going to set the product-images component to be `use client` as we're going to use a `useState` hook.


[![alt text](/assets/2025-03-19/9.jpg "email"){:width="800px"}](/assets/2025-03-19/9.jpg) 

So it works and when I click on an image it changes on the client.

## 3.10 Initial Deployment

```bash
# to see if it works!
# goes through eslint rules - very useful
pnpm run build 
# nice shortcut
pnpm build

## next.config.ts
## if errors annoying, then add
ignoreBuildErrors: true
```

Add new project to vercel

Paste in the .env text into `Environment Variables` section of the inital setup form - nice!

Once deployed get the url and put into settings, environment variables and update the env setting.

My DB is in London and webserver on the East Coast. Let's try to deploy the webserver to London:

[https://vercel.com/docs/project-configuration#regions](https://vercel.com/docs/project-configuration#regions)


[Region List](https://vercel.com/docs/edge-network/regions#region-list)

```json
// vercel.json
{
  "regions": ["lhr1"]
}
```


4.1 Authentication

[https://authjs.dev/](https://authjs.dev/) was called NextAuth.js 

[https://authjs.dev/getting-started/adapters/prisma#schema](https://authjs.dev/getting-started/adapters/prisma#schema)

There is good detail in here on edge compatibility and specific driver types eg for Neon.


```tsx
// prisma/schema.prisma

model User {
  id            String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name          String    @default("NO_NAME")
  email         String    @unique(map: "user_email_idx")
  // optional eg no password for magic link 
  password      String?
  // user or admin
  role          String    @default("user")
  emailVerified DateTime? @db.Timestamp(6)
  image         String?
  // notice the Json type
  address       Json?     @db.Json
  // paypal, stripe, COD
  paymentMethod String?
  createdAt     DateTime  @default(now()) @db.Timestamp(6)
  updatedAt     DateTime  @updatedAt
  // add account field here so the 1 to many relationship is created
  // ie 1 user can have many accounts eg Email, Google
  account       Account[]
  // 1 user can have many sessions eg multiple devices
  session       Session[]
}

// eg Google OAuth, Email 
model Account {
  // the FK back to the User model
  userId            String  @db.Uuid
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // user field is mapped to the User model
  user User @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "account_userId_user_id_fk")

  // a composite unique primary key
  // eg Google, then an id from Google.
  @@id([provider, providerAccountId], map: "account_provider_providerAccountId_pk")
}

// eg session token
model Session {
  // the PK
  sessionToken String   @id
  userId       String   @db.Uuid
  expires      DateTime @db.Timestamp(6)
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "session_userId_user_id_fk")
}

// what no relation to User??
model VerificationToken {
  identifier String
  token      String
  expires    DateTime

  // a composite unique primary key
  @@id([identifier, token])
}
```

then

```bash
# as we've edited the prisma schema we need to regenerate our prisma client
# with these new models
pnpx prisma generate

# also need to create the migrations to create the tables
# this will physically run the mnigration on the db
pnpx prisma migrate dev --name add_user_based_tables

pnpx prisma studio

```

## 4.2 Sample Data

Using `bcrypt-ts-edge` which will be useful for later as using Vercel Edge Function (similar to Cloudflare Worker) that don't support Node. ie is is just TypeScript.

[npmjs.com package](https://www.npmjs.com/package/bcrypt-ts-edge) and 2 years old. Only 1000 downloads per week. 

This strategy doesn't seem that well used.

Interestingly [nextjs.org/learn](https://nextjs.org/learn/dashboard-app/adding-authentication) uses Auth.js and bcrypt. I found I had to use [bcryptjs](https://www.npmjs.com/package/bcryptjs) which has 2.7m weekly downloads. Looks like bcrypt-ts-edge is similar...forked? 


```bash
# 3.0.1 on 25th Mar 2025
pnpm install bcrypt-ts-edge
```

add in sample data:

```ts
// db/sample-data.ts
import { hashSync } from 'bcrypt-ts-edge'; 

const sampleData = {

  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: hashSync('123456', 10),
      role: 'admin',
    },
    {
      name: 'Jane',
      email: 'jane@example.com',
      password: hashSync('123456', 10),
      role: 'user',
    },
  ],
```

10 is salt rounds - a salt is a random value added to the password before hashing it to amke it more secure. So even if 2 users have the same password, the hash outputs are different. 10 is the complexity of the process.


and update the ts file we will run

```ts
// db/seed.ts
import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });

  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successfully");
}

main();
```

and lets run it

```bash
pnpx tsx ./db/seed

pnpm prisma studio
```

[![alt text](/assets/2025-03-19/10.jpg "email"){:width="800px"}](/assets/2025-03-19/10.jpg) 

The hashed passwords are different (even though they are the same 123456) because of the salt.


## 4.3 Setup Auth.js


## FOO


Thoughts so far

- pnpm is faster
- I've got 15.2.3 running using this method (15.2.1 on learn example which I can't upgrade)
- Tailwind v4 has just been released and caused breaking changes
- (root) layout


- Naming of files is annoying - lots of page.tsx, index.tsx, layout.tsx. Can't jump straight to files I want.

- there is a lot of complexity and files (components) all over the place.

select with mouse and ctrl c (not insert mode)
ctrl v (insert mode)

move away from auth using edge functions.

Are vercel and cloud db... really worth it?
 - how about a VM running everything?




<!-- [![alt text](/assets/2025-03-19/1.jpg "email"){:width="500px"}](/assets/2025-03-19/1.jpg)  -->