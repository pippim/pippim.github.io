---
layout:       post
title:        >
    Setting monitor scaling to 200% with xrandr
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1194001
type:         Answer
tags:         xorg multiple-monitors display-resolution xrandr scaling
created_date: 2019-12-05 11:46:08
edit_date:    
votes:        "1 "
favorites:    
views:        "8,051 "
accepted:     Accepted
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-05-Setting-monitor-scaling-to-200_-with-xrandr.md
toc:          false
navigation:   false
clipboard:    false
---

You are just missing the `--scale 2x2` argument. So use:

``` 
xrandr \
  --output DP-4 --primary --pos 0x0 --scale 2x2 \
  --output DP-2 --pos 3840x0 --scale 2x2 \
  --output eDP-1-1 --off
```

**Note:** Double quoting the monitor and position is unnecessary so I removed the `"`.
