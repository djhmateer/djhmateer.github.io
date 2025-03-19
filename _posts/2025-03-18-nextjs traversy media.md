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




[![alt text](/assets/2025-03-19/2.jpg "email"){:width="600px"}](/assets/2025-03-19/2.jpg) 






## FOO

Thoughts so far

- pnpm is faster
- I've got 15.2.3 running using this method (15.2.1 on learn example which I can't upgrade)
- Tailwind v4 has just been released and caused breaking changes
- (root) layout


- Naming of files is annoying - lots of page.tsx, index.tsx, layout.tsx. Can't jump straight to files I want.


select with mouse and ctrl c (not insert mode)
ctrl v (insert mode)

