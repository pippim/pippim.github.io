---
layout:       post
title:        >
    Brightness wont go up or down and is stuck on max setting! Tried others solutions but still no fix! Please someone help!
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1058157
type:         Answer
tags:         grub2 brightness asus mint
created_date: 2018-07-21 15:04:37
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "817 "
accepted:     Accepted
uploaded:     2022-01-14 05:00:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-21-Brightness-wont-go-up-or-down-and-is-stuck-on-max-setting!-Tried-others-solutions-but-still-no-fix!-Please-someone-help!.md
toc:          false
navigation:   false
clipboard:    true
---

## Software solution

In the question and in comments OP has tried many different hardware solutions to no avail. This leaves software solutions which aren't as effective but better than nothing. This script can be adapted for all monitors:

<!-- Language-all: bash -->

{% include copyHeader.html %}
``` 
#!/bin/bash

# NAME: alien
# PATH: /mnt/e/bin
# DESC: Set brightness of Alien Laptop
# DATE: Dec 9, 2017. Modified July 21, 2018.

# NOTE: Monitor name changes with driver used: nVidia = "eDP-1-1"
#                                             Nouveau = "eDP-1"
#                                               Intel = "eDP1"

MonitorName="eDP"
AllMonitors=`xrandr -q | grep -v disconnected | grep connected | awk '{print $1}'`
echo All Monitors: $AllMonitors
substr=ab
for s in $AllMonitors; do
    if case ${s} in *"${MonitorName}"*) true;; *) false;; esac; then
        FullMonitor=${s}
        printf %s\\n "'${s}' contains '${MonitorName}'"
    else
        printf %s\\n "'${s}' does not contain '${MonitorName}'"
    fi
done
echo Full Monitor: $FullMonitor

if [[ $# -ne 1 ]]; then
    xrandr --verbose | grep -A5 "^$FullMonitor" > /tmp/alien
    head -n1 /tmp/alien
    echo "$(tput setaf 6)" ; tail -n1 /tmp/alien ; echo "$(tput sgr0)"
    rm /tmp/alien
    echo 'One argument required for brightness level, e.g. "alien .63"'
    echo 'will set brightness level of Alien display to level .63 using xrandr'
    exit 1
fi

xrandr --output "$FullMonitor" --brightness "$1"

```

The script above was written for a three monitor system and addresses the laptop screen. Two other scripts (not listed here) are called "Sony" and "Toshiba" for two external HDMI monitors. The laptop can have Intel driver for i7-6700 HQ HD 530 graphics iGPU, nVidia GTX 970M GPU with different `xrandr` screen names depending on nVidia Proprietary Graphics driver or Nouveau Open Source driver.

Because the system has a total of 9 different xrandr screen names, three names for each screen, the script is flexible depending on how the machine has been booted.

To adapt this script to your needs:

- Rename script, eg change `alien` to `msi`
- Rename `eDP`, use `xrandr` to get list of all monitor names and select appropriate prefix. Enter prefix only into the script. It will find the `-1` suffix automatically.
- When calling pass parameter one for brightness level; `.75` = 75%, `.3` = 30%, etc.


----------

## Keep checking new kernels for hardware support

Use these commands to check if hardware is supported after a kernel update:

``` 
$ ls /sys/class/backlight
intel_backlight
$ cat /sys/class/backlight/intel_backlight/*brightness*
3000
3000
7500

```

- The first `3000` is the actual brightness
- The second `3000` is the last attempt brightness change
- `7500` is the maximum brightness level for your hardware

To attempt to change hardware brightness level use:

``` 
$ echo 2500 | sudo tee /sys/class/backlight/intel_backlight/brightness
2500

```

If hardware is supported you will see a change:

``` 
$ cat /sys/class/backlight/intel_backlight/*brightness*
2500
2500
7500

```

