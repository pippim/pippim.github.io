---
layout:       post
title:        >
    Nvidia drivers Ubuntu 18.04 - Dell G5 15
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1165689
type:         Answer
tags:         drivers nvidia
created_date: 2019-08-14 11:39:33
edit_date:    2019-08-15 11:53:15
votes:        "2 "
favorites:    
views:        "3,571 "
accepted:     
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-14-Nvidia-drivers-Ubuntu-18.04-Dell-G5-15.md
toc:          false
navigation:   false
clipboard:    true
---

It might be an "18.04 thing": [External monitor not detected on Ubuntu 18.04](External monitor not detected on Ubuntu 18.04). I've never experienced it upgrading to 18.04 or 19.04 but I'm already using LightDM.

I have a close but not identical system. Dell AW 17R3, I-7 6700HQ Intel HD 530 iGPU, nVidia GTX 970M GPU. Besides comments above, I'll share my `xorg.conf` in hopes it might help:

{% include copyHeader.html %}
``` 
$ cat /etc/X11/xorg.conf

Section "ServerLayout"
    Identifier "layout"
    Screen 0 "nvidia"
    Inactive "intel"
EndSection

Section "Monitor"
    Identifier "DP-1-1"
    Modeline "3840x2160_54.00"  637.50  3840 4152 4568 5296  2160 2163 2168 2230 -hsync +vsync
    Option "PreferredMode" "3840x2160_54.00"
EndSection

Section "Device"
    Identifier "intel"
    Driver "modesetting"
    BusID "PCI:0@0:2:0"
    Option "AccelMethod" "None"
EndSection

Section "Screen"
    Identifier "intel"
    Device "intel"
EndSection

Section "Device"
    Identifier "nvidia"
    Driver "nvidia"
    BusID "PCI:1@0:0:0"
    Option "ConstrainCursor" "off"
EndSection

Section "Screen"
    Identifier "nvidia"
    Device "nvidia"
    Option "AllowEmptyInitialConfiguration" "on"
    Option "IgnoreDisplayDevices" "CRT"
EndSection
```

Ignore the `DP-1-1` monitor section. It is only for my 3rd monitor which has a finicky; 4K TV, or Thuderbolt 3 adapter, or cable or all three.
