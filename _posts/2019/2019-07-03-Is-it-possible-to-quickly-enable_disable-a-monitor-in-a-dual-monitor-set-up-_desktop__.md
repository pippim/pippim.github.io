---
layout:       post
title:        >
    Is it possible to quickly enable/disable a monitor in a dual monitor set-up (desktop)?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155665
type:         Answer
tags:         18.04 nvidia multiple-monitors display settings
created_date: 2019-07-03 11:50:28
edit_date:    
votes:        "0 "
favorites:    
views:        "1,679 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-03-Is-it-possible-to-quickly-enable_disable-a-monitor-in-a-dual-monitor-set-up-_desktop__.md
toc:          false
navigation:   false
clipboard:    false
---

Sometimes my monitors will go out of alignment (left becomes right, top becomes bottom, etc.) and sometimes my second monitor will get washed out colours. For this I simply type `xreset` and all goes back to normal. I created a function in `~/.bashrc` for this purpose:



``` bash
$ type -a xreset

xreset is a function

xreset () 
{ 
    # Reset xrandr to normal, first use: xrandr | grep " connected "
    # HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
    # eDP-1-1 connected primary 1920x1080+3840+2160 (normal left inverted right x axis y axis) 382mm x 215mm
    # DP-1-1 connected 3840x2160+1920+0 (normal left inverted right x axis y axis) 1600mm x 900mm
    xrandr --output HDMI-0  --mode 1920x1080 --pos 0x0       --rotate normal \
           --output eDP-1-1 --mode 1920x1080 --pos 3840x2160 --rotate normal \
           --output DP-1-1  --mode 3840x2160 --pos 1920x0    --rotate normal

}
```

You could do something similar with `xconfig1`, `xconfig2`, etc and then bind them to short cut keys.

