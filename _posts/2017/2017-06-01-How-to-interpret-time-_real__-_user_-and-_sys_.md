---
layout:       post
title:        >
    How to interpret time "real", "user" and "sys"
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/920920
type:         Question
tags:         bash benchmarks
created_date: 2017-06-01 00:51:26
edit_date:    2017-06-01 01:35:03
votes:        "3 "
favorites:    3
views:        "6,423 "
accepted:     
uploaded:     2022-02-22 04:32:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-06-01-How-to-interpret-time-_real__-_user_-and-_sys_.md
toc:          false
navigation:   false
clipboard:    false
---

# Introduction

I've been fine-tuning code to reduce processing from 30 seconds to under a second in various parts of my bash program. I'm having trouble wrapping my mind about how the `time` command works when it reports `real`, `user` and `sys` variables.

## I have this code:

``` 
echo " "
echo "Time to build DirsNdxArr from DirsArr $DirsArrCnt elements:"
DirsArrCnt=${#DirsArr[@]}
time for (( i=1; i<$DirsArrCnt; i=i+$DaElementCnt )); do
    DirsNdxArr["${DirsArr[$i]}"]=$i
    AllItemSizes=$(( $AllItemSizes + ${DirsArr[$(( $i + $ColFileSizes - 1 ))]} ))
done

echo " "
echo "Time to build FilesNdxArr from FilesArr $FilesArrCnt elements:"
FilesArrCnt=${#FilesArr[@]}
time for (( i=0; i<$FilesArrCnt; i=i+$FaElementCnt )); do
    FilesNdxArr["${FilesArr[$i]}"]=$i
    AllTagSizes=$(( $AllTagSizes + ${FilesArr[$(( $i + $FaColFileSizes ))]} ))
done
```

## That reports this:

``` 
Time to build DirsNdxArr from DirsArr 56700 elements:

real	0m0.149s
user	0m0.149s
sys 	0m0.000s
 
Time to build FilesNdxArr from FilesArr 390 elements:

real	0m0.002s
user	0m0.002s
sys  	0m0.000s
```

## Why is `sys` time reporting zero?

Interpreting the output of `time` builtin command one would assume the system is doing nothing but surely this isn't what is happening?

**ps** I know `\n` can be used as a new-line to `echo` with `-e` parameter. My habit is to sacrifice one liner-cuteness and fringe arguments in favor of readability.
