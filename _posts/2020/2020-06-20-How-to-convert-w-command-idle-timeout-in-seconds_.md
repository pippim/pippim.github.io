---
layout:       post
title:        >
    How to convert w command idle timeout in seconds?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/62481189
type:         Answer
tags:         bash shell
created_date: 2020-06-20 03:11:31
edit_date:    2020-06-20 17:13:16
votes:        "1 "
favorites:    
views:        "140 "
accepted:     Accepted
uploaded:     2022-01-30 11:51:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-20-How-to-convert-w-command-idle-timeout-in-seconds_.md
toc:          false
navigation:   false
clipboard:    true
---

Here is a bash solution:

<!-- Language-all: lang-bash -->

{% include copyHeader.html %}
``` 
WishSeconds () {

    # PARM 1: 'w' command idle time 44.00s, 5:10, 1:28m, 3days, etc.
    #      2: Variable name (no $ is used) to receive idel time in seconds

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

``` 
Passing 20days: 1728000
Passing 1:10m: 4200
Passing 1:30: 90
Passing 44.20s: 44
```

## Note

Instead of using:

``` 
w | tr -s " " | cut -d" " -f1,5 | tail -n+3
```

You can chop off the tail and use:

``` 
w -h | tr -s " " | cut -d" " -f1,5
```

This will remove the headers for you. I do the same plus use short format (sans CPU stats) and IP addresses instead of host names so I use:

``` 
w -ish | tr -s " " | cut -d" " -f1,5
```

Use `man w` for more argument details.
