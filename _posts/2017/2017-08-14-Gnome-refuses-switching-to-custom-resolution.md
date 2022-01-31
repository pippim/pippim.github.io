---
layout:       post
title:        >
    Gnome refuses switching to custom resolution
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/945993
type:         Answer
tags:         gnome xorg display-resolution
created_date: 2017-08-14 01:12:41
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "671 "
accepted:     Accepted
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-14-Gnome-refuses-switching-to-custom-resolution.md
toc:          false
navigation:   false
clipboard:    false
---

## You're making a minor mistake in `/etc/X11/xorg.conf`

``` 
Section "Monitor"
    Identifier "HDMI1"
    Option "PreferredMode" "1680x1050_60.00"
EndSection
```

You need an extra line (real life example, not yours):

``` 
Section "Monitor"
    Identifier "VGA1"
    Modeline "1280x1024_60.00"  109.00  1280 1368 1496 1712  1024 1027 1034 1063 -hsync +vsync
    Option "PreferredMode" "1280x1024_60.00"
EndSection
```

To setup the `Modeline` values you need to use:

``` 
cvt 1680 1050
```

copy and paste the output values to your `/etc/X11/xorg.conf`. In addition 
to the "Monitor" section you should have a "Screen" and "Device" section as well.

Reference: [Arch Linux RandR X Window System][1]


  [1]: https://wiki.archlinux.org/index.php/xrandr

