---
layout:       post
title:        >
    Lagging after update to 19.10 from 19.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1184571
type:         Answer
tags:         updates graphics 19.10 grub
created_date: 2019-10-28 22:57:52
edit_date:    
votes:        "4 "
favorites:    
views:        "2,222 "
accepted:     Accepted
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-28-Lagging-after-update-to-19.10-from-19.04.md
toc:          false
navigation:   false
clipboard:    false
---

As verified in comments the solution to lagging is to reboot into grub's Advanced Options for Ubuntu menu and select an older kernel.

Going forward try out each new kernel the system installs until one finally works properly. You can tell when a new kernel is being installed because `update-initramfs` and `update-grub` run with very unique output. Additionally you will see the new kernels on the grub Advanced Options for Ubuntu menu.

Make sure you **do not** autoremove the kernel that is working for you now. The only way you can autoremove it is to boot into a newer kernel and type:

``` 
sudo apt autoremove
```

**So don't do that!**
