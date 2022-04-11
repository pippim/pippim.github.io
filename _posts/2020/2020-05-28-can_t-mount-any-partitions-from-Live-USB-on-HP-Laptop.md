---
layout:       post
title:        >
    can't mount any partitions from Live USB on HP Laptop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1244699
type:         Answer
tags:         dual-boot partitioning mount
created_date: 2020-05-28 22:49:39
edit_date:    
votes:        "1 "
favorites:    
views:        "255 "
accepted:     Accepted
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-05-28-can_t-mount-any-partitions-from-Live-USB-on-HP-Laptop.md
toc:          false
navigation:   false
clipboard:    false
---

As mentioned in comments the SSD partition attempting to mount is a Windows partition. For that to work you need `ntfs-3g` package installed. To successfully install packages to a Live USB it needs to be a persistent Live USB:

- [How to make a live usb persistent](How to make a live usb persistent)
- [How to make a persistent live Ubuntu USB with more than 4GB](How to make a persistent live Ubuntu USB with more than 4GB)
