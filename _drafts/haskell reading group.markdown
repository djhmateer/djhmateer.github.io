---
layout: post
title:  "A Haskell Reading Group"
categories: Haskell
---
![Cows](/assets/Mia_350.jpg)
<p>....Because trying something new is fun!</p>

## What is Haskell?
* Functional -  Given the arguments, always returns the same output ie no global or local state. 
* Lazy
* Statically typed

## Learn you a Haskell
[Learn You a Haskell for Great Good](http://learnyouahaskell.com/) the goal of the reading group is to get through this book.

<p>Week 1 is about</p>
* Getting Started
* Lists (and list comprehension)

## Getting started
* [Download Haskell](https://www.haskell.org/platform/windows.html) Minimal x86
* [VS Code Text Editor](http://code.visualstudio.com/)
* Haskell Syntax Highlighting
![Cows](/assets/Haskell_940.png)

## REPL
![Cows](/assets/Hask_1.jpg)
<p>Running from Powershell GIT in windows</p>

{% highlight haskell %}
string1 = "hello"
string2 = "world"
greeting = string1 ++ string2
doubleMe x = x + x
{% endhighlight %}

![Cows](/assets/Hask_2.jpg)
<p>Loading hello.hs and calling functions</p>


## Euler 1
[Project Euler](https://projecteuler.net/archives) is where I start when learning a new language to flex my new 'toolbelt'..

<p>If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.</p>

{% highlight haskell %}
-- 1.  Head of list
a = head [1,2,3]
-- 2,3.  Tail of the list
b = tail [1,2,3]
{% endhighlight %}

{% highlight haskell %}
-- List comprehension (output function is before the pipe)
-- filtering (weeding out lists by predicates)
h = sum [x | x <- [1..999], x `mod` 3 == 0 || x `mod` 5 == 0]
{% endhighlight %}

![Cows](/assets/Hask_3.jpg)
<p>running the function h to get the answer.  Reloading  changes :r  in file euler.hs</p>

## Euler 2
Come back to this.. recursion and zipWith concepts

## Euler 3
<p>The prime factors of 13195 are 5, 7, 13 and 29.
 What is the largest prime factor of the number 600851475143 ?</p>

{% highlight haskell %}
-- Euler 3
-- The prime factors of 13195 are 5, 7, 13 and 29.
-- What is the largest prime factor of the number 600851475143 ?

-- number is prime if only divisible by 1 and itself
-- only need check up to the sqrt of number to see if it can be divided with remainder of 0
-- isPrime num = [x | x <- [3..floor (sqrt (fromIntegral (num)))], num `mod` x == 0, odd x] == []

-- x 35 = 6
-- x 144 = 12
x num = ceiling (sqrt (fromIntegral (num)))
-- If result set is empty isPrime = True
isPrime num = [x | x <- [2..ceiling (sqrt (fromIntegral (num)))], num `mod` x == 0] == []

-- only need to check factors up to sqrt, as we know prime can't be bigger than this
facs q =  [x | x <- [3..floor (sqrt (fromIntegral (q)))], q `mod` x  == 0, isPrime x, odd x ]

-- [5, 7, 13, 29]
q = facs 13195
-- [71,839,1471,6857]
r = facs 600851475143
{% endhighlight %}

## Euler 4
{% highlight haskell %}
-- Euler 4
--A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
--Find the largest palindrome made from the product of two 3-digit numbers.

-- 9009
t = maximum [x*y | x <- [10..99], y <- [10..99], isPalindrome (x*y)]
isPalindrome num = show num == reverse (show num) 

-- 906609
t' = maximum [x*y | x <- [100..999], y <- [100..999], isPalindrome (x*y)]

u = reverse [1,2,3,4]

-- int to string
v = show 345
-- string to int
w = read "345" :: Int

-- can reverse the string (as it is a list of chars really)
u' = reverse "1234"
z = reverse v
{% endhighlight %}



