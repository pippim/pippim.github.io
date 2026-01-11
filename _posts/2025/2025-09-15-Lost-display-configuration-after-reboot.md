---
layout:       post
title:        >
    Lost display configuration after reboot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1556116
type:         Answer
tags:         nvidia 24.04 display-resolution reboot vga
created_date: 2025-09-15 13:29:41
edit_date:    
votes:        "2 "
favorites:    
views:        "111 "
accepted:     
uploaded:     2026-01-11 15:47:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2025/2025-09-15-Lost-display-configuration-after-reboot.md
toc:          false
navigation:   false
clipboard:    false
---

I have two external displays. One of them, controlled through Thunderbolt 4K display adapter, can be wonky after a reboot. I created a function I can call from a command line to reset all three displays to desired resolution and position in virtual screen of X11.

Here is the `xrandr` code that works on my system:

>    xrandr --output HDMI-0 --mode 1920x1080 --pos 0x0 --rotate normal --fb 1920x1080 --panning 1920x1080 --output DP-1-1 --mode 3840x2160 --pos 1920x0 --rotate normal --output eDP-1-1 --mode 1920x1080 --pos 3840x2160 --rotate normal --primary;  

Using the `type -a` command. you can see the function `xreset`, in `~/.bashrc`,  is available from the command line:

``` bash
$ type -a xreset
xreset is a function
xreset () 
{ 
    xrandr --output HDMI-0 --mode 1920x1080 --pos 0x0 --rotate normal --fb 1920x1080 --panning 1920x1080 --output DP-1-1 --mode 3840x2160 --pos 1920x0 --rotate normal --output eDP-1-1 --mode 1920x1080 --pos 3840x2160 --rotate normal --primary;
    echo Now use System settings, Screen display, Apply, Keep this configuration
}
```

Of course this function wouldn't work in your system because the number of external displays, their resolutions and positioning are all different. If you are using Wayland instead of X11 another way of resetting is required.
