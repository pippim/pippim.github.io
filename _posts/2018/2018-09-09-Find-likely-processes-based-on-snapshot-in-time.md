---
layout:       post
title:        >
    Find likely processes based on snapshot in time
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1073700
type:         Answer
tags:         command-line text-processing
created_date: 2018-09-09 17:15:30
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "203 "
accepted:     
uploaded:     2022-01-23 11:36:46
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-09-Find-likely-processes-based-on-snapshot-in-time.md
toc:          false
navigation:   false
clipboard:    true
---

## `awk` to the rescue

After `sort` and `uniq` have done their job, I used `awk` to finish the project. Byte's accepted answer remains as he was the first to answer and provided excellent insights into using Python. In the end though I hobbled together 3 or 4 different **Stack Exchange** Questions & Answers to arrive at a working solution.

Here is the full script for those who are interested:



{% include copyHeader.html %}
``` bash
#!/bin/bash

echo 20 times / second ps -elf is captured to ~/pid.log
echo
echo "Type Ctrl+C when done capturing"
echo
echo "~/pid.log is sorted and uniq counted on column 15"
echo "which is full path and program name."
echo
echo "Then all matches with same unique count (the headings)"
echo "are stripped and only new processes started are printed."
echo
echo "This function can help you trace down what processes are"
echo "causing you grief for lid close events, hot plugging, etc."

trap ctrl_c INT

function ctrl_c() {
    echo " "
    printf "wc of ~/pid.log : " 
    wc ~/pid.log
    echo
    # Tally occurances of same Command Name always running
    sort -k15 ~/pid.log | uniq -f14 -c > ~/pid.tmp
    # What is the most frequent occurance?
    <~/pid.tmp awk '{print $1}' | sort -n | uniq -c > ~/pid.wrk
    HighCnt=$(awk -v max=0 '{if($1>max){want=$2; max=$1}}END{print want} '\
        ~/pid.wrk)
    echo HighCnt: $HighCnt
    # Exclude all processes => highest count
    awk '($1 < var) ' var="$HighCnt" ~/pid.tmp
    rm ~/pid.wrk ~/pid.tmp ~/pid.log
    
    exit 0
}

echo "$0 Possible suspects causing problems" > ~/pid.log

while true ; do

    ps -elf >> ~/pid.log
    sleep .05 # 20 samples / second
    
done
```

## Missing pieces

This is the code I added to make it work.

``` bash
# What is the most frequent occurance?
<~/pid.tmp awk '{print $1}' | sort -n | uniq -c > ~/pid.wrk
HighCnt=$(awk -v max=0 '{if($1>max){want=$2; max=$1}}END{print want} '\
    ~/pid.wrk)
echo HighCnt: $HighCnt
# Exclude all processes => highest count
awk '($1 < var) ' var="$HighCnt" ~/pid.tmp
## ```



### Sample Output

The `gnome-calculator` PID shows up as desired. There is an extra line `sleep 60` which is not wanted but occurs because a daemon woke up and slept again during the test period.

{% include copyHeader.html %}
``` bash
$ ps-suspects.sh
10 times / second ps -elf is captured to /home/rick/pid.log

Type Ctrl+C when done capturing

~/pid.log is sorted and uniq counted on column 15
which is full path and program name.

Then all matches with same unique count (the headings)
are stripped and only new processes started are printed.

This function can help you trace down what processes are
causing you grief for lid close events, hot plugging, etc.
^C 
wc of ~/pid.log :   17288  343162 2717102 /home/rick/pid.log

HighCnt: 63
      1 /mnt/e/bin/ps-suspects.sh Possible suspects causing problems
     26 0 R rick     25976  2051  0  80   0 - 120676 -     10:43 ?        00:00:00 gnome-calculator
     62 0 S root     22561   980  0  80   0 -  3589 -      10:42 ?        00:00:00 sleep 60
```

