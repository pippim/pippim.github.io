---
layout:       post
title:        >
    best way to dual boot Ubuntu with windows 10?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/815191
type:         Answer
tags:         boot mbr grub
created_date: 2016-08-22 04:21:51
edit_date:    
votes:        "1 "
favorites:    
views:        "1,897 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-08-22-best-way-to-dual-boot-Ubuntu-with-windows-10_.md
toc:          false
navigation:   false
clipboard:    false
---

You're over thinking the issue. Grub resides in MBR of /dev/sda (the first hard drive). My laptop has an SSD (240GB) /dev/sda, a HDD (500GB) /dev/sdb and a mSata SSD (120GB) /dev/sdc. A Nautilus snapshot is provided for you to see:

[![enter image description here][1]][1]

When grub boot loader starts up you are given a menu to pick one of your various OS's to run and the right drive is automatically selected.

In the examples above two of the three drives have both Windows and Linux installed on separate partitions within the drives.

Oh yeah Windows 7 is broken on two of the drives...haha


  [1]: https://pippim.github.io/assets/img/posts/2016/X2mDW.png
