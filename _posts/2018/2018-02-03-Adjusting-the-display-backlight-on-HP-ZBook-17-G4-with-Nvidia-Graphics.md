---
layout:       post
title:        >
    Adjusting the display backlight on HP ZBook 17 G4 with Nvidia Graphics
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1002694
type:         Answer
tags:         nvidia hp backlight
created_date: 2018-02-03 16:55:59
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,709 "
accepted:     
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-03-Adjusting-the-display-backlight-on-HP-ZBook-17-G4-with-Nvidia-Graphics.md
toc:          false
navigation:   false
clipboard:    false
---

# Adjusting brightness with software controls

When you lack hardware controls to adjust brightness the only option is via software.

## Find your monitor name using `xrandr`

Run this command to find monitors connected to `xrandr`:

``` 
$ xrandr | grep connected | grep -v dis
eDP-1 connected primary 1920x1080+0+1080 (normal left inverted right x axis y axis) 382mm x 215mm
DP-1 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
```

For me it is `eDP-1` but on your system it is `DP-3`

## Set --brightness in `xrandr`

You can set brightness to screen off `0` to full bright `1`.

You can set it above full bright ie `1.5` but your colors will become overly saturated.

A good starting point for a screen that is too bright (hard on your poor eyes) is `.5`

``` 
xrandr --output DP-3 --brightness .5
```

From there you can adjust accordingly.
