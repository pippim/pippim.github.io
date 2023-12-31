---
layout:       post
title:        >
    Fractional scaling won't remember settings on restart
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1207536
type:         Answer
tags:         multiple-monitors display scaling
created_date: 2020-02-02 12:28:59
edit_date:    
votes:        "1 "
favorites:    
views:        "3,700 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-02-02-Fractional-scaling-won_t-remember-settings-on-restart.md
toc:          false
navigation:   false
clipboard:    false
---

From: [How to Enable Fractional Scaling in Ubuntu 19.04][1]

> To enable fractional scaling in GNOME 3.32 on Wayland run:  
>   
>     gsettings set org.gnome.mutter experimental-features "['scale-monitor-framebuffer']"  
>   
> To enable fractional scaling in Ubuntu 19.04 on Xorg run:  
>   
>     gsettings set org.gnome.mutter experimental-features "['x11-randr-fractional-scaling']"  
>   
> Once set, you can open `Settings > Devices > Screen Display` to access  
> additional fractional scaling values, including 125% and 150%.  

There are many reports of settings not persisting across reboots:

- [Display settings not saved across sessions when using fractional scaling](Display settings not saved across sessions when using fractional scaling)
- [Popos 19.04 - X11 fractional scaling not persist after reboot][2]

If you feel your problem is the same [file a bug report][3].

Using fractional scaling with nvidia cards can be problematic with the nouveau (open source) drivers. You may be better served with the drivers direct from nvidia (closed source).

## Wrong `gsettings`?

It could be the wrong `gsettings` are being run as in this question:

- [Enable fractional scaling for display in ubuntu 19.04](Enable fractional scaling for display in ubuntu 19.04)


``` 
~$ gsettings set org.gnome.mutter experimental-features "['x11-randr-fractional-scaling']"
GLib-GIO-Message: 12:22:36.852: Using the 'memory' GSettings backend.  Your settings will not be saved or shared with other applications.
```

If that is the case simply use `/usr/bin/gsettings` command.

## Other options

Many use Ubuntu 16.04 with Unity Tweak tool and Font scaling options. For example I have mine set at `1.38` for many years without any problems.

  [1]: https://www.omgubuntu.co.uk/2019/06/enable-fractional-scaling-ubuntu-19-04
  [2]: https://www.reddit.com/r/pop_os/comments/clui9o/popos_1904_x11_fractional_scaling_not_persist/
  [3]: https://help.ubuntu.com/stable/ubuntu-help/report-ubuntu-bug.html.en
