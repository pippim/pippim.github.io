---
layout:       post
title:        >
    Set HDMI sound output automatically on connect/disconnect
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/908534
type:         Answer
tags:         12.04 sound hdmi events
created_date: 2017-04-24 22:54:02
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "20,355 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-04-24-Set-HDMI-sound-output-automatically-on-connect_disconnect.md
toc:          false
navigation:   false
clipboard:    true
---

## Ubuntu 16.04 - 20.04 Answer

This works for Ubuntu 16.04 - 20.04 which introduced a bug with Pulse Audio 8. Create the file `hotplugtv` (or `hotplug-hdmi` if you prefer) and copy in the following lines:




{% include copyHeader.html %}
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

