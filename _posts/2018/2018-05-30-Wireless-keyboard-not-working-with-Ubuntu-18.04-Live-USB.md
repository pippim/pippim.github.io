---
layout:       post
title:        >
    Wireless keyboard not working with Ubuntu 18.04 Live USB
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1041758
type:         Answer
tags:         usb keyboard mouse
created_date: 2018-05-30 01:40:15
edit_date:    2022-01-02 21:31:12
votes:        "3 "
favorites:    
views:        "12,736 "
accepted:     Accepted
uploaded:     2022-04-24 19:32:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-30-Wireless-keyboard-not-working-with-Ubuntu-18.04-Live-USB.md
toc:          false
navigation:   false
clipboard:    false
---

# Update January 2, 2022

This bug has been fixed according to the bug report: [Lenovo Essential Wireless Keyboard doesn't works (Primax Electronics manufacturer) #36](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1771431) which states:

> Julian Alarcon (julian-alarcon) wrote on 2019-09-19: 			#36  
>   
> This is finally fixed! I test it in Ubuntu 18.04 kernel: 4.15.0-64, Ubuntu 18.04.3 kernel: 5.0.0-29.  
>   
> The keyboard and mouse seems to work fine with no issues! I had to disable a workaround used to make it work! [https://github.com/y-trudeau/linux_lenovo_ultraslim_plus](https://github.com/y-trudeau/linux_lenovo_ultraslim_plus)s  

# Original post

The original post is shown below for historical purposes.

## Extensive history to this problem

You are not alone. Someone in [Ubuntu forums][1] has reported:

> Re: Lenovo Essential Wireless Keyboard and Mouse Combo doesn't work  
>   
> I just reported this bug:  
> [Lenovo Essential Wireless Keyboard doesn't works (Primax Electronics manufacturer)](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1771431)  
>   
> The bug is still present in the latest Ubuntu version (18.04 bionic beaver) with stable kernel.  
>   
> It's also reported by people from Linux Mint, Fedora and others.  
>   
> - [Professional Wireless Keyboard not working on Linux](https://forums.lenovo.com/t5/Linux-Discussion/Professional-Wireless-Keyboard-not-working-on-Linux/td-p/3726486)  
> - [Lenovo Essential Wireless Keyboard and Mouse Combo doesn't work](https://ubuntuforums.org/showthread.php?t=2378862)  
> - [Lenovo Professional Wireless Keyboard and Mouse Combo not working in ubuntu](https://askubuntu.com/questions/897729/lenovo-professional-wireless-keyboard-and-mouse-combo-not-working-in-ubuntu)  
> - [Wireless keyboard Lenovo doesn't work properly](https://forums.linuxmint.com/viewtopic.php?f=49&t=260093&sid=20a073d5dd8abb1b7f23be608d7fdfd7)  
> - [Linux HID driver for Primax wireless keyboards](https://unix.stackexchange.com/questions/377830/linux-hid-driver-for-primax-wireless-keyboards/)  

### Possible workarounds

Although the bug has been confirmed by the Ubuntu Team, no one has been assigned to fixing it yet. In the meantime there are two workarounds:

- [GitHub - y-trudeau /
linux_lenovo_ultraslim_plus
](https://github.com/y-trudeau/linux_lenovo_ultraslim_plus)
- [Linux HID driver for Primax wireless keyboards](https://unix.stackexchange.com/a/402288/200094)


  [1]: https://ubuntuforums.org/showthread.php?t=2378862
