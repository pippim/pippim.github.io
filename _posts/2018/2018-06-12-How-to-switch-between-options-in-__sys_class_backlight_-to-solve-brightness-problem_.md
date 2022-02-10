---
layout:       post
title:        >
    How to switch between options in `/sys/class/backlight` to solve brightness problem?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045763
type:         Answer
tags:         brightness acpi
created_date: 2018-06-12 00:19:10
edit_date:    2019-04-04 23:15:22
votes:        "5 "
favorites:    
views:        "3,243 "
accepted:     Accepted
uploaded:     2022-02-10 05:58:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-12-How-to-switch-between-options-in-__sys_class_backlight_-to-solve-brightness-problem_.md
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

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


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

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
## ```



# Original Answer June 11, 2018.

### Work In Progress Answer

There are many nVidia users with similar problems in Ubuntu 18.04:

- [Brightness on laptop MSI GT72VR in Ubuntu 18.04 with NVIDIA GTX 1060 Mobile doesn&#39;t work](Brightness on laptop MSI GT72VR in Ubuntu 18.04 with NVIDIA GTX 1060 Mobile doesn&#39;t work)
- [computer doesnt wake from suspension and couldnt change the brightness](computer doesnt wake from suspension and couldnt change the brightness)
- [Brightness control missing when using Nvidia drivers but re-appears with X.Org](Brightness control missing when using Nvidia drivers but re-appears with X.Org)
- [Xubuntu 18.04: make Fn brightness keys work with /sys/class/backlight/nv_backlight/](Xubuntu 18.04: make Fn brightness keys work with /sys/class/backlight/nv_backlight/)
- [How to alter backlight driver in lubuntu](How to alter backlight driver in lubuntu)
- [Brightness on laptop MSI GT72VR in Ubuntu 18.04 with NVIDIA GTX 1060 Mobile doesn&#39;t work](Brightness on laptop MSI GT72VR in Ubuntu 18.04 with NVIDIA GTX 1060 Mobile doesn&#39;t work)
- [NVIDIA display issue with brightness control and video playback](NVIDIA display issue with brightness control and video playback)
- [Unable to change the screen brightness](Unable to change the screen brightness)
- [The brightness of laptop screen cannot be adjusted with either the buttons or the slider. Edit](The brightness of laptop screen cannot be adjusted with either the buttons or the slider. Edit)

----------


## Before writing a script

I can write a script to mimic changes to /acpi_video and populate /nv_backlight but before I do try this:

- Edit `/etc/default/grub`.
- Find `quiet splash`
- Add behind splash: `acpi_backlight=vendor`
- Save the file
- Run `sudo update-grub`

According to this answer it should work for you: [Xubuntu 18.04: make Fn brightness keys work with /sys/class/backlight/nv_backlight/](Xubuntu 18.04: make Fn brightness keys work with /sys/class/backlight/nv_backlight/)


----------

## Wayland

Brightness doesn't work under Wayland. Make sure you aren't using it. See: [The brightness of laptop screen cannot be adjusted with either the buttons or the slider. Edit]({% post_url /2018/2018-03-03-The-brightness-of-laptop-screen-cannot-be-adjusted-with-either-the-buttons-or-the-slider.-Edit %})



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a></div>

