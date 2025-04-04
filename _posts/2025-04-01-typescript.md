---
layout: post
title: Typescript
description:
menu: review
categories: typescript
published: true
comments: false
sitemap: false
image: /assets/2024-11-12/1.jpg
---

<!-- [![alt text](/assets/2025-03-05/2.jpg "email"){:width="700px"}](/assets/2025-03-05/2.jpg)  -->

code repo is in ~/code/ts-testing

[TypeScript](https://www.typescriptlang.org/) is JaveScript with syntax for types.

## Language Server

<!-- [![alt text](/assets/2025-04-03/2.jpg "email"){:width="700px"}](/assets/2025-04-03/2.jpg)  -->

VSCode / Cursor integrates with TypeScript via the Language Server Protocol using a Node.js based language server called tsserver. [More Deatil on MS Github](https://github.com/microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29#visual-studio-code)

[![alt text](/assets/2025-04-03/2.jpg "email")](/assets/2025-04-03/2.jpg)

tsserver giving an error that the constant cannot be reassigned.

- IntelliSense - autocompletion, parameter hints, type information
- Diagnostics (squiggly lines) - TypeScript errors and warning
- Quick fixes and refactoring
- Hover tooltips
- Navigation - go to definition, find refs..

To see what version VSCode is running for the tsserver, Ctrl+Shift+P, TypeScript: Select TypeScript Version. 4th Apr 25 is 5.7.2. Currently it is 5.8.2 on npm, and that is what will run tsc on the dev machine.

To run TS ie `tsc` we need a tsconfig.json

```bash
# default tsconfig.json
# https://www.typescriptlang.org/tsconfig/
tsc --init

# compiles .ts to .js
tsc

# runs the js
node foo.js

# or vscode should do all this with Ctrl+F5
```

<!-- [![alt text](/assets/2025-04-03/3.jpg "email"){:width="700px"}](/assets/2025-04-03/3.jpg)  -->

[![alt text](/assets/2025-04-03/3.jpg "email")](/assets/2025-04-03/3.jpg)

Manually running tsc giving the same error as the TS Language server which is what Cursor/VSCode is running.

[![alt text](/assets/2025-04-03/4.jpg "email")](/assets/2025-04-03/4.jpg)

This is failing JavaScript, which only fails at runtime. In TypeScript this produces a compile error.

Top tip for VSCode to display the Debug Console when doing Ctrl+F5 is to:

`Ctrl , or File Preferences Settings`

then

`Debug: Internal Console Always Reveal` change from openOnFirstSessionStart to openOnSessionStart.

## Code Formatter eg Prettier

<!-- [![alt text](/assets/2025-04-03/1.jpg "email"){:width="700px"}](/assets/2025-04-03/1.jpg)  -->

[![alt text](/assets/2025-04-03/1.jpg "email")](/assets/2025-04-03/1.jpg)

Prettier will fix the indentation problem, Ctrl Alt F (Format)

```ts
console.log("Hello, world!");

const bar = 1;
```

I like autosave of files, so disable format on save. Ctrl+, save, Disable format on save.

I like keeping the _star_ synatx rather then _underscore_ markdown syntax, which we can change:

## Linter
