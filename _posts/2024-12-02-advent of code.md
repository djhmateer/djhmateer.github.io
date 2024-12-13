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

## AOC Day 1

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

Better but still a bit laggy.. 0.92s is normal with no code changes. On more powerful desktop machine it is 0.38s / 0.29s with changes / no changes.

## Day 1 Part 1

```ts
// AoC Day 1 - Part 1

// fs is a built-in module in Node.js for file system operations
// "@types/node": "^22.10.1" for dev dependencies
import * as fs from 'fs';

// Read the file synchronously into immutable string
// need utf-8 to avoid returning a buffer (for binary files)
const fileContent: string = fs.readFileSync('1full.txt', 'utf-8');

// Parse the file content into a 2D array of numbers
// no error checking or validation here 
// brevity over robustness
const data: number[][] = fileContent
    .split('\n')               // Split the content into lines
    .map(line =>               // Process each line
         line.split(/\s+/)     // Split the line by one or more whitespace characters
             .map(Number)      // Convert each part into a number
    );

// Test data to help build program
// const datab: number[][] = [
//       [3, 4],
//       [4, 3],
//       [2, 5],
//       [1, 3],
//       [3, 9],
//       [3, 3]
//   ];

// Extract the first column (left list) and second column (right list)
const leftList: number[] = data.map(row => row[0]); // [3, 4, 2, 1, 3, 3]
const rightList = data.map(row => row[1]); // [4, 3, 5, 3, 9, 3]

// this mutates the original array!
// The array's contents can be modified, but the reference itself cannot point to a new array. 
// const leftListSorted = leftList.sort((a, b) => a - b); // [1, 2, 3, 3, 3, 4]

// ...  spread operator makes a shallow copy of leftList
// so as not to mutate the original array
const leftListSorted = [...leftList].sort((a, b) => a - b); // [1, 2, 3, 3, 3, 4]
const rightListSorted =[...rightList].sort((a, b) => a - b); // [3, 3, 3, 4, 5, 9]

// Calculate the differences and sum them up
let totalDifference = 0;

for (let i = 0; i < leftListSorted.length; i++) {
    const difference = Math.abs(leftListSorted[i] - rightListSorted[i]);
    totalDifference += difference;
    console.log(`Difference between element ${i + 1}: ${difference}`);
}

// The answer 
console.log(`Total difference: ${totalDifference}`);
```

## Const

Const ensures the variable binding cannot be reassigned to a different value.  eg cannot assign data to another array 

Const Arrays can be sorted, pop'd, pushed in place.


Strings are immutable with `const` ie any change could create a new string, thus with const can't be changed

## Immutability

Could use external libraries like `immutable.js` to help

## Part 2

```ts
// How many times does the number 1 appear in the right list
// eg first number 3 appears 3 times in right list
// so similarity score is 3 * 3 = 9
// 4 is 4 * 1 = 4
// 2 is 2 * 0 = 0

let totalSimilarityScore = 0;

for (let i = 0; i < leftList.length; i++) {
    const numberToFind = leftList[i];
    
    // Count how many times the current number appears in the right list
    const countInRightList = rightList.filter(x => x === numberToFind).length;
    
    // Calculate the similarity score for the current number
    const similarityScore = numberToFind * countInRightList;
    
    // Add the similarity score to the total
    totalSimilarityScore += similarityScore;
}

// smilarity score is 31 for test data
// real answer 21328497
console.log(`Total similarity score: ${totalSimilarityScore}`);
```
classic way of iterating

```ts
// ES6 way to iterate over arrays, strings, maps, etc.
for (const numberToFind of leftList) {
    // Count occurrences of the current number in the right list
    const countInRightList = rightList
        .filter(value => value === numberToFind)
        .length;

    // Calculate and add the similarity score for this number
    totalSimilarityScore += numberToFind * countInRightList;
}
```

I like this easy to understand and well commented code.

## Day 2

Prettier code formatter - after doing `Shift Alt F` to format, I couldn't go back to VS code formatter `Ctrl ,` settings then. So I uninstalled prettier

- make it work
- make it right
- makt it fast

Here is my code which I refactored through ChatGPT.

- Focus on the art of beautiful code
- Favoured understandability over brevity eg no &&, no functions
- Explicitly declared variables as can be undefined as this is their startig state


```ts
// kebab-case.ts for filenames
import * as fs from "fs";

const fileContent: string = fs.readFileSync('2.txt', 'utf-8');

const data: number[][] = fileContent
  .split('\n')            // Split the content into lines
  .map(line =>            // Process each line
    line.split(/\s+/)     // Split the line by one or more whitespace characters
        .map(Number)      // Convert each part into a number
  );


// const data: number[][] = [
//   [7, 6, 4, 2, 1],
//   [1, 2, 7, 8, 9],
//   [9, 7, 6, 2, 1],
//   [1, 3, 2, 4, 5],
//   [8, 6, 4, 4, 1],
//   [1, 3, 6, 7, 9],
// ];

// PascalCase for class names and types
type Direction = "flat" | "up" | "down";

// camelCase for variables and functions
let totalSafe = 0;

// Take each row into an array
for (const row of data) {

  let rowSafe = true; // Track if the current row is safe
  let lastElement: number | undefined; // Previous element in the row
  let lastDirection: Direction | undefined; // Previous direction

  // Iterate over each element in the row
  for (let i = 0; i < row.length; i++) {
    const element = row[i];

    if (i === 0) {
      // Initialize the first element and continue to the next
      lastElement = element;
      continue; 
    }

    // 1. Current element is smaller than the last
    if (element < lastElement) {
      if (i > 1) {
        if (lastDirection != "down") {
          rowSafe = false;
          // break out of the loop as the row is not safe becuase the direction is not down
          break;
        }
      }

      const difference = lastElement - element;
      if (difference > 3) {
        rowSafe = false; // Unsafe due to a difference greater than 3
        break;
      }
      lastElement = element;
      lastDirection = "down";
    }

    // 2. Element is larger than the last element
    else if (element > lastElement) {
      if (i > 1) {
        if (lastDirection != "up") {
          rowSafe = false; // Unsafe due to a inconsistent direction with last element
          break;
        }
      }

      const difference = element - lastElement;
      if (difference > 3) {
        rowSafe = false; // Unsafe due to a difference greater than 3
        break
      }
      lastElement = element;
      lastDirection = "up";
    }

    // Element is the same as the last element
    else {
      rowSafe = false; // Unsafe due to consecutive identical elements
      break;
    }
  }

  if (rowSafe) {
    totalSafe += 1;
  }
}

console.log(`Total safe rows: ${totalSafe}`);
```

## Day 2 Part 2

Using ChatGPT to help with syntax - actually GH Copilot guessed I needed the splice remove function. What a superpower!

Interestingly GPT 4o and 01-preview thought there was a bug as I wasn't catching a case where [7,7,1,2,3] but I am.

```ts
import * as fs from "fs";

const fileContent: string = fs.readFileSync('2.txt', 'utf-8');

const data: number[][] = fileContent
  .split('\n')            // Split the content into lines
  .map(line =>            // Process each line
    line.split(/\s+/)     // Split the line by one or more whitespace characters
        .map(Number)      // Convert each part into a number
  );


// const data: number[][] = [
//   [7, 6, 4, 2, 1],
//   [1, 2, 7, 8, 9],
//   [9, 7, 6, 2, 1],
//   [1, 3, 2, 4, 5],
//   [8, 6, 4, 4, 1],
//   [1, 3, 6, 7, 9],
// ];

type Direction = "flat" | "up" | "down";

let totalSafe = 0;

// Take each row into an array
for (const row of data) {

  // Part 2 - Problem Dampener.
  //  make new array with take out 0 then first etc.. elements... to see if it is safe
  //  if safe then exit

  // A section
  for (let j = -1; j < row.length; j++) {
    const rowCopy = [...row]; // Make copy of array

    if (j === -1) {
      // Do nothing skip the first element as want to leave array as is to see if safe
    } else {
      rowCopy.splice(j, 1); // Remove element at index j to see if problem dampener works
    }

    let rowSafe = true; // Track if the current row is safe
    let lastElement: number | undefined; // Previous element in the row
    let lastDirection: Direction | undefined; // Previous direction

    // B section
    // Iterate over each element in rowCopy 
    for (let i = 0; i < rowCopy.length; i++) {
      const element = rowCopy[i];

      if (i === 0) {
        // Initialize the first element and continue to the next
        lastElement = element;
        continue;
      }

      // 1. Current element is smaller than the last
      if (element < lastElement) {
        if (i > 1) {
          if (lastDirection != "down") {
            rowSafe = false;
            // break out of the B loop as the row is not safe because the direction is not down
            break;
          }
        }

        const difference = lastElement - element;
        if (difference > 3) {
          rowSafe = false; // Unsafe due to a difference greater than 3
          break;
        }
        lastElement = element;
        lastDirection = "down";
      }

      // 2. Current element is larger than the last element
      else if (element > lastElement) {
        if (i > 1) {
          if (lastDirection != "up") {
            rowSafe = false; // Unsafe due to a inconsistent direction with last element
            break;
          }
        }

        const difference = element - lastElement;
        if (difference > 3) {
          rowSafe = false; // Unsafe due to a difference greater than 3
          break
        }
        lastElement = element;
        lastDirection = "up";
      }

      // Current element is the same as the last element
      else {
        rowSafe = false; // Unsafe due to consecutive identical elements
        break;
      }
    }

    if (rowSafe) {
      totalSafe += 1;
      break; // Exit out of A loop as row is safe
    }
  } // end of B section
} // end of A section

// 561
console.log(`Total safe rows: ${totalSafe}`);
```

Am favouring more declaritive programming style as it makes it easier to reason about (IMO), and debug.

But this is getting verbose, so time to abstract out logic into functions.

Interestingly I've found it quite simple to step through this screenful of code and write logic. Not too congnitibely abstract.

**todo - lets find others solution in TS**

## Day 3 - regex

[Day 3](https://github.com/djhmateer/aoc/blob/main/3.ts)

ChatGPT is pretty good at getting regex's


## Day 3 - part 2 - pop and push

[Day 3 part 2](https://github.com/djhmateer/aoc/blob/main/3part2.ts)

Splitting apart a problem into very small steps was worth it here. It really helped me figure out and understand the problem.

## Day 4

Rename symbol shortcut - F2

Quick fix copilot - ctrl .

Got an issue where the debugger was going to the .js file whilst stepping through code:

```ts

let counter = 0;
// 1. make a string - horizontal
for (let rowNumber = 0; rowNumber < data.length; rowNumber++) {

    // why does debugger go into the js file here?
    const stringToCheck: string = data[rowNumber].join('');

    let xmasIndex = stringToCheck.indexOf('XMAS');
    console.log(xmasIndex);

    while (xmasIndex > -1) {
        counter++;
        // Continue searching from the next position after the current match
        xmasIndex = stringToCheck.indexOf('XMAS', xmasIndex + 1);
    }

}
```

the out/4.js.map file looks like it is generated fine.

had conflicting foo variable in differet scopes 

Making a function 
