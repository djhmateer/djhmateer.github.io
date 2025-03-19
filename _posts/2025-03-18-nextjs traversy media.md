---
layout: post
title: Next.js 
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

`app/(root)` layout and there will be an (admin) layout

Parenthesis is a group


