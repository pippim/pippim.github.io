---
layout:       post
title:        >
    xrandr - different effect when put in .xprofile
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1195642
type:         Answer
tags:         xorg multiple-monitors display xrandr
created_date: 2019-12-12 12:51:38
edit_date:    
votes:        "1 "
favorites:    
views:        "574 "
accepted:     Accepted
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-12-xrandr---different-effect-when-put-in-.xprofile.md
toc:          false
navigation:   false
clipboard:    true
---

The method used by others (linked in comments) is considered "hack" by OP. Which I guess it might be. 

Using X configuration file which is loaded before login screen and not after login can be done here:

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
    Option "TearFree"    "true"
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

[Xorg Monitor options][1]


  [1]: https://www.x.org/releases/current/doc/man/man5/xorg.conf.5.xhtml#heading12
