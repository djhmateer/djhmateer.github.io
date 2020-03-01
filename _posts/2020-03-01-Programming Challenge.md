---
layout: post
title: Coding Challenge 
description: 
menu: review
categories: Coding 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---
This blog post started 15 years ago!

Stop Press 12th Dec 2007?
Dave Mul., has written  C# version 3 which has now beaten C!  Have a look at the source from the left hand C# menu.
Dan rewrote the logic, and has come up with code which doesn't require nested loops.. See C(v2)
Darrin and I are looking at the possibility of Assembler.... !!!!
Ruby perhaps?

[March 2007 davemateer.com](
https://web.archive.org/web/20070306201043/http://www.davemateer.com/index.php?option=com_content&task=view&id=13&Itemid=30)

[Oct 2010 programgood.net](https://web.archive.org/web/20170324083613/http://www.programgood.net/2010/10/12/CodeGuessingProgram.aspx)


[April 2013 programgood.net](https://web.archive.org/web/20170323105844/http://www.programgood.net/default,date,2013-04-30.aspx)

## March 2007

Whilst reading Simon Sing's - The Code Book (www.simonsingh.com)  I thought it would be fun to write a code guessing program.  My first try was in Visual Basic6, then I ported it over to C#.  Phil decided he'd have a go and wrote it in Python then Java.  Then Dan wrote it in C.  We were all intrigued as to how fast each language would be, and who would be the winner?

This program takes say x letters from lowercase a to z, in as a secretString (in all cases we used 'davedave' for 8, then 'davedav' for 7 etc..)  Then it tries to guess the secretString by starting at aaaaaaaa and finishing at zzzzzzzz (for the 8 length example).  It was not allowed guess each letter individually, it had to guess the entire string correctly.

Without further words... here are the current results, and below is the source code.  My machine runs an Athlon 1500+ processor with 3/4gig of RAM, and WinXPSP2.

![alt text](/assets/2020-03-01/1.jpg "Results"){:width="600px"}

2007 results above

## Comparing Bytes in C#

Dave Mulh wrote this around December 2007 and is the fastest C# version around. Interestingly it worked just fine in .NET Core 3.1 - I love backwards compatibility.

2010 on Intel Core2 Dual 2.4GHz 9.5s (for #7)

2013 on i7 SandyBridge 2GHz  (4s for single thread  #7)

![alt text](/assets/2020-03-01/2.jpg "Results"){:width="600px"}

2020 on i5 6600 at 3.3GHz Home Desktop (2.3s) running .NET Core 3.1

[All source now on github](https://github.com/djhmateer/codeguesser/tree/master/CodeGuesser) and here is the original without any modern day modifications

```cs
static void Main(string[] args)
{
    var s = new Stopwatch();
    s.Start();

    long counter = 0;

    Console.WriteLine("Starting...");

    // array of bytes (can be 0 to 255) eg 100, 97, 118, 101, 100, 97, 118
    byte[] secretBytes = Encoding.UTF8.GetBytes("davedav");
    var comparisonBytes = new byte[secretBytes.Length];

    // loop 1
    for (byte i = 97; i < 123; i++)
    {
        comparisonBytes[0] = i;
        //loop2
        for (byte j = 97; j < 123; j++)
        {
            comparisonBytes[1] = j;
            //loop 3
            for (byte k = 97; k < 123; k++)
            {
                comparisonBytes[2] = k;
                //loop4
                for (byte l = 97; l < 123; l++)
                {
                    comparisonBytes[3] = l;
                    //loop 5
                    for (byte m = 97; m < 123; m++)
                    {
                        comparisonBytes[4] = m;
                        //loop6
                        for (byte n = 97; n < 123; n++)
                        {
                            comparisonBytes[5] = n;
                            //loop7
                            for (byte o = 97; o < 123; o++)
                            {
                                comparisonBytes[6] = o;
                                //loop8
                                //for (byte p = 97; p < 123; p++)
                                //{
                                //   comparisonBytes[7] = p;

                                counter++;

                                // compare  to
                                if (CompareByteArrays(comparisonBytes, secretBytes))
                                {
                                    var comparisonString = Encoding.UTF8.GetString(comparisonBytes);
                                    Console.WriteLine("Found secret which is {0} after {1} pattern matches", comparisonString, String.Format("{0:n0}", counter));
                                    s.Stop();
                                    TimeSpan t = s.Elapsed;
                                    Console.WriteLine("Timespan: {0}s", t.TotalSeconds);

                                    long throughput = counter / (long)t.TotalSeconds;
                                    Console.WriteLine("Throughput: {0}comparisons/sec", String.Format("{0:n0}", throughput));

                                    goto End;
                                }
                                //} //end loop 8
                            }//end loop 7
                        } // end loop 6
                    }// end loop 5
                } //end loop 4
            } // end loop 3
        }// end loop 2
    }//end 1
    Console.WriteLine("Got to end and didn't find");

End:
    Console.ReadLine();
}
public static bool CompareByteArrays(byte[] comparison, byte[] secret)
{
    // compare each byte
    for (int i = 0; i < 7; i++)
    {
        if (comparison[i] != secret[i]) return false;
    }

    return true;
}
```

## C# v1
asdf

```cs
static void Main(string[] args)
{
    var s = Stopwatch.StartNew();
    string secretString = "davedav";
    string tryString;
    char iChar;
    char jChar;
    char kChar;
    char lChar;
    char mChar;
    char nChar;
    char oChar;
    char pChar;
    string iString;
    string jString;
    string kString;
    string lString;
    string mString;
    string nString;
    string oString;
    string pString;
    ulong counter = 0;
    Console.WriteLine();

    //loop 1
    for (int i = 97; i < 123; i++)
    {
        iChar = (char)i;
        iString = iChar.ToString();
        //loop 2
        for (int j = 97; j < 123; j++)
        {
            jChar = (char)j;
            jString = jChar.ToString();
            //loop3
            for (int k = 97; k < 123; k++)
            {
                kChar = (char)k;
                kString = kChar.ToString();
                //loop4
                for (int l = 97; l < 123; l++)
                {
                    lChar = (char)l;
                    lString = lChar.ToString();
                    //loop5
                    for (int m = 97; m < 123; m++)
                    {
                        mChar = (char)m;
                        mString = mChar.ToString();
                        //loop6
                        for (int n = 97; n < 123; n++)
                        {
                            nChar = (char)n;
                            nString = nChar.ToString();
                            //loop7
                            for (int o = 97; o < 123; o++)
                            {
                                oChar = (char)o;
                                oString = oChar.ToString();

                                //loop8
                                /*for (int p = 97; p < 123; p++)
                                                                       {
                                                                           pChar = (char)p;
                                                                           pString = pChar.ToString();
                                                                       }*///end loop8
                                counter++;
                                tryString = iString + jString + kString + lString + mString + nString + oString;

                                if (tryString == secretString)
                                {
                                    Console.WriteLine($"Found secret which is {tryString} after {counter} matches");
                                    Console.WriteLine($"time taken is {s.Elapsed.TotalSeconds} s");
                                    break;
                                }// End if
                            }//end loop7
                        }//loop6
                    }//end loop5  
                }//end loop4
            }//end loop3
        }//end loop2
    }//end loop1
    Console.ReadLine();
```

I updated the timing code, but this is the essence.

Run time was 74s now in 2020.

## C# v2
Kelly
Using Visual Studio 2005 Express.  .exe run from command line.

```cs

```

## PHP

Run from the command line eg php pattern.php

```php
<? 
$startTime = time(); 
echo "starting pattern match started <br \>";       
$secretString = "daveda"; 

// loop1 
for ($i = 97; $i < 123; $i ++)  
{ 
        $iChar = chr($i);
        // loop2
        for ($j = 97; $j < 123; $j++)
        {
                $jChar = chr($j);
                // loop 3
                for ($k = 97; $k < 123; $k++)
                {
                        $kChar = chr($k);
                        // loop 4
                        for ($l = 97; $l < 123; $l++)
                        {
                                $lChar = chr($l);
                                // loop 5
                                for ($m = 97; $m < 123; $m++)
                                {
                                        $mChar = chr($m);
                                        // loop 6
                                        for ($n = 97; $n < 123; $n++)
                                        {
                                                $nChar = chr($n);
                                                $tryString = $iChar . $jChar . $kChar . $lChar . $mChar . $nChar;
                                                if ($tryString == $secretString) {
                                                        echo "found secretString which is $tryString <br />" ;
                                                        $endTime = time();
                                                        $totalTime = $endTime - $startTime;
                                                        echo "Time taken in seconds is $totalTime <br />";
                                                }// end if
                                        } // end loop 6
                                } // end loop 5       
                        } // end loop 4       
                } // end loop 3               
        }// end loop2
}// end loop1 
?>  
```

## C

Dan
Compiled with GCC, and run under Cygwin.

```c
#include <stdio.h> 
#include <time.h> 
int main() 
{ 
    char * secretString  = "davedave";
    char tryString[10];
    unsigned int counter = 0;
    int i,j,k,l,m,n,o,p;
    time_t start,end;

    double dif;
    unsigned int timeStart;
    unsigned int timeEnd;
    time (&start);
    for (i = 'a'; i <= 'z'; i++)
    {
               for (j = 'a'; j <= 'z'; j++)
            {
                    for (k = 'a'; k <= 'z'; k++)
                    {
                            for (l = 'a'; l <= 'z'; l++)
                           {
                                   for(m = 'a'; m <= 'z'; m++)
                                   {
                                           for(n = 'a'; n <= 'z'; n++)
                                           {
                                                   for(o = 'a'; o <= 'z'; o++)
                                                   {
                                                           for(p = 'a'; p <= 'z'; p++)
                                                                   {
                                                                   tryString[0] = (char)i;
                                                                   tryString[1] = (char)j;
                                                                   tryString[2] = (char)k;
                                                                   tryString[3] = (char)l;
                                                                   tryString[4] = (char)m;
                                                                   tryString[5] = (char)n;
                                                                   tryString[6] = (char)o;
                                                                   tryString[7] = (char)p;
                                                                   tryString[8] = '\0';

                                                                   if ( strcmp( secretString, tryString ) == 0 )
                                                                   {
                                                                           time (&end);
                                                                           dif = difftime (end, start);
                                                                           printf( "\r\nSecretString is %s", tryString );
                                                                           printf( "\r\nNumber combinations tried = %d", counter );
                                                                           printf ("\r\nYou have taken %.2lf seconds to type your name.\n", dif );
                                                                           return 1;
                                                                   }
                                                                   else
                                                                   {
                                                                           counter++;
                                                                   }
                                                           }
                                                   }
                                           }
                                   }
                           }
                   }
            }
    }
        printf("\r\nDid not find secret string %s after %d combinations", secretString, counter );
} 
```

## Java

Phil

```java
/*
 * Created on 12-Nov-2005
 * @author phil
 *
 */
import java.util.*;
public class RunMe {
       public static void main(String[] args) {
       int l1,l2,l3,l4,l5,l6,loop;
       String a1,a2,a3,a4,a5,a6;
       String secret,testword;
       Date date;
       long start,finish;
       date = new Date();
       start = date.getTime();
       secret = "daveda";
       loop=0;
       for (l1=97;l1<=122;l1++){
               for (l2=97;l2<=122;l2++){
                       for (l3=97;l3<=122;l3++){
                               for (l4=97;l4<=122;l4++){
                                       for (l5=97;l5<=122;l5++){
                                               for (l6=97;l6<=122;l6++){
                                               byte[] bytes = new byte[1];
                       bytes[0] = (byte) l1;
                       a1 = new String(bytes);
                       bytes[0] = (byte) l2;
                       a2 = new String(bytes);
                       bytes[0] = (byte) l3;
                       a3 = new String(bytes);
                       bytes[0] = (byte) l4;
                       a4 = new String(bytes);
                       bytes[0] = (byte) l5;
                       a5 = new String(bytes);
                       bytes[0] = (byte) l6;
                       a6 = new String(bytes);

                                               testword = a1 + a2 + a3 + a4 +a5 +a6;

                                               loop = loop + 1;
                                               if (testword.equals(secret)){
                                                       date = new Date();
                                                       finish = date.getTime();
                                                       System.out.println("Task completed in: (milliseconds) (loops):");
                                                       System.out.println(finish-start);
                                                       System.out.println (Integer.toString(loop));
                                                       }
                                               }//loop 6
                                       }//loop 5
                               }//loop 4
                       }//loop 3
               }//loop 2
       }//loop 1
 }//end of method
} //end of class
```

## Python

Phil

```python
import time

# setup string to find by brute force
loopcounter =0
secret = "daveda"
starttime = time.strftime('%X')

print starttime

for l1 in range(97,122):
   for l2 in range (97,122):
       for l3 in range (97,122):
           for l4 in range (97,122):
               for l5 in range (97,122):
                   for l6 in range(97,122):
                       loopcounter=loopcounter+1
                       testword=chr(l1) + chr(l2) + chr(l3) + chr(l4)+chr(l5)+chr(l6)
                       if testword == secret:
                           print time.strftime('%X')
                           print testword + " found after "+str(loopcounter) +" iterations"
                           #terminate command needed here
```
