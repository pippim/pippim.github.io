---
layout:       post
title:        >
    Hot plug HDMI connection doesn't work on Ubuntu
site:         Super User
stack_url:    https://superuser.com/q/1238332
type:         Answer
tags:         linux ubuntu hdmi elementaryos hotplug
created_date: 2017-08-07 01:23:35
edit_date:    
votes:        "0 "
favorites:    
views:        "23,477 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-07-Hot-plug-HDMI-connection-doesn_t-work-on-Ubuntu.md
toc:          false
navigation:   false
clipboard:    false
---

Here is the `hotplugtv` bash script I wrote for Ubuntu 16.04. It is reported to work with Ubuntu 17.04 as well.



``` bash
#!/bin/bash

# NAME: hotplugtv
# PATH: /home/$USER/bin
# DESC: Update pulseaudio output device when HDMI TV plugged / unplugged
# CALL: called from /etc/udev/rules.d/99-hotplugtv.rules 
#       and /home/$USER/bin/lock-screen-timer
# DATE: Created Nov 26, 2016.
# NOTE: logs output using log-file
# UPDT: Dec 14, 2016 - Sometimes /sys/class/drm/card0 & sometimes /sys/class/drm/card1
#       so use /sys/class/dmcard* instead.
#       Dec 21, 2016 - Relocated to /home/$USER/bin for calling by lock-screen-timer
#       Aug 06, 2017 - Convert from home grown log-file to universal logger command.

if [[ $(cat /sys/class/drm/card*-HDMI-A-1/status | grep -Ec "^connected") -eq 1 ]]; then
        logger -t /home/rick/bin/log-hotplugtv "HDMI TV connected"
        /bin/sleep 2;
        export PULSE_RUNTIME_PATH="/run/user/1000/pulse/";
        sudo -u rick -E pacmd set-card-profile 0 output:hdmi-stereo;
else
        logger -t /home/rick/bin/log-hotplugtv "HDMI TV disconnected"
        export PULSE_RUNTIME_PATH="/run/user/1000/pulse/";
        sudo -u rick -E pacmd set-card-profile 0 output:analog-stereo;
fi

exit 0
```


**IMPORTANT:** Change the user name "rick" to your user name.

In order to call this script from `udev` during hot-plug events create the file `/etc/udev/rules.d/99-hotplugtv.rules` containing:

``` bash
ACTION=="change", SUBSYSTEM=="drm", ENV{HOTPLUG}=="1", RUN+="/home/rick/bin/hotplugtv"
```

Change `/home/rick/bin/` to the path where you placed `hotplugtv` script.

