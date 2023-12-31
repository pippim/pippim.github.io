---
layout:       post
title:        >
    Not enough computer space when installing ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064781
type:         Answer
tags:         partitioning system-installation 18.04 live-usb
created_date: 2018-08-12 21:52:18
edit_date:    
votes:        "0 "
favorites:    
views:        "1,654 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-12-Not-enough-computer-space-when-installing-ubuntu.md
toc:          false
navigation:   false
clipboard:    false
---

You are looking at the space on your USB Live Boot which is 7 GB.

In `gparted` you need to look at the unallocated partition after you Windows C drive. Here in your unallocated partition you have 103 GB free.

Select the option "Install Ubuntu alongside Windows" and you should have no problem pointing the installer to the 103 GB empty partition.

If you need more pointers follow this Q&A: [How do I install Ubuntu alongside a pre-installed Windows with UEFI?](How do I install Ubuntu alongside a pre-installed Windows with UEFI?)
