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
   - linear and non-linear modelling
   - stats tests
   - time series analysis
   - classification
   - clustering

## Use cases

I've noticed that people who know Python / C# (or a high level language) tend to use that for the wrangling

[Pandas](http://www.python-ds.com/python-data-wrangling) is a common Python library for wrangling

For storage if you're comfortable with SQL often people store the data in Postgres / MySQL then chart with R. This means you can use SQL to get the data out of the db in the shape you want.


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
- Appearance, Editor Theme, Pastel on Dark
- Appearance, Editor font, Consolas

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

## R Markdown or R Notebooks

spiral notebook icon

ctrl shift k - compile to html

## R for a C# Application Buidler
https://stackoverflow.com/questions/5664997/logfile-analysis-in-r

log file analysis
server log analysis
web scraping library?

I suspect the real benefit for people like me who know a General Purpose Language like C# and SQL, is that R can do easy good stats analysis, and show the data.

## Postgres 

[RPostgres](https://github.com/r-dbi/RPostgres#rpostgres) is more up to date and has more GH stars, and may be slightly faster than [RPostgreSQL](https://github.com/tomoakin/RPostgreSQL)

[DBI](https://dbi.r-dbi.org/) defines R's interfaces to databases. RPostgres implements this spec.

Here is some sample code:

```r
# Install the latest RPostgres release from CRAN:
# install.packages("RPostgres")

library(DBI)
library(tidyverse)

# Connect to a specific postgres database i.e. Heroku
con <- dbConnect(RPostgres::Postgres(),dbname = 'imdbr', 
                 host = 'localhost',
                 port = 5432, # or any other port specified by your DBA
                 user = 'postgres',
                 password = 'letmein')

# show all db tables
dbListTables(con)

# get entire table
dbReadTable(con, "rating")

# send and fetch
res <- dbSendQuery(con, "SELECT * FROM rating limit 100")
dbFetch(res)

# does send and fetch
df_ratings <- dbGetQuery(con, "SELECT * FROM rating limit 100")

df_ratings

summary(df_ratings)

hist(df_ratings$average_rating)

# lets flatten the data in the db into a new table for analysis
# tconst, primary_title, start_year, genres, average_rating, num_votes
# 
# SELECT t.tconst, primary_title, start_year, genres, r.average_rating, r.num_votes
# INTO TABLE thing
# FROM title t
# LEFT OUTER JOIN rating r on r.tconst = t.tconst
# WHERE t.start_year < 2021

df_thing <- dbGetQuery(con, "SELECT * FROM thing")
# 487,254 rows (just movies which may may average_rating / num_votes)

df_thing
View(df_thing)

hist(df_thing$average_rating)

hist(df_thing$num_votes)

hist(df_thing$start_year)
```

## Analysing data

It's very important to understand the raw data and what it actually means.

- Excel to view raw data, then export to csv

- csv_import - does it work, and are the types it infers okay eg chr, dbl

- summary(dataframe) to find the max,min, types

- View(dataframe) and sorting - [move view to different Quadrant](https://stackoverflow.com/questions/34916553/sending-rstudio-view-content-to-different-pane) to see the max / min / obvious errors eg NA null parts too

- Histogram of each variable to check for outliers and distribution (does it make sense)

## Correcting data errors

I would usually do it in Excel or a higher level language. Especially regarding whitespace, null and spurious non expected characters

```r
# find the error
# it is row 94 that has ALTITUDE 2960 instead of 296
TLD %>% 
  # this just puts in a row number
  rownames_to_column() %>% 
  filter(ALTITUDE > 1500)

# 195 rows
summary(TLD)
TLD

# can now fix with indexing
TLD[94,5] <- 296

# or more functional using tidyverse
TLD <- TLD %>% 
  mutate(ALTITUDE = if_else(ALTITUDE == 2960, 296, ALTITUDE))

# OR
TLD$ALTITUDE <- recode(TLD$ALTITUDE, `2960` = 296)
```

## Transforming data

Because the raw data (and more importantly their residuals) may be skewed... so we can transform into a more normal (bell?) manner.

We want an normal distribution of data so can run standard types of analysis on it



## Ggplot

[R cookbook for Graphs](http://www.cookbook-r.com/Graphs/)

## Type of Charts

Visualise the data

- Histogram (used to show distribution of variables eg Altitude)

Very useful to see mistakes in the data eg Altitude of >1300m in the UK

- Bar charts (used to compare variables)


## Terms

- R - language
- R Studio - IDE

- base R - no use of Tidyverse

- Tidyverse
  - Dpylry - for wrangling data 
  - Tidyr - tidying data
  - Ggplot2 

- Data Structures
- Data frame - columns can be different types. eg like a table
- Vector - 1d array
- Matrix - 2d array
- Array

For experimentation we have fixed factors (eg experiment type) and measurements

- Variables - a measurement
- Factor / Fixed Factor of the experiment eg a Treatment can be 1, 2 or 3 only

- zero inflation - an excess of 0 data

- Gaussian (normal) distribution of data - bell curve
- Right skewed data (more data distributed to the left, so graph is skewed to the right ) of the histogram


## Tutorials

[Introduction to Spacial Data in R](https://data.cdrc.ac.uk/dataset/introduction-spatial-data-analysis-and-visualisation-r)