---
layout:       post
title:        >
    Disabling external monitor with xrandr also disables laptop screen
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1178690
type:         Answer
tags:         display xrandr
created_date: 2019-10-04 11:03:54
edit_date:    
votes:        "3 "
favorites:    
views:        "4,033 "
accepted:     
uploaded:     2024-03-11 05:28:40
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-04-Disabling-external-monitor-with-xrandr-also-disables-laptop-screen.md
toc:          false
navigation:   false
clipboard:    false
---

I'm not using i3 windowing manager but what could be happening here is external monitor is the primary monitor and laptop display mirrors it. Either way create this bash script:



``` bash
#!/bin/bash
xrandr --output DP1 --off
xrandr --output eDP1 --auto --primary
```

Mark the script as executable: `chmod a+x /path/to/scriptname`

Then call the script with `/path/to/scriptname`

Replace `eDP1` with your laptop monitor name discovered using:

``` bash
xrandr | grep " connected"
```
