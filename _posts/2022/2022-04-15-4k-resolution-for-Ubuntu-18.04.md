---
layout:       post
title:        >
    4k resolution for Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1402688
type:         Answer
tags:         drivers nvidia display display-resolution hdmi
created_date: 2022-04-15 17:50:11
edit_date:    
votes:        "2 "
favorites:    
views:        "4,933 "
accepted:     
uploaded:     2025-05-18 09:39:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-04-15-4k-resolution-for-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

# What is `xrandr`?

This question was posted in comments by OP.

At the command line type: `xrandr -q`

``` shell
DP-1-1 connected 3840x2160+1920+0 (normal left inverted right x axis y axis) 1600mm x 900mm
   3840x2160_54.00  53.98*+
   3840x2160     30.00 +  24.00    29.97    23.98  
   4096x2160     24.00    23.98  
   1920x1080     60.00    59.94    30.00    24.00    29.97    23.98  
   1920x1080i    60.00    59.94  
   1680x1050     59.88  
   1280x1024     60.02  
   1440x900      59.90  
   1280x960      60.00  
   1280x800      74.93    59.91  
   1280x768      59.87  
   1280x720      60.00    30.00    59.94    29.97    24.00    23.98  
   1024x768      60.00  
   800x600       60.32    56.25  
   720x480       60.00    59.94  
   640x480       60.00    59.94  
   720x400       70.08  
```

Above is example of a 4K screen that is working. Like yourself a custom dongle converting ThunderBolt 3 to HDMI is used. Consequently a custom refresh rate of 54 Hz had to be setup.

Start off by putting your own `xrandr -q` output into your question. Then everyone can help you fine-tune your setup from there.
