---
layout:       post
title:        >
    How to fix screen overlap and top left zoom of HD external monitors while using 4k primary Linux Ubuntu 20?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1256392
type:         Answer
tags:         nvidia lubuntu multiple-monitors 20.04 display
created_date: 2020-07-04 21:24:35
edit_date:    
votes:        "1 "
favorites:    
views:        "547 "
accepted:     Accepted
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   false
clipboard:    false
---

Place this code in your `~/.bashrc` file to be able to call `xreset` from the command line:

<!-- Language-all: lang-bash -->

``` 
xreset () {

    # Reset xrandr to normal, first use: xrandr | grep " connected "
    # HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
    # eDP-1-1 connected primary 1920x1080+3840+2160 (normal left inverted right x axis y axis) 382mm x 215mm
    # DP-1-1 connected 3840x2160+1920+0 (normal left inverted right x axis y axis) 1600mm x 900mm
    xrandr --output HDMI-0  --mode 1920x1080 --pos 0x0       --rotate normal \
           --fb 1920x1080   --panning 1920x1080 \
           --output eDP-1-1 --mode 1920x1080 --pos 3840x2160 --rotate normal \
           --primary \
           --output DP-1-1  --mode 3840x2160 --pos 1920x0    --rotate normal

    # --panning option added because HDMI-0 was mirroring all other monitors
    # and "panning" back and forth. --fb option added next day.

} # xreset
```

Or if you prefer to create an `.sh` file use this:

``` bash
#!/bin/bash

    # Reset xrandr to normal, first use: xrandr | grep " connected "
    # HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
    # eDP-1-1 connected primary 1920x1080+3840+2160 (normal left inverted right x axis y axis) 382mm x 215mm
    # DP-1-1 connected 3840x2160+1920+0 (normal left inverted right x axis y axis) 1600mm x 900mm
    xrandr --output HDMI-0  --mode 1920x1080 --pos 0x0       --rotate normal \
           --fb 1920x1080   --panning 1920x1080 \
           --output eDP-1-1 --mode 1920x1080 --pos 3840x2160 --rotate normal \
           --primary \
           --output DP-1-1  --mode 3840x2160 --pos 1920x0    --rotate normal

    # --panning option added because HDMI-0 was mirroring all other monitors
    # and "panning" back and forth. --fb option added next day.
```

Save to a file and mark it executable with `chmod a+x filename`

First you need to discover you monitor properties with:

``` 
xrandr | grep " connected"

```

Then using reported properties change the `xreset` function accordingly.
