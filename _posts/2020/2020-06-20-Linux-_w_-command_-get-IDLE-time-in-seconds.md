---
layout:       post
title:        >
    Linux 'w' command, get IDLE time in seconds
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/593958
type:         Answer
tags:         linux bash
created_date: 2020-06-20 02:52:39
edit_date:    2020-06-20 17:48:43
votes:        "0 "
favorites:    
views:        "17,036 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-20-Linux-_w_-command_-get-IDLE-time-in-seconds.md
toc:          false
navigation:   false
clipboard:    false
---

Here is a bash solution:



``` bash
WishSeconds () {

    # PARM 1: 'w -ish' command idle time 44.00s, 5:10, 1:28m, 3days, etc.
    #      2: Variable name (no $ is used) to receive idle time in seconds

    # NOTE: Idle time resets to zero when user types something in terminal.
    #       A looping job calling a command doesn't reset idle time.

    local Wish Unit1 Unit2
    Wish="$1"
    declare -n Seconds=$2

    # Leading 0 is considered octal value in bash. Change ':09' to ':9'
    Wish="${Wish/:0/:}"

    if [[ "$Wish" == *"days"* ]] ; then
        Unit1="${Wish%%days*}"
        Seconds=$(( Unit1 * 86400 ))
    elif [[ "$Wish" == *"m"* ]] ; then
        Unit1="${Wish%%m*}"
        Unit2="${Unit1##*:}"
        Unit1="${Unit1%%:*}"
        Seconds=$(( (Unit1 * 3600) + (Unit2 * 60) ))
    elif [[ "$Wish" == *"s"* ]] ; then
        Seconds="${Wish%%.*}"
    else
        Unit1="${Wish%%:*}"
        Unit2="${Wish##*:}"
        Seconds=$(( (Unit1 * 60) + Unit2 ))
    fi

} # WishSeconds

WishSeconds "20days" Days ; echo Passing 20days: $Days
WishSeconds "1:10m"  Hours ; echo Passing 1:10m: $Hours
WishSeconds "1:30"   Mins ; echo Passing 1:30: $Mins
WishSeconds "44.20s" Secs ; echo Passing 44.20s: $Secs
```

## Results

``` bash
Passing 20days: 1728000
Passing 1:10m: 4200
Passing 1:30: 90
Passing 44.20s: 44
```
