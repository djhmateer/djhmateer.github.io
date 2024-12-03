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

## JavaScript / TypeScript

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
// be careful with commenting things out - there are no comments in json 
// and build process just fails
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


```ts
// fs is a built-in module in Node.js for file system operations
// "@types/node": "^22.10.1" for dev dependencies
import * as fs from 'fs';

// Read the file synchronously
const fileContent = fs.readFileSync('1.txt', 'utf-8');

// Split the content into lines and map into an array of arrays
const data: number[][] = fileContent
  .trim() // Remove extra newlines or spaces
  .split('\n') // Split by lines
  .map(line => line.split(/\s+/).map(Number)); // Split each line by spaces and convert to numbers

// Iterate over the data
for (const [a, b] of data) {
  console.log(`a: ${a}, b: ${b}`);
}
```

and `1.txt`

```txt
3   4
4   3
2   5
1   3
3   9
3   3
```

I noticed that in 

```json
// tsconfig.json
// **comments are bad here!!!**
{
  "compilerOptions": {
    // "target": "ES5",
    "target": "ESNext",
    "module": "CommonJS",
    "outDir": "out",
    "sourceMap": true,
    "moduleResolution": "Node",
    "types": [
      "node"
    ]
  }
}
```

This ran (albeit with warnings in VSCode about not being able to find module `fs`). But if I targeted ES5 then tsc didn't know about the node module. So I have to import it using package.json.

```json
{
  "devDependencies": {
    "@types/node": "^22.10.1"
  }
}
```


## Compile Time

Annoying compile time lag

```bash
npx tsc --extendedDiagnostics

Files:                         149
...
Total time:                  5.06s
```
and now doing on WSL side

```
Files:                        149
Program time:               0.99s
...
Bind time:                  0.33s
Total time:                 1.32s
```

Better but still a bit laggy. Here it is on my more powerful desktop machine:

```bash
```


