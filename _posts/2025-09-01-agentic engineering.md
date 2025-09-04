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

[https://www.youtube.com/watch?v=dBWnH0YA6tg](https://www.youtube.com/watch?v=dBWnH0YA6tg) Stop Letting AI Wing It - Take control of coding

Let's make an app for my local speedwatch group

I've got a private GH repo called speedwatch.

I'll be using agentic AI to help me with these phases

- Researcher
- Architect - standards and structure. (structure documents eg software principles - DRP, SRP.. hmmm)
- Product Manager - define the what. bit sized prds. inputs,outputs,edge cases.
- Engineer
- Tester

## Init

Git init

Good to give Claude a `CLAUDE.md` file (/init) so can setup defaults like

- Don't commit to source control unless I say

This needs to go into a `.claude-rules` file.

## Research

PRD - Product Requirements Document

Essentially this is a great idea for any project as it helps you define what you're doing before doing it. 

- Who are the customers?
- What are the benefits to them?

Also agentic wise

- Gather information
- Take screenshots (what is wrong with current system)
- Draw on screenshots what I want / what is wrong?

- Get data
- Research user needs
- Look at good and bad experiences


### Sign up

One major part of the system is to make the signup easy. (The other is to make scheduling of sessions easier)

So I signed up my wife as a user to test the flow of the system, and screenshotting the entire process.

[https://www.youtube.com/watch?v=e-uRyFuiK-A](https://www.youtube.com/watch?v=e-uRyFuiK-A)

This is the intro: code of conduct, health and safety and Procedures (2.8k views, 9 years ago)

After completing the quiz a police officer will contact you regarding future practical training sessions.

### The Online Quiz

1. Objectives and purpose of the CSW scheme
2. Obligations and behaviour
3. Important things to remember about safety
4. Procedure, roadside recording, and equipment

Each section ends with a short pre-test quiz. You can either test your knowledge after each section, or skip the pre-test quiz before continuing to the next chapter.

You are allowed to make as many attempts as needed to submit all your answers.


## Exporting the PRD to show Customers

[![alt text](/assets/2025-09-04/1.jpg "Render of MD really good")](/assets/2025-09-04/1.jpg)

The Markdown file is rendering beautifully

```bash
pandoc PRD-summary.md -o PRD-summary.pdf --pdf-engine=wkhtmltopdf

sudo apt install texlive-xetex

pandoc PRD-summary.md -o PRD-summary.pdf --pdf-engine=xelatex -V geometry:margin=1in -V fontsize=11pt

# docx with reference styling
pandoc PRD-summary.md -o PRD-summary.docx --reference-doc=reference-template.docx
```

[![alt text](/assets/2025-09-04/2.jpg "Pandoc Not so good")](/assets/2025-09-04/2.jpg)

Pandoc not so good


[![alt text](/assets/2025-09-04/3.jpg "LaTeX looking academic")](/assets/2025-09-04/3.jpg)

Latex looking academic


[![alt text](/assets/2025-09-04/5.jpg "Export to word works well")](/assets/2025-09-04/5.jpg)

Export to word works well

[![alt text](/assets/2025-09-04/4.jpg "Word rendered PDF is better")](/assets/2025-09-04/4.jpg)

Word rendered pdf is better

[![alt text](/assets/2025-09-04/6.jpg "ChatGPT asked it to help with formatting of docx")](/assets/2025-09-04/6.jpg)

ChatGPT asked it to help with formatting of docx - tables idea is very good

## Architect

