---
layout:       post
title:        >
    What is faster for granular time stamping than `date` command?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/52617824
type:         Question
tags:         bash performance date
created_date: 2018-10-02 23:39:29
edit_date:    2018-10-03 02:50:46
votes:        "0 "
favorites:    
views:        "86 "
accepted:     Accepted
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

I want to capture current epoch seconds and milliseconds in format `ssss.mmmm` but the `date` command is too slow:

``` 
$ for (( i=0; i<10; i++ )) ; do  date +%s.%N ; done
1538521026.143982969
1538521026.146270691
1538521026.148806576
1538521026.151304509
1538521026.153807045
1538521026.155896084
1538521026.158007167
1538521026.160137840
1538521026.162211968
1538521026.164414690

$ date +%s.%N ; for (( i=0; i<10; i++ )) ; do : ; done ; date +%s.%N 
1538523316.866529880
1538523316.867813697

```

Is there a faster way?
