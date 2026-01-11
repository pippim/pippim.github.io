---
layout:       post
title:        >
    Turn off primary screen, Ubuntu 19.10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1183461
type:         Answer
tags:         keyboard multiple-monitors
created_date: 2019-10-24 10:51:43
edit_date:    
votes:        "2 "
favorites:    
views:        "555 "
accepted:     
uploaded:     2026-01-11 15:47:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-24-Turn-off-primary-screen_-Ubuntu-19.10.md
toc:          false
navigation:   false
clipboard:    false
---

As demonstrated by this script you can turn off laptop screen:

- [Turn off all monitors while watching VLC media on TV]({% post_url /2019/2019-07-01-Turn-off-all-monitors-while-watching-VLC-media-on-TV %})



To discover the power setting for your laptop display use:

``` bash
$ ls /sys/class/backlight/*/bl_power

/sys/class/backlight/intel_backlight/bl_power
```

On my laptop the driver name is `intel_backlight`

Move your terminal window to your external screen and turn off your laptop display with:

``` bash
echo 4 | sudo tee /sys/class/backlight/intel_backlight/bl_power
```

or a shorter version without specifying the name should work for all laptops:

``` bash
echo 4 | sudo tee /sys/class/backlight/*/bl_power
```

To turn the screen back on:

``` bash
echo 0 | sudo tee /sys/class/backlight/*/bl_power
## ```



You can also get a list of your monitors for `xrandr` software control:

``` bash
$ xrandr | grep " connected"
HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
eDP-1-1 connected primary 1920x1080+3840+2160 (normal left inverted right x axis y axis) 382mm x 215mm
DP-1-1 connected 3840x2160+1920+0 (normal left inverted right x axis y axis) 1600mm x 900mm
```

`xrandr` allows you to turn off a screen but then all windows will move to the screen that is left turned on which is what you don't want.

