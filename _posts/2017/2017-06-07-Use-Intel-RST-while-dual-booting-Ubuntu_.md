---
layout:       post
title:        >
    Use Intel RST while dual-booting Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/923193
type:         Answer
tags:         14.04 grub
created_date: 2017-06-07 22:57:42
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "5,700 "
accepted:     
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-06-07-Use-Intel-RST-while-dual-booting-Ubuntu_.md
toc:          false
navigation:   false
clipboard:    false
---

# Fallacy: You can't accelerate Windows & Ubuntu concurrently

You can use use **Intel RST** to accelerate a Windows drive to SSD (usually PCIe mSata on a laptop) and **Enhance IO** to accelerate Linux (Ubuntu) concurrently, but not simultaneously of course.

There are caveats such as whenever you need to update grub (install a new kernel, update initramfs for some drivers, etc). You need to decelerate the SSD in Windows (with Intel RST software) or BIOS by pressing <kbd>Ctrl</kbd>+<kbd>I</kbd> during POST (Power On Self Test).

## Finding error messages during Ubuntu Boot

By default error messages are hidden for most users during `grub` boot and a "purple splash screen appears" during the second half of grub boot. To remedy this use:

``` 
gksu gedit /etc/default/grub
```

Look for the line containing:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

There may be other options on this line which you should not touch. Remove the options "quiet splash" in order to see error messages during boot up. Leave the double quotes (") at the beginning and ending of the parameter list.

Save the file, exit and then type:

``` 
sudo update-grub
```

**NOTE:** When using Intel RST you must first decelerate the Windows drive before typing `update-grub` or `update-initramfs` when grub is installed on the same drive as the accelerated Windows.

## Summary

I'll update this answer as new information is provided by the OP. Coincidentally it was disk acceleration under Ubuntu 14.04 that brought me to **Ask Ubuntu** in the first place. You can search my very first couple of posts here for information on using **Enhance IO** to accelerate Ubuntu.
