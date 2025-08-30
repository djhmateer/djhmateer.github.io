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

<!-- [![alt text](/assets/2025-08-07/1.jpg "Cursor prototype")](/assets/2025-08-07/1.jpg) -->

[https://www.anthropic.com/claude-code](https://www.anthropic.com/claude-code)

[https://www.youtube.com/watch?v=SUysp3sJHbA](https://www.youtube.com/watch?v=SUysp3sJHbA) - british guy

[https://www.youtube.com/watch?v=amEUIuBKwvg](https://www.youtube.com/watch?v=amEUIuBKwvg) - strategies

account plans - free plan gives access to web and desktop app, but need to pay for claude-code.

- Pro - $17pm (only access to Sonnet 4, no access to Opus 4.1)
- Max 5x - $100pm (nearly unlimited access to Sonnet 4). Good. 
- Max 20x - $200pm 

usage limits reset every 5 hours and get a warning when reaching limit.

- Sonnet 4 - good default 
- Opus 4.1 eats through limits much faster


```bash
# installs silently - maybe use --v
# to see what is happening
# took 3 minutes
npm install -g @anthropic-ai/claude-code

# to launch - but need a key
claude

# 1.0.90 on 25th Aug 25
claude --version
```

[https://support.anthropic.com/en/articles/9797557-usage-limit-best-practices](https://support.anthropic.com/en/articles/9797557-usage-limit-best-practices) usage limit best practice

[https://support.anthropic.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan#h_50f6dec29d](https://support.anthropic.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan#h_50f6dec29d) - gives rate limit information.


I've not found a way in the Pro plan to see when my rate limits are approaching... apparently there are warning messages.


`can you provide me with a summary of what this project is`

##asdf
cursor - snapshots.. ux and workflow
claude-code - accuracy over speed

##asdf
authentication

vibe is great for front end work!

**can explain the code???

####fundamental
leaning of js
basics of ts
composition of architecture..tech choices


more code and less design for paddy?

landing page
flashy visuals
rbac

we know all the above - reskinning known formula

different is when things collide

---
commm
design
develop



    
### VS Code

If run claude inside VSCode then we get an extension which is automatically installed for

- selected text in editor is automatically added to claude context
- diff viewing
- alt cmd k - push selected code into claude prompt

## New Lines

`/terminal-setup` - VSCode terminal Shift+Enter key binding for newlines for claude-code chat

## Branch

`switch to a new branch called claude-edits`

## Init

`/init` - initialise a new CLAUDE.md file (for an existing project). Mini documentation for Claude Code to use.

## Example 1 - Website Create

`Create a very simple website that is for a habit tracking app. Create some mock-ups for the imagets, keep things super simple, but hink a beautiful design that comes from a designer agency that makes beautiful websites (that maybe cost like $10,000 to $15,000) as a demo for what Claude Code can do`

then

`get rid of npm - just want raw html, css, and js.. and claude.md`

[![alt text](/assets/2025-08-25/1.jpg "Simple website")](/assets/2025-08-25/1.jpg)

I then could run the site using live server extension in vscode.

landing page website. Got too complex

## Voice

[https://wisprflow.ai/downloads](https://wisprflow.ai/downloads)

Ctrl Win - shortcut for voice dictation


## Excalidraw for sketchpad

asdf


## Example 2 - Tetris

`create a tetris game in a single html file`

So what it did was create the game... with embedded js and css.

I noticed that it runs python in the background to spin up the site to test it.

- firstly uses curl to see if all files load and give expected results
- then uses a script called test-tetris.js to call each function

`can you use browser automation like puppeteer to test this code`

So this installs puppeteer, and puts in a `package.json` ... which failed... so it's trying playwright (brilliant!)

It then created a README-tests.md which documented the tests after I asked it to keep the tests.

after doing this I did an `/init` to create a CLAUDE.md file


**can it do screenshots of the functionality?

### Browser

[https://browsermcp.io/](https://browsermcp.io/) - last update 7th Mar 25

[https://github.com/AgentDeskAI/browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp) - last update 10th Mar 25.

**find out from P which one he uses**


## Windows Chrome on WSL2

I wanted to get windows side chrome working from wsl2, but:

I got `Remote debugging pipe file descriptors are not open` when trying to do this.. so had to give up.

It is possible to patch in chrome as below but it didn't work:
```bash
# create this file
# /usr/local/bin/chrome

#!/bin/bash
/mnt/c/Program\ Files/Google/Chrome/Application/chrome.exe "$@" >/dev/null 2>&1

# make it executable
chmod +x 


# tell linux browser is this script
# this didn't work
xdg-settings set default-web-browser chrome


# this worked for bash
echo 'export BROWSER=chrome' >> ~/.bashrc
source ~/.bashrc

export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="$(which chrome)"
```

## VSCode Shortcuts

ctrl shift ' - open new terminal

## Downsides of Vibe Coding

I've created this code without touching a line of code in vibe style

[![alt text](/assets/2025-08-25/5.jpg "Vibe coding")](/assets/2025-08-25/5.jpg)

It all works.. sort of. There is a subtle bug where it's outputting to the console 'Piece placed in danger zone at y=18'.

## The realities!

I'm now going through the code and understanding it.. like a professional coder!

Turns out AI is great at 

- putting in comments (although it can be verbose)

## Next Piece Preview

For me this isn't a core of the game, and it adds complexity to the code, so lets take it out.

## Coding assist

- put in comments
- is there a better way to oranise this code eg mixed concerns, logical grouping of those concerns, global scope pollution
- renaming functions (and the caller)
- refactoring comments
- create a flow diagram using mermaid to show the flow of the game
- splitting apart complex tasks - eg in Tetris, it is quite involved, so to fully understand how it works, a step by step approach is important eg step1 showing just how the ui is built,


## Splitting apart code to understand and improve




## Bugs and Features
- make it functional (so can test properly!)

- sound
- faster
- why sluggish at bottom..when final piece dropping.
- put in instructions that show that a hard drop earns more points than soft







