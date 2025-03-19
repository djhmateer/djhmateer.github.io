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

## 1.2

[https://prostore-one.vercel.app/](https://prostore-one.vercel.app/)

Prisma studio is a web UI for the db


## 1.3

Prettier (55m) eg puts in forgotton semicolons, or fixes spaces


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

