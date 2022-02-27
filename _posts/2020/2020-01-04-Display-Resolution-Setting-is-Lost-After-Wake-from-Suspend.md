---
layout:       post
title:        >
    Display Resolution Setting is Lost After Wake from Suspend
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1200715
type:         Answer
tags:         display-resolution amd-graphics
created_date: 2020-01-04 20:40:07
edit_date:    
votes:        "2 "
favorites:    
views:        "798 "
accepted:     
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-01-04-Display-Resolution-Setting-is-Lost-After-Wake-from-Suspend.md
toc:          false
navigation:   false
clipboard:    false
---

From time to time the Window Manager will reset my displays as well. So as to not have to go manually reset them (or reboot) I've created a function in `~/.bashrc` to do this for me:



``` bash
xreset () {

    # Reset xrandr to normal, first use: xrandr | grep " connected "
    # HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
    # eDP-1-1 connected primary 1920x1080+3840+2160 (normal left inverted right x axis y axis) 382mm x 215mm
    # DP-1-1 connected 3840x2160+1920+0 (normal left inverted right x axis y axis) 1600mm x 900mm
    xrandr --output HDMI-0  --mode 1920x1080 --pos 0x0       --rotate normal \
           --output eDP-1-1 --mode 1920x1080 --pos 3840x2160 --rotate normal \
           --primary \
           --output DP-1-1  --mode 3840x2160 --pos 1920x0    --rotate normal

} # xreset

```

Whenever the screens are "wacky" I open a terminal and type `xreset`.

The first step for you is to create a similar function. The next step is to have it automatically called when suspending from resume. To do that create a script in `/lib/systemd/system-sleep` and mark it executable.

Of course the desirable solution is to fix the Window Manager (Unity, GDM, etc) but if that isn't possible this band-aid approach can be taken.
