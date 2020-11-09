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
  - 1976 - S was created
  - 1991 - Uni Auckland, began an alternative implementation of S
  - 1993 - R had first release - named for 2 authors Ross and Robert and a play on S

[wikipedia.org on R_(programming_language)](https://en.wikipedia.org/wiki/R_(programming_language))

## Why use R / Who uses R

Biology Scientists - analyse experimental data
Data Scientists - wrange data

- Data Manipulation / [Data Wrangling](https://en.wikipedia.org/wiki/Data_wrangling) / Data Munging - transforming raw data into another formating with the intent of making it more appropriate. (Dplry package in Tidyverse) - pronounced dee plier
- Tidying data ie changing it. (tidyr packacke in Tidyverse)
- Visualising / making charts to publish papers in journals (ggplot2 in Tidyverse)

Alternatives to R include: Python (or any high level language but python is super popular for data science) Excel, [SPSS](https://en.wikipedia.org/wiki/SPSS), MatLab

Use R because it is

- Scriptable
- Free
- Powerful
- Popular

## What does it do

- Data wrangling
- Data visualisation

implements a wide variety of stats and graphics techniques
   linear and non-linear modelling
   stats tests
   time series analysis
   classification
    clustering

## What is Tidyverse

[Tidyverse](https://www.tidyverse.org/) is an opinionated collection of R packages.

## R and R Studio

Download the latest version of R from [r-project.org](https://www.r-project.org/) - currently on 4.0.3 on 6th Nov 2020

Download [R Studio](https://rstudio.com/products/rstudio/download/#download) - 1.3.1093 on 6th Nov 2020.

There is a [code run / snipper / viewer extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Ikuyadeu.r) which has 250k downloads.

![alt text](/assets/2020-11-06/settings.jpg "Configuring R Studio"){:width="400px"}

I prefer to set my default directory to `c:\r` so when working on different machines there is no communcation except from raw R files projects which will be in Git.

Whilst here

- General - working folder as c:\r
- Code, Soft wrap R files tick
- Code, vim keybindings
- Panel layout, Console in top right
- Packages, change CRAN mirror to UK (London)

## R Packages

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

<!-- ![alt text](/assets/2020-11-06/rtools-error2.jpg "RTools error") -->
![alt text](/assets/2020-11-06/rtools-error2.jpg "RTools error"){:width="700px"}

Then I solved this by installing RTools:

## RTools

[Download RTools](https://cran.rstudio.com/bin/windows/Rtools/) if you get errors saying you need to install it (shown above)

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

![alt text](/assets/2020-11-06/binary.jpg "Compiling from source"){:width="500px"}

then

![alt text](/assets/2020-11-06/conflicts.jpg "Conflicts"){:width="600px"}

okay so we are good to go


## R Studio Keyboard shortcuts

ctrl enter - run

ctrl shift c - comment / uncomment

ctrl shift m - pipe %>% aka magrittr

alt - assignment <- 


## R Useful code

```r
# clear R of all objects
rm(list=ls())

# install on local machine
install.packages("tidyverse")

# bring in tidyverse library
library(tidyverse)

# load in csv into a new dataframe using tidyverse's readr package
df_stuffcount <- read_csv("StuffCount.csv")

# Section 1 ####

# useful to print all the df
print.data.frame(.)

```

## Pluralsight

[Tidyverse: R Playbook](https://app.pluralsight.com/library/courses/tidyverse-r-playbook/table-of-contents)

The goal is to turn data into information, and information into insight
  Carly Fiorina

## Reading data

[readr](https://readr.tidyverse.org/)

eg read_csv()
read_log() - web log files

[Also lots of other sources](https://www.tidyverse.org/packages/#import) including: Postgres, httr (Web API's), rvest (web)

<!-- ![alt text](/assets/2020-11-06/show-files.jpg "Show files"){:width="700px"} -->
![alt text](/assets/2020-11-06/show-files.jpg "Show files")

This is useful to open up a Windows Explorer window so can copy the file into the correct place.

![alt text](/assets/2020-11-06/import-dataset.jpg "Import dataset")

which lets me see the csv it is importing (like in Excel CSV import), then it generates the code to do it using readr.

```r
library(readr)
data <- read_csv("data.csv")
View(data)
```

## Wrangling data

Data Manipulation / [Data Wrangling](https://en.wikipedia.org/wiki/Data_wrangling) / Data Munging - transforming raw data into another formating with the intent of making it more appropriate.

[dplyr](https://dplyr.tidyverse.org/) pronounced - Dee plier

[dplyr cheatsheet here](https://github.com/rstudio/cheatsheets/blob/master/data-transformation.pdf)

verbs

- filter - where
- arrange - sort / order by
- mutate - new column

more
- group by
- summerise - selecting group by data (always comes after a group by)
- join
- arrange (desc(Year))

## Tidying data

[tidyr](https://tidyr.tidyverse.org/)


## Data Visualisation

[10 Simple rules for Better Figures](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003833)


```r
# clear R of all objects
rm(list=ls())


# package tidyverse readr
library(readr)
# library(tidyverse)

df_stuff <- read_csv("stuff.csv")

# x rows (shows the tibble - types too)
df_stuff

print.data.frame(df_stuff)

# select / mssql style data viewer
View(df_stuff)

# view a histogram of the vector (array of dbl's)
# this part of base R and not tidyverse
hist(df_stuff$TREATMENT)

```

## Ggplot

[R cookbook for Graphs](http://www.cookbook-r.com/Graphs/)

## R Markdown or R Notebooks

spiral notebook icon

ctrl shift k - compile to html

## R for a C# Application Buidler
https://stackoverflow.com/questions/5664997/logfile-analysis-in-r

log file analysis
server log analysis

web scraping library?

## Terms

- R - language
- R Studio

- base R - no use of tidyverse

- Tidyverse
  - Dpylry - for wrangling data 
  - Tidyr - tidying data
  - Ggplot2 

- Data Structures
- Data frame - columns can be different types. eg like a table
- Vector - 1d array
- Matrix - 2d array
- Array

