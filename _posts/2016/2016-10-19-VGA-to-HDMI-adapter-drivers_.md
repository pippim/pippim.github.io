---
layout:       post
title:        >
    VGA to HDMI adapter drivers?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/838994
type:         Answer
tags:         16.04 multiple-monitors screen hdmi lts
created_date: 2016-10-19 01:10:34
edit_date:    
votes:        "1 "
favorites:    
views:        "5,831 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-19-VGA-to-HDMI-adapter-drivers_.md
toc:          false
navigation:   false
clipboard:    false
---

I found the old VGA In+Audio In to HDMI Out adapter from 2014. It's a Foscom. On one side is 15-pin VGA and 3 pin Audio jack. On the other side is DC Power in, VGA Out and two LEDs, one red and one green.

Unfortunately I couldn't find the power adapter for it. I found old code which used to run in `/etc/rc.local` but was then moved to a script file to be called from `Startup Applications`:

``` sh
#!/bin/sh -e
#======== Call TV mode awhile after booting because it doesn't work on initial boot.
#
# This was copied from /etc/rc.local.  Annotations here should be replicated there.
# This script is used to plug VGA cable & audio into HDMI converter box.

# ---Outputs from "gtf" and "cvt" --------------------------------------------------------

#~$ gtf 1920 1080 60

#  # 1920x1080 @ 60.00 Hz (GTF) hsync: 67.08 kHz; pclk: 172.80 MHz
#  Modeline "1920x1080_60.00"  172.80  1920 2040 2248 2576  1080 1081 1084 1118  -HSync +Vsync

#~$ cvt 1920 1080 60
## 1920x1080 59.96 Hz (CVT 2.07M9) hsync: 67.16 kHz; pclk: 173.00 MHz
#Modeline "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync
# -----------------------------------------------------------------------------------------


# Generate 1920x1080 using gtf instead of cvt
xrandr --newmode "1920x1080_60.00"  172.80  1920 2040 2248 2576  1080 1081 1084 1118  -HSync +Vsync
xrandr --addmode VGA1 1920x1080_60.00
xrandr --output VGA1 --mode 1920x1080_60.00

exit 0
```

The # comments in the script indicate you need to run `gtf` (or `cvt`) passing the parameters 1920x1080 @ 60Hz to get thew `newmode` variables.

The `newmode` variables you right down and in turn type in to passs to xrandr `--newmode` parameter along with the variables you wrote down.

Note that your variables would be differen than mine unless you have a Toshiba Satellite Core 2 Duo T5750 laptop.

Sorry I was hoping to have a great answer but until I find the power supply for the Foscom VGA to HDMI converter I'm going by memory.
