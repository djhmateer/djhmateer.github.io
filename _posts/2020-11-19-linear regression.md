---
layout: post
title: Linear Regresssion with R
description: Using a straight line linear regression we will explore data, construct a model, diagnose and evaluate. Notes from a course.
# menu: review
categories: R Statistics
published: true 
comments: false     
sitemap: true
# image: /assets/2020-10-27/davemateer.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->


[R and Tidyverse Beginners Guide](/2020/11/18/r-with-tidyverse-beginners-guide) is my previous article.


Essentially these are findings on a Statistics course I did which is geared towards biological scientists. The joy of finding things out and exploring something different..  

These are my notes up to the point I got lost!

There ~~may be~~ wont be articles in the future here on (an area I don't need to know about, but looks fascinating)

- Multiple Regression
- ANCOVA
- Generalised
- Mixed


Like any other discipline there are a lot of terms, which I'm going to try to define, and will go through slowly.

## Univariate Linear Regression

Or linear regression, or simple linear regression, or model 1 regression

So a univariate regression but we are looking at a bivariate data (also called bivariate relationship)

Science is about making imprecise measurements and asking questions / making hypothesis. So we need a way to help us quantifyably make sense of these measurements.


[What is a Regression](https://www.investopedia.com/terms/r/regression.asp)

> "Regression is a statistical method .. that attempts to determine the strength and character of the relationship between one dependent variable (usually denoted by Y) and a series of other variables (known as independent variables). "

Simple linear regression uses one independent variable to explain (or predict) the outcome of the dependent variable.

By using a straight best-fit line

- Predictor / Independent variable - eg altitude (x axis), airspeed m/s
- Response / Dependent variable - eg temperature (y axis)... the variable we are trying to predict

It's important that the predictor variables (measurements) are more accurate (contain less error) that the response. Because the most commonly used univariate regression aka model 1 regression assumes this.

eg What do we predict the temperature to be at sea level if we have some sample data betweem 600m and 1100m

## Strategy

1. Data exploring (plotting) and getting a feel for what the regressional values should be
2. Model construction
3. Model diagnostics
4. Model evaluation

## 1. Data Exploring

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
# scatter plot
# if it looks like a reasonably straight line, we can do a simple linear regression
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

### C / Intercept C value of 50  and slope m

Let's do a sanity check regression straight line equation of the form `y = mx + c`

```r
# y = mx + c
# we can roughly tell that the c / co-efficient / intercept should be 50
# ie when x=0, y=50
df_Park %>%
  filter(Bird_ID == 1) %>%
  ggplot(aes(x = Airspeed, y = Wingbeat_Amp)) +
  geom_point() +
  xlim(0, 14) +
  ylim(40, 130) +
  theme_bw()
```

From eyeballing we can say C is around 50.

How to get m, ie the slope?

what is the change in y over the whole range: 123 - 72 = 51
what is the change in x over the whole range: 14 - 4 = 10

gradient or slope coefficient should be 51/10 = 5.1 


y = 5.1x + 51

so when x is 10, y is 102, which looks right

## 2. Model Construction

```r
# lm is linear model
# response variable (the variable we are trying to predict eg windbeat amplitude) on lhs of  ~
# predictors (something we can measure eg windspeed) on rhs of ~
lm_wba_1 <- lm(Wingbeat_Amp ~ Airspeed,
               data = df_bird1)
lm_wba_1
```

naming of prefix lm, and suffix number as we'll build many of these

## 3. Model diagnostics

Lets check to see if the model adheres to assumptions and to look for high influence observations.

- the predictor variables should be a measure with negigble error
- the variance in the response variable should be constant for all values of the predictor(s) - homogenity of variance.
- residuals must be independant (one observation cannot predict the otner)
- residuals should be normally distributed

```r
# Gives coefficients of (Intercept) 47.988 ie the C value
# Airspeed of 5.051 ie the airspeed slope m value
lm_wba_1

View(lm_wba_1)
str(lm_wba_1)

par(mfrow = c(2, 2))
plot(lm_wba_1)
par(mfrow = c(1, 1))
```

1.residuals vs fits - 
[The plot is used to detect non-linearity, unequal error variances, and outliers.](https://online.stat.psu.edu/stat462/node/117/)
  funnel like?
  curvilinearity - are residuals generally positive, then negative, then positive?
     yes this is the case here. Maybe a non-linear function would be a better analysis.

2.quantile quantile qq normal plot
  are the residuals a normal distribution?

histogram will give something  ie looking for outlier data too
```r
hist(lm_wba_1$residuals)
```

3.scale location plot
   should show no pattern.
   Is assessing hetrogeneity of variance but uses a different transformation of residuals, which can show problems that 1. graph cannot.

4.cook's distance plot

ADF Method - Augmented Dickey-Fuller test.. test the null hypothesis


## 4.Model Evaluation

```r
summary(lm_wba_1)
```
results:

```
Call:
lm(formula = Wingbeat_Amp ~ Airspeed, data = df_bird1)

Residuals:
    Min      1Q  Median      3Q     Max 
-6.0427 -1.1243  0.2078  1.4225  4.5966 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)   47.988      2.919   16.44 5.08e-08 ***
Airspeed       5.030      0.306   16.44 5.08e-08 ***
```

The Coeffieients look good:

```
y = mx + c
y = 5.030x + 47.988
```

y-intercept (c) - (Intercept) is in brackets - wingbeat amplitude

slope (m) - is listed as Airspeed - slope is associated with a predictor so will take its name (univariate regression)

The coefficients each have a [standard errori (SE)](https://en.wikipedia.org/wiki/Standard_error)

- t-value - test statistic for the null hypothesis of a zero coefficient value
- p-value associated with this null hypothesis

Our p-values are tiny, so we should reject the hypothesis that "no association between airspeed and wingbeat amplitude"

What is the confidence interval for the slope?

```r
# confidence interval (CI)
confint(lm_wba_1)
```

F-statistic - this is a test of the whole regression, and is associated with the null hypothesis that the model does not predict the response.

ANOVA - don't use this any more.


## Conclusion

This is as far as I got!

Learning the terms and scientific strategies to analyse data essentially with a straight line fit was fascinating.
