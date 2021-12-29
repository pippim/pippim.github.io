---
layout:       post
title:        Adding 1 to a variable doesn't work as expected (Bash arithmetic)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/823649
type:         Answer
tags:         bash
created_date: 2016-09-11 14:38:17
edit_date:    
votes:        2
favorites:    
views:        9,151
accepted:     
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    false
---

An alternate method may be to keep your variables as integers and convert them to a string at the end:

``` 
A=12
B=$((A+1))
echo $B
13
C=$( printf '%04d' $B )
echo $C
0013

```

This style of working with integers in math and converting to string for the answer is more intuitive to me as I'm used to BASIC programming. I appreciate Bash doesn't have variable typing like C and BASIC but pretending it does makes me happy.
