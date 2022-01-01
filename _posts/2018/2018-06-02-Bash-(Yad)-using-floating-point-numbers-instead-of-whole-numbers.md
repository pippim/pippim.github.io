---
layout:       post
title:        >
    Bash (Yad) using floating point numbers instead of whole numbers
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/447533
type:         Question
tags:         bash locale unicode yad
created_date: 2018-06-02 20:48:08
edit_date:    2018-06-13 10:07:19
votes:        "0 "
favorites:    
views:        "512 "
accepted:     Accepted
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

I wrote this bash [script][1] that runs multiple timers. The problem is my array stores whole numbers:

``` 
|1|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|1

```

But the other user's `LC_NUMERIC` is setup as `it_IT.UTF-8` and their bash array is very different:

``` 
1,000000|0,000000|0,000000|0,000000|0,000000|0,000000|0,000000|0,000000|0,000‌​000|0,000000|0,000000|0,000000|0,000000|0,000000|0,000000|0,000000|1,000000

```

This causes my script to break when testing if an array entry is greater than zero:


``` 
iActiveTimersCount=0
for ((i=0; i<MAX_TIMERS; i++)); do
    if [[ ${aDuration[i]} -gt 0 ]] ; then
        (( iActiveTimersCount++ ))
        iAllTimersSaveSec=$(( iAllTimersSaveSec + ${aDuration[i]} ))
    fi
done

```

### Command line tests

These tests can confirm what bash is "thinking":

``` 
$ if [[ 30,000000 -gt 0 ]]; then echo TRUE ; else echo FALSE ; fi
FALSE

```

``` 
$ if [[ 30.000000 -gt 0 ]]; then echo TRUE ; else echo FALSE ; fi
bash: [[: 30.000000: syntax error: invalid arithmetic operator (error token is ".000000")
FALSE

```

### Other Info

I've tried (via chat) getting other user to use `export LC_ALL=C` and export `LC_NUMERIC="en_US.UTF-8"` all to no avail.

***How can bash be forced to use whole numbers (integers)?***

----------


## Solution

The problem was YAD (Yet Another Dialog) storing numbers with decimal precision in Italy but not in North America. The solution was to use:

``` 
    # When LC_NUMERIC=it_IT-UTF8 30 seconds can be `30,000000` or
    # `30.000000` which breaks bash tests for `-gt 0`.
    # Search and replace ".000000" or ",000000" to null
    sed -i 's/[,.]000000//g' "$res1"
    sed -i 's/[,.]000000//g' "$res2"

```

  [1]: {% post_url /2018/2018-05-23-Set-of-countdown-timers-with-alarm %}



