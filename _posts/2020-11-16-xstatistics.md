---
layout: post
title: Statistics 
description: 
menu: review
categories: R Statistics
published: true 
comments: false     
sitemap: false
image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->


- 1 What is R
- 2 Tidying data
- 3 Charting
- 4 Regression
- 5 Multiple Regression
- 6 ANCOVA
- 7 Generalised
- 8 Mixed

These are some notes on a Statistics course I'm doing which is geared towards biological scientists. The joy of finding things out and exploring something different..  

I wonder what practical use it can be for me as a SaaS owner

Like any other discipline there are a lot of terms, which I'm going to try to define, and go slowly.

## Univariate Linear Regression

Or linear regression, or simple linear regression, or model 1 regression

So a univariate regression but we are looking at a bivariate data (also called bivariate relationship)

Science is about making imprecise measurements and asking questions / making hypothesis. So we need a way to help us quantifyably make sense of these measurements.


[What is a Regression](https://www.investopedia.com/terms/r/regression.asp) - "Regression is a statistical method .. that attempts to determine the strength and character of the relationship between one dependent variable (usually denoted by Y) and a series of other variables (known as independent variables). "

simple linear regression uses one independent variable to explain (or predict) the outcome of the dependent variable.

By using a straight best-fit line

- Predictor / Independent variable - eg altitude (x axis), airspeed m/s
- Response / Dependent variable - eg temperature (y axis)... the variable we are trying to predict

It's important that the predictor variables (measurements) are more accurate (contain less error) that the response. Because the most commonly used univariate regression aka model 1 regression assumes this.

eg What do we predict the temperature to be at sea level if we have some sample data betweem 600m and 1100m

## Strategy

- Data exploring (plotting) and getting a feel for what the regressional values should be
- Model construction
- Diagnostics
- Model evaluation

## Exploring

Viewing the data manually to check quality control

Also histograms to see any any records are sharply outside the range of other entries.

```r
library(tidyverse)

df_Park <- read_csv("stuff.csv")

df_Park
View(df_Park)

# historams checking for any outliers

# 11 measurements for each birdid
hist(df_Park$Bird_ID)

# how many times did 4-6 windspeed occur (6 times)
hist(df_Park$Airspeed)

# how may times did each band of amp occur eg 60-70 ( 3 times)
hist(df_Park$Wingbeat_Amp)
```

Lets do a `scatter plot` of the data using ggplot2 from tidyverse.

We need to decide which is x and y by the questions we are trying to ask:

"how swallows respond to wind"
not "how the wind is affected by a single swallow's wing movements"

```r
df_Park %>%
  filter(Bird_ID == 1) %>%
  ggplot(aes(x = Airspeed, y = Wingbeat_Amp)) +
  geom_point() +
  theme_bw()
```


## Residual

A univariate regresion seeks to establish a straight line relationship between predictor and reponse subject.

Minimize the unexplained variation `residual variation` or residual distance 

The best fit line is the one which minimises the sums of the squared deviations from the line (so that negative numbers are taken out of the running)