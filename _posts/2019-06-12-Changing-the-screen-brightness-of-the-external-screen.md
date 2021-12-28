---
layout:       post
title:        Changing the screen brightness of the external screen
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1150416
type:         Answer
tags:         16.04 multiple-monitors brightness hdmi
created_date: 2019-06-12 00:48:29
edit_date:    2020-06-12 14:37:07
votes:        2
favorites:    
views:        33,813
accepted:     
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    true
---

Rather than plugging in a brightness level for `xrandr` you can use this bash script to adjust the brightness up or down in steps.

Copy bash script below to a file called `bright`

Then mark it executable with `chmod a+x bright`

<!-- Language-all: lang-bash -->

# Bash Script

{% include copyHeader.html %}
``` 
#!/bin/bash

MON="DP-1-1"    # Discover monitor name with: xrandr | grep " connected"
STEP=5          # Step Up/Down brightnes by: 5 = ".05", 10 = ".10", etc.

CurrBright=$( xrandr --verbose --current | grep ^"$MON" -A5 | tail -n1 )
CurrBright="${CurrBright##* }"  # Get brightness level with decimal place

Left=${CurrBright%%"."*}        # Extract left of decimal point
Right=${CurrBright#*"."}        # Extract right of decimal point

MathBright="0"
[[ "$Left" != 0 && "$STEP" -lt 10 ]] && STEP=10     # > 1.0, only .1 works
[[ "$Left" != 0 ]] && MathBright="$Left"00          # 1.0 becomes "100"
[[ "${#Right}" -eq 1 ]] && Right="$Right"0          # 0.5 becomes "50"
MathBright=$(( MathBright + Right ))

[[ "$1" == "Up" || "$1" == "+" ]] && MathBright=$(( MathBright + STEP ))
[[ "$1" == "Down" || "$1" == "-" ]] && MathBright=$(( MathBright - STEP ))
[[ "${MathBright:0:1}" == "-" ]] && MathBright=0    # Negative not allowed
[[ "$MathBright" -gt 999  ]] && MathBright=999      # Can't go over 9.99

if [[ "${#MathBright}" -eq 3 ]] ; then
    MathBright="$MathBright"000         # Pad with lots of zeros
    CurrBright="${MathBright:0:1}.${MathBright:1:2}"
else
    MathBright="$MathBright"000         # Pad with lots of zeros
    CurrBright=".${MathBright:0:2}"
fi

xrandr --output "$MON" --brightness "$CurrBright"   # Set new brightness

# Display current brightness
printf "Monitor $MON "
echo $( xrandr --verbose --current | grep ^"$MON" -A5 | tail -n1 )

```

- Change `MON="DP-1-1"` to your monitor name, ie `MON="eDP-1-1"`
- Change `STEP=5` to your step value, eg `STEP=2` is less noticeable

Call the script with:

- `bright Up` or `bright +` to increase brightness by step value
- `bright Down` or `bright -` to decrease brightness by step value
- `bright` (with no parameters) to get the current brightness level

Hopefully the bash / shell commands can easily be googled for education but if any questions don't hesitate to ask :)
