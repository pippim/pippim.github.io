---
layout:       post
title:        How to switch between options in `∕sys∕class∕backlight` to solve brightness problem?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045763
type:         Answer
tags:         brightness acpi
created_date: 2018-06-12 00:19:10
edit_date:    2019-04-04 23:15:22
votes:        4
favorites:    
views:        3,096
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    true
---

# Bash script `redirect-brightness`

Your problem is function keys to increase/decrease brightness are updating `/sys/class/backlight/acpi_video0/brightness` instead of `/sys/class/backlight/nv_backlight/brightness`

The original request was to intercept the function keys and use them to control the `nv_backlight` driver. The problem with this is:

- Tricky `udev` scripts
- No pop-up notification slider displaying brightness without complicated Python scripting.

The solution is to use `inotify` to monitor changes to `acpi_video0`. Then calculate the brightness percentage and apply that same percentage to `nv_backlight`.

In the bash script below you need to set:

``` 
WatchDriver="/sys/class/backlight/acpi_video0/brightness"
PatchDriver="/sys/class/backlight/nv_backlight/brightness"

```

Place the script in `/usr/local/bin` and make it executable using:

``` 
chmod a+x /usr/local/bin/redirect-brightness

```

First run the script from the command line using

``` 
redirect-brightness -l

```

If there is a problem check the log file using:

``` 
cat /tmp/redirect-brightness.log

```

If all works well add `redirect-brightness` to your startup applications.

## `redirect-brightness` bash script



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
## 
```



# Original Answer June 11, 2018.

### Work In Progress Answer

There are many nVidia users with similar problems in Ubuntu 18.04:

- https://askubuntu.com/questions/1030526/brightness-on-laptop-msi-gt72vr-in-ubuntu-18-04-with-nvidia-gtx-1060-mobile-does
- https://askubuntu.com/questions/1042809/computer-doesnt-wake-from-suspension-and-couldnt-change-the-brightness
- https://askubuntu.com/questions/1042069/brightness-control-missing-when-using-nvidia-drivers-but-re-appears-with-x-org
- https://askubuntu.com/questions/1041051/xubuntu-18-04-make-fn-brightness-keys-work-with-sys-class-backlight-nv-backlig
- https://askubuntu.com/questions/1041145/how-to-alter-backlight-driver-in-lubuntu
- https://askubuntu.com/questions/1030526/brightness-on-laptop-msi-gt72vr-in-ubuntu-18-04-with-nvidia-gtx-1060-mobile-does
- https://askubuntu.com/questions/1031541/ubuntu-solution-for-the-nvidia-display-issue-on-brightness-control-and-video-pla
- https://askubuntu.com/questions/1028979/unable-to-change-the-screen-brightness
- https://askubuntu.com/questions/1010405/the-brightness-of-laptop-screen-cannot-be-adjusted-with-either-the-buttons-or-th

----------


## Before writing a script

I can write a script to mimic changes to /acpi_video and populate /nv_backlight but before I do try this:

- Edit `/etc/default/grub`.
- Find `quiet splash`
- Add behind splash: `acpi_backlight=vendor`
- Save the file
- Run `sudo update-grub`

According to this answer it should work for you: https://askubuntu.com/questions/1041051/xubuntu-18-04-make-fn-brightness-keys-work-with-sys-class-backlight-nv-backlig/1041585#1041585


----------

## Wayland

Brightness doesn't work under Wayland. Make sure you aren't using it. See: https://askubuntu.com/questions/1010405/the-brightness-of-laptop-screen-cannot-be-adjusted-with-either-the-buttons-or-th/1011557#1011557

