---
layout:       post
title:        Xrandr shows HDMI1 disconnect w/ HDMI2 as primary with only one monitor
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1079356
type:         Answer
tags:         16.04 drivers intel-graphics hdmi xrandr
created_date: 2018-09-28 23:01:36
edit_date:    
votes:        0
favorites:    
views:        2,214
accepted:     Accepted
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    false
---

## No cause for concern with extra HDMI monitor names

As long as everything works, you needn't worry how `xrandr` assigns monitor names.

In my setup for example:

``` 
$ xrandr | grep connected

```

``` 
HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
eDP-1-1 connected primary 1920x1080+0+1080 (normal left inverted right x axis y axis) 382mm x 215mm
DP-1-1 connected 1920x1080+1920+532 (normal left inverted right x axis y axis) 708mm x 398mm
HDMI-1-1 disconnected (normal left inverted right x axis y axis)
DP-1-2 disconnected (normal left inverted right x axis y axis)
HDMI-1-2 disconnected (normal left inverted right x axis y axis)

```

Everything works and I'm not concerned there are duplicate names for HDMI-1 that show as "disconnected".
