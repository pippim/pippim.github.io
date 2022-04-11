---
layout:       post
title:        >
    Xrandr shows HDMI1 disconnect w/ HDMI2 as primary with only one monitor
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1079356
type:         Answer
tags:         16.04 drivers intel-graphics hdmi xrandr
created_date: 2018-09-28 23:01:36
edit_date:    2022-03-21 02:17:41
votes:        "0 "
favorites:    
views:        "2,313 "
accepted:     Accepted
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-28-Xrandr-shows-HDMI1-disconnect-w_-HDMI2-as-primary-with-only-one-monitor.md
toc:          false
navigation:   false
clipboard:    false
---

## No cause for concern with extra HDMI monitor names

As long as everything works, you needn't worry how `xrandr` assigns monitor names.

In my setup for example:

``` 
$ xrandr | grep connected

HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
eDP-1-1 connected primary 1920x1080+0+1080 (normal left inverted right x axis y axis) 382mm x 215mm
DP-1-1 connected 1920x1080+1920+532 (normal left inverted right x axis y axis) 708mm x 398mm
HDMI-1-1 disconnected (normal left inverted right x axis y axis)
DP-1-2 disconnected (normal left inverted right x axis y axis)
HDMI-1-2 disconnected (normal left inverted right x axis y axis)
```

Everything works and I'm not concerned there are duplicate names for HDMI-1 that show as "disconnected".

A better technique is to use:

``` terminal
$ xrandr | grep " connected "

HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
eDP-1-1 connected primary 1920x1080+3840+2160 (normal left inverted right x axis y axis) 382mm x 215mm
DP-1-1 connected 3840x2160+1920+0 (normal left inverted right x axis y axis) 1600mm x 900mm
```

This technique spares you from sifting through "disconnected" monitors and more importantly is less confusing.
