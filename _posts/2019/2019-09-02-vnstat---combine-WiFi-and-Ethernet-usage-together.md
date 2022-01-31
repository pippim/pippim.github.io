---
layout:       post
title:        >
    vnstat - combine WiFi and Ethernet usage together
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1170353
type:         Answer
tags:         networking bash conky bandwidth vnstat
created_date: 2019-09-02 18:33:20
edit_date:    2019-09-07 15:18:07
votes:        "4 "
favorites:    
views:        "319 "
accepted:     
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-02-vnstat---combine-WiFi-and-Ethernet-usage-together.md
toc:          false
navigation:   false
clipboard:    true
---

This bash script will add up `vnstat` totals for multiple interfaces:

<!-- Lanaguage-all: lang-bash -->

{% include copyHeader.html %}
``` 
#!/bin/bash

# NAME: vnall
# DESC: Add up multiple interfaces of vnstat into totals for today,
#       yesterday, current week and current month.
# PARM: "today", "yesterday", "week" (current), "month" (current)
# DATE: September 2, 2019. Modified September 4, 2019.

# To discover interfaces `lshw -c network` then place names below
# aInterfaces=( "enp59s0" "wlp60s0" )
# Use automatic discovery if you are unsure of names or don't want to look up
Interfaces=( $(lshw -c network 2>/dev/null | grep name: | cut -d':' -f2) )

Tally () {
    Ktot=0     # Totals in KiB, MiB and GiB
    Mtot=0
    Gtot=0
    # Tally all interfaces
    local i Interface Line Raw ThisNum
    for (( i=0; i<${#aInterfaces[@]}; i++ )) ; do

        Interface="${aInterfaces[i]}"
        if [[ "$vnstatParm" == "" ]] ; then
            Line=$(vnstat -i "$Interface" | grep "$GrepString")
        else
            Line=$(vnstat -i "$Interface" "$vnstatParm" | grep "$GrepString")
        fi

        [[ $Line == "" ]] && continue   # No data collected yet
        if [[ $vnstatParm == "" ]] ; then
            Raw=$(echo "$Line" | awk '{print $8 substr ($9, 1, 1)}')
        else
            Raw=$(echo "$Line" | awk '{print $9 substr ($10, 1, 1)}')
        fi

        ThisNum="${Raw::-1}"    # Number without suffix
        case ${Raw: -1} in      # Decide on last character K, M or G
            K)
                Ktot=$(echo "$Ktot + $ThisNum " | bc) ;;
            M)
                Mtot=$(echo "$Mtot + $ThisNum " | bc) ;;
            G)
                Gtot=$(echo "$Gtot + $ThisNum " | bc) ;;
            *)
                echo "Unknown Unit: ${Raw: -1}" ;;
        esac
    done

    [[ $Gtot != "0" ]] && { echo "$Gtot G" ; return ; }
    [[ $Mtot != "0" ]] && { echo "$Mtot M" ; return ; }
    [[ $Ktot != "0" ]] && { echo "$Ktot K" ; return ; }
    echo "N/A"
} # Tally

Init () {
    GrepString="$1"     # Create defaults for "today" and "yesterday"
    vnstatParm=""
    if [[ $1 == week ]] ; then
        GrepString="current $GrepString"
        vnstatParm="-w"
    fi
    if [[ $1 == month ]] ; then
        GrepString=$(date +"%b '%y")
        vnstatParm="-m"
    fi
} # Init

Init "$@"
Tally
```

## Automatic vs Manual interface names

Notes this section of code:

``` 
# To discover interfaces `lshw -c network` then place names below
# aInterfaces=( "enp59s0" "wlp60s0" )
# Use automatic discovery if you are unsure of names or don't want to look up
Interfaces=( $(lshw -c network 2>/dev/null | grep name: | cut -d':' -f2) )
```

The fourth line automatically discovers the interface names (in my case `enp59s0` and `wlp60s0`) and builds the array of interfaces (`aInterfaces`). If you prefer to manually specify the names in your script then place a comment (`#`) at the beginning of the line and uncomment the second line by removing the `#` line prefix.

## Conky code shrinks considerably

Because the new `vnall` script automatically creates parameters as needed, the conky code is a lot smaller than before:

``` 
${color}${goto 5}Today ${goto 100}Yesterday ${goto 225}Week ${goto 325}Month ${color green}
# vnstatd updates database every five minutes
${execi 300 vnall "today"} ${goto 110}${execi 300 vnall "yesterday"} ${goto 220}${execi 300 vnall "week"} ${goto 315}${execi 300 vnall "month"}
```

## Conky Image

[![vnall.png][1]][1]


  [1]: https://i.stack.imgur.com/iUkgD.png

