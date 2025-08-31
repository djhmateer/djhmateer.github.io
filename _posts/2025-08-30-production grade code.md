---
layout: post
# title: Pull Requests 
description: 
menu: review
categories: ai 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

[![alt text](/assets/2025-08-30/6.jpg "Volcano")](/assets/2025-08-30/6.jpg)

What does great code / production grade (!) look like?

I feel it is like art.

When you see it, you know it, and you appreciate it's beauty

Great code, like art, takes time and concerted practise.


I just asked my 9 year old son what his favourite piece of art was haning on the wall. He chose immediately (the volcano)... sort of an inate choosing of which pleased him the most.


## Shows Intent to the Next Developer

I love code which is so easy to understand (has low cognitive load) that it takes no brainpower at all.

- comments
- pleasing to look at
- naming 

[cognitive load is what matters](https://news.ycombinator.com/item?id=45074248)

[do the simplest thing possible](https://news.ycombinator.com/item?id=45068091)

Let's explore how LLMs can help us be intentful with code. I'd like to treat this as trying a new tool in the artistic toolbox. Perhaps something to consider is that I've mostly worked as a solo developer on projects, and have always wanted to learn off great masters in my craft. Will LLM's help?

`Please create index.html, style.css and script.js and link them together. You are a senior professional software developer working at a tier1 (ie largest and most prestigious and competitive tech firm). Please ask any questions until you are 95% confident that you know what you are doing`

`Please just create the boilerplate for an 80s Music website - just put in the title only and hello world as the text.`

## Git

Great code also includes great use of source control.

As industry standard, I'm using git and on a trunk called main

There is a lot to consider with source control - for example great code bases typically use

- Trunk based development with short lived feature branches eg feat/login-button
- Make changes and write tests
- Open PR get it reviewed, and merge same day
- CI validates
- Deploy possilby behind feature flag

However I'm writing great production code as a single developer. So will

- Use short lived branches to work on so that when I/The LLM messes up I can revert
- Practise writing commit messages to show intent

### Message Samples

chore: initial commit.

feat(auth): add PKCE flow to OAuth client

feat(web): add passwordless login via magic links

Implements email link flow with 15‑minute token TTL and single use.
Adds rate limiting at 5 req/min/IP.

Fixes #231


### Commit Messages

`.claude-rules `

```xml
<rule name="git_commit_messages">
  Use Conventional Commit style:
  - Format: <type>(scope): <summary>
  - Types: feat, fix, refactor, docs, style, test, chore, perf
  - Summary <= 50 chars, imperative mood
  - Wrap body at 72 chars
  - Explain "what + why" in body
  - Add BREAKING CHANGE footer if needed
</rule>
```

Then I ask the llm to help write a commit message for the work done.

Tip: ask it to create the commit message, but do it yourself so that attribution is to you, and not the llm.

## Branch Names

`.claude-rules`

```xml
<rule name="git_branch_and_commit_style">
  ## Branch Naming
  Always name branches using the format:
    <type>/<short-description>

  - <type> must be one of:
      feat  → new feature
      fix   → bug fix
      refactor → code refactoring
      chore → tooling, CI/CD, dependencies, configs
      docs  → documentation only
      test  → tests only
      perf  → performance improvements

  - <short-description>:
      * All lowercase
      * Words separated by hyphens
      * Concise but descriptive (3–5 words ideally)
      * No issue numbers, dates, or uppercase letters

  Examples:
    feat/login-button
    fix/crash-on-empty-upload
    refactor/db-query-builder
    chore/update-ci-workflow
    docs/api-authentication-guide

  ## Commit Messages
  Follow Conventional Commits format:
    <type>(scope): <summary>

    [body]

    [footer]

  - The <type> in the commit message must match the <type> in the branch name.
  - Use the <short-description> from the branch to decide on the <scope> or
    guide the <summary>.
  - Subject line ≤ 50 chars, imperative mood.
  - Wrap body at 72 chars.
  - Body explains "what + why", not just the diff.
  - Footer for BREAKING CHANGE or issue refs.

  ## Examples
  Branch: feat/login-button
  Commit: feat(ui): add login button component

  Branch: fix/crash-on-empty-upload
  Commit: fix(upload): prevent crash on empty file uploads

  Branch: chore/update-ci-workflow
  Commit: chore(ci): update GitHub Actions workflow to cache deps
</rule>
```


## Sample Data 

I'm working on a branch called `feat/sample-data` and want to add sample data to my 80s music project.

However I am a professional developer working on great code, so lets treat this as great art.

Is an array the most suitable data structure for this? Yes:

- native sort(), filter() and map()
- easy iteration with forEach(), for...of
- json serialiazable for localStorage

Let's go with this and focus on code quality:

```js
const songs = [
    {
        name: "Billie Jean",
        artist: "Michael Jackson",
        year: 1982
    },
    {
        name: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        year: 1987
    },
    {
        name: "Livin' on a Prayer",
        artist: "Bon Jovi",
        year: 1986
    }
];
```

and then

```js
/**
 * Array of 80s songs.
 *
 * Note:
 * - This is duck-typed: "If it walks like a duck and quacks like a duck, it's a duck."
 * - JavaScript doesn't enforce structure — any object can go in this array.
 */
const songs = [
  {
    name: "Billie Jean",
    artist: "Michael Jackson",
    year: 1982,
  },
  {
    name: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    year: 1987,
  },
  {
    name: "Livin' on a Prayer",
    artist: "Bon Jovi",
    year: 1986,
  },
];
```

Thinking about code formatting and commenting:

### .claude-rules / .cursorrules

Machine-consumable rules

## JSDoc format

Common JSDoc tags are picked uo by IDE's like VSCode 

```js
/**
 * @typedef {Object} Song
 * @property {string} name - Song title, non-empty string
 * @property {string} artist - Performing artist or band name
 * @property {number} year - Release year, must be 1980-1989 inclusive
 */

/**
 * Array of 80s songs with enforced structure.
 * Note: Structure is enforced by IDE/JSDoc only - code will still run without it.
 * JSDoc + VS Code provide type hints, autocomplete, and error detection for better DX (Developer Experience).
 * @type {Song[]}
 */
const songs = [
  {
    name: "Billie Jean",
    artist: "Michael Jackson",
    year: 1982,
  },
  {
    name: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    year: 1987,
  },
  {
    name: "Livin' on a Prayer",
    artist: "Bon Jovi",
    year: 1986,
  },
];
```
We need to enable VSCode to show type checking as it is set to loose by default.

```json
{
  // https://www.typescriptlang.org/tsconfig#checkJs
  // As VSCode has built-in TypeScript support, we can use a jsconfig.json file to enable type checking in JavaScript files
  "compilerOptions": {
    "checkJs": true, // enable type checking in all .js files - uses TS Compiler API to build an AST and check types
    "strict": true, // strictest checks (like in TypeScript). catches more errors eg null/undefined, implicit any
    "module": "ES2022", // Not ESNext for production as this is the latest, and we want battle tested.
    "target": "ES2022"
  },
  // not using yet, but could be useful 
  "exclude": [
    "node_modules", // exclude dependencies
    "**/node_modules/*" // exclude dependencies in subfolders
  ]
}
```

[![alt text](/assets/2025-08-30/1.jpg "type hints via ")](/assets/2025-08-07/1.jpg)

type hints with JSDoc and VSCode using TS Compiler API

As this project is still small I'm sticking with js as am getting 90% (???) of the benefits of TS by using JSDoc + checkJS: true

## linting

TODO ESLint

## code formatting
 
TODO Prettier

## bundler

TODO eg Webpack?


## README and CLAUDE.md

### CLAUDE.md

`\init` in claude analyses the codebase and comes up with a CLAUDE.md file.

Human and AI reference. 

- A longer explanation of why thing are the way they are. Context, examples and review checklists.


```md
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple web application showcasing 80s music data. The project uses vanilla HTML, CSS, and JavaScript with JSDoc type annotations for type safety without compilation overhead.

**Architecture:**
- `index.html` - Basic HTML structure with title and script inclusion
- `style.css` - Simple styling with reset and basic typography
- `script.js` - Main JavaScript with JSDoc-typed song data structures
- `jsconfig.json` - TypeScript compiler configuration for JavaScript type checking

## Type System

The project uses JSDoc annotations with TypeScript's `checkJs` enabled for type safety:

- **Song interface**: Defined via `@typedef` with `name` (string), `artist` (string), `year` (number 1980-1989)
- **Type checking**: Enabled through `jsconfig.json` with `checkJs: true` and `strict: true`
- **IDE integration**: VS Code provides full IntelliSense, error detection, and autocomplete

## Development Standards

The project follows strict coding standards defined in `.claude-rules`:

**Branch naming**: `<type>/<short-description>` (e.g., `feat/display-sample-data`)
**Commit format**: Conventional Commits with type matching branch type
**Code style**: Prettier-compatible (2 spaces, trailing commas, semicolons)
**Variable declarations**: `const` preferred, `let` when reassigned, never `var`
**Comments**: JSDoc for public APIs and type definitions, single-line for local context only

## Key Files

- `script.js:1-30` - Main typed song data array with JSDoc annotations
- `jsconfig.json:4-8` - TypeScript compiler options for JavaScript type checking
- `.claude-rules:55-119` - Comprehensive JavaScript/TypeScript coding standards

## Current State

The project is in active development with sample 80s music data structures in place. The codebase demonstrates proper JSDoc usage for type safety in vanilla JavaScript projects without build complexity.
```


## Displaying Data


[![alt text](/assets/2025-08-30/2.jpg "displaying data")](/assets/2025-08-07/2.jpg)

JavaScript displaying data.

```js
/**
 * @typedef {Object} Song
 * @property {string} name - Song title, non-empty string
 * @property {string} artist - Performing artist or band name
 * @property {number} year - Release year, must be 1980-1989 inclusive
 */

/**
 * Array of 80s songs with enforced structure.
 * Note: Structure is enforced by IDE/JSDoc only - code will still run without it.
 * JSDoc + VS Code provide type hints, autocomplete, and error detection for better DX (Developer Experience).
 * @type {Song[]}
 */
const songs = [
  {
    name: "Billie Jean",
    artist: "Michael Jackson",
    year: 1982,
  },
  {
    name: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    year: 1987,
  },
  {
    name: "Livin' on a Prayer",
    artist: "Bon Jovi",
    year: 1986,
  },
];

/**
 * Renders the songs array as table rows in the DOM.
 * Uses for...of loop with template literals for efficient HTML string building.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get table body element with type assertion to satisfy TypeScript null checks
    const tbody = /** @type {HTMLElement} */ (document.getElementById('songs-tbody'));
    
    // Using for...of loop to build HTML string
    // Preferred over map().join('') as it avoids intermediate array creation
    // Map is semantically for data transformation, not side effects like string building 
    // Also preferred over forEach for easier debugging and control flow (break/continue)
    let html = '';
    for (const song of songs) {
        html += `<tr>
            <td>${song.name}</td>
            <td>${song.artist}</td>
            <td>${song.year}</td>
        </tr>`;
    }
    tbody.innerHTML = html;
});
```

Notice I put in research into the most professional way to render out this simple data to the screen.

## ES6 Modules 

Converted to ES6 modules - we get import and export syntax, and module scoping creating isolated scopes. 

 Why ES6 modules over global scripts:
 1. SCOPED VARIABLES: Variables and functions are module-scoped, not global
    - Prevents namespace pollution and naming conflicts
    - Better encapsulation and maintainability
 
 2. EXPLICIT DEPENDENCIES: Import/export clearly defines what code depends on what
    - Makes dependencies traceable and debuggable
    - IDE can provide better autocomplete and refactoring support
 
 3. STATIC ANALYSIS: Module dependencies are resolved at compile time
    - Bundlers can perform tree-shaking (remove unused code)
    - Better tooling support and error detection
 
 4. MODERN STANDARD: ES6 modules are the official JavaScript module system
    - Supported natively in all modern browsers
    - Future-proof approach for web development
 
 Trade-offs:
 - Requires modern browser or bundler (IE11+ with polyfills)
 - Functions not automatically global (need event listeners vs onclick)
 - Slightly more complex setup for simple projects

## Error Handling

[![alt text](/assets/2025-08-30/4.png "CORS file issue")](/assets/2025-08-30/4.png)

If a person opens the html file, it won't load the data due to cors permissions. As a professional develop lets trap this error.


[![alt text](/assets/2025-08-30/5.jpg "Trap cors")](/assets/2025-08-30/5.png)

We could trap this error using onerror on the script tag. But for a professional project such as this, we don't need as it will always be serverd from a webserver.


### Coding Style

I'm aligning my project to prettier standards and put this into `.claude-rules`

Am using multiple AI's to get different opinions and to see what feels best for me. This is part of the art of coding.. taking time to see what is most beautiful and clean and appropriate to a project.


Added in meta name desciption, keywords and author for being descriptive and SEO

Adding in html5 header and main and footer tags is a semantically good idea - clarity.


### ally

Accessibility




