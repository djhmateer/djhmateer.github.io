---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
#menu: review
categories: aoc
published: true 
comments: false     
sitemap: false
image: /assets/2024-11-12/1.jpg
---

<!-- !-- [![alt text](/assets/2024-09-04/1.jpg "email"){:width="500px"}](/assets/2024-09-04/1.jpg) --> 
<!-- [![alt text](/assets/2024-09-04/1.jpg "email")](/assets/2024-09-04/1.jpg) -->

[https://adventofcode.com/](https://adventofcode.com/)

For the joy of finding things out, I thought I'd try AoC

Other challenges like [Project Euler]() are [here]( https://github.com/NoelJacob/advent-and-other-calandars)

## Javascript / Typescript

I've never really tried out the JS/TS world, so this is an opportunity.

[Install notes on React helped](https://davemateer.com/2024/11/04/react) on my laptop.

```bash
# https://github.com/nvm-sh/nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 0.40.1 on 4th Nov 24
nvm --version

# Node.js (LTS) if 22.11.0 on 4th Nov 24
nvm install --lts

npm --version

npm install -g typescript

# 5.7.2 on 2nd Dev 2024
tsc -v

# run TS on Node without precompile
npm install -g tsx --verbose
```


## Hello World

```bash
# compiles to app.js
tsc app.ts

# runs the js
node app.js
```

and

```ts
let message: string = 'Hello, World!';
console.log(message);
```

which compiles to

```js
var message = 'Hello, World!';
console.log(message);
```

## Why TS?

TypeScript is a superset of JavaScript that compiles to plain JavaScript

[TypeScript tutorial](https://www.typescripttutorial.net/typescript-tutorial/why-typescript/)

- TypeScript adds a type system to help you avoid many problems with dynamic types in JavaScript.
- TypeScript implements the future features of JavaScript a.k.a ES Next so you can use them today.



## VSCode

How do I setup VSCode to run (and debug) TS?

[By default](https://code.visualstudio.com/docs/typescript/typescript-tutorial) it comes with Intellisense, Syntax Highlighting and debugging. It does not include the compiler.

```json
// tsconfig.json
// compiled to ES5 and set CommonJS modules
// output out directory for js
// sourceMap for debugging
{
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS",
    "outDir": "out",
    "sourceMap": true
  }
}
```

I can now to Ctrl F5 which runs tsc and generates the js out file and runs the program

[![alt text](/assets/2024-12-02/1.jpg "email")](/assets/2024-12-02/1.jpg)

Debug Console in VS Code - this is the output! VS Code always defaulting to the terminal output.

[![alt text](/assets/2024-12-02/2.jpg "email")](/assets/2024-12-02/2.jpg)

Annoying that ctrl F5 doesn't show the output always!

`Ctrl , or File Preferences Settings`

then

`Debug: Internal Console Always Reveal` change from openOnFirstSessionStart to openOnSessionStart... phew

## AOC 1





