---
layout:       post
title:        >
    Nvidia card on an ASUS ZenBook Flip 14 sometimes boots to a purple screen
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1149719
type:         Answer
tags:         boot nvidia login freeze grub
created_date: 2019-06-09 03:40:06
edit_date:    
votes:        "3 "
favorites:    
views:        "666 "
accepted:     Accepted
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-09-Nvidia-card-on-an-ASUS-ZenBook-Flip-14-sometimes-boots-to-a-purple-screen.md
toc:          false
navigation:   false
clipboard:    false
---

There is an unsolved problem of another MX150 laptop that takes [10 minutes to boot][1] in Windows.

There is a bug report filed against the **ASUS Zenbook** here:

- [intel-microcode on ASUS makes kernel stuck during loading initramfs on bionic-updates, bionic-security][2]

Comment #47 seems to have the solution:

> For anyone having a similar problem, try booting with microcode  
> updates off: add `dis_ucode_ldr` to the kernel command line (from GRUB  
> if you cannot boot)  

To do this use:

``` 
sudo -H gedit /etc/default/grub
```

Find the line containing `quiet splash` and make it read `quiet splash dis_ucode_ldr` whilst keeping everything else on the line the same.

Save the file and type:

``` 
sudo update-grub
reboot
```

Hopefully it all works fine now. If this is your situation make sure to subscribe to the bug report.

  [1]: https://forums.tomsguide.com/threads/new-laptop-takes-10-mins-to-boot-up.199278/
  [2]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1829620
