---
layout:       post
title:        >
    Lowering screen max brightness with Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1051288
type:         Answer
tags:         18.04 laptop screen brightness backlight
created_date: 2018-07-01 18:45:04
edit_date:    
votes:        "2 "
favorites:    
views:        "1,005 "
accepted:     Accepted
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-01-Lowering-screen-max-brightness-with-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    true
---

I wrote a script to monitor `/sys/class/backlight/*/brightness` and redirect it: [How to switch between options in `/sys/class/backlight` to solve brightness problem?][1].

It can be quickly modified to your needs by adding three lines:

``` 
    # Modification for: https://askubuntu.com/questions/1051171/lowering-screen-max-brightness-with-ubuntu-18-04
    # If brightness > 50, set to 50
    [[ WatchPer -gt 50 ]] && WatchPer=50
```

## Modified `redirected-brightness` script



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: redirect-brightness
# PATH: /usr/local/bin
# DESC: Redirect to correct driver when Ubuntu is adjusting the wrong
#       /sys/class/DRIVER_NAME/brightness

# DATE: June 13, 2018. Modified June 14, 2018.

# NOTE: Written for Ubuntu question:
#       https://askubuntu.com/q/1045624/307523

WatchDriver="/sys/class/backlight/intel_backlight"
PatchDriver="/sys/class/backlight/intel_backlight"

# Must be running as sudo
if [[ $(id -u) != 0 ]]; then
    echo >&2 "Root access required. Use: 'sudo redirect-brightness'"
    exit 1
fi

# inotifywait required
type inotifywait >/dev/null 2>&1 || \
    { echo >&2 "'inotifywait' required but it's not installed.  Aborting."; \
      echo >&2 "Use 'sudo apt install inotify-tools' to install it.'"; \
      exit 1; }

# Was right watch driver directory name setup correctly?
if [[ ! -d $WatchDriver ]]; then
    echo >&2 "Watch directory: '$WatchDriver'"; \
    echo >&2 "does not exist. Did you spell it correctly? Aborting.'"; \
    exit 1;
fi

# Was right patch driver directory name setup correctly?
if [[ ! -d $PatchDriver ]]; then
    echo >&2 "Redirect to directory: '$PatchDriver'"; \
    echo >&2 "does not exist. Did you spell it correctly? Aborting.'"; \
    exit 1;
fi

# Get maximum brightness values
WatchMax=$(cat $WatchDriver/max_brightness)
PatchMax=$(cat $PatchDriver/max_brightness)

# PARM: 1="-l" or "--log-file" then write each step to log file.
fLogFile=false
if [[ $1 == "-l" ]] || [[ $1 == "--log-file" ]]; then
    fLogFile=true
    LogFile=/tmp/redirect-brightness.log
    echo redirect-brightness LOG FILE > $LogFile
    echo WatchMax: $WatchMax PatchMax: $PatchMax >> $LogFile
fi

SetBrightness () {
    # Calculate watch current percentage
    WatchAct=$(cat $WatchDriver/actual_brightness)
    WatchPer=$(( WatchAct * 100 / WatchMax ))
    [[ $fLogFile == true ]] && echo WatchAct: $WatchAct WatchPer: $WatchPer >> $LogFile
    # Reverse engineer patch brightness to set
    # Modification for: https://askubuntu.com/questions/1051171/lowering-screen-max-brightness-with-ubuntu-18-04
    # If brightness > 50, set to 50
    [[ WatchPer -gt 50 ]] && WatchPer=50
    PatchAct=$(( PatchMax * WatchPer / 100 ))
    echo $PatchAct | sudo tee $PatchDriver/brightness
    [[ $fLogFile == true ]] && echo PatchAct: $PatchAct >> $LogFile
}

# When machine boots, set brightness to last saved value
SetBrightness

# Wait forever for user to press Fn keys adjusting brightness up/down.
while (true); do
    inotifywait --event modify $WatchDriver/actual_brightness
    [[ $fLogFile == true ]] && \
        echo "Processing modify event in $WatchDriver/actual_brightness" >> $LogFile
    SetBrightness
done
```




  [1]: {% post_url /2018/2018-06-12-How-to-switch-between-options-in-`^sys^class^backlight`-to-solve-brightness-problem^ %}
