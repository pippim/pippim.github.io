---
layout:       post
title:        >
    HDMI monitor not detected by laptop after unplugging and plugging back in
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/876684
type:         Answer
tags:         nvidia multiple-monitors display monitor
created_date: 2017-01-27 00:23:33
edit_date:    
votes:        "2 "
favorites:    
views:        "2,753 "
accepted:     
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-01-27-HDMI-monitor-not-detected-by-laptop-after-unplugging-and-plugging-back-in.md
toc:          false
navigation:   false
clipboard:    false
---

The closest I could find to your problem is this thread ([ubuntuforums.org - Nvidia GTX 950 and TV not seeing signal after input change or power off/on][1]) which references solutions for nVidia 970/980. It would seem your 960 is in between.

The solution proposed there is to reset the monitor to a bad mode and then a good mode using this code:



``` bash
#!/bin/sh
#Fix TV state when HDMI link is lost.
#By Mario Limonciello <email address hidden>
sleep 10
OUTPUT="HDMI-0"
BAD_MODE="1280x720"
GOOD_MODE="1920x1080"

for MODE in $BAD_MODE $GOOD_MODE; do
DISPLAY=:0 xrandr --output $OUTPUT --mode $MODE
sleep 2
done
```

I think this script can be improved but wanted to post it in it's original incarnation. 


----------


One of the authors in the link wanted to setup `udev` to automatically call the script on hot-plug event. I've done this for HDMI with this code (`hotplugtv`) in the past to fix Ubuntu 16.04 pulseaudio 8 bug:



``` bash
#!/bin/bash

if [[ $(cat /sys/class/drm/card*-HDMI-A-1/status | grep -Ec "^connected") -eq 1 ]]; then
        /bin/sleep 2;
        export PULSE_RUNTIME_PATH="/run/user/1000/pulse/";
        sudo -u rick -E pacmd set-card-profile 0 output:hdmi-stereo;
else
        export PULSE_RUNTIME_PATH="/run/user/1000/pulse/";
        sudo -u rick -E pacmd set-card-profile 0 output:analog-stereo;
fi

exit 0
```

You will need to modify the if test with your `/sys/class/drm/...` directory. Then modify the true side of the if test with your script file that resets hdmi screen. On the false side of the if test simply replace the code with a `:` (noop) if there is nothing to do when the `hdmi` device is unplugged.

In order to call this scrip from `udev` during hot-plug events create the file `/etc/udev/rules.d/99-hotplugtv.rules` containing:

``` bash
ACTION=="change", SUBSYSTEM=="drm", ENV{HOTPLUG}=="1", RUN+="/path/to/hotplugtv"
```

Change `/path/to/` to the path where you placed `hotplugtv` script.

  [1]: https://ubuntuforums.org/archive/index.php/t-2305154.html

