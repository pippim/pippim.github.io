---
layout:       post
title:        >
    Can I automatically generate a command-line for xrandr based on the current set-up?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1173410
type:         Answer
tags:         xrandr
created_date: !!str "2019-09-11 11:20:30"
edit_date:    !!str ""
votes:        !!str "3"
favorites:    
views:        !!str "504"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

<!-- Language-all: lang-bash -->

I've had the same problem before which led me to create a function in `~/.bashrc` called `xreset`:

``` 
xreset () {

    xrandr --output HDMI-0  --mode 1920x1080 --pos 0x0       --rotate normal \
           --output eDP-1-1 --mode 1920x1080 --pos 3840x2160 --rotate normal \
           --output DP-1-1  --mode 3840x2160 --pos 1920x0    --rotate normal

} # xreset

```

After you get your monitors arranged by position and resolution, grab the current setup with:

``` 
$ xrandr | grep " connected"

```

``` 
HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
eDP-1-1 connected primary 1920x1080+3840+2160 (normal left inverted right x axis y axis) 382mm x 215mm
DP-1-1 connected 3840x2160+1920+0 (normal left inverted right x axis y axis) 1600mm x 900mm

```

All the information is there for you to create your own `xreset` function.

