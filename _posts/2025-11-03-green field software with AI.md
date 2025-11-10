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

<!-- [![alt text](/assets/2025-08-30/6.jpg "Volcano")](/assets/2025-08-30/6.jpg) -->

How can AI/AE help in the project management SDLC (Software Developemnet Lifecycle). Let's not overthink this too much as AI is just a tool.

- Who are the customers
- What are the benefits to them
- Will they pay for it?

## Strategy

Use claude-code and ChatGPT5

Use git on short lives feature branches for safety

Do this in small steps as the goal is performant, simple applications.

Be very careful about AI coding (as for example it prefers older packages)


## 1.Research Phase

This is this first step

- Researcher
- Architect - standards and structure. (structure documents eg software principles - DRP, SRP.. hmmm)
- Product Manager - define the what. bit sized prds. inputs,outputs,edge cases.
- Engineer
- Tester

Lets assume I've gone through this and have done my research

## 2.Architect 

So I'm now looking at proof of concepts (PoC) as I don't know the technology I want to use.

Is my preferred tech stack fit for purpose?

- Next.js
- Typescript
- Shadcn ui
- React Server Components - Prefer as much server side as possible
- Postgres
- biome - formatting (replaces prettier) and linting (improve code)

Lets do a spike.

## 2.2 Next Spike

It's annoying all the permissions in claude-code, but here are some so far which are useful to give in a new project.

`settings.local.json`

```json
{
  "permissions": {
    "allow": [
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git checkout:*)",
      "Bash(git merge:*)",
      "Bash(git push:*)",
      "WebSearch"
    ],
    "deny": [],
    "ask": []
  }
}
```

Test project is `green-80's` and created an `install.sh` file with all next.js dependencies.

Refactor directory structure as I go.

node_modules is 804MB with 17,637 files.. for a hello world project!




