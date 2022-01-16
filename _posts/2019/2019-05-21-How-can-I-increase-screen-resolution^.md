---
layout:       post
title:        >
    How can I increase screen resolution?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1145204
type:         Answer
tags:         screen display-resolution desktop-environments
created_date: 2019-05-21 23:02:30
edit_date:    
votes:        "1 "
favorites:    
views:        "353 "
accepted:     Accepted
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-21-How-can-I-increase-screen-resolution^.md
toc:          false
navigation:   false
clipboard:    true
---

The maximum resolution of the Acer V196HQL 1366 x 768 @ 60 Hz. It may not sound like a lot but it's only a $99 monitor.

I'll walk you through my system to setup that resolution and you can substitute my monitor name for your own below:

{% include copyHeader.html %}
``` 
$ xrandr --current

eDP-1-1 connected primary 1920x1080+3840+2160 (normal left inverted right x axis y axis) 382mm x 215mm
   1920x1080     60.02*+  60.01    59.97    59.96    59.93    48.02  
   1680x1050     59.95    59.88  
   1600x1024     60.17  
   1400x1050     59.98  
   1600x900      59.99    59.94    59.95    59.82  
   1280x1024     60.02  
   1440x900      59.89  
   1400x900      59.96    59.88  
   1280x960      60.00  
   1440x810      60.00    59.97  
   1368x768      59.88    59.85  
   1360x768      59.80    59.96  
   1280x800      59.99    59.97    59.81    59.91  
   1152x864      60.00  
   1280x720      60.00    59.99    59.86    59.74  
   1024x768      60.04    60.00  
   960x720       60.00  
   928x696       60.05  
   896x672       60.01  
   1024x576      59.95    59.96    59.90    59.82  
   960x600       59.93    60.00  
   960x540       59.96    59.99    59.63    59.82  
   800x600       60.00    60.32    56.25  
   840x525       60.01    59.88  
   864x486       59.92    59.57  
   800x512       60.17  
   700x525       59.98  
   800x450       59.95    59.82  
   640x512       60.02  
   720x450       59.89  
   700x450       59.96    59.88  
   640x480       60.00    59.94  
   720x405       59.51    58.99  
   684x384       59.88    59.85  
   680x384       59.80    59.96  
   640x400       59.88    59.98  
   576x432       60.06  
   640x360       59.86    59.83    59.84    59.32  
   512x384       60.00  
   512x288       60.00    59.92  
   480x270       59.63    59.82  
   400x300       60.32    56.34  
   432x243       59.92    59.57  
   320x240       60.05  
   360x202       59.51    59.13  
   320x180       59.84    59.32  
```

The first step is to get the signals using the `cvt` command:

``` 
$ cvt 1366 768

# 1368x768 59.88 Hz (CVT) hsync: 47.79 kHz; pclk: 85.25 MHz
Modeline "1368x768_60.00"   85.25  1368 1440 1576 1784  768 771 781 798 -hsync +vsync
```

The last line you will mostly copy and paste into the next command:

``` 
$ xrandr --newmode "1368x768_60.00"   85.25  1368 1440 1576 1784  768 771 781 798 -hsync +vsync
```

- On my machine it prefers 1368x768 but copy and paste what your machine shows

Now we need to add the new mode to your monitor:

``` 
$ xrandr --addmode eDP-1-1 1368x768_60.00
```

- Remember your machine uses `VGA-0` instead of my `eDP-1-1`

Last step is to activate the new `VGA-0`:

``` 
$ xrandr --output eDP-1-1 --mode 1368x768_60.00
```

VOILA!
