---
layout:       post
title:        >
    Fixing DPI from .xinitrc
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/529997
type:         Answer
tags:         x11 i3
created_date: 2019-07-13 17:25:07
edit_date:    
votes:        "0 "
favorites:    
views:        "2,656 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-13-Fixing-DPI-from-.xinitrc.md
toc:          false
navigation:   false
clipboard:    false
---

The default **DPI** (**D**ots **P**er **I**nch) is 96. When set to `100` font size increased by 4% which might not be noticeable. To confirm initial DPI use one of these commands:



``` bash
$ xdpyinfo | grep dots
  resolution:    96x96 dots per inch

$ grep DPI /var/log/Xorg.0.log
[     9.555] (--) NVIDIA(0): DPI set to (43, 44); computed from "UseEdidDpi" X config
[     9.761] (==) modeset(G0): DPI set to (96, 96)
```

For myself when I encounter a program that doesn't do DPI scaling very well, I use a value of `144` which is a 50% increase and then call the program:

``` bash
xrandr --dpi 144
/path/to/program-not-hdpi-aware
```
