---
layout: post
title: R and Tidyverse beginners guide
description: 
menu: review
categories: R 
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

## What is R

[r-project.org](https://www.r-project.org/) is a programming language that implements statistics and graphical techniques

R is an implmentation of S combined with semantics inspired by Scheme.
  S created in 1976
  1991 Uni Auckland, began an alternative implementation of S
  R - named for 2 authors Ross and Robert and a play on S

[wikipedia.org on R_(programming_language)](https://en.wikipedia.org/wiki/R_(programming_language))

## Why use R / Who uses R

Biology Scientists - analyse experimental data

data wrangling 
data analysis

making charts to publish papers in journals


## Alternatives

Excel
SBSS

Use R because it is

- Scriptable
- Free
- Powerful
- Popular


## What is Tidyverse

asdf

# Setting up

Download the latest version of R from [r-project.org](https://www.r-project.org/) - currently on 4.0.3 on 6th Nov 2020

Download [R Studio](https://rstudio.com/products/rstudio/download/#download) - 1.3.1093 on 6th Nov 2020

# Configuring R Studio

![alt text](/assets/2020-11-06/settings.jpg "Configuring R Studio")

I prefer to set my default directory to `c:\temp` so when working on different machines there is no communcation except from raw R files projects which will be in Git.

Whilst here

- General - working folder as /r (or /temp)
- Code, Soft wrap R files tick
- Code, vim keybindings
- Panel layout, Console in top right
- Packages, change CRAN mirror to UK (London)

## Packages

I change the .libPaths() folder to `c:\r\library\`

Update this setting in `C:\Program Files\R\R-4.0.3\etc\Rprofile.site` as

```r
# my custom library path
.libPaths("C:/r/library")
```

By default is set to `~` and on my Windows machine this is a synced OneDrive folder. R creates a folder called R and installs libraries in there - 370MB of libraries and around 30,000 separate files.

```r
# display the path
.libPaths()

install.packages("installr")
library(installer)
```

If you get an error:

"WARNING: Rtools is required to build R packages but is not currently installed. Please download and install the appropriate version of Rtools before proceeding:"

## RTools

[Download RTools](https://cran.rstudio.com/bin/windows/Rtools/)

```bash
# .Renviron in Documents folders
PATH="${RTOOLS40_HOME}\usr\bin;${PATH}"
```

Then install tidyverse using the dropdown: Tools, Install Packages, Tidyverse or do the install.packages command below

```r
# install on local machine
install.packages("tidyverse")

# bring in the tidyverse libraries
library(tidyverse)

# or could just bring in 
library(dplyr)
```

![alt text](/assets/2020-11-06/binary.jpg "Compiling from source")

then

![alt text](/assets/2020-11-06/conflicts.jpg "Conflicts")

okay so we are good to go


# Keyboard shortcuts

ctrl enter - run

ctrl shift c - comment / uncomment

ctrl shift m - pipe %>% aka magrittr

alt - assignment <- 


## Useful code

```r

# clear R of all objects
rm(list=ls())

# bring in tidyverse library
library(tidyverse)

# load in csv into a new datafram
df_stuffcount <- read_csv("StuffCount.csv")

# Section 1 ####

```

## Pluralsight

[Tidyverse: R Playbook](https://app.pluralsight.com/library/courses/tidyverse-r-playbook/table-of-contents)

The goal is to turn data into information, and information into insight
  Carly Fiorina

Tidyverse is a collection of libraries:

- Dplyr - wrangling data
- Tidyr - tidying data
- Ggplot2

## Wrangling data

verbs

- select
- arrange - order by
- filter - where
- group by
- mutate - new column
- summerise - selecting group by data
- join
- arrange (desc(Year))

# R Markdown or R Notebooks


spiral notebook icon

ctrl shift k - compile to html

## R for a C# Application Buidler
https://stackoverflow.com/questions/5664997/logfile-analysis-in-r

log file analysis
server log analysis

web scraping library?
