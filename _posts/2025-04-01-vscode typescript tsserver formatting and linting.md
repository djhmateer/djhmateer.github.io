---
layout: post
title: VSCode TypeScript tsserver Prettier and ESlint
description:
# menu: review
categories: typescript
published: true
comments: false
sitemap: false
image: /assets/2024-11-12/1.jpg
---

<!-- [![alt text](/assets/2025-03-05/2.jpg "email"){:width="700px"}](/assets/2025-03-05/2.jpg)  -->

A look into how [TypeScript](https://www.typescriptlang.org/) validation works in VSCode/Cursor

1. Language Server - tsc
2. Code Formatter - Prettier
3. Linter - ESLint

Code repo [https://github.com/djhmateer/ts-testing](https://github.com/djhmateer/ts-testing)

## Language Server

<!-- [![alt text](/assets/2025-04-03/2.jpg "email"){:width="700px"}](/assets/2025-04-03/2.jpg)  -->

VSCode / Cursor integrates with TypeScript via the Language Server Protocol using a Node.js based language server called tsserver. [More Detail on MS Github](https://github.com/microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29#visual-studio-code)

[![alt text](/assets/2025-04-03/2.jpg "email")](/assets/2025-04-03/2.jpg)

Above tsserver giving an error that the constant cannot be reassigned.

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

I like keeping the _star_ synatx rather then _underscore_ markdown syntax, which I can't find an easy way to fix. 

## Linter

Linting analyses code without executing it, identifying possible errors, bugs.

[ESLint](https://eslint.org/) - JavaScript! Statically analyses your code to find problems.

```bash
# eslint 9.23.0
# pnpm 10.7.0
# Generates a package.json (if not there)
pnpm install eslint

pnpx eslint --init
```

[![alt text](/assets/2025-04-03/5.jpg "email")](/assets/2025-04-03/5.jpg)

Unused value found above.

[![alt text](/assets/2025-04-03/6.jpg "email")](/assets/2025-04-03/6.jpg)

Ctrl+Shift+M to see problems panel to give a summary of tsc and linting issues.

Successfully got linting working with eslint, TypeScript project,
