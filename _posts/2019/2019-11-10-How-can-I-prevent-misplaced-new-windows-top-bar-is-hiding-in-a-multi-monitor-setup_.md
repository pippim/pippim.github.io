---
layout:       post
title:        >
    How can I prevent misplaced new windows -top bar is hiding- in a multi-monitor setup?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187728
type:         Answer
tags:         multiple-monitors window window-manager
created_date: 2019-11-10 14:01:40
edit_date:    
votes:        "1 "
favorites:    
views:        "367 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-10-How-can-I-prevent-misplaced-new-windows-top-bar-is-hiding-in-a-multi-monitor-setup_.md
toc:          false
navigation:   false
clipboard:    false
---

There have been problems reported where windows are cropped when the two monitors don't line up at the top:

[![screen display.png][1]][1]

To confirm they line up perfectly along the top use `xrandr`:

``` 
$ xrandr | grep " connected" | grep "+0"

HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
DP-1-1 connected 3840x2160+1920+0 (normal left inverted right x axis y axis) 1600mm x 900mm
```

The `+0` confirms both monitors are aligned to the top.


  [1]: https://i.stack.imgur.com/5b0pC.png
